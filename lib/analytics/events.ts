/**
 * Canonical analytics event catalog.
 *
 * Every custom event dispatched by the site MUST be declared here. The
 * `AnalyticsEventName` union is what `trackEvent()` accepts, so an undeclared
 * event name is a compile error rather than a silent no-op.
 *
 * PRIVACY CONSTRAINT (security-engineer): event params are limited to
 * booleans, numbers, and route names. Never add a visitor identifier
 * (FingerprintJS `visitorId`), contact-form field values (name, email,
 * subject, message), or chatbot message text to any event dispatched by
 * this codebase. Those are user-provided personal data and must not reach
 * an analytics sink.
 */
export const analyticsEvents = {
  /** User scrolled past 75% of the current route. */
  scrollDepth75: "scroll_depth_75",
  /** Contact form persisted an inquiry to the database. */
  contactSubmitSuccess: "contact_submit_success",
  /** Contact form fell back to the WhatsApp hand-off (API call failed). */
  contactSubmitFallback: "contact_submit_fallback",
  /** AI assistant drawer was opened. */
  chatOpen: "chat_open",
  /** A message was submitted to the AI assistant. */
  chatMessageSent: "chat_message_sent",
} as const;

export type AnalyticsEventName =
  (typeof analyticsEvents)[keyof typeof analyticsEvents];

/**
 * Allowed analytics event parameter values. Deliberately excludes objects,
 * arrays, and functions so a payload can never carry nested personal data.
 */
export type AnalyticsEventParams = Record<
  string,
  string | number | boolean
>;
