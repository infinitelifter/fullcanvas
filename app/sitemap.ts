import type { MetadataRoute } from "next";
import { LOCALES, ROUTES, SITE_URL, urlFor } from "@/lib/routes";

/**
 * Built from lib/routes, so a Phase 2 service page added there appears here
 * automatically, in both languages, with its hreflang alternates.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.flatMap((r) =>
    LOCALES.map((locale) => ({
      url: urlFor(r.key, locale),
      lastModified,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
      alternates: {
        languages: {
          cs: urlFor(r.key, "cs"),
          en: urlFor(r.key, "en"),
          "x-default": urlFor(r.key, "cs"),
        },
      },
    })),
  );
}

export const dynamic = "force-static";
