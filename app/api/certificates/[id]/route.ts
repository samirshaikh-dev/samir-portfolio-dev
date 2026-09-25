import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { certificates as certificatesSchema } from "@/lib/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";

// Admin-only: GET single certificate (for edit form)
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const [row] = await db
      .select()
      .from(certificatesSchema)
      .where(eq(certificatesSchema.id, id));

    if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(row);
  } catch (error) {
    console.error("GET /api/certificates/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch certificate" }, { status: 500 });
  }
}

// Admin-only: Update a certificate
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const {
      title,
      issuer,
      issuerLogoUrl,
      issueDate,
      expirationDate,
      credentialId,
      credentialUrl,
      certificateImageUrl,
      certificatePdfUrl,
      description,
      skills,
      isPublished,
      displayOrder,
    } = body;

    const [updated] = await db
      .update(certificatesSchema)
      .set({
        ...(title !== undefined && { title }),
        ...(issuer !== undefined && { issuer }),
        ...(issuerLogoUrl !== undefined && { issuerLogoUrl: issuerLogoUrl || null }),
        ...(issueDate !== undefined && { issueDate }),
        ...(expirationDate !== undefined && { expirationDate: expirationDate || null }),
        ...(credentialId !== undefined && { credentialId: credentialId || null }),
        ...(credentialUrl !== undefined && { credentialUrl: credentialUrl || null }),
        ...(certificateImageUrl !== undefined && { certificateImageUrl: certificateImageUrl || null }),
        ...(certificatePdfUrl !== undefined && { certificatePdfUrl: certificatePdfUrl || null }),
        ...(description !== undefined && { description: description || null }),
        ...(skills !== undefined && { skills: Array.isArray(skills) ? skills : [] }),
        ...(isPublished !== undefined && { isPublished }),
        ...(displayOrder !== undefined && { displayOrder }),
        updatedAt: new Date(),
      })
      .where(eq(certificatesSchema.id, id))
      .returning();

    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

    revalidatePath("/certificates");
    revalidatePath("/admin/certificates");
    revalidatePath("/about");

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/certificates/[id] error:", error);
    return NextResponse.json({ error: "Failed to update certificate" }, { status: 500 });
  }
}

// Admin-only: Delete a certificate
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await db.delete(certificatesSchema).where(eq(certificatesSchema.id, id));

    revalidatePath("/certificates");
    revalidatePath("/admin/certificates");
    revalidatePath("/about");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/certificates/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete certificate" }, { status: 500 });
  }
}
