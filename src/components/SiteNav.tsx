"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { NAV_LINKS, AVAILABILITY } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function SiteNav() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const lastY = useRef(0);

  // Start every fresh load at the top so the hero entrance always plays,
  // but honor deep links (a shared #work URL still jumps to its anchor).
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (!window.location.hash) window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Hide when scrolling down past the hero; reveal when scrolling up.
      if (y > lastY.current && y > 140) setHidden(true);
      else if (y < lastY.current) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section owns the vertical middle of the viewport and mark its
  // nav link active. The thin center band means exactly one section qualifies.
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        const current = ids.find((id) => visible.has(id));
        setActive(current ? `#${current}` : "");
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const concealed = hidden && !open;

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-300 ${
        concealed ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "border-b border-[color:var(--border)] bg-[color:var(--bg-0)]/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[72rem] items-center justify-between px-6 md:h-20 md:px-14">
        <Link href="#top" className="group flex items-center gap-2.5" aria-label="Lysander Uy, home">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-[color:var(--border-strong)] bg-[color:var(--bg-1)] font-mono text-[13px] font-semibold tracking-[-0.02em] text-[color:var(--text-hi)] transition-colors duration-300 group-hover:border-[color:var(--accent)] group-hover:text-[color:var(--accent)]">
            LU
          </span>
          <span className="hidden font-mono text-[14px] font-medium tracking-[-0.01em] text-[color:var(--text-hi)] transition-colors group-hover:text-[color:var(--accent)] sm:inline">
            Lysander Uy
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative font-mono text-[13px] transition-colors hover:text-[color:var(--text-hi)] ${
                  isActive ? "text-[color:var(--text-hi)]" : "text-[color:var(--text-mid)]"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1.5 left-0 right-0 h-px bg-[color:var(--accent)]"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 32 }
                    }
                    aria-hidden
                  />
                )}
              </Link>
            );
          })}
          <span className="h-4 w-px bg-[color:var(--border)]" aria-hidden />
          <span className="flex items-center gap-2">
            <span
              className="blink block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]"
              aria-hidden
            />
            <span className="font-mono text-[12px] text-[color:var(--text-mid)]">
              {AVAILABILITY}
            </span>
          </span>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={`h-px w-5 bg-[color:var(--text-hi)] transition-transform duration-300 ${
              open ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-[color:var(--text-hi)] transition-transform duration-300 ${
              open ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.32, ease: EASE }}
            className="overflow-hidden border-t border-[color:var(--border)] bg-[color:var(--bg-0)]/95 backdrop-blur-md md:hidden"
          >
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: reduce ? 0 : 0.05,
                    delayChildren: reduce ? 0 : 0.06,
                  },
                },
              }}
              className="flex flex-col gap-1 px-6 py-4"
            >
              {NAV_LINKS.map((link) => {
                const isActive = active === link.href;
                return (
                  <motion.div
                    key={link.href}
                    variants={{
                      hidden: reduce ? { opacity: 0 } : { opacity: 0, x: -10 },
                      show: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: reduce ? 0 : 0.3, ease: EASE },
                      },
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex items-center gap-2.5 py-2 font-mono text-[15px] transition-colors hover:text-[color:var(--text-hi)] ${
                        isActive ? "text-[color:var(--text-hi)]" : "text-[color:var(--text)]"
                      }`}
                    >
                      <span
                        className={`h-px w-4 transition-all duration-300 ${
                          isActive ? "bg-[color:var(--accent)]" : "w-0 bg-transparent"
                        }`}
                        aria-hidden
                      />
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.span
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { duration: reduce ? 0 : 0.3 } },
                }}
                className="mt-2 flex items-center gap-2"
              >
                <span className="blink block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" aria-hidden />
                <span className="font-mono text-[12px] text-[color:var(--text-mid)]">{AVAILABILITY}</span>
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
