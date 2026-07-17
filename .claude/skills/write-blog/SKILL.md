---
name: write-blog
description: Write a Raisedash blog post (content/blog/*.mdx) — SEO rules, brand voice, honest-scope copy, flat brand-illustration images via fal.ai gpt-image-2, R2/CDN upload, and a solution-mapped CTA. Use whenever asked to write, create, or draft a blog post or article for raisedash.com.
---

# Writing a Raisedash blog post

All paths below are relative to `raisedash-landing-page/`. The post is a single
`.mdx` file in `content/blog/` — sitemap, RSS, OG image, JSON-LD (Article +
FAQ + Breadcrumb), and IndexNow submission all derive from it automatically.
No other file needs touching to publish a post.

**What a perfect post is:** 1,400–2,200 words that teach a safety director at a
25–150 truck fleet something genuinely useful, with specific numbers and real
citations. 1–3 flat brand illustrations, only where they help — zero is
acceptable. It links into the platform pages, ends with a smooth CTA mapped to
a real Raisedash capability, then a FAQ. It never claims product features that
don't exist.

## Audience and voice

Written for the person who runs safety, recruiting, or operations at a small
or mid-size trucking fleet. They are busy, skeptical of software marketing, and
deeply familiar with FMCSA reality. Voice:

- Plain language, short paragraphs (2–4 sentences), concrete from the first line.
  Best openers drop the reader into a specific moment: *"An inspector at a scale
  house in Ohio pulls your driver's ELD record…"* or issue a direct challenge:
  *"Here is a test. Pick one driver you hired eighteen months ago…"*
- Specific numbers over adjectives. "14 hours and 12 minutes", not "slightly over".
- Bold sparingly, for load-bearing values and terms (`**11 hours**`), the way
  `hours-of-service-rules-*.mdx` does.
- No hype, no "game-changer", no exclamation marks. Confidence comes from precision.
- **Honesty rails (non-negotiable):**
  - Never fabricate a statistic. If you can't source a number, don't use it.
  - Regulatory claims cite the actual rule — link eCFR sections
    (`https://www.ecfr.gov/current/title-49/...`) and FMCSA pages inline.
  - Honest scope for the product: **First 90 days workflows and recruiting/telematics
    integrations are IN DEVELOPMENT** — say "planned" / "in development" if mentioned.
    The training-records PDF "does not replace the carrier's driver qualification
    file" — keep that framing. When unsure what shipped, check `src/pages/platform/`
    copy or ask; never guess a capability into existence.

## Before writing

1. `ls content/blog/` and skim titles — pick an angle no existing post owns
   (two posts targeting the same keyword cannibalize each other).
2. Choose one primary keyword/question the post answers; it goes in the title,
   slug, excerpt, and first H2 where natural.
3. Category: `Driver Readiness` (default for new posts — this is the product's
   cluster and it's thin), `Compliance`, `Product`, or `News`. No new categories.

## Frontmatter

```mdx
---
title: "Primary keyword first: the rest of the promise"
excerpt: "One sentence, 140–155 characters, that earns the click and reads as the meta description."
author: "Raisedash"
authorRole: "Editorial Team"
publishedAt: "YYYY-MM-DD"   # today, real date
category: "Driver Readiness"
tags:
  - "primary keyword"
  - "5-8 unique tags total"
featured: false
---
```

Hard rules (these fix real defects found in a 2026-07 audit of all 17 posts):

- **title ≤ 60 chars** — it is the H1 AND the `<title>` (with " | Raisedash"
  appended), so long titles get truncated in Google. Keyword early, human phrasing.
- **excerpt 140–155 chars** — it's the meta description; longer gets cut mid-sentence.
- **tags: 5–8, zero duplicates** — duplicated tags render duplicate visible pills
  on the page. Tags are not a keyword-stuffing field.
- **slug** (filename): kebab-case, 3–6 words, contains the keyword.
- `featured: true` only for launches/announcements, and un-feature something else
  — keep at most ~3 featured posts.
- `updatedAt`: never on first publish; set it on later meaningful edits.

## Structure and length

- **1,400–2,200 words** (2,500 hard cap for true pillar guides; below ~1,000 is thin).
- Opening paragraph(s), then `##` H2 sections. **No `#` H1 in the body**, no
  skipped heading levels. `###` H3 only inside an H2 that needs subdivision.
- 6–10 H2 sections. H2s should be scannable claims or questions, not one-word labels
  ("Why version integrity matters most", not "Versioning").
- Then the CTA section (see below), then `---`, then the FAQ (see below).
- MDX gotcha: write plain markdown only — no JSX, and no literal `{` `}` or
  stray `<` in prose (MDX parses them as code and the build fails).
- Tables (GFM) welcome for enumerable facts; keep explanation in prose.

## Linking (do not skip)

- **≥ 1 link to a platform page** where the topic genuinely connects (these are
  the pages that convert and currently get almost no internal links):
  `/platform/pre-arrival-readiness`, `/platform/training-evidence`,
  `/platform/first-90-days`, `/platform/driver-experience`.
- **2–3 links to related posts** in `content/blog/` (relative: `/blog/<slug>`).
- **Backlink pass:** after writing, edit 1–2 older related posts to add one
  natural inline link to the new post. New posts are otherwise orphans.
- External citations (eCFR/FMCSA/other authoritative sources) with descriptive
  anchor text, never "click here".
- Internal links use relative paths (`/demo`, `/blog/...`, `/platform/...`).

## The CTA (smooth, solution-mapped)

One `##` section at the end of the body, before the FAQ. Never a mid-article
sales pitch; at most one additional product mention inside the body and only
where Raisedash is genuinely the example. The pattern that works (see
`driver-training-records-audit-checklist.mdx`):

1. Connect the post's problem to the one capability that solves it — 2–4
   sentences, concrete about what the product actually does today.
2. One honest-scope sentence (what it does *not* do / what's still in development).
3. A low-pressure invitation: `[book a demo](/demo)` — and when it fits, tell the
   reader to do the manual/self-serve thing from the post *first*. Advice that
   doesn't require the product makes the CTA trustworthy.

Map the topic to the solution:

| Post topic | CTA target | Angle |
|---|---|---|
| Onboarding, orientation, no-shows, day-one prep | `/platform/pre-arrival-readiness` | Send training by SMS/email before arrival; phone browser, one-time code, no app |
| Records, audits, insurance renewal, litigation/discovery | `/platform/training-evidence` | Versioned completed history that never rewrites; one-driver PDF evidence packet |
| New-driver ramp, retention, first-90-days | `/platform/first-90-days` | Scheduled check-ins + refreshers — **in development, say so** |
| Driver UX, apps/passwords, completion rates | `/platform/driver-experience` | One-time code in a phone browser, nothing to install |
| English proficiency, roadside inspections | `/tools/elp-practice` | TruckTalk free ELP practice |
| Road signs, CDL prep | `/tools/road-signs` | Free practice tool (1,094 signs) |
| Anything else | `/demo` | Show the driver experience, progress tracking, PDF report |

## FAQ (rich-snippet format)

End every post with 3–5 FAQs in **exactly** this shape — `lib/blog.ts`
auto-extracts bold questions into FAQPage JSON-LD:

```mdx
---

## Frequently Asked Questions

**Question ending with a question mark?**

Answer paragraph, 2–4 sentences, self-contained (it may be read out of context
in a search result or by an AI assistant).
```

Write questions people actually type into Google; answer the post's primary
keyword question in one of them.

## Images (1–3, natural, never forced)

Add an image only where it earns its place: a cover that sets the scene after
the intro, or a diagram-like illustration that anchors a key concept. If no
section needs one, ship zero images — a decorative image is worse than none.
Every post must remain fully useful with images stripped.

**Style is locked** in `tools/generate-blog-image.sh` (flat editorial
illustration, warm paper `#f7f7f4`, near-black ink `#26251e`, single orange
accent `#f54e00`, no text, no photorealism, no detailed faces). Do not restyle
per post — consistency is the point. A good reference output:
`tools/temp/write-blog-skill-test.png`.

Workflow (needs `FAL_KEY` and `CF_API_TOKEN`/`CF_ACCOUNT_ID` in `.env.local`):

```bash
# 1. Generate (~60–90s, ≈$0.17). Describe ONLY the scene; style is prepended.
./tools/generate-blog-image.sh "<scene>" <post-slug-short>-<what>
# sizes: default 3:2; --size 16:9 for wide covers

# 2. LOOK at tools/temp/<name>.png (Read tool). Wrong composition → tweak the
#    scene wording and regenerate. Judge like an art director, not a spellchecker.

# 3. Upload (converts to webp, prints the CDN URL):
./tools/upload-blog-image.sh tools/temp/<name>.png <name>

# 4. Embed with a caption-quality alt (it renders as the visible figcaption):
![A messy binder's documents flowing into one clean training-record timeline.](https://cdn.raisedash.com/media/landing/blog/<name>.webp)
```

Writing the scene (per the GPT-image prompting guide): one subject + one idea;
state composition ("centered, viewed from the side"); name which single element
gets the orange accent; simplified human figures are fine, close-up faces are
not. No text/labels inside images — if a label is unavoidable, quote the exact
word and keep it to one or two words. Iterate by changing one thing at a time.

## Verify and publish

1. `npm run dev` → open `http://localhost:3000/blog/<slug>` — check rendering,
   TOC, images, links (or `npm run build` if a full check is warranted).
2. Checklist: title ≤60 chars · excerpt 140–155 · 5–8 unique tags · no body H1 ·
   platform-page link present · CTA section + honest scope · FAQ format exact ·
   images have caption-quality alts · every stat sourced · backlink pass done.
3. Sitemap, RSS, and the OG image are automatic. After the site deploys,
   IndexNow can be pinged via `POST /api/indexnow`.
4. Commit only when asked (repo rule).

## Exemplars

Imitate: `driver-training-records-audit-checklist.mdx` (structure, voice, CTA),
`hours-of-service-rules-the-complete-compliance-guide-for.mdx` (citation density),
`raisedash-driver-readiness-platform-pivot.mdx` (honest product framing).
Do not imitate the keyword-stuffed tag lists or 90+ character titles of the
pre-2026-07 posts.
