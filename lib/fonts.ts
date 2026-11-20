import localFont from "next/font/local";

/**
 * Shared by both root layouts (cs and en) so the fonts are declared once and
 * the two locales emit identical font CSS.
 *
 * The fonts are self-hosted from lib/font-files (variable woff2, Latin and
 * Latin Extended, SIL Open Font License) instead of next/font/google, so the
 * build never depends on a download from Google Fonts.
 */
export const sans = localFont({
  src: "./font-files/schibsted-grotesk.woff2",
  weight: "400 800",
  style: "normal",
  variable: "--font-sans",
  display: "swap",
});

export const mono = localFont({
  src: "./font-files/jetbrains-mono.woff2",
  weight: "400 500",
  style: "normal",
  variable: "--font-mono",
  display: "swap",
});
