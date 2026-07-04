"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

const GREETING_PREFIX = "Hi, I'm ";
const GREETING_NAME = "Lysander Uy";
const GREETING = GREETING_PREFIX + GREETING_NAME;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

/* Types the greeting out on load, then holds a blinking cursor.
   Skips straight to the full string when reduced motion is requested. */
function useTypewriter(text: string, enabled: boolean, speed = 55) {
  const [count, setCount] = useState(enabled ? 0 : text.length);

  useEffect(() => {
    if (!enabled) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, enabled, speed]);

  return text.slice(0, count);
}

export function Hero() {
  const reduce = useReducedMotion();
  const typed = useTypewriter(GREETING, !reduce);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6"
    >
      {/* Soft centered glow — the only ambient element */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[52vh] w-[64vw] max-w-[52rem] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(ellipse at center, var(--glow) 0%, transparent 70%)" }}
        aria-hidden
      />

      <motion.div
        variants={container}
        initial={reduce ? "show" : "hidden"}
        animate="show"
        className="relative z-10 flex w-full max-w-[54rem] flex-col items-center pt-32 pb-16 text-center"
      >
        {/* Typed greeting — the name lives here now */}
        <p className="mb-8 font-mono text-[15px] tracking-[0.02em] text-[color:var(--text-mid)] sm:text-[17px]">
          <span>{typed.slice(0, GREETING_PREFIX.length)}</span>
          <span className="font-medium text-[color:var(--text-hi)]">
            {typed.slice(GREETING_PREFIX.length)}
          </span>
          <span
            className="blink ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.16em] bg-[color:var(--accent)]"
            aria-hidden
          />
        </p>

        {/* The statement — the star of the section */}
        <motion.h1
          variants={item}
          className="max-w-[24ch] text-[clamp(34px,6.4vw,68px)] font-semibold leading-[1.04] tracking-[-0.03em] text-[color:var(--text-hi)]"
        >
          Great products don't get built so much as{" "}
          <span className="text-[color:var(--accent)]">sweated over</span> — every layer.
        </motion.h1>

        {/* Supporting context */}
        <motion.p
          variants={item}
          className="mt-10 max-w-[46ch] text-[15px] leading-[1.6] text-[color:var(--text)] sm:text-[16px]"
        >
          Full-stack web and mobile, particular about everything from the database
          schema to the last pixel — plus a soldering iron for the weekends.
        </motion.p>
      </motion.div>

      {/* Scroll affordance — fades out the moment you move off the hero */}
      <motion.div
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: atTop ? 1 : 0 }}
        transition={{ duration: 0.5, delay: reduce ? 0 : 1.6 }}
        aria-hidden
      >
        <span className="flex flex-col items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--text-dim)]">
          Scroll
          <span className="scroll-pulse block h-6 w-px bg-gradient-to-b from-[color:var(--text-mid)] to-transparent" />
        </span>
      </motion.div>
    </section>
  );
}
