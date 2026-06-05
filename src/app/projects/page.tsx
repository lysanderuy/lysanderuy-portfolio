"use client";

import Image from "next/image";
import { projects } from "@/data/projects";
import { useMounted } from "@/hooks/useMounted";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { PageFooter } from "@/components/PageFooter";

export default function Projects() {
  const mounted = useMounted();
  return (
    <PageShell>
      <PageHeader
        label="Projects"
        showBack
        className={mounted ? "fade-1" : "opacity-0"}
      />

      <main className="relative z-10 flex-1 overflow-y-auto px-5 py-8 md:px-14 md:py-12">
        <h1
          className={`font-cormorant text-[#edf5a8] font-light text-[clamp(36px,6vw,68px)] leading-[0.92] mb-10 md:mb-14 ${
            mounted ? "fade-2" : "opacity-0"
          }`}
        >
          Projects
        </h1>

        {/* Project cards */}
        <div className={`flex flex-col gap-5 pb-12 ${mounted ? "fade-3" : "opacity-0"}`}>
          {projects.map((project, i) => {
            const href = project.url ?? project.github ?? null;
            const isLive = !!project.url;
            const flip = i % 2 === 1;

            const card = (
              <div
                className="rounded-sm border border-[#6e8840]/25 overflow-hidden"
                style={{ background: "rgba(32, 44, 12, 0.72)" }}
              >
                {/* Top accent stripe */}
                <div className="h-[1.5px] w-full gradient-accent" />

                <div
                  className={`flex flex-col ${
                    flip ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  {/* Image panel */}
                  <div className="relative md:w-[46%] shrink-0 aspect-video overflow-hidden bg-[#0c1207]">
                    {project.preview ? (
                      <Image
                        src={project.preview}
                        alt={`${project.name} preview`}
                        fill
                        className="card-img object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 46vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-[#6e8840]/20 text-[10px] uppercase tracking-[0.3em]">
                          {project.name}
                        </span>
                      </div>
                    )}

                    {/* Hover overlay */}
                    {href && (
                      <div className="absolute inset-0 bg-[#0c1207]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="border border-[#d4ed60]/55 text-[#d4ed60] text-[10px] tracking-[0.3em] uppercase px-4 py-2">
                          {isLive ? "View Live ↗" : "View Code ↗"}
                        </span>
                      </div>
                    )}

                    {/* Right-edge vignette into content (desktop) */}
                    <div
                      className={`absolute inset-y-0 w-16 hidden md:block pointer-events-none ${
                        flip ? "left-0 bg-gradient-to-r" : "right-0 bg-gradient-to-l"
                      }`}
                      style={{
                        background: flip
                          ? "linear-gradient(to right, rgba(32,44,12,0.72), transparent)"
                          : "linear-gradient(to left, rgba(32,44,12,0.72), transparent)",
                      }}
                    />
                  </div>

                  {/* Content panel */}
                  <div className="flex flex-col justify-between flex-1 p-6 md:p-8 relative overflow-hidden">
                    {/* Ghost number */}
                    <span className="absolute right-4 bottom-2 font-cormorant text-[#3a5010]/18 text-[7.5rem] leading-none select-none pointer-events-none hidden md:block">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Top row */}
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-[#6e8840]/40 text-[9px] tracking-[0.3em] uppercase">
                          {String(i + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(projects.length).padStart(2, "0")}
                        </span>
                        {href && (
                          <span
                            className={`link-label flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase transition-colors ${
                              isLive ? "text-[#96b050]" : "text-[#6e8840]"
                            }`}
                          >
                            {isLive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#96b050] blink" />
                            )}
                            {isLive ? "Live" : "GitHub"}&nbsp;↗
                          </span>
                        )}
                      </div>

                      <h3 className="font-cormorant text-[#edf5a8] text-[clamp(24px,2.8vw,42px)] font-light leading-[1.05] mb-4">
                        {project.name}
                      </h3>

                      {project.description && (
                        <p className="text-[#8aaa50]/90 text-[11.5px] leading-[1.9] mb-6 max-w-[50ch] flex-1">
                          {project.description}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-[3px] text-[9.5px] tracking-[0.12em] uppercase rounded-sm border border-[#6e8840]/28 text-[#7a9040]/75"
                            style={{ background: "rgba(110,136,64,0.08)" }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );

            return href ? (
              <a
                key={project.name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="card group block"
              >
                {card}
              </a>
            ) : (
              <article key={project.name} className="card group">
                {card}
              </article>
            );
          })}
        </div>
      </main>

      <PageFooter className={mounted ? "fade-4" : "opacity-0"} />
    </PageShell>
  );
}
