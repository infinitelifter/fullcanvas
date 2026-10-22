"use client";

import { useEffect, useRef } from "react";

/**
 * Slow drifting smoke behind the hero, in the site's own colours. Drawn at a
 * tiny resolution (the canvas is 192×120) and blurred by CSS, so it costs
 * almost nothing and never looks like noise. Under prefers-reduced-motion it
 * draws one frame and stops. Without JavaScript the dark ground stays and the
 * page is identical in every other way.
 */

const BASE = [27, 26, 32] as const; // --dark
const WINE = [124, 45, 70] as const; // --accent
const MAUVE = [201, 139, 160] as const; // --mauve

function makeSmoke(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return null;
  const W = canvas.width;
  const H = canvas.height;
  const img = ctx.createImageData(W, H);
  const px = img.data;

  // Classic value noise with a fixed seed, so the field is the same on every visit.
  const perm: number[] = [];
  for (let i = 0; i < 256; i++) perm[i] = i;
  let seed = 4242;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const tmp = perm[i];
    perm[i] = perm[j];
    perm[j] = tmp;
  }
  const P = new Uint8Array(512);
  for (let i = 0; i < 512; i++) P[i] = perm[i & 255];
  const G = new Float32Array(512);
  for (let i = 0; i < 512; i++) G[i] = rnd() * 2 - 1;

  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  function noise(x: number, y: number, z: number) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);
    const u = fade(x);
    const v = fade(y);
    const w = fade(z);
    const A = P[X] + Y;
    const AA = P[A] + Z;
    const AB = P[A + 1] + Z;
    const B = P[X + 1] + Y;
    const BA = P[B] + Z;
    const BB = P[B + 1] + Z;
    return lerp(
      lerp(lerp(G[AA & 511], G[BA & 511], u), lerp(G[AB & 511], G[BB & 511], u), v),
      lerp(lerp(G[(AA + 1) & 511], G[(BA + 1) & 511], u), lerp(G[(AB + 1) & 511], G[(BB + 1) & 511], u), v),
      w,
    );
  }
  const fbm = (x: number, y: number, z: number) =>
    noise(x, y, z) * 0.6 + noise(x * 2.3, y * 2.3, z * 1.4) * 0.28 + noise(x * 4.7, y * 4.7, z * 1.9) * 0.12;

  let t = 0;
  return function frame(dt: number) {
    t += dt;
    const s = 2.2 / W;
    let i = 0;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const nx = x * s + t * 0.012;
        const ny = y * s - t * 0.008;
        const n = fbm(nx, ny, t * 0.035) * 0.5 + 0.5;
        const cloud = Math.max(0, (n - 0.44) / 0.46);
        const c = Math.min(1, cloud * cloud * 1.7);
        const thread = Math.max(0, (fbm(nx * 1.6 + 5.2, ny * 1.6 - 3.7, t * 0.05) * 0.5 + 0.5 - 0.6) / 0.3);
        for (let k = 0; k < 3; k++) {
          const v = BASE[k] + (WINE[k] - BASE[k]) * c + (MAUVE[k] - WINE[k]) * thread * c * 0.85;
          px[i++] = v > 255 ? 255 : v;
        }
        px[i++] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  };
}

export default function HeroSmoke() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const frame = makeSmoke(canvas);
    if (!frame) return;

    frame(0.016);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = performance.now();
    let paused = document.hidden;
    const loop = (now: number) => {
      raf = window.requestAnimationFrame(loop);
      if (paused || now - last < 40) return; // ~25 fps is plenty for smoke
      const dt = Math.min(0.08, (now - last) / 1000);
      last = now;
      frame(dt);
    };
    raf = window.requestAnimationFrame(loop);

    const onVisibility = () => {
      paused = document.hidden;
      last = performance.now();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="hero__smoke" width={192} height={120} aria-hidden="true" />;
}
