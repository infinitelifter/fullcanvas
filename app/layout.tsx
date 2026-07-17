import type { Metadata } from "next";
import { Schibsted_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Schibsted_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Full Canvas Digital — AI automatizace pro firmy",
  description:
    "AI automatizace s pevným rozsahem a pevnou cenou. Faktury, e-maily, nabídky, firemní znalosti — první výsledek v provozu do 30 dní.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the no-js class is stripped pre-hydration and `lang` is toggled client-side
    <html lang="cs" className={`${sans.variable} ${mono.variable} no-js`} suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.remove('no-js');",
          }}
        />
        {children}
      </body>
    </html>
  );
}
