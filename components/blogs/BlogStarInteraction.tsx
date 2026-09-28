'use client';

import { useState, useEffect } from 'react';

interface BlogStarInteractionProps {
  slug: string;
  initialStars: number;
}

export default function BlogStarInteraction({ slug, initialStars }: BlogStarInteractionProps) {
  const [stars, setStars] = useState(initialStars);
  const [hasStarred, setHasStarred] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const starred = localStorage.getItem(`starred_${slug}`);
      if (starred) {
        setHasStarred(true);
      } else {
        const showTimer = setTimeout(() => setShowTooltip(true), 2000);
        const hideTimer = setTimeout(() => setShowTooltip(false), 8000);
        return () => {
          clearTimeout(showTimer);
          clearTimeout(hideTimer);
        };
      }
    }
  }, [slug]);

  const handleStar = async () => {
    if (hasStarred) return;

    // Optimistic UI update
    setStars((prev) => prev + 1);
    setHasStarred(true);
    setShowTooltip(false);
    localStorage.setItem(`starred_${slug}`, 'true');

    try {
      const res = await fetch(`/api/blogs/${slug}/star`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to star');
    } catch {
      // Revert if failed
      setStars((prev) => prev - 1);
      setHasStarred(false);
      localStorage.removeItem(`starred_${slug}`);
    }
  };

  return (
    <div className="relative flex items-center">
      {/* Tooltip */}
      <div
        role="status"
        aria-live="polite"
        className={`absolute right-0 top-full mt-2 w-max bg-foreground text-background text-[11px] font-semibold px-3 py-1.5 rounded-xl shadow-xl transition-all duration-300 z-20 ${
          showTooltip && !hasStarred
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-1 pointer-events-none'
        }`}
      >
        Leave a star if this was helpful
        <div className="absolute bottom-full right-3 border-[4px] border-transparent border-b-foreground" />
      </div>

      <button
        onClick={handleStar}
        disabled={hasStarred}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-2xs transition-all text-xs font-semibold focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none ${
          hasStarred
            ? 'border-amber-400/40 bg-amber-400/10 text-amber-500 dark:text-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.25)] cursor-default'
            : 'border-border-primary bg-background dark:bg-card-bg text-text-secondary hover:text-amber-400 hover:border-amber-400/40 hover:bg-hover-bg cursor-pointer'
        }`}
        title={hasStarred ? 'You starred this article' : 'Star this article'}
        aria-label={hasStarred ? `Starred! Total stars: ${stars}` : `Star this article, currently ${stars} stars`}
      >
        <svg
          className={`w-3.5 h-3.5 transition-transform ${hasStarred ? 'scale-110 text-amber-400 fill-current' : 'fill-current group-hover:scale-110'}`}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
        <span className="font-mono font-medium">{stars}</span>
      </button>
    </div>
  );
}
