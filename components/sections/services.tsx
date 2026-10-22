"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Content, ServiceCard } from "@/lib/content";
import { SERVICE_ROUTES, pathFor, type Locale } from "@/lib/routes";
import Reveal from "@/components/reveal";
import { useBooking } from "@/components/booking";

type ServiceTab = "ai" | "build";

/**
 * Homepage cards → service pages, by position. The five AI cards map to the
 * five service pages in the same order; the comparison page is linked from
 * the footer and the service pages themselves.
 */
const AI_LINKS = ["invoices", "email", "quotes", "hotels", "knowledge"] as const;

const DESKTOP_STEP = 300;
const MOBILE_STEP = 56;

/**
 * One card in focus, the others stacked behind it. Every card is in the HTML
 * in document order (crawlers read all five); only the transforms change.
 */
export default function Services({ t, locale }: { t: Content; locale: Locale }) {
  const openBooking = useBooking();
  const [tab, setTab] = useState<ServiceTab>("ai");
  const [idx, setIdx] = useState(0);
  const [narrow, setNarrow] = useState(false);
  const wheelAcc = useRef(0);
  const wheelLock = useRef(0);

  const cards: ServiceCard[] = tab === "ai" ? t.aiServices : t.buildServices;
  const n = cards.length;

  const go = useCallback((i: number) => setIdx(((i % n) + n) % n), [n]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const switchTab = (next: ServiceTab) => {
    setTab(next);
    setIdx(0);
  };

  // A horizontal trackpad swipe moves the selection; vertical keeps scrolling the page.
  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    const now = Date.now();
    if (now < wheelLock.current) return;
    wheelAcc.current += e.deltaX;
    if (Math.abs(wheelAcc.current) > 40) {
      go(idx + (wheelAcc.current > 0 ? 1 : -1));
      wheelAcc.current = 0;
      wheelLock.current = now + 550;
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(idx - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(idx + 1);
    }
  };

  const hrefFor = (i: number): string | null => {
    if (tab !== "ai") return null;
    const key = AI_LINKS[i];
    return SERVICE_ROUTES.some((r) => r.key === key) ? pathFor(key, locale) : null;
  };

  const step = narrow ? MOBILE_STEP : DESKTOP_STEP;
  const scale = narrow ? 0.06 : 0.1;

  return (
    <section id="sluzby" className="services">
      <div className="container services__inner">
        <Reveal className="services__head">
          <div className="services__head-copy">
            <div className="mono-label">{t.servicesLabel}</div>
            <h2 className="section-title">{t.servicesTitle}</h2>
          </div>
          <div className="seg-toggle" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={tab === "ai"}
              className={tab === "ai" ? "is-active" : ""}
              onClick={() => switchTab("ai")}
            >
              {t.tabAi}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "build"}
              className={tab === "build" ? "is-active" : ""}
              onClick={() => switchTab("build")}
            >
              {t.tabBuild}
            </button>
          </div>
        </Reveal>

        <Reveal>
          <div
            className="slider"
            tabIndex={0}
            onWheel={onWheel}
            onKeyDown={onKeyDown}
            aria-roledescription="carousel"
            aria-label={t.servicesTitle}
          >
            <button type="button" className="slider__arrow slider__arrow--l" onClick={() => go(idx - 1)} aria-label={t.slider.prev}>
              <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
                <path d="M21 6L10 17l11 11" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="slider__stage">
              {cards.map((card, i) => {
                let d = i - idx;
                if (d > n / 2) d -= n;
                if (d < -n / 2) d += n;
                const a = Math.abs(d);
                const on = d === 0;
                const opacity = a === 0 ? 1 : a === 1 ? 0.55 : a === 2 ? 0.22 : 0;
                const href = hrefFor(i);
                const label = `${tab === "ai" ? t.slider.labelAi : t.slider.labelBuild} · ${card.num}`;
                return (
                  <article
                    key={`${tab}-${card.num}`}
                    className={`scard${on ? " is-on" : ""}`}
                    style={{
                      transform: `translate(-50%, -50%) translateX(${d * step}px) scale(${1 - a * scale})`,
                      opacity,
                      zIndex: 10 - a,
                      pointerEvents: a > 2 ? "none" : "auto",
                    }}
                    aria-hidden={!on}
                    onClick={() => {
                      if (!on) go(i);
                    }}
                  >
                    <span className="scard__label">{label}</span>
                    <h3 className="scard__title">
                      {href ? (
                        <Link href={href} tabIndex={on ? 0 : -1} onClick={(e) => { if (!on) e.preventDefault(); }}>
                          {card.title}
                        </Link>
                      ) : (
                        card.title
                      )}
                    </h3>
                    <p className="scard__body">{card.body}</p>
                    {card.note && <p className="scard__note">{card.note}</p>}
                    {href ? (
                      <Link href={href} className="scard__more" tabIndex={on ? 0 : -1} onClick={(e) => { if (!on) e.preventDefault(); }}>
                        {t.slider.moreAi}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className="scard__more"
                        tabIndex={on ? 0 : -1}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (on) openBooking();
                          else go(i);
                        }}
                      >
                        {t.slider.moreBuild}
                      </button>
                    )}
                  </article>
                );
              })}
            </div>

            <button type="button" className="slider__arrow slider__arrow--r" onClick={() => go(idx + 1)} aria-label={t.slider.next}>
              <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
                <path d="M13 6l11 11-11 11" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="slider__dots">
              {cards.map((card, i) => (
                <button
                  key={card.num}
                  type="button"
                  className={i === idx ? "is-on" : ""}
                  onClick={() => go(i)}
                  aria-label={`${t.slider.goTo} ${card.num}`}
                  tabIndex={-1}
                />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="services__note">{t.servicesNote}</p>
        </Reveal>
      </div>
    </section>
  );
}
