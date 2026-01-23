import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PRODUCT_UPDATES_DIR = path.join(process.cwd(), "content/product-updates");

export type ProductUpdateTier = "P0" | "P1" | "P2";

export type ProductUpdateCategory =
  | "ELD Compliance"
  | "Driver Qualification"
  | "Driver Training"
  | "HOS Management"
  | "Safety Scores"
  | "Fleet Management"
  | "Integrations"
  | "Platform";

export interface ProductUpdate {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: ProductUpdateCategory;
  tags: string[];
  content: string;
  readTime: string;
  tier: ProductUpdateTier;
  image: string | null;
  productLink: string | null;
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function getAllProductUpdates(): ProductUpdate[] {
  if (!fs.existsSync(PRODUCT_UPDATES_DIR)) {
    return [];
  }

  const files = fs.readdirSync(PRODUCT_UPDATES_DIR);

  const updates = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(PRODUCT_UPDATES_DIR, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        publishedAt: data.publishedAt,
        category: data.category as ProductUpdateCategory,
        tags: data.tags || [],
        content,
        readTime: calculateReadTime(content),
        tier: data.tier as ProductUpdateTier,
        image: data.image || null,
        productLink: data.productLink || null,
      };
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return updates;
}

export function getProductUpdateBySlug(slug: string): ProductUpdate | null {
  const filePath = path.join(PRODUCT_UPDATES_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    publishedAt: data.publishedAt,
    category: data.category as ProductUpdateCategory,
    tags: data.tags || [],
    content,
    readTime: calculateReadTime(content),
    tier: data.tier as ProductUpdateTier,
    image: data.image || null,
    productLink: data.productLink || null,
  };
}

export function getAllProductUpdateSlugs(): string[] {
  if (!fs.existsSync(PRODUCT_UPDATES_DIR)) {
    return [];
  }

  const files = fs.readdirSync(PRODUCT_UPDATES_DIR);
  return files.filter((file) => file.endsWith(".mdx")).map((file) => file.replace(/\.mdx$/, ""));
}

export function getProductUpdatesByCategory(category: string): ProductUpdate[] {
  const updates = getAllProductUpdates();
  if (category === "All") return updates;
  return updates.filter((update) => update.category === category);
}

export function getProductUpdateCategories(): string[] {
  const updates = getAllProductUpdates();
  const categories = new Set(updates.map((update) => update.category));
  return ["All", ...Array.from(categories)];
}

export function getRelatedProductUpdates(currentSlug: string, limit = 3): ProductUpdate[] {
  const currentUpdate = getProductUpdateBySlug(currentSlug);
  if (!currentUpdate) return [];

  const allUpdates = getAllProductUpdates();

  return allUpdates
    .filter((update) => update.slug !== currentSlug)
    .filter(
      (update) =>
        update.category === currentUpdate.category ||
        update.tags.some((tag) => currentUpdate.tags.includes(tag))
    )
    .slice(0, limit);
}
