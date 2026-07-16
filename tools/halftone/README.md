# Halftone brand-motif pipeline

Produces the scanline-dithered truck mask at `public/brand/truck-halftone.png`,
rendered on the site by `src/components/ui/HalftoneTruck.tsx` (CSS mask painted
with `currentColor`, so it themes light/dark automatically).

1. `node gen-truck.mjs` — generates silhouette source art with x.ai
   grok-imagine (model `grok-imagine-image-quality`), authenticating with the
   grok-CLI OAuth session in `~/.grok/auth.json`. The script refreshes the
   token itself and **persists the rotated refresh token back** — x.ai rotates
   refresh tokens, and losing the rotation logs the grok CLI out.
2. `CHROME_EXE=<chromium> SRC=truck-src/truck-side.png DEST=truck-halftone.png ROW=6 THICK=3 node dither.js`
   — dithers the silhouette into horizontal speed-line dashes (alpha-only PNG)
   using headless Chrome canvas via playwright-core (a global install works:
   the script requires it from clawdbot's node_modules; adjust the path if
   that moves). Deterministic hash noise — no Math.random — so re-runs are
   reproducible.
3. Copy the result to `public/brand/` and keep `HalftoneTruck.tsx`'s
   aspect-ratio in sync if dimensions change.
