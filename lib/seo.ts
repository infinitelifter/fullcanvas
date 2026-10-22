import type { Metadata } from "next";
import {
  SITE_URL,
  languageAlternates,
  pathFor,
  urlFor,
  SERVICE_ROUTES,
  type Locale,
} from "@/lib/routes";
import { SERVICES, serviceCopy, service as serviceDef } from "@/lib/services";

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
      title: "Živá ukázka AI recepce: dotaz zodpovězený do minuty | Full Canvas Digital",
      description:
        "Živá ukázka AI recepce: dotaz zodpovězený do minuty a termín domluvený bez recepční. Zkuste si ji sami, nic se neposílá skutečným lidem.",
    },
    en: {
      title: "Live demo of an AI reception: answered within a minute | Full Canvas Digital",
      description:
        "Live demo of an AI reception: an inquiry answered within a minute and a slot booked without a receptionist. Try it; nothing reaches real people.",
    },
  },
};

/** Subpage titles end with the brand; the homepage title already starts with it. */
const TITLE_SUFFIX = " | Full Canvas Digital";

export function pageSeo(key: string, locale: Locale) {
  const entry = PAGE_SEO[key];
  if (entry) return entry[locale];
  if (SERVICE_ROUTES.some((r) => r.key === key)) {
    const c = serviceCopy(key, locale);
    return { title: `${c.title}${TITLE_SUFFIX}`, description: c.description };
  }
  throw new Error(`No SEO entry for route key: ${key}`);
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
 * Per-page JSON-LD for a service page: BreadcrumbList, FAQPage built from the
 * visible FAQ, and a Service node (not on the comparison page, which is an
 * article about options rather than something we sell).
 */
export function serviceJsonLd(key: string, locale: Locale) {
  const c = serviceCopy(key, locale);
  const def = serviceDef(key);
  const url = urlFor(key, locale);
  const orgId = `${SITE_URL}/#organization`;
  const homeName = locale === "cs" ? "Úvod" : "Home";

  const graph: Record<string, unknown>[] = [
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: homeName, item: urlFor("home", locale) },
        { "@type": "ListItem", position: 2, name: c.nav, item: url },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: c.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  if (def.serviceType) {
    graph.unshift({
      "@type": "Service",
      "@id": `${url}#service`,
      name: c.nav,
      serviceType: def.serviceType,
      description: c.description,
      url,
      inLanguage: HTML_LANG[locale],
      provider: { "@id": orgId },
      areaServed: [
        { "@type": "Country", name: "Czech Republic" },
        { "@type": "Country", name: "Slovakia" },
      ],
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

/** The demo page's FAQ as FAQPage, so the answers count as visible Q&A. */
export function faqJsonLd(url: string, faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Everything a crawler needs to know about the site, for /llms.txt. */
export function llmsTxt(): string {
  const lines: string[] = [];
  lines.push(`# ${SITE_NAME}`);
  lines.push("");
  lines.push(
    "> AI automatizace pro firmy v Česku a na Slovensku: faktury, e-maily a poptávky, cenové nabídky, firemní znalosti, hotely. Analýza za pevnou cenu, první automatizace v provozu do 30 dní.",
  );
  lines.push(
    "> AI automation for companies in Czechia and Slovakia: invoices, email and inquiries, quotes, company knowledge, hotels. Fixed-price assessment, first automation live within 30 days.",
  );
  lines.push("");
  lines.push(`Kontakt / Contact: ${CONTACT_EMAIL}`);
  lines.push(`Sídlo / Based in: Praha, CZ · IČO ${ICO}`);
  lines.push("Působnost / Areas served: Česká republika, Slovensko");
  lines.push("");
  lines.push("## Stránky (česky)");
  lines.push(`- [Úvod](${urlFor("home", "cs")}): co automatizujeme, jak pracujeme, FAQ`);
  lines.push(`- [Živá ukázka](${urlFor("demo", "cs")}): skutečná AI recepce, kterou si můžete vyzkoušet`);
  for (const s of SERVICES) {
    const c = s.copy.cs;
    lines.push(`- [${c.nav}](${urlFor(s.key, "cs")}): ${c.description}`);
  }
  lines.push("");
  lines.push("## Pages (English)");
  lines.push(`- [Home](${urlFor("home", "en")}): what we automate, how we work, FAQ`);
  lines.push(`- [Live demo](${urlFor("demo", "en")}): a real AI reception you can try`);
  for (const s of SERVICES) {
    const c = s.copy.en;
    lines.push(`- [${c.nav}](${urlFor(s.key, "en")}): ${c.description}`);
  }
  lines.push("");
  lines.push("## Jak pracujeme / How we work");
  lines.push("1. Analýza za pevnou cenu (1–2 týdny): spočítá, kolik proces stojí dnes, a seřadí automatizace podle návratnosti.");
  lines.push("2. Pilot: jedna automatizace v ostrém provozu do 30 dní od schválení.");
  lines.push("3. Provoz: dohled, vylepšování, další automatizace.");
  lines.push("");
  lines.push(`Sitemap: ${SITE_URL}/sitemap.xml`);
  return lines.join("\n") + "\n";
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
