"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import {
  LuRefreshCw,
  LuHouse,
  LuTerminal,
  LuCopy,
  LuCheck,
  LuTriangleAlert,
  LuMessageSquare,
  LuChevronDown,
} from "react-icons/lu";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [showTrace, setShowTrace] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Log the error to application monitoring
    console.error("Application runtime error caught by boundary:", error);
  }, [error]);

  const handleCopyDiagnostics = async () => {
    const diagnosticPayload = [
      `System: Samir Shaikh Portfolio (Next.js 16 App Router)`,
      `Timestamp: ${new Date().toISOString()}`,
      `Digest: ${error.digest || "N/A"}`,
      `Message: ${error.message || "Unknown runtime exception"}`,
      error.stack ? `Stack:\n${error.stack}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await navigator.clipboard.writeText(diagnosticPayload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is restricted
      setCopied(false);
    }
  };

  const handleReset = () => {
    startTransition(() => {
      reset();
    });
  };

  return (
    <main
      id="main-content"
      className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-16 sm:px-6 sm:py-24 md:px-8"
      role="alert"
      aria-live="assertive"
    >
      {/* Ambient background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-1/4 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(239,68,68,0.12)_0%,transparent_70%)] blur-3xl sm:h-[520px] sm:w-[520px] dark:bg-[radial-gradient(circle,rgba(239,68,68,0.08)_0%,transparent_70%)] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-100px] left-1/4 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(184,255,0,0.1)_0%,transparent_70%)] blur-3xl sm:h-[460px] sm:w-[460px] dark:bg-[radial-gradient(circle,rgba(184,255,0,0.06)_0%,transparent_70%)] -z-10"
      />

      {/* Subtle geometric dot matrix texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0A0A0A_1px,transparent_1px)] opacity-[0.035] [background-size:24px_24px] dark:opacity-[0.07] -z-10"
      />

      {/* Central Bento Error Card */}
      <div className="relative w-full max-w-xl rounded-3xl border border-border-primary bg-background/80 dark:bg-card-bg/90 p-6 sm:p-9 shadow-lg backdrop-blur-md transition-all duration-300">
        {/* Precision top crimson hairline marker */}
        <span
          aria-hidden="true"
          className="absolute top-0 left-8 sm:left-12 h-[2px] w-16 sm:w-20 bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]"
        />

        {/* Status Badge & Fault Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-border-primary/60">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-500/10 px-3.5 py-1 text-xs font-mono font-medium text-red-600 dark:text-red-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="tracking-wider uppercase">Runtime Fault Isolated</span>
          </div>

          {error.digest && (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border-primary bg-hover-bg/60 px-2.5 py-0.5 font-mono text-[11px] text-text-muted">
              <span>Digest:</span>
              <span className="font-semibold text-foreground">{error.digest}</span>
            </div>
          )}
        </div>

        {/* Content Heading */}
        <div className="mt-6 text-left">
          <div className="flex items-center gap-2.5 text-text-muted mb-2">
            <LuTriangleAlert className="h-5 w-5 text-red-500 shrink-0" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-wider font-semibold">
              Error Boundary 500
            </span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl leading-[1.15]">
            Something{" "}
            <span
              className="font-serif italic text-text-secondary font-normal"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              went wrong
            </span>
          </h1>

          <p className="mt-3 text-sm sm:text-base leading-relaxed text-text-secondary">
            An unexpected error occurred while executing this component. The runtime caught and
            isolated the exception to preserve session security and stability.
          </p>
        </div>

        {/* Diagnostic Telemetry Drawer */}
        <div className="mt-6 rounded-2xl border border-border-primary bg-hover-bg/30 p-4 transition-colors">
          <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-border-primary/50">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-text-secondary">
              <LuTerminal className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
              <span>DIAGNOSTIC_TELEMETRY</span>
            </div>

            <button
              type="button"
              onClick={handleCopyDiagnostics}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] font-medium text-text-muted hover:text-foreground hover:bg-hover-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime"
              aria-label="Copy error diagnostic telemetry to clipboard"
            >
              {copied ? (
                <>
                  <LuCheck className="h-3 w-3 text-emerald-500 dark:text-accent-lime" />
                  <span className="text-emerald-600 dark:text-accent-lime">Copied</span>
                </>
              ) : (
                <>
                  <LuCopy className="h-3 w-3" />
                  <span>Copy Report</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-2.5 font-mono text-xs space-y-1 text-text-muted overflow-hidden">
            <p className="truncate">
              <span className="text-text-secondary font-semibold">Message:</span>{" "}
              <span className="text-foreground">
                {error.message || "An unhandled exception was trapped."}
              </span>
            </p>
            {error.digest && (
              <p className="truncate">
                <span className="text-text-secondary font-semibold">Incident ID:</span>{" "}
                <span className="text-foreground">{error.digest}</span>
              </p>
            )}
          </div>

          {/* Expandable Stack Details (Dev / Technical inspect) */}
          {error.stack && (
            <div className="mt-3 pt-2.5 border-t border-border-primary/40">
              <button
                type="button"
                onClick={() => setShowTrace((prev) => !prev)}
                className="flex items-center gap-1.5 font-mono text-[11px] text-text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-lime"
                aria-expanded={showTrace}
              >
                <LuChevronDown
                  className={`h-3 w-3 transition-transform duration-200 ${showTrace ? "rotate-180" : ""
                    }`}
                />
                <span>{showTrace ? "Hide stack trace" : "View stack trace"}</span>
              </button>

              {showTrace && (
                <pre className="mt-2 max-h-40 overflow-x-auto overflow-y-auto rounded-lg bg-background dark:bg-[#070707] p-3 font-mono text-[10px] leading-relaxed text-text-secondary border border-border-primary">
                  {error.stack}
                </pre>
              )}
            </div>
          )}
        </div>

        {/* Recovery CTA Action Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            disabled={isPending}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-lime px-7 py-3 text-sm font-extrabold text-[#0A0A0A] shadow-xs transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(184,255,0,0.5)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:scale-100 cursor-pointer"
          >
            <LuRefreshCw
              className={`h-4 w-4 stroke-[2.5] ${isPending ? "animate-spin" : ""}`}
              aria-hidden="true"
            />
            <span>{isPending ? "Re-rendering..." : "Try Recovery"}</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border-primary bg-background dark:bg-card-bg px-6 py-3 text-sm font-bold text-foreground shadow-2xs transition-all hover:border-foreground/30 hover:bg-hover-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
          >
            <LuHouse className="h-4 w-4" aria-hidden="true" />
            <span>Return to Home</span>
          </Link>
        </div>

        {/* Help & Support Secondary Links */}
        <div className="mt-7 pt-5 border-t border-border-primary/50 flex flex-wrap items-center justify-between gap-3 text-xs text-text-muted">
          <span>Persistent problem?</span>
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 hover:text-foreground hover:underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-lime rounded-sm"
            >
              <LuMessageSquare className="h-3 w-3" aria-hidden="true" />
              <span>Report to Samir</span>
            </Link>
            <span aria-hidden="true" className="text-border-primary">
              •
            </span>
            <Link
              href="/services"
              className="hover:text-foreground hover:underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-lime rounded-sm"
            >
              System Services
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
