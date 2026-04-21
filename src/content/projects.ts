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
    index: "003",
    title: "Aenoxa Landing Generator",
    status: "in-progress",
    year: "2026",
    role: "Solo build",
    stack: ["Next.js", "Claude API", "VPS", "Cloudflare DNS"],
    url: null,
    summary: "Brief → deployed landing page, hands-off.",
    bullets: [
      "Takes a brief, outputs a built and deployed landing page.",
      "Auto-deploy to VPS + Cloudflare DNS automation.",
      "Aimed at agencies + solo operators who need pages yesterday.",
    ],
  },
  {
    index: "004",
    title: "Aenoxa AI Workflows",
    status: "ideation",
    year: "2026",
    role: "Productizing custom work",
    stack: ["Claude API", "Python", "TypeScript", "n8n"],
    url: null,
    summary: "Personalized AI workflow automation for entrepreneurs.",
    bullets: [
      "Custom-built per-client, productized over time.",
      "Focus: operational leverage for SMB owners, not chatbots.",
    ],
  },
  {
    index: "005",
    title: "Pulse E-Commerce Aggregator",
    status: "roadmap",
    year: "2026+",
    role: "Architecture + integrations",
    stack: ["Shopee API", "Tokopedia API", "Lazada API", "Postgres"],
    url: null,
    summary: "Native Shopee / Tokopedia / Lazada integration inside Pulse POS.",
    bullets: [
      "Competitive edge vs Accurate (per-user pricing + 3rd-party aggregator sprawl).",
      "One inventory, one dashboard, three marketplaces.",
    ],
  },
];
