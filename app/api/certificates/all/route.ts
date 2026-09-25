import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { certificates as certificatesSchema } from "@/lib/schema";
import { auth } from "@/lib/auth";
import { asc, desc } from "drizzle-orm";

// Admin-only: fetch ALL certificates (published + drafts)
export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const rows = await db
      .select()
      .from(certificatesSchema)
      .orderBy(asc(certificatesSchema.displayOrder), desc(certificatesSchema.createdAt));
    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET /api/certificates/all error:", error);
    return NextResponse.json({ error: "Failed to fetch certificates" }, { status: 500 });
  }
}
