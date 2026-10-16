import type { Content, Lang } from "@/lib/content";
import Logo from "@/components/logo";

export default function Header({
  t,
  lang,
  onLangChange,
  onBook,
  homeHref = "#top",
}: {
  t: Content;
  lang: Lang;
  onLangChange: (lang: Lang) => void;
  onBook: () => void;
  /** "#top" on the homepage; "/" on subpages, where there is no hero to scroll to. */
  homeHref?: string;
}) {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <div className="lang-toggle">
          <button type="button" className={lang === "cs" ? "is-active" : ""} onClick={() => onLangChange("cs")}>
            CS
          </button>
          <button type="button" className={lang === "en" ? "is-active" : ""} onClick={() => onLangChange("en")}>
            EN
          </button>
        </div>
        <a href={homeHref} aria-label="Full Canvas Digital" className="site-header__logo">
          <Logo />
        </a>
        <div className="site-header__end">
          <nav className="site-header__nav" aria-label={t.navLabel}>
            <a href="/demo">{t.navDemo}</a>
          </nav>
          <button type="button" onClick={onBook} className="btn-header">
            {t.ctaShort}
          </button>
        </div>
      </div>
    </header>
  );
}
