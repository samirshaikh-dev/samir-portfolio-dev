export type TechnicalSkillFAQCategory =
  | "Overview & Stack"
  | "Programming Languages"
  | "System Design & Architecture"
  | "Frontend Engineering"
  | "Backend & APIs"
  | "Databases & BaaS"
  | "Messaging & Queues"
  | "Cloud & DevOps"
  | "DevOps & Cloud"
  | "Monitoring & Observability"
  | "Security & Authentication"
  | "Performance & Optimization"
  | "Testing & Quality"
  | "AI & Workflows"
  | "Development Tools & Workflow"
  | "Soft Skills & Collaboration";

export interface TechnicalSkillFAQItem {
  id: string;
  category: TechnicalSkillFAQCategory;
  question: string;
  answer: string;
  tags?: string[];
}

export interface SkillCategoryItem {
  name: string;
  tag?: string;
}

export interface SkillGroup {
  number: string;
  title: string;
  description: string;
  items: SkillCategoryItem[];
}

export interface SystemDesignConcept {
  name: string;
  sub: string;
  description: string;
  highlights: string[];
}

export const SYSTEM_DESIGN_CONCEPTS: SystemDesignConcept[] = [
  {
    name: "Microservices",
    sub: "Distributed & Domain-Driven",
    description:
      "Decoupled, independently deployable services organized around discrete business capabilities, communicating via lightweight REST/gRPC or asynchronous event streams (Kafka / BullMQ) with isolated datastores.",
    highlights: ["Independent Scaling", "Fault Isolation", "Event-Driven Messaging", "Decoupled Deployments"],
  },
  {
    name: "Modular Monolith",
    sub: "Bounded Contexts & In-Process Isolation",
    description:
      "Single unified deployable unit organized strictly into isolated, bounded domain modules with explicit dependency contracts and private schemas, avoiding premature distributed systems overhead.",
    highlights: ["Zero Network Latency", "Strict Module Boundaries", "Single-Repo Velocity", "Clear Migration Path"],
  },
  {
    name: "Monolithic Architecture",
    sub: "Unified Codebase & Cohesion",
    description:
      "Unified codebase and single runtime deployment sharing a centralized database, ideal for rapid prototyping, transactional consistency across domains, and zero inter-service network complexity.",
    highlights: ["Transactional Consistency", "Simplified CI/CD", "Low Operational Overhead", "Rapid Iteration"],
  },
  {
    name: "Event-Driven Architecture (EDA)",
    sub: "Asynchronous Pub/Sub & Decoupling",
    description:
      "Designing systems around state-change events using message brokers (Apache Kafka, BullMQ). Services produce and consume immutable event streams asynchronously, eliminating synchronous request-response bottlenecks.",
    highlights: ["Loose Coupling", "Async Pub/Sub", "Kafka & BullMQ", "Partitioned Streams"],
  },
  {
    name: "API Gateway Pattern",
    sub: "Perimeter Routing & Security",
    description:
      "Centralized entry point managing traffic routing, rate limiting, SSL/TLS termination, JWT authentication verification, telemetry collection, and dynamic routing to upstream backend services.",
    highlights: ["Centralized Auth", "Rate Limiting", "Request Routing", "DDoS Mitigation"],
  },
  {
    name: "Distributed Caching",
    sub: "Multi-Tier In-Memory Acceleration",
    description:
      "Strategic implementation of Redis cache-aside and write-through patterns with TTL eviction policies to drastically reduce relational database load and achieve sub-millisecond response times.",
    highlights: ["Redis TTL", "Cache-Aside Pattern", "Sub-Millisecond Latency", "Database Offloading"],
  },
  {
    name: "Circuit Breaker & Resilience",
    sub: "Cascading Failure Prevention",
    description:
      "Safeguarding distributed architectures against downstream outages using circuit breakers, automated exponential backoff retries, dead-letter queues (DLQ), and graceful degradation fallbacks.",
    highlights: ["Circuit Breaker", "Dead-Letter Queues (DLQ)", "Graceful Degradation", "Exponential Backoff"],
  },
  {
    name: "CQRS & Data Segregation",
    sub: "Read & Write Path Separation",
    description:
      "Architecturally separating state-mutating command workflows from high-throughput query read paths, enabling dedicated read replicas, schema indexing optimizations, and projection tables.",
    highlights: ["Read Replicas", "Optimized Query Paths", "Projection Tables", "Independent Scaling"],
  },
];

export interface SoftwareEngineeringConcept {
  name: string;
  sub: string;
}

export const SOFTWARE_ENGINEERING_CONCEPTS: SoftwareEngineeringConcept[] = [
  { name: "RBAC", sub: "Role-Based Access Control" },
  { name: "RESTful API Design", sub: "Resource Modeling" },
  { name: "Query Optimisation", sub: "Indexes & Execution Plans" },
  { name: "Performance Profiling", sub: "Bottleneck Analysis" },
  { name: "Caching", sub: "In-Memory & TTL Strategies" },
  { name: "Rate Limiting", sub: "Traffic Throttling & DDoS Protection" },
  { name: "Security Best Practices", sub: "Defense in Depth" },
  { name: "MVC", sub: "Model-View-Controller" },
  { name: "Agile", sub: "Iterative Delivery" },
  { name: "Asynchronous Programming", sub: "Non-Blocking I/O" },
];

export const TECHNICAL_SKILLS_FAQS: TechnicalSkillFAQItem[] = [
  {
    id: "technologies-worked-with",
    category: "Overview & Stack",
    question: "What is Samir Shaikh's core technology stack as an AI Backend Engineer?",
    answer:
      "Samir Shaikh operates as an AI Backend Engineer and full-stack developer (backend-first) with a core stack centered on TypeScript, JavaScript (ES6+ / ESM), Node.js, Express.js, GraphQL, and Next.js. For datastores and distributed systems, he develops with PostgreSQL, MongoDB, MySQL, Redis, Apache Kafka, BullMQ, and Docker, with automated testing in Jest and monitoring via Prometheus and Grafana.",
    tags: [
      "AI Backend Engineer",
      "TypeScript Developer",
      "Node.js Stack",
      "Full Stack Engineer",
      "Distributed Systems",
      "PostgreSQL",
      "Next.js",
    ],
  },
  {
    id: "frontend-technologies-used",
    category: "Frontend Engineering",
    question: "What frontend technologies and architecture patterns does Samir Shaikh use?",
    answer:
      "Samir Shaikh builds accessible, high-performance interfaces using React.js, Next.js, and TypeScript, utilizing React Hooks, modular Component Architecture, and state management via Redux Toolkit (RTK) and Context API. For styling and user experience, he leverages Tailwind CSS, shadcn/ui, and Framer Motion, with strict emphasis on mobile-first Responsive Design and Cross-Browser Design.",
    tags: [
      "Frontend Engineering",
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
      "Redux Toolkit",
      "Component Architecture",
      "Responsive Design",
    ],
  },
  {
    id: "backend-technologies-used",
    category: "Backend & APIs",
    question: "What backend frameworks, ORMs, and API protocols does Samir Shaikh develop with?",
    answer:
      "Samir Shaikh architects scalable server runtimes using Node.js and Express.js, paired with Sequelize ORM for database abstraction and relational modeling. He builds both high-throughput REST APIs and GraphQL schemas, integrating Payment Gateways, asynchronous Webhooks, real-time Socket.io channels, stateless JWT authentication, and bcrypt encryption.",
    tags: [
      "Backend Engineering",
      "Node.js",
      "Express.js",
      "Sequelize ORM",
      "REST APIs",
      "GraphQL",
      "Socket.io",
      "JWT Auth",
      "Payment Gateways",
    ],
  },
  {
    id: "graphql-and-rest-apis",
    category: "Backend & APIs",
    question: "Does Samir Shaikh work with GraphQL, Apollo Server, and DataLoader?",
    answer:
      "Yes. Samir Shaikh has deep practical experience engineering production GraphQL APIs using Apollo Server and Apollo Client, defining strongly-typed GraphQL Schemas and Resolvers. He implements DataLoader batching and caching patterns to eliminate the classic N+1 query problem, alongside standard RESTful API endpoint design.",
    tags: [
      "GraphQL",
      "Apollo Server",
      "DataLoader",
      "N+1 Problem",
      "Apollo Client",
      "RESTful API Design",
      "Schema Design",
    ],
  },
  {
    id: "databases-and-storage",
    category: "Databases & BaaS",
    question: "What databases, caching layers, and BaaS platforms does Samir Shaikh work with?",
    answer:
      "Samir Shaikh works with relational databases including PostgreSQL and MySQL for transactional integrity, alongside document databases like MongoDB and Firestore. For sub-millisecond data retrieval and session caching, he implements Redis, complemented by Firebase Authentication and Firebase cloud services for rapid backend-as-a-service delivery.",
    tags: [
      "Databases",
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Redis Caching",
      "Firebase Authentication",
      "Firestore",
      "BaaS",
    ],
  },
  {
    id: "ai-and-llm-apis",
    category: "AI & Workflows",
    question: "Does Samir Shaikh integrate AI models, LLM APIs, and agent-assisted coding?",
    answer:
      "Yes. Samir Shaikh integrates LLM APIs into production applications and operates an agent-assisted engineering loop using ChatGPT, Claude, Cursor, GitHub Copilot, and AI-native IDEs. He uses AI tools to accelerate boilerplate generation and refactoring while strictly owning system architecture, prompt engineering, security boundaries, and edge-case verification by hand.",
    tags: [
      "AI Integration",
      "LLM APIs",
      "Cursor",
      "Claude",
      "GitHub Copilot",
      "Agentic AI",
      "Prompt Engineering",
      "AI-Native IDEs",
    ],
  },
  {
    id: "system-design-microservices-monolith",
    category: "System Design & Architecture",
    question: "How does Samir Shaikh approach System Design across Monoliths, Modular Monoliths, and Microservices?",
    answer:
      "Samir Shaikh approaches system design with pragmatic trade-off analysis: starting with a clean Monolithic or Modular Monolith architecture where domain modules have strict boundaries, encapsulated data models, and clear interfaces. When specific domains demand independent deployment velocity, high-throughput elasticity, or dedicated databases, services are decoupled into event-driven Microservices using Apache Kafka or BullMQ.",
    tags: [
      "System Design",
      "Microservices",
      "Modular Monolith",
      "Monolithic Architecture",
      "Software Architecture",
      "Domain-Driven Design",
      "Scalability",
    ],
  },
  {
    id: "event-driven-architecture-eda",
    category: "System Design & Architecture",
    question: "How does Samir Shaikh implement Event-Driven Architecture (EDA) and asynchronous systems?",
    answer:
      "Samir Shaikh designs Event-Driven Architectures using pub/sub messaging patterns and partitioned event streams with Apache Kafka and BullMQ. By replacing synchronous HTTP request chains with immutable event logs and worker consumer pools, downstream services scale independently without cascading blocking or timeout failures.",
    tags: [
      "Event-Driven Architecture",
      "Apache Kafka",
      "BullMQ",
      "Asynchronous Systems",
      "Pub/Sub",
      "Message Queues",
      "Loose Coupling",
    ],
  },
  {
    id: "programming-languages-expertise",
    category: "Programming Languages",
    question: "Which programming languages does Samir Shaikh specialize in for software engineering?",
    answer:
      "Samir Shaikh specializes in TypeScript and modern JavaScript (ES6+ / ESM). He writes type-safe, maintainable code utilizing strict compiler configurations, generics, utility types, and runtime schema validation, combined with deep mastery of the JavaScript event loop, asynchronous non-blocking I/O, and native ECMAScript modules.",
    tags: [
      "TypeScript",
      "JavaScript",
      "ES6+",
      "ESM",
      "Static Typing",
      "Generics",
      "Async Programming",
      "Event Loop",
    ],
  },
  {
    id: "messaging-and-event-queues",
    category: "Messaging & Queues",
    question: "What tools does Samir Shaikh use for distributed queues, event streams, and notifications?",
    answer:
      "Samir Shaikh utilizes BullMQ for Redis-backed distributed task queues, delayed job processing, and worker retries; Apache Kafka for high-throughput partitioned event logs across microservices; and Firebase Cloud Messaging (FCM) for targeted real-time push notifications across web and mobile clients.",
    tags: [
      "BullMQ",
      "Apache Kafka",
      "Firebase Cloud Messaging",
      "Message Queues",
      "Event Streaming",
      "Push Notifications",
      "Background Jobs",
    ],
  },
  {
    id: "devops-and-cloud",
    category: "Cloud & DevOps",
    question: "What DevOps, containerization, and CI/CD tools does Samir Shaikh use in production?",
    answer:
      "Samir Shaikh uses Docker and Docker Compose for local environment parity and containerized service deployment, coupled with automated CI/CD pipelines via GitHub Actions. His workflow incorporates Firebase Cloud Functions, Git branching strategies, atomic Pull Requests, peer Code Reviews, GitHub repository management, and Postman for API testing.",
    tags: [
      "DevOps",
      "Docker",
      "Docker Compose",
      "CI/CD Pipelines",
      "GitHub Actions",
      "Firebase Cloud Functions",
      "Git Workflow",
      "Postman",
    ],
  },
  {
    id: "monitoring-and-observability-tools",
    category: "Monitoring & Observability",
    question: "How does Samir Shaikh implement monitoring, latency profiling, and observability with Prometheus and Grafana?",
    answer:
      "Samir Shaikh configures production observability by instrumenting backend services with Prometheus for metric scraping, time-series data aggregation, and API response latency tracking. He builds interactive operational dashboards and alerting rules in Grafana to monitor system error rates, memory consumption, throughput spikes, and overall service health.",
    tags: [
      "Observability",
      "Prometheus",
      "Grafana",
      "System Monitoring",
      "Time-Series Metrics",
      "Latency Profiling",
      "Operational Dashboards",
    ],
  },
  {
    id: "security-authentication-rbac",
    category: "Security & Authentication",
    question: "How does Samir Shaikh enforce API security, RBAC authorization, and cryptographic authentication?",
    answer:
      "Samir Shaikh implements defense-in-depth API security using Role-Based Access Control (RBAC) to enforce granular endpoint permissions, stateless JWT token management for session validation, and bcrypt for cryptographic password hashing. He layers in IP and device rate limiting for DDoS mitigation and input sanitization to eliminate injection risks.",
    tags: [
      "API Security",
      "RBAC",
      "JWT",
      "bcrypt",
      "Authentication",
      "Rate Limiting",
      "Defense in Depth",
      "Authorization",
    ],
  },
  {
    id: "query-optimization-caching",
    category: "Performance & Optimization",
    question: "What techniques does Samir Shaikh use for PostgreSQL query optimization, caching, and performance tuning?",
    answer:
      "Samir Shaikh optimizes database performance through EXPLAIN ANALYZE execution plan profiling, compound B-tree and specialized indexes in PostgreSQL and MySQL, and connection pooling. He implements multi-tier caching with Redis TTL eviction policies to minimize database overhead and DataLoader batching to eliminate N+1 GraphQL query round-trips.",
    tags: [
      "Performance Optimization",
      "Query Optimisation",
      "PostgreSQL",
      "Redis Caching",
      "DataLoader",
      "Execution Plans",
      "Indexing Strategies",
    ],
  },
  {
    id: "testing-tools-and-practices",
    category: "Testing & Quality",
    question: "What automated testing methodologies does Samir Shaikh practice with Jest?",
    answer:
      "Samir Shaikh practices comprehensive automated testing using Jest, designing Unit Tests for isolated domain rules, utility algorithms, and data transformers, alongside Integration Tests that validate API routes, database transactions, and middleware pipelines against realistic boundary conditions and error states.",
    tags: [
      "Automated Testing",
      "Jest",
      "Unit Testing",
      "Integration Testing",
      "Code Quality",
      "Test-Driven Development",
      "API Testing",
    ],
  },
  {
    id: "developer-tools-workflow",
    category: "Development Tools & Workflow",
    question: "What daily tools and collaboration workflows does Samir Shaikh use to maintain code velocity and quality?",
    answer:
      "Samir Shaikh follows a disciplined engineering workflow: prototyping and contract-testing endpoints in Postman, orchestrating local multi-container services with Docker Compose, pairing with AI coding assistants (Cursor, Copilot, Claude), and enforcing repository standards through atomic Git Pull Requests, code reviews, and automated GitHub Actions CI checks.",
    tags: [
      "Developer Tools",
      "Postman",
      "Docker Compose",
      "Cursor",
      "GitHub",
      "Code Reviews",
      "CI/CD",
      "Engineering Workflow",
    ],
  },
  {
    id: "soft-skills-collaboration",
    category: "Soft Skills & Collaboration",
    question: "What problem-solving, documentation, and cross-functional collaboration skills does Samir Shaikh bring to engineering teams?",
    answer:
      "Samir Shaikh brings structured analytical problem-solving, decomposing ambiguous technical requirements into incremental testable deliverables. He actively collaborates across design, product, and remote engineering teams using agile sprints, while authoring clear technical documentation, API specifications, and Architecture Decision Records (ADRs).",
    tags: [
      "Soft Skills",
      "Problem-Solving",
      "Cross-Functional Collaboration",
      "Technical Documentation",
      "Agile Sprints",
      "ADR",
      "Remote Engineering",
    ],
  },
];
