export default function FAQ() {
  const faqs = [
    {
      question: "What is your primary tech stack?",
      answer:
        "My core stack is Node.js, TypeScript, Next.js, React, and PostgreSQL (with pgvector), plus Express, NestJS, Redis, Docker, Apache Kafka, and BullMQ for distributed, event-driven architecture. On the AI side I build production RAG pipelines, LLM integration, semantic search, and agentic AI workflows with the Vercel AI SDK and Gemini. I operate as an AI-Enabled Full Stack Developer — backend-first, shipping with AI coding agents (Cursor, GitHub Copilot, Claude Code) that I keep inside a review, test, and CI gate.",
    },
    {
      question: "What does an AI-Enabled Full Stack Developer mean?",
      answer:
        "It means a full stack engineer with a backend-first foundation who uses modern AI tools to deliver faster without trading away quality. AI coding assistants handle boilerplate and repetitive work; I personally own architecture, security, testing, and critical logic. The result is rapid prototyping plus production-ready, maintainable code.",
    },
    {
      question: "Do you have experience building AI-powered applications and RAG systems?",
      answer:
        "Yes — I build production RAG systems, including this portfolio's AI assistant. It indexes ~10,000 document chunks with PostgreSQL pgvector and Gemini 3072-dimensional embeddings, achieving sub-300ms retrieval latencies with strict relevance filtering (cosine distance <= 0.5), and grounded, structured outputs to minimize hallucination. I also build agentic AI workflows with tool execution, structured outputs, and guardrails.",
    },
    {
      question: "Are you interested in Forward Deployed Engineer (FDE) roles?",
      answer:
        "Yes — I'm targeting Forward Deployed Engineer roles that combine backend depth with direct customer ownership: navigating ambiguous requirements, conducting technical discovery with stakeholders, prototyping AI solutions in days, and taking end-to-end accountability for production deployments.",
    },
    {
      question: "Are you open to remote work or freelance projects?",
      answer:
        "Yes — remote AI-Enabled Full Stack Developer, AI Backend Engineer, and Forward Deployed Engineer roles globally, plus contract or freelance AI and full stack projects, and on-site or hybrid opportunities in India.",
    },
    {
      question: "Who is Samir Shaikh?",
      answer:
        "Samir Shaikh is an AI-Enabled Full Stack Developer (backend-first) based in Gujarat, India — B.Tech in IT from Uka Tarsadia University (2026), with production experience at Xira Infotech (Full Stack Engineer) and LOGICWIND (Backend Developer) building RAG pipelines, LLM-integrated applications, microservices, and full stack web platforms.",
    },
    {
      question: "How can I contact Samir?",
      answer:
        "You can reach Samir via email at shaikh.samir.work@gmail.com, through the contact form on this website, or on LinkedIn at linkedin.com/in/samirshaikh-dev. He typically responds within 24-48 hours.",
    },
    {
      question: "What kind of production projects have you worked on?",
      answer:
        "Key projects include a dynamic job portal with Next.js, PostgreSQL, and RBAC at Xira Infotech; a production RAG assistant with Gemini embeddings and pgvector; an active WhatsApp campaign platform processing 1,000+ messages/week; an event-driven AI ticket triage system with Kafka, BullMQ, and OpenTelemetry; and a transactional event management GraphQL platform (Eventify) — delivered end-to-end with an AI-assisted workflow.",
    },
    {
      question: "What is your experience with DevOps and deployment?",
      answer:
        "I regularly containerize microservices using Docker and Docker Compose, build automated CI/CD workflows with GitHub Actions, and implement full-stack observability with OpenTelemetry, Prometheus, and Grafana.",
    },
    {
      question: "Where are you based?",
      answer:
        "I am based in Vapi / Surat, Gujarat, India, and work effectively with remote engineering teams across global time zones.",
    },
  ];

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
    <div className="mt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">
        Frequently Asked Questions
      </h2>
      <dl className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="space-y-2">
            <dt className="text-lg font-medium text-foreground">
              {faq.question}
            </dt>
            <dd className="text-text-muted leading-relaxed">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
