"use client";

import { useEffect, useRef, useState } from "react";
import type { Content, Stat } from "@/lib/content";
import Reveal from "@/components/reveal";

const COUNT_DURATION = 1150;

function StatValue({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  /**
   * Start at the finished value, never at 0. The real number is therefore in
   * the server-rendered markup, so no-JS visitors, prefers-reduced-motion,
   * crawlers and plain `fetch` all see "30 dní" rather than "0 dní".
   *
   * We only rewind to 0 once the observer has told us the tile is off-screen,
   * which means a count-up is never visible as a 30 → 0 → 30 flash.
   */
  const [progress, setProgress] = useState(1);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || stat.value == null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let seen = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);

        // First callback reports the state at mount.
        if (!seen) {
          seen = true;
          if (visible) {
            // Already on screen — keep the final value instead of flashing.
            observer.disconnect();
            return;
          }
          setProgress(0);
          return;
        }

        if (!visible || startedRef.current) return;
        startedRef.current = true;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / COUNT_DURATION);
          setProgress(p);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        // rAF is throttled in background tabs; make sure the final value lands.
        window.setTimeout(() => setProgress(1), COUNT_DURATION + 100);
      },
      { threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const eased = 1 - Math.pow(1 - progress, 3);
  // At rest we render the authored string, so the DOM always matches `display`.
  const text =
    stat.value == null || progress === 1
      ? stat.display
      : `${Math.round(stat.value * eased)}${stat.suffix}`;

  return (
    <div ref={ref} className="stat__value">
      {text}
    </div>
  );
}

export default function Stats({ t }: { t: Content }) {
  return (
    <section className="stats">
      <div className="container stats__grid">
        {t.stats.map((stat, i) => (
          <Reveal key={i} className="stat">
            <StatValue stat={stat} />
            <div className="stat__label">{stat.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
