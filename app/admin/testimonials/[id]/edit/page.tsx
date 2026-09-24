"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import MediaLibraryModal from "@/components/admin/MediaLibraryModal";

const SOURCES = ["LinkedIn", "Upwork", "Email", "GitHub", "Direct", "Internship", "Other"];

export default function EditTestimonialPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    avatarUrl: "",
    linkedinUrl: "",
    quote: "",
    rating: 5,
    source: "LinkedIn",
    isPublished: false,
    displayOrder: 0,
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/testimonials/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setForm({
          name: data.name ?? "",
          role: data.role ?? "",
          company: data.company ?? "",
          avatarUrl: data.avatarUrl ?? "",
          linkedinUrl: data.linkedinUrl ?? "",
          quote: data.quote ?? "",
          rating: data.rating ?? 5,
          source: data.source ?? "LinkedIn",
          isPublished: data.isPublished ?? false,
          displayOrder: data.displayOrder ?? 0,
        });
      } catch {
        alert("Failed to load testimonial.");
        router.push("/admin/testimonials");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, router]);

  function update(field: string, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.role.trim() || !form.quote.trim()) {
      alert("Name, Role, and Quote are required.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to update");
      router.push("/admin/testimonials");
    } catch (err) {
      console.error(err);
      alert("Failed to update testimonial.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex flex-1 p-6 md:p-10">
        <div className="flex-1 max-w-3xl space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 bg-card-bg border border-border-primary rounded-xl animate-pulse" />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1">
      <div className="flex-1 p-6 md:p-10 max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/admin/testimonials"
            className="p-2 text-text-muted hover:text-foreground hover:bg-hover-bg rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Edit Testimonial</h1>
            <p className="text-sm text-text-muted mt-0.5">Update the testimonial details.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name + Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-text-secondary">Full Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-border-primary rounded-lg focus:ring-2 focus:ring-border-primary outline-none bg-background"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-text-secondary">Role / Title *</label>
              <input
                type="text"
                value={form.role}
                onChange={(e) => update("role", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-border-primary rounded-lg focus:ring-2 focus:ring-border-primary outline-none bg-background"
                required
              />
            </div>
          </div>

          {/* Company + Source */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-text-secondary">Company / Organisation</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-border-primary rounded-lg focus:ring-2 focus:ring-border-primary outline-none bg-background"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-text-secondary">Source</label>
              <select
                value={form.source}
                onChange={(e) => update("source", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-border-primary rounded-lg focus:ring-2 focus:ring-border-primary outline-none bg-background"
              >
                {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Avatar */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-text-secondary">Avatar Photo</label>
            <div className="flex items-center gap-3">
              {form.avatarUrl && (
                <img src={form.avatarUrl} alt="Avatar preview" className="w-10 h-10 rounded-full object-cover border border-border-primary" />
              )}
              <button
                type="button"
                onClick={() => setMediaModalOpen(true)}
                className="inline-flex items-center gap-2 px-3 py-2 border border-border-primary rounded-lg text-sm text-text-secondary bg-background hover:bg-hover-bg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {form.avatarUrl ? "Change Photo" : "Choose from Library"}
              </button>
              {form.avatarUrl && (
                <button type="button" onClick={() => update("avatarUrl", "")} className="text-xs text-red-600 dark:text-red-400 hover:underline">
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* LinkedIn URL */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-text-secondary">LinkedIn Profile URL</label>
            <input
              type="url"
              value={form.linkedinUrl}
              onChange={(e) => update("linkedinUrl", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-border-primary rounded-lg focus:ring-2 focus:ring-border-primary outline-none bg-background"
              placeholder="https://linkedin.com/in/..."
            />
          </div>

          {/* Quote */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-text-secondary">Testimonial Quote *</label>
            <textarea
              value={form.quote}
              onChange={(e) => update("quote", e.target.value)}
              rows={4}
              className="w-full px-3 py-2 text-sm border border-border-primary rounded-lg focus:ring-2 focus:ring-border-primary outline-none bg-background resize-none"
              required
            />
          </div>

          {/* Rating + Display Order */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-text-secondary">Star Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => update("rating", star)} className="focus:outline-none" aria-label={`${star} stars`}>
                    <svg className={`w-6 h-6 transition-colors ${star <= form.rating ? "text-amber-400" : "text-border-primary"}`} fill={star <= form.rating ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                ))}
                <span className="text-xs text-text-muted ml-1">{form.rating}/5</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-text-secondary">Display Order</label>
              <input
                type="number"
                min={0}
                value={form.displayOrder}
                onChange={(e) => update("displayOrder", parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm border border-border-primary rounded-lg focus:ring-2 focus:ring-border-primary outline-none bg-background"
              />
            </div>
          </div>

          {/* Publish toggle + Submit */}
          <div className="flex items-center justify-between pt-4 border-t border-border-primary">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <div
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${form.isPublished ? "bg-foreground" : "bg-border-primary"}`}
                onClick={() => update("isPublished", !form.isPublished)}
                role="switch"
                aria-checked={form.isPublished}
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && update("isPublished", !form.isPublished)}
              >
                <span className={`inline-block h-3.5 w-3.5 rounded-full bg-background transition-transform ${form.isPublished ? "translate-x-4.5" : "translate-x-0.5"}`} />
              </div>
              <span className="text-sm font-medium text-foreground">
                {form.isPublished ? "Published" : "Draft"}
              </span>
            </label>
            <div className="flex items-center gap-3">
              <Link href="/admin/testimonials" className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-foreground border border-border-primary rounded-lg hover:bg-hover-bg transition-colors">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {saving ? "Saving..." : "Update Testimonial"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <MediaLibraryModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelect={(url) => { update("avatarUrl", url); setMediaModalOpen(false); }}
      />
    </main>
  );
}
