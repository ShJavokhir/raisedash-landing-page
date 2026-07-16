// Scanline-dither a black-on-white silhouette into an alpha-only PNG mask
// (Twenty-style horizontal streaks — read here as speed lines). The output
// is pure black + alpha; the site paints it with currentColor via CSS mask,
// so it themes light/dark for free.
const fs = require("fs");
const { chromium } = require("/opt/homebrew/lib/node_modules/clawdbot/node_modules/playwright-core");

const EXE = process.env.CHROME_EXE;
const SRC = process.env.SRC;
const DEST = process.env.DEST;
const ROW = Number(process.env.ROW || 7); // scanline pitch (px)
const THICK = Number(process.env.THICK || 3.4); // dash thickness (px)
const OUT_W = Number(process.env.OUT_W || 1200);

(async () => {
  const browser = await chromium.launch({ executablePath: EXE });
  const page = await browser.newPage();
  const b64 = fs.readFileSync(SRC).toString("base64");

  const dataUrl = await page.evaluate(
    async ({ b64, ROW, THICK, OUT_W }) => {
      const img = new Image();
      img.src = "data:image/png;base64," + b64;
      await img.decode();

      const outH = Math.round((img.height / img.width) * OUT_W);
      const src = document.createElement("canvas");
      src.width = OUT_W;
      src.height = outH;
      const sctx = src.getContext("2d");
      sctx.drawImage(img, 0, 0, OUT_W, outH);
      const data = sctx.getImageData(0, 0, OUT_W, outH).data;

      const lum = (x, y) => {
        if (x < 0 || y < 0 || x >= OUT_W || y >= outH) return 255;
        const i = (y * OUT_W + x) * 4;
        return 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      };
      // Deterministic hash noise (no Math.random: reproducible builds).
      const noise = (x, y) => {
        const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
        return s - Math.floor(s);
      };

      const out = document.createElement("canvas");
      out.width = OUT_W;
      out.height = outH;
      const ctx = out.getContext("2d");
      ctx.fillStyle = "#000";

      for (let y = Math.floor(ROW / 2); y < outH; y += ROW) {
        let runStart = -1;
        for (let x = 0; x <= OUT_W; x++) {
          const ink = x < OUT_W && lum(x, y) < 90;
          if (ink && runStart < 0) runStart = x;
          if (!ink && runStart >= 0) {
            // Split the run into dashes with organic gaps.
            let cursor = runStart;
            const runEnd = x;
            while (cursor < runEnd) {
              const n1 = noise(cursor, y);
              const dashLen = Math.min(runEnd - cursor, 22 + Math.floor(n1 * 74));
              const n2 = noise(cursor + 7, y * 3);
              // Occasionally drop a dash entirely for the glitchy texture.
              if (n2 > 0.07) {
                ctx.beginPath();
                ctx.roundRect(cursor, y - THICK / 2, dashLen, THICK, THICK / 2);
                ctx.fill();
              }
              const gap = 4 + Math.floor(noise(cursor * 3, y) * 6);
              cursor += dashLen + gap;
            }
            runStart = -1;
          }
        }
      }
      return out.toDataURL("image/png");
    },
    { b64, ROW, THICK, OUT_W }
  );

  fs.writeFileSync(DEST, Buffer.from(dataUrl.split(",")[1], "base64"));
  console.log("wrote", DEST);
  await browser.close();
})();
