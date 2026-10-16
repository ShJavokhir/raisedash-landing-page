# Production image for www.raisedash.com: Next standalone server on the
# Raisedash EC2 box behind Traefik + Cloudflare (infra/docker-compose.yml).
# NEXT_PUBLIC_* values are inlined at build time, so they are build args;
# server secrets come from /etc/raisedash/landing.env at runtime.
FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_META_FLEET_PIXEL_ID
ARG NEXT_PUBLIC_INTERCOM_APP_ID
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY
ARG NEXT_PUBLIC_VERCEL_ENV=production
ENV NEXT_PUBLIC_META_FLEET_PIXEL_ID=$NEXT_PUBLIC_META_FLEET_PIXEL_ID \
    NEXT_PUBLIC_INTERCOM_APP_ID=$NEXT_PUBLIC_INTERCOM_APP_ID \
    NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY \
    NEXT_PUBLIC_VERCEL_ENV=$NEXT_PUBLIC_VERCEL_ENV \
    NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-bookworm-slim AS runtime
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
WORKDIR /app
RUN apt-get update \
  && apt-get install -y --no-install-recommends tini wget \
  && rm -rf /var/lib/apt/lists/*
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
# sitemap.xml, rss.xml, changelogs and the hourly ISR pages read MDX at runtime.
COPY --from=build --chown=node:node /app/content ./content
USER node
EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health >/dev/null 2>&1 || exit 1
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "server.js"]
