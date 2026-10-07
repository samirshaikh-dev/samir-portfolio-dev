"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { FiMessageSquare } from "react-icons/fi";

const CloudTransition = dynamic(
  () => import("@/components/layout/CloudTransition"),
  { ssr: false }
);

const PushSettings = dynamic(
  () => import("@/components/PushSettings").then((m) => ({ default: m.PushSettings })),
  { ssr: false }
);

const Chatbot = dynamic(
  () => import("@/components/Chatbot"),
  { ssr: false }
);

/**
 * LazyClientComponents — a single Client Component boundary that
 * lazy-loads all heavy, client-only widgets with ssr:false.
 * The Chatbot bundle (@ai-sdk/react, markdown, fingerprint) is deferred
 * until user interaction (click, Ctrl+K) or post-hydration idle time.
 */
export default function LazyClientComponents() {
  const [shouldLoadChat, setShouldLoadChat] = useState(false);

  useEffect(() => {
    // If already loaded, no listeners needed
    if (shouldLoadChat) return;

    const triggerLoad = (detail?: { query?: string }) => {
      setShouldLoadChat(true);
      if (detail) {
        // Re-dispatch after a brief tick so Chatbot listener catches it once mounted
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("open-ai-chat", { detail }));
        }, 100);
      }
    };

    // Idle callback to prefetch when network and main-thread are quiet
    const idleId =
      typeof window !== "undefined" && typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(() => triggerLoad(), { timeout: 3500 })
        : setTimeout(() => triggerLoad(), 2500);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        triggerLoad();
      }
    };

    const handleCustomOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ query?: string }>;
      triggerLoad(customEvent.detail);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-ai-chat", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-ai-chat", handleCustomOpen);
      if (typeof window !== "undefined" && typeof window.cancelIdleCallback === "function" && typeof idleId === "number") {
        window.cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId as NodeJS.Timeout);
      }
    };
  }, [shouldLoadChat]);

  return (
    <>
      <CloudTransition />
      <PushSettings />
      {shouldLoadChat ? (
        <Chatbot />
      ) : (
        <button
          type="button"
          onClick={() => {
            setShouldLoadChat(true);
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent("open-ai-chat"));
            }, 100);
          }}
          className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-accent-lime text-[#0A0A0A] font-extrabold text-xs sm:text-sm shadow-md hover:shadow-[0_0_24px_rgba(184,255,0,0.6)] hover:scale-[1.03] active:scale-[0.97] transition-all border border-black/10 dark:border-accent-lime/40 cursor-pointer group focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none opacity-100 scale-100"
          aria-label="Open AI Assistant (Ctrl+K)"
          title="Open AI Assistant (Ctrl+K)"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0A0A0A] opacity-35" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0A0A0A]" />
          </span>
          <span className="hidden sm:inline font-black tracking-tight uppercase text-xs">Ask AI</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-black/10 text-[#0A0A0A] border border-black/10">
            Ctrl+K
          </kbd>
          <FiMessageSquare className="w-4 h-4 stroke-[2.4]" />
        </button>
      )}
    </>
  );
}
