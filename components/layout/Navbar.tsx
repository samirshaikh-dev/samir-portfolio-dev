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
  { label: "Contact", href: "/contact" },
  { label: "Resume", href: "/resume" },
];

const FOCUS_RING =
  "focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const MICRO_LABEL =
  "font-mono text-[10px] font-semibold uppercase tracking-wider text-text-muted sm:text-[11px]";

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

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 h-24 border-b border-nav-border bg-nav-bg backdrop-blur-md md:h-[132px]">
        <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between px-6 md:px-8 lg:px-10">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Samir Shaikh — back to homepage"
            className={`group shrink-0 rounded-2xl ${FOCUS_RING}`}
          >
            <span className="relative block h-16 w-16 overflow-hidden rounded-2xl border border-border-primary bg-background p-1.5 transition-colors duration-300 group-hover:border-foreground/30 dark:bg-card-bg md:h-[88px] md:w-[88px]">
              <Image
                src="/Logo.svg"
                alt=""
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none dark:invert"
                priority
                sizes="(max-width: 768px) 64px, 88px"
              />
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-1 md:flex lg:gap-1.5">
            {links.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition-all duration-200 motion-reduce:transition-none lg:px-3.5 lg:py-2 ${FOCUS_RING} ${
                    active
                      ? "border-foreground bg-foreground font-bold text-background shadow-xs dark:border-accent-lime dark:bg-accent-lime dark:text-[#0A0A0A] dark:shadow-[0_0_12px_rgba(184,255,0,0.4)]"
                      : "border-transparent font-medium text-text-secondary hover:border-border-primary hover:bg-hover-bg hover:text-foreground"
                  }`}
                >
                  {label}
                </Link>
              );
            })}

            <div className="relative ml-1 flex items-center lg:ml-1.5">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`inline-flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-border-primary bg-background shadow-2xs transition-colors duration-200 hover:border-foreground/30 hover:bg-hover-bg dark:bg-card-bg md:hidden ${FOCUS_RING}`}
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
      </nav>

      {/* Mobile Full-Page Overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 overflow-hidden bg-background transition-opacity duration-300 motion-reduce:transition-none md:hidden ${
          menuOpen
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
        }`}
      >
        {/* Atmospheric depth: ambient lime glow + geometric dot matrix */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-0 h-[350px] w-[350px] bg-[radial-gradient(circle,rgba(184,255,0,0.18)_0%,transparent_65%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(184,255,0,0.09)_0%,transparent_65%)] sm:h-[550px] sm:w-[550px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0A0A0A_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.035] dark:opacity-[0.07]"
        />

        <p className={MICRO_LABEL}>
          <span aria-hidden="true" className="mr-2 inline-block h-px w-5 align-middle bg-accent-lime" />
          Navigate
        </p>

        <nav
          aria-label="Mobile"
          className="flex w-full max-w-xs flex-col items-stretch gap-1 px-6"
        >
          {links.map(({ label, href }, i) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                aria-current={active ? "page" : undefined}
                style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
                className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-lg font-bold tracking-tight transition-all duration-300 motion-reduce:transition-none ${FOCUS_RING} ${
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                } ${
                  active
                    ? "border-border-primary bg-background text-foreground dark:bg-card-bg"
                    : "border-transparent text-text-muted hover:border-border-primary hover:bg-hover-bg hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={`h-6 w-1 rounded-full transition-colors duration-200 ${
                      active ? "bg-accent-lime" : "bg-transparent"
                    }`}
                  />
                  {label}
                </span>
                {active && (
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.7)]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div
          className={`transition-opacity duration-300 motion-reduce:transition-none ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <ThemeToggle />
        </div>
      </div>

      {/* Spacer so content doesn't hide under fixed navbar */}
      <div className="h-[var(--navbar-h)]" />
    </>
  );
}
