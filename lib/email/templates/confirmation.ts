import { AUTHOR_NAME, AUTHOR_EMAIL, AUTHOR_PHONE, APP_URL } from "@/lib/site-config";

export interface ConfirmationEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function renderConfirmationEmail({
  name,
  email,
  subject,
  message,
}: ConfirmationEmailProps): { html: string; text: string; emailSubject: string } {
  const emailSubject = `Confirmation: We received your message — "${subject}"`;
  const sanitizedName = name || "there";
  const currentYear = new Date().getFullYear();

  const formattedMessage = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br />");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${emailSubject}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #09090b;
      color: #ededed;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    table {
      border-spacing: 0;
      border-collapse: collapse;
    }
    td {
      padding: 0;
    }
    img {
      border: 0;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #09090b;
      padding-bottom: 40px;
    }
    .main {
      background-color: #121215;
      margin: 0 auto;
      width: 100%;
      max-width: 600px;
      border: 1px solid #27272a;
      border-radius: 12px;
      overflow: hidden;
    }
    .header {
      padding: 32px 32px 24px;
      border-bottom: 1px solid #27272a;
      background: linear-gradient(180deg, #18181b 0%, #121215 100%);
    }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: #10b981;
      background-color: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.2);
      border-radius: 9999px;
      margin-bottom: 12px;
    }
    .brand-title {
      font-size: 22px;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 4px;
      letter-spacing: -0.3px;
    }
    .brand-sub {
      font-size: 13px;
      color: #a1a1aa;
      margin: 0;
    }
    .content {
      padding: 32px;
    }
    .greeting {
      font-size: 18px;
      font-weight: 600;
      color: #fafafa;
      margin: 0 0 14px;
    }
    .paragraph {
      font-size: 14px;
      line-height: 1.6;
      color: #d4d4d8;
      margin: 0 0 20px;
    }
    .inquiry-card {
      background-color: #18181b;
      border: 1px solid #27272a;
      border-radius: 8px;
      padding: 20px;
      margin: 24px 0;
    }
    .card-title {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #a1a1aa;
      margin: 0 0 12px;
      border-bottom: 1px solid #27272a;
      padding-bottom: 8px;
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
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px dashed #27272a;
      font-size: 13px;
      line-height: 1.5;
      color: #e4e4e7;
    }
    .cta-btn {
      display: inline-block;
      background-color: #ffffff;
      color: #09090b !important;
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      padding: 10px 22px;
      border-radius: 6px;
      margin: 10px 0 20px;
    }
    .footer {
      padding: 24px 32px;
      background-color: #0c0c0e;
      border-top: 1px solid #27272a;
      text-align: center;
      font-size: 12px;
      color: #71717a;
      line-height: 1.6;
    }
    .footer a {
      color: #a1a1aa;
      text-decoration: none;
      margin: 0 8px;
    }
    .footer a:hover {
      color: #ffffff;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <table role="presentation" width="100%">
      <tr>
        <td align="center" style="padding: 24px 12px;">
          <table role="presentation" class="main">
            <!-- Header -->
            <tr>
              <td class="header">
                <span class="badge">Inquiry Received</span>
                <h1 class="brand-title">${AUTHOR_NAME}</h1>
                <p class="brand-sub">AI Backend Engineer &bull; Forward Deployed Engineer</p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td class="content">
                <h2 class="greeting">Hi ${sanitizedName},</h2>
                <p class="paragraph">
                  Thank you for reaching out through my portfolio website. This is an automated confirmation to let you know that your message has been safely delivered to my inbox.
                </p>
                <p class="paragraph">
                  I review inquiries personally and will respond as soon as possible, typically within <strong>24 business hours</strong>.
                </p>

                <!-- Inquiry Summary Card -->
                <div class="inquiry-card">
                  <div class="card-title">Summary of your message</div>
                  <div class="card-row">
                    <span class="card-label">Subject:</span>
                    <span class="card-value"><strong>${subject}</strong></span>
                  </div>
                  <div class="card-row">
                    <span class="card-label">Email:</span>
                    <span class="card-value">${email}</span>
                  </div>
                  <div class="message-box">
                    <span class="card-label" style="display:block; margin-bottom: 6px;">Message Excerpt:</span>
                    <div style="background-color: #121215; padding: 12px; border-radius: 6px; border: 1px solid #27272a;">
                      ${formattedMessage}
                    </div>
                  </div>
                </div>

                <p class="paragraph">
                  If this is time-sensitive or you prefer to chat directly, feel free to connect via WhatsApp or check out my recent engineering projects on my portfolio.
                </p>

                <div style="text-align: center; margin: 24px 0 10px;">
                  <a href="${APP_URL}" target="_blank" class="cta-btn">View Portfolio & Projects</a>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td class="footer">
                <p style="margin: 0 0 10px;">
                  <a href="${APP_URL}">Portfolio</a> &bull;
                  <a href="https://github.com/samirshaikh-dev">GitHub</a> &bull;
                  <a href="https://linkedin.com">LinkedIn</a> &bull;
                  <a href="https://wa.me/${AUTHOR_PHONE.replace(/[^0-9]/g, "")}">WhatsApp</a>
                </p>
                <p style="margin: 0; color: #52525b; font-size: 11px;">
                  &copy; ${currentYear} ${AUTHOR_NAME}. All rights reserved.<br />
                  You are receiving this email because a contact form inquiry was submitted with your email address (${email}).
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

  const text = `Hi ${sanitizedName},

Thank you for reaching out through my portfolio website (${APP_URL}).
This is an automated confirmation to let you know that your message has been safely received.

--- Your Inquiry Summary ---
Subject: ${subject}
Email: ${email}
Message:
${message}
----------------------------

I review inquiries personally and will get back to you as soon as possible (usually within 24 business hours).

If your inquiry is urgent, feel free to connect directly via WhatsApp at ${AUTHOR_PHONE} or reply to this email.

Best regards,
${AUTHOR_NAME}
AI Backend Engineer | Forward Deployed Engineer
Portfolio: ${APP_URL}
Email: ${AUTHOR_EMAIL}
`;

  return { html, text, emailSubject };
}
