"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import MediaLibraryModal from "@/components/admin/MediaLibraryModal";

export interface CertificateData {
  id?: string;
  title: string;
  issuer: string;
  issuerLogoUrl?: string | null;
  issueDate: string;
  expirationDate?: string | null;
  credentialId?: string | null;
  credentialUrl?: string | null;
  certificateImageUrl?: string | null;
  certificatePdfUrl?: string | null;
  description?: string | null;
  skills: string[];
  isPublished: boolean;
  displayOrder: number;
}

interface CertificateFormProps {
  initialData?: CertificateData;
  isEdit?: boolean;
}

export default function CertificateForm({ initialData, isEdit = false }: CertificateFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<"certImage" | "issuerLogo">("certImage");

  const [form, setForm] = useState<CertificateData>({
    title: initialData?.title || "",
    issuer: initialData?.issuer || "",
    issuerLogoUrl: initialData?.issuerLogoUrl || "",
    issueDate: initialData?.issueDate || new Date().toISOString().split("T")[0],
    expirationDate: initialData?.expirationDate || "",
    credentialId: initialData?.credentialId || "",
    credentialUrl: initialData?.credentialUrl || "",
    certificateImageUrl: initialData?.certificateImageUrl || "",
    certificatePdfUrl: initialData?.certificatePdfUrl || "",
    description: initialData?.description || "",
    skills: initialData?.skills || [],
    isPublished: initialData?.isPublished ?? true,
    displayOrder: initialData?.displayOrder ?? 0,
  });

  const [skillInput, setSkillInput] = useState(initialData?.skills?.join(", ") || "");

  function update<K extends keyof CertificateData>(field: K, value: CertificateData[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSkillsChange(val: string) {
    setSkillInput(val);
    const parsed = val
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    update("skills", parsed);
  }

  function openMediaModal(target: "certImage" | "issuerLogo") {
    setMediaTarget(target);
    setMediaModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.issuer.trim() || !form.issueDate) {
      alert("Title, Issuer, and Issue Date are required.");
      return;
    }

    setSaving(true);
    try {
      const endpoint = isEdit ? `/api/certificates/${initialData?.id}` : "/api/certificates";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to save certificate");
      }

      router.push("/admin/certificates");
      router.refresh();
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : "Failed to save certificate";
      alert(message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex-1 p-6 md:p-10 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin/certificates"
          className="p-2 text-text-muted hover:text-foreground hover:bg-hover-bg rounded-lg transition-colors"
          title="Back to Certificates"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {isEdit ? "Edit Certificate" : "Add New Certificate"}
          </h1>
          <p className="text-sm text-text-muted mt-0.5">
            {isEdit
              ? "Update details, verification links, or visibility for this credential."
              : "Register an accredited certification or technical specialization."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title + Issuer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-text-secondary">Certificate Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-border-primary rounded-lg focus:ring-2 focus:ring-border-primary outline-none bg-background text-foreground"
              placeholder="e.g. Meta Backend Developer Professional Certificate"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-text-secondary">Issuer / Organization *</label>
            <input
              type="text"
              value={form.issuer}
              onChange={(e) => update("issuer", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-border-primary rounded-lg focus:ring-2 focus:ring-border-primary outline-none bg-background text-foreground"
              placeholder="e.g. Meta, AWS, Google Cloud, DeepLearning.AI"
              required
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-text-secondary">Issue Date *</label>
            <input
              type="date"
              value={form.issueDate}
              onChange={(e) => update("issueDate", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-border-primary rounded-lg focus:ring-2 focus:ring-border-primary outline-none bg-background text-foreground"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-text-secondary">Expiration Date (Optional)</label>
            <input
              type="date"
              value={form.expirationDate || ""}
              onChange={(e) => update("expirationDate", e.target.value || null)}
              className="w-full px-3 py-2 text-sm border border-border-primary rounded-lg focus:ring-2 focus:ring-border-primary outline-none bg-background text-foreground"
            />
          </div>
        </div>

        {/* Credential ID + Verification URL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-text-secondary">Credential ID / License Number</label>
            <input
              type="text"
              value={form.credentialId || ""}
              onChange={(e) => update("credentialId", e.target.value || null)}
              className="w-full px-3 py-2 text-sm font-mono border border-border-primary rounded-lg focus:ring-2 focus:ring-border-primary outline-none bg-background text-foreground"
              placeholder="e.g. GCC-CERT-982138"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-text-secondary">Credential Verification URL</label>
            <input
              type="url"
              value={form.credentialUrl || ""}
              onChange={(e) => update("credentialUrl", e.target.value || null)}
              className="w-full px-3 py-2 text-sm border border-border-primary rounded-lg focus:ring-2 focus:ring-border-primary outline-none bg-background text-foreground"
              placeholder="https://www.credly.com/badges/... or https://coursera.org/verify/..."
            />
          </div>
        </div>

        {/* Certificate Image + Issuer Logo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Certificate Image */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-text-secondary">Certificate Preview Image</label>
            <div className="flex items-center gap-3">
              {form.certificateImageUrl ? (
                <div className="relative w-14 h-10 rounded border border-border-primary overflow-hidden">
                  <Image
                    src={form.certificateImageUrl}
                    alt="Certificate Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-14 h-10 rounded border border-dashed border-border-primary flex items-center justify-center text-[10px] text-text-muted">
                  No Image
                </div>
              )}
              <button
                type="button"
                onClick={() => openMediaModal("certImage")}
                className="inline-flex items-center gap-2 px-3 py-2 border border-border-primary rounded-lg text-sm text-text-secondary bg-background hover:bg-hover-bg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {form.certificateImageUrl ? "Change" : "Choose Media"}
              </button>
              {form.certificateImageUrl && (
                <button
                  type="button"
                  onClick={() => update("certificateImageUrl", null)}
                  className="text-xs text-red-600 dark:text-red-400 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
            <input
              type="url"
              value={form.certificateImageUrl || ""}
              onChange={(e) => update("certificateImageUrl", e.target.value || null)}
              placeholder="Or paste image URL directly"
              className="w-full mt-2 px-3 py-1.5 text-xs border border-border-primary rounded-lg focus:ring-1 focus:ring-border-primary outline-none bg-background text-text-muted"
            />
          </div>

          {/* Issuer Logo */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-text-secondary">Issuer Logo / Badge (Optional)</label>
            <div className="flex items-center gap-3">
              {form.issuerLogoUrl ? (
                <div className="relative w-10 h-10 rounded-full border border-border-primary overflow-hidden p-1 bg-white">
                  <Image
                    src={form.issuerLogoUrl}
                    alt="Issuer Logo"
                    fill
                    className="object-contain p-1"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full border border-dashed border-border-primary flex items-center justify-center text-[10px] text-text-muted">
                  No Logo
                </div>
              )}
              <button
                type="button"
                onClick={() => openMediaModal("issuerLogo")}
                className="inline-flex items-center gap-2 px-3 py-2 border border-border-primary rounded-lg text-sm text-text-secondary bg-background hover:bg-hover-bg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {form.issuerLogoUrl ? "Change" : "Choose Logo"}
              </button>
              {form.issuerLogoUrl && (
                <button
                  type="button"
                  onClick={() => update("issuerLogoUrl", null)}
                  className="text-xs text-red-600 dark:text-red-400 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
            <input
              type="url"
              value={form.issuerLogoUrl || ""}
              onChange={(e) => update("issuerLogoUrl", e.target.value || null)}
              placeholder="Or paste logo URL directly"
              className="w-full mt-2 px-3 py-1.5 text-xs border border-border-primary rounded-lg focus:ring-1 focus:ring-border-primary outline-none bg-background text-text-muted"
            />
          </div>
        </div>

        {/* Certificate PDF URL */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-text-secondary">Certificate PDF Document URL (Optional)</label>
          <input
            type="url"
            value={form.certificatePdfUrl || ""}
            onChange={(e) => update("certificatePdfUrl", e.target.value || null)}
            className="w-full px-3 py-2 text-sm border border-border-primary rounded-lg focus:ring-2 focus:ring-border-primary outline-none bg-background text-foreground"
            placeholder="https://... (Direct PDF download link)"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-text-secondary">Summary / Topics Covered</label>
          <textarea
            value={form.description || ""}
            onChange={(e) => update("description", e.target.value || null)}
            rows={3}
            className="w-full px-3 py-2 text-sm border border-border-primary rounded-lg focus:ring-2 focus:ring-border-primary outline-none bg-background text-foreground resize-none"
            placeholder="Brief 1-2 sentence overview of verified knowledge, coursework, or capstone projects completed."
          />
        </div>

        {/* Skills Covered */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-text-secondary">
            Skills & Technologies (Comma-separated)
          </label>
          <input
            type="text"
            value={skillInput}
            onChange={(e) => handleSkillsChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-border-primary rounded-lg focus:ring-2 focus:ring-border-primary outline-none bg-background text-foreground"
            placeholder="e.g. Node.js, PostgreSQL, Docker, Microservices, System Design"
          />
          {form.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {form.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 text-xs bg-card-bg border border-border-primary rounded-md text-text-secondary"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Display Order */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-text-secondary">Display Order Rank</label>
            <input
              type="number"
              min={0}
              value={form.displayOrder}
              onChange={(e) => update("displayOrder", parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 text-sm border border-border-primary rounded-lg focus:ring-2 focus:ring-border-primary outline-none bg-background text-foreground"
            />
            <p className="text-[11px] text-text-muted">Lower numbers appear first in list.</p>
          </div>
        </div>

        {/* Publish toggle & Submit */}
        <div className="flex items-center justify-between pt-6 border-t border-border-primary">
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <div
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                form.isPublished ? "bg-foreground" : "bg-border-primary"
              }`}
              onClick={() => update("isPublished", !form.isPublished)}
              role="switch"
              aria-checked={form.isPublished}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && update("isPublished", !form.isPublished)}
            >
              <span
                className={`inline-block h-3.5 w-3.5 rounded-full bg-background transition-transform ${
                  form.isPublished ? "translate-x-4.5" : "translate-x-0.5"
                }`}
              />
            </div>
            <span className="text-sm font-medium text-foreground">
              {form.isPublished ? "Published (Live on site)" : "Draft (Hidden from public)"}
            </span>
          </label>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/certificates"
              className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-foreground border border-border-primary rounded-lg hover:bg-hover-bg transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving ? "Saving..." : isEdit ? "Update Certificate" : "Publish Certificate"}
            </button>
          </div>
        </div>
      </form>

      <MediaLibraryModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelect={(url) => {
          if (mediaTarget === "certImage") {
            update("certificateImageUrl", url);
          } else {
            update("issuerLogoUrl", url);
          }
          setMediaModalOpen(false);
        }}
      />
    </div>
  );
}
