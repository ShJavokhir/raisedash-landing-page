import fs from "fs";
import path from "path";
import { GetServerSideProps } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllProductUpdates } from "@/lib/product-updates";

const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.raisedash.com";
const SITE_URL = RAW_SITE_URL.endsWith("/") ? RAW_SITE_URL.slice(0, -1) : RAW_SITE_URL;
const DEFAULT_LASTMOD = "2025-01-01";

function getLastMod(relativePath: string, fallback = DEFAULT_LASTMOD) {
  try {
    const stats = fs.statSync(path.join(process.cwd(), relativePath));
    return stats.mtime.toISOString().split("T")[0];
  } catch (error) {
    console.warn(`Unable to read lastmod for ${relativePath}:`, error);
    return fallback;
  }
}

/**
 * SEO Best Practice: Static pages should NOT use current date for lastmod
 * unless they've actually been modified. Using current date devalues the signal.
 *
 * For static pages, we use a fixed "last known update" date.
 * For blog posts, we use their actual publication date.
 */
function generateSiteMap(
  posts: { slug: string; publishedAt: string }[],
  productUpdates: { slug: string; publishedAt: string }[]
) {
  // Blog listing page should reflect the most recent post date
  const latestPostDate =
    posts.length > 0
      ? posts.reduce(
          (latest, post) => (post.publishedAt > latest ? post.publishedAt : latest),
          posts[0].publishedAt
        )
      : getLastMod("src/pages/blog.tsx");

  // Changelog listing page should reflect the most recent product update date
  const latestUpdateDate =
    productUpdates.length > 0
      ? productUpdates.reduce(
          (latest, update) => (update.publishedAt > latest ? update.publishedAt : latest),
          productUpdates[0].publishedAt
        )
      : getLastMod("src/pages/product-updates.tsx");

  const staticPages = [
    {
      loc: `${SITE_URL}`,
      lastmod: getLastMod("src/pages/index.tsx"),
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      loc: `${SITE_URL}/blog`,
      lastmod: latestPostDate,
      changefreq: "daily",
      priority: "0.9",
    },
    {
      loc: `${SITE_URL}/about`,
      lastmod: getLastMod("src/pages/about.tsx"),
      changefreq: "monthly",
      priority: "0.6",
    },
    {
      loc: `${SITE_URL}/contact`,
      lastmod: getLastMod("src/pages/contact.tsx"),
      changefreq: "monthly",
      priority: "0.6",
    },
    {
      loc: `${SITE_URL}/careers`,
      lastmod: getLastMod("src/pages/careers.tsx"),
      changefreq: "weekly",
      priority: "0.3",
    },
    {
      loc: `${SITE_URL}/product-updates`,
      lastmod: latestUpdateDate,
      changefreq: "weekly",
      priority: "0.7",
    },
    {
      loc: `${SITE_URL}/get-started`,
      lastmod: getLastMod("src/pages/get-started.tsx"),
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      loc: `${SITE_URL}/products/raisedash-pti-inspections`,
      lastmod: getLastMod("src/pages/products/raisedash-pti-inspections.tsx"),
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      loc: `${SITE_URL}/products/raisedash-pti-inspections/driver-features`,
      lastmod: getLastMod("src/pages/products/raisedash-pti-inspections/driver-features.tsx"),
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      loc: `${SITE_URL}/products/raisedash-pti-inspections/fleet-safety-managers`,
      lastmod: getLastMod("src/pages/products/raisedash-pti-inspections/fleet-safety-managers.tsx"),
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      loc: `${SITE_URL}/products/raisedash-shift`,
      lastmod: getLastMod("src/pages/products/raisedash-shift.tsx"),
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      loc: `${SITE_URL}/products/raisedash-vertex`,
      lastmod: getLastMod("src/pages/products/raisedash-vertex.tsx"),
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      loc: `${SITE_URL}/vertex-app`,
      lastmod: getLastMod("src/pages/vertex-app.tsx"),
      changefreq: "monthly",
      priority: "0.7",
    },
    {
      loc: `${SITE_URL}/privacy-policy`,
      lastmod: getLastMod("src/pages/privacy-policy.tsx"),
      changefreq: "yearly",
      priority: "0.3",
    },
    {
      loc: `${SITE_URL}/terms-of-use`,
      lastmod: getLastMod("src/pages/terms-of-use.tsx"),
      changefreq: "yearly",
      priority: "0.3",
    },
    {
      loc: `${SITE_URL}/security`,
      lastmod: getLastMod("src/pages/security.tsx"),
      changefreq: "monthly",
      priority: "0.5",
    },
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Static Pages -->
  ${staticPages
    .map(
      (page) => `
  <url>
    <loc>${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join("")}

  <!-- Blog Posts -->
  ${posts
    .map(
      (post) => `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.publishedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("")}

  <!-- Product Updates -->
  ${productUpdates
    .map(
      (update) => `
  <url>
    <loc>${SITE_URL}/product-updates/${update.slug}</loc>
    <lastmod>${update.publishedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join("")}
</urlset>`;
}

function SiteMap() {
  // This component will never render - we return XML from getServerSideProps
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const posts = getAllPosts().map((post) => ({
      slug: post.slug,
      publishedAt: post.publishedAt,
    }));

    const productUpdates = getAllProductUpdates().map((update) => ({
      slug: update.slug,
      publishedAt: update.publishedAt,
    }));

    const sitemap = generateSiteMap(posts, productUpdates);

    res.setHeader("Content-Type", "text/xml");
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate");
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return a basic sitemap without blog posts or product updates if there's an error
    const sitemap = generateSiteMap([], []);
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
  }

  return {
    props: {},
  };
};

export default SiteMap;
