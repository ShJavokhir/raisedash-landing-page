import { GetServerSideProps } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllProductUpdates } from "@/lib/product-updates";

const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://raisedash.com";
const SITE_URL = RAW_SITE_URL.endsWith("/") ? RAW_SITE_URL.slice(0, -1) : RAW_SITE_URL;

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
  // Static page last modification date - update this when you make significant changes
  const staticPagesLastMod = "2025-01-01";

  // Blog listing page should reflect the most recent post date
  const latestPostDate =
    posts.length > 0
      ? posts.reduce(
          (latest, post) => (post.publishedAt > latest ? post.publishedAt : latest),
          posts[0].publishedAt
        )
      : staticPagesLastMod;

  // Changelog listing page should reflect the most recent product update date
  const latestUpdateDate =
    productUpdates.length > 0
      ? productUpdates.reduce(
          (latest, update) => (update.publishedAt > latest ? update.publishedAt : latest),
          productUpdates[0].publishedAt
        )
      : staticPagesLastMod;

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Static Pages -->
  <url>
    <loc>${SITE_URL}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/blog</loc>
    <lastmod>${latestPostDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${SITE_URL}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${SITE_URL}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${SITE_URL}/careers</loc>
    <changefreq>weekly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${SITE_URL}/product-updates</loc>
    <lastmod>${latestUpdateDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${SITE_URL}/get-started</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/products/raisedash-pti-inspections</loc>
    <changefreq>weekly</changefreq>
    <priority>1</priority>
  </url>
  <url>
    <loc>${SITE_URL}/products/raisedash-pti-inspections/driver-features</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/products/raisedash-pti-inspections/fleet-safety-managers</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/products/raisedash-shift</loc>
    <changefreq>weekly</changefreq>
    <priority>1</priority>
  </url>
  <url>
    <loc>${SITE_URL}/products/raisedash-vertex</loc>
    <changefreq>weekly</changefreq>
    <priority>1</priority>
  </url>
  <url>
    <loc>${SITE_URL}/vertex-app</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${SITE_URL}/privacy-policy</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${SITE_URL}/terms-of-use</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${SITE_URL}/security</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>

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
