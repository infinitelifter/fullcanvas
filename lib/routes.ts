/**
 * Every URL on the site, paired across locales. One source of truth so the
 * language switcher, hreflang alternates, sitemap and footer nav can never
 * drift apart — adding a Phase 2 service page here puts it in all four.
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
  // Phase 2 service pages land here and flow into sitemap, hreflang and nav.
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
