import Link from "next/link";

interface HowIWorkProps {
  /** "full" shows all detail (services page). "compact" shows condensed version (homepage). */
  variant?: "full" | "compact";
}

const PHASES = [
  {
    number: "01",
    label: "Discovery",
    duration: "Day 1–2",
    emoji: "🔍",
    description:
      "We align on your business goals, constraints, and success criteria before a single line of code is written.",
    deliverables: [
      "Free 30-minute discovery call",
      "Business objective & data schema review",
      "Architecture discussion & technical feasibility",
      "Scope definition & edge-case identification",
    ],
  },
  {
    number: "02",
    label: "Blueprint",
    duration: "Day 2–3",
    emoji: "📐",
    description:
      "You receive a clear, fixed-price milestone proposal with exact delivery dates — no open-ended ambiguity.",
    deliverables: [
      "Fixed-price milestone proposal",
      "Technical spec & delivery roadmap",
      "Optional wireframes / UI reference",
      "NDA signed (if required)",
    ],
  },
  {
    number: "03",
    label: "Sprint Execution",
    duration: "Week 1–N",
    emoji: "⚡",
    description:
      "Daily Git commits and async updates keep you in the loop. You review working demos on a staging URL at every milestone.",
    deliverables: [
      "Daily Git commits with descriptive messages",
      "Slack / WhatsApp async progress updates",
      "Staging previews at each milestone",
      "Revision rounds included at zero extra cost",
    ],
  },
  {
    number: "04",
    label: "Launch & Handover",
    duration: "Final day",
    emoji: "🚀",
    description:
      "Your project goes live on your accounts. You own 100% of the code, infrastructure, and intellectual property.",
    deliverables: [
      "CI/CD deployment to your Vercel / AWS accounts",
      "Full README + architecture documentation",
      "100% repository transferred to your GitHub org",
      "30-day post-launch warranty included",
    ],
  },
];

export default function HowIWork({ variant = "full" }: HowIWorkProps) {
  const isCompact = variant === "compact";

  return (
    <section
      className={`px-5 sm:px-8 md:px-10 py-16 md:py-24 ${isCompact ? "border-t border-border-primary/80" : ""}`}
      aria-label="How I work — my freelance development process"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 pb-4 border-b border-border-primary/80 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-3 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
              MY PROCESS
            </div>
            <h2
              className={`font-black tracking-tight text-foreground ${
                isCompact ? "text-3xl sm:text-4xl md:text-5xl" : "text-3xl md:text-4xl mt-1"
              }`}
            >
              How I Work
            </h2>
            <p className="text-text-muted mt-2 text-sm sm:text-base max-w-lg leading-relaxed">
              A structured, milestone-driven process that keeps you informed and in control at every stage.
            </p>
          </div>
          <Link
            href="/contact"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-text-secondary transition-colors flex-shrink-0 group"
          >
            Start a project
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Phase grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PHASES.map((phase, i) => (
            <div
              key={phase.number}
              className="relative flex flex-col rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-6 hover:shadow-md hover:border-foreground/30 transition-all group"
            >
              {/* Connector arrow between phases (lg only) */}
              {i < PHASES.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden lg:block absolute -right-3.5 top-8 z-10 text-text-muted text-sm select-none"
                >
                  &rarr;
                </span>
              )}

              {/* Phase number + emoji */}
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] text-xs font-black flex-shrink-0">
                  {phase.number}
                </span>
                <span className="text-xl" aria-hidden="true">{phase.emoji}</span>
              </div>

              {/* Label + duration */}
              <div className="mb-3">
                <h3 className="text-base font-bold text-foreground">{phase.label}</h3>
                <span className="text-xs text-text-muted font-mono">{phase.duration}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-text-muted leading-relaxed mb-5">
                {phase.description}
              </p>

              {/* Deliverables */}
              <ul className="space-y-2 mt-auto">
                {phase.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-xs text-text-muted leading-normal">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-lime mt-1.5 flex-shrink-0 shadow-[0_0_4px_rgba(184,255,0,0.6)]" aria-hidden="true" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
