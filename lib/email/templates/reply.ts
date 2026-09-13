import { AUTHOR_NAME, AUTHOR_EMAIL, AUTHOR_PHONE, APP_URL } from "@/lib/site-config";

export interface ReplyEmailProps {
  name: string;
  replyText: string;
  originalSubject?: string;
}

export function renderReplyEmail({
  name,
  replyText,
  originalSubject,
}: ReplyEmailProps): { html: string; text: string; emailSubject: string } {
  const emailSubject = originalSubject?.startsWith("Re:")
    ? originalSubject
    : `Re: ${originalSubject || "Your Inquiry to Samir Shaikh"}`;

  const sanitizedName = name || "there";
  const currentYear = new Date().getFullYear();

  const formattedReply = replyText
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
      padding: 28px 32px;
      border-bottom: 1px solid #27272a;
      background: linear-gradient(180deg, #18181b 0%, #121215 100%);
    }
    .brand-title {
      font-size: 20px;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 4px;
    }
    .brand-sub {
      font-size: 12px;
      color: #a1a1aa;
      margin: 0;
    }
    .content {
      padding: 32px;
    }
    .greeting {
      font-size: 16px;
      font-weight: 600;
      color: #fafafa;
      margin: 0 0 16px;
    }
    .reply-body {
      font-size: 14px;
      line-height: 1.7;
      color: #e4e4e7;
      margin: 0 0 24px;
    }
    .signoff {
      font-size: 14px;
      line-height: 1.6;
      color: #a1a1aa;
      border-top: 1px solid #27272a;
      padding-top: 20px;
    }
    .footer {
      padding: 20px 32px;
      background-color: #0c0c0e;
      border-top: 1px solid #27272a;
      text-align: center;
      font-size: 11px;
      color: #71717a;
      line-height: 1.6;
    }
    .footer a {
      color: #a1a1aa;
      text-decoration: none;
      margin: 0 6px;
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
                <h1 class="brand-title">${AUTHOR_NAME}</h1>
                <p class="brand-sub">AI Backend Engineer &bull; Forward Deployed Engineer</p>
              </td>
            </tr>
            <tr>
              <td class="content">
                <p class="greeting">Hi ${sanitizedName},</p>
                <div class="reply-body">
                  ${formattedReply}
                </div>
                <div class="signoff">
                  Warm regards,<br />
                  <strong style="color: #ffffff;">${AUTHOR_NAME}</strong><br />
                  <span style="font-size: 12px; color: #71717a;">AI Backend Engineer &bull; FDE</span><br />
                  <span style="font-size: 12px; color: #71717a;">${AUTHOR_EMAIL} | ${AUTHOR_PHONE}</span>
                </div>
              </td>
            </tr>
            <tr>
              <td class="footer">
                <p style="margin: 0 0 8px;">
                  <a href="${APP_URL}">Portfolio</a> &bull;
                  <a href="https://github.com/ShaikhSamir786">GitHub</a> &bull;
                  <a href="https://linkedin.com">LinkedIn</a> &bull;
                  <a href="https://wa.me/${AUTHOR_PHONE.replace(/[^0-9]/g, "")}">WhatsApp</a>
                </p>
                <p style="margin: 0;">
                  &copy; ${currentYear} ${AUTHOR_NAME}. All rights reserved.
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
