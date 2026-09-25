import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { APP_URL, AUTHOR_NAME, GITHUB_URL, LINKEDIN_URL } from "@/lib/site-config";
import { getFaqPageJsonLd, getSpeakableJsonLd } from "@/lib/seo/structured-data";
import {
  TECHNICAL_SKILLS_FAQS,
  SYSTEM_DESIGN_CONCEPTS,
  SOFTWARE_ENGINEERING_CONCEPTS,
} from "@/lib/data/technical-skills";
import TechnicalSkillsFAQClient from "@/components/technical-skills/TechnicalSkillsFAQClient";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Technical Skills & Developer Expertise | Samir Shaikh",
  description:
    "Explore Samir Shaikh's technical skills and developer expertise across JavaScript, TypeScript, React, Next.js, Node.js, GraphQL, REST APIs, PostgreSQL, MongoDB, Docker, AI-assisted development and modern software engineering.",
  keywords: [
    "Samir Shaikh technical skills",
    "Samir Shaikh developer expertise",
    "JavaScript ES6 TypeScript developer",
    "React Next.js frontend engineer",
    "Node.js Express GraphQL backend",
    "PostgreSQL MongoDB Redis databases",
    "Jest unit integration testing",
    "AI-assisted development Cursor Copilot",
    "Docker CI CD pipelines",
    "Prometheus Grafana observability",
    "RESTful API design RBAC",
    "System Design Microservices Modular Monolith",
    "full stack backend engineer India",
  ],
  alternates: {
    canonical: `${APP_URL}/technical-skills`,
  },
  openGraph: {
    title: "Technical Skills & Developer Expertise | Samir Shaikh",
    description:
      "Explore Samir Shaikh's technical skills and developer expertise across JavaScript, TypeScript, React, Next.js, Node.js, GraphQL, REST APIs, PostgreSQL, MongoDB, Docker, AI-assisted development and modern software engineering.",
    url: `${APP_URL}/technical-skills`,
    type: "website",
    images: [
      {
        url: `${APP_URL}/Filled_Logo.png`,
        width: 1200,
        height: 630,
        alt: "Samir Shaikh Technical Skills & Developer Expertise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Skills & Developer Expertise | Samir Shaikh",
    description:
      "Explore Samir Shaikh's technical skills and developer expertise across JavaScript, TypeScript, React, Next.js, Node.js, GraphQL, REST APIs, PostgreSQL, MongoDB, Docker, AI-assisted development and modern software engineering.",
    images: [`${APP_URL}/Filled_Logo.png`],
  },
};

interface SkillGroupProps {
  number: string;
  title: string;
  description: string;
  items: { name: string; tag?: string }[];
}

function SkillCard({ number, title, description, items }: SkillGroupProps) {
  return (
    <section className="rounded-xl border border-border-primary bg-background/60 p-6 md:p-7 backdrop-blur-sm transition-all duration-200 hover:border-border-primary/80 dark:hover:border-green-400/30">
      <div className="flex items-center justify-between gap-4 mb-3">
        <h3 className="text-lg md:text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <span className="font-mono text-xs text-text-muted px-2 py-0.5 rounded border border-border-primary">
          {number}
        </span>
      </div>
      <p className="text-text-muted text-sm leading-relaxed mb-5">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item.name}
            className="inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded border border-border-primary text-text-secondary bg-hover-bg/60 hover:text-foreground hover:border-text-muted/50 transition-colors"
          >
            {item.name}
            {item.tag && (
              <span className="text-[10px] text-text-muted opacity-75">
                ({item.tag})
              </span>
            )}
          </span>
        ))}
      </div>
    </section>
  );
}

export default function TechnicalSkillsPage() {
  const faqJsonLd = getFaqPageJsonLd(TECHNICAL_SKILLS_FAQS);
  const speakableJsonLd = getSpeakableJsonLd(["h1", "h2", ".dev-overview-text"]);

  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Technical Skills & Developer Expertise | Samir Shaikh",
    url: `${APP_URL}/technical-skills`,
    mainEntity: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: APP_URL,
      jobTitle: "AI-Enabled Full Stack Developer & Backend Engineer",
      sameAs: [LINKEDIN_URL, GITHUB_URL],
      knowsAbout: [
        "JavaScript",
        "TypeScript",
        "React.js",
        "Next.js",
        "Node.js",
        "Express.js",
        "GraphQL",
        "Apollo Server",
        "REST APIs",
        "PostgreSQL",
        "MongoDB",
        "MySQL",
        "Redis",
        "Firebase",
        "Docker",
        "Jest",
        "Apache Kafka",
        "BullMQ",
        "Prometheus",
        "Grafana",
        "RBAC",
        "AI-Assisted Development",
        "System Design",
        "Microservices",
        "Modular Monolith",
        "Monolithic Architecture",
        "Event-Driven Architecture",
        "API Gateway",
        "Distributed Caching",
        "Circuit Breakers",
        "CQRS",
      ],
    },
  };

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-8 min-h-screen">
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

      {/* Synchronized Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Technical Skills", href: "/technical-skills" },
        ]}
      />

      {/* Page Header */}
      <PageHeader
        title="Technical Skills & Developer Expertise"
        subtitle="A verified, structured index of programming languages, architecture patterns, backend and frontend engineering, databases, and modern developer tooling."
      />

      <div className="space-y-12 mt-4">
        {/* Section 1: Developer Overview */}
        <section
          aria-labelledby="overview-heading"
          className="rounded-xl border border-border-primary bg-background/80 p-6 md:p-8 backdrop-blur-sm relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-text-muted/20 to-transparent dark:via-green-400/30" />
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded border border-border-primary text-text-muted">
              01 // Profile
            </span>
            <h2
              id="overview-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              Developer Overview
            </h2>
          </div>

          <div className="dev-overview-text prose prose-gray dark:prose-invert max-w-none text-text-secondary leading-relaxed space-y-4">
            <p className="text-base md:text-lg text-foreground font-normal">
              Samir Shaikh is a full-stack software engineer with a backend-first foundation, specializing in architecting resilient Node.js and TypeScript services, scalable databases, and event-driven architectures. Combining robust systems engineering fundamentals with an AI-assisted workflow, Samir builds high-performance web applications, GraphQL and REST APIs, and modern cloud services with rigorous attention to type safety, security, and measurable reliability.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="rounded-lg border border-border-primary p-4 bg-hover-bg/30">
                <span className="font-mono text-xs text-text-muted uppercase tracking-wider block mb-1">
                  Architecture Focus
                </span>
                <p className="text-sm text-foreground font-medium">
                  Backend-First Systems & Scalable APIs
                </p>
                <p className="text-xs text-text-muted mt-1">
                  RESTful services, GraphQL schemas, database optimization, and event queues.
                </p>
              </div>

              <div className="rounded-lg border border-border-primary p-4 bg-hover-bg/30">
                <span className="font-mono text-xs text-text-muted uppercase tracking-wider block mb-1">
                  Frontend & Experience
                </span>
                <p className="text-sm text-foreground font-medium">
                  Modern React & Next.js Ecosystem
                </p>
                <p className="text-xs text-text-muted mt-1">
                  Server components, atomic state management, accessible responsive design.
                </p>
              </div>

              <div className="rounded-lg border border-border-primary p-4 bg-hover-bg/30">
                <span className="font-mono text-xs text-text-muted uppercase tracking-wider block mb-1">
                  Execution Standard
                </span>
                <p className="text-sm text-foreground font-medium">
                  Disciplined Quality & Security
                </p>
                <p className="text-xs text-text-muted mt-1">
                  RBAC authorization, unit and integration tests, Docker, and CI/CD pipelines.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Programming Languages */}
        <section aria-labelledby="languages-heading">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded border border-border-primary text-text-muted">
              02
            </span>
            <h2
              id="languages-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              Programming Languages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-xl border border-border-primary bg-background/60 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">TypeScript</h3>
                <span className="font-mono text-xs text-text-muted px-2 py-0.5 rounded border border-border-primary">
                  Core
                </span>
              </div>
              <p className="text-text-muted text-sm leading-relaxed mb-4">
                Primary language for enterprise and production development. Used across backend services, API interfaces, and Next.js frontend applications with strict compiler configurations, generics, utility types, and runtime schema validation.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="font-mono text-xs px-2.5 py-1 rounded border border-border-primary text-text-secondary bg-hover-bg/60">
                  TypeScript (Strict Mode)
                </span>
                <span className="font-mono text-xs px-2.5 py-1 rounded border border-border-primary text-text-secondary bg-hover-bg/60">
                  Type Interfaces & Generics
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-border-primary bg-background/60 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">JavaScript</h3>
                <span className="font-mono text-xs text-text-muted px-2 py-0.5 rounded border border-border-primary">
                  ES6+ / ESM
                </span>
              </div>
              <p className="text-text-muted text-sm leading-relaxed mb-4">
                Deep mastery of modern ECMAScript standards, asynchronous event-driven execution, promises, async/await patterns, closures, prototypes, and native ECMAScript Modules (ESM) across browser and Node.js runtimes.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="font-mono text-xs px-2.5 py-1 rounded border border-border-primary text-text-secondary bg-hover-bg/60">
                  JavaScript (ES6+)
                </span>
                <span className="font-mono text-xs px-2.5 py-1 rounded border border-border-primary text-text-secondary bg-hover-bg/60">
                  ESM Modules
                </span>
                <span className="font-mono text-xs px-2.5 py-1 rounded border border-border-primary text-text-secondary bg-hover-bg/60">
                  Async / Event Loop
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Frontend Development */}
        <section aria-labelledby="frontend-heading">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded border border-border-primary text-text-muted">
              03
            </span>
            <h2
              id="frontend-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              Frontend Development
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SkillCard
              number="3.1"
              title="Frameworks & Component Architecture"
              description="Building modular, reusable, and accessible interfaces with modern React paradigms and Next.js full-stack capabilities."
              items={[
                { name: "React.js" },
                { name: "Next.js" },
                { name: "React Hooks" },
                { name: "Component Architecture" },
              ]}
            />

            <SkillCard
              number="3.2"
              title="State Management"
              description="Structuring predictable application state flows across complex user workflows and server data synchronization."
              items={[
                { name: "State Management" },
                { name: "Redux Toolkit (RTK)" },
                { name: "Context API" },
              ]}
            />

            <SkillCard
              number="3.3"
              title="Styling & UI Systems"
              description="Crafting clean, accessible, theme-aware interfaces using utility-first styling and robust headless UI components."
              items={[
                { name: "Tailwind CSS" },
                { name: "shadcn/ui" },
                { name: "Framer Motion" },
                { name: "CSS3" },
              ]}
            />

            <SkillCard
              number="3.4"
              title="Responsive & Cross-Browser Design"
              description="Ensuring pixel-accurate, high-performance rendering across device viewports, desktop platforms, and mobile web browsers."
              items={[
                { name: "HTML5" },
                { name: "Responsive Design" },
                { name: "Cross-Browser Design" },
              ]}
            />
          </div>
        </section>

        {/* Section 4: Backend & API Development */}
        <section aria-labelledby="backend-heading">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded border border-border-primary text-text-muted">
              04
            </span>
            <h2
              id="backend-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              Backend & API Development
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SkillCard
              number="4.1"
              title="Server Runtimes & Frameworks"
              description="Developing high-throughput backend services and microservices designed for low latency, event handling, and resilience."
              items={[
                { name: "Node.js" },
                { name: "Express.js" },
                { name: "Sequelize ORM" },
              ]}
            />

            <SkillCard
              number="4.2"
              title="GraphQL Ecosystem"
              description="Full-lifecycle GraphQL API engineering from schema definitions and type resolvers to DataLoader batching."
              items={[
                { name: "GraphQL" },
                { name: "Apollo Server" },
                { name: "Apollo Client" },
                { name: "GraphQL Schemas" },
                { name: "GraphQL Resolvers" },
                { name: "DataLoader" },
              ]}
            />

            <SkillCard
              number="4.3"
              title="API Protocols & Real-Time"
              description="Designing standard RESTful endpoints, event-driven webhooks, and bidirectional WebSocket communication."
              items={[
                { name: "REST APIs" },
                { name: "Webhooks" },
                { name: "Socket.io" },
                { name: "Payment Gateways" },
              ]}
            />

            <SkillCard
              number="4.4"
              title="Authentication & Security"
              description="Implementing cryptographic hashing, stateless token management, session handling, and defensive perimeter checks."
              items={[
                { name: "JWT (JSON Web Tokens)" },
                { name: "bcrypt" },
              ]}
            />
          </div>
        </section>

        {/* Section 5: Databases & BaaS */}
        <section aria-labelledby="databases-heading">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded border border-border-primary text-text-muted">
              05
            </span>
            <h2
              id="databases-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              Databases & BaaS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <SkillCard
              number="5.1"
              title="Relational Databases"
              description="ACID-compliant relational data modeling, query optimization, indexing strategies, and transactional integrity."
              items={[
                { name: "PostgreSQL" },
                { name: "MySQL" },
              ]}
            />

            <SkillCard
              number="5.2"
              title="Document & In-Memory Stores"
              description="Flexible document persistence and high-performance caching for sessions, rate limits, and sub-millisecond lookups."
              items={[
                { name: "MongoDB" },
                { name: "Redis" },
              ]}
            />

            <SkillCard
              number="5.3"
              title="Backend as a Service (BaaS)"
              description="Rapid cloud backend scaffolding, managed document storage, and managed client authentication flows."
              items={[
                { name: "Firebase" },
                { name: "Firestore" },
                { name: "Firebase Authentication" },
              ]}
            />
          </div>
        </section>

        {/* Section 6: Testing */}
        <section aria-labelledby="testing-heading">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded border border-border-primary text-text-muted">
              06
            </span>
            <h2
              id="testing-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              Testing
            </h2>
          </div>

          <div className="rounded-xl border border-border-primary bg-background/60 p-6 md:p-7 backdrop-blur-sm">
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              Emphasizing automated testing as a prerequisite for maintainability, contract verification, and safe refactoring. Samir writes tests that simulate real business conditions and edge cases rather than trivial coverage targets.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-border-primary bg-hover-bg/40">
                <span className="font-mono text-xs text-text-muted uppercase tracking-wider block mb-1">
                  Framework
                </span>
                <p className="text-base font-semibold text-foreground">Jest</p>
                <p className="text-xs text-text-muted mt-1">
                  Automated test runner, assertion library, and mock runtime.
                </p>
              </div>

              <div className="p-4 rounded-lg border border-border-primary bg-hover-bg/40">
                <span className="font-mono text-xs text-text-muted uppercase tracking-wider block mb-1">
                  Scope
                </span>
                <p className="text-base font-semibold text-foreground">Unit Testing</p>
                <p className="text-xs text-text-muted mt-1">
                  Isolated testing of business logic, pure utility functions, and domain rules.
                </p>
              </div>

              <div className="p-4 rounded-lg border border-border-primary bg-hover-bg/40">
                <span className="font-mono text-xs text-text-muted uppercase tracking-wider block mb-1">
                  Scope
                </span>
                <p className="text-base font-semibold text-foreground">Integration Testing</p>
                <p className="text-xs text-text-muted mt-1">
                  Testing API routes, database queries, and middleware pipelines together.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Software Engineering & System Design Concepts */}
        <section aria-labelledby="concepts-heading">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded border border-border-primary text-text-muted">
              07
            </span>
            <h2
              id="concepts-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              System Design & Software Engineering Concepts
            </h2>
          </div>

          <div className="space-y-6">
            {/* System Design Architectural Patterns */}
            <div className="rounded-xl border border-border-primary bg-background/60 p-6 md:p-7 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-foreground">
                  System Design Architectural Patterns
                </h3>
                <span className="font-mono text-xs text-text-muted px-2 py-0.5 rounded border border-border-primary">
                  7.1 // System Architecture
                </span>
              </div>
              <p className="text-text-muted text-sm leading-relaxed mb-6">
                Pragmatic architectural strategies balancing developer velocity, data consistency, and distributed operational scalability.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {SYSTEM_DESIGN_CONCEPTS.map((concept) => (
                  <div
                    key={concept.name}
                    className="p-5 rounded-xl border border-border-primary bg-hover-bg/30 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h4 className="text-base font-semibold text-foreground">
                          {concept.name}
                        </h4>
                      </div>
                      <span className="inline-block font-mono text-[11px] text-text-muted mb-3">
                        {concept.sub}
                      </span>
                      <p className="text-xs text-text-muted leading-relaxed mb-4">
                        {concept.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border-primary/40">
                      {concept.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="font-mono text-[10px] px-2 py-0.5 rounded border border-border-primary text-text-secondary bg-background/60"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Software Engineering Principles */}
            <div className="rounded-xl border border-border-primary bg-background/60 p-6 md:p-7 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Core Engineering Principles
                </h3>
                <span className="font-mono text-xs text-text-muted px-2 py-0.5 rounded border border-border-primary">
                  7.2 // Foundations
                </span>
              </div>
              <p className="text-text-muted text-sm leading-relaxed mb-6">
                Core computer science and engineering disciplines applied continuously across codebase structure, database queries, and API governance.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {SOFTWARE_ENGINEERING_CONCEPTS.map((concept) => (
                  <div
                    key={concept.name}
                    className="p-3.5 rounded-lg border border-border-primary bg-hover-bg/30 flex flex-col justify-between"
                  >
                    <p className="text-xs font-semibold text-foreground leading-snug">
                      {concept.name}
                    </p>
                    <p className="text-[11px] text-text-muted mt-1 leading-tight">
                      {concept.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: AI-Assisted Development */}
        <section aria-labelledby="ai-dev-heading">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded border border-border-primary text-text-muted">
              08
            </span>
            <h2
              id="ai-dev-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              AI-Assisted Development
            </h2>
          </div>

          <div className="rounded-xl border border-border-primary bg-background/60 p-6 md:p-7 backdrop-blur-sm">
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              Samir operates an agent-assisted development workflow — utilizing LLMs and AI-native developer tools to accelerate drafting, boilerplate generation, and refactoring, while personally validating architectural integrity, edge cases, and security boundaries.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { name: "ChatGPT", role: "Reasoning & Design" },
                { name: "Claude", role: "Complex Logic & Audit" },
                { name: "Cursor", role: "AI-Native Editor" },
                { name: "GitHub Copilot", role: "Inline Completion" },
                { name: "AI-native IDEs", role: "Context-Aware Agentic Coding" },
                { name: "LLM API Integration", role: "Programmatic Model Access" },
              ].map((tool) => (
                <div
                  key={tool.name}
                  className="p-3.5 rounded-lg border border-border-primary bg-hover-bg/30 text-center"
                >
                  <p className="text-xs font-semibold text-foreground leading-snug">
                    {tool.name}
                  </p>
                  <p className="text-[10px] text-text-muted mt-1">
                    {tool.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 9: Messaging & Queues */}
        <section aria-labelledby="queues-heading">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded border border-border-primary text-text-muted">
              09
            </span>
            <h2
              id="queues-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              Messaging & Queues
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <SkillCard
              number="9.1"
              title="BullMQ"
              description="Redis-backed distributed message queues for asynchronous task execution, scheduled background jobs, and retries."
              items={[{ name: "BullMQ" }, { name: "Job Queues" }, { name: "Workers" }]}
            />

            <SkillCard
              number="9.2"
              title="Apache Kafka"
              description="High-throughput distributed event streaming platform used for partitioned event logs and decoupled microservice communication."
              items={[{ name: "Apache Kafka" }, { name: "Event Streams" }, { name: "Topics & Consumers" }]}
            />

            <SkillCard
              number="9.3"
              title="Firebase Cloud Messaging"
              description="Cross-platform push messaging infrastructure for instant notifications and client device alert delivery."
              items={[{ name: "Firebase Cloud Messaging (FCM)" }, { name: "Push Notifications" }]}
            />
          </div>
        </section>

        {/* Section 10: Cloud & DevOps */}
        <section aria-labelledby="devops-heading">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded border border-border-primary text-text-muted">
              10
            </span>
            <h2
              id="devops-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              Cloud & DevOps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SkillCard
              number="10.1"
              title="Containerization & Cloud Functions"
              description="Packaging reproducible containerized environments for seamless parity between local workstations and cloud servers."
              items={[
                { name: "Docker" },
                { name: "Docker Compose" },
                { name: "Firebase Cloud Functions" },
              ]}
            />

            <SkillCard
              number="10.2"
              title="CI/CD & Collaboration Workflows"
              description="Automating validation, linting, tests, and deployments on every commit while enforcing peer review rigor."
              items={[
                { name: "CI/CD Pipelines" },
                { name: "GitHub Actions" },
                { name: "Git" },
                { name: "Git Branching" },
                { name: "Pull Requests" },
                { name: "Code Reviews" },
                { name: "GitHub" },
                { name: "Postman" },
              ]}
            />
          </div>
        </section>

        {/* Section 11: Monitoring & Observability */}
        <section aria-labelledby="monitoring-heading">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded border border-border-primary text-text-muted">
              11
            </span>
            <h2
              id="monitoring-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              Monitoring & Observability
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-xl border border-border-primary bg-background/60 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Prometheus</h3>
                <span className="font-mono text-xs text-text-muted px-2 py-0.5 rounded border border-border-primary">
                  Metrics
                </span>
              </div>
              <p className="text-text-muted text-sm leading-relaxed mb-4">
                Open-source systems monitoring and alerting toolkit. Configured for metric scraping, time-series data aggregation, API latency measurement, and health endpoints.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="font-mono text-xs px-2.5 py-1 rounded border border-border-primary text-text-secondary bg-hover-bg/60">
                  Prometheus
                </span>
                <span className="font-mono text-xs px-2.5 py-1 rounded border border-border-primary text-text-secondary bg-hover-bg/60">
                  Time-Series Metrics
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-border-primary bg-background/60 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Grafana</h3>
                <span className="font-mono text-xs text-text-muted px-2 py-0.5 rounded border border-border-primary">
                  Dashboards
                </span>
              </div>
              <p className="text-text-muted text-sm leading-relaxed mb-4">
                Multi-platform analytics and interactive visualization web application. Used for composing operational dashboards, service error rates, memory footprint, and server health tracking.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="font-mono text-xs px-2.5 py-1 rounded border border-border-primary text-text-secondary bg-hover-bg/60">
                  Grafana
                </span>
                <span className="font-mono text-xs px-2.5 py-1 rounded border border-border-primary text-text-secondary bg-hover-bg/60">
                  Visual Dashboards
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 12: Soft Skills */}
        <section aria-labelledby="soft-skills-heading">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded border border-border-primary text-text-muted">
              12
            </span>
            <h2
              id="soft-skills-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              Soft Skills
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-xl border border-border-primary bg-background/60 p-6 backdrop-blur-sm">
              <span className="font-mono text-xs text-text-muted px-2 py-0.5 rounded border border-border-primary inline-block mb-3">
                Analytical
              </span>
              <h3 className="text-lg font-semibold text-foreground mb-2">Problem-Solving</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Deconstructing complex technical ambiguities into clean, incremental, testable solutions with methodical root-cause debugging.
              </p>
            </div>

            <div className="rounded-xl border border-border-primary bg-background/60 p-6 backdrop-blur-sm">
              <span className="font-mono text-xs text-text-muted px-2 py-0.5 rounded border border-border-primary inline-block mb-3">
                Teamwork
              </span>
              <h3 className="text-lg font-semibold text-foreground mb-2">Cross-Functional Collaboration</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Partnering effectively across design, product, engineering, and remote stakeholder teams with clear asynchronous communication.
              </p>
            </div>

            <div className="rounded-xl border border-border-primary bg-background/60 p-6 backdrop-blur-sm">
              <span className="font-mono text-xs text-text-muted px-2 py-0.5 rounded border border-border-primary inline-block mb-3">
                Clarity
              </span>
              <h3 className="text-lg font-semibold text-foreground mb-2">Technical Documentation</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Writing precise API contracts, architecture decision records (ADRs), schemas, setup runbooks, and inline docstrings.
              </p>
            </div>
          </div>
        </section>

        {/* Section 13: Development Tools & Workflow */}
        <section aria-labelledby="workflow-heading">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded border border-border-primary text-text-muted">
              13
            </span>
            <h2
              id="workflow-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              Development Tools & Workflow
            </h2>
          </div>

          <div className="rounded-xl border border-border-primary bg-background/60 p-6 md:p-8 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full border border-border-primary flex items-center justify-center font-mono text-xs text-foreground bg-hover-bg">
                    1
                  </span>
                  <h3 className="text-sm font-semibold text-foreground">API Prototyping</h3>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Validating endpoints, authentication payloads, and schema contracts in <strong>Postman</strong> before committing implementations.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full border border-border-primary flex items-center justify-center font-mono text-xs text-foreground bg-hover-bg">
                    2
                  </span>
                  <h3 className="text-sm font-semibold text-foreground">Container Parity</h3>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Running isolated datastores and backend dependencies locally with <strong>Docker</strong> and <strong>Docker Compose</strong>.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full border border-border-primary flex items-center justify-center font-mono text-xs text-foreground bg-hover-bg">
                    3
                  </span>
                  <h3 className="text-sm font-semibold text-foreground">AI Pair-Programming</h3>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Augmenting implementation speed using <strong>Cursor</strong>, <strong>GitHub Copilot</strong>, and <strong>Claude</strong> with manual verification.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full border border-border-primary flex items-center justify-center font-mono text-xs text-foreground bg-hover-bg">
                    4
                  </span>
                  <h3 className="text-sm font-semibold text-foreground">Review & CI/CD</h3>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Branch-based <strong>Git</strong> workflows, atomic <strong>Pull Requests</strong>, <strong>Code Reviews</strong>, and automated <strong>GitHub Actions</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 14: Frequently Asked Questions */}
        <section aria-labelledby="faq-heading" className="pt-4">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded border border-border-primary text-text-muted">
              14
            </span>
            <h2
              id="faq-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              Frequently Asked Questions
            </h2>
          </div>

          <TechnicalSkillsFAQClient faqs={TECHNICAL_SKILLS_FAQS} />
        </section>

        {/* Section 15: Developer Links (Connect / Explore) */}
        <section
          aria-labelledby="connect-heading"
          className="rounded-xl border border-border-primary bg-background/80 p-6 md:p-8 backdrop-blur-sm text-center"
        >
          <h2
            id="connect-heading"
            className="text-xl font-bold tracking-tight text-foreground mb-2"
          >
            Connect & Explore
          </h2>
          <p className="text-text-muted text-sm max-w-md mx-auto mb-6">
            Review live project repositories, verify code contributions, or inspect my complete developer profile.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs px-4 py-2.5 rounded-lg border border-border-primary text-foreground bg-hover-bg/70 hover:bg-hover-bg hover:border-text-muted/60 transition-colors"
            >
              Main Portfolio →
            </Link>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs px-4 py-2.5 rounded-lg border border-border-primary text-foreground bg-hover-bg/70 hover:bg-hover-bg hover:border-text-muted/60 transition-colors"
            >
              GitHub Profile ↗
            </a>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs px-4 py-2.5 rounded-lg border border-border-primary text-foreground bg-hover-bg/70 hover:bg-hover-bg hover:border-text-muted/60 transition-colors"
            >
              LinkedIn Profile ↗
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
