import { AUTHOR_NAME, APP_URL } from "@/lib/site-config";

export interface AdminNotificationEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  receivedAt?: Date;
}

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

  const formattedMessage = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br />");

  const replyMailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: ${subject}`)}`;

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
    }
    table {
      border-spacing: 0;
      border-collapse: collapse;
    }
    .wrapper {
      width: 100%;
      background-color: #09090b;
      padding: 24px 12px 40px;
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
      padding: 24px 32px;
      border-bottom: 1px solid #27272a;
      background: linear-gradient(180deg, #18181b 0%, #121215 100%);
    }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      color: #38bdf8;
      background-color: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.2);
      border-radius: 9999px;
      margin-bottom: 8px;
    }
    .title {
      font-size: 20px;
      font-weight: 700;
      color: #ffffff;
      margin: 0;
    }
    .content {
      padding: 32px;
    }
    .meta-table {
      width: 100%;
      background-color: #18181b;
      border: 1px solid #27272a;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 24px;
    }
    .meta-row {
      font-size: 13px;
      padding: 6px 0;
      border-bottom: 1px solid #27272a;
    }
    .meta-row:last-child {
      border-bottom: none;
    }
    .meta-label {
      color: #71717a;
      font-weight: 500;
      width: 90px;
      vertical-align: top;
    }
    .meta-value {
      color: #fafafa;
      word-break: break-word;
    }
    .message-card {
      background-color: #18181b;
      border: 1px solid #27272a;
      border-radius: 8px;
      padding: 20px;
      font-size: 14px;
      line-height: 1.6;
      color: #e4e4e7;
    }
    .btn-row {
      text-align: center;
      margin: 28px 0 10px;
    }
    .reply-btn {
      display: inline-block;
      background-color: #38bdf8;
      color: #09090b !important;
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      padding: 10px 24px;
      border-radius: 6px;
      margin-right: 12px;
    }
    .admin-link {
      display: inline-block;
      border: 1px solid #3f3f46;
      color: #d4d4d8 !important;
      text-decoration: none;
      font-size: 13px;
      font-weight: 500;
      padding: 9px 20px;
      border-radius: 6px;
    }
    .footer {
      padding: 20px 32px;
      background-color: #0c0c0e;
      border-top: 1px solid #27272a;
      text-align: center;
      font-size: 11px;
      color: #71717a;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <table role="presentation" width="100%">
      <tr>
        <td align="center">
          <table role="presentation" class="main">
            <tr>
              <td class="header">
                <span class="badge">New Contact Inquiry</span>
                <h1 class="title">You received a new portfolio message</h1>
              </td>
            </tr>
            <tr>
              <td class="content">
                <table role="presentation" class="meta-table">
                  <tr class="meta-row">
                    <td class="meta-label">From:</td>
                    <td class="meta-value"><strong>${name}</strong></td>
                  </tr>
                  <tr class="meta-row">
                    <td class="meta-label">Email:</td>
                    <td class="meta-value"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr class="meta-row">
                    <td class="meta-label">Subject:</td>
                    <td class="meta-value"><strong>${subject}</strong></td>
                  </tr>
                  <tr class="meta-row">
                    <td class="meta-label">Time:</td>
                    <td class="meta-value">${formattedTime} (IST)</td>
                  </tr>
                </table>

                <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #a1a1aa; margin-bottom: 8px;">
                  Message Content:
                </div>
                <div class="message-card">
                  ${formattedMessage}
                </div>

                <div class="btn-row">
                  <a href="${replyMailto}" class="reply-btn">Reply via Email</a>
                  <a href="${APP_URL}/admin/contacts" class="admin-link">Open Admin Dashboard</a>
                </div>
              </td>
            </tr>
            <tr>
              <td class="footer">
                Notification generated automatically by ${AUTHOR_NAME}'s Portfolio System.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;

  const text = `[New Portfolio Inquiry]

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
