"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string | null;
  avatarUrl: string | null;
  quote: string;
  rating: number | null;
  source: string | null;
  isPublished: boolean | null;
  displayOrder: number | null;
  createdAt: string | null;
}

export default function TestimonialsAdminPage() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    setLoading(true);
    try {
      // Fetch all (published + unpublished) — admin-only endpoint
      const res = await fetch("/api/testimonials/all");
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data);
      }
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete testimonial from "${name}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) setTestimonials((prev) => prev.filter((t) => t.id !== id));
      else alert("Failed to delete.");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleTogglePublish(t: Testimonial) {
    setTogglingId(t.id);
    try {
      const res = await fetch(`/api/testimonials/${t.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !t.isPublished }),
      });
      if (res.ok) {
        const updated = await res.json();
        setTestimonials((prev) => prev.map((item) => (item.id === t.id ? { ...item, isPublished: updated.isPublished } : item)));
      } else alert("Failed to update.");
    } finally {
      setTogglingId(null);
    }
  }

  function renderStars(rating: number | null) {
    const r = rating ?? 5;
    return (
      <span className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className={`w-3 h-3 ${i < r ? "text-amber-400" : "text-border-primary"}`} fill={i < r ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        ))}
      </span>
    );
  }

  return (
    <main className="flex flex-1">
      <div className="flex-1 p-6 md:p-10 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Testimonials</h1>
            <p className="text-sm text-text-muted mt-1">Manage client & colleague testimonials displayed on your portfolio.</p>
          </div>
          <Link
            href="/admin/testimonials/new"
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition-opacity"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Testimonial
          </Link>
        </div>

        {/* List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-card-bg border border-border-primary rounded-xl animate-pulse" />
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-24 border-2 border-dashed border-border-primary rounded-2xl">
            <svg className="w-12 h-12 text-text-muted mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 className="text-lg font-medium text-foreground mb-2">No testimonials yet</h3>
            <p className="text-sm text-text-muted mb-6">Add your first testimonial to display social proof on your portfolio.</p>
            <Link
              href="/admin/testimonials/new"
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition-opacity"
            >
              Add Your First Testimonial
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {testimonials.map((t) => (
              <div key={t.id} className="flex items-start gap-4 bg-background border border-border-primary rounded-xl p-4 hover:border-border-secondary transition-colors">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {t.avatarUrl ? (
                    <img src={t.avatarUrl} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-border-primary" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold">
                      {t.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-medium text-sm text-foreground">{t.name}</span>
                    <span className="text-xs text-text-muted">
                      {t.role}{t.company && ` · ${t.company}`}
                    </span>
                    {renderStars(t.rating)}
                    {t.source && (
                      <span className="font-mono text-[10px] px-1.5 py-0.5 bg-card-bg border border-border-primary rounded text-text-muted">
                        {t.source}
                      </span>
                    )}
                    <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${t.isPublished ? "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400" : "bg-card-bg border-border-primary text-text-muted"}`}>
                      {t.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed line-clamp-2">&ldquo;{t.quote}&rdquo;</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  {/* Toggle publish */}
                  <button
                    onClick={() => handleTogglePublish(t)}
                    disabled={togglingId === t.id}
                    title={t.isPublished ? "Unpublish" : "Publish"}
                    className="p-2 text-text-muted hover:text-foreground hover:bg-hover-bg rounded-lg transition-colors disabled:opacity-50"
                  >
                    {t.isPublished ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                  {/* Edit */}
                  <Link
                    href={`/admin/testimonials/${t.id}/edit`}
                    className="p-2 text-text-muted hover:text-foreground hover:bg-hover-bg rounded-lg transition-colors"
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </Link>
                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(t.id, t.name)}
                    disabled={deletingId === t.id}
                    title="Delete"
                    className="p-2 text-text-muted hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
