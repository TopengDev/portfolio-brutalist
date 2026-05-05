export type Project = {
  index: string;
  title: string;
  status: "current" | "shipped" | "in-progress" | "roadmap" | "ideation";
  year: string;
  role: string;
  stack: string[];
  url: string | null;
  summary: string;
  bullets: string[];
};

export const projects: Project[] = [
  {
    index: "001",
    title: "Pulse",
    status: "current",
    year: "2025 — now",
    role: "Full-stack + infra",
    stack: ["Next.js 15", "TypeScript", "Postgres", "Prisma", "NextAuth", "Tailwind", "shadcn"],
    url: "https://app.pulse.aenoxa.com",
    summary: "Multi-tenant POS SaaS for Indonesian SMBs.",
    bullets: [
      "Tenant isolation, RBAC, owner subscription gating, staff-bypass via membership model.",
      "Dark theme reskin with Aenoxa teal brand mark (#2DDCC7).",
      "Internationalized: Bahasa Indonesia + English.",
      "POS, inventory, customers, sales reports — one browser tab.",
    ],
  },
  {
    index: "002",
    title: "hiremeup",
    status: "shipped",
    year: "2025 — now",
    role: "Solo full-stack",
    stack: ["Next.js", "TypeScript", "Postgres", "Prisma", "MinIO", "Redis", "RabbitMQ"],
    url: "https://hiremeup.topengdev.com",
    summary: "AI resume analyzer SaaS for job seekers.",
    bullets: [
      "Upload resume + job description, get section-by-section analysis + rewrite suggestions.",
      "Active production users — including thesis researchers using it as study material.",
      "Object storage on MinIO, async job queue on RabbitMQ.",
    ],
  },
  {
    index: "003",
    title: "ExecFi",
    status: "shipped",
    year: "2025",
    role: "Full-stack web3 + indexer",
    stack: ["Next.js", "Privy", "Wagmi", "viem", "LiFi SDK", "permissionless", "Ponder", "Hono"],
    url: "https://execfi.xyz",
    summary: "A revolutionary web3 gaming hub with DeFi integration in a terminal interface.",
    bullets: [
      "Terminal-style command UI as the primary surface — DeFi flows feel like shell commands, not dashboards.",
      "Smart-account swaps via permissionless + LiFi SDK aggregator — gasless UX, best-route execution across DEXes.",
      "Custom Ponder + Hono indexer streams on-chain state into the terminal in real time.",
    ],
  },
  {
    index: "004",
    title: "PulseBridge",
    status: "shipped",
    year: "2026",
    role: "Native Android + plugin",
    stack: ["Capacitor", "Kotlin", "Raw TCP", "JetDirect :9100"],
    url: null,
    summary: "Native Android shell wrapping Pulse — solves thermal + label printing over LAN.",
    bullets: [
      "Custom Kotlin TCP plugin opens sockets to printers on the LAN (JetDirect port 9100).",
      "Supersedes earlier HTTPS bridge attempt (Chrome Private Network Access blocking).",
      "Industry-standard POS pattern: native shell wrapping web POS.",
    ],
  },
  {
    index: "005",
    title: "Aenoxa",
    status: "shipped",
    year: "2025 — now",
    role: "Founder + sole engineer",
    stack: [
      "Go",
      "Next.js",
      "Postgres",
      "RabbitMQ",
      "MinIO",
      "Redis",
      "OpenTelemetry",
      "Grafana",
      "Prometheus",
    ],
    url: "https://aenoxa.com",
    summary:
      "A self-hosted SaaS ecosystem — IAM/Auth microservice + Pulse POS + landing-page generator, deployed end-to-end on a single VPS.",
    bullets: [
      "Modular-monolith architecture: shared Auth service brokers identity across products.",
      "Transactional outbox pattern over RabbitMQ for inter-service eventing.",
      "Full observability stack (OTel + Prometheus + Grafana + Loki + Tempo) shipping with every service before it touches prod traffic.",
    ],
  },
];
