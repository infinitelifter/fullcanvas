import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/routes";

/**
 * Everything is open, to search engines and to AI crawlers alike — being
 * readable by ChatGPT, Perplexity, Gemini and Claude is the point of this work.
 *
 * The AI agents are named explicitly rather than relying on the `*` rule, so
 * that a later tightening of `*` can't silently lock them out.
 *
 * Note: Next's robots.ts emits a structured file and cannot carry comments,
 * so the ASCII-art logo from the brief lives in /llms.txt instead (Phase 2b).
 */
const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bingbot",
  "Amazonbot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
