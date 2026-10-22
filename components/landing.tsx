"use client";

import { useState } from "react";
import { content } from "@/lib/content";
import type { Locale } from "@/lib/routes";
import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import Stats from "@/components/sections/stats";
import Services from "@/components/sections/services";
import Approach from "@/components/sections/approach";
import About from "@/components/sections/about";
import Faq from "@/components/sections/faq";
import FinalCta from "@/components/sections/final-cta";
import BookingModal from "@/components/booking-modal";

export default function Landing({ locale }: { locale: Locale }) {
  const [bookingOpen, setBookingOpen] = useState(false);

  const t = content[locale];
  const openBooking = () => setBookingOpen(true);

  return (
    <>
      <Header t={t} locale={locale} routeKey="home" onBook={openBooking} />
      <main>
        <Hero t={t} locale={locale} onBook={openBooking} />
        <Stats t={t} />
        <Services t={t} />
        <Approach t={t} />
        <About t={t} />
        <Faq t={t} />
        <FinalCta t={t} locale={locale} onBook={openBooking} />
      </main>
      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        t={t}
        lang={locale}
      />
    </>
  );
}
