// Generate truck silhouette source art with x.ai grok-imagine, using the
// grok-CLI OAuth credentials. Persists the rotated refresh token back to
// auth.json so the CLI doesn't lose its session (x.ai rotates on refresh).
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "truck-src");
mkdirSync(OUT, { recursive: true });

const AUTH_PATH = join(homedir(), ".grok", "auth.json");
const MODEL = process.env.GROK_MODEL || "grok-imagine-image-quality";

let TOKEN = null;

async function refreshToken() {
  const auth = JSON.parse(readFileSync(AUTH_PATH, "utf8"));
  const key = Object.keys(auth).find((k) => auth[k] && auth[k].refresh_token);
  const entry = auth[key];
  const iss = entry.oidc_issuer || "https://auth.x.ai";
  const disc = await (await fetch(iss + "/.well-known/openid-configuration")).json();
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: entry.refresh_token,
    client_id: entry.oidc_client_id,
  });
  const r = await fetch(disc.token_endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const j = await r.json();
  if (!j.access_token) throw new Error("token refresh failed: " + JSON.stringify(j).slice(0, 300));
  TOKEN = j.access_token;
  // Persist rotation so the grok CLI keeps working.
  if (j.refresh_token && j.refresh_token !== entry.refresh_token) {
    entry.refresh_token = j.refresh_token;
    if (j.expires_in) entry.expires_at = new Date(Date.now() + j.expires_in * 1000).toISOString();
    entry.key = j.access_token;
    writeFileSync(AUTH_PATH, JSON.stringify(auth, null, 2));
    console.log("(rotated refresh token persisted)");
  }
  return TOKEN;
}

function curlDownload(url, dest) {
  const r = spawnSync(
    "curl",
    ["-fsS", "--retry", "6", "--retry-all-errors", "--retry-delay", "2", "--max-time", "180", "-o", dest, url],
    { encoding: "utf8" }
  );
  return r.status === 0 && existsSync(dest) && statSync(dest).size > 5000;
}

const PROMPTS = [
  {
    id: "truck-side",
    prompt:
      "Minimalist solid black silhouette of an American Class 8 semi truck with a box trailer, full side view, facing right, centered on a pure white background. Flat vector style, one single solid black shape, clean straight lines, large and filling most of the frame, no gradients, no shadow, no reflection, no text, no watermark.",
  },
  {
    id: "truck-front-quarter",
    prompt:
      "Minimalist solid black silhouette of an American semi truck seen from a slight front three-quarter angle, on a pure white background. Flat vector style, single solid black shape, bold simple form, no gradients, no shadow, no text, no watermark.",
  },
];

async function gen(p) {
  const dest = join(OUT, p.id + ".png");
  if (existsSync(dest) && !process.env.FORCE) {
    console.log("skip (exists)", p.id);
    return;
  }
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch("https://api.x.ai/v1/images/generations", {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: MODEL, prompt: p.prompt, aspect_ratio: "16:9", resolution: "1k", n: 1 }),
    });
    if ((res.status === 401 || res.status === 403) && attempt < 1) {
      await refreshToken();
      continue;
    }
    if (res.status === 429) {
      await new Promise((r) => setTimeout(r, 4000 * (attempt + 1)));
      continue;
    }
    if (!res.ok) {
      console.log("FAIL", p.id, res.status, (await res.text()).slice(0, 200));
      return;
    }
    const j = await res.json();
    const url = j.data?.[0]?.url;
    const b64 = j.data?.[0]?.b64_json;
    if (b64) {
      writeFileSync(dest, Buffer.from(b64, "base64"));
      console.log("OK (b64)", p.id);
      return;
    }
    if (url && curlDownload(url, dest)) {
      console.log("OK", p.id);
      return;
    }
    console.log("download failed, retrying", p.id);
  }
  console.log("GAVE UP", p.id);
}

await refreshToken();
for (const p of PROMPTS) await gen(p);
