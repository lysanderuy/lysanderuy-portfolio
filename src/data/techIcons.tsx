import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiRust,
  SiCplusplus,
  SiPhp,
  SiReact,
  SiNextdotjs,
  SiNestjs,
  SiNodedotjs,
  SiTailwindcss,
  SiExpo,
  SiPostgresql,
  SiMysql,
  SiSqlite,
  SiPrisma,
  SiTypeorm,
  SiDrizzle,
  SiSupabase,
  SiFirebase,
  SiGooglecloud,
  SiDocker,
  SiGithubactions,
  SiPytorch,
  SiTensorflow,
  SiOpencv,
  SiOllama,
  SiElevenlabs,
  SiPlatformio,
  SiKicad,
  SiEasyeda,
  SiProteus,
  SiDassaultsystemes,
  SiCursor,
  SiClaude,
  SiXampp,
  SiGit,
  SiGithub,
  SiKotlin,
  SiClickup,
  SiNotion,
  SiFigma,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { FiCode, FiSmartphone, FiDatabase, FiBox, FiZap, FiFilm, FiCpu, FiTool } from "react-icons/fi";

// Maps a technology name to its brand glyph. Rendered monochrome and tinted
// to the palette so brand colours never break the calm army-green aesthetic.
export const techIcons: Record<string, IconType> = {
  // Languages
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Python: SiPython,
  Kotlin: SiKotlin,
  Rust: SiRust,
  Java: FaJava,
  "C/C++": SiCplusplus,
  PHP: SiPhp,
  // Web & Mobile
  "Next.js": SiNextdotjs,
  React: SiReact,
  NestJS: SiNestjs,
  "Node.js": SiNodedotjs,
  "Tailwind CSS": SiTailwindcss,
  "React Native": SiReact,
  Expo: SiExpo,
  // Databases & ORMs
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  SQLite: SiSqlite,
  Prisma: SiPrisma,
  TypeORM: SiTypeorm,
  Drizzle: SiDrizzle,
  // Cloud & DevOps
  GCP: SiGooglecloud,
  Supabase: SiSupabase,
  Firebase: SiFirebase,
  Docker: SiDocker,
  "GitHub Actions": SiGithubactions,
  // AI & ML
  PyTorch: SiPytorch,
  TensorFlow: SiTensorflow,
  OpenCV: SiOpencv,
  // Generative Media
  ElevenLabs: SiElevenlabs,
  // Hardware & Embedded
  PlatformIO: SiPlatformio,
  KiCad: SiKicad,
  EasyEDA: SiEasyeda,
  SolidWorks: SiDassaultsystemes,
  Proteus: SiProteus,
  // Tools
  Cursor: SiCursor,
  Ollama: SiOllama,
  "Claude Code": SiClaude,
  XAMPP: SiXampp,
  Git: SiGit,
  GitHub: SiGithub,
  ClickUp: SiClickup,
  Notion: SiNotion,
  Figma: SiFigma,
};

// Neutral fallback glyph per stack group, used for tools without a brand icon
// so every entry reads as a consistent tile.
export const groupFallbackIcons: Record<string, IconType> = {
  Languages: FiCode,
  "Web & Mobile": FiSmartphone,
  "Databases & ORMs": FiDatabase,
  "Cloud & DevOps": FiBox,
  "AI & ML": FiZap,
  "Generative Media": FiFilm,
  "Hardware & Embedded": FiCpu,
  Tools: FiTool,
};
