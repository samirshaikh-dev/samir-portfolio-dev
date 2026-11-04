"use client";

import { useState } from "react";
import Image from "next/image";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary-utils";

interface ProjectCoverImageProps {
  coverImageUrl?: string | null;
  title: string;
  category?: string | null;
  indexStr: string;
}

export default function ProjectCoverImage({
  coverImageUrl,
  title,
  category,
  indexStr,
}: ProjectCoverImageProps) {
  const [hasError, setHasError] = useState(false);

  const isCloudinary = Boolean(coverImageUrl && coverImageUrl.includes("cloudinary.com"));
  const optimizedUrl = coverImageUrl
    ? isCloudinary
      ? optimizeCloudinaryUrl(coverImageUrl, { width: 800, quality: 85 })
      : coverImageUrl
    : null;

  if (!optimizedUrl || hasError) {
    return (
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full min-h-[200px] overflow-hidden rounded-xl md:rounded-2xl border border-border-primary/80 bg-hover-bg/30 flex flex-col items-center justify-center p-6 text-center select-none">
        {/* Subtle geometric dot grid texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(#0A0A0A_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.04] dark:opacity-[0.08] pointer-events-none"
        />

        <div className="relative z-10 flex flex-col items-center">
          <span className="text-3xl sm:text-4xl font-mono font-black text-foreground/40 mb-2 tracking-widest">
            {indexStr}
          </span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
            {category || "Flagship System"}
          </span>
          <span className="text-[11px] font-mono text-text-muted/80 mt-1">
            Production Architecture
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full min-h-[200px] overflow-hidden rounded-xl md:rounded-2xl border border-border-primary/80 bg-hover-bg/20">
      <Image
        src={optimizedUrl}
        alt={`${title} architectural overview`}
        fill
        unoptimized={isCloudinary}
        onError={() => setHasError(true)}
        className="object-cover transition-transform duration-500 group-hover/img:scale-102 motion-reduce:transform-none"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 500px"
      />
    </div>
  );
}
