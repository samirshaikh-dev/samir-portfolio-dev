import Link from "next/link";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export default function CallToAction() {
  return (
    <section className="px-5 sm:px-8 md:px-10 py-16 md:py-24" aria-label="Start a project CTA">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-border-primary bg-background dark:bg-card-bg p-8 sm:p-12 md:p-16 text-center shadow-sm">
          {/* Subtle Ambient Electric Lime Center Glow */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(184,255,0,0.14)_0%,transparent_65%)] dark:bg-[radial-gradient(circle,rgba(184,255,0,0.08)_0%,transparent_65%)] blur-3xl pointer-events-none -z-10"
          />

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background/90 dark:bg-card-bg/90 text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
            LET&apos;S BUILD OR COLLABORATE
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground max-w-2xl mx-auto mb-4 leading-tight">
            Have an AI Challenge, Open Role, or Project in Mind?
          </h2>

          {/* Value Prop */}
          <p className="text-text-muted text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8">
            Whether you&apos;re looking to hire a full-time AI Backend / Full Stack Engineer, need a 3–5 day codebase audit, or want to augment your SaaS with production AI &mdash; let&apos;s build software that scales reliably.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-lime text-[#0A0A0A] text-sm font-extrabold px-8 py-3.5 shadow-xs hover:shadow-[0_0_24px_rgba(184,255,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Get in Touch
              <FiArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border-primary bg-background dark:bg-card-bg text-foreground text-sm font-bold px-7 py-3.5 hover:bg-hover-bg hover:border-foreground/30 shadow-2xs transition-all"
            >
              View Resume
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border-primary bg-background dark:bg-card-bg text-text-secondary hover:text-foreground text-sm font-bold px-7 py-3.5 hover:bg-hover-bg hover:border-foreground/30 shadow-2xs transition-all"
            >
              Explore Services
            </Link>
          </div>

          {/* Reassurance Features */}
          <div className="pt-6 border-t border-border-primary/60 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-text-muted font-mono">
            <span className="inline-flex items-center gap-1.5">
              <FiCheck className="text-foreground dark:text-accent-lime text-sm" />
              Full-Time Remote &amp; Contract Ready
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FiCheck className="text-foreground dark:text-accent-lime text-sm" />
              Direct Engineer Communication
``            </span>
            <span className="inline-flex items-center gap-1.5">
              <FiCheck className="text-foreground dark:text-accent-lime text-sm" />
              100% Repository &amp; IP Transfer
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
