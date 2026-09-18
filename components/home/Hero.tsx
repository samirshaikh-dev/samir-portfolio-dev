import { getGithubStats } from "@/lib/github";
import { AVAILABILITY_STATUS, AVAILABILITY_LABEL } from "@/lib/site-config";
import Link from "next/link";
import { FaGithub, FaStar, FaCodeBranch, FaUsers, FaFileCode } from "react-icons/fa6";
import { FiGitCommit } from "react-icons/fi";

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

  return (
    <section className="px-6 pb-6 md:px-10 md:pb-12 flex-1 flex flex-col items-center">
      <div className="w-full max-w-6xl flex-1 flex flex-col">
        {/* Intro */}
        <div className="pt-6 md:pt-10 mb-8">
          {/* Availability badge */}
          <div className="mb-4">
            <span
              className={`inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                AVAILABILITY_STATUS === "available"
                  ? "bg-green-50 dark:bg-green-950/40 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400"
                  : AVAILABILITY_STATUS === "limited"
                  ? "bg-yellow-50 dark:bg-yellow-950/40 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-400"
                  : "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400"
              }`}
            >
              <span
                aria-hidden="true"
                className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                  AVAILABILITY_STATUS === "available"
                    ? "bg-green-500"
                    : AVAILABILITY_STATUS === "limited"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              />
              {AVAILABILITY_LABEL}
            </span>
          </div>

          <p className="text-base text-text-muted mb-1">Hey, I&apos;m</p>
          <h1
            className="text-4xl sm:text-5xl font-medium text-foreground tracking-tight mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Samir Shaikh &mdash; AI-Enabled Full Stack Developer (Backend-First)
          </h1>
          <p className="hero-intro text-base md:text-lg text-text-muted max-w-2xl leading-relaxed">
            Helping startups, founders, and engineering teams build reliable AI agents, RAG knowledge bases, and scalable full-stack web applications &mdash; delivered with clean system architecture and zero fluff.
          </p>

          {/* Hero CTA buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground text-sm font-medium px-5 py-2.5 hover:opacity-90 transition-opacity"
            >
              View Services
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border-primary bg-background text-foreground text-sm font-medium px-5 py-2.5 hover:bg-hover-bg transition-colors"
            >
              Book a Free Call
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* GitHub Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[minmax(110px,auto)]">
          {error && (
            <div className="col-span-full p-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-3xl border border-red-100 dark:border-red-800 flex items-center gap-3">
              <FaGithub className="text-xl" />
              <span>{error}</span>
            </div>
          )}

          {stats && (
            <>
              {/* Contributions Card - Large */}
              <div className="col-span-1 md:col-span-1 row-span-3 bg-background text-foreground p-6 md:p-8 rounded-3xl shadow-sm border border-border-primary flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-text-muted">
                    <FiGitCommit className="text-lg" />
                    <h3 className="font-medium tracking-wide text-xs uppercase">Commits</h3>
                  </div>
                  <div className="text-4xl md:text-5xl font-bold tracking-tight">
                    {stats.commits.toLocaleString()}
                  </div>
                  <p className="text-text-muted mt-1 text-sm">in the last 28 days</p>
                </div>

                {/* Interactive Bar Chart Graph */}
                <div className="mt-8 flex items-end gap-1.5 flex-1 min-h-[120px]">
                  {/* The Graph */}
                  <div className="flex-1 flex items-end gap-[3px] h-full pt-4">
                    {(() => {
                      const allDays = stats.calendar.flatMap((week: ContributionWeek) => week.contributionDays);
                      const last28Days = allDays.slice(-28);

                      return last28Days.map((day: ContributionDay, i: number) => {
                        const total = day.contributionCount;

                        // 0 commits: tiny subtle bar. Active days: scale up to 6 commits max for clear variation
                        const height = total === 0 ? 4 : Math.max(15, Math.min(100, (total / 6) * 100));

                        const dateObj = new Date(day.date);
                        const dayDate = dateObj.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

                        // distinct colors for active vs inactive days
                        const barColor = total === 0
                          ? "bg-hover-bg group-hover/bar:bg-border-primary"
                          : "bg-border-primary group-hover/bar:bg-green-500 dark:group-hover/bar:bg-[var(--accent-green)]";

                        return (
                          <div key={i} className="relative flex-1 group/bar h-full flex items-end">
                            <div
                              className={`w-full rounded-t-sm transition-all duration-300 cursor-pointer ${barColor}`}
                              style={{ height: `${height}%` }}
                            />

                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-background text-foreground border border-border-primary text-xs whitespace-nowrap rounded-lg opacity-0 group-hover/bar:opacity-100 transition-all duration-200 pointer-events-none z-50 shadow-lg flex flex-col items-center scale-95 group-hover/bar:scale-100">
                              <span className="font-semibold">{total} commits</span>
                              <span className="text-text-muted text-[10px]">{dayDate}</span>
                              {/* Tooltip Arrow */}
                              <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-background border-b border-r border-border-primary transform rotate-45"></div>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              </div>

              {/* Stars — only show when non-zero */}
              {stats.totalStars > 0 && (
              <div className="col-span-1 md:col-span-1 row-span-1 bg-background p-6 md:p-8 rounded-3xl shadow-sm border border-border-primary hover:shadow-md transition-shadow flex items-center justify-between">
                <div className="flex items-center gap-3 text-text-muted">
                  <FaStar className="text-xl" />
                  <h3 className="font-medium text-sm uppercase tracking-wider">Total Stars</h3>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground">{stats.totalStars.toLocaleString()}</div>
              </div>
              )}

              {/* Followers */}
              <div className="col-span-1 md:col-span-1 row-span-1 bg-background p-6 md:p-8 rounded-3xl shadow-sm border border-border-primary hover:shadow-md transition-shadow flex items-center justify-between">
                <div className="flex items-center gap-3 text-text-muted">
                  <FaUsers className="text-xl" />
                  <h3 className="font-medium text-sm uppercase tracking-wider">Followers</h3>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground">{stats.followers.toLocaleString()}</div>
              </div>

              {/* PRs — only show when non-zero */}
              {stats.totalPRs > 0 && (
              <div className="col-span-1 md:col-span-1 row-span-1 bg-background p-6 md:p-8 rounded-3xl shadow-sm border border-border-primary hover:shadow-md transition-shadow flex items-center justify-between">
                <div className="flex items-center gap-3 text-text-muted">
                  <FaCodeBranch className="text-xl" />
                  <h3 className="font-medium text-sm uppercase tracking-wider">Pull Requests</h3>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground">{stats.totalPRs.toLocaleString()}</div>
              </div>
              )}

              {/* Repositories */}
              <div className="col-span-1 md:col-span-1 row-span-1 bg-background p-6 md:p-8 rounded-3xl shadow-sm border border-border-primary hover:shadow-md transition-shadow flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2 text-text-muted">
                  <FaGithub className="text-xl" />
                  <h3 className="font-medium text-sm uppercase tracking-wider">Repositories</h3>
                </div>
                <div className="flex items-baseline gap-3">
                  <div className="text-3xl md:text-4xl font-bold text-foreground">{stats.totalRepos.toLocaleString()}</div>
                  <div className="text-xs font-medium text-text-muted border border-border-primary rounded-full px-2 py-0.5">
                    Contrib: {stats.contributedTo.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Lines of Code */}
              <div className="col-span-1 md:col-span-1 row-span-1 bg-background p-6 md:p-8 rounded-3xl shadow-sm border border-border-primary hover:shadow-md transition-shadow flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2 text-text-muted">
                  <FaFileCode className="text-xl" />
                  <h3 className="font-medium text-sm uppercase tracking-wider">Lines of Code</h3>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground truncate">~{stats.linesOfCode.toLocaleString()}</div>
              </div>

            </>
          )}
        </div>
      </div>
    </section>
  );
}
