"use client";

import { useState } from "react";
import Link from "next/link";
import { LuChevronDown, LuChevronsUpDown, LuChevronUp, LuSparkles } from "react-icons/lu";

export default function FAQ() {
  const faqs = [
    {
      id: "primary-tech-stack",
      question: "What is your primary engineering stack?",
      answer:
        "My core stack is Node.js, TypeScript, Next.js, React, and PostgreSQL with pgvector, plus Express, NestJS, Redis, Docker, Apache Kafka, and BullMQ for distributed, event-driven backends. For AI systems, I build production RAG pipelines, LLM integration, semantic search, and agentic workflows using the Vercel AI SDK and Gemini. I operate as an AI-Enabled Full Stack Developer — backend-first, pairing with AI coding agents (Cursor, Copilot, Claude Code) inside strict code review, typing, and automated testing gates.",
    },
    {
      id: "ai-enabled-full-stack-meaning",
      question: "What does 'AI-Enabled Full Stack Developer' mean in practice?",
      answer:
        "It means a full stack engineer with deep backend foundations who leverages modern AI tooling to accelerate delivery without sacrificing code quality or security. AI coding assistants handle boilerplate, scaffold migrations, and test drafts; I personally own system boundaries, data integrity, security boundaries, and critical business logic. The outcome is rapid development with enterprise-grade reliability.",
    },
    {
      id: "ai-rag-experience",
      question: "What is your hands-on experience building production RAG systems?",
      answer:
        "I build end-to-end production RAG pipelines, including the AI assistant on this portfolio. It indexes ~10,000 document chunks in PostgreSQL pgvector using 3072-dimensional Gemini embeddings, achieving sub-300ms retrieval latencies with strict cosine distance filtering (<= 0.5) to reject irrelevant queries and eliminate hallucinated answers. I also build agentic workflows with deterministic tool calling and rate-limiting guardrails.",
    },
    {
      id: "fde-roles-interest",
      question: "What makes you well-suited for Forward Deployed Engineer (FDE) roles?",
      answer:
        "Forward Deployed Engineer roles require a balance of technical backend depth and customer-embedded problem solving. I thrive in navigating ambiguous requirements directly with stakeholders, rapidly prototyping production-viable solutions in days, and taking end-to-end ownership from initial scoping to live deployment handover.",
    },
    {
      id: "remote-freelance-availability",
      question: "What is your availability for remote, freelance, or full-time roles?",
      answer:
        "I am actively available for remote AI Backend Engineer, AI Full Stack Developer, and Forward Deployed Engineer roles globally, as well as contract sprints, codebase audits, and select freelance architecture consulting.",
    },
    {
      id: "who-is-samir",
      question: "Who is Samir Shaikh?",
      answer:
        "Samir Shaikh is an AI Backend & Full Stack Engineer based in Gujarat, India, completing a B.Tech in Information Technology from Uka Tarsadia University (2026). His industry experience includes roles at Xira Infotech (Full Stack Engineer Intern) and LOGICWIND (Backend Developer Intern), engineering scalable RAG pipelines, microservices, and web platforms.",
    },
    {
      id: "production-projects",
      question: "What kind of production systems have you delivered?",
      answer:
        "Key projects include a dynamic recruitment platform with Next.js and RBAC at Xira Infotech; an active WhatsApp automation platform delivering 1,000+ messages/week; an event-driven AI ticket triage system with Kafka and BullMQ; and Eventify, a transactional GraphQL event management engine.",
    },
    {
      id: "devops-deployment-experience",
      question: "How do you handle DevOps, containerization, and observability?",
      answer:
        "I containerize microservices using Docker and Docker Compose, orchestrate automated CI/CD pipelines via GitHub Actions, and instrument systems for full observability using Prometheus, Grafana, and structured logging.",
    },
    {
      id: "contact-methods",
      question: "What is the best way to get in touch?",
      answer:
        "You can email me directly at shaikh.samir.work@gmail.com, submit an inquiry through the contact form on this site, or connect on LinkedIn (linkedin.com/in/samirshaikh-dev). I typically respond within 24 hours.",
    },
    {
      id: "location-based",
      question: "Where are you based and how do you handle international time zones?",
      answer:
        "I am based in Gujarat, India (IST, UTC+5:30), and maintain clean overlap with US East/West, UK, and European business hours through asynchronous-first communication, clear daily PR summaries, and structured milestone handovers.",
    },
  ];

  const [openIds, setOpenIds] = useState<Set<string>>(new Set([faqs[0].id]));

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setOpenIds(new Set(faqs.map((f) => f.id)));
  };

  const collapseAll = () => {
    setOpenIds(new Set());
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="mt-16" aria-label="Frequently Asked Questions">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-border-primary">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-text-muted uppercase mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
            <span>ENGINEER FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-text-muted text-xs sm:text-sm mt-1 max-w-xl">
            Core details regarding engineering philosophy, primary tech stack, and collaboration.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
          <button
            type="button"
            onClick={expandAll}
            aria-label="Expand all FAQ items"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-border-primary bg-background dark:bg-card-bg text-text-secondary hover:text-foreground hover:bg-hover-bg transition-colors"
          >
            <LuChevronsUpDown className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Expand all</span>
          </button>
          <button
            type="button"
            onClick={collapseAll}
            aria-label="Collapse all FAQ items"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-border-primary bg-background dark:bg-card-bg text-text-secondary hover:text-foreground hover:bg-hover-bg transition-colors"
          >
            <LuChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Collapse all</span>
          </button>
        </div>
      </div>

      {/* Accordion List — Clean Open Layout */}
      <div className="space-y-2">
        {faqs.map((faq, index) => {
          const isOpen = openIds.has(faq.id);
          const contentId = `about-faq-content-${faq.id}`;
          const headerId = `about-faq-header-${faq.id}`;
          const formattedIndex = String(index + 1).padStart(2, "0");

          return (
            <article
              key={faq.id}
              className={`rounded-xl border transition-colors ${
                isOpen
                  ? "border-border-primary bg-background dark:bg-card-bg"
                  : "border-border-primary/70 bg-background dark:bg-card-bg/60 hover:border-foreground/30"
              }`}
            >
              {/* Accordion Header */}
              <div className="w-full flex items-center justify-between text-left p-4 sm:p-5 gap-4">
                <button
                  id={headerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full flex items-center justify-between gap-3 text-left rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-lime"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold text-text-muted">
                      {formattedIndex}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-foreground leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <LuChevronDown
                    className={`w-4 h-4 text-text-muted shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none ${
                      isOpen ? "rotate-180 text-foreground" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </div>

              {/* Accordion Content Panel */}
              {isOpen && (
                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={headerId}
                  className="pb-5 px-4 sm:px-5 pt-0 border-t border-border-primary/60"
                >
                  <p className="pt-3 text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Commercial FAQ Referral Bridge */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-border-primary bg-background dark:bg-card-bg">
        <div className="flex items-center gap-2">
          <LuSparkles className="w-4 h-4 text-accent-lime flex-shrink-0" aria-hidden="true" />
          <span className="text-xs sm:text-sm text-text-secondary">
            Looking for fixed-price sprint rates, project milestones, or commercial guarantees?
          </span>
        </div>
        <Link
          href="/services"
          className="inline-flex items-center gap-1 text-xs font-mono font-bold text-foreground hover:text-text-secondary transition-colors underline underline-offset-4 whitespace-nowrap self-start sm:self-auto"
        >
          <span>Explore 13 Engineering Blueprints &rarr;</span>
        </Link>
      </div>
    </section>
  );
}
