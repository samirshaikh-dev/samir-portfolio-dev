import Link from "next/link";
import {
  LuClock,
  LuGlobe,
  LuCpu,
  LuCheck,
  LuShieldCheck,
  LuBriefcase,
  LuMail,
  LuFileText,
  LuCalendar,
} from "react-icons/lu";

interface RecruiterCheatSheetProps {
  className?: string;
}

export default function RecruiterCheatSheet({ className = "" }: RecruiterCheatSheetProps) {
  return (
    <section
      aria-labelledby="recruiter-fast-track-heading"
      className={`rounded-3xl border border-border-primary bg-background/90 dark:bg-card-bg/90 backdrop-blur-md p-6 sm:p-8 shadow-sm ${className}`}
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border-primary/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-primary bg-hover-bg text-[11px] font-mono font-bold tracking-wider text-text-secondary uppercase mb-2 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-accent-lime animate-pulse shadow-[0_0_8px_rgba(184,255,0,0.8)]" />
            RECRUITER &amp; HIRING MANAGER FAST-TRACK
          </div>
          <h2
            id="recruiter-fast-track-heading"
            className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
          >
            Hiring Cheat Sheet &bull; Snapshot
          </h2>
          <p className="text-text-muted text-xs sm:text-sm mt-1 max-w-xl">
            Everything you need for initial ATS screening, recruiter sync, or hiring committee review in 30 seconds.
          </p>
        </div>

        {/* Action cluster */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap shrink-0">
          <Link
            href="/contact?intent=full-time"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-accent-lime text-[#0A0A0A] text-xs font-black hover:shadow-[0_0_16px_rgba(184,255,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xs"
          >
            <LuMail className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Send Direct Role Inquiry</span>
          </Link>
          <a
            href="https://calendar.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border-primary bg-background dark:bg-card-bg text-foreground text-xs font-bold hover:bg-hover-bg hover:border-foreground/30 transition-all shadow-2xs"
          >
            <LuCalendar className="w-3.5 h-3.5 text-text-muted" />
            <span>Book 15m Screen</span>
          </a>
        </div>
      </div>

      {/* 6-Tile Telemetry Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
        {/* Tile 1: Target Roles & Focus */}
        <div className="p-4 sm:p-5 rounded-2xl border border-border-primary/80 bg-hover-bg/30 hover:border-foreground/30 transition-all">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
            <LuBriefcase className="w-4 h-4 text-accent-lime" />
            Target Positions
          </div>
          <div className="text-base font-bold text-foreground leading-snug">
            AI Backend Engineer &bull; AI SDE &bull; Full Stack
          </div>
          <div className="text-xs text-text-secondary mt-1.5 leading-relaxed">
            Also considering Forward Deployed Engineer (FDE) and Autonomous Agent Engineering roles.
          </div>
        </div>

        {/* Tile 2: Availability & Notice Period */}
        <div className="p-4 sm:p-5 rounded-2xl border border-border-primary/80 bg-hover-bg/30 hover:border-foreground/30 transition-all">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
            <LuClock className="w-4 h-4 text-accent-lime" />
            Notice Period &amp; Start
          </div>
          <div className="text-base font-bold text-foreground flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-accent-lime" />
            Immediate Availability
          </div>
          <div className="text-xs text-text-secondary mt-1.5 leading-relaxed">
            0 days notice. Can onboard immediately into high-velocity production engineering teams.
          </div>
        </div>

        {/* Tile 3: Timezone Overlap */}
        <div className="p-4 sm:p-5 rounded-2xl border border-border-primary/80 bg-hover-bg/30 hover:border-foreground/30 transition-all">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
            <LuGlobe className="w-4 h-4 text-accent-lime" />
            Timezone Sync &amp; Overlap
          </div>
          <div className="text-base font-bold text-foreground">
            US, EU &amp; APAC Overlap
          </div>
          <div className="text-xs text-text-secondary mt-1.5 leading-relaxed">
            Based in India (IST, UTC+5:30). 4–6 hrs synchronous overlap with US East/West &amp; full overlap with EU/UK.
          </div>
        </div>

        {/* Tile 4: Production Core Stack */}
        <div className="p-4 sm:p-5 rounded-2xl border border-border-primary/80 bg-hover-bg/30 hover:border-foreground/30 transition-all">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
            <LuCpu className="w-4 h-4 text-accent-lime" />
            Core Production Stack
          </div>
          <div className="text-base font-bold text-foreground">
            Node.js &bull; TypeScript &bull; Next.js
          </div>
          <div className="text-xs text-text-secondary mt-1.5 leading-relaxed">
            PostgreSQL (pgvector 3072d), Neon, Redis/BullMQ, Drizzle ORM, Gemini 2.0 &amp; Groq APIs.
          </div>
        </div>

        {/* Tile 5: Education & Credentials */}
        <div className="p-4 sm:p-5 rounded-2xl border border-border-primary/80 bg-hover-bg/30 hover:border-foreground/30 transition-all">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
            <LuCheck className="w-4 h-4 text-accent-lime stroke-[2.5]" />
            Education &amp; Track Record
          </div>
          <div className="text-base font-bold text-foreground">
            B.Tech in Information Tech
          </div>
          <div className="text-xs text-text-secondary mt-1.5 leading-relaxed">
            8.44 CGPA (2022–2026). Multiple production deployments with real-world users and verified codebases.
          </div>
        </div>

        {/* Tile 6: Engagement & Compliance */}
        <div className="p-4 sm:p-5 rounded-2xl border border-border-primary/80 bg-hover-bg/30 hover:border-foreground/30 transition-all">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
            <LuShieldCheck className="w-4 h-4 text-accent-lime" />
            Contract &amp; Compliance
          </div>
          <div className="text-base font-bold text-foreground">
            Full-Time or B2B Contractor
          </div>
          <div className="text-xs text-text-secondary mt-1.5 leading-relaxed">
            Deel / Remote.com compliant, W-8BEN ready for US clients, standard IP assignment agreements.
          </div>
        </div>
      </div>

      {/* Quick Verification Footer */}
      <div className="mt-6 pt-4 border-t border-border-primary/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-text-muted font-mono">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
            Verified English Proficiency (C1/Fluent)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
            Clean Background &amp; Direct IP Transfer
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/services"
            className="text-text-secondary hover:text-foreground underline underline-offset-4 decoration-border-primary hover:decoration-accent-lime transition-colors"
          >
            View Freelance Sprints &rarr;
          </Link>
          <Link
            href="/hire"
            className="text-text-secondary hover:text-foreground underline underline-offset-4 decoration-border-primary hover:decoration-accent-lime transition-colors font-bold"
          >
            Dedicated Hiring Hub &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
