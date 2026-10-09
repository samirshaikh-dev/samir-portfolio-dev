export interface ArchitectureDiagram {
  title: string;
  diagram: string;
  benchmarks: string[];
}

export interface ScopeBoundaries {
  included: string[];
  customScope: string[];
}

export interface ServiceFAQItem {
  question: string;
  answer: string;
}

export interface ServiceOffering {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  startingPrice?: string;
  priceAmount?: string;
  priceCurrency?: string;
  deliverables: string[];
  techStack: string[];
  tags?: string[];
  audience?: string;
  relatedLink?: {
    label: string;
    href: string;
  };
  customScopeTitle?: string;
  customScopeSubtitle?: string;
  problemStatement?: string;
  solutionApproach?: string;
  typicalDuration?: string;
  architectureDiagram?: ArchitectureDiagram;
  scopeBoundaries?: ScopeBoundaries;
  serviceFaqs?: ServiceFAQItem[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  services: ServiceOffering[];
}

export interface ServiceFAQ {
  id: string;
  question: string;
  answer: string;
  tags?: string[];
}

export interface EngagementModel {
  title: string;
  badge: string;
  startingPrice: string;
  priceAmount?: string;
  subtitle: string;
  highlights: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "ai-saas-augmentation",
    title: "AI & SaaS Product Augmentation",
    subtitle:
      "Embed production-grade AI chatbots, custom RAG knowledge bases, and autonomous agents directly into your existing web apps and SaaS.",
    services: [
      {
        id: "add-ai-existing-saas",
        badge: "01 // SAAS AI AUGMENTATION",
        title: "Add AI to Existing Products & SaaS",
        tagline:
          "Embed custom AI chatbots, semantic search, and smart summarization directly into your current web app or SaaS.",
        description:
          "Enhance your existing software with production AI features without doing a painful rewrite. We connect PostgreSQL pgvector, Gemini 3072d embeddings, and fast streaming LLMs to your current database, user authentication, and frontend UI — delivering grounded answers, sub-300ms vector retrieval, and zero hallucinations.",
        startingPrice: "From $800 / ₹65,000",
        priceAmount: "800",
        priceCurrency: "USD",
        customScopeTitle: "Enterprise Multi-Tenant AI Retainer",
        customScopeSubtitle:
          "For multi-tenant databases, custom fine-tuning, complex data isolation, or dedicated ongoing AI feature sprints.",
        problemStatement:
          "Most startups attempt to add AI by slapping generic OpenAI API wrappers into their application. This leads to hallucinated answers, unpredictable token billing spikes, sluggish response times, and angry customers when private tenant data leaks.",
        solutionApproach:
          "We build a hardened, production-grade retrieval pipeline: (1) Chunking and indexing data in PostgreSQL using pgvector with 3072-dimensional Gemini embeddings, (2) Enforcing strict cosine distance boundaries (<=0.5) to reject irrelevant queries, (3) Streaming responses via Groq/Gemini with fallback models, and (4) Rate-limiting by IP and user ID to prevent runaway costs.",
        typicalDuration: "1–2 Weeks",
        deliverables: [
          "Semantic document indexing (PDFs, Markdown, Notion, SQL data) with PostgreSQL pgvector",
          "Hallucination mitigation via strict cosine distance boundaries (<=0.5) and prompt grounding",
          "Turnkey AI chat widget or backend streaming REST API integrated into your existing frontend",
          "Context window budget optimization, rate limiting, and multi-provider failover (Groq, Gemini, OpenAI)",
          "Full test suite, observability logging, and zero-downtime integration with your existing stack",
        ],
        techStack: ["Vercel AI SDK", "pgvector", "PostgreSQL", "Gemini Embeddings", "Groq", "TypeScript"],
        tags: [
          "Add AI to Existing App",
          "SaaS AI Integration",
          "AI Chatbot",
          "RAG Systems",
          "pgvector",
          "Semantic Search",
          "Stop Hallucinations",
        ],
        audience: "Founders and product teams with existing SaaS applications looking to add AI capabilities fast",
        relatedLink: { label: "Test the portfolio AI chatbot →", href: "/projects" },
        architectureDiagram: {
          title: "DATA FLOW & RELEVANCE BOUNDARY ARCHITECTURE",
          diagram: `[User Query / Client Application]
       │
       ▼
[Next.js API Handler] ──▶ [Rate Limiter & Token Budgeting]
       │
       ▼
[Gemini 2.0 Text Embedding] ──▶ (3072d Dense Vector)
       │
       ▼
[PostgreSQL + pgvector Cosine Index]
       │
       ├─▶ Cosine Distance <= 0.5 ──▶ [Grounded Context Assembly] ──▶ [Groq Stream LLM] ──▶ Verified Output
       │
       └─▶ Cosine Distance > 0.5  ──▶ [Deterministic Fallback Chain] ─────────────────────▶ Declines Hallucination`,
          benchmarks: [
            "Retrieval Latency < 280ms",
            "Grounded Accuracy 99.2%",
            "Strict Zero Hallucination Cutoff",
            "Multi-Provider Failover",
          ],
        },
        scopeBoundaries: {
          included: [
            "Integration with up to 2 existing database entities or document collections",
            "Full pgvector setup in PostgreSQL with cosine distance indexing",
            "Streaming UI component (React/Next.js) or REST API endpoint",
            "Rate limiting and token budget guards",
            "14-day post-launch bug warranty",
          ],
          customScope: [
            "Multi-tenant data partitioning across hundreds of enterprise tenants",
            "Automated document sync pipelines with Google Drive, Notion, or Slack",
            "Dedicated model fine-tuning or hybrid local LLM hosting",
            "Ongoing monthly prompt optimization and evaluation retainer",
          ],
        },
        serviceFaqs: [
          {
            question: "Do we need to rewrite our application to add AI?",
            answer:
              "No. We connect directly to your existing PostgreSQL database, backend routes, and frontend UI via lightweight REST or streaming API endpoints. Your existing architecture remains untouched.",
          },
          {
            question: "How do you guarantee the AI won't hallucinate fake information?",
            answer:
              "We use strict cosine distance thresholds (<=0.5) against pgvector embeddings. If the user's question has no semantically relevant documents in your knowledge base, the system deterministically replies that it does not know instead of guessing.",
          },
          {
            question: "How are API costs controlled?",
            answer:
              "We implement per-user rate limiting, strict token budgeting per request, and hybrid prompt caching to keep LLM operational costs under pennies per day.",
          },
        ],
      },
      {
        id: "ai-agents",
        badge: "02 // AGENT WORKFLOWS",
        title: "Deterministic AI Agents & Tool Calling",
        tagline:
          "Autonomous agent workflows that query internal APIs, execute tasks, and return validated structured data.",
        description:
          "Move beyond conversational chat into autonomous AI agents that get real work done. We build tool-calling agentic workflows with strict Zod schema validation, multi-step error recovery, API integrations, and session memory that run reliably in production.",
        startingPrice: "From $900 / ₹75,000",
        priceAmount: "900",
        priceCurrency: "USD",
        customScopeTitle: "Autonomous Multi-Agent Systems",
        customScopeSubtitle:
          "For complex asynchronous workflows, multi-agent debates, human-in-the-loop approvals, and ERP orchestration.",
        problemStatement:
          "Standard chatbots only output conversational text. When companies try to build automated agents, the models fail silently: hallucinating fake API parameters, looping indefinitely on errors, and corrupting production databases with invalid outputs.",
        solutionApproach:
          "We engineer deterministic agent workflows using Vercel AI SDK and strict Zod runtime validation. Every tool call has a validated input and output contract, execution loops are hard-bounded with exponential retries, and conversation state persists in Redis and PostgreSQL.",
        typicalDuration: "1–2 Weeks",
        deliverables: [
          "Function calling and custom API integrations for multi-step automated task execution",
          "Strict JSON schema validation using Zod for deterministic, machine-parseable outputs",
          "Defensive prompt guardrails, retry loops, and transactional fallback mechanisms",
          "Session state persistence across user interactions with Redis and PostgreSQL",
          "Automated regression tests and CI verification for deterministic agent behavior",
        ],
        techStack: ["Vercel AI SDK", "Groq", "Google Gemini", "Node.js", "Zod", "TypeScript"],
        tags: [
          "AI Agents",
          "Tool Calling",
          "Workflow Automation",
          "Structured Outputs",
          "Agentic AI",
          "Zod Validation",
        ],
        audience: "Operations teams, SaaS platforms, and startups automating repetitive human workflows",
        relatedLink: { label: "Read agentic engineering articles →", href: "/blogs" },
        architectureDiagram: {
          title: "DETERMINISTIC TOOL-CALLING AGENT LOOP",
          diagram: `[User Request / Webhook Event]
       │
       ▼
[Agent Orchestrator Loop] ──▶ [Redis Session Memory & History]
       │
       ▼
[LLM Tool Selection] ──▶ (Function Call Identification)
       │
       ▼
[Zod Schema Validator]
       │
       ├─▶ Valid Schema   ──▶ [API Tool Execution] ──▶ [Database Transaction] ──▶ Validated JSON Output
       │
       └─▶ Invalid Schema ──▶ [Self-Correction Retry Loop (Max 3)] ─────────────▶ Safe Graceful Recovery`,
          benchmarks: [
            "100% Type-Safe Zod Outputs",
            "Max 3 Retry Bounds",
            "Sub-2s Total Loop Execution",
            "Zero Broken Database Transactions",
          ],
        },
        scopeBoundaries: {
          included: [
            "Up to 4 custom tool integrations (Database query, Email, CRM update, API call)",
            "Strict Zod schema validation on all inputs and outputs",
            "Bounded retry loop with fallback error handlers",
            "Redis/PostgreSQL session history persistence",
            "Unit and integration test suite",
          ],
          customScope: [
            "Multi-agent collaborative swarms (Planner + Executor + Critic)",
            "Human-in-the-loop escalation workflows with Slack approval buttons",
            "Asynchronous long-running agents with background worker workers (BullMQ)",
          ],
        },
        serviceFaqs: [
          {
            question: "What is the difference between an AI chatbot and an AI agent?",
            answer:
              "A chatbot only produces conversational text. An AI agent is equipped with tools — it can query your database, trigger an email via Nodemailer, create a Stripe invoice, or update your CRM, all deterministically validated with Zod.",
          },
          {
            question: "How do you prevent the agent from running into an infinite loop?",
            answer:
              "We configure hard maximum iteration limits (typically 3–5 steps), execution timeouts, and cycle detection algorithms. If a tool fails repeatedly, it safely halts and returns an actionable error message.",
          },
        ],
      },
      {
        id: "rag-systems",
        badge: "03 // CUSTOM KNOWLEDGE BASES",
        title: "Custom Knowledge Bases & Enterprise RAG",
        tagline:
          "High-accuracy vector retrieval pipelines querying proprietary enterprise documentation with sub-300ms speed.",
        description:
          "Turn company wikis, technical manuals, contracts, and knowledge bases into an instantly searchable, cited AI brain. Powered by hybrid keyword + semantic search and vector indexing in PostgreSQL pgvector.",
        startingPrice: "From $950 / ₹80,000",
        priceAmount: "950",
        priceCurrency: "USD",
        customScopeTitle: "Terabyte-Scale Enterprise RAG Architecture",
        customScopeSubtitle:
          "For massive document collections, strict SOC2/HIPAA compliance, real-time sync, and re-ranking pipelines.",
        problemStatement:
          "Enterprises possess thousands of pages in PDFs, Google Drive files, contracts, and Notion docs. Keyword search fails because it misses semantic meaning, while standard ChatGPT models know nothing about internal company policies or private schemas.",
        solutionApproach:
          "We construct a production RAG system: (1) Automated document ingestion that parses PDFs, Word docs, and Markdown, (2) Semantic chunking with overlap, (3) Dual indexing combining PostgreSQL full-text search (`tsvector`) with pgvector cosine similarity, and (4) Strict source citation with page references.",
        typicalDuration: "2–3 Weeks",
        deliverables: [
          "Automated document ingestion pipeline for PDFs, docx, Markdown, and API docs",
          "PostgreSQL pgvector chunking, embedding generation, and metadata filtering",
          "Hybrid search combining full-text search with vector cosine similarity",
          "Role-based document access control and tenant isolation",
          "Latency profiling and retrieval benchmarking (<300ms)",
        ],
        techStack: ["PostgreSQL", "pgvector", "Drizzle ORM", "TypeScript", "Vercel AI SDK", "Docker"],
        tags: [
          "Enterprise RAG",
          "Custom Knowledge Base",
          "pgvector",
          "Document Search",
          "Vector Embeddings",
        ],
        audience: "Enterprises, customer support orgs, and technical product teams needing reliable retrieval",
        relatedLink: { label: "View RAG project demo →", href: "/projects" },
        architectureDiagram: {
          title: "HYBRID VECTOR + FULL-TEXT RAG PIPELINE",
          diagram: `[Document Ingestion (PDF / Docs / Notion)]
       │
       ▼
[Semantic Chunker & Metadata Tagger] ──▶ [Role-Based Tenant Guard]
       │
       ▼
[PostgreSQL Database (Neon Serverless)]
       │
       ├─▶ Full-Text Search (tsvector / BM25) ──┐
       │                                         ├──▶ [Hybrid Re-Ranker] ──▶ Top-K Context ──▶ Grounded LLM
       └─▶ Semantic Search (pgvector 3072d) ────┘`,
          benchmarks: [
            "Vector Retrieval Latency < 280ms",
            "Exact Document Source Citations",
            "Tenant-Isolated Vector Chunks",
            "Zero Data Leakage Across Tenants",
          ],
        },
        scopeBoundaries: {
          included: [
            "Document parsing pipeline for PDFs, Markdown, and text files",
            "Hybrid PostgreSQL pgvector search with metadata filtering",
            "Verified citation injection in generated responses",
            "Fast streaming search API and sample frontend widget",
            "14-day warranty",
          ],
          customScope: [
            "Automated continuous sync with Google Drive, Confluence, or Notion APIs",
            "OCR parsing for complex scanned PDF tables and invoices",
            "Cross-encoder re-ranking for ultra-high precision legal/medical workflows",
          ],
        },
        serviceFaqs: [
          {
            question: "Why use PostgreSQL pgvector instead of Pinecone or Milvus?",
            answer:
              "PostgreSQL with pgvector allows your relational data and vector embeddings to live in the same ACID-compliant database. You eliminate the cost, complexity, and security risk of managing a separate third-party vector database service.",
          },
          {
            question: "Can users verify where the AI found its answers?",
            answer:
              "Yes. Every generated answer includes exact Markdown source links and citations referencing the specific document, section, and page number retrieved from the context.",
          },
        ],
      },
    ],
  },
  {
    id: "codebase-rescue-modernization",
    title: "Codebase Takeover, Rescue & Modernization",
    subtitle:
      "Take over an existing codebase, rescue a broken MVP, fix urgent bugs, or safely modernize legacy tech debt.",
    services: [
      {
        id: "codebase-audit",
        badge: "04 // FIXED-PRICE AUDIT",
        title: "Codebase Audit & Technical Roadmap",
        tagline:
          "A comprehensive 3–5 day code audit, security check, and prioritized milestone roadmap with zero long-term commitment.",
        description:
          "The lowest-risk entry point to work together. If you inherited a codebase, are preparing to raise capital, or want a senior second opinion before scaling, I analyze your architecture, database bottlenecks, security posture, and code health. You get an executive summary and a prioritized GitHub issue backlog with time/cost estimates.",
        startingPrice: "Fixed $450 / ₹35,000",
        priceAmount: "450",
        priceCurrency: "USD",
        customScopeTitle: "Multi-Repository Technical Due Diligence",
        customScopeSubtitle:
          "For investors, acquisitions, or multi-repo distributed architectures requiring full technical diligence.",
        problemStatement:
          "Founders frequently take over codebases from outsourced agencies or previous freelancers with zero documentation. You have no visibility into whether the schema has unindexed foreign keys, memory leaks, unauthenticated endpoints, or scaling landmines until production crashes on launch day.",
        solutionApproach:
          "A non-invasive, read-only 3–5 day audit. We inspect database query plans (EXPLAIN ANALYZE), audit authentication guards, analyze package vulnerabilities, profile API endpoints, and deliver a 12–18 page report plus a 45-minute Loom/Zoom walkthrough.",
        typicalDuration: "3–5 Days",
        deliverables: [
          "Complete architectural review of Next.js / Node.js / TypeScript / PostgreSQL codebases",
          "Security and authentication vulnerability scan (NextAuth, JWT, RBAC, input sanitization)",
          "Database query profiling, missing index detection, and connection pool audit",
          "Tech debt inventory categorized by critical, high, and moderate priority",
          "Actionable roadmap with estimated hours and milestone recommendations ready for execution",
        ],
        techStack: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Drizzle ORM", "ESLint"],
        tags: [
          "Codebase Audit",
          "Technical Roadmap",
          "Code Review",
          "Architecture Review",
          "Security Audit",
          "Tech Debt",
        ],
        audience: "Founders taking over apps from previous agencies, non-technical CEOs, or teams before a major launch",
        relatedLink: { label: "View 3-5 Day Audit & Guarantee →", href: "/services/codebase-audit" },
        architectureDiagram: {
          title: "NON-INVASIVE ARCHITECTURE AUDIT PIPELINE",
          diagram: `[Private Repository (Read-Only GitHub Access)]
       │
       ▼
[Dependency & Secret Scan] ──▶ Vulnerability & CVE Assessment
       │
       ▼
[PostgreSQL Schema Profiler] ──▶ Index Analysis & Connection Pooling Audit
       │
       ▼
[API Handlers & Auth Guard] ──▶ RBAC & Injection Vector Review
       │
       ▼
[12–18 Page Comprehensive Report] ──▶ [30-60-90 Day Execution Backlog + 45m Zoom Screen]`,
          benchmarks: [
            "100% Unconditional Money-Back Guarantee",
            "Strict 3–5 Business Day Delivery",
            "Read-Only Repository Access Only",
            "Signed Mutual NDA",
          ],
        },
        scopeBoundaries: {
          included: [
            "Full architectural analysis of 1 primary repository",
            "Database schema, indexing, and connection pool review",
            "Security, auth boundary, and secret leak inspection",
            "12–18 page executive and engineering report",
            "45-minute Zoom/Loom walkthrough session",
          ],
          customScope: [
            "Auditing multi-repository microservice architectures",
            "Hands-on implementation of the identified fixes (credited toward sprint)",
            "Formal SOC2 or HIPAA compliance certification prep",
          ],
        },
        serviceFaqs: [
          {
            question: "How much access to our codebase do you need?",
            answer:
              "Only read-only GitHub or GitLab repository access. You never need to share production database credentials or private customer information. We execute a mutual NDA before receiving access.",
          },
          {
            question: "What is your 100% Money-Back Guarantee?",
            answer:
              "If the audit report and walkthrough do not uncover at least 3 critical, actionable improvements that will save your team engineering hours, prevent outages, or optimize cloud costs, email me within 7 days for a 100% prompt refund.",
          },
        ],
      },
      {
        id: "rescue-fix-it",
        badge: "05 // EMERGENCY RESCUE",
        title: "Codebase Rescue & MVP Fix-It Sprints",
        tagline:
          "Rapid rescue for abandoned projects, ghosted developer handovers, and MVPs breaking under user load.",
        description:
          "When your previous freelancer disappears, your MVP crashes during investor demos, or production errors are piling up, you need senior engineering triage immediately. I step into unfamiliar codebases, stabilize production, fix critical bugs, and get your application running smoothly in days.",
        startingPrice: "From $600 / ₹50,000",
        priceAmount: "600",
        priceCurrency: "USD",
        customScopeTitle: "Full Codebase Overhaul & Stabilization",
        customScopeSubtitle:
          "For severely degraded applications requiring multi-week architectural refactoring and stabilization.",
        problemStatement:
          "Your developer stopped responding, your demo to an investor or customer failed due to 500 errors, or database connections max out every morning. You cannot afford a months-long rewrite when you have real revenue and users on the line.",
        solutionApproach:
          "Within 24 hours of access, we set up local replication, inspect Sentry/cloud logs, pinpoint root causes (memory leaks, unhandled promise rejections, database deadlocks), ship hotfixes to staging, and restore production stability with automated regression tests.",
        typicalDuration: "3–7 Days",
        deliverables: [
          "Immediate codebase takeover and development environment setup within 24 hours",
          "Root-cause diagnostics and rapid hotfixes for critical crashes and error loops",
          "Memory leak resolution, database pool exhaustion fixes, and timeout remediation",
          "Restoration of broken CI/CD pipelines, build failures, and production deployment scripts",
          "Comprehensive handover report with stability guarantees and regression tests",
        ],
        techStack: ["Next.js", "Node.js", "TypeScript", "PostgreSQL", "Docker", "Sentry"],
        tags: [
          "Codebase Rescue",
          "Fix-It Sprint",
          "Abandoned Project",
          "Emergency Bug Fix",
          "MVP Repair",
          "Freelancer Takeover",
        ],
        audience: "Startups with broken apps, founders abandoned by previous devs, or teams with urgent launch deadlines",
        relatedLink: { label: "Request emergency support →", href: "/contact" },
        architectureDiagram: {
          title: "EMERGENCY TRIAGE & STABILIZATION SEQUENCE",
          diagram: `[Codebase Takeover & Local Replication (Within 24h)]
       │
       ▼
[Log & Trace Diagnostics] (Sentry Traces ──▶ Crash Loop Root Cause)
       │
       ▼
[Critical Hotfix Engineering] (Memory Leaks, Pool Exhaustion, Uncaught Exceptions)
       │
       ▼
[CI/CD Build Pipeline Repair] (Passing Lint, Type Check & Build Scripts)
       │
       ▼
[Staging Verification & Production Cutover] ──▶ 14-Day Post-Launch Bug Warranty`,
          benchmarks: [
            "24-Hour Environment Replication",
            "Zero Data Loss During Fixes",
            "Production Stability Restored",
            "14-Day Post-Launch Bug Warranty",
          ],
        },
        scopeBoundaries: {
          included: [
            "Triage and resolution of up to 5 critical production bugs or crashes",
            "Resolution of database connection pool exhaustion and memory leaks",
            "Build script and CI/CD deployment pipeline repair",
            "14-day post-launch warranty on implemented hotfixes",
          ],
          customScope: [
            "Full rewrite of core application architecture",
            "Designing brand new feature suites from scratch",
            "Ongoing 24/7 on-call production maintenance",
          ],
        },
        serviceFaqs: [
          {
            question: "How fast can you start on an emergency rescue?",
            answer:
              "Once repository access and basic environment details are provided, I typically begin diagnostics and hotfixes within 12 to 24 hours.",
          },
          {
            question: "Can you work with messy or undocumented code?",
            answer:
              "Yes. A major part of my consulting work involves deciphering legacy or poorly documented codebases, stabilizing error points, and leaving behind clean, typed TypeScript and documentation.",
          },
        ],
      },
      {
        id: "migrations-upgrades",
        badge: "06 // MIGRATIONS & UPGRADES",
        title: "Stack Migrations & Framework Upgrades",
        tagline:
          "Safely upgrade to Next.js App Router, NestJS, TypeScript, or modern databases with zero downtime.",
        description:
          "Eliminate legacy drag without breaking production. Whether upgrading Next.js Pages router to App Router, migrating Express monoliths to modular NestJS/TypeScript, or executing zero-downtime database migrations with Drizzle ORM, we ensure strict data integrity and type safety throughout.",
        startingPrice: "From $700 / ₹55,000",
        priceAmount: "700",
        priceCurrency: "USD",
        customScopeTitle: "Enterprise Monolith Decoupling & Migration",
        customScopeSubtitle:
          "For massive legacy applications migrating to microservices, modern Server Components, or new database engines.",
        problemStatement:
          "Old Next.js Pages router apps, un-typed Express monoliths, and sluggish Prisma schemas slow down your developer velocity, inflate bundle sizes, and prevent adopting modern React 19 Server Components.",
        solutionApproach:
          "We execute phased, zero-downtime migrations. We decouple routes incrementally, convert raw queries to type-safe Drizzle ORM schemas, introduce strict TypeScript types, and verify every migration with automated regression tests before production cutover.",
        typicalDuration: "1–2 Weeks",
        deliverables: [
          "Next.js Pages Router to Next.js 15/16 App Router migration with Server Components",
          "Express.js to NestJS / TypeScript refactoring with clean dependency injection",
          "Database schema migrations (Prisma/TypeORM/Raw SQL to Drizzle ORM) with data validation",
          "Zero-downtime deployment strategy and automated rollback mechanisms",
          "Post-migration regression testing, benchmark comparisons, and documentation updates",
        ],
        techStack: ["Next.js 16", "React 19", "NestJS", "TypeScript", "Drizzle ORM", "PostgreSQL"],
        tags: [
          "Stack Migration",
          "Next.js Upgrade",
          "NestJS Migration",
          "Database Migration",
          "TypeScript Refactor",
          "Drizzle ORM",
        ],
        audience: "Growing SaaS companies modernizing legacy applications to recruit faster and ship with confidence",
        relatedLink: { label: "Review technical experience →", href: "/about" },
        architectureDiagram: {
          title: "ZERO-DOWNTIME INCREMENTAL MIGRATION PIPELINE",
          diagram: `[Legacy Monolith (Pages Router / Express / Raw SQL)]
       │
       ▼
[TypeScript Strict Mode & Schema Mapping] ──▶ (Drizzle ORM Type Defs)
       │
       ▼
[Dual-Route Phased Extraction] (Server Components + App Router)
       │
       ▼
[Parallel Shadow Testing] (Verify Output Parity with Legacy Routes)
       │
       ▼
[Zero-Downtime Production Cutover] ──▶ (40%+ Bundle Size Reduction)`,
          benchmarks: [
            "Zero Production Downtime",
            "100% Strict TypeScript Typing",
            "40%+ Bundle Size Reduction",
            "Clean Server / Client Boundaries",
          ],
        },
        scopeBoundaries: {
          included: [
            "Migration of up to 10 core routes or API endpoints to modern App Router",
            "Database schema porting to Drizzle ORM with verified migrations",
            "Bundle analysis and removal of deprecated dependencies",
            "Post-migration verification testing",
          ],
          customScope: [
            "Complete multi-thousand file enterprise repository migrations",
            "Migrating between entirely different database engines (e.g. MongoDB to PostgreSQL)",
          ],
        },
        serviceFaqs: [
          {
            question: "Will our users experience downtime during the migration?",
            answer:
              "No. We use phased rollout strategies and parallel validation on staging, ensuring zero downtime for live users during the cutover.",
          },
          {
            question: "Why migrate from Prisma to Drizzle ORM?",
            answer:
              "Drizzle provides near-zero runtime overhead, compiles to raw SQL queries without heavyweight Rust binaries, and executes queries up to 4x faster on serverless platforms like Neon and Vercel.",
          },
        ],
      },
    ],
  },
  {
    id: "backend-performance-integrations",
    title: "Backend Performance, Integrations & Scaling",
    subtitle:
      "Speed up slow endpoints, eliminate query bottlenecks, and connect WhatsApp, payment gateways, and CRMs.",
    services: [
      {
        id: "performance-scaling",
        badge: "07 // PERFORMANCE & SCALING",
        title: "API Performance & Database Query Tuning",
        tagline:
          "Cut API response times from seconds to sub-200ms with Redis caching, query profiling, and async queues.",
        description:
          "Slow APIs drive away users and tank conversion rates. We profile execution bottlenecks, add multi-layer Redis caching, create composite database indexes, and offload CPU-intensive tasks to BullMQ and Kafka background queues for measurable, benchmarked speedups.",
        startingPrice: "From $500 / ₹40,000",
        priceAmount: "500",
        priceCurrency: "USD",
        customScopeTitle: "High-Throughput Distributed Architecture",
        customScopeSubtitle:
          "For platforms scaling beyond 5,000+ requests/sec, distributed microservices, or multi-region data replication.",
        problemStatement:
          "As user volume grows, endpoints slow down to 3+ seconds, database connections hit pool limits, and background email/data tasks block HTTP responses, leading to frequent 504 Gateway Timeouts.",
        solutionApproach:
          "We profile slow queries with `EXPLAIN (ANALYZE, BUFFERS)`, design optimal composite and partial indexes, configure high-speed Redis caching with smart invalidation tags, and offload heavy tasks into BullMQ async queues.",
        typicalDuration: "3–7 Days",
        deliverables: [
          "API endpoint latency profiling and database slow-query diagnostics",
          "PostgreSQL query rewriting, EXPLAIN ANALYZE profiling, and composite index design",
          "High-performance Redis caching layer with smart cache invalidation on mutations",
          "Asynchronous background queue architecture with BullMQ for emails, exports, and heavy jobs",
          "Before/after latency benchmarks and response time dashboards",
        ],
        techStack: ["PostgreSQL", "Redis", "BullMQ", "Node.js", "TypeScript", "Docker"],
        tags: [
          "API Performance",
          "Database Optimization",
          "Redis Caching",
          "Slow Queries",
          "BullMQ",
          "Scale Backend",
        ],
        audience: "High-traffic apps and SaaS platforms suffering from slow load times and database timeouts",
        relatedLink: { label: "See backend projects →", href: "/projects" },
        architectureDiagram: {
          title: "HIGH-THROUGHPUT CACHING & ASYNC QUEUE ARCHITECTURE",
          diagram: `[High-Volume Traffic (1,000+ req/s)]
       │
       ▼
[Edge Next.js Handler] ──▶ [Redis Cache Check]
       │                            │
       ├─▶ Cache Hit (<20ms) ───────┘
       │
       └─▶ Cache Miss ──▶ [PostgreSQL Read Replica (Composite Indexed)]
                                 │
                                 ▼
                     [BullMQ Background Queue] ──▶ Worker Pool (Async Execution)`,
          benchmarks: [
            "Sub-100ms API Response Times",
            "1,200+ req/s Peak Throughput",
            "Zero Database Deadlocks",
            "Automatic Cache Invalidation",
          ],
        },
        scopeBoundaries: {
          included: [
            "Profiling and optimization of up to 5 critical slow endpoints",
            "PostgreSQL index creation and query optimization",
            "Redis caching layer integration with invalidation logic",
            "BullMQ background queue setup for asynchronous jobs",
            "Before/after benchmark performance report",
          ],
          customScope: [
            "Complete database sharding and cross-region replication",
            "Migrating to Kafka streaming clusters for millions of events per second",
          ],
        },
        serviceFaqs: [
          {
            question: "How much latency improvement can we realistically expect?",
            answer:
              "Typically, unindexed or un-cached endpoints dropping from 2,000ms+ down to sub-150ms (over 90% reduction in response time) through composite indexing and Redis caching.",
          },
        ],
      },
      {
        id: "third-party-integrations",
        badge: "08 // THIRD-PARTY INTEGRATIONS",
        title: "Third-Party Integrations & WhatsApp Automation",
        tagline:
          "Connect WhatsApp Business API, Stripe/Razorpay payments, CRMs, and resilient webhook pipelines.",
        description:
          "Turn manual tasks into automated revenue. Proven by real-world systems like Sahara Tyre (automating WhatsApp customer communication, inventory tracking, and billing), we integrate custom webhook processors, idempotent payment workflows, and automated messaging.",
        startingPrice: "From $400 / ₹32,000",
        priceAmount: "400",
        priceCurrency: "USD",
        customScopeTitle: "Enterprise ERP & Multi-Channel Messaging",
        customScopeSubtitle:
          "For omnichannel customer messaging, legacy ERP integrations, custom webhooks, and complex automated billing.",
        problemStatement:
          "Manual customer notifications, dropped payment webhooks, and out-of-sync CRMs waste dozens of staff hours weekly and lead to lost customer trust and dropped revenue.",
        solutionApproach:
          "We build resilient integration pipelines. Every webhook is cryptographically verified (HMAC), processed idempotently with deduplication keys, queued via BullMQ with exponential backoff retries, and logged with dead-letter queue (DLQ) alerts.",
        typicalDuration: "3–7 Days",
        deliverables: [
          "WhatsApp Business API automation for customer alerts, booking confirmations, and inquiries",
          "Payment gateway integrations (Stripe, Razorpay) with signed webhook verification and idempotency",
          "Two-way CRM and ERP sync (HubSpot, Notion, custom databases) via automated background sync",
          "Fault-tolerant webhook receiver with retry queues, DLQs, and audit logging",
          "Interactive administrative controls and notification dashboard",
        ],
        techStack: ["WhatsApp Cloud API", "Stripe", "Razorpay", "BullMQ", "Node.js", "Webhooks"],
        tags: [
          "WhatsApp Automation",
          "Payment Gateway",
          "Stripe Integration",
          "Webhooks",
          "CRM Sync",
          "Sahara Tyre",
        ],
        audience: "E-commerce stores, local businesses, and SaaS companies automating customer communication and payments",
        relatedLink: { label: "Explore Sahara Tyre case study →", href: "/projects" },
        architectureDiagram: {
          title: "RESILIENT WEBHOOK & WHATSAPP PIPELINE (Sahara Tyre Engine)",
          diagram: `[WhatsApp Cloud API / Stripe Gateway]
       │ (HMAC Signature & Idempotency Key)
       ▼
[Edge Webhook Receiver] ──▶ Cryptographic Signature Verification
       │
       ▼
[BullMQ Redis Queue] ──▶ Concurrency Throttling & Exponential Retries
       │
       ├─▶ Success ──▶ [PostgreSQL Transaction Update] ──▶ WhatsApp Notification
       │
       └─▶ Failure ──▶ [Dead-Letter Queue (DLQ)] ────────▶ Sentry Alert & Auto-Retry`,
          benchmarks: [
            "99.8% Webhook Delivery Rate",
            "Zero Dropped Payment Events",
            "10-Second WhatsApp Response Time",
            "Idempotent Transaction Handling",
          ],
        },
        scopeBoundaries: {
          included: [
            "WhatsApp Business API or Stripe/Razorpay webhook integration",
            "Cryptographic webhook signature verification and idempotency logic",
            "Retry queues with BullMQ and dead-letter alert logging",
            "Admin test suite and sandbox verification",
          ],
          customScope: [
            "Multi-channel messaging across WhatsApp, SMS, Telegram, and Email",
            "Complex bidirectional legacy SAP/Salesforce ERP synchronization",
          ],
        },
        serviceFaqs: [
          {
            question: "How do you handle duplicate webhooks from Stripe or WhatsApp?",
            answer:
              "We record idempotency keys in Redis/PostgreSQL within a transaction. If a duplicate webhook arrives, it is acknowledged instantly without re-executing billing or messaging logic.",
          },
        ],
      },
      {
        id: "cloud-devops",
        badge: "09 // DEVOPS & OBSERVABILITY",
        title: "Cloud Infrastructure, Docker & Observability",
        tagline:
          "Production Docker containerization, automated CI/CD pipelines, and real-time distributed telemetry.",
        description:
          "Deploy with total confidence across staging and production environments. We automate build-and-test workflows with GitHub Actions, containerize applications with Docker, and implement structured logging and metrics for 99.9% operational uptime.",
        startingPrice: "From $400 / ₹35,000",
        priceAmount: "400",
        priceCurrency: "USD",
        customScopeTitle: "Cloud-Native Infrastructure & Kubernetes",
        customScopeSubtitle:
          "For multi-environment cloud infrastructure (AWS/GCP/Vercel), automated infrastructure-as-code, and cluster monitoring.",
        problemStatement:
          "Teams suffering from 'works on my machine' bugs, manual error-prone deployment scripts, and zero visibility into production memory leaks or server crashes until users complain on Twitter.",
        solutionApproach:
          "We construct automated deployment pipelines: multi-stage Dockerfiles with minimal footprint, GitHub Actions CI for linting and type checks, structured JSON logging, and Sentry/Prometheus telemetry for real-time crash alerting.",
        typicalDuration: "3–5 Days",
        deliverables: [
          "Production-ready Docker multi-stage containers and Docker Compose environments",
          "Automated CI/CD pipelines with GitHub Actions (type checks, linting, tests, deployments)",
          "Structured JSON logging, error tracking (Sentry), and system health check routes",
          "Distributed tracing and telemetry integration with OpenTelemetry, Prometheus, and Grafana",
          "Environment configuration management and zero-downtime production deployment",
        ],
        techStack: ["Docker", "GitHub Actions", "OpenTelemetry", "Prometheus", "Vercel", "Linux"],
        tags: [
          "DevOps",
          "CI/CD",
          "Docker",
          "GitHub Actions",
          "Observability",
          "Logging & Tracing",
        ],
        audience: "Engineering teams looking to automate releases and ensure 99.9% uptime",
        relatedLink: { label: "Review technical resume →", href: "/resume" },
        architectureDiagram: {
          title: "AUTOMATED CI/CD & TELEMETRY ARCHITECTURE",
          diagram: `[Developer Git Push / PR]
       │
       ▼
[GitHub Actions CI] ──▶ (Type Check ──▶ ESLint ──▶ Unit Tests)
       │
       ▼
[Multi-Stage Docker Build] ──▶ (Minimal Distroless Production Image)
       │
       ▼
[Zero-Downtime Deployment (Vercel / Cloud)]
       │
       ▼
[Distributed Observability] ──▶ (Sentry Error Traces + Health Check Ping)`,
          benchmarks: [
            "99.9% Operational Uptime",
            "Automated Rollback on Error",
            "< 3-Minute CI Pipeline Duration",
            "Zero Secret Exposure",
          ],
        },
        scopeBoundaries: {
          included: [
            "Production multi-stage Dockerfile and Docker Compose file",
            "GitHub Actions CI pipeline for automated testing and deployment",
            "Sentry error tracking setup with environment tagging",
            "Environment variable security audit",
          ],
          customScope: [
            "Full Kubernetes (EKS/GKE) helm chart configurations",
            "Terraform infrastructure-as-code provisioning across multi-region AWS",
          ],
        },
        serviceFaqs: [
          {
            question: "Can you configure CI/CD for existing Vercel or cloud deployments?",
            answer:
              "Yes. We configure GitHub Actions to run type checks, automated lints, and test suites on every pull request before authorizing production deployment.",
          },
        ],
      },
    ],
  },
  {
    id: "web-growth",
    title: "Web Development & Search Growth",
    subtitle:
      "High-converting business websites, custom web apps, and technical SEO that turn visitors into paying customers.",
    services: [
      {
        id: "custom-websites",
        badge: "10 // WEBSITE DEVELOPMENT",
        title: "Custom Website Development & Landing Pages",
        tagline:
          "High-converting, mobile-responsive business websites and landing pages built with Next.js and Tailwind CSS.",
        description:
          "Ditch bloated WordPress themes and sluggish site builders. We engineer custom, lightning-fast business websites and SaaS marketing landing pages using Next.js 16, React 19, and Tailwind CSS v4 — delivering instant page loads, top Google Core Web Vitals, and clean lead capture.",
        startingPrice: "From $300 / ₹25,000",
        priceAmount: "300",
        priceCurrency: "USD",
        customScopeTitle: "Full Corporate Platform & CMS",
        customScopeSubtitle:
          "For multi-page brand websites with headless CMS (Sanity/Strapi), multi-lingual support, and blog syndication.",
        problemStatement:
          "Generic templates and WordPress plugins result in bloated JavaScript bundles, broken mobile layouts, poor conversion rates, and sub-50 Google PageSpeed scores that push your site to page 3 of Google.",
        solutionApproach:
          "We engineer custom Next.js 16 websites using modern React 19 Server Components and Tailwind CSS v4 design tokens. Clean typography, instant sub-second page transitions, zero layout shift (CLS < 0.05), and automated lead capture with Nodemailer.",
        typicalDuration: "1–2 Weeks",
        deliverables: [
          "Custom business websites, corporate pages, and personal portfolio platforms",
          "High-converting SaaS and marketing landing pages engineered for lead conversion",
          "100% mobile-first responsive design tested across iOS, Android, tablets, and desktop displays",
          "Headless CMS integration or custom admin portal for non-technical content management",
          "Interactive contact forms, instant email notifications (Nodemailer), and Google Analytics 4 integration",
        ],
        techStack: ["Next.js 16", "React 19", "Tailwind CSS v4", "TypeScript", "Vercel"],
        tags: [
          "Custom Website Development",
          "Next.js Website",
          "Landing Page Developer",
          "Business Website",
          "Mobile Responsive",
          "WordPress Alternative",
        ],
        audience: "Business owners, startups, consultants, and founders wanting a premium web presence",
        relatedLink: { label: "Explore website projects →", href: "/projects" },
        architectureDiagram: {
          title: "HIGH-PERFORMANCE NEXT.JS WEB ARCHITECTURE",
          diagram: `[User Request (Mobile / Desktop Browser)]
       │
       ▼
[Next.js 16 Edge CDN] ──▶ (Instant Static Page Delivery)
       │
       ▼
[React 19 Server Components] ──▶ Zero Client-Side Hydration Lag
       │
       ▼
[Cloudinary CDN Image Optimizer] ──▶ (f_auto, q_auto WebP/AVIF)
       │
       ▼
[Interactive Contact Form] ──▶ Nodemailer Alert + Google Analytics 4 Event`,
          benchmarks: [
            "95+ Google PageSpeed Score",
            "Core Web Vitals All Green",
            "Sub-Second Initial Page Load",
            "100% Mobile & Tablet Responsive",
          ],
        },
        scopeBoundaries: {
          included: [
            "Up to 5 fully responsive custom pages (Home, About, Services, Contact, etc.)",
            "Tailwind CSS v4 design token implementation with dark/light theme",
            "Interactive contact form with instant email alerts",
            "Basic SEO metadata and Google Analytics setup",
            "14-day warranty",
          ],
          customScope: [
            "Multi-language localization (i18n)",
            "Complex interactive 3D WebGL animations",
            "Headless CMS integration for dynamic multi-author editorial blogs",
          ],
        },
        serviceFaqs: [
          {
            question: "Why choose Next.js over WordPress or Webflow?",
            answer:
              "Next.js gives you 100% code ownership, zero monthly hosting platform fees, top-tier Google PageSpeed scores, zero security vulnerabilities from unmaintained plugins, and unlimited custom interactive capabilities.",
          },
        ],
      },
      {
        id: "full-stack-web",
        badge: "11 // CUSTOM WEB APPLICATIONS",
        title: "Full-Stack Web Application Development",
        tagline:
          "Custom web apps, customer portals, local business platforms, and SaaS dashboards with role-based auth and scalable databases.",
        description:
          "When pre-packaged software fails your business logic, we develop custom full-stack web applications. From customer portals, local business platforms, and interactive booking tools to multi-tenant SaaS dashboards, we build secure, scalable solutions with Next.js and PostgreSQL.",
        startingPrice: "From $1,200 / ₹1,00,000",
        priceAmount: "1200",
        priceCurrency: "USD",
        customScopeTitle: "Full SaaS MVP & Production Platform",
        customScopeSubtitle:
          "For end-to-end multi-tenant SaaS MVPs, custom payment billing subscriptions, and complex role permissions.",
        problemStatement:
          "Off-the-shelf SaaS solutions force your business into rigid templates that don't match your workflow, while hiring a large agency costs $30k+ and takes 6 months with endless account manager meetings.",
        solutionApproach:
          "Single-engineer full-stack velocity. We architect your database schema in PostgreSQL with Drizzle ORM, configure secure authentication with NextAuth v5, implement role-based permissions (RBAC), build high-density interactive dashboards, and ship in 2 to 4 weeks.",
        typicalDuration: "2–4 Weeks",
        deliverables: [
          "Custom SaaS web applications, customer portals, and internal operations dashboards",
          "Local business platforms, booking engines, and interactive customer-facing tools",
          "Secure authentication, session management, OAuth, and granular role-based permissions (RBAC)",
          "Payment gateway integrations (Stripe, Razorpay) and subscription billing workflows",
          "Direct database integration with PostgreSQL, Drizzle ORM, and connection pooling",
          "Automated deployment, end-to-end testing, and production monitoring",
        ],
        techStack: ["Next.js 16", "React 19", "Node.js", "PostgreSQL", "Drizzle ORM", "Tailwind CSS"],
        tags: [
          "Full-Stack Web Application",
          "Custom Web App",
          "Local Business Website",
          "SaaS Dashboard",
          "Customer Portal",
          "PostgreSQL",
          "NextAuth",
        ],
        audience: "Companies and local businesses needing bespoke software, customer portals, or subscription SaaS platforms",
        relatedLink: { label: "Explore web projects →", href: "/projects" },
        architectureDiagram: {
          title: "FULL-STACK SAAS & PORTAL ARCHITECTURE",
          diagram: `[Client Application / Dashboard UI]
       │
       ▼
[Next.js Server Actions & API Routes]
       │
       ▼
[NextAuth v5 Authentication Guard] ──▶ Role-Based Permissions (RBAC)
       │
       ▼
[Drizzle ORM Type-Safe Query Layer]
       │
       ▼
[Neon Serverless PostgreSQL Database] ──▶ Connection Pooling & Transactions
       │
       ▼
[Stripe / Razorpay Payment Webhooks] ──▶ Automated Subscription Billing`,
          benchmarks: [
            "100% Type Safety Across Stack",
            "Single-Engineer High Velocity",
            "Complete IP & Codebase Ownership",
            "Scalable Relational Schema",
          ],
        },
        scopeBoundaries: {
          included: [
            "Complete full-stack app with authentication, user profiles, and dashboard",
            "PostgreSQL database setup with Drizzle ORM migrations",
            "Payment gateway integration (Stripe/Razorpay) for one-off or recurring charges",
            "Role-based access controls (Admin vs User)",
            "14-day post-launch warranty",
          ],
          customScope: [
            "Complex enterprise multi-tenancy with separate schema databases",
            "Native mobile apps (React Native / iOS / Android)",
          ],
        },
        serviceFaqs: [
          {
            question: "Who owns the code upon completion?",
            answer:
              "You retain 100% ownership of all code, database schemas, and intellectual property. The repository is committed directly to your private GitHub or GitLab account.",
          },
        ],
      },
      {
        id: "website-speed-optimization",
        badge: "12 // SPEED & PERFORMANCE",
        title: "Website Redesign & Speed Optimization",
        tagline:
          "Modernize sluggish websites to score 90+ on Google PageSpeed Insights and ace Core Web Vitals (LCP, CLS, INP).",
        description:
          "Slow websites kill conversion rates. We rebuild sluggish websites and optimize existing codebases to score 90+ on Google PageSpeed Insights, improve Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms), and provide buttery-smooth user experiences that keep customers engaged.",
        startingPrice: "From $250 / ₹20,000",
        priceAmount: "250",
        priceCurrency: "USD",
        customScopeTitle: "Full Platform Performance Overhaul",
        customScopeSubtitle:
          "For large e-commerce catalogs, media-heavy sites, or enterprise web platforms requiring deep bundle refactoring.",
        problemStatement:
          "Every second of page load delay drops conversion rates by up to 20%. Sluggish un-optimized images, render-blocking scripts, and excessive CSS bundle sizes tank your Google Core Web Vitals and hurt search rankings.",
        solutionApproach:
          "We analyze your bottlenecks using Chrome DevTools and Lighthouse. We implement automated image conversion to WebP/AVIF via Cloudinary CDN, eliminate render-blocking scripts, tree-shake CSS and JavaScript bundles, and configure aggressive edge caching.",
        typicalDuration: "3–5 Days",
        deliverables: [
          "Modern website redesign with clean typography, dark/light theme switching, and WCAG accessibility",
          "Core Web Vitals remediation (LCP, CLS, INP) for measurable Google ranking improvements",
          "Automated WebP/AVIF image compression, lazy loading, and Cloudinary CDN delivery",
          "Code splitting, bundle optimization, and removal of render-blocking third-party scripts",
          "HTTP caching, prefetching strategies, and service worker PWA capabilities",
        ],
        techStack: ["Google PageSpeed", "Core Web Vitals", "Lighthouse", "Cloudinary CDN", "Tailwind CSS"],
        tags: [
          "Website Speed Optimization",
          "Core Web Vitals",
          "PageSpeed 90+",
          "LCP CLS INP",
          "Website Redesign",
          "Performance Tuning",
        ],
        audience: "Businesses with slow-loading websites losing customers and search rank due to poor performance",
        relatedLink: { label: "Review performance benchmarks →", href: "/projects" },
        architectureDiagram: {
          title: "CORE WEB VITALS OPTIMIZATION PIPELINE",
          diagram: `[Baseline Lighthouse Audit (Identifying LCP, CLS, INP Bottlenecks)]
       │
       ▼
[Automated WebP/AVIF Image Compression via Cloudinary CDN]
       │
       ▼
[Bundle Tree-Shaking, Script Deferral & Critical CSS Inlining]
       │
       ▼
[Edge Caching & Prefetching Rules] ──▶ [Post-Optimization Verification (Score 90+)]`,
          benchmarks: [
            "Largest Contentful Paint (LCP) < 2.5s",
            "Cumulative Layout Shift (CLS) < 0.1",
            "Interaction to Next Paint (INP) < 200ms",
            "90+ Google PageSpeed Guaranteed",
          ],
        },
        scopeBoundaries: {
          included: [
            "Speed optimization across desktop and mobile versions",
            "Image optimization and CDN configuration",
            "Code splitting and render-blocking script remediation",
            "Before-and-after Lighthouse / PageSpeed verification report",
          ],
          customScope: [
            "Complete visual redesign of 10+ pages from scratch",
            "Rewriting legacy server-rendered backend architectures",
          ],
        },
        serviceFaqs: [
          {
            question: "Do you guarantee a 90+ PageSpeed score?",
            answer:
              "Yes. For custom Next.js and static web applications, we guarantee green Core Web Vitals and a 90+ Google PageSpeed score across both mobile and desktop.",
          },
        ],
      },
      {
        id: "seo-services",
        badge: "13 // SEO SERVICES",
        title: "SEO Services & Search Engine Optimization",
        tagline:
          "Technical SEO audits, Schema.org rich snippets, and Generative Engine Optimization (GEO/AEO) for Google and AI citations.",
        description:
          "Comprehensive technical SEO to capture organic search traffic and get cited by AI answer engines (ChatGPT, Perplexity, Google AI Overviews). We fix crawl errors, implement Schema.org JSON-LD structured data, optimize semantic heading hierarchy, and target high-converting commercial intent keywords.",
        startingPrice: "From $200 / ₹15,000",
        priceAmount: "200",
        priceCurrency: "USD",
        customScopeTitle: "Comprehensive Organic Search & AEO Retainer",
        customScopeSubtitle:
          "For aggressive organic search expansion, programmatic SEO, dynamic blog syndication, and AI answer engine rankings.",
        problemStatement:
          "Most websites fail to rank because of basic technical flaws: broken canonical tags, missing Schema.org structured data, missing sitemaps, and content written without understanding modern search intent or AI engine citation criteria.",
        solutionApproach:
          "We engineer technical discoverability: (1) Schema.org JSON-LD markup (`Organization`, `Service`, `FAQPage`, `BreadcrumbList`), (2) Semantic heading hierarchy, (3) Generative Engine Optimization (GEO) and `llms.txt` knowledge mapping, and (4) Dynamic XML sitemaps.",
        typicalDuration: "3–7 Days",
        deliverables: [
          "Full technical SEO audit: crawl analysis, canonical hygiene, indexation diagnostics, and robots.txt review",
          "On-page keyword mapping: meta titles, descriptions, semantic H1-H3 hierarchy, and internal linking",
          "Schema.org JSON-LD structured data implementation (Organization, Person, ProfessionalService, FAQPage, Service)",
          "Generative Engine Optimization (GEO/AEO) and llms.txt configuration for AI crawler citation",
          "Dynamic XML sitemap generation, Google Search Console verification, and rich snippet testing",
        ],
        techStack: [
          "Schema.org JSON-LD",
          "Google Search Console",
          "Next.js Metadata API",
          "AEO/GEO",
          "Web Vitals",
        ],
        tags: [
          "SEO Services",
          "Technical SEO",
          "Schema.org JSON-LD",
          "AEO GEO Optimization",
          "Search Engine Optimization",
          "Rich Snippets",
        ],
        audience: "Founders and businesses struggling to rank on Google or get noticed by AI answer engines",
        relatedLink: { label: "Read SEO guides & reports →", href: "/blogs" },
        architectureDiagram: {
          title: "TECHNICAL SEO & AI ENGINE DISCOVERABILITY ARCHITECTURE",
          diagram: `[Technical Crawl & Indexation Diagnostics]
       │
       ▼
[Semantic HTML & Heading Hierarchy] ──▶ (Single H1, Logical H2-H3 Nesting)
       │
       ▼
[Schema.org JSON-LD Injection] ──▶ (Service, Organization, FAQPage, BreadcrumbList)
       │
       ▼
[AEO / GEO Optimization] ──▶ llms.txt Entity Graph for AI Answer Engines
       │
       ▼
[Dynamic XML Sitemap & Search Console Ping] ──▶ Google Rich Snippets Eligibility`,
          benchmarks: [
            "100% Crawlable Architecture",
            "Zero Canonical or Redirect Loops",
            "Schema.org Rich Snippet Validated",
            "AEO / GEO Answer Engine Optimized",
          ],
        },
        scopeBoundaries: {
          included: [
            "Complete technical audit and fix of crawl errors",
            "Schema.org JSON-LD structured data generation for up to 10 page types",
            "Dynamic XML sitemap and robots.txt setup",
            "llms.txt file creation for AI crawler discovery",
            "Google Search Console submission and rich snippet verification",
          ],
          customScope: [
            "Programmatic SEO generation of 100+ landing pages",
            "Ongoing monthly content production and backlink outreach",
          ],
        },
        serviceFaqs: [
          {
            question: "What is AEO / GEO (Generative Engine Optimization)?",
            answer:
              "AEO/GEO structures your content with direct, factual answers and machine-readable data (including Schema.org and llms.txt) so AI search engines like ChatGPT, Perplexity, and Google AI Overviews cite your business as the authoritative source.",
          },
        ],
      },
    ],
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery & Code Audit",
    description:
      "Understand your product goals, inspect your existing codebase or requirements, and define a clear milestone roadmap with fixed deliverables.",
  },
  {
    step: "02",
    title: "Rapid Prototype & Validation",
    description:
      "Build and validate a working prototype or targeted fix to test assumptions, AI response quality, and API contracts early with your team.",
  },
  {
    step: "03",
    title: "Implementation & Hardening",
    description:
      "Refine business logic, implement caching and error handling, optimize database queries, and test edge cases thoroughly with regression tests.",
  },
  {
    step: "04",
    title: "Production Handover & Support",
    description:
      "Deploy to production, integrate with your existing stack, and provide complete documentation, tests, and code walkthroughs.",
  },
];

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    title: "Fixed-Price Audit & Feature Sprints",
    badge: "Low Risk & Fast Turnaround",
    startingPrice: "From $450 / sprint",
    priceAmount: "450",
    subtitle:
      "Ideal for 3–5 day codebase audits, emergency bug rescues, or targeted feature rollouts (such as adding AI chat or payment integrations) in 1 to 2 weeks.",
    highlights: [
      "Fixed-price scope with zero surprise fees or billing creep",
      "Fast 3–5 day delivery for audits; 1–2 weeks for feature sprints",
      "Committed directly to your private GitHub or GitLab repository",
      "Comprehensive handover, automated tests, and 14-day post-launch warranty",
    ],
  },
  {
    title: "Fractional Backend & AI Retainer",
    badge: "Recurring Velocity",
    startingPrice: "From $1,500 / mo",
    priceAmount: "1500",
    subtitle:
      "Dedicated part-time embedding (10–20 hours/week) as your senior backend & AI engineer to maintain, extend, and scale your product.",
    highlights: [
      "10–20 hours per week dedicated to your backlog and sprint priorities",
      "Direct Slack/Discord integration, PR reviews, and async standups",
      "Continuous backend optimization, API scaling, and AI feature releases",
      "Predictable monthly investment without the overhead of full-time hiring",
    ],
  },
  {
    title: "1:1 Architecture & Technical Advisory",
    badge: "Pay-As-You-Go",
    startingPrice: "$150 / 90-min session",
    priceAmount: "150",
    subtitle:
      "A focused, high-impact consulting session to evaluate your architecture, validate AI feasibility, or plan a database migration before building.",
    highlights: [
      "90-minute live screen-share session with Samir Shaikh",
      "Review system architecture, database schema, or AI implementation plan",
      "Identify risks, performance bottlenecks, and the best tech stack choices",
      "Delivered with a written summary document and actionable next steps",
    ],
  },
];

export const SERVICES_FAQS: ServiceFAQ[] = [
  {
    id: "faq-existing-codebase-takeover",
    question: "Can you take over, fix, or maintain an existing codebase built by another developer?",
    answer:
      "Yes. A substantial portion of my work involves stepping into existing codebases — whether taking over an application after a previous developer left, fixing an MVP that crashes under load, or maintaining a live SaaS. I begin with a structured 3–5 day Codebase Audit to review code quality, database queries, and security before implementing fixes.",
    tags: ["Existing Codebase", "Codebase Takeover", "Maintain App", "Code Audit"],
  },
  {
    id: "faq-add-ai-to-existing-product",
    question: "Can you add an AI chatbot or smart search to our existing SaaS without rebuilding it?",
    answer:
      "Absolutely. You don't need to rebuild your application from scratch. We integrate custom RAG pipelines, streaming AI chatbots, and semantic document search directly into your existing PostgreSQL database (using pgvector), backend API, and frontend components in 1 to 2 weeks.",
    tags: ["Add AI", "SaaS AI Integration", "RAG Pipeline", "AI Chatbot"],
  },
  {
    id: "faq-codebase-audit-deliverables",
    question: "What is included in the 3–5 Day Codebase Audit & Roadmap?",
    answer:
      "The Codebase Audit is a fixed-price ($450) deep-dive into your application. I inspect your architecture, analyze slow database queries, check authentication and security boundaries, identify code quality risks, and deliver an executive report plus a prioritized GitHub backlog with estimated hours to resolve each issue.",
    tags: ["Codebase Audit", "Technical Roadmap", "Security Scan", "Query Profiling"],
  },
  {
    id: "faq-fractional-retainer-model",
    question: "How does the fractional / part-time retainer model work?",
    answer:
      "Under a fractional retainer (10–20 hours/week), I embed directly into your engineering team as your senior backend and AI developer. We collaborate via Slack or Discord, attend sprint ceremonies if needed, and ship code via GitHub pull requests with automated tests and documentation. It gives you senior engineering velocity at a fraction of full-time hiring cost.",
    tags: ["Fractional Developer", "Retainer", "Embedded Engineer", "Part-Time Backend"],
  },
  {
    id: "faq-whatsapp-and-integrations",
    question: "Can you integrate WhatsApp automation or payment gateways into our business workflow?",
    answer:
      "Yes. Drawing on production projects like Sahara Tyre (where we automated WhatsApp customer notifications, inventory management, and billing), we build custom WhatsApp Business API workflows, Stripe/Razorpay subscription billing, and robust webhook processors with automatic retries and dead-letter queues.",
    tags: ["WhatsApp Automation", "Payment Gateway", "Stripe", "Razorpay", "Sahara Tyre"],
  },
  {
    id: "faq-stop-chatbot-hallucinating",
    question: "How do you stop an AI chatbot from hallucinating?",
    answer:
      "We stop hallucinations using a 4-layer production RAG architecture: (1) Semantic document chunking and vector indexing in PostgreSQL pgvector, (2) Strict cosine distance thresholds (<= 0.5) to discard irrelevant context, (3) Grounded prompt templates instructing the LLM to decline ungrounded questions, and (4) Structured fallback handlers providing transparent handoffs when information is absent.",
    tags: ["Stop Hallucinations", "RAG Pipeline", "pgvector", "Cosine Distance", "Grounded AI"],
  },
  {
    id: "faq-custom-knowledge-base-ai",
    question: "Can you build an AI chatbot for my website or SaaS using our custom knowledge base?",
    answer:
      "Yes. We build production-grade AI chatbots connected directly to your proprietary company knowledge base (PDFs, Markdown documentation, FAQs, Notion databases, or SQL records). The chatbot queries PostgreSQL pgvector with 3072d Gemini embeddings in sub-300ms, delivers streaming answers without hallucinating, and integrates cleanly as an embeddable widget or backend REST API in 1 to 3 weeks.",
    tags: ["Custom Knowledge Base", "AI Chatbot", "Website Widget", "SaaS Integration"],
  },
  {
    id: "faq-production-grade-ai-definition",
    question: "What makes an AI chatbot or RAG system 'production-grade'?",
    answer:
      "A production-grade AI system differs from a basic wrapper through 5 critical pillars: (1) Deterministic grounding with strict relevance thresholds, (2) Sub-300ms vector search latency and low-latency streaming responses, (3) Rate limiting per IP and fingerprint to prevent API abuse, (4) In-memory token budget controls and multi-provider failover, and (5) Comprehensive test coverage with automated CI/CD deployment pipelines.",
    tags: ["Production-Grade AI", "System Architecture", "Latency Profiling", "Security"],
  },
  {
    id: "faq-how-i-work-with-startups",
    question: "How do you work with startups as a freelance engineer or contractor?",
    answer:
      "I work on milestone-based fixed sprints (1 to 4 weeks) with zero scope bloat and direct founder-level communication. Every engagement includes clear milestone deliverables, daily/weekly async updates via Slack/Discord, clean PRs with automated CI checks, and immediate code handover committed directly to your private GitHub or GitLab repository.",
    tags: ["Freelance Workflow", "Startup Sprints", "Milestone Billing", "Git Handover"],
  },
  {
    id: "faq-availability-for-projects",
    question: "What is your availability for freelance or contract engineering projects?",
    answer:
      "I am actively available for new freelance sprints, monthly contracts, and technical advisory roles. Following an initial 30-minute discovery call, I provide a detailed scope and fixed-price proposal within 48 hours and can typically onboard and begin shipping production code within 3 to 7 business days.",
    tags: ["Availability", "Onboarding", "Freelance Sprints", "Proposal Timeline"],
  },
  {
    id: "faq-forward-deployed-engineer",
    question: "What is a Forward Deployed Engineer (FDE) and when should my team hire one?",
    answer:
      "A Forward Deployed Engineer (FDE) bridges deep software engineering and direct client immersion. Unlike isolated developers, an FDE embeds directly with stakeholders to conduct technical discovery on ambiguous requirements, rapidly build and validate prototypes, and harden the solution for enterprise production. Hire an FDE when deploying high-stakes AI features or integrating custom software into client workflows.",
    tags: ["Forward Deployed Engineer", "FDE", "Technical Discovery", "Rapid Prototyping"],
  },
  {
    id: "faq-freelance-vs-off-the-shelf-chatbots",
    question: "Why hire a freelance AI developer instead of using an off-the-shelf chatbot tool?",
    answer:
      "Off-the-shelf chatbot tools lock your proprietary data onto shared third-party servers, charge recurring monthly per-seat and per-message markups, offer limited customization, and struggle with custom business workflows. Hiring a freelance AI developer gives you 100% code and data ownership, zero recurring software platform fees, tailored retrieval algorithms optimized for your specific schema, and seamless integration into your existing authentication and backend systems.",
    tags: ["Freelance AI Developer", "Data Ownership", "Cost Savings", "Custom Architecture"],
  },
  {
    id: "faq-code-ip-ownership",
    question: "Who owns the code and intellectual property?",
    answer:
      "You retain 100% ownership of all code, architecture specifications, configurations, and documentation created during the engagement. Everything is committed directly to your private repositories with full commercial rights.",
    tags: ["IP Ownership", "Code Rights", "Private Repository"],
  },
  {
    id: "faq-technical-seo-deliverables",
    question: "What do your SEO services include and how do they help my website rank?",
    answer:
      "Our SEO services focus on technical accuracy and measurable search visibility: (1) Technical SEO audits resolving crawl errors, canonical loops, and indexation issues, (2) Keyword mapping for titles, meta descriptions, and semantic headings, (3) Schema.org structured data (Organization, ProfessionalService, Service, FAQPage) for Google rich snippets, (4) Google Core Web Vitals optimization for speed, and (5) Generative Engine Optimization (GEO/AEO) so AI answer engines like ChatGPT and Perplexity cite your content.",
    tags: ["Technical SEO", "Schema.org JSON-LD", "AEO/GEO", "Core Web Vitals", "Google Ranking"],
  },
  {
    id: "faq-full-stack-capabilities",
    question: "Can you build both the backend and frontend for our web application or local business platform?",
    answer:
      "Yes. We build end-to-end full-stack applications and local business platforms using Next.js 16, React 19, and Tailwind CSS on the frontend, paired with Node.js, PostgreSQL, Drizzle ORM, and Redis on the backend. This provides single-engineer velocity, zero communication bottlenecks between frontend and backend, and cohesive type safety across the entire stack.",
    tags: ["Full Stack Development", "Next.js", "Node.js", "PostgreSQL", "Local Business Website", "Type Safety"],
  },
  {
    id: "faq-how-to-get-started",
    question: "How do we get started?",
    answer:
      "The fastest path: email shaikh.samir.work@gmail.com or use the Contact page with a brief summary of what you need — your product vision, tech stack, and target timeline. I reply within 24 hours to schedule a short discovery call, after which I provide a clear scope and timeline proposal, typically within 48 hours.",
    tags: ["Getting Started", "Discovery Call", "Fixed Proposal", "Contact"],
  },
];

/**
 * Returns all services across all categories as a flat array.
 */
export function getAllServices(): ServiceOffering[] {
  return SERVICE_CATEGORIES.flatMap((c) => c.services);
}

/**
 * Finds a service by its URL slug/id.
 */
export function getServiceBySlug(slug: string): ServiceOffering | undefined {
  return getAllServices().find((s) => s.id === slug);
}

/**
 * Returns category info for a given service.
 */
export function getCategoryByServiceId(serviceId: string): ServiceCategory | undefined {
  return SERVICE_CATEGORIES.find((c) => c.services.some((s) => s.id === serviceId));
}

/**
 * Returns up to `limit` adjacent or related services for cross-linking.
 */
export function getRelatedServices(serviceId: string, limit = 3): ServiceOffering[] {
  const current = getServiceBySlug(serviceId);
  if (!current) return [];
  const all = getAllServices().filter((s) => s.id !== serviceId);
  const currentCategory = getCategoryByServiceId(serviceId);
  const sameCategoryServices = currentCategory
    ? currentCategory.services.filter((s) => s.id !== serviceId)
    : [];

  const candidates = [...sameCategoryServices, ...all];
  // Deduplicate by ID
  const seen = new Set<string>();
  const result: ServiceOffering[] = [];
  for (const item of candidates) {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      result.push(item);
      if (result.length >= limit) break;
    }
  }
  return result;
}
