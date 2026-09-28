"use client";

import { useState } from "react";
import Image from "next/image";
import { Certificate } from "@/lib/schema";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary-utils";
import { LuCopy, LuCheck, LuDownload, LuExternalLink, LuZoomIn, LuAward } from "react-icons/lu";

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
    <article className="group relative flex flex-col justify-between rounded-2xl border border-border-primary bg-background dark:bg-card-bg p-6 sm:p-7 transition-all duration-300 hover:border-foreground/30 hover:shadow-md shadow-2xs overflow-hidden">
      {/* 5.3 Signature Accent Dot (Top Pinned Marker) */}
      <span
        aria-hidden="true"
        className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent-lime border border-foreground/30 shadow-[0_0_6px_rgba(184,255,0,0.7)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      <div>
        {/* Issuer Header */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            {certificate.issuerLogoUrl ? (
              <div className="w-11 h-11 rounded-2xl border border-border-primary overflow-hidden flex-shrink-0 bg-background dark:bg-card-bg p-1 shadow-2xs">
                <Image
                  src={certificate.issuerLogoUrl}
                  alt={certificate.issuer}
                  width={44}
                  height={44}
                  className="w-full h-full object-contain"
                  unoptimized
                />
              </div>
            ) : (
              <div className="w-11 h-11 rounded-2xl border border-border-primary flex items-center justify-center flex-shrink-0 bg-hover-bg text-text-muted shadow-2xs">
                <LuAward className="w-5 h-5 text-foreground" />
              </div>
            )}
            <div className="min-w-0">
              <span className="text-[11px] font-semibold text-foreground uppercase tracking-wider block truncate font-mono">
                {certificate.issuer}
              </span>
              <span className="text-[11px] text-text-muted block font-mono leading-tight mt-0.5">
                Issued <span className="font-semibold text-text-secondary">{formattedDate}</span>
                {formattedExpiry && (
                  <>
                    <span className="text-border-primary mx-1">·</span>
                    Expires <span className="font-semibold text-text-secondary">{formattedExpiry}</span>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug tracking-tight mb-2.5">
          {certificate.title}
        </h3>

        {/* Description */}
        {certificate.description && (
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
            {certificate.description}
          </p>
        )}

        {/* Certificate Image Preview Box */}
        {certificate.certificateImageUrl && (
          <button
            type="button"
            onClick={() =>
              onPreviewImage &&
              onPreviewImage(certificate.certificateImageUrl!, certificate.title)
            }
            className="group/img relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-border-primary bg-hover-bg mb-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime transition-all hover:border-foreground/30 block"
            title="Click to view full certificate"
            aria-label={`View full ${certificate.title} certificate`}
          >
            <Image
              src={optimizeCloudinaryUrl(certificate.certificateImageUrl, { width: 800, quality: 85 })}
              alt={`${certificate.title} preview`}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover/img:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover/img:bg-[#0A0A0A]/55 transition-all duration-300 flex items-center justify-center gap-2 text-[#F7F8F2] backdrop-blur-[0px] group-hover/img:backdrop-blur-[2px]">
              <div className="opacity-0 group-hover/img:opacity-100 translate-y-2 group-hover/img:translate-y-0 transition-all duration-300 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-lime text-[#0A0A0A] text-xs font-extrabold shadow-[0_0_16px_rgba(184,255,0,0.5)]">
                <LuZoomIn className="w-4 h-4" />
                <span>View Certificate</span>
              </div>
            </div>
          </button>
        )}

        {/* Credential ID */}
        {certificate.credentialId && (
          <div className="flex items-center gap-2 mb-4">
            <button
              type="button"
              onClick={handleCopyId}
              className="inline-flex items-center gap-2 font-mono text-[11px] px-3.5 py-1.5 rounded-full bg-hover-bg border border-border-primary text-text-muted hover:text-foreground hover:border-foreground/30 transition-all duration-200 cursor-pointer shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime"
              title="Click to copy credential ID"
              aria-label={`Copy credential ID: ${certificate.credentialId}`}
            >
              <span className="font-bold text-text-secondary">ID:</span>
              <span className="font-mono">{certificate.credentialId}</span>
              {copied ? (
                <span className="inline-flex items-center gap-1 text-accent-lime font-bold text-[10px]">
                  <LuCheck className="w-3.5 h-3.5" />
                  COPIED
                </span>
              ) : (
                <LuCopy className="w-3.5 h-3.5 text-text-muted" />
              )}
            </button>
          </div>
        )}

        {/* Skill Badges */}
        {certificate.skills && certificate.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {certificate.skills.map((skill, idx) => (
              <span
                key={idx}
                className="text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-md bg-hover-bg text-text-secondary border border-border-primary/80 font-mono font-medium shadow-2xs"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Actions Footer */}
      <div className="pt-4 border-t border-border-primary flex items-center justify-between gap-3 mt-auto">
        <div className="flex items-center gap-2">
          {certificate.certificatePdfUrl && (
            <a
              href={certificate.certificatePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-border-primary bg-background dark:bg-card-bg text-text-secondary hover:text-foreground hover:bg-hover-bg hover:border-foreground/30 text-[11px] font-bold transition-all duration-200 shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime"
              title="Download Certificate PDF"
            >
              <LuDownload className="w-4 h-4" />
              <span className="font-mono uppercase tracking-wider">PDF</span>
            </a>
          )}
        </div>

        {certificate.credentialUrl && (
          <a
            href={certificate.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xs dark:shadow-[0_0_12px_rgba(184,255,0,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime ml-auto"
          >
            <span>Verify Credential</span>
            <LuExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </article>
  );
}
