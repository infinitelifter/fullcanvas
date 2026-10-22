import type { Metadata } from "next";
import Landing from "@/components/landing";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("home", "cs");

export default function Page() {
  return <Landing locale="cs" />;
}
