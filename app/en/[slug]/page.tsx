import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "@/components/service-page";
import { buildMetadata } from "@/lib/seo";
import { SERVICE_ROUTES, serviceKeyForSlug, serviceSlug } from "@/lib/routes";

const LOCALE = "en" as const;

/** Every service page is pre-rendered; an unknown slug is a 404, never a fallback. */
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_ROUTES.map((r) => ({ slug: serviceSlug(r.key, LOCALE) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const key = serviceKeyForSlug(slug, LOCALE);
  if (!key) return {};
  return buildMetadata(key, LOCALE);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const key = serviceKeyForSlug(slug, LOCALE);
  if (!key) notFound();
  return <ServicePage serviceKey={key} locale={LOCALE} />;
}
