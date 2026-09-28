"use client";

import { useState, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { AUTHOR_PHONE } from "@/lib/site-config";

const FOCUS_RING =
  "focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const INPUT_BASE =
  "w-full rounded-xl bg-background dark:bg-card-bg border border-border-primary px-4 py-3 text-sm text-foreground placeholder-text-muted outline-none transition-all duration-200 disabled:opacity-50 focus:border-foreground/40 dark:focus:border-accent-lime/50 focus:ring-1 focus:ring-foreground/20 dark:focus:ring-accent-lime/20";

const INQUIRY_TYPES = [
  "AI / RAG Pipeline",
  "Backend API / Microservices",
  "Full-Stack Product",
  "Website / Landing Page",
  "Technical Consultation",
  "Other",
];

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [whatsappLink, setWhatsappLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;
    if (!formRef.current.reportValidity()) return;

    const formData = new FormData(formRef.current);
    const data = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      subject: String(formData.get("subject") || selectedType || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    if (!data.name || !data.email || !data.subject || !data.message) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const cleanPhone = AUTHOR_PHONE.replace(/[^0-9]/g, "");
    const whatsappText = `*New Inquiry via Portfolio*\n\n*Type:* ${selectedType || "General"}\n*Name:* ${data.name}\n*Email:* ${data.email}\n*Subject:* ${data.subject}\n\n*Message:*\n${data.message}`;

    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappText)}`;
    setWhatsappLink(whatsappUrl);

    // Open WhatsApp IMMEDIATELY within the direct user gesture to prevent browser popup blockers.
    // Modern browsers silently block window.open() if invoked after an asynchronous await (such as network fetch).
    const whatsappTab = window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(resData.error || "Failed to save message");
      }

      if (resData.emailSent) {
        setSuccessMessage(
          "Inquiry saved! A confirmation email has been dispatched to your inbox. You can also continue the conversation on WhatsApp."
        );
      } else {
        setSuccessMessage(
          "Inquiry saved! You can also continue the conversation on WhatsApp."
        );
      }

      formRef.current?.reset();
      setSelectedType(null);
    } catch {
      setSuccessMessage(
        "Your message was prepared for WhatsApp! If the tab did not open automatically, click the button below to message Samir directly."
      );
    } finally {
      // If popup was blocked by browser policy, ensure fallback link is ready
      if (!whatsappTab || whatsappTab.closed) {
        // Fallback button is visible in the success alert
      }
      setLoading(false);
    }
  }

  return (
    <form ref={formRef} className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
      {/* Success Banner */}
      {successMessage && (
        <div
          role="status"
          aria-live="polite"
          className="rounded-2xl border border-accent-lime/30 bg-accent-lime/5 dark:bg-accent-lime/10 p-4 text-sm text-foreground flex flex-col gap-3"
        >
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 w-4 h-4 rounded-full bg-accent-lime text-[#0A0A0A] flex items-center justify-center text-[10px] font-black flex-shrink-0">
              ✓
            </span>
            <p className="text-sm text-text-secondary leading-snug">{successMessage}</p>
          </div>
          {whatsappLink && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`self-start inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-neutral-950 font-bold px-4 py-2 text-xs transition-colors shadow-sm ${FOCUS_RING}`}
            >
              <FaWhatsapp className="text-sm flex-shrink-0" aria-hidden="true" />
              <span>Open in WhatsApp</span>
            </a>
          )}
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div
          role="alert"
          className="rounded-2xl border border-red-500/30 bg-red-50 dark:bg-red-900/10 p-4 text-sm text-red-700 dark:text-red-400"
        >
          {error}
        </div>
      )}

      {/* Inquiry Type Pills */}
      <div>
        <p className="text-xs font-semibold text-text-secondary mb-2.5" id="inquiry-type-label">
          What are you looking for?
          <span className="text-text-muted font-normal ml-1">(optional)</span>
        </p>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-labelledby="inquiry-type-label"
        >
          {INQUIRY_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(selectedType === type ? null : type)}
              aria-pressed={selectedType === type}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${FOCUS_RING} ${
                selectedType === type
                  ? "bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] border-foreground dark:border-accent-lime shadow-[0_0_10px_rgba(184,255,0,0.35)]"
                  : "bg-background dark:bg-card-bg border-border-primary text-text-secondary hover:border-foreground/30 hover:text-foreground hover:bg-hover-bg"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Name + Email Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-semibold text-text-secondary mb-1.5">
            Full Name <span className="text-accent-lime" aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            className={INPUT_BASE}
            placeholder="Jane Smith"
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-xs font-semibold text-text-secondary mb-1.5">
            Work Email <span className="text-accent-lime" aria-hidden="true">*</span>
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            required
            autoComplete="email"
            className={INPUT_BASE}
            placeholder="jane@company.com"
            disabled={loading}
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="contact-subject" className="block text-xs font-semibold text-text-secondary mb-1.5">
          Subject <span className="text-accent-lime" aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          id="contact-subject"
          name="subject"
          required
          className={INPUT_BASE}
          placeholder={selectedType ? `Re: ${selectedType}` : "What is this regarding?"}
          disabled={loading}
          defaultValue={selectedType ?? ""}
          key={selectedType}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-xs font-semibold text-text-secondary mb-1.5">
          Message <span className="text-accent-lime" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className={`${INPUT_BASE} resize-y min-h-[120px]`}
          placeholder="Describe your project, stack, timeline, or anything relevant…"
          disabled={loading}
        />
      </div>

      {/* Privacy note + CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
        <p className="text-[11px] text-text-muted leading-snug max-w-xs">
          Your details are never sold or shared. By submitting you agree to a free discovery discussion.
        </p>

        <button
          type="submit"
          disabled={loading}
          aria-label="Send inquiry via WhatsApp"
          className={`inline-flex items-center justify-center gap-2.5 rounded-full bg-foreground text-background dark:bg-accent-lime dark:text-[#0A0A0A] font-extrabold px-6 py-3 text-sm hover:shadow-[0_0_16px_rgba(184,255,0,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-xs cursor-pointer whitespace-nowrap shrink-0 ${FOCUS_RING}`}
        >
          <FaWhatsapp className="text-base flex-shrink-0" aria-hidden="true" />
          <span>{loading ? "Sending…" : "Send via WhatsApp"}</span>
          {!loading && (
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}
