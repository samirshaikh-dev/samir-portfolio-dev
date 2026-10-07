import {
  AUTHOR_NAME,
  AUTHOR_EMAIL,
  AUTHOR_PHONE,
  APP_URL,
  GITHUB_URL,
  LINKEDIN_URL,
} from "@/lib/site-config";

/**
 * Shared email shell for all transactional & client-facing templates.
 *
 * Design: High-contrast client-centric editorial aesthetic with
 * bulletproof email-safe tables, clean typography, rounded cards,
 * and prominent reassurance signals.
 */

export type EmailAccent = "green" | "violet" | "neutral";

export interface EmailAccentTheme {
  accent: string;
  soft: string;
  border: string;
  buttonBg: string;
  buttonText: string;
  strip: string;
}

export const EMAIL_ACCENTS: Record<EmailAccent, EmailAccentTheme> = {
  green: {
    accent: "#4ade80",
    soft: "rgba(74, 222, 128, 0.12)",
    border: "rgba(74, 222, 128, 0.35)",
    buttonBg: "#4ade80",
    buttonText: "#09090b",
    strip: "linear-gradient(90deg, #4ade80 0%, #22c55e 100%)",
  },
  violet: {
    accent: "#a78bfa",
    soft: "rgba(167, 139, 250, 0.15)",
    border: "rgba(167, 139, 250, 0.35)",
    buttonBg: "#8b5cf6",
    buttonText: "#ffffff",
    strip: "linear-gradient(90deg, #8b5cf6 0%, #3b82f6 100%)",
  },
  neutral: {
    accent: "#ffffff",
    soft: "rgba(255, 255, 255, 0.08)",
    border: "rgba(255, 255, 255, 0.25)",
    buttonBg: "#ffffff",
    buttonText: "#09090b",
    strip: "linear-gradient(90deg, #ffffff 0%, #71717a 100%)",
  },
};

const BASE_CSS = `
  body {
    margin: 0;
    padding: 0;
    background-color: #09090b;
    color: #e4e4e7;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
  }
  table {
    border-spacing: 0;
    border-collapse: collapse;
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt;
  }
  td {
    padding: 0;
    mso-line-height-rule: exactly;
  }
  img {
    border: 0;
    line-height: 100%;
    outline: none;
    text-decoration: none;
  }
  a {
    color: inherit;
  }
  .wrapper {
    width: 100%;
    table-layout: fixed;
    background-color: #09090b;
  }
  .main {
    max-width: 600px;
    border-radius: 16px;
    overflow: hidden;
  }
  .header {
    padding: 32px 32px 26px;
    border-bottom: 1px solid #27272a;
    background: linear-gradient(180deg, #18181b 0%, #121216 100%);
  }
  .brand-row {
    margin-bottom: 20px;
  }
  .brand-title {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #f4f4f5;
  }
  .brand-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    margin-right: 8px;
    vertical-align: middle;
  }
  .badge {
    display: inline-block;
    padding: 5px 12px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    border-radius: 9999px;
    margin-bottom: 12px;
  }
  .headline {
    font-size: 22px;
    font-weight: 800;
    color: #ffffff;
    margin: 0;
    letter-spacing: -0.4px;
    line-height: 1.3;
  }
  .subhead {
    font-size: 13px;
    color: #a1a1aa;
    margin: 8px 0 0;
    line-height: 1.5;
  }
  .content {
    padding: 32px;
    background-color: #121216;
  }
  .greeting {
    font-size: 18px;
    font-weight: 700;
    color: #fafafa;
    margin: 0 0 14px;
  }
  .paragraph {
    font-size: 14px;
    line-height: 1.7;
    color: #d4d4d8;
    margin: 0 0 18px;
  }
  .card {
    background-color: #18181b;
    border: 1px solid #27272a;
    border-radius: 12px;
    padding: 20px 22px;
    margin: 22px 0;
  }
  .card-title {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #a1a1aa;
    margin: 0 0 14px;
    border-bottom: 1px solid #27272a;
    padding-bottom: 10px;
  }
  .card-row {
    margin-bottom: 10px;
    font-size: 13px;
  }
  .card-row:last-child {
    margin-bottom: 0;
  }
  .card-label {
    color: #71717a;
    display: inline-block;
    min-width: 90px;
    font-weight: 500;
  }
  .card-value {
    color: #fafafa;
    word-break: break-word;
  }
  .message-box {
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px dashed #27272a;
  }
  .step-table {
    margin: 18px 0;
  }
  .step {
    padding: 10px 0 10px 14px;
  }
  .step-num {
    display: inline-block;
    width: 22px;
    height: 22px;
    border-radius: 11px;
    font-size: 12px;
    font-weight: 800;
    text-align: center;
    line-height: 22px;
    margin-bottom: 4px;
  }
  .step-title {
    font-size: 13px;
    font-weight: 700;
    color: #fafafa;
  }
  .step-sub {
    font-size: 12px;
    color: #a1a1aa;
    line-height: 1.5;
  }
  .guarantees {
    background-color: #141418;
    border: 1px solid #222226;
    border-radius: 10px;
    padding: 14px 16px;
    margin: 24px 0 8px;
  }
  .footer {
    padding: 24px 32px;
    background-color: #0d0d10;
    border-top: 1px solid #27272a;
    text-align: center;
    font-size: 11px;
    color: #71717a;
    line-height: 1.7;
  }
  .footer a {
    color: #a1a1aa;
    text-decoration: none;
    margin: 0 7px;
  }
`;

export interface EmailLayoutOptions {
  badge: string;
  headline: string;
  subhead?: string;
  accent: EmailAccent;
  body: string;
  reason?: string;
  documentTitle: string;
}

/**
 * Wraps template-specific body HTML in the full client-centric brand email shell.
 */
export function renderEmailLayout({
  badge,
  headline,
  subhead,
  accent,
  body,
  reason,
  documentTitle,
}: EmailLayoutOptions): string {
  const theme = EMAIL_ACCENTS[accent];
  const currentYear = new Date().getFullYear();
  const waNumber = AUTHOR_PHONE.replace(/[^0-9]/g, "");

  const footerReason = reason ? `<br />${reason}` : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${documentTitle}</title>
  <style>${BASE_CSS}</style>
</head>
<body>
  <div class="wrapper">
    <table role="presentation" width="100%">
      <tr>
        <td align="center" style="padding: 24px 12px 40px;">
          <table role="presentation" class="main" style="background-color: #121216; width: 100%; border: 1px solid ${theme.border}; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <!-- Accent Top Strip -->
            <tr>
              <td bgcolor="${theme.accent}" style="height: 4px; font-size: 0; line-height: 0; background: ${theme.strip};">&nbsp;</td>
            </tr>

            <!-- Header Section -->
            <tr>
              <td class="header">
                <div class="brand-row">
                  <span class="brand-dot" style="background-color: ${theme.accent};"></span>
                  <span class="brand-title">${AUTHOR_NAME}</span>
                  <span style="color: #71717a; font-size: 12px; margin-left: 6px;">&bull; AI Developer</span>
                </div>
                <span class="badge" style="color: ${theme.accent}; background-color: ${theme.soft}; border: 1px solid ${theme.border};">${badge}</span>
                <h1 class="headline">${headline}</h1>
                ${subhead ? `<p class="subhead">${subhead}</p>` : ""}
              </td>
            </tr>

            <!-- Content Body -->
            <tr>
              <td class="content">${body}</td>
            </tr>

            <!-- Footer -->
            <tr>
              <td class="footer">
                <p style="margin: 0 0 8px;">
                  <a href="${APP_URL}">Portfolio</a> &bull;
                  <a href="${GITHUB_URL}">GitHub</a> &bull;
                  <a href="${LINKEDIN_URL}">LinkedIn</a> &bull;
                  <a href="https://wa.me/${waNumber}">WhatsApp</a>
                </p>
                <p style="margin: 0; color: #52525b; font-size: 11px;">
                  &copy; ${currentYear} ${AUTHOR_NAME}. All rights reserved.
                  ${footerReason}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;
}

/**
 * Outlook-safe primary CTA button.
 */
export function renderCtaButton(opts: {
  href: string;
  label: string;
  accent: EmailAccent;
}): string {
  const theme = EMAIL_ACCENTS[opts.accent];
  return `<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 22px auto 8px;">
    <tr>
      <td align="center" bgcolor="${theme.buttonBg}" style="border-radius: 9999px;">
        <a href="${opts.href}" target="_blank" style="display: inline-block; padding: 13px 32px; font-size: 13px; font-weight: 700; color: ${theme.buttonText}; text-decoration: none; border-radius: 9999px; letter-spacing: 0.2px;">${opts.label} &rarr;</a>
      </td>
    </tr>
  </table>`;
}

/**
 * Outlook-safe secondary (outline) button.
 */
export function renderOutlineButton(opts: {
  href: string;
  label: string;
}): string {
  return `<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 8px auto 6px;">
    <tr>
      <td align="center" style="border: 1px solid #3f3f46; border-radius: 9999px; background-color: #18181b;">
        <a href="${opts.href}" target="_blank" style="display: inline-block; padding: 11px 26px; font-size: 13px; font-weight: 600; color: #d4d4d8; text-decoration: none; border-radius: 9999px;">${opts.label}</a>
      </td>
    </tr>
  </table>`;
}

/**
 * Renders dual action buttons side-by-side or stacked cleanly.
 */
export function renderDualButtons(opts: {
  primary: { href: string; label: string; accent: EmailAccent };
  secondary: { href: string; label: string };
}): string {
  const theme = EMAIL_ACCENTS[opts.primary.accent];
  return `
    <table role="presentation" width="100%" style="margin: 22px 0 10px;">
      <tr>
        <td align="center">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" bgcolor="${theme.buttonBg}" style="border-radius: 9999px; padding: 0 4px;">
                <a href="${opts.primary.href}" target="_blank" style="display: inline-block; padding: 12px 28px; font-size: 13px; font-weight: 700; color: ${theme.buttonText}; text-decoration: none; border-radius: 9999px;">${opts.primary.label} &rarr;</a>
              </td>
              <td width="10"></td>
              <td align="center" style="border: 1px solid #3f3f46; border-radius: 9999px; background-color: #18181b; padding: 0 4px;">
                <a href="${opts.secondary.href}" target="_blank" style="display: inline-block; padding: 11px 24px; font-size: 13px; font-weight: 600; color: #d4d4d8; text-decoration: none; border-radius: 9999px;">${opts.secondary.label}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

/**
 * Trust & Guarantees section for client-facing reassurance.
 */
export function renderGuaranteesBox(): string {
  return `
    <table role="presentation" width="100%" style="background-color: #151519; border: 1px solid #232328; border-radius: 10px; margin: 24px 0 10px; padding: 14px 16px;">
      <tr>
        <td>
          <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #71717a; margin-bottom: 8px;">
            Client Assurance &bull; Protected Process
          </div>
          <table role="presentation" width="100%">
            <tr>
              <td style="padding: 4px 0; font-size: 12px; color: #d4d4d8;">
                <span style="color: #4ade80; margin-right: 6px; font-weight: bold;">✓</span> <strong>Mutual NDA:</strong> Signed before code or proprietary doc reviews
              </td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-size: 12px; color: #d4d4d8;">
                <span style="color: #4ade80; margin-right: 6px; font-weight: bold;">✓</span> <strong>Fixed-Price Quotes:</strong> Milestones with protected delivery timelines
              </td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-size: 12px; color: #d4d4d8;">
                <span style="color: #4ade80; margin-right: 6px; font-weight: bold;">✓</span> <strong>30-Day Warranty:</strong> Post-launch bug fixes &amp; deployment stability
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}