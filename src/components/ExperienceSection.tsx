"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Container, SectionHeader, revealViewport } from "@/components/Section";
import { experienceEntries } from "@/data/experience";

/* Each entry slides in from the side its card sits on, reinforcing the
   alternating timeline. `custom` carries the direction (-1 = from left). */
const articleVariant: Variants = {
  hidden: (dir: number) => ({ opacity: 0, x: dir * 36, y: 8 }),
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/* Survey crosshair — the timeline node, echoing the site's coordinate motif. */
function Crosshair() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      className="h-[18px] w-[18px] text-[color:var(--text-dim)] transition-colors duration-300 group-hover:text-[color:var(--accent)]"
    >
      <circle cx="8" cy="8" r="2.6" strokeWidth="1.4" />
      <path d="M8 0.5V4M8 12v3.5M0.5 8H4M12 8h3.5" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function ExperienceSection() {
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="relative bg-[color:var(--bg-2)] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute left-0 top-1/2 h-[46rem] w-[34rem] -translate-x-1/3 -translate-y-1/2"
          style={{ background: "radial-gradient(circle at center, var(--glow) 0%, transparent 64%)" }}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-[color:var(--border-strong)] to-transparent"
        aria-hidden
      />
      <Container className="relative z-10">
        <SectionHeader index="03" label="Experience" title="Where I've been building" />

        <div className="relative mt-16 overflow-x-clip">
          {/* Center spine */}
          <span
            className="pointer-events-none absolute inset-y-0 left-4 w-px -translate-x-1/2 bg-[color:var(--border)] md:left-1/2"
            aria-hidden
          />

          <div className="flex flex-col">
            {experienceEntries.map((entry, i) => {
              const index = String(i + 1).padStart(2, "0");
              const ongoing = /present/i.test(entry.period);
              const isLeft = i % 2 === 0;

              return (
                <motion.article
                  key={`${entry.company}-${entry.roleTitle}`}
                  custom={isLeft ? -1 : 1}
                  variants={articleVariant}
                  initial={reduce ? "show" : "hidden"}
                  whileInView="show"
                  viewport={revealViewport}
                  className={`group relative md:grid md:grid-cols-2 ${
                    i > 0 ? "mt-12 md:-mt-20" : ""
                  }`}
                >
                  {/* Node on the spine */}
                  <span
                    className="absolute left-4 top-1 z-10 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-[color:var(--bg-2)] md:left-1/2"
                    aria-hidden
                  >
                    <Crosshair />
                  </span>
                  {/* Connector stub from node toward the card */}
                  <span
                    className={`absolute top-4 left-4 h-px w-6 bg-[color:var(--border)] ${
                      isLeft ? "md:left-auto md:right-1/2" : "md:left-1/2"
                    }`}
                    aria-hidden
                  />

                  {/* Content column — indicator above card, both on the same side */}
                  <div
                    className={`ml-12 md:ml-0 ${
                      isLeft
                        ? "md:col-start-1 md:row-start-1 md:pr-10"
                        : "md:col-start-2 md:row-start-1 md:pl-10"
                    }`}
                  >
                    {/* Indicator — index, date, location sitting above the card */}
                    <div
                      className={`mb-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11px] ${
                        isLeft ? "md:justify-end" : ""
                      }`}
                    >
                      <span className="tabular-nums text-[color:var(--text-dim)] transition-colors duration-300 group-hover:text-[color:var(--accent)]">
                        {index}
                      </span>
                      {ongoing && (
                        <span
                          className="blink inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]"
                          aria-hidden
                        />
                      )}
                      <span className="uppercase tracking-[0.1em] text-[color:var(--text-mid)]">
                        {entry.period}
                      </span>
                      <span className="text-[color:var(--border-strong)]">·</span>
                      <span className="uppercase tracking-[0.1em] text-[color:var(--text-dim)]">
                        {entry.location}
                      </span>
                    </div>

                    {/* Card */}
                    <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 text-left transition-colors duration-300 group-hover:border-[color:var(--border-strong)] md:p-7">
                      <div className="flex items-start gap-4">
                        <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[color:var(--border)] bg-[color:var(--bg-1)]">
                          {entry.logo ? (
                            <Image
                              src={entry.logo}
                              alt={`${entry.company} logo`}
                              width={26}
                              height={26}
                              className="h-6 w-6 object-contain"
                            />
                          ) : (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={1.6}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-[22px] w-[22px] text-[color:var(--text-dim)]"
                              aria-hidden
                            >
                              <circle cx="12" cy="8" r="3.75" />
                              <path d="M4.5 20c0-4.1 3.4-6.25 7.5-6.25S19.5 15.9 19.5 20" />
                            </svg>
                          )}
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-[20px] font-semibold leading-tight text-[color:var(--text-hi)]">
                            {entry.roleTitle}
                          </h3>
                          <span className="mt-1.5 block text-[15px] text-[color:var(--text)]">
                            {entry.company}
                          </span>
                        </div>
                      </div>

                      <ul className="mt-6 flex flex-col gap-3">
                        {entry.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-3 text-[15px] leading-[1.65] text-[color:var(--text)]"
                          >
                            <span
                              className="mt-[9px] inline-block h-[5px] w-[5px] shrink-0 bg-[color:var(--accent)]"
                              aria-hidden
                            />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
