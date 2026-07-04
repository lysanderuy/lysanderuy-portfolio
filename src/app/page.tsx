import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { StackSection } from "@/components/StackSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { EducationSection } from "@/components/EducationSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-[color:var(--bg-0)]">
      <SiteNav />
      <Hero />
      <AboutSection />
      <StackSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <SiteFooter />
      {/* Global analog grain — whisper-level texture over the whole site */}
      <div className="grain pointer-events-none fixed inset-0 z-[60]" aria-hidden />
    </main>
  );
}
