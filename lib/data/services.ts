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
        startingPrice: "Fixed $450 / ₹35,000 (3-5 days)",
        priceAmount: "450",
        priceCurrency: "USD",
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
        relatedLink: { label: "Discuss an audit →", href: "/contact" },
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
