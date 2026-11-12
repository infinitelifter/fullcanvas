import Image from "next/image";
import type { Content } from "@/lib/content";
import type { Locale } from "@/lib/routes";
import { demoHref } from "@/lib/demo";
import Reveal from "@/components/reveal";
import screenshot from "@/public/recepce-demo-screenshot.jpg";

/**
 * "Show the product": a real screenshot of the live demo in a browser frame,
 * linking straight to the deployed demo (new tab). TODO(Ondrej): replace the screenshot with a
 * 30–60 s screen recording (same frame, <video muted loop playsInline>).
 */
export default function ShowProduct({ t, locale }: { t: Content; locale: Locale }) {
  const p = t.product;
  return (
    <section id="ukazka" className="product">
      <div className="container product__inner">
        <Reveal className="product__copy">
          <div className="mono-label">{p.label}</div>
          <h2 className="section-title">{p.title}</h2>
          <p className="product__body">{p.body}</p>
          <p className="product__note">{p.note}</p>
          <a href={demoHref(locale)} target="_blank" rel="noopener" className="btn-primary btn-primary--sm">
            {p.cta}
          </a>
        </Reveal>
        <Reveal className="product__frame">
          {/* The "canvas": a dark frame and a brush stroke behind the screenshot's bottom-right corner. */}
          <img src="/canvas-brush.png" alt="" aria-hidden="true" className="product__canvas" width={441} height={577} loading="lazy" decoding="async" />
          <div className="browser">
            <div className="browser__bar" aria-hidden="true">
              <span className="browser__dot" />
              <span className="browser__dot" />
              <span className="browser__dot" />
              <span className="browser__url">demo.fullcanvas.cz</span>
            </div>
            <a href={demoHref(locale)} target="_blank" rel="noopener" aria-label={p.cta}>
              <Image src={screenshot} alt={p.alt} sizes="(max-width: 980px) 100vw, 560px" className="browser__img" placeholder="blur" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
