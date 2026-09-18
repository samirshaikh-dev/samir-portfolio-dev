export const APP_URL = (
  process.env.NEXTAUTH_URL || "https://samir-portfolio-dev.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Samir Shaikh Portfolio";
export const AUTHOR_NAME = "Samir Shaikh";
export const AUTHOR_EMAIL = "shaikh.samir.work@gmail.com";
export const AUTHOR_PHONE = "+91 8320927182";
export const TWITTER_HANDLE = "@samirshaikh-dev";
export const GITHUB_URL = "https://github.com/samirshaikh-dev";
export const LINKEDIN_URL = "https://www.linkedin.com/in/samirshaikh-dev/";

// Availability status — update this to reflect current freelance availability.
// "available"  → green badge  (actively taking new projects)
// "limited"    → yellow badge (few slots left)
// "booked"     → red badge    (fully booked, taking future inquiries)
export const AVAILABILITY_STATUS: "available" | "limited" | "booked" = "available";
export const AVAILABILITY_LABEL = "Available for freelance projects";
