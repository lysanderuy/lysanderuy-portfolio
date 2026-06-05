"use client";

import Link from "next/link";
import { useMounted } from "@/hooks/useMounted";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { PageFooter } from "@/components/PageFooter";
import { ROLE_TITLE } from "@/lib/constants";

export default function Home() {
  const mounted = useMounted();

  return (
    <PageShell>
      <PageHeader
        label="Portfolio"
        leftLabel="Home"
        className={mounted ? "fade-1" : "opacity-0"}
      />

      <main className="relative z-10 flex-1 flex flex-col justify-center items-center px-14 py-10 gap-6">
        <h1
          className={`font-cormorant text-[#edf5a8] font-light text-[clamp(52px,6vw,96px)] leading-[0.92] ${
            mounted ? "fade-2" : "opacity-0"
          }`}
        >
          Lysander Uy
        </h1>
        <p className="text-[#a8c84a] text-[11px] tracking-[0.18em] uppercase text-center">
          {ROLE_TITLE}
        </p>
        <p className="text-[#c2d878] text-xs tracking-[0.14em] uppercase">Portfolio Sections</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-xl">
          {[
            { to: "/profile", label: "Profile" },
            { to: "/experience", label: "Experience" },
            { to: "/projects", label: "Projects" },
            { to: "/competitions", label: "Competitions" },
          ].map((item) => (
            <Link
              key={item.to}
              href={item.to}
              className="inline-flex items-center justify-center px-4 py-2 border border-[#6e8840] rounded-sm text-[10px] tracking-[0.2em] uppercase text-[#96b050] bg-transparent transition-colors hover:border-[#96b050] hover:text-[#d4ed60]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </main>

      <PageFooter className={mounted ? "fade-3" : "opacity-0"} />
    </PageShell>
  );
}
