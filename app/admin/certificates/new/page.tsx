"use client";

import CertificateForm from "@/components/admin/CertificateForm";

export default function NewCertificatePage() {
  return (
    <main className="flex flex-1">
      <CertificateForm isEdit={false} />
    </main>
  );
}
