import { GetServerSideProps } from "next";
import { getAllPosts } from "@/lib/blog";

const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.raisedash.com";
const SITE_URL = RAW_SITE_URL.endsWith("/") ? RAW_SITE_URL.slice(0, -1) : RAW_SITE_URL;
const FEED_TITLE = "Raisedash Blog";
const FEED_DESCRIPTION =
  "Insights, updates, and best practices for fleet compliance, safety and security in freight logistics.";

interface FeedPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  updatedAt: string | null;
  category: string;
}

/** Escape the five XML predefined entities so post text can't break the feed. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RSS requires RFC 822 dates, e.g. "Sun, 25 Jan 2026 00:00:00 GMT". */
function toRfc822(date: string): string {
  return new Date(date).toUTCString();
}

function generateFeed(posts: FeedPost[]): string {
  // getAllPosts() is sorted newest-first, so posts[0] is the freshest item.
  const latest = posts[0];
  const lastBuildDate = latest
    ? toRfc822(latest.updatedAt || latest.publishedAt)
    : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${toRfc822(post.publishedAt)}</pubDate>
      <dc:creator>${escapeXml(post.author)}</dc:creator>
      <category>${escapeXml(post.category)}</category>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/logo.webp</url>
      <title>${escapeXml(FEED_TITLE)}</title>
      <link>${SITE_URL}/blog</link>
    </image>${items}
  </channel>
</rss>`;
}

// This component never renders — getServerSideProps writes the XML response.
function Rss() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const posts: FeedPost[] = getAllPosts().map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      author: post.author,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      category: post.category,
    }));

    const feed = generateFeed(posts);

    res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate");
    res.write(feed);
    res.end();
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    const feed = generateFeed([]);
    res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
    res.write(feed);
    res.end();
  }

  return { props: {} };
};

export default Rss;
