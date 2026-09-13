# AGENTS.md — Universal AI Agent Directives & Operational Standards

> This document is the single, universal operating standard for all AI coding agents, CLIs, and assistant tools (including Antigravity, OpenCode, Claude Code, Cursor, Windsurf, Trae, Aider, and GitHub Copilot) working in this repository.

---

## 1. Project Overview & Context

- **Repository:** `samir-portfolio-dev`
- **Owner:** Samir Shaikh
- **Positioning:** AI Backend Engineer | AI SDE | Agentic AI Engineer | Forward Deployed Engineer (FDE)
- **Live Production URL:** `https://samir-portfolio-dev.vercel.app` (configured in `lib/site-config.ts` with fallback to `NEXTAUTH_URL`)
- **Primary Stack:** Next.js 16 (App Router, Webpack build), React 19, TypeScript 5, Tailwind CSS v4, Neon Serverless PostgreSQL + Drizzle ORM + pgvector (3072d), NextAuth v5, Vercel AI SDK (Gemini embeddings + Groq chat), Serwist PWA + Web Push, Cloudinary v2, Nodemailer, pnpm v10.

---

## 2. Mandatory Pre-Implementation Protocol: ALWAYS Use Agents Skills

> [!CAUTION]
> ### STRICT REQUIREMENT FOR ALL AI TOOLS & CLIS
> **Before proposing, designing, creating, or editing ANY code or content, you MUST ALWAYS load and review the relevant specialized skill file(s) in `agents/skills/`.**

### Discipline Routing Matrix

| Task Area | Required Skill File | Core Focus |
| :--- | :--- | :--- |
| **UI & Visual Design** | [`agents/skills/ui-ux-engineer.md`](file:///s:/portfolio/samir-portfolio-dev/agents/skills/ui-ux-engineer.md) | Visual hierarchy, spacing, typography, theme contrast, interactive widgets, WCAG accessibility |
| **Frontend & Components** | [`agents/skills/frontend-engineer.md`](file:///s:/portfolio/samir-portfolio-dev/agents/skills/frontend-engineer.md) | React 19 / Next.js 16 patterns, Server vs Client boundaries, zero CLS, form handling, error states |
| **Technical SEO & AEO/GEO** | [`agents/skills/seo-engineer.md`](file:///s:/portfolio/samir-portfolio-dev/agents/skills/seo-engineer.md) | Schema.org JSON-LD integrity, dynamic OpenGraph, XML sitemaps, robots.txt, AI citation readability |
| **Keywords & Content** | [`agents/skills/Seo-keyword-research-implementation.md`](file:///s:/portfolio/samir-portfolio-dev/agents/skills/Seo-keyword-research-implementation.md) | Search intent, AI SDE/RAG/FDE keyword mapping, topic clusters, anti-cannibalization, content depth |
| **Performance & Latency** | [`agents/skills/performance-engineer.md`](file:///s:/portfolio/samir-portfolio-dev/agents/skills/performance-engineer.md) | Core Web Vitals, SSR/ISR caching, Cloudinary optimization, pgvector search latency, bundle size |

### Required Step-by-Step Workflow for AI Agents:
1. **Identify:** Determine which of the 5 skills above govern the requested change.
2. **Read:** Explicitly view/read the skill file (`agents/skills/<skill-name>.md`) before planning or editing.
3. **Verify:** Check your proposed solution against the non-negotiable rules and engineering principles of that skill.
4. **Implement:** Write code that strictly adheres to the skill guidelines, citing the relevant principle in your explanation.

---

## 3. Tool & CLI Execution Guidelines

- **Package Manager:** Always use **`pnpm`** (`packageManager: pnpm@10`). NEVER run `npm` or `yarn`.
- **Available Scripts:**
  - `pnpm run dev` — Start Next.js development server with Webpack build
  - `pnpm run build` — Production build (`next build --webpack`)
  - `pnpm run start` — Run production server
  - `pnpm run lint` — ESLint verification
  - `pnpm run generate-blog` — Run modular automated blog generator (`scripts/blog/generate-blog.mjs`)
- **Shell & Commands:**
  - Running on Windows PowerShell.
  - For directory listing, prefer native agent tools (`list_dir`) or `dir`.
  - For history and commits, use `git log -n <N> --oneline`.
  - Never execute destructive commands (`rm -rf`, `git reset --hard`, dropping DB tables) without explicit user direction.
- **Environment Secrets:**
  - Never print, log, or commit secret keys from `.env`.
  - All credentials reside strictly in `.env`. Reference `.env.example` for required variables.

---

## 4. Architecture & Coding Conventions

### Server vs. Client Component Boundaries
- **Server Components by default:** Use Server Components for all pages (`page.tsx`) to perform direct Drizzle DB queries with Incremental Static Regeneration (`export const revalidate = 3600`).
- **Client Components:** Mark interactive or hook-dependent components with `"use client"`.
- **SSR-Free Boundary:** Heavy client-only widgets (`Chatbot`, `PushSettings`, `CloudTransition`) **must** be loaded inside `components/LazyClientComponents.tsx` via `next/dynamic` with `{ ssr: false }` to prevent hydration mismatches and bundle bloat.

### Database & Drizzle ORM
- Connects to Neon Serverless PostgreSQL with `pgvector`.
- Schema defined in `lib/schema.ts` (12 tables: `admin_users`, `projects`, `blogs`, `about`, `resume`, `contact`, `socials`, `push_subscriptions`, `sent_notifications`, `experiences`, `media`, `content_chunks`).
- The `admin_users` table is defined but unused — admin credentials authenticate directly against `ADMIN_USERNAME` and `ADMIN_PASSWORD` env vars in `lib/auth.ts`.
- Blog comments are stored as append-only JSONB arrays (`[{ name, comment, createdAt }]`).
- Migrations managed via Drizzle Kit (`drizzle.config.ts`, `docs/tech/drizzle-command.md`).

### API Authentication & Automation
- Public endpoints: `/api/chat`, `/api/feed`, `/api/pdf-proxy`, `/api/blogs/slug/*`, `/api/projects/slug/*`, `/api/contact` (POST).
- Protected admin routes: validate session via `await auth()`.
- Dual-Mode write endpoints: `POST /api/blogs` and `POST /api/push/send` use `isAuthorized()` from `lib/api-auth.ts`, accepting either an admin cookie session OR `Authorization: Bearer <BLOG_AUTOMATION_TOKEN>` with constant-time verification (`timingSafeEqual`).

### AI Chatbot & RAG Engine
- **Embeddings:** Google Gemini `gemini-embedding-2` generating 3072-dimensional vector embeddings.
- **Retrieval:** pgvector `cosineDistance` against `content_chunks` with a strict distance threshold `<= 0.5`.
- **System Prompt (`lib/chat/prompt.ts`):** Enforces strict brevity (1-2 sentences for general questions), prohibits meta-talk (never mention "the context"), requires exact Markdown links from context blocks (`/about`, `/resume`, `/contact`), and treats context as reference data only.
- **Context Grounding:** Dynamically fetches and attaches recent GitHub events when user queries indicate developer activity.
- **Security & Rate Limiting (`lib/chat/security.ts`):** In-memory rate limiting per IP and per FingerprintJS `x-visitor-id`. IPinfo VPN/proxy detection in fail-open mode.

### SEO, Structured Data & Metadata
- **Single Source of Truth:** `lib/site-config.ts` (`APP_URL`, `AUTHOR_NAME`, `AUTHOR_EMAIL`, `AUTHOR_PHONE`, `TWITTER_HANDLE`).
- **JSON-LD Structured Data:** Centralized in `lib/seo/structured-data.ts`. Emits `Person`, `WebSite`, `Organization`, `ProfessionalService`, `CollectionPage`, `BreadcrumbList`, and `SpeakableSpecification`.
- **Breadcrumbs:** Always use `components/layout/Breadcrumbs.tsx` to keep UI breadcrumbs synchronized with `BreadcrumbList` schema.
- **Dynamic OpenGraph:** `app/blogs/[slug]/opengraph-image.tsx` and `app/projects/[slug]/opengraph-image.tsx` dynamically generate 1200x630 branded social cards using `@vercel/og`.
- **Syndication & Feeds:** Dynamic RSS 2.0 XML feed at `app/api/feed/route.ts` and dynamic sitemap at `app/sitemap.ts`.

### Assets & Styling
- **Tailwind CSS v4:** Uses CSS variables for color theming (`--color-background`, `--color-foreground`, `--color-primary`, `--color-border-primary`, etc.) with dark mode via `.dark`.
- **Cloudinary Optimization:** Always wrap Cloudinary image URLs with `optimizeCloudinaryUrl()` from `lib/cloudinary.ts` to attach `f_auto,q_auto`.
- **Rich Content:** TipTap editor output is stored as HTML and rendered safely with Next.js image optimization via `components/HtmlParser.tsx` or `components/ContentWithToc.tsx`.

---

## 5. Directory Map

```
samir-portfolio-dev/
├── app/                        # Next.js App Router
│   ├── api/                    # 15 API route groups (chat, blogs, projects, feed, push, rag, etc.)
│   ├── about/                  # About Samir, Timeline, FAQ, JSON-LD
│   ├── admin/                  # Protected CMS (blogs, projects, experience, media, notifications, resume)
│   ├── blogs/                  # Blog archive + [slug] + dynamic opengraph-image
│   ├── projects/               # Project archive + [slug] + dynamic opengraph-image
│   ├── contact/                # ContactForm + ProfessionalService schema
│   ├── resume/                 # PDF resume viewer + download
│   ├── sitemap/                # Visual HTML sitemap directory
│   ├── error.tsx               # Root error boundary
│   ├── not-found.tsx           # Custom 404 page
│   ├── layout.tsx              # Root layout (Providers, Navbar, Footer, LazyClientComponents, JSON-LD)
│   ├── page.tsx                # Homepage (Hero Bento + Recent writings & projects)
│   ├── manifest.ts             # PWA web manifest
│   ├── sitemap.ts              # Dynamic XML sitemap
│   ├── robots.ts               # Robots.txt
│   └── sw.ts                   # Serwist service worker
├── components/                 # UI Components
│   ├── about/                  # ExperienceTimeline, FAQ
│   ├── admin/                  # BlogForm, ProjectForm, TipTapEditor, MediaLibraryModal, etc.
│   ├── analytics/              # GoogleAnalytics
│   ├── blogs/                  # BlogList, BlogInteractions, BlogShareButtons
│   ├── home/                   # Hero bento
│   ├── layout/                 # Breadcrumbs, Navbar, Footer, CloudTransition, PageHeader
│   ├── not-found/              # NotFoundAnimation
│   ├── projects/               # ProjectList
│   ├── providers/              # AppProviders (ThemeProvider)
│   ├── resume/                 # ResumeViewer, PDFViewer
│   ├── ui/                     # Skeleton
│   ├── Chatbot.tsx             # Floating AI assistant drawer
│   ├── ContentWithToc.tsx      # Rich content with table of contents
│   ├── HtmlParser.tsx          # Sanitized HTML renderer
│   ├── LazyClientComponents.tsx# ssr:false boundary for client-only widgets
│   ├── PushSettings.tsx        # Push subscription prompt
│   └── SocialIcons.tsx         # Platform-to-icon mapping
├── lib/                        # Core Utilities & Business Logic
│   ├── api-auth.ts             # Dual-mode timing-safe auth helper
│   ├── auth.ts                 # NextAuth v5 configuration
│   ├── cache.ts                # unstable_cache helpers with tag revalidation
│   ├── cloudinary.ts           # Cloudinary client & optimizeCloudinaryUrl
│   ├── db.ts                   # Neon PostgreSQL Drizzle connection
│   ├── fonts.ts                # Geist Sans, Geist Mono, Playfair Display
│   ├── github.ts               # GraphQL stats & REST event fetcher
│   ├── rag.ts                  # Document chunking & pgvector indexing
│   ├── schema.ts               # 12 Drizzle database tables
│   ├── site-config.ts          # Centralized configuration & identity constants
│   ├── chat/                   # System prompt, retrieval, and security/rate-limiting
│   └── seo/                    # Metadata & JSON-LD structured data generators
├── agents/
│   └── skills/                 # The 5 specialized engineering skills (MUST READ FIRST)
├── scripts/
│   └── blog/                   # Modular automated blog generation pipeline
├── public/
│   ├── llms.txt                # Machine-readable knowledge graph for AI engines
│   ├── .well-known/security.txt# Security disclosure policy
│   └── Logo.svg, Filled_Logo.png
└── docs/                       # PRD, Design System, SEO strategies, Drizzle guides
```

---

## 6. Non-Negotiable Agent Rules Summary

1. **Skills First:** Never write code or propose changes without reading the relevant file(s) in `agents/skills/`.
2. **Secrets Safe:** Never commit or expose `.env` credentials.
3. **Use pnpm:** Never invoke `npm` or `yarn`.
4. **Server Components:** Default to server components with `revalidate = 3600`.
5. **No Hydration Errors:** Keep non-SSR client widgets inside `LazyClientComponents.tsx`.
6. **Cloudinary Optimization:** Always use `optimizeCloudinaryUrl()` for media URLs.
7. **Breadcrumb Standard:** Always use `Breadcrumbs.tsx` for consistent navigation and JSON-LD.
8. **Sanitized Output:** Never render raw, un-sanitized user or LLM HTML.
9. **Dual Auth Awareness:** Respect `isAuthorized()` on automated endpoints; do not weaken session-only routes.
10. **Explain Work:** Clearly state which skills were referenced, what changed, and why.
