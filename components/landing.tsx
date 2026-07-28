"use client";

import { useEffect, useState } from "react";
import { content, type Lang } from "@/lib/content";
import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import Stats from "@/components/sections/stats";
import Services from "@/components/sections/services";
import Approach from "@/components/sections/approach";
import About from "@/components/sections/about";
import Faq from "@/components/sections/faq";
import FinalCta from "@/components/sections/final-cta";
import BookingModal from "@/components/booking-modal";

const LANG_KEY = "fcd-lang";

export default function Landing() {
  const [lang, setLang] = useState<Lang>("cs");
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(LANG_KEY);
    if (saved === "en" || saved === "cs") setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const changeLang = (next: Lang) => {
    setLang(next);
    window.localStorage.setItem(LANG_KEY, next);
  };

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
