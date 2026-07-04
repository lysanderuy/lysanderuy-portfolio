"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Container, SectionHeader, revealItem, revealViewport } from "@/components/Section";
import { thesis } from "@/data/projects";

const rowVariant: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function EducationSection() {
  const reduce = useReducedMotion();

  return (
    <section id="education" className="relative bg-[color:var(--bg-0)] py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-[color:var(--border-strong)] to-transparent"
        aria-hidden
      />
      <Container className="relative z-10">
        <SectionHeader
          index="04"
          label="Education"
          title="Bachelor of Science in Computer Engineering"
        />

        {/* School + dates */}
        <motion.div
          variants={revealItem}
          initial={reduce ? "show" : "hidden"}
          whileInView="show"
          viewport={revealViewport}
          className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2"
        >
          <span className="text-[16px] text-[color:var(--text-hi)]">University of San Carlos</span>
          <span className="h-1 w-1 rounded-full bg-[color:var(--border-strong)]" aria-hidden />
          <span className="font-mono text-[13px] text-[color:var(--text-mid)]">Aug 2022 – Present</span>
        </motion.div>

        {/* Thesis */}
        <div className="mt-14 md:mt-16">
          <div className="flex items-center gap-4">
            <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-dim)]">
              Thesis
            </span>
            <span className="h-px w-full bg-[color:var(--border)]" aria-hidden />
          </div>

          <motion.a
            href={thesis.github}
            target="_blank"
            rel="noopener noreferrer"
            variants={rowVariant}
            initial={reduce ? "show" : "hidden"}
            whileInView="show"
            viewport={revealViewport}
            className="group mt-8 grid grid-cols-1 overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] transition-colors duration-300 hover:border-[color:var(--border-strong)] md:grid-cols-2 md:items-stretch"
          >
            {/* Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[color:var(--border)] md:aspect-auto md:min-h-[340px] md:border-b-0 md:border-r">
              {thesis.preview && (
                <Image
                  src={thesis.preview}
                  alt="C.Scope.AI imaging system"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]"
                />
              )}
              <div
                className="pointer-events-none absolute inset-0 bg-[color:var(--bg-2)]/45 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-0"
                style={{ background: "linear-gradient(150deg, var(--glow) 0%, transparent 55%)" }}
                aria-hidden
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--text-dim)]">
                  Computer Vision
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[12px] text-[color:var(--text-mid)] transition-colors group-hover:text-[color:var(--accent-bright)]">
                  Code
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </span>
              </div>

              <h3 className="mt-6 text-[clamp(24px,3vw,32px)] font-semibold leading-[1.05] tracking-[-0.025em] text-[color:var(--text-hi)]">
                {thesis.name}
              </h3>

              {thesis.description && (
                <p className="mt-4 max-w-[50ch] text-[15px] leading-[1.65] text-[color:var(--text)]">
                  {thesis.description}
                </p>
              )}

              <ul className="mt-7 flex flex-wrap gap-2">
                {thesis.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded border border-[color:var(--border)] px-2.5 py-1 font-mono text-[11px] text-[color:var(--text-mid)]"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </motion.a>
        </div>
      </Container>
    </section>
  );
}
