import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import HowIWork from "@/components/HowIWork";
import { APP_URL, AUTHOR_EMAIL } from "@/lib/site-config";
import {
  getServiceJsonLd,
  getSpeakableJsonLd,
  LONGTAIL_KEYWORDS,
} from "@/lib/seo/structured-data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Freelance AI Developer, Website Developer & SEO Services | Samir Shaikh",
  description:
    "Hire Samir Shaikh — freelance AI developer, website developer & SEO specialist. Custom business websites, SEO optimization services, website speed optimization, production AI chatbots, and backend architectures for businesses, startups, and product teams.",
  keywords: [
    ...LONGTAIL_KEYWORDS.slice(0, 15),
    "freelance AI developer",
    "freelance AI engineer",
    "freelance website developer",
    "website developer for business",
    "custom website development",
    "SEO optimization services",
    "freelance SEO specialist",
    "website speed optimization",
    "AI chatbot for website",
    "AI chatbot for SaaS",
    "custom knowledge base AI",
    "custom knowledge base",
    "production-grade AI chatbot",
    "production-grade AI systems",
    "stop chatbot from hallucinating",
    "Forward Deployed Engineer",
    "hire freelance AI developer",
    "hire website developer",
    "AI workflow automation for startups",
    "AI agent development services",
    "backend API development services",
    "full-stack web development services",
    "technical SEO engineer",
  ],
  alternates: {
    canonical: `${APP_URL}/services`,
  },
  openGraph: {
    title: "Freelance AI Developer, Website Developer & SEO Services | Samir Shaikh",
    description:
      "Hire Samir Shaikh — freelance AI developer, website developer & SEO specialist. Custom business websites, SEO optimization services, website speed optimization, production AI chatbots, and backend architectures.",
    url: `${APP_URL}/services`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance AI Developer, Website Developer & SEO Services | Samir Shaikh",
    description:
      "Hire Samir Shaikh — freelance AI developer, website developer & SEO specialist. Custom business websites, SEO optimization services, website speed optimization, production AI chatbots, and backend architectures.",
  },
};

interface ServiceOffering {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  relatedLink?: {
    label: string;
    href: string;
  };
}

interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  services: ServiceOffering[];
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "ai-intelligent-systems",
    title: "AI & Intelligent Systems",
    subtitle: "Turn machine learning models into reliable, production-grade AI chatbots, custom knowledge bases, and automated workflows.",
    services: [
      {
        id: "rag-systems",
        badge: "01 // CUSTOM KNOWLEDGE BASES",
        title: "Custom Knowledge Bases & RAG Systems",
        tagline: "Build a production-grade AI chatbot for your website or SaaS grounded in your company's custom knowledge base.",
        description:
          "Generic AI chatbots hallucinate and give vague answers that frustrate users. We build custom knowledge bases and production-grade RAG pipelines with PostgreSQL pgvector and semantic search — so your AI chatbot answers accurately from your real product data, documentation, and company policies with zero guesswork.",
        deliverables: [
          "Custom knowledge base indexing and document chunking (PDFs, Markdown, and database records)",
          "Vector database pipeline setup with PostgreSQL pgvector and 3072d semantic embeddings",
          "Hallucination mitigation with strict cosine distance filtering and context verification",
          "Turnkey AI chatbot integration for website widgets, SaaS applications, and internal portals",
          "Retrieval accuracy evaluation, latency profiling (<300ms), and automated response guardrails",
        ],
        techStack: ["PostgreSQL", "pgvector", "Gemini Embeddings", "Drizzle ORM", "TypeScript"],
        relatedLink: {
          label: "View RAG Chatbot project →",
          href: "/projects",
        },
      },
      {
        id: "ai-agents",
        badge: "02 // AGENT WORKFLOWS",
        title: "AI Agents & Workflow Automation",
        tagline: "Develop production-grade AI agents that use tools, APIs, and structured outputs to automate multi-step business tasks.",
        description:
          "Move beyond single-turn conversational chatbots into reliable AI workflow automation. We build deterministic agents that query internal APIs, validate inputs with structured schemas, apply guardrails, and execute multi-step workflows safely.",
        deliverables: [
          "Tool-calling architectures and custom API integrations for automated actions",
          "Structured JSON schema validation using Zod for deterministic, parseable output",
          "Input guardrails and graceful fallbacks for unhandled or malicious queries",
          "Multi-turn state management, conversational memory, and task persistence",
          "Testing and CI validation for consistent agentic execution",
        ],
        techStack: ["Vercel AI SDK", "Groq", "Google Gemini", "Node.js", "Zod"],
        relatedLink: {
          label: "Read technical articles →",
          href: "/blogs",
        },
      },
      {
        id: "ai-product-dev",
        badge: "03 // PRODUCT DEVELOPMENT",
        title: "AI Product Development & Integration",
        tagline: "Transform AI concepts into production-ready product features, from discovery and rapid prototypes to database and UI integration.",
        description:
          "Transform an initial AI concept into a working, customer-ready product feature. We handle end-to-end integration across your existing tech stack, database, authentication, and user interface.",
        deliverables: [
          "Technical feasibility assessment and architectural scope definition",
          "Functional MVP and interactive prototype development in rapid sprint cycles",
          "Clean, typed API endpoints connecting AI models to your frontend application",
          "Integration with user authentication, databases, and permission models",
          "Production deployment, monitoring setup, and comprehensive code handover",
        ],
        techStack: ["Next.js", "Node.js", "PostgreSQL", "REST/GraphQL", "Tailwind CSS"],
        relatedLink: {
          label: "Explore recent projects →",
          href: "/projects",
        },
      },
      {
        id: "llm-integration",
        badge: "04 // LLM INTEGRATION",
        title: "LLM Integration & AI User Experiences",
        tagline: "Integrate modern LLMs into applications with low-latency streaming responses, usage controls, and reliable error recovery.",
        description:
          "Incorporate state-of-the-art language models into your existing website or SaaS UI with smooth streaming text, usage controls, token observability, and provider failover strategies.",
        deliverables: [
          "Low-latency streaming responses via Vercel AI SDK with zero UI blocking",
          "Context window management and prompt assembly workflows",
          "Rate limiting, token usage tracking, and cost control safeguards",
          "Secure API key handling and multi-provider failover strategies",
          "Conversational state persistence across user sessions and devices",
        ],
        techStack: ["Vercel AI SDK", "Next.js App Router", "Groq", "Gemini 2.0", "TypeScript"],
        relatedLink: {
          label: "Test the portfolio AI assistant →",
          href: "/projects",
        },
      },
    ],
  },
  {
    id: "backend-architecture",
    title: "Backend & Distributed Architecture",
    subtitle: "High-throughput APIs, asynchronous job queues, and rock-solid system design built for scale.",
    services: [
      {
        id: "backend-apis",
        badge: "05 // BACKEND ARCHITECTURE",
        title: "Production Backend APIs & System Design",
        tagline: "Design and build reliable backend systems, REST/GraphQL APIs, authentication, database architecture, caching, and performance improvements.",
        description:
          "Deliver dependable server-side systems that handle business logic cleanly, with strict TypeScript types, optimized database queries, and secure access controls.",
        deliverables: [
          "Modular RESTful and GraphQL API design and implementation",
          "Relational and document database schema design (PostgreSQL, MongoDB)",
          "Authentication, authorization, and RBAC (NextAuth, OAuth, JWT)",
          "Redis caching layer implementation for hot query paths",
          "Database query profiling, index optimization, and latency tuning",
        ],
        techStack: ["Node.js", "Express.js", "NestJS", "PostgreSQL", "Redis", "TypeScript"],
        relatedLink: {
          label: "See production API projects →",
          href: "/projects",
        },
      },
      {
        id: "event-driven",
        badge: "06 // ASYNC SYSTEMS",
        title: "Event-Driven Systems & Background Processing",
        tagline: "Build scalable asynchronous workflows using queues, event-driven architecture, scheduled jobs, and distributed processing.",
        description:
          "Keep your critical user journeys fast and responsive by offloading heavy, non-blocking tasks to reliable queue-based worker pipelines.",
        deliverables: [
          "Asynchronous background job processing with BullMQ and Redis",
          "Event-driven message architecture and decoupled worker services",
          "Scheduled cron jobs, report generation, and transactional webhooks",
          "Retry strategies, idempotency handling, and dead-letter queues",
          "Worker failure monitoring and backpressure management",
        ],
        techStack: ["BullMQ", "Redis", "Apache Kafka", "Docker", "Node.js"],
        relatedLink: {
          label: "Read event-driven guides →",
          href: "/blogs",
        },
      },
      {
        id: "cloud-devops",
        badge: "07 // DEVOPS & OBSERVABILITY",
        title: "Cloud, DevOps & Observability",
        tagline: "Containerize applications and establish CI/CD, logging, monitoring, metrics, tracing, and production reliability practices.",
        description:
          "Ensure your backend applications run reliably across development, staging, and production environments with automated deployment and clear visibility.",
        deliverables: [
          "Production containerization with Docker and Docker Compose",
          "Automated CI/CD pipelines with GitHub Actions (linting, testing, builds)",
          "Structured logging, error tracking, and health-check endpoints",
          "Tracing and telemetry with OpenTelemetry, Prometheus, and Grafana",
          "Environment configuration and production deployment assistance",
        ],
        techStack: ["Docker", "GitHub Actions", "OpenTelemetry", "Prometheus", "Vercel"],
        relatedLink: {
          label: "Review technical resume →",
          href: "/resume",
        },
      },
    ],
  },
  {
    id: "web-growth",
    title: "Web Development & Search Growth",
    subtitle: "High-converting business websites, custom web apps, and search engine optimization (SEO) that turn visitors into paying customers.",
    services: [
      {
        id: "custom-websites",
        badge: "08 // WEBSITE DEVELOPMENT",
        title: "Custom Website Development & Landing Pages",
        tagline: "Build fast, modern, and mobile-responsive business websites and high-converting landing pages with Next.js, React, and Tailwind CSS.",
        description:
          "Need a new website or a high-converting landing page for your business? We design and develop custom, lightning-fast websites using Next.js, React, and Tailwind CSS. No bloated WordPress themes, no slow page builders — just clean, secure, and easily maintainable websites tailored to your brand.",
        deliverables: [
          "Custom business websites, corporate pages, and modern portfolio platforms",
          "High-converting SaaS and marketing landing pages built for lead generation",
          "100% mobile-responsive design that looks stunning on phones, tablets, and desktops",
          "CMS integration (Sanity, Strapi, or custom admin panel) for easy non-technical content updates",
          "Contact form setup, email notification alerts, and Google Analytics tracking",
        ],
        techStack: ["Next.js 16", "React 19", "Tailwind CSS", "TypeScript", "Vercel"],
        relatedLink: {
          label: "Explore website projects →",
          href: "/projects",
        },
      },
      {
        id: "seo-services",
        badge: "09 // SEO SERVICES",
        title: "SEO Services & Search Engine Optimization",
        tagline: "Rank higher on Google, get cited by AI answer engines (AEO/GEO), and drive organic traffic that converts.",
        description:
          "Struggling to get found on Google? We provide end-to-end SEO services covering technical SEO audits, keyword optimization, metadata architecture, Schema.org rich snippets, and Generative Engine Optimization (GEO/AEO) so your website is discovered by both traditional searchers and AI tools like ChatGPT and Perplexity.",
        deliverables: [
          "Complete website SEO audit identifying crawl errors, indexation issues, and content gaps",
          "On-page SEO optimization: meta titles, descriptions, semantic headings, and keyword mapping",
          "Schema.org JSON-LD structured data implementation for Google rich snippets",
          "Generative Engine Optimization (GEO/AEO) for citations in Perplexity and ChatGPT search",
          "XML sitemaps, robots.txt hygiene, canonical URL setup, and Google Search Console indexing",
        ],
        techStack: ["Schema.org JSON-LD", "Google Search Console", "Next.js Metadata", "AEO/GEO", "Web Vitals"],
        relatedLink: {
          label: "Read SEO guides & reports →",
          href: "/blogs",
        },
      },
      {
        id: "website-speed-optimization",
        badge: "10 // SPEED & PERFORMANCE",
        title: "Website Redesign & Speed Optimization",
        tagline: "Transform outdated, slow-loading websites into fast, high-ranking, and modern digital experiences.",
        description:
          "Slow websites lose 40%+ of visitors before the page even loads. We redesign clunky websites and optimize existing codebases to score 90+ on Google PageSpeed Insights, ace Core Web Vitals (LCP, CLS, INP), and deliver silky-smooth user experiences that keep customers engaged.",
        deliverables: [
          "Complete website redesign with modern UI/UX, typography, and dark/light themes",
          "Google PageSpeed and Core Web Vitals optimization (improving LCP, CLS, and INP)",
          "Image compression, asset lazy-loading, and Cloudinary CDN optimization",
          "Code splitting, JavaScript bundle reduction, and browser caching strategy",
          "Accessibility (WCAG) compliance and cross-browser responsiveness testing",
        ],
        techStack: ["Core Web Vitals", "Lighthouse", "Cloudinary CDN", "Tailwind CSS", "PageSpeed"],
        relatedLink: {
          label: "Review performance benchmarks →",
          href: "/projects",
        },
      },
      {
        id: "full-stack-web",
        badge: "11 // CUSTOM WEB APPLICATIONS",
        title: "Full-Stack Web Application Development",
        tagline: "Custom web apps, customer portals, and admin dashboards built with Next.js, React, and robust backend APIs.",
        description:
          "When an off-the-shelf website isn't enough, we build custom web applications. From customer portals and booking systems to role-based SaaS dashboards, we deliver scalable full-stack applications with secure authentication and database architectures.",
        deliverables: [
          "Custom web applications, customer portals, and internal business tools",
          "Role-based access control (RBAC), user authentication, and profile management",
          "Payment gateway integrations (Stripe, Razorpay) and subscription billing",
          "RESTful and GraphQL API connections with PostgreSQL or MongoDB databases",
          "Automated deployment pipelines, testing, and production monitoring",
        ],
        techStack: ["Next.js 16", "React 19", "Node.js", "PostgreSQL", "Drizzle ORM"],
        relatedLink: {
          label: "Explore web projects →",
          href: "/projects",
        },
      },
    ],
  },
  {
    id: "ai-accelerated-engineering",
    title: "AI-Accelerated Engineering",
    subtitle: "Agent-assisted development workflow that ships production-ready code fast — without cutting corners on quality, security, or testing.",
    services: [
      {
        id: "ai-assisted-workflow",
        badge: "12 // AI-ACCELERATED DELIVERY",
        title: "AI-Accelerated Engineering",
        tagline: "Ship faster with Cursor, Claude Code, and GitHub Copilot — while keeping critical logic, security, and testing firmly in hand.",
        description:
          "AI coding agents accelerate delivery of boilerplate, repetitive patterns, and scaffolding so engineering time goes to what matters most: architecture decisions, business logic, security review, and test coverage. The result is a production-safe codebase that moves at startup speed — without the AI slop.",
        deliverables: [
          "Agent-assisted code generation for boilerplate, tests, and repetitive patterns",
          "Manual ownership of all critical logic, auth flows, and security-sensitive code",
          "Test coverage written and validated by a human engineer, not AI-generated blindly",
          "CI gate integration to catch regressions introduced by generated code",
          "Code review process that distinguishes AI-assisted sections from hand-crafted logic",
        ],
        techStack: ["Cursor", "Claude Code", "GitHub Copilot", "TypeScript", "CI/CD"],
        relatedLink: {
          label: "Explore projects built this way →",
          href: "/projects",
        },
      },
    ],
  },
];

const PROCESS_STEPS = [
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

const ENGAGEMENT_MODELS = [
  {
    title: "Startup MVP & Feature Sprints",
    badge: "High Velocity",
    subtitle: "For early-stage startups and founders looking for a freelance AI developer or full-stack engineer to ship quickly.",
    highlights: [
      "Fixed-scope freelance sprints (1 to 4 weeks)",
      "Production-grade AI chatbot, custom knowledge base, web app, or API",
      "Direct technical collaboration with founders & CTOs",
      "Production-ready deployment, tests & clean code handover",
    ],
  },
  {
    title: "Contract & Dedicated Collaboration",
    badge: "Flexible Scope",
    subtitle: "For growing product teams needing dedicated freelance backend, full-stack, or AI development services.",
    highlights: [
      "Flexible freelance contract or monthly retainer partnership",
      "Seamless integration into your existing codebase & team rituals",
      "Backend architecture, query tuning, and API design",
      "Collaborative code reviews, testing & thorough documentation",
    ],
  },
  {
    title: "Forward Deployed Engineering & Remote Roles",
    badge: "Embedded / Long Term",
    subtitle: "For teams seeking an embedded Forward Deployed Engineer (FDE) or high-impact remote AI backend engineer.",
    highlights: [
      "Forward Deployed Engineer (FDE) / AI Backend Engineer / AI SDE",
      "Direct customer immersion, rapid prototyping & enterprise deployment",
      "Fluent in async communication across US, UK, and European timezones",
      "Immediate availability for contract sprints or full-time remote roles",
    ],
  },
];

const SERVICES_FAQS = [
  {
    question: "How do you work with startups as a freelance engineer or contractor?",
    answer:
      "I operate with a low-friction, high-transparency workflow tailored for startup velocity: (1) Sprint-based feature delivery with clearly defined milestone scopes (1 to 4 weeks), (2) Direct async communication via Slack/Discord and weekly syncs, (3) Clean Git workflows with PRs, automated CI checks, and comprehensive documentation, and (4) Immediate code handover directly into your private GitHub or GitLab repositories.",
  },
  {
    question: "What is your availability for freelance or contract engineering projects?",
    answer:
      "I am actively available for new freelance sprints, contract collaborations, and technical advisory. Depending on current project commitments, I can typically onboard and begin shipping production code within 3 to 7 business days following an initial discovery call.",
  },
  {
    question: "How do you stop an AI chatbot from hallucinating?",
    answer:
      "To stop an AI chatbot from hallucinating, we implement a production-grade RAG pipeline: (1) Semantic chunking and vector indexing of your verified documentation and company data using PostgreSQL pgvector, (2) Strict cosine distance thresholds (<= 0.5) so irrelevant context is filtered out, (3) Grounded prompt templates that instruct the model to cite verified data and decline ungrounded questions, and (4) Graceful fallback handling with transparent handoffs when information is missing.",
  },
  {
    question: "Can you build an AI chatbot for my website or SaaS using our custom knowledge base?",
    answer:
      "Yes. We build production-grade AI chatbots tailored for websites and SaaS platforms connected directly to your proprietary knowledge base (PDFs, Markdown, FAQs, Notion pages, or SQL databases). The chatbot retrieves verified company data in real time, answers customer inquiries accurately without hallucinating, and integrates cleanly as an embeddable widget or backend API. Typical delivery ranges from 1 to 3 weeks.",
  },
  {
    question: "What makes an AI chatbot or RAG system 'production-grade'?",
    answer:
      "A production-grade AI system differs fundamentally from a quick proof-of-concept wrapper: (1) Deterministic grounding with strict relevance thresholds and hallucination defenses, (2) Sub-300ms vector retrieval and low-latency streaming responses, (3) Robust rate limiting, token usage tracking, and cost safeguards, (4) In-memory session security and abuse prevention, and (5) Comprehensive test coverage, CI/CD deployment pipelines, and structured error boundaries.",
  },
  {
    question: "What is a Forward Deployed Engineer and when should my team hire one?",
    answer:
      "A Forward Deployed Engineer (FDE) bridges the gap between deep software engineering and direct customer immersion. Unlike traditional developers isolated behind tickets, an FDE embeds directly with stakeholders or enterprise clients, conducts technical discovery on ambiguous requirements, rapidly builds and validates prototypes, and hardens the solution for production deployment. Hire an FDE when deploying high-stakes AI features or integrating custom software into client workflows.",
  },
  {
    question: "Why hire a freelance AI developer instead of using an off-the-shelf chatbot tool?",
    answer:
      "Off-the-shelf chatbot builders often store your data on shared third-party servers, charge recurring monthly per-seat or per-message markups, offer limited customization, and struggle with complex company workflows. Hiring a freelance AI developer gives you 100% code and data ownership, zero recurring software platform fees, tailored retrieval algorithms optimized for your specific data schema, and seamless integration into your existing authentication and backend systems.",
  },
  {
    question: "Can you build both the backend and frontend for our web application?",
    answer:
      "Yes. We specialize in full-stack web applications using Next.js, React, TypeScript, and Tailwind CSS on the frontend, combined with Node.js, PostgreSQL, and Redis on the backend. This gives you a cohesive, single-engineer velocity without coordination bottlenecks.",
  },
  {
    question: "What is your typical project timeline?",
    answer:
      "For targeted prototypes or specific feature integrations, initial working versions are typically delivered in 1 to 2 weeks. Full-scale web applications, backend architectures, and production integrations typically range from 3 to 6 weeks depending on project complexity.",
  },
  {
    question: "Can you build a custom website for my business or brand?",
    answer:
      "Yes. We design and develop custom, responsive websites tailored specifically for businesses, founders, consultants, and brands. Whether you need a multi-page corporate website, a high-converting SaaS landing page, or a personal portfolio, we deliver blazing-fast Next.js websites with clean styling, contact forms, lead capture, and easy CMS content updates.",
  },
  {
    question: "What do your SEO services include and how do they help my website rank?",
    answer:
      "Our SEO services focus on technical accuracy and measurable search visibility: (1) In-depth technical SEO audits to resolve crawl errors, redirect loops, and indexation issues, (2) Keyword mapping and on-page optimization for titles, meta descriptions, and semantic headings, (3) Schema.org structured data (Organization, FAQPage, Service) for Google rich snippets, (4) Google Core Web Vitals profiling for speed, and (5) Generative Engine Optimization (GEO/AEO) so AI answer engines like ChatGPT and Perplexity find and cite your content.",
  },
  {
    question: "Why should I hire a custom website developer instead of using WordPress or Wix?",
    answer:
      "Generic website builders and WordPress templates often come with bloated code, slow loading times, security vulnerabilities from outdated plugins, and rigid design limitations. A custom Next.js website gives you near-instant load speeds (95+ on Google PageSpeed), superior Google search rankings, zero ongoing plugin subscription fees, complete design uniqueness, and the ability to seamlessly add custom AI or backend features whenever your business grows.",
  },
  {
    question: "Can you work with our existing tech stack and codebase?",
    answer:
      "Yes. Whether you are using Next.js, React, Node.js, Express, NestJS, or PostgreSQL, we integrate cleanly into your existing codebase, repository, and database without requiring disruptive rewrites.",
  },
  {
    question: "Who owns the code and intellectual property?",
    answer:
      "You retain 100% ownership of all code, architecture specifications, configurations, and documentation created during the engagement. Everything is committed directly to your private repositories.",
  },
  {
    question: "How do we get started?",
    answer:
      "The fastest path: email shaikh.samir.work@gmail.com or use the Contact page with a brief summary of what you need — what you're building, your stack, and your timeline. I reply within 24 hours to schedule a short discovery call, after which I provide a clear scope and timeline proposal, typically within 48 hours.",
  },
];

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

  return (
    <main className="flex flex-col flex-1 px-6 pb-24 md:px-10">
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

      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto w-full pt-6 md:pt-10">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
          ]}
        />
      </div>

      {/* Header */}
      <div className="max-w-6xl mx-auto w-full">
        <PageHeader
          title="Freelance AI & Engineering Services"
          subtitle="Production-grade AI chatbots, custom knowledge bases, backend architectures, and modern web apps — built for startups, founders, and product teams ready to ship."
        />

        {/* Hero Value Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-border-primary bg-card-bg p-6 md:p-10 mb-16 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-wider text-green-600 dark:text-green-400 font-semibold bg-green-500/10 border border-green-500/30 px-2.5 py-1 rounded-full inline-block mb-3">
                ● Available for Freelance Projects, Contracts & Forward Deployed Roles
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-3">
                Ship production-grade software that drives real business results.
              </h2>
              <p className="service-desc text-text-muted text-base leading-relaxed">
                I help startups, business owners, and engineering teams build and ship custom business websites, comprehensive SEO services, and production-grade AI features — custom knowledge bases, AI chatbots for websites and SaaS, AI agents, and workflow automation — alongside high-performance Node.js/TypeScript backend systems and web speed optimization. Available as a freelance developer, SEO consultant, or Forward Deployed Engineer.
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-foreground text-background font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Discuss a Project
              </Link>
              <a
                href={`mailto:${AUTHOR_EMAIL}`}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border-primary bg-background text-foreground font-medium text-sm hover:bg-hover-bg transition-colors"
              >
                Email Directly
              </a>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-20 space-y-20">
          {SERVICE_CATEGORIES.map((category, catIdx) => (
            <div key={category.id} id={category.id}>
              {/* Category Header */}
              <div className="mb-8 pb-4 border-b border-border-primary">
                <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                  CATEGORY {String(catIdx + 1).padStart(2, "0")}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mt-1">
                  {category.title}
                </h2>
                <p className="text-sm text-text-muted mt-1.5 max-w-2xl">
                  {category.subtitle}
                </p>
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.services.map((service) => (
                  <div
                    key={service.id}
                    id={service.id}
                    className="group flex flex-col justify-between rounded-xl border border-border-primary bg-card-bg p-6 md:p-8 hover:border-border-secondary transition-all duration-200"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-[11px] font-semibold text-text-muted tracking-wider">
                          {service.badge}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs font-mono text-text-secondary mb-4 italic">
                        {service.tagline}
                      </p>
                      <p className="text-sm text-text-muted leading-relaxed mb-6">
                        {service.description}
                      </p>

                      <div className="mb-6">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-2.5">
                          Key Deliverables
                        </h4>
                        <ul className="space-y-2">
                          {service.deliverables.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-text-muted">
                              <span className="text-green-500 font-bold mt-0.5">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border-primary/60 mb-4">
                        {service.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[11px] px-2 py-0.5 rounded bg-background border border-border-primary text-text-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {service.relatedLink && (
                        <Link
                          href={service.relatedLink.href}
                          className="text-xs font-mono font-medium text-foreground hover:underline inline-flex items-center gap-1"
                        >
                          {service.relatedLink.label}
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 4-Stage Delivery Process */}
        <div className="mb-20">
          <div className="mb-8">
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
              HOW WE WORK TOGETHER
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mt-1">
              Engineering Delivery Process
            </h2>
            <p className="text-sm text-text-muted mt-2 max-w-2xl">
              A structured, low-friction engineering process designed to eliminate ambiguity and deliver dependable software.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="rounded-xl border border-border-primary bg-card-bg p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-2xl font-bold text-text-secondary/40 block mb-3">
                    {step.step}
                  </span>
                  <h3 className="text-base font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Models */}
        <div className="mb-20">
          <div className="mb-8">
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
              FLEXIBLE COLLABORATION
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mt-1">
              Engagement Models
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ENGAGEMENT_MODELS.map((model) => (
              <div
                key={model.title}
                className="rounded-xl border border-border-primary bg-card-bg p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded border border-border-primary text-text-muted inline-block mb-3">
                    {model.badge}
                  </span>
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    {model.title}
                  </h3>
                  <p className="text-xs text-text-muted mb-6">
                    {model.subtitle}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {model.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-text-muted">
                        <span className="text-foreground font-bold mt-0.5">▪</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className="w-full text-center py-2 px-4 rounded-lg border border-border-primary bg-background hover:bg-hover-bg text-xs font-mono font-medium text-foreground transition-colors"
                >
                  Inquire Now →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* How I Work */}
        <div className="mb-20">
          <HowIWork variant="full" />
        </div>

        {/* Services FAQ */}
        <div className="mb-20">
          <div className="mb-8">
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
              QUESTIONS & ANSWERS
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="divide-y divide-border-primary border-y border-border-primary">
            {SERVICES_FAQS.map((faq, idx) => (
              <div key={idx} className="py-6">
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Banner */}
        <div className="rounded-2xl border border-border-primary bg-card-bg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-3">
            Have a project or opportunity in mind?
          </h2>
          <p className="text-text-muted text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Whether you need a production-grade AI chatbot for your website or SaaS, a custom knowledge base, scalable backend APIs, or full-stack web engineering, let&apos;s talk through your goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3 rounded-lg bg-foreground text-background font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </Link>
            <Link
              href="/resume"
              className="w-full sm:w-auto px-8 py-3 rounded-lg border border-border-primary bg-background text-foreground font-medium text-sm hover:bg-hover-bg transition-colors"
            >
              View Full Resume
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
