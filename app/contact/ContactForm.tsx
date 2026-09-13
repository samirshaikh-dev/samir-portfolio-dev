"use client";

import { useState, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { AUTHOR_PHONE } from "@/lib/site-config";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [whatsappLink, setWhatsappLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;
    if (!formRef.current.reportValidity()) return;

    const formData = new FormData(formRef.current);
    const data = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    if (!data.name || !data.email || !data.subject || !data.message) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const cleanPhone = AUTHOR_PHONE.replace(/[^0-9]/g, "");
    const whatsappText = `*New Inquiry via Portfolio*

*Name:* ${data.name}
*Email:* ${data.email}
*Subject:* ${data.subject}

*Message:*
${data.message}`;

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
    <form ref={formRef} className="flex flex-col gap-6" onSubmit={handleSubmit}>
      {successMessage && (
        <div
          role="status"
          aria-live="polite"
          className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 text-sm text-green-800 dark:text-green-400 border border-green-200 dark:border-green-800 flex flex-col gap-3"
        >
          <p>{successMessage}</p>
          {whatsappLink && (
            <div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-neutral-950 font-semibold px-4 py-2 text-xs transition-colors shadow-sm"
              >
                <FaWhatsapp className="text-base flex-shrink-0" aria-hidden="true" />
                <span>Open in WhatsApp</span>
              </a>
            </div>
          )}
        </div>
      )}
      {error && (
        <div
          role="alert"
          className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-800 dark:text-red-400 border border-red-200 dark:border-red-800"
        >
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-1">
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full rounded-lg bg-background border border-border-primary px-4 py-3 text-sm text-foreground placeholder-text-muted outline-none focus:border-text-muted focus:ring-1 focus:ring-border-primary transition-all disabled:opacity-50"
            placeholder="John Doe"
            disabled={loading}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full rounded-lg bg-background border border-border-primary px-4 py-3 text-sm text-foreground placeholder-text-muted outline-none focus:border-text-muted focus:ring-1 focus:ring-border-primary transition-all disabled:opacity-50"
            placeholder="john@example.com"
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1.5">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="w-full rounded-lg bg-background border border-border-primary px-4 py-3 text-sm text-foreground placeholder-text-muted outline-none focus:border-text-muted focus:ring-1 focus:ring-border-primary transition-all disabled:opacity-50"
          placeholder="What is this regarding?"
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full rounded-lg bg-background border border-border-primary px-4 py-3 text-sm text-foreground placeholder-text-muted outline-none focus:border-text-muted focus:ring-1 focus:ring-border-primary transition-all resize-y min-h-[120px] disabled:opacity-50"
          placeholder="Your message here..."
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        aria-label="Send inquiry via WhatsApp"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground text-background font-medium px-6 py-3 text-sm hover:opacity-90 transition-opacity disabled:opacity-50 w-full sm:w-auto self-start mt-2 cursor-pointer"
      >
        <FaWhatsapp className="text-lg flex-shrink-0" aria-hidden="true" />
        <span>{loading ? "Sending..." : "Send via WhatsApp"}</span>
      </button>
    </form>
  );
}
