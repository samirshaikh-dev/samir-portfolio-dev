/**
 * Presentation taxonomy for the `projects.technologies` array.
 *
 * The column stores two different kinds of entry side by side — concrete tools
 * ("NestJS", "PostgreSQL") and delivery characteristics ("microservices",
 * "scalable"). Rendering them as one flat list of identical chips loses the
 * signal a recruiter scans for, so they are bucketed into labelled layers.
 *
 * This module is presentation only: every string is preserved verbatim and in
 * its original relative order. Anything not listed below falls into the
 * trailing `additional` bucket so new CMS entries always render.
 */

export interface StackLayerDefinition {
  id: string;
  label: string;
  description: string;
  members: string[];
}

export interface StackLayer extends Omit<StackLayerDefinition, "members"> {
  items: string[];
}

export const STACK_LAYERS: StackLayerDefinition[] = [
  {
    id: "runtime",
    label: "Runtime & Language",
    description: "Server runtime, language and application frameworks.",
    members: ["Node.js", "TypeScript", "NestJS", "Express.js"],
  },
  {
    id: "interface",
    label: "Interface & Client",
    description: "Web, mobile and real-time client surfaces.",
    members: [
      "Next.js",
      "React",
      "React Native",
      "Expo",
      "Vite",
      "Tailwind CSS",
      "shadcn/ui",
      "WebSockets",
    ],
  },
  {
    id: "data",
    label: "API & Data",
    description: "Transport contracts, persistence and work queues.",
    members: [
      "GraphQL",
      "Apollo Server",
      "REST API",
      "PostgreSQL",
      "Sequelize ORM",
      "Redis",
      "BullMQ",
    ],
  },
  {
    id: "ai",
    label: "AI & Automation",
    description: "Model-driven logic and third-party automation surfaces.",
    members: [
      "LLM-driven triage",
      "WhatsApp Automation",
      "WhatsApp Web API",
      "Google Sheets API",
      "QR authentication",
    ],
  },
  {
    id: "platform",
    label: "Infrastructure & Observability",
    description: "Containerisation and production visibility.",
    members: [
      "Docker",
      "Docker Compose",
      "OpenTelemetry",
      "Prometheus",
      "Grafana",
      "observability",
    ],
  },
  {
    id: "security",
    label: "Security & Reliability",
    description: "Guarding the request path and keeping it predictable.",
    members: [
      "JWT",
      "RBAC",
      "Zod",
      "rate limiting",
      "concurrency control",
      "session management",
      "secure",
    ],
  },
  {
    id: "architecture",
    label: "Architecture & Patterns",
    description: "Structural decisions behind the runtime behaviour.",
    members: [
      "microservices",
      "event-driven",
      "asynchronous job processing",
      "message queue",
      "distributed tracing",
      "real-time",
    ],
  },
  {
    id: "delivery",
    label: "Delivery & Scope",
    description: "How the build was framed and what it had to satisfy.",
    members: [
      "Full Stack",
      "AI-powered support platform",
      "bulk messaging",
      "campaign management",
      "scalable",
      "production-ready",
    ],
  },
  {
    id: "additional",
    label: "Additional Technologies",
    description: "Further tools and techniques applied in this project.",
    members: [],
  },
];

const LAYER_BY_MEMBER = new Map<string, string>();
for (const layer of STACK_LAYERS) {
  for (const member of layer.members) {
    LAYER_BY_MEMBER.set(member.trim().toLowerCase(), layer.id);
  }
}

/**
 * Groups the stored technology list into ordered layers. Layer order follows
 * `STACK_LAYERS`; within a layer, entries keep the order they appear in the
 * source array and duplicates are removed.
 */
export function groupTechnologies(technologies: string[] | null | undefined): StackLayer[] {
  const source = (technologies ?? []).filter(
    (tech): tech is string => typeof tech === "string" && tech.trim().length > 0
  );

  const grouped = new Map<string, string[]>();
  for (const layer of STACK_LAYERS) grouped.set(layer.id, []);

  for (const tech of source) {
    const layerId = LAYER_BY_MEMBER.get(tech.trim().toLowerCase()) ?? "additional";
    const items = grouped.get(layerId);
    if (!items) continue;
    if (!items.includes(tech)) items.push(tech);
  }

  return STACK_LAYERS.map((layer) => ({
    id: layer.id,
    label: layer.label,
    description: layer.description,
    items: grouped.get(layer.id) ?? [],
  })).filter((layer) => layer.items.length > 0);
}
