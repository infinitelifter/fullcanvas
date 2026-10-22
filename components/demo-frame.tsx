"use client";

import { useEffect, useRef, useState } from "react";
import type { Content } from "@/lib/content";
import type { Locale } from "@/lib/routes";

/**
 * The Recepce demo is a separate FastAPI app on its own origin — it needs a
 * long-running process, so it is embedded, not proxied through Next.
 */
export const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL ?? "https://demo.fullcanvas.cz";

const LOAD_TIMEOUT_MS = 6000;

function originOf(url: string): string {
  try {
    return new URL(url).origin;
  } catch {
    return url;
  }
}

export default function DemoFrame({
  t,
  locale,
  onBook,
}: {
  t: Content;
  locale: Locale;
  onBook: () => void;
}) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  // Covers the case this is actually for: the demo host is cold-starting and
  // the frame hangs. Note a browser fires `load` even for its own "can't
  // reach this site" page, so a dead origin shows that instead of our card —
  // detecting it would need cross-origin access we don't have.
  useEffect(() => {
    if (loaded) return;
    const id = window.setTimeout(() => setTimedOut(true), LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(id);
  }, [loaded]);

  // The locale now comes from the URL and cannot change without a full page
  // load, so the src already carries it. This one message on load is belt and
  // braces, in case the frame restored a cached language of its own.
  useEffect(() => {
    if (!loaded) return;
    frameRef.current?.contentWindow?.postMessage(
      { type: "set-lang", lang: locale },
      originOf(DEMO_URL),
    );
  }, [locale, loaded]);

  // The demo posts back { type: "demo-lang", lang }. We deliberately don't
  // listen — the URL is the source of truth.

  const showFallback = timedOut && !loaded;

  return (
    <section className="demo-embed">
      <div className="container">
        <div style={{ display: showFallback ? "none" : "block" }}>
          <iframe
            ref={frameRef}
            src={`${DEMO_URL}/?lang=${locale}`}
            title={t.demo.frameTitle}
            loading="lazy"
            allow="clipboard-write"
            className="demo-frame"
            onLoad={() => setLoaded(true)}
          />
        </div>

        {showFallback && (
          <div className="demo-fallback">
            <p className="demo-fallback__text">{t.demo.fallback}</p>
            <button type="button" onClick={onBook} className="btn-primary">
              {t.ctaPrimary}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
