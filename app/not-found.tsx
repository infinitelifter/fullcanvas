import Link from "next/link";
import { sans, mono } from "@/lib/fonts";
import { SERVICE_ROUTES, pathFor } from "@/lib/routes";
import { serviceCopy } from "@/lib/services";
import "@/app/globals.css";

/**
 * Unmatched URLs have no route-group context, so Next renders this one
 * without a root layout — it has to supply <html> itself. Czech, because the
 * Czech tree is the site root. Links to home, the demo and every service page.
 */
export const metadata = {
  title: "Stránka nenalezena | Full Canvas Digital",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <html lang="cs" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <main className="notfound">
          <div className="container notfound__inner">
            <p className="mono-label">404</p>
            <h1 className="notfound__title">Tahle stránka tu není.</h1>
            <p className="notfound__body">
              Nejspíš jste šli podle staršího odkazu. Zkuste úvodní stránku, živou ukázku nebo některou ze služeb.
            </p>
            <nav className="notfound__links" aria-label="Navigace">
              <Link href="/" className="btn-primary">Úvodní stránka</Link>
              <Link href="/demo" className="hero__secondary">Živá ukázka →</Link>
            </nav>
            <nav className="notfound__services" aria-label="Služby">
              {SERVICE_ROUTES.map((r) => (
                <Link key={r.key} href={pathFor(r.key, "cs")}>
                  {serviceCopy(r.key, "cs").nav}
                </Link>
              ))}
            </nav>
          </div>
        </main>
      </body>
    </html>
  );
}
