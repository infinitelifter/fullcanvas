import type { Metadata } from "next";
import RootHtml from "@/components/root-html";
import { buildRootMetadata } from "@/lib/seo";

export const metadata: Metadata = buildRootMetadata("cs");

export default function CsRootLayout({ children }: { children: React.ReactNode }) {
  return <RootHtml locale="cs">{children}</RootHtml>;
}
