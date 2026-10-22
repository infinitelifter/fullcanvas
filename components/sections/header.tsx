"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import type { Content } from "@/lib/content";
import { pathFor, type Locale } from "@/lib/routes";
import Logo from "@/components/logo";
import { useBooking } from "@/components/booking";

/**
 * Language toggle, centred wordmark, the CTA and one burger button. The nav
 * lives in a full-screen sheet; the hairline along the bottom edge shows how
 * far down the page the reader is.
 */
export default function Header({
  t,
  locale,
  routeKey,
}: {
  t: Content;
  locale: Locale;
  /** Which page we're on, so the switcher links to its counterpart. */
  routeKey: string;
}) {
  const openBooking = useBooking();
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const sheetId = useId();

  const home = pathFor("home", locale);
  const anchor = (hash: string) => (routeKey === "home" ? `#${hash}` : `${home}#${hash}`);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const d = document.documentElement;
      const max = d.scrollHeight - d.clientHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  // The sheet locks page scroll and closes on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  const items = [
    { href: anchor("sluzby"), label: t.nav.services },
    { href: anchor("postup"), label: t.nav.how },
    { href: anchor("faq"), label: t.nav.faq },
    { href: pathFor("demo", locale), label: t.navDemo },
    { href: anchor("kontakt"), label: t.nav.contact },
  ];

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        {/* Real links, not state: crawlers must be able to reach both locales. */}
        <div className="lang-toggle">
          <Link
            href={pathFor(routeKey, "cs")}
            hrefLang="cs"
            className={locale === "cs" ? "is-active" : ""}
            aria-current={locale === "cs" ? "true" : undefined}
          >
            CS
          </Link>
          <Link
            href={pathFor(routeKey, "en")}
            hrefLang="en"
            className={locale === "en" ? "is-active" : ""}
            aria-current={locale === "en" ? "true" : undefined}
          >
            EN
          </Link>
        </div>

        <Link href={home} aria-label="Full Canvas Digital" className="site-header__logo">
          <Logo />
        </Link>

        <div className="site-header__end">
          <button type="button" onClick={openBooking} className="btn-header">
            {t.ctaShort}
          </button>
          <button
            type="button"
            className="burger"
            aria-label={t.nav.menuOpen}
            aria-expanded={menuOpen}
            aria-controls={sheetId}
            onClick={() => setMenuOpen(true)}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="site-header__progress" aria-hidden="true">
        <div className="site-header__progress-bar" style={{ transform: `scaleX(${progress})` }} />
      </div>

      {/* Portalled to <body>: the header's backdrop-filter would otherwise
          become the containing block of this fixed sheet and clip it. */}
      {menuOpen &&
        createPortal(
        <div id={sheetId} className="sheet" role="dialog" aria-modal="true" aria-label={t.navLabel}>
          <div className="container sheet__top">
            <Logo />
            <button type="button" className="burger" aria-label={t.nav.menuClose} onClick={close}>
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav className="container sheet__nav" aria-label={t.navLabel}>
            {items.map((item) => (
              <Link key={item.href} href={item.href} className="sheet__item" onClick={close}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="container sheet__bottom">
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                close();
                openBooking();
              }}
            >
              {t.ctaPrimary}
            </button>
            <div className="lang-toggle">
              <Link href={pathFor(routeKey, "cs")} hrefLang="cs" className={locale === "cs" ? "is-active" : ""}>
                CS
              </Link>
              <Link href={pathFor(routeKey, "en")} hrefLang="en" className={locale === "en" ? "is-active" : ""}>
                EN
              </Link>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </header>
  );
}
