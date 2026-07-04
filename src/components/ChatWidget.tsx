"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CHAT_SECTIONS } from "@/lib/chat-context";

type Role = "user" | "assistant";
type Message = { role: Role; content: string };

const GREETING =
  "Hi, I'm Lysander's AI assistant. Ask me about his experience, projects, or whether he's a fit for your role.";

const SUGGESTIONS = [
  "What has he built?",
  "Is he a good fit for a full-stack role?",
  "What's his tech stack?",
];

const anchorLabel = (anchor: string) =>
  CHAT_SECTIONS.find((s) => s.anchor === anchor)?.label ?? anchor.replace("#", "");

/** Pull [[scroll:#anchor]] control tokens out of assistant text for jump chips. */
function parseMessage(content: string) {
  const anchors: string[] = [];
  const text = content
    .replace(/\[\[scroll:(#[a-z]+)\]\]/gi, (_, a) => {
      if (CHAT_SECTIONS.some((s) => s.anchor === a) && !anchors.includes(a)) anchors.push(a);
      return "";
    })
    .trim();
  return { text, anchors };
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const jumpTo = (anchor: string) => {
    document.querySelector(anchor)?.scrollIntoView({ behavior: "smooth" });
    if (window.matchMedia("(max-width: 640px)").matches) setOpen(false);
  };

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;

    const next: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        const msg =
          res.status === 429
            ? "You're sending messages a bit fast. Give it a moment and try again."
            : res.status === 500
              ? "Chat isn't set up yet. You can reach Lysander at lysander.uy@gmail.com."
              : "Something went wrong. Please try again, or email lysander.uy@gmail.com.";
        setMessages([...next, { role: "assistant", content: msg }]);
        return;
      }

      setMessages([...next, { role: "assistant", content: "" }]);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...next, { role: "assistant", content: acc }]);
      }
      if (acc.trim() === "") {
        setMessages([
          ...next,
          { role: "assistant", content: "Sorry, I couldn't answer that one. Try rephrasing, or email lysander.uy@gmail.com." },
        ]);
      }
    } catch {
      setMessages([
        ...next,
        { role: "assistant", content: "Connection failed. You can email lysander.uy@gmail.com." },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Chat with Lysander's AI"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full border shadow-lg transition-colors"
        style={{
          bottom: "calc(1.25rem + env(safe-area-inset-bottom))",
          background: "var(--bg-2)",
          borderColor: "var(--border-strong)",
          color: "var(--accent-bright)",
          boxShadow: "0 8px 30px var(--glow)",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <CloseIcon />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <ChatIcon />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed right-5 z-[70] flex w-[calc(100vw-2.5rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border backdrop-blur-md sm:w-[380px]"
            style={{
              bottom: "calc(6rem + env(safe-area-inset-bottom))",
              height: "min(560px, calc(100dvh - 8.5rem))",
              background: "color-mix(in srgb, var(--bg-1) 92%, transparent)",
              borderColor: "var(--border-strong)",
              boxShadow: "0 16px 50px rgba(0,0,0,0.5)",
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b px-4 py-3" style={{ borderColor: "var(--border)" }}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: "var(--accent)" }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "var(--accent-bright)" }} />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-medium" style={{ color: "var(--text-hi)" }}>
                  Ask Lysander&apos;s AI
                </p>
                <p className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--text-dim)" }}>
                  Grounded in this portfolio
                </p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              <Bubble role="assistant" text={GREETING} />
              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border px-3 py-1.5 text-xs transition-colors hover:brightness-125"
                      style={{ borderColor: "var(--border)", color: "var(--text)" }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((m, i) => {
                const { text, anchors } = m.role === "assistant" ? parseMessage(m.content) : { text: m.content, anchors: [] };
                const isStreamingEmpty = m.role === "assistant" && text === "" && busy && i === messages.length - 1;
                return (
                  <div key={i} className="space-y-2">
                    <Bubble role={m.role} text={text} typing={isStreamingEmpty} />
                    {anchors.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {anchors.map((a) => (
                          <button
                            key={a}
                            type="button"
                            onClick={() => jumpTo(a)}
                            className="rounded-full border px-3 py-1 text-xs transition-colors hover:brightness-125"
                            style={{ borderColor: "var(--border-strong)", color: "var(--accent-bright)" }}
                          >
                            Jump to {anchorLabel(a)} &rarr;
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {busy && messages[messages.length - 1]?.role === "user" && (
                <Bubble role="assistant" text="" typing />
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t px-3 py-3"
              style={{ borderColor: "var(--border)" }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about experience, projects..."
                className="flex-1 bg-transparent px-2 text-base outline-none placeholder:opacity-60 sm:text-sm"
                style={{ color: "var(--text-hi)" }}
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send"
                className="flex h-9 w-9 items-center justify-center rounded-lg border transition-colors disabled:opacity-40"
                style={{ borderColor: "var(--border-strong)", color: "var(--accent-bright)", background: "var(--bg-2)" }}
              >
                <SendIcon />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({ role, text, typing }: { role: Role; text: string; typing?: boolean }) {
  const isUser = role === "user";
  return (
    <div className={isUser ? "flex justify-end" : "flex justify-start"}>
      <div
        className="max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm leading-relaxed"
        style={
          isUser
            ? { background: "var(--accent)", color: "var(--bg-0)" }
            : { background: "var(--surface)", color: "var(--text-hi)", border: "1px solid var(--border)" }
        }
      >
        {typing ? <TypingDots /> : text}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--text-mid)", animation: `blink 1.2s ${i * 0.2}s infinite` }}
        />
      ))}
    </span>
  );
}

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8A8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
