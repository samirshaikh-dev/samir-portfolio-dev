import { AUTHOR_NAME, APP_URL } from "@/lib/site-config";
import { renderEmailLayout, renderDualButtons, EmailAccent } from "./layout";

export interface AdminNotificationEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  projectType?: string;
  priority?: string;
  budget?: string;
  timeline?: string;
  receivedAt?: Date;
}

const ACCENT: EmailAccent = "violet";

export function renderAdminNotificationEmail({
  name,
  email,
  subject,
  message,
  company,
  projectType,
  priority = "Medium Priority",
  budget,
  timeline,
  receivedAt = new Date(),
}: AdminNotificationEmailProps): { html: string; text: string; emailSubject: string } {
  const emailSubject = `[Portfolio Lead] ${priority.toUpperCase()}: ${name} (${projectType || subject})`;
  const formattedTime = receivedAt.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });

  const escaped = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br />");

  const safeName = escaped(name);
  const safeSubject = escaped(subject);
  const safeMessage = escaped(message);
  const safeCompany = company ? escaped(company) : null;
  const safeProjectType = projectType ? escaped(projectType) : null;
  const safePriority = priority ? escaped(priority) : "Medium Priority";
  const safeBudget = budget ? escaped(budget) : null;
  const safeTimeline = timeline ? escaped(timeline) : null;

  const isUrgent =
    safePriority.toLowerCase().includes("urgent") ||
    safePriority.toLowerCase().includes("high");

  const replyMailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(
    `Re: ${safeProjectType || safeSubject} - Samir Shaikh`
  )}&body=${encodeURIComponent(
    `Hi ${name},\n\nThank you for reaching out regarding ${safeProjectType || "your project"}.\n\n`
  )}`;

  const body = `
    <div style="background-color: ${isUrgent ? "rgba(248, 113, 113, 0.12)" : "rgba(167, 139, 250, 0.12)"}; border: 1px solid ${isUrgent ? "rgba(248, 113, 113, 0.35)" : "rgba(167, 139, 250, 0.35)"}; border-radius: 10px; padding: 12px 16px; margin-bottom: 22px;">
      <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.2px; color: ${isUrgent ? "#f87171" : "#a78bfa"}; display: block; margin-bottom: 2px;">
        ${safePriority} &bull; New Lead
      </span>
      <p style="margin: 0; font-size: 13px; color: #e4e4e7; line-height: 1.5;">
        Respond within <strong style="color: #ffffff;">24 business hours</strong> to maximize lead conversion and keep momentum high.
      </p>
    </div>

    <!-- Client Brief Table -->
    <table role="presentation" width="100%" style="background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 6px 20px; margin: 18px 0;">
      <tr>
        <td style="padding: 12px 0; font-size: 13px; border-bottom: 1px solid #27272a;" width="120">
          <span style="color: #71717a; font-weight: 600;">Client:</span>
        </td>
        <td style="padding: 12px 0; font-size: 13px; border-bottom: 1px solid #27272a;">
          <strong style="color: #ffffff;">${safeName}</strong>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0; font-size: 13px; border-bottom: 1px solid #27272a;" width="120">
          <span style="color: #71717a; font-weight: 600;">Email:</span>
        </td>
        <td style="padding: 12px 0; font-size: 13px; border-bottom: 1px solid #27272a;">
          <a href="mailto:${email}" style="color: #a78bfa; text-decoration: none; font-weight: 600;">${email}</a>
        </td>
      </tr>
      ${safeCompany ? `
      <tr>
        <td style="padding: 12px 0; font-size: 13px; border-bottom: 1px solid #27272a;" width="120">
          <span style="color: #71717a; font-weight: 600;">Company:</span>
        </td>
        <td style="padding: 12px 0; font-size: 13px; border-bottom: 1px solid #27272a;">
          <strong style="color: #ffffff;">${safeCompany}</strong>
        </td>
      </tr>` : ""}
      ${safeProjectType ? `
      <tr>
        <td style="padding: 12px 0; font-size: 13px; border-bottom: 1px solid #27272a;" width="120">
          <span style="color: #71717a; font-weight: 600;">Project Type:</span>
        </td>
        <td style="padding: 12px 0; font-size: 13px; border-bottom: 1px solid #27272a;">
          <span style="color: #ffffff; font-weight: 700;">${safeProjectType}</span>
        </td>
      </tr>` : ""}
      ${safeBudget ? `
      <tr>
        <td style="padding: 12px 0; font-size: 13px; border-bottom: 1px solid #27272a;" width="120">
          <span style="color: #71717a; font-weight: 600;">Budget Tier:</span>
        </td>
        <td style="padding: 12px 0; font-size: 13px; border-bottom: 1px solid #27272a;">
          <strong style="color: #34d399; font-size: 14px;">${safeBudget}</strong>
        </td>
      </tr>` : ""}
      ${safeTimeline ? `
      <tr>
        <td style="padding: 12px 0; font-size: 13px; border-bottom: 1px solid #27272a;" width="120">
          <span style="color: #71717a; font-weight: 600;">Timeline:</span>
        </td>
        <td style="padding: 12px 0; font-size: 13px; border-bottom: 1px solid #27272a;">
          <span style="color: #d4d4d8;">${safeTimeline}</span>
        </td>
      </tr>` : ""}
      <tr>
        <td style="padding: 12px 0; font-size: 13px; border-bottom: 1px solid #27272a;" width="120">
          <span style="color: #71717a; font-weight: 600;">Subject:</span>
        </td>
        <td style="padding: 12px 0; font-size: 13px; border-bottom: 1px solid #27272a;">
          <span style="color: #e4e4e7;">${safeSubject}</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0; font-size: 13px;" width="120">
          <span style="color: #71717a; font-weight: 600;">Received:</span>
        </td>
        <td style="padding: 12px 0; font-size: 13px;">
          <span style="color: #a1a1aa;">${formattedTime} (IST)</span>
        </td>
      </tr>
    </table>

    <!-- Project Description Box -->
    <div class="card">
      <div class="card-title">Project Description</div>
      <div style="font-size: 14px; line-height: 1.7; color: #e4e4e7;">
        ${safeMessage}
      </div>
    </div>

    <!-- Quick Action Buttons -->
    ${renderDualButtons({
      primary: {
        href: replyMailto,
        label: "Reply to Lead",
        accent: ACCENT,
      },
      secondary: {
        href: `${APP_URL}/admin/contact`,
        label: "Open in Admin CMS",
      },
    })}
  `;

  const html = renderEmailLayout({
    badge: "Portfolio Lead",
    headline: "New project inquiry received",
    subhead: `Inquiry from ${name} (${safeProjectType || "General"}).`,
    accent: ACCENT,
    body,
    reason: `Notification generated automatically by ${AUTHOR_NAME}'s Portfolio Engine.`,
    documentTitle: emailSubject,
  });

  const text = `[New Portfolio Lead]

From: ${name}
Email: ${email}
${company ? `Company: ${company}\n` : ""}${projectType ? `Project Type: ${projectType}\n` : ""}Priority: ${priority}
Budget Tier: ${budget || "Not Specified"}
Timeline: ${timeline || "Not Specified"}
Subject: ${subject}
Received: ${formattedTime} (IST)

--- Project Description ---
${message}
---------------------------

Reply via Email: ${email}
Admin CMS: ${APP_URL}/admin/contact
`;

  return { html, text, emailSubject };
}