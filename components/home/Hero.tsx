import { getGithubStats } from "@/lib/github";
import { AVAILABILITY_STATUS, AVAILABILITY_LABEL } from "@/lib/site-config";
import Link from "next/link";
import { FaGithub, FaStar, FaCodeBranch, FaUsers } from "react-icons/fa6";
import { FiGitCommit, FiArrowRight, FiArrowDown } from "react-icons/fi";

type GithubStats = Awaited<ReturnType<typeof getGithubStats>>;
type ContributionWeek = GithubStats["calendar"][number];
type ContributionDay = ContributionWeek["contributionDays"][number];

export default async function Hero() {
  const token = process.env.GITHUB_TOKEN;
  let stats: GithubStats | null = null;
  let error: string | null = null;

  try {
    if (token) {
      stats = await getGithubStats(token, "samirshaikh-dev");
    } else {
      error = "GitHub token not configured";
    }
  } catch (e: unknown) {
    error = e instanceof Error ? e.message : "Failed to load GitHub stats";
  }

  // Pre-calculate active day metrics if stats exist
  const allDays = stats ? stats.calendar.flatMap((week: ContributionWeek) => week.contributionDays) : [];
  const last28Days = allDays.slice(-28);
  const activeDaysCount = last28Days.filter((d: ContributionDay) => d.contributionCount > 0).length;

  return (
    <section className="relative px-5 pt-4 pb-12 sm:px-8 md:px-10 md:pt-8 md:pb-20 flex flex-col items-center overflow-hidden">
      {/* Background ambient lighting matching LinkedIn Banner */}
      <div
        aria-hidden="true"
        className="absolute -top-32 right-0 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-[radial-gradient(circle,rgba(184,255,0,0.18)_0%,transparent_65%)] dark:bg-[radial-gradient(circle,rgba(184,255,0,0.09)_0%,transparent_65%)] blur-3xl pointer-events-none -z-10"
      />
      {/* Subtle geometric dot matrix texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(#0A0A0A_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.035] dark:opacity-[0.07] pointer-events-none -z-10"
      />

      <div className="w-full max-w-6xl flex flex-col">
        {/* ── TOP UTILITY & TRUST ROW ─────────────────────────────────────── */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left Callout: Open to AI & Backend Roles + LET'S TALK */}
          {/* <div className="inline-flex items-center gap-3 bg-background/90 dark:bg-card-bg/90 backdrop-blur-md border border-border-primary rounded-2xl p-2 sm:px-3.5 sm:py-2 shadow-2xs w-fit">
            <div className="w-1 sm:w-1.5 h-8 bg-foreground dark:bg-accent-lime rounded-full flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-text-muted leading-tight font-mono">
                Open to
              </span>
              <span className="text-xs sm:text-sm font-bold text-foreground leading-tight">
                AI &amp; Backend Roles
              </span>
            </div>
            <Link
              href="/contact"
              className="ml-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-accent-lime text-[#0A0A0A] font-extrabold text-[11px] sm:text-xs tracking-wider uppercase shadow-xs hover:shadow-[0_0_18px_rgba(184,255,0,0.5)] hover:scale-[1.03] active:scale-[0.98] transition-all"
            >
              LET&apos;S TALK <FiArrowRight className="text-xs stroke-[2.5]" />
            </Link>
          </div> */}

          {/* Right Trust Badges: Live Availability */}
          <div className="flex items-center">
            {/* Live Availability Status */}
            <span
              className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border border-border-primary bg-background/80 dark:bg-card-bg/80 backdrop-blur-xs shadow-2xs transition-colors ${
                AVAILABILITY_STATUS === "available"
                  ? "text-foreground"
                  : AVAILABILITY_STATUS === "limited"
                  ? "text-yellow-700 dark:text-yellow-400"
                  : "text-red-700 dark:text-red-400"
              }`}
            >
              <span
                aria-hidden="true"
                className={`w-2 h-2 rounded-full animate-pulse ${
                  AVAILABILITY_STATUS === "available"
                    ? "bg-accent-lime shadow-[0_0_8px_rgba(184,255,0,0.8)]"
                    : AVAILABILITY_STATUS === "limited"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              />
              {AVAILABILITY_LABEL}
            </span>
          </div>
        </div>

        {/* ── HERO HEADLINE & VALUE PROP ──────────────────────────────────── */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs sm:text-sm font-mono font-medium uppercase tracking-widest text-text-muted mb-3 flex items-center gap-2">
            <span className="w-5 h-[2px] bg-accent-lime rounded-full" />
            Hey, I&apos;m
          </p>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-[1.08] mb-4">
            Samir Shaikh{" "}
            <span
              className="block sm:inline font-serif italic font-normal text-text-secondary dark:text-text-secondary text-2xl sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              &mdash; AI Developer
            </span>{" "}
            <span className="inline-block text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-foreground px-3 py-1 rounded-xl border border-border-primary bg-background/90 dark:bg-card-bg shadow-2xs align-middle mt-1 sm:mt-0">
              (Backend-First)
            </span>
          </h1>

          <p className="hero-intro text-base sm:text-lg md:text-xl text-text-secondary dark:text-text-secondary max-w-3xl leading-relaxed mb-8">
            Helping startups, founders, and engineering teams build reliable AI agents, custom RAG systems, and robust backend architectures. Available for freelance projects &mdash; shipping end-to-end full stack web applications with zero fluff.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-lime text-[#0A0A0A] text-sm font-extrabold px-7 py-3.5 shadow-xs hover:shadow-[0_0_22px_rgba(184,255,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              View Services
              <FiArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border-primary bg-background dark:bg-card-bg text-foreground text-sm font-bold px-7 py-3.5 hover:bg-hover-bg hover:border-foreground/30 shadow-2xs transition-all"
            >
              Book a Free Call
            </Link>
            <a
              href="#case-studies"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-text-secondary hover:text-foreground px-3 py-3 transition-colors group"
            >
              Explore Selected Work
              <FiArrowDown className="text-xs transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* ── LIVE ENGINEERING TELEMETRY DASHBOARD (BENTO) ────────────────── */}
        <div id="telemetry" className="pt-2">
          {/* Section Sub-header for Bento */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 pb-3 border-b border-border-primary/80">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-text-muted mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
                VERIFIED VELOCITY
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                Live Engineering Activity
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-text-muted mt-1 sm:mt-0 font-mono">
              Live GitHub telemetry &middot; samirshaikh-dev
            </p>
          </div>

          {error && (
            <div className="p-6 bg-red-500/10 text-red-600 dark:text-red-400 rounded-3xl border border-red-500/30 flex items-center gap-3">
              <FaGithub className="text-xl" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          {stats && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
              {/* 1. Large Commit Activity Card (7 cols on desktop) */}
              <div className="lg:col-span-7 bg-background dark:bg-card-bg text-foreground p-6 sm:p-7 md:p-8 rounded-3xl shadow-sm border border-border-primary flex flex-col justify-between hover:border-foreground/30 hover:shadow-md transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <FiGitCommit className="text-lg text-foreground dark:text-accent-lime" />
                      <h3 className="font-bold tracking-wider text-xs uppercase text-text-muted font-mono">
                        Commits Telemetry
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-text-muted border border-border-primary rounded-full px-2.5 py-0.5 bg-hover-bg/50">
                      Last 28 Days
                    </span>
                  </div>

                  <div className="flex items-baseline gap-3">
                    <div className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
                      {stats.commits.toLocaleString()}
                    </div>
                    <span className="text-xs sm:text-sm text-text-muted font-medium">
                      production commits
                    </span>
                  </div>
                </div>

                {/* Interactive Bar Chart Graph */}
                <div className="mt-8 flex flex-col flex-1 justify-end min-h-[130px]">
                  <div className="flex items-end gap-[3px] sm:gap-1.5 h-28 pt-4 w-full">
                    {last28Days.map((day: ContributionDay, i: number) => {
                      const total = day.contributionCount;
                      const height = total === 0 ? 6 : Math.max(18, Math.min(100, (total / 6) * 100));
                      const dateObj = new Date(day.date);
                      const dayDate = dateObj.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

                      const barColor = total === 0
                        ? "bg-hover-bg group-hover/bar:bg-border-primary"
                        : "bg-border-primary group-hover/bar:bg-[#0A0A0A] dark:group-hover/bar:bg-accent-lime dark:group-hover/bar:shadow-[0_0_8px_rgba(184,255,0,0.6)]";

                      return (
                        <div key={i} className="relative flex-1 group/bar h-full flex items-end">
                          <div
                            className={`w-full rounded-t-xs transition-all duration-200 cursor-pointer ${barColor}`}
                            style={{ height: `${height}%` }}
                          />

                          {/* Hover Tooltip */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-background dark:bg-card-bg text-foreground border border-border-primary text-xs whitespace-nowrap rounded-xl opacity-0 group-hover/bar:opacity-100 transition-all duration-200 pointer-events-none z-50 shadow-xl flex flex-col items-center scale-95 group-hover/bar:scale-100">
                            <span className="font-bold text-foreground">{total} commits</span>
                            <span className="text-text-muted text-[10px] font-mono">{dayDate}</span>
                            <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-background dark:bg-card-bg border-b border-r border-border-primary transform rotate-45" />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Graph Footer Stats Strip */}
                  <div className="mt-4 pt-3 border-t border-border-primary/60 flex items-center justify-between text-xs text-text-muted font-mono">
                    <span>{activeDaysCount} active days / 28d</span>
                    <span className="text-[11px] uppercase tracking-wider text-foreground font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
                      Consistent Velocity
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Four Balanced Metric Tiles (5 cols on desktop, 2x2 grid) */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-5">
                {/* Total Stars */}
                <div className="bg-background dark:bg-card-bg p-5 sm:p-6 rounded-3xl shadow-sm border border-border-primary hover:border-foreground/30 hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-text-muted mb-3">
                    <FaStar className="text-base text-amber-400" />
                    <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted">Total Stars</h3>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground">
                      {stats.totalStars.toLocaleString()}
                    </div>
                    <p className="text-[11px] text-text-muted mt-1">earned across repos</p>
                  </div>
                </div>

                {/* Followers */}
                <div className="bg-background dark:bg-card-bg p-5 sm:p-6 rounded-3xl shadow-sm border border-border-primary hover:border-foreground/30 hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-text-muted mb-3">
                    <FaUsers className="text-base text-foreground dark:text-accent-lime" />
                    <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted">Followers</h3>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground">
                      {stats.followers.toLocaleString()}
                    </div>
                    <p className="text-[11px] text-text-muted mt-1">developer network</p>
                  </div>
                </div>

                {/* Pull Requests */}
                <div className="bg-background dark:bg-card-bg p-5 sm:p-6 rounded-3xl shadow-sm border border-border-primary hover:border-foreground/30 hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-text-muted mb-3">
                    <FaCodeBranch className="text-base text-foreground dark:text-accent-lime" />
                    <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted">Pull Requests</h3>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground">
                      {stats.totalPRs.toLocaleString()}
                    </div>
                    <p className="text-[11px] text-text-muted mt-1">merged &amp; reviewed</p>
                  </div>
                </div>

                {/* Repositories & LOC */}
                <div className="bg-background dark:bg-card-bg p-5 sm:p-6 rounded-3xl shadow-sm border border-border-primary hover:border-foreground/30 hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-text-muted mb-3">
                    <FaGithub className="text-base text-foreground dark:text-accent-lime" />
                    <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted">Repositories</h3>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground">
                      {stats.totalRepos.toLocaleString()}
                    </div>
                    <p className="text-[11px] text-text-muted mt-1 font-mono">
                      ~{stats.linesOfCode.toLocaleString()} LOC
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
