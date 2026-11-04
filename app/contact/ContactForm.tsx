"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import { LuSend, LuCheck, LuCircleAlert } from "react-icons/lu";
import { AUTHOR_PHONE } from "@/lib/site-config";
import { analyticsEvents } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/trackEvent";

const INPUT_BASE =
  "w-full rounded-xl bg-background dark:bg-card-bg border border-border-primary px-4 py-3 text-sm text-foreground placeholder:text-text-muted outline-none transition-colors disabled:opacity-50 focus:border-foreground/40 focus:ring-1 focus:ring-foreground/20";

const PROJECT_TYPES = [
  "Full-Time / Remote Role (AI Backend / Full Stack)",
  "Autonomous AI Agents & Workflows",
  "Production RAG & Vector Search",
  "Voice AI & Realtime Agents",
  "Codebase Audit & Architecture Review ($450 Fixed)",
  "Cloud & Database Migration",
  "High-Throughput Backend APIs",
  "Database Architecture & Query Optimization",
  "Full-Stack Web Application Sprint",
  "High-Converting Business Web Platform",
  "Headless CMS Architecture & Migration",
  "DevOps & CI/CD Pipeline Modernization",
  "Security Hardening & Penetration Testing",
  "Emergency System Rescue & Stabilization",
  "AI / RAG Pipeline (SaaS Augmentation)",
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
  "Competitive Salary / Full-Time Role",
  "< $1,000",
  "$1,000 – $3,000",
  "$3,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Flexible / Let's Discuss",
];

const TIMELINES = [
  "Immediate / ASAP",
  "1-2 Weeks",
  "1-2 Months",
  "3-4 Months",
  "Flexible Timeline",
];

const SERVICE_ID_TO_DETAILS: Record<
  string,
  { title: string; projectType: string; defaultBudget: string; defaultTimeline: string }
> = {
  "ai-agents": {
    title: "Autonomous AI Agents & Workflows",
    projectType: "Autonomous AI Agents & Workflows",
    defaultBudget: "$1,000 – $3,000",
    defaultTimeline: "1-2 Months",
  },
  "rag-pipelines": {
    title: "Production RAG & Vector Search",
    projectType: "Production RAG & Vector Search",
    defaultBudget: "$1,000 – $3,000",
    defaultTimeline: "1-2 Months",
  },
  "voice-ai": {
    title: "Voice AI & Realtime Agents",
    projectType: "Voice AI & Realtime Agents",
    defaultBudget: "$3,000 – $5,000",
    defaultTimeline: "1-2 Months",
  },
  "codebase-audit": {
    title: "Codebase Audit & Architecture Review",
    projectType: "Codebase Audit & Architecture Review ($450 Fixed)",
    defaultBudget: "< $1,000",
    defaultTimeline: "Immediate / ASAP",
  },
  "cloud-migration": {
    title: "Cloud & Database Migration",
    projectType: "Cloud & Database Migration",
    defaultBudget: "$1,000 – $3,000",
    defaultTimeline: "1-2 Months",
  },
  "backend-api": {
    title: "High-Throughput Backend APIs",
    projectType: "High-Throughput Backend APIs",
    defaultBudget: "$1,000 – $3,000",
    defaultTimeline: "1-2 Months",
  },
  "database-optimization": {
    title: "Database Architecture & Query Optimization",
    projectType: "Database Architecture & Query Optimization",
    defaultBudget: "< $1,000",
    defaultTimeline: "Immediate / ASAP",
  },
  "full-stack-web": {
    title: "Full-Stack Web Application Sprint",
    projectType: "Full-Stack Web Application Sprint",
    defaultBudget: "$1,000 – $3,000",
    defaultTimeline: "1-2 Months",
  },
  "business-growth-web": {
    title: "High-Converting Business Web Platform",
    projectType: "High-Converting Business Web Platform",
    defaultBudget: "$1,000 – $3,000",
    defaultTimeline: "1-2 Months",
  },
  "cms-migration": {
    title: "Headless CMS Architecture & Migration",
    projectType: "Headless CMS Architecture & Migration",
    defaultBudget: "$1,000 – $3,000",
    defaultTimeline: "1-2 Months",
  },
  "devops-ci-cd": {
    title: "DevOps & CI/CD Pipeline Modernization",
    projectType: "DevOps & CI/CD Pipeline Modernization",
    defaultBudget: "< $1,000",
    defaultTimeline: "Immediate / ASAP",
  },
  "security-audit": {
    title: "Security Hardening & Penetration Testing",
    projectType: "Security Hardening & Penetration Testing",
    defaultBudget: "$1,000 – $3,000",
    defaultTimeline: "Immediate / ASAP",
  },
  "system-rescue": {
    title: "Emergency System Rescue & Stabilization",
    projectType: "Emergency System Rescue & Stabilization",
    defaultBudget: "$1,000 – $3,000",
    defaultTimeline: "Immediate / ASAP",
  },
};

function ContactFormInner() {
  const formRef = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [whatsappLink, setWhatsappLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [projectType, setProjectType] = useState<string>("");
  const [priority, setPriority] = useState<string>("Medium Priority");
  const [budget, setBudget] = useState<string>("");
  const [timeline, setTimeline] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [configuredServiceTitle, setConfiguredServiceTitle] = useState<string | null>(null);
  const [configuredScopeTier, setConfiguredScopeTier] = useState<string | null>(null);

  useEffect(() => {
    const intentParam = searchParams.get("intent");
    const serviceParam = searchParams.get("service");
    const scopeParam = searchParams.get("scope");

    if (intentParam === "full-time") {
      setConfiguredServiceTitle("Full-Time Remote Engineering Role");
      setConfiguredScopeTier("Dedicated Headcount");
      setProjectType("Full-Time / Remote Role (AI Backend / Full Stack)");
      setPriority("High Priority");
      setBudget("Competitive Salary / Full-Time Role");
      setTimeline("Immediate / ASAP");
      setMessage(
        "Hi Samir, I would like to discuss a full-time engineering role with our team.\n\n" +
        "• Target Role: AI Backend Engineer / AI SDE / FDE\n" +
        "• Company & Stage: [Company Name & Stage]\n" +
        "• Core Tech Stack: [e.g. Node.js, TypeScript, PostgreSQL, AI agents]\n" +
        "• Timezone & Location: [e.g. Remote Worldwide / US Overlap]\n" +
        "• Next Steps: [e.g. Intro screen or technical challenge]"
      );
    } else if (intentParam === "contract") {
      setConfiguredServiceTitle("Fixed-Scope Production Sprint");
      setConfiguredScopeTier("Milestone Contract");
      setProjectType("Autonomous AI Agents & Workflows");
      setPriority("Medium Priority");
      setBudget("$1,000 – $3,000");
      setTimeline("1-2 Weeks");
      setMessage(
        "Hi Samir, I would like to discuss a fixed-scope engineering sprint.\n\n" +
        "• Feature / Objective: [Briefly describe what you need built or audited]\n" +
        "• Existing Tech Stack: [e.g. Next.js, Node.js, PostgreSQL]\n" +
        "• Target Delivery Window: [e.g. 1-2 weeks]"
      );
    } else if (serviceParam && SERVICE_ID_TO_DETAILS[serviceParam]) {
      const info = SERVICE_ID_TO_DETAILS[serviceParam];
      const isCustom = scopeParam === "custom";

      setConfiguredServiceTitle(info.title);
      setConfiguredScopeTier(isCustom ? "Custom Scope / Retainer" : "Standard Sprint");
      setProjectType(info.projectType);
      setPriority(serviceParam === "system-rescue" ? "Urgent" : "Medium Priority");
      setBudget(isCustom ? "$5,000 – $10,000" : info.defaultBudget);
      setTimeline(isCustom ? "1-2 Months" : info.defaultTimeline);

      setMessage(
        `Hi Samir, I would like to discuss the ${info.title} (${isCustom ? "Custom Scope / Retainer" : "Standard Sprint"}).\n\n` +
        "• Current Tech Stack: [e.g. Next.js, Node.js, PostgreSQL]\n" +
        "• Target Launch Timeline: [e.g. 2-3 weeks]\n" +
        "• Key Objectives: [Briefly outline what you need built, audited, or rescued]"
      );
    }
  }, [searchParams]);

  function handleResetPreConfig() {
    setConfiguredServiceTitle(null);
    setConfiguredScopeTier(null);
    setProjectType("");
    setPriority("Medium Priority");
    setBudget("");
    setTimeline("");
    setMessage("");
  }

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

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(resData.error || "Failed to submit inquiry");
      }

      setSuccessMessage(
        "Inquiry received successfully! A confirmation email has been dispatched to your inbox. Samir will review your requirements and respond within 12–24 hours."
      );

      trackEvent(analyticsEvents.contactSubmitSuccess, {
        email_sent: Boolean(resData.emailSent),
        inquiry_type: data.projectType,
      });

      formRef.current?.reset();
      handleResetPreConfig();
    } catch {
      trackEvent(analyticsEvents.contactSubmitFallback, {
        inquiry_type: data.projectType,
      });
      setSuccessMessage(
        "Your inquiry details were compiled successfully! You can dispatch it directly to Samir via WhatsApp using the button below."
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 8l4 4 4-4" />
      </svg>
    </div>
  );

  return (
    <form ref={formRef} className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
      {/* Service / Intent Pre-configuration Indicator */}
      {configuredServiceTitle && (
        <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-border-primary bg-hover-bg text-xs text-foreground">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-accent-lime shrink-0" />
            <span className="truncate">
              Pre-configured: <strong className="font-bold">{configuredServiceTitle}</strong> ({configuredScopeTier})
            </span>
          </div>
          <button
            type="button"
            onClick={handleResetPreConfig}
            className="text-[11px] font-mono text-text-muted hover:text-foreground underline transition-colors cursor-pointer shrink-0"
          >
            Clear
          </button>
        </div>
      )}

      {/* Success Notification */}
      {successMessage && (
        <div
          role="status"
          aria-live="polite"
          className="rounded-xl border border-border-primary bg-background dark:bg-card-bg p-5 text-sm text-foreground flex flex-col gap-3"
        >
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-md bg-accent-lime text-[#0A0A0A] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              <LuCheck className="w-3.5 h-3.5 stroke-[3]" />
            </span>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">{successMessage}</p>
          </div>
          {whatsappLink && (
            <div className="pt-2 border-t border-border-primary/60 flex items-center gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-hover-bg border border-border-primary text-foreground text-xs font-bold px-4 py-2 hover:bg-hover-bg/80 transition-colors"
              >
                <FaWhatsapp className="text-[#25D366] text-sm shrink-0" aria-hidden="true" />
                <span>Continue on WhatsApp (Optional) &rarr;</span>
              </a>
            </div>
          )}
        </div>
      )}

      {/* Error Notification */}
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-xs sm:text-sm text-red-600 dark:text-red-400 flex items-center gap-2"
        >
          <LuCircleAlert className="w-4 h-4 shrink-0" />
          <span>{error}</span>
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

      {/* Row 2: Company + Project Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-company" className="block text-xs font-semibold text-text-secondary mb-1.5">
            Company / Organization <span className="text-text-muted font-normal text-[11px]">(Optional)</span>
          </label>
          <input
            type="text"
            id="contact-company"
            name="company"
            autoComplete="organization"
            className={INPUT_BASE}
            placeholder="Acme Corp"
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="contact-project-type" className="block text-xs font-semibold text-text-secondary mb-1.5">
            Inquiry Type <span className="text-accent-lime" aria-hidden="true">*</span>
          </label>
          <div className="relative">
            <select
              id="contact-project-type"
              name="projectType"
              required
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              disabled={loading}
              className={`${INPUT_BASE} appearance-none pr-10 cursor-pointer`}
            >
              <option value="" disabled className="text-text-muted bg-background dark:bg-[#18181b]">
                Select inquiry type
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
            Budget / Compensation <span className="text-accent-lime" aria-hidden="true">*</span>
          </label>
          <div className="relative">
            <select
              id="contact-budget"
              name="budget"
              required
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              disabled={loading}
              className={`${INPUT_BASE} appearance-none pr-10 cursor-pointer`}
            >
              <option value="" disabled className="text-text-muted bg-background dark:bg-[#18181b]">
                Select range
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
          Expected Timeline / Start Date <span className="text-accent-lime" aria-hidden="true">*</span>
        </label>
        <div className="relative">
          <select
            id="contact-timeline"
            name="timeline"
            required
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
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

      {/* Row 5: Description */}
      <div>
        <label htmlFor="contact-message" className="block text-xs font-semibold text-text-secondary mb-1.5">
          Project or Role Description <span className="text-accent-lime" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${INPUT_BASE} resize-y min-h-[130px] font-mono text-xs`}
          placeholder="Outline your requirements, tech stack, deliverables, or role expectations…"
          disabled={loading}
        />
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        <p className="text-[11px] text-text-muted leading-snug max-w-xs">
          Direct engineer communication. All details are kept confidential under mutual NDA upon request.
        </p>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-lime text-[#0A0A0A] font-bold px-6 py-3.5 text-xs sm:text-sm hover:bg-accent-lime/90 transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer whitespace-nowrap shrink-0"
        >
          <LuSend className="w-4 h-4 stroke-[2.5]" />
          <span>{loading ? "Transmitting…" : "Submit Inquiry"}</span>
        </button>
      </div>
    </form>
  );
}

function ContactFormFallback() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="h-10 rounded-xl bg-hover-bg border border-border-primary/50" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="h-10 rounded-xl bg-hover-bg border border-border-primary/50" />
        <div className="h-10 rounded-xl bg-hover-bg border border-border-primary/50" />
      </div>
      <div className="h-28 rounded-xl bg-hover-bg border border-border-primary/50" />
    </div>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={<ContactFormFallback />}>
      <ContactFormInner />
    </Suspense>
  );
}
