import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { experiences as experiencesSchema } from "@/lib/schema";
import HtmlParser from "@/components/HtmlParser";
import { LuArrowRight } from "react-icons/lu";

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default async function ExperienceTimeline() {
  const experiences = await db
    .select()
    .from(experiencesSchema)
    .orderBy(experiencesSchema.displayOrder);

  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section className="mt-16" aria-label="Work Experience">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-border-primary">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-text-muted uppercase mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
            <span>CAREER HISTORY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
            Work Experience &amp; Engineering Roles
          </h2>
          <p className="text-text-muted text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
            Hands-on production roles building AI systems, RAG pipelines, and high-throughput backend services.
          </p>
        </div>

        <Link
          href="/resume"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-foreground hover:text-text-secondary transition-colors underline-offset-4 hover:underline self-start sm:self-auto whitespace-nowrap"
        >
          <span>View full PDF resume</span>
          <LuArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>

      {/* Timeline Track — Open Editorial Layout */}
      <div className="relative border-l border-border-primary ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-8">
        {experiences.map((exp, index) => {
          const startDateStr = formatDate(exp.startDate);
          const endDateStr = exp.isCurrent ? "Present" : formatDate(exp.endDate);
          const dateRange = `${startDateStr} – ${endDateStr}`;

          return (
            <div key={exp.id || index} className="relative group">
              {/* Timeline Track Node */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-6 flex items-center justify-center w-7 h-7 rounded-full border bg-background dark:bg-card-bg transition-colors ${
                  exp.isCurrent
                    ? "border-foreground dark:border-accent-lime"
                    : "border-border-primary"
                }`}
              >
                {exp.logoUrl ? (
                  <Image
                    src={exp.logoUrl}
                    alt={`${exp.companyName} logo`}
                    width={18}
                    height={18}
                    className="w-4 h-4 rounded object-cover"
                  />
                ) : exp.isCurrent ? (
                  <span className="w-2 h-2 rounded-full bg-accent-lime" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-border-primary group-hover:bg-foreground transition-colors" />
                )}
              </div>

              {/* Editorial Experience Article */}
              <article
                className={`rounded-2xl border p-5 sm:p-6 transition-colors ${
                  exp.isCurrent
                    ? "border-border-primary bg-background dark:bg-card-bg"
                    : "border-border-primary/80 bg-background dark:bg-card-bg/60 hover:border-foreground/30"
                }`}
              >
                {/* Role & Company Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground">
                      {exp.position}
                    </h3>
                    <div className="text-xs sm:text-sm font-semibold text-text-secondary mt-0.5">
                      {exp.companyName}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
                    {exp.isCurrent && (
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A]">
                        CURRENT
                      </span>
                    )}
                    <span className="font-mono text-xs text-text-muted px-2 py-0.5 rounded border border-border-primary/70 bg-hover-bg/40">
                      {dateRange}
                    </span>
                  </div>
                </div>

                {/* Role Description */}
                {exp.description && (
                  <div className="pt-3 border-t border-border-primary/60 text-xs sm:text-sm text-text-secondary">
                    <HtmlParser
                      html={exp.description}
                      className="prose prose-sm max-w-none text-text-secondary dark:text-text-secondary leading-relaxed [&_p]:my-1.5 [&_ul]:my-1.5 [&_li]:my-1 [&_li]:text-text-secondary [&_strong]:text-foreground [&_a]:text-foreground [&_a]:underline hover:[&_a]:text-accent-lime transition-colors"
                    />
                  </div>
                )}
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}
