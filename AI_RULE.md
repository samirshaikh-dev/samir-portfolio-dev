# AI Rules & Engineering Directives — Samir Portfolio Dev

> **Scope:** These rules apply to all AI models, CLIs, and autonomous coding assistants operating on `samir-portfolio-dev`. Adherence is mandatory on every step. Companion directives and references: [`AGENTS.md`](file:///s:/portfolio/samir-portfolio-dev/AGENTS.md) (Universal standards & skill routing) | [`context.md`](file:///s:/portfolio/samir-portfolio-dev/context.md) (Project knowledge graph) | [`gemini.md`](file:///s:/portfolio/samir-portfolio-dev/gemini.md) (Gemini directives) | [`portfolio-theme.md`](file:///s:/portfolio/samir-portfolio-dev/portfolio-theme.md) (Color & theme reference) | [`opencode.jsonc`](file:///s:/portfolio/samir-portfolio-dev/opencode.jsonc) (OpenCode config).

---

## 1. The Golden Directive: Mandatory Skills Protocol

> [!CAUTION]
> ### STRICT REQUIREMENT: NEVER PROCEED WITHOUT RELEVANT AGENT SKILL
> Before proposing a technical plan, writing code, creating files, or editing existing files, you **MUST ALWAYS view and load the relevant skill file(s) in `agents/skills/` using `view_file`**.

### Discipline Routing Checklist:
- [ ] **UI & Visual Design:** [`agents/skills/ui-ux-engineer/SKILL.md`](file:///s:/portfolio/samir-portfolio-dev/agents/skills/ui-ux-engineer/SKILL.md)  
  *Activates for:* Spacing, visual hierarchy, dark/light contrast, typography, interactive widgets, responsive layouts, accessibility.
- [ ] **Frontend & App Router Architecture:** [`agents/skills/frontend-engineer/SKILL.md`](file:///s:/portfolio/samir-portfolio-dev/agents/skills/frontend-engineer/SKILL.md)  
  *Activates for:* React 19 / Next.js 16 components, Server vs. Client boundaries, SSR-free boundaries, state management, form handling, error states.
- [ ] **Technical SEO, AEO/GEO & Schema:** [`agents/skills/seo-engineer/SKILL.md`](file:///s:/portfolio/samir-portfolio-dev/agents/skills/seo-engineer/SKILL.md)  
  *Activates for:* JSON-LD Schema.org markup, dynamic OpenGraph generation (`opengraph-image.tsx`), XML sitemaps, robots.txt, AI engine citations.
- [ ] **Keyword Strategy & Content Depth:** [`agents/skills/seo-keyword-research-implementation/SKILL.md`](file:///s:/portfolio/samir-portfolio-dev/agents/skills/seo-keyword-research-implementation/SKILL.md)  
  *Activates for:* Search intent, AI SDE/RAG/FDE keyword mapping, topic clusters, internal links, avoiding keyword cannibalization.
- [ ] **Performance & Latency Optimization:** [`agents/skills/performance-engineer/SKILL.md`](file:///s:/portfolio/samir-portfolio-dev/agents/skills/performance-engineer/SKILL.md)  
  *Activates for:* Core Web Vitals, SSR/ISR caching (`revalidate = 3600`, `unstable_cache`), Cloudinary URL optimization, pgvector search latency, bundle size.

---

## 2. Tooling, CLI & Execution Guardrails

- **Package Manager:** Exclusively use **`pnpm`** (`packageManager: pnpm@10`). Never run `npm`, `npx` (unless with pnpm dlx), or `yarn`.
- **Scripts:**
  - Build verification: `pnpm run build` (`next build --webpack`)
  - Development server: `pnpm run dev`
  - Linting: `pnpm run lint`
  - Blog pipeline: `pnpm run generate-blog`
- **Shell & Platform:**
  - Operating System: Windows (PowerShell).
  - Directory listing: Prefer native tools (`list_dir`) or `dir`.
  - Git inspection: Prefer `git log -n <N> --oneline` and `git status`.
  - Prohibited commands: Never run destructive commands (`git reset --hard`, `rm -rf`, dropping tables) without explicit user authorization.
- **Secret Hygiene:**
  - Never print, echo, or commit credentials from `.env`.
  - All secret keys reside strictly in `.env`. Reference `.env.example` for variable names.

---

## 3. Architecture & Code Conventions

### Next.js App Router & Component Boundaries
- **Server Components by default:** All route pages (`page.tsx`) must be Server Components performing direct Drizzle queries with Incremental Static Regeneration (`export const revalidate = 3600`).
- **Client Components:** Mark interactive or hook-dependent components with `"use client"`.
- **SSR-Free Client Boundary:** Client-only components that use browser APIs or window state (`Chatbot`, `PushSettings`, `CloudTransition`) **must** be loaded inside [`components/LazyClientComponents.tsx`](file:///s:/portfolio/samir-portfolio-dev/components/LazyClientComponents.tsx) using `next/dynamic` with `{ ssr: false }` to avoid hydration mismatches.

### Database & Drizzle ORM
- Connects to Neon Serverless PostgreSQL with `pgvector` (3072 dimensions).
- Schema defined in [`lib/schema.ts`](file:///s:/portfolio/samir-portfolio-dev/lib/schema.ts) (12 tables).
- `admin_users` table is defined but unused. Credentials auth matches `ADMIN_USERNAME` and `ADMIN_PASSWORD` env vars in [`lib/auth.ts`](file:///s:/portfolio/samir-portfolio-dev/lib/auth.ts).
- Blog comments are append-only JSONB arrays (`[{ name, comment, createdAt }]`).
- Migrations managed via Drizzle Kit (`pnpm drizzle-kit`).

### API Authentication & Dual-Mode Endpoints
- Public endpoints: `/api/chat`, `/api/feed`, `/api/pdf-proxy`, `/api/blogs/slug/*`, `/api/projects/slug/*`, `/api/contact` (POST).
- Protected admin routes: Validate session via `await auth()`.
- Dual-Mode endpoints: `POST /api/blogs` and `POST /api/push/send` use `isAuthorized()` from [`lib/api-auth.ts`](file:///s:/portfolio/samir-portfolio-dev/lib/api-auth.ts), allowing either a cookie session OR `Authorization: Bearer <BLOG_AUTOMATION_TOKEN>` with constant-time verification (`timingSafeEqual`).

### AI Chatbot & RAG Engine
- **Embeddings:** Google Gemini `gemini-embedding-2` generating 3072-dimensional vector embeddings.
- **Retrieval:** pgvector `cosineDistance` against `content_chunks` with distance threshold `<= 0.5`.
- **Prompt Constraints ([`lib/chat/prompt.ts`](file:///s:/portfolio/samir-portfolio-dev/lib/chat/prompt.ts)):** Strict brevity (1-2 sentences for general questions), no meta-talk ("the context"), use exact Markdown links from context blocks (`/about`, `/resume`, `/contact`), treat context as reference data only.
- **Security ([`lib/chat/security.ts`](file:///s:/portfolio/samir-portfolio-dev/lib/chat/security.ts)):** In-memory rate limiting per IP and per FingerprintJS `x-visitor-id`. IPinfo VPN/proxy check in fail-open mode.

### Styling & Assets
- **Tailwind CSS v4:** Uses CSS variables for color theming (`--color-background`, `--color-foreground`, `--color-primary`, `--color-border-primary`, etc.) with dark mode via `.dark`. Full token & palette documentation in [`portfolio-theme.md`](file:///s:/portfolio/samir-portfolio-dev/portfolio-theme.md).
- **Cloudinary Optimization:** Always wrap Cloudinary image URLs with `optimizeCloudinaryUrl()` from [`lib/cloudinary.ts`](file:///s:/portfolio/samir-portfolio-dev/lib/cloudinary.ts) to enforce `f_auto,q_auto`.
- **Rich Content:** Stored as sanitized HTML, rendered safely with Next.js image optimization via [`components/HtmlParser.tsx`](file:///s:/portfolio/samir-portfolio-dev/components/HtmlParser.tsx) or [`components/ContentWithToc.tsx`](file:///s:/portfolio/samir-portfolio-dev/components/ContentWithToc.tsx).

### SEO, Breadcrumbs & Metadata
- **Single Source of Truth:** Centralize author and URL constants in [`lib/site-config.ts`](file:///s:/portfolio/samir-portfolio-dev/lib/site-config.ts).
- **Structured Data:** Use [`lib/seo/structured-data.ts`](file:///s:/portfolio/samir-portfolio-dev/lib/seo/structured-data.ts) for JSON-LD (`Person`, `WebSite`, `Organization`, `ProfessionalService`, `CollectionPage`, `BreadcrumbList`, `SpeakableSpecification`).
- **Breadcrumbs:** Always use [`components/layout/Breadcrumbs.tsx`](file:///s:/portfolio/samir-portfolio-dev/components/layout/Breadcrumbs.tsx) for navigation and synchronized `BreadcrumbList` schema.

---

## 4. Non-Negotiable Rule Checklist for AI Execution

1. **Skills First:** Always read relevant skill files in `agents/skills/` before proposing changes or writing code.
2. **Package Manager:** Always use `pnpm`. Never invoke `npm` or `yarn`.
3. **No Secret Commits:** Never expose or log `.env` values.
4. **Server Components by Default:** Fetch data in server components with `revalidate = 3600`.
5. **Zero Hydration Errors:** Keep non-SSR client widgets inside `LazyClientComponents.tsx`.
6. **Cloudinary URLs:** Wrap with `optimizeCloudinaryUrl()`.
7. **Breadcrumb Standard:** Use `Breadcrumbs.tsx` exclusively for breadcrumb trails.
8. **Sanitized Output:** Never render un-sanitized raw user or LLM HTML.
9. **Dual Auth Awareness:** Respect `isAuthorized()` on automated endpoints; never weaken session-only routes.
10. **Explain Your Work:** Clearly cite which skill was applied and why architectural decisions were made.
