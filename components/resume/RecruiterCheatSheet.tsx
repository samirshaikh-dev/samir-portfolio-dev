import Link from "next/link";
import {
  LuClock,
  LuGlobe,
  LuCpu,
  LuCheck,
  LuShieldCheck,
  LuBriefcase,
  LuMail,
  LuCalendar,
} from "react-icons/lu";

interface RecruiterCheatSheetProps {
  className?: string;
}

export default function RecruiterCheatSheet({ className = "" }: RecruiterCheatSheetProps) {
  return (
    <section
      aria-labelledby="recruiter-fast-track-heading"
      className={`rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-6 sm:p-8 ${className}`}
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border-primary">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-text-muted uppercase mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
            <span>HIRING &bull; RECRUITER FAST-TRACK</span>
          </div>
          <h2
            id="recruiter-fast-track-heading"
            className="text-xl sm:text-2xl font-black tracking-tight text-foreground"
          >
            Candidate Snapshot &amp; Due Diligence
          </h2>
          <p className="text-text-muted text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
            Essential data for ATS screening, technical recruiters, and hiring managers in under 30 seconds.
          </p>
        </div>

        {/* Action cluster */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap shrink-0">
          <Link
            href="/contact?intent=full-time"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] text-xs font-bold hover:opacity-90 transition-opacity"
          >
            <LuMail className="w-3.5 h-3.5" />
            <span>Send Role Inquiry</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border-primary bg-background dark:bg-card-bg text-foreground text-xs font-mono font-medium hover:bg-hover-bg transition-colors"
          >
            <LuCalendar className="w-3.5 h-3.5 text-text-muted" />
            <span>Schedule Intro Screen</span>
          </Link>
        </div>
      </div>

      {/* 6-Field Open Specification Grid (No Nested Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {/* Tile 1: Target Positions */}
        <div className="space-y-1.5 pb-4 md:pb-0 border-b md:border-b-0 border-border-primary/60">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-muted">
            <LuBriefcase className="w-3.5 h-3.5 text-accent-lime" aria-hidden="true" />
            <span>Target Roles</span>
          </div>
          <div className="text-sm sm:text-base font-bold text-foreground leading-snug">
            AI Backend Engineer &bull; AI SDE &bull; Full Stack
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Also considering Forward Deployed Engineer (FDE) and Autonomous Agent Engineering positions.
          </p>
        </div>

        {/* Tile 2: Availability */}
        <div className="space-y-1.5 pb-4 md:pb-0 border-b md:border-b-0 border-border-primary/60">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-muted">
            <LuClock className="w-3.5 h-3.5 text-accent-lime" aria-hidden="true" />
            <span>Availability &amp; Notice</span>
          </div>
          <div className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-accent-lime" />
            <span>Immediate Availability</span>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            0 days notice period. Can onboard immediately into high-velocity production teams.
          </p>
        </div>

        {/* Tile 3: Timezone Overlap */}
        <div className="space-y-1.5 pb-4 md:pb-0 border-b md:border-b-0 border-border-primary/60">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-muted">
            <LuGlobe className="w-3.5 h-3.5 text-accent-lime" aria-hidden="true" />
            <span>Timezone Overlap</span>
          </div>
          <div className="text-sm sm:text-base font-bold text-foreground">
            US, UK &amp; EU Overlap
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Based in India (IST, UTC+5:30). 4–6 hrs synchronous overlap with US East/West &amp; full day overlap with EU/UK.
          </p>
        </div>

        {/* Tile 4: Production Core Stack */}
        <div className="space-y-1.5 pt-2 md:pt-4 border-t border-border-primary/60">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-muted">
            <LuCpu className="w-3.5 h-3.5 text-accent-lime" aria-hidden="true" />
            <span>Core Production Stack</span>
          </div>
          <div className="text-sm sm:text-base font-bold text-foreground">
            Node.js &bull; TypeScript &bull; Next.js
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            PostgreSQL (pgvector 3072d), Redis/BullMQ, Docker, Drizzle ORM, Gemini 2.0 &amp; Groq APIs.
          </p>
        </div>

        {/* Tile 5: Education & Track Record */}
        <div className="space-y-1.5 pt-2 md:pt-4 border-t border-border-primary/60">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-muted">
            <LuCheck className="w-3.5 h-3.5 text-accent-lime" aria-hidden="true" />
            <span>Education &amp; Degree</span>
          </div>
          <div className="text-sm sm:text-base font-bold text-foreground">
            B.Tech in IT (2022–2026)
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            8.44 CGPA &bull; Uka Tarsadia University. Multiple production deployments with verified codebases.
          </p>
        </div>

        {/* Tile 6: Engagement & Compliance */}
        <div className="space-y-1.5 pt-2 md:pt-4 border-t border-border-primary/60">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-muted">
            <LuShieldCheck className="w-3.5 h-3.5 text-accent-lime" aria-hidden="true" />
            <span>Contract &amp; Compliance</span>
          </div>
          <div className="text-sm sm:text-base font-bold text-foreground">
            Full-Time or B2B Contractor
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Deel / Remote.com compliant, W-8BEN ready for US clients, standard IP assignment agreements.
          </p>
        </div>
      </div>

      {/* Verification Footer */}
      <div className="mt-8 pt-4 border-t border-border-primary flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-text-muted font-mono">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
            English Proficiency (C1/Fluent)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
            Clean Background &amp; Direct IP Assignment
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/services"
            className="text-text-secondary hover:text-foreground underline underline-offset-4"
          >
            View Sprint Blueprints &rarr;
          </Link>
          <Link
            href="/hire"
            className="text-foreground hover:text-text-secondary font-bold underline underline-offset-4"
          >
            Dedicated Hiring Hub &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
