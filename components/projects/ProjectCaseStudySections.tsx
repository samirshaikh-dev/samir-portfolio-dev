import Link from "next/link";
import { FiArrowRight, FiExternalLink, FiGithub } from "react-icons/fi";
import { parseMetric, type CaseStudySection } from "@/lib/projects/case-study";
import type { StackLayer } from "@/lib/projects/stack-taxonomy";

const FOCUS_RING =
  "focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function SectionHeading({
  id,
  kicker,
  title,
  description,
}: {
  id: string;
  kicker: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6 sm:mb-8">
      <p className="flex items-center gap-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-text-muted sm:text-[11px]">
        <span aria-hidden="true" className="h-px w-6 bg-accent-lime" />
        {kicker}
      </p>
      <h2
        id={id}
        className="mt-2 text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-4xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

export interface ProjectFact {
  label: string;
  value: string;
}

/* ── Project Overview ────────────────────────────────────────────── */

export function ProjectOverview({ facts }: { facts: ProjectFact[] }) {
  if (facts.length === 0) return null;

  return (
    <section id="overview" aria-labelledby="overview-heading" className="scroll-mt-16">
      <SectionHeading
        id="overview-heading"
        kicker="Overview"
        title="Project Overview"
        description="What this build is, the domain it operates in, and how the work is accessible."
      />
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border-primary bg-border-primary md:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label} className="bg-background p-4 dark:bg-card-bg sm:p-5">
            <dt className="font-mono text-[10px] font-semibold uppercase tracking-wider text-text-muted sm:text-[11px]">
              {fact.label}
            </dt>
            <dd className="mt-1.5 text-sm font-bold leading-snug break-words text-foreground sm:text-base">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ── Problem → Solution rows ──────────────────────────────────────── */

function ChallengeList({ section }: { section: CaseStudySection }) {
  if (section.items.length === 0) return null;

  return (
    <ol className="case-study-challenge space-y-3">
      {section.items.map((item, index) => (
        <li
          key={index}
          className="group rounded-2xl border border-border-primary bg-background p-5 transition-colors duration-300 hover:border-foreground/30 sm:p-6 dark:bg-card-bg"
        >
          <div className="flex gap-4 sm:gap-5">
            <span
              aria-hidden="true"
              className="w-6 shrink-0 pt-0.5 text-right font-mono text-xs font-bold tabular-nums text-text-muted transition-colors group-hover:text-foreground sm:text-sm"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1 space-y-2">
              {item.challenge ? (
                <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                  {item.challenge}
                </p>
              ) : null}
              <p className="text-sm font-medium leading-relaxed text-foreground sm:text-base">
                {item.response}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function ProjectChallengeList({
  sections,
  headingId,
}: {
  sections: CaseStudySection[];
  headingId: string;
}) {
  const [primary, ...rest] = sections;
  if (!primary) return null;

  return (
    <section id="work" aria-labelledby={headingId} className="scroll-mt-16">
      <SectionHeading
        id={headingId}
        kicker="Challenge → Response"
        title={primary.title}
        description="Each problem identified during the build, paired with the system built to resolve it and the resulting behaviour."
      />

      {primary.items.length > 0 ? (
        <ChallengeList section={primary} />
      ) : primary.text ? (
        <p className="text-base leading-relaxed text-text-secondary">{primary.text}</p>
      ) : null}

      {rest.map((section) => (
        <div key={section.id} className="mt-10 first:mt-0">
          <h3 className="mb-4 text-lg font-bold tracking-tight text-foreground sm:text-xl">
            {section.title}
          </h3>
          {section.items.length > 0 ? (
            <ChallengeList section={section} />
          ) : section.text ? (
            <p className="text-base leading-relaxed text-text-secondary">{section.text}</p>
          ) : null}
        </div>
      ))}
    </section>
  );
}

/* ── Stack ────────────────────────────────────────────────────────── */

export function ProjectStack({ layers }: { layers: StackLayer[] }) {
  if (layers.length === 0) return null;
  const total = layers.reduce((sum, layer) => sum + layer.items.length, 0);

  return (
    <section id="stack" aria-labelledby="stack-heading" className="scroll-mt-16">
      <SectionHeading
        id="stack-heading"
        kicker="Technical Architecture"
        title="Stack & Technologies"
        description={`${total} technologies and techniques applied, grouped by the layer they operate in.`}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className="rounded-2xl border border-border-primary bg-background p-5 transition-colors duration-300 hover:border-foreground/30 sm:p-6 dark:bg-card-bg"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-sm font-bold text-foreground sm:text-base">{layer.label}</h3>
              <span className="font-mono text-[10px] tabular-nums text-text-muted">
                {layer.items.length}
              </span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-text-muted">{layer.description}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {layer.items.map((tech) => (
                <li
                  key={tech}
                  className="rounded-lg border border-border-primary bg-hover-bg px-2.5 py-1 font-mono text-[11px] text-text-secondary"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Results ─────────────────────────────────────────────────────── */

export function ProjectResults({ metrics }: { metrics: string[] }) {
  if (metrics.length === 0) return null;

  return (
    <section id="results" aria-labelledby="results-heading" className="scroll-mt-16">
      <SectionHeading
        id="results-heading"
        kicker="Measured Outcomes"
        title="Results & Impact"
        description="Quantified benchmarks recorded against this build."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric, index) => {
          const { value, label } = parseMetric(metric);
          return (
            <div
              key={index}
              className="flex flex-col justify-between rounded-2xl border border-border-primary bg-background p-5 transition-colors duration-300 hover:border-foreground/30 dark:bg-card-bg"
            >
              <p className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                {value}
              </p>
              <p className="mt-2 text-xs font-medium leading-relaxed text-text-muted sm:text-sm">
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── Links & call to action ───────────────────────────────────────── */

function LinkCard({
  href,
  kicker,
  label,
  icon,
}: {
  href: string;
  kicker: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "group flex items-center justify-between gap-4 rounded-2xl border border-border-primary bg-background p-5 transition-all duration-300 hover:border-foreground/30 hover:shadow-md sm:p-6 dark:bg-card-bg",
        FOCUS_RING,
        "motion-reduce:transition-none",
      ].join(" ")}
    >
      <span className="flex min-w-0 items-center gap-4">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border-primary bg-hover-bg text-foreground transition-colors group-hover:border-foreground/30 dark:text-accent-lime"
        >
          {icon}
        </span>
        <span className="min-w-0">
          <span className="block font-mono text-[10px] font-semibold uppercase tracking-wider text-text-muted sm:text-[11px]">
            {kicker}
          </span>
          <span className="mt-0.5 block truncate text-sm font-bold text-foreground sm:text-base">
            {label}
          </span>
        </span>
      </span>
      <FiExternalLink
        aria-hidden="true"
        className="h-4 w-4 shrink-0 text-text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground motion-reduce:transform-none motion-reduce:transition-none"
      />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export function ProjectLinks({
  githubLink,
  demoLink,
}: {
  githubLink: string | null;
  demoLink: string | null;
}) {
  return (
    <section id="links" aria-labelledby="links-heading" className="scroll-mt-16">
      <SectionHeading
        id="links-heading"
        kicker="Go Deeper"
        title="Explore & Connect"
        description="Review the implementation directly, or get in touch about a comparable build."
      />

      {(githubLink || demoLink) && (
        <div className="grid gap-4 sm:grid-cols-2">
          {demoLink ? (
            <LinkCard
              href={demoLink}
              kicker="Live System"
              label="Open the deployed build"
              icon={<FiArrowRight className="h-5 w-5" />}
            />
          ) : null}
          {githubLink ? (
            <LinkCard
              href={githubLink}
              kicker="Source Code"
              label="Review the repository"
              icon={<FiGithub className="h-5 w-5" />}
            />
          ) : null}
        </div>
      )}

      <div className="relative mt-6 overflow-hidden rounded-2xl border border-border-primary bg-background p-6 sm:p-8 dark:bg-card-bg">
        <div
          aria-hidden="true"
          className="absolute -top-24 right-0 h-56 w-56 bg-[radial-gradient(circle,rgba(184,255,0,0.18)_0%,transparent_65%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(184,255,0,0.09)_0%,transparent_65%)]"
        />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-primary bg-background/90 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-xs dark:bg-card-bg/90">
            <span
              aria-hidden="true"
              className="h-2 w-2 animate-pulse rounded-full bg-accent-lime shadow-[0_0_8px_rgba(184,255,0,0.8)] motion-reduce:animate-none"
            />
            Available for Freelance &amp; Advisory
          </span>
          <h3 className="mt-4 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            Need a similar AI or backend system?
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">
            I architect, benchmark, and deploy production AI triage pipelines, RAG systems, and
            custom backend infrastructure built for high reliability.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/contact"
              className={`inline-flex items-center justify-center gap-2 rounded-full bg-accent-lime px-6 py-3 text-sm font-extrabold text-[#0A0A0A] shadow-xs transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(184,255,0,0.5)] active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none ${FOCUS_RING}`}
            >
              Discuss Your Project
              <FiArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link
              href="/projects"
              className={`inline-flex items-center justify-center gap-2 rounded-full border border-border-primary bg-background px-6 py-3 text-sm font-bold text-foreground shadow-2xs transition-all duration-200 hover:border-foreground/30 hover:bg-hover-bg dark:bg-card-bg motion-reduce:transition-none ${FOCUS_RING}`}
            >
              Browse All Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
