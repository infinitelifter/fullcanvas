import "@/app/globals.css";
import { sans, mono } from "@/lib/fonts";
import { siteJsonLd } from "@/lib/seo";
import type { Locale } from "@/lib/routes";

const HTML_LANG: Record<Locale, string> = { cs: "cs", en: "en" };

/**
 * The document shell, shared by both root layouts. There are two root layouts
 * (app/(cs) and app/en) because <html lang> has to differ per locale and a
 * single root layout cannot vary it per route.
 */
export default function RootHtml({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const jsonLd = JSON.stringify(siteJsonLd(locale)).replace(/</g, "\\u003c");

  return (
    // suppressHydrationWarning: the no-js class is stripped before hydration.
    <html
      lang={HTML_LANG[locale]}
      className={`${sans.variable} ${mono.variable} no-js`}
      suppressHydrationWarning
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.remove('no-js');",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        {children}
      </body>
    </html>
  );
}
