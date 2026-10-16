import type { NextApiRequest, NextApiResponse } from "next";

/** Liveness probe for the container healthcheck and Traefik. */
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ ok: true });
}
