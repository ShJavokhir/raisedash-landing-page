# Spacing - Cursor.com Design System (Light Theme)

## Spacing System

Cursor uses a custom spacing scale based on a vertical rhythm unit (`--v`) and a grid unit (`--g`).

### Base Units
```css
--v: 1rem * 1.4;  /* Vertical rhythm base = 22.4px at 16px root */
--g: calc(10rem / 16);  /* Grid base = 0.625rem = 10px */
--spacing: 0.25rem;  /* Base spacing unit = 4px */
```

---

## Vertical Rhythm Scale (--spacing-v*)

The vertical spacing uses multiples of the base unit (1rem × 1.4 = 22.4px).

| Token | Calculation | Value (px) | Usage |
|-------|-------------|------------|-------|
| `--spacing-v1/12` | 1rem×1.4×(1/12) | ~1.87px | Micro spacing |
| `--spacing-v2/12` | 1rem×1.4×(2/12) | ~3.73px | - |
| `--spacing-v2.5/12` | 1rem×1.4×(2.5/12) | ~4.67px | - |
| `--spacing-v3/12` | 1rem×1.4×(3/12) | ~5.6px | - |
| `--spacing-v4/12` | 1rem×1.4×(4/12) | ~7.47px | - |
| `--spacing-v5/12` | 1rem×1.4×(5/12) | ~9.33px | - |
| `--spacing-v6/12` | 1rem×1.4×(6/12) | ~11.2px | Half unit |
| `--spacing-v7/12` | 1rem×1.4×(7/12) | ~13.07px | - |
| `--spacing-v8/12` | 1rem×1.4×(8/12) | ~14.93px | - |
| `--spacing-v9/12` | 1rem×1.4×(9/12) | ~16.8px | - |
| `--spacing-v1` | 1rem×1.4×1 | 22.4px | Base unit |
| `--spacing-v1.25` | 1rem×1.4×1.25 | 28px | - |
| `--spacing-v1.5` | 1rem×1.4×1.5 | 33.6px | 1.5 units |
| `--spacing-v2` | 1rem×1.4×2 | 44.8px | 2 units |
| `--spacing-v2.5` | 1rem×1.4×2.5 | 56px | 2.5 units |
| `--spacing-v3` | 1rem×1.4×3 | 67.2px | 3 units |
| `--spacing-v4` | 1rem×1.4×4 | 89.6px | 4 units |
| `--spacing-v4.5` | 1rem×1.4×4.5 | 100.8px | 4.5 units |
| `--spacing-v5` | 1rem×1.4×5 | 112px | 5 units |
| `--spacing-v6` | 1rem×1.4×6 | 134.4px | 6 units |
| `--spacing-v8` | 1rem×1.4×8 | 179.2px | 8 units |

---

## Grid Spacing Scale (--spacing-g*)

Based on 10px grid unit.

| Token | Calculation | Value (px) | Usage |
|-------|-------------|------------|-------|
| `--spacing-g0.25` | 10px×0.25 | 2.5px | Tiny |
| `--spacing-g0.5` | 10px×0.5 | 5px | Small |
| `--spacing-g0.75` | 10px×0.75 | 7.5px | - |
| `--spacing-g1` | 10px×1 | 10px | Base grid |
| `--spacing-g1.25` | 10px×1.25 | 12.5px | - |
| `--spacing-g1.5` | 10px×1.5 | 15px | 1.5 grid |
| `--spacing-g1.75` | 10px×1.75 | 17.5px | - |
| `--spacing-g2` | 10px×2 | 20px | 2 grid |
| `--spacing-g2.5` | 10px×2.5 | 25px | 2.5 grid |
| `--spacing-g3` | 10px×3 | 30px | 3 grid |

---

## Container Widths

| Token | Value | Usage |
|-------|-------|-------|
| `--container-2xs` | 18rem (288px) | Very narrow |
| `--container-sm` | 24rem (384px) | Small |
| `--container-md` | 28rem (448px) | Medium |
| `--container-2xl` | 42rem (672px) | Large |
| `--container-3xl` | 48rem (768px) | Extra large |
| `--container-4xl` | 56rem (896px) | 2x Extra large |
| `--container-7xl` | 80rem (1280px) | Full width |
| `--max-width-container` | 1300px | Maximum site width |

---

## Prose/Content Widths

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-prose-narrow` | 48ch | Narrow text column |
| `--spacing-prose-medium-wide` | 80ch | Medium text column |
| `--spacing-prose-wide` | 96ch | Wide text column |

---

## Section Padding Patterns

### Hero Section
```css
padding: 112px 20px 67.2px;  /* top right/left bottom */
/* Breakdown: 5v 20px 3v */
```

### Standard Section
```css
padding: 67.2px 20px;  /* 3v horizontal 20px */
```

### Large Section
```css
padding: 89.6px 20px;  /* 4v horizontal 20px */
padding: 134.4px 20px; /* 6v horizontal 20px */
```

### Compact Section
```css
padding: 0px 20px 33.6px;  /* 0 20px 1.5v */
```

### Footer
```css
padding: 67.2px 20px 30px;  /* 3v 20px 30px */
```

---

## Common Padding Values

| Context | Value | Notes |
|---------|-------|-------|
| Section horizontal | `20px` | Consistent side padding |
| Section vertical (small) | `33.6px` | 1.5v |
| Section vertical (medium) | `67.2px` | 3v |
| Section vertical (large) | `89.6px` | 4v |
| Section vertical (xl) | `112px` | 5v |
| Section vertical (2xl) | `134.4px` | 6v |

---

## Component Spacing

### Buttons
```css
/* Primary button */
padding: 5.6px 10.5px 5.88px;  /* Asymmetric top/bottom */

/* Button padding tokens */
--button-padding-xs: 0.15em 0.5em;
--button-padding-sm: 0.4em 0.75em 0.42em;
--button-padding-md-sm: 0.6em 1.25em 0.62em;
--button-padding-default: 0.78em 1.35em 0.8em;
```

### Cards (Pricing)
```css
padding: 13.4px 15px 15px;
```

### Accordion/FAQ Items
```css
padding: 15.68px 0px 16.8px;
```

### Radio Button Wrapper
```css
padding: 9.6px 20px 9.92px;
```

---

## Margin Patterns

### Heading Margins
```css
/* H1, H2 */
margin-bottom: 22.4px;  /* 1v */
margin-top: 0px;

/* H3 in cards */
margin: 0;
```

### List Item Margin
```css
margin: 0px 0px 3.73px;  /* Small bottom margin */
```

### Section Margin
```css
margin: 67.2px 0px 0px;  /* Top margin of 3v */
```

---

## Gap Values

### Grid Gap
```css
--grid-gap: calc(12rem / 15);  /* ~12.8px */
```

### Common Gap Usage
Most elements use `gap: normal` (browser default), with explicit gaps set via margin/padding instead.

---

## Border Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-2xs` | 2px | Tiny elements |
| `--radius-xs` | 4px | Small elements, inputs |
| `--radius-sm` | 0.25rem (4px) | Small buttons |
| `--radius-md` | 8px | Cards, containers |
| `--radius-lg` | 0.5rem (8px) | Large cards |
| `--radius-xl` | 0.75rem (12px) | Extra large |
| Pill | `1.67772e+07px` | Full pill shape (buttons) |

---

## Sticky/Fixed Positioning

```css
--site-header-height: 52px;
--site-sticky-top: 64px;
```

---

## Responsive Considerations

### Mobile Padding
- Horizontal padding remains at `20px`
- Vertical padding may be reduced proportionally

### Container Behavior
```css
width: 1200px;  /* Fixed width in larger viewports */
max-width: 100%; /* Constrained on smaller screens */
```
