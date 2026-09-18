export type FAQCategory =
  | "Pricing & Payment"
  | "Process & Timeline"
  | "Trust & Guarantees"
  | "AI & RAG Systems"
  | "Backend & Architecture"
  | "Forward Deployed & Roles"
  | "Background & Contact";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  tags?: string[];
}

export const FAQS: FAQItem[] = [
  // 1. Pricing & Payment (Commercial Intent & Risk Mitigation)
  {
    id: "project-cost-pricing",
    category: "Pricing & Payment",
    question: "How much does a freelance project or custom website typically cost?",
    answer:
      "A typical freelance project with Samir Shaikh ranges from $300 to $800 (₹25,000 to ₹65,000) for targeted feature sprints and technical SEO audits, and $900 to $2,500+ (₹75,000 to ₹2,00,000+) for complete full-stack web applications or production AI/RAG systems. Every engagement begins with a scope breakdown and a guaranteed fixed-price proposal with no surprise billings.",
    tags: ["Freelance Pricing", "Website Cost", "Fixed Quote", "Next.js Development Cost", "AI Project Cost"],
  },
  {
    id: "fixed-budget-vs-hourly",
    category: "Pricing & Payment",
    question: "Do you work with a fixed project budget or hourly rates?",
    answer:
      "I work primarily on milestone-based fixed budgets to give clients guaranteed cost certainty and protected timelines. For ongoing product development, continuous engineering roadmaps, or technical advisory, I also provide dedicated weekly retainer sprints ($500 to $900/week) with agreed-upon delivery velocity and daily progress visibility.",
    tags: ["Fixed Budget", "Weekly Retainer", "Milestone Billing", "Contract Pricing", "Hourly vs Fixed"],
  },
  {
    id: "payment-terms-milestones",
    category: "Pricing & Payment",
    question: "What are your payment terms and milestone schedule?",
    answer:
      "Payment terms follow a safe 30/35/35 milestone structure tied directly to verified deliverables: 30% upfront deposit to initiate technical architecture and design, 35% upon reviewing working milestone demos on a staging server, and the final 35% only after production deployment, testing sign-off, and repository transfer.",
    tags: ["Payment Terms", "Milestone Payments", "Safe Escrow", "Staging Verification"],
  },
  {
    id: "satisfaction-guarantee-revisions",
    category: "Pricing & Payment",
    question: "What if the deliverable does not match requirements or needs revision?",
    answer:
      "Every project includes structured revision rounds at each milestone stage to ensure 100% alignment with your expectations. Because we establish concrete technical specifications and UI wireframes before writing production code, scope divergence is caught early. Any deliverable that does not match the agreed specification is revised at zero additional cost.",
    tags: ["Satisfaction Guarantee", "Revision Policy", "Quality Assurance", "Design Review"],
  },
  {
    id: "monthly-hosting-infrastructure-cost",
    category: "Pricing & Payment",
    question: "How much will monthly hosting and database infrastructure cost after launch?",
    answer:
      "For most startups and small businesses, monthly infrastructure costs range from $0 to $20/month. Applications are architected on generous modern serverless tiers (Vercel, Neon Serverless PostgreSQL, Cloudinary), ensuring zero payment for idle compute and scaling costs strictly as user traffic and business revenue grow.",
    tags: ["Hosting Costs", "Infrastructure Cost", "Serverless Architecture", "Neon PostgreSQL", "Vercel"],
  },
  {
    id: "custom-nextjs-vs-wordpress-wix",
    category: "Pricing & Payment",
    question: "Why should I invest in a custom Next.js website instead of WordPress or Wix?",
    answer:
      "A custom Next.js web application delivers sub-second load times (95+ Google PageSpeed score), zero recurring plugin subscription vulnerabilities, and superior search engine visibility. Most importantly, it gives you complete data ownership and the flexibility to seamlessly connect custom AI features, databases, and client portals without platform lock-in.",
    tags: ["Next.js vs WordPress", "Custom Web Development", "PageSpeed Score", "Core Web Vitals", "Zero Plugin Fees"],
  },

  // 2. Process & Timeline (Speed, Agility & Communication)
  {
    id: "urgent-timeline-1-week",
    category: "Process & Timeline",
    question: "I need a production-ready website or MVP in 1-2 weeks — is that possible?",
    answer:
      "Yes, production-ready web applications and MVPs can be delivered in 7 to 14 business days using focused rapid-prototyping sprints. By scoping out non-critical features and concentrating on core business workflows, I leverage an AI-accelerated engineering workflow (Next.js 16, TypeScript, Tailwind CSS) to ship functional, tested products at startup velocity.",
    tags: ["Fast MVP Delivery", "1 Week Website", "Rapid Prototyping", "Next.js MVP", "Startup Velocity"],
  },
  {
    id: "development-workflow-steps",
    category: "Process & Timeline",
    question: "What is your step-by-step freelance development process?",
    answer:
      "My development process operates in four structured stages: (1) Discovery & Architecture — Clarifying business objectives, constraints, and data schemas, (2) Milestone Blueprint — Delivering a fixed quote, tech spec, and delivery roadmap, (3) Sprint Execution — Writing clean code with continuous Git commits and live staging previews, and (4) Launch & Handover — Automated CI/CD deployment, documentation, and 100% repository ownership transfer.",
    tags: ["Development Process", "Agile Sprints", "Milestone Delivery", "Software Lifecycle"],
  },
  {
    id: "project-delay-handling",
    category: "Process & Timeline",
    question: "How do you prevent project delays and handle unexpected technical blockers?",
    answer:
      "I eliminate project delays through proactive milestone buffers and daily async communication with zero radio silence. If third-party API dependencies or ambiguous constraints surface, I flag them immediately alongside actionable technical alternatives so the launch schedule remains protected.",
    tags: ["Project Management", "Timeline Protection", "Async Communication", "Risk Management"],
  },
  {
    id: "post-launch-support-maintenance",
    category: "Process & Timeline",
    question: "Do you provide ongoing support, bug fixing, and maintenance after delivery?",
    answer:
      "Yes, every project includes a complimentary 30-day post-launch warranty covering immediate bug fixes, edge-case tuning, and deployment adjustments. For ongoing feature development and infrastructure health, I offer monthly maintenance retainers covering security updates, database optimization, and performance monitoring.",
    tags: ["Post-Launch Support", "Maintenance Retainer", "Warranty", "Bug Fixes", "SLA Support"],
  },

  // 3. Trust & Guarantees (Legal, IP & Data Protection)
  {
    id: "nda-and-ip-agreement",
    category: "Trust & Guarantees",
    question: "Do you sign Non-Disclosure Agreements (NDAs) and intellectual property contracts?",
    answer:
      "Yes, I sign standard mutual NDAs before reviewing any proprietary business data, project specs, or codebases. All contracts explicitly stipulate that 100% of intellectual property, commercial copyrights, and patentable logic transfer exclusively to you upon milestone settlement.",
    tags: ["NDA", "Confidentiality", "IP Assignment", "Legal Protection", "Client Security"],
  },
  {
    id: "code-ownership-no-lockin",
    category: "Trust & Guarantees",
    question: "Who owns the source code and infrastructure after the project ends?",
    answer:
      "You retain 100% exclusive ownership of all source code, database schemas, and deployment configurations with zero vendor lock-in. Work is committed directly to your private GitHub or GitLab organization and hosted on your accounts (Vercel, AWS, Neon, Cloudinary), ensuring complete autonomy.",
    tags: ["100% Code Ownership", "Zero Vendor Lock-In", "Private GitHub", "Open Architecture"],
  },
  {
    id: "data-security-privacy",
    category: "Trust & Guarantees",
    question: "How do you ensure data security and privacy for sensitive company data?",
    answer:
      "Data security is implemented via end-to-end encryption, strict TLS database connections, least-privilege API credentials, and environment secrets management in `.env` vaults. For AI applications, company documents are stored in isolated vector databases with zero third-party model training on your private data.",
    tags: ["Data Privacy", "Security Engineering", "Private AI", "TLS Encryption", "Vector Isolation"],
  },
  {
    id: "clean-codebase-developer-handoff",
    category: "Trust & Guarantees",
    question: "How do you ensure the codebase is clean and easy for other developers to take over?",
    answer:
      "Every project strictly adheres to TypeScript strict mode, modular architecture, and automated ESLint / Prettier rules. You receive comprehensive README documentation, environment variable guides, and clear commit history so any future internal engineer or agency can onboard and ship features in under 30 minutes.",
    tags: ["Clean Code", "Maintainability", "Developer Handoff", "TypeScript Strict", "Documentation"],
  },

  // 4. AI & RAG Systems (Deep Technical Architecture & AI-Enabled Workflow)
  {
    id: "rag-architecture",
    category: "AI & RAG Systems",
    question: "How is your production RAG pipeline designed and what prevents hallucination?",
    answer:
      "My production RAG architecture pairs Google Gemini 3072-dimensional embeddings (`gemini-embedding-2`) with Neon Serverless PostgreSQL and pgvector for sub-300ms vector retrieval. Hallucinations are prevented through strict cosine distance filtering (<= 0.5), deterministic system prompts that enforce verified citations, refusal guardrails when context is insufficient, and real-time activity grounding.",
    tags: ["RAG Pipeline", "pgvector", "Gemini Embeddings", "Hallucination Defense", "Vector Search"],
  },
  {
    id: "ai-coding-agents-workflow-quality",
    category: "AI & RAG Systems",
    question: "How do you use AI coding assistants without compromising code quality or security?",
    answer:
      "I use AI coding agents (Cursor, Claude Code, GitHub Copilot) strictly for repetitive boilerplate, test fixtures, and initial scaffolding — never for unverified production logic. Every line of code passes through strict manual architecture review, unit testing, and automated CI gates, ensuring zero 'AI slop', zero security vulnerabilities, and clean, maintainable software.",
    tags: ["AI-Enabled Developer", "Code Quality", "CI/CD Gates", "Cursor", "Claude Code", "Code Security"],
  },
  {
    id: "agentic-ai-workflows",
    category: "AI & RAG Systems",
    question: "What experience do you have with Agentic AI, tool calling, and MCP?",
    answer:
      "I architect agentic AI workflows using the Vercel AI SDK and Model Context Protocol (MCP) standards. These systems execute multi-step reasoning, autonomous database queries, and external API tool calls validated through Zod schemas, structured outputs, and human-in-the-loop approval gates.",
    tags: ["Agentic AI", "Tool Calling", "MCP", "Vercel AI SDK", "Autonomous Agents", "Zod Validation"],
  },
  {
    id: "custom-knowledge-base-chatbots",
    category: "AI & RAG Systems",
    question: "Can you build a custom knowledge base AI chatbot for an existing SaaS or website?",
    answer:
      "Yes, I build production-grade AI chatbots connected directly to company knowledge bases (PDFs, Markdown, Notion docs, or PostgreSQL databases). The solution features automated document chunking, vector indexing, streaming responses, rate limiting, and seamless embeddable drawer UI widgets tailored to your brand.",
    tags: ["Custom AI Chatbot", "Knowledge Base AI", "SaaS AI Integration", "Streaming UI", "RAG Chatbot"],
  },
  {
    id: "custom-ai-vs-saas-tools",
    category: "AI & RAG Systems",
    question: "Why hire a custom AI engineer instead of using off-the-shelf chatbot software?",
    answer:
      "Building a custom AI application gives you 100% proprietary data ownership, zero recurring monthly per-message or per-seat markups, and complete flexibility to connect directly into your internal databases and APIs. Off-the-shelf tools lock your data onto third-party servers and charge steep subscription fees.",
    tags: ["Custom AI vs SaaS", "Cost Reduction", "Data Sovereignty", "API Integration"],
  },
  {
    id: "runaway-ai-token-costs",
    category: "AI & RAG Systems",
    question: "How do you protect against runaway LLM API bills and high token costs?",
    answer:
      "I implement multi-layered cost safeguards: in-memory and IP-based rate limiting, strict token budgets, compact prompt compression, and vector query caching. By pairing cost-effective models (Groq LLaMA 3.3, Google Gemini) with local pgvector retrieval, LLMs only process concise, verified context chunks rather than entire document dumps.",
    tags: ["AI Token Costs", "API Billing Safeguards", "Rate Limiting", "Groq LLaMA", "Cost Optimization"],
  },

  // 5. Backend & Architecture (Distributed Systems & Performance)
  {
    id: "backend-tech-stack",
    category: "Backend & Architecture",
    question: "What is your primary backend and distributed systems technology stack?",
    answer:
      "My primary backend stack consists of Node.js, TypeScript, Next.js App Router, Express, NestJS, and PostgreSQL with Drizzle ORM. For distributed event-driven systems, I build resilient message queues using Apache Kafka, BullMQ, and Redis, containerized with Docker and monitored via OpenTelemetry.",
    tags: ["Backend Tech Stack", "Node.js", "TypeScript", "PostgreSQL", "Kafka", "BullMQ", "Redis", "Docker"],
  },
  {
    id: "fix-bugs-existing-codebase",
    category: "Backend & Architecture",
    question: "Can you fix bugs, improve performance, or add features to my existing project?",
    answer:
      "Yes, I regularly audit and optimize existing codebases to fix critical bugs, resolve technical debt, eliminate database query bottlenecks, and achieve sub-second Google Core Web Vitals. Work is conducted with comprehensive regression testing to ensure zero downtime for live users.",
    tags: ["Bug Fixing", "Existing Codebase", "Code Audit", "Performance Optimization", "Core Web Vitals"],
  },
  {
    id: "frontend-and-backend-together",
    category: "Backend & Architecture",
    question: "Can you handle both frontend and backend development end-to-end?",
    answer:
      "Yes, I provide single-engineer full-stack delivery: Next.js (React 19) and Tailwind CSS on the frontend, cleanly connected to Node.js, PostgreSQL, Redis, and event pipelines on the backend. This eliminates coordination overhead between multiple contractors and dramatically speeds up feature delivery.",
    tags: ["Full Stack Development", "Next.js", "React 19", "Backend First", "TypeScript Full Stack"],
  },
  {
    id: "rate-limiting-security",
    category: "Backend & Architecture",
    question: "How do you implement API security, rate limiting, and bot defense?",
    answer:
      "API security is implemented through layered defenses: dual-mode timing-safe Bearer token and session authentication (`timingSafeEqual`), in-memory and device-fingerprinted rate limiting (`@fingerprintjs/fingerprintjs`), VPN/proxy detection via IPinfo, and parameterized SQL queries to prevent injection.",
    tags: ["API Security", "Rate Limiting", "FingerprintJS", "Bot Defense", "Timing-Safe Auth"],
  },
  {
    id: "database-performance-vector",
    category: "Backend & Architecture",
    question: "How do you optimize PostgreSQL and pgvector query latency?",
    answer:
      "I optimize database performance using targeted indexing (HNSW and IVFFlat for vector embeddings, compound indexes for relational queries), Neon serverless connection pooling, query profiling, and Next.js `unstable_cache` with tag-based revalidation to maintain sub-300ms response times under load.",
    tags: ["PostgreSQL Optimization", "pgvector Latency", "HNSW Index", "Connection Pooling", "Caching"],
  },
  {
    id: "microservices-vs-monolith",
    category: "Backend & Architecture",
    question: "What is your approach to architectural decisions between monoliths and microservices?",
    answer:
      "I take a pragmatic architectural approach: start with a clean modular monolith or Next.js full-stack system when domain boundaries are evolving, and decompose into event-driven microservices (Kafka/BullMQ) only when specific services require independent scaling, separate deployment cadences, or dedicated database stores.",
    tags: ["System Architecture", "Modular Monolith", "Microservices", "Event-Driven Architecture"],
  },
  {
    id: "seo-aeo-geo-ranking-visibility",
    category: "Backend & Architecture",
    question: "Will my new website rank on Google and get cited by AI answer engines like ChatGPT and Perplexity?",
    answer:
      "Yes, every application is engineered with technical SEO and Generative Engine Optimization (GEO/AEO) from day one: semantic HTML5 hierarchy, Schema.org JSON-LD structured data, dynamic OpenGraph social cards, XML sitemaps, and sub-second Core Web Vitals to maximize search rankings and AI citations.",
    tags: ["Technical SEO", "AEO", "GEO", "Schema.org JSON-LD", "Google Rankings", "Perplexity Citation"],
  },

  // 6. Forward Deployed & Roles (Career, Hiring & Enterprise Alignment)
  {
    id: "fde-role-interest",
    category: "Forward Deployed & Roles",
    question: "What is a Forward Deployed Engineer (FDE) and why are you targeting this role?",
    answer:
      "A Forward Deployed Engineer (FDE) bridges deep technical engineering with direct customer ownership by embedding with enterprise stakeholders, unpacking ambiguous requirements, rapidly prototyping custom AI solutions, and taking direct accountability for deploying and hardening those systems in production.",
    tags: ["Forward Deployed Engineer", "FDE", "Technical Discovery", "Client Ownership", "Prototyping"],
  },
  {
    id: "fulltime-employment-availability",
    category: "Forward Deployed & Roles",
    question: "Are you actively open to full-time engineering roles and remote teams?",
    answer:
      "Yes, I am actively open to full-time roles as an AI Backend Engineer, AI SDE, Agentic AI Engineer, or Forward Deployed Engineer (FDE). I work effectively with global remote engineering teams across multiple time zones as well as hybrid or on-site opportunities in India.",
    tags: ["Hiring", "Full-Time Roles", "AI SDE", "AI Backend Engineer", "Remote Work India"],
  },
  {
    id: "fde-customer-ambiguity",
    category: "Forward Deployed & Roles",
    question: "How do you navigate ambiguous client requirements during technical discovery?",
    answer:
      "I navigate ambiguous requirements by building early functional prototypes that validate user assumptions in days rather than weeks. By breaking high-level objectives into concrete technical specifications and maintaining continuous feedback loops, client needs are validated before scaling production architecture.",
    tags: ["Technical Discovery", "Customer Discovery", "Requirements Scoping", "Agile Validation"],
  },

  // 7. Background & Contact (Bio, Credentials & Getting Started)
  {
    id: "who-is-samir-shaikh",
    category: "Background & Contact",
    question: "Who is Samir Shaikh and what is his engineering background?",
    answer:
      "Samir Shaikh is an AI-enabled full stack developer (backend-first) based in Gujarat, India, with a B.Tech in Information Technology from Uka Tarsadia University (2026). His production experience includes engineering at Xira Infotech (job portal with RBAC and PostgreSQL) and LOGICWIND (microservice optimization and customer engagement pipelines).",
    tags: ["About Samir Shaikh", "Engineering Bio", "Xira Infotech", "Logicwind", "B.Tech IT"],
  },
  {
    id: "communication-channels-timezone",
    category: "Background & Contact",
    question: "How do we stay in sync during a project and what time zones do you support?",
    answer:
      "I communicate asynchronously via Slack, Discord, or WhatsApp for daily progress updates, supplemented by weekly video syncs (Google Meet/Zoom) and Loom video walkthroughs for milestone demos. Based in Gujarat, India, my working hours regularly overlap with clients in the US, UK, Europe, and Asia-Pacific.",
    tags: ["Client Communication", "Slack", "Discord", "Global Time Zones", "Loom Updates"],
  },
  {
    id: "contact-response-sla",
    category: "Background & Contact",
    question: "How can I get started or discuss a project with Samir?",
    answer:
      "You can get started immediately by submitting an inquiry on the Contact page (/contact) or emailing shaikh.samir.work@gmail.com with your project overview and timeline. I respond to all business and hiring inquiries within 24 to 48 hours to schedule a free 30-minute discovery consultation.",
    tags: ["Contact Samir", "Free Discovery Call", "Hire Samir Shaikh", "Project Consultation"],
  },
];
