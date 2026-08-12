import sanitizeHtml from "sanitize-html";
import coreSources from "@/knowledge/core.json";
import liveKnowledge from "@/knowledge/live-site.json";
import type { BlogPost } from "@/types";

export type KnowledgeSource = {
  id: string;
  title: string;
  url: string;
  kind: string;
  priority: number;
  text: string;
};

export type RetrievedSource = KnowledgeSource & {
  excerpt: string;
  score: number;
};

const staticSources: KnowledgeSource[] = [...coreSources, ...liveKnowledge.sources].map((source) => ({
  id: source.id,
  title: source.title,
  url: source.url,
  kind: source.kind,
  priority: source.priority,
  text: source.text,
}));

const stopWords = new Set([
  "a", "about", "academy", "all", "an", "and", "are", "at", "be", "can", "creative", "do",
  "for", "from", "has", "have", "how", "i", "in", "is", "it", "me", "my", "of", "on", "or",
  "our", "school", "stars", "the", "their", "to", "we", "what", "when", "where", "which", "who",
  "with", "you", "your",
]);

function plainText(html: string) {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function blogSources(posts: BlogPost[]): KnowledgeSource[] {
  return posts.map((post) => ({
    id: `blog-${post.id}`,
    title: post.title,
    url: `https://creativeallstarsacademy.sc.ke/blog/${encodeURIComponent(post.id)}`,
    kind: "current-blog",
    priority: 75,
    text: [post.summary, plainText(post.content)].filter(Boolean).join("\n\n"),
  }));
}

function terms(value: string) {
  return [...new Set(value.toLowerCase().normalize("NFKD").match(/[a-z0-9]+/g) ?? [])]
    .filter((term) => term.length > 1 && !stopWords.has(term));
}

function chunks(text: string, maximum = 1_600) {
  const paragraphs = text.split(/\n{2,}|(?<=[.!?])\s+(?=[A-Z0-9])/).map((part) => part.trim()).filter(Boolean);
  const result: string[] = [];
  let current = "";
  for (const paragraph of paragraphs) {
    if (current && current.length + paragraph.length + 1 > maximum) {
      result.push(current);
      current = "";
    }
    if (paragraph.length > maximum) {
      if (current) result.push(current);
      for (let at = 0; at < paragraph.length; at += maximum - 180) result.push(paragraph.slice(at, at + maximum));
    } else {
      current = current ? `${current} ${paragraph}` : paragraph;
    }
  }
  if (current) result.push(current);
  return result;
}

function pathMatches(sourceUrl: string, pagePath: string) {
  try {
    const sourcePath = new URL(sourceUrl).pathname.replace(/\/$/, "") || "/";
    const currentPath = pagePath.replace(/\/$/, "") || "/";
    return sourcePath === currentPath;
  } catch {
    return false;
  }
}

export function retrieveKnowledge(query: string, pagePath: string, posts: BlogPost[], limit = 7): RetrievedSource[] {
  const queryTerms = terms(query);
  const normalizedQuery = query.toLowerCase().replace(/\s+/g, " ").trim();
  const numbers = query.match(/\b\d[\d,.-]*\b/g) ?? [];
  const candidates: RetrievedSource[] = [];

  for (const source of [...staticSources, ...blogSources(posts)]) {
    for (const excerpt of chunks(source.text)) {
      const haystack = `${source.title} ${excerpt}`.toLowerCase();
      const title = source.title.toLowerCase();
      let score = source.priority / 100;
      for (const term of queryTerms) {
        if (title.includes(term)) score += 5;
        score += Math.min(haystack.split(term).length - 1, 6) * 1.4;
      }
      if (normalizedQuery.length > 8 && haystack.includes(normalizedQuery)) score += 10;
      for (const number of numbers) if (haystack.includes(number)) score += 3;
      if (pathMatches(source.url, pagePath)) score += 4;
      candidates.push({ ...source, excerpt, score });
    }
  }

  candidates.sort((left, right) => right.score - left.score || right.priority - left.priority);
  const selected: RetrievedSource[] = [];
  const perSource = new Map<string, number>();
  for (const candidate of candidates) {
    if ((perSource.get(candidate.id) ?? 0) >= 2) continue;
    selected.push(candidate);
    perSource.set(candidate.id, (perSource.get(candidate.id) ?? 0) + 1);
    if (selected.length === limit) break;
  }
  return selected;
}

export function formatKnowledgeContext(sources: RetrievedSource[]) {
  return sources.map((source, index) =>
    `[${index + 1}] ${source.title}\nSource URL: ${source.url}\nSource authority: ${source.kind}; priority ${source.priority}\n${source.excerpt}`,
  ).join("\n\n");
}
