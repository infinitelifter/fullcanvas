import type { Content } from "@/lib/content";
import Reveal from "@/components/reveal";

/**
 * <details open> rather than a React-state accordion. The previous version
 * rendered `{open[i] && <p>}`, so answers were absent from the HTML entirely
 * until clicked — Google, Bing and every AI crawler saw the questions and
 * none of the answers. Now the text ships in the markup, works without
 * JavaScript, and visitors can still collapse an item.
 */
export default function Faq({ t }: { t: Content }) {
  return (
    <section id="faq" className="faq">
      <div className="faq__inner">
        <Reveal className="faq__head">
          <div className="mono-label">{t.faqLabel}</div>
          <h2 className="section-title">{t.faqTitle}</h2>
        </Reveal>
        <Reveal className="faq__list">
          {t.faqs.map((faq, i) => (
            <details key={i} className="faq__item" open>
              <summary className="faq__question">
                <span>{faq.q}</span>
                <span className="faq__sign" aria-hidden="true" />
              </summary>
              <p className="faq__answer">{faq.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
