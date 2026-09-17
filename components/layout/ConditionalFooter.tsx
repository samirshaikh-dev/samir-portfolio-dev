"use client";

import { usePathname } from "next/navigation";
import React from "react";

interface ConditionalFooterProps {
  children: React.ReactNode;
}

export default function ConditionalFooter({ children }: ConditionalFooterProps) {
  const pathname = usePathname();

  // Hide the footer on all admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return <>{children}</>;
}
