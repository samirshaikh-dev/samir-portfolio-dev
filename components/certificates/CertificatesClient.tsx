"use client";

import { useState, useMemo, useEffect } from "react";
import { Certificate } from "@/lib/schema";
import CertificateCard from "./CertificateCard";
import Image from "next/image";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary-utils";
import { LuSearch, LuX, LuFileWarning } from "react-icons/lu";

interface CertificatesClientProps {
  certificates: Certificate[];
}

export default function CertificatesClient({ certificates }: CertificatesClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIssuer, setSelectedIssuer] = useState<string>("All");
  const [selectedSkill, setSelectedSkill] = useState<string>("All");
  const [lightbox, setLightbox] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    if (lightbox) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [lightbox]);

  const issuers = useMemo(() => {
    const set = new Set<string>();
    certificates.forEach((c) => {
      if (c.issuer) set.add(c.issuer);
    });
    return ["All", ...Array.from(set).sort()];
  }, [certificates]);

  const skills = useMemo(() => {
    const set = new Set<string>();
    certificates.forEach((c) => {
      c.skills?.forEach((s) => set.add(s));
    });
    return ["All", ...Array.from(set).sort()];
  }, [certificates]);

  const filteredCertificates = useMemo(() => {
    return certificates.filter((cert) => {
      if (selectedIssuer !== "All" && cert.issuer !== selectedIssuer) {
        return false;
      }

      if (selectedSkill !== "All" && !cert.skills?.includes(selectedSkill)) {
        return false;
      }

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
      {/* Search & Topic Filters */}
      <div className="space-y-5">
        <div className="relative">
          <label htmlFor="certificates-search" className="sr-only">
            Search certificates
          </label>
          <div className="relative flex items-center">
            <LuSearch
              className="absolute left-4 w-4 h-4 text-text-muted pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="certificates-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by certificate title, issuer, skill, or credential ID..."
              className="w-full pl-12 pr-20 py-3.5 sm:py-4 bg-hover-bg border border-border-primary rounded-2xl text-foreground placeholder:text-text-muted text-sm sm:text-base focus:bg-background focus:ring-4 focus:ring-border-primary focus:border-text-muted focus:outline-none transition-all shadow-2xs hover:border-foreground/30"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3.5 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-text-muted hover:text-foreground hover:bg-background border border-border-primary transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime"
              >
                <LuX className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Issuers Filter Pills */}
        {issuers.length > 2 && (
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter certificates by issuing organization">
            <span className="text-[10px] sm:text-[11px] text-text-muted font-mono font-semibold uppercase tracking-wider mr-1 flex-shrink-0">
              Issuer:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {issuers.map((issuer) => {
                const active = selectedIssuer === issuer;
                return (
                  <button
                    key={issuer}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedIssuer(issuer)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer flex-shrink-0 border border-border-primary shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime ${
                      active
                        ? "bg-foreground text-background border-foreground shadow-xs font-bold dark:bg-accent-lime dark:text-[#0A0A0A] dark:border-accent-lime dark:shadow-[0_0_12px_rgba(184,255,0,0.4)]"
                        : "bg-background dark:bg-card-bg text-text-secondary hover:text-foreground hover:bg-hover-bg hover:border-foreground/30"
                    }`}
                  >
                    {issuer}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Skills Filter Pills */}
        {skills.length > 2 && (
          <div className="flex flex-wrap items-start gap-2" role="tablist" aria-label="Filter certificates by skill">
            <span className="text-[10px] sm:text-[11px] text-text-muted font-mono font-semibold uppercase tracking-wider mr-1 mt-1.5 flex-shrink-0">
              Skill:
            </span>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {skills.map((skill) => {
                const active = selectedSkill === skill;
                return (
                  <button
                    key={skill}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedSkill(skill)}
                    className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-200 cursor-pointer flex-shrink-0 border border-border-primary shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime ${
                      active
                        ? "bg-foreground text-background border-foreground shadow-xs font-bold dark:bg-accent-lime dark:text-[#0A0A0A] dark:border-accent-lime dark:shadow-[0_0_12px_rgba(184,255,0,0.4)]"
                        : "bg-background dark:bg-card-bg text-text-secondary hover:text-foreground hover:bg-hover-bg hover:border-foreground/30"
                    }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ARIA Live Region for Accessibility */}
        <div aria-live="polite" className="sr-only">
          {filteredCertificates.length} certificates found
        </div>
      </div>

      {/* Meta Counter & Reset Action */}
      <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-text-muted pt-2 border-t border-border-primary/60">
        <div className="font-mono">
          SHOWING <span className="font-bold text-foreground normal-case tracking-normal text-sm">{filteredCertificates.length}</span>{" "}
          <span className="normal-case tracking-normal">of</span>{" "}
          <span className="font-bold text-foreground normal-case tracking-normal text-sm">{certificates.length}</span>{" "}
          <span className="normal-case tracking-normal">credentials</span>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border-primary bg-background dark:bg-card-bg text-foreground text-xs font-bold hover:bg-hover-bg hover:border-foreground/30 shadow-2xs transition-all duration-300 cursor-pointer normal-case tracking-normal focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime"
          >
            <LuX className="w-3.5 h-3.5" />
            Reset Filters
          </button>
        )}
      </div>

      {/* Grid or Empty State */}
      {filteredCertificates.length === 0 ? (
        <div className="text-center py-16 md:py-20 border border-border-primary rounded-3xl bg-background dark:bg-card-bg flex flex-col items-center justify-center shadow-2xs hover:shadow-md hover:border-foreground/30 transition-all duration-300 relative overflow-hidden">
          <span
            aria-hidden="true"
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent-lime border border-foreground/30 shadow-[0_0_6px_rgba(184,255,0,0.7)]"
          />
          <div className="w-12 h-12 rounded-2xl bg-hover-bg border border-border-primary flex items-center justify-center text-text-muted mb-4 shadow-2xs">
            <LuFileWarning className="w-6 h-6 text-foreground" />
          </div>
          <h4 className="text-lg md:text-xl font-black text-foreground mb-2 tracking-tight">
            No matching certificates found
          </h4>
          <p className="text-sm text-text-muted max-w-sm mx-auto mb-6 leading-relaxed">
            Try adjusting your search keywords or resetting filters to explore all verified credentials.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-2 rounded-full border border-border-primary bg-background dark:bg-card-bg text-foreground text-sm font-bold px-6 py-2.5 hover:bg-hover-bg hover:border-foreground/30 shadow-2xs transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime"
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

      {/* Certificate Image Lightbox Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#0A0A0A]/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] w-full rounded-3xl overflow-hidden bg-background dark:bg-card-bg border border-border-primary shadow-2xl flex flex-col group"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              aria-hidden="true"
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent-lime border border-foreground/30 shadow-[0_0_6px_rgba(184,255,0,0.7)] z-10"
            />
            <div className="flex items-center justify-between px-6 md:px-8 py-4 md:py-5 border-b border-border-primary bg-background dark:bg-card-bg">
              <h3 className="text-sm md:text-lg font-black text-foreground truncate pr-4 leading-snug">
                {lightbox.title}
              </h3>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                aria-label="Close dialog (Escape)"
                className="w-10 h-10 rounded-full flex items-center justify-center text-text-muted hover:text-foreground hover:bg-hover-bg border border-border-primary transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime flex-shrink-0"
                title="Close (Esc)"
              >
                <LuX className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full h-[55vh] md:h-[70vh] bg-hover-bg/30 flex items-center justify-center p-4 md:p-6">
              <Image
                src={optimizeCloudinaryUrl(lightbox.url, { width: 1600, quality: 92 })}
                alt={lightbox.title}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
