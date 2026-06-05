export type Competition = {
  title: string;
  category: string;
  result: string;
  issuer: string;
  issuedAt: string;
  association: string;
  summary: string;
  photos: { src: string; alt: string }[];
};

export const competitions: Competition[] = [
  {
    title: "Roboquest 2025 | Advanced Line Following",
    category: "Advanced Line Following",
    result: "Participant",
    issuer: "E.M. Power Robotics",
    issuedAt: "Dec 2025",
    association: "University of San Carlos",
    summary: "Advanced line following category entry.",
    photos: [
      {
        src: "/competitions/roboquest-2025-line-follower-robot.jpg",
        alt: "Line Follower Robot",
      },
      {
        src: "/competitions/roboquest-2025-team-usc-tc.jpg",
        alt: "Team USC-TC",
      },
    ],
  },
  {
    title: "SolidWorks Model Mania 2025: Academe 4",
    category: "CAD Modeling",
    result: "Top 25 Regional Qualifiers",
    issuer: "Computrends Systems Technology Inc. - Top SOLIDWORKS Reseller in PH",
    issuedAt: "Sep 2025",
    association: "University of San Carlos",
    summary: "Academe 4 division model assembly challenge entry.",
    photos: [
      {
        src: "/competitions/model-mania-2025-final-assembly.jpg",
        alt: "Final Assembly",
      },
      {
        src: "/competitions/model-mania-2025-team-usc-cpe.jpg",
        alt: "Team USC (CpE)",
      },
    ],
  },
  {
    title: "Robotics Summer Cup 2025 (RSC1) VisMin Leg | Advanced Line Following",
    category: "Advanced Line Following",
    result: "4th Place",
    issuer: "Pilipinas Robosports Tournament & E.M. Power Robotics",
    issuedAt: "May 2025",
    association: "University of San Carlos",
    summary:
      "Won 4th Place in Advanced Line Following Category during the RSC1 VisMin Leg held in CIT-U Danao, Cebu City.",
    photos: [
      { src: "/competitions/rsc1-line-following-robot.jpg", alt: "Line Following Robot" },
      { src: "/competitions/rsc1-team-usc-tc.jpg", alt: "Team USC-TC" },
      { src: "/competitions/rsc1-team-canuy.jpg", alt: "Team CanUy" },
    ],
  },
  {
    title: "USC Robocon 2025 | Line Following",
    category: "Line Following",
    result: "2nd Place",
    issuer: "University of San Carlos",
    issuedAt: "Apr 2025",
    association: "University of San Carlos",
    summary:
      "Won 2nd Place in Line Following Category during the USC Robocon 2025 held in GMALL, Cebu City.",
    photos: [
      {
        src: "/competitions/usc-robocon-2025-line-following-robot.jpg",
        alt: "Line Following Robot",
      },
      {
        src: "/competitions/usc-robocon-2025-team-pcbabies-3-0-2.jpg",
        alt: "Team PCBabies 3.0.2",
      },
      {
        src: "/competitions/usc-robocon-2025-certificates.jpg",
        alt: "Certificates",
      },
    ],
  },
  {
    title: "ICpEP - SU Robotix! 2025 | Line Following",
    category: "Line Following",
    result: "4th Place",
    issuer: "ICpEP - SU",
    issuedAt: "Mar 2025",
    association: "University of San Carlos",
    summary:
      "Won 4th Place in Line Following Category during the Robotix! 2025 held in Robinsons, Dumaguete City.",
    photos: [
      {
        src: "/competitions/su-robotix-2025-line-following-robot.jpg",
        alt: "Line Following Robot",
      },
      {
        src: "/competitions/su-robotix-2025-team-becanuy.jpg",
        alt: "Team BeCanUy",
      },
    ],
  },
  {
    title: "Komsai Week Hackathon 2025",
    category: "Hackathon",
    result: "Participant",
    issuer: "University of the Philippines Cebu x AI GEN Cebu",
    issuedAt: "Mar 2025",
    association: "University of San Carlos",
    summary: "Komsai Week hackathon team entry.",
    photos: [
      {
        src: "/competitions/komsai-week-2025-team-techy-imnida.jpg",
        alt: "Team Techy-Imnida",
      },
      {
        src: "/competitions/komsai-week-2025-certificates.jpg",
        alt: "Certificates",
      },
    ],
  },
  {
    title: "USC Formula 01 | Line Following",
    category: "Line Following",
    result: "2nd Place",
    issuer: "University of San Carlos",
    issuedAt: "Oct 2024",
    association: "University of San Carlos",
    summary:
      "Won 2nd Place in Line Following Competition during USC Formula 01 held in USC-TC, Cebu City.",
    photos: [
      {
        src: "/competitions/usc-formula-01-line-following-robot.jpg",
        alt: "Line Following Robot",
      },
      {
        src: "/competitions/usc-formula-01-team-ruposuy.jpg",
        alt: "Team RuPosUy",
      },
    ],
  },
  {
    title: "Philippine Startup Challenge 8 | Regional Pitching Competition",
    category: "Startup Pitching",
    result: "Top 25 Regional Qualifier",
    issuer: "Department of Information and Communications Technology (DICT)",
    issuedAt: "Oct 2023",
    association: "University of San Carlos",
    summary:
      "Recognized as one of the Top 25 Regional Qualifiers in the Philippine Startup Challenge 8 - Central Visayas Regional Pitching Competition. Represented the University of San Carlos as a Computer Engineering team and competed against student innovators across Region 7.",
    photos: [
      { src: "/competitions/psc8-certificates.jpg", alt: "Certificates" },
      { src: "/competitions/psc8-team-usc-tc.jpg", alt: "Team USC-TC" },
    ],
  },
];
