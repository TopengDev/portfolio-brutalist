export type ExperienceEntry = {
  company: string;
  role: string;
  range: string;
  kind: string;
  detail: string;
};

export const experience: ExperienceEntry[] = [
  {
    company: "Aenoxa",
    role: "Builder",
    range: "2025 — now",
    kind: "Startup · Builder",
    detail:
      "Building Pulse multi-tenant POS SaaS end-to-end. Next.js, Postgres, Capacitor, Kotlin, CI/CD.",
  },
  {
    company: "PT. Ihsan Solusi Informatika",
    role: "Fullstack Engineer",
    range: "2024 — now",
    kind: "Day job · BUMN / banking",
    detail: "Java/Spring APIs + Next.js front-ends for BUMN and banking-sector clients.",
  },
  {
    company: "PT. Indosat",
    role: "Engineering",
    range: "2023 — 2024",
    kind: "Telco",
    detail: "Engineering work across platform + product teams.",
  },
  {
    company: "Freelance",
    role: "Web Developer",
    range: "2021 — now",
    kind: "Contract",
    detail: "Multi-year client work. Full-stack web, integrations, shipping to deadline.",
  },
  {
    company: "Mafia Code (univ. community)",
    role: "Co-Lead",
    range: "2022 — 2023",
    kind: "Community",
    detail: "Ran a university developer community. Workshops, events, mentoring.",
  },
  {
    company: "PT MAP700",
    role: "Graphic Designer",
    range: "2019 — 2020",
    kind: "Early career",
    detail: "Early career design work. Explains the eye for typography.",
  },
];
