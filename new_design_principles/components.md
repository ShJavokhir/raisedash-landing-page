# Components - Cursor.com Design System (Light Theme)

## Buttons

### Primary Button (Download CTA)
```css
background-color: rgb(38, 37, 30);  /* #26251e */
color: rgb(247, 247, 244);  /* #f7f7f4 */
padding: 5.6px 10.5px 5.88px;
border-radius: 1.67772e+07px;  /* Full pill */
border: 1px solid rgb(38, 37, 30);
font-size: 14px;
font-weight: 400;
text-decoration: none;
box-shadow: none;
transition: all;
display: flex;
flex-direction: row;
cursor: pointer;
```

#### Primary Button Hover
```css
background-color: #3b3a33;
border-color: #3b3a33;
color: #f7f7f4;
```

### Secondary Button / Link
```css
background-color: transparent;
color: rgb(38, 37, 30);
padding: 5.6px 10.5px 5.88px;
font-size: 14px;
font-weight: 400;
text-decoration: none;
```

### Button with Icon (Arrow)
```html
<a href="/download">
  Download for macOS
  <span>⤓</span>  <!-- Arrow down icon -->
</a>
```

### Button Size Tokens
```css
--button-padding-xs: 0.15em 0.5em;
--button-padding-sm: 0.4em 0.75em 0.42em;
--button-padding-md-sm: 0.6em 1.25em 0.62em;
--button-padding-default: 0.78em 1.35em 0.8em;
```

---

## Cards

### Pricing Card
```css
background-color: rgb(242, 241, 237);  /* #f2f1ed */
border: 0px solid rgb(38, 37, 30);
border-radius: 4px;
padding: 13.4px 15px 15px;
box-shadow: none;
display: grid;
transition: all;
```

#### Pricing Card Structure
```
┌─────────────────────────────────┐
│ Plan Name (H3)                  │
│ Price ($X / mo.)                │
│ Description                     │
│                                 │
│ ✓ Feature 1                     │
│ ✓ Feature 2                     │
│ ✓ Feature 3                     │
│                                 │
│ [CTA Button]                    │
└─────────────────────────────────┘
```

### Feature Card (Link Card)
```css
/* Wrapping link/anchor */
display: block;
text-decoration: none;
color: inherit;
transition: all;
```

#### Feature Card Content
```
┌─────────────────────────────────┐
│ Title (H3, 22px)                │
│ Description text                │
│ "Learn more →"                  │
│                                 │
│ [Visual/Demo Area]              │
└─────────────────────────────────┘
```

### Testimonial Card
```css
/* Figure element */
padding: 0px;
margin: 0px;
background-color: transparent;
border-radius: 0px;
border: none;
box-shadow: none;
```

#### Testimonial Structure
```html
<figure>
  <blockquote>
    <p>Quote text...</p>
  </blockquote>
  <div>
    <span>Name</span>
    <span>Title, Company</span>
  </div>
</figure>
```

---

## Navigation

### Header Navigation
```css
/* Header container */
height: 52px;  /* --site-header-height */
position: sticky;
top: 0;
```

### Navigation Links
```css
color: rgb(38, 37, 30);
font-size: 14px;
font-weight: 400;
line-height: 21px;
letter-spacing: 0.14px;
text-decoration: none;
padding: 5.6px 10.5px 5.88px;
transition: all;
```

### Navigation Structure
```
┌──────────────────────────────────────────────────┐
│ [Logo] Cursor    Features  Enterprise  Pricing   │
│                  Resources              Sign in  │
│                                        [Download]│
└──────────────────────────────────────────────────┘
```

---

## Form Elements

### Radio Button Group (Toggle)
```css
/* Wrapper */
border-radius: 1.67772e+07px;  /* Pill shape */
padding: 0;
display: flex;
```

### Radio Button Option
```css
padding: 9.6px 20px 9.92px;
border-radius: 1.67772e+07px;
color: rgb(38, 37, 30);
cursor: pointer;
background-color: transparent;
```

### Radio Button Active State
```css
background-color: rgb(38, 37, 30);
color: rgb(247, 247, 244);
```

### Input Field (Text)
```css
/* Textbox placeholder reference */
placeholder: "Plan, search, build anything...";
font-size: 14px;
padding: 10px 15px;
border-radius: 4px;
border: 1px solid color-mix(in oklab, #26251e 10%, transparent);
background-color: #f7f7f4;
```

---

## Lists

### Feature List (Checkmarks)
```css
/* List item */
font-size: 16px;
line-height: 24px;
color: rgb(38, 37, 30);
padding: 0px;
margin: 0px 0px 3.73px;
display: flex;
align-items: flex-start;
gap: 8px;
```

### Checkmark Icon
```css
/* Checkmark span */
content: "✓";
color: inherit;
flex-shrink: 0;
```

---

## Accordion (FAQ)

### Accordion Button
```css
font-size: 16px;
font-weight: 400;
padding: 15.68px 0px 16.8px;
text-align: left;
color: rgb(38, 37, 30);
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
border: none;
background: transparent;
cursor: pointer;
```

### Accordion Arrow Icon
```css
/* Arrow indicator */
content: "↓";
transition: transform 0.15s;
```

### Accordion Expanded State
```css
/* Arrow rotation */
transform: rotate(180deg);
```

---

## Footer

### Footer Container
```css
padding: 67.2px 20px 30px;
background-color: #f7f7f4;
```

### Footer Navigation Grid
```
┌─────────────────────────────────────────────────┐
│ Product    Resources   Company   Legal   Connect│
│ Features   Download    Careers   Terms   X      │
│ Enterprise Changelog   Blog      Privacy LinkedIn│
│ Web Agents Docs        Community Data Use YouTube│
│ ...        ...         ...       ...            │
└─────────────────────────────────────────────────┘
│ © 2026 Cursor  🛡 SOC 2 Certified  [Theme] [Lang]│
└─────────────────────────────────────────────────┘
```

### Footer Section Headers
```css
font-size: 14px;
font-weight: 400;
line-height: 21px;
letter-spacing: 0.14px;
color: oklab(0.263084 -0.00230259 0.0124794 / 0.6);  /* 60% opacity */
```

### Footer Links
```css
font-size: 14px;
color: rgb(38, 37, 30);
text-decoration: none;
```

### External Link Icon
```css
/* ↗ character for external links */
content: " ↗";
```

---

## Tags / Badges

### Version Badge
```css
/* e.g., "CLI", "2.3" */
display: inline-block;
font-size: 12px;
padding: 2px 8px;
background-color: #ebeae5;
border-radius: 4px;
color: rgb(38, 37, 30);
```

### Recommended Badge
```css
/* "Recommended" label on pricing */
font-size: 14px;
color: rgb(38, 37, 30);
```

---

## Code Display

### Code Block Container
```css
font-family: "berkeleyMono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
font-size: 13px;  /* --text-product-lg */
line-height: 1.25;
background-color: color-mix(in oklab, #26251e 2.5%, transparent);
border-radius: 4px;
padding: 16px;
overflow-x: auto;
```

### Code Diff Colors
```css
/* Added line */
background-color: color(srgb 0.121569 0.541176 0.396078 / 0.08);
color: #1f8a65;  /* ANSI green */

/* Removed line */
background-color: color(srgb 0.811765 0.176471 0.337255 / 0.06);
color: #cf2d56;  /* ANSI red */
```

### Inline Code
```css
--prose-code: #26251e;
--prose-code-bg: #f2f1ed;
--prose-code-border: color-mix(in oklab, #26251e 2.5%, transparent);
--prose-code-border-radius: 4px;
font-family: var(--font-mono);
padding: 2px 6px;
```

---

## Interactive Elements

### Tab List
```css
display: flex;
border-bottom: 1px solid color-mix(in oklab, #26251e 10%, transparent);
```

### Tab Button
```css
padding: 8px 16px;
font-size: 14px;
color: color-mix(in oklab, #26251e 60%, transparent);
border: none;
background: transparent;
cursor: pointer;
```

### Tab Button Active
```css
color: rgb(38, 37, 30);
border-bottom: 2px solid rgb(38, 37, 30);
```

---

## Menu / Dropdown

### Menu Container
```css
background-color: #f2f1ed;
border: 1px solid color-mix(in oklab, #26251e 10%, transparent);
border-radius: 8px;
box-shadow: 0 0 1rem #00000005, 0 0 0.5rem #00000002;
padding: 8px 0;
```

### Menu Item
```css
padding: 8px 16px;
font-size: 14px;
color: rgb(38, 37, 30);
cursor: pointer;
```

### Menu Item Hover
```css
background-color: color-mix(in oklab, #26251e 5%, transparent);
```

### Menu Item Selected
```css
/* Checkmark indicator */
display: flex;
justify-content: space-between;
```
