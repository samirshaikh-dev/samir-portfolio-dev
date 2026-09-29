import Link from "next/link";
import { JSX } from "react";

interface HowIWorkProps {
  /** "full" shows all detail (services page). "compact" shows condensed version (homepage). */
  variant?: "full" | "compact";
}

interface Phase {
  number: string;
  label: string;
  duration: string;
  description: string;
  deliverables: string[];
  icon: JSX.Element;
}

const PHASES: Phase[] = [
  {
    number: "01",
    label: "Discovery & Alignment",
    duration: "Day 1–2",
    description:
      "We align on business goals, constraints, and success criteria before a single line of code is written.",
    deliverables: [
      "Free 30-minute discovery call",
      "Business objective & data schema review",
      "Architecture discussion & technical feasibility",
      "Scope definition & edge-case identification",
    ],
    icon: (
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    number: "02",
    label: "Blueprint & Roadmap",
    duration: "Day 2–3",
    description:
      "You receive a clear, fixed-price milestone proposal with exact delivery dates — zero open-ended ambiguity.",
    deliverables: [
      "Fixed-price milestone proposal",
      "Technical spec & delivery roadmap",
      "API schema & system design contract",
      "Mutual NDA signed (if required)",
    ],
    icon: (
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    number: "03",
    label: "Sprint Execution",
    duration: "Week 1–N",
    description:
      "Daily Git commits and async updates keep you in the loop. You review working software on a staging URL at every milestone.",
    deliverables: [
      "Daily Git commits with descriptive messages",
      "Async Slack / WhatsApp progress updates",
      "Staging preview at each milestone",
      "Revision rounds included at zero extra cost",
    ],
    icon: (
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    number: "04",
    label: "Launch & IP Handover",
    duration: "Final Day",
    description:
      "Your project goes live on your accounts. You own 100% of the code, infrastructure, and intellectual property.",
    deliverables: [
      "CI/CD deployment to your cloud accounts",
      "Full README & runbook documentation",
      "100% repository transferred to your GitHub org",
      "30-day post-launch warranty included",
    ],
    icon: (
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
];

const SPRINT_METRICS = [
  { label: "Commit Cadence", value: "Daily", detail: "Transparent Git history" },
  { label: "Staging Previews", value: "Every Milestone", detail: "Test before payout" },
  { label: "IP Ownership", value: "100% Transferred", detail: "Direct to your private repo" },
  { label: "Post-Launch", value: "30-Day Warranty", detail: "Zero-cost fixes included" },
];

export default function HowIWork({ variant = "full" }: HowIWorkProps) {
  const isCompact = variant === "compact";

  return (
    <section
      className={`relative overflow-hidden px-5 sm:px-8 md:px-10 py-16 md:py-24 ${
        isCompact ? "border-t border-border-primary/80" : ""
      }`}
      aria-label="How I work — engineering workflow and delivery process"
    >
      {/* Atmospheric Depth: Radial Lime Glow + Geometric Dot Matrix */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-[380px] w-[380px] bg-[radial-gradient(circle,rgba(184,255,0,0.12)_0%,transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(184,255,0,0.06)_0%,transparent_70%)] sm:h-[480px] sm:w-[480px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0A0A0A_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.025] dark:opacity-[0.05]"
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 pb-4 border-b border-border-primary/80 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-3 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
              DELIVERY CADENCE &amp; PROCESS
            </div>
            <h2
              className={`font-black tracking-tight text-foreground ${
                isCompact ? "text-3xl sm:text-4xl md:text-5xl" : "text-3xl md:text-4xl mt-1"
              }`}
            >
              How I Work{" "}
              <span className="font-serif italic font-normal text-text-secondary text-2xl sm:text-3xl md:text-4xl block sm:inline">
                — From Discovery to Production
              </span>
            </h2>
            <p className="text-text-muted mt-2 text-sm sm:text-base max-w-xl leading-relaxed">
              Deterministic, milestone-driven delivery for AI systems and backend infrastructure. Zero guesswork, daily Git commits, and 100% intellectual property ownership.
            </p>
          </div>

          <Link
            href="/contact"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-foreground px-5 py-2.5 rounded-full border border-border-primary bg-background dark:bg-card-bg shadow-2xs hover:border-foreground/30 hover:bg-hover-bg active:scale-[0.98] transition-all group shrink-0"
          >
            <span>Start a Project</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Phase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PHASES.map((phase, i) => (
            <div
              key={phase.number}
              className="relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-border-primary bg-background dark:bg-card-bg p-6 sm:p-7 hover:shadow-lg hover:border-foreground/30 transition-all duration-300 shadow-2xs group overflow-hidden"
            >
              {/* Ambient top-pinned accent dot on hover */}
              <span
                aria-hidden="true"
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-accent-lime border border-foreground/30 shadow-[0_0_8px_rgba(184,255,0,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              {/* Card Header: Step Index + Duration + SVG Icon */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl border border-border-primary bg-background dark:bg-card-bg text-foreground dark:text-accent-lime font-mono font-black text-xs shadow-2xs group-hover:border-foreground/30 transition-colors">
                      {phase.number}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-text-muted px-2.5 py-0.5 rounded-full border border-border-primary/60 bg-hover-bg/50">
                      {phase.duration}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-xl border border-border-primary/80 bg-hover-bg/40 flex items-center justify-center text-foreground dark:text-accent-lime shadow-2xs group-hover:scale-110 transition-transform">
                    {phase.icon}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-black tracking-tight text-foreground mb-2 group-hover:text-foreground">
                  {phase.label}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                  {phase.description}
                </p>
              </div>

              {/* Deliverables Checklist */}
              <div className="mt-auto pt-4 border-t border-border-primary/60 space-y-2.5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted font-bold mb-2">
                  Key Deliverables:
                </div>
                <ul className="space-y-2" aria-label={`Deliverables for ${phase.label}`}>
                  {phase.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 text-xs text-text-secondary leading-snug">
                      <span
                        aria-hidden="true"
                        className="w-3.5 h-3.5 rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center text-[9px] font-black bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A]"
                      >
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Telemetry Sprint Guarantees Banner */}
        <div className="mt-10 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-border-primary bg-background dark:bg-card-bg shadow-2xs">
          {SPRINT_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className={`flex flex-col gap-1 ${
                idx !== SPRINT_METRICS.length - 1 ? "lg:border-r lg:border-border-primary/60 lg:pr-4" : ""
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                  {metric.label}
                </span>
              </div>
              <span className="text-sm sm:text-base font-extrabold text-foreground tracking-tight">
                {metric.value}
              </span>
              <span className="text-[11px] text-text-muted leading-tight">
                {metric.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
