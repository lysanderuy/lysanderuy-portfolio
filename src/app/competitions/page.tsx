"use client";

import { useState } from "react";
import Image from "next/image";
import { competitions, type Competition } from "@/data/competitions";
import { useMounted } from "@/hooks/useMounted";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { PageFooter } from "@/components/PageFooter";

function resultBadgeClass(result: string) {
  const r = result.toLowerCase();
  if (r.includes("1st")) return "bg-[#7a6010]/80 border-[#c9971a] text-[#ffd95a]";
  if (r.includes("2nd")) return "bg-[#2e3a40]/80 border-[#8ea5b0] text-[#c8dce6]";
  if (r.includes("3rd")) return "bg-[#5a3515]/80 border-[#b07040] text-[#e8a870]";
  if (r.includes("4th") || r.includes("top") || r.includes("qualifier") || r.includes("finalist"))
    return "bg-[#1a2a1a]/80 border-[#6e8840] text-[#96b050]";
  return "bg-[#141810]/80 border-[#3a4520]/80 text-[#526630]";
}

function CompetitionCard({ item }: { item: Competition }) {
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  return (
    <article
      className="card group rounded-sm border border-[#6e8840]/25 overflow-hidden flex flex-col"
      style={{ background: "rgba(32, 44, 12, 0.72)" }}
    >
      {/* Animated accent bar */}
      <div className="h-[1.5px] w-full overflow-hidden shrink-0">
        <div className="h-full w-full gradient-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
      </div>

      {/* Letterbox photo */}
      <div className="relative aspect-[16/7] overflow-hidden bg-[#0c1207] shrink-0">
        <Image
          src={item.photos[selectedPhoto].src}
          alt={item.photos[selectedPhoto].alt}
          fill
          className="card-img object-cover object-center"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1207]/40 to-transparent pointer-events-none" />

        {/* Badges overlaid on photo */}
        <div className="absolute top-2.5 left-3 right-3 flex items-start justify-between gap-2">
          <span
            className={`inline-flex items-center px-2 py-[3px] rounded-sm text-[9px] uppercase tracking-[0.16em] border backdrop-blur-sm ${resultBadgeClass(item.result)}`}
          >
            {item.result}
          </span>
          <span className="inline-flex items-center px-2 py-[3px] rounded-sm text-[9px] uppercase tracking-[0.13em] border border-[#6e8840]/45 text-[#6e8840] bg-[#0c1207]/70 backdrop-blur-sm">
            {item.category}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="px-4 pt-3.5 pb-4 flex flex-col gap-1">
        <h2 className="font-cormorant text-[#edf5a8] text-[clamp(15px,1.6vw,19px)] font-light leading-snug line-clamp-2">
          {item.title}
        </h2>
        <p className="text-[#96b050] text-[9px] uppercase tracking-[0.16em] line-clamp-1">
          {item.issuer}
        </p>
        <p className="text-[#6e8840]/50 text-[9px] tracking-[0.07em]">
          {item.issuedAt} · {item.association}
        </p>
      </div>

      {/* Thumbnail strip */}
      {item.photos.length > 1 && (
        <div className="flex items-center gap-1.5 px-4 pb-3.5 pt-1 border-t border-[#6e8840]/10">
          {item.photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setSelectedPhoto(i)}
              className={`shrink-0 rounded-sm overflow-hidden border transition-colors duration-150 ${
                i === selectedPhoto
                  ? "border-[#96b050]"
                  : "border-[#6e8840]/30 hover:border-[#6e8840]"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={52}
                height={36}
                className="w-10 h-7 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </article>
  );
}

export default function Competitions() {
  const mounted = useMounted();

  return (
    <PageShell>
      <PageHeader
        label="Competitions"
        showBack
        className={mounted ? "fade-1" : "opacity-0"}
      />

      <main className="relative z-10 flex-1 overflow-y-auto px-5 py-8 md:px-14 md:py-12">
        <h1
          className={`font-cormorant text-[#edf5a8] font-light text-[clamp(36px,6vw,68px)] leading-[0.92] mb-10 md:mb-14 ${
            mounted ? "fade-2" : "opacity-0"
          }`}
        >
          Competitions
        </h1>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-4 pb-12 ${
            mounted ? "fade-3" : "opacity-0"
          }`}
        >
          {competitions.map((item) => (
            <CompetitionCard key={item.title} item={item} />
          ))}
        </div>
      </main>

      <PageFooter className={mounted ? "fade-4" : "opacity-0"} />
    </PageShell>
  );
}
