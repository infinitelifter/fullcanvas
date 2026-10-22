import { SHOW_PRICING } from "@/lib/content";
import Reveal from "@/components/reveal";

/**
 * Loose shape so the homepage's `Step` (which has price/meta/badge) and the
 * demo columns (which don't) can both use this grid.
 */
export interface StepLike {
  num: string;
  badge?: string;
  title: string;
  price?: string;
  meta?: string;
  body: string;
}

/**
 * The "Jak pracujeme" three-column block, extracted so /demo renders the same
 * markup and CSS rather than a lookalike. Approach is now a thin wrapper.
 */
export default function StepGrid({
  id,
  label,
  title,
  steps,
  micro,
}: {
  id?: string;
  label?: string;
  title?: string;
  steps: StepLike[];
  micro?: string;
}) {
  return (
    <section id={id} className="approach">
      <div className="container approach__inner">
        {(label || title) && (
          <Reveal className="approach__head">
            {label && <div className="mono-label on-dark">{label}</div>}
            {title && <h2 className="section-title">{title}</h2>}
          </Reveal>
        )}
        <div className="approach__grid">
          {steps.map((step) => (
            <Reveal key={step.num} className="step">
              <div className="step__meta-row">
                <span className="step__num">{step.num}</span>
                {step.badge && <span className="step__badge">{step.badge}</span>}
              </div>
              <h3 className="step__title">{step.title}</h3>
              {SHOW_PRICING && step.price && <div className="step__price">{step.price}</div>}
              {step.meta && <div className="step__meta">{step.meta}</div>}
              <p className="step__body">{step.body}</p>
            </Reveal>
          ))}
        </div>
        {micro && (
          <Reveal>
            <p className="approach__micro">{micro}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
