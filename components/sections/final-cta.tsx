import type { Content } from "@/lib/content";
import Reveal from "@/components/reveal";
import SiteFooter from "@/components/sections/site-footer";

export default function FinalCta({ t, onBook }: { t: Content; onBook: () => void }) {
  return (
    <section id="kontakt" className="final-cta">
      <div className="final-cta__glow" aria-hidden="true" />
      <div className="container final-cta__inner">
        <Reveal className="final-cta__copy">
          <div className="final-cta__label">{t.finalLabel}</div>
          <h2 className="final-cta__title">{t.finalHeadline}</h2>
          <p className="final-cta__body">{t.finalBody}</p>
          <div className="final-cta__actions">
            <button type="button" onClick={onBook} className="btn-light">
              {t.ctaPrimary}
            </button>
            <a href={`mailto:${t.email}`} className="final-cta__email">
              {t.email}
            </a>
          </div>
        </Reveal>
      </div>
      <SiteFooter t={t} />
    </section>
  );
}
