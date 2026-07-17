import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

// Paper design tokens (kept in sync with the site's theme).
const PAPER = "#f7f7f4"; // warm-paper canvas
const INK = "#26251e"; // near-black text
const INK_MUTED = "rgba(38, 37, 30, 0.6)"; // ~60% ink for secondary text
const INK_QUIET = "rgba(38, 37, 30, 0.45)"; // very quiet ink for the URL marker
const ORANGE = "#f54e00"; // accent, used sparingly
const CHIP_BG = "#f2f1ed"; // muted chip background

// Logo inlined as a PNG data URI: Satori (the renderer behind @vercel/og) does
// not decode WebP, so the cdn logo.webp silently renders as nothing — and
// inlining also removes the remote fetch from every card render.
const LOGO_DATA_URI =
  "data:image/png;base64,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";

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Raisedash";
  const description =
    searchParams.get("description") || "The driver readiness platform for modern fleets";
  const category = searchParams.get("category");

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        // Flat color only (no gradients) — keeps the PNG small.
        backgroundColor: PAPER,
        padding: "72px",
      }}
    >
      {/* Brand row */}
      <div
        style={{
          position: "absolute",
          top: "72px",
          left: "72px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LOGO_DATA_URI}
          width={48}
          height={48}
          alt="Raisedash"
          style={{
            borderRadius: "8px",
          }}
        />
        <span
          style={{
            fontSize: "30px",
            fontWeight: 600,
            color: INK,
          }}
        >
          Raisedash
        </span>
      </div>

      {/* Quiet URL marker */}
      <div
        style={{
          position: "absolute",
          top: "84px",
          right: "72px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: "20px",
            color: INK_QUIET,
          }}
        >
          www.raisedash.com
        </span>
      </div>

      {/* Category chip */}
      {category && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "28px",
          }}
        >
          <span
            style={{
              backgroundColor: CHIP_BG,
              color: INK,
              padding: "8px 16px",
              borderRadius: "6px",
              fontSize: "18px",
              fontWeight: 500,
            }}
          >
            {category}
          </span>
        </div>
      )}

      {/* Slim orange accent bar */}
      <div
        style={{
          display: "flex",
          width: "56px",
          height: "5px",
          borderRadius: "2px",
          backgroundColor: ORANGE,
          marginBottom: "28px",
        }}
      />

      {/* Title + description */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "920px",
        }}
      >
        <h1
          style={{
            fontSize: title.length > 50 ? "56px" : "64px",
            fontWeight: 600,
            color: INK,
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          {title}
        </h1>
        {description && description !== "The driver readiness platform for modern fleets" && (
          <p
            style={{
              fontSize: "26px",
              color: INK_MUTED,
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {description.length > 120 ? description.substring(0, 120) + "..." : description}
          </p>
        )}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  );
}
