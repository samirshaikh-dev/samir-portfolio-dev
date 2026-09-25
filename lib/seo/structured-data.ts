import {
  APP_URL,
  AUTHOR_NAME,
  AUTHOR_EMAIL,
  AUTHOR_PHONE,
  SITE_NAME,
  LINKEDIN_URL,
  GITHUB_URL,
} from "@/lib/site-config";
import { SERVICE_CATEGORIES } from "@/lib/data/services";

export const SAME_AS = [
  LINKEDIN_URL,
  GITHUB_URL,
];

/**
 * Long-tail, intent-rich search phrases the brand should be associated with.
 * Surfaced as `keywords` on the WebSite/Organization/ProfessionalService nodes to strengthen GEO
 * (Generative Engine Optimization) entity relationships and AI answer engine citations.
 */
export const LONGTAIL_KEYWORDS = [
  "freelance AI developer",
  "freelance AI engineer",
  "freelance AI developer fixed price",
  "freelance website developer",
  "freelance backend developer",
  "freelance full stack developer",
  "hire freelance AI developer",
  "hire website developer for business",
  "custom website development services",
  "Next.js website developer",
  "business website developer for hire",
  "landing page developer for SaaS",
  "SEO optimization services",
  "freelance SEO specialist",
  "technical SEO audit and optimization",
  "website speed optimization services",
  "Core Web Vitals speed optimization",
  "website redesign services",
  "AI chatbot for website",
  "AI chatbot for SaaS",
  "custom knowledge base AI",
  "custom knowledge base with pgvector",
  "stop chatbot from hallucinating",
  "improve AI chatbot accuracy",
  "production-grade AI chatbot",
  "production-grade AI application",
  "production-grade RAG pipeline",
  "RAG chatbot development",
  "AI workflow automation for startups",
  "AI agent development services",
  "AI agent development with tool calling",
  "AI development services",
  "custom AI development",
  "Forward Deployed Engineer for AI products",
  "hire Forward Deployed AI Engineer",
  "Forward Deployed Engineer FDE contract",
  "hire AI-enabled full stack developer",
  "AI-enabled full stack developer backend-first",
  "vector search and semantic search implementation",
  "hire a backend developer for my startup",
  "Node.js developer for hire remote",
  "freelance RAG pipeline developer",
  "build a semantic search engine with pgvector",
  "production RAG pipeline with pgvector and Gemini",
  "agentic AI orchestration and tool execution",
  "deterministic AI agents with Zod validation",
  "NestJS API development for SaaS",
  "reduce LLM hallucinations with RAG",
  "custom REST and GraphQL API development",
  "event-driven microservices architecture consultant",
  "scalable Node.js backend development",
  "AI backend engineer open to remote work",
  "Kafka and BullMQ event pipeline developer",
  "add AI chat to my existing product",
  "backend developer experienced with Docker and CI/CD",
  "TypeScript backend engineer for AI startups",
  "Next.js full stack developer for hire",
  "optimize slow PostgreSQL queries and APIs",
  "TypeScript backend developer for hire remote",
  "custom AI chatbot pricing",
  "hire freelance AI developer cost",
  "RAG pipeline development cost",
  "how much does an AI chatbot cost",
  "fixed price AI development sprint",
  "website development pricing for small business",
  "freelance AI developer portfolio",
  "hire freelance Next.js developer",
  "hire freelance backend engineer",
  "AI chatbot development company",
];

/**
 * Voice-search / conversational questions (AEO), framed around the problems
 * prospective clients and recruiters actually ask out loud.
 */
export const VOICE_QUERIES = [
  "who can build a custom website for my business",
  "who can improve my website Google SEO ranking",
  "who can fix my website speed and Core Web Vitals",
  "who can build an AI chatbot for my website",
  "who can build an AI chatbot for my SaaS",
  "how do I stop my AI chatbot from hallucinating",
  "who builds custom knowledge bases with AI",
  "how do I hire a freelance AI developer",
  "which developer can integrate an LLM into my product",
  "who builds scalable Node.js backends for startups",
  "how do I hire a backend engineer for an AI project",
  "who can build a RAG system that stops my chatbot from hallucinating",
  "which engineer can turn my monolith into microservices",
  "how do I find a remote TypeScript backend developer",
  "who builds event-driven systems with Kafka and Redis",
  "how do I hire a Forward Deployed Engineer for an AI startup",
  "how much does it cost to build a custom AI chatbot",
  "how much does a freelance AI developer charge",
  "who can build an MVP for my startup in 2 weeks",
  "how much does it cost to build a custom business website",
];

/** Industries this personal brand serves. */
export const INDUSTRIES_SERVED = [
  "SaaS",
  "Startups",
  "E-commerce",
  "Fintech",
  "EdTech",
  "Healthcare Technology",
  "Developer Tools",
  "AI Products",
];

/** Geographic markets served (aligned with the PRD hiring markets). */
export const AREA_SERVED = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "Netherlands",
  "Australia",
  "Singapore",
  "India",
  "Worldwide (Remote)",
];

/** Concrete, problem-oriented services offered dynamically mapped from the canonical service definitions. */
export const SERVICES = SERVICE_CATEGORIES.flatMap((cat) =>
  cat.services.map((service) => ({
    id: service.id,
    name: service.title,
    description: service.description,
    price: service.priceAmount || "0",
    priceCurrency: service.priceCurrency || "USD",
    priceLabel: service.startingPrice || "Custom Quote",
    category: cat.title,
    serviceType: service.title,
    audience: service.audience,
    deliverables: service.deliverables,
    techStack: service.techStack,
  }))
);

/** Reusable Offer nodes built from SERVICES (shared by Person, Organization, and ProfessionalService). */
const SERVICE_OFFERS = SERVICES.map((service) => ({
  "@type": "Offer",
  ...(service.price !== "0" && {
    price: service.price,
    priceCurrency: service.priceCurrency,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: service.price,
      priceCurrency: service.priceCurrency,
      unitText: service.priceLabel,
    },
  }),
  url: `${APP_URL}/services#${service.id}`,
  availability: "https://schema.org/InStock",
  validFrom: "2025-01-01",
  itemOffered: {
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    category: service.category,
    description: service.description,
    url: `${APP_URL}/services#${service.id}`,
    provider: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: APP_URL,
    },
    areaServed: AREA_SERVED,
    termsOfService: `${APP_URL}/terms-of-service`,
    ...(service.audience && {
      audience: {
        "@type": "Audience",
        audienceType: service.audience,
      },
    }),
  },
}));


export function getRootJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: AUTHOR_NAME,
      url: APP_URL,
      image: `${APP_URL}/Filled_Logo.png`,
      email: AUTHOR_EMAIL,
      telephone: AUTHOR_PHONE,
      jobTitle: "Freelance AI Developer & Full Stack Engineer",
      description:
        "Helping startups, founders, and product teams build reliable AI agents, custom RAG knowledge bases, and scalable full-stack web applications. Freelance AI developer and backend engineer available for sprints, contracts, and remote roles.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Vapi / Surat",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
      sameAs: SAME_AS,
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Uka Tarsadia University",
        sameAs: "https://utu.ac.in",
        educationalCredentialAwarded: "Bachelor of Technology in Information Technology",
      },
      hasOccupation: [
        {
          "@type": "Occupation",
          name: "Forward Deployed Engineer (FDE)",
          occupationLocation: {
            "@type": "Country",
            name: "IN",
          },
          skills: "AI Backend Engineering, Rapid Prototyping, Customer-Embedded Delivery, Production RAG Systems, AI Agents, PostgreSQL, pgvector, Next.js, API Integration, Production Hardening",
          validFrom: "2026",
        },
        {
          "@type": "Occupation",
          name: "Freelance AI Developer",
          occupationLocation: {
            "@type": "Country",
            name: "IN",
          },
          skills: "Node.js, TypeScript, Next.js, React, PostgreSQL, pgvector, RAG Systems, AI Chatbots, LLM Integration, AI Agents, SEO",
          validFrom: "2026",
        },
        {
          "@type": "Occupation",
          name: "AI-Enabled Full Stack Developer",
          occupationLocation: {
            "@type": "Country",
            name: "IN",
          },
          skills: "Node.js, TypeScript, Next.js, React, PostgreSQL, pgvector, RAG Systems, LLM Integration, AI Agents, Cursor, GitHub Copilot, Claude Code, Microservices, Docker, CI/CD",
          validFrom: "2026",
        },
        {
          "@type": "Occupation",
          name: "Full Stack Engineer",
          occupationLocation: {
            "@type": "Country",
            name: "IN",
          },
          skills: "Next.js, React, Node.js, TypeScript, PostgreSQL, MongoDB, Redis, Drizzle ORM, REST APIs, Payment Gateways, RBAC, Tailwind CSS",
          validFrom: "2026",
        },
        {
          "@type": "Occupation",
          name: "Back End Developer",
          occupationLocation: {
            "@type": "Country",
            name: "IN",
          },
          skills: "Node.js, TypeScript, PostgreSQL, MongoDB, Redis, Microservices, Firebase, REST APIs, Dittofeed, Reoon, OneSignal, Distributed Systems, Latency Optimization, Docker",
          validFrom: "2025-09",
        },
        {
          "@type": "Occupation",
          name: "AI Backend Engineer",
          occupationLocation: {
            "@type": "Country",
            name: "IN",
          },
          skills: "Node.js, TypeScript, PostgreSQL, pgvector, MongoDB, Redis, RAG Systems, LLM Integration, Microservices, Docker, Kafka, BullMQ, Vercel AI SDK, Gemini API",
          validFrom: "2024",
        },
      ],
      knowsAbout: [
        "AI Backend Engineering",
        "AI Software Development Engineering",
        "Full Stack Engineering",
        "Agentic AI",
        "AI Agents",
        "Multi-Agent Systems",
        "AI Orchestration",
        "Autonomous AI Workflows",
        "Tool-Using AI",
        "Retrieval Augmented Generation (RAG)",
        "LLM Integration",
        "Forward Deployed Engineering",
        "Customer-Embedded Problem Solving",
        "End-to-End Ownership",
        "Vector Search",
        "pgvector",
        "PostgreSQL pgvector",
        "Semantic Search",
        "Embeddings",
        "Vercel AI SDK",
        "Google Gemini API",
        "Prompt Engineering",
        "AI Chatbot Development",
        "Node.js",
        "Express.js",
        "NestJS",
        "GraphQL",
        "REST APIs",
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Redis",
        "Redis Pub/Sub & Caching",
        "Drizzle ORM",
        "Firebase",
        "BullMQ",
        "Apache Kafka",
        "Docker",
        "TypeScript",
        "JavaScript",
        "JWT",
        "Socket.io",
        "Sequelize",
        "OpenTelemetry",
        "Prometheus",
        "Grafana",
        "GitHub Actions",
        "CI/CD",
        "Microservices",
        "Next.js",
        "React",
        "Role-Based Access Control (RBAC)",
        "Payment Gateway Integration",
        "Database Architecture & Indexing",
      ],
      worksFor: [
        {
          "@type": "Organization",
          name: "Xira Infotech",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Vapi",
            addressRegion: "Gujarat",
            addressCountry: "IN",
          },
        },
        {
          "@type": "Organization",
          name: "LOGICWIND",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Surat",
            addressRegion: "Gujarat",
            addressCountry: "IN",
          },
        },
      ],
      knowsLanguage: "English",
      makesOffer: SERVICE_OFFERS,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: APP_URL,
      description:
        "Portfolio of Samir Shaikh — Freelance AI Developer & Full Stack Engineer helping startups and businesses build reliable AI agents, custom RAG chatbots, high-converting websites, and production backends.",
      author: {
        "@type": "Person",
        name: AUTHOR_NAME,
      },
      inLanguage: "en-US",
      keywords: LONGTAIL_KEYWORDS.join(", "),
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "h2"],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      alternateName: AUTHOR_NAME,
      url: APP_URL,
      logo: `${APP_URL}/Filled_Logo.png`,
      image: `${APP_URL}/Filled_Logo.png`,
      email: AUTHOR_EMAIL,
      telephone: AUTHOR_PHONE,
      description:
        "Freelance AI development and backend engineering services by Samir Shaikh — helping startups, founders, and product teams build production RAG systems, AI agents, Next.js applications, and scalable backends.",
      founder: {
        "@type": "Person",
        name: AUTHOR_NAME,
        url: APP_URL,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Vapi / Surat",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
      slogan: "Helping startups build reliable AI systems, high-converting websites, and production backends.",
      knowsAbout: INDUSTRIES_SERVED,
      areaServed: AREA_SERVED,
      keywords: LONGTAIL_KEYWORDS.join(", "),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Freelance AI & Web Engineering Services",
        itemListElement: SERVICE_OFFERS,
      },
      sameAs: SAME_AS,
    },
  ];
}

/**
 * Builds a CollectionPage + ItemList JSON-LD object for index/listing pages
 * (e.g. the blog and projects listings).
 */
export function getCollectionPageJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  items: { name: string; path: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: opts.name,
    description: opts.description,
    url: `${APP_URL}${opts.path}`,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: APP_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: opts.items.length,
      itemListElement: opts.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: `${APP_URL}${item.path}`,
      })),
    },
  };
}

/**
 * Standalone ProfessionalService JSON-LD describing the services, industries,
 * and markets served. Wire onto the /services page to reinforce the
 * service + industry entity graph for search and AI answer engines.
 */
export function getServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${AUTHOR_NAME} — Freelance AI Developer & Full Stack Engineering Services`,
    url: `${APP_URL}/services`,
    image: `${APP_URL}/Filled_Logo.png`,
    description:
      "Freelance AI developer, full-stack engineer, and Forward Deployed Engineer (FDE). Custom knowledge bases, production RAG chatbots, deterministic AI agents, high-converting Next.js business websites, scalable backend APIs, and technical SEO with fixed milestone pricing.",
    provider: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: APP_URL,
      email: AUTHOR_EMAIL,
      telephone: AUTHOR_PHONE,
      jobTitle: "Freelance AI Developer & Full Stack Engineer",
      sameAs: SAME_AS,
    },
    areaServed: AREA_SERVED,
    knowsAbout: [
      ...INDUSTRIES_SERVED,
      "Retrieval-Augmented Generation (RAG)",
      "PostgreSQL pgvector & Semantic Search",
      "AI Agent Workflows & Tool Calling",
      "Next.js 16 & React 19 Full-Stack Engineering",
      "Technical SEO & Schema.org JSON-LD",
      "Core Web Vitals Speed Optimization",
      "Distributed Backend Systems & BullMQ",
    ],
    priceRange: "$200 - $2500+",
    currenciesAccepted: "USD, INR",
    paymentAccepted: "Bank Transfer, Stripe, Wire Transfer",
    keywords: LONGTAIL_KEYWORDS.join(", "),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Freelance AI, Backend & Web Engineering Services",
      itemListElement: SERVICE_OFFERS,
    },
  };
}


/**
 * ContactPage JSON-LD for the /contact page.
 */
export function getContactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${AUTHOR_NAME}`,
    url: `${APP_URL}/contact`,
    description:
      "Get in touch with Samir Shaikh for AI backend engineering, RAG development, and forward deployed engineering roles.",
    mainEntity: {
      "@type": "Person",
      name: AUTHOR_NAME,
      email: AUTHOR_EMAIL,
      telephone: AUTHOR_PHONE,
      url: APP_URL,
    },
  };
}

/**
 * SpeakableSpecification JSON-LD for voice-search / voice-assistant surfaces.
 * Attach on content pages, targeting the headline and lead copy.
 */
export function getSpeakableJsonLd(
  cssSelector: string[] = ["h1", "h2", ".prose p"],
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector,
    },
  };
}

/**
 * FAQPage JSON-LD schema for FAQ and Q&A content pages.
 * Matches Schema.org standard for Google rich snippets and AEO answer extraction.
 */
export function getFaqPageJsonLd(
  faqs: { question: string; answer: string }[],
) {
  return {
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
}

/**
 * CollectionPage and EducationalOccupationalCredential JSON-LD for /certificates
 */
export function getCertificatesPageJsonLd(
  certList: Array<{
    title: string;
    issuer: string;
    issueDate: string;
    credentialUrl?: string | null;
    credentialId?: string | null;
    description?: string | null;
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Professional Certificates & Credentials | ${AUTHOR_NAME}`,
    description: `Verified accreditations, system architecture certifications, and technical specializations completed by ${AUTHOR_NAME}.`,
    url: `${APP_URL}/certificates`,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: APP_URL,
    },
    hasPart: certList.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      name: cert.title,
      credentialCategory: "Professional Certification",
      recognizedBy: {
        "@type": "Organization",
        name: cert.issuer,
      },
      dateCreated: cert.issueDate,
      ...(cert.credentialId ? { identifier: cert.credentialId } : {}),
      ...(cert.credentialUrl ? { url: cert.credentialUrl } : {}),
      ...(cert.description ? { description: cert.description } : {}),
    })),
  };
}

