import Link from "next/link";
import type { Content } from "@/lib/content";
import { pathFor, type Locale } from "@/lib/routes";
import Logo from "@/components/logo";

export default function Header({
  t,
  locale,
  routeKey,
  onBook,
}: {
  t: Content;
  locale: Locale;
  /** Which page we're on, so the switcher links to its counterpart. */
  routeKey: string;
  onBook: () => void;
}) {
  const homeHref = pathFor("home", locale);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        {/* Real links, not state: crawlers must be able to reach both locales. */}
        <div className="lang-toggle">
          <Link
            href={pathFor(routeKey, "cs")}
            hrefLang="cs"
            className={locale === "cs" ? "is-active" : ""}
            aria-current={locale === "cs" ? "true" : undefined}
          >
            CS
          </Link>
          <Link
            href={pathFor(routeKey, "en")}
            hrefLang="en"
            className={locale === "en" ? "is-active" : ""}
            aria-current={locale === "en" ? "true" : undefined}
          >
            EN
          </Link>
        </div>
        <Link href={homeHref} aria-label="Full Canvas Digital" className="site-header__logo">
          <Logo />
        </Link>
        <div className="site-header__end">
          <nav className="site-header__nav" aria-label={t.navLabel}>
            <Link href={pathFor("demo", locale)}>{t.navDemo}</Link>
          </nav>
          <button type="button" onClick={onBook} className="btn-header">
            {t.ctaShort}
          </button>
        </div>
      </div>
    </header>
  );
}
