import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { contact as contactSchema } from "@/lib/schema";
import { desc } from "drizzle-orm";

import { sendContactConfirmationEmail, sendAdminContactNotification } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Persist inquiry in the database
    await db.insert(contactSchema).values({
      name,
      email,
      subject,
      message,
    });

    // Send confirmation email to the user and notification to admin
    // Non-fatal: if email fails or SMTP is unconfigured, DB record is already safely stored
    const [confirmationResult] = await Promise.allSettled([
      sendContactConfirmationEmail({ name, email, subject, message }),
      sendAdminContactNotification({ name, email, subject, message }),
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
