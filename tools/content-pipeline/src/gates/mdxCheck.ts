import matter from "gray-matter";

export interface MdxResult {
  ok: boolean;
  errors: string[];
}

const REQUIRED = ["title", "excerpt", "author", "authorRole", "publishedAt", "category", "tags"];

/** Validate frontmatter and compile the MDX with the site's exact toolchain. */
export async function checkMdx(mdx: string): Promise<MdxResult> {
  const errors: string[] = [];

  let data: Record<string, unknown> = {};
  let content = "";
  try {
    const parsed = matter(mdx);
    data = parsed.data as Record<string, unknown>;
    content = parsed.content;
  } catch (err) {
    return { ok: false, errors: [`frontmatter parse failed: ${(err as Error).message}`] };
  }

  for (const key of REQUIRED) {
    if (!(key in data)) errors.push(`missing frontmatter field: ${key}`);
  }
  if (data.tags && !Array.isArray(data.tags)) errors.push("tags must be a list");
  if (/^#\s+/m.test(content.split("\n").find((l) => l.trim() !== "") || "")) {
    errors.push("body starts with an H1; sections must start at H2");
  }

  try {
    const { compile } = await import("@mdx-js/mdx");
    const remarkGfm = (await import("remark-gfm")).default;
    const rehypeSlug = (await import("rehype-slug")).default;
    await compile(content, {
      outputFormat: "function-body",
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    });
  } catch (err) {
    errors.push(`MDX compile failed: ${(err as Error).message}`);
  }

  return { ok: errors.length === 0, errors };
}
