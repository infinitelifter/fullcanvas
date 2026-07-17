import type { Content } from "@/lib/content";

export default function Hero({ t }: { t: Content }) {
  return (
    <section id="top" className="hero">
      <div className="hero__blobs" aria-hidden="true">
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />
        <div className="hero__blob hero__blob--3" />
      </div>
      <div className="container hero__content">
        <div className="hero__kicker">
          <span className="hero__kicker-rule" />
          {t.heroKicker}
        </div>
        <h1 className="hero__title">
          {t.heroHeadA} <span className="hero__title-b">{t.heroHeadB}</span>
        </h1>
        <p className="hero__sub">{t.heroSub}</p>
        <div className="hero__actions">
          <a href="#kontakt" className="btn-primary">
            {t.ctaPrimary}
          </a>
          <a href="#sluzby" className="hero__secondary">
            {t.heroSecondary}
          </a>
        </div>
        <div className="hero__micro">{t.heroMicro}</div>
      </div>
    </section>
  );
}
