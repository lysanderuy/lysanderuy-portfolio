"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { Container, SectionHeader } from "@/components/Section";
import { stackGroups } from "@/data/profile";
import { techIcons, groupFallbackIcons } from "@/data/techIcons";

/* Symmetric (reversible) reveal. Scrolling down builds the tiles in; scrolling
   back up un-builds them in the exact reverse — the `hidden` state carries the
   same eased transition as `show`, and the container staggers in reverse
   (staggerDirection: -1) on the way out, so tiles undo last-to-first. */
const groupVariant: Variants = {
  hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  show: { transition: { staggerChildren: 0.03 } },
};

const tileVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.9,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

/* once: false so the reveal re-triggers each pass; the trigger line at ~85%
   of the viewport is where tiles both build (scroll down) and undo (scroll up). */
const repeatViewport = { once: false, margin: "0px 0px -15% 0px" } as const;

export function StackSection() {
  const reduce = useReducedMotion();

  return (
    <section id="stack" className="relative overflow-hidden bg-[color:var(--bg-0)] py-24 md:py-32">
      <div
        className="blueprint pointer-events-none absolute inset-0"
        style={{
          WebkitMaskImage: "radial-gradient(120% 78% at 50% 0%, #000 0%, transparent 72%)",
          maskImage: "radial-gradient(120% 78% at 50% 0%, #000 0%, transparent 72%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-[color:var(--border-strong)] to-transparent"
        aria-hidden
      />
      <Container className="relative z-10">
        <SectionHeader
          index="02"
          label="Stack"
          title="Tools I build with"
          intro="A working toolkit sharpened across production apps, freelance builds, and hardware side-quests, from type-safe web and mobile down to the AI and embedded layers underneath."
        />

        <div className="mt-14 flex flex-col gap-12">
          {stackGroups.map((group) => {
            const Fallback = groupFallbackIcons[group.label];
            return (
              <div key={group.label}>
                <div className="flex items-center gap-4">
                  <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-dim)]">
                    {group.label}
                  </span>
                  <span className="h-px w-full bg-[color:var(--border)]" aria-hidden />
                  <span className="whitespace-nowrap font-mono text-[10px] tabular-nums text-[color:var(--text-dim)]">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>

                <motion.ul
                  variants={groupVariant}
                  initial={reduce ? "show" : "hidden"}
                  whileInView="show"
                  viewport={reduce ? { once: true } : repeatViewport}
                  className="mt-5 grid grid-cols-3 gap-2.5 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9"
                >
                  {group.items.map((tech) => {
                    const Icon = techIcons[tech] ?? Fallback;
                    return (
                      <motion.li
                        key={tech}
                        variants={tileVariant}
                        whileHover={reduce ? undefined : { y: -6 }}
                        transition={{ type: "spring", stiffness: 320, damping: 22 }}
                        className="group flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-2 transition-colors duration-300 hover:border-[color:var(--border-strong)]"
                      >
                        {Icon && (
                          <Icon
                            className="h-5 w-5 text-[color:var(--text-mid)] transition-colors duration-300 group-hover:text-[color:var(--accent-bright)] md:h-6 md:w-6"
                            aria-hidden
                          />
                        )}
                        <span className="px-1 text-center font-mono text-[10px] leading-tight text-[color:var(--text-dim)] transition-colors duration-300 group-hover:text-[color:var(--text)]">
                          {tech}
                        </span>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
