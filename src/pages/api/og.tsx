import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Raisedash";
  const description = searchParams.get("description") || "Continuous Compliance & Safety";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        backgroundColor: "#0f172a",
        backgroundImage:
          "radial-gradient(circle at 25% 25%, #1e293b 0%, transparent 50%), radial-gradient(circle at 75% 75%, #1e3a5f 0%, transparent 50%)",
        padding: "60px",
      }}
    >
      {/* Logo/Brand */}
      <div
        style={{
          position: "absolute",
          top: "60px",
          left: "60px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://cdn.raisedash.com/media/landing/logo.webp"
          width={48}
          height={48}
          alt="Raisedash"
          style={{
            borderRadius: "8px",
          }}
        />
        <span
          style={{
            fontSize: "28px",
            fontWeight: 600,
            color: "white",
          }}
        >
          Raisedash
        </span>
      </div>

      {/* Category badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <span
          style={{
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "8px 16px",
            borderRadius: "9999px",
            fontSize: "18px",
            fontWeight: 500,
          }}
        >
          Blog
        </span>
      </div>

      {/* Title */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "900px",
        }}
      >
        <h1
          style={{
            fontSize: title.length > 60 ? "48px" : "56px",
            fontWeight: 700,
            color: "white",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {title}
        </h1>
        {description && description !== "Continuous Compliance & Safety" && (
          <p
            style={{
              fontSize: "24px",
              color: "#94a3b8",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {description.length > 120 ? description.substring(0, 120) + "..." : description}
          </p>
        )}
      </div>

      {/* Footer tagline */}
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          right: "60px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontSize: "18px",
            color: "#64748b",
          }}
        >
          raisedash.com
        </span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  );
}
