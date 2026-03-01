import Link from "next/link";

const projectGroups = [
  {
    title: "Personal",
    items: [
      {
        name: "Klaro",
        url: "https://klaro.vercel.app/",
        preview:
          "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fklaro.vercel.app%2F?w=1200",
        stack: [
          "Next.js",
          "TypeScript",
          "Node.js",
          "Tailwind CSS",
          "shadcn/ui",
          "Firebase",
          "Prisma",
        ],
      },
      {
        name: "SproutSpot",
        url: "https://sproutspot.vercel.app/",
        preview:
          "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fsproutspot.vercel.app%2F?w=1200",
        stack: [
          "Next.js",
          "TypeScript",
          "Node.js",
          "Tailwind CSS",
          "shadcn/ui",
          "Supabase",
          "Prisma",
          "Gemini API",
        ],
      },
    ],
  },
  {
    title: "Contractual (Symph)",
    items: [
      {
        name: "CourtHub",
        url: "https://courthub.ph/",
        preview: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fcourthub.ph%2F?w=1200",
        stack: ["Next.js", "TypeScript", "NestJS", "TypeORM", "Firebase", "Supabase"],
      },
      {
        name: "FinSpend",
        url: "https://finspend-staging.as.r.appspot.com/",
        preview:
          "https://s.wordpress.com/mshots/v1/https%3A%2F%2Ffinspend-staging.as.r.appspot.com%2F?w=1200",
        stack: ["Next.js", "TypeScript", "NestJS", "TypeORM", "Firebase", "Supabase"],
      },
    ],
  },
];

export default function Projects() {
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
          background:
            "linear-gradient(160deg, #181d0c 0%, #222810 50%, #2c3515 100%)",
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
              Projects
            </span>
          </div>
        </header>
        <main className="relative z-10 flex-1 overflow-y-auto px-5 py-8 md:px-14 md:py-10">
          <h1
            className="text-[#edf5a8] font-light text-[clamp(42px,5vw,72px)] leading-[0.94]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Projects
          </h1>
          <p className="mt-3 text-[#96b050] text-[10px] uppercase tracking-[0.2em]">
            Personal and Contractual Work
          </p>

          <div className="mt-8 max-w-5xl space-y-7 pb-10">
            {projectGroups.map((group) => (
              <section
                key={group.title}
                className="rounded-xl border border-[#6e8840]/60 bg-[#232b12]/90 p-5"
              >
                <h2 className="text-[#edf5a8] text-sm uppercase tracking-[0.2em]">{group.title}</h2>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.items.map((project) => (
                    <a
                      key={project.name}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-lg border border-[#6e8840]/50 bg-[#1f2710] p-4 transition-colors hover:border-[#96b050]"
                    >
                      <div className="overflow-hidden rounded-md border border-[#6e8840]/40 bg-[#181d0c]">
                        <img
                          src={project.preview}
                          alt={`${project.name} preview`}
                          className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="mt-3 text-[#edf5a8] text-base">{project.name}</h3>
                        <span className="text-[#96b050] text-xs transition-colors group-hover:text-[#d4ed60]">
                          Open ↗
                        </span>
                      </div>
                      <p className="mt-3 text-[#96b050] text-[10px] uppercase tracking-[0.2em]">
                        Tech Stack
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-sm border border-[#6e8840]/60 px-2 py-1 text-[10px] text-[#c2d878] uppercase tracking-[0.12em]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            ))}
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
