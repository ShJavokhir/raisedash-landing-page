# Deploying www.raisedash.com

Since 2026-10-16 the site runs on the Raisedash EC2 box (the same one as
app/api/on), not Vercel:

```
visitor -> Cloudflare (proxied DNS) -> EC2 box :443 (Traefik) -> landing container (Next standalone :3000)
```

- `git push` does **not** deploy. Deploys run from the parent `raisedash-new`
  repo with `./infra/deploy-landing.sh`.
- Everything below runs from `~/dev/projects/raisedash-new` (the parent repo).
- You need: Docker Desktop running, the AWS CLI (`export PATH="$HOME/aws-cli:$PATH"`),
  and `infra/secrets/landing.env` (gitignored; template in
  `infra/env/landing.env.example`).

## 1. Ship a code change

```bash
cd ~/dev/projects/raisedash-new/raisedash-landing-page
npx tsc --noEmit                       # quick check
git add … && git commit -m "…"         # commit first: the image is built from the working tree

cd ..
export PATH="$HOME/aws-cli:$PATH"
./infra/deploy-landing.sh
```

What it does: builds the Docker image (arm64) from the working tree, pushes it
to ECR as `raisedash-landing:<UTC timestamp>` + `latest`, then rolls it out on
the box with zero downtime (new container starts, passes `/api/health`, takes
traffic, old one drains). Takes about 3–5 minutes. The tag is saved in
`infra/.last-landing-tag`.

Then verify (section 4). `git push` the landing repo afterwards to keep GitHub
in sync. Until the Vercel project is deleted, a push also builds on Vercel,
which is harmless because no DNS points there.

## 2. Change an environment variable

Values live in `infra/secrets/landing.env`. Two kinds:

| Kind | Examples | Applied by |
|---|---|---|
| `NEXT_PUBLIC_*` (baked into the browser JS at build time) | `NEXT_PUBLIC_META_FLEET_PIXEL_ID`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | a full rebuild: `./infra/deploy-landing.sh` |
| server-only (read at runtime) | `META_FLEET_CAPI_ACCESS_TOKEN`, `TELEGRAM_*`, `TURNSTILE_SECRET_KEY` | ship the file, then recreate the container |

Server-only change:

```bash
# edit infra/secrets/landing.env, then:
./infra/push-landing-env.sh
SKIP_BUILD=1 LANDING_TAG=$(cat infra/.last-landing-tag) ./infra/deploy-landing.sh
```

`NEXT_PUBLIC_*` change: edit the file, run `./infra/push-landing-env.sh`
(so the runtime copy matches), then `./infra/deploy-landing.sh`.

**Never** use `./infra/push-secrets.sh` for this. It pushes every app's env
file and overwrites keys that only exist on the box.

## 3. Roll back

**Bad code deploy.** Redeploy the previous image tag:

```bash
# list tags (ECR keeps images ~2 days; the box keeps local images ~72h)
aws ecr describe-images --repository-name raisedash-landing --region us-east-1 \
  --query 'reverse(sort_by(imageDetails[?imageTags],&imagePushedAt))[:5].[imageTags[0],imagePushedAt]' --output table
SKIP_BUILD=1 LANDING_TAG=<previous-tag> ./infra/deploy-landing.sh
```

If the tag has expired from ECR, check out the previous commit and run a normal
deploy.

**The box itself is down (emergency).** Point DNS back to Vercel. This only
works while the Vercel project `raisedash-landing-page` still exists. In
Cloudflare → raisedash.com → DNS:

| Record | Change back to |
|---|---|
| `www` | `CNAME d2a1f6d881f0fda5.vercel-dns-017.com`, **DNS only** (grey cloud) |
| `raisedash.com` | `A 216.198.79.1`, **DNS only** |
| `raisedash.org` (raisedash.org zone) | `A 216.198.79.1`, **DNS only** |

## 4. Verify after any deploy

```bash
curl -s https://www.raisedash.com/api/health                 # {"ok":true}
curl -sI https://www.raisedash.com/ | grep -iE "^(HTTP|server)"   # 200, server: cloudflare
curl -sI https://raisedash.com/ | grep -i location           # https://www.raisedash.com
```

For anything touching tracking, also check:
- **Meta:** Events Manager → dataset `2533223630437453` → Overview: Contact /
  Lead / CompleteRegistration still arriving as Browser + Server.
- **PostHog** (website project): new events on `www.raisedash.com` with real
  visitor cities, not Cloudflare edges.
- **Telegram:** a lead alert on the next form submit.

## 5. Testing Meta server events safely

1. Events Manager → dataset → **Test events** → copy the server test code.
2. Add `META_FLEET_CAPI_TEST_EVENT_CODE=<code>` to `infra/secrets/landing.env`,
   push and recreate (section 2).
3. Trigger the events, watch them appear in Test events.
4. **Delete the line**, push and recreate again, and confirm it's gone:
   while it's set, every real server event becomes a test event that Meta
   ignores for ads. Both deploy scripts warn while it's set.

## 6. Rules that keep things working

- **Visitor IPs:** read `cf-connecting-ip` first. Behind Cloudflare,
  `x-forwarded-for`'s first hop is a Cloudflare edge, which breaks Meta
  matching, PostHog geo and per-IP rate limits. The box only accepts
  Cloudflare IPs, so the header can't be spoofed.
- **Routing lives in `next.config.ts`** (apex/raisedash.org → www, `/tools/*`
  proxies, `/rdx` PostHog proxy, redirects). `vercel.json` is unused.
- **Container logs are quiet:** the production build strips all `console.*`
  calls (`compiler.removeConsole`), so a failed CAPI or Telegram send won't
  show in `docker logs`. Check Meta, PostHog and Telegram instead.
- **Don't run `./infra/ecr-setup.sh`.** It would replace the repos' 2-day
  image expiry policy.
- **Cloudflare** (zone raisedash.com → Rules → Configuration Rules): a rule
  for `www` / `raisedash.com` turns off Email Obfuscation (it rewrites HTML
  and breaks React hydration), Browser Integrity Check and visitor
  challenges (paid ad clicks must never see a challenge page). Keep it.

## Where things are

| What | Where |
|---|---|
| Image recipe | `raisedash-landing-page/Dockerfile` |
| Deploy script | `infra/deploy-landing.sh` |
| Env push | `infra/push-landing-env.sh` |
| Compose service + Traefik routing | `infra/docker-compose.yml` → `landing` (on the box: `/opt/raisedash/docker-compose.yml`) |
| Runtime env on the box | `/etc/raisedash/landing.env` (root, 0600) |
| Box | EC2 `i-0284c6e7c5a6a3edf`, us-east-1, Elastic IP `44.208.18.3`; shell via `aws ssm start-session --target i-0284c6e7c5a6a3edf` |
| Container logs | on the box: `cd /opt/raisedash && docker compose logs --tail 100 landing` |
