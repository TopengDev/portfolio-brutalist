export const skills: string[] = [
  "Next.js / React / TypeScript",
  "Rust",
  "Go",
  "Kotlin (Android native)",
  "Flutter",
  "Bun",
  "PostgreSQL / Prisma",
  "Tailwind CSS",
  "Multi-tenant SaaS architecture",
  "POS systems",
  "Native ↔ web integration (Capacitor, raw TCP, intent schemes)",
  "AI / LLM integrations",
  "Docker / Cloudflare / VPS",
  "GitHub Actions CI/CD",
];

export type StackRow = { layer: string; tools: string };
export const stackTable: StackRow[] = [
  { layer: "Frontend", tools: "Next.js 15, React 19, TypeScript strict, Tailwind, shadcn, Framer Motion" },
  { layer: "Backend", tools: "Node, Bun, Java/Spring, Go, Rust" },
  { layer: "Native mobile", tools: "Kotlin, Capacitor, Flutter" },
  { layer: "Data", tools: "PostgreSQL, Prisma, SQLite, Redis" },
  { layer: "Infra", tools: "Docker, Cloudflare, VPS, GitHub Actions, systemd" },
  { layer: "AI / LLM", tools: "Claude API, OpenAI, nanobanana, custom tool-use pipelines" },
];
