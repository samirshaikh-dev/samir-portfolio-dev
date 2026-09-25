import { AUTHOR_NAME, AUTHOR_PHONE, APP_URL } from "@/lib/site-config";
import { renderEmailLayout, renderCtaButton, EmailAccent } from "./layout";

export interface ConfirmationEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ACCENT: EmailAccent = "green";

export function renderConfirmationEmail({
  name,
  email,
  subject,
  message,
}: ConfirmationEmailProps): { html: string; text: string; emailSubject: string } {
  const emailSubject = `Confirmation: We received your message — "${subject}"`;
  const greetingName = (name || "there").trim();
  const currentYear = new Date().getFullYear();

  const escaped = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br />");

  const safeName = escaped(name);
  const safeSubject = escaped(subject);
  const safeMessage = escaped(message);
  const waNumber = AUTHOR_PHONE.replace(/[^0-9]/g, "");

  const body = `
    <h2 class="greeting">Hi ${safeName},</h2>
    <p class="paragraph">
      Thank you for reaching out. Your message has landed in my inbox and I've read it personally — this is just an automated confirmation that nothing was lost in transit.
    </p>

    <div class="card">
      <div class="card-title">Summary of your message</div>
      <div class="card-row">
        <span class="card-label">Subject:</span>
        <span class="card-value"><strong>${safeSubject}</strong></span>
      </div>
      <div class="card-row">
        <span class="card-label">Email:</span>
        <span class="card-value">${email}</span>
      </div>
      <div class="message-box">
        <span style="display: block; font-size: 12px; color: #71717a; margin-bottom: 8px;">Message:</span>
        <div style="background-color: #121216; padding: 12px; border-radius: 8px; border: 1px solid #1f1f23; font-size: 13px; line-height: 1.6; color: #e4e4e7;">
          ${safeMessage}
        </div>
      </div>
    </div>

    <p class="paragraph" style="font-weight: 600; color: #fafafa;">What happens next</p>
    <table role="presentation" width="100%">
      <tr>
        <td class="step" style="border-left: 2px solid rgba(74, 222, 128, 0.4); padding-left: 14px;">
          <span class="step-num" style="background: rgba(74, 222, 128, 0.12); color: #4ade80;">1</span>
          <div class="step-title">I reply within 24 business hours</div>
          <div class="step-sub">A personal response — never an autoresponder.</div>
        </td>
      </tr>
      <tr>
        <td class="step" style="border-left: 2px solid rgba(74, 222, 128, 0.4); padding-left: 14px;">
          <span class="step-num" style="background: rgba(74, 222, 128, 0.12); color: #4ade80;">2</span>
          <div class="step-title">Free 30-minute discovery call</div>
          <div class="step-sub">We align on your goals, timeline, and constraints.</div>
        </td>
      </tr>
      <tr>
        <td class="step" style="border-left: 2px solid rgba(74, 222, 128, 0.4); padding-left: 14px;">
          <span class="step-num" style="background: rgba(74, 222, 128, 0.12); color: #4ade80;">3</span>
          <div class="step-title">Fixed-price proposal within 48 hours</div>
          <div class="step-sub">A milestone-scoped quote — no commitment required.</div>
        </td>
      </tr>
    </table>

    ${renderCtaButton({ href: `${APP_URL}/services`, label: "View Services & Pricing", accent: ACCENT })}

    <p class="paragraph" style="margin-top: 20px;">
      If this is time-sensitive, reach me directly on <a href="https://wa.me/${waNumber}" style="color: #4ade80; text-decoration: none;">WhatsApp</a>.
    </p>
  `;

  const html = renderEmailLayout({
    badge: "Inquiry Received",
    headline: "We received your message",
    subhead: "Here's what happens next — a personal reply is on the way.",
    accent: ACCENT,
    body,
    reason: `You are receiving this email because a contact form inquiry was submitted with your email address (${email}).`,
    documentTitle: emailSubject,
  });

  const text = `Hi ${greetingName},

Thank you for reaching out through my portfolio (${APP_URL}).
This is an automated confirmation that your message has been safely received.

--- Your Inquiry Summary ---
Subject: ${subject}
Email: ${email}
Message:
${message}
----------------------------

What happens next:
1. I reply within 24 business hours (a personal response, never an autoresponder).
2. We do a free 30-minute discovery call to align on your goals and timeline.
3. You receive a fixed-price proposal within 48 hours — no commitment required.

If your inquiry is urgent, connect directly on WhatsApp: ${AUTHOR_PHONE} (https://wa.me/${waNumber})

Best regards,
${AUTHOR_NAME}
AI Backend Engineer | Forward Deployed Engineer
Portfolio: ${APP_URL}
Email: ${email}

&copy; ${currentYear} ${AUTHOR_NAME}`;

  return { html, text, emailSubject };
}