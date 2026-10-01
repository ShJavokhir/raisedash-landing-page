# Raisedash - Website (raisedash.com)

Marketing/landing site for Raisedash, a driver-readiness platform for trucking
fleets. This is its **own git repo** (separate from `raisedash-backend` /
`raisedash-dashboard` / `raisedash-learner-web`), deployed independently to
**Vercel**. It uses the Next.js **Pages Router** (`src/pages/`) — NOT the App
Router used by the dashboard/learner-web apps. Node is pinned to **22.x**
(`engines` + `.nvmrc`) — see gotchas below for why.

## Core rules (existing — do not violate)

- No need to build every time after updating something; checking errors with
  `tsc` is enough.
- Keep design always consistent — learn from the homepage.
- When adding or modifying a page, update its `lastmod` date in
  `STATIC_PAGE_DATES` inside `src/pages/sitemap.xml.tsx`. New pages must also
  be added to the sitemap there.
- When adding a new static page, also add its path to `STATIC_PATHS` in
  `src/pages/api/indexnow.ts` so it gets submitted to IndexNow.

## Architecture map

- `src/pages/index.tsx` — homepage; the design reference for the whole site.
- `src/pages/pricing.tsx` — **pricing is LIVE, unconditionally** (no feature
  flag exists in code). $149/mo incl. 25 managed drivers + $6/driver overage
  ($5 founding rate for the first 10 subscribed fleets). Numbers are
  hardcoded constants at the top of the file and **must stay in sync with
  `raisedash-backend/src/billing/plans.ts`** (the `PLAN` constant that
  actually drives Stripe) — change one, change both.
- `src/pages/platform/*`, `src/pages/solutions/driver-onboarding.tsx` — core
  product-positioning pages (pre-arrival readiness, training evidence,
  first-90-days, driver experience).
- `src/pages/products/*` — legacy/adjacent product pages (PTI inspections,
  Vertex, Shift) kept live but lower-priority; `raisedash-shift` 308-redirects
  to `/platform/pre-arrival-readiness` (see `next.config.ts`).
- `src/pages/demo.tsx` — the real self-serve "book a demo / set up your
  fleet" page (indexed, in sitemap), renders `DemoFunnel`. **Distinct from**
  `/start`, `/start-v2`, `/start-v3` (see below).
- `src/pages/start.tsx`, `start-v2.tsx`, `start-v3.tsx` — **paid Meta-ad
  landing pages**, anonymous, `noindex`/`nofollow`, deliberately excluded
  from the sitemap and IndexNow (they're paid-traffic destinations, not
  organic pages). `_app.tsx` hides the marketing header/Intercom on these
  routes. `/start` = full onboarding funnel; `/start-v2` = lead-capture only,
  answers post to Telegram, defaults to Uzbek UI (driver-training campaign
  audience) via `start-v2-i18n`; `/start-v3` = "buy now" funnel for the
  separate Raisedash Academy course app (academy.raisedash.com). Never let
  edits to one regress another — they're intentionally self-contained.
- `src/pages/blog.tsx` + `blog/[slug].tsx`, `src/pages/product-updates.tsx` +
  `product-updates/[slug].tsx`, `changelogs.tsx` + `changelogs/[slug].tsx` —
  MDX-backed content, source files in `content/blog/` and
  `content/product-updates/` (front-matter via `gray-matter`, rendered via
  `next-mdx-remote`). Blog posts are written with the `write-blog` skill (see
  memory), not the old retired TS content-pipeline. Individual
  `/product-updates/<slug>` pages are `noindex` and intentionally excluded
  from both the sitemap and IndexNow (thin changelog entries) — only the hub
  page is announced.
- `src/pages/tools/elp-practice.tsx` — real page here; `/tools/road-signs`
  and `/tools/elp-practice/*` are proxied via `vercel.json` rewrites to
  `tools.raisedash.com` but still get real, indexable, self-canonical pages
  (announced in the sitemap/IndexNow so they rank standalone).
- `src/pages/api/og.tsx` — edge-runtime OG image card (Satori via
  `@vercel/og`). Logo is inlined as a **PNG data URI** because Satori cannot
  decode WebP (the CDN logo is `.webp`) — inlining also drops a remote fetch
  per render. "Paper" color tokens are hardcoded here (kept in sync with
  `src/styles/globals.css` manually, not imported).
- `src/pages/api/indexnow.ts` — POST-only, bearer-auth'd
  (`INDEXNOW_SECRET`), submits `STATIC_PATHS` + all blog slugs to
  `api.indexnow.org`.
- `src/pages/sitemap.xml.tsx` — server-rendered XML; hardcodes `lastmod`
  dates because Vercel's serverless fs doesn't preserve real file mtimes.
  `/blog` and `/product-updates` hub dates are auto-overridden by the latest
  post/update date.
- `src/pages/rss.xml.tsx` — RSS feed for blog posts.
- `src/middleware.ts` — security headers (HSTS, X-Frame-Options, COOP,
  Permissions-Policy) on every route except static assets.
- `src/components/home/RoiCalculator.tsx` — homepage orientation-cost
  calculator with a shareable state-in-URL hash (`#calc=driver-count-...`,
  `SHARE_PREFIX`) so a safety director can send exact numbers to a colleague.
- `src/data/{navigation,site}.ts` — shared nav/site metadata, not
  scattered inline in components.
- `new_design_principles/` — the "Paper" design system reference (Cursor.com-
  inspired: warm neutrals, `#f7f7f4` canvas / `#26251e` ink / `#f54e00`
  accent, pill buttons, 22.4px base spacing unit). Read before touching
  visual styling.
- `public/robots.txt` — allows all, blocks `/api/*` except `/api/og`
  (needed for social/search crawlers to fetch link-preview cards), blocks
  `/admin/` and `/private/`.

## Product/positioning guardrails

- Site is positioned as a **driver-readiness platform**, not a compliance/
  document-upload SaaS — that framing was deliberately stripped in the
  2026-07-14 pivot (`9a2aef7`). Don't reintroduce
  compliance-automation/document-upload claims in new copy; check
  `content/blog/raisedash-driver-readiness-platform-pivot.mdx` for the
  rationale if unsure. (Some legacy compliance-flavored blog posts and
  `/compliance-challenges`, `/products/raisedash-pti-inspections` still exist
  — they predate the pivot and are lower priority, not a template for new
  pages.)
- Pricing has **no gating flag** — it is fully public and linked from nav.
  If you see references elsewhere (memory, other repos) to a `PRICING_LIVE`
  flag, that applied to an earlier state; verify against `pricing.tsx`
  itself before trusting stale notes.
- Meta-ad landing pages (`/start*`) intentionally carry no pricing and stay
  `noindex` — don't add them to the sitemap or make them rank organically.

## Meta ads tracking (fleet pixel; one legacy pixel on /start-v3)

- **FLEET pixel** (`NEXT_PUBLIC_META_FLEET_PIXEL_ID` +
  `META_FLEET_CAPI_ACCESS_TOKEN`; optional `META_FLEET_PIXEL_ID` server
  override and `META_FLEET_CAPI_TEST_EVENT_CODE` for Events-Manager QA) — the
  only dataset this site's ads optimize on. Mounted **site-wide** via
  `FleetMetaPixel` in `_app.tsx`, excluded on `/start*`. Ads land on the
  homepage. No-ops until the env is set.
- **Legacy driver-training pixel** (`NEXT_PUBLIC_META_PIXEL_ID`) — now mounted
  ONLY by `/start-v3` (Academy buy-now funnel), browser-only. `/start` and
  `/start-v2` dropped all Meta tracking 2026-10-01 (their CAPI routes
  `/api/start-capi` + `/api/start-v2-interest` were deleted). Don't touch
  `/start-v3`'s events — it feeds the separate, live Academy campaigns.
- **Every browser event goes through `fbq('trackSingle' | 'trackSingleCustom',
  pixelId, …)` — never `fbq('track', …)`.** One session can still initialize
  both pixels (homepage → `/start-v3` client-side nav), and a broadcast
  `track` would cross-pollute the datasets. `bootstrapFbq()` in
  `src/lib/meta-pixel.ts` is the single shared fbq snippet; init guards are
  per-pixel module flags, NOT "window.fbq exists".
- Fleet conversion ladder — every rung is a Pixel + CAPI pair deduped on a
  shared `eventId`, sent server-side by `sendFleetCapiEvent`
  (`src/lib/meta-capi.ts`):
  1. **"EngagedVisit"** (custom event, `content_name: engaged_visit`) — the
     learning-phase optimization event. `src/lib/engaged-visit.ts`: once per
     session, ≥30s of *active* time (tab visible + recent input) AND ≥1 intent
     signal (deep scroll, intent page, or a named high-intent site-analytics
     event via `onCapture`). Twin: `/api/visit-quality` (neutral path on
     purpose — blockers match "pixel"/"capi"/"track"). PostHog twin
     `engaged_visit_qualified` is how the proxy is validated against leads;
     thresholds are constants at the top of the file.
  2. **"Lead"** (`fleet_email_capture`) — every email capture (`EmailCapture`,
     `/demo` email gate), twin `/api/email-capture`.
  3. **"Schedule"** (`fleet_demo_request`) — successful `/demo` submit (twin
     `/api/demo-lead`) or Cal.com booking (browser-only).
  Move an ad set up a rung once the next one clears ~50 events/week.
- `FleetMetaPixel` also persists `rd_fbclid` (90d) + `rd_utm` (30d) cookies;
  `/api/email-capture` reads `rd_utm` to append a campaign footer to the
  Telegram notification, and the fleet API routes use `rd_fbclid` to
  synthesize `_fbc` when the Pixel never set it.

## PostHog analytics (site-wide)

- posthog-js inits in `src/instrumentation-client.ts` (pre-hydration; the
  convention works in the Pages Router). The publishable project token is a
  **code constant** in `src/lib/posthog-config.ts`, not env — a stale
  `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` left in Vercel once kept prod reporting
  into an old project. Switching projects = edit that one constant (the browser
  SDK, `/api/ev` and the server-side lead events all read it).
- This is the **website's own** PostHog project. The academy app
  (academy.raisedash.com) is a SEPARATE project and codebase — never point
  it at this token or change its analytics from here.
- All SDK traffic goes through the same-origin **`/rdx` reverse proxy**
  (next.config.ts rewrites → us.i.posthog.com / us-assets.i.posthog.com) so
  ad/tracking blockers can't drop events or session replay. Filter lists
  (EasyPrivacy, uBlock privacy, AdGuard; checked 2026-10) target the
  well-known prefixes `/ingest`, `/ingress`, `/hog`, `/s/…` — keep "/rdx".
- `skipTrailingSlashRedirect: true` in next.config.ts is REQUIRED by the
  proxy (PostHog API paths end in "/"); the site's SEO no-trailing-slash 308
  now lives in `src/middleware.ts` instead. That redirect must build a plain
  `new URL(request.url)` — `request.nextUrl.clone()` re-applies the original
  trailing slash on serialization and loops. Don't remove either half.
- Init forces on: session replay (`maskAllInputs` + console logs), exception
  capture, dead clicks, heatmaps, web vitals + network timing, copied-text
  autocapture. Replay ALSO needs "Record user sessions" enabled in the
  PostHog project settings — the remote config overrides code.
- `before_send` stamps **`page_group`** + **`product`** (stable slug from
  `src/data/products.ts` hrefs, via `src/lib/analytics-context.ts`) on every
  event, and redacts `?email=` from URL-ish props. Super props:
  `deployment_env` (NEXT_PUBLIC_VERCEL_ENV) and `is_internal` (visit any page
  with `?rd_internal=1` to flag your browser, `=0` to clear).
- `src/lib/site-autotrack.ts` (document listeners, no per-page wiring):
  `outbound_link_clicked` (classified by `destination_kind`: telegram_bot /
  telegram_sales / booking / app_signup / academy / app_store / youtube /
  email …, plus `placement` + `link_index`), `video_started` /
  `video_progress` / `video_completed` (muted loops skipped), `embed_clicked`
  (content iframes: YouTube/cal.com, not Intercom/Turnstile). SAME-TAB
  outbound clicks drain the batch queue by beacon first (`posthog.shutdown()`
  — capture keeps working after it) because a t.me tap on mobile hands off to
  Telegram without a pagehide flush; new-tab/mailto/tel clicks don't drain.
- Named events live in `src/lib/site-analytics.ts` (typed wrapper; no-ops
  when PostHog isn't loaded): `product_card_clicked`,
  `email_capture_submitted` (Meta Lead twin), `demo_path_chosen`,
  `demo_step_viewed`, `demo_request_submitted` (Meta Schedule twin),
  `demo_request_error`, `scheduling_link_clicked`, `roi_calculator_*`,
  `contact_form_submitted`/`_error`, `job_application_submitted` (never
  identified — applicants aren't leads), `intercom_opened`. `identify(email)`
  at every lead moment. `Intercom.tsx` stamps the replay/person URLs on the
  Intercom lead (posthog-js's built-in Intercom integration can't, the widget
  boots lazily).
- **Server-side twins** (`src/lib/posthog-server.ts`, blocker-proof):
  `lead_email_captured` (/api/email-capture), `lead_demo_requested`
  (/api/demo-lead), `lead_contact_submitted` (/api/contact); distinct_id =
  email, `$session_id` from the `analytics: analyticsContext()` the client
  sends in the body, `client_tracked: false` when the browser SDK was blocked.
  Count leads from these; use the browser twins for funnels/replays.
- Ambient behaviour (pageviews, clicks, scroll depth, utm_*/fbclid
  attribution) is autocaptured by the SDK's versioned defaults — don't add
  custom events for those.

## SEO/perf conventions

- Every indexable page goes through `SEO`/`PageLayout` (`src/components/seo`,
  `src/components/layout`) — set `noindex`/`nofollow` explicitly for anything
  that shouldn't rank (ad funnels, thin changelog entries).
- New static page → sitemap + IndexNow (see Core rules) + `robots.txt` if it
  needs special treatment.
- OG cards default through `/api/og`; pass `title`/`description`/`category`
  query params rather than building bespoke images.
- After a prod deploy that changes a page's OG image/title, re-scrape the
  social card caches (Facebook debugger / Twitter card validator / iMessage)
  — they cache aggressively and won't show new metadata otherwise.

## Design

- Design system = "Paper": warm-neutral canvas, near-black ink, one orange
  accent used sparingly, Inter font, pill-shaped buttons. Full spec in
  `new_design_principles/*.md`.
- Homepage (`src/pages/index.tsx`) is the living reference — when in doubt,
  match its spacing/type scale/motion rather than inventing new patterns.
- `Inter` is loaded via `next/font/google` in `PageLayout.tsx` — this fetches
  `fonts.googleapis.com` at build time (see gotchas: offline builds fail
  here, it's not a code bug).

## Gotchas

- **Node version is pinned to 22.x on purpose.** Vercel building on an
  unpinned/newer Node (seen with 24.15.0) hit a poisoned-webpack-cache crash
  inside `WasmHash._updateWithBuffer` right after cache restore — looks like
  a code error but isn't; it's the Node/webpack-cache mismatch. Don't bump
  Node without also expecting to force a clean build cache. This is separate
  from — but adjacent to — the `next/font/google` (Inter) network fetch at
  build time; a **local** `next build`/`next dev` needs network for fonts
  and will fail fully offline (e.g. in a sandboxed agent) even though the
  code is fine. Prefer `npx tsc --noEmit` for offline verification (see Core
  rules); run a real `next build` yourself only when you have network.
- **Prettier collapses `{" "}` JSX whitespace tokens** in some contexts —
  if you need a guaranteed literal space (e.g. between an inline link and
  following text), use a template literal (`` {`text `} ``) instead of
  relying on `{" "}` surviving a format pass.
- **Hidden browser tabs freeze rAF/IntersectionObserver/hydration timers** —
  if you're QA'ing animations or the ROI calculator in a background tab,
  bring it to the foreground first or you'll see false "broken" behavior.
- `vercel.json` handles the apex-domain redirect (`raisedash.com` →
  `https://www.raisedash.com`, permanent) and rewrites `/tools/road-signs`
  and `/tools/elp-practice/*` to `tools.raisedash.com` — don't duplicate
  these in `next.config.ts` redirects, which handles a different set
  (`/get-started` → `/start`, `/products/raisedash-shift` →
  `/platform/pre-arrival-readiness`).
- `INDEXNOW_KEY` in `api/indexnow.ts` must match the `<key>.txt` file served
  at the site root (`public/`) — IndexNow verifies key ownership that way.

## Verify

- `npx tsc --noEmit` is the standard check — do this after almost every
  change, it's enough (per Core rules above).
- Scoped lint: `npx eslint <files>` (repo-wide `pnpm lint`/`format` reformats
  everything — avoid unless intentional).
- Real build/visual verification is a Vercel deploy, not a local `next
  build` — see gotchas above for why local/offline builds are unreliable
  signal.
