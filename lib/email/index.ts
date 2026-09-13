import nodemailer from "nodemailer";
import { AUTHOR_NAME, AUTHOR_EMAIL } from "@/lib/site-config";
import {
  renderConfirmationEmail,
  renderAdminNotificationEmail,
  renderReplyEmail,
  ConfirmationEmailProps,
  AdminNotificationEmailProps,
  ReplyEmailProps,
} from "./templates";

/**
 * Returns a configured nodemailer Transporter or null if SMTP credentials are not set.
 */
export function getMailTransporter(): nodemailer.Transporter | null {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_EMAIL;
  const pass = process.env.SMTP_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

function getSenderAddress(): string {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || AUTHOR_NAME;
  const fromEmail = process.env.SMTP_EMAIL || AUTHOR_EMAIL;
  return `"${siteName}" <${fromEmail}>`;
}

/**
 * Sends a confirmation email to the visitor who submitted a contact form.
 */
export async function sendContactConfirmationEmail(
  props: ConfirmationEmailProps
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const transporter = getMailTransporter();
    if (!transporter) {
      console.warn("[Email] SMTP credentials missing. Skipped sending confirmation email to:", props.email);
      return { success: false, error: "SMTP credentials not configured" };
    }

    const { html, text, emailSubject } = renderConfirmationEmail(props);

    const info = await transporter.sendMail({
      from: getSenderAddress(),
      to: props.email,
      replyTo: process.env.SMTP_EMAIL || AUTHOR_EMAIL,
      subject: emailSubject,
      text,
      html,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("[Email] Failed to send contact confirmation email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Sends an email notification to the site owner/admin when a new contact inquiry arrives.
 */
export async function sendAdminContactNotification(
  props: AdminNotificationEmailProps
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const transporter = getMailTransporter();
    if (!transporter) {
      console.warn("[Email] SMTP credentials missing. Skipped admin notification email for inquiry from:", props.email);
      return { success: false, error: "SMTP credentials not configured" };
    }

    const adminRecipient = process.env.SMTP_EMAIL || AUTHOR_EMAIL;
    const { html, text, emailSubject } = renderAdminNotificationEmail(props);

    const info = await transporter.sendMail({
      from: getSenderAddress(),
      to: adminRecipient,
      replyTo: `"${props.name}" <${props.email}>`,
      subject: emailSubject,
      text,
      html,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("[Email] Failed to send admin contact notification:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Sends an admin reply email to a visitor.
 */
export async function sendContactReplyEmail(
  to: string,
  props: ReplyEmailProps
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const transporter = getMailTransporter();
    if (!transporter) {
      console.warn("[Email] SMTP credentials missing. Skipped reply email to:", to);
      return { success: false, error: "SMTP credentials not configured" };
    }

    const { html, text, emailSubject } = renderReplyEmail(props);

    const info = await transporter.sendMail({
      from: getSenderAddress(),
      to,
      replyTo: process.env.SMTP_EMAIL || AUTHOR_EMAIL,
      subject: emailSubject,
      text,
      html,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("[Email] Failed to send contact reply email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export * from "./templates";
