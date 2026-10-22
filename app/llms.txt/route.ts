import { llmsTxt } from "@/lib/seo";

/**
 * /llms.txt: a plain-text summary for AI crawlers (who we are, what we do,
 * every page with its URL, contact, areas served). Built from lib/routes and
 * lib/services, so it never goes stale. Static at build time.
 */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
