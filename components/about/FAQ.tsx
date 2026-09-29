"use client";

import { useState } from "react";
import Link from "next/link";
import { LuChevronDown, LuChevronsUpDown, LuChevronUp, LuSparkles } from "react-icons/lu";

export default function FAQ() {
  const faqs = [
    {
      id: "primary-tech-stack",
      question: "What is your primary tech stack?",
      answer:
        "My core stack is Node.js, TypeScript, Next.js, React, and PostgreSQL (with pgvector), plus Express, NestJS, Redis, Docker, Apache Kafka, and BullMQ for distributed, event-driven architecture. On the AI side I build production RAG pipelines, LLM integration, semantic search, and agentic AI workflows with the Vercel AI SDK and Gemini. I operate as an AI-Enabled Full Stack Developer — backend-first, shipping with AI coding agents (Cursor, GitHub Copilot, Claude Code) that I keep inside a review, test, and CI gate.",
    },
    {
      id: "ai-enabled-full-stack-meaning",
      question: "What does an AI-Enabled Full Stack Developer mean?",
      answer:
        "It means a full stack engineer with a backend-first foundation who uses modern AI tools to deliver faster without trading away quality. AI coding assistants handle boilerplate and repetitive work; I personally own architecture, security, testing, and critical logic. The result is rapid prototyping plus production-ready, maintainable code.",
    },
    {
      id: "ai-rag-experience",
      question: "Do you have experience building AI-powered applications and RAG systems?",
      answer:
        "Yes — I build production RAG systems, including this portfolio's AI assistant. It indexes ~10,000 document chunks with PostgreSQL pgvector and Gemini 3072-dimensional embeddings, achieving sub-300ms retrieval latencies with strict relevance filtering (cosine distance <= 0.5), and grounded, structured outputs to minimize hallucination. I also build agentic AI workflows with tool execution, structured outputs, and guardrails.",
    },
    {
      id: "fde-roles-interest",
      question: "Are you interested in Forward Deployed Engineer (FDE) roles?",
      answer:
        "Yes — I'm targeting Forward Deployed Engineer roles that combine backend depth with direct customer ownership: navigating ambiguous requirements, conducting technical discovery with stakeholders, prototyping AI solutions in days, and taking end-to-end accountability for production deployments.",
    },
    {
      id: "remote-freelance-availability",
      question: "Are you open to remote work or freelance projects?",
      answer:
        "Yes — remote AI-Enabled Full Stack Developer, AI Backend Engineer, and Forward Deployed Engineer roles globally, plus contract or freelance AI and full stack projects, and on-site or hybrid opportunities in India.",
    },
    {
      id: "who-is-samir",
      question: "Who is Samir Shaikh?",
      answer:
        "Samir Shaikh is an AI-Enabled Full Stack Developer (backend-first) based in Gujarat, India — B.Tech in IT from Uka Tarsadia University (2026), with production experience at Xira Infotech (Full Stack Engineer) and LOGICWIND (Backend Developer) building RAG pipelines, LLM-integrated applications, microservices, and full stack web platforms.",
    },
    {
      id: "contact-methods",
      question: "How can I contact Samir?",
      answer:
        "You can reach Samir via email at shaikh.samir.work@gmail.com, through the contact form on this website, or on LinkedIn at linkedin.com/in/samirshaikh-dev. He typically responds within 24-48 hours.",
    },
    {
      id: "production-projects",
      question: "What kind of production projects have you worked on?",
      answer:
        "Key projects include a dynamic job portal with Next.js, PostgreSQL, and RBAC at Xira Infotech; a production RAG assistant with Gemini embeddings and pgvector; an active WhatsApp campaign platform processing 1,000+ messages/week; an event-driven AI ticket triage system with Kafka, BullMQ, and OpenTelemetry; and a transactional event management GraphQL platform (Eventify) — delivered end-to-end with an AI-assisted workflow.",
    },
    {
      id: "devops-deployment-experience",
      question: "What is your experience with DevOps and deployment?",
      answer:
        "I regularly containerize microservices using Docker and Docker Compose, build automated CI/CD workflows with GitHub Actions, and implement full-stack observability with OpenTelemetry, Prometheus, and Grafana.",
    },
    {
      id: "location-based",
      question: "Where are you based?",
      answer:
        "I am based in Vapi / Surat, Gujarat, India, and work effectively with remote engineering teams across global time zones.",
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
    <section className="mt-20" aria-label="Frequently Asked Questions">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-border-primary/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase mb-3 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
            ENGINEER FAQ
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-text-muted text-sm sm:text-base mt-1.5 max-w-xl">
            Key details about my engineering background, technical stack, and collaboration model.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
          <button
            type="button"
            onClick={expandAll}
            aria-label="Expand all FAQ items"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-border-primary bg-background dark:bg-card-bg text-text-secondary hover:text-foreground hover:border-foreground/30 hover:bg-hover-bg transition-all cursor-pointer shadow-2xs"
          >
            <LuChevronsUpDown className="w-3.5 h-3.5" />
            <span>Expand all</span>
          </button>
          <button
            type="button"
            onClick={collapseAll}
            aria-label="Collapse all FAQ items"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-border-primary bg-background dark:bg-card-bg text-text-secondary hover:text-foreground hover:border-foreground/30 hover:bg-hover-bg transition-all cursor-pointer shadow-2xs"
          >
            <LuChevronUp className="w-3.5 h-3.5" />
            <span>Collapse all</span>
          </button>
        </div>
      </div>

      {/* Accordion List */}
      <div className="flex flex-col gap-3">
        {faqs.map((faq, index) => {
          const isOpen = openIds.has(faq.id);
          const contentId = `about-faq-content-${faq.id}`;
          const headerId = `about-faq-header-${faq.id}`;
          const formattedIndex = String(index + 1).padStart(2, "0");

          return (
            <article
              key={faq.id}
              className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "border-border-secondary bg-background dark:bg-card-bg shadow-sm ring-1 ring-border-primary/60 dark:shadow-[0_0_24px_rgba(184,255,0,0.06)]"
                  : "border-border-primary bg-background/80 dark:bg-card-bg/60 hover:bg-hover-bg/30 hover:border-border-secondary hover:shadow-2xs"
              }`}
            >
              {/* Electric Lime Accent Line when Open */}
              {isOpen && (
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-6 sm:left-8 w-12 sm:w-16 h-[2px] bg-accent-lime shadow-[0_0_8px_rgba(184,255,0,0.8)]"
                />
              )}

              {/* Accordion Header */}
              <div className="w-full flex items-start justify-between text-left p-5 sm:p-6 gap-4">
                <h3 className="m-0 flex-1">
                  <button
                    id={headerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full flex flex-col gap-1.5 text-left cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:ring-offset-2"
                  >
                    <span className="font-mono text-xs font-semibold text-text-muted">
                      {formattedIndex}
                    </span>
                    <span
                      className={`text-base sm:text-lg font-bold tracking-tight leading-snug transition-colors ${
                        isOpen
                          ? "text-foreground"
                          : "text-foreground group-hover:text-foreground/90"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </button>
                </h3>

                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-label={isOpen ? "Collapse question" : "Expand question"}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer border flex-shrink-0 mt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime ${
                    isOpen
                      ? "bg-foreground text-background border-foreground shadow-2xs dark:bg-accent-lime dark:text-[#0A0A0A] dark:border-accent-lime dark:shadow-[0_0_12px_rgba(184,255,0,0.45)]"
                      : "bg-background dark:bg-card-bg border-border-primary text-text-muted group-hover:text-foreground group-hover:border-foreground/30 hover:bg-hover-bg"
                  }`}
                >
                  <LuChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ease-in-out motion-reduce:transition-none stroke-[2.5] ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </div>

              {/* Accordion Content Panel */}
              <div
                id={contentId}
                role="region"
                aria-labelledby={headerId}
                className={`grid transition-all duration-300 ease-in-out motion-reduce:transition-none ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100 pb-6 px-5 sm:px-6 pt-0"
                    : "grid-rows-[0fr] opacity-0 px-5 sm:px-6 py-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pt-3 border-t border-border-primary/50 text-sm sm:text-base text-text-secondary leading-relaxed">
                    <p className="whitespace-pre-line">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Commercial FAQ Referral Bridge */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-border-primary bg-background/80 dark:bg-card-bg/80 backdrop-blur-xs shadow-2xs">
        <div className="flex items-center gap-2">
          <LuSparkles className="w-4 h-4 text-accent-lime flex-shrink-0" />
          <span className="text-xs sm:text-sm text-text-secondary">
            Looking for pricing, project milestones, or commercial guarantees?
          </span>
        </div>
        <Link
          href="/faq"
          className="inline-flex items-center gap-1 text-xs font-bold text-foreground hover:text-accent-lime transition-colors underline-offset-4 hover:underline whitespace-nowrap self-start sm:self-auto"
        >
          <span>View all 20+ Commercial FAQs &rarr;</span>
        </Link>
      </div>
    </section>
  );
}
