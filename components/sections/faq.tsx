import type { FaqItem } from "@/lib/content";
import Reveal from "@/components/reveal";

/**
 * <details name="…"> rather than a React-state accordion: every answer ships
 * in the HTML (crawlers and AI read them all), the browser keeps one item
 * open at a time natively, and it works without JavaScript. The first item is
 * open by default so a visible answer is on screen immediately.
 */
export default function Faq({
  id = "faq",
  label,
  title,
  items,
  group = "faq",
}: {
  id?: string;
  label: string;
  title: string;
  items: FaqItem[];
  /** The <details name> that makes the group exclusive; unique per page. */
  group?: string;
}) {
  return (
    <section id={id} className="faq">
      <div className="container faq__inner">
        <Reveal className="faq__head">
          <div className="mono-label">{label}</div>
          <h2 className="section-title">{title}</h2>
        </Reveal>
        <Reveal className="faq__list">
          {items.map((faq, i) => (
            <details key={i} className="faq__item" name={group} open={i === 0}>
              <summary className="faq__question">
                <span className="faq__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="faq__q">{faq.q}</span>
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
