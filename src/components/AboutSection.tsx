"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Container, SectionHeader, CTAButton, revealContainer, revealItem, revealViewport } from "@/components/Section";
import { bio, aboutFacts, resumeUrl } from "@/data/profile";
import { COORDINATES } from "@/lib/constants";

export function AboutSection() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="relative bg-[color:var(--bg-2)] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute right-0 top-0 h-[42rem] w-[42rem] -translate-y-1/3 translate-x-1/4"
          style={{ background: "radial-gradient(circle at center, var(--glow) 0%, transparent 62%)" }}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-[color:var(--border-strong)] to-transparent"
        aria-hidden
      />
      <Container className="relative z-10">
        <SectionHeader index="01" label="About" title="The person behind the code" />

        <div className="mt-14 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-[0.82fr_1.18fr] md:gap-16">
          {/* Portrait */}
          <motion.div
            variants={revealItem}
            initial={reduce ? "show" : "hidden"}
            whileInView="show"
            viewport={revealViewport}
            className="relative mx-auto w-full max-w-[320px] md:mx-0 md:sticky md:top-28 md:self-start"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[color:var(--border-strong)] bg-gradient-to-b from-[color:var(--bg-1)] to-[color:var(--bg-2)]">
              <Image
                src="/me/about.jpg"
                alt="Lysander Uy"
                fill
                sizes="(max-width: 768px) 320px, 32vw"
                className="object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-[color:var(--border)]" aria-hidden />
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.1em] text-[color:var(--text-dim)]">
              <span>LYSANDER UY</span>
              <span>{COORDINATES}</span>
            </div>
          </motion.div>

          {/* Bio + facts */}
          <motion.div
            variants={revealContainer}
            initial={reduce ? "show" : "hidden"}
            whileInView="show"
            viewport={revealViewport}
            className="flex flex-col"
          >
            <div className="max-w-[58ch] space-y-5">
              {bio.map((para) => (
                <motion.p
                  key={para.slice(0, 24)}
                  variants={revealItem}
                  className="text-[16px] leading-[1.75] text-[color:var(--text)] md:text-[17px]"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            <motion.dl
              variants={revealItem}
              className="mt-12 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-[color:var(--border)] pt-8 sm:max-w-[34rem]"
            >
              {aboutFacts.map((f) => (
                <div key={f.label}>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-dim)]">
                    {f.label}
                  </dt>
                  <dd className="mt-2 text-[15px] text-[color:var(--text-hi)]">{f.value}</dd>
                </div>
              ))}
            </motion.dl>

            <motion.div variants={revealItem} className="mt-10">
              <CTAButton href={resumeUrl} variant="secondary">
                View resume
              </CTAButton>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
