ALTER TABLE "contact" ADD COLUMN "company" text;--> statement-breakpoint
ALTER TABLE "contact" ADD COLUMN "project_type" text;--> statement-breakpoint
ALTER TABLE "contact" ADD COLUMN "priority" text DEFAULT 'Medium Priority';--> statement-breakpoint
ALTER TABLE "contact" ADD COLUMN "budget" text;--> statement-breakpoint
ALTER TABLE "contact" ADD COLUMN "timeline" text;