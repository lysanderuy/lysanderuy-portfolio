"use client";

import { useState } from "react";
import { profileLinks, stackGroups } from "@/data/profile";
import { useMounted } from "@/hooks/useMounted";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { PageFooter } from "@/components/PageFooter";
import { ROLE_TITLE } from "@/lib/constants";

const defaultLinkIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
);

const linkIcons: Record<string, React.ReactNode> = {
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M22.675 0h-21.35C.593 0 0 .592 0 1.326v21.348C0 23.408.593 24 1.326 24h11.495v-9.294H9.692V11.08h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.312h3.587l-.467 3.626h-3.12V24h6.116C23.407 24 24 23.408 24 22.674V1.326C24 .592 23.407 0 22.675 0z" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  Email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
};

export default function Profile() {
  const mounted = useMounted();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <PageShell>
      <PageHeader
        label="Available for work"
        showBack
        className={mounted ? "fade-1" : "opacity-0"}
      />

      <main className="relative z-10 flex-1 grid grid-cols-1 md:[grid-template-columns:2fr_1px_3fr] overflow-y-auto overflow-x-hidden px-5 md:px-14">
        <section className="flex flex-col justify-center md:pr-16 py-6 overflow-visible md:overflow-hidden">
          <div className={`flex items-center gap-6 mb-10 ${mounted ? "fade-2" : "opacity-0"}`}>
            <div
              className="w-16 h-16 rounded-full shrink-0 flex items-center justify-center text-base font-bold text-[#edf5a8]"
              style={{
                border: "1.5px solid rgba(180,210,80,0.55)",
                background: "linear-gradient(135deg, #2e3b18, #4a5c28)",
                boxShadow: "0 0 24px rgba(130,160,50,0.3)",
              }}
            >
              LU
            </div>
            <div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-[#c2d878] mb-1">
                {ROLE_TITLE}
              </div>
              <div className="text-[11px] tracking-widest text-[#96b050]">
                Symph | Focus Bear | Freelancer
              </div>
            </div>
          </div>

          <div className={`mb-10 md:mb-12 ${mounted ? "fade-3" : "opacity-0"}`}>
            <h1
              className="font-cormorant font-light leading-[0.92] text-[#edf5a8]"
              style={{ fontSize: "clamp(52px, 6vw, 96px)" }}
            >
              Lysander
            </h1>
            <h1
              className="font-cormorant font-semibold leading-[0.92] mb-5 text-[#a8c84a]"
              style={{ fontSize: "clamp(52px, 6vw, 96px)" }}
            >
              Uy.
            </h1>
            <p className="text-xs leading-relaxed text-[#c2d878] max-w-xs mt-4 tracking-wide">
              I am a Full Stack & Mobile Application Developer focused on building reliable,
              user-centered products with clean architecture and thoughtful design.
            </p>
          </div>
        </section>

        <div className="block md:hidden my-2 h-px bg-[#6e8840]/30" />
        <div className="hidden md:block my-12" style={{ background: "rgba(120,145,55,0.22)" }} />

        <section className="flex flex-col justify-center md:pl-16 py-6 overflow-visible">
          <div className={`mb-5 ${mounted ? "fade-4" : "opacity-0"}`}>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#96b050] mb-5">Connect</p>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {profileLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className={`flex items-center gap-3.5 px-3 py-2 rounded no-underline transition-all cursor-pointer ${
                    hovered === i ? "border border-[#6e8840]/60" : "border border-transparent"
                  }`}
                  style={{ background: hovered === i ? "rgba(150,180,60,0.1)" : "transparent" }}
                >
                  <span
                    className={`w-7 h-7 shrink-0 flex items-center justify-center rounded transition-colors ${
                      hovered === i
                        ? "border border-[#96b050] text-[#d4ed60]"
                        : "border border-[#6e8840] text-[#c2d878]"
                    }`}
                  >
                    {linkIcons[link.label] ?? defaultLinkIcon}
                  </span>
                  <span
                    className={`text-xs tracking-wide flex-1 transition-colors ${
                      hovered === i ? "text-[#d4ed60]" : "text-[#c2d878]"
                    }`}
                  >
                    {link.label}
                  </span>
                  <span
                    className={`text-xs text-[#96b050] transition-opacity ${
                      hovered === i ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    →
                  </span>
                </a>
              ))}
            </nav>
          </div>

          <div className={mounted ? "fade-5" : "opacity-0"}>
            <p className="text-[11px] text-[#96b050] mb-4">TECHNOLOGIES & TOOLS</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
              {stackGroups.map((group) => (
                <div
                  key={group.label}
                  className="rounded-sm border border-[#6e8840]/25 px-3 py-2"
                  style={{ background: "rgba(32, 44, 12, 0.72)" }}
                >
                  <p className="text-[11px] text-[#a8c84a] mb-1">{group.label}</p>
                  <p className="text-[11px] leading-relaxed text-[#c2d878]">
                    {group.items.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <PageFooter className={mounted ? "fade-6" : "opacity-0"} />
    </PageShell>
  );
}
