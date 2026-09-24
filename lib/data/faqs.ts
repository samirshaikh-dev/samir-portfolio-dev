export type FAQCategory =
  | "Pricing & Payment"
  | "Process & Timeline"
  | "Trust & Guarantees"
  | "AI & RAG Systems"
  | "Backend & Architecture"
  | "Forward Deployed & Roles"
  | "Background & Contact"
  | "Local SEO & Digital Marketing"
  | "Web Design & Business Websites"
  | "WhatsApp & Business Automation";

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

  {
    id: "non-technical-founder-friendly",
    category: "Pricing & Payment",
    question: "I'm a non-technical founder — can you translate my business idea into a working product without me understanding the code?",
    answer:
      "Absolutely. A significant portion of my clients are non-technical founders and business owners. I translate business objectives into clear technical specifications using plain-language milestone documents, visual wireframes, and Loom video walkthroughs at every stage. You review working demos on a staging URL — no code review required, ever.",
    tags: ["Non-Technical Founder", "Business Idea to Product", "No-Code Communication", "Startup MVP", "Plain Language Specs"],
  },
  {
    id: "freelancer-vs-agency",
    category: "Pricing & Payment",
    question: "Why hire a freelance engineer instead of a software agency?",
    answer:
      "Hiring a freelance engineer gives you direct access to the senior engineer writing your code — not a project manager who relays specs to a junior team offshore. This means faster decisions, lower overhead cost (typically 40–60% less than agencies), zero account management layers, and a single accountable professional who understands your full technical stack from day one.",
    tags: ["Freelancer vs Agency", "Direct Engineering Access", "Cost Comparison", "Senior Developer", "No Middleman"],
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
  {
    id: "collaborate-with-inhouse-team",
    category: "Process & Timeline",
    question: "Can you work alongside our existing in-house engineering team or current tech stack?",
    answer:
      "Yes, I integrate smoothly into existing teams and codebases. Whether contributing as an embedded specialist on a specific feature, reviewing architecture decisions, or owning an independent microservice, I follow your team's Git workflow, PR review process, and coding standards with zero friction. I've collaborated with cross-functional teams using Jira, Linear, Notion, and Slack.",
    tags: ["Team Collaboration", "Embedded Engineer", "Existing Codebase", "PR Reviews", "Jira Linear Slack"],
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

  {
    id: "project-continuity-availability",
    category: "Trust & Guarantees",
    question: "What happens to my project if you become unavailable mid-engagement?",
    answer:
      "Project continuity is protected through three layers: continuous Git commits with descriptive messages, living technical documentation updated at every milestone, and a fully documented handover package (README, architecture diagrams, env variable guide, deployment runbook). Any competent engineer can onboard in under a day, ensuring your project is never held hostage to a single point of failure.",
    tags: ["Project Continuity", "Risk Mitigation", "Handover Documentation", "Git History", "Single Point of Failure"],
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

  {
    id: "ai-model-selection-guidance",
    category: "AI & RAG Systems",
    question: "How do you choose the right AI model (GPT-4, Gemini, Claude, LLaMA) for a specific use case?",
    answer:
      "Model selection is driven by four factors: task complexity (reasoning depth vs. pattern matching), latency requirements (streaming chat vs. batch processing), cost per token at production scale, and data privacy constraints (cloud-hosted vs. locally-hosted open-source models). For most production RAG and chatbot applications, I recommend a hybrid: Gemini embeddings for retrieval with Groq-hosted LLaMA 3.3 for fast streaming inference — delivering sub-second responses at a fraction of GPT-4 costs.",
    tags: ["AI Model Selection", "GPT-4 vs Gemini", "LLaMA 3.3", "Groq", "Model Comparison", "LLM Cost Optimization"],
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

  // 8. Local SEO & Digital Marketing
  {
    id: "what-is-local-seo-vapi",
    category: "Local SEO & Digital Marketing",
    question: "What is Local SEO and why does my business in Vapi, Daman, or Silvassa need it?",
    answer:
      "Local SEO is the process of optimizing your business to appear prominently in Google search results and Google Maps when nearby customers search for your services. For businesses in Vapi, Daman, Silvassa, and the surrounding industrial and commercial belt, Local SEO is the highest-ROI digital investment — it puts your business in front of customers who are actively ready to buy, not just browsing.",
    tags: ["Local SEO", "Local SEO Vapi", "Google Maps Ranking", "Local Business SEO", "SEO Daman", "SEO Silvassa", "Gujarat SEO"],
  },
  {
    id: "google-business-profile-optimization",
    category: "Local SEO & Digital Marketing",
    question: "How do I get my business to appear on Google search and Google Maps?",
    answer:
      "The foundation is a fully optimized Google Business Profile (GBP) — with accurate NAP (name, address, phone), business category, service areas, photos, and regular posts. Beyond GBP, consistent local citations, structured LocalBusiness schema markup on your website, and location-specific landing pages drive sustained Google Maps and local pack visibility for your business.",
    tags: ["Google Business Profile", "Google Maps", "GBP Optimization", "Local Pack Ranking", "NAP Consistency", "Local Citations"],
  },
  {
    id: "local-seo-timeline-results",
    category: "Local SEO & Digital Marketing",
    question: "How long does Local SEO take to show results for a small business?",
    answer:
      "Most local businesses begin seeing measurable improvements in Google Maps visibility and organic local rankings within 60 to 90 days of consistent optimization. The fastest wins come from completing your Google Business Profile, fixing NAP inconsistencies, and adding LocalBusiness schema markup. Full competitive local rankings for high-intent service keywords typically develop within 3 to 6 months.",
    tags: ["SEO Timeline", "How Long Does SEO Take", "Local SEO Results", "SEO for Small Business", "Google Maps Ranking Time"],
  },
  {
    id: "local-seo-for-industries-vapi",
    category: "Local SEO & Digital Marketing",
    question: "Do restaurants, clinics, hotels, and manufacturers in Vapi need SEO?",
    answer:
      "Absolutely. Every local business — from restaurants and multi-specialty hospitals to chemical manufacturers, CA firms, and event planners — benefits from Local SEO. When a customer in Vapi, Pardi, Umargam, or Silvassa searches for your service, a well-optimized business appears in the Google Maps local pack and organic results ahead of competitors who haven't invested in local visibility.",
    tags: ["SEO for Restaurants", "SEO for Clinics", "SEO for Hotels", "SEO for Manufacturers", "Local SEO Vapi", "Vapi Business Marketing"],
  },
  {
    id: "digital-marketing-services-vapi",
    category: "Local SEO & Digital Marketing",
    question: "What digital marketing services do you provide for businesses in Vapi and Gujarat?",
    answer:
      "I provide end-to-end digital marketing services tailored to local businesses: Local SEO and Google Business Profile optimization, business website development, technical SEO audits, WhatsApp Business automation, social media content strategy, and Google Ads campaign setup. Services are designed to generate real customer inquiries — not just traffic metrics — for businesses across Vapi, Daman, Silvassa, Umargam, Sarigam, Bhilad, and the surrounding GIDC industrial belt.",
    tags: ["Digital Marketing Vapi", "Digital Marketing Gujarat", "SEO Services Vapi", "Online Marketing", "Google Ads", "Local Business Marketing"],
  },

  // 9. Web Design & Business Websites
  {
    id: "business-website-cost-india",
    category: "Web Design & Business Websites",
    question: "How much does a business website cost in India for a small business or local shop?",
    answer:
      "A professional business website in India typically costs between ₹15,000 and ₹50,000 for a clean, mobile-friendly 5 to 8-page website — covering homepage, services, about, contact, and a blog. Full-stack web applications with booking systems, admin panels, or e-commerce functionality range from ₹50,000 to ₹2,00,000+ depending on feature complexity. Every project includes a fixed-price quote with zero surprise billing.",
    tags: ["Business Website Cost India", "Website Development Cost", "Web Design Price India", "Affordable Website", "Website Cost Gujarat", "Small Business Website"],
  },
  {
    id: "does-local-business-need-website",
    category: "Web Design & Business Websites",
    question: "Does my local business or shop in Vapi need a website in 2025?",
    answer:
      "Yes — a website is the single most credible digital asset a local business can own. Customers searching for restaurants, clinics, salons, automobile dealers, CA firms, and retail shops in Vapi, Daman, and Silvassa consistently check websites before making a purchase or booking decision. A professional website with Local SEO gives you 24/7 visibility and a platform for customer inquiries, bookings, and portfolio display — independently of any social media platform.",
    tags: ["Does My Business Need a Website", "Local Business Website", "Business Website Vapi", "Why Have a Website", "Online Presence", "Small Business Website India"],
  },
  {
    id: "website-development-timeline",
    category: "Web Design & Business Websites",
    question: "How long does it take to build a professional business website?",
    answer:
      "A professional 5 to 8-page business website is typically delivered in 7 to 14 business days. More complex builds with booking/appointment systems, e-commerce, admin dashboards, or multi-language support take 3 to 6 weeks. All projects are managed with clear milestone demos on a live staging URL so you can review progress before final delivery.",
    tags: ["Website Development Timeline", "How Long to Build Website", "Website Delivery Time", "Fast Website Development", "Business Website India"],
  },
  {
    id: "website-redesign-existing",
    category: "Web Design & Business Websites",
    question: "Can you redesign my existing outdated website or migrate it from WordPress?",
    answer:
      "Yes, I specialize in modernizing outdated websites and migrating from slow WordPress or Wix sites to high-performance Next.js builds. A redesign typically includes mobile-first responsive layouts, sub-second Core Web Vitals scores, integrated Local SEO, and a clean CMS for your team to update content without touching code. You retain 100% ownership of the final codebase.",
    tags: ["Website Redesign", "WordPress Migration", "Modernize Website", "Website Revamp", "Wix to Next.js", "Website Performance"],
  },
  {
    id: "website-for-industry-types",
    category: "Web Design & Business Websites",
    question: "Can you build websites for restaurants, hospitals, manufacturers, and service businesses?",
    answer:
      "Yes — I design and develop professional websites across all local business categories: restaurant and hotel websites with menu and booking integration, clinic and hospital websites with appointment forms, manufacturing and B2B company profiles, retail and e-commerce storefronts, CA and legal firm websites, event management portfolios, real estate listings, and education institute pages. Every website is built mobile-first and SEO-ready from day one.",
    tags: ["Restaurant Website", "Hospital Website", "Manufacturer Website", "Clinic Website", "Business Website Design", "Industry Website India"],
  },

  // 10. WhatsApp & Business Automation
  {
    id: "what-is-whatsapp-automation",
    category: "WhatsApp & Business Automation",
    question: "What is WhatsApp Business automation and how can it help my business?",
    answer:
      "WhatsApp Business automation uses the official WhatsApp Business API to send automated replies, appointment confirmations, order updates, promotional messages, and lead follow-ups — without manual effort. For businesses in industries like restaurants, clinics, retail, logistics, and hospitality, WhatsApp automation reduces response time to seconds, increases customer retention, and eliminates missed inquiry leads 24/7.",
    tags: ["WhatsApp Automation", "WhatsApp Business API", "WhatsApp Bot", "Business Automation", "Customer Engagement Automation", "WhatsApp Marketing"],
  },
  {
    id: "whatsapp-automation-use-cases",
    category: "WhatsApp & Business Automation",
    question: "Which types of businesses in Vapi can benefit from WhatsApp automation?",
    answer:
      "WhatsApp automation delivers measurable ROI for virtually every local business category: restaurants sending daily menus and order confirmations, clinics automating appointment reminders and reports, hotels managing booking inquiries, retail shops sending restock alerts, logistics companies tracking delivery updates, real estate agencies sharing property listings, and event planners coordinating guest communication — all without a single manual reply.",
    tags: ["WhatsApp for Restaurants", "WhatsApp for Clinics", "WhatsApp for Hotels", "WhatsApp Automation Vapi", "WhatsApp Business India", "Automated Replies"],
  },
  {
    id: "whatsapp-automation-cost",
    category: "WhatsApp & Business Automation",
    question: "How much does WhatsApp Business automation cost for a small business in India?",
    answer:
      "WhatsApp Business automation setup typically costs between ₹10,000 and ₹40,000 depending on the number of automated flows, integration complexity (CRM, booking system, payment gateway), and conversation volume. The WhatsApp Business API has per-conversation pricing through Meta — most small businesses with moderate message volumes spend ₹500 to ₹3,000/month on API costs. I provide a full cost breakdown before starting any automation project.",
    tags: ["WhatsApp Automation Cost", "WhatsApp API Price India", "Business Automation Cost", "WhatsApp Business Setup", "WhatsApp Chatbot Cost India"],
  },
  {
    id: "whatsapp-automation-integration",
    category: "WhatsApp & Business Automation",
    question: "Can WhatsApp automation be connected to my existing website, CRM, or booking system?",
    answer:
      "Yes — WhatsApp automation integrates with your existing website contact forms, booking systems, CRMs (Zoho, HubSpot, custom), Google Sheets, and payment gateways via the WhatsApp Business API and webhooks. When a customer fills your website contact form or makes a booking, they automatically receive a WhatsApp confirmation — and your team gets an instant notification — without manual intervention.",
    tags: ["WhatsApp CRM Integration", "WhatsApp Webhook", "WhatsApp API Integration", "WhatsApp Booking System", "Automated Lead Follow-up"],
  },
];
