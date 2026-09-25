import { AUTHOR_NAME, AUTHOR_EMAIL, AUTHOR_PHONE, APP_URL } from "@/lib/site-config";
import { renderEmailLayout, renderCtaButton, EmailAccent } from "./layout";

export interface ReplyEmailProps {
  name: string;
  replyText: string;
  originalSubject?: string;
}

const ACCENT: EmailAccent = "neutral";

export function renderReplyEmail({
  name,
  replyText,
  originalSubject,
}: ReplyEmailProps): { html: string; text: string; emailSubject: string } {
  const emailSubject = originalSubject?.startsWith("Re:")
    ? originalSubject
    : `Re: ${originalSubject || "Your Inquiry to Samir Shaikh"}`;

  const greetingName = (name || "there").trim();

  const escaped = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br />");

  const safeReply = escaped(replyText);

  const body = `
    <h2 class="greeting">Hi ${greetingName},</h2>
    <div style="font-size: 14px; line-height: 1.7; color: #e4e4e7; margin: 0 0 24px;">
      ${safeReply}
    </div>

    <div style="border-top: 1px solid #1f1f23; padding-top: 20px;">
      <p style="font-size: 14px; color: #a1a1aa; margin: 0 0 16px;">
        Warm regards,<br />
        <strong style="color: #ffffff;">${AUTHOR_NAME}</strong><br />
        <span style="font-size: 12px; color: #71717a;">AI Backend Engineer &bull; Forward Deployed Engineer</span><br />
        <span style="font-size: 12px; color: #71717a;">${AUTHOR_EMAIL} | ${AUTHOR_PHONE}</span>
      </p>
    </div>

    ${renderCtaButton({ href: `${APP_URL}/services`, label: "View Services & Pricing", accent: ACCENT })}
  `;

  const html = renderEmailLayout({
    badge: "Personal Reply",
    headline: "Your inquiry — answered",
    subhead: `A direct response to "${originalSubject || "your inquiry"}".`,
    accent: ACCENT,
    body,
    documentTitle: emailSubject,
  });

  const text = `Hi ${greetingName},

${replyText}

---
Warm regards,
${AUTHOR_NAME}
AI Backend Engineer & Forward Deployed Engineer
Portfolio: ${APP_URL}
Email: ${AUTHOR_EMAIL}
Phone: ${AUTHOR_PHONE}
`;

  return { html, text, emailSubject };
}