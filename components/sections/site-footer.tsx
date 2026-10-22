import type { Content } from "@/lib/content";
import Logo from "@/components/logo";

/**
 * Extracted from final-cta so /demo can render the footer without the
 * homepage's closing CTA section. Markup is unchanged apart from the links row.
 */
export default function SiteFooter({ t }: { t: Content }) {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <Logo fill="#F5F2EE" width={184} height={53} />
        <nav className="site-footer__links" aria-label={t.navLabel}>
          <a href="/">{t.navHome}</a>
          <a href="/demo">{t.navDemo}</a>
        </nav>
        <div className="site-footer__meta">{t.footer}</div>
      </div>
    </footer>
  );
}
