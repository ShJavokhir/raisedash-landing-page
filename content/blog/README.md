# Blog Post Creation Guide

> The full editorial spec (voice, SEO rules, CTA mapping, image generation) lives
> in `.claude/skills/write-blog/SKILL.md` and is what Claude Code follows when
> asked to write a post. This file is the quick mechanical reference.

## Quick Start

1. Create a new `.mdx` file in `content/blog/`
2. Name it using kebab-case: `your-post-title.mdx`
3. Add frontmatter + content (see template below)
4. Run `npm run dev` to preview

## Template

```mdx
---
title: "Your SEO-Optimized Title Here"
excerpt: "A compelling 1-2 sentence description for search results and social sharing."
author: "Raisedash"
authorRole: "Author"
publishedAt: "2025-12-19"
category: "Product"
tags:
  - "primary keyword"
  - "secondary keyword"
  - "related term"
featured: false
---

Intro paragraph here. Do NOT add a `#` H1 — the `title` above is rendered as the
page's single `<h1>` automatically. Start your sections at H2.

## First Main Section

Content here.

### Subsection (if needed)

More content.

## Another Main Section

Content continues.

---

## Frequently Asked Questions

**What is your first question?**

Answer paragraph here.

**What is your second question?**

Answer paragraph here.
```

## Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | SEO title (shows in browser tab) |
| `excerpt` | Yes | Meta description (~155 chars) |
| `author` | Yes | Author name |
| `authorRole` | Yes | e.g., "Author", "Admin", "Product Team" |
| `publishedAt` | Yes | Date in `YYYY-MM-DD` format |
| `updatedAt` | No | Date of last meaningful edit, `YYYY-MM-DD`. Sets `dateModified` (sitemap + JSON-LD) and shows an "Updated" line on the post. |
| `category` | Yes | e.g., "Product", "News", "Feature" |
| `tags` | Yes | Array of keywords for SEO |
| `featured` | No | Set `true` to highlight post |

## Heading Rules

The `title` frontmatter is rendered as the page's single `<h1>` automatically.
**Do not add a `#` H1 in the body** — start your sections at H2. (A leading body
`# H1` is auto-stripped if it repeats the title, or demoted to H2 if it differs,
but you should not rely on that — author at H2.)

```
## H2 - Major sections
### H3 - Subsections under H2
```

**Do:**
- Open with an intro paragraph, then H2 sections
- Use H2 for each major topic
- Use H3 for subtopics within H2 sections

**Don't:**
- Add a `#` H1 in the body (the title is already the H1)
- Skip heading levels (H2 → H4)
- Leave section titles as plain bold text

## FAQ Section (for SEO Rich Snippets)

Add FAQs at the end using this exact format:

```mdx
---

## Frequently Asked Questions

**Your question here?**

Your answer paragraph here.

**Another question?**

Another answer here.
```

The system auto-extracts these for Google FAQ rich snippets.

## Categories

Current categories: `Driver Readiness` (default for new posts), `Compliance`, `Product`, `News`

## Preview & Publish

```bash
# Preview locally
npm run dev
# Visit http://localhost:3000/blog/your-post-slug

# Build to verify
npm run build
```

## File Checklist

Before publishing:
- [ ] Filename is kebab-case
- [ ] Title includes primary keyword
- [ ] Excerpt is under 160 characters
- [ ] Date is correct
- [ ] Tags are relevant
- [ ] No `#` H1 in the body (the title is the H1); sections start at H2
- [ ] Heading hierarchy is correct (H2 → H3, no skipped levels)
- [ ] FAQ section uses bold question format
- [ ] Build passes (`npm run build`)
