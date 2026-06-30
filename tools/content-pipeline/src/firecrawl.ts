import { config } from "./config";

/*
 * Minimal Firecrawl REST client (search + scrape) over fetch. No SDK dependency,
 * so it does not break when Firecrawl bumps their package. Tolerant of the small
 * response-shape differences between API versions.
 */

export interface SearchResult {
  url: string;
  title: string;
  description: string;
}

export interface ScrapeResult {
  url: string;
  markdown: string;
  title: string;
}

function authHeaders(): Record<string, string> {
  if (!config.firecrawlKey) {
    throw new Error("FIRECRAWL_API_KEY is not set. Add it to tools/content-pipeline/.env");
  }
  return {
    Authorization: `Bearer ${config.firecrawlKey}`,
    "Content-Type": "application/json",
  };
}

async function postJson(path: string, body: unknown, timeoutMs = 60000): Promise<any> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${config.firecrawlUrl}${path}`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = (json as { error?: string })?.error || `HTTP ${res.status}`;
      throw new Error(`Firecrawl ${path} failed: ${msg}`);
    }
    return json;
  } finally {
    clearTimeout(t);
  }
}

export async function search(
  query: string,
  opts: { limit?: number; includeDomains?: string[] } = {}
): Promise<SearchResult[]> {
  const json = await postJson("/v1/search", {
    query,
    limit: opts.limit ?? 6,
    ...(opts.includeDomains ? { includeDomains: opts.includeDomains } : {}),
  });
  // v1 returns { data: [...] }; some shapes return { data: { web: [...] } }.
  const data = json.data;
  const list: any[] = Array.isArray(data) ? data : data?.web || data?.news || [];
  return list
    .map((r) => ({
      url: r.url || "",
      title: r.title || "",
      description: r.description || r.snippet || "",
    }))
    .filter((r) => r.url);
}

export async function scrape(url: string): Promise<ScrapeResult | null> {
  try {
    const json = await postJson("/v1/scrape", {
      url,
      formats: ["markdown"],
      onlyMainContent: true,
    });
    const data = json.data || json;
    const markdown: string = data.markdown || "";
    if (!markdown) return null;
    return { url, markdown, title: data?.metadata?.title || "" };
  } catch {
    return null; // one bad source should not kill the run
  }
}

export async function ping(): Promise<{ ok: boolean; error?: string }> {
  try {
    await search("FMCSA compliance", { limit: 1 });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}
