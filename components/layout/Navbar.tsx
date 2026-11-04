"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LuArrowRight, LuMail } from "react-icons/lu";
import { FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";
import { AUTHOR_EMAIL, AUTHOR_PHONE, LINKEDIN_URL, GITHUB_URL } from "@/lib/site-config";

const desktopNavLinks = [
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Hire", href: "/hire" },
  { label: "Skills", href: "/technical-skills" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blogs" },
  { label: "Resume", href: "/resume" },
];

const mobileNavLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Capabilities & Services",
    href: "/services",
    
  },
  {
    label: "Hire Samir",
    href: "/hire",
    badge: "0d Notice",
  },
  {
    label: "Technical Skills",
    href: "/technical-skills",

  },
  {
    label: "About Samir",
    href: "/about",

  },
  {
    label: "Articles & Blog",
    href: "/blogs",

  },
  {
    label: "Resume & CV",
    href: "/resume",
  },
];

const FOCUS_RING =
  "focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close mobile menu on route change
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
            aria-label="Samir Shaikh — Homepage"
            className={`group flex items-center gap-3 shrink-0 rounded-xl ${FOCUS_RING}`}
          >
            <span className="relative block h-10 w-10 sm:h-11 sm:w-11 overflow-hidden rounded-xl border border-border-primary bg-background p-1 transition-colors group-hover:border-foreground/30 dark:bg-card-bg">
              <Image
                src="/Logo.svg"
                alt=""
                fill
                className="object-contain transition-transform duration-200 group-hover:scale-105 motion-reduce:transform-none dark:invert"
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

          {/* Desktop Navigation Links (Clean Segmented Bar) */}
          <div className="hidden lg:flex items-center gap-0.5 p-1 rounded-xl bg-hover-bg/50 border border-border-primary">
            {desktopNavLinks.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs xl:text-sm font-medium transition-colors ${FOCUS_RING} ${
                    active
                      ? "bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] font-bold"
                      : "text-text-secondary hover:text-foreground hover:bg-hover-bg"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Availability Status Indicator -> Links to /hire */}
            <Link
              href="/hire"
              title="View Samir's availability status and notice period"
              className="hidden xl:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border-primary bg-background dark:bg-card-bg text-xs font-mono text-text-secondary hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-accent-lime shrink-0" aria-hidden="true" />
              <span>Available (0d Notice)</span>
            </Link>

            {/* Quick Contact CTA */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-accent-lime text-[#0A0A0A] text-xs font-bold px-4 py-2 hover:bg-accent-lime/90 transition-colors"
            >
              <span>Let&apos;s Talk</span>
              <LuArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Navigation Toggle Button */}
            <button
              id="mobile-menu-toggle"
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`inline-flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-border-primary bg-background dark:bg-card-bg transition-colors hover:border-foreground/30 hover:bg-hover-bg lg:hidden ${FOCUS_RING} cursor-pointer`}
            >
              <span
                className={`block h-0.5 w-5 origin-center rounded-full bg-foreground transition-transform duration-200 motion-reduce:transition-none ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-foreground transition-opacity duration-200 motion-reduce:transition-none ${
                  menuOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 origin-center rounded-full bg-foreground transition-transform duration-200 motion-reduce:transition-none ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE SLIDE-DOWN DRAWER & DIRECTORY ───────────────────────────── */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-[76px] bottom-0 z-40 bg-background/98 backdrop-blur-xl border-t border-border-primary transition-all duration-200 motion-reduce:transition-none lg:hidden overflow-y-auto overscroll-contain flex flex-col justify-between ${
          menuOpen
            ? "visible opacity-100 translate-y-0"
            : "invisible opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="w-full max-w-lg mx-auto px-5 py-6">
          {/* Header Directory Label */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-primary">
            <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime shrink-0" />
              Navigation Directory
            </span>
            <span className="text-[10px] font-mono text-text-muted">
              Samir Shaikh &bull; AI Backend
            </span>
          </div>

          {/* Structured Navigation Links */}
          <nav aria-label="Mobile Navigation" className="space-y-1">
            {mobileNavLinks.map(({ label, href, badge }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between gap-3 rounded-xl border p-3 transition-colors ${FOCUS_RING} ${
                    active
                      ? "border-accent-lime/60 bg-hover-bg text-foreground font-bold"
                      : "border-transparent text-foreground hover:border-border-primary hover:bg-hover-bg"
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground">{label}</span>
                      {badge && (
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-accent-lime text-[#0A0A0A]">
                          {badge}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {active && (
                      <span
                        aria-hidden="true"
                        className="h-2 w-2 rounded-full bg-accent-lime shrink-0"
                      />
                    )}
                    <LuArrowRight className="w-3.5 h-3.5 text-text-muted" />
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile Action Footer & Direct Channels */}
        <div className="w-full max-w-lg mx-auto px-5 py-6 border-t border-border-primary bg-background dark:bg-card-bg/50 mt-auto">
          {/* Quick Contact & Hire Buttons */}
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            <Link
              href="/hire"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl border border-border-primary bg-background dark:bg-card-bg text-foreground text-xs font-mono font-bold py-3 px-3 hover:bg-hover-bg transition-colors text-center"
            >
              <span className="w-2 h-2 rounded-full bg-accent-lime shrink-0" />
              <span>Hire (0d Notice)</span>
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-accent-lime text-[#0A0A0A] text-xs font-bold py-3 px-3 hover:bg-accent-lime/90 transition-colors text-center"
            >
              <span>Contact Samir</span>
              <LuArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Direct Channels Strip */}
          <div className="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-border-primary/60">
            <span className="font-mono text-[11px]">Direct Channels:</span>
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${AUTHOR_EMAIL}`}
                title="Email Samir directly"
                className="p-2 rounded-lg text-text-secondary hover:text-foreground hover:bg-hover-bg transition-colors"
                aria-label="Send Email"
              >
                <LuMail className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${AUTHOR_PHONE.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp Samir directly"
                className="p-2 rounded-lg text-text-secondary hover:text-[#25D366] hover:bg-hover-bg transition-colors"
                aria-label="Chat on WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="View LinkedIn Profile"
                className="p-2 rounded-lg text-text-secondary hover:text-foreground hover:bg-hover-bg transition-colors"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="View GitHub Profile"
                className="p-2 rounded-lg text-text-secondary hover:text-foreground hover:bg-hover-bg transition-colors"
                aria-label="GitHub Profile"
              >
                <FaGithub className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer matching fixed navbar height */}
      <div className="h-[var(--navbar-h)]" />
    </>
  );
}
