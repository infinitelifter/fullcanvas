import type { Content } from "@/lib/content";
import Reveal from "@/components/reveal";

export default function Approach({ t }: { t: Content }) {
  return (
    <section id="pristup" className="approach">
      <div className="container approach__inner">
        <Reveal className="approach__head">
          <div className="mono-label on-dark">{t.approachLabel}</div>
          <h2 className="section-title">{t.approachTitle}</h2>
        </Reveal>
        <div className="approach__grid">
          {t.steps.map((step) => (
            <Reveal key={step.num} className="step">
              <div className="step__meta-row">
                <span className="step__num">{step.num}</span>
                {step.badge && <span className="step__badge">{step.badge}</span>}
              </div>
              <h3 className="step__title">{step.title}</h3>
              <div className="step__price">{step.price}</div>
              <div className="step__meta">{step.meta}</div>
              <p className="step__body">{step.body}</p>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="approach__micro">{t.approachMicro}</p>
        </Reveal>
      </div>
    </section>
  );
}
