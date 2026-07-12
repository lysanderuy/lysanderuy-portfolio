"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useInView, animate, type Variants } from "motion/react";
import { Container, SectionHeader, revealViewport } from "@/components/Section";
import { spotlight } from "@/data/projects";

/* Orchestrators only (no visual props of their own) — each just staggers
   whichever children mount under it once the panel scrolls into view. */
const panelVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const contentContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const frameVariant: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/* Screenshot wipes open left-to-right after the chrome settles, reading as
   the page "loading in" rather than a plain fade. */
const wipeVariant: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  show: { clipPath: "inset(0 0% 0 0)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 } },
};

const contentItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

/* The log reads as discrete beats rather than a stagger wash, so it runs
   slower than the site's default 0.08s stagger, with a blur-in so each line
   feels like it's resolving into focus rather than just sliding. */
const logContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16 } },
};

const logLine: Variants = {
  hidden: { opacity: 0, x: -12, filter: "blur(2px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

/* Counts up from 0 once it scrolls into view. */
function StatValue({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <div ref={ref} className="font-mono text-[32px] font-semibold leading-none tabular-nums text-[color:var(--text-hi)]">
      {display}
      {suffix}
    </div>
  );
}

export function SpotlightSection() {
  const reduce = useReducedMotion();

  return (
    <section id="spotlight" className="relative bg-[color:var(--bg-2)] py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-[color:var(--border-strong)] to-transparent"
        aria-hidden
      />
      <Container className="relative z-10">
        <SectionHeader
          index="05"
          label="Spotlight"
          title="Built overnight, because I needed it myself"
          intro={spotlight.description}
        />

        <motion.div
          variants={panelVariants}
          initial={reduce ? "show" : "hidden"}
          whileInView="show"
          viewport={revealViewport}
          className="mt-10 grid grid-cols-1 overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] md:mt-12 md:grid-cols-2"
        >
          {/* Faux browser chrome frames the screenshot as a desktop web app
              being visited, rather than a bare, ambiguous cropped image. */}
          <motion.a
            variants={frameVariant}
            href={spotlight.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col border-b border-[color:var(--border)] md:border-b-0 md:border-r"
          >
            <div className="flex items-center gap-2 border-b border-[color:var(--border)] bg-[color:var(--bg-1)] px-4 py-2.5">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" aria-hidden />
              <span className="font-mono text-[11px] text-[color:var(--text-mid)] transition-colors group-hover:text-[color:var(--accent-bright)]">
                picklers.website/map
              </span>
              <span
                className="ml-auto font-mono text-[11px] text-[color:var(--text-dim)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              >
                ↗
              </span>
            </div>

            <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-auto md:min-h-[320px] md:flex-1">
              <motion.div variants={wipeVariant} className="absolute inset-0">
                <Image
                  src={spotlight.preview}
                  alt={`${spotlight.name} preview`}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]"
                />
              </motion.div>
            </div>
          </motion.a>

          <motion.div
            variants={contentContainer}
            className="flex flex-col justify-center p-6 md:p-8 lg:p-10"
          >
            <motion.div variants={contentItem} className="flex items-center gap-3">
              <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-[color:var(--text-dim)]">
                {spotlight.tagline}
              </span>
              {/* Two rings offset in time, so it reads as an actual radar
                  pulse rather than a single static blip. Same ping-ring
                  keyframe the Hero's coordinate marker uses. */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <circle className="ping-ring" cx="8" cy="8" r="6" stroke="var(--accent)" strokeWidth="1" />
                <circle
                  className="ping-ring"
                  cx="8"
                  cy="8"
                  r="6"
                  stroke="var(--accent)"
                  strokeWidth="1"
                  style={{ animationDelay: "1.7s" }}
                />
                <circle cx="8" cy="8" r="1.75" fill="var(--accent)" />
              </svg>
            </motion.div>

            <motion.h3
              variants={contentItem}
              className="mt-3 text-[clamp(22px,2.6vw,30px)] font-semibold leading-[1.05] tracking-[-0.025em] text-[color:var(--text-hi)]"
            >
              {spotlight.name}
            </motion.h3>

            <motion.ul variants={logContainer} className="mt-5 flex flex-col gap-2">
              {spotlight.log.map((entry) => (
                <motion.li key={entry.time} variants={logLine} className="flex items-baseline gap-3">
                  <span className="shrink-0 font-mono text-[12.5px] text-[color:var(--text-dim)]">
                    {entry.time}
                  </span>
                  <span className="text-[13.5px] leading-[1.5] text-[color:var(--text)]">{entry.text}</span>
                </motion.li>
              ))}
              <li className="pt-0.5">
                <span className="blink inline-block h-[13px] w-[6px] bg-[color:var(--accent)]" aria-hidden />
              </li>
            </motion.ul>

            <motion.div
              variants={contentItem}
              className="mt-6 rounded-lg border border-[color:var(--border)] px-5 py-4"
            >
              <div className="flex items-baseline gap-4">
                <StatValue value={spotlight.stat.value} suffix={spotlight.stat.suffix} />
                <p className="text-[13px] leading-[1.4] text-[color:var(--text-mid)]">{spotlight.stat.label}</p>
              </div>
              <div className="mt-3 flex items-center gap-1.5 border-t border-[color:var(--border)] pt-3">
                <span className="blink h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" aria-hidden />
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-dim)]">
                  {spotlight.status}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
