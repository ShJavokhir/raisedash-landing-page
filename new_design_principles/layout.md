# Layout - Cursor.com Design System (Light Theme)

## Page Structure

### Overall Layout
```
┌────────────────────────────────────────────────────┐
│                    Header (52px)                    │
├────────────────────────────────────────────────────┤
│                                                     │
│                    Main Content                     │
│                   (max 1300px)                      │
│                                                     │
├────────────────────────────────────────────────────┤
│                      Footer                         │
└────────────────────────────────────────────────────┘
```

### Container Constraints
```css
--max-width-container: 1300px;

/* Section containers */
width: 1200px;
max-width: 100%;
margin: 0 auto;
padding-left: 20px;
padding-right: 20px;
```

---

## Header Layout

### Fixed Header
```css
position: sticky;
top: 0;
z-index: 50;
height: 52px;  /* --site-header-height */
background-color: #f7f7f4;
```

### Header Grid
```css
display: flex;
justify-content: space-between;
align-items: center;
max-width: 1300px;
margin: 0 auto;
padding: 0 20px;
```

### Header Structure
```
┌─────────────────────────────────────────────────────┐
│ [Logo]        [Nav Links]              [Actions]    │
│ Cursor        Features Enterprise      Sign in      │
│               Pricing Resources        [Download]   │
└─────────────────────────────────────────────────────┘
```

---

## Section Layouts

### Hero Section
```css
padding: 112px 20px 67.2px;  /* 5v 20px 3v */
text-align: left;
max-width: 1200px;
margin: 0 auto;
```

### Hero Content Structure
```
┌─────────────────────────────────────────────────────┐
│  Built to make you extraordinarily productive,      │
│  Cursor is the best way to code with AI.           │
│                                                     │
│  [Download Button]                                  │
├─────────────────────────────────────────────────────┤
│                                                     │
│            [Interactive Demo Area]                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Standard Section
```css
padding: 67.2px 20px;  /* 3v 20px */
max-width: 1200px;
margin: 0 auto;
```

### Section with Top Border
```css
padding: 67.2px 20px;
margin-top: 67.2px;
border-top: 1px solid color-mix(in oklab, #26251e 2.5%, transparent);
```

---

## Grid Systems

### Two-Column Feature Grid
```css
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 20px;
```

### Three-Column Grid (Pricing)
```css
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 16px;
```

### Four-Column Grid (Footer)
```css
display: grid;
grid-template-columns: repeat(5, 1fr);
gap: 40px;
```

### Responsive Grid
```css
/* Mobile: Single column */
grid-template-columns: 1fr;

/* Tablet: 2 columns */
@media (min-width: 768px) {
  grid-template-columns: repeat(2, 1fr);
}

/* Desktop: 3-4 columns */
@media (min-width: 1024px) {
  grid-template-columns: repeat(4, 1fr);
}
```

---

## Flexbox Layouts

### Horizontal Navigation
```css
display: flex;
align-items: center;
gap: 24px;
```

### Card Content (Vertical)
```css
display: flex;
flex-direction: column;
gap: 16px;
```

### Button with Icon
```css
display: flex;
align-items: center;
gap: 8px;
```

### Centered Content
```css
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
```

---

## Content Width Patterns

### Full Width Section
```css
width: 100%;
padding: 67.2px 20px;
```

### Contained Content
```css
max-width: 1200px;
margin: 0 auto;
```

### Narrow Content (Prose)
```css
max-width: 48ch;  /* --spacing-prose-narrow */
```

### Medium Content
```css
max-width: 80ch;  /* --spacing-prose-medium-wide */
```

### Wide Content
```css
max-width: 96ch;  /* --spacing-prose-wide */
```

---

## Card Layouts

### Pricing Cards Grid
```
┌────────────┬────────────┬────────────┬────────────┐
│   Hobby    │    Pro     │   Pro+     │   Ultra    │
│   Free     │  $20/mo    │  $60/mo    │  $200/mo   │
│            │            │ Recommended │            │
│  Features  │  Features  │  Features  │  Features  │
│            │            │            │            │
│ [Download] │ [Get Pro]  │ [Get Pro+] │ [Get Ultra]│
└────────────┴────────────┴────────────┴────────────┘
```

### Feature Cards (Bento Grid)
```
┌───────────────────────────┬───────────────────────────┐
│                           │                           │
│   Agent Feature Card      │   Tab Feature Card        │
│   (with demo area)        │   (with demo area)        │
│                           │                           │
├───────────────────────────┴───────────────────────────┤
│                                                       │
│              Ecosystem Feature Card                   │
│              (full width, with demos)                 │
│                                                       │
└───────────────────────────────────────────────────────┘
```

---

## Testimonials Layout

### Horizontal Scroll
```css
display: flex;
overflow-x: auto;
scroll-snap-type: x mandatory;
gap: 24px;
padding: 20px 0;
```

### Testimonial Card Width
```css
min-width: 350px;
max-width: 450px;
flex-shrink: 0;
scroll-snap-align: start;
```

---

## Footer Layout

### Footer Structure
```
┌─────────────────────────────────────────────────────┐
│  Product   Resources   Company    Legal    Connect  │
│  Features  Download    Careers    Terms    X        │
│  Enter...  Changelog   Blog       Privacy  LinkedIn │
│  Web Ag... Docs        Community  Data Use YouTube  │
│  Bugbot    Learn       Workshops  Security          │
│  CLI       Forum       Students                     │
│  Pricing   Status      Brand                        │
├─────────────────────────────────────────────────────┤
│  © 2026 Cursor   🛡 SOC 2 Certified    [🖥][☉][☾]  │
│                                        🌐 English   │
└─────────────────────────────────────────────────────┘
```

### Footer Grid CSS
```css
.footer-nav {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 40px;
  padding-bottom: 40px;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid color-mix(in oklab, #26251e 2.5%, transparent);
}
```

---

## Sticky Elements

### Sticky Header
```css
position: sticky;
top: 0;
z-index: 100;
--site-sticky-top: 64px;  /* Content offset */
```

### Sticky Sidebar (if applicable)
```css
position: sticky;
top: 64px;  /* Below header */
height: fit-content;
```

---

## Z-Index Scale

| Layer | Z-Index | Usage |
|-------|---------|-------|
| Base | 0 | Default content |
| Elevated | 10 | Cards, dropdowns |
| Sticky | 50 | Sticky elements |
| Header | 100 | Navigation header |
| Modal | 200 | Overlays, modals |
| Toast | 300 | Notifications |

---

## Responsive Breakpoints

### Common Breakpoints
```css
/* Mobile first approach */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### Container Responsive Behavior
```css
.container {
  width: 100%;
  padding: 0 20px;
}

@media (min-width: 1024px) {
  .container {
    width: 1200px;
    margin: 0 auto;
  }
}
```

---

## Aspect Ratios

```css
--aspect-video: 16 / 9;
```

### Demo Area Aspect
```css
aspect-ratio: 16 / 9;
overflow: hidden;
border-radius: 8px;
```

---

## Overflow Handling

### Horizontal Scroll Container
```css
overflow-x: auto;
-webkit-overflow-scrolling: touch;
scrollbar-width: none;  /* Hide scrollbar */

&::-webkit-scrollbar {
  display: none;
}
```

### Text Truncation
```css
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
```

### Multi-line Truncation
```css
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
overflow: hidden;
```
