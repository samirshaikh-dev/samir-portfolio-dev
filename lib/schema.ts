import { pgTable, text, boolean, timestamp, uuid, integer, jsonb, date, vector } from "drizzle-orm/pg-core";

export const adminUsers = pgTable('admin_users', {
    id: uuid('id').defaultRandom().primaryKey(),
    email: text('email').unique().notNull(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

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
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
    publishedAt: timestamp('published_at', { withTimezone: true }),
});

export const blogs = pgTable('blogs', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text('title').notNull(),
    slug: text('slug').unique().notNull(),
    excerpt: text('excerpt'),
    content: text('content').notNull(),
    coverImageUrl: text('cover_image_url'),
    tags: text('tags').array(),
    isPublished: boolean('is_published').default(false),
    stars: integer('stars').default(0),
    comments: jsonb('comments').default([]),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
    publishedAt: timestamp('published_at', { withTimezone: true }),
});

export const about = pgTable('about', {
    description: text('description'),
    present: text('present'),
    future: text('future'),
});

export const resume = pgTable('resume', {
    resume: text('resume'),
});

export const contact = pgTable('contact', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name'),
    email: text('email'),
    subject: text('subject'),
    message: text('message'),
    seen: boolean('seen').default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const socials = pgTable('socials', {
    name: text('name'),
    url: text('url'),
    displayOrder: integer('display_order'),
});

export const pushSubscriptions = pgTable('push_subscriptions', {
    id: uuid('id').defaultRandom().primaryKey(),
    endpoint: text('endpoint').unique().notNull(),
    subscriptionJson: jsonb('subscription_json').notNull(),
    topic: text('topic').notNull().default('all'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const sentNotifications = pgTable('sent_notifications', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text('title').notNull(),
    body: text('body').notNull(),
    url: text('url'),
    imageUrl: text('image_url'),
    targetTopic: text('target_topic').notNull(),
    successCount: integer('success_count').default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const experiences = pgTable('experiences', {
    id: uuid('id').defaultRandom().primaryKey(),
    companyName: text('company_name').notNull(),
    logoUrl: text('logo_url'),
    position: text('position').notNull(),
    description: text('description'),
    startDate: date('start_date', { mode: 'string' }).notNull(),
    endDate: date('end_date', { mode: 'string' }),
    pay: text('pay'),
    isCurrent: boolean('is_current').default(false),
    displayOrder: integer('display_order'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const media = pgTable('media', {
    id: uuid('id').defaultRandom().primaryKey(),
    url: text('url').notNull(),
    publicId: text('public_id').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const contentChunks = pgTable('content_chunks', {
    id: uuid('id').defaultRandom().primaryKey(),
    sourceId: uuid('source_id').notNull(),
    sourceType: text('source_type').notNull(),
    chunkText: text('chunk_text').notNull(),
    embedding: vector('embedding', { dimensions: 3072 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const testimonials = pgTable('testimonials', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    role: text('role').notNull(),
    company: text('company'),
    avatarUrl: text('avatar_url'),
    linkedinUrl: text('linkedin_url'),
    quote: text('quote').notNull(),
    rating: integer('rating').default(5),
    source: text('source'),
    isPublished: boolean('is_published').default(false),
    displayOrder: integer('display_order').default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const certificates = pgTable('certificates', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text('title').notNull(),
    issuer: text('issuer').notNull(),
    issuerLogoUrl: text('issuer_logo_url'),
    issueDate: date('issue_date', { mode: 'string' }).notNull(),
    expirationDate: date('expiration_date', { mode: 'string' }),
    credentialId: text('credential_id'),
    credentialUrl: text('credential_url'),
    certificateImageUrl: text('certificate_image_url'),
    certificatePdfUrl: text('certificate_pdf_url'),
    description: text('description'),
    skills: text('skills').array(),
    isPublished: boolean('is_published').default(false),
    displayOrder: integer('display_order').default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export type Certificate = typeof certificates.$inferSelect;
export type NewCertificate = typeof certificates.$inferInsert;
