"use client";

import { useState } from "react";
import type { Content } from "@/lib/content";
import Reveal from "@/components/reveal";

export default function Faq({ t }: { t: Content }) {
  const [open, setOpen] = useState<Record<number, boolean>>({});

  return (
    <section id="faq" className="faq">
      <div className="faq__inner">
        <Reveal className="faq__head">
          <div className="mono-label">{t.faqLabel}</div>
          <h2 className="section-title">{t.faqTitle}</h2>
        </Reveal>
        <Reveal className="faq__list">
          {t.faqs.map((faq, i) => (
            <div key={i} className="faq__item">
              <button
                type="button"
                className="faq__question"
                aria-expanded={!!open[i]}
                onClick={() => setOpen((prev) => ({ ...prev, [i]: !prev[i] }))}
              >
                <span>{faq.q}</span>
                <span className="faq__sign" aria-hidden="true">
                  {open[i] ? "–" : "+"}
                </span>
              </button>
              {open[i] && <p className="faq__answer">{faq.a}</p>}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
