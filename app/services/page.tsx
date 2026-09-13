import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { APP_URL, AUTHOR_EMAIL } from "@/lib/site-config";
import {
  getServiceJsonLd,
  getSpeakableJsonLd,
  LONGTAIL_KEYWORDS,
} from "@/lib/seo/structured-data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Engineering Services | Samir Shaikh — Backend, AI & Web Development",
  description:
    "Reliable AI systems, knowledge retrieval pipelines, production backend APIs, modern web applications, and technical SEO built for startups, founders, and product teams.",
  keywords: [
    ...LONGTAIL_KEYWORDS.slice(0, 15),
    "RAG systems services",
    "AI agent development",
    "backend API development",
    "full-stack web development services",
    "technical SEO engineer",
    "event-driven microservices",
    "freelance web developer",
  ],
  alternates: {
    canonical: `${APP_URL}/services`,
  },
  openGraph: {
    title: "Engineering Services | Samir Shaikh — Backend, AI & Web Development",
    description:
      "Reliable AI systems, knowledge retrieval pipelines, production backend APIs, modern web applications, and technical SEO built for startups, founders, and product teams.",
    url: `${APP_URL}/services`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Services | Samir Shaikh — Backend, AI & Web Development",
    description:
      "Reliable AI systems, knowledge retrieval pipelines, production backend APIs, modern web applications, and technical SEO built for startups, founders, and product teams.",
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
    subtitle: "Turn machine learning models into reliable, grounded, and tool-using product capabilities.",
    services: [
      {
        id: "rag-systems",
        badge: "01 // KNOWLEDGE RETRIEVAL",
        title: "RAG Systems & Knowledge Retrieval",
        tagline: "Build grounded AI systems with vector search, embeddings, document retrieval, and relevance-focused responses.",
        description:
          "Help users query your proprietary documents and knowledge bases accurately. We implement vector search with embedding models and relevance filtering so responses stay grounded in your real-world data.",
        deliverables: [
          "Vector database indexing and embedding pipeline setup",
          "Document parsing, semantic chunking, and metadata tagging",
          "Relevance filtering and context assembly to minimize hallucination risks",
          "Integration into chat interfaces, Q&A search, and internal tools",
          "Performance evaluation against real-world test queries and user inputs",
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
        title: "AI Agents & Tool Orchestration",
        tagline: "Develop AI workflows that use tools, APIs, structured outputs, and guardrails to automate multi-step tasks.",
        description:
          "Move beyond single-turn chatbots into automated multi-step workflows. We build agents that query internal APIs, validate inputs with structured schemas, and perform deterministic tasks reliably.",
        deliverables: [
          "Tool-calling architectures and custom API integrations",
          "Structured JSON schema validation using Zod for deterministic output",
          "Input guardrails and fallback logic for unhandled user queries",
          "Multi-turn state management and conversational memory",
          "Testing and validation for workflow consistency",
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
        tagline: "Turn AI use cases into working product features, from proof of concept to integration with existing applications and workflows.",
        description:
          "Transform an initial AI concept into a working, production-ready feature. We handle end-to-end integration with your existing stack, database, and user interface.",
        deliverables: [
          "Technical feasibility assessment and architecture planning",
          "Functional MVP and interactive prototype development",
          "Clean API endpoints connecting AI models to your frontend",
          "Integration with user authentication, databases, and permission models",
          "Clear documentation and code handover walkthroughs",
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
        tagline: "Integrate LLMs into applications with streaming responses, conversation workflows, usage controls, structured responses, and reliable API handling.",
        description:
          "Incorporate modern language models into existing user interfaces with smooth streaming text, usage controls, and reliable error recovery.",
        deliverables: [
          "Low-latency streaming responses via Vercel AI SDK",
          "Context window management and prompt assembly workflows",
          "Rate limiting, token usage tracking, and cost control safeguards",
          "Secure API key handling and provider failover strategies",
          "Conversational state persistence across user sessions",
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
    subtitle: "Modern, performant web applications paired with technical SEO and answer-engine discoverability.",
    services: [
      {
        id: "full-stack-web",
        badge: "08 // MODERN WEB APPS",
        title: "Full-Stack Web & Application Development",
        tagline: "Build fast, responsive, and modern web applications with Next.js, React, and solid backend systems.",
        description:
          "Turn your ideas into polished, customer-facing web applications. We build responsive frontends connected to secure APIs, role-based dashboards, and scalable database schemas.",
        deliverables: [
          "Modern web applications and marketing platforms built with Next.js App Router",
          "End-to-end integration between frontend UI, backend APIs, and databases",
          "Role-based admin dashboards, CMS workflows, and user portal systems",
          "Fast rendering with React Server Components, SSR, and ISR caching",
          "Clean, maintainable Tailwind CSS styling and accessible UI components",
        ],
        techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "PostgreSQL"],
        relatedLink: {
          label: "Explore web projects →",
          href: "/projects",
        },
      },
      {
        id: "technical-seo",
        badge: "09 // SEARCH & AEO",
        title: "Technical SEO, AEO & Web Performance",
        tagline: "Optimize web applications for Google search rankings, AI answer engines (AEO/GEO), and fast Core Web Vitals.",
        description:
          "Make your web applications visible to search engines and AI assistants alike. We implement Schema.org structured data, optimize Core Web Vitals, and build clean technical foundations.",
        deliverables: [
          "Schema.org JSON-LD implementation (Organization, Service, FAQ, Articles)",
          "Generative Engine Optimization (GEO/AEO) for citations in Perplexity and ChatGPT",
          "Core Web Vitals profiling (improving LCP, CLS, INP) and bundle size audits",
          "Dynamic XML sitemaps, robots.txt, and automated OpenGraph social preview cards",
          "Canonical URL hygiene, crawlability audits, and semantic HTML structure",
        ],
        techStack: ["Schema.org JSON-LD", "Next.js Metadata", "Google Search Console", "OpenGraph", "Web Vitals"],
        relatedLink: {
          label: "Read SEO & technical guides →",
          href: "/blogs",
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
    subtitle: "For early-stage startups and founders looking to build an MVP, AI feature, or web app quickly.",
    highlights: [
      "Fixed-scope sprints (1 to 4 weeks)",
      "Targeted RAG, AI workflow, web app, or API integration",
      "Direct technical communication with founders/CTOs",
      "Production-ready deployment & clean code",
    ],
  },
  {
    title: "Contract & Dedicated Collaboration",
    badge: "Flexible Scope",
    subtitle: "For growing teams needing dedicated backend, full-stack, and AI engineering support.",
    highlights: [
      "Flexible contract or monthly retainer partnership",
      "Seamless integration into your existing codebase",
      "Backend architecture, query tuning, and API design",
      "Collaborative code reviews and documentation",
    ],
  },
  {
    title: "Full-Time Remote Engineering",
    badge: "Long Term",
    subtitle: "For engineering teams seeking high-impact backend & AI engineering talent.",
    highlights: [
      "AI Backend Engineer / Full Stack Developer roles",
      "Fluent in async communication across global timezones",
      "Strong foundation in Node.js, TypeScript, PostgreSQL, & Next.js",
      "Immediate availability for remote work",
    ],
  },
];

const SERVICES_FAQS = [
  {
    question: "How do you improve AI accuracy and minimize hallucinations?",
    answer:
      "While no LLM can guarantee zero hallucinations, we significantly improve response quality through: (1) relevant vector search and document parsing, (2) strict relevance thresholds so unrelated documents are excluded, (3) grounded prompt templates that instruct the model to stick strictly to verified context, and (4) graceful fallbacks when the required information is not found in your data.",
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
      "Send a message via the Contact page or email shaikh.samir.work@gmail.com with a brief summary of your project goals. We will review your requirements and schedule a short discovery call to discuss next steps.",
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
          title="Engineering Services"
          subtitle="Reliable AI integrations, production backend architectures, modern web apps, and technical SEO tailored for startups, founders, and product teams."
        />

        {/* Hero Value Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-border-primary bg-card-bg p-6 md:p-10 mb-16 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-wider text-green-600 dark:text-green-400 font-semibold bg-green-500/10 border border-green-500/30 px-2.5 py-1 rounded-full inline-block mb-3">
                ● Available for Projects, Contracts & Full-Time Roles
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-3">
                Ship reliable software that drives real business results.
              </h2>
              <p className="service-desc text-text-muted text-base leading-relaxed">
                I help startups and engineering teams design, build, and deploy production-ready AI features, high-performance backend systems, modern Next.js web applications, and search-optimized technical foundations.
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
            Whether you need an AI knowledge pipeline, full-stack web application, scalable backend APIs, or technical SEO optimization, let&apos;s talk through your goals.
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
