# Implementation Plan: Projects & Case Studies Architecture Redesign

> **Based on:** Requirements in [`req.txt`](file:///s:/portfolio/samir-portfolio-dev/req.txt), the Client Audit in [`portfolio_client_audit.md`](file:///s:/portfolio/samir-portfolio-dev/portfolio_client_audit.md), and the positioning strategy in [`ai-developer.md`](file:///s:/portfolio/samir-portfolio-dev/ai-developer.md).

---

## Architecture Overview

```mermaid
graph TD
    subgraph Database Layer [Neon PostgreSQL + Drizzle ORM]
        DB[(projects table)]
        DB -->|is_case_study: bool| Flagship[Case Studies]
        DB -->|badge: text| Badge[Badge Type]
        DB -->|category: text| Cat[Category Filter]
        DB -->|metrics: text[]| Metrics[Outcome Metrics]
    end

    subgraph Admin Layer [Admin CMS]
        Form[ProjectForm.tsx] -->|API Route| DB
        List[Admin Project List] --> DB
    end

    subgraph Presentation Layer [Next.js App Router]
        DB --> ProjectsPage[/projects: Selected Work & Case Studies]
        DB --> HomePage[/: Homepage Selected Work Preview]
        DB --> ProjectSlug[/projects/slug: Case Study Deep Dive]
        
        ProjectsPage --> FilterBar[Filter Bar: All | Case Studies | Projects | AI | Automation | Full Stack]
        ProjectsPage --> FeaturedGrid[Featured Case Studies: 2-3 Hero Cards]
        ProjectsPage --> MoreGrid[More Projects: Compact Grid]
    end
```

---

## Phase 1: Database Schema & Drizzle Migration

### 1.1 Schema Additions (`lib/schema.ts`)
Extend the `projects` table with columns to distinguish case studies from regular builds, enable filtering, and record business outcome metrics:

```typescript
export const projects = pgTable('projects', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text('title').notNull(),
    slug: text('slug').unique().notNull(),
    excerpt: text('excerpt'),
    content: text('content').notNull(),
    technologies: text('technologies').array(),
    githubLink: text('github_link'),
    demoLink: text('demo_link'),
    coverImageUrl: text('cover_image_url'),
    isPublished: boolean('is_published').default(false),
    
    // NEW FIELDS
    isCaseStudy: boolean('is_case_study').default(false),
    badge: text('badge').default('Personal Project'), // 'Case Study' | 'Personal Project' | 'Open Source' | 'Experiment' | 'Client Work'
    category: text('category').default('AI'),         // 'AI' | 'Automation' | 'Full Stack' | 'Backend'
    metrics: text('metrics').array(),                // e.g. ["Sub-150ms retrieval", "3072d vector search", "99.2% accuracy"]
    displayOrder: integer('display_order').default(0),

    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
    publishedAt: timestamp('published_at', { withTimezone: true }),
});
```

### 1.2 Migration & Data Backfill
1. Run `pnpm exec drizzle-kit generate` to produce a migration script (e.g. `0003_add_project_case_study_fields.sql`).
2. Run `pnpm exec drizzle-kit migrate` (or push) to update the Neon database.
3. Seed/backfill the 3 existing projects:
   * **AI Ticket Triage Platform:** `isCaseStudy: true`, `badge: "Case Study"`, `category: "AI"`, `metrics: ["Multi-model routing", "BullMQ queue isolation", "Sub-200ms latency"]`.
   * **WhatsApp Campaign Automation:** `isCaseStudy: true`, `badge: "Case Study"`, `category: "Automation"`, `metrics: ["High-throughput broadcast", "Rate-limit guardrails", "Interactive webhook handling"]`.
   * **Eventify Platform:** `isCaseStudy: false`, `badge: "Personal Project"`, `category: "Full Stack"`, `metrics: ["Event-driven architecture", "PostgreSQL RBAC", "Real-time ticket validation"]`.

---

## Phase 2: Admin CMS & API Updates

### 2.1 API Route Update (`app/api/projects/route.ts` & `[id]/route.ts`)
* Support inserting and updating: `isCaseStudy`, `badge`, `category`, `metrics`, `displayOrder`.
* Add validation ensuring `badge` and `category` fall within supported options.

### 2.2 Admin Form Update (`components/admin/ProjectForm.tsx`)
* Add a **"Featured Case Study" toggle switch** (`is_case_study`).
* Add a **Badge selector dropdown**: `Case Study`, `Personal Project`, `Client Work`, `Open Source`, `Experiment`.
* Add a **Category selector dropdown**: `AI`, `Automation`, `Full Stack`, `Backend`.
* Add an **Outcome Metrics input**: Tag-based input for key results (e.g. latency, users, throughput).
* Add a **Display Order input** for ranking flagship projects on top.

---

## Phase 3: Projects Page UI & Two-Tier Architecture (`/projects`)

### 3.1 New Component Structure (`components/projects/ProjectList.tsx`)
Restructure into two clear tiers as specified in `req.txt`:

#### 1. Interactive Filter Bar
```text
[All]  [Case Studies]  [Projects]  [AI]  [Automation]  [Full Stack]
```
* **Instant client-side filter:** Selecting `Case Studies` isolates flagship deep dives; selecting `AI` shows only AI systems.

#### 2. Featured Case Studies Section (Top Tier)
* **Visual Style:** 2–3 prominent, high-impact hero cards.
* **Content:**
  * Bold project title + subtitle/excerpt.
  * Badges: `Case Study` (with distinct badge accent styling) + `Category`.
  * Technology tags (pills).
  * Outcome Metric pills (highlighting real-world performance).
  * Direct action: **[Read Case Study →]** leading to the deep dive page.

#### 3. More Projects Section (Bottom Tier)
* **Visual Style:** 3-column compact responsive grid.
* **Content:**
  * Clean title + concise description.
  * Badges: `Personal Project` / `Experiment` / `Open Source`.
  * Quick technology list.
  * Action links: `[Live Demo ↗]` · `[GitHub ↗]`.

---

## Phase 4: Homepage "Selected Work" Section

### 4.1 Update `app/page.tsx`
* Currently, the homepage shows `getLatestProjects()` in standard cards.
* Update the query to prioritize `isCaseStudy = true` ordered by `displayOrder`.
* Render a curated **Selected Work** showcase:
  * 2 Large Featured Case Studies (e.g. *AI Customer Ticket Triage* & *WhatsApp Campaign Platform*).
  * 1 Compact Project Card.
  * A clear, high-converting footer action:  
    `View all projects & case studies (X total) →` linking to `/projects`.

---

## Phase 5: Case Study Slug Page Enhancement (`/projects/[slug]`)

### 5.1 Case Study Header Banner
For projects with `isCaseStudy = true`, augment the top of [`app/projects/[slug]/page.tsx`](file:///s:/portfolio/samir-portfolio-dev/app/projects/[slug]/page.tsx):
* **Metadata Bar:** Role (Lead AI & Backend Engineer), Timeline, Category, Stack.
* **Key Results Strip:** Highlight boxes displaying the metrics saved in the DB (e.g., Latency, Accuracy, Throughput).
* **Clear Navigation:** Synchronized breadcrumbs (`Home / Projects / Eventify`).

---

## Execution Checklist & Sequence

| Step | Task | Files Affected | Risk / Dependencies |
| :---: | :--- | :--- | :--- |
| **1** | Update DB schema with new columns | [`lib/schema.ts`](file:///s:/portfolio/samir-portfolio-dev/lib/schema.ts) | Low (all columns have safe defaults) |
| **2** | Generate & run Drizzle migration | `drizzle/`, Neon DB | Database connection required |
| **3** | Update Project API routes | `app/api/projects/route.ts`, `[id]/route.ts` | Low |
| **4** | Update Admin CMS `ProjectForm.tsx` | [`components/admin/ProjectForm.tsx`](file:///s:/portfolio/samir-portfolio-dev/components/admin/ProjectForm.tsx) | Low |
| **5** | Redesign `ProjectList.tsx` (Two-Tier + Filter) | [`components/projects/ProjectList.tsx`](file:///s:/portfolio/samir-portfolio-dev/components/projects/ProjectList.tsx) | Low (Client component) |
| **6** | Update `/projects` page queries & types | [`app/projects/page.tsx`](file:///s:/portfolio/samir-portfolio-dev/app/projects/page.tsx) | Low |
| **7** | Update Homepage Selected Work preview | [`app/page.tsx`](file:///s:/portfolio/samir-portfolio-dev/app/page.tsx) | Low |
| **8** | Verify type-safety & zero regressions | `pnpm exec tsc --noEmit` | Clean build |
