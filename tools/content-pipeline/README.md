# Raisedash content pipeline

A self-contained, local tool that generates publish-ready blog drafts for the
Raisedash site. You run it on your machine, review the draft it produces, and
commit it yourself when you are happy. It never deploys and never touches git.

## What it does

For one post it runs the whole flow:

1. Picks (or accepts) a topic and checks it is not a near-duplicate of existing posts.
2. Researches primary sources with Firecrawl and builds a source packet.
3. Drafts the post with Claude Opus 4.8 (via your AWS Bedrock) in the house voice.
4. Fact-checks and edits it with a different model, Claude Sonnet 4.6, as an adversarial reviewer.
5. Applies the warranted fixes.
6. Runs deterministic gates: style lint (no em or en dashes, no AI-tell phrases), SEO checks, and an MDX compile.
7. Writes the draft to `content/blog/<slug>.mdx` for you to preview.

Everything from the run (sources, the claim review, the lint report, raw model
output) is saved under `.runs/<timestamp-slug>/` so you can audit it. That folder
is gitignored.

## Isolation guarantees

- Its own `package.json` and `node_modules`. The website never installs or imports it.
- Excluded from the website's `tsconfig`, so `tsc` and the Vercel build ignore it.
- It only ever writes new files (the draft and the run folder). It does not edit site code, run git, or deploy.
- Secrets live in this folder's `.env`, which is gitignored.

## Setup

```bash
cd tools/content-pipeline
npm install
cp .env.example .env
# edit .env: set your Firecrawl key. AWS region defaults to us-east-1 and
# credentials come from your normal AWS chain.
npm run check        # verifies Bedrock + Firecrawl connectivity and the model IDs
```

## Use

```bash
# Let it propose a topic from gaps in your existing coverage:
npm run generate

# Or give it a specific topic or angle:
npm run generate -- --topic "FMCSA new entrant safety audit: what to expect"

# Choose a content type (affects length and structure). Default: evergreen.
npm run generate -- --topic "..." --type news

# Try the whole flow without writing anything (prints a summary + run folder):
npm run generate -- --topic "..." --dry-run

# Optional: instead of writing locally, open a PR and ping Telegram (needs gh and
# TELEGRAM_* set in .env). Proposes its own topic if you do not pass one.
npx tsx src/cli.ts auto
```

After `generate` writes the draft, preview it on the site:

```bash
cd ../..          # back to the repo root
npm run dev
# open http://localhost:3000/blog/<slug>
```

When you are happy, commit the new `.mdx` (and any images) and push. Vercel
deploys from your push, exactly as today. After it goes live you can ping
`/api/indexnow` to request a fast recrawl.

## Security

- The model has no tools and never sees your secrets. Scraped web text goes in,
  text comes out. The git and PR calls use argument arrays with no shell, so model
  output cannot inject a command.
- A deterministic safety gate rejects any executable or injection-shaped content
  (raw HTML, JSX, `{}` expressions, `import`/`export`, `javascript:`/`data:` URIs,
  off-domain inline images) before anything is written.
- Scraped sources are passed to the writer as untrusted data, with a standing
  instruction never to follow instructions found inside them.
- For defense in depth against a compromised npm dependency, run generation in the
  hardened container. See the header of `Dockerfile` for the exact `docker build`
  and `docker run` commands. The container only gets the env you pass and can only
  write `content/blog` and `.runs`.

## Notes

- Nothing is auto-committed or deployed. You review and ship.
- Images are a later phase. This phase is text only.
- If `npm run check` reports a model ID problem, it prints the exact IDs your
  Bedrock account and region can call. Put the right ones in `.env`.
