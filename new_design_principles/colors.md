# Colors - Cursor.com Design System (Light Theme)

## Core Brand Colors

### Primary Colors
| Token | Value | Hex | Usage |
|-------|-------|-----|-------|
| `--color-theme-fg` | `rgb(38, 37, 30)` | `#26251e` | Primary text, dark elements |
| `--color-theme-bg` | `rgb(247, 247, 244)` | `#f7f7f4` | Page background |
| `--color-theme-text` | `#26251e` | - | Text color |
| `--color-theme-accent` | `rgb(245, 78, 0)` | `#f54e00` | Accent/highlight |

### Secondary Foreground
| Token | Value | Description |
|-------|-------|-------------|
| `--color-theme-fg-02` | `#3b3a33` | Slightly lighter dark |
| `--color-theme-fg-01` | `color-mix(in oklab, #26251e 1%, transparent)` | 1% dark |
| `--color-theme-fg-02-5` | `color-mix(in oklab, #26251e 2.5%, transparent)` | 2.5% dark |
| `--color-theme-fg-05` | `color-mix(in oklab, #26251e 5%, transparent)` | 5% dark |
| `--color-theme-fg-07-5` | `color-mix(in oklab, #26251e 7.5%, transparent)` | 7.5% dark |
| `--color-theme-fg-10` | `color-mix(in oklab, #26251e 10%, transparent)` | 10% dark |
| `--color-theme-fg-15` | `color-mix(in oklab, #26251e 15%, transparent)` | 15% dark |
| `--color-theme-fg-20` | `color-mix(in oklab, #26251e 20%, transparent)` | 20% dark |

---

## Text Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-theme-text` | `#26251e` | Primary text |
| `--color-theme-text-sec` | `color-mix(in oklab, #26251e 60%, transparent)` | Secondary text |
| `--color-theme-text-tertiary` | `color-mix(in oklab, #26251e 40%, transparent)` | Tertiary/muted text |

### Computed RGB Values
| Purpose | RGB Value | Opacity |
|---------|-----------|---------|
| Primary | `rgb(38, 37, 30)` | 100% |
| Secondary | `oklab(0.263084 -0.00230259 0.0124794 / 0.6)` | 60% |
| Tertiary | `oklab(0.263084 -0.00230259 0.0124794 / 0.4)` | 40% |
| Very muted | `oklab(0.263084 -0.00230259 0.0124794 / 0.5)` | 50% |

---

## Background Colors

### Page & Surface Backgrounds
| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--color-theme-bg` | `#f7f7f4` | `rgb(247, 247, 244)` | Page background |
| `--color-theme-card-hex` | `#f2f1ed` | `rgb(242, 241, 237)` | Card background |
| `--color-theme-card-01-hex` | `#f0efeb` | `rgb(240, 239, 235)` | Card level 1 |
| `--color-theme-card-02-hex` | `#ebeae5` | `rgb(235, 234, 229)` | Card level 2 |
| `--color-theme-card-03-hex` | `#e6e5e0` | `rgb(230, 229, 224)` | Card level 3 |
| `--color-theme-card-04-hex` | `#e1e0db` | `rgb(225, 224, 219)` | Card level 4 |

### Hover States
| Token | Value | Usage |
|-------|-------|-------|
| `--color-theme-card-hover-hex` | `#ebeae5` | Card hover |
| `--color-theme-card-hover-light-hex` | `#f0efeb` | Light card hover |
| `--color-theme-card-hover-border` | `color-mix(in oklab, #26251e 10%, transparent)` | Hover border |

### Gradient Backgrounds
```css
--color-theme-card: linear-gradient(#f2f1ed 0% 100%);
--color-theme-card-02: linear-gradient(color-mix(in oklab, #26251e 2.5%, transparent) 0% 100%), linear-gradient(#f2f1ed 0% 100%);
--color-theme-card-03: linear-gradient(color-mix(in oklab, #26251e 5%, transparent) 0% 100%), linear-gradient(#f2f1ed 0% 100%);
```

---

## Border Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-theme-border` | `color-mix(in oklab, #26251e 2.5%, transparent)` | Subtle borders |
| `--color-theme-border-01` | `color-mix(in oklab, #26251e 2.5%, transparent)` | Level 1 border |
| `--color-theme-border-01-5` | `color-mix(in oklab, #26251e 5%, transparent)` | Level 1.5 border |
| `--color-theme-border-02` | `color-mix(in oklab, #26251e 10%, transparent)` | Level 2 border |
| `--color-theme-border-02-5` | `color-mix(in oklab, #26251e 20%, transparent)` | Level 2.5 border |
| `--color-theme-border-03` | `color-mix(in oklab, #26251e 60%, transparent)` | Strong border |

### Computed Border Values
| Opacity | Computed RGB |
|---------|--------------|
| 2.5% | Very subtle, nearly invisible |
| 5% | Subtle divider |
| 10% | Standard border |
| 20% | Emphasized border |
| 60% | Strong/focus border |

---

## Button Colors

### Primary Button
| Token | Value | Usage |
|-------|-------|-------|
| `--color-theme-button-bg` | `#26251e` | Button background |
| `--color-theme-button-text` | `#f7f7f4` | Button text |
| `--color-theme-button-hover-bg` | `#3b3a33` | Hover background |
| `--color-theme-button-hover-text` | `#f7f7f4` | Hover text |
| `--color-theme-button-hover-border` | `#3b3a33` | Hover border |

### Secondary Button
| Token | Value | Usage |
|-------|-------|-------|
| `--color-theme-button-sec-bg` | `transparent` | Secondary bg |
| `--color-theme-button-sec-text` | `#26251e` | Secondary text |
| `--color-theme-button-sec-border` | `color-mix(in oklab, #26251e 60%, transparent)` | Secondary border |

---

## Product/Editor Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-theme-product-editor` | `#f7f7f4` | Editor background |
| `--color-theme-product-chrome` | `#f2f1ed` | UI chrome |
| `--color-theme-product-text` | `color-mix(in oklab, #26251e 92%, transparent)` | Product text |
| `--color-theme-product-text-sec` | `color-mix(in oklab, #26251e 60%, transparent)` | Secondary product text |
| `--color-theme-product-text-tertiary` | `color-mix(in oklab, #26251e 40%, transparent)` | Tertiary product text |

---

## Semantic Colors

### Success / Green
| Token | Value | Usage |
|-------|-------|-------|
| `--color-green-500` | `lab(70.5521% -66.5147 45.8073)` | Success |
| `--color-green-600` | `lab(59.0978 -58.6621 41.2579)` | Success hover |
| `--color-green-800` | `lab(37.4616 -36.7971 22.9692)` | Success dark |
| `--color-green-900` | `lab(30.797 -29.6927 17.382)` | Success darker |
| `--color-green-50` | `lab(98.1563% -5.60117 2.75915)` | Success light |
| ANSI Green | `#1f8a65` / `rgb(31, 138, 101)` | Code additions |

### Error / Red
| Token | Value | Usage |
|-------|-------|-------|
| `--color-red-500` | `lab(55.4814% 75.0732 48.8528)` | Error |
| `--color-red-600` | `lab(48.4493 77.4328 61.5452)` | Error hover |
| ANSI Red | `#cf2d56` / `rgb(207, 45, 86)` | Code deletions |

### Code Diff Colors
| Purpose | Value | Usage |
|---------|-------|-------|
| Added line bg | `color(srgb 0.121569 0.541176 0.396078 / 0.08)` | Green 8% opacity |
| Removed line bg | `color(srgb 0.811765 0.176471 0.337255 / 0.06)` | Red 6% opacity |

---

## Gray Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--color-gray-50` | `lab(98.2596% -.247031 -.706708)` | Lightest |
| `--color-gray-200` | `lab(91.6229% -.159115 -2.26791)` | Very light |
| `--color-gray-500` | `lab(47.7841% -.393182 -10.0268)` | Mid gray |
| `--color-gray-600` | `lab(35.6337% -1.58697 -10.8425)` | Medium dark |
| `--color-gray-700` | `lab(27.1134% -.956401 -12.3224)` | Dark |
| `--color-gray-800` | `lab(16.1051% -1.18239 -11.7533)` | Very dark |
| `--color-gray-900` | `lab(8.11897% .811279 -12.254)` | Darkest |

---

## Blue Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--color-blue-50` | `lab(96.492% -1.14644 -5.11479)` | Lightest blue |
| `--color-blue-800` | `lab(30.2514% 27.7853 -70.2699)` | Dark blue |
| `--color-blue-900` | `lab(26.1542% 15.7545 -51.5504)` | Darkest blue |

---

## Special Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-white` | `#fff` | Pure white |
| `--color-black` | `#000` | Pure black |

---

## Shadow Colors

```css
--shadow-flyout: 0 0 1rem #00000005, 0 0 .5rem #00000002;
--shadow-outline-theme: 0 0 0 1px color-mix(in oklab, #26251e 10%, transparent);
```

---

## Color Application Examples

### Text Hierarchy
```css
/* Primary text */
color: #26251e;

/* Secondary text */
color: color-mix(in oklab, #26251e 60%, transparent);

/* Tertiary/muted text */
color: color-mix(in oklab, #26251e 40%, transparent);
```

### Surface Hierarchy
```css
/* Page background */
background-color: #f7f7f4;

/* Card background */
background-color: #f2f1ed;

/* Nested card */
background-color: #ebeae5;

/* Deeply nested */
background-color: #e6e5e0;
```

### Borders
```css
/* Subtle divider */
border: 1px solid color-mix(in oklab, #26251e 2.5%, transparent);

/* Standard border */
border: 1px solid color-mix(in oklab, #26251e 10%, transparent);

/* Emphasized border */
border: 1px solid color-mix(in oklab, #26251e 20%, transparent);
```
