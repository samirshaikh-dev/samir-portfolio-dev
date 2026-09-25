# CLAUDE.md — Claude Code Operating Guide

> Companion to [`AGENTS.md`](./AGENTS.md) (universal standards & skill routing) and [`AI_RULE.md`](./AI_RULE.md) (engineering guardrails). This file is the Claude Code entry point; both documents above are mandatory reading before any task. Full deep context lives in [`context.md`](./context.md).

## Project

**samir-portfolio-dev** — Personal portfolio, technical blog, commercial services showcase, and interactive RAG AI assistant for **Samir Shaikh** (AI Backend Engineer / AI SDE / Agentic AI Engineer / FDE).

- Production: `https://samir-portfolio-dev.vercel.app`
- Stack: Next.js 16 (App Router, **webpack** build), React 19, TypeScript 5, Tailwind CSS v4, Neon Serverless Postgres + Drizzle ORM + pgvector (3072d), NextAuth v5, Vercel AI SDK (Gemini embeddings + Groq chat), Serwist PWA + Web Push, Cloudinary, Nodemailer, **pnpm v10**.

## Commands

- `pnpm run dev` — dev server (webpack)
- `pnpm run build` — production build (`next build --webpack`)
- `pnpm run start` — production server
- `pnpm run lint` — ESLint
- `pnpm run generate-blog` — automated blog generator pipeline

**Always use `pnpm`.** Never `npm` or `yarn`. Shell is Windows PowerShell; use `dir` for listings.

## Mandatory Protocol: Skills First

Before proposing, designing, or editing ANY code, **read the relevant skill file(s)** in `agents/skills/` and verify against them:

| Task | Skill file |
| :--- | :--- |
| UI / visual design | `agents/skills/ui-ux-engineer/SKILL.md` |
| Frontend / components | `agents/skills/frontend-engineer/SKILL.md` |
| SEO / AEO-GEO / schema | `agents/skills/seo-engineer/SKILL.md` |
| Keywords / content | `agents/skills/seo-keyword-research-implementation/SKILL.md` |
| Performance / latency | `agents/skills/performance-engineer/SKILL.md` |

Cite which skill applied and why.

## Architecture Conventions

- **Server Components by default** — all `page.tsx` fetch Drizzle data directly with `export const revalidate = 3600`.
- **Client Components** marked `"use client"`; heavy browser-only widgets (`Chatbot`, `PushSettings`, `CloudTransition`) load inside `components/LazyClientComponents.tsx` via `next/dynamic` with `{ ssr: false }` — never hydrate them on the server.
- **DB (Drizzle, `lib/schema.ts`):** `admin_users` table is unused; credentials auth matches `ADMIN_USERNAME`/`ADMIN_PASSWORD` env vars in `lib/auth.ts`. Migrations via Drizzle Kit.
- **Auth:** Protected admin routes validate `await auth()`. `POST /api/blogs` and `POST /api/push/send` use `isAuthorized()` (`lib/api-auth.ts`) — cookie session **or** `Authorization: Bearer <BLOG_AUTOMATION_TOKEN>` (constant-time). Never weaken session-only routes.
- **AI/RAG:** Gemini `gemini-embedding-2` (3072d) → pgvector `cosineDistance` with threshold `<= 0.5` (`lib/chat/retrieval.ts`). Strict prompt in `lib/chat/prompt.ts`; rate limiting + VPN detection in `lib/chat/security.ts` (fail-open).
- **Styling:** Tailwind v4 CSS variables (`--color-*`), dark mode `.dark`. Tokens in `portfolio-theme.md`.
- **Media:** Always wrap Cloudinary URLs with `optimizeCloudinaryUrl()` (`lib/cloudinary.ts`).
- **Rich content:** Stored as sanitized HTML; render only via `HtmlParser.tsx` / `ContentWithToc.tsx`. Never render unsanitized user or LLM HTML.
- **Breadcrumbs:** Always use `components/layout/Breadcrumbs.tsx` for UI + `BreadcrumbList` JSON-LD sync.
- **SEO:** Centralized metadata in `lib/site-config.ts` and `lib/seo/*`. Respect robots/sitemap/OpenGraph/LLM-file conventions.
- **Email:** Contact submissions persist to DB first; Nodemailer dispatch is non-fatal (fail-open).

## Rules

1. Read relevant `agents/skills/` file before any change. **No exceptions.**
2. Use `pnpm` only.
3. Never expose or commit `.env` secrets.
4. Server components for reads, client for interactivity.
5. Zero hydration errors — non-SSR widgets stay in `LazyClientComponents.tsx`.
6. `optimizeCloudinaryUrl()` for all Cloudinary assets.
7. `Breadcrumbs.tsx` for all breadcrumb trails.
8. Sanitized output only.
9. Respect `isAuthorized()` dual-mode auth on automated endpoints.
10. Explain what changed and why, citing the skill applied.
11. Never run destructive commands (`rm -rf`, `git reset --hard`, dropping tables) without explicit user authorization.
12. Verify with `pnpm run lint` and `pnpm run build` after completing tasks.