import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

interface CapabilityCluster {
  title: string;
  scope: string;
  technologies: string[];
}

const CAPABILITY_CLUSTERS: CapabilityCluster[] = [
  {
    title: "Backend Engineering",
    scope: "Typed server runtimes, RESTful contracts, service boundaries, and secure auth layers.",
    technologies: ["Node.js", "Express.js", "NestJS", "TypeScript", "REST APIs", "JWT / NextAuth"],
  },
  {
    title: "Frontend Architecture",
    scope: "Server vs. Client boundaries, zero CLS, responsive typography, and accessible UI.",
    technologies: ["React 19", "Next.js 16 (App Router)", "Redux Toolkit", "Tailwind CSS v4", "TypeScript"],
  },
  {
    title: "Databases & Storage",
    scope: "Relational data modeling, ACID transactions, index optimization, and distributed caching.",
    technologies: ["PostgreSQL", "Neon Serverless", "Redis", "MongoDB", "Drizzle ORM", "Prisma"],
  },
  {
    title: "System Design & Queues",
    scope: "Asynchronous background processing, GraphQL optimization, and event-driven patterns.",
    technologies: ["Microservices", "GraphQL & DataLoader", "BullMQ Queues", "WebSockets", "Pub/Sub"],
  },
  {
    title: "AI & Vector Search",
    scope: "Contextual RAG pipelines, high-dimensional vector embeddings, and strict retrieval thresholds.",
    technologies: ["LLM Orchestration", "RAG Systems", "pgvector (3072d)", "Gemini Embeddings", "Vercel AI SDK"],
  },
  {
    title: "Infrastructure & DevOps",
    scope: "Containerized environments, automated CI/CD workflows, and latency/error observability.",
    technologies: ["Docker", "GitHub Actions", "Prometheus", "Grafana", "OpenTelemetry", "Vercel"],
  },
];

export default function TechnicalCapabilities() {
  return (
    <section
      className="px-5 sm:px-8 md:px-10 py-16 md:py-24 border-t border-border-primary/80"
      aria-label="Technical capabilities and systems knowledge"
    >
      <div className="max-w-6xl mx-auto">
        {/* ── SECTION HEADER ────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-5 border-b border-border-primary/80">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
              <span>04 / CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
              Technical Capabilities
            </h2>
            <p className="text-text-muted text-sm sm:text-base max-w-xl mt-2 leading-relaxed">
              Organized technical proficiencies demonstrated across production applications and real-world architectures &mdash; free of arbitrary rating bars.
            </p>
          </div>

          <Link
            href="/technical-skills"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-foreground hover:text-text-secondary transition-colors group flex-shrink-0"
          >
            <span>Full System Architecture Index</span>
            <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* ── 6-CAPABILITY GRID ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITY_CLUSTERS.map((cluster, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl border border-border-primary/80 bg-background dark:bg-card-bg p-6 sm:p-7 hover:border-foreground/30 transition-all duration-200 shadow-2xs"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-black text-foreground tracking-tight">
                    {cluster.title}
                  </h3>
                  <span className="text-[11px] font-mono text-text-muted">
                    0{idx + 1}
                  </span>
                </div>

                {/* Scope Description */}
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                  {cluster.scope}
                </p>
              </div>

              {/* Technologies List */}
              <div className="pt-4 border-t border-border-primary/60 flex flex-wrap gap-1.5">
                {cluster.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="inline-flex items-center px-2 py-1 rounded text-[11px] font-mono text-text-secondary bg-hover-bg/50 border border-border-primary/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
