import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { certificates as certificatesSchema } from "@/lib/schema";
import { auth } from "@/lib/auth";
import { eq, asc, desc } from "drizzle-orm";

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(certificatesSchema)
      .where(eq(certificatesSchema.isPublished, true))
      .orderBy(asc(certificatesSchema.displayOrder), desc(certificatesSchema.issueDate));
    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET /api/certificates error:", error);
    return NextResponse.json({ error: "Failed to fetch certificates" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
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

    if (!title || !issuer || !issueDate) {
      return NextResponse.json({ error: "title, issuer, and issueDate are required" }, { status: 400 });
    }

    const [created] = await db
      .insert(certificatesSchema)
      .values({
        title,
        issuer,
        issuerLogoUrl: issuerLogoUrl || null,
        issueDate,
        expirationDate: expirationDate || null,
        credentialId: credentialId || null,
        credentialUrl: credentialUrl || null,
        certificateImageUrl: certificateImageUrl || null,
        certificatePdfUrl: certificatePdfUrl || null,
        description: description || null,
        skills: Array.isArray(skills) ? skills : [],
        isPublished: isPublished ?? false,
        displayOrder: displayOrder ?? 0,
      })
      .returning();

    revalidatePath("/certificates");
    revalidatePath("/admin/certificates");
    revalidatePath("/about");

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST /api/certificates error:", error);
    return NextResponse.json({ error: "Failed to create certificate" }, { status: 500 });
  }
}
