/**
 * Public origin used for link previews, the sitemap and robots.txt.
 * Set NEXT_PUBLIC_SITE_URL when hosting somewhere other than Vercel.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");
