import type { Locale } from "@/lib/routes";

/**
 * The Recepce demo is a separate FastAPI app on its own origin. The site
 * links out to it (new tab) rather than embedding it, so it always opens
 * full size.
 */
export const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL ?? "https://demo.fullcanvas.cz";

export function demoHref(locale: Locale): string {
  return `${DEMO_URL}/?lang=${locale}`;
}
