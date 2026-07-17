import type { Content } from "@/lib/content";
import Reveal from "@/components/reveal";

export default function About({ t }: { t: Content }) {
  return (
    <section className="about">
      <div className="container about__inner">
        <Reveal className="about__copy">
          <div className="mono-label">{t.aboutLabel}</div>
          <h2 className="about__head">{t.aboutHead}</h2>
          <p className="about__body">{t.aboutBody}</p>
        </Reveal>
      </div>
      <div className="price-line">
        <div className="container price-line__inner">
          <span className="price-line__label">{t.priceLabel}</span>
          {t.prices.map((price) => (
            <span key={price.k} className="price-line__item">
              {price.k} <span className="price-line__value">{price.v}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
