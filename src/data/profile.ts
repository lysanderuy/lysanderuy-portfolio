export type ProfileLink = {
  label: string;
  href: string;
};

export type StackGroup = {
  label: string;
  items: string[];
};

export const bio: string[] = [
  "I'm a full-stack developer from Cebu with 2+ years of experience shipping production software. I'm at home across the whole path of a product, from the database schema and API design down to the interaction details users actually feel.",
  "I've shipped features across a portfolio of production apps at Symph, built and merged mobile work for Focus Bear, and take on freelance builds of my own.",
  "Away from the editor I compete in robotics and tinker with hardware and embedded systems, the same curiosity that keeps the software work honest.",
];

export const resumeUrl = "https://flowcv.com/resume/lvsbfnh5fge5";

export const aboutFacts: { label: string; value: string }[] = [
  { label: "Location", value: "Cebu, Philippines" },
  { label: "Currently", value: "Open to work" },
  { label: "Focus", value: "Full-stack web & mobile" },
  { label: "Off-screen", value: "Robotics · Hardware" },
];

export const profileLinks: ProfileLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/lysanderuy" },
  { label: "GitHub", href: "https://github.com/lysanderuy" },
  { label: "Facebook", href: "https://www.facebook.com/lysander.uy" },
  { label: "Instagram", href: "https://www.instagram.com/uy_lysan" },
  { label: "Email", href: "mailto:lysander.uy@gmail.com" },
];

export const stackGroups: StackGroup[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Kotlin", "Rust", "Java", "C/C++", "PHP", "SQL"],
  },
  {
    label: "Web & Mobile",
    items: ["Next.js", "React", "NestJS", "Node.js", "Tailwind CSS", "React Native", "Expo"],
  },
  {
    label: "Databases & ORMs",
    items: ["PostgreSQL", "MySQL", "SQLite", "Prisma", "TypeORM", "Drizzle"],
  },
  {
    label: "Cloud & DevOps",
    items: ["GCP", "Supabase", "Firebase", "Docker", "GitHub Actions"],
  },
  {
    label: "AI",
    items: ["PyTorch", "TensorFlow", "OpenCV", "Detectron2", "Grok", "Flow", "ElevenLabs"],
  },
  {
    label: "Hardware & Embedded",
    items: ["PlatformIO", "MPLAB X", "KiCad", "EasyEDA", "SolidWorks", "Proteus", "OrcaSlicer", "GRBL"],
  },
  {
    label: "Tools",
    items: ["VSCode", "Cursor", "Antigravity", "Claude Code", "OpenClaw", "Ollama", "Git", "GitHub", "XAMPP", "ClickUp", "Notion", "Figma"],
  },
];
