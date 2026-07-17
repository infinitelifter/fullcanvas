"use client";

import { useState } from "react";
import type { Content } from "@/lib/content";
import Reveal from "@/components/reveal";

type ServiceTab = "ai" | "build";

export default function Services({ t }: { t: Content }) {
  const [tab, setTab] = useState<ServiceTab>("ai");
  const cards = tab === "ai" ? t.aiServices : t.buildServices;

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
              onClick={() => setTab("ai")}
            >
              {t.tabAi}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "build"}
              className={tab === "build" ? "is-active" : ""}
              onClick={() => setTab("build")}
            >
              {t.tabBuild}
            </button>
          </div>
        </Reveal>
        <div className="services__grid">
          {cards.map((svc) => (
            <div key={svc.num} className="service-card">
              <div className="service-card__head">
                <span className="service-card__num">{svc.num}</span>
                <h3 className="service-card__title">{svc.title}</h3>
              </div>
              <p className="service-card__body">{svc.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
