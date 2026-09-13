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

## Mandatory Pre-Change Protocol: Specialized Skills
> **CRITICAL DIRECTIVE:** Before proposing or implementing **ANY** changes (Frontend, UI/UX, Backend, Database, SEO, Content, or Performance), the AI **MUST ALWAYS review and evaluate against the 5 specialized engineering skills in `agents/skills/`**:
> 
> 1. `agents/skills/performance-engineer.md` — Core Web Vitals, SSR/ISR caching (`revalidate = 3600`, `unstable_cache`), Cloudinary asset optimization (`optimizeCloudinaryUrl`), database index performance, pgvector cosine search latency, bundle size containment.
> 2. `agents/skills/seo-engineer.md` — Technical crawlability, Schema.org JSON-LD integrity (`Person`, `WebSite`, `Organization`, `ProfessionalService`, `CollectionPage`, `BreadcrumbList`, `SpeakableSpecification`), dynamic OpenGraph generation (`opengraph-image.tsx`), XML sitemap (`app/sitemap.ts`), robots.txt compliance.
> 3. `agents/skills/Seo-keyword-research-implementation.md` — Search intent mapping (AI SDE, RAG, pgvector, Node.js, FDE), keyword-to-page mapping, topic cluster internal linking, preventing keyword cannibalization, content depth standards.
> 4. `agents/skills/ui-ux-engineer.md` — Visual hierarchy, Playfair/Geist typography, dark/light theme consistency, interactive widget ergonomics (`Chatbot`, `PushSettings`, `TipTapEditor`), mobile responsiveness, WCAG accessibility.
> 5. `agents/skills/frontend-engineer.md` — Composable Next.js App Router patterns, Server vs Client component boundaries (`LazyClientComponents.tsx` with `ssr: false`), zero CLS, form validation, error boundaries (`app/error.tsx`), 404 handling (`app/not-found.tsx`).

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

## Core Architecture & Operational Rules

1. **Never Commit Secrets:** All credentials, keys, and tokens live strictly in `.env`.
2. **Server Components by Default:** Fetch data directly in server components (`page.tsx`) using Drizzle queries with ISR (`export const revalidate = 3600`).
3. **Client Component Boundaries:** Group heavy, client-only interactive widgets (`Chatbot`, `PushSettings`, `CloudTransition`) into `components/LazyClientComponents.tsx` loaded with `ssr: false` to eliminate hydration mismatches.
4. **Dual-Mode API Authentication:** Write endpoints callable by automation (`POST /api/blogs`, `POST /api/push/send`) use `isAuthorized()` from `lib/api-auth.ts`, supporting either cookie-based admin sessions or `Authorization: Bearer <BLOG_AUTOMATION_TOKEN>`.
5. **Sanitized Rich Content:** Blog and project contents are stored as sanitized HTML (from TipTap or converted from Markdown via `rehype-sanitize`) and rendered on the client via `HtmlParser` or `ContentWithToc`.
6. **Automatic Vector Indexing:** Creating, modifying, or deleting blogs/projects automatically triggers pgvector indexing or cleanup in `content_chunks`.
7. **Cloudinary Asset Delivery:** Always wrap Cloudinary URLs with `optimizeCloudinaryUrl()` from `lib/cloudinary.ts` to enforce automatic modern formats (`f_auto`) and quality compression (`q_auto`).
8. **Breadcrumb Consistency:** Always use `components/layout/Breadcrumbs.tsx` to maintain unified UI navigation and synchronous `BreadcrumbList` schema markup.
9. **Single Source of Truth for Metadata:** Import canonical URLs, social handles, and identity info from `lib/site-config.ts`.
10. **Package Management:** Always use `pnpm` (`packageManager: pnpm@10`). Never use `npm` or `yarn`.

## Identity & Professional Profile
- **Name:** Samir Shaikh
- **Positioning:** AI Backend Engineer | AI SDE | Agentic AI Engineer | Forward Deployed Engineer (FDE)
- **Location:** Vapi / Surat, Gujarat, India (Open to Remote Worldwide)
- **Education:** B.Tech in Information Technology, Uka Tarsadia University
- **Experience:** Logicwind (Software Engineer Intern / Backend Developer)
- **Contact Email:** `22amtics312@gmail.com` / `shaikh.samir.dev@gmail.com`
- **Telephone:** `+91 8320927182`
- **GitHub:** `https://github.com/samirshaikh-dev`
- **LinkedIn:** `https://linkedin.com/in/samir-shaikh-760b932a8`
- **Twitter / X:** `@samirshaikh-dev`