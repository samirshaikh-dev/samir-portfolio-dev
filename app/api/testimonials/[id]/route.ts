import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { testimonials as testimonialsSchema } from "@/lib/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";

// Admin-only: GET single testimonial (for edit form)
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const [row] = await db
      .select()
      .from(testimonialsSchema)
      .where(eq(testimonialsSchema.id, id));

    if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(row);
  } catch (error) {
    console.error("GET /api/testimonials/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch testimonial" }, { status: 500 });
  }
}

// Admin-only: Update a testimonial
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const { name, role, company, avatarUrl, linkedinUrl, quote, rating, source, isPublished, displayOrder } = body;

    const [updated] = await db
      .update(testimonialsSchema)
      .set({
        ...(name !== undefined && { name }),
        ...(role !== undefined && { role }),
        ...(company !== undefined && { company: company || null }),
        ...(avatarUrl !== undefined && { avatarUrl: avatarUrl || null }),
        ...(linkedinUrl !== undefined && { linkedinUrl: linkedinUrl || null }),
        ...(quote !== undefined && { quote }),
        ...(rating !== undefined && { rating }),
        ...(source !== undefined && { source: source || null }),
        ...(isPublished !== undefined && { isPublished }),
        ...(displayOrder !== undefined && { displayOrder }),
        updatedAt: new Date(),
      })
      .where(eq(testimonialsSchema.id, id))
      .returning();

    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/contact");
    revalidatePath("/admin/testimonials");
    // revalidateTag("testimonials");

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/testimonials/[id] error:", error);
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

// Admin-only: Delete a testimonial
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await db.delete(testimonialsSchema).where(eq(testimonialsSchema.id, id));

    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/contact");
    revalidatePath("/admin/testimonials");
    // revalidateTag("testimonials");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/testimonials/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
