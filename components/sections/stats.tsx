"use client";

import { useEffect, useRef, useState } from "react";
import type { Content, Stat } from "@/lib/content";
import Reveal from "@/components/reveal";

const COUNT_DURATION = 1150;

function StatValue({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(stat.value == null ? 1 : 0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || stat.value == null) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting) || startedRef.current) return;
        startedRef.current = true;
        observer.disconnect();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setProgress(1);
          return;
        }
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / COUNT_DURATION);
          setProgress(p);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        // rAF is throttled in background tabs; make sure the final value always lands
        window.setTimeout(() => setProgress(1), COUNT_DURATION + 100);
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const eased = 1 - Math.pow(1 - progress, 3);
  const text = stat.value == null ? stat.display : `${Math.round(stat.value * eased)}${stat.suffix}`;

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
