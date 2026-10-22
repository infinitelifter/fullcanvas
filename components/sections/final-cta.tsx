import type { Content } from "@/lib/content";
import Reveal from "@/components/reveal";
import { BookButton } from "@/components/booking";

/**
 * Closing call to action. The footer is rendered by the page shell right
 * after this, on the same dark-cta ground, so the two read as one block.
 */
export default function FinalCta({
  t,
  label,
  headline,
  body,
}: {
  t: Content;
  label?: string;
  headline?: string;
  body?: string;
}) {
  return (
    <section id="kontakt" className="final-cta">
      <div className="final-cta__glow" aria-hidden="true" />
      <div className="final-cta__sheen" aria-hidden="true" />
      <div className="container final-cta__inner">
        <Reveal className="final-cta__copy">
          <div className="final-cta__label">{label ?? t.finalLabel}</div>
          <h2 className="final-cta__title">{headline ?? t.finalHeadline}</h2>
          <p className="final-cta__body">{body ?? t.finalBody}</p>
          <div className="final-cta__actions">
            <BookButton className="btn-light">{t.ctaPrimary}</BookButton>
            <a href={`mailto:${t.email}`} className="final-cta__email">
              {t.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
