interface Principle {
  number: string;
  badge: string;
  title: string;
  description: string;
}

const PRINCIPLES: Principle[] = [
  {
    number: "01",
    badge: "CLARITY FIRST",
    title: "Understand before implementing.",
    description:
      "Premature code usually solves the wrong problem. Before architecting solutions, I investigate domain constraints, data contracts, and failure modes. Deep comprehension upfront prevents expensive rewrites.",
  },
  {
    number: "02",
    badge: "MINIMAL SURFACE",
    title: "Choose simplicity over unnecessary complexity.",
    description:
      "Complexity is liability. The best architecture is the leanest one that reliably fulfills business requirements. I prefer clear data flows, minimal dependencies, and code any team member can reason about.",
  },
  {
    number: "03",
    badge: "DEFENSIVE DESIGN",
    title: "Design for failure, not just the happy path.",
    description:
      "Networks fail, third-party APIs drop connections, and payloads arrive malformed. Systems must degrade gracefully through idempotent workers, dead-letter queues, exponential backoff, and actionable logs.",
  },
  {
    number: "04",
    badge: "EMPIRICAL PROOF",
    title: "Measure outcomes instead of making assumptions.",
    description:
      "Technical decisions must be grounded in observation, not dogma. I validate throughput, database indexes, and latency percentiles (p50/p95/p99) with real profiling, tracing, and structured logs.",
  },
];

export default function EngineeringPhilosophy() {
  return (
    <section
      className="px-5 sm:px-8 md:px-10 py-16 md:py-24 border-t border-border-primary/80"
      aria-label="Engineering philosophy and decision-making principles"
    >
      <div className="max-w-6xl mx-auto">
        {/* ── SECTION HEADER ────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-5 border-b border-border-primary/80">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
              <span>03 / PHILOSOPHY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
              How I Think About Engineering
            </h2>
            <p className="text-text-muted text-sm sm:text-base max-w-xl mt-2 leading-relaxed">
              Engineering maturity is reflected in judgment, trade-off management, and code that remains maintainable long after deployment.
            </p>
          </div>
        </div>

        {/* ── 4 PRINCIPLES GRID ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border-primary/80 border border-border-primary/80 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xs">
          {PRINCIPLES.map((principle) => (
            <div
              key={principle.number}
              className="bg-background dark:bg-card-bg p-7 sm:p-9 md:p-10 flex flex-col justify-between hover:bg-hover-bg/30 transition-colors"
            >
              <div>
                {/* Index & Badge */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <span className="text-2xl sm:text-3xl font-mono font-black text-foreground">
                    {principle.number}
                  </span>
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-hover-bg text-text-muted border border-border-primary/60">
                    {principle.badge}
                  </span>
                </div>

                {/* Principle Heading */}
                <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight mb-3">
                  {principle.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
