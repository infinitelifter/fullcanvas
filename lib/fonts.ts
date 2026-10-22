import { Schibsted_Grotesk, JetBrains_Mono } from "next/font/google";

/**
 * Shared by both root layouts (cs and en) so the fonts are declared once and
 * the two locales emit identical font CSS.
 */
export const sans = Schibsted_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
