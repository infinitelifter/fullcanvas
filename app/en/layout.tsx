import type { Metadata } from "next";
import RootHtml from "@/components/root-html";
import { buildRootMetadata } from "@/lib/seo";

export const metadata: Metadata = buildRootMetadata("en");

export default function EnRootLayout({ children }: { children: React.ReactNode }) {
  return <RootHtml locale="en">{children}</RootHtml>;
}
