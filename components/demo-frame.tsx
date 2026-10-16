"use client";

import { useEffect, useRef, useState } from "react";
import type { Content, Lang } from "@/lib/content";
import { readStoredLang } from "@/lib/use-lang";

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
  lang,
  onBook,
}: {
  t: Content;
  lang: Lang;
  onBook: () => void;
}) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  /**
   * Locale baked into the src, fixed at mount. Changing src would reload the
   * demo and throw away whatever the visitor had typed, so later locale
   * changes are sent over postMessage instead.
   */
  const [srcLang, setSrcLang] = useState<Lang | null>(null);

  useEffect(() => {
    setSrcLang(readStoredLang());
  }, []);

  // Covers the case this is actually for: the demo host is cold-starting and
  // the frame hangs. Note a browser fires `load` even for its own "can't
  // reach this site" page, so a dead origin shows that instead of our card —
  // detecting it would need cross-origin access we don't have.
  useEffect(() => {
    if (srcLang === null || loaded) return;
    const id = window.setTimeout(() => setTimedOut(true), LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(id);
  }, [srcLang, loaded]);

  // Keep the demo's language in step with ours. Fires once on load too, which
  // covers the case where the visitor switched locale before it finished.
  useEffect(() => {
    if (!loaded) return;
    frameRef.current?.contentWindow?.postMessage(
      { type: "set-lang", lang },
      originOf(DEMO_URL),
    );
  }, [lang, loaded]);

  // The demo posts back { type: "demo-lang", lang }. We deliberately don't
  // listen — our toggle is the source of truth.

  const showFallback = timedOut && !loaded;

  return (
    <section className="demo-embed">
      <div className="container">
        {srcLang !== null && (
          <div style={{ display: showFallback ? "none" : "block" }}>
            <iframe
              ref={frameRef}
              src={`${DEMO_URL}/?lang=${srcLang}`}
              title={t.demo.frameTitle}
              loading="lazy"
              allow="clipboard-write"
              className="demo-frame"
              onLoad={() => setLoaded(true)}
            />
          </div>
        )}

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
