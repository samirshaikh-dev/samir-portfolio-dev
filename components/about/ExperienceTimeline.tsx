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
    <section className="mt-20" aria-label="Work Experience">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-border-primary/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-3 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
            CAREER HISTORY
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground">
            Work Experience
          </h2>
          <p className="text-text-muted text-sm sm:text-base mt-1.5 max-w-xl leading-relaxed">
            Hands-on engineering roles building AI agents, scalable RAG pipelines, and high-throughput backend microservices.
          </p>
        </div>

        <Link
          href="/resume"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-foreground hover:text-accent-lime transition-colors underline-offset-4 hover:underline self-start sm:self-auto whitespace-nowrap"
        >
          <span>View full PDF resume</span>
          <LuArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Timeline Track */}
      <div className="relative border-l-2 border-border-primary ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-8">
        {experiences.map((exp, index) => {
          const startDateStr = formatDate(exp.startDate);
          const endDateStr = exp.isCurrent ? "Present" : formatDate(exp.endDate);
          const dateRange = `${startDateStr} – ${endDateStr}`;

          return (
            <div key={exp.id || index} className="relative group">
              {/* Timeline Track Node */}
              <div
                className={`absolute -left-[35px] sm:-left-[43px] top-6 flex items-center justify-center w-8 h-8 rounded-full border bg-background dark:bg-card-bg shadow-2xs transition-all duration-300 group-hover:scale-110 ${
                  exp.isCurrent
                    ? "border-foreground dark:border-accent-lime ring-4 ring-background dark:ring-card-bg"
                    : "border-border-primary"
                }`}
              >
                {exp.logoUrl ? (
                  <Image
                    src={exp.logoUrl}
                    alt={`${exp.companyName} logo`}
                    width={20}
                    height={20}
                    className="w-5 h-5 rounded-md object-cover"
                  />
                ) : exp.isCurrent ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-lime shadow-[0_0_8px_rgba(184,255,0,0.8)]" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-border-primary group-hover:bg-foreground transition-colors" />
                )}
              </div>

              {/* Elevated Experience Card */}
              <article
                className={`relative rounded-2xl border bg-background dark:bg-card-bg p-6 sm:p-7 shadow-2xs hover:shadow-md hover:border-foreground/30 transition-all duration-300 overflow-hidden ${
                  exp.isCurrent
                    ? "border-border-secondary ring-1 ring-border-primary/60 dark:shadow-[0_0_24px_rgba(184,255,0,0.06)]"
                    : "border-border-primary"
                }`}
              >
                {/* Electric Lime Accent for Current Role */}
                {exp.isCurrent && (
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-6 sm:left-8 w-12 sm:w-16 h-[2px] bg-accent-lime shadow-[0_0_8px_rgba(184,255,0,0.8)]"
                  />
                )}

                {/* Role & Company Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2.5 mb-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-foreground/90 transition-colors">
                      {exp.position}
                    </h3>
                    <div className="text-sm sm:text-base font-semibold text-text-secondary mt-0.5">
                      {exp.companyName}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
                    {exp.isCurrent ? (
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-extrabold px-3 py-1 rounded-full border border-foreground/20 bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] dark:border-accent-lime shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-lime dark:bg-[#0A0A0A] animate-pulse" />
                        Present
                      </span>
                    ) : null}
                    <span className="font-mono text-xs text-text-muted whitespace-nowrap px-2.5 py-1 rounded-full border border-border-primary/70 bg-hover-bg/50">
                      {dateRange}
                    </span>
                  </div>
                </div>

                {/* Role Description */}
                {exp.description && (
                  <div className="pt-3 border-t border-border-primary/50">
                    <HtmlParser
                      html={exp.description}
                      className="prose prose-sm prose-gray dark:prose-invert max-w-none text-text-secondary dark:text-text-secondary leading-relaxed [&_p]:my-2 [&_ul]:my-2 [&_li]:my-1 [&_li]:text-text-secondary [&_strong]:text-foreground [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-accent-lime transition-colors"
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
