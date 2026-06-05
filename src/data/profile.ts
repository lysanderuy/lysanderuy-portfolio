export type ProfileLink = {
  label: string;
  href: string;
};

export type StackGroup = {
  label: string;
  items: string[];
};

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
    items: ["TypeScript", "JavaScript", "Python", "Rust", "Java", "C/C++", "PHP", "SQL"],
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
    label: "AI, ML & Agentic",
    items: ["PyTorch", "TensorFlow", "OpenCV", "Detectron2", "Ollama", "OpenClaw", "MCP", "LLM APIs", "ElevenLabs", "Flow", "Grok"],
  },
  {
    label: "Hardware & Embedded",
    items: ["PlatformIO", "MPLAB X", "KiCad", "EasyEDA", "SolidWorks", "Proteus", "OrcaSlicer", "GRBL"],
  },
  {
    label: "Tools",
    items: ["VSCode", "Antigravity", "Cursor", "Claude Code", "XAMPP", "Git", "GitHub"],
  },
];
