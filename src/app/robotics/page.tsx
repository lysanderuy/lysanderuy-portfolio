"use client";

import { useMounted } from "@/hooks/useMounted";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { PageFooter } from "@/components/PageFooter";

export default function Robotics() {
  const mounted = useMounted();

  return (
    <PageShell>
      <PageHeader
        label="Robotics"
        showBack
        className={mounted ? "fade-1" : "opacity-0"}
      />

      <main className="relative z-10 flex-1 overflow-y-auto px-5 py-8 md:px-14 md:py-12">
        <h1
          className={`font-cormorant text-[#edf5a8] font-light text-[clamp(36px,6vw,68px)] leading-[0.92] mb-10 md:mb-14 ${
            mounted ? "fade-2" : "opacity-0"
          }`}
        >
          Robotics
        </h1>
        <div
          className={`max-w-2xl rounded-sm border border-[#6e8840]/25 p-5 ${
            mounted ? "fade-3" : "opacity-0"
          }`}
          style={{ background: "rgba(32, 44, 12, 0.72)" }}
        >
          <p className="text-[#96b050] text-[10px] uppercase tracking-[0.2em]">Planned Section</p>
          <p className="text-[#c2d878] text-sm mt-3 leading-relaxed">
            Add robotics portfolio content here: hardware builds, sensors, control logic, CAD, and demos.
          </p>
        </div>
      </main>

      <PageFooter className={mounted ? "fade-4" : "opacity-0"} />
    </PageShell>
  );
}
