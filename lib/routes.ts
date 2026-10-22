/**
 * Every URL on the site, paired across locales. One source of truth so the
 * language switcher, hreflang alternates, sitemap, footer nav and llms.txt
 * can never drift apart — a service page added here appears in all of them.
 */

export type Locale = "cs" | "en";

export const LOCALES: readonly Locale[] = ["cs", "en"] as const;
export const DEFAULT_LOCALE: Locale = "cs";

/** Canonical origin. The apex redirects here, so www is the real site. */
export const SITE_URL = "https://www.fullcanvas.cz";

export interface RouteDef {
  key: string;
  /** Shown in footer/nav link lists. */
  group?: "services" | "company";
  paths: Record<Locale, string>;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}

/**
 * Service pages: the key is the slug-independent id used by lib/services.ts.
 * Czech slugs are the search phrases; English slugs are their equivalents.
 */
export const SERVICE_ROUTES: readonly RouteDef[] = [
  {
    key: "invoices",
    group: "services",
    paths: { cs: "/automatizace-faktur", en: "/en/invoice-automation" },
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    key: "email",
    group: "services",
    paths: { cs: "/automatizace-e-mailu-a-poptavek", en: "/en/email-and-inquiry-automation" },
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    key: "quotes",
    group: "services",
    paths: { cs: "/automatizace-nabidek", en: "/en/quote-automation" },
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    key: "knowledge",
    group: "services",
    paths: { cs: "/ai-firemni-znalosti", en: "/en/ai-company-knowledge-base" },
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    key: "hotels",
    group: "services",
    paths: { cs: "/ai-automatizace-pro-hotely", en: "/en/ai-automation-for-hotels" },
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    key: "comparison",
    group: "services",
    paths: { cs: "/ai-agentura-vs-studio-vs-saas", en: "/en/ai-agency-vs-studio-vs-saas" },
    changeFrequency: "monthly",
    priority: 0.8,
  },
] as const;

export const ROUTES: readonly RouteDef[] = [
  {
    key: "home",
    paths: { cs: "/", en: "/en" },
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    key: "demo",
    group: "company",
    paths: { cs: "/demo", en: "/en/demo" },
    changeFrequency: "monthly",
    priority: 0.8,
  },
  ...SERVICE_ROUTES,
] as const;

export function route(key: string): RouteDef {
  const found = ROUTES.find((r) => r.key === key);
  if (!found) throw new Error(`Unknown route key: ${key}`);
  return found;
}

export function pathFor(key: string, locale: Locale): string {
  return route(key).paths[locale];
}

export function urlFor(key: string, locale: Locale): string {
  const path = pathFor(key, locale);
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/** The other locale, for the header switcher. */
export function otherLocale(locale: Locale): Locale {
  return locale === "cs" ? "en" : "cs";
}

/**
 * hreflang map. x-default points at Czech: it is the default locale and the
 * site's primary market.
 */
export function languageAlternates(key: string): Record<string, string> {
  const r = route(key);
  return {
    cs: r.paths.cs,
    en: r.paths.en,
    "x-default": r.paths.cs,
  };
}

export function routesInGroup(group: NonNullable<RouteDef["group"]>): readonly RouteDef[] {
  return ROUTES.filter((r) => r.group === group);
}

/** The last path segment of a service page in a locale: what [slug] receives. */
export function serviceSlug(key: string, locale: Locale): string {
  const path = pathFor(key, locale);
  return path.split("/").filter(Boolean).pop() ?? "";
}

/** Reverse lookup for app/(cs)/[slug] and app/en/[slug]. */
export function serviceKeyForSlug(slug: string, locale: Locale): string | undefined {
  return SERVICE_ROUTES.find((r) => serviceSlug(r.key, locale) === slug)?.key;
}
