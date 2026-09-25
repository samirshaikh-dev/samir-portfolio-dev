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
    question: "What technologies does Samir Shaikh work with?",
    answer:
      "Samir Shaikh works with JavaScript (ES6+ / ESM), TypeScript, React.js, Next.js, Node.js, Express.js, GraphQL, REST APIs, PostgreSQL, MongoDB, MySQL, Redis, Firebase, Docker, Jest, BullMQ, Apache Kafka, Prometheus, and Grafana, along with AI-assisted tools like Cursor, Claude, and GitHub Copilot.",
    tags: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "Full Stack",
    ],
  },
  {
    id: "frontend-technologies-used",
    category: "Frontend Engineering",
    question: "What frontend technologies does Samir Shaikh use?",
    answer:
      "Samir's frontend stack includes React.js, Next.js, React Hooks, Component Architecture, Redux Toolkit (RTK), Context API, HTML5, CSS3, Tailwind CSS, shadcn/ui, and Framer Motion, with strong focus on Responsive Design and Cross-Browser Design.",
    tags: [
      "React.js",
      "Next.js",
      "React Hooks",
      "Tailwind CSS",
      "shadcn/ui",
      "Redux Toolkit",
      "Framer Motion",
    ],
  },
  {
    id: "backend-technologies-used",
    category: "Backend & APIs",
    question: "What backend technologies does Samir Shaikh use?",
    answer:
      "Samir builds backends using Node.js, Express.js, GraphQL (Apollo Server, Apollo Client, Schemas, Resolvers, DataLoader), REST APIs, Sequelize ORM, Webhooks, Socket.io, JWT authentication, and bcrypt encryption, alongside Payment Gateways integration.",
    tags: [
      "Node.js",
      "Express.js",
      "GraphQL",
      "REST APIs",
      "Sequelize",
      "JWT",
      "Socket.io",
      "Webhooks",
    ],
  },
  {
    id: "graphql-and-rest-apis",
    category: "Backend & APIs",
    question: "Does Samir Shaikh work with GraphQL and REST APIs?",
    answer:
      "Yes. Samir has extensive experience designing and implementing both RESTful APIs and GraphQL systems using Apollo Server and Apollo Client, crafting custom schemas, query resolvers, mutation handlers, and DataLoader batching to eliminate N+1 query bottlenecks.",
    tags: [
      "GraphQL",
      "Apollo Server",
      "DataLoader",
      "RESTful API Design",
      "GraphQL Schemas",
    ],
  },
  {
    id: "databases-and-storage",
    category: "Databases & BaaS",
    question: "What databases does Samir Shaikh work with?",
    answer:
      "Samir works with relational databases including PostgreSQL and MySQL, document stores such as MongoDB and Firestore, in-memory caching layers like Redis, and Firebase backend services including Firebase Authentication.",
    tags: [
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Redis",
      "Firebase",
      "Firestore",
    ],
  },
  {
    id: "ai-and-llm-apis",
    category: "AI & Workflows",
    question: "Does Samir Shaikh work with AI and LLM APIs?",
    answer:
      "Yes. Samir integrates LLM APIs into applications and utilizes an AI-assisted engineering workflow leveraging ChatGPT, Claude, Cursor, GitHub Copilot, and AI-native IDEs for rapid implementation while retaining manual ownership over architecture, security, and verification.",
    tags: [
      "ChatGPT",
      "Claude",
      "Cursor",
      "GitHub Copilot",
      "LLM API Integration",
      "AI-Native IDEs",
    ],
  },
  {
    id: "devops-and-cloud",
    category: "DevOps & Cloud",
    question: "What DevOps and cloud technologies does Samir Shaikh use?",
    answer:
      "Samir uses Docker, Docker Compose, GitHub Actions for automated CI/CD pipelines, Firebase Cloud Functions, Git branching, Pull Requests, Code Reviews, GitHub, and Postman for API testing and collaboration.",
    tags: [
      "Docker",
      "Docker Compose",
      "CI/CD Pipelines",
      "GitHub Actions",
      "Git",
      "Postman",
    ],
  },
  {
    id: "testing-tools-and-practices",
    category: "Testing & Quality",
    question: "What testing tools does Samir Shaikh use?",
    answer:
      "Samir utilizes Jest for automated testing, implementing both Unit Testing for isolated business logic and Integration Testing for API routes, database operations, and system workflows.",
    tags: [
      "Jest",
      "Unit Testing",
      "Integration Testing",
      "Automated Testing",
    ],
  },
  {
    id: "system-design-microservices-monolith",
    category: "System Design & Architecture",
    question: "How does Samir Shaikh approach System Design across Monoliths, Modular Monoliths, and Microservices?",
    answer:
      "Samir approaches system architecture pragmatically based on domain complexity, team structure, and scaling requirements. He advocates starting with a clean Monolithic or Modular Monolith architecture where domain modules have strict boundaries, encapsulated data models, and clear interfaces. When specific domains demand independent deployment cadences, specialized scaling, or separate datastores, services are decoupled into event-driven Microservices using Apache Kafka or BullMQ with asynchronous event streaming.",
    tags: [
      "System Design",
      "Microservices",
      "Modular Monolith",
      "Monolithic Architecture",
      "Event-Driven Architecture",
      "Distributed Systems",
    ],
  },
  {
    id: "programming-languages-expertise",
    category: "Programming Languages",
    question: "Which programming languages does Samir Shaikh specialize in?",
    answer:
      "Samir specializes in TypeScript and JavaScript (ES6+ / ESM). He writes strictly-typed, scalable applications leveraging modern ECMAScript standards, asynchronous event loops, promises, async/await patterns, type interfaces, and generics.",
    tags: [
      "TypeScript",
      "JavaScript",
      "ES6+",
      "ESM",
      "Async Programming",
      "Static Typing",
    ],
  },
  {
    id: "messaging-and-event-queues",
    category: "Messaging & Queues",
    question: "What tools does Samir Shaikh use for messaging, background queues, and notifications?",
    answer:
      "Samir utilizes BullMQ for Redis-backed distributed task queues and scheduled job processing, Apache Kafka for high-throughput partitioned event streaming across microservices, and Firebase Cloud Messaging (FCM) for reliable client push notifications.",
    tags: [
      "BullMQ",
      "Apache Kafka",
      "Firebase Cloud Messaging",
      "Event Streaming",
      "Task Queues",
    ],
  },
  {
    id: "monitoring-and-observability-tools",
    category: "Monitoring & Observability",
    question: "How does Samir Shaikh monitor production services and handle observability?",
    answer:
      "Samir uses Prometheus for time-series metric collection, endpoint scraping, and latency tracking, coupled with Grafana for composing operational dashboards, service health visualizations, error rate monitoring, and automated alerting.",
    tags: [
      "Prometheus",
      "Grafana",
      "Observability",
      "Metrics",
      "Dashboards",
      "Latency Tracking",
    ],
  },
  {
    id: "security-authentication-rbac",
    category: "Security & Authentication",
    question: "How does Samir Shaikh implement authentication, authorization, and API security?",
    answer:
      "Samir enforces security best practices through Role-Based Access Control (RBAC), stateless JWT authentication, cryptographic bcrypt password hashing, API rate limiting for DDoS mitigation, and input validation to protect against injection and unauthorized access.",
    tags: [
      "RBAC",
      "JWT",
      "bcrypt",
      "Security Best Practices",
      "Rate Limiting",
      "Authentication",
    ],
  },
  {
    id: "query-optimization-caching",
    category: "Performance & Optimization",
    question: "What strategies does Samir Shaikh use for database query optimization and performance?",
    answer:
      "Samir utilizes execution plan profiling, compound database indexing in PostgreSQL and MySQL, in-memory caching with Redis TTL policies, and DataLoader batching to resolve N+1 query overhead in GraphQL architectures.",
    tags: [
      "Query Optimisation",
      "Caching",
      "Performance Profiling",
      "DataLoader",
      "Redis",
      "PostgreSQL",
    ],
  },
  {
    id: "developer-tools-workflow",
    category: "Development Tools & Workflow",
    question: "What tools and daily workflows does Samir Shaikh use to maintain code quality?",
    answer:
      "Samir follows a disciplined workflow using Git branching, atomic Pull Requests, peer Code Reviews, Postman for API testing, Docker and Docker Compose for reproducible local environments, and GitHub Actions for continuous integration (CI/CD).",
    tags: [
      "Git",
      "GitHub",
      "Postman",
      "Docker Compose",
      "CI/CD Pipelines",
      "Code Reviews",
    ],
  },
  {
    id: "soft-skills-collaboration",
    category: "Soft Skills & Collaboration",
    question: "What soft skills and cross-functional collaboration practices does Samir Shaikh bring to teams?",
    answer:
      "Samir brings structured problem-solving, active cross-functional collaboration with design and product teams, agile delivery practices, and comprehensive technical documentation including API contracts and architecture decision records.",
    tags: [
      "Problem-Solving",
      "Cross-Functional Collaboration",
      "Technical Documentation",
      "Agile",
    ],
  },
];
