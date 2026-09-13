import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { contact as contactSchema } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { sendContactReplyEmail } from "@/lib/email";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const { replyText } = await req.json();

    if (!replyText) {
      return NextResponse.json({ error: "Reply text is required" }, { status: 400 });
    }

    // Get the user's email and details
    const result = await db
      .select({
        name: contactSchema.name,
        email: contactSchema.email,
        subject: contactSchema.subject,
      })
      .from(contactSchema)
      .where(eq(contactSchema.id, id));

    if (result.length === 0) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    const { name, email, subject } = result[0];

    if (!email) {
      return NextResponse.json({ error: "Contact has no email address" }, { status: 400 });
    }

    const sendResult = await sendContactReplyEmail(email, {
      name: name || "there",
      replyText,
      originalSubject: subject || undefined,
    });

    if (!sendResult.success) {
      return NextResponse.json(
        { error: sendResult.error || "Failed to send email reply" },
        { status: 500 }
      );
    }

    // Mark inquiry as seen once replied
    await db.update(contactSchema).set({ seen: true }).where(eq(contactSchema.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`POST /api/contact/${id}/reply error:`, error);
    return NextResponse.json({ error: "Failed to send reply" }, { status: 500 });
  }
}
