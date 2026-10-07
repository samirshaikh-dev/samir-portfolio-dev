import {
  AUTHOR_NAME,
  AUTHOR_PHONE,
  APP_URL,
} from "@/lib/site-config";
import {
  renderEmailLayout,
  renderDualButtons,
  renderGuaranteesBox,
  EmailAccent,
} from "./layout";

export interface ConfirmationEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  projectType?: string;
  priority?: string;
  budget?: string;
  timeline?: string;
}

const ACCENT: EmailAccent = "green";

export function renderConfirmationEmail({
  name,
  email,
  subject,
  message,
  company,
  projectType,
  priority = "Medium Priority",
  budget,
  timeline,
}: ConfirmationEmailProps): { html: string; text: string; emailSubject: string } {
  const emailSubject = `Inquiry Confirmed: ${projectType || subject || "Project Scope Received"}`;
  const greetingName = (name || "there").trim();
  const currentYear = new Date().getFullYear();

  const escaped = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br />");

  const safeName = escaped(name);
  const safeMessage = escaped(message);
  const safeCompany = company ? escaped(company) : null;
  const safeProjectType = projectType ? escaped(projectType) : "Custom Engineering";
  const safePriority = priority ? escaped(priority) : "Medium Priority";
  const safeBudget = budget ? escaped(budget) : "To Be Discussed";
  const safeTimeline = timeline ? escaped(timeline) : "Flexible";
  const waNumber = AUTHOR_PHONE.replace(/[^0-9]/g, "");

  const isUrgent =
    safePriority.toLowerCase().includes("urgent") ||
    safePriority.toLowerCase().includes("asap");

  const priorityColor = isUrgent
    ? "#f87171"
    : safePriority.toLowerCase().includes("high")
    ? "#fbbf24"
    : "#4ade80";

  const priorityBg = isUrgent
    ? "rgba(248, 113, 113, 0.12)"
    : safePriority.toLowerCase().includes("high")
    ? "rgba(251, 191, 36, 0.12)"
    : "rgba(74, 222, 128, 0.12)";

  const body = `
    <h2 class="greeting">Hi ${safeName},</h2>
    <p class="paragraph">
      Thank you for reaching out. Your project brief has landed in my inbox and is queued for personal review. I personally evaluate every technical inquiry within <strong style="color: #ffffff;">24 business hours</strong>.
    </p>

    <!-- Scope Receipt Card -->
    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #27272a; padding-bottom: 12px; margin-bottom: 14px;">
        <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #a1a1aa;">
          Project Brief Receipt
        </span>
        <span style="font-size: 11px; font-weight: 700; color: ${priorityColor}; background-color: ${priorityBg}; padding: 3px 10px; border-radius: 9999px;">
          ${safePriority}
        </span>
      </div>

      <table role="presentation" width="100%">
        <tr>
          <td style="padding: 6px 0; font-size: 13px; color: #71717a; width: 110px;">Project Type:</td>
          <td style="padding: 6px 0; font-size: 13px; color: #ffffff; font-weight: 600;">${safeProjectType}</td>
        </tr>
        ${safeCompany ? `
        <tr>
          <td style="padding: 6px 0; font-size: 13px; color: #71717a; width: 110px;">Company:</td>
          <td style="padding: 6px 0; font-size: 13px; color: #e4e4e7;">${safeCompany}</td>
        </tr>` : ""}
        <tr>
          <td style="padding: 6px 0; font-size: 13px; color: #71717a; width: 110px;">Budget Tier:</td>
          <td style="padding: 6px 0; font-size: 13px; color: #4ade80; font-weight: 700;">${safeBudget}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-size: 13px; color: #71717a; width: 110px;">Timeline:</td>
          <td style="padding: 6px 0; font-size: 13px; color: #e4e4e7;">${safeTimeline}</td>
        </tr>
      </table>

      <div class="message-box">
        <span style="display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #71717a; margin-bottom: 8px;">
          Your Project Description
        </span>
        <div style="background-color: #121216; padding: 14px; border-radius: 8px; border: 1px solid #232328; font-size: 13px; line-height: 1.6; color: #e4e4e7;">
          ${safeMessage}
        </div>
      </div>
    </div>

    <!-- What Happens Next Roadmap -->
    <div style="margin-top: 26px;">
      <p style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.2px; color: #f4f4f5; margin: 0 0 12px;">
        What Happens Next
      </p>

      <table role="presentation" width="100%" class="step-table">
        <tr>
          <td class="step" style="border-left: 2px solid #4ade80;">
            <span class="step-num" style="background: rgba(74, 222, 128, 0.15); color: #4ade80;">1</span>
            <div class="step-title">Personal Review within 24 Hours</div>
            <div class="step-sub">I analyze your stack requirements and prepare preliminary architecture notes.</div>
          </td>
        </tr>
        <tr>
          <td class="step" style="border-left: 2px solid #4ade80; padding-top: 14px;">
            <span class="step-num" style="background: rgba(74, 222, 128, 0.15); color: #4ade80;">2</span>
            <div class="step-title">Free 30-Minute Discovery Call</div>
            <div class="step-sub">We align on data pipelines, performance goals, edge cases, and scope.</div>
          </td>
        </tr>
        <tr>
          <td class="step" style="border-left: 2px solid #4ade80; padding-top: 14px;">
            <span class="step-num" style="background: rgba(74, 222, 128, 0.15); color: #4ade80;">3</span>
            <div class="step-title">Fixed-Price Milestone Proposal</div>
            <div class="step-sub">You receive an itemized roadmap with clear milestones and cost certainty.</div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Client Trust Box -->
    ${renderGuaranteesBox()}

    <!-- Dual Action CTA -->
    ${renderDualButtons({
      primary: {
        href: `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi Samir, I submitted an inquiry for "${safeProjectType}" and wanted to fast-track our discussion.`)}`,
        label: "Fast-Track on WhatsApp",
        accent: ACCENT,
      },
      secondary: {
        href: `${APP_URL}/projects`,
        label: "Explore Case Studies",
      },
    })}

    <p class="paragraph" style="font-size: 12px; color: #71717a; text-align: center; margin-top: 16px;">
      Prefer email? Simply reply to this thread anytime — it connects directly to my personal desk.
    </p>
  `;

  const html = renderEmailLayout({
    badge: "Inquiry Confirmed",
    headline: "Your project scope has been received",
    subhead: "Here is your confirmation receipt and roadmap for next steps.",
    accent: ACCENT,
    body,
    reason: `You are receiving this email because a contact form inquiry was submitted with your email address (${email}).`,
    documentTitle: emailSubject,
  });

  const text = `Hi ${greetingName},

Thank you for reaching out through my portfolio (${APP_URL}).
Your project brief has been received and is queued for review within 24 business hours.

--- Project Brief Receipt ---
Project Type: ${projectType || "Custom Engineering"}
Priority: ${priority}
Budget Range: ${budget || "To Be Discussed"}
Timeline: ${timeline || "Flexible"}
${company ? `Company: ${company}\n` : ""}
Project Description:
${message}
-----------------------------

What Happens Next:
1. Personal Review (Within 24h) — I analyze your requirements and architectural constraints.
2. Free 30-Minute Discovery Call — We align on data pipelines, milestones, and deliverables.
3. Fixed-Price Milestone Proposal — You receive a clear, guaranteed quote with zero surprise scope creep.

Client Guarantees:
- Mutual NDA signed before code review
- Fixed-price quotes with protected timelines
- 30-day post-launch warranty

For urgent inquiries, connect directly on WhatsApp: ${AUTHOR_PHONE} (https://wa.me/${waNumber})

Warm regards,
${AUTHOR_NAME}
AI Backend Engineer & Forward Deployed Engineer
Portfolio: ${APP_URL}

© ${currentYear} ${AUTHOR_NAME}`;

  return { html, text, emailSubject };
}