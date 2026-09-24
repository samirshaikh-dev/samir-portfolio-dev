import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { testimonials as testimonialsSchema } from "@/lib/schema";
import { auth } from "@/lib/auth";
import { asc } from "drizzle-orm";

// Admin-only: fetch ALL testimonials (published + drafts)
export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const rows = await db
      .select()
      .from(testimonialsSchema)
      .orderBy(asc(testimonialsSchema.displayOrder));
    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET /api/testimonials/all error:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}
