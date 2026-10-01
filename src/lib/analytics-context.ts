import { products } from "@/data/products";

/**
 * Page classification stamped onto EVERY PostHog event (see before_send in
 * src/instrumentation-client.ts), so pageviews, autocaptured clicks, replays and
 * the named events can all be broken down by product and site section without
 * any page having to pass it in.
 *
 *   page_group  which part of the site (home / product / tool / platform / …)
 *   product     stable slug of the product the page sells, when it sells one
 *
 * Slugs come from the hrefs in src/data/products.ts (the last path segment, or the
 * subdomain for an external product), so they survive display-name renames and a
 * new product card is picked up automatically.
 */

export interface PageContext {
  page_group: string;
  product?: string;
}

/** Stable product slug for a product card href ("/products/shield" → "shield"). */
export function productSlugFromHref(href: string): string {
  if (href.startsWith("/")) return href.split("/").filter(Boolean).pop() ?? href;
  try {
    // External product (the academy course): its subdomain names it.
    return new URL(href).hostname.split(".")[0];
  } catch {
    return href;
  }
}

function matches(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

const PRODUCT_PREFIXES: { prefix: string; product: string }[] = [
  ...products
    .filter((p) => p.href.startsWith("/"))
    .map((p) => ({ prefix: p.href, product: productSlugFromHref(p.href) })),
  // The orientation platform's marketing spreads across several sections.
  ...["/platform", "/features", "/solutions", "/pricing", "/demo"].map((prefix) => ({
    prefix,
    product: "orientation",
  })),
  // Legacy apps that keep their own pages.
  { prefix: "/products/raisedash-pti-inspections", product: "pti-inspections-app" },
  { prefix: "/pti-app", product: "pti-inspections-app" },
  { prefix: "/products/raisedash-vertex", product: "vertex" },
  { prefix: "/vertex-app", product: "vertex" },
];

const PAGE_GROUPS: Record<string, string> = {
  products: "product",
  tools: "tool",
  platform: "platform",
  features: "platform",
  solutions: "platform",
  pricing: "pricing",
  demo: "demo",
  blog: "blog",
  "product-updates": "updates",
  changelogs: "updates",
  about: "company",
  careers: "company",
  contact: "company",
  security: "company",
  "privacy-policy": "legal",
  "terms-of-use": "legal",
  "request-account-deletion": "legal",
  unsubscribe: "legal",
  start: "ad_funnel",
  "start-v2": "ad_funnel",
  "start-v3": "ad_funnel",
  "pti-app": "app_download",
  "vertex-app": "app_download",
  "compliance-challenges": "content",
};

export function pageContext(pathname: string): PageContext {
  const first = pathname.split("/").filter(Boolean)[0] ?? "";
  const page_group = first === "" ? "home" : (PAGE_GROUPS[first] ?? "other");
  const product = PRODUCT_PREFIXES.find(({ prefix }) => matches(pathname, prefix))?.product;
  return product ? { page_group, product } : { page_group };
}
