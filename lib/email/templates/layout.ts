import {
  AUTHOR_NAME,
  AUTHOR_PHONE,
  APP_URL,
  GITHUB_URL,
  LINKEDIN_URL,
} from "@/lib/site-config";

/**
 * Shared email shell for all transactional templates.
 *
 * Design source: `portfolio-theme.md` — dark editorial canvas (#0a0a0a),
 * hairline green borders, stepped brand header, and OpenGraph accent lines.
 * Emails must be 100% inline/table-based for client compatibility, so the
 * single `<style>` block here is static; accent-dependent tokens are applied
 * as inline styles from `EMAIL_ACCENTS`.
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
    accent: "#7c4fff",
    soft: "rgba(124, 79, 255, 0.12)",
    border: "rgba(124, 79, 255, 0.4)",
    buttonBg: "#7c4fff",
    buttonText: "#ffffff",
    strip: "linear-gradient(90deg, #7c4fff 0%, #3bb4ff 100%)",
  },
  neutral: {
    accent: "#ffffff",
    soft: "rgba(255, 255, 255, 0.06)",
    border: "rgba(255, 255, 255, 0.24)",
    buttonBg: "#ffffff",
    buttonText: "#09090b",
    strip: "linear-gradient(90deg, #ffffff 0%, #71717a 100%)",
  },
};

const BASE_CSS = `
  body {
    margin: 0;
    padding: 0;
    background-color: #0a0a0a;
    color: #e4e4e7;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
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
    background-color: #0a0a0a;
  }
  .main {
    max-width: 600px;
    border-radius: 14px;
    overflow: hidden;
  }
  .header {
    padding: 30px 32px 24px;
    border-bottom: 1px solid #1f1f23;
    background: linear-gradient(180deg, #19191d 0%, #121216 100%);
  }
  .brand {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #a1a1aa;
    margin-bottom: 18px;
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
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    border-radius: 9999px;
    margin-bottom: 14px;
  }
  .headline {
    font-size: 22px;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
    letter-spacing: -0.4px;
  }
  .subhead {
    font-size: 13px;
    color: #a1a1aa;
    margin: 7px 0 0;
    line-height: 1.5;
  }
  .content {
    padding: 28px 32px 24px;
  }
  .greeting {
    font-size: 17px;
    font-weight: 600;
    color: #fafafa;
    margin: 0 0 14px;
  }
  .paragraph {
    font-size: 14px;
    line-height: 1.7;
    color: #d4d4d8;
    margin: 0 0 16px;
  }
  .card {
    background-color: #17171b;
    border: 1px solid #1f1f23;
    border-radius: 10px;
    padding: 18px 20px;
    margin: 22px 0;
  }
  .card-title {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #a1a1aa;
    margin: 0 0 14px;
    border-bottom: 1px solid #1f1f23;
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
    min-width: 70px;
    font-weight: 500;
  }
  .card-value {
    color: #fafafa;
    word-break: break-word;
  }
  .message-box {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px dashed #26262b;
  }
  .step {
    padding: 12px 2px;
  }
  .step-num {
    display: inline-block;
    width: 22px;
    height: 22px;
    border-radius: 11px;
    font-size: 12px;
    font-weight: 700;
    text-align: center;
    line-height: 22px;
    margin-bottom: 6px;
  }
  .step-title {
    font-size: 13px;
    font-weight: 600;
    color: #fafafa;
  }
  .step-sub {
    font-size: 12px;
    color: #a1a1aa;
    line-height: 1.5;
  }
  .footer {
    padding: 22px 32px;
    background-color: #0c0c10;
    border-top: 1px solid #1f1f23;
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
 * Wraps template-specific body HTML in the full brand email shell.
 * Returns a complete standalone HTML document string.
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
          <table role="presentation" class="main" style="background-color: #121216; width: 100%; border: 1px solid ${theme.border};">
            <!-- Accent strip (OpenGraph brand line) -->
            <tr>
              <td bgcolor="${theme.accent}" style="height: 5px; font-size: 0; line-height: 0; background: ${theme.strip};">&nbsp;</td>
            </tr>

            <!-- Brand header -->
            <tr>
              <td class="header">
                <div class="brand">
                  <span class="brand-dot" style="background-color: ${theme.accent};"></span>
                  ${AUTHOR_NAME}
                </div>
                <span class="badge" style="color: ${theme.accent}; background-color: ${theme.soft}; border: 1px solid ${theme.border};">${badge}</span>
                <h1 class="headline">${headline}</h1>
                ${subhead ? `<p class="subhead">${subhead}</p>` : ""}
              </td>
            </tr>

            <!-- Template body -->
            <tr>
              <td class="content">${body}</td>
            </tr>

            <!-- Footer -->
            <tr>
              <td class="footer">
                <p style="margin: 0 0 10px;">
                  <a href="${APP_URL}">Portfolio</a> &bull;
                  <a href="${GITHUB_URL}">GitHub</a> &bull;
                  <a href="${LINKEDIN_URL}">LinkedIn</a> &bull;
                  <a href="https://wa.me/${waNumber}">WhatsApp</a>
                </p>
                <p style="margin: 0; color: #52525b; font-size: 11px;">
                  &copy; ${currentYear} ${AUTHOR_NAME}. All rights reserved.${footerReason}
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
 * Outlook-safe primary CTA button rendered as a table.
 */
export function renderCtaButton(opts: {
  href: string;
  label: string;
  accent: EmailAccent;
}): string {
  const theme = EMAIL_ACCENTS[opts.accent];
  return `<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 24px auto 6px;">
    <tr>
      <td align="center" bgcolor="${theme.buttonBg}" style="border-radius: 8px;">
        <a href="${opts.href}" target="_blank" style="display: inline-block; padding: 12px 28px; font-size: 13px; font-weight: 600; color: ${theme.buttonText}; text-decoration: none; border-radius: 8px;">${opts.label}</a>
      </td>
    </tr>
  </table>`;
}

/**
 * Outlook-safe secondary (outline) button rendered as a table.
 */
export function renderOutlineButton(opts: {
  href: string;
  label: string;
}): string {
  return `<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 10px auto 6px;">
    <tr>
      <td align="center" style="border: 1px solid #3f3f46; border-radius: 8px;">
        <a href="${opts.href}" target="_blank" style="display: inline-block; padding: 11px 24px; font-size: 13px; font-weight: 600; color: #d4d4d8; text-decoration: none; border-radius: 8px;">${opts.label}</a>
      </td>
    </tr>
  </table>`;
}