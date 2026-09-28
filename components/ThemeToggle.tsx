"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" aria-hidden="true" />;
  }

  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-9 h-9 rounded-full border border-border-primary bg-background dark:bg-card-bg hover:bg-hover-bg hover:border-foreground/30 transition-all flex items-center justify-center text-text-secondary hover:text-foreground shadow-2xs focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none cursor-pointer"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        <FiSun className="w-4 h-4 text-accent-lime" aria-hidden="true" />
      ) : (
        <FiMoon className="w-4 h-4 text-foreground" aria-hidden="true" />
      )}
    </button>
  );
}
