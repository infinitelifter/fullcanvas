import Link from "next/link";
import type { Content } from "@/lib/content";
import { pathFor, type Locale } from "@/lib/routes";
import { BookButton } from "@/components/booking";
import HeroSmoke from "@/components/hero-smoke";
import Stats from "@/components/sections/stats";

/**
 * Full-viewport hero. The stats row is docked at its bottom edge, so the
 * first screen carries the headline, the two calls to action and the numbers.
 */
export default function Hero({ t, locale }: { t: Content; locale: Locale }) {
  return (
    <section id="top" className="hero hero--full">
      <div className="hero__bg" aria-hidden="true">
        <HeroSmoke />
        <div className="hero__vignette" />
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
          <BookButton className="btn-primary">{t.ctaPrimary}</BookButton>
          <Link href={pathFor("demo", locale)} className="btn-ghost">
            {t.heroDemoLink}
          </Link>
          <a href="#sluzby" className="hero__secondary">
            {t.heroSecondary.replace(/\s*↓\s*$/, "")} <span className="hero__arrow">↓</span>
          </a>
        </div>
        <div className="hero__micro">{t.heroMicro}</div>
      </div>
      <Stats t={t} />
    </section>
  );
}
