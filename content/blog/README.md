# Blog Post Creation Guide

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

# Your H1 Title (Include Primary Keyword)

Intro paragraph here.

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
| `category` | Yes | e.g., "Product", "News", "Feature" |
| `tags` | Yes | Array of keywords for SEO |
| `featured` | No | Set `true` to highlight post |

## Heading Rules

```
# H1 - Only ONE per post (main title with primary keyword)
## H2 - Major sections
### H3 - Subsections under H2
```

**Do:**
- Start with H1 containing your main keyword
- Use H2 for each major topic
- Use H3 for subtopics within H2 sections

**Don't:**
- Skip heading levels (H1 → H3)
- Use multiple H1s
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

Current categories: `Product`, `News`, `Feature`

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
- [ ] H1 matches/complements the title
- [ ] Heading hierarchy is correct (H1 → H2 → H3)
- [ ] FAQ section uses bold question format
- [ ] Build passes (`npm run build`)
