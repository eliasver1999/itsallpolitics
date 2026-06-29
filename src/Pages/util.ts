import DOMPurify from "dompurify";

export function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

/**
 * Sanitize article HTML coming from the admin's Quill editor while KEEPING the
 * inline formatting it produces. `USE_PROFILES: { html: true }` on its own drops
 * the `style`/`class` attributes — which silently removed text colors,
 * backgrounds and alignment set in the editor. We re-allow them via ADD_ATTR;
 * DOMPurify still sanitizes the CSS values, so this stays XSS-safe.
 */
export function sanitizeArticleHtml(html?: string): string {
  return DOMPurify.sanitize(html || "", {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["style", "class", "target", "rel"],
  });
}