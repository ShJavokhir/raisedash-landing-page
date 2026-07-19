import { NextApiRequest, NextApiResponse } from "next";
import { getAllPosts } from "@/lib/blog";

const INDEXNOW_KEY = "a8f4e2b1c9d64f3a8e7b0c5d2f1a9e4b";
const SITE_URL = "https://www.raisedash.com";

const STATIC_PATHS = [
  "/",
  "/blog",
  "/about",
  "/contact",
  "/careers",
  "/demo",
  "/pricing",
  "/solutions/driver-onboarding",
  "/platform/pre-arrival-readiness",
  "/platform/training-evidence",
  "/platform/driver-experience",
  "/features",
  "/features/ai-training-video-generator",
  "/features/ai-training-program-builder",
  "/features/ai-voice-roleplay-training",
  "/features/interactive-training-simulations",
  "/product-updates",
  "/products/raisedash-pti-inspections",
  "/products/raisedash-pti-inspections/driver-features",
  "/products/raisedash-pti-inspections/fleet-safety-managers",
  "/products/raisedash-vertex",
  "/vertex-app",
  "/privacy-policy",
  "/terms-of-use",
  "/security",
  "/compliance-challenges",
  "/pti-app",
  "/tools/elp-practice",
  "/tools/road-signs",
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secret = process.env.INDEXNOW_SECRET;
  if (!secret) {
    return res.status(500).json({ error: "INDEXNOW_SECRET not configured" });
  }

  const auth = req.headers.authorization;
  if (!auth || auth !== `Bearer ${secret}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const urls: string[] = [];

    // Static pages
    for (const p of STATIC_PATHS) {
      urls.push(`${SITE_URL}${p}`);
    }

    // Blog posts
    const posts = getAllPosts();
    for (const post of posts) {
      urls.push(`${SITE_URL}/blog/${post.slug}`);
    }

    // NOTE: Individual /product-updates/<slug> pages are intentionally NOT
    // submitted. They are thin, noindexed changelog entries — only the
    // /product-updates hub (in STATIC_PATHS) is announced to IndexNow.

    const body = {
      host: "www.raisedash.com",
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    };

    const indexNowRes = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });

    return res.status(200).json({
      submitted: urls.length,
      urls,
      indexNowStatus: indexNowRes.status,
    });
  } catch (error) {
    console.error("IndexNow submission error:", error);
    return res.status(500).json({ error: "Failed to submit to IndexNow" });
  }
}
