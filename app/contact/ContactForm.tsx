"use client";

import { useState, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { AUTHOR_PHONE } from "@/lib/site-config";
import { analyticsEvents } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/trackEvent";

const FOCUS_RING =
  "focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const INPUT_BASE =
  "w-full rounded-xl bg-background dark:bg-card-bg border border-border-primary px-4 py-3 text-sm text-foreground placeholder-text-muted outline-none transition-all duration-200 disabled:opacity-50 focus:border-foreground/40 dark:focus:border-accent-lime/50 focus:ring-1 focus:ring-foreground/20 dark:focus:ring-accent-lime/20";

const PROJECT_TYPES = [
  "AI / RAG Pipeline",
  "Backend API / Microservices",
  "Full-Stack Product",
  "Website / Landing Page",
  "Technical Consultation",
  "Other",
];

const PRIORITY_LEVELS = [
  "Low Priority",
  "Medium Priority",
  "High Priority",
  "Urgent",
];

const BUDGET_RANGES = [
  "< $1,000",
  "$1,000 – $3,000",
  "$3,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Flexible / Let's Discuss",
];

const TIMELINES = [
  "ASAP (Rush Project)",
  "1-2 Months",
  "3-4 Months",
  "6+ Months",
  "Flexible Timeline",
];

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [whatsappLink, setWhatsappLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [priority, setPriority] = useState<string>("Medium Priority");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;
    if (!formRef.current.reportValidity()) return;

    const formData = new FormData(formRef.current);
    const data = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      projectType: String(formData.get("projectType") || "").trim(),
      priority: String(formData.get("priority") || "Medium Priority").trim(),
      budget: String(formData.get("budget") || "").trim(),
      timeline: String(formData.get("timeline") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    if (
      !data.name ||
      !data.email ||
      !data.projectType ||
      !data.priority ||
      !data.budget ||
      !data.timeline ||
      !data.message
    ) {
      setError("Please complete all required fields marked with *.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const cleanPhone = AUTHOR_PHONE.replace(/[^0-9]/g, "");
    const whatsappText =
      `*New Project Inquiry via Portfolio*\n\n` +
      `*Name:* ${data.name}\n` +
      `*Email:* ${data.email}\n` +
      (data.company ? `*Company:* ${data.company}\n` : "") +
      `*Project Type:* ${data.projectType}\n` +
      `*Priority Level:* ${data.priority}\n` +
      `*Budget Range:* ${data.budget}\n` +
      `*Timeline:* ${data.timeline}\n\n` +
      `*Project Description:*\n${data.message}`;

    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappText)}`;
    setWhatsappLink(whatsappUrl);

    // Open WhatsApp immediately inside direct user gesture to bypass browser popup blockers
    const whatsappTab = window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(resData.error || "Failed to save inquiry");
      }

      if (resData.emailSent) {
        setSuccessMessage(
          "Project inquiry received! A confirmation email has been dispatched to your inbox. You can also continue the conversation directly on WhatsApp."
        );
      } else {
        setSuccessMessage(
          "Project inquiry received! You can also continue the conversation directly on WhatsApp."
        );
      }

      trackEvent(analyticsEvents.contactSubmitSuccess, {
        email_sent: Boolean(resData.emailSent),
        inquiry_type: data.projectType,
      });

      formRef.current?.reset();
      setPriority("Medium Priority");
    } catch {
      trackEvent(analyticsEvents.contactSubmitFallback, {
        inquiry_type: data.projectType,
      });
      setSuccessMessage(
        "Your project inquiry was prepared for WhatsApp! If the chat did not open automatically, click the button below to message Samir directly."
      );
    } finally {
      setLoading(false);
    }
  }

  const SELECT_ICON = (
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-text-muted">
      <svg
        className="w-4 h-4"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M6 8l4 4 4-4"
        />
      </svg>
    </div>
  );

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
              className={`self-start inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-neutral-950 font-bold px-4 py-2 text-xs transition-colors shadow-xs ${FOCUS_RING}`}
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

      {/* Row 1: Name + Email */}
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

      {/* Row 2: Company/Organization (Optional) + Project Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-company" className="block text-xs font-semibold text-text-secondary mb-1.5">
            Company / Organization <span className="text-text-muted font-normal ml-1">(Optional)</span>
          </label>
          <input
            type="text"
            id="contact-company"
            name="company"
            autoComplete="organization"
            className={INPUT_BASE}
            placeholder="Your Company Name (Optional)"
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="contact-project-type" className="block text-xs font-semibold text-text-secondary mb-1.5">
            Project Type <span className="text-accent-lime" aria-hidden="true">*</span>
          </label>
          <div className="relative">
            <select
              id="contact-project-type"
              name="projectType"
              required
              defaultValue=""
              disabled={loading}
              className={`${INPUT_BASE} appearance-none pr-10 cursor-pointer`}
            >
              <option value="" disabled className="text-text-muted bg-background dark:bg-[#18181b]">
                Select project type
              </option>
              {PROJECT_TYPES.map((type) => (
                <option key={type} value={type} className="bg-background dark:bg-[#18181b] text-foreground">
                  {type}
                </option>
              ))}
            </select>
            {SELECT_ICON}
          </div>
        </div>
      </div>

      {/* Row 3: Priority Level + Budget Range */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-priority" className="block text-xs font-semibold text-text-secondary mb-1.5">
            Priority Level <span className="text-accent-lime" aria-hidden="true">*</span>
          </label>
          <div className="relative">
            <select
              id="contact-priority"
              name="priority"
              required
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              disabled={loading}
              className={`${INPUT_BASE} appearance-none pr-10 cursor-pointer`}
            >
              {PRIORITY_LEVELS.map((level) => (
                <option key={level} value={level} className="bg-background dark:bg-[#18181b] text-foreground">
                  {level}
                </option>
              ))}
            </select>
            {SELECT_ICON}
          </div>
        </div>
        <div>
          <label htmlFor="contact-budget" className="block text-xs font-semibold text-text-secondary mb-1.5">
            Budget Range <span className="text-accent-lime" aria-hidden="true">*</span>
          </label>
          <div className="relative">
            <select
              id="contact-budget"
              name="budget"
              required
              defaultValue=""
              disabled={loading}
              className={`${INPUT_BASE} appearance-none pr-10 cursor-pointer`}
            >
              <option value="" disabled className="text-text-muted bg-background dark:bg-[#18181b]">
                Select budget range
              </option>
              {BUDGET_RANGES.map((range) => (
                <option key={range} value={range} className="bg-background dark:bg-[#18181b] text-foreground">
                  {range}
                </option>
              ))}
            </select>
            {SELECT_ICON}
          </div>
        </div>
      </div>

      {/* Row 4: Timeline */}
      <div>
        <label htmlFor="contact-timeline" className="block text-xs font-semibold text-text-secondary mb-1.5">
          Timeline <span className="text-accent-lime" aria-hidden="true">*</span>
        </label>
        <div className="relative">
          <select
            id="contact-timeline"
            name="timeline"
            required
            defaultValue=""
            disabled={loading}
            className={`${INPUT_BASE} appearance-none pr-10 cursor-pointer`}
          >
            <option value="" disabled className="text-text-muted bg-background dark:bg-[#18181b]">
              Select timeline
            </option>
            {TIMELINES.map((t) => (
              <option key={t} value={t} className="bg-background dark:bg-[#18181b] text-foreground">
                {t}
              </option>
            ))}
          </select>
          {SELECT_ICON}
        </div>
      </div>

      {/* Row 5: Project Description */}
      <div>
        <label htmlFor="contact-message" className="block text-xs font-semibold text-text-secondary mb-1.5">
          Project Description <span className="text-accent-lime" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className={`${INPUT_BASE} resize-y min-h-[120px]`}
          placeholder="Describe your project goals, technical requirements, stack, or any specific constraints…"
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
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}
