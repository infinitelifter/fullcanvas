"use client";

import { useState } from "react";
import type { Content } from "@/lib/content";

/**
 * Client logos, one colour (ink at reduced opacity), so no brand shouts
 * louder than another. Files in public/clients are pre-processed to a single
 * colour with transparency, 120 px tall; `h` is the display height that
 * balances wordmarks against symbols.
 */
const LOGOS = [
  { file: "feg", name: "FEG", w: 324, h: 26 },
  { file: "eurocykl", name: "Eurocykl", w: 249, h: 40 },
  { file: "netroot", name: "Netroot", w: 479, h: 34 },
  { file: "centrum-podebrady", name: "Centrum sociálních a zdravotních služeb Poděbrady", w: 572, h: 38 },
  { file: "learning-divers", name: "Learning Divers", w: 259, h: 28 },
  { file: "mistni-kultura", name: "Pro kulturu", w: 235, h: 40 },
  { file: "visual-planet", name: "Visual Planet", w: 212, h: 38 },
  { file: "zhubni-chytre", name: "Zhubni chytře", w: 408, h: 32 },
] as const;

/**
 * "Trusted by" strip under the hero: an endless horizontal loop (pure CSS,
 * the list is rendered twice and the track moves by half its width). It stops
 * on hover, keyboard focus and the pause button, and under
 * prefers-reduced-motion it becomes a static, wrapping row.
 */
export default function Trust({ t }: { t: Content }) {
  const [paused, setPaused] = useState(false);

  const row = (copy: boolean) =>
    LOGOS.map((logo) => (
      <li key={`${copy ? "b" : "a"}-${logo.file}`} className="trust__item" aria-hidden={copy || undefined}>
        {/* Plain <img>: tiny pre-sized PNGs, nothing for the image optimiser to do. */}
        <img
          src={`/clients/${logo.file}.png`}
          alt={copy ? "" : logo.name}
          width={Math.round((logo.w * logo.h) / 120)}
          height={logo.h}
          loading="lazy"
          decoding="async"
        />
      </li>
    ));

  return (
    <section className={`trust${paused ? " is-paused" : ""}`} aria-labelledby="trust-label">
      <div className="container trust__inner">
        <h2 id="trust-label" className="trust__label">
          {t.trustLabel}
        </h2>
        <div className="trust__viewport">
          <ul className="trust__track">
            {row(false)}
            {row(true)}
          </ul>
        </div>
        <button
          type="button"
          className="trust__toggle"
          aria-label={paused ? t.trustPlay : t.trustPause}
          onClick={() => setPaused((p) => !p)}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            {paused ? (
              <path d="M4 2.5v9l7.5-4.5z" fill="currentColor" />
            ) : (
              <path d="M4 2.5v9M10 2.5v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>
    </section>
  );
}
