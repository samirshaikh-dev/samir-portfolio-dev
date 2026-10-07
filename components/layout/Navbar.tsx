"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blogs", href: "/blogs" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
];

const FOCUS_RING =
  "focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close mobile menu on route change without effect cascading renders
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Handle Escape key to dismiss mobile menu
  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 h-[76px] md:h-[84px] border-b border-nav-border bg-nav-bg backdrop-blur-md transition-colors">
        <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between px-5 sm:px-8 md:px-10">
          {/* Logo & Identity */}
          <Link
            href="/"
            aria-label="Samir Shaikh — back to homepage"
            className={`group flex items-center gap-3 shrink-0 rounded-2xl ${FOCUS_RING}`}
          >
            <span className="relative block h-10 w-10 sm:h-11 sm:w-11 overflow-hidden rounded-xl border border-border-primary bg-background p-1 transition-all duration-300 group-hover:border-foreground/30 dark:bg-card-bg shadow-2xs">
              <Image
                src="/Logo.svg"
                alt=""
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none dark:invert"
                priority
                sizes="44px"
              />
            </span>
            <span className="flex flex-col">
              <span className="font-bold text-sm sm:text-base text-foreground tracking-tight leading-tight group-hover:text-text-secondary transition-colors">
                Samir Shaikh
              </span>
              <span className="text-[10px] font-mono text-text-muted hidden sm:block leading-tight mt-0.5">
                AI Backend Engineer
              </span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 p-1 rounded-full bg-hover-bg/40 border border-border-primary/60 backdrop-blur-xs">
            {links.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs xl:text-sm transition-all duration-200 motion-reduce:transition-none ${FOCUS_RING} ${
                    active
                      ? "border-foreground bg-foreground font-bold text-background shadow-xs dark:border-accent-lime dark:bg-accent-lime dark:text-[#0A0A0A] dark:shadow-[0_0_12px_rgba(184,255,0,0.4)]"
                      : "font-semibold text-text-secondary hover:text-foreground hover:bg-hover-bg"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Live Availability Status Pill */}
            <span className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[10px] font-mono font-semibold text-text-muted shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
              Available for Work
            </span>

            {/* Quick Contact CTA */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-accent-lime text-[#0A0A0A] text-xs font-extrabold px-4 py-2 hover:shadow-[0_0_16px_rgba(184,255,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xs"
            >
              Let&apos;s Talk →
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle"
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`inline-flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-border-primary bg-background dark:bg-card-bg shadow-2xs transition-colors duration-200 hover:border-foreground/30 hover:bg-hover-bg lg:hidden ${FOCUS_RING} cursor-pointer`}
            >
              <span
                className={`block h-0.5 w-5 origin-center rounded-full bg-foreground transition-transform duration-300 motion-reduce:transition-none ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-foreground transition-opacity duration-300 motion-reduce:transition-none ${
                  menuOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 origin-center rounded-full bg-foreground transition-transform duration-300 motion-reduce:transition-none ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Page Overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 overflow-hidden bg-background/95 backdrop-blur-xl transition-all duration-300 motion-reduce:transition-none lg:hidden ${
          menuOpen
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
        }`}
      >
        {/* Atmospheric Depth: Ambient Lime Glow + Geometric Dot Matrix */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-0 h-[350px] w-[350px] bg-[radial-gradient(circle,rgba(184,255,0,0.18)_0%,transparent_65%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(184,255,0,0.09)_0%,transparent_65%)] sm:h-[550px] sm:w-[550px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0A0A0A_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.035] dark:opacity-[0.07]"
        />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-primary bg-background dark:bg-card-bg text-[10px] font-mono font-medium tracking-wider text-text-muted uppercase shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
          NAVIGATION DIRECTORY
        </div>

        <nav
          aria-label="Mobile Navigation"
          className="flex w-full max-w-xs flex-col items-stretch gap-1.5 px-6"
        >
          {links.map(({ label, href }, i) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                aria-current={active ? "page" : undefined}
                style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
                className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-base font-bold tracking-tight transition-all duration-300 motion-reduce:transition-none ${FOCUS_RING} ${
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                } ${
                  active
                    ? "border-border-primary bg-hover-bg text-foreground dark:bg-card-bg dark:border-accent-lime/40"
                    : "border-transparent text-text-secondary hover:border-border-primary hover:bg-hover-bg hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={`h-5 w-1 rounded-full transition-colors duration-200 ${
                      active ? "bg-accent-lime" : "bg-transparent"
                    }`}
                  />
                  {label}
                </span>
                {active && (
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-accent-lime shadow-[0_0_8px_rgba(184,255,0,0.8)]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Contact Quick CTA */}
        <div className="w-full max-w-xs px-6 pt-2">
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 rounded-full bg-accent-lime text-[#0A0A0A] text-sm font-extrabold py-3.5 px-6 shadow-xs hover:shadow-[0_0_20px_rgba(184,255,0,0.5)] active:scale-[0.98] transition-all text-center w-full"
          >
            Let&apos;s Talk →
          </Link>
        </div>
      </div>

      {/* Spacer so content doesn't hide under fixed navbar */}
      <div className="h-[var(--navbar-h)]" />
    </>
  );
}
