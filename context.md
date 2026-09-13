# Samir's Portfolio — AI Context

## Project Overview
Personal portfolio, technical blog, and interactive showcase for **Samir Shaikh** — AI Backend Engineer, AI SDE, and Agentic AI Engineer exploring Forward Deployed Engineer (FDE) roles.
- **Production URL:** `https://samir-portfolio-dev.vercel.app` (configured in `lib/site-config.ts` with fallback via `NEXTAUTH_URL`).
- **Key Features:** Admin panel, RAG-powered AI chatbot with GitHub activity grounding, Web Push notifications, PWA (Serwist), blog with comments & star interactions, dynamic RSS feed, automated SEO/AEO/GEO structured data, dynamic OpenGraph cards, and an unattended AI-driven blog generation pipeline.

## Tech Stack
- **Framework:** Next.js 16 (App Router, webpack build), React 19, TypeScript 5
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`, `@tailwindcss/typography`), dark/light mode via `next-themes`
- **Database:** Neon (serverless PostgreSQL) + Drizzle ORM + pgvector (3072-dimensional vector store)
- **Auth:** NextAuth v5 (`5.0.0-beta.31`, GitHub OAuth + Credentials) + Dual-mode Bearer token auth (`BLOG_AUTOMATION_TOKEN`) via `lib/api-auth.ts`
- **AI/ML:** Vercel AI SDK (`ai` v6, `@ai-sdk/google` for embeddings via `gemini-embedding-2`, `@ai-sdk/groq` for chat via `llama-3.3-70b-versatile`), RAG with cosine distance search
- **Media:** Cloudinary (image hosting + `optimizeCloudinaryUrl` helper), Sharp (server-side image optimization)
- **PWA & Notifications:** Serwist (`@serwist/next`, service worker `app/sw.ts`), Web Push (`web-push`)
- **Email:** Nodemailer (SMTP for contact replies)
- **Analytics:** Google Analytics (`@/components/analytics/GoogleAnalytics`), FingerprintJS (`@fingerprintjs/fingerprintjs`) for rate limiting visitor identification
- **Package Manager:** pnpm (v10)

## Project Structure
```
app/                            # Next.js App Router
├── api/                        # 15 API route groups (27 route.ts files)
│   ├── about/                 # GET, PUT
│   ├── auth/[...nextauth]/    # NextAuth route handler
│   ├── blogs/                 # GET (all published), POST (dual-auth admin/token)
│   │   ├── [id]/              # GET, PUT, DELETE, PATCH (publish toggle)
│   │   │   ├── comment/       # POST (append comment JSONB)
│   │   │   └── star/          # POST (increment stars)
│   │   └── slug/[slug]/       # GET (single blog lookup)
│   ├── chat/                  # POST (streaming AI with rate limiting & security checks)
│   ├── contact/               # POST (public submit), GET (admin list)
│   │   ├── [id]/              # DELETE, PATCH (mark seen)
│   │   │   └── reply/         # POST (admin email reply via Nodemailer)
│   │   └── seen-all/          # POST (bulk mark seen)
│   ├── experience/            # GET, PUT (bulk replace)
│   ├── feed/                  # GET (RSS 2.0 XML feed)
│   ├── media/                 # GET, DELETE (Cloudinary asset management)
│   ├── pdf-proxy/             # GET (CORS proxy for resume PDF viewer)
│   ├── projects/              # GET (all published), POST (admin create)
│   │   ├── [id]/              # GET, PUT, DELETE, PATCH (publish toggle)
│   │   └── slug/[slug]/       # GET (single project lookup)
│   ├── push/
│   │   ├── send/              # POST (send push notification, dual-auth)
│   │   ├── subscribe/         # POST (register or update topic)
│   │   └── subscribers/       # GET (subscriber counts and list)
│   ├── rag/seed/              # POST (re-chunk and rebuild vector store)
│   ├── resume/                # GET, PUT (URL string)
│   ├── socials/               # GET, PUT (bulk replace)
│   └── upload/                # POST (sharp resize + Cloudinary upload)
├── about/                     # Server page (ISR 3600), ExperienceTimeline, FAQ, Speakable JSON-LD
├── admin/                     # Protected admin dashboard layout + pages
│   ├── about/                 # TipTap editor for description, present, future
│   ├── blogs/                 # BlogForm + searchable list + publish toggle
│   │   ├── new/               # Create blog post
│   │   └── [id]/edit/         # Edit blog post
│   ├── contact/               # Contact message viewer + email reply modal
│   ├── experience/            # Experience accordion CRUD with reordering
│   ├── media/                 # Cloudinary image grid + upload modal
│   ├── notifications/         # Subscriber metrics and list
│   │   ├── logs/              # Sent notification history + delete log actions
│   │   └── new/               # Compose & broadcast push notification
│   ├── projects/              # ProjectForm + list + publish toggle
│   │   ├── new/               # Create project
│   │   └── [id]/edit/         # Edit project
│   ├── resume/                # Resume URL updater + PDF preview
│   └── socials/               # Social link manager with icon picker & reorder
├── blogs/                     # Public blog archive (searchable grid, CollectionPage schema)
│   └── [slug]/                # Blog detail page (ContentWithToc, BlogInteractions, BlogShareButtons)
│       └── opengraph-image.tsx# Dynamic OpenGraph card generation (1200x630)
├── projects/                  # Public project archive (searchable grid, CollectionPage schema)
│   └── [slug]/                # Project detail page (HtmlParser, tech badges)
│       └── opengraph-image.tsx# Dynamic OpenGraph card generation (1200x630)
├── contact/                   # ContactForm (client component) + ProfessionalService schema
├── resume/                    # ResumeViewer (react-pdf) + download button
├── login/                     # Admin login (GitHub OAuth + credentials)
├── sitemap/                   # Visual HTML sitemap page with directory of all links
├── error.tsx                  # Root error boundary
├── not-found.tsx              # Root 404 page with animated illustration
├── layout.tsx                 # Root layout: AppProviders, Navbar, Footer (Suspense), LazyClientComponents, GA, JSON-LD
├── page.tsx                   # Home: Hero (GitHub stats bento) + recent writings & projects
├── globals.css                # Tailwind v4 + prose styles + CSS color variables
├── manifest.ts                # PWA web app manifest
├── sitemap.ts                 # Dynamic XML sitemap generator (projects, blogs, static routes)
├── robots.ts                  # Robots.txt (disallows /admin/ and /api/, points to /sitemap.xml)
└── sw.ts                      # Serwist service worker + push event listeners
components/
├── about/                     # ExperienceTimeline (server), FAQ (accordion + JSON-LD)
├── admin/                     # AdminDashboard, BlogForm, ProjectForm, TipTapEditor, MediaLibraryModal, DatePicker, DeleteLogButton
├── analytics/                 # GoogleAnalytics (loads gtag when NEXT_PUBLIC_GA_ID is set)
├── blogs/                     # BlogList, BlogInteractions, BlogShareButtons, BlogStarInteraction
├── home/                      # Hero (GitHub stats bento grid, server component)
├── layout/                    # Breadcrumbs (with BreadcrumbList JSON-LD), CloudTransition, Footer, Navbar, PageHeader
├── not-found/                 # NotFoundAnimation (interactive SVG animation)
├── projects/                  # ProjectList (searchable grid)
├── providers/                 # AppProviders (ThemeProvider with class strategy)
├── resume/                    # PDFViewer (react-pdf wrapper), ResumeViewer
├── ui/                        # Skeleton loader
├── Chatbot.tsx                # Floating AI assistant drawer (useChat + FingerprintJS)
├── ContentWithToc.tsx         # Combines HtmlParser + TableOfContents
├── HtmlParser.tsx             # HTML → React transformer with next/image optimization
├── LazyClientComponents.tsx   # SSR:false boundary for Chatbot, PushSettings, and CloudTransition
├── PushSettings.tsx           # Web Push subscription prompt and topic selector
├── SocialIcons.tsx            # Platform name to react-icons mapping (60+ platforms)
├── TableOfContents.tsx        # IntersectionObserver heading tracker
├── ThemeProvider.tsx          # next-themes wrapper
└── ThemeToggle.tsx            # Dark/light mode switcher button
lib/
├── api-auth.ts                # Timing-safe comparison for BLOG_AUTOMATION_TOKEN or admin session
├── auth.ts                    # NextAuth v5 config (GitHub OAuth whitelist + credentials)
├── cache.ts                   # unstable_cache wrappers for footer projects, blogs, and socials
├── cloudinary.ts              # Cloudinary v2 SDK configuration + optimizeCloudinaryUrl() helper
├── db.ts                      # Neon serverless PostgreSQL connection + Drizzle ORM client
├── fonts.ts                   # Geist Sans, Geist Mono, and Playfair Display font loaders
├── github.ts                  # GitHub GraphQL user stats + REST public event fetcher (10m-1h cache)
├── rag.ts                     # Document chunking, Gemini embedding generation, and pgvector upsert/delete
├── schema.ts                  # 12 Drizzle ORM table definitions
├── site-config.ts             # Centralized site constants (APP_URL, SITE_NAME, AUTHOR_*, TWITTER_HANDLE)
├── utils.ts                   # cn() clsx + tailwind-merge helper
├── chat/
│   ├── prompt.ts              # System prompt defining AI assistant tone, brevity, link rules, and constraints
│   ├── retrieval.ts           # pgvector retrieval (<= 0.5 distance threshold) + GitHub event integration
│   └── security.ts            # In-memory rate limiting (IP + visitorId) + IPinfo VPN/proxy detection (fail-open)
└── seo/
    ├── metadata.ts            # Centralized root metadata, viewport, keywords, and OpenGraph defaults
    └── structured-data.ts     # JSON-LD generators (Person, WebSite, Organization, ProfessionalService, Collections, Speakable)
scripts/
└── blog/                      # Modular automated blog generation pipeline
    ├── api/                   # API clients (fetch-existing-titles, publish-blog, notify-subscribers)
    ├── config.mjs             # Environment checks and constants
    ├── convert.mjs            # Markdown → sanitized HTML (unified, remark, rehype, rehype-sanitize)
    ├── generate.mjs           # Groq content generator grounded in public/llms.txt with retry logic
    ├── generate-blog.mjs      # Main entry point / orchestrator script (pnpm run generate-blog)
    ├── topics.mjs             # Rotating topic pillars with SEO metadata, target keywords, and outlines
    ├── utils.mjs              # Shared utility helpers (requireEnv)
    └── validate.mjs           # 7-point quality gate (word count, code snippets, keyword presence, etc.)
docs/                          # Documentation
├── design.md                  # Design system & aesthetic guidelines
├── prd.md                     # Product Requirements Document
├── seo/                       # SEO, AEO, GEO, and FDE strategy documentation & audit reports
└── tech/                      # Drizzle commands and database operation references
public/
├── .well-known/security.txt   # Security contact disclosure
├── llms.txt                   # LLM-readable summary of Samir's skills, background, and blog grounding
├── Logo.svg, Logo.png         # Primary brand marks
├── Filled_Logo.png            # Solid logo for OpenGraph and metadata icons
└── sw.js                      # Serwist service worker bundle
agents/
└── skills/                    # 5 specialized engineering skills (UI/UX, frontend, seo, keywords, performance)
AGENTS.md                      # Universal AI coding agent directives & standards
AI_RULE.md                     # Strict AI rules, engineering guardrails & checklist
context.md                     # Deep technical context & environment specifications
gemini.md                      # Gemini context, routing protocol & directives
portfolio-theme.md             # Color & theme reference (design tokens, light/dark palette, accents)
opencode.jsonc                 # OpenCode assistant configuration & skills declaration
```

## Database Schema (12 tables)

| Table | Key Details |
|---|---|
| `admin_users` | `id` (UUID), `email` (unique), `password`, `created_at` — **defined but unused**; NextAuth Credentials provider compares `ADMIN_USERNAME`/`ADMIN_PASSWORD` env vars directly |
| `projects` | `id` (UUID), `title`, `slug` (unique), `excerpt`, `content` (HTML), `technologies` (text[]), `github_link`, `demo_link`, `cover_image_url`, `is_published`, `created_at`, `updated_at`, `published_at` |
| `blogs` | `id` (UUID), `title`, `slug` (unique), `excerpt`, `content` (HTML), `cover_image_url`, `tags` (text[]), `is_published`, `stars` (int default 0), `comments` (jsonb[]: `{name, comment, createdAt}`), `created_at`, `updated_at`, `published_at` |
| `about` | `description` (HTML), `present` (text), `future` (text) — single row representation |
| `resume` | `resume` (text URL) — single row representation |
| `contact` | `id` (UUID), `name`, `email`, `subject`, `message`, `seen` (bool default false), `created_at` |
| `socials` | `id` (UUID), `name`, `url`, `display_order` (int) |
| `experiences` | `id` (UUID), `company_name`, `logo_url`, `position`, `description`, `start_date` (date string), `end_date` (date string), `pay`, `is_current` (bool), `display_order` (int), `created_at`, `updated_at` |
| `media` | `id` (UUID), `url`, `public_id`, `created_at` |
| `content_chunks` | `id` (UUID), `source_id` (UUID), `source_type` ('about' \| 'experience' \| 'blog' \| 'project'), `chunk_text`, `embedding` (vector 3072d), `created_at` |
| `push_subscriptions` | `id` (UUID), `endpoint` (unique), `subscription_json` (jsonb), `topic` ('all' \| 'blogs'), `created_at` |
| `sent_notifications` | `id` (UUID), `title`, `body`, `url`, `image_url`, `target_topic`, `success_count` (int), `created_at` |

## Common Patterns & Conventions

### Components & Architecture
- **Server Components:** Default choice for data retrieval (`page.tsx`) using direct Drizzle queries with ISR (`export const revalidate = 3600`).
- **Client Components:** Marked with `"use client"`. Used for user interaction, state management, and calling `/api/...` endpoints.
- **Client Components Boundary:** Heavy client-only elements (`Chatbot`, `PushSettings`, `CloudTransition`) are grouped inside `components/LazyClientComponents.tsx` and dynamically loaded with `ssr: false` to keep Server Components clean.
- **Component Exports:** Components use default exports (e.g., `export default function BlogList(...)`, `export default function Breadcrumbs(...)`).

### Caching Strategy
- **`unstable_cache` (`lib/cache.ts`):** Used for lightweight repetitive queries such as footer projects, blogs, and social links (`revalidate: 3600` with tags `["projects"]`, `["blogs"]`, `["socials"]`).
- **External Caches:** GitHub user stats cached for 1 hour; GitHub public events cached for 10 minutes in memory.
- **RSS Feed & Sitemaps:** Marked with `export const dynamic = 'force-dynamic'` to always serve up-to-date content while utilizing HTTP caching headers.

### CSS & Design System
- **Tailwind CSS v4:** `@import "tailwindcss"` in `globals.css` with PostCSS configuration.
- **Color Variables:** CSS custom properties define background, foreground, primary, border, hover, and footer colors across `.dark` and light themes. See [`portfolio-theme.md`](file:///s:/portfolio/samir-portfolio-dev/portfolio-theme.md) for the full token & palette reference.
- **Typography:** `@tailwindcss/typography` used via `.prose` and `.prose-invert` for rendered rich text.
- **Fonts:** Geist Sans (`--font-geist-sans`), Geist Mono (`--font-geist-mono`), and Playfair Display (`--font-playfair`) configured in `lib/fonts.ts`.

### SEO, Structured Data, & Social Cards
- **Site Constants:** Centralized in `lib/site-config.ts` (`APP_URL`, `AUTHOR_NAME`, `SITE_NAME`, etc.).
- **Breadcrumbs:** `components/layout/Breadcrumbs.tsx` renders accessible breadcrumbs with embedded `BreadcrumbList` schema.
- **JSON-LD Schema (`lib/seo/structured-data.ts`):** Emits rich entities including `Person`, `WebSite`, `Organization`, `ProfessionalService`, `CollectionPage`, and `SpeakableSpecification`.
- **Dynamic OpenGraph:** Dedicated `opengraph-image.tsx` routes under `/blogs/[slug]` and `/projects/[slug]` generate branded 1200x630 social preview images using `@vercel/og`.

### Security & Authentication
- **Admin Panel Access:** Protected via NextAuth v5 session validation (`auth()`). Server pages redirect to `/login`; API routes return 401.
- **Dual-Mode API Auth (`lib/api-auth.ts`):** `POST /api/blogs` and `POST /api/push/send` accept either a logged-in admin session or `Authorization: Bearer <BLOG_AUTOMATION_TOKEN>` with constant-time verification (`timingSafeEqual`).
- **Chatbot Security (`lib/chat/security.ts`):**
  - VPN / Proxy detection via IPinfo API (fail-open mode if API fails).
  - In-memory rate limiting applied per IP and per `x-visitor-id` (FingerprintJS).
- **Credentials Auth:** Compared in plaintext against `ADMIN_USERNAME` and `ADMIN_PASSWORD` env vars in `lib/auth.ts`.

### AI & RAG Pipeline
- **Embeddings:** Google Gemini `gemini-embedding-2` generating 3072-dimensional vectors.
- **Vector Search:** `cosineDistance` search via pgvector on `content_chunks` filtered with distance `<= 0.5`.
- **Chat System Prompt (`lib/chat/prompt.ts`):** Strict brevity, no meta-talk about "the context", enforces markdown links using exact URLs from context blocks, treats context purely as reference data, and enforces scoped domain knowledge.
- **Intent-Based Retrieval:** GitHub event activity is selectively attached to context when the user asks about recent work, commits, or coding activity.

### Automated Blog Generation Pipeline
- **Workflow:** `.github/workflows/auto-blog.yml` runs every 3 days (plus manual trigger) executing `scripts/blog/generate-blog.mjs`.
- **Modular Pipeline:**
  - `topics.mjs`: Topic pillars with target keywords, search intent, cluster relationships, and outlines.
  - `generate.mjs`: Groq `llama-3.3-70b-versatile` generates post grounded in `public/llms.txt` and existing titles.
  - `validate.mjs`: Quality check enforcing word counts (`MIN_WORD_COUNT`, default 350), code blocks, and outlines.
  - `convert.mjs`: Sanitizes markdown to HTML with `rehype-sanitize`.
  - `publish-blog.mjs` & `notify-subscribers.mjs`: Posts to `/api/blogs` and triggers Web Push to subscribers if published.

## Environment Variables Reference

| Variable | Purpose | Notes |
|---|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection string | Required for Drizzle ORM & pgvector |
| `NEXTAUTH_SECRET` | NextAuth session signing key | Required for authentication |
| `NEXTAUTH_URL` | Canonical app URL | Fallback for `APP_URL` in `lib/site-config.ts` |
| `ADMIN_USERNAME` | Admin login identifier | Plaintext comparison in `lib/auth.ts` |
| `ADMIN_PASSWORD` | Admin login password | Plaintext comparison in `lib/auth.ts` |
| `GITHUB_CLIENT_ID` | GitHub OAuth client ID | NextAuth GitHub provider |
| `GITHUB_CLIENT_SECRET`| GitHub OAuth client secret | NextAuth GitHub provider |
| `CLOUDINARY_URL` | Cloudinary connection string | Format: `cloudinary://key:secret@cloud_name` |
| `GROQ_API_KEY` | Groq API key | AI Chatbot & automated blog generation |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Gemini API key | 3072d embeddings for RAG (`gemini-embedding-2`) |
| `GITHUB_TOKEN` | GitHub Personal Access Token | GraphQL user stats & REST public events |
| `SMTP_HOST` | Nodemailer SMTP server host | Contact reply emails |
| `SMTP_PORT` | Nodemailer SMTP port | E.g. 465 or 587 |
| `SMTP_EMAIL` | Nodemailer sender email | Address used for outgoing emails |
| `SMTP_PASSWORD` | Nodemailer sender password | SMTP credentials |
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY` | Web Push VAPID public key | Browser push subscription |
| `VAPID_PRIVATE_KEY` | Web Push VAPID private key | Server push signing |
| `NEXT_PUBLIC_SITE_NAME`| Display site name | Used across layout and metadata |
| `NEXT_PUBLIC_GA_ID` | Google Analytics Measurement ID | Optional GA4 tracking |
| `AI_SECURITY` | Enable VPN checks & rate limiting | Set to `'true'` to activate |
| `AI_LIMIT` | Maximum chat queries per day | Defaults to 5 if unset |
| `IPINFO_API` | IPinfo API token | Used for VPN/proxy privacy lookup |
| `ENABLE_BLOG_AUTOMATION` | Feature flag for automated blog posting | Set to `'true'` to enable pipeline |
| `BLOG_AUTOMATION_TOKEN` | Shared secret token | Bearer auth for blog pipeline & push notifications |
| `SITE_URL` | Site root URL override | Used by scripts; falls back to `NEXTAUTH_URL` |
| `AUTO_PUBLISH` | Blog pipeline publish mode | Defaults to `'true'`; set `'false'` to save drafts |
| `MIN_WORD_COUNT` | Minimum word count quality gate | Defaults to 350 |
| `UPSTASH_REDIS_REST_URL` / `_TOKEN` | Redis credentials | Listed in `.env.example` for planned persistent rate limiting |

## Critical Rules & Gotchas
1. **Strict AI Directives Compliance:** All AI models and tools must adhere strictly to [`AGENTS.md`](file:///s:/portfolio/samir-portfolio-dev/AGENTS.md) and [`AI_RULE.md`](file:///s:/portfolio/samir-portfolio-dev/AI_RULE.md). Never bypass the pre-implementation skill loading protocol.
2. **Always Load and Follow `agents/skills/` Before Any Implementation:** Mandatory pre-requisite. Before proposing or implementing any changes (frontend, UI/UX, SEO, performance, or backend), the AI MUST explicitly view and evaluate against the relevant skill(s) in `agents/skills/` via `view_file` (`performance-engineer/SKILL.md`, `seo-engineer/SKILL.md`, `seo-keyword-research-implementation/SKILL.md`, `ui-ux-engineer/SKILL.md`, `frontend-engineer/SKILL.md`).
3. **Never commit secrets** — all credentials remain strictly in `.env`.
4. **Server components for reads, client components for interactivity** — keep data fetching in server components with ISR (`revalidate = 3600`).
5. **Use pnpm** — do not use npm or yarn (`packageManager: pnpm@10`).
6. **`admin_users` table is unused** — credentials authentication compares `ADMIN_USERNAME`/`ADMIN_PASSWORD` env vars directly.
7. **Dual-mode API authentication** — `isAuthorized()` in `lib/api-auth.ts` allows both user session cookies and `Authorization: Bearer <BLOG_AUTOMATION_TOKEN>`. Do not use this helper on user-only routes.
8. **Chat rate limiting is currently in-memory** — rate limits reset across serverless cold starts. Redis integration via Upstash is prepared in `.env.example` as a future enhancement.
9. **Cloudinary transformations** — use `optimizeCloudinaryUrl()` from `lib/cloudinary.ts` when rendering Cloudinary assets to guarantee modern formats (`f_auto`) and quality compression (`q_auto`).
10. **Breadcrumb consistency** — use `components/layout/Breadcrumbs.tsx` rather than manual breadcrumb links to ensure synchronized visual navigation and `BreadcrumbList` JSON-LD.
11. **RAG indexing trigger** — creating, updating, or deleting blogs/projects automatically indexes or deletes content chunks in pgvector. No secondary seed call is needed during routine blog publishing.
12. **Rich text HTML format** — blog and project contents are stored as sanitized HTML, rendered on the client via `HtmlParser.tsx` or `ContentWithToc.tsx`.