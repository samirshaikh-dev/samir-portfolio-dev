"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-5 py-16 sm:px-8 md:px-10 sm:py-24">
      {/* Ambient radiant glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-[350px] w-[350px] bg-[radial-gradient(circle,rgba(184,255,0,0.18)_0%,transparent_65%)] blur-3xl sm:h-[550px] sm:w-[550px] dark:bg-[radial-gradient(circle,rgba(184,255,0,0.09)_0%,transparent_65%)] -z-10"
      />
      {/* Subtle geometric dot matrix texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0A0A0A_1px,transparent_1px)] opacity-[0.035] [background-size:24px_24px] dark:opacity-[0.07] -z-10"
      />

      <div
        role="alert"
        aria-live="assertive"
        className="flex w-full max-w-2xl flex-col items-center"
      >
        {/* Error state marker — red is sanctioned for destructive/error states */}
        <div className="relative mb-6 flex flex-col items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-5 sm:mb-8 sm:px-8">
          <span
            aria-hidden="true"
            className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full border border-foreground/30 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"
          />
          <div className="flex items-center gap-2.5">
            <svg
              aria-hidden="true"
              focusable="false"
              className="h-6 w-6 shrink-0 text-red-600 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-red-600 sm:text-[11px] dark:text-red-400">
              System Error
            </span>
          </div>
        </div>

        {/* Display H1 with editorial serif flourish */}
        <h1 className="text-4xl font-black leading-[1.12] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Something{" "}
          <span
            className="font-serif text-text-secondary italic"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            went wrong
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-md text-center text-base leading-relaxed text-text-secondary sm:mt-6 sm:text-lg">
          We apologize for the inconvenience. An unexpected error occurred while rendering this page.
        </p>

        {/* Recovery actions */}
        <div className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-lime px-6 py-3 text-sm font-extrabold text-[#0A0A0A] shadow-xs transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(184,255,0,0.5)] focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:scale-100 sm:w-auto"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border-primary bg-background px-6 py-3 text-sm font-bold text-foreground shadow-2xs transition-all hover:border-foreground/30 hover:bg-hover-bg focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none motion-reduce:transition-none sm:w-auto dark:bg-card-bg"
          >
            Return to home
          </Link>
        </div>
      </div>
    </main>
  );
}
