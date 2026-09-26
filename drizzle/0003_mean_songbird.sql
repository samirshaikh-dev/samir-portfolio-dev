CREATE TABLE "certificates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"issuer" text NOT NULL,
	"issuer_logo_url" text,
	"issue_date" date NOT NULL,
	"expiration_date" date,
	"credential_id" text,
	"credential_url" text,
	"certificate_image_url" text,
	"certificate_pdf_url" text,
	"description" text,
	"skills" text[],
	"is_published" boolean DEFAULT false,
	"display_order" integer DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "is_case_study" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "badge" text DEFAULT 'Personal Project';--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "category" text DEFAULT 'AI';--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "metrics" text[];--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "display_order" integer DEFAULT 0;