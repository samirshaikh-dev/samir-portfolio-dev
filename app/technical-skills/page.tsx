import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import TechnicalSkillsFAQClient from "@/components/technical-skills/TechnicalSkillsFAQClient";
import { APP_URL, AUTHOR_NAME, GITHUB_URL, LINKEDIN_URL } from "@/lib/site-config";
import { getFaqPageJsonLd, getSpeakableJsonLd } from "@/lib/seo/structured-data";
import {
  TECHNICAL_SKILLS_FAQS,
  SYSTEM_DESIGN_CONCEPTS,
  SOFTWARE_ENGINEERING_CONCEPTS,
} from "@/lib/data/technical-skills";
import {
  LuCpu,
  LuDatabase,
  LuServer,
  LuLayoutGrid,
  LuShield,
  LuZap,
  LuTerminal,
  LuGitPullRequest,
  LuCheck,
  LuArrowRight,
  LuLayers,
  LuCode,
  LuSparkles,
} from "react-icons/lu";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Technical Skills & Architecture Index | Samir Shaikh",
  description:
    "Explore Samir Shaikh's technical expertise across AI backend engineering, 3072d vector retrieval, Node.js/TypeScript microservices, PostgreSQL, Drizzle ORM, Next.js 16 App Router, and production system design.",
  keywords: [
    "Samir Shaikh technical skills",
    "AI backend engineer skills",
    "TypeScript developer",
    "Node.js backend developer",
    "PostgreSQL pgvector RAG",
    "Next.js App Router engineer",
    "REST GraphQL API developer",
    "System Design Microservices Modular Monolith",
    "Docker BullMQ Redis engineer",
    "Jest unit integration testing",
    "full stack backend engineer India",
  ],
  alternates: {
    canonical: `${APP_URL}/technical-skills`,
  },
  openGraph: {
    title: "Technical Skills & Architecture Index | Samir Shaikh",
    description:
      "Explore Samir Shaikh's technical expertise across AI backend engineering, 3072d vector retrieval, Node.js/TypeScript microservices, PostgreSQL, Drizzle ORM, Next.js 16 App Router, and production system design.",
    url: `${APP_URL}/technical-skills`,
    type: "website",
    images: [
      {
        url: `${APP_URL}/Filled_Logo.png`,
        width: 1200,
        height: 630,
        alt: "Samir Shaikh Technical Skills & Architecture Index",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Skills & Architecture Index | Samir Shaikh",
    description:
      "Explore Samir Shaikh's technical expertise across AI backend engineering, 3072d vector retrieval, Node.js/TypeScript microservices, PostgreSQL, Drizzle ORM, and Next.js 16.",
    images: [`${APP_URL}/Filled_Logo.png`],
  },
};

const architecturalTradeoffs = [
  {
    title: "pgvector vs Dedicated Vector Databases",
    context: "PostgreSQL pgvector vs Pinecone / Weaviate / Qdrant",
    verdict: "Co-located relational vector storage",
    rationale:
      "For applications with under 10 million vectors, separating vector indexes into hosted SaaS introduces dual-write consistency hazards, network latency, and synchronization overhead. pgvector allows vectors to participate in ACID transactions and join directly with user, blog, and permissions tables in a single SQL query plan.",
  },
  {
    title: "TypeScript Strict Mode + Zod at I/O Boundaries",
    context: "Static types vs Runtime schema validation",
    verdict: "Dual-layer type safety",
    rationale:
      "TypeScript compiles to nothing at runtime. To prevent silent type drift from third-party APIs, webhooks, and database mutations, all external inputs are parsed with strict Zod schemas at the edge, converting untrusted JSON into verified domain objects with compile-time type inference.",
  },
  {
    title: "Server Components by Default over Client SPAs",
    context: "Next.js App Router RSC vs Client-Side Data Fetching",
    verdict: "Zero-bundle server queries with ISR",
    rationale:
      "Fetching database records in Server Components removes client bundle weight, eliminates waterfall requests, and keeps database connection credentials securely off the client. Heavy interactive widgets are isolated behind dynamic imports with ssr: false to prevent hydration mismatches.",
  },
  {
    title: "Drizzle ORM vs Heavy Schema Generators",
    context: "Drizzle ORM vs Prisma / TypeORM",
    verdict: "SQL-like transparency & zero cold-start overhead",
    rationale:
      "Drizzle behaves as a typed query builder rather than an opinionated abstraction engine. It adds negligible runtime overhead, boots in serverless environments in under 15ms without binary engines, and natively handles complex pgvector similarity operations like cosineDistance.",
  },
];

export default function TechnicalSkillsPage() {
  const faqJsonLd = getFaqPageJsonLd(TECHNICAL_SKILLS_FAQS);
  const speakableJsonLd = getSpeakableJsonLd(["h1", "h2", ".dev-overview-text"]);

  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Technical Skills & Architecture Index | Samir Shaikh",
    url: `${APP_URL}/technical-skills`,
    mainEntity: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: APP_URL,
      jobTitle: "AI Backend Engineer & Full Stack Developer",
      sameAs: [LINKEDIN_URL, GITHUB_URL],
      knowsAbout: [
        "AI Backend Engineering",
        "Agentic AI & Tool Calling",
        "RAG & Vector Retrieval",
        "PostgreSQL & pgvector",
        "Node.js & TypeScript",
        "Next.js App Router",
        "REST & GraphQL APIs",
        "Docker & Containerization",
        "Distributed Systems & BullMQ",
        "System Design & Modular Monolith",
      ],
    },
  };

  return (
    <main className="relative flex flex-col flex-1 px-5 sm:px-8 md:px-10 pb-20">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />

      <div className="max-w-5xl mx-auto w-full">
        {/* Breadcrumb Navigation */}
        <div className="pt-6 md:pt-10 mb-6">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Technical Skills", href: "/technical-skills" },
            ]}
          />
        </div>

        {/* ── EDITORIAL HEADER ────────────────────────────────────────────── */}
        <header className="pb-10 pt-2 border-b border-border-primary mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-border-primary bg-hover-bg text-[11px] font-mono font-semibold tracking-wider text-text-secondary uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              SYSTEM ARCHITECTURE &bull; ENGINEERING INDEX
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-[1.15]">
              Technical Skills &amp; Architecture
            </h1>
            <p className="mt-2 text-base sm:text-lg font-mono text-accent-lime font-bold">
              AI Backend Engineer &bull; AI SDE &bull; Full Stack Developer
            </p>
            <p className="mt-4 text-text-secondary text-sm sm:text-base max-w-2xl leading-relaxed">
              A verified index of programming languages, system architecture patterns, backend and
              frontend engineering, databases, and AI pipelines engineered for production reliability.
            </p>
          </div>

          {/* Quick Action Navigation */}
          <div className="flex flex-wrap md:flex-col gap-2.5 shrink-0">
            <Link
              href="/hire"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-lime text-[#0A0A0A] text-xs sm:text-sm font-bold px-5 py-3 hover:bg-accent-lime/90 transition-colors whitespace-nowrap cursor-pointer"
            >
              <LuCheck className="w-4 h-4 stroke-[2.5]" />
              <span>Hire Samir / Role Availability</span>
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-primary bg-background dark:bg-card-bg text-foreground text-xs sm:text-sm font-bold px-5 py-3 hover:bg-hover-bg transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>Explore Production Code</span>
              <LuArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#faq"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-primary bg-background dark:bg-card-bg text-text-secondary hover:text-foreground text-xs sm:text-sm font-medium px-5 py-2.5 hover:bg-hover-bg transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>Architecture FAQ</span>
              <span className="text-xs font-mono text-text-muted">&darr;</span>
            </a>
          </div>
        </header>

        {/* ── DEVELOPER PROFILE & SYSTEM BENCHMARKS ────────────────────────── */}
        <section
          id="overview"
          aria-labelledby="overview-heading"
          className="mb-16 rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-6 sm:p-8"
        >
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
            <span>01 // Core Positioning</span>
          </div>
          <h2
            id="overview-heading"
            className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mb-4"
          >
            Backend-First Systems with Deterministic AI
          </h2>

          <div className="dev-overview-text text-sm sm:text-base text-text-secondary leading-relaxed space-y-4 mb-8">
            <p>
              I build production software with a backend-first foundation, specializing in architecting
              resilient Node.js and TypeScript services, scalable databases, and event-driven architectures.
              Rather than assembling brittle wrapper applications, I ground LLMs in deterministic data layers
              using pgvector, strict vector distance thresholds, and explicit relational schemas.
            </p>
          </div>

          {/* 3 Measurable Production Standards (Open 3-Column Layout, No Nested Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-border-primary">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-text-muted block mb-1">
                Vector Search Benchmark
              </span>
              <p className="text-lg font-bold text-foreground">
                &lt; 280ms Retrieval Latency
              </p>
              <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                Gemini 3072d embeddings, pgvector cosine distance &le; 0.5 strict thresholds, and deterministic fallback chains.
              </p>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-text-muted block mb-1">
                API Response Standard
              </span>
              <p className="text-lg font-bold text-foreground">
                Sub-100ms P95 Latency
              </p>
              <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                Normalized PostgreSQL schemas, partial query indexes, connection pooling, and Drizzle ORM query compilation.
              </p>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-text-muted block mb-1">
                Type &amp; Execution Safety
              </span>
              <p className="text-lg font-bold text-foreground">
                100% End-to-End Typed
              </p>
              <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                TypeScript strict mode across client and server, Zod schema validation at every network boundary, and automated test coverage.
              </p>
            </div>
          </div>
        </section>

        {/* ── ARCHITECTURAL CONVICTIONS & TRADE-OFFS ───────────────────────── */}
        <section aria-labelledby="tradeoffs-heading" className="mb-16">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-border-primary bg-hover-bg text-[11px] font-mono font-semibold tracking-wider text-text-secondary uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              TECHNICAL JUDGEMENT
            </div>
            <h2
              id="tradeoffs-heading"
              className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
            >
              Architectural Convictions &amp; Trade-offs
            </h2>
            <p className="text-text-secondary text-sm sm:text-base mt-2 leading-relaxed">
              A list of library names does not prove engineering ability. Here is how I evaluate
              real system trade-offs when making architectural decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {architecturalTradeoffs.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-text-muted mb-2">
                    <span className="uppercase tracking-wider">Trade-off #{idx + 1}</span>
                    <span className="text-accent-lime font-bold">{item.verdict}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <span className="text-xs font-mono text-text-muted block mb-3">
                    {item.context}
                  </span>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {item.rationale}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4 CORE ENGINEERING PILLARS ───────────────────────────────────── */}
        <section aria-labelledby="pillars-heading" className="mb-16 space-y-12">
          <div className="max-w-2xl mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-border-primary bg-hover-bg text-[11px] font-mono font-semibold tracking-wider text-text-secondary uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              PRODUCTION DOMAINS
            </div>
            <h2
              id="pillars-heading"
              className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
            >
              Core Engineering Stack &amp; Capabilities
            </h2>
            <p className="text-text-secondary text-sm sm:text-base mt-2 leading-relaxed">
              Structured into four cohesive domains spanning autonomous AI systems, scalable backend
              microservices, relational data layers, and the modern web platform.
            </p>
          </div>

          {/* Pillar 1: AI Systems & Vector Retrieval */}
          <div className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-6 border-b border-border-primary">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-hover-bg border border-border-primary flex items-center justify-center text-accent-lime shrink-0">
                  <LuCpu className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-text-muted block">
                    Domain 01
                  </span>
                  <h3 className="text-xl font-black text-foreground">
                    AI Systems, RAG &amp; Autonomous Agents
                  </h3>
                </div>
              </div>
              <span className="text-xs font-mono text-accent-lime font-bold">
                Zero-Hallucination Architectures
              </span>
            </div>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed my-5">
              Engineering autonomous workflows, tool-calling agent pipelines, and high-precision RAG
              systems. I implement document chunking strategies, pgvector cosine distance indexing,
              deterministic retrieval thresholds (&le; 0.5), and fallback cascades to ensure AI outputs
              are verifiably grounded in authoritative context.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-2">
              {[
                { name: "Gemini 3072d Embeddings", tag: "Vector Engine" },
                { name: "pgvector Cosine Distance", tag: "Retrieval" },
                { name: "Groq LLaMA 3.3 70B", tag: "Inference" },
                { name: "Vercel AI SDK", tag: "Streaming" },
                { name: "Tool Calling & Agents", tag: "Autonomy" },
                { name: "Document Chunking", tag: "RAG Pipeline" },
                { name: "Prompt Grounding", tag: "Zero Hallucination" },
                { name: "Model Routing & Fallbacks", tag: "Resilience" },
              ].map((item) => (
                <div
                  key={item.name}
                  className="p-3 rounded-xl border border-border-primary bg-hover-bg/40 flex flex-col justify-between"
                >
                  <span className="text-xs font-semibold text-foreground leading-snug">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-text-muted mt-1 uppercase">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pillar 2: Backend Architecture & High-Throughput APIs */}
          <div className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-6 border-b border-border-primary">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-hover-bg border border-border-primary flex items-center justify-center text-accent-lime shrink-0">
                  <LuServer className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-text-muted block">
                    Domain 02
                  </span>
                  <h3 className="text-xl font-black text-foreground">
                    Backend Architecture &amp; High-Throughput APIs
                  </h3>
                </div>
              </div>
              <span className="text-xs font-mono text-text-muted font-bold">
                Node.js &bull; TypeScript &bull; Express
              </span>
            </div>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed my-5">
              Developing high-throughput REST and GraphQL APIs designed for low latency, event handling,
              and strict security. Extensive experience implementing Apollo Server schemas with DataLoader
              batching, webhook ingestion, Redis rate limiting, and BullMQ background task processing.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-2">
              {[
                { name: "Node.js (ESM)", tag: "Runtime" },
                { name: "TypeScript (Strict)", tag: "Language" },
                { name: "Express.js", tag: "HTTP Framework" },
                { name: "GraphQL & Apollo", tag: "API Protocol" },
                { name: "DataLoader Batching", tag: "N+1 Elimination" },
                { name: "BullMQ & Redis Queues", tag: "Background Jobs" },
                { name: "Webhooks & Socket.io", tag: "Event Streams" },
                { name: "Docker & Compose", tag: "Containers" },
              ].map((item) => (
                <div
                  key={item.name}
                  className="p-3 rounded-xl border border-border-primary bg-hover-bg/40 flex flex-col justify-between"
                >
                  <span className="text-xs font-semibold text-foreground leading-snug">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-text-muted mt-1 uppercase">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pillar 3: Databases & Storage Layers */}
          <div className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-6 border-b border-border-primary">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-hover-bg border border-border-primary flex items-center justify-center text-accent-lime shrink-0">
                  <LuDatabase className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-text-muted block">
                    Domain 03
                  </span>
                  <h3 className="text-xl font-black text-foreground">
                    Databases, Relational Schemas &amp; Caching
                  </h3>
                </div>
              </div>
              <span className="text-xs font-mono text-text-muted font-bold">
                PostgreSQL &bull; Drizzle ORM &bull; Redis
              </span>
            </div>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed my-5">
              ACID-compliant relational data modeling, query optimization, and caching strategies.
              Expertise in PostgreSQL schema design, composite and partial indexing, connection pooling,
              Drizzle ORM migrations, alongside Redis cache-aside patterns and MongoDB document stores.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-2">
              {[
                { name: "PostgreSQL", tag: "Relational RDBMS" },
                { name: "Drizzle ORM", tag: "Query Builder" },
                { name: "Redis In-Memory", tag: "Cache-Aside" },
                { name: "MongoDB & Firestore", tag: "Document Store" },
                { name: "Connection Pooling", tag: "Scaling" },
                { name: "Partial & GIN Indexes", tag: "Query Tuning" },
                { name: "ACID Transactions", tag: "Data Integrity" },
                { name: "Database Migrations", tag: "Schema Ops" },
              ].map((item) => (
                <div
                  key={item.name}
                  className="p-3 rounded-xl border border-border-primary bg-hover-bg/40 flex flex-col justify-between"
                >
                  <span className="text-xs font-semibold text-foreground leading-snug">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-text-muted mt-1 uppercase">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pillar 4: Modern Web Platform & Frontend Systems */}
          <div className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-6 border-b border-border-primary">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-hover-bg border border-border-primary flex items-center justify-center text-accent-lime shrink-0">
                  <LuLayoutGrid className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-text-muted block">
                    Domain 04
                  </span>
                  <h3 className="text-xl font-black text-foreground">
                    Modern Web Platform &amp; Frontend Systems
                  </h3>
                </div>
              </div>
              <span className="text-xs font-mono text-text-muted font-bold">
                Next.js 16 &bull; React 19 &bull; Tailwind v4
              </span>
            </div>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed my-5">
              Building responsive, accessible web applications leveraging modern Next.js App Router
              paradigms, React 19 Server Components, and zero Cumulative Layout Shift (CLS). I engineer
              clean state boundaries, Serwist PWA service workers, and WCAG 2.2 AA compliant UI.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-2">
              {[
                { name: "Next.js 16 (App Router)", tag: "Full-Stack Web" },
                { name: "React 19 Server Components", tag: "Architecture" },
                { name: "Tailwind CSS v4", tag: "Design Tokens" },
                { name: "Serwist PWA & Service Worker", tag: "Offline & Push" },
                { name: "WCAG 2.2 AA Conformance", tag: "Accessibility" },
                { name: "Zero CLS Performance", tag: "Core Web Vitals" },
                { name: "Dynamic OG Social Cards", tag: "@vercel/og" },
                { name: "Schema.org JSON-LD", tag: "SEO & AEO" },
              ].map((item) => (
                <div
                  key={item.name}
                  className="p-3 rounded-xl border border-border-primary bg-hover-bg/40 flex flex-col justify-between"
                >
                  <span className="text-xs font-semibold text-foreground leading-snug">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-text-muted mt-1 uppercase">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SYSTEM DESIGN PATTERNS & ENGINEERING DISCIPLINES ─────────────── */}
        <section aria-labelledby="patterns-heading" className="mb-16">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-border-primary bg-hover-bg text-[11px] font-mono font-semibold tracking-wider text-text-secondary uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              SYSTEM DESIGN &amp; PRINCIPLES
            </div>
            <h2
              id="patterns-heading"
              className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
            >
              Architectural Patterns &amp; Foundations
            </h2>
            <p className="text-text-secondary text-sm sm:text-base mt-2 leading-relaxed">
              Pragmatic distributed systems patterns and computer science disciplines applied across
              codebase structure, database transactions, and API governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {SYSTEM_DESIGN_CONCEPTS.map((concept) => (
              <div
                key={concept.name}
                className="rounded-xl border border-border-primary bg-background dark:bg-card-bg p-5 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-1">
                    {concept.name}
                  </h3>
                  <span className="text-[11px] font-mono text-text-muted block mb-2">
                    {concept.sub}
                  </span>
                  <p className="text-xs text-text-secondary leading-relaxed mb-4">
                    {concept.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 pt-3 border-t border-border-primary/60">
                  {concept.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md border border-border-primary bg-hover-bg text-text-muted"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Software Engineering Principles Badges */}
          <div className="rounded-xl border border-border-primary bg-background dark:bg-card-bg p-5">
            <span className="text-xs font-mono uppercase tracking-wider text-text-muted block mb-3">
              Core Engineering Disciplines
            </span>
            <div className="flex flex-wrap gap-2">
              {SOFTWARE_ENGINEERING_CONCEPTS.map((concept) => (
                <div
                  key={concept.name}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-primary bg-hover-bg/50 text-xs"
                >
                  <span className="font-bold text-foreground">{concept.name}</span>
                  <span className="text-text-muted font-mono text-[10px]">({concept.sub})</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTERACTIVE ARCHITECTURE & TECHNICAL FAQ ─────────────────────── */}
        <section id="faq" aria-labelledby="faq-heading" className="mb-16 scroll-mt-24">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-border-primary bg-hover-bg text-[11px] font-mono font-semibold tracking-wider text-text-secondary uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              KNOWLEDGE BASE &bull; FREQUENTLY ASKED QUESTIONS
            </div>
            <h2
              id="faq-heading"
              className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
            >
              Technical FAQ &amp; Architecture Inquiries
            </h2>
            <p className="text-text-secondary text-sm sm:text-base mt-2 leading-relaxed">
              Detailed answers on stack decisions, GraphQL vs REST, database scaling, AI workflows, and testing philosophy. Search by keyword or filter by domain.
            </p>
          </div>

          <TechnicalSkillsFAQClient faqs={TECHNICAL_SKILLS_FAQS} />
        </section>

        {/* ── CLOSING CONVERSION & CONNECT SECTION ─────────────────────────── */}
        <div className="rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-8 sm:p-12 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-border-primary bg-hover-bg text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
            DIRECT TECHNICAL ENGAGEMENT
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground max-w-xl mx-auto mb-3">
            Looking for an Engineer with Proven Backend Rigor?
          </h2>

          <p className="text-text-secondary text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-8">
            Whether filling a dedicated full-time engineering role or executing a high-urgency sprint,
            I bring clean architecture, self-directed velocity, and zero hand-holding.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
            <Link
              href="/hire"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-lime text-[#0A0A0A] text-sm font-bold px-7 py-3.5 hover:bg-accent-lime/90 transition-colors cursor-pointer"
            >
              <LuCheck className="w-4 h-4 stroke-[2.5]" />
              <span>Hire Samir / View Availability</span>
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-primary bg-background dark:bg-card-bg text-foreground text-sm font-bold px-7 py-3.5 hover:bg-hover-bg transition-colors cursor-pointer"
            >
              <span>Explore Selected Work</span>
              <LuArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-primary bg-background dark:bg-card-bg text-text-secondary hover:text-foreground text-sm font-medium px-6 py-3.5 hover:bg-hover-bg transition-colors cursor-pointer"
            >
              <span>View Services &amp; Sprints</span>
            </Link>
          </div>

          <div className="pt-6 border-t border-border-primary flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-text-muted font-mono">
            <span className="inline-flex items-center gap-1.5">
              <LuShield className="text-accent-lime text-sm" />
              Direct Engineer Communication
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LuTerminal className="text-accent-lime text-sm" />
              Immediate (0 Days) Availability
            </span>
            <span className="inline-flex items-center gap-1.5">
              <LuGitPullRequest className="text-accent-lime text-sm" />
              100% Repository &amp; IP Transfer
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
