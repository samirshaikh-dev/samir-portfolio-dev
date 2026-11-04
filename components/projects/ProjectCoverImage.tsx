"use client";

import { useState } from "react";
import Image from "next/image";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary-utils";

interface ProjectCoverImageProps {
  coverImageUrl?: string | null;
  title: string;
  category?: string | null;
  badge?: string | null;
  indexStr?: string;
  aspectRatio?: "card" | "hero";
  priority?: boolean;
}

type DiagramType = "triage" | "whatsapp" | "eventify" | "rag" | "generic";

function getDiagramType(title: string, category?: string | null): DiagramType {
  const t = title.toLowerCase();
  const c = (category || "").toLowerCase();
  if (t.includes("triage") || t.includes("ticket")) return "triage";
  if (t.includes("whatsapp") || t.includes("campaign") || t.includes("sahara")) return "whatsapp";
  if (t.includes("event") || t.includes("eventify")) return "eventify";
  if (t.includes("rag") || t.includes("vector") || t.includes("assistant") || c.includes("rag")) return "rag";
  return "generic";
}

/**
 * Architectural System Schematic Fallback
 * Renders an intentional, technical SVG system topology diagram
 * when an uploaded cover image is not present or fails to load.
 * Complies with AVOID.md (no generic AI slop) and psychology.md (verifiable engineering proof).
 */
function ArchitecturalSchematic({
  type,
  title,
  indexStr = "01",
}: {
  type: DiagramType;
  title: string;
  indexStr?: string;
}) {
  switch (type) {
    case "triage":
      return (
        <svg
          viewBox="0 0 600 375"
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={`${title} system architecture diagram`}
        >
          {/* Dark Architectural Grid Background */}
          <rect width="600" height="375" fill="#0A0D0B" />
          <defs>
            <pattern id="grid-triage" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1A211D" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="600" height="375" fill="url(#grid-triage)" />

          {/* Header Strip */}
          <text x="32" y="42" fill="#5F6368" fontFamily="monospace" fontSize="10" letterSpacing="2">
            SYS.ARCH // EVENT-DRIVEN AI TRIAGE
          </text>
          <circle cx="550" cy="38" r="4" fill="#B8FF00" />
          <text x="532" y="42" fill="#B8FF00" fontFamily="monospace" fontSize="9" textAnchor="end" letterSpacing="1">
            ACTIVE PIPELINE
          </text>
          <line x1="32" y1="56" x2="568" y2="56" stroke="#262D28" strokeWidth="1" />

          {/* Node 1: Inbound Webhook */}
          <rect x="32" y="90" width="105" height="64" rx="8" fill="#131815" stroke="#2D3A32" strokeWidth="1.2" />
          <text x="84" y="116" fill="#8E9285" fontFamily="monospace" fontSize="9" textAnchor="middle">01 / INGESTION</text>
          <text x="84" y="136" fill="#F7F8F2" fontFamily="sans-serif" fontSize="12" fontWeight="bold" textAnchor="middle">Webhook API</text>

          {/* Connector 1 -> 2 */}
          <line x1="137" y1="122" x2="168" y2="122" stroke="#B8FF00" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="168,122 163,119 163,125" fill="#B8FF00" />

          {/* Node 2: BullMQ Queue */}
          <rect x="170" y="90" width="115" height="64" rx="8" fill="#131815" stroke="#2D3A32" strokeWidth="1.2" />
          <text x="227" y="116" fill="#8E9285" fontFamily="monospace" fontSize="9" textAnchor="middle">02 / BUFFER</text>
          <text x="227" y="136" fill="#F7F8F2" fontFamily="sans-serif" fontSize="12" fontWeight="bold" textAnchor="middle">BullMQ + Redis</text>

          {/* Connector 2 -> 3 */}
          <line x1="285" y1="122" x2="316" y2="122" stroke="#B8FF00" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="316,122 311,119 311,125" fill="#B8FF00" />

          {/* Node 3: LLM Classifier */}
          <rect x="318" y="90" width="125" height="64" rx="8" fill="#1A241C" stroke="#B8FF00" strokeWidth="1.5" />
          <text x="380" y="116" fill="#B8FF00" fontFamily="monospace" fontSize="9" textAnchor="middle">03 / INFERENCE</text>
          <text x="380" y="136" fill="#F7F8F2" fontFamily="sans-serif" fontSize="12" fontWeight="bold" textAnchor="middle">Llama 3 · Groq</text>

          {/* Connector 3 -> 4 */}
          <line x1="443" y1="122" x2="474" y2="122" stroke="#B8FF00" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="474,122 469,119 469,125" fill="#B8FF00" />

          {/* Node 4: pgvector Match */}
          <rect x="476" y="90" width="92" height="64" rx="8" fill="#131815" stroke="#2D3A32" strokeWidth="1.2" />
          <text x="522" y="116" fill="#8E9285" fontFamily="monospace" fontSize="9" textAnchor="middle">04 / DISPATCH</text>
          <text x="522" y="136" fill="#F7F8F2" fontFamily="sans-serif" fontSize="12" fontWeight="bold" textAnchor="middle">pgvector</text>

          {/* Live Metrics Dashboard Panel */}
          <rect x="32" y="185" width="536" height="135" rx="10" fill="#0F1411" stroke="#222B25" strokeWidth="1" />

          {/* Metric 1 */}
          <text x="64" y="225" fill="#5F6368" fontFamily="monospace" fontSize="10">CLASSIFICATION SPEED</text>
          <text x="64" y="260" fill="#F7F8F2" fontFamily="monospace" fontSize="26" fontWeight="bold">&lt; 1.8s</text>
          <text x="64" y="285" fill="#B8FF00" fontFamily="monospace" fontSize="10">P95 Background Execution</text>

          <line x1="230" y1="205" x2="230" y2="300" stroke="#222B25" strokeWidth="1" />

          {/* Metric 2 */}
          <text x="260" y="225" fill="#5F6368" fontFamily="monospace" fontSize="10">AUTOMATION RATE</text>
          <text x="260" y="260" fill="#F7F8F2" fontFamily="monospace" fontSize="26" fontWeight="bold">74%</text>
          <text x="260" y="285" fill="#8E9285" fontFamily="monospace" fontSize="10">Zero Manual Intervention</text>

          <line x1="410" y1="205" x2="410" y2="300" stroke="#222B25" strokeWidth="1" />

          {/* Metric 3 */}
          <text x="440" y="225" fill="#5F6368" fontFamily="monospace" fontSize="10">INTENT ACCURACY</text>
          <text x="440" y="260" fill="#F7F8F2" fontFamily="monospace" fontSize="26" fontWeight="bold">92%</text>
          <text x="440" y="285" fill="#8E9285" fontFamily="monospace" fontSize="10">Ground-truth Verified</text>

          {/* Watermark Index */}
          <text x="550" y="352" fill="#1F2822" fontFamily="monospace" fontSize="18" fontWeight="bold" textAnchor="end">
            #{indexStr}
          </text>
        </svg>
      );

    case "whatsapp":
      return (
        <svg
          viewBox="0 0 600 375"
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={`${title} system architecture diagram`}
        >
          <rect width="600" height="375" fill="#0A0D0B" />
          <defs>
            <pattern id="grid-wa" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1A211D" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="600" height="375" fill="url(#grid-wa)" />

          {/* Header */}
          <text x="32" y="42" fill="#5F6368" fontFamily="monospace" fontSize="10" letterSpacing="2">
            SYS.ARCH // RATE-CONTROLLED BROADCASTER
          </text>
          <circle cx="550" cy="38" r="4" fill="#B8FF00" />
          <text x="532" y="42" fill="#B8FF00" fontFamily="monospace" fontSize="9" textAnchor="end" letterSpacing="1">
            HIGH CONCURRENCY
          </text>
          <line x1="32" y1="56" x2="568" y2="56" stroke="#262D28" strokeWidth="1" />

          {/* Node 1: Broadcast Source */}
          <rect x="32" y="90" width="105" height="64" rx="8" fill="#131815" stroke="#2D3A32" strokeWidth="1.2" />
          <text x="84" y="116" fill="#8E9285" fontFamily="monospace" fontSize="9" textAnchor="middle">01 / INPUT</text>
          <text x="84" y="136" fill="#F7F8F2" fontFamily="sans-serif" fontSize="12" fontWeight="bold" textAnchor="middle">React Native</text>

          <line x1="137" y1="122" x2="168" y2="122" stroke="#B8FF00" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="168,122 163,119 163,125" fill="#B8FF00" />

          {/* Node 2: Token Bucket */}
          <rect x="170" y="90" width="120" height="64" rx="8" fill="#1A241C" stroke="#B8FF00" strokeWidth="1.5" />
          <text x="230" y="116" fill="#B8FF00" fontFamily="monospace" fontSize="9" textAnchor="middle">02 / RATE LIMITER</text>
          <text x="230" y="136" fill="#F7F8F2" fontFamily="sans-serif" fontSize="12" fontWeight="bold" textAnchor="middle">Token Bucket</text>

          <line x1="290" y1="122" x2="321" y2="122" stroke="#B8FF00" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="321,122 316,119 316,125" fill="#B8FF00" />

          {/* Node 3: Worker Queue */}
          <rect x="323" y="90" width="115" height="64" rx="8" fill="#131815" stroke="#2D3A32" strokeWidth="1.2" />
          <text x="380" y="116" fill="#8E9285" fontFamily="monospace" fontSize="9" textAnchor="middle">03 / DISPATCH</text>
          <text x="380" y="136" fill="#F7F8F2" fontFamily="sans-serif" fontSize="12" fontWeight="bold" textAnchor="middle">Express Queue</text>

          <line x1="438" y1="122" x2="469" y2="122" stroke="#B8FF00" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="469,122 464,119 464,125" fill="#B8FF00" />

          {/* Node 4: WhatsApp Gateway */}
          <rect x="471" y="90" width="97" height="64" rx="8" fill="#131815" stroke="#2D3A32" strokeWidth="1.2" />
          <text x="519" y="116" fill="#8E9285" fontFamily="monospace" fontSize="9" textAnchor="middle">04 / DELIVERY</text>
          <text x="519" y="136" fill="#F7F8F2" fontFamily="sans-serif" fontSize="12" fontWeight="bold" textAnchor="middle">Meta / WA API</text>

          {/* Performance Dashboard Panel */}
          <rect x="32" y="185" width="536" height="135" rx="10" fill="#0F1411" stroke="#222B25" strokeWidth="1" />

          <text x="64" y="225" fill="#5F6368" fontFamily="monospace" fontSize="10">PEAK THROUGHPUT</text>
          <text x="64" y="260" fill="#F7F8F2" fontFamily="monospace" fontSize="26" fontWeight="bold">1,200/s</text>
          <text x="64" y="285" fill="#B8FF00" fontFamily="monospace" fontSize="10">Non-blocking Concurrency</text>

          <line x1="230" y1="205" x2="230" y2="300" stroke="#222B25" strokeWidth="1" />

          <text x="260" y="225" fill="#5F6368" fontFamily="monospace" fontSize="10">DELIVERY CONFIRMATION</text>
          <text x="260" y="260" fill="#F7F8F2" fontFamily="monospace" fontSize="26" fontWeight="bold">99.8%</text>
          <text x="260" y="285" fill="#8E9285" fontFamily="monospace" fontSize="10">Webhook Receipt Verified</text>

          <line x1="410" y1="205" x2="410" y2="300" stroke="#222B25" strokeWidth="1" />

          <text x="440" y="225" fill="#5F6368" fontFamily="monospace" fontSize="10">DATA LOSS AT PEAK</text>
          <text x="440" y="260" fill="#F7F8F2" fontFamily="monospace" fontSize="26" fontWeight="bold">0.0%</text>
          <text x="440" y="285" fill="#B8FF00" fontFamily="monospace" fontSize="10">Idempotent Retry Guard</text>

          <text x="550" y="352" fill="#1F2822" fontFamily="monospace" fontSize="18" fontWeight="bold" textAnchor="end">
            #{indexStr}
          </text>
        </svg>
      );

    case "eventify":
      return (
        <svg
          viewBox="0 0 600 375"
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={`${title} system architecture diagram`}
        >
          <rect width="600" height="375" fill="#0A0D0B" />
          <defs>
            <pattern id="grid-ev" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1A211D" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="600" height="375" fill="url(#grid-ev)" />

          {/* Header */}
          <text x="32" y="42" fill="#5F6368" fontFamily="monospace" fontSize="10" letterSpacing="2">
            SYS.ARCH // TRANSACTIONAL SEAT LOCKING
          </text>
          <circle cx="550" cy="38" r="4" fill="#B8FF00" />
          <text x="532" y="42" fill="#B8FF00" fontFamily="monospace" fontSize="9" textAnchor="end" letterSpacing="1">
            ACID PROTECTED
          </text>
          <line x1="32" y1="56" x2="568" y2="56" stroke="#262D28" strokeWidth="1" />

          {/* Node 1: Apollo GraphQL */}
          <rect x="32" y="90" width="115" height="64" rx="8" fill="#131815" stroke="#2D3A32" strokeWidth="1.2" />
          <text x="89" y="116" fill="#8E9285" fontFamily="monospace" fontSize="9" textAnchor="middle">01 / GATEWAY</text>
          <text x="89" y="136" fill="#F7F8F2" fontFamily="sans-serif" fontSize="12" fontWeight="bold" textAnchor="middle">Apollo GraphQL</text>

          <line x1="147" y1="122" x2="178" y2="122" stroke="#B8FF00" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="178,122 173,119 173,125" fill="#B8FF00" />

          {/* Node 2: ACID Locking */}
          <rect x="180" y="90" width="125" height="64" rx="8" fill="#1A241C" stroke="#B8FF00" strokeWidth="1.5" />
          <text x="242" y="116" fill="#B8FF00" fontFamily="monospace" fontSize="9" textAnchor="middle">02 / TRANSACTION</text>
          <text x="242" y="136" fill="#F7F8F2" fontFamily="sans-serif" fontSize="12" fontWeight="bold" textAnchor="middle">ACID Row Locks</text>

          <line x1="305" y1="122" x2="336" y2="122" stroke="#B8FF00" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="336,122 331,119 331,125" fill="#B8FF00" />

          {/* Node 3: PostgreSQL Multi-Tenant */}
          <rect x="338" y="90" width="115" height="64" rx="8" fill="#131815" stroke="#2D3A32" strokeWidth="1.2" />
          <text x="395" y="116" fill="#8E9285" fontFamily="monospace" fontSize="9" textAnchor="middle">03 / PERSISTENCE</text>
          <text x="395" y="136" fill="#F7F8F2" fontFamily="sans-serif" fontSize="12" fontWeight="bold" textAnchor="middle">Postgres RBAC</text>

          <line x1="453" y1="122" x2="484" y2="122" stroke="#B8FF00" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="484,122 479,119 479,125" fill="#B8FF00" />

          {/* Node 4: Payment Webhook */}
          <rect x="486" y="90" width="82" height="64" rx="8" fill="#131815" stroke="#2D3A32" strokeWidth="1.2" />
          <text x="527" y="116" fill="#8E9285" fontFamily="monospace" fontSize="9" textAnchor="middle">04 / HOOK</text>
          <text x="527" y="136" fill="#F7F8F2" fontFamily="sans-serif" fontSize="12" fontWeight="bold" textAnchor="middle">Stripe</text>

          {/* Metrics */}
          <rect x="32" y="185" width="536" height="135" rx="10" fill="#0F1411" stroke="#222B25" strokeWidth="1" />

          <text x="64" y="225" fill="#5F6368" fontFamily="monospace" fontSize="10">CONCURRENT CAPACITY</text>
          <text x="64" y="260" fill="#F7F8F2" fontFamily="monospace" fontSize="26" fontWeight="bold">10k+ Users</text>
          <text x="64" y="285" fill="#B8FF00" fontFamily="monospace" fontSize="10">High-traffic Checkout</text>

          <line x1="230" y1="205" x2="230" y2="300" stroke="#222B25" strokeWidth="1" />

          <text x="260" y="225" fill="#5F6368" fontFamily="monospace" fontSize="10">API LATENCY (P95)</text>
          <text x="260" y="260" fill="#F7F8F2" fontFamily="monospace" fontSize="26" fontWeight="bold">&lt; 100ms</text>
          <text x="260" y="285" fill="#8E9285" fontFamily="monospace" fontSize="10">Indexed PostgreSQL</text>

          <line x1="410" y1="205" x2="410" y2="300" stroke="#222B25" strokeWidth="1" />

          <text x="440" y="225" fill="#5F6368" fontFamily="monospace" fontSize="10">DOUBLE-BOOKING INCIDENTS</text>
          <text x="440" y="260" fill="#F7F8F2" fontFamily="monospace" fontSize="26" fontWeight="bold">0%</text>
          <text x="440" y="285" fill="#B8FF00" fontFamily="monospace" fontSize="10">ACID Isolation</text>

          <text x="550" y="352" fill="#1F2822" fontFamily="monospace" fontSize="18" fontWeight="bold" textAnchor="end">
            #{indexStr}
          </text>
        </svg>
      );

    case "rag":
    default:
      return (
        <svg
          viewBox="0 0 600 375"
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={`${title} system architecture diagram`}
        >
          <rect width="600" height="375" fill="#0A0D0B" />
          <defs>
            <pattern id="grid-gen" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1A211D" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="600" height="375" fill="url(#grid-gen)" />

          <text x="32" y="42" fill="#5F6368" fontFamily="monospace" fontSize="10" letterSpacing="2">
            SYS.ARCH // PRODUCTION SYSTEM TOPOLOGY
          </text>
          <circle cx="550" cy="38" r="4" fill="#B8FF00" />
          <text x="532" y="42" fill="#B8FF00" fontFamily="monospace" fontSize="9" textAnchor="end" letterSpacing="1">
            VERIFIED
          </text>
          <line x1="32" y1="56" x2="568" y2="56" stroke="#262D28" strokeWidth="1" />

          {/* Node 1 */}
          <rect x="32" y="90" width="115" height="64" rx="8" fill="#131815" stroke="#2D3A32" strokeWidth="1.2" />
          <text x="89" y="116" fill="#8E9285" fontFamily="monospace" fontSize="9" textAnchor="middle">01 / CLIENT</text>
          <text x="89" y="136" fill="#F7F8F2" fontFamily="sans-serif" fontSize="12" fontWeight="bold" textAnchor="middle">Next.js 16 App</text>

          <line x1="147" y1="122" x2="178" y2="122" stroke="#B8FF00" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="178,122 173,119 173,125" fill="#B8FF00" />

          {/* Node 2 */}
          <rect x="180" y="90" width="125" height="64" rx="8" fill="#1A241C" stroke="#B8FF00" strokeWidth="1.5" />
          <text x="242" y="116" fill="#B8FF00" fontFamily="monospace" fontSize="9" textAnchor="middle">02 / SERVICES</text>
          <text x="242" y="136" fill="#F7F8F2" fontFamily="sans-serif" fontSize="12" fontWeight="bold" textAnchor="middle">Node.js API</text>

          <line x1="305" y1="122" x2="336" y2="122" stroke="#B8FF00" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="336,122 331,119 331,125" fill="#B8FF00" />

          {/* Node 3 */}
          <rect x="338" y="90" width="115" height="64" rx="8" fill="#131815" stroke="#2D3A32" strokeWidth="1.2" />
          <text x="395" y="116" fill="#8E9285" fontFamily="monospace" fontSize="9" textAnchor="middle">03 / DATABASE</text>
          <text x="395" y="136" fill="#F7F8F2" fontFamily="sans-serif" fontSize="12" fontWeight="bold" textAnchor="middle">Neon Postgres</text>

          <line x1="453" y1="122" x2="484" y2="122" stroke="#B8FF00" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="484,122 479,119 479,125" fill="#B8FF00" />

          {/* Node 4 */}
          <rect x="486" y="90" width="82" height="64" rx="8" fill="#131815" stroke="#2D3A32" strokeWidth="1.2" />
          <text x="527" y="116" fill="#8E9285" fontFamily="monospace" fontSize="9" textAnchor="middle">04 / VECTORS</text>
          <text x="527" y="136" fill="#F7F8F2" fontFamily="sans-serif" fontSize="12" fontWeight="bold" textAnchor="middle">pgvector</text>

          {/* Metrics */}
          <rect x="32" y="185" width="536" height="135" rx="10" fill="#0F1411" stroke="#222B25" strokeWidth="1" />

          <text x="64" y="225" fill="#5F6368" fontFamily="monospace" fontSize="10">TYPE SAFETY</text>
          <text x="64" y="260" fill="#F7F8F2" fontFamily="monospace" fontSize="26" fontWeight="bold">100%</text>
          <text x="64" y="285" fill="#B8FF00" fontFamily="monospace" fontSize="10">TypeScript Strict</text>

          <line x1="230" y1="205" x2="230" y2="300" stroke="#222B25" strokeWidth="1" />

          <text x="260" y="225" fill="#5F6368" fontFamily="monospace" fontSize="10">SERVICE LATENCY</text>
          <text x="260" y="260" fill="#F7F8F2" fontFamily="monospace" fontSize="26" fontWeight="bold">Sub-100ms</text>
          <text x="260" y="285" fill="#8E9285" fontFamily="monospace" fontSize="10">Optimized Queries</text>

          <line x1="410" y1="205" x2="410" y2="300" stroke="#222B25" strokeWidth="1" />

          <text x="440" y="225" fill="#5F6368" fontFamily="monospace" fontSize="10">PRODUCTION STATUS</text>
          <text x="440" y="260" fill="#F7F8F2" fontFamily="monospace" fontSize="26" fontWeight="bold">Live</text>
          <text x="440" y="285" fill="#B8FF00" fontFamily="monospace" fontSize="10">Open Source</text>

          <text x="550" y="352" fill="#1F2822" fontFamily="monospace" fontSize="18" fontWeight="bold" textAnchor="end">
            #{indexStr}
          </text>
        </svg>
      );
  }
}

export default function ProjectCoverImage({
  coverImageUrl,
  title,
  category,
  badge: _badge,
  indexStr = "01",
  aspectRatio = "card",
  priority = false,
}: ProjectCoverImageProps) {
  const [hasError, setHasError] = useState(false);

  const isCloudinary = Boolean(coverImageUrl && coverImageUrl.includes("cloudinary.com"));
  const widthTarget = aspectRatio === "hero" ? 1200 : 800;
  const optimizedUrl = coverImageUrl
    ? isCloudinary
      ? optimizeCloudinaryUrl(coverImageUrl, { width: widthTarget, quality: 85 })
      : coverImageUrl
    : null;

  const aspectClass =
    aspectRatio === "hero"
      ? "aspect-[16/10] sm:aspect-[2/1] min-h-[220px]"
      : "aspect-[16/10] sm:aspect-[16/9] min-h-[190px]";

  const diagramType = getDiagramType(title, category);

  // If no URL or image fails to load, render the architectural schematic
  if (!optimizedUrl || hasError) {
    return (
      <div
        className={`relative ${aspectClass} w-full overflow-hidden rounded-xl md:rounded-2xl border border-border-primary/80 bg-[#0A0D0B] shadow-2xs group-hover:border-foreground/30 transition-colors`}
      >
        <ArchitecturalSchematic type={diagramType} title={title} indexStr={indexStr} />
      </div>
    );
  }

  return (
    <div
      className={`relative ${aspectClass} w-full overflow-hidden rounded-xl md:rounded-2xl border border-border-primary/80 bg-[#0A0D0B] shadow-2xs`}
    >
      <Image
        src={optimizedUrl}
        alt={`${title} architectural preview`}
        fill
        priority={priority}
        unoptimized={isCloudinary}
        onError={() => setHasError(true)}
        className="object-cover transition-transform duration-500 group-hover:scale-102 motion-reduce:transform-none"
        sizes={
          aspectRatio === "hero"
            ? "(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1104px"
            : "(max-width: 1024px) 100vw, 50vw"
        }
      />
    </div>
  );
}
