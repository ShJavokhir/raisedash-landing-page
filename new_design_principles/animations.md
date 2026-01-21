# Animations & Transitions - Cursor.com Design System (Light Theme)

## Timing Functions

### Default Easing
```css
--default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
/* Standard ease-out, smooth deceleration */
```

### Spring Easing
```css
--ease-out-spring: cubic-bezier(0.25, 1, 0.5, 1);
/* More bouncy/elastic feel */
```

---

## Duration Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--duration` | 0.14s | Quick interactions |
| `--duration-slow` | 0.25s | Slower transitions |
| `--default-transition-duration` | 0.15s | Standard duration |

---

## Transition Patterns

### Default Transition
```css
transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
```

### Color Transitions
```css
transition:
  color 0.15s cubic-bezier(0.4, 0, 0.2, 1),
  background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1),
  border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1),
  outline-color 0.15s cubic-bezier(0.4, 0, 0.2, 1),
  text-decoration-color 0.15s cubic-bezier(0.4, 0, 0.2, 1),
  fill 0.15s cubic-bezier(0.4, 0, 0.2, 1),
  stroke 0.15s cubic-bezier(0.4, 0, 0.2, 1);
```

### Gradient Transitions
```css
transition:
  --tw-gradient-from 0.15s cubic-bezier(0.4, 0, 0.2, 1),
  --tw-gradient-via 0.15s cubic-bezier(0.4, 0, 0.2, 1),
  --tw-gradient-to 0.15s cubic-bezier(0.4, 0, 0.2, 1);
```

### Opacity Transitions
```css
/* Standard fade */
transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);

/* Slower fade */
transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);

/* Long fade (page transitions) */
transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
```

### Transform Transitions
```css
transition: transform 0.14s cubic-bezier(0.25, 1, 0.5, 1);
```

### Combined Opacity + Transform
```css
transition:
  opacity 0.14s cubic-bezier(0.25, 1, 0.5, 1),
  transform 0.14s cubic-bezier(0.25, 1, 0.5, 1);
```

### With Visibility Delay
```css
transition:
  opacity 0.14s cubic-bezier(0.25, 1, 0.5, 1),
  transform 0.14s cubic-bezier(0.25, 1, 0.5, 1),
  visibility 0s linear 0.14s;
```

---

## Keyframe Animations

### Caret Blink (Code Editor)
```css
@keyframes tabCaretBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

animation: 1s steps(1) 0s infinite normal none running tabCaretBlink;
```

### Shimmer / Loading
```css
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

animation: 0.6s linear 0s infinite normal none running shimmer;
```

---

## Hover States

### Button Hover
```css
/* Primary button */
.btn-primary:hover {
  background-color: #3b3a33;  /* Lighter than #26251e */
  border-color: #3b3a33;
}

/* Transition */
transition: background-color 0.15s ease, border-color 0.15s ease;
```

### Link Hover
```css
.link:hover {
  color: color-mix(in oklab, #26251e 80%, transparent);
}

/* Or with underline */
.link:hover {
  text-decoration: underline;
}
```

### Card Hover
```css
.card:hover {
  background-color: #ebeae5;  /* --color-theme-card-hover-hex */
  border-color: color-mix(in oklab, #26251e 10%, transparent);
}
```

---

## Focus States

### Focus Ring
```css
:focus-visible {
  outline: 2px solid color-mix(in oklab, #26251e 60%, transparent);
  outline-offset: 2px;
}

/* Or using box-shadow */
:focus-visible {
  box-shadow: 0 0 0 2px #f7f7f4, 0 0 0 4px color-mix(in oklab, #26251e 60%, transparent);
}
```

---

## Accordion Animation

### Expand/Collapse
```css
/* Arrow rotation */
.accordion-arrow {
  transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.accordion[aria-expanded="true"] .accordion-arrow {
  transform: rotate(180deg);
}

/* Content height */
.accordion-content {
  overflow: hidden;
  transition: height 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Dropdown / Menu Animation

### Menu Appear
```css
/* Initial state */
.dropdown {
  opacity: 0;
  transform: translateY(-8px);
  visibility: hidden;
  transition:
    opacity 0.14s cubic-bezier(0.25, 1, 0.5, 1),
    transform 0.14s cubic-bezier(0.25, 1, 0.5, 1),
    visibility 0s linear 0.14s;
}

/* Open state */
.dropdown.open {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
  transition:
    opacity 0.14s cubic-bezier(0.25, 1, 0.5, 1),
    transform 0.14s cubic-bezier(0.25, 1, 0.5, 1),
    visibility 0s linear 0s;
}
```

---

## Page Transitions

### Fade In
```css
.page-enter {
  opacity: 0;
}

.page-enter-active {
  opacity: 1;
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Slide Up + Fade
```css
.slide-up-enter {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Loading States

### Skeleton Shimmer
```css
.skeleton {
  background: linear-gradient(
    90deg,
    #f2f1ed 25%,
    #ebeae5 50%,
    #f2f1ed 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Spinner
```css
.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

### Pulse
```css
.pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

---

## Scroll Animations

### Fade In On Scroll (CSS only, via intersection observer)
```css
.fade-in-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-in-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## Interactive Demo Animations

### Tab Completion Caret
```css
.caret {
  animation: tabCaretBlink 1s steps(1) infinite;
}
```

### Code Typing Effect
```css
.typing {
  border-right: 2px solid #26251e;
  animation:
    typing 3s steps(40, end),
    blink 0.75s step-end infinite;
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink {
  50% { border-color: transparent; }
}
```

---

## Performance Considerations

### GPU Acceleration
```css
/* Use transform and opacity for smooth animations */
.animate {
  will-change: transform, opacity;
  transform: translateZ(0);  /* Force GPU layer */
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Summary

| Interaction Type | Duration | Easing |
|-----------------|----------|--------|
| Micro (hover, focus) | 0.14-0.15s | ease-out spring |
| Standard (dropdowns) | 0.15-0.2s | ease-out |
| Medium (accordion) | 0.2-0.25s | ease-out |
| Page transitions | 0.3-0.5s | ease-out |
| Loading animations | 0.6-1.5s | linear/ease-in-out |
