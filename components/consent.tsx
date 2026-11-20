"use client";

import { useEffect, useState, type ReactNode } from "react";
import Script from "next/script";
import type { ConsentCopy } from "@/lib/content";

type Choice = "granted" | "denied";

const STORAGE_KEY = "fc-consent";
const OPEN_EVENT = "fc:consent-open";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const HOTJAR_ID = Number(process.env.NEXT_PUBLIC_HOTJAR_ID) || null;
const TRACKING_ENABLED = Boolean(GA_ID || HOTJAR_ID);

function readChoice(): Choice | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function clearTrackingData() {
  const host = location.hostname;
  const domains = ["", host, `.${host.replace(/^www\./, "")}`];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name || !/^(_ga|_gid|_hj)/.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
  try {
    for (const store of [localStorage, sessionStorage]) {
      Object.keys(store)
        .filter((key) => key.startsWith("_hj"))
        .forEach((key) => store.removeItem(key));
    }
  } catch {}
}

/**
 * Cookie bar plus the GA4 and Hotjar loaders. Nothing loads until the visitor
 * accepts; without the NEXT_PUBLIC_* ids (localhost, previews) none of it renders.
 */
export function ConsentManager({ t }: { t: ConsentCopy }) {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!TRACKING_ENABLED) return;
    const stored = readChoice();
    setChoice(stored);
    setOpen(stored === null);
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  if (!TRACKING_ENABLED) return null;

  const decide = (next: Choice) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    setOpen(false);
    if (choice === "granted" && next === "denied") {
      clearTrackingData();
      // Loaded trackers can't be unloaded; a reload starts the page without them.
      location.reload();
      return;
    }
    setChoice(next);
  };

  return (
    <>
      {open && (
        <section className="consent" aria-label={t.label}>
          <p className="consent__text">{t.text}</p>
          <div className="consent__actions">
            <button type="button" className="consent__btn" onClick={() => decide("denied")}>
              {t.reject}
            </button>
            <button
              type="button"
              className="consent__btn consent__btn--accept"
              onClick={() => decide("granted")}
            >
              {t.accept}
            </button>
          </div>
        </section>
      )}

      {choice === "granted" && GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(GA_ID)});`}
          </Script>
        </>
      )}

      {choice === "granted" && HOTJAR_ID && (
        <Script id="hotjar-init" strategy="afterInteractive">
          {`(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:${HOTJAR_ID},hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
        </Script>
      )}
    </>
  );
}

export function CookieSettingsButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  if (!TRACKING_ENABLED) return null;
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
    >
      {children}
    </button>
  );
}
