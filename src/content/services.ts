export type Service = {
  code: string;
  name: string;
  detail: string;
};

export const services: Service[] = [
  {
    code: "SW.01",
    name: "Custom software development",
    detail: "From sketch to shipped. Full-stack builds, production infra, handover docs.",
  },
  {
    code: "SW.02",
    name: "SaaS development",
    detail: "Multi-tenant architecture, billing, RBAC, deployment pipelines.",
  },
  {
    code: "SW.03",
    name: "Mobile app development",
    detail: "Native Android (Kotlin), Flutter, or Capacitor wrapping an existing web app.",
  },
  {
    code: "SW.04",
    name: "Web development",
    detail: "Next.js marketing sites, dashboards, portals. Performance + a11y baked in.",
  },
  {
    code: "SW.05",
    name: "AI workflow automation",
    detail: "Claude / OpenAI pipelines wired into your actual business process, not a chatbot demo.",
  },
  {
    code: "SW.06",
    name: "IT consulting",
    detail: "Architecture review, stack calls, cloud cost triage, hiring calibration.",
  },
];
