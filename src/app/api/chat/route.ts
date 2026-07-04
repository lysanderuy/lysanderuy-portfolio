import { NextRequest } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/chat-context";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

const MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:streamGenerateContent?alt=sse`;
const MAX_MESSAGES = 20;
const MAX_CHARS = 2000;

// Best-effort in-memory per-IP throttle. Resets on cold start and is not shared
// across serverless instances, which is fine as a quota guard at portfolio scale.
// For hard guarantees, back this with a durable store (e.g. Upstash).
const RATE_LIMIT = 15;
const WINDOW_MS = 60_000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // crude guard against unbounded growth
  return false;
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

async function callGemini(payload: unknown, apiKey: string): Promise<Response> {
  // Retry once on transient upstream failures (rate limit / 5xx) before giving up.
  let last: Response | null = null;
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetch(`${GEMINI_URL}&key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok && res.body) return res;
    last = res;
    const retryable = res.status === 429 || res.status >= 500;
    if (!retryable || attempt === 1) break;
    await new Promise((r) => setTimeout(r, 400));
  }
  return last as Response;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Chat is not configured." }, { status: 500 });
  }

  if (isRateLimited(clientIp(req))) {
    return Response.json({ error: "Too many messages. Please slow down." }, { status: 429 });
  }

  let messages: ChatMessage[];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const trimmed = messages
    .filter((m) => (m?.role === "user" || m?.role === "assistant") && typeof m.content === "string")
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  if (trimmed.length === 0) {
    return Response.json({ error: "No message provided." }, { status: 400 });
  }

  const upstream = await callGemini(
    {
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: trimmed.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      generationConfig: { temperature: 0.6, maxOutputTokens: 800 },
    },
    apiKey,
  );

  if (!upstream.ok || !upstream.body) {
    return Response.json({ error: "The assistant is unavailable right now." }, { status: 502 });
  }

  // Decode Gemini's SSE stream and re-emit just the text deltas as plain UTF-8.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";
  let emitted = false;

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body!.getReader();
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const t = line.trim();
            if (!t.startsWith("data:")) continue;
            const json = t.slice(5).trim();
            if (!json || json === "[DONE]") continue;
            try {
              const parsed = JSON.parse(json);
              const text: string | undefined = parsed?.candidates?.[0]?.content?.parts
                ?.map((p: { text?: string }) => p.text ?? "")
                .join("");
              if (text) {
                emitted = true;
                controller.enqueue(encoder.encode(text));
              }
            } catch {
              // Partial JSON across chunk boundaries: ignore, next chunk completes it.
            }
          }
        }
      } catch {
        // Upstream dropped mid-stream: fall through and close with what we have.
      } finally {
        // Blocked/empty response (safety filter, error payload): send a fallback
        // so the user never sees a silent empty bubble.
        if (!emitted) {
          controller.enqueue(
            encoder.encode(
              "Sorry, I couldn't answer that one. You can reach Lysander directly at lysander.uy@gmail.com.",
            ),
          );
        }
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
