import { scrape, search, type ScrapeResult } from "./firecrawl";

const AUTHORITATIVE = [
  "fmcsa.dot.gov",
  "ecfr.gov",
  "federalregister.gov",
  "transportation.gov",
  "cvsa.org",
  "govinfo.gov",
  ".gov",
];

function domainScore(url: string): number {
  const u = url.toLowerCase();
  for (let i = 0; i < AUTHORITATIVE.length; i++) {
    if (u.includes(AUTHORITATIVE[i])) return AUTHORITATIVE.length - i;
  }
  return 0;
}

export interface Research {
  notes: string;
  sources: { url: string; title: string }[];
}

/** Gather and rank primary sources for a topic, then build trimmed source notes. */
export async function research(topic: string): Promise<Research> {
  const queries = [topic, `${topic} FMCSA 49 CFR rule`];
  const seen = new Set<string>();
  const hits: { url: string; title: string; description: string }[] = [];

  for (const q of queries) {
    let results: Awaited<ReturnType<typeof search>> = [];
    try {
      results = await search(q, { limit: 6 });
    } catch {
      results = [];
    }
    for (const r of results) {
      if (seen.has(r.url)) continue;
      seen.add(r.url);
      hits.push(r);
    }
  }

  hits.sort((a, b) => domainScore(b.url) - domainScore(a.url));
  const top = hits.slice(0, 5);

  const scraped = (await Promise.all(top.map((h) => scrape(h.url)))).filter(
    (s): s is ScrapeResult => s !== null
  );

  let notes = "";
  const sources: { url: string; title: string }[] = [];
  for (const s of scraped) {
    const title = s.title || top.find((t) => t.url === s.url)?.title || s.url;
    const excerpt = s.markdown.replace(/\n{3,}/g, "\n\n").slice(0, 1600);
    const block = `SOURCE: ${title}\nURL: ${s.url}\n${excerpt}\n---\n`;
    if (notes.length + block.length > 9000) break;
    notes += block;
    sources.push({ url: s.url, title });
  }

  return { notes, sources };
}
