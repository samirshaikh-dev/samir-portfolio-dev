import { AUTHOR_NAME, AUTHOR_EMAIL, AUTHOR_PHONE, APP_URL } from "@/lib/site-config";
import { renderEmailLayout, renderDualButtons, EmailAccent } from "./layout";

export interface ReplyEmailProps {
  name: string;
  replyText: string;
  originalSubject?: string;
  originalMessage?: string;
}

const ACCENT: EmailAccent = "neutral";

export function renderReplyEmail({
  name,
  replyText,
  originalSubject,
  originalMessage,
}: ReplyEmailProps): { html: string; text: string; emailSubject: string } {
  const emailSubject = originalSubject?.startsWith("Re:")
    ? originalSubject
    : `Re: ${originalSubject || "Your Inquiry to Samir Shaikh"}`;

  const greetingName = (name || "there").trim();
  const waNumber = AUTHOR_PHONE.replace(/[^0-9]/g, "");

  const escaped = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br />");

  const safeReply = escaped(replyText);
  const safeOriginalMessage = originalMessage ? escaped(originalMessage) : null;

  const body = `
    <h2 class="greeting">Hi ${greetingName},</h2>
    
    <div style="font-size: 14px; line-height: 1.7; color: #e4e4e7; margin: 0 0 24px; white-space: pre-wrap;">
      ${safeReply}
    </div>

    ${safeOriginalMessage ? `
    <div style="background-color: #16161b; border-left: 3px solid #3f3f46; border-radius: 0 8px 8px 0; padding: 12px 16px; margin: 20px 0; font-size: 12px; color: #a1a1aa; line-height: 1.6;">
      <span style="display: block; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #71717a; margin-bottom: 4px;">
        In reference to your message:
      </span>
      ${safeOriginalMessage}
    </div>
    ` : ""}

    <!-- Personal Signature Block -->
    <div style="border-top: 1px solid #27272a; padding-top: 22px; margin-top: 24px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align: top; padding-right: 14px;" width="44">
            <div style="width: 42px; height: 42px; border-radius: 21px; background: linear-gradient(135deg, #27272a 0%, #18181b 100%); border: 1px solid #3f3f46; text-align: center; line-height: 42px; color: #ffffff; font-weight: 700; font-size: 14px;">
              SS
            </div>
          </td>
          <td style="vertical-align: top;">
            <strong style="color: #ffffff; font-size: 14px; display: block;">${AUTHOR_NAME}</strong>
            <span style="font-size: 12px; color: #a1a1aa; display: block; margin-top: 1px;">AI Backend Engineer &bull; Forward Deployed Engineer</span>
            <span style="font-size: 12px; color: #71717a; display: block; margin-top: 2px;">
              <a href="mailto:${AUTHOR_EMAIL}" style="color: #a1a1aa; text-decoration: none;">${AUTHOR_EMAIL}</a> &bull; 
              <a href="https://wa.me/${waNumber}" style="color: #a1a1aa; text-decoration: none;">${AUTHOR_PHONE}</a>
            </span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Dual Action CTA -->
    ${renderDualButtons({
      primary: {
        href: `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi Samir, following up on your email response regarding ${originalSubject || "our project"}.`)}`,
        label: "Continue on WhatsApp",
        accent: ACCENT,
      },
      secondary: {
        href: `${APP_URL}/services`,
        label: "View Services & Stack",
      },
    })}

    <p style="font-size: 12px; color: #71717a; text-align: center; margin-top: 14px;">
      You can also reply directly to this email to continue our conversation.
    </p>
  `;

  const html = renderEmailLayout({
    badge: "Personal Response",
    headline: "Direct response from Samir",
    subhead: `In reply to "${originalSubject || "your project inquiry"}".`,
    accent: ACCENT,
    body,
    documentTitle: emailSubject,
  });

  const text = `Hi ${greetingName},

${replyText}

${originalMessage ? `\n--- In Reference To ---\n${originalMessage}\n-----------------------\n` : ""}

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