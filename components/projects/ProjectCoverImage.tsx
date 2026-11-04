"use client";

import { useState } from "react";
import Image from "next/image";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary-utils";

interface ProjectCoverImageProps {
  coverImageUrl?: string | null;
  title: string;
  category?: string | null;
  badge?: string | null;
  indexStr?: string;
  aspectRatio?: "card" | "hero";
  priority?: boolean;
}

export default function ProjectCoverImage({
  coverImageUrl,
  title,
  category,
  badge,
  indexStr = "01",
  aspectRatio = "card",
  priority = false,
}: ProjectCoverImageProps) {
  const [hasError, setHasError] = useState(false);

  const isCloudinary = Boolean(coverImageUrl && coverImageUrl.includes("cloudinary.com"));
  const widthTarget = aspectRatio === "hero" ? 1200 : 800;
  const optimizedUrl = coverImageUrl
    ? isCloudinary
      ? optimizeCloudinaryUrl(coverImageUrl, { width: widthTarget, quality: 85 })
      : coverImageUrl
    : null;

  const aspectClass =
    aspectRatio === "hero"
      ? "aspect-[16/10] sm:aspect-[2/1] min-h-[220px]"
      : "aspect-[16/10] sm:aspect-[16/9] min-h-[190px]";

  if (!optimizedUrl || hasError) {
    return (
      <div
        className={`relative ${aspectClass} w-full overflow-hidden rounded-xl md:rounded-2xl border border-border-primary/80 bg-hover-bg/30 flex flex-col items-center justify-center p-6 text-center select-none`}
      >
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
            {badge || category || "Flagship Architecture"}
          </span>
          <span className="text-[11px] font-mono text-text-muted/80 mt-1">
            Production System · Verified
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative ${aspectClass} w-full overflow-hidden rounded-xl md:rounded-2xl border border-border-primary/80 bg-hover-bg/20`}
    >
      <Image
        src={optimizedUrl}
        alt={`${title} architectural preview`}
        fill
        priority={priority}
        unoptimized={isCloudinary}
        onError={() => setHasError(true)}
        className="object-cover transition-transform duration-500 group-hover:scale-102 motion-reduce:transform-none"
        sizes={
          aspectRatio === "hero"
            ? "(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1104px"
            : "(max-width: 1024px) 100vw, 50vw"
        }
      />
    </div>
  );
}
