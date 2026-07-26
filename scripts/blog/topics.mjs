// Rotating pillar topics grounded in Samir's real stack + positioning.
// Each pillar carries SEO metadata + editorial structure so the generator
// produces keyword-optimized, cluster-linked content that actually ranks.
//
// Structure per pillar:
//   title        — SEO-optimized headline (main keyword near front, <65 chars)
//   tier         — publishing priority (1 = AI Backend Engineer positioning first)
//   format       — content depth hint for the generator
//   seo          — mainKeyword, longTailKeywords[], metaTitle, metaDescription, audience
//   cluster      — { pillar: bool, supporting: string[] } for topic cluster internal linking
//   outline      — section-by-section plan (keyword-rich H2/H3 headings)
//   relatedTo    — indices of other pillars to cross-link
//
// Topic cluster strategy:
//   Each pillar article links to its cluster.supporting posts, and those
//   link back. This internal linking signals topical authority to search
//   engines and keeps readers on-site longer.
//
// Publishing cadence (recommended):
//   Weeks 1–4:  Tier 1 pillar (RAG + pgvector) + repo + demo
//   Weeks 5–8:  Two medium posts (prompt engineering + production failure modes)
//   After each long post: short "lessons learned" + video walkthrough + GitHub repo
//   Cross-link between related pillars. Repurpose into LinkedIn/Twitter threads.

export const TOPIC_PILLARS = [
  // ── Tier 1 — directly targets AI Backend Engineer positioning ──────────

  {
    title: "RAG with pgvector: Building a Production Pipeline in Node.js",
    tier: 1,
    format: "long-form series",
    seo: {
      mainKeyword: "RAG with pgvector",
      longTailKeywords: [
        "how to build RAG pipeline with pgvector",
        "pgvector semantic search tutorial",
        "Node.js pgvector example",
        "PostgreSQL vector search for LLM",
        "retrieval augmented generation Node.js",
      ],
      metaTitle: "RAG with pgvector: Building a Production Pipeline in Node.js",
      metaDescription:
        "Step-by-step guide to building a production RAG pipeline with pgvector, Node.js, and PostgreSQL. Covers architecture, embedding workflows, cosine similarity, and benchmarks.",
      audience: "backend developers, AI engineers",
    },
    cluster: {
      pillar: true,
      supporting: [
        "How to Store and Query Embeddings in PostgreSQL pgvector",
        "Optimizing pgvector Performance: Indexing and Query Tuning",
        "Evaluating RAG Quality: Metrics for LLM Retrieval Systems",
        "Caching Strategies for RAG Pipelines with Redis and pgvector",
      ],
    },
    outline: [
      "Intro — what RAG solves and when pgvector is the right store (main keyword in first paragraph)",
      "Architecture overview — ingestors, embeddings, pgvector, retriever, ranker, LLM",
      "Step-by-step implementation — pgvector schema, embedding workflows, cosine vs inner product",
      "Performance and scaling — indexing, shard sizing, vacuum, query tuning",
      "Common errors and debugging — index bloat, slow scans, embedding drift",
      "Conclusion + links to cluster supporting articles",
    ],
    relatedTo: [1, 2, 4],
  },
  {
    title: "Prompt Engineering for LLMs: Testing and Shipping Production Prompts",
    tier: 1,
    format: "long-form",
    seo: {
      mainKeyword: "prompt engineering best practices",
      longTailKeywords: [
        "prompt engineering for customer support bots",
        "how to test prompts for GPT in production",
        "LLM prompt templates Node.js",
        "production prompt versioning",
        "prompt evaluation framework",
      ],
      metaTitle: "Prompt Engineering for LLMs: Testing and Shipping Production Prompts",
      metaDescription:
        "Practical guide to prompt engineering for production LLM features. Covers versioning, automated testing, hallucination metrics, and feedback loops with Node.js examples.",
      audience: "backend developers, AI engineers",
    },
    cluster: {
      pillar: true,
      supporting: [
        "Prompt Versioning Patterns for LLM Applications",
        "Automated Prompt Testing with Golden Examples in Node.js",
        "Measuring Hallucination Rate in Production LLM Features",
      ],
    },
    outline: [
      "Intro — why prompt engineering is a software engineering discipline (keyword in first paragraph)",
      "Prompt versioning and templating patterns (families, canary variants)",
      "Automated prompt tests: unit tests, golden examples, regression suites",
      "Metrics: usefulness scoring, hallucination rate, latency, token cost",
      "Feedback loops: human-in-the-loop labeling and online learning",
      "Safety mitigations and fallback responses",
      "Conclusion + links to cluster supporting articles",
    ],
    relatedTo: [0, 2, 4],
  },
  {
    title: "AI Ticket Triage: Building a Node.js Microservice Pipeline with LLMs",
    tier: 1,
    format: "long-form",
    seo: {
      mainKeyword: "AI ticket triage microservices",
      longTailKeywords: [
        "Node.js AI customer support pipeline",
        "LLM ticket classification microservice",
        "BullMQ job queue AI processing",
        "automated ticket routing Node.js",
      ],
      metaTitle: "AI Ticket Triage: Node.js Microservice Pipeline with LLMs",
      metaDescription:
        "Design a scalable AI ticket triage system with Node.js microservices, BullMQ queues, and LLM classification. Includes architecture, code, and scaling notes.",
      audience: "backend developers, platform engineers",
    },
    cluster: {
      pillar: false,
      supporting: [],
    },
    outline: [
      "Intro — what AI ticket triage solves and why queues matter (keyword early)",
      "High-level flow: ingestion → classification → routing → human fallback",
      "Model choices: classifiers vs retrieval vs hybrid",
      "Throughput and backpressure: queue design (BullMQ / Kafka), batching",
      "Observability: latency SLOs, error budgets, useful logs for retriage",
      "Example code, schema for event payloads, scaling notes",
      "Conclusion + links to related observability and event-driven articles",
    ],
    relatedTo: [6, 8],
  },
  {
    title: "Deploying AI Features: 10 Real Problems and How to Fix Them",
    tier: 1,
    format: "long-form",
    seo: {
      mainKeyword: "deploying AI features in production",
      longTailKeywords: [
        "AI feature production issues",
        "LLM deployment problems Node.js",
        "AI model latency spikes troubleshooting",
        "vendor rate limits AI production",
        "AI feature incident playbook",
      ],
      metaTitle: "Deploying AI Features: 10 Real Problems and How to Fix Them",
      metaDescription:
        "Common failure modes when deploying AI features into production — noisy data, latency spikes, vendor limits, cost overruns — with a concrete incident playbook.",
      audience: "backend developers, AI engineers, SREs",
    },
    cluster: {
      pillar: false,
      supporting: [],
    },
    outline: [
      "Intro — the gap between demo and production (keyword in first paragraph)",
      "Real failure modes: noisy data, schema drift, latency spikes, unexpected inputs",
      "Operational surprises: vendor rate limits, cost overruns, data retention laws",
      "Incident playbook: how to triage AI-specific incidents",
      "Instrumentation for root-cause analysis: traces, debug logs, model I/O capture",
      "Conclusion + links to observability and testing articles",
    ],
    relatedTo: [0, 2, 8],
  },
  {
    title: "Testing LLM Features: Unit Tests, Integration, and Synthetic Scenarios",
    tier: 1,
    format: "medium-form",
    seo: {
      mainKeyword: "testing LLM features",
      longTailKeywords: [
        "how to test LLM outputs automatically",
        "unit testing prompts Node.js",
        "synthetic test data for LLMs",
        "CI pipeline for prompt regression",
      ],
      metaTitle: "Testing LLM Features: Unit Tests, Integration, Synthetic Scenarios",
      metaDescription:
        "Practical testing strategies for LLM features — golden example unit tests, cost-aware integration suites, synthetic edge cases, and CI gating for prompt quality.",
      audience: "backend developers, QA engineers",
    },
    cluster: {
      pillar: false,
      supporting: [],
    },
    outline: [
      "Intro — why traditional testing breaks down for probabilistic outputs (keyword early)",
      "Unit testing prompts: golden examples, assertion patterns, snapshot tests",
      "Integration tests: mock vs real LLM calls, cost-aware test suites",
      "Synthetic scenario generation for edge cases and adversarial inputs",
      "CI integration: gating PRs on prompt quality metrics",
      "Conclusion + links to prompt engineering and CI/CD articles",
    ],
    relatedTo: [1, 4],
  },
  {
    title: "LLM Pipeline Security: Prompt Leakage, PII, and Encryption",
    tier: 1,
    format: "medium-form",
    seo: {
      mainKeyword: "LLM pipeline security",
      longTailKeywords: [
        "prompt injection defense Node.js",
        "PII in embeddings GDPR compliance",
        "encrypt vector store PostgreSQL",
        "RAG access control multi-tenant",
      ],
      metaTitle: "LLM Pipeline Security: Prompt Leakage, PII, and Encryption",
      metaDescription:
        "Security guide for LLM pipelines — prompt injection defenses, PII detection in embeddings, encryption at rest for pgvector, and multi-tenant access control patterns.",
      audience: "backend developers, security engineers",
    },
    cluster: {
      pillar: false,
      supporting: [],
    },
    outline: [
      "Intro — security is not optional for customer-facing AI (keyword in first paragraph)",
      "Prompt injection and leakage: attack vectors and defenses",
      "PII in embeddings: detection, redaction, and compliance (GDPR/CCPA)",
      "Encryption at rest and in transit for vector stores",
      "Access control patterns for multi-tenant RAG systems",
      "Audit logging and data retention policies",
      "Conclusion + links to RAG and cost optimization articles",
    ],
    relatedTo: [0, 1],
  },
  {
    title: "Cost and Latency Optimization for RAG and Embeddings at Scale",
    tier: 1,
    format: "medium-form",
    seo: {
      mainKeyword: "RAG cost optimization",
      longTailKeywords: [
        "reduce embedding API costs",
        "pgvector query latency optimization",
        "semantic cache RAG pipeline",
        "embedding quantization Node.js",
      ],
      metaTitle: "Cost and Latency Optimization for RAG and Embeddings at Scale",
      metaDescription:
        "Optimize RAG pipeline costs and latency — embedding batching, semantic caching, vector quantization, and per-query cost modeling with Node.js and pgvector.",
      audience: "backend developers, AI engineers",
    },
    cluster: {
      pillar: false,
      supporting: [],
    },
    outline: [
      "Intro — why RAG costs spiral without optimization (keyword early)",
      "Embedding batching strategies and API rate limit management",
      "Caching layers: semantic dedup, result caching, TTL strategies",
      "Quantization: reducing vector dimensions without losing recall",
      "Cost modeling: per-query token spend, embedding API bills, compute",
      "Latency profiling: where the 200ms actually goes",
      "Conclusion + links to RAG pillar and observability articles",
    ],
    relatedTo: [0, 1],
  },

  // ── Tier 2 — Forward Deployed Engineer positioning ─────────────────────

  {
    title: "Forward Deployed Engineering for Backend Developers: A Practical Guide",
    tier: 2,
    format: "long-form",
    seo: {
      mainKeyword: "forward deployed engineering",
      longTailKeywords: [
        "what is forward deployed engineer role",
        "backend engineer to FDE transition",
        "customer-facing backend developer",
        "FDE skills portfolio projects",
      ],
      metaTitle: "Forward Deployed Engineering for Backend Developers: Practical Guide",
      metaDescription:
        "How backend engineers can transition to Forward Deployed Engineering — role differences, skills to build, portfolio projects, and a 2-week exercise to prove FDE capability.",
      audience: "backend developers, career changers",
    },
    cluster: {
      pillar: false,
      supporting: [],
    },
    outline: [
      "Intro — what FDE means and why backend engineers are well-suited (keyword early)",
      "Role differences and expanded responsibilities (customer-facing, product thinking)",
      "Skills to build: rapid prototyping, customer interviews, ops, domain adaptation",
      "Portfolio projects and interviews to prove FDE capability",
      "Real-world exercise: ship a feature in 2 weeks with infra + customer validation",
      "Conclusion + links to AI deployment and microservice articles",
    ],
    relatedTo: [3, 4],
  },
  {
    title: "WhatsApp Automation with whatsapp-web.js: A Production Guide",
    tier: 2,
    format: "long-form",
    seo: {
      mainKeyword: "WhatsApp automation whatsapp-web.js",
      longTailKeywords: [
        "whatsapp-web.js Node.js tutorial",
        "WhatsApp bot production deployment",
        "whatsapp-web.js error handling reconnection",
        "WhatsApp message idempotency Node.js",
      ],
      metaTitle: "WhatsApp Automation with whatsapp-web.js: A Production Guide",
      metaDescription:
        "Production guide for WhatsApp automation with whatsapp-web.js — architecture tradeoffs, message idempotency, rate limits, session management, and error recovery.",
      audience: "backend developers, automation engineers",
    },
    cluster: {
      pillar: false,
      supporting: [],
    },
    outline: [
      "Intro — what whatsapp-web.js solves and when to use the official API instead (keyword early)",
      "Architecture and tradeoffs: whatsapp-web.js vs official Cloud API",
      "Message patterns, idempotency, rate limits, session management",
      "Error handling and reconnection strategies",
      "Privacy and compliance considerations",
      "Conclusion + links to event-driven and microservice articles",
    ],
    relatedTo: [6],
  },

  // ── Tier 3 — general backend depth / infra credibility ─────────────────

  {
    title: "Event-Driven Node.js: Kafka vs BullMQ for Background Jobs",
    tier: 3,
    format: "long-form",
    seo: {
      mainKeyword: "Kafka vs BullMQ Node.js",
      longTailKeywords: [
        "Node.js event-driven architecture",
        "BullMQ vs Kafka when to use",
        "job queue vs message broker Node.js",
        "exactly-once delivery Node.js",
      ],
      metaTitle: "Event-Driven Node.js: Kafka vs BullMQ for Background Jobs",
      metaDescription:
        "When to use Kafka vs BullMQ in Node.js — delivery semantics, event sourcing, CQRS patterns, and monitoring techniques for event-driven backends.",
      audience: "backend developers, platform engineers",
    },
    cluster: {
      pillar: true,
      supporting: [
        "Distributed Tracing for Kafka/BullMQ Workflows in Node.js",
        "Event Sourcing in Node.js: A Practical Implementation Guide",
      ],
    },
    outline: [
      "Intro — why event-driven matters and when each tool fits (keyword in first paragraph)",
      "When to choose event buses vs job queues",
      "Patterns: event sourcing, CQRS, durable workflows",
      "Delivery semantics: at-most-once, at-least-once, exactly-once",
      "Monitoring and debugging techniques for event pipelines",
      "Conclusion + links to observability and microservice articles",
    ],
    relatedTo: [2, 8],
  },
  {
    title: "Node.js Observability: OpenTelemetry, Prometheus, and Grafana Setup",
    tier: 3,
    format: "long-form",
    seo: {
      mainKeyword: "Node.js observability OpenTelemetry",
      longTailKeywords: [
        "NestJS OpenTelemetry setup",
        "Prometheus Grafana dashboards for Node.js",
        "trace requests in Node.js microservices",
        "Node.js metrics logging best practices",
      ],
      metaTitle: "Node.js Observability: OpenTelemetry, Prometheus, Grafana Setup",
      metaDescription:
        "Step-by-step guide to Node.js observability with OpenTelemetry, Prometheus, and Grafana. Covers instrumentation, sampling, dashboards, and SLO alerting.",
      audience: "backend developers, SREs",
    },
    cluster: {
      pillar: true,
      supporting: [
        "Instrumenting NestJS Microservices with OpenTelemetry Traces and Metrics",
        "Building Grafana Dashboards for Node.js Latency and Error Rates",
        "Distributed Tracing for Kafka/BullMQ Workflows in Node.js",
      ],
    },
    outline: [
      "Intro — why observability is non-negotiable for production services (keyword early)",
      "Instrumentation points: traces, metrics, logs",
      "Sampling strategies, correlation IDs, high-cardinality pitfalls",
      "Dashboards and SLOs to show to managers",
      "Example setup and alert rules",
      "Conclusion + links to event-driven and AI deployment articles",
    ],
    relatedTo: [3, 6],
  },
  {
    title: "GraphQL vs REST: Real Tradeoffs from a Full-Stack Project",
    tier: 3,
    format: "long-form",
    seo: {
      mainKeyword: "GraphQL vs REST",
      longTailKeywords: [
        "GraphQL vs REST when to use",
        "GraphQL N+1 problem solution",
        "REST API caching strategies",
        "GraphQL schema evolution Node.js",
      ],
      metaTitle: "GraphQL vs REST: Real Tradeoffs from a Full-Stack Project",
      metaDescription:
        "Honest comparison of GraphQL vs REST from a real Eventify project — developer experience, caching, N+1 pitfalls, schema evolution, and when to pick each.",
      audience: "full-stack developers, architects",
    },
    cluster: {
      pillar: false,
      supporting: [],
    },
    outline: [
      "Intro — the real tradeoffs beyond hype (keyword in first paragraph)",
      "Developer experience, caching, complexity, monitoring",
      "When to pick GraphQL vs REST (team size, clients, data patterns)",
      "Migration path and pitfalls (N+1, schema evolution)",
      "Conclusion + links to event-driven and observability articles",
    ],
    relatedTo: [6],
  },
  {
    title: "CI/CD for AI Features: Vector Store Migrations and Prompt Rollouts",
    tier: 3,
    format: "medium-form",
    seo: {
      mainKeyword: "CI/CD for AI features",
      longTailKeywords: [
        "deploy prompt changes safely",
        "pgvector schema migration CI pipeline",
        "canary deployment for LLM prompts",
        "rollback AI model updates",
      ],
      metaTitle: "CI/CD for AI Features: Vector Store Migrations and Prompt Rollouts",
      metaDescription:
        "CI/CD patterns for AI features — versioning pgvector schemas, canary prompt deployments, regression testing, and rollback strategies for prompt quality.",
      audience: "backend developers, DevOps engineers",
    },
    cluster: {
      pillar: false,
      supporting: [],
    },
    outline: [
      "Intro — why AI features need different deployment strategies (keyword early)",
      "Versioning vector store schemas alongside application code",
      "Canary deployments for prompt and template changes",
      "Automated regression testing in the deployment pipeline",
      "Rollback strategies when a prompt update degrades quality",
      "Infrastructure-as-code for pgvector and embedding services",
      "Conclusion + links to prompt engineering and testing articles",
    ],
    relatedTo: [0, 1, 4],
  },
  {
    title: "A/B Testing LLM Responses: Metrics for Quality and Satisfaction",
    tier: 3,
    format: "medium-form",
    seo: {
      mainKeyword: "A/B testing LLM responses",
      longTailKeywords: [
        "LLM response quality metrics",
        "precision@k retrieval evaluation",
        "hallucination rate measurement",
        "user satisfaction LLM A/B test",
      ],
      metaTitle: "A/B Testing LLM Responses: Metrics for Quality and Satisfaction",
      metaDescription:
        "How to A/B test LLM responses in production — precision@k, hallucination detection, user satisfaction signals, and statistical significance with high variance.",
      audience: "AI engineers, product managers",
    },
    cluster: {
      pillar: false,
      supporting: [],
    },
    outline: [
      "Intro — why A/B testing non-deterministic outputs is different (keyword early)",
      "Designing experiments for non-deterministic outputs",
      "Retrieval quality metrics: precision@k, MRR, recall@k",
      "Generation quality: hallucination detection, factual consistency scoring",
      "User-facing signals: click-through, dwell time, thumbs up/down",
      "Statistical significance with small samples and high variance",
      "Conclusion + links to prompt engineering and RAG articles",
    ],
    relatedTo: [0, 1],
  },
];

/**
 * Flat string array of titles — backward-compatible with generate.mjs prompt template.
 * Usage: TOPIC_TITLES.map(t => `- ${t}`).join("\n")
 */
export const TOPIC_TITLES = TOPIC_PILLARS.map((p) => p.title);

/**
 * SEO brief for a given pillar — usable in the generator prompt or editorial planning.
 * Returns null if index is out of range.
 * @param {number} index - Index into TOPIC_PILLARS
 * @returns {object|null} SEO metadata block
 */
export function getSeoBrief(index) {
  const pillar = TOPIC_PILLARS[index];
  return pillar?.seo ?? null;
}
