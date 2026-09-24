import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { testimonials as testimonialsSchema } from "@/lib/schema";
import { auth } from "@/lib/auth";
import { eq, asc } from "drizzle-orm";

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(testimonialsSchema)
      .where(eq(testimonialsSchema.isPublished, true))
      .orderBy(asc(testimonialsSchema.displayOrder));
    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET /api/testimonials error:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, role, company, avatarUrl, linkedinUrl, quote, rating, source, isPublished, displayOrder } = body;

    if (!name || !role || !quote) {
      return NextResponse.json({ error: "name, role, and quote are required" }, { status: 400 });
    }

    const [created] = await db
      .insert(testimonialsSchema)
      .values({
        name,
        role,
        company: company || null,
        avatarUrl: avatarUrl || null,
        linkedinUrl: linkedinUrl || null,
        quote,
        rating: rating ?? 5,
        source: source || null,
        isPublished: isPublished ?? false,
        displayOrder: displayOrder ?? 0,
      })
      .returning();

    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/contact");
    revalidatePath("/admin/testimonials");

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST /api/testimonials error:", error);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
