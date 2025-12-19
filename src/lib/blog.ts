import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  category: string;
  tags: string[];
  featured?: boolean;
  content: string;
  readTime: string;
  faqs?: FAQItem[];
}

/**
 * Extract FAQs from MDX content. Supports multiple patterns:
 * 1. Frontmatter faqs array
 * 2. **Question** followed by answer paragraph
 * 3. ### Q: Question followed by answer
 */
function extractFAQsFromContent(content: string): FAQItem[] {
  const faqs: FAQItem[] = [];

  // Pattern 1: **Bold question?** followed by paragraph answer
  const boldQuestionPattern = /\*\*([^*]+\?)\*\*\s*\n\n([^*#]+?)(?=\n\n\*\*|\n\n##|\n\n###|\n---|\n\n$|$)/g;
  let match;

  while ((match = boldQuestionPattern.exec(content)) !== null) {
    const question = match[1].trim();
    const answer = match[2].trim();
    if (question && answer && answer.length > 20) {
      faqs.push({ question, answer });
    }
  }

  // Pattern 2: ### Q: Question followed by answer
  const h3QuestionPattern = /###\s*Q:\s*([^\n]+)\n([^#]+?)(?=\n###|\n##|\n---|\n\n$|$)/g;

  while ((match = h3QuestionPattern.exec(content)) !== null) {
    const question = match[1].trim();
    const answer = match[2].trim();
    if (question && answer && answer.length > 10) {
      faqs.push({ question, answer });
    }
  }

  return faqs;
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR);

  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(BLOG_DIR, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      // Extract FAQs from frontmatter or content
      const faqs: FAQItem[] = data.faqs || extractFAQsFromContent(content);

      return {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        author: data.author,
        authorRole: data.authorRole,
        publishedAt: data.publishedAt,
        category: data.category,
        tags: data.tags || [],
        featured: data.featured || false,
        content,
        readTime: calculateReadTime(content),
        faqs: faqs.length > 0 ? faqs : undefined,
      };
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  // Extract FAQs from frontmatter or content
  const faqs: FAQItem[] = data.faqs || extractFAQsFromContent(content);

  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    author: data.author,
    authorRole: data.authorRole,
    publishedAt: data.publishedAt,
    category: data.category,
    tags: data.tags || [],
    featured: data.featured || false,
    content,
    readTime: calculateReadTime(content),
    faqs: faqs.length > 0 ? faqs : undefined,
  };
}

export function getAllSlugs(): string[] {
  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getAllPosts();
  if (category === "All") return posts;
  return posts.filter((post) => post.category === category);
}

export function getCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((post) => post.category));
  return ["All", ...Array.from(categories)];
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  const allPosts = getAllPosts();

  return allPosts
    .filter((post) => post.slug !== currentSlug)
    .filter((post) =>
      post.category === currentPost.category ||
      post.tags.some((tag) => currentPost.tags.includes(tag))
    )
    .slice(0, limit);
}
