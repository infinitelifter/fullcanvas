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

/** Homepage preview images, one per language. Bump the ?v= when they change so WhatsApp/Facebook refetch. */
export const HOME_OG_IMAGES: Record<Locale, { url: string; width: number; height: number }> = {
  cs: { url: "/og-home-cs.png?v=2", width: 1200, height: 630 },
  en: { url: "/og-home-en.png?v=2", width: 1200, height: 630 },
};

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
      title: "Víc zákazníků z poptávek, které už máte | Full Canvas Digital",
      description:
        "Odpověď na každou poptávku do minuty, i večer a o víkendu. Termín, orientační cena a připomenutí. Asistent na míru napojený na vaše systémy, lidi nenahrazuje.",
    },
    en: {
      title: "More customers from the inquiries you already get | Full Canvas Digital",
      description:
        "Every inquiry answered within a minute, evenings and weekends too. A time slot, a rough price and a reminder. A custom assistant connected to your systems that doesn't replace your people.",
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
  const ogImage = key === "home" ? HOME_OG_IMAGES[locale] : OG_IMAGE;

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
      images: [{ ...ogImage, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
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
    "> AI automatizace pro firmy v Česku a na Slovensku. Každá poptávka z e-mailu nebo webu dostane do minuty odpověď s cenou nebo volným termínem, i večer a o víkendu. A opakovaná práce v kanceláři (faktury do Pohody a ERP, nabídky, pohledávky, interní procesy) běží sama.",
  );
  lines.push(
    "> AI automation for companies in Czechia and Slovakia. Every email or web inquiry gets a reply with a price or a free slot within a minute, evenings and weekends included. Repetitive office work (invoices into Pohoda and ERPs, quotes, receivables, internal processes) runs on its own.",
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
  lines.push("## Pro koho / Who it is for");
  lines.push("- Hotely, resorty, penziony a svatební místa: poptávky na pobyty, svatby a firemní akce zodpovězené do minuty v jazyce hosta. / Hotels, resorts and wedding venues.");
  lines.push("- Soukromé kliniky a zubní ordinace: objednávky z e-mailů a SMS podle pravidel ordinace, schvaluje recepce. / Private and dental clinics.");
  lines.push("- Autosalony a autoservisy: termín servisu nebo zkušební jízdy nabídnutý z kalendáře. / Car dealers and car services.");
  lines.push("- Realitní kanceláře: odpověď na ocenění a zájem o nemovitost do pár minut. / Real estate agencies.");
  lines.push("- Účetní kanceláře a firmy s papírovou agendou: faktury a doklady rovnou do účetnictví. / Accounting firms and back offices.");
  lines.push("");
  lines.push("## Jak pracujeme / How we work");
  lines.push("1. Ukázka na vašich datech zdarma (do týdne): pár starších poptávek nebo 20 faktur. / Free preview on your own data within a week.");
  lines.push("2. Pilot: jedna automatizace v ostrém provozu do 30 dní od podpisu, za pevnou cenu. / Pilot live within 30 days, fixed price.");
  lines.push("3. Provoz: dohled, ladění, další automatizace. / Ongoing operation.");
  lines.push("");
  lines.push("## Důležité / Key facts");
  lines.push("- Na začátku každou odpověď schvaluje člověk; automaticky odchází jen to, co klient povolí. / A person approves every reply at first.");
  lines.push("- Není to robot místo recepce: rozhodnutí a osobní kontakt zůstávají lidem. / Not a robot receptionist.");
  lines.push("- Běží na účtech klienta, v EU cloudu nebo v jeho infrastruktuře; data se nepoužívají k trénování. / Runs on the client's own accounts, EU hosting.");
  lines.push("- Napojení na existující systémy: Pohoda, ERP, Outlook/Microsoft 365, Google, kalendáře, hotelové a rezervační systémy. / Plugs into existing tools.");
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
        knowsAbout: [
          "AI automation",
          "AI for hotels",
          "AI reception for clinics",
          "Automated replies to customer inquiries",
          "Invoice automation into Pohoda and ERP",
          "Quote automation",
          "Business process automation",
          "AI knowledge base",
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
