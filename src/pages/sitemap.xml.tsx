import { GetServerSideProps } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllProductUpdates } from "@/lib/product-updates";

const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.raisedash.com";
const SITE_URL = RAW_SITE_URL.endsWith("/") ? RAW_SITE_URL.slice(0, -1) : RAW_SITE_URL;

/**
 * Last-known git commit dates for each static page.
 *
 * These are hardcoded because Vercel's serverless environment does not
 * preserve source file mtimes — fs.statSync always returns the deploy
 * timestamp, which makes every page look "just updated" or falls back
 * to a stale default. Hardcoding the real git dates gives Google an
 * accurate signal.
 *
 * HOW TO MAINTAIN: when you meaningfully change a page's *content*,
 * update its date here to the date of that change.
 */
const STATIC_PAGE_DATES: Record<string, string> = {
  "/": "2026-02-26",
  "/blog": "2026-01-26", // overridden below by latest post date
  "/about": "2026-01-27",
  "/contact": "2026-01-27",
  "/careers": "2026-01-27",
  "/product-updates": "2026-01-27", // overridden below by latest update date
  "/get-started": "2026-01-26",
  "/products/raisedash-pti-inspections": "2026-01-26",
  "/products/raisedash-pti-inspections/driver-features": "2026-01-22",
  "/products/raisedash-pti-inspections/fleet-safety-managers": "2026-01-22",
  "/products/raisedash-shift": "2026-02-24",
  "/products/raisedash-vertex": "2026-02-24",
  "/vertex-app": "2025-12-18",
  "/privacy-policy": "2026-01-21",
  "/terms-of-use": "2026-01-21",
  "/security": "2026-01-21",
  "/compliance-challenges": "2026-01-27",
  "/pti-app": "2026-01-28",
};

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
      : STATIC_PAGE_DATES["/blog"];

  // Product updates listing page should reflect the most recent update date
  const latestUpdateDate =
    productUpdates.length > 0
      ? productUpdates.reduce(
          (latest, update) => (update.publishedAt > latest ? update.publishedAt : latest),
          productUpdates[0].publishedAt
        )
      : STATIC_PAGE_DATES["/product-updates"];

  const staticPages = [
    {
      loc: `${SITE_URL}`,
      lastmod: STATIC_PAGE_DATES["/"],
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
      lastmod: STATIC_PAGE_DATES["/about"],
      changefreq: "monthly",
      priority: "0.6",
    },
    {
      loc: `${SITE_URL}/contact`,
      lastmod: STATIC_PAGE_DATES["/contact"],
      changefreq: "monthly",
      priority: "0.6",
    },
    {
      loc: `${SITE_URL}/careers`,
      lastmod: STATIC_PAGE_DATES["/careers"],
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
      lastmod: STATIC_PAGE_DATES["/get-started"],
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      loc: `${SITE_URL}/products/raisedash-pti-inspections`,
      lastmod: STATIC_PAGE_DATES["/products/raisedash-pti-inspections"],
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      loc: `${SITE_URL}/products/raisedash-pti-inspections/driver-features`,
      lastmod: STATIC_PAGE_DATES["/products/raisedash-pti-inspections/driver-features"],
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      loc: `${SITE_URL}/products/raisedash-pti-inspections/fleet-safety-managers`,
      lastmod: STATIC_PAGE_DATES["/products/raisedash-pti-inspections/fleet-safety-managers"],
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      loc: `${SITE_URL}/products/raisedash-shift`,
      lastmod: STATIC_PAGE_DATES["/products/raisedash-shift"],
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      loc: `${SITE_URL}/products/raisedash-vertex`,
      lastmod: STATIC_PAGE_DATES["/products/raisedash-vertex"],
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      loc: `${SITE_URL}/vertex-app`,
      lastmod: STATIC_PAGE_DATES["/vertex-app"],
      changefreq: "monthly",
      priority: "0.7",
    },
    {
      loc: `${SITE_URL}/compliance-challenges`,
      lastmod: STATIC_PAGE_DATES["/compliance-challenges"],
      changefreq: "monthly",
      priority: "0.6",
    },
    {
      loc: `${SITE_URL}/pti-app`,
      lastmod: STATIC_PAGE_DATES["/pti-app"],
      changefreq: "monthly",
      priority: "0.7",
    },
    {
      loc: `${SITE_URL}/privacy-policy`,
      lastmod: STATIC_PAGE_DATES["/privacy-policy"],
      changefreq: "yearly",
      priority: "0.3",
    },
    {
      loc: `${SITE_URL}/terms-of-use`,
      lastmod: STATIC_PAGE_DATES["/terms-of-use"],
      changefreq: "yearly",
      priority: "0.3",
    },
    {
      loc: `${SITE_URL}/security`,
      lastmod: STATIC_PAGE_DATES["/security"],
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
