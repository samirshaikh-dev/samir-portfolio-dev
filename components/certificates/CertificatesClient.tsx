"use client";

import { useState, useMemo, useEffect } from "react";
import { Certificate } from "@/lib/schema";
import CertificateCard from "./CertificateCard";
import Image from "next/image";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary-utils";

interface CertificatesClientProps {
  certificates: Certificate[];
}

export default function CertificatesClient({ certificates }: CertificatesClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIssuer, setSelectedIssuer] = useState<string>("All");
  const [selectedSkill, setSelectedSkill] = useState<string>("All");
  const [lightbox, setLightbox] = useState<{ url: string; title: string } | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    if (lightbox) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [lightbox]);

  // Unique issuers
  const issuers = useMemo(() => {
    const set = new Set<string>();
    certificates.forEach((c) => {
      if (c.issuer) set.add(c.issuer);
    });
    return ["All", ...Array.from(set).sort()];
  }, [certificates]);

  // Unique skills
  const skills = useMemo(() => {
    const set = new Set<string>();
    certificates.forEach((c) => {
      c.skills?.forEach((s) => set.add(s));
    });
    return ["All", ...Array.from(set).sort()];
  }, [certificates]);

  // Filtered certificates
  const filteredCertificates = useMemo(() => {
    return certificates.filter((cert) => {
      // Issuer filter
      if (selectedIssuer !== "All" && cert.issuer !== selectedIssuer) {
        return false;
      }

      // Skill filter
      if (selectedSkill !== "All" && !cert.skills?.includes(selectedSkill)) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = cert.title.toLowerCase().includes(query);
        const matchesIssuer = cert.issuer.toLowerCase().includes(query);
        const matchesCredentialId = cert.credentialId?.toLowerCase().includes(query);
        const matchesDescription = cert.description?.toLowerCase().includes(query);
        const matchesSkill = cert.skills?.some((s) => s.toLowerCase().includes(query));

        if (
          !matchesTitle &&
          !matchesIssuer &&
          !matchesCredentialId &&
          !matchesDescription &&
          !matchesSkill
        ) {
          return false;
        }
      }

      return true;
    });
  }, [certificates, selectedIssuer, selectedSkill, searchQuery]);

  const hasActiveFilters = searchQuery !== "" || selectedIssuer !== "All" || selectedSkill !== "All";

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedIssuer("All");
    setSelectedSkill("All");
  };

  return (
    <div className="space-y-8">
      {/* Search and Filter Controls */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by certificate title, issuer, skill, or credential ID..."
            className="w-full px-4 py-3 pl-11 rounded-xl border border-border-primary bg-background text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
          />
          <svg
            className="absolute left-3.5 top-3.5 w-4 h-4 text-text-muted pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-3.5 text-xs text-text-muted hover:text-foreground"
              title="Clear search"
            >
              Clear
            </button>
          )}
        </div>

        {/* Issuer Tabs */}
        {issuers.length > 2 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs text-text-muted font-medium mr-1.5 flex-shrink-0">Issuer:</span>
            {issuers.map((issuer) => {
              const active = selectedIssuer === issuer;
              return (
                <button
                  key={issuer}
                  onClick={() => setSelectedIssuer(issuer)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors flex-shrink-0 ${
                    active
                      ? "bg-foreground text-background"
                      : "bg-card-bg text-text-muted hover:text-foreground border border-border-primary"
                  }`}
                >
                  {issuer}
                </button>
              );
            })}
          </div>
        )}

        {/* Skill Pills */}
        {skills.length > 2 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs text-text-muted font-medium mr-1.5 flex-shrink-0">Skill:</span>
            {skills.map((skill) => {
              const active = selectedSkill === skill;
              return (
                <button
                  key={skill}
                  onClick={() => setSelectedSkill(skill)}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] transition-colors flex-shrink-0 ${
                    active
                      ? "bg-foreground text-background font-medium"
                      : "bg-card-bg text-text-muted hover:text-foreground border border-border-primary"
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Results Count & Reset */}
      <div className="flex items-center justify-between text-xs text-text-muted">
        <span>
          Showing <strong className="text-foreground">{filteredCertificates.length}</strong> of{" "}
          {certificates.length} credentials
        </span>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-xs text-primary hover:underline font-medium"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Grid of Certificate Cards */}
      {filteredCertificates.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border-primary rounded-2xl bg-card-bg/50">
          <svg
            className="w-10 h-10 text-text-muted mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h4 className="text-sm font-medium text-foreground mb-1">No matching certificates found</h4>
          <p className="text-xs text-text-muted max-w-sm mx-auto mb-4">
            Try adjusting your search keywords or clearing active filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-lg bg-foreground text-background text-xs font-medium hover:opacity-90 transition-opacity"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCertificates.map((cert) => (
            <CertificateCard
              key={cert.id}
              certificate={cert}
              onPreviewImage={(url, title) => setLightbox({ url, title })}
            />
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full rounded-2xl overflow-hidden bg-background border border-border-primary shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-primary bg-background">
              <h3 className="text-sm md:text-base font-semibold text-foreground truncate pr-4">
                {lightbox.title}
              </h3>
              <button
                onClick={() => setLightbox(null)}
                className="p-1.5 rounded-lg text-text-muted hover:text-foreground hover:bg-hover-bg transition-colors"
                title="Close (Esc)"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative w-full h-[60vh] md:h-[70vh] bg-black/5 flex items-center justify-center p-4">
              <Image
                src={optimizeCloudinaryUrl(lightbox.url, { width: 1400, quality: 90 })}
                alt={lightbox.title}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
