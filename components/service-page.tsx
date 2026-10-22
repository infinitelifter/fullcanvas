import Link from "next/link";
import { content } from "@/lib/content";
import { pathFor, urlFor, type Locale } from "@/lib/routes";
import { serviceCopy } from "@/lib/services";
import { serviceJsonLd } from "@/lib/seo";
import PageShell from "@/components/page-shell";
import Reveal from "@/components/reveal";
import Faq from "@/components/sections/faq";
import FinalCta from "@/components/sections/final-cta";
import { BookButton } from "@/components/booking";

/**
 * One template for every entry in lib/services.ts. Section order follows the
 * SEO brief: keyword in H1 and first sentence, TL;DR under the H1, CTA above
 * the fold, problem, what we automate, how it works, price and timeline,
 * (case study, only when a real one exists), visible FAQ, summary + CTA,
 * related pages.
 */
export default function ServicePage({ serviceKey, locale }: { serviceKey: string; locale: Locale }) {
  const t = content[locale];
  const c = serviceCopy(serviceKey, locale);
  const jsonLd = JSON.stringify(serviceJsonLd(serviceKey, locale)).replace(/</g, "\\u003c");
  const home = pathFor("home", locale);
  const homeName = locale === "cs" ? "Úvod" : "Home";

  const relatedLabel = (key: string) => (key === "demo" ? t.navDemo : serviceCopy(key, locale).nav);

  return (
    <PageShell locale={locale} routeKey={serviceKey}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      {/* Compact hero with the TL;DR strip: the first 10–30% of the page is what gets cited. */}
      <section className="hero hero--compact hero--service">
        <div className="hero__blobs" aria-hidden="true">
          <div className="hero__blob hero__blob--1" />
          <div className="hero__blob hero__blob--2" />
        </div>
        <div className="container hero__content">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href={home}>{homeName}</Link>
            <span aria-hidden="true">/</span>
            <Link href={`${home}#sluzby`}>{t.nav.services}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{c.nav}</span>
          </nav>
          <h1 className="hero__title hero__title--service">
            {c.h1Pre} <span className="hero__title-b">{c.h1Em}</span>
          </h1>
          <p className="hero__sub">{c.lead}</p>
          <div className="hero__actions">
            <BookButton className="btn-primary">{t.ctaPrimary}</BookButton>
            {c.ctaSecondary &&
              (serviceKey === "hotels" ? (
                <Link href={pathFor("demo", locale)} className="hero__secondary hero__secondary--demo">
                  {c.ctaSecondary}
                </Link>
              ) : (
                <BookButton className="hero__secondary hero__secondary--btn">{c.ctaSecondary}</BookButton>
              ))}
          </div>
          <dl className="tldr">
            {c.tldr.map((row) => (
              <div key={row.k} className="tldr__cell">
                <dt>{row.k}</dt>
                <dd>{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="svc svc--problem">
        <div className="container svc__two">
          <Reveal>
            <div className="mono-label">{locale === "cs" ? "Problém" : "The problem"}</div>
            <h2 className="section-title section-title--sm">{c.problemTitle}</h2>
          </Reveal>
          <Reveal className="svc__prose">
            {c.problem.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="svc svc--tint">
        <div className="container">
          <Reveal className="svc__head">
            <div className="mono-label">{locale === "cs" ? "Co automatizujeme" : "What we automate"}</div>
            <h2 className="section-title section-title--sm">{c.automateTitle}</h2>
          </Reveal>
          <div className="svc__cards">
            <Reveal className="svc__card">
              <h3 className="svc__card-title">{c.inputsTitle}</h3>
              <ul>
                {c.inputs.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="svc__card">
              <h3 className="svc__card-title">{c.outputsTitle}</h3>
              <ul>
                {c.outputs.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal>
            <p className="svc__integrations">{c.integrations}</p>
          </Reveal>
        </div>
      </section>

      {c.beforeAfter && (
        <section className="svc">
          <div className="container">
            <Reveal className="svc__head">
              <div className="mono-label">{locale === "cs" ? "Před a po" : "Before and after"}</div>
              <h2 className="section-title section-title--sm">
                {locale === "cs" ? "Stejný provoz, jiný den" : "Same operation, different day"}
              </h2>
            </Reveal>
            <div className="ba">
              <Reveal className="ba__col">
                <h3 className="ba__title">{c.beforeAfter.beforeTitle}</h3>
                <ul>
                  {c.beforeAfter.before.map((x, i) => (
                    <li key={i}>
                      <span className="ba__num">{String(i + 1).padStart(2, "0")}</span>
                      {x}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal className="ba__col ba__col--after">
                <h3 className="ba__title">{c.beforeAfter.afterTitle}</h3>
                <ul>
                  {c.beforeAfter.after.map((x, i) => (
                    <li key={i}>
                      <span className="ba__num">{String(i + 1).padStart(2, "0")}</span>
                      {x}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {c.comparison && (
        <section className="svc svc--tint">
          <div className="container">
            <Reveal className="svc__head">
              <div className="mono-label">{locale === "cs" ? "Srovnání" : "Comparison"}</div>
              <h2 className="section-title section-title--sm">
                {locale === "cs" ? "Čtyři možnosti vedle sebe" : "The four options side by side"}
              </h2>
            </Reveal>
            <Reveal>
              <div className="cmp-wrap">
                <table className="cmp">
                  <thead>
                    <tr>
                      {c.comparison.columns.map((col, i) => (
                        <th key={i} scope="col" className={i === c.comparison!.highlight ? "is-hi" : ""}>
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {c.comparison.rows.map((row) => (
                      <tr key={row.label}>
                        <th scope="row">{row.label}</th>
                        {row.cells.map((cell, i) => (
                          <td key={i} className={i + 1 === c.comparison!.highlight ? "is-hi" : ""}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="cmp__note">{c.comparison.note}</p>
            </Reveal>
          </div>
        </section>
      )}

      <section className="approach">
        <div className="container approach__inner">
          <Reveal className="approach__head">
            <div className="mono-label on-dark">{locale === "cs" ? "Jak to funguje" : "How it works"}</div>
            <h2 className="section-title">{c.stepsTitle}</h2>
          </Reveal>
          <div className="approach__grid">
            {c.steps.map((step) => (
              <Reveal key={step.num} className="step">
                <div className="step__meta-row">
                  <span className="step__num">{step.num}</span>
                </div>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__body">{step.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="price-block">
              <h3 className="price-block__title">{c.priceTitle}</h3>
              <ul className="price-block__list">
                {c.priceLines.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {c.example && (
        <section className="svc">
          <div className="container svc__two">
            <Reveal>
              <div className="mono-label">{locale === "cs" ? "Příklad" : "Example"}</div>
              <h2 className="section-title section-title--sm">{c.example.title}</h2>
            </Reveal>
            <Reveal className="svc__prose">
              <p>{c.example.body}</p>
            </Reveal>
          </div>
        </section>
      )}

      <Faq id="faq" label="FAQ" title={c.faqTitle} items={c.faqs} group={`faq-${serviceKey}`} />

      <FinalCta
        t={t}
        label={locale === "cs" ? "Shrnutí" : "Summary"}
        headline={c.summaryTitle}
        body={c.summary}
      />

      <section className="related">
        <div className="container related__inner">
          <div className="mono-label on-dark">{locale === "cs" ? "Související" : "Related"}</div>
          <nav className="related__links" aria-label={locale === "cs" ? "Související stránky" : "Related pages"}>
            {c.related.map((key) => (
              <Link key={key} href={pathFor(key, locale)}>
                {relatedLabel(key)}
              </Link>
            ))}
            <Link href={home}>{homeName}</Link>
          </nav>
        </div>
      </section>
    </PageShell>
  );
}

export function serviceUrl(serviceKey: string, locale: Locale) {
  return urlFor(serviceKey, locale);
}
