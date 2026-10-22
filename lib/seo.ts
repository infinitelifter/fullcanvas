import type { Metadata } from "next";
import {
  SITE_URL,
  languageAlternates,
  pathFor,
  route,
  type Locale,
} from "@/lib/routes";

/* ------------------------------------------------------------------ *
 * TODO(Ondrej): paste the verification codes here, then redeploy.
 * Left empty on purpose — an empty string emits no meta tag at all,
 * so nothing bogus ships while these are unset.
 *   google : Search Console → Settings → Ownership verification → HTML tag
 *   bing   : Bing Webmaster Tools → Site → Verify → Meta tag
 * ------------------------------------------------------------------ */
export const GOOGLE_SITE_VERIFICATION = "";
export const BING_SITE_VERIFICATION = "";

export const SITE_NAME = "Full Canvas Digital";
export const CONTACT_EMAIL = "hello@fullcanvas.cz";
/** Verified against ARES: registered to Ondrej Mészáros, sole trader. */
export const ICO = "06762336";
export const FOUNDER_NAME = "Ondrej Mészáros";

export const OG_IMAGE = {
  url: "/og-full-canvas-digital.png",
  width: 1200,
  height: 630,
} as const;

export const LOGO_IMAGE = {
  url: "/full-canvas-digital-logo.png",
  width: 512,
  height: 512,
} as const;

const OG_LOCALE: Record<Locale, string> = { cs: "cs_CZ", en: "en_US" };
const HTML_LANG: Record<Locale, string> = { cs: "cs-CZ", en: "en-US" };

/** Per-page title and description. Keyword first, ~60 / ~155 characters. */
export const PAGE_SEO: Record<string, Record<Locale, { title: string; description: string }>> = {
  home: {
    cs: {
      title: "Full Canvas Digital — AI automatizace pro firmy",
      description:
        "AI automatizace pro firmy: faktury, e-maily, nabídky, pohledávky. Analýza za pevnou cenu, první výsledek v provozu do 30 dní.",
    },
    en: {
      title: "AI automation for companies | Full Canvas Digital",
      description:
        "AI automation for companies: invoices, email, quotes, receivables. A fixed-price assessment and the first result live within 30 days.",
    },
  },
  demo: {
    cs: {
      title: "Živá ukázka — Recepce | Full Canvas Digital",
      description:
        "Živá ukázka AI recepce: dotaz zodpovězený do minuty a termín domluvený bez recepční. Zkuste si ji sami, nic se neposílá skutečným lidem.",
    },
    en: {
      title: "Live demo — AI reception | Full Canvas Digital",
      description:
        "Live demo of an AI reception: an inquiry answered within a minute and a slot booked without a receptionist. Try it; nothing reaches real people.",
    },
  },
};

export function pageSeo(key: string, locale: Locale) {
  const entry = PAGE_SEO[key];
  if (!entry) throw new Error(`No PAGE_SEO entry for route key: ${key}`);
  return entry[locale];
}

/**
 * Metadata for one page in one locale: canonical, hreflang, Open Graph and
 * Twitter card, all derived from lib/routes so they cannot disagree.
 */
export function buildMetadata(key: string, locale: Locale): Metadata {
  const { title, description } = pageSeo(key, locale);
  const path = pathFor(key, locale);
  const canonical = path;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(key),
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: canonical,
      locale: OG_LOCALE[locale],
      images: [{ ...OG_IMAGE, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

/** Root-layout metadata: origin, defaults and verification. */
export function buildRootMetadata(locale: Locale): Metadata {
  const verification: Metadata["verification"] = {};
  if (GOOGLE_SITE_VERIFICATION) verification.google = GOOGLE_SITE_VERIFICATION;
  if (BING_SITE_VERIFICATION) {
    verification.other = { "msvalidate.01": BING_SITE_VERIFICATION };
  }

  return {
    metadataBase: new URL(SITE_URL),
    ...(Object.keys(verification).length ? { verification } : {}),
    // Explicit: we want AI crawlers and search engines to read everything.
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
    },
    formatDetection: { telephone: false },
    other: { "og:locale": OG_LOCALE[locale] },
  };
}

/**
 * Site-wide JSON-LD. Deliberately minimal and factual — no review or rating
 * markup, because there is nothing to back it up yet.
 */
export function siteJsonLd(locale: Locale) {
  const orgId = `${SITE_URL}/#organization`;
  const { description } = pageSeo("home", locale);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": orgId,
        name: SITE_NAME,
        // IČO 06762336 is registered to a sole trader, not to a company of
        // this name, so the trading name and the legal name differ.
        legalName: FOUNDER_NAME,
        url: SITE_URL,
        email: CONTACT_EMAIL,
        description,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}${LOGO_IMAGE.url}`,
          width: LOGO_IMAGE.width,
          height: LOGO_IMAGE.height,
        },
        image: `${SITE_URL}${OG_IMAGE.url}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Praha",
          addressCountry: "CZ",
        },
        areaServed: [
          { "@type": "Country", name: "Czech Republic" },
          { "@type": "Country", name: "Slovakia" },
        ],
        identifier: {
          "@type": "PropertyValue",
          propertyID: "ICO",
          value: ICO,
        },
        founder: {
          "@type": "Person",
          name: FOUNDER_NAME,
          // TODO(Ondrej): add your LinkedIn profile URL here.
        },
        // TODO(Ondrej): add LinkedIn company page, Firmy.cz and Clutch URLs
        // once those listings exist, then re-run the IndexNow script.
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description,
        inLanguage: HTML_LANG[locale],
        publisher: { "@id": orgId },
      },
    ],
  };
}
