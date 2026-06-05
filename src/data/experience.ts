export type ExperienceEntry = {
  roleTitle: string;
  company: string;
  logo?: string;
  type: "INTERNSHIP" | "FREELANCE" | "";
  period: string;
  location: string;
  tech: string[];
  bullets: string[];
};

export const experienceEntries: ExperienceEntry[] = [
  {
    roleTitle: "Full Stack Developer",
    company: "Symph",
    logo: "/experience/symph-logo.png",
    type: "INTERNSHIP",
    period: "Feb 2026 – Jun 2026",
    location: "Cebu, Remote",
    tech: ["Next.js", "NestJS", "PostgreSQL", "Jest", "GCP"],
    bullets: [
      "Shipped features and bug fixes across a portfolio of 5 products spanning healthtech, sports, and AI, covering full-stack implementation from API to UI",
      "Implemented end-to-end testing with Jest across multiple products and contributed to deployment and release cycles on GCP",
      "Led facility outreach for CourtHub, visiting 5+ facilities to pitch and demo the platform, directly driving customer acquisition",
      "Produced short-form animated marketing videos using a multi-tool AI pipeline: Flow for image generation, ElevenLabs for voiceover, and Grok for image-to-video",
    ],
  },
  {
    roleTitle: "Mobile App Developer",
    company: "Focus Bear",
    logo: "/experience/focus-bear-logo.png",
    type: "INTERNSHIP",
    period: "Feb 2026 – May 2026",
    location: "Melbourne, Remote",
    tech: ["React Native", "iOS", "Android"],
    bullets: [
      "Developed and merged 5+ features for the Focus Bear mobile app, improving user experience across iOS and Android",
      "Identified and resolved bugs, wrote automated tests, and performed manual testing to ensure feature stability and reliability",
    ],
  },
  {
    roleTitle: "Full-Stack Developer",
    company: "Anek2",
    type: "FREELANCE",
    period: "Jan 2026 – Present",
    location: "Cebu",
    tech: ["Next.js", "NestJS", "PostgreSQL"],
    bullets: [
      "Developing a DOH Lab Form Automation system for medical technologists with parallel processing of lab results across multiple departments driven by physician requests",
      "Built PickASlot, a court booking system for a residential subdivision's pickleball court with public availability browsing and admin-managed reservation confirmation",
    ],
  },
];
