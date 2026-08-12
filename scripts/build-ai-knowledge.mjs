import { mkdir, writeFile } from "node:fs/promises";
import sanitizeHtml from "sanitize-html";

const ORIGIN = "https://creativeallstarsacademy.sc.ke";
const OUTPUT = new URL("../knowledge/live-site.json", import.meta.url);
const SITEMAP = `${ORIGIN}/sitemap.xml`;
const MAX_PAGE_CHARACTERS = 50_000;

function decode(value) {
  return sanitizeHtml(String(value ?? ""), { allowedTags: [], allowedAttributes: {} })
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#39;", "'");
}

function normalizeText(value) {
  return decode(value)
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function fetchText(url, attempt = 1) {
  const response = await fetch(url, {
    headers: { "user-agent": "CASAKnowledgeBuilder/1.0 (+https://creativeallstarsacademy.sc.ke)" },
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) {
    if (attempt < 3 && response.status >= 500) return fetchText(url, attempt + 1);
    throw new Error(`${url}: ${response.status} ${response.statusText}`);
  }
  return response.text();
}

function xmlLocations(xml) {
  return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) => normalizeText(match[1]));
}

async function discoverPages() {
  const seenSitemaps = new Set();
  const pages = new Set();
  async function visit(url) {
    if (seenSitemaps.has(url)) return;
    seenSitemaps.add(url);
    const xml = await fetchText(url);
    for (const location of xmlLocations(xml)) {
      if (location.endsWith(".xml")) await visit(location);
      else if (location.startsWith(ORIGIN)) pages.add(location.replace(/\/$/, ""));
    }
  }
  await visit(SITEMAP);
  return [...pages].sort();
}

function pageTitle(html, url) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return normalizeText(match?.[1] || new URL(url).pathname || "Creative All Stars Academy");
}

function pageDescription(html) {
  const match = html.match(/<meta[^>]+name=["']description["'][^>]*>/i);
  return normalizeText(match?.[0].match(/content=["']([^"']*)["']/i)?.[1] || "");
}

function pageText(html) {
  const withoutNoise = html
    .replace(/<(script|style|svg|noscript|template)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|section|article|header|footer|main|li|h[1-6])>/gi, "\n");
  return normalizeText(sanitizeHtml(withoutNoise, { allowedTags: [], allowedAttributes: {} }))
    .slice(0, MAX_PAGE_CHARACTERS);
}

function documentsIn(html, pageUrl) {
  const documents = new Set();
  for (const match of html.matchAll(/href=["']([^"']+)["']/gi)) {
    const href = decode(match[1]);
    if (!/\.(pdf|docx?|txt)(?:[?#]|$)/i.test(href)) continue;
    try { documents.add(new URL(href, pageUrl).href); } catch { /* Ignore malformed links. */ }
  }
  return [...documents].sort();
}

async function mapWithConcurrency(items, concurrency, mapper) {
  const results = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await mapper(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return results;
}

const urls = await discoverPages();
const sources = await mapWithConcurrency(urls, 4, async (url) => {
  const html = await fetchText(url);
  const title = pageTitle(html, url);
  const description = pageDescription(html);
  const text = pageText(html);
  console.log(`${url} (${text.length} characters)`);
  return {
    id: `live-${new URL(url).pathname.replace(/^\/+|\/+$/g, "").replace(/[^a-z0-9]+/gi, "-") || "home"}`,
    title,
    url,
    kind: url.includes("/blog/") ? "live-article" : "live-page",
    priority: url.includes("/blog/") ? 45 : 60,
    text: [description, text].filter(Boolean).join("\n\n"),
    documents: documentsIn(html, url),
  };
});

await mkdir(new URL("../knowledge/", import.meta.url), { recursive: true });
await writeFile(OUTPUT, `${JSON.stringify({ generatedAt: new Date().toISOString(), origin: ORIGIN, sources }, null, 2)}\n`, "utf8");
console.log(`Wrote ${sources.length} sources to ${OUTPUT.pathname}`);
