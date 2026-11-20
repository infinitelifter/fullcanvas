# Full Canvas Digital — landing page

One-page bilingual (CS default / EN) marketing site for Full Canvas Digital, built with Next.js (App Router) and recreated from the design handoff. Fully static — no data fetching.

## Develop

```bash
npm install
npm run dev
```

## Deploy (Vercel)

```bash
npx vercel
```

Or push the repo to GitHub and import it at vercel.com — zero config needed.

Environment variables are listed in `.env.local.example`. Google Analytics 4 and Hotjar
(`NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_HOTJAR_ID`) load only after the visitor accepts the cookie
bar (`components/consent.tsx`); "Cookie settings" in the footer reopens it. Without the ids the
bar doesn't render, so local dev and previews without them aren't tracked.

## Structure

- `lib/content.ts` — all copy for both languages (i18n dictionary)
- `components/landing.tsx` — language state (persisted to localStorage, reflected in `<html lang>`)
- `components/sections/` — one component per page section
- `app/globals.css` — design tokens and all styling

## Notes

- The "Ukázky řešení" (Selected work) section from the brief was intentionally omitted.
- `hello@fullcanvas.digital` and the IČO in the footer are placeholders from the brief — confirm with the client.
- Fonts (Schibsted Grotesk + JetBrains Mono) are self-hosted via `next/font`.
