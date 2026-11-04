import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import RecruiterCheatSheet from "@/components/resume/RecruiterCheatSheet";
import { APP_URL, AUTHOR_NAME, AUTHOR_EMAIL, LINKEDIN_URL, GITHUB_URL } from "@/lib/site-config";
import {
  LuBriefcase,
  LuCheck,
  LuArrowRight,
  LuDownload,
  LuMail,
  LuShield,
  LuZap,
  LuDatabase,
  LuCalendar,
  LuTerminal,
  LuGlobe,
  LuClock,
  LuCode,
  LuCpu,
  LuCircleHelp,
} from "react-icons/lu";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Hire Samir Shaikh | AI Backend Engineer & Full Stack Developer",
  description:
    "Hire Samir Shaikh. AI Backend Engineer, AI SDE, and Full Stack Developer specialized in autonomous AI agents, 3072d RAG pipelines, and high-throughput Node.js/PostgreSQL backends. Actively interviewing for full-time remote roles & open to select freelance sprints.",
  keywords: [
    "hire Samir Shaikh",
    "hire AI backend engineer",
    "hire AI SDE",
    "hire full stack developer",
    "hire Forward Deployed Engineer",
    "remote AI developer",
    "hire Node.js developer",
    "hire TypeScript engineer",
    "RAG engineer for hire",
    "pgvector developer",
    "contract AI backend engineer",
    "hire freelance AI developer",
  ],
  alternates: {
    canonical: `${APP_URL}/hire`,
  },
  openGraph: {
    title: "Hire Samir Shaikh | AI Backend Engineer & Full Stack Developer",
    description:
      "AI Backend Engineer & Full Stack Developer specializing in production AI agents, 3072d RAG architectures, and high-scale backends. Available for full-time remote roles.",
    url: `${APP_URL}/hire`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire Samir Shaikh | AI Backend Engineer & Full Stack Developer",
    description:
      "Available for full-time remote roles (AI Backend / Full Stack) and select high-velocity freelance sprints.",
  },
};

const hiringFaqs = [
  {
    q: "What is your notice period and earliest start date?",
    a: "Immediate (0 days notice). I am not bound by any non-compete or employment agreement and can onboard immediately into your engineering team or commence a sprint within 24–48 hours.",
  },
  {
    q: "How do you handle timezone overlap with US and European teams?",
    a: "I am based in India (IST, UTC+5:30). For US teams (EST/PST), I maintain 4–6 hours of synchronous working overlap during morning/afternoon handoffs. For EMEA/UK teams, I share nearly full working day overlap. All asynchronous work is backed by structured PR descriptions, Loom walkthroughs, and clear issue tracking.",
  },
  {
    q: "What is your legal and contracting setup for international companies?",
    a: "I can be hired as a full-time remote employee via Employer of Record platforms (such as Deel, Remote.com, or Oyster) or engaged as an independent B2B contractor. I am W-8BEN ready for US entities and provide standard tax/invoice documentation.",
  },
  {
    q: "Are you open to a paid trial sprint or technical assessment?",
    a: "Yes. I welcome practical evaluations: 2–4 hour take-home technical challenges, live system architecture discussions, or a 1-week paid trial sprint to demonstrate real code quality, communication, and engineering autonomy.",
  },
  {
    q: "What is your intellectual property (IP) and confidentiality policy?",
    a: "All code, documentation, schemas, and assets created during our engagement are 100% your company's intellectual property. I execute standard non-disclosure agreements (NDAs) and IP assignment agreements prior to writing the first line of code.",
  },
];

export default function HirePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${APP_URL}/hire#webpage`,
        url: `${APP_URL}/hire`,
        name: "Hire Samir Shaikh | AI Backend Engineer & Full Stack Developer",
        description:
          "Talent specification and hiring hub for Samir Shaikh. AI Backend Engineer, AI SDE, and Full Stack Developer available for full-time remote roles.",
        mainEntity: {
          "@type": "Person",
          "@id": `${APP_URL}/#person`,
          name: AUTHOR_NAME,
          jobTitle: "AI Backend Engineer & Full Stack Developer",
          url: `${APP_URL}/hire`,
          email: AUTHOR_EMAIL,
          sameAs: [LINKEDIN_URL, GITHUB_URL],
          knowsAbout: [
            "AI Backend Engineering",
            "Agentic AI & Tool Calling",
            "RAG & Vector Retrieval",
            "PostgreSQL & pgvector",
            "Node.js & TypeScript",
            "Next.js App Router",
            "Distributed Systems & Webhooks",
          ],
          makesOffer: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Full-Time AI Backend / Full Stack Engineering",
                description:
                  "Dedicated remote engineering role building production AI and high-scale backends.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Fixed-Scope AI Sprint & MVP Rescue",
                description:
                  "High-velocity 1-2 week production implementation sprints with guaranteed deliverables.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "3-5 Day Codebase Audit & Architecture Roadmap",
                description:
                  "Comprehensive code, schema, and AI readiness audit with fixed $450 pricing.",
              },
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${APP_URL}/hire#faq`,
        mainEntity: hiringFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <main className="relative flex flex-col flex-1 px-5 sm:px-8 md:px-10 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto w-full">
        {/* Breadcrumb Navigation */}
        <div className="pt-6 md:pt-10 mb-6">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Hire Samir", href: "/hire" },
            ]}
          />
        </div>

        {/* ── TOP LIVE AVAILABILITY BANNER ─────────────────────────────────── */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl border border-border-primary bg-background dark:bg-card-bg">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="w-2.5 h-2.5 rounded-full bg-accent-lime shrink-0"
            />
            <span className="text-xs sm:text-sm font-mono font-bold text-foreground">
              STATUS: Actively Interviewing for Full-Time Remote Roles
            </span>
          </div>
          <div className="text-xs font-mono text-text-muted">
            Notice Period: Immediate (0 Days) &bull; Worldwide Remote
          </div>
        </div>

        {/* ── HERO PITCH SECTION ───────────────────────────────────────────── */}
        <header className="pb-10 pt-2 border-b border-border-primary mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-border-primary bg-hover-bg text-[11px] font-mono font-semibold tracking-wider text-text-secondary uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              TALENT SPECIFICATION &bull; RECRUITING HUB
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-[1.15]">
              Hire Samir Shaikh
            </h1>
            <p className="mt-2 text-base sm:text-lg font-mono text-accent-lime font-bold">
              AI Backend Engineer &bull; AI SDE &bull; Full Stack Developer
            </p>
            <p className="mt-4 text-text-secondary text-sm sm:text-base max-w-2xl leading-relaxed">
              I build zero-hallucination agentic AI pipelines, 3072d vector retrieval architectures,
              and high-throughput PostgreSQL backends. Ready to take full technical ownership in
              high-velocity engineering teams without requiring hand-holding.
            </p>
          </div>

          {/* Quick Action Controls (Strictly rounded-xl, no pill buttons, no neon halos) */}
          <div className="flex flex-wrap md:flex-col gap-2.5 shrink-0">
            <Link
              href="/contact?intent=full-time"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-lime text-[#0A0A0A] text-xs sm:text-sm font-bold px-5 py-3 hover:bg-accent-lime/90 transition-colors whitespace-nowrap cursor-pointer"
            >
              <LuMail className="w-4 h-4 stroke-[2.5]" />
              <span>Send Role Inquiry / Offer</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-primary bg-background dark:bg-card-bg text-foreground text-xs sm:text-sm font-bold px-5 py-3 hover:bg-hover-bg transition-colors whitespace-nowrap cursor-pointer"
            >
              <LuCalendar className="w-4 h-4 text-text-muted" />
              <span>Schedule Intro Screen</span>
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-primary bg-background dark:bg-card-bg text-text-secondary hover:text-foreground text-xs sm:text-sm font-medium px-5 py-2.5 hover:bg-hover-bg transition-colors whitespace-nowrap cursor-pointer"
            >
              <LuDownload className="w-4 h-4 text-text-muted" />
              <span>Full Resume &bull; PDF</span>
            </Link>
          </div>
        </header>

        {/* ── EMBEDDED RECRUITER FAST-TRACK CHEAT SHEET ─────────────────────── */}
        <div className="mb-16">
          <RecruiterCheatSheet hideHireLink={true} />
        </div>

        {/* ── WHY SAMIR OVER OTHER CANDIDATES: EDITORIAL COMPARISON ──────────── */}
        <section aria-labelledby="why-samir-heading" className="mb-16">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-border-primary bg-hover-bg text-[11px] font-mono font-semibold tracking-wider text-text-secondary uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              ENGINEERING JUDGEMENT
            </div>
            <h2
              id="why-samir-heading"
              className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
            >
              Why Samir Over Typical Candidates
            </h2>
            <p className="text-text-secondary text-sm sm:text-base mt-2 leading-relaxed">
              Most applicants submit wrapper projects with ungrounded prompts. Here is how my
              production engineering standards protect your architecture, budget, and release timelines.
            </p>
          </div>

          {/* Structured 3-Domain Specification Comparison (Open Layout, No Nested Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Domain 1: RAG & AI */}
            <div className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-muted mb-3">
                  <LuCpu className="w-4 h-4 text-accent-lime" />
                  <span>RAG &amp; AI Systems</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Zero-Hallucination Retrieval
                </h3>
                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="p-3 rounded-lg border border-border-primary/60 bg-hover-bg/50">
                    <span className="font-mono font-bold text-text-muted block text-[10px] uppercase mb-1">
                      Tutorial / Wrapper Standard
                    </span>
                    <span className="text-text-muted">
                      Direct OpenAI API calls with arbitrary prompt contexts, unindexed storage, and hallucinations.
                    </span>
                  </div>
                  <div className="p-3 rounded-lg border border-accent-lime/40 bg-hover-bg">
                    <span className="font-mono font-bold text-foreground dark:text-accent-lime block text-[10px] uppercase mb-1">
                      Samir&apos;s Production Standard
                    </span>
                    <span className="text-text-secondary">
                      Gemini 3072d vector embeddings, pgvector cosine distance &le; 0.5 strict thresholds, deterministic fallback routing, and verifiable context attribution.
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-border-primary text-[11px] font-mono text-text-muted">
                Benchmark: &lt; 280ms vector retrieval &bull; Grounded context
              </div>
            </div>

            {/* Domain 2: Backend & Relational Systems */}
            <div className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-muted mb-3">
                  <LuDatabase className="w-4 h-4 text-accent-lime" />
                  <span>Data &amp; Architecture</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Schema Integrity &amp; Scale
                </h3>
                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="p-3 rounded-lg border border-border-primary/60 bg-hover-bg/50">
                    <span className="font-mono font-bold text-text-muted block text-[10px] uppercase mb-1">
                      Tutorial / Wrapper Standard
                    </span>
                    <span className="text-text-muted">
                      Unindexed NoSQL dumps, untyped request bodies, missing foreign keys, and memory leaks.
                    </span>
                  </div>
                  <div className="p-3 rounded-lg border border-accent-lime/40 bg-hover-bg">
                    <span className="font-mono font-bold text-foreground dark:text-accent-lime block text-[10px] uppercase mb-1">
                      Samir&apos;s Production Standard
                    </span>
                    <span className="text-text-secondary">
                      Normalized PostgreSQL schemas, Drizzle ORM migrations, partial indexes, connection pooling, and strict Zod runtime schema validation.
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-border-primary text-[11px] font-mono text-text-muted">
                Benchmark: Sub-100ms API endpoints &bull; 100% TypeScript typed
              </div>
            </div>

            {/* Domain 3: Autonomy & Delivery */}
            <div className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-muted mb-3">
                  <LuZap className="w-4 h-4 text-accent-lime" />
                  <span>Velocity &amp; Autonomy</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  High-Autonomy Forward Deployment
                </h3>
                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="p-3 rounded-lg border border-border-primary/60 bg-hover-bg/50">
                    <span className="font-mono font-bold text-text-muted block text-[10px] uppercase mb-1">
                      Tutorial / Wrapper Standard
                    </span>
                    <span className="text-text-muted">
                      Needs constant supervision, gets stuck on ambiguous requirements, and delivers untested changes.
                    </span>
                  </div>
                  <div className="p-3 rounded-lg border border-accent-lime/40 bg-hover-bg">
                    <span className="font-mono font-bold text-foreground dark:text-accent-lime block text-[10px] uppercase mb-1">
                      Samir&apos;s Production Standard
                    </span>
                    <span className="text-text-secondary">
                      Self-directed repo onboarding, root-cause debugging, full PRs with automated unit/integration tests, and clean architecture documentation.
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-border-primary text-[11px] font-mono text-text-muted">
                Benchmark: Fast PR turnaround &bull; Zero hand-holding needed
              </div>
            </div>
          </div>
        </section>

        {/* ── COLLABORATION & ENGAGEMENT MODELS ────────────────────────────── */}
        <section aria-labelledby="engagement-models-heading" className="mb-16">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-border-primary bg-hover-bg text-[11px] font-mono font-semibold tracking-wider text-text-secondary uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              COLLABORATION MODELS
            </div>
            <h2
              id="engagement-models-heading"
              className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
            >
              How We Can Work Together
            </h2>
            <p className="text-text-secondary text-sm sm:text-base mt-2 leading-relaxed">
              Clear commitments, transparent expectations, and zero ambiguity whether filling a full-time
              core role or executing a high-urgency sprint.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Model 1: Full-Time Remote Role (Primary Focus) */}
            <div className="p-6 sm:p-7 rounded-2xl border-2 border-accent-lime bg-background dark:bg-card-bg flex flex-col justify-between relative">
              <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-md bg-accent-lime text-[#0A0A0A] text-[10px] font-mono font-extrabold uppercase">
                PRIMARY FOCUS
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted block mb-1">
                  Model 01 &bull; Direct Employment
                </span>
                <h3 className="text-xl font-black text-foreground mb-1">
                  Full-Time Remote Engineer
                </h3>
                <div className="text-xs font-mono text-accent-lime font-bold mb-4">
                  AI Backend &bull; AI SDE &bull; FDE
                </div>
                <p className="text-xs sm:text-sm text-text-secondary mb-6 leading-relaxed">
                  Join your core engineering team as a dedicated engineer building production AI
                  features, backend microservices, or full-stack Next.js applications.
                </p>

                <ul className="space-y-2.5 text-xs text-text-secondary mb-8">
                  <li className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-accent-lime shrink-0" />
                    <span>Dedicated 40 hrs/week engineering focus</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-accent-lime shrink-0" />
                    <span>4–6 hrs daily synchronous US/EU overlap</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-accent-lime shrink-0" />
                    <span>Deel, Remote.com, or direct contractor agreement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-accent-lime shrink-0" />
                    <span>
                      Notice period: <strong className="text-foreground">Immediate (0 days)</strong>
                    </span>
                  </li>
                </ul>
              </div>

              <Link
                href="/contact?intent=full-time"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent-lime text-[#0A0A0A] text-xs font-bold py-3 hover:bg-accent-lime/90 transition-colors cursor-pointer"
              >
                <span>Discuss Full-Time Role</span>
                <LuArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Model 2: Fixed-Scope Sprint & Rescue */}
            <div className="p-6 sm:p-7 rounded-2xl border border-border-primary bg-background dark:bg-card-bg flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted block mb-1">
                  Model 02 &bull; Milestone Contract
                </span>
                <h3 className="text-xl font-black text-foreground mb-1">
                  Feature Sprint or Rescue
                </h3>
                <div className="text-xs font-mono text-text-muted font-bold mb-4">
                  $800 – $2,500 &bull; 1–2 Weeks
                </div>
                <p className="text-xs sm:text-sm text-text-secondary mb-6 leading-relaxed">
                  Ship a dedicated production AI feature, resolve critical backend bottlenecks,
                  integrate complex webhooks, or complete an abandoned MVP.
                </p>

                <ul className="space-y-2.5 text-xs text-text-secondary mb-8">
                  <li className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-accent-lime shrink-0" />
                    <span>Fixed scope, fixed milestone pricing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-accent-lime shrink-0" />
                    <span>Clean PRs with automated tests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-accent-lime shrink-0" />
                    <span>100% intellectual property transfer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-accent-lime shrink-0" />
                    <span>14 days post-launch bug warranty</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/contact?intent=contract"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border-primary bg-hover-bg text-foreground text-xs font-bold py-3 hover:border-foreground/30 transition-colors cursor-pointer"
              >
                <span>Discuss Feature Sprint</span>
                <LuArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Model 3: Codebase Audit & Technical Roadmap */}
            <div className="p-6 sm:p-7 rounded-2xl border border-border-primary bg-background dark:bg-card-bg flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted block mb-1">
                  Model 03 &bull; Tripwire Diagnostic
                </span>
                <h3 className="text-xl font-black text-foreground mb-1">
                  Codebase &amp; AI Audit
                </h3>
                <div className="text-xs font-mono text-text-muted font-bold mb-4">
                  $450 Fixed &bull; 3–5 Days Delivery
                </div>
                <p className="text-xs sm:text-sm text-text-secondary mb-6 leading-relaxed">
                  Deep architectural, performance, and security inspection of your existing application
                  before scaling, fundraising, or adding vector search capabilities.
                </p>

                <ul className="space-y-2.5 text-xs text-text-secondary mb-8">
                  <li className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-accent-lime shrink-0" />
                    <span>PostgreSQL schema &amp; query indexing review</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-accent-lime shrink-0" />
                    <span>AI readiness &amp; vector search feasibility</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-accent-lime shrink-0" />
                    <span>12–18 page actionable report &amp; Loom breakdown</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-accent-lime shrink-0" />
                    <span>100% money-back guarantee if unhelpful</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/services/codebase-audit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border-primary bg-hover-bg text-foreground text-xs font-bold py-3 hover:border-foreground/30 transition-colors cursor-pointer"
              >
                <span>View Audit Blueprint</span>
                <LuArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── RECRUITER DUE DILIGENCE & HIRING FAQ ──────────────────────────── */}
        <section aria-labelledby="hiring-faq-heading" className="mb-16">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-border-primary bg-hover-bg text-[11px] font-mono font-semibold tracking-wider text-text-secondary uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              SCREENING &bull; DUE DILIGENCE
            </div>
            <h2
              id="hiring-faq-heading"
              className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
            >
              Recruiter &amp; Manager Due Diligence
            </h2>
            <p className="text-text-secondary text-sm sm:text-base mt-2 leading-relaxed">
              Direct answers to the most frequent screening questions regarding legal compliance,
              working hours, and technical onboarding.
            </p>
          </div>

          <div className="space-y-4">
            {hiringFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-xl border border-border-primary bg-background dark:bg-card-bg p-5 transition-colors [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer font-bold text-foreground text-sm sm:text-base select-none">
                  <span className="flex items-center gap-2.5">
                    <LuCircleHelp className="w-4 h-4 text-accent-lime shrink-0" />
                    {faq.q}
                  </span>
                  <span className="text-text-muted group-open:rotate-180 transition-transform text-xs font-mono shrink-0">
                    &darr;
                  </span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-text-secondary leading-relaxed pt-3 border-t border-border-primary/60">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ── CLOSING CONVERSION & REASSURANCE SECTION ──────────────────────── */}
        <div className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-8 sm:p-12 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-border-primary bg-hover-bg text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
            DIRECT TECHNICAL COMMUNICATION
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground max-w-xl mx-auto mb-3">
            Ready to Accelerate Your Engineering Roadmap?
          </h2>

          <p className="text-text-secondary text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-8">
            Reach out directly. Every inquiry receives a technical response from Samir within 12–24 hours.
            No automated screening filters or recruiting middlemen.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
            <Link
              href="/contact?intent=full-time"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-lime text-[#0A0A0A] text-sm font-bold px-7 py-3.5 hover:bg-accent-lime/90 transition-colors cursor-pointer"
            >
              <LuMail className="w-4 h-4 stroke-[2.5]" />
              <span>Contact Samir Shaikh</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-primary bg-background dark:bg-card-bg text-foreground text-sm font-bold px-7 py-3.5 hover:bg-hover-bg transition-colors cursor-pointer"
            >
              <LuCalendar className="w-4 h-4 text-text-muted" />
              <span>Schedule Intro Screen</span>
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-primary bg-background dark:bg-card-bg text-text-secondary hover:text-foreground text-sm font-medium px-6 py-3.5 hover:bg-hover-bg transition-colors cursor-pointer"
            >
              <span>Explore Selected Work</span>
              <LuArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-6 border-t border-border-primary flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-text-muted font-mono">
            <span className="inline-flex items-center gap-1.5">
              <LuShield className="text-accent-lime text-sm" />
              Direct Engineer Communication
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LuBriefcase className="text-accent-lime text-sm" />
              Immediate Availability (0 Days Notice)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LuTerminal className="text-accent-lime text-sm" />
              Deel &bull; Remote.com &bull; W-8BEN Ready
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
