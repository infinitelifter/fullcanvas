import Image from "next/image";
import type { Content } from "@/lib/content";
import type { Locale } from "@/lib/routes";
import { demoHref } from "@/lib/demo";
import screenshot from "@/public/recepce-demo-screenshot.jpg";

/**
 * The way into the live demo: a screenshot of the app in a browser-style
 * window and a button, both opening demo.fullcanvas.cz in a new tab. The app
 * is not embedded; in a frame it only ever loaded small.
 */
export default function DemoFrame({ t, locale }: { t: Content; locale: Locale }) {
  const href = demoHref(locale);

  return (
    <section className="demo-embed">
      <div className="container demo-embed__inner">
        <div className="browser browser--demo">
          <div className="browser__bar" aria-hidden="true">
            <span className="browser__dot" />
            <span className="browser__dot" />
            <span className="browser__dot" />
            <span className="browser__url">demo.fullcanvas.cz</span>
            <span className="browser__live">{t.demo.liveBadge}</span>
          </div>
          <a href={href} target="_blank" rel="noopener" aria-label={t.demo.open}>
            <Image
              src={screenshot}
              alt={t.product.alt}
              sizes="(max-width: 900px) 100vw, 800px"
              className="browser__img"
              placeholder="blur"
              priority
            />
          </a>
        </div>
        <a href={href} target="_blank" rel="noopener" className="btn-primary demo-embed__open">
          {t.demo.open}
        </a>
        <p className="demo-embed__note">{t.demo.frameNote}</p>
      </div>
    </section>
  );
}
