"use client";

import Image from "next/image";
import { useMounted } from "@/hooks/useMounted";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { PageFooter } from "@/components/PageFooter";
import { experienceEntries } from "@/data/experience";

const fadeClass = (i: number) =>
  ["fade-3", "fade-4", "fade-5"][i] ?? "fade-5";

export default function Experience() {
  const mounted = useMounted();

  return (
    <PageShell>
      <PageHeader
        label="Experience"
        showBack
        className={mounted ? "fade-1" : "opacity-0"}
      />

      <main className="relative z-10 flex-1 overflow-y-auto px-5 py-8 md:px-14 md:py-12">
        <h1
          className={`font-cormorant text-[#edf5a8] font-light text-[clamp(36px,6vw,68px)] leading-[0.92] mb-10 md:mb-14 ${
            mounted ? "fade-2" : "opacity-0"
          }`}
        >
          Experience
        </h1>

        {/* Timeline layout */}
        <div className="flex flex-col gap-0 pb-12">
          {experienceEntries.map((entry, i) => {
            const isLast = i === experienceEntries.length - 1;
            return (
              <div
                key={i}
                className={mounted ? fadeClass(i) : "opacity-0"}
              >
                {/* Mobile: meta row above card */}
                <div className="flex md:hidden items-center gap-3 mb-3">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#6e8840]/50 font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="flex-1 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, #6e8840 0%, transparent 100%)",
                    }}
                  />
                  <span className="text-[10px] tracking-[0.08em] text-[#6e8840]/70 font-mono">
                    {entry.period}
                    {entry.location ? ` · ${entry.location}` : ""}
                  </span>
                </div>

                {/* Desktop: two-column timeline row / Mobile: full-width card */}
                <div className="flex flex-col md:flex-row md:gap-8 group">
                  {/* Left column — desktop only */}
                  <div className="hidden md:flex flex-col items-end shrink-0 w-[200px] relative pt-1">
                    {/* Spine */}
                    <div
                      className="absolute right-0 top-0 w-px"
                      style={{
                        height: isLast ? "calc(50%)" : "100%",
                        background: isLast
                          ? "linear-gradient(180deg, rgba(110,136,64,0.35) 0%, transparent 100%)"
                          : "rgba(110,136,64,0.25)",
                      }}
                    />
                    {/* Dot on spine */}
                    <div
                      className="absolute right-[-4px] top-[18px] w-2 h-2 rounded-full border border-[#96b050]/50 bg-[#1a2110] z-10 transition-all duration-300 group-hover:border-[#d4ed60]"
                      style={{
                        boxShadow: undefined,
                      }}
                    >
                      {/* glow handled via group-hover pseudo via inline style hack */}
                    </div>
                    <div className="text-right pr-6 flex flex-col gap-1.5">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#6e8840]/40 font-mono">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[11px] tracking-[0.06em] text-[#6e8840]">
                        {entry.period}
                      </span>
                      <span className="text-[11px] tracking-[0.04em] text-[#6e8840]/55">
                        {entry.location}
                      </span>
                    </div>
                  </div>

                  {/* Card */}
                  <article
                    className="flex-1 card card-surface rounded-sm border border-[#6e8840]/25 overflow-hidden mb-6 md:mb-10"
                  >
                    {/* Animated accent bar — slides in on group hover */}
                    <div className="h-[1px] w-full overflow-hidden">
                      <div
                        className="h-full w-full gradient-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                      />
                    </div>

                    {/* Card header */}
                    <div className="px-6 pt-5 pb-4 md:px-8 md:pt-6 md:pb-5">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3 min-w-0">
                          {entry.logo ? (
                            <Image
                              src={entry.logo}
                              alt={entry.company}
                              height={36}
                              width={120}
                              className="h-9 w-auto object-contain shrink-0"
                              style={{ filter: "brightness(0.88)" }}
                            />
                          ) : (
                            <span className="text-[#96b050] text-[13px] tracking-[0.15em] uppercase font-mono shrink-0">
                              {entry.company}
                            </span>
                          )}
                        </div>
                        {entry.type && (
                          <span className="shrink-0 text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 rounded-sm border border-[#6e8840]/40 text-[#6e8840] font-mono">
                            {entry.type}
                          </span>
                        )}
                      </div>

                      {entry.logo && (
                        <p className="text-[#96b050] text-[11px] tracking-[0.18em] uppercase mb-1.5 font-mono">
                          {entry.company}
                        </p>
                      )}

                      <h2 className="font-cormorant text-[#edf5a8] text-[clamp(20px,2.8vw,28px)] font-light leading-tight">
                        {entry.roleTitle}
                      </h2>
                    </div>

                    {/* Divider */}
                    <div
                      className="mx-6 md:mx-8 h-px mb-5"
                      style={{ background: "rgba(110,136,64,0.15)" }}
                    />

                    {/* Bullets */}
                    <div className="px-6 md:px-8 pb-5">
                      <ul className="space-y-3">
                        {entry.bullets.map((b, bi) => (
                          <li key={bi} className="flex gap-3 items-start">
                            <span className="w-1 h-1 rounded-full bg-[#96b050]/60 shrink-0 mt-[7px]" />
                            <span className="text-[#c8dc80] text-[12px] sm:text-[13px] leading-[1.8]">
                              {b}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </article>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <PageFooter className={mounted ? "fade-6" : "opacity-0"} />
    </PageShell>
  );
}
