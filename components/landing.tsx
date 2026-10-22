import { content } from "@/lib/content";
import type { Locale } from "@/lib/routes";
import PageShell from "@/components/page-shell";
import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import Approach from "@/components/sections/approach";
import About from "@/components/sections/about";
import ShowProduct from "@/components/sections/show-product";
import Faq from "@/components/sections/faq";
import FinalCta from "@/components/sections/final-cta";

export default function Landing({ locale }: { locale: Locale }) {
  const t = content[locale];

  return (
    <PageShell locale={locale} routeKey="home">
      <Hero t={t} locale={locale} />
      <Services t={t} locale={locale} />
      <Approach t={t} />
      <About t={t} />
      <ShowProduct t={t} locale={locale} />
      <Faq label={t.faqLabel} title={t.faqTitle} items={t.faqs} />
      <FinalCta t={t} />
    </PageShell>
  );
}
