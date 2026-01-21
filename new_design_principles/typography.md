# Typography - Cursor.com Design System (Light Theme)

## Font Families

### Primary Font
```css
--font-sans: "CursorGothic", "CursorGothic Fallback", system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif;
```

### System Font (Fallback)
```css
--font-system: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
```

### Monospace Font
```css
--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
```

### Berkeley Mono (Code)
```css
--font-berkeley-mono: "berkeleyMono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
```

---

## Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `--font-weight-normal` | 400 | Body text, most content |
| `--font-weight-medium` | 500 | Slightly emphasized text |
| `--font-weight-semibold` | 600 | Section headers, important labels |
| `--font-weight-bold` | 700 | Strong emphasis |

---

## Type Scale

### Display / Hero Headings

| Size Token | Value | Line Height | Letter Spacing | Usage |
|------------|-------|-------------|----------------|-------|
| `--text-2xl` | 4.5rem (72px) | 1.1 (79.2px) | -0.03em (-2.16px) | Hero headlines, CTA |
| `--text-xl` | 3.25rem (52px) | - | -0.025em | Large section titles |
| `--text-lg` | 2.25rem (36px) | 1.2 (43.2px) | -0.02em (-0.72px) | Section headlines |
| `--text-3xl` | 1.875rem (30px) | 1.2 | - | - |

### Content Headings

| Size Token | Value | Line Height | Letter Spacing | Usage |
|------------|-------|-------------|----------------|-------|
| `--text-md-lg` | 1.625rem (26px) | 1.25 (32.5px) | -0.0125em (-0.325px) | H1 on pages |
| `--text-md` | 1.375rem (22px) | 1.3 (28.6px) | -0.005em (-0.11px) | H3 feature cards |
| `--text-md-sm` | 1.125rem (18px) | - | -0.0125em | Subheadings |

### Body Text

| Size Token | Value | Line Height | Letter Spacing | Usage |
|------------|-------|-------------|----------------|-------|
| `--text-base` | 1rem (16px) | 1.5 (24px) | 0.005em (0.08px) | Primary body text |
| `--text-sm` | 0.875rem (14px) | 1.43 (21px) | 0.01em (0.14px) | Secondary text, nav |
| `--text-xs` | 0.75rem (12px) | 1.33 (16px) | - | Labels, captions |

### Product UI Text

| Size Token | Value | Line Height | Letter Spacing | Usage |
|------------|-------|-------------|----------------|-------|
| `--text-product-lg` | 0.8125rem (13px) | 1.33 | 0.0044em | Product UI large |
| `--text-product-base` | 0.75rem (12px) | 1.33 | - | Product UI base |
| `--text-product-sm` | 0.6875rem (11px) | 1.27 | - | Product UI small |

---

## Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `--leading-tight` | 1.1 | Large display text |
| `--leading-2xsnug` | 1.15 | - |
| `--leading-xsnug` | 1.2 | Headlines |
| `--leading-snug` | 1.25 | Compact text |
| `--leading-snug-plus` | 1.3 | Slightly looser headings |
| `--leading-cozy` | 1.4 | Comfortable reading |
| `--leading-normal` | 1.5 | Body text default |
| `--leading-relaxed` | 1.625 | Long-form content |

---

## Letter Spacing (Tracking)

| Token | Value | Usage |
|-------|-------|-------|
| `--tracking-2xl` | -0.03em | Large display (72px) |
| `--tracking-xl` | -0.025em | Display text |
| `--tracking-lg` | -0.02em | Section headlines |
| `--tracking-md-lg` | -0.0125em | Medium headlines |
| `--tracking-md` | -0.005em | Content headings |
| `--tracking-base` | 0.005em | Body text |
| `--tracking-sm` | 0.01em | Small text |
| `--tracking-product-sm` | 0.0044em | Product UI |

---

## Heading Styles Reference

### H1 - Page Title
```css
font-size: 26px;
font-weight: 400;
line-height: 32.5px;
letter-spacing: -0.325px;
margin-bottom: 22.4px;
color: rgb(38, 37, 30);
```

### H2 - Section Title (Large)
```css
font-size: 36px;
font-weight: 400;
line-height: 43.2px;
letter-spacing: -0.72px;
color: rgb(38, 37, 30);
```

### H2 - Section Title (Standard)
```css
font-size: 26px;
font-weight: 400;
line-height: 32.5px;
letter-spacing: -0.325px;
margin-bottom: 22.4px;
color: rgb(38, 37, 30);
```

### H2 - Hero CTA
```css
font-size: 72px;
font-weight: 400;
line-height: 79.2px;
letter-spacing: -2.16px;
margin-bottom: 22.4px;
color: rgb(38, 37, 30);
```

### H3 - Card Title
```css
font-size: 22px;
font-weight: 400;
line-height: 28.6px;
letter-spacing: -0.11px;
color: rgb(38, 37, 30);
```

### H3 - Small Card / Footer
```css
font-size: 14px;
font-weight: 400;
line-height: 21px;
letter-spacing: 0.14px;
color: oklab(0.263084 -0.00230259 0.0124794 / 0.6); /* 60% opacity dark */
```

### Paragraph / Body
```css
font-size: 16px;
font-weight: 400;
line-height: 24px;
letter-spacing: 0.08px;
color: rgb(38, 37, 30);
```

---

## Text Color Classes

| Usage | Color Value | Description |
|-------|-------------|-------------|
| Primary | `rgb(38, 37, 30)` / `#26251e` | Main text color |
| Secondary | `oklab(0.263084 -0.00230259 0.0124794 / 0.6)` | 60% opacity |
| Tertiary | `oklab(0.263084 -0.00230259 0.0124794 / 0.4)` | 40% opacity |
| Inverted | `rgb(247, 247, 244)` / `#f7f7f4` | Light text on dark |

---

## Key Observations

1. **Font weight is predominantly 400** - Cursor uses normal weight for almost everything, including headings
2. **Negative letter-spacing on headings** - Tighter tracking for larger text creates visual density
3. **Positive letter-spacing on body** - Slight positive tracking (0.005em-0.01em) improves readability
4. **Consistent line-height ratios** - 1.25-1.3 for headings, 1.5 for body
5. **Vertical rhythm** - Consistent margin-bottom of 22.4px (--spacing-v2: calc(1rem*1.4*2) = 2.8rem ≈ 44.8px / 2)
