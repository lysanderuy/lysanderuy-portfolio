"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Container, SectionHeader, CTAButton, revealItem, revealViewport } from "@/components/Section";
import { webProjects, hardwareProjects, type Project } from "@/data/projects";

const GITHUB_URL = "https://github.com/lysanderuy";

/* Flagship rows enter from the side their image sits on, so the motion echoes
   the alternating layout. `custom` carries the direction (-1 = from left). */
const rowVariant: Variants = {
  hidden: (dir: number) => ({ opacity: 0, x: dir * 40, y: 8 }),
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

type LinkKind = "live" | "code" | "none";

function meta(project: Project) {
  const href = project.url ?? project.github;
  const kind: LinkKind = project.url ? "live" : project.github ? "code" : "none";
  const isRemotePreview = project.preview?.startsWith("http") ?? false;
  return { href, kind, isRemotePreview };
}

function num(i: number) {
  return String(i + 1).padStart(2, "0");
}

/* Live / Code marker with the site's ↗ affordance. Link-less builds show nothing. */
function StatusMark({ kind }: { kind: LinkKind }) {
  if (kind === "none") return null;
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[12px] text-[color:var(--text-mid)] transition-colors group-hover:text-[color:var(--accent-bright)]">
      {kind === "live" ? "Live" : "Code"}
      <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        ↗
      </span>
    </span>
  );
}

/* Plain-language project-type chip — quiet, no ornament. */
function TypeTag({ type }: { type: string }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--text-dim)]">
      {type}
    </span>
  );
}

/* Shared preview image with the palette-unifying green wash that ties web
   screenshots and device photos into one tone. */
function Preview({
  project,
  isRemotePreview,
  sizes,
  position = "object-top",
}: {
  project: Project;
  isRemotePreview: boolean;
  sizes: string;
  position?: string;
}) {
  return (
    <>
      {project.preview && (
        <Image
          src={project.preview}
          alt={`${project.name} preview`}
          fill
          unoptimized={isRemotePreview}
          sizes={sizes}
          className={`object-cover ${position} transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]`}
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 bg-[color:var(--bg-2)]/45 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-0"
        style={{ background: "linear-gradient(150deg, var(--glow) 0%, transparent 55%)" }}
        aria-hidden
      />
    </>
  );
}

/* Large row — alternating image / content, for the flagship products. */
function FlagshipRow({
  project,
  index,
  total,
  imageLeft,
  reduce,
}: {
  project: Project;
  index: number;
  total: number;
  imageLeft: boolean;
  reduce: boolean | null;
}) {
  const { href, kind, isRemotePreview } = meta(project);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      custom={imageLeft ? -1 : 1}
      variants={rowVariant}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={revealViewport}
      className="group grid grid-cols-1 overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] transition-colors duration-300 hover:border-[color:var(--border-strong)] md:grid-cols-2 md:items-stretch"
    >
      <div
        className={`relative aspect-[16/10] w-full overflow-hidden border-b border-[color:var(--border)] md:aspect-auto md:min-h-[360px] md:border-b-0 ${
          imageLeft ? "md:order-1 md:border-r" : "md:order-2 md:border-l"
        }`}
      >
        <Preview
          project={project}
          isRemotePreview={isRemotePreview}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div
        className={`flex flex-col justify-center p-7 md:p-10 lg:p-12 ${
          imageLeft ? "md:order-2" : "md:order-1"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <TypeTag type={project.type} />
          <span className="inline-flex items-center gap-3">
            <span className="font-mono text-[11px] text-[color:var(--text-dim)]">
              {num(index)} <span className="text-[color:var(--border-strong)]">/</span>{" "}
              {num(total - 1)}
            </span>
            <StatusMark kind={kind} />
          </span>
        </div>

        <h3 className="mt-6 text-[clamp(26px,3.2vw,36px)] font-semibold leading-[1.04] tracking-[-0.025em] text-[color:var(--text-hi)]">
          {project.name}
        </h3>

        {project.description && (
          <p className="mt-4 max-w-[48ch] text-[15px] leading-[1.65] text-[color:var(--text)]">
            {project.description}
          </p>
        )}

        <ul className="mt-7 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded border border-[color:var(--border)] px-2.5 py-1 font-mono text-[11px] text-[color:var(--text-mid)]"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </motion.a>
  );
}

/* Compact card — supporting builds in a two-up grid. Renders as a plain div
   when link-less (hardware with no repo). */
function CompactCard({
  project,
  label,
  reduce,
  imgPosition,
}: {
  project: Project;
  label: string;
  reduce: boolean | null;
  imgPosition?: string;
}) {
  const { href, kind, isRemotePreview } = meta(project);

  const body = (
    <>
      <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-[color:var(--border)]">
        <Preview
          project={project}
          isRemotePreview={isRemotePreview}
          sizes="(max-width: 640px) 100vw, 50vw"
          position={imgPosition}
        />
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[12px] tracking-[0.1em] text-[color:var(--text-dim)]">
            {label}
          </span>
          <StatusMark kind={kind} />
        </div>

        <h3 className="mt-4 text-[21px] font-semibold leading-tight tracking-[-0.02em] text-[color:var(--text-hi)]">
          {project.name}
        </h3>

        <div className="mt-3">
          <TypeTag type={project.type} />
        </div>

        {project.description && (
          <p className="mt-3 text-[14px] leading-[1.6] text-[color:var(--text)]">
            {project.description}
          </p>
        )}

        <ul className="mt-auto flex flex-wrap gap-2 pt-6">
          {project.stack.slice(0, 6).map((tech) => (
            <li
              key={tech}
              className="rounded border border-[color:var(--border)] px-2.5 py-1 font-mono text-[11px] text-[color:var(--text-mid)]"
            >
              {tech}
            </li>
          ))}
          {project.stack.length > 6 && (
            <li className="px-1.5 py-1 font-mono text-[11px] text-[color:var(--text-dim)]">
              +{project.stack.length - 6}
            </li>
          )}
        </ul>
      </div>
    </>
  );

  const shared =
    "group flex flex-col overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] transition-colors duration-300 hover:border-[color:var(--border-strong)]";

  if (!href) {
    return (
      <motion.div
        variants={cardVariant}
        initial={reduce ? "show" : "hidden"}
        whileInView="show"
        viewport={revealViewport}
        className={shared}
      >
        {body}
      </motion.div>
    );
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variants={cardVariant}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={revealViewport}
      className={shared}
    >
      {body}
    </motion.a>
  );
}

/* Small labelled rail separating the section's groups. */
function Rail({ label, count }: { label: string; count?: number }) {
  return (
    <div className="flex items-center gap-4">
      <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-dim)]">
        {label}
      </span>
      <span className="h-px w-full bg-[color:var(--border)]" aria-hidden />
      {count !== undefined && (
        <span className="whitespace-nowrap font-mono text-[10px] tabular-nums text-[color:var(--text-dim)]">
          {String(count).padStart(2, "0")}
        </span>
      )}
    </div>
  );
}

export function ProjectsSection() {
  const reduce = useReducedMotion();

  const featured = webProjects.filter((p) => p.featured);
  const supporting = webProjects.filter((p) => !p.featured);

  return (
    <section id="work" className="relative bg-[color:var(--bg-0)] py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-[color:var(--border-strong)] to-transparent"
        aria-hidden
      />
      <Container className="relative z-10">
        <SectionHeader
          index="05"
          label="Work"
          title="Things I've built"
          intro="Production web apps shipped to real users, and hardware I designed and fabricated end to end. Work that spans the browser and the physical world."
        />

        {/* Web & mobile products */}
        <div className="mt-14 md:mt-16">
          <Rail label="Web & Mobile" count={webProjects.length} />

          <div className="mt-8 flex flex-col gap-6 overflow-x-clip md:gap-8">
            {featured.map((project, i) => (
              <FlagshipRow
                key={project.name}
                project={project}
                index={i}
                total={webProjects.length}
                imageLeft={i % 2 === 0}
                reduce={reduce}
              />
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-8">
            {supporting.map((project, i) => (
              <CompactCard
                key={project.name}
                project={project}
                label={num(featured.length + i)}
                reduce={reduce}
              />
            ))}
          </div>
        </div>

        {/* Hardware */}
        <div className="mt-16 md:mt-24">
          <Rail label="Hardware" count={hardwareProjects.length} />

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {hardwareProjects.map((project, i) => (
              <CompactCard
                key={project.name}
                project={project}
                label={num(i)}
                reduce={reduce}
                imgPosition="object-center"
              />
            ))}
          </div>
        </div>

        <motion.div
          variants={revealItem}
          initial={reduce ? "show" : "hidden"}
          whileInView="show"
          viewport={revealViewport}
          className="mt-12 flex justify-center"
        >
          <CTAButton href={GITHUB_URL} variant="secondary">
            More on GitHub
          </CTAButton>
        </motion.div>
      </Container>
    </section>
  );
}
