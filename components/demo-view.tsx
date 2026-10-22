import { content } from "@/lib/content";
import { urlFor, type Locale } from "@/lib/routes";
import { faqJsonLd } from "@/lib/seo";
import PageShell from "@/components/page-shell";
import StepGrid from "@/components/sections/step-grid";
import Faq from "@/components/sections/faq";
import FinalCta from "@/components/sections/final-cta";
import DemoFrame from "@/components/demo-frame";
import { BookButton } from "@/components/booking";

/**
 * /demo: the real Recepce app in a window, with the text crawlers and AI need
 * around it (H1, lead, how it works, FAQ, CTA). The app itself is unchanged;
 * it only hides its own header when loaded with ?embed=1.
 */
export default function DemoView({ locale }: { locale: Locale }) {
  const t = content[locale];
  const d = t.demo;
  const jsonLd = JSON.stringify(faqJsonLd(urlFor("demo", locale), d.faqs)).replace(/</g, "\\u003c");

  return (
    <PageShell locale={locale} routeKey="demo">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <section className="hero hero--compact">
        <div className="hero__blobs" aria-hidden="true">
          <div className="hero__blob hero__blob--1" />
          <div className="hero__blob hero__blob--2" />
          <div className="hero__blob hero__blob--3" />
        </div>
        <div className="container hero__content">
          <div className="hero__kicker">
            <span className="hero__kicker-rule" />
            {d.eyebrow}
          </div>
          <h1 className="hero__title">
            {d.headPre} <span className="hero__title-b">{d.headEm}</span>
            {d.headPost}
          </h1>
          <p className="hero__sub">{d.lead}</p>
        </div>
      </section>

      <DemoFrame t={t} locale={locale} />

      <StepGrid steps={d.columns} />

      <Faq id="demo-faq" label={d.faqLabel} title={d.faqTitle} items={d.faqs} group="demo-faq" />

      <section className="demo-cta">
        <div className="container demo-cta__inner">
          <p className="demo-cta__line">{d.ctaLine}</p>
          <BookButton className="btn-primary">{t.ctaPrimary}</BookButton>
        </div>
      </section>

      <FinalCta t={t} />
    </PageShell>
  );
}
