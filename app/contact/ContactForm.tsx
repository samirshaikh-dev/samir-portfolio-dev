"use client";

import { useState, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { AUTHOR_PHONE } from "@/lib/site-config";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loadingType, setLoadingType] = useState<"standard" | "whatsapp" | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function getFormData() {
    if (!formRef.current) return null;
    const formData = new FormData(formRef.current);
    return {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };
  }

  async function handleStandardSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;
    if (!formRef.current.reportValidity()) return;

    const data = getFormData();
    if (!data) return;

    setLoadingType("standard");
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setSuccessMessage("Message sent successfully! I'll get back to you soon.");
      formRef.current.reset();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoadingType(null);
    }
  }

  async function handleWhatsAppSubmit() {
    if (!formRef.current) return;
    if (!formRef.current.reportValidity()) return;

    const data = getFormData();
    if (!data) return;

    setLoadingType("whatsapp");
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

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSuccessMessage("Inquiry saved! Opening WhatsApp to message Samir directly...");
    } catch {
      // Still open WhatsApp even if DB logging encounters an issue
      setSuccessMessage("Opening WhatsApp to message Samir directly...");
    } finally {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      formRef.current.reset();
      setLoadingType(null);
    }
  }

  return (
    <form ref={formRef} className="flex flex-col gap-6" onSubmit={handleStandardSubmit}>
      {successMessage && (
        <div
          role="status"
          aria-live="polite"
          className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 text-sm text-green-800 dark:text-green-400 border border-green-200 dark:border-green-800"
        >
          {successMessage}
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
            disabled={Boolean(loadingType)}
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
            disabled={Boolean(loadingType)}
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
          disabled={Boolean(loadingType)}
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
          disabled={Boolean(loadingType)}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2">
        <button
          type="submit"
          disabled={Boolean(loadingType)}
          className="rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background hover:opacity-90 transition-opacity w-full sm:w-auto text-center disabled:opacity-50 cursor-pointer"
        >
          {loadingType === "standard" ? "Sending..." : "Send Message"}
        </button>

        <button
          type="button"
          onClick={handleWhatsAppSubmit}
          disabled={Boolean(loadingType)}
          aria-label="Send inquiry via WhatsApp"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#128C7E] hover:bg-[#0c6b60] dark:bg-[#25D366] dark:hover:bg-[#20ba59] dark:text-neutral-950 text-white font-medium px-6 py-3 text-sm transition-all shadow-sm hover:shadow-md disabled:opacity-50 w-full sm:w-auto cursor-pointer"
        >
          <FaWhatsapp className="text-lg flex-shrink-0" aria-hidden="true" />
          <span>{loadingType === "whatsapp" ? "Opening WhatsApp..." : "Send via WhatsApp"}</span>
        </button>
      </div>
    </form>
  );
}
