"use client";

import { useState } from "react";
import Image from "next/image";
import { Certificate } from "@/lib/schema";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary-utils";

interface CertificateCardProps {
  certificate: Certificate;
  onPreviewImage?: (imageUrl: string, title: string) => void;
}

export default function CertificateCard({
  certificate,
  onPreviewImage,
}: CertificateCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    if (!certificate.credentialId) return;
    navigator.clipboard.writeText(certificate.credentialId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedDate = new Date(certificate.issueDate).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  const formattedExpiry = certificate.expirationDate
    ? new Date(certificate.expirationDate).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <article className="group relative flex flex-col justify-between rounded-xl border border-border-primary bg-background/80 p-5 md:p-6 backdrop-blur-sm transition-all duration-200 hover:border-foreground/40 hover:shadow-sm">
      {/* Top Section */}
      <div>
        {/* Issuer Header */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            {certificate.issuerLogoUrl ? (
              <div className="w-8 h-8 rounded-full border border-border-primary overflow-hidden flex-shrink-0 bg-white p-0.5">
                <Image
                  src={certificate.issuerLogoUrl}
                  alt={certificate.issuer}
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                  unoptimized
                />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full border border-border-primary flex items-center justify-center flex-shrink-0 bg-card-bg text-text-muted">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              </div>
            )}
            <div className="min-w-0">
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider block truncate">
                {certificate.issuer}
              </span>
              <span className="text-[11px] text-text-muted block">
                Issued {formattedDate}
                {formattedExpiry && ` · Expires ${formattedExpiry}`}
              </span>
            </div>
          </div>
        </div>

        {/* Certificate Title */}
        <h3 className="text-base md:text-lg font-semibold text-foreground leading-snug tracking-tight mb-2">
          {certificate.title}
        </h3>

        {/* Description / Summary */}
        {certificate.description && (
          <p className="text-xs text-text-secondary leading-relaxed mb-4 line-clamp-3">
            {certificate.description}
          </p>
        )}

        {/* Preview Image Thumbnail (if available) */}
        {certificate.certificateImageUrl && (
          <div
            onClick={() =>
              onPreviewImage &&
              onPreviewImage(certificate.certificateImageUrl!, certificate.title)
            }
            className="group/img relative w-full h-40 md:h-44 rounded-lg overflow-hidden border border-border-primary bg-card-bg mb-4 cursor-pointer"
            title="Click to view full certificate"
          >
            <Image
              src={optimizeCloudinaryUrl(certificate.certificateImageUrl, { width: 800, quality: 85 })}
              alt={`${certificate.title} preview`}
              fill
              className="object-cover transition-transform duration-300 group-hover/img:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-medium backdrop-blur-[2px]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
              <span>View Certificate</span>
            </div>
          </div>
        )}

        {/* Credential ID Badge */}
        {certificate.credentialId && (
          <div className="flex items-center gap-2 mb-3">
            <button
              type="button"
              onClick={handleCopyId}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] px-2 py-1 rounded bg-card-bg border border-border-primary text-text-muted hover:text-foreground hover:border-foreground/30 transition-colors"
              title="Click to copy credential ID"
            >
              <span>ID: {certificate.credentialId}</span>
              {copied ? (
                <span className="text-green-600 dark:text-green-400 font-sans text-xs">✓ Copied</span>
              ) : (
                <svg className="w-3 h-3 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>
        )}

        {/* Skills Tag Pills */}
        {certificate.skills && certificate.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {certificate.skills.map((skill, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2 py-0.5 rounded bg-card-bg text-text-secondary border border-border-primary"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-border-primary flex items-center justify-between gap-3 mt-2">
        <div className="flex items-center gap-2">
          {certificate.certificatePdfUrl && (
            <a
              href={certificate.certificatePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-foreground transition-colors"
              title="Download Certificate PDF"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>PDF</span>
            </a>
          )}
        </div>

        {certificate.credentialUrl && (
          <a
            href={certificate.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:opacity-80 transition-opacity ml-auto"
          >
            <span>Verify Credential</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </article>
  );
}
