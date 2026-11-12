import Link from "next/link";
import type { Content } from "@/lib/content";
import { pathFor, routesInGroup, type Locale } from "@/lib/routes";
import { serviceCopy } from "@/lib/services";
import Logo from "@/components/logo";

/**
 * Three columns: wordmark + line + email, the service pages, the company
 * links. Link lists come from lib/routes, so a new service page appears here
 * automatically in whichever locale is being rendered.
 */
export default function SiteFooter({
  t,
  locale,
  routeKey,
}: {
  t: Content;
  locale: Locale;
  routeKey: string;
}) {
  const home = pathFor("home", locale);
  const anchor = (hash: string) => (routeKey === "home" ? `#${hash}` : `${home}#${hash}`);
  const services = routesInGroup("services");

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link href={home} aria-label="Full Canvas Digital" className="site-footer__logo">
              <Logo fill="#F5F2EE" width={184} height={53} />
            </Link>
            <div className="site-footer__brand-bottom">
              <p className="site-footer__tagline">{t.footerTagline}</p>
              <a href={`mailto:${t.email}`} className="site-footer__email">
                {t.email}
              </a>
            </div>
          </div>

          <nav className="site-footer__col" aria-label={t.nav.footerServices}>
            <h2 className="site-footer__heading">{t.nav.footerServices}</h2>
            {services.map((r) => (
              <Link key={r.key} href={pathFor(r.key, locale)}>
                {serviceCopy(r.key, locale).nav}
              </Link>
            ))}
          </nav>

          <nav className="site-footer__col" aria-label={t.nav.footerCompany}>
            <h2 className="site-footer__heading">{t.nav.footerCompany}</h2>
            <Link href={pathFor("demo", locale)}>{t.navDemo}</Link>
            <Link href={anchor("postup")}>{t.nav.how}</Link>
            <Link href={anchor("faq")}>{t.nav.faq}</Link>
            <Link href={anchor("kontakt")}>{t.nav.contact}</Link>
          </nav>
        </div>

        <div className="site-footer__bottom">
          <div className="site-footer__meta">{t.footer}</div>
          <div className="lang-toggle lang-toggle--dark">
            <Link href={pathFor(routeKey, "cs")} hrefLang="cs" className={locale === "cs" ? "is-active" : ""}>
              CS
            </Link>
            <Link href={pathFor(routeKey, "en")} hrefLang="en" className={locale === "en" ? "is-active" : ""}>
              EN
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
