import Link from "next/link";
import type { Content } from "@/lib/content";
import { pathFor, routesInGroup, type Locale } from "@/lib/routes";
import Logo from "@/components/logo";

/**
 * Link lists come from lib/routes, so Phase 2 service pages appear here
 * automatically in whichever locale is being rendered.
 */
export default function SiteFooter({ t, locale }: { t: Content; locale: Locale }) {
  const services = routesInGroup("services");
  const company = routesInGroup("company");

  const label = (key: string) => (key === "demo" ? t.navDemo : key);

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <Logo fill="#F5F2EE" width={184} height={53} />
        <nav className="site-footer__links" aria-label={t.navLabel}>
          <Link href={pathFor("home", locale)}>{t.navHome}</Link>
          {services.map((r) => (
            <Link key={r.key} href={pathFor(r.key, locale)}>
              {label(r.key)}
            </Link>
          ))}
          {company.map((r) => (
            <Link key={r.key} href={pathFor(r.key, locale)}>
              {label(r.key)}
            </Link>
          ))}
        </nav>
        <div className="site-footer__meta">{t.footer}</div>
      </div>
    </footer>
  );
}
