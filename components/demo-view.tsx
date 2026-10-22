"use client";

import { useState } from "react";
import { content } from "@/lib/content";
import { useLang } from "@/lib/use-lang";
import Header from "@/components/sections/header";
import StepGrid from "@/components/sections/step-grid";
import SiteFooter from "@/components/sections/site-footer";
import BookingModal from "@/components/booking-modal";
import DemoFrame from "@/components/demo-frame";

export default function DemoView() {
  const [lang, changeLang] = useLang();
  const [bookingOpen, setBookingOpen] = useState(false);

  const t = content[lang];
  const d = t.demo;
  const openBooking = () => setBookingOpen(true);

  return (
    <>
      <Header
        t={t}
        lang={lang}
        onLangChange={changeLang}
        onBook={openBooking}
        homeHref="/"
      />
      <main>
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

        <DemoFrame t={t} lang={lang} onBook={openBooking} />

        <StepGrid steps={d.columns} />

        <section className="demo-cta">
          <div className="container demo-cta__inner">
            <button type="button" onClick={openBooking} className="btn-primary">
              {t.ctaPrimary}
            </button>
          </div>
        </section>
      </main>
      <SiteFooter t={t} />
      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        t={t}
        lang={lang}
      />
    </>
  );
}
