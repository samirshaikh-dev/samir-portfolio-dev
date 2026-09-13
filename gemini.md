# Samir Shaikh Portfolio — Gemini Context & System Directives

## Project Overview
Personal portfolio, technical publication platform, and interactive engineering showcase for **Samir Shaikh** — AI Backend Engineer, AI SDE, and Agentic AI Engineer exploring Forward Deployed Engineer (FDE) roles.
- **Production URL:** `https://samir-portfolio-dev.vercel.app` (configured in `lib/site-config.ts` with fallback via `NEXTAUTH_URL`).
- **Primary Mission:** Establish authoritative technical positioning in AI backend engineering, RAG pipelines, agentic AI systems, scalable Node.js microservices, and customer-embedded problem solving.
- **Key Capabilities:** Dynamic RAG-powered chatbot with GitHub activity grounding, Web Push notifications, PWA support, interactive blog with comments & star ratings, dynamic RSS feed, automated SEO/AEO/GEO structured data, OpenGraph card generation, and an automated LLM-driven blog generation workflow.

## Tech Stack & Architecture
- **Framework:** Next.js 16 (App Router, webpack build), React 19, TypeScript 5
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`, `@tailwindcss/typography`), dark/light mode via `next-themes`
- **Database:** Neon (serverless PostgreSQL) + Drizzle ORM + pgvector (3072-dimensional vector store)
- **Authentication:** NextAuth v5 (`5.0.0-beta.31`, GitHub OAuth + Credentials) + Dual-mode Bearer token auth (`BLOG_AUTOMATION_TOKEN`) via `lib/api-auth.ts`
- **AI & RAG:** Vercel AI SDK (`ai` v6), Google Gemini (`gemini-embedding-2` for 3072d vectors), Groq (`llama-3.3-70b-versatile` for chat and blog generation)
- **Media & Storage:** Cloudinary v2 (image hosting + URL optimization via `optimizeCloudinaryUrl`), Sharp (server-side image processing)
- **PWA & Notifications:** Serwist (`@serwist/next`, service worker `app/sw.ts`), Web Push (`web-push`)
- **Email:** Nodemailer (SMTP for contact inquiries and admin replies)
- **Analytics & Security:** Google Analytics (`@/components/analytics/GoogleAnalytics`), FingerprintJS (`@fingerprintjs/fingerprintjs`), IPinfo API for VPN/proxy check (fail-open)
- **Package Manager:** pnpm (v10)

## Mandatory Pre-Implementation Protocol: ALWAYS Load & Use Agents Skills

> [!CAUTION]
> ### STRICT ENFORCEMENT: ZERO IMPLEMENTATION WITHOUT READING SKILLS
> Before proposing any changes, writing a single line of code, creating new files, or editing existing files, the AI **MUST ALWAYS load and read the applicable skill file(s) from `agents/skills/` using `view_file`**.
>
> **Mandatory Execution Pipeline:**
> 1. **Identify Applicable Discipline(s):**
>    - **UI/UX Direction & Visual Design:** [agents/skills/ui-ux-engineer/SKILL.md](file:///s:/portfolio/samir-portfolio-dev/agents/skills/ui-ux-engineer/SKILL.md) (Layout, spacing, typography, theme contrast, interactive widget ergonomics, accessibility)
>    - **Frontend & App Router Architecture:** [agents/skills/frontend-engineer/SKILL.md](file:///s:/portfolio/samir-portfolio-dev/agents/skills/frontend-engineer/SKILL.md) (React 19 / Next.js 16 components, Server vs Client boundaries, zero CLS, form handling, error states)
>    - **Technical SEO, Schema & AEO/GEO:** [agents/skills/seo-engineer/SKILL.md](file:///s:/portfolio/samir-portfolio-dev/agents/skills/seo-engineer/SKILL.md) (Schema.org JSON-LD integrity, dynamic OpenGraph cards, sitemaps, robots.txt, machine readability)
>    - **Keyword Strategy & Content Layer:** [agents/skills/seo-keyword-research-implementation/SKILL.md](file:///s:/portfolio/samir-portfolio-dev/agents/skills/seo-keyword-research-implementation/SKILL.md) (Search intent, AI SDE/RAG/FDE keyword mapping, topic clusters, on-page optimization, anti-cannibalization)
>    - **Performance & Optimization:** [agents/skills/performance-engineer/SKILL.md](file:///s:/portfolio/samir-portfolio-dev/agents/skills/performance-engineer/SKILL.md) (Core Web Vitals, SSR/ISR caching, Cloudinary transformations, pgvector search latency, bundle size)
> 2. **Load the Skill File(s):** Call `view_file` on every relevant skill document to read its purpose, scope, non-negotiable rules, and workflow before formulating a solution.
> 3. **Evaluate & Comply:** Cross-reference the proposed implementation against the skill's engineering principles, constraints, and checklists.
> 4. **Implement with Justification:** Apply changes in strict accordance with the loaded skill's standards.
>
> **This protocol applies unconditionally to ALL tasks — including bug fixes, component styling, content updates, schema tweaks, and API refactoring.**

## Key Pages & AI Discovery Endpoints

| Resource / Route | Purpose | Architecture / Notes |
| :--- | :--- | :--- |
| `/` | Homepage & Bento Hero | Server component, GitHub stats integration, featured projects & writings |
| `/about` | Career, Experience & FAQ | Server component (ISR 3600), `ExperienceTimeline`, `FAQ` (JSON-LD), `SpeakableSpecification` |
| `/projects` | Projects Directory | Searchable project grid, `CollectionPage` JSON-LD schema |
| `/projects/[slug]` | Project Detail | HTML content rendering, tech badges, dynamic `opengraph-image.tsx` |
| `/blogs` | Technical Blog Archive | Searchable blog grid, `CollectionPage` JSON-LD schema |
| `/blogs/[slug]` | Blog Post Detail | `ContentWithToc`, `BlogInteractions`, `BlogShareButtons`, dynamic `opengraph-image.tsx` |
| `/contact` | Inquiries & Work Inquiries | `ContactForm` (client component), `ProfessionalService` JSON-LD schema, email dispatch |
| `/resume` | Resume & CV Viewer | `ResumeViewer` (react-pdf), PDF download link, `BreadcrumbList` schema |
| `/sitemap` | Visual HTML Directory | Directory linking all published projects, articles, and static pages |
| `/login` | Admin Authentication | GitHub OAuth & credentials login (`ADMIN_USERNAME`/`ADMIN_PASSWORD`) |
| `/admin/*` | Protected Admin Dashboard | Content CRUD (`blogs`, `projects`, `experience`, `about`, `media`, `notifications`, `resume`, `socials`) |
| `/api/chat` | AI Chatbot Streaming | Streaming chat endpoint (`ai` SDK + Groq), in-memory rate limiting, IPinfo proxy check |
| `/api/feed` | RSS 2.0 XML Feed | Dynamic RSS feed for blog syndication (`application/rss+xml`) |
| `/sitemap.xml` | Search Engine Sitemap | Dynamic XML sitemap route generated via `app/sitemap.ts` |
| `/robots.txt` | Crawler Instructions | Configured in `app/robots.ts` (disallows `/admin/` and `/api/`, links to sitemap) |
| `public/llms.txt` | LLM Knowledge Graph | Grounding context for AI search engines, answer engines, and blog automation |
| `public/.well-known/security.txt` | Security Disclosure | Security contact and vulnerability reporting policy |
| [`AGENTS.md`](file:///s:/portfolio/samir-portfolio-dev/AGENTS.md) | Universal Agent Directives | Universal operating standard and skill routing matrix for all AI coding tools |
| [`AI_RULE.md`](file:///s:/portfolio/samir-portfolio-dev/AI_RULE.md) | Core AI Rules & Directives | Strict engineering guardrails, architecture patterns, and non-negotiable checklist |
| [`context.md`](file:///s:/portfolio/samir-portfolio-dev/context.md) | Comprehensive Context | Deep architectural knowledge graph, API definitions, and environment variables |
| [`opencode.jsonc`](file:///s:/portfolio/samir-portfolio-dev/opencode.jsonc) | OpenCode Configuration | Tool permissions, automated skill registration, and custom commands |

## Core Architecture & Operational Rules

1. **Strict AI Directives Compliance:** Always strictly comply with [`AGENTS.md`](file:///s:/portfolio/samir-portfolio-dev/AGENTS.md) and [`AI_RULE.md`](file:///s:/portfolio/samir-portfolio-dev/AI_RULE.md). Never bypass the pre-implementation skill loading protocol.
2. **Always Load and Apply `agents/skills/` Before Any Implementation:** Absolute requirement. Never propose or implement changes without first reading and evaluating against the relevant specialized skill(s) via `view_file`.
3. **Never Commit Secrets:** All credentials, keys, and tokens live strictly in `.env`.
4. **Server Components by Default:** Fetch data directly in server components (`page.tsx`) using Drizzle queries with ISR (`export const revalidate = 3600`).
5. **Client Component Boundaries:** Group heavy, client-only interactive widgets (`Chatbot`, `PushSettings`, `CloudTransition`) into `components/LazyClientComponents.tsx` loaded with `ssr: false` to eliminate hydration mismatches.
6. **Dual-Mode API Authentication:** Write endpoints callable by automation (`POST /api/blogs`, `POST /api/push/send`) use `isAuthorized()` from `lib/api-auth.ts`, supporting either cookie-based admin sessions or `Authorization: Bearer <BLOG_AUTOMATION_TOKEN>`.
7. **Sanitized Rich Content:** Blog and project contents are stored as sanitized HTML (from TipTap or converted from Markdown via `rehype-sanitize`) and rendered on the client via `HtmlParser` or `ContentWithToc`.
8. **Automatic Vector Indexing:** Creating, modifying, or deleting blogs/projects automatically triggers pgvector indexing or cleanup in `content_chunks`.
9. **Cloudinary Asset Delivery:** Always wrap Cloudinary URLs with `optimizeCloudinaryUrl()` from `lib/cloudinary.ts` to enforce automatic modern formats (`f_auto`) and quality compression (`q_auto`).
10. **Breadcrumb Consistency:** Always use `components/layout/Breadcrumbs.tsx` to maintain unified UI navigation and synchronous `BreadcrumbList` schema markup.
11. **Single Source of Truth for Metadata:** Import canonical URLs, social handles, and identity info from `lib/site-config.ts`.
12. **Package Management:** Always use `pnpm` (`packageManager: pnpm@10`). Never use `npm` or `yarn`.

## Identity & Professional Profile
- **Name:** Samir Shaikh
- **Positioning:** AI Backend Engineer | AI SDE | Agentic AI Engineer | Forward Deployed Engineer (FDE)
- **Location:** Vapi / Surat, Gujarat, India (Open to Remote Worldwide)
- **Education:** B.Tech in Information Technology, Uka Tarsadia University
- **Experience:** Xira Infotech (Full Stack Engineer Intern), LOGICWIND (Back End Developer Intern)
- **Contact Email:** `shaikh.samir.work@gmail.com`
- **Telephone:** `+91 8320927182`
- **GitHub:** `https://github.com/samirshaikh-dev`
- **LinkedIn:** `https://linkedin.com/in/samir-shaikh-760b932a8`
- **Twitter / X:** `@samirshaikh-dev`
