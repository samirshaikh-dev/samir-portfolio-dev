import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import TestimonialsSection from "@/components/TestimonialsSection";
import ServicesList from "@/components/services/ServicesList";
import { APP_URL, AUTHOR_EMAIL } from "@/lib/site-config";
import {
  getServiceJsonLd,
  getSpeakableJsonLd,
  LONGTAIL_KEYWORDS,
} from "@/lib/seo/structured-data";
import {
  SERVICE_CATEGORIES,
  PROCESS_STEPS,
  ENGAGEMENT_MODELS,
  SERVICES_FAQS,
} from "@/lib/data/services";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiShield,
  FiGitPullRequest,
  FiClock,
  FiChevronDown,
  FiMail,
} from "react-icons/fi";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Engineering Services & Architecture Consulting | Samir Shaikh",
  description:
    "Direct engineering engagements by Samir Shaikh — AI backend architecture, autonomous agent workflows, PostgreSQL pgvector retrieval, high-throughput microservices, and codebase rescue sprints. Fixed milestones, 100% IP transfer, and 14-day warranty.",
  keywords: [
    ...LONGTAIL_KEYWORDS.slice(0, 15),
    "codebase audit service",
    "fix broken MVP developer",
    "codebase rescue developer",
    "add AI to existing SaaS",
    "freelance backend developer retainer",
    "slow database query optimization",
    "WhatsApp API integration developer",
    "freelance AI developer",
    "freelance AI engineer",
    "freelance website developer",
    "website developer for business",
    "custom website development",
    "SEO optimization services",
    "website speed optimization",
    "AI chatbot for website",
    "AI chatbot for SaaS",
    "custom knowledge base AI",
    "production-grade AI chatbot",
    "Forward Deployed Engineer",
    "hire freelance AI developer",
    "AI agent development services",
    "backend API development services",
    "full-stack web development services",
    "local business website developer",
  ],
  alternates: {
    canonical: `${APP_URL}/services`,
  },
  openGraph: {
    title: "Engineering Services & Architecture Consulting | Samir Shaikh",
    description:
      "Direct engineering engagements by Samir Shaikh — AI backend architecture, autonomous agent workflows, PostgreSQL pgvector retrieval, high-throughput microservices, and codebase rescue sprints.",
    url: `${APP_URL}/services`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Services & Architecture Consulting | Samir Shaikh",
    description:
      "Direct engineering engagements by Samir Shaikh — AI backend architecture, autonomous agent workflows, PostgreSQL pgvector retrieval, and codebase rescue sprints.",
  },
};

export default function ServicesPage() {
  const serviceJsonLd = getServiceJsonLd();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SERVICES_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Group FAQs logically to reduce buyer cognitive load
  const faqCategories = [
    {
      groupTitle: "Code Ownership & Working Workflow",
      items: SERVICES_FAQS.filter((f) =>
        [
          "faq-code-ip-ownership",
          "faq-how-i-work-with-startups",
          "faq-availability-for-projects",
          "faq-how-to-get-started",
        ].includes(f.id)
      ),
    },
    {
      groupTitle: "AI Systems & RAG Architecture",
      items: SERVICES_FAQS.filter((f) =>
        [
          "faq-stop-chatbot-hallucinating",
          "faq-add-ai-to-existing-product",
          "faq-custom-knowledge-base-ai",
          "faq-production-grade-ai-definition",
          "faq-freelance-vs-off-the-shelf-chatbots",
        ].includes(f.id)
      ),
    },
    {
      groupTitle: "Codebase Takeover, Audits & Retainers",
      items: SERVICES_FAQS.filter((f) =>
        [
          "faq-existing-codebase-takeover",
          "faq-codebase-audit-deliverables",
          "faq-fractional-retainer-model",
          "faq-forward-deployed-engineer",
        ].includes(f.id)
      ),
    },
    {
      groupTitle: "Full-Stack Engineering & Integrations",
      items: SERVICES_FAQS.filter((f) =>
        [
          "faq-whatsapp-and-integrations",
          "faq-technical-seo-deliverables",
          "faq-full-stack-capabilities",
        ].includes(f.id)
      ),
    },
  ];

  return (
    <main className="flex flex-col flex-1 px-5 sm:px-8 md:px-10 pb-24 pt-6 sm:pt-10">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getSpeakableJsonLd(["h1", "h2", ".service-desc"])),
        }}
      />

      <div className="max-w-6xl mx-auto w-full space-y-16">
        {/* Breadcrumbs Navigation */}
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Capabilities & Services", href: "/services" },
          ]}
        />

        {/* ── EDITORIAL HEADER ──────────────────────────────────────────────── */}
        <header className="border-b border-border-primary pb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-text-muted uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
            <span>03 / ENGINEERING CAPABILITIES &amp; SPRINT BLUEPRINTS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.12]">
            Engineering Sprints, Systems Architecture &amp; Production AI
          </h1>

          <p className="mt-4 max-w-3xl text-base sm:text-lg text-text-secondary leading-relaxed">
            Direct engineering engagements by Samir Shaikh for high-throughput backends, deterministic AI pipelines, and codebase modernizations. Transparent milestone pricing, code committed directly to your private repository, verifiable benchmarks on staging, and zero vendor lock-in.
          </p>

          {/* Quick Callout Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] hover:opacity-90 transition-opacity"
            >
              <span>Schedule Technical Discovery</span>
              <FiArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href="#engagement-models"
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-mono font-medium text-foreground border border-border-primary hover:bg-hover-bg transition-colors"
            >
              <span>Review Engagement Models</span>
            </a>
            <a
              href={`mailto:${AUTHOR_EMAIL}`}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-mono text-text-muted hover:text-foreground transition-colors"
              title="Email Samir Shaikh directly"
            >
              <FiMail className="w-4 h-4" />
              <span>{AUTHOR_EMAIL}</span>
            </a>
          </div>
        </header>

        {/* ── RISK REVERSAL & ENGINEERING GUARANTEES (THE CONFIDENCE LAYER) ──── */}
        <section aria-label="Engineering engagement guarantees">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-y border-border-primary divide-y sm:divide-y-0 sm:divide-x divide-border-primary py-4 sm:py-6">
            <div className="p-4 sm:p-5 space-y-2">
              <div className="flex items-center gap-2 text-foreground font-mono text-xs font-bold">
                <FiClock className="w-4 h-4 text-accent-lime" aria-hidden="true" />
                <span>3–5 Day Initial Audit</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Low-risk fixed-scope technical assessment and bottleneck diagnosis before committing larger capital.
              </p>
            </div>

            <div className="p-4 sm:p-5 space-y-2">
              <div className="flex items-center gap-2 text-foreground font-mono text-xs font-bold">
                <FiGitPullRequest className="w-4 h-4 text-accent-lime" aria-hidden="true" />
                <span>100% Repository Transfer</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Clean, tested TypeScript committed directly to your private GitHub or GitLab with atomic PRs and passing CI.
              </p>
            </div>

            <div className="p-4 sm:p-5 space-y-2">
              <div className="flex items-center gap-2 text-foreground font-mono text-xs font-bold">
                <FiCheckCircle className="w-4 h-4 text-accent-lime" aria-hidden="true" />
                <span>Staging Benchmark Verification</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Verifiable latency, vector retrieval, and throughput metrics tested against staging before sign-off.
              </p>
            </div>

            <div className="p-4 sm:p-5 space-y-2">
              <div className="flex items-center gap-2 text-foreground font-mono text-xs font-bold">
                <FiShield className="w-4 h-4 text-accent-lime" aria-hidden="true" />
                <span>14-Day Bug Warranty</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Hands-on post-deployment bug fixing and zero-downtime deployment handover support included.
              </p>
            </div>
          </div>
        </section>

        {/* ── CORE CAPABILITIES & OFFERING BLUEPRINTS ───────────────────────── */}
        <section aria-label="Available engineering capabilities">
          <div className="border-b border-border-primary pb-4 mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-text-muted uppercase mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              <span>CAPABILITIES DIRECTORY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              Core Capabilities &amp; Sprint Blueprints
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mt-1 max-w-2xl">
              Filter by engineering domain below to inspect architectural scopes, concrete deliverables, and typical durations.
            </p>
          </div>

          <ServicesList categories={SERVICE_CATEGORIES} />
        </section>

        {/* ── 4-STAGE DELIVERY PROCESS (PSYCHOLOGY TRANSPARENCY) ─────────────── */}
        <section aria-labelledby="process-heading" className="pt-8 border-t border-border-primary">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-text-muted uppercase mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              <span>TRANSPARENT WORKFLOW</span>
            </div>
            <h2 id="process-heading" className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              How Engagements Are Executed
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mt-1 max-w-2xl leading-relaxed">
              A predictable, low-friction engineering process designed to eliminate ambiguity, protect your timeline, and deliver dependable software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-2xl font-black text-text-muted/40 block mb-2">
                    {step.step}
                  </span>
                  <h3 className="text-base font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ──────────────────────────────────────────────── */}
        <section
          id="engagement-models"
          aria-labelledby="engagement-models-heading"
          className="pt-8 border-t border-border-primary scroll-mt-20"
        >
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-text-muted uppercase mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              <span>STRUCTURED COLLABORATION</span>
            </div>
            <h2 id="engagement-models-heading" className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              Engagement Models &amp; Pricing Structures
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mt-1 max-w-2xl leading-relaxed">
              Choose the collaboration structure that fits your project maturity — from an isolated diagnostic audit to fixed-scope sprints or fractional engineering retainers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ENGAGEMENT_MODELS.map((model) => (
              <div
                key={model.title}
                className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-6 sm:p-7 flex flex-col justify-between hover:border-foreground/30 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] px-2.5 py-0.5 rounded border border-border-primary text-text-muted font-semibold uppercase tracking-wider inline-block">
                      {model.badge}
                    </span>
                    {model.startingPrice && (
                      <span className="font-mono text-xs font-bold text-foreground">
                        {model.startingPrice}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {model.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">
                      {model.subtitle}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-3 border-t border-border-primary">
                    {model.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                        <FiCheckCircle className="w-3.5 h-3.5 text-accent-lime shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-border-primary">
                  <Link
                    href={`/contact?model=${encodeURIComponent(model.title)}`}
                    className="block w-full text-center py-2.5 px-4 rounded-xl border border-border-primary bg-background dark:bg-card-bg hover:bg-hover-bg text-xs font-mono font-bold text-foreground transition-colors"
                  >
                    Inquire About This Model &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIALS & VERIFIED EVIDENCE ───────────────────────────────── */}
        <div className="pt-8 border-t border-border-primary">
          <TestimonialsSection variant="services" />
        </div>

        {/* ── SERVICES FAQ (GROUPED TO REDUCE COGNITIVE LOAD) ────────────────── */}
        <section aria-labelledby="faq-heading" className="pt-8 border-t border-border-primary">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-text-muted uppercase mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              <span>DUE DILIGENCE &amp; FREQUENT QUESTIONS</span>
            </div>
            <h2 id="faq-heading" className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              Technical Due Diligence &amp; Answers
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mt-1 max-w-2xl leading-relaxed">
              Clear answers to common questions from CTOs, founders, and engineering managers regarding contracts, code ownership, and communication.
            </p>
          </div>

          <div className="space-y-8">
            {faqCategories.map((cat) => (
              <div key={cat.groupTitle} className="space-y-3">
                <h3 className="text-sm font-mono uppercase tracking-wider text-text-muted font-bold pb-2 border-b border-border-primary">
                  {cat.groupTitle}
                </h3>
                <div className="space-y-2">
                  {cat.items.map((faq) => (
                    <details
                      key={faq.id}
                      className="group rounded-xl border border-border-primary bg-background dark:bg-card-bg p-4 transition-colors open:bg-hover-bg/30"
                    >
                      <summary className="cursor-pointer font-bold text-xs sm:text-sm text-foreground list-none flex items-center justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime rounded-lg">
                        <span>{faq.question}</span>
                        <FiChevronDown
                          className="w-4 h-4 text-text-muted shrink-0 transition-transform group-open:rotate-180"
                          aria-hidden="true"
                        />
                      </summary>
                      <p className="mt-3 text-xs sm:text-sm text-text-secondary leading-relaxed border-t border-border-primary/60 pt-3">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CLOSING CONVERSION SECTION ────────────────────────────────────── */}
        <section className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-8 sm:p-10 md:p-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-text-muted uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              <span>START A DIRECT ENGAGEMENT</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Ready to architect, audit, or scale your software?
            </h3>
            <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
              Send over your current architecture overview, repository, or problem statement. We&apos;ll schedule a 20-minute technical discovery call to evaluate feasibility and propose concrete sprint milestones with zero obligations.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] hover:opacity-90 transition-opacity"
              >
                <span>Schedule Discovery Call</span>
                <FiArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-mono font-medium text-foreground border border-border-primary hover:bg-hover-bg transition-colors"
              >
                <span>Inspect Verified Projects</span>
              </Link>
              <a
                href={`mailto:${AUTHOR_EMAIL}`}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-mono text-text-muted hover:text-foreground transition-colors"
              >
                <FiMail className="w-4 h-4" />
                <span>Email Directly</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
