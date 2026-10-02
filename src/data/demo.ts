import { products } from "./products";

export const DEMO_TELEGRAM_URL = "https://t.me/raisedash";

export function getDemoHref(product: string): string {
  return `/get-a-demo?product=${encodeURIComponent(product)}`;
}

/** Only known product slugs can populate the form; never render arbitrary query text. */
export function getDemoProduct(slug: unknown) {
  if (typeof slug !== "string") return undefined;
  return products.find((product) => product.href.split("/").pop() === slug);
}
