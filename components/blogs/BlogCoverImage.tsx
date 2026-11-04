"use client";

import { useState } from "react";
import Image from "next/image";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary-utils";

interface BlogCoverImageProps {
  coverImageUrl?: string | null;
  title: string;
  tag?: string | null;
  aspectRatio?: "card" | "hero" | "compact";
  priority?: boolean;
}

export default function BlogCoverImage({
  coverImageUrl,
  title,
  tag,
  aspectRatio = "card",
  priority = false,
}: BlogCoverImageProps) {
  const [hasError, setHasError] = useState(false);

  const isCloudinary = Boolean(coverImageUrl && coverImageUrl.includes("cloudinary.com"));
  const widthTarget = aspectRatio === "hero" ? 1400 : 800;
  const optimizedUrl = coverImageUrl
    ? isCloudinary
      ? optimizeCloudinaryUrl(coverImageUrl, { width: widthTarget, quality: 85 })
      : coverImageUrl
    : null;

  const aspectClass =
    aspectRatio === "hero"
      ? "aspect-[16/8] sm:aspect-[16/7] min-h-[220px]"
      : aspectRatio === "compact"
      ? "aspect-[16/9] min-h-[140px]"
      : "aspect-[16/10] sm:aspect-[16/9] min-h-[180px]";

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
          <span
            className="text-4xl sm:text-5xl font-bold opacity-30 text-foreground mb-1 select-none"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {title ? title.charAt(0).toUpperCase() : "B"}
          </span>
          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-text-muted mt-1">
            {tag || "Engineering Log"}
          </span>
          <span className="text-[10px] font-mono text-text-muted/70 mt-0.5">
            Technical Publication
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
        alt={`Cover image for ${title}`}
        fill
        priority={priority}
        unoptimized={isCloudinary}
        onError={() => setHasError(true)}
        className="object-cover transition-transform duration-500 group-hover:scale-102 motion-reduce:transform-none"
        sizes={
          aspectRatio === "hero"
            ? "(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1100px"
            : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
        }
      />
    </div>
  );
}
