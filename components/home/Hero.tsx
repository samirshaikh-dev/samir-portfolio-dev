import Link from "next/link";
import { AVAILABILITY_STATUS } from "@/lib/site-config";
import { FiArrowRight, FiArrowDown } from "react-icons/fi";

const CAPABILITIES_STRIP = [
  "Backend Architecture",
  "High-Throughput APIs",
  "Relational & Vector Data",
  "Asynchronous Queues",
  "AI Integration",
];

export default function Hero() {
  return (
    <section
      className="relative px-5 pt-8 pb-16 sm:px-8 md:px-10 md:pt-14 md:pb-24 flex flex-col items-center overflow-hidden"
      aria-label="Introduction and core engineering identity"
    >
      {/* Subtle editorial dot-matrix ambient texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(#0A0A0A_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] dark:opacity-[0.06] pointer-events-none -z-10"
      />

      <div className="w-full max-w-6xl flex flex-col">
        {/* ── TOP UTILITY & STATUS BAR ─────────────────────────────────────── */}
        <div className="mb-8 md:mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 border-b border-border-primary/80 pb-5">
          {/* Identity Tag */}
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-mono font-medium tracking-wider text-text-muted uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
            <span>FULL-STACK SOFTWARE ENGINEER &bull; BACKEND &amp; AI SYSTEMS</span>
          </div>

          {/* Availability Status */}
          <div className="flex items-center">
            <span
              className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg transition-colors ${
                AVAILABILITY_STATUS === "available"
                  ? "text-foreground"
                  : "text-text-muted"
              }`}
            >
              <span
                aria-hidden="true"
                className={`w-2 h-2 rounded-full ${
                  AVAILABILITY_STATUS === "available"
                    ? "bg-accent-lime shadow-[0_0_8px_rgba(184,255,0,0.8)] animate-pulse"
                    : "bg-border-primary"
                }`}
              />
              <span>Open to full-time engineering &amp; selected projects</span>
            </span>
          </div>
        </div>

        {/* ── HERO HEADLINE & EDITORIAL CONTENT ─────────────────────────────── */}
        <div className="space-y-6 md:space-y-8 max-w-4xl">
          {/* Main Statement */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black text-foreground tracking-tight leading-[1.05]">
            I build software that solves{" "}
            <span
              className="font-serif italic font-normal text-text-secondary dark:text-text-secondary"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              real problems.
            </span>
          </h1>

          {/* Supporting Headline */}
          <p className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground/90 tracking-tight leading-snug">
            Full-Stack Engineer focused on backend systems, application architecture and AI-powered products.
          </p>

          {/* Philosophy & Approach */}
          <p className="hero-intro text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl">
            I care about understanding the problem, choosing the right approach, and building software that works beyond the demo.
          </p>

          {/* Guiding Manifesto */}
          <div className="pt-1 flex items-center gap-2.5 text-xs sm:text-sm font-mono text-text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
            <span className="italic">&ldquo;Don&apos;t count my years. Examine my engineering.&rdquo;</span>
          </div>

          {/* Action CTAs: Focused & Free of Clutter */}
          <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground text-sm font-bold px-7 py-3.5 shadow-xs hover:opacity-90 active:scale-[0.98] transition-all focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none"
            >
              <span>Let&apos;s Talk</span>
              <FiArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>

            <a
              href="#selected-work"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border-primary bg-background dark:bg-card-bg text-foreground text-sm font-bold px-7 py-3.5 hover:bg-hover-bg hover:border-foreground/30 shadow-2xs transition-all focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none"
            >
              <span>Explore My Work</span>
              <FiArrowDown className="w-4 h-4" />
            </a>

            <Link
              href="/resume"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-text-secondary hover:text-foreground px-4 py-3 transition-colors group"
            >
              <span>View Résumé</span>
              <span className="text-text-muted group-hover:text-foreground transition-colors">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* ── MINIMAL CAPABILITY STRIP ───────────────────────────────────────── */}
        <div className="mt-14 md:mt-20 pt-6 border-t border-border-primary/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-text-muted">
              Core Technical Focus
            </span>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {CAPABILITIES_STRIP.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-3 py-1 rounded-md border border-border-primary/70 bg-hover-bg/40 text-xs font-mono text-text-secondary"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
