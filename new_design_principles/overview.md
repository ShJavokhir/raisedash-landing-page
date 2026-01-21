# Cursor.com Design System Overview (Light Theme)

## Design Philosophy

Cursor's design language is characterized by:

1. **Minimalist Elegance** - Clean, uncluttered interfaces with generous whitespace
2. **Warm Neutrals** - Soft, warm grays instead of cold blue-grays
3. **Subtle Depth** - Layered surfaces using opacity-based color mixing
4. **Typography-First** - Light font weights with careful letter-spacing
5. **Smooth Interactions** - Fast, spring-based animations

---

## Quick Reference

### Brand Colors
| Purpose | Value |
|---------|-------|
| Primary Text | `#26251e` (warm black) |
| Background | `#f7f7f4` (warm white) |
| Card Surface | `#f2f1ed` |
| Accent | `#f54e00` (orange) |

### Typography
| Element | Size | Weight |
|---------|------|--------|
| Hero H2 | 72px | 400 |
| H1/Section | 26px | 400 |
| H2/Large | 36px | 400 |
| H3/Card | 22px | 400 |
| Body | 16px | 400 |
| Small | 14px | 400 |

### Spacing
| Size | Value |
|------|-------|
| Base Unit | 22.4px (1v) |
| Section Padding | 67.2px (3v) vertical |
| Container | 1200px max |
| Side Padding | 20px |

### Borders & Radius
| Element | Radius |
|---------|--------|
| Pills/Buttons | Full (99999px) |
| Cards | 4px |
| Medium | 8px |
| Large | 12px |

### Transitions
| Type | Duration | Easing |
|------|----------|--------|
| Quick | 0.14s | spring |
| Standard | 0.15s | ease-out |
| Slow | 0.25s | ease-out |

---

## Files in This Directory

| File | Description |
|------|-------------|
| [typography.md](./typography.md) | Font families, sizes, weights, line heights, letter spacing |
| [colors.md](./colors.md) | Color palette, semantic colors, opacity scale |
| [spacing.md](./spacing.md) | Spacing scale, containers, padding, margins |
| [components.md](./components.md) | Buttons, cards, forms, navigation |
| [layout.md](./layout.md) | Grid systems, page structure, responsive |
| [animations.md](./animations.md) | Transitions, keyframes, timing functions |

---

## CSS Variables Summary

### Core Tokens
```css
/* Font */
--font-sans: "CursorGothic", system-ui, sans-serif;
--font-mono: ui-monospace, SFMono-Regular, Menlo, monospace;

/* Colors */
--color-theme-fg: #26251e;
--color-theme-bg: #f7f7f4;
--color-theme-card-hex: #f2f1ed;
--color-theme-accent: #f54e00;

/* Spacing */
--v: 1rem * 1.4;  /* 22.4px base */
--g: calc(10rem / 16);  /* 10px grid */

/* Radius */
--radius-xs: 4px;
--radius-md: 8px;

/* Timing */
--duration: 0.14s;
--ease-out-spring: cubic-bezier(0.25, 1, 0.5, 1);
```

---

## Key Design Patterns

### 1. Color Mixing for Opacity
Instead of solid colors, Cursor uses `color-mix()` for consistent opacity:
```css
color-mix(in oklab, #26251e 60%, transparent)  /* 60% text */
color-mix(in oklab, #26251e 10%, transparent)  /* Border */
```

### 2. Vertical Rhythm
All vertical spacing is based on multiples of 22.4px:
- 1v = 22.4px (margins, small gaps)
- 1.5v = 33.6px (between elements)
- 3v = 67.2px (section padding)
- 5v = 112px (hero padding)

### 3. Light Font Weights
Headings and body text both use `font-weight: 400`. Emphasis comes from:
- Size differentiation
- Negative letter-spacing on larger text
- Color opacity levels

### 4. Surface Layering
Progressive darkening for nested elements:
```
Page (#f7f7f4) → Card (#f2f1ed) → Nested (#ebeae5) → Deep (#e6e5e0)
```

### 5. Pill-Shaped Buttons
Primary CTAs use fully rounded borders (`border-radius: 9999px`)

### 6. Subtle Borders
Most borders use 2.5-10% opacity of the primary color

---

## Implementation Notes

### For Next.js / Tailwind

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        cursor: {
          fg: '#26251e',
          bg: '#f7f7f4',
          card: '#f2f1ed',
          accent: '#f54e00',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      spacing: {
        'v': '1.4rem',
        'v2': '2.8rem',
        'v3': '4.2rem',
      },
      borderRadius: {
        'pill': '9999px',
      }
    }
  }
}
```

### CSS Custom Properties
Place in your global CSS:
```css
:root {
  /* See colors.md for full list */
  --color-theme-fg: #26251e;
  --color-theme-bg: #f7f7f4;
  /* ... */
}
```

---

## Source

All values extracted directly from https://cursor.com using browser DevTools and computed styles on **January 2026**.
