export default function FAQ() {
  const faqs = [
    {
      question: "What is your primary tech stack?",
      answer:
        "My primary tech stack is Node.js, TypeScript, PostgreSQL (with pgvector), Next.js, Express.js, and NestJS, coupled with Redis, MongoDB, Docker, and the Vercel AI SDK. For distributed and event-driven architectures, I use Apache Kafka and BullMQ. I architect high-performance APIs, production RAG pipelines, and scalable microservices.",
    },
    {
      question: "Do you have experience building AI-powered applications?",
      answer:
        "Yes, I have hands-on experience building production AI systems, including this portfolio's RAG assistant. It indexes ~10,000 document chunks using PostgreSQL pgvector with Gemini 3072d vector embeddings, achieving sub-300ms retrieval latencies with strict cosine distance filtering (<= 0.5) to eliminate hallucinations. I also build autonomous agentic workflows that leverage multi-step reasoning, tool execution, and dynamic context grounding.",
    },
    {
      question: "Are you interested in Forward Deployed Engineer (FDE) roles?",
      answer:
        "Yes, I am actively targeting Forward Deployed Engineer roles that combine deep backend engineering with direct customer ownership. I excel at navigating ambiguous requirements, conducting technical discovery with stakeholders, prototyping working AI solutions in days, and taking end-to-end accountability for production deployments.",
    },
    {
      question: "Are you open to remote work or freelance projects?",
      answer:
        "Yes, I am open to full-time remote AI Backend Engineer, AI SDE, Agentic AI Engineer, and Forward Deployed Engineer roles globally, as well as on-site or hybrid opportunities in India.",
    },
    {
      question: "Who is Samir Shaikh?",
      answer:
        "Samir Shaikh is an AI Backend Engineer, AI SDE, and Full Stack Engineer based in Gujarat, India. He holds a B.Tech in Information Technology from Uka Tarsadia University (2026) and brings hands-on production experience from engineering internships at Xira Infotech (Full Stack Engineer Intern) and LOGICWIND (Back End Developer Intern), building production RAG pipelines, microservices, and web platforms.",
    },
    {
      question: "How can I contact Samir?",
      answer:
        "You can reach Samir via email at shaikh.samir.work@gmail.com, through the contact form on this website, or on LinkedIn at linkedin.com/in/samir-shaikh-760b932a8. He typically responds within 24-48 hours.",
    },
    {
      question: "What kind of production projects have you worked on?",
      answer:
        "Key projects include a dynamic job portal with Next.js, PostgreSQL, and RBAC at Xira Infotech; a production RAG assistant with Gemini embeddings and pgvector; an active WhatsApp business campaign platform processing 1,000+ messages/week; an event-driven AI ticket triage system with Kafka, BullMQ, and OpenTelemetry; and a transactional event management GraphQL platform (Eventify).",
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
