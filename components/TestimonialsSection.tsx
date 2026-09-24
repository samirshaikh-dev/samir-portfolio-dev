import { db } from "@/lib/db";
import { testimonials as testimonialsSchema } from "@/lib/schema";
import { eq, asc } from "drizzle-orm";
import Link from "next/link";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string | null;
  avatarUrl: string | null;
  linkedinUrl: string | null;
  quote: string;
  rating: number | null;
  source: string | null;
  isPublished: boolean | null;
  displayOrder: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

interface TestimonialsSectionProps {
  /** Layout variant */
  variant?: "homepage" | "services" | "contact";
  /** Override the fetched testimonials (useful if parent already fetched them) */
  testimonials?: Testimonial[];
}

async function getPublishedTestimonials(): Promise<Testimonial[]> {
  try {
    return await db
      .select()
      .from(testimonialsSchema)
      .where(eq(testimonialsSchema.isPublished, true))
      .orderBy(asc(testimonialsSchema.displayOrder));
  } catch {
    return [];
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? "text-amber-400" : "text-border-primary"}`}
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <article className="flex flex-col justify-between rounded-xl border border-border-primary bg-card-bg p-6 hover:border-border-secondary transition-all duration-200 hover:shadow-sm">
      {/* Quote mark + text */}
      <div>
        <svg
          className="w-6 h-6 text-text-muted/40 mb-3"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <blockquote className="text-sm text-text-muted leading-relaxed mb-5">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
      </div>

      {/* Author + rating */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-border-primary/60">
        <div className="flex items-center gap-3 min-w-0">
          {/* Avatar */}
          {testimonial.avatarUrl ? (
            <img
              src={testimonial.avatarUrl}
              alt={`${testimonial.name} photo`}
              className="w-9 h-9 rounded-full object-cover border border-border-primary flex-shrink-0"
              loading="lazy"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold flex-shrink-0">
              {initials}
            </div>
          )}

          {/* Name / role */}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{testimonial.name}</p>
            <p className="text-xs text-text-muted truncate">
              {testimonial.role}
              {testimonial.company && ` · ${testimonial.company}`}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          {testimonial.rating != null && <StarRating rating={testimonial.rating} />}
          {testimonial.linkedinUrl && (
            <a
              href={testimonial.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono text-text-muted hover:text-foreground transition-colors"
              aria-label={`Verify ${testimonial.name} on LinkedIn`}
            >
              Verified ↗
            </a>
          )}
          {testimonial.source && !testimonial.linkedinUrl && (
            <span className="text-[10px] font-mono text-text-muted">{testimonial.source}</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default async function TestimonialsSection({
  variant = "homepage",
  testimonials: propTestimonials,
}: TestimonialsSectionProps) {
  const testimonials = propTestimonials ?? (await getPublishedTestimonials());

  // Don't render the section at all if there are no published testimonials
  if (testimonials.length === 0) return null;

  const isHomepage = variant === "homepage";

  return (
    <section
      className={`px-6 md:px-10 py-16 ${isHomepage ? "border-t border-border-primary" : ""}`}
      aria-label="Client testimonials"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
          <div>
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
              SOCIAL PROOF
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mt-1">
              What Clients & Colleagues Say
            </h2>
            <p className="text-text-muted text-sm mt-1.5 max-w-lg">
              Honest feedback from people I&apos;ve worked with — on delivery, communication, and outcomes.
            </p>
          </div>
          {isHomepage && (
            <Link
              href="/contact"
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-foreground transition-colors flex-shrink-0"
            >
              Work with me
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          )}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
