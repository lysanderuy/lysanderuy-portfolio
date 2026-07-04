"use client";

import type { IconType } from "react-icons";
import { FaLinkedinIn, FaGithub, FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa6";
import { motion, useReducedMotion } from "motion/react";
import { Container, CTAButton, revealContainer, revealItem, revealViewport } from "@/components/Section";
import { profileLinks } from "@/data/profile";
import { EMAIL, LOCATION } from "@/lib/constants";

const socialIcons: Record<string, IconType> = {
  LinkedIn: FaLinkedinIn,
  GitHub: FaGithub,
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
  Email: FaEnvelope,
};

// Near-black base with a faint warm-green undertone (stays in the palette).
const BASE = "#0a0c06";

export function SiteFooter() {
  const reduce = useReducedMotion();
  const socials = profileLinks.filter((l) => l.label !== "Email");
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative bg-[color:var(--bg-0)]">
      {/* Invitation — flows on the page background */}
      <section className="relative overflow-hidden bg-[color:var(--bg-2)] py-24 md:py-32">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-[color:var(--border-strong)] to-transparent"
          aria-hidden
        />
        {/* Warm ambient glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[42vh] w-[80vw] max-w-[58rem] -translate-x-1/2 -translate-y-1/2"
          style={{ background: "radial-gradient(ellipse at center, var(--glow) 0%, transparent 70%)" }}
          aria-hidden
        />

        <Container className="relative z-10">
          <motion.div
            variants={revealContainer}
            initial={reduce ? "show" : "hidden"}
            whileInView="show"
            viewport={revealViewport}
            className="flex flex-col items-center text-center"
          >
            <motion.p
              variants={revealItem}
              className="flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.22em] text-[color:var(--text-mid)]"
            >
              <span className="inline-block h-[7px] w-[7px] bg-[color:var(--accent)]" aria-hidden />
              Get in touch
            </motion.p>

            <motion.h2
              variants={revealItem}
              className="mt-7 max-w-[16ch] text-[clamp(40px,7vw,88px)] font-semibold leading-[0.95] tracking-[-0.04em] text-[color:var(--text-hi)]"
            >
              Let&apos;s build something together.
            </motion.h2>

            <motion.p
              variants={revealItem}
              className="mt-7 max-w-[46ch] text-[17px] leading-[1.7] text-[color:var(--text)]"
            >
              Have a product in mind, a role to fill, or just want to talk shop? My inbox is always
              open, and I usually reply within a day or two.
            </motion.p>

            <motion.div variants={revealItem} className="mt-10">
              <CTAButton
                href={`mailto:${EMAIL}`}
                variant="primary"
                arrow={false}
                icon={<FaEnvelope className="h-4 w-4" />}
              >
                Say hello
              </CTAButton>
            </motion.div>

            <motion.p variants={revealItem} className="mt-6 font-mono text-[13px] text-[color:var(--text-mid)]">
              or reach me at{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="text-[color:var(--text-hi)] underline decoration-[color:var(--border-strong)] underline-offset-4 transition-colors hover:decoration-[color:var(--accent)]"
              >
                {EMAIL}
              </a>
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Chrome — near-black base plate */}
      <div className="relative" style={{ backgroundColor: BASE }}>
        <Container>
          {/* Brand + socials below */}
          <div className="py-10">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-md border border-[color:var(--border-strong)] bg-[color:var(--bg-1)] font-mono text-[14px] font-semibold tracking-[-0.02em] text-[color:var(--text-hi)]">
                LU
              </span>
              <div className="leading-tight">
                <div className="font-mono text-[15px] font-medium text-[color:var(--text-hi)]">
                  Lysander Uy
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--text-dim)]">
                  Full Stack &amp; Mobile Dev
                </div>
              </div>
            </div>

            <p className="mt-5 max-w-[36ch] text-[14px] leading-[1.65] text-[color:var(--text-mid)]">
              Shipping products by day, line-following robots by night.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {socials.map((link) => {
                const Icon = socialIcons[link.label];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="group flex h-10 w-10 items-center justify-center rounded-lg border border-[color:var(--border)] bg-[color:var(--bg-1)] transition-colors duration-300 hover:border-[color:var(--border-strong)]"
                  >
                    {Icon && (
                      <Icon className="h-[17px] w-[17px] text-[color:var(--text-mid)] transition-colors duration-300 group-hover:text-[color:var(--accent-bright)]" aria-hidden />
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col gap-2 border-t border-[color:var(--border)] py-6 font-mono text-[12px] text-[color:var(--text-dim)] sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} · {LOCATION} · All rights reserved.</p>
            <p>Built with Next.js &amp; Tailwind</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
