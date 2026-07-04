export type Project = {
  name: string;
  /** What the thing is, in plain language: "Booking App", "Medical Device", etc. */
  type: string;
  description?: string;
  url?: string;
  github?: string;
  preview?: string;
  stack: string[];
  /** Gets the large row treatment within its group. */
  featured?: boolean;
};

/* The thesis lives in its own section, not in the projects grid. */
export const thesis: Project = {
  name: "C.Scope.AI",
  type: "Undergraduate Thesis",
  description:
    "Automated imaging system that classifies microplastic samples under a microscope. A motorized XY platform scans petri dishes while a convolutional neural network identifies particles in real time, replacing slow, error-prone manual microscopy. Reached 91% accuracy with an on-device retraining pipeline.",
  github: "https://github.com/lysanderuy/PolyVision-v2.0",
  preview: "/projects/cscope.png",
  stack: ["Python", "Detectron2", "OpenCV", "CNN", "PyQt5", "GRBL"],
};

/* Web & mobile products, shipped to real users. */
export const webProjects: Project[] = [
  {
    name: "PickASlot",
    type: "Booking App",
    description:
      "Court booking system for a residential subdivision's pickleball court. Guests browse hourly slots and submit reservations. Bookings confirm after an admin verifies GCash or cash payment.",
    url: "https://pickaslot.vercel.app/",
    preview: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fpickaslot.vercel.app%2F?w=1200",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Drizzle ORM"],
    featured: true,
  },
  {
    name: "BallRuns",
    type: "Live Game App",
    description:
      "Real-time app for running pickup basketball games. Hosts open a run, share a six-character code, and players join a live queue while the host assigns teams, runs the clock, and logs scores. Everyone sees updates instantly, no refresh.",
    url: "https://ballruns.vercel.app/",
    github: "https://github.com/lysanderuy/basketball-runs",
    preview: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fballruns.vercel.app%2F?w=1200",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Drizzle ORM"],
    featured: true,
  },
  {
    name: "Echoic AI",
    type: "AI Content Tool",
    description:
      "AI-powered content engine that generates on-brand social media posts for Instagram, Facebook, and TikTok. Store your brand voice and visual direction once, then let it adapt into platform-specific content ready to publish.",
    url: "https://echoic.symph.ai/",
    preview: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fechoic.symph.ai%2F?w=1200",
    stack: ["Next.js", "TypeScript", "NestJS", "Firebase", "OpenAI API", "Gemini API"],
  },
  {
    name: "CourtHub",
    type: "Facility Platform",
    description:
      "Sports facility management platform that consolidates court bookings, customer management, and payment processing into one dashboard. Facility operators go live in minutes with no spreadsheets, WhatsApp groups, or paper logbooks.",
    url: "https://courthub.ph/",
    preview: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fcourthub.ph%2F?w=1200",
    stack: ["Next.js", "TypeScript", "NestJS", "Nx", "Drizzle ORM", "SymphPay"],
  },
];

/* Hardware I designed, fabricated, and built end to end. */
export const hardwareProjects: Project[] = [
  {
    name: "Automated Glove Doffing Device",
    type: "Medical Device",
    description:
      "Vacuum-assisted device that removes medical gloves with no hand contact, targeting the self-contamination that makes manual doffing a critical safety failure point. Built the prototype and ran 180 trials across glove sizes and wear conditions, meeting its 30% contamination-reduction target.",
    preview: "/projects/glove.jpg",
    stack: ["Arduino Uno", "GRBL", "CNC Shield v3", "NEMA 17", "MG995 Servo", "Vacuum Pump"],
  },
  {
    name: "Advanced Line Follower",
    type: "Autonomous Robot",
    description:
      "My most recent and most refined line-following robot. I designed and fabricated everything myself: a custom 16-channel reflectance sensor board, the controller board, and a 3D-printed chassis. The dense sensor array reads the track at fine resolution for tight, confident cornering at speed.",
    preview: "/projects/robot.jpg",
    stack: ["Arduino Uno", "16ch QRE1113", "TB6612FNG", "N30 Motors", "Custom PCB", "3D-Printed Chassis"],
  },
];
