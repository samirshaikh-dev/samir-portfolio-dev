"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CertificateForm, { CertificateData } from "@/components/admin/CertificateForm";

export default function EditCertificatePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCertificate() {
      try {
        const res = await fetch(`/api/certificates/${id}`);
        if (!res.ok) throw new Error("Certificate not found");
        const json = await res.json();
        setData({
          id: json.id,
          title: json.title ?? "",
          issuer: json.issuer ?? "",
          issuerLogoUrl: json.issuerLogoUrl ?? "",
          issueDate: json.issueDate ?? "",
          expirationDate: json.expirationDate ?? "",
          credentialId: json.credentialId ?? "",
          credentialUrl: json.credentialUrl ?? "",
          certificateImageUrl: json.certificateImageUrl ?? "",
          certificatePdfUrl: json.certificatePdfUrl ?? "",
          description: json.description ?? "",
          skills: json.skills ?? [],
          isPublished: json.isPublished ?? false,
          displayOrder: json.displayOrder ?? 0,
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load certificate data");
        router.push("/admin/certificates");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadCertificate();
    }
  }, [id, router]);

  if (loading) {
    return (
      <main className="flex flex-1 p-6 md:p-10">
        <div className="flex-1 max-w-4xl space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 bg-card-bg border border-border-primary rounded-xl animate-pulse" />
          ))}
        </div>
      </main>
    );
  }

  if (!data) return null;

  return (
    <main className="flex flex-1">
      <CertificateForm initialData={data} isEdit={true} />
    </main>
  );
}
