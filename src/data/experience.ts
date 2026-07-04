export type ExperienceEntry = {
  roleTitle: string;
  company: string;
  logo?: string;
  type: "INTERNSHIP" | "FREELANCE" | "";
  period: string;
  location: string;
  bullets: string[];
};

export const experienceEntries: ExperienceEntry[] = [
  {
    roleTitle: "Full Stack Developer Intern",
    company: "Symph",
    logo: "/experience/symph-logo.png",
    type: "INTERNSHIP",
    period: "Feb 2026 – Jun 2026",
    location: "Mountain View, CA (Remote)",
    bullets: [
      "Shipped features and bug fixes across a portfolio of 5 products spanning healthtech, sports, and AI, covering full-stack implementation from API to UI",
      "Implemented end-to-end testing with Jest across multiple products and contributed to deployment and release cycles on GCP",
      "Led facility outreach for CourtHub, visiting 5+ facilities to pitch and demo the platform, directly driving customer acquisition",
      "Produced short-form animated marketing videos using a multi-tool AI pipeline: Flow for image generation, ElevenLabs for voiceover, and Grok for image-to-video",
    ],
  },
  {
    roleTitle: "Mobile App Developer Intern",
    company: "Focus Bear",
    logo: "/experience/focus-bear-logo.png",
    type: "INTERNSHIP",
    period: "Feb 2026 – May 2026",
    location: "Melbourne, VIC (Remote)",
    bullets: [
      "Developed and merged 5+ features for the Focus Bear mobile app, improving user experience across iOS and Android",
      "Identified and resolved bugs, wrote automated tests, and performed manual testing to ensure feature stability and reliability",
    ],
  },
  {
    roleTitle: "Freelance Full-Stack Developer",
    company: "Independent",
    type: "FREELANCE",
    period: "2024 – Present",
    location: "Cebu",
    bullets: [
      "Developing a DOH Lab Form Automation system for medical technologists with parallel processing of lab results across multiple departments driven by physician requests",
      "Built PickASlot, a court booking system for a residential subdivision in Lapu-Lapu, Cebu with public availability browsing and admin-managed reservation confirmation, now in talks to expand to more courts under construction",
      "Built BallRuns, a real-time pickup basketball app for a local ball club in Cebu with live player queues, host-managed teams, and instant score updates",
    ],
  },
  {
    roleTitle: "Freelance Embedded / Hardware Developer",
    company: "Independent",
    type: "FREELANCE",
    period: "2024 – Present",
    location: "Cebu",
    bullets: [
      "Designed the complete electronics and firmware for an automated medical glove-doffing system, commissioned by a group of students, driving an Arduino with a CNC shield to coordinate stepper motors, servos, and vacuum actuation for a hands-free sequence that grips, stretches, and peels the glove off the hand",
    ],
  },
];
