import type { ReactNode } from "react";
import { content } from "@/lib/content";
import type { Locale } from "@/lib/routes";
import { BookingProvider } from "@/components/booking";
import Header from "@/components/sections/header";
import SiteFooter from "@/components/sections/site-footer";

/**
 * Header, booking modal and footer around any page. Server component: the
 * page content stays server-rendered; only the header and modal hydrate.
 */
export default function PageShell({
  locale,
  routeKey,
  children,
}: {
  locale: Locale;
  routeKey: string;
  children: ReactNode;
}) {
  const t = content[locale];
  return (
    <BookingProvider t={t} locale={locale}>
      <Header t={t} locale={locale} routeKey={routeKey} />
      <main>{children}</main>
      <SiteFooter t={t} locale={locale} routeKey={routeKey} />
    </BookingProvider>
  );
}
