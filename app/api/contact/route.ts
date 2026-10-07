import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { contact as contactSchema } from "@/lib/schema";
import { desc } from "drizzle-orm";

import { sendContactConfirmationEmail, sendAdminContactNotification } from "@/lib/email";

import { neon } from "@neondatabase/serverless";

let schemaEnsured = false;
async function ensureContactColumns() {
  if (schemaEnsured || !process.env.DATABASE_URL) return;
  try {
    const rawSql = neon(process.env.DATABASE_URL);
    await rawSql`ALTER TABLE "contact" ADD COLUMN IF NOT EXISTS "company" text;`;
    await rawSql`ALTER TABLE "contact" ADD COLUMN IF NOT EXISTS "project_type" text;`;
    await rawSql`ALTER TABLE "contact" ADD COLUMN IF NOT EXISTS "priority" text DEFAULT 'Medium Priority';`;
    await rawSql`ALTER TABLE "contact" ADD COLUMN IF NOT EXISTS "budget" text;`;
    await rawSql`ALTER TABLE "contact" ADD COLUMN IF NOT EXISTS "timeline" text;`;
    schemaEnsured = true;
  } catch (err) {
    console.error("Failed to ensure contact columns:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();
    const company = body.company ? String(body.company).trim() : null;
    const projectType = body.projectType ? String(body.projectType).trim() : null;
    const priority = body.priority ? String(body.priority).trim() : "Medium Priority";
    const budget = body.budget ? String(body.budget).trim() : null;
    const timeline = body.timeline ? String(body.timeline).trim() : null;

    const subject = String(
      body.subject ||
      (projectType ? `${projectType} Inquiry${company ? ` (${company})` : ""}` : "Project Inquiry")
    ).trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and project description are required" },
        { status: 400 }
      );
    }

    // Ensure columns exist in DB
    await ensureContactColumns();

    // Persist inquiry in the database
    await db.insert(contactSchema).values({
      name,
      email,
      subject,
      message,
      company: company || undefined,
      projectType: projectType || undefined,
      priority: priority || undefined,
      budget: budget || undefined,
      timeline: timeline || undefined,
    });

    // Send confirmation email to the user and notification to admin
    // Non-fatal: if email fails or SMTP is unconfigured, DB record is already safely stored
    const [confirmationResult] = await Promise.allSettled([
      sendContactConfirmationEmail({
        name,
        email,
        subject,
        message,
        company: company || undefined,
        projectType: projectType || undefined,
        priority: priority || undefined,
        budget: budget || undefined,
        timeline: timeline || undefined,
      }),
      sendAdminContactNotification({
        name,
        email,
        subject,
        message,
        company: company || undefined,
        projectType: projectType || undefined,
        priority: priority || undefined,
        budget: budget || undefined,
        timeline: timeline || undefined,
      }),
    ]);

    const confirmationSuccess =
      confirmationResult.status === "fulfilled" && confirmationResult.value.success;

    return NextResponse.json(
      {
        success: true,
        emailSent: confirmationSuccess,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await db.select().from(contactSchema).orderBy(desc(contactSchema.createdAt));
    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/contact error:", error);
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}
