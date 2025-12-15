import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CHANGELOG_PATH = path.join(process.cwd(), "content/changelog.mdx");

export interface ChangelogMeta {
  title: string;
  description: string;
}

export interface ChangelogData {
  meta: ChangelogMeta;
  content: string;
}

export function getChangelog(): ChangelogData {
  const fileContent = fs.readFileSync(CHANGELOG_PATH, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    meta: {
      title: data.title || "Changelog",
      description: data.description || "",
    },
    content,
  };
}
