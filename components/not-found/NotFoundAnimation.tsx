"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { FiHome, FiCompass, FiRepeat } from "react-icons/fi";

const QUICK_LINKS = [
  { label: "Articles", href: "/blogs" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About Samir", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export default function NotFoundAnimation() {
  const [flipped, setFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  // Automatic flip cycle, pausing on hover/focus or if reduced motion is enabled
  useEffect(() => {
    if (reducedMotion || isHovered) return;

    const interval = setInterval(() => {
      setFlipped((prev) => !prev);
    }, 4500);

    return () => clearInterval(interval);
  }, [reducedMotion, isHovered]);

  const toggleFlip = useCallback(() => {
    setFlipped((prev) => !prev);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-4 sm:px-6 flex flex-col items-center text-center">
      {/* Developer Terminal Status Badge */}
      <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium border border-border-primary bg-hover-bg text-text-muted mb-8 shadow-xs select-none">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 dark:bg-emerald-300" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span>HTTP 404 // ROUTE_NOT_FOUND</span>
      </div>

      {/* Screen Reader Announcement */}
      <span className="sr-only">Error 404: Page not found. You shall not pass.</span>

      {/* 3D Flip Heading Container */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Click to toggle between messages"
        onClick={toggleFlip}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleFlip();
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative w-full cursor-pointer select-none rounded-2xl p-4 transition-colors hover:bg-hover-bg/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
        style={{ perspective: "1000px" }}
        title="Click to toggle message"
      >
        <div className="grid grid-cols-1 grid-rows-1 place-items-center">
          {/* Side A: You shall not pass */}
          <h1
            className="col-start-1 row-start-1 text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-foreground transition-all duration-700 ease-in-out origin-bottom text-balance"
            style={{
              fontFamily: "var(--font-playfair)",
              transform: reducedMotion
                ? undefined
                : flipped
                ? "rotateX(-90deg)"
                : "rotateX(0deg)",
              opacity: flipped ? 0 : 1,
              backfaceVisibility: "hidden",
            }}
            aria-hidden={flipped}
          >
            You shall not pass.
          </h1>

          {/* Side B: 404 Page not found */}
          <h1
            className="col-start-1 row-start-1 text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-foreground transition-all duration-700 ease-in-out origin-top text-balance"
            style={{
              fontFamily: "var(--font-playfair)",
              transform: reducedMotion
                ? undefined
                : flipped
                ? "rotateX(0deg)"
                : "rotateX(90deg)",
              opacity: flipped ? 1 : 0,
              backfaceVisibility: "hidden",
            }}
            aria-hidden={!flipped}
          >
            404 &mdash; Page not found.
          </h1>
        </div>

        {/* Micro-interaction indicator */}
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-text-muted opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
          <FiRepeat className="text-xs" />
          <span>Click to flip</span>
        </div>
      </div>

      {/* Explanatory Copy */}
      <p className="text-base sm:text-lg text-text-muted max-w-md mx-auto leading-relaxed mt-2 mb-8">
        The coordinates you requested do not exist in this deployment. Let&apos;s get you back to familiar territory.
      </p>

      {/* Action CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-sm">
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-all shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          <FiHome className="text-base" />
          <span>Return Home</span>
        </Link>

        <Link
          href="/projects"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border-primary bg-background text-foreground text-sm font-medium hover:bg-hover-bg transition-colors shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          <FiCompass className="text-base" />
          <span>Explore Projects</span>
        </Link>
      </div>

      {/* Quick Navigation Directory */}
      <div className="pt-8 mt-10 border-t border-border-primary/60 w-full max-w-md">
        <p className="text-xs uppercase tracking-widest font-mono text-text-muted mb-3.5">
          Quick Navigation
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-lg border border-border-primary/50 bg-background text-text-secondary hover:text-foreground hover:bg-hover-bg hover:border-border-primary transition-colors focus-visible:outline-2 focus-visible:outline-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

