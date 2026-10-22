import type { Metadata } from "next";
import DemoView from "@/components/demo-view";
import { content } from "@/lib/content";

/**
 * Metadata is per-route and this site has no locale-prefixed routes, so the
 * tags can only carry one language. Czech, matching <html lang="cs"> in the
 * root layout and the site's default locale.
 */
export const metadata: Metadata = {
  title: content.cs.demo.metaTitle,
  description: content.cs.demo.lead,
  robots: { index: false, follow: false },
};

export default function DemoPage() {
  return <DemoView />;
}
