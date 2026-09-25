"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Certificate } from "@/lib/schema";

export default function CertificatesAdminPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  async function fetchCertificates() {
    setLoading(true);
    try {
      const res = await fetch("/api/certificates/all");
      if (res.ok) {
        const data = await res.json();
        setCertificates(data);
      }
    } catch (err) {
      console.error("Failed to fetch certificates:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Are you sure you want to delete certificate "${title}"? This cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/certificates/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCertificates((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert("Failed to delete certificate.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting certificate.");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleTogglePublish(cert: Certificate) {
    setTogglingId(cert.id);
    try {
      const res = await fetch(`/api/certificates/${cert.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !cert.isPublished }),
      });
      if (res.ok) {
        const updated = await res.json();
        setCertificates((prev) =>
          prev.map((c) => (c.id === cert.id ? { ...c, isPublished: updated.isPublished } : c))
        );
      } else {
        alert("Failed to update status.");
      }
    } catch (err) {
      console.error(err);
      alert("Error toggling certificate status.");
    } finally {
      setTogglingId(null);
    }
  }

  function handleCopy(idStr: string) {
    navigator.clipboard.writeText(idStr);
    setCopiedId(idStr);
    setTimeout(() => setCopiedId(null), 2000);
  }

  const totalCount = certificates.length;
  const publishedCount = certificates.filter((c) => c.isPublished).length;
  const draftCount = totalCount - publishedCount;

  return (
    <main className="flex flex-1">
      <div className="flex-1 p-6 md:p-10 overflow-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Certificates & Credentials</h1>
            <p className="text-sm text-text-muted mt-1">
              Manage verified accreditations, degrees, and technical specializations.
            </p>
          </div>
          <Link
            href="/admin/certificates/new"
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition-opacity self-start md:self-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Certificate
          </Link>
        </div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl border border-border-primary bg-background">
            <span className="text-xs text-text-muted font-medium">Total Credentials</span>
            <p className="text-2xl font-semibold text-foreground mt-1">{totalCount}</p>
          </div>
          <div className="p-4 rounded-xl border border-border-primary bg-background">
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">Published Live</span>
            <p className="text-2xl font-semibold text-foreground mt-1">{publishedCount}</p>
          </div>
          <div className="p-4 rounded-xl border border-border-primary bg-background">
            <span className="text-xs text-text-muted font-medium">Drafts</span>
            <p className="text-2xl font-semibold text-foreground mt-1">{draftCount}</p>
          </div>
        </div>

        {/* Certificates List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-card-bg border border-border-primary rounded-xl animate-pulse" />
            ))}
          </div>
        ) : certificates.length === 0 ? (
          <div className="text-center py-24 border-2 border-dashed border-border-primary rounded-2xl">
            <svg
              className="w-12 h-12 text-text-muted mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
            <h3 className="text-lg font-medium text-foreground mb-2">No certificates yet</h3>
            <p className="text-sm text-text-muted mb-6">
              Add your verified professional certificates and course credentials.
            </p>
            <Link
              href="/admin/certificates/new"
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition-opacity"
            >
              Add First Certificate
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="flex items-start md:items-center gap-4 bg-background border border-border-primary rounded-xl p-4 hover:border-border-secondary transition-colors flex-col md:flex-row"
              >
                {/* Thumbnail Preview */}
                <div className="relative w-16 h-12 rounded-lg border border-border-primary bg-card-bg overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {cert.certificateImageUrl ? (
                    <Image
                      src={cert.certificateImageUrl}
                      alt={cert.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : cert.issuerLogoUrl ? (
                    <Image
                      src={cert.issuerLogoUrl}
                      alt={cert.issuer}
                      width={32}
                      height={32}
                      className="object-contain"
                      unoptimized
                    />
                  ) : (
                    <svg className="w-6 h-6 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-medium text-sm text-foreground">{cert.title}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-foreground/5 text-foreground border border-border-primary">
                      {cert.issuer}
                    </span>
                    <span className="text-xs text-text-muted">Issued: {cert.issueDate}</span>
                    {cert.credentialId && (
                      <button
                        onClick={() => handleCopy(cert.credentialId!)}
                        className="inline-flex items-center gap-1 font-mono text-[11px] px-1.5 py-0.5 bg-card-bg border border-border-primary rounded text-text-muted hover:text-foreground transition-colors"
                        title="Click to copy ID"
                      >
                        <span>{cert.credentialId}</span>
                        <span className="text-[10px] text-primary">
                          {copiedId === cert.credentialId ? "✓" : "📋"}
                        </span>
                      </button>
                    )}
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded border ${
                        cert.isPublished
                          ? "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400"
                          : "bg-card-bg border-border-primary text-text-muted"
                      }`}
                    >
                      {cert.isPublished ? "Live" : "Draft"}
                    </span>
                  </div>

                  {/* Skills Pills */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap mt-1.5">
                      {cert.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] px-2 py-0.5 bg-card-bg text-text-muted border border-border-primary rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0 self-end md:self-auto">
                  {/* Verify Link */}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-text-muted hover:text-foreground hover:bg-hover-bg rounded-lg transition-colors"
                      title="Verify Credential External Link"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}

                  {/* Toggle Live */}
                  <button
                    onClick={() => handleTogglePublish(cert)}
                    disabled={togglingId === cert.id}
                    title={cert.isPublished ? "Unpublish (Make Draft)" : "Publish (Make Live)"}
                    className="p-2 text-text-muted hover:text-foreground hover:bg-hover-bg rounded-lg transition-colors disabled:opacity-50"
                  >
                    {cert.isPublished ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>

                  {/* Edit */}
                  <Link
                    href={`/admin/certificates/${cert.id}/edit`}
                    className="p-2 text-text-muted hover:text-foreground hover:bg-hover-bg rounded-lg transition-colors"
                    title="Edit Certificate"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </Link>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(cert.id, cert.title)}
                    disabled={deletingId === cert.id}
                    title="Delete Certificate"
                    className="p-2 text-text-muted hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
