import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL is not defined in environment.");
  process.exit(1);
}

const sql = neon(databaseUrl);

async function run() {
  try {
    console.log("Applying contact table column additions...");
    await sql`ALTER TABLE "contact" ADD COLUMN IF NOT EXISTS "company" text;`;
    await sql`ALTER TABLE "contact" ADD COLUMN IF NOT EXISTS "project_type" text;`;
    await sql`ALTER TABLE "contact" ADD COLUMN IF NOT EXISTS "priority" text DEFAULT 'Medium Priority';`;
    await sql`ALTER TABLE "contact" ADD COLUMN IF NOT EXISTS "budget" text;`;
    await sql`ALTER TABLE "contact" ADD COLUMN IF NOT EXISTS "timeline" text;`;
    console.log("Successfully updated contact table schema in database!");
  } catch (error) {
    console.error("Error updating schema:", error);
    process.exit(1);
  }
}

run();
