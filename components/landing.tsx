"use client";

import { useState } from "react";
import { content } from "@/lib/content";
import { useLang } from "@/lib/use-lang";
import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import Stats from "@/components/sections/stats";
import Services from "@/components/sections/services";
import Approach from "@/components/sections/approach";
import About from "@/components/sections/about";
import Faq from "@/components/sections/faq";
import FinalCta from "@/components/sections/final-cta";
import BookingModal from "@/components/booking-modal";

export default function Landing() {
  const [lang, changeLang] = useLang();
  const [bookingOpen, setBookingOpen] = useState(false);

  const t = content[lang];
  const openBooking = () => setBookingOpen(true);

  return (
    <>
      <Header t={t} lang={lang} onLangChange={changeLang} onBook={openBooking} />
      <main>
        <Hero t={t} onBook={openBooking} />
        <Stats t={t} />
        <Services t={t} />
        <Approach t={t} />
        <About t={t} />
        <Faq t={t} />
        <FinalCta t={t} onBook={openBooking} />
      </main>
      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        t={t}
        lang={lang}
      />
    </>
  );
}
