"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";

export const revealContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/* Shared scroll-reveal trigger. The negative bottom margin pulls the trigger
   line up to ~85% of the viewport height, so reveals fire only once an element
   is comfortably in view, not the moment it peeks over the bottom edge. Being
   margin-based (not amount-based) keeps the timing consistent across elements
   of very different heights. */
export const revealViewport = {
  once: true,
  margin: "0px 0px -15% 0px",
} as const;

/* The single button system for the whole site. Primary = solid accent fill,
   secondary = outline. Mono, uppercase, tracked — the site's chrome voice. */
export function CTAButton({
  href,
  children,
  variant = "secondary",
  icon,
  arrow = true,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  arrow?: boolean;
  className?: string;
}) {
  const base =
    "group inline-flex items-center gap-2.5 rounded-md px-6 py-3 font-mono text-[12px] uppercase tracking-[0.14em] transition-colors";
  const look =
    variant === "primary"
      ? "bg-[color:var(--accent)] text-[color:var(--bg-0)] hover:bg-[color:var(--accent-bright)]"
      : "border border-[color:var(--border-strong)] text-[color:var(--text)] hover:border-[color:var(--text-mid)] hover:text-[color:var(--text-hi)]";
  const cls = `${base} ${look} ${className}`;

  const inner = (
    <>
      {icon && <span className="shrink-0" aria-hidden>{icon}</span>}
      {children}
      {arrow && (
        <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
          →
        </span>
      )}
    </>
  );

  if (href.startsWith("#")) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={cls}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {inner}
    </a>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[72rem] px-6 md:px-14 ${className}`}>{children}</div>
  );
}

export function SectionHeader({
  index,
  label,
  title,
  intro,
}: {
  index: string;
  label: string;
  title: string;
  intro?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.header
      variants={revealContainer}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={revealViewport}
    >
      <motion.div variants={revealItem} className="flex items-center gap-4">
        <span className="h-[7px] w-[7px] shrink-0 bg-[color:var(--accent)]" aria-hidden />
        <span className="whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.22em] text-[color:var(--text-mid)]">
          <span className="text-[color:var(--accent)]">{index}</span>
          <span className="mx-2 text-[color:var(--text-dim)]">/</span>
          {label}
        </span>
        <span className="h-px w-full bg-[color:var(--border)]" aria-hidden />
      </motion.div>

      <motion.h2
        variants={revealItem}
        className="mt-7 max-w-[22ch] text-[clamp(30px,4.4vw,54px)] font-semibold leading-[1.03] tracking-[-0.035em] text-[color:var(--text-hi)]"
      >
        {title}
      </motion.h2>

      {intro && (
        <motion.p
          variants={revealItem}
          className="mt-6 max-w-[54ch] text-[16px] leading-[1.7] text-[color:var(--text)]"
        >
          {intro}
        </motion.p>
      )}
    </motion.header>
  );
}
