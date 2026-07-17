import type { Content, Lang } from "@/lib/content";
import Logo from "@/components/logo";

export default function Header({
  t,
  lang,
  onLangChange,
}: {
  t: Content;
  lang: Lang;
  onLangChange: (lang: Lang) => void;
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
        <a href="#top" aria-label="Full Canvas Digital" className="site-header__logo">
          <Logo />
        </a>
        <a href="#kontakt" className="btn-header">
          {t.ctaShort}
        </a>
      </div>
    </header>
  );
}
