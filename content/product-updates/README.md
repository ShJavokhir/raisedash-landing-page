# Product Updates Content Guidelines

This directory contains MDX files for product updates displayed on `/product-updates`.

## Frontmatter Schema

```yaml
---
title: string (required)           # Update title - use "Just Got" constructions
excerpt: string (required)         # 1-2 sentences, pain-solution focused
category: string (required)        # One of the categories below
tags: string[] (required)          # 2-4 relevant tags
publishedAt: string (required)     # ISO date YYYY-MM-DD
tier: "P0" | "P1" | "P2" (required)
image: string (optional)           # Feature image URL
productLink: string (optional)     # Link to relevant product page
---
```

## Categories

- `ELD Compliance` - Electronic logging device features
- `Driver Qualification` - DQ file management, training
- `HOS Management` - Hours of service tracking
- `Safety Scores` - CSA scores, safety metrics
- `Fleet Management` - General fleet operations
- `Integrations` - Third-party integrations, APIs
- `Platform` - General platform improvements

## Tier Definitions

- **P0 (Major)** - Major new features, significant functionality additions
- **P1 (Enhancement)** - Improvements to existing features
- **P2 (Improvement)** - Bug fixes, minor tweaks, polish

## Writing Style (Ramp-inspired)

1. **Pain-Solution-Elimination Pattern**: Start with frustration, introduce fix, emphasize what's eliminated
2. **"Just Got" Constructions**: "Driver qualification file management just got automated"
3. **Negative Framing**: "No more...", "Stop...", "Eliminate..."
4. **Specific Examples**: Use trucking-specific scenarios, reference DOT/FMCSA regulations

## Example

```yaml
---
title: "Real-Time ELD Compliance Alerts Just Got Smarter"
excerpt: "No more manual log reviews. Raisedash now automatically flags HOS violations before they happen."
category: "ELD Compliance"
tags: ["ELD", "HOS", "compliance"]
publishedAt: "2026-01-15"
tier: "P0"
productLink: "/products/raisedash-shift"
---

No more scrambling when drivers hit their HOS limits...
```
