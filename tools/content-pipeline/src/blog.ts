import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { BLOG_DIR } from "./config";

export interface ExistingPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
}

/** Read every published post's frontmatter. Used for dedup and internal links. */
export function getExistingPosts(): ExistingPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: String(data.title || slug),
        excerpt: String(data.excerpt || ""),
        category: String(data.category || ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      };
    });
}

export function slugExists(slug: string): boolean {
  return fs.existsSync(path.join(BLOG_DIR, `${slug}.mdx`));
}

/** A compact, link-target list for the writer prompt. */
export function internalLinkMenu(posts: ExistingPost[]): string {
  const postLines = posts.map((p) => `- /blog/${p.slug} — ${p.title}`);
  const productLines = [
    "- https://www.raisedash.com — Raisedash (main product)",
    "- https://www.raisedash.com/tools/elp-practice — TruckTalk, CDL English proficiency practice",
  ];
  return ["Existing blog posts:", ...postLines, "Product and tool pages:", ...productLines].join(
    "\n"
  );
}
