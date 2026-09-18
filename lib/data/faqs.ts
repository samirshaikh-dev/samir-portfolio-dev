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
  // 1. Pricing & Payment (Client-Focused)
  {
    id: "project-cost-pricing",
    category: "Pricing & Payment",
    question: "How much does a freelance project or custom website typically cost?",
    answer:
      "Pricing is transparent and based on scope complexity rather than arbitrary guesswork. Focused sprints, technical SEO audits, or targeted feature builds typically range from $300 to $800 (₹25,000 to ₹65,000). Complete full-stack web applications, custom SaaS MVPs, and production AI/RAG systems typically range from $900 to $2,500+ (₹75,000 to ₹2,00,000+). You receive a detailed line-item proposal with a guaranteed fixed quote before any work starts.",
    tags: ["Pricing", "Cost", "Website Cost", "Fixed Quote", "No Hidden Fees"],
  },
  {
    id: "fixed-budget-vs-hourly",
    category: "Pricing & Payment",
    question: "Do you work with a fixed project budget or hourly rates?",
    answer:
      "I primarily work on milestone-based fixed budgets because it protects you from unexpected costs — you know the exact delivery schedule and total investment upfront. For open-ended consulting, ongoing feature roadmaps, or technical advisory, I also offer dedicated weekly retainer sprints ($500 - $900/week) with clear velocity commitments.",
    tags: ["Fixed Budget", "Weekly Retainer", "Milestones", "Hourly vs Fixed"],
  },
  {
    id: "payment-terms-milestones",
    category: "Pricing & Payment",
    question: "What are your payment terms and milestones?",
    answer:
      "Payments are split across transparent milestone stages to keep your investment safe. A typical structure is: 30% upfront deposit to kick off architecture and design, 35% upon reviewing working milestone demos on a private staging server, and the remaining 35% only after final testing, deployment, and verified code handover.",
    tags: ["Payment Terms", "Milestones", "Safe Payment", "Staging Review"],
  },
  {
    id: "satisfaction-guarantee-revisions",
    category: "Pricing & Payment",
    question: "What if I don't like the design or the deliverable isn't what I expected?",
    answer:
      "Every project includes structured revision rounds at each milestone stage. We align on visual references, wireframes, and technical specifications before writing code so there are no surprises. If any deliverable diverges from the agreed-upon specification, I revise it at no additional cost until it meets your requirements before proceeding to the next stage.",
    tags: ["Revisions", "Satisfaction Guarantee", "Design Review", "Quality Assurance"],
  },

  // 2. Process & Timeline (Client-Focused)
  {
    id: "urgent-timeline-1-week",
    category: "Process & Timeline",
    question: "I need a website or MVP in 1-2 weeks — is that possible?",
    answer:
      "Yes. For time-sensitive launches, I offer accelerated rapid prototyping sprints. By scoping out non-essential complexity and focusing strictly on core high-impact features, I can deploy a production-ready Next.js web application, landing page, or functional AI prototype within 7 to 14 business days.",
    tags: ["Fast Delivery", "1 Week Website", "MVP Sprint", "Rapid Prototyping"],
  },
  {
    id: "development-workflow-steps",
    category: "Process & Timeline",
    question: "What is your step-by-step freelance development process?",
    answer:
      "My workflow is low-friction and structured for velocity: (1) Technical Discovery — Unpack requirements, constraints, and business goals, (2) Architectural Spec & Roadmap — Provide a clear blueprint, milestone schedule, and fixed quote, (3) Sprint Development — Clean code, regular Git commits, and live staging previews, and (4) Production Launch & Handover — Automated CI/CD deployment, environment configuration, and full repository ownership transfer.",
    tags: ["Development Process", "Workflow", "Agile Sprints", "Milestones"],
  },
  {
    id: "project-delay-handling",
    category: "Process & Timeline",
    question: "What happens if a project runs into roadblocks or gets delayed?",
    answer:
      "I practice radical transparency with zero radio silence. If unforeseen third-party API limitations or scope changes arise, I flag them immediately with proposed technical alternatives and revised impact assessments. Timelines are protected by aggressive milestone tracking and realistic buffer days built into every initial estimate.",
    tags: ["Project Delays", "Risk Management", "Transparency", "Timeline Protection"],
  },
  {
    id: "post-launch-support-maintenance",
    category: "Process & Timeline",
    question: "Do you provide ongoing support, bug fixing, and maintenance after delivery?",
    answer:
      "Yes. Every project includes a complimentary 30-day post-launch warranty where any bugs, edge-case glitches, or deployment adjustments are fixed immediately at no charge. For long-term peace of mind, I offer flexible monthly maintenance retainers covering security updates, performance monitoring, database backups, and ongoing feature additions.",
    tags: ["Post-Launch Support", "Warranty", "Maintenance Retainer", "Bug Fixes"],
  },

  // 3. Trust & Guarantees (Security & Peace of Mind)
  {
    id: "nda-and-ip-agreement",
    category: "Trust & Guarantees",
    question: "Do you sign Non-Disclosure Agreements (NDAs) and intellectual property contracts?",
    answer:
      "Yes, 100%. Before you share proprietary documents, business secrets, or technical specs, I execute a standard mutual NDA to guarantee absolute confidentiality. All contracts explicitly transfer full intellectual property and commercial copyright to you immediately upon final milestone settlement.",
    tags: ["NDA", "Confidentiality", "IP Protection", "Legal Agreement"],
  },
  {
    id: "code-ownership-no-lockin",
    category: "Trust & Guarantees",
    question: "Who owns the source code and infrastructure after the project ends?",
    answer:
      "You retain 100% exclusive ownership of all code, database schemas, assets, and deployment configurations. All work is committed directly to your private GitHub or GitLab repository, and deployed to your own hosting accounts (Vercel, AWS, Neon, etc.). There are zero vendor lock-ins, zero proprietary licenses, and zero ongoing platform markups.",
    tags: ["100% Code Ownership", "Zero Vendor Lock-In", "Private GitHub", "Open Source"],
  },
  {
    id: "data-security-privacy",
    category: "Trust & Guarantees",
    question: "How do you ensure data security and privacy for sensitive company data?",
    answer:
      "Security is engineered at every layer: environment secrets remain encrypted in `.env` vaults, database connections use strict TLS with least-privilege credentials, and API routes enforce timing-safe token authentication. For AI applications, private company documents are indexed into isolated vector databases with zero model training on your data.",
    tags: ["Data Security", "Privacy", "API Security", "Vector Isolation"],
  },

  // 4. AI & RAG Systems (Deep Technical Architecture)
  {
    id: "rag-architecture",
    category: "AI & RAG Systems",
    question: "How is your production RAG pipeline designed and what prevents hallucination?",
    answer:
      "My production RAG architecture connects Google Gemini 3072-dimensional embeddings (`gemini-embedding-2`) to Neon serverless PostgreSQL with pgvector. We enforce a strict cosine distance threshold (<= 0.5) to discard irrelevant context before LLM synthesis. Prompts are deterministically grounded using structured context blocks, verified citations, and refusal guardrails when source context is insufficient. In addition, real-time developer activity is retrieved dynamically from GitHub events to ground current engineering status.",
    tags: ["RAG", "pgvector", "Gemini", "Embeddings", "Hallucination Defense"],
  },
  {
    id: "agentic-ai-workflows",
    category: "AI & RAG Systems",
    question: "What experience do you have with Agentic AI, tool calling, and MCP?",
    answer:
      "I design agentic AI workflows using the Vercel AI SDK and Model Context Protocol (MCP) standards. This includes multi-step reasoning, autonomous tool execution with structured schema validation, human-in-the-loop gates, and deterministic state transitions. My systems incorporate fallback strategies, retry budgets, and strict output parsing to ensure reliable autonomous execution in production environments.",
    tags: ["Agentic AI", "Tool Calling", "MCP", "Vercel AI SDK", "Autonomous Agents"],
  },
  {
    id: "ai-coding-agents-workflow",
    category: "AI & RAG Systems",
    question: "What does an 'AI-Enabled Full Stack Developer' mean in your day-to-day workflow?",
    answer:
      "Operating as an AI-enabled developer means pairing deep backend engineering fundamentals with advanced AI coding assistants (Cursor, Claude Code, GitHub Copilot) to accelerate delivery 2-3x without compromising code quality. Repetitive boilerplate, initial scaffolding, and repetitive test fixtures are delegated to AI agents, while architecture, database design, API security, edge cases, and critical business logic are strictly authored, reviewed, and validated through CI gates personally.",
    tags: ["AI-Enabled", "Full Stack", "Productivity", "Code Quality", "CI/CD"],
  },
  {
    id: "custom-knowledge-base-chatbots",
    category: "AI & RAG Systems",
    question: "Can you build custom knowledge base AI chatbots for existing SaaS platforms or websites?",
    answer:
      "Yes. I build custom, embeddable AI chatbots connected directly to company knowledge bases (PDFs, Markdown, Notion docs, SQL databases, or customer support archives). The pipeline includes automated document ingestion, token-aware chunking, vector indexing, streaming responses, and responsive drawer UI widgets with session rate limiting and VPN/abuse protection.",
    tags: ["Chatbots", "Custom Knowledge Base", "SaaS", "Vector Search", "Streaming UI"],
  },
  {
    id: "custom-ai-vs-saas-tools",
    category: "AI & RAG Systems",
    question: "Why hire a custom AI developer instead of using off-the-shelf chatbot software?",
    answer:
      "SaaS chatbot tools charge recurring monthly per-message fees, lock your data onto third-party servers, and offer limited customization. A custom AI application built on Next.js and pgvector gives you 100% data ownership, zero per-seat software fees, custom domain integrations, and the freedom to connect to your proprietary database and CRM workflows.",
    tags: ["Custom AI vs SaaS", "Cost Savings", "Data Sovereignty", "Custom Integration"],
  },

  // 5. Backend & Architecture (Distributed Systems & Performance)
  {
    id: "backend-tech-stack",
    category: "Backend & Architecture",
    question: "What is your primary backend and distributed systems technology stack?",
    answer:
      "My primary backend stack is Node.js, TypeScript, Next.js App Router, Express, and NestJS, coupled with PostgreSQL and Drizzle ORM. For distributed and high-throughput systems, I architect event-driven microservices using Redis, Apache Kafka, BullMQ for background job queues, and Docker for containerized deployment. System observability is managed with OpenTelemetry, Prometheus, and Grafana.",
    tags: ["Node.js", "TypeScript", "PostgreSQL", "Kafka", "BullMQ", "Redis", "Docker"],
  },
  {
    id: "fix-bugs-existing-codebase",
    category: "Backend & Architecture",
    question: "Can you fix bugs, improve performance, or add features to my existing project?",
    answer:
      "Yes. I frequently take over existing codebases to resolve critical bugs, eliminate technical debt, profile and fix database query latency, and optimize sub-second Google Core Web Vitals. I conduct a quick codebase audit first, ensuring zero disruption to your live production users while modernizing the code.",
    tags: ["Bug Fixing", "Existing Codebase", "Performance Tuning", "Core Web Vitals", "Refactoring"],
  },
  {
    id: "frontend-and-backend-together",
    category: "Backend & Architecture",
    question: "Can you handle both frontend and backend development end-to-end?",
    answer:
      "Yes. You work with a single engineer who connects the entire stack: Next.js, React 19, TypeScript, and Tailwind CSS on the frontend, seamlessly wired to Node.js, PostgreSQL (with Drizzle ORM/pgvector), Redis, and event pipelines on the backend. This eliminates coordination friction between separate designers and backend developers, cutting delivery time in half.",
    tags: ["Full Stack", "Next.js", "Node.js", "PostgreSQL", "TypeScript"],
  },
  {
    id: "rate-limiting-security",
    category: "Backend & Architecture",
    question: "How do you implement API security, rate limiting, and bot defense?",
    answer:
      "Security is layered: (1) Dual-mode timing-safe API authorization supporting user session validation (`auth()`) and Bearer secret tokens (`timingSafeEqual`), (2) Dual-tier rate limiting tracking requests by IP and client device fingerprints (`@fingerprintjs/fingerprintjs`), (3) VPN/Proxy privacy inspection via IPinfo API, and (4) Strict schema input validation and parameterized SQL queries to prevent injection attacks.",
    tags: ["API Security", "Rate Limiting", "FingerprintJS", "Bearer Tokens", "Drizzle"],
  },
  {
    id: "database-performance-vector",
    category: "Backend & Architecture",
    question: "How do you optimize database performance and pgvector query latency?",
    answer:
      "I optimize PostgreSQL performance using targeted indexing (HNSW and IVFFlat for vector embeddings, compound indexes for relational queries), connection pooling with Neon serverless adapters, query profiling, and Next.js `unstable_cache` with tag-based revalidation for repetitive reads. Vector distance queries maintain sub-300ms latency even under high concurrency.",
    tags: ["PostgreSQL", "pgvector", "HNSW Index", "Connection Pooling", "Cache Invalidation"],
  },
  {
    id: "microservices-vs-monolith",
    category: "Backend & Architecture",
    question: "What is your approach to architectural decisions between monoliths and microservices?",
    answer:
      "I advocate for pragmatic architecture: start with a clean, modular monolith or Next.js full-stack system when domain boundaries are still evolving to avoid premature distributed systems overhead. When specific domain boundaries demand independent scaling, disparate database technologies, or isolated deployment cadences, I decompose modules into event-driven microservices communicating asynchronously via Kafka or BullMQ.",
    tags: ["Architecture", "Modular Monolith", "Microservices", "Event-Driven", "System Design"],
  },

  // 6. Forward Deployed & Roles (Career, Hiring & Enterprise)
  {
    id: "fde-role-interest",
    category: "Forward Deployed & Roles",
    question: "What is a Forward Deployed Engineer (FDE) and why are you targeting this role?",
    answer:
      "A Forward Deployed Engineer (FDE) operates directly at the intersection of deep technical engineering and customer impact. Unlike back-office developers isolated from end-users, an FDE embeds with enterprise clients or stakeholders, unpacks ambiguous business requirements, rapidly prototypes custom AI and software solutions in days, and takes direct accountability for hardening and shipping those solutions into production.",
    tags: ["Forward Deployed Engineer", "FDE", "Technical Discovery", "Client Ownership", "Prototyping"],
  },
  {
    id: "fulltime-employment-availability",
    category: "Forward Deployed & Roles",
    question: "Are you actively looking for full-time engineering roles?",
    answer:
      "Yes. I am actively pursuing full-time opportunities as an AI Backend Engineer, AI SDE, Agentic AI Engineer, or Forward Deployed Engineer (FDE). I am open to remote-first engineering teams globally as well as hybrid or on-site roles in India.",
    tags: ["Hiring", "Full-Time", "AI SDE", "AI Backend Engineer", "Remote"],
  },
  {
    id: "fde-customer-ambiguity",
    category: "Forward Deployed & Roles",
    question: "How do you navigate ambiguous client requirements during technical discovery?",
    answer:
      "I lead technical discovery by converting high-level business objectives into concrete technical specifications, data schemas, and edge-case definitions. I build interactive functional prototypes early to validate user assumptions, iterate rapidly based on real user feedback, and establish transparent milestone cadences before investing in large-scale system builds.",
    tags: ["Technical Discovery", "Requirement Scoping", "Agile", "Customer Success"],
  },

  // 7. Background & Contact (Bio, SLAs, Communication)
  {
    id: "who-is-samir-shaikh",
    category: "Background & Contact",
    question: "Who is Samir Shaikh and what is his professional background?",
    answer:
      "Samir Shaikh is an AI-enabled full-stack engineer with a backend-first foundation based in Gujarat, India. He holds a B.Tech in Information Technology from Uka Tarsadia University (2026). His production experience includes engineering at Xira Infotech (delivering a dynamic job portal with Next.js, PostgreSQL, and RBAC) and LOGICWIND (re-engineering microservices and customer engagement pipelines).",
    tags: ["About", "Education", "Experience", "Xira Infotech", "Logicwind"],
  },
  {
    id: "communication-channels-timezone",
    category: "Background & Contact",
    question: "How do we stay in sync during the project and what time zones do you support?",
    answer:
      "I communicate asynchronously through Slack, Discord, or WhatsApp for daily progress updates, supplemented by weekly video calls (Google Meet/Zoom) and recorded Loom video walkthroughs for milestone demos. Based in Gujarat, India, I regularly overlap business hours with clients across the US, UK, Europe, Middle East, and Asia-Pacific.",
    tags: ["Communication", "Slack", "Discord", "Global Time Zones", "Loom Updates"],
  },
  {
    id: "contact-response-sla",
    category: "Background & Contact",
    question: "How can I get in touch with Samir and what is the typical response SLA?",
    answer:
      "You can contact Samir directly via email at shaikh.samir.work@gmail.com, message him on LinkedIn (linkedin.com/in/samirshaikh-dev), or submit an inquiry through the on-site contact form (/contact). He responds to engineering and hiring inquiries within 24 to 48 hours to schedule a free 30-minute discovery call.",
    tags: ["Contact", "Email", "LinkedIn", "Response SLA", "Discovery Call"],
  },
];
