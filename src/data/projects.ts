export type Project = {
  name: string;
  description?: string;
  url?: string;
  github?: string;
  preview?: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    name: "PickASlot",
    description: "Court booking system for a residential subdivision's pickleball court. Guests browse hourly slots and submit reservations. Bookings confirm after an admin verifies GCash or cash payment.",
    url: "https://pickaslot.vercel.app/",
    preview: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fpickaslot.vercel.app%2F?w=1200",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Drizzle ORM", "Vercel"],
  },
  {
    name: "Echoic",
    description: "AI-powered content engine that generates on-brand social media posts for Instagram, Facebook, and TikTok. Store your brand voice and visual direction once, then let it adapt into platform-specific content ready to publish.",
    url: "https://echoic.symph.ai/",
    preview: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fechoic.symph.ai%2F?w=1200",
    stack: ["Next.js", "TypeScript", "NestJS", "Nx", "Firebase", "Firestore", "OpenAI API", "Gemini API", "SymphPay", "GCP"],
  },
  {
    name: "CourtHub",
    description: "Sports facility management platform that consolidates court bookings, customer management, and payment processing into one dashboard. Facility operators go live in minutes with no spreadsheets, WhatsApp groups, or paper logbooks.",
    url: "https://courthub.ph/",
    preview: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fcourthub.ph%2F?w=1200",
    stack: ["Next.js", "TypeScript", "NestJS", "Nx", "Drizzle ORM", "Firebase", "Supabase", "SymphPay", "GCP"],
  },
  {
    name: "Mileo",
    description: "Fuel tracking app built for speed and clarity. Log fill-ups at the pump, track spending trends, and manage multiple vehicles without friction.",
    github: "https://github.com/lysanderuy/mileo-fuel-tracker",
    preview: "/mileo/mileo-landing.png",
    stack: ["PHP", "MySQL", "JavaScript", "CSS"],
  },
  {
    name: "CpE Contact Tracing",
    description: "Visitor management system for the USC Computer Engineering department. Tracks sign-ins and sign-outs for students, staff, and guests with real-time admin visibility and a complete visit audit trail.",
    github: "https://github.com/lysanderuy/contact-tracing",
    preview: "/contact-tracing/contact-tracing-landing.png",
    stack: ["PHP", "MySQL", "JavaScript", "CSS"],
  },
  {
    name: "The Program",
    description: "Coaching platform connecting athletes with verified trainers across 20+ sports. Athletes log workouts and track performance while coaches build block-based programs and manage rosters from one integrated system.",
    url: "https://theprogram.symph.co/",
    preview: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Ftheprogram.symph.co%2F?w=1200",
    stack: ["Next.js", "TypeScript", "React Native", "React", "Nx", "Firebase", "Firestore", "SymphPay", "GCP"],
  },
  {
    name: "SproutSpot",
    description: "AI-powered farm simulation platform. Upload farm data via CSV, experiment in digital twin playgrounds, and receive AI-driven crop predictions to optimize farming decisions.",
    url: "https://sproutspot.vercel.app/",
    preview: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fsproutspot.vercel.app%2F?w=1200",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Supabase", "Prisma", "Gemini API", "Vercel"],
  },
  {
    name: "Klaro",
    description: "Parcel tracking platform for customers, sellers, and logistics companies. Real-time delivery status, inventory visibility, and shipment data in one place.",
    url: "https://klaro.vercel.app/",
    preview: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fklaro.vercel.app%2F?w=1200",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Firebase", "Prisma", "Vercel"],
  },
];
