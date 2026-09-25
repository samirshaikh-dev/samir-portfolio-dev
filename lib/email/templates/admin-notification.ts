import { AUTHOR_NAME, APP_URL } from "@/lib/site-config";
import { renderEmailLayout, renderCtaButton, renderOutlineButton, EmailAccent } from "./layout";

export interface AdminNotificationEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  receivedAt?: Date;
}

const ACCENT: EmailAccent = "violet";

export function renderAdminNotificationEmail({
  name,
  email,
  subject,
  message,
  receivedAt = new Date(),
}: AdminNotificationEmailProps): { html: string; text: string; emailSubject: string } {
  const emailSubject = `[Portfolio Lead] New inquiry from ${name}: "${subject}"`;
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

  const replyMailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: ${subject}`)}`;

  const body = `
    <p class="paragraph">
      A new inquiry just landed on your portfolio. Review the details below and respond within <strong style="color: #fafafa;">24 business hours</strong> to keep the lead warm.
    </p>

    <table role="presentation" width="100%" style="background-color: #17171b; border: 1px solid #1f1f23; border-radius: 10px; padding: 6px 18px; margin: 22px 0;">
      <tr>
        <td style="padding: 12px 0; font-size: 13px; border-bottom: 1px solid #1f1f23;" width="110">
          <span style="color: #71717a; font-weight: 500;">From:</span>
        </td>
        <td style="padding: 12px 0; font-size: 13px; border-bottom: 1px solid #1f1f23;">
          <strong style="color: #fafafa;">${safeName}</strong>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0; font-size: 13px; border-bottom: 1px solid #1f1f23;" width="110">
          <span style="color: #71717a; font-weight: 500;">Email:</span>
        </td>
        <td style="padding: 12px 0; font-size: 13px; border-bottom: 1px solid #1f1f23;">
          <a href="mailto:${email}" style="color: #a78bfa; text-decoration: none;">${email}</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0; font-size: 13px; border-bottom: 1px solid #1f1f23;" width="110">
          <span style="color: #71717a; font-weight: 500;">Subject:</span>
        </td>
        <td style="padding: 12px 0; font-size: 13px; border-bottom: 1px solid #1f1f23;">
          <strong style="color: #fafafa;">${safeSubject}</strong>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 0; font-size: 13px;" width="110">
          <span style="color: #71717a; font-weight: 500;">Time:</span>
        </td>
        <td style="padding: 12px 0; font-size: 13px;">
          <span style="color: #d4d4d8;">${formattedTime} (IST)</span>
        </td>
      </tr>
    </table>

    <div class="card">
      <div class="card-title">Message content</div>
      <div style="font-size: 14px; line-height: 1.6; color: #e4e4e7;">
        ${safeMessage}
      </div>
    </div>

    ${renderCtaButton({ href: replyMailto, label: "Reply via Email", accent: ACCENT })}
    ${renderOutlineButton({ href: `${APP_URL}/admin/contacts`, label: "Open Admin Dashboard" })}
  `;

  const html = renderEmailLayout({
    badge: "New Contact Inquiry",
    headline: "You received a new portfolio message",
    subhead: "A fresh lead is waiting — respond within 24 business hours.",
    accent: ACCENT,
    body,
    reason: `Notification generated automatically by ${AUTHOR_NAME}'s Portfolio System.`,
    documentTitle: emailSubject,
  });

  const text = `[New Portfolio Inquiry]

A new inquiry just landed on your portfolio — respond within 24 business hours to keep the lead warm.

From: ${name}
Email: ${email}
Subject: ${subject}
Received: ${formattedTime} (IST)

--- Message ---
${message}
---------------

Reply directly to: ${email}
Admin dashboard: ${APP_URL}/admin/contacts
`;

  return { html, text, emailSubject };
}