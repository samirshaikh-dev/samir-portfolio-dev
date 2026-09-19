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
    id: "ai-intelligent-systems",
    title: "AI & Intelligent Systems",
    subtitle:
      "Turn foundation models into reliable, production-grade AI chatbots, custom knowledge bases, and automated agent workflows.",
    services: [
      {
        id: "rag-systems",
        badge: "01 // CUSTOM KNOWLEDGE BASES",
        title: "Custom Knowledge Bases & RAG Systems",
        tagline:
          "Production-grade AI chatbots and custom RAG knowledge bases for websites and SaaS grounded in verified documentation.",
        description:
          "Eliminate LLM hallucinations with enterprise-grade Retrieval-Augmented Generation (RAG). We build custom knowledge bases using PostgreSQL pgvector (3072d embeddings) and hybrid semantic search — ensuring your AI chatbot answers accurately from verified PDFs, markdown documentation, and databases with sub-300ms latency and strict cosine distance filtering.",
        startingPrice: "From $900 / ₹75,000",
        priceAmount: "900",
        priceCurrency: "USD",
        deliverables: [
          "Custom knowledge base indexing and semantic document chunking (PDFs, Markdown, Notion, databases)",
          "Vector database pipeline with PostgreSQL pgvector and 3072-dimensional Gemini embeddings",
          "Hallucination mitigation with strict cosine distance filtering (<=0.5) and prompt boundaries",
          "Turnkey AI chatbot widget for websites, customer portals, and internal SaaS dashboards",
          "Retrieval accuracy benchmarking, latency profiling (<300ms), and automated fallback handoffs",
        ],
        techStack: ["PostgreSQL", "pgvector", "Gemini Embeddings", "Drizzle ORM", "TypeScript", "Vercel AI SDK"],
        tags: [
          "RAG Systems",
          "Custom Knowledge Base",
          "AI Chatbot",
          "pgvector",
          "Stop Hallucinations",
          "Semantic Search",
          "Vector Embeddings",
        ],
        audience: "SaaS startups, enterprise support teams, and digital businesses needing accurate AI chat",
        relatedLink: { label: "View RAG Chatbot project →", href: "/projects" },
      },
      {
        id: "ai-agents",
        badge: "02 // AGENT WORKFLOWS",
        title: "AI Agents & Workflow Automation",
        tagline:
          "Deterministic AI agents with tool calling, structured JSON outputs, and guardrails to automate business workflows.",
        description:
          "Scale past simple chatbots into reliable, production-grade AI agents that execute actions. We develop tool-calling agentic workflows that securely query internal APIs, enforce strict Zod schema validation, manage state across multi-turn sessions, and handle errors deterministically without human babysitting.",
        startingPrice: "From $800 / ₹65,000",
        priceAmount: "800",
        priceCurrency: "USD",
        deliverables: [
          "Tool-calling architectures and custom API integrations for multi-step automated task execution",
          "Strict JSON schema validation using Zod for predictable, machine-parseable outputs",
          "Input guardrails, defensive prompt boundaries, and graceful fallback handling",
          "Multi-turn conversational memory and persistent state tracking across user sessions",
          "Automated unit tests and CI verification for deterministic agentic reliability",
        ],
        techStack: ["Vercel AI SDK", "Groq", "Google Gemini", "Node.js", "Zod", "TypeScript"],
        tags: [
          "AI Agents",
          "Workflow Automation",
          "Tool Calling",
          "Structured Outputs",
          "Agentic AI",
          "Zod Validation",
        ],
        audience: "Founders, CTOs, and product operations teams looking to automate repetitive engineering workflows",
        relatedLink: { label: "Read technical articles →", href: "/blogs" },
      },
      {
        id: "ai-product-dev",
        badge: "03 // PRODUCT DEVELOPMENT",
        title: "AI Product Development & Integration",
        tagline:
          "End-to-end AI feature engineering from technical discovery and rapid MVP to database and UI deployment.",
        description:
          "Turn ambiguous AI concepts into production-ready software features. As an experienced AI Backend Engineer and Forward Deployed Engineer (FDE), I handle architectural scope definition, rapid MVP sprint delivery (1-4 weeks), backend database modeling, authentication integration, and clean UI handoff.",
        startingPrice: "From $1,200 / ₹1,00,000",
        priceAmount: "1200",
        priceCurrency: "USD",
        deliverables: [
          "Technical discovery, architecture roadmap, and feasibility analysis for AI features",
          "Rapid MVP sprint development (1 to 4 weeks) with direct founder and CTO collaboration",
          "Typed REST and GraphQL API routes connecting AI model outputs to frontend components",
          "Seamless integration with PostgreSQL databases, user authentication (NextAuth), and RBAC",
          "Production deployment, automated CI/CD pipeline setup, and comprehensive code handover",
        ],
        techStack: ["Next.js 16", "React 19", "Node.js", "PostgreSQL", "REST/GraphQL", "Tailwind CSS"],
        tags: [
          "AI Product Development",
          "MVP Sprint",
          "Forward Deployed Engineer",
          "Rapid Prototyping",
          "Full Stack AI",
        ],
        audience: "Early-stage startups and product teams launching new AI capabilities under tight deadlines",
        relatedLink: { label: "Explore recent projects →", href: "/projects" },
      },
      {
        id: "llm-integration",
        badge: "04 // LLM INTEGRATION",
        title: "LLM Integration & AI User Experiences",
        tagline:
          "Low-latency streaming responses, token usage controls, and multi-provider failover strategies.",
        description:
          "Embed modern LLMs (Groq, OpenAI, Google Gemini, Anthropic) into web applications with silky-smooth text streaming, strict token budget controls, and resilient fallback providers to maximize uptime and reduce operating costs.",
        startingPrice: "From $500 / ₹40,000",
        priceAmount: "500",
        priceCurrency: "USD",
        deliverables: [
          "Zero-latency streaming UI with Vercel AI SDK, React 19 Server Components, and non-blocking boundaries",
          "Context window optimization, dynamic prompt assembly, and token cost minimization",
          "Rate limiting (Upstash Redis / in-memory), visitor fingerprinting, and abuse prevention safeguards",
          "Secure API key isolation and multi-provider automatic failover mechanisms",
          "Real-time observability, token logging, and cost analytics integration",
        ],
        techStack: ["Vercel AI SDK", "Groq", "Google Gemini 2.0", "Next.js App Router", "TypeScript", "Redis"],
        tags: [
          "LLM Integration",
          "Streaming Responses",
          "Vercel AI SDK",
          "Cost Optimization",
          "Token Management",
          "Model Failover",
        ],
        audience: "Web applications and SaaS platforms adding conversational AI or generative features",
        relatedLink: { label: "Test the portfolio AI assistant →", href: "/projects" },
      },
    ],
  },
  {
    id: "backend-architecture",
    title: "Backend & Distributed Architecture",
    subtitle:
      "High-throughput APIs, asynchronous job queues, and rock-solid system design built for scale.",
    services: [
      {
        id: "backend-apis",
        badge: "05 // BACKEND ARCHITECTURE",
        title: "Production Backend APIs & System Design",
        tagline:
          "High-throughput REST & GraphQL APIs, clean schema design, caching layers, and database optimization.",
        description:
          "Robust server-side engineering built with TypeScript, Node.js, and PostgreSQL. We architect modular, type-safe APIs with connection pooling, Redis caching for hot paths, query profiling, and role-based access control (RBAC).",
        startingPrice: "From $600 / ₹50,000",
        priceAmount: "600",
        priceCurrency: "USD",
        deliverables: [
          "Type-safe RESTful and GraphQL API design with strict input validation",
          "Relational database schema modeling, indexing, and Drizzle/Prisma migrations",
          "Enterprise authentication, OAuth, JWT, and role-based access control (RBAC)",
          "Redis caching layer implementation to cut database latency under heavy load",
          "Database query profiling, index optimization, and slow-query bottleneck resolution",
        ],
        techStack: ["Node.js", "Express.js", "NestJS", "PostgreSQL", "Redis", "Drizzle ORM", "TypeScript"],
        tags: [
          "Backend APIs",
          "System Design",
          "Node.js",
          "PostgreSQL",
          "Redis Caching",
          "REST API",
          "GraphQL",
        ],
        audience: "Growing SaaS companies requiring high-throughput, maintainable backend architectures",
        relatedLink: { label: "See production API projects →", href: "/projects" },
      },
      {
        id: "event-driven",
        badge: "06 // ASYNC SYSTEMS",
        title: "Event-Driven Systems & Background Processing",
        tagline:
          "Asynchronous job queues, scheduled tasks, transactional webhooks, and fault-tolerant message workers.",
        description:
          "Keep critical user journeys blazing fast by offloading heavy computations, notifications, and third-party integrations to distributed queues with BullMQ, Redis, and event-driven patterns.",
        startingPrice: "From $500 / ₹40,000",
        priceAmount: "500",
        priceCurrency: "USD",
        deliverables: [
          "Asynchronous background queue setup with BullMQ and Redis for non-blocking operations",
          "Decoupled event publisher/subscriber architecture for microservices communication",
          "Scheduled cron tasks, automated report generation, and transactional webhooks",
          "Exponential backoff retry logic, idempotency keys, and dead-letter queues (DLQ)",
          "Worker monitoring, backpressure management, and failure alerts",
        ],
        techStack: ["BullMQ", "Redis", "Apache Kafka", "Docker", "Node.js", "TypeScript"],
        tags: [
          "Event-Driven",
          "Job Queues",
          "BullMQ",
          "Redis",
          "Asynchronous Processing",
          "Microservices",
        ],
        audience: "Applications handling intensive background tasks, email bursts, exports, and webhooks",
        relatedLink: { label: "Read event-driven guides →", href: "/blogs" },
      },
      {
        id: "cloud-devops",
        badge: "07 // DEVOPS & OBSERVABILITY",
        title: "Cloud, DevOps & Observability",
        tagline:
          "Production Docker containerization, automated CI/CD pipelines, and comprehensive telemetry.",
        description:
          "Deploy with confidence across staging and production environments. We automate build-and-test workflows with GitHub Actions, containerize applications with Docker, and implement structured logging and metrics for total operational visibility.",
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
        badge: "08 // WEBSITE DEVELOPMENT",
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
        id: "seo-services",
        badge: "09 // SEO SERVICES",
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
      {
        id: "website-speed-optimization",
        badge: "10 // SPEED & PERFORMANCE",
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
        id: "full-stack-web",
        badge: "11 // CUSTOM WEB APPLICATIONS",
        title: "Full-Stack Web Application Development",
        tagline:
          "Custom web apps, customer portals, and SaaS dashboards with role-based auth and scalable databases.",
        description:
          "When pre-packaged software fails your business logic, we develop custom full-stack web applications. From customer portals and interactive booking tools to multi-tenant SaaS platforms, we build secure, scalable solutions with Next.js and PostgreSQL.",
        startingPrice: "From $1,200 / ₹1,00,000",
        priceAmount: "1200",
        priceCurrency: "USD",
        deliverables: [
          "Custom SaaS web applications, customer portals, and internal operations dashboards",
          "Secure authentication, session management, OAuth, and granular role-based permissions (RBAC)",
          "Payment gateway integrations (Stripe, Razorpay) and subscription billing workflows",
          "Direct database integration with PostgreSQL, Drizzle ORM, and connection pooling",
          "Automated deployment, end-to-end testing, and production monitoring",
        ],
        techStack: ["Next.js 16", "React 19", "Node.js", "PostgreSQL", "Drizzle ORM", "Tailwind CSS"],
        tags: [
          "Full-Stack Web Application",
          "Custom Web App",
          "SaaS Dashboard",
          "Customer Portal",
          "PostgreSQL",
          "NextAuth",
        ],
        audience: "Companies needing bespoke business software, customer portals, or subscription SaaS platforms",
        relatedLink: { label: "Explore web projects →", href: "/projects" },
      },
    ],
  },
  {
    id: "ai-accelerated-engineering",
    title: "AI-Accelerated Engineering",
    subtitle:
      "Agent-assisted development workflows shipping production-grade code with human-verified security and tests.",
    services: [
      {
        id: "ai-assisted-workflow",
        badge: "12 // AI-ACCELERATED DELIVERY",
        title: "AI-Accelerated Engineering",
        tagline:
          "Agent-assisted development workflows shipping production-grade code with human-verified security and tests.",
        description:
          "We use AI coding agents (Cursor, Claude Code, GitHub Copilot) to accelerate boilerplate, scaffolding, and test generation — allowing senior engineering time to focus entirely on architecture, data integrity, security review, and business logic. Move at startup velocity without sacrificing quality.",
        startingPrice: "Built into all engagements",
        priceAmount: "0",
        priceCurrency: "USD",
        deliverables: [
          "Accelerated feature velocity through AI agent-assisted boilerplate and scaffolding generation",
          "Strict human ownership of security boundaries, authentication flows, and financial logic",
          "Automated regression testing and CI verification validating all generated code",
          "Transparent Git workflows distinguishing AI-scaffolded patterns from hand-crafted logic",
          "Clean, maintainable codebases delivered with comprehensive handover documentation",
        ],
        techStack: ["Cursor", "Claude Code", "GitHub Copilot", "TypeScript", "Next.js", "CI/CD"],
        tags: [
          "AI-Accelerated Engineering",
          "Fast MVP Delivery",
          "Cursor Claude Code",
          "Startup Speed",
          "High Code Quality",
        ],
        audience: "Startups and engineering leaders wanting 2x-3x shipping speed without technical debt",
        relatedLink: { label: "Explore projects built this way →", href: "/projects" },
      },
    ],
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery & Architecture",
    description:
      "Understand your product goals, data requirements, and technical constraints to define a clear architectural scope and deliverables roadmap.",
  },
  {
    step: "02",
    title: "Prototype & Validation",
    description:
      "Build and validate a working prototype to test core assumptions, AI response quality, and API contracts early with your team.",
  },
  {
    step: "03",
    title: "Implementation & Hardening",
    description:
      "Refine business logic, implement caching and error handling, optimize database queries, and test edge cases thoroughly.",
  },
  {
    step: "04",
    title: "Integration & Handover",
    description:
      "Deploy to production, integrate with your existing stack, and provide complete documentation, tests, and code walkthroughs.",
  },
];

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    title: "Startup MVP & Feature Sprints",
    badge: "High Velocity",
    startingPrice: "From $800 / sprint",
    priceAmount: "800",
    subtitle:
      "Fixed-price feature sprints for startups, founders, and CTOs who need a senior freelance AI developer to ship in 1 to 4 weeks.",
    highlights: [
      "Fixed-scope freelance sprints (1 to 4 weeks) with guaranteed delivery dates",
      "Production-grade AI chatbot, custom knowledge base, web app, or API",
      "Direct technical collaboration with founders and CTOs with zero agency overhead",
      "Production-ready deployment, automated tests, and clean code handover",
    ],
  },
  {
    title: "Contract & Dedicated Collaboration",
    badge: "Flexible Scope",
    startingPrice: "From $2,000 / mo",
    priceAmount: "2000",
    subtitle:
      "Monthly retainer partnership for growing product teams needing ongoing backend, full-stack, or AI engineering velocity.",
    highlights: [
      "Flexible monthly retainer or sprint-based contract partnership",
      "Seamless integration into your existing codebase, GitHub PRs, and team rituals",
      "Backend architecture, query tuning, and high-throughput API design",
      "Collaborative code reviews, regression testing, and thorough documentation",
    ],
  },
  {
    title: "Forward Deployed Engineering & Remote Roles",
    badge: "Embedded / Long Term",
    startingPrice: "Custom Contract / Full-time",
    subtitle:
      "High-impact embedded Forward Deployed Engineer (FDE) or remote AI Backend Engineer for mission-critical product rollouts.",
    highlights: [
      "Forward Deployed Engineer (FDE) / AI Backend Engineer / AI SDE",
      "Direct customer immersion, rapid prototyping, and enterprise deployment",
      "Fluent in async communication across US, UK, European, and Asian timezones",
      "Immediate availability for high-priority contract sprints or full-time remote roles",
    ],
  },
];

export const SERVICES_FAQS: ServiceFAQ[] = [
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
    id: "faq-full-stack-capabilities",
    question: "Can you build both the backend and frontend for our web application?",
    answer:
      "Yes. We build end-to-end full-stack applications using Next.js 16, React 19, and Tailwind CSS on the frontend, paired with Node.js, PostgreSQL, Drizzle ORM, and Redis on the backend. This provides single-engineer velocity, zero communication bottlenecks between frontend and backend, and cohesive type safety across the entire stack.",
    tags: ["Full Stack Development", "Next.js", "Node.js", "PostgreSQL", "Type Safety"],
  },
  {
    id: "faq-project-timeline-estimates",
    question: "What is your typical project timeline?",
    answer:
      "Targeted prototypes, AI chatbot integrations, or technical SEO audits are typically delivered in 1 to 2 weeks. Complete full-stack web applications, custom knowledge bases, and production backend architectures typically range from 3 to 6 weeks depending on feature scope and database complexity.",
    tags: ["Project Timeline", "Delivery Velocity", "Sprint Duration"],
  },
  {
    id: "faq-custom-website-services",
    question: "Can you build a custom website for my business or brand?",
    answer:
      "Yes. We design and engineer custom, responsive websites tailored for businesses, founders, consultants, and brands. Whether you need a corporate web presence, a high-converting SaaS landing page, or a personal portfolio, we deliver blazing-fast Next.js websites with clean styling, interactive contact forms, lead capture, and easy CMS content updates.",
    tags: ["Custom Website", "Business Website", "Landing Page", "Next.js"],
  },
  {
    id: "faq-technical-seo-deliverables",
    question: "What do your SEO services include and how do they help my website rank?",
    answer:
      "Our SEO services focus on technical accuracy and measurable search visibility: (1) Technical SEO audits resolving crawl errors, canonical loops, and indexation issues, (2) Keyword mapping for titles, meta descriptions, and semantic headings, (3) Schema.org structured data (Organization, ProfessionalService, Service, FAQPage) for Google rich snippets, (4) Google Core Web Vitals optimization for speed, and (5) Generative Engine Optimization (GEO/AEO) so AI answer engines like ChatGPT and Perplexity cite your content.",
    tags: ["Technical SEO", "Schema.org JSON-LD", "AEO/GEO", "Core Web Vitals", "Google Ranking"],
  },
  {
    id: "faq-nextjs-vs-wordpress-wix",
    question: "Why should I hire a custom website developer instead of using WordPress or Wix?",
    answer:
      "Generic website builders and WordPress themes come with bloated JavaScript, slow loading times, security vulnerabilities from outdated plugins, and rigid design constraints. A custom Next.js website delivers near-instant page loads (95+ on Google PageSpeed), superior Google search rankings, zero ongoing plugin subscription fees, complete design uniqueness, and the ability to seamlessly add custom AI or backend features as your business scales.",
    tags: ["Next.js vs WordPress", "PageSpeed", "Security", "WordPress Alternative"],
  },
  {
    id: "faq-existing-codebase-integration",
    question: "Can you work with our existing tech stack and codebase?",
    answer:
      "Yes. Whether you are using Next.js, React, Node.js, Express, NestJS, or PostgreSQL, we integrate cleanly into your existing codebase, Git repository, and database without requiring disruptive rewrites or architectural downtime.",
    tags: ["Codebase Integration", "Tech Stack Compatibility", "Git Workflow"],
  },
  {
    id: "faq-code-ip-ownership",
    question: "Who owns the code and intellectual property?",
    answer:
      "You retain 100% ownership of all code, architecture specifications, configurations, and documentation created during the engagement. Everything is committed directly to your private repositories with full commercial rights.",
    tags: ["IP Ownership", "Code Rights", "Private Repository"],
  },
  {
    id: "faq-how-to-get-started",
    question: "How do we get started?",
    answer:
      "The fastest path: email shaikh.samir.work@gmail.com or use the Contact page with a brief summary of what you need — your product vision, tech stack, and target timeline. I reply within 24 hours to schedule a short discovery call, after which I provide a clear scope and timeline proposal, typically within 48 hours.",
    tags: ["Getting Started", "Discovery Call", "Fixed Proposal", "Contact"],
  },
];

