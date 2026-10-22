import type { Metadata } from "next";
import DemoView from "@/components/demo-view";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("demo", "cs");

export default function DemoPage() {
  return <DemoView locale="cs" />;
}
