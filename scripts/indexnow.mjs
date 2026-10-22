#!/usr/bin/env node
/**
 * Ping IndexNow (Bing, Yandex, Seznam and others) with every URL in the
 * sitemap. Run manually after a deploy:
 *
 *     node scripts/indexnow.mjs
 *
 * ChatGPT's search leans on Bing, so this is the cheapest way to get new
 * pages in front of it without waiting for a crawl.
 */
import { readdir } from "node:fs/promises";
import { join } from "node:path";

const HOST = "www.fullcanvas.cz";
const SITEMAP = `https://${HOST}/sitemap.xml`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

async function findKey() {
  const files = await readdir(join(process.cwd(), "public"));
  const keyFile = files.find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
  if (!keyFile) throw new Error("No IndexNow key file found in /public.");
  return keyFile.replace(/\.txt$/, "");
}

async function sitemapUrls() {
  const res = await fetch(SITEMAP);
  if (!res.ok) throw new Error(`Sitemap returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const key = await findKey();
const urlList = await sitemapUrls();

if (urlList.length === 0) {
  console.error("Sitemap contained no URLs — nothing submitted.");
  process.exit(1);
}

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key,
    keyLocation: `https://${HOST}/${key}.txt`,
    urlList,
  }),
});

// 200 and 202 both mean accepted; 422 usually means the key file isn't live yet.
console.log(`IndexNow ${res.status} ${res.statusText} — submitted ${urlList.length} URLs:`);
for (const u of urlList) console.log("  " + u);
if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}
