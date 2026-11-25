/**
 * GA4 events. gtag only exists after the visitor accepts the cookie bar, so
 * every call is a no-op without consent — nothing is queued or stored.
 *
 * Conversions for Google Ads: mark `generate_lead` as a key event in GA4 and
 * import it into Ads (GA4 ↔ Ads link). The rest are secondary signals.
 */
type Gtag = (...args: unknown[]) => void;

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", event, { page_path: window.location.pathname, ...params });
}

/** Google Ads click id, kept for this browser session only, and only after consent. */
export const GCLID_KEY = "fc-gclid";

export function rememberGclid() {
  try {
    const id = new URLSearchParams(window.location.search).get("gclid");
    if (id) sessionStorage.setItem(GCLID_KEY, id.slice(0, 200));
  } catch {}
}

export function readGclid(): string {
  try {
    return sessionStorage.getItem(GCLID_KEY) ?? "";
  } catch {
    return "";
  }
}
