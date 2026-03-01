"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Competition = {
  title: string;
  category: string;
  result: string;
  issuer: string;
  issuedAt: string;
  association: string;
  summary: string;
  photos: { src: string; alt: string }[];
};

const competitions: Competition[] = [
  {
    title: "Roboquest 2025 | Advanced Line Following",
    category: "Advanced Line Following",
    result: "Participant",
    issuer: "E.M. Power Robotics",
    issuedAt: "Dec 2025",
    association: "University of San Carlos",
    summary: "Advanced line following category entry.",
    photos: [
      {
        src: "/competitions/roboquest-2025-line-follower-robot.jpg",
        alt: "Line Follower Robot",
      },
      {
        src: "/competitions/roboquest-2025-team-usc-tc.jpg",
        alt: "Team USC-TC",
      },
    ],
  },
  {
    title: "SolidWorks Model Mania 2025: Academe 4",
    category: "CAD Modeling",
    result: "Participant",
    issuer:
      "Computrends Systems Technology Inc. - Top SOLIDWORKS Reseller in PH",
    issuedAt: "Sep 2025",
    association: "University of San Carlos",
    summary: "Academe 4 division model assembly challenge entry.",
    photos: [
      {
        src: "/competitions/model-mania-2025-final-assembly.jpg",
        alt: "Final Assembly",
      },
      {
        src: "/competitions/model-mania-2025-team-usc-cpe.jpg",
        alt: "Team USC (CpE)",
      },
    ],
  },
  {
    title: "Robotics Summer Cup 2025 (RSC1) VisMin Leg | Advanced Line Following",
    category: "Advanced Line Following",
    result: "4th Place",
    issuer: "Pilipinas Robosports Tournament & E.M. Power Robotics",
    issuedAt: "May 2025",
    association: "University of San Carlos",
    summary:
      "Won 4th Place in Advanced Line Following Category during the RSC1 VisMin Leg held in CIT-U Danao, Cebu City.",
    photos: [
      { src: "/competitions/rsc1-line-following-robot.jpg", alt: "Line Following Robot" },
      { src: "/competitions/rsc1-team-usc-tc.jpg", alt: "Team USC-TC" },
      { src: "/competitions/rsc1-team-canuy.jpg", alt: "Team CanUy" },
    ],
  },
  {
    title: "USC Robocon 2025 | Line Following",
    category: "Line Following",
    result: "2nd Place",
    issuer: "University of San Carlos",
    issuedAt: "Apr 2025",
    association: "University of San Carlos",
    summary:
      "Won 2nd Place in Line Following Category during the USC Robocon 2025 held in GMALL, Cebu City.",
    photos: [
      {
        src: "/competitions/usc-robocon-2025-line-following-robot.jpg",
        alt: "Line Following Robot",
      },
      {
        src: "/competitions/usc-robocon-2025-team-pcbabies-3-0-2.jpg",
        alt: "Team PCBabies 3.0.2",
      },
      {
        src: "/competitions/usc-robocon-2025-certificates.jpg",
        alt: "Certificates",
      },
    ],
  },
  {
    title: "ICpEP - SU Robotix! 2025 | Line Following",
    category: "Line Following",
    result: "4th Place",
    issuer: "ICpEP - SU",
    issuedAt: "Mar 2025",
    association: "University of San Carlos",
    summary:
      "Won 4th Place in Line Following Category during the Robotix! 2025 held in Robinsons, Dumaguete City.",
    photos: [
      {
        src: "/competitions/su-robotix-2025-line-following-robot.jpg",
        alt: "Line Following Robot",
      },
      {
        src: "/competitions/su-robotix-2025-team-becanuy.jpg",
        alt: "Team BeCanUy",
      },
    ],
  },
  {
    title: "Komsai Week Hackathon 2025",
    category: "Hackathon",
    result: "Participant",
    issuer: "University of the Philippines Cebu x AI GEN Cebu",
    issuedAt: "Mar 2025",
    association: "University of San Carlos",
    summary: "Komsai Week hackathon team entry.",
    photos: [
      {
        src: "/competitions/komsai-week-2025-team-techy-imnida.jpg",
        alt: "Team Techy-Imnida",
      },
      {
        src: "/competitions/komsai-week-2025-certificates.jpg",
        alt: "Certificates",
      },
    ],
  },
  {
    title: "USC Formula 01 | Line Following",
    category: "Line Following",
    result: "2nd Place",
    issuer: "University of San Carlos",
    issuedAt: "Oct 2024",
    association: "University of San Carlos",
    summary:
      "Won 2nd Place in Line Following Competition during USC Formula 01 held in USC-TC, Cebu City.",
    photos: [
      {
        src: "/competitions/usc-formula-01-line-following-robot.jpg",
        alt: "Line Following Robot",
      },
      {
        src: "/competitions/usc-formula-01-team-ruposuy.jpg",
        alt: "Team RuPosUy",
      },
    ],
  },
  {
    title: "Philippine Startup Challenge 8 | Regional Pitching Competition",
    category: "Startup Pitching",
    result: "Top 25 Regional Qualifier",
    issuer:
      "Department of Information and Communications Technology (DICT)",
    issuedAt: "Oct 2023",
    association: "University of San Carlos",
    summary:
      "Recognized as one of the Top 25 Regional Qualifiers in the Philippine Startup Challenge 8 - Central Visayas Regional Pitching Competition. Represented the University of San Carlos as a Computer Engineering team and competed against student innovators across Region 7.",
    photos: [
      { src: "/competitions/psc8-certificates.jpg", alt: "Certificates" },
      { src: "/competitions/psc8-team-usc-tc.jpg", alt: "Team USC-TC" },
    ],
  },
];

function CompetitionCard({
  item,
  cardClassName,
}: {
  item: Competition;
  cardClassName: string;
}) {
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  return (
    <article className={`${cardClassName} h-full overflow-hidden`}>
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-3 md:gap-5 h-full">
        <div>
          <div className="overflow-hidden rounded-lg border border-[#6e8840]/50 bg-[#1b220d]">
            <img
              src={item.photos[selectedPhoto].src}
              alt={item.photos[selectedPhoto].alt}
              className="w-full h-[150px] sm:h-[170px] md:h-[240px] object-cover"
            />
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {item.photos.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setSelectedPhoto(i)}
                className={`relative shrink-0 rounded-md overflow-hidden border ${
                  i === selectedPhoto ? "border-[#96b050]" : "border-[#6e8840]/50"
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-16 h-12 sm:w-20 sm:h-14 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex h-full flex-col min-h-0 overflow-hidden pr-1">
          <div className="min-h-0 overflow-hidden">
            <h2 className="text-[#edf5a8] text-lg leading-tight line-clamp-2 md:line-clamp-none">
              {item.title}
            </h2>
            <p className="mt-2 text-[#96b050] text-[10px] uppercase tracking-[0.2em]">
              Issued by {item.issuer} · {item.issuedAt}
            </p>
            <p className="mt-1 text-[#a8c84a] text-xs">Associated with {item.association}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <p className="text-[#96b050] text-[10px] uppercase tracking-[0.2em]">
                Result
                <span className="block text-[#c2d878] text-xs normal-case tracking-normal mt-1">
                  {item.result}
                </span>
              </p>
              <p className="text-[#96b050] text-[10px] uppercase tracking-[0.2em]">
                Category
                <span className="block text-[#c2d878] text-xs normal-case tracking-normal mt-1">
                  {item.category}
                </span>
              </p>
            </div>
            <div className="hidden md:block mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
              <p className="text-[#c2d878] text-sm leading-relaxed">{item.summary}</p>
            </div>
          </div>
          <p className="mt-4 md:mt-auto pt-0 md:pt-5 shrink-0 text-[#96b050] text-[10px] uppercase tracking-[0.2em]">
            Photo {selectedPhoto + 1} of {item.photos.length}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Competitions() {
  const [deckPosition, setDeckPosition] = useState(0);
  const [isDeckDragging, setIsDeckDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const deckStartXRef = useRef(0);
  const deckStartYRef = useRef(0);
  const deckStartPositionRef = useRef(0);
  const deckTouchSwipingRef = useRef(false);
  const deckWheelSnapTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setDeckPosition(0);
    setIsDeckDragging(false);
    const media = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const maxDeckIndex = Math.max(competitions.length - 1, 0);
  const clampDeckPosition = (value: number) => Math.min(maxDeckIndex, Math.max(0, value));
  const snapDeckToClosest = () => {
    setDeckPosition((prev) => clampDeckPosition(Math.round(prev)));
  };

  const onDeckPointerDown = (clientX: number) => {
    deckStartXRef.current = clientX;
    deckStartPositionRef.current = deckPosition;
    setIsDeckDragging(true);
  };

  const onDeckPointerMove = (clientX: number) => {
    if (!isDeckDragging) return;
    const deltaX = deckStartXRef.current - clientX;
    const cardsMoved = deltaX / (isMobile ? 320 : 560);
    setDeckPosition(clampDeckPosition(deckStartPositionRef.current + cardsMoved));
  };

  const onDeckPointerUp = () => {
    if (!isDeckDragging) return;
    setIsDeckDragging(false);
    snapDeckToClosest();
  };

  const onDeckTouchStart = (clientX: number, clientY: number) => {
    onDeckPointerDown(clientX);
    deckStartYRef.current = clientY;
    deckTouchSwipingRef.current = false;
  };

  const onDeckTouchMove = (
    clientX: number,
    clientY: number,
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    if (!isDeckDragging) return;
    const deltaXAbs = Math.abs(deckStartXRef.current - clientX);
    const deltaYAbs = Math.abs(deckStartYRef.current - clientY);

    if (!deckTouchSwipingRef.current) {
      if (deltaXAbs > 8 && deltaXAbs > deltaYAbs) {
        deckTouchSwipingRef.current = true;
      } else if (deltaYAbs > deltaXAbs) {
        return;
      }
    }

    event.preventDefault();
    onDeckPointerMove(clientX);
  };

  const onDeckTouchEnd = () => {
    deckTouchSwipingRef.current = false;
    onDeckPointerUp();
  };

  const onDeckWheel = (deltaY: number) => {
    if (Math.abs(deltaY) < 2) return;
    setDeckPosition((prev) => clampDeckPosition(prev + deltaY * 0.0028));
    if (deckWheelSnapTimerRef.current) {
      window.clearTimeout(deckWheelSnapTimerRef.current);
    }
    deckWheelSnapTimerRef.current = window.setTimeout(() => {
      snapDeckToClosest();
    }, 130);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Cormorant+Garamond:wght@300;400;600;700&display=swap');
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.25} }
        .blink  { animation: blink 2.5s infinite; }
        .noise  { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); opacity:0.18; }
      `}</style>
      <div
        className="w-screen h-screen overflow-hidden flex flex-col relative"
        style={{
          background: "linear-gradient(160deg, #181d0c 0%, #222810 50%, #2c3515 100%)",
          fontFamily: "'DM Mono', monospace",
        }}
      >
        <div className="noise absolute inset-0 pointer-events-none z-0" />
        <header className="relative z-10 flex items-center justify-between px-5 py-5 md:px-14 md:py-7 border-b border-[#6e8840]/30">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-2 py-1 border border-[#6e8840] text-[#96b050] text-[10px] uppercase tracking-[0.2em] rounded-sm hover:bg-[#96b050]/20 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back
          </Link>
          <div className="flex items-center gap-2">
            <span
              className="blink w-1.5 h-1.5 rounded-full inline-block"
              style={{ background: "#96b050", boxShadow: "0 0 8px #96b050" }}
            />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#96b050]">
              Competitions
            </span>
          </div>
        </header>
        <main className="relative z-10 flex-1 overflow-hidden px-5 pt-5 pb-4 md:px-14 md:py-8">
          <h1
            className="text-[#edf5a8] font-light text-[clamp(42px,5vw,72px)] leading-[0.94]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Competitions
          </h1>
          <div className="mt-4 md:mt-8 max-w-5xl relative">
            <div
              className="relative h-[calc(100svh-195px)] md:h-[500px]"
              onWheel={(event) => {
                event.preventDefault();
                onDeckWheel(event.deltaY);
              }}
            >
                <div
                  className={`absolute inset-x-0 top-8 md:top-8 z-30 flex justify-center select-none ${
                    isDeckDragging ? "cursor-grabbing" : "cursor-grab"
                  }`}
                  style={{ userSelect: "none", touchAction: "none" }}
                  onPointerDown={(event) => {
                    event.preventDefault();
                    event.currentTarget.setPointerCapture(event.pointerId);
                    onDeckPointerDown(event.clientX);
                  }}
                  onPointerMove={(event) => onDeckPointerMove(event.clientX)}
                  onPointerUp={onDeckPointerUp}
                  onPointerCancel={onDeckPointerUp}
                  onPointerLeave={onDeckPointerUp}
                  onTouchStart={(event) => {
                    if (event.touches.length === 0) return;
                    onDeckTouchStart(event.touches[0].clientX, event.touches[0].clientY);
                  }}
                  onTouchMove={(event) => {
                    if (event.touches.length === 0) return;
                    onDeckTouchMove(
                      event.touches[0].clientX,
                      event.touches[0].clientY,
                      event
                    );
                  }}
                  onTouchEnd={onDeckTouchEnd}
                  onTouchCancel={onDeckTouchEnd}
                >
                  <div className="relative w-[90vw] max-w-[980px] h-[calc(100svh-260px)] md:h-[390px]">
                    {competitions.map((item, index) => {
                      const rel = index - deckPosition;
                      if (Math.abs(rel) > 2.4) return null;
                      const abs = Math.abs(rel);
                      const isFront = abs < 0.35;
                      return (
                        <div
                          key={item.title}
                          className="absolute left-1/2 top-0 h-full transition-[transform,opacity,filter] duration-280"
                          style={{
                            transform: `translateX(calc(-50% + ${
                              rel * (isMobile ? 280 : 430)
                            }px)) translateY(${
                              abs * (isMobile ? 10 : 14)
                            }px) scale(${1 - abs * 0.08}) rotate(${rel * -1.6}deg)`,
                            opacity: Math.max(0.1, 1 - abs * 0.58),
                            filter: isFront
                              ? "drop-shadow(0 18px 30px rgba(0,0,0,0.28))"
                              : `blur(${Math.min(2.2, abs * 1.15)}px) saturate(0.62)`,
                            zIndex: 40 - Math.round(abs * 10),
                            transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)",
                            pointerEvents: isFront ? "auto" : "none",
                            touchAction: "none",
                          }}
                        >
                          <CompetitionCard
                            item={item}
                            cardClassName="w-[90vw] max-w-[980px] rounded-xl border border-[#6e8840]/60 bg-[#232b12]/75 p-3 md:p-5"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="hidden md:flex absolute inset-x-0 bottom-4 z-40 items-center justify-center gap-5">
                  <button
                    type="button"
                    onClick={() =>
                      setDeckPosition((prev) => clampDeckPosition(Math.round(prev) - 1))
                    }
                    className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] rounded-sm border border-[#6e8840] text-[#96b050] hover:border-[#96b050] hover:text-[#d4ed60] transition-colors"
                  >
                    Prev
                  </button>
                  <p className="text-[#96b050] text-[10px] uppercase tracking-[0.2em]">
                    Card {Math.round(deckPosition) + 1} of {competitions.length}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setDeckPosition((prev) => clampDeckPosition(Math.round(prev) + 1))
                    }
                    className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] rounded-sm border border-[#6e8840] text-[#96b050] hover:border-[#96b050] hover:text-[#d4ed60] transition-colors"
                  >
                    Next
                  </button>
                </div>
            </div>
          </div>
        </main>
        <footer className="relative z-10 flex items-center justify-between px-5 py-4 md:px-14 md:py-5 border-t border-[#6e8840]/20">
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#526630]">
            Full Stack & Mobile Application Developer
          </span>
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#526630]">
            {new Date().getFullYear()}
          </span>
        </footer>
      </div>
    </>
  );
}
