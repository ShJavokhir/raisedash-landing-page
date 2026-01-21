# Raisedash Landing Page - Improvement Roadmap

## Security

- [ ] Implement middleware with security headers (CSP, X-Frame-Options, X-Content-Type-Options)
- [ ] Add DOMPurify for MDX content sanitization in `src/pages/blog/[slug].tsx`
- [ ] Add CSRF tokens to all form submissions
- [ ] Implement input sanitization before external service calls
- [ ] Add honeypot fields on public forms

## Accessibility

### Critical
- [ ] Add `role="dialog"`, `aria-modal="true"`, `aria-labelledby` to modal in `JobApplicationForm.tsx:141`
- [ ] Implement focus trap in modals (trap Tab key)
- [ ] Add skip-to-main-content link at beginning of page
- [ ] Wrap page content in `<main id="main-content">` landmark
- [ ] Add `aria-describedby` to form fields linking to error messages

### High Priority
- [ ] Add `aria-live="polite"` to form status messages
- [ ] Add `aria-label` to all icon-only buttons
- [ ] Add `aria-hidden="true"` to decorative icons
- [ ] Implement keyboard handlers (Escape to close modals)
- [ ] Test and document color contrast ratios (WCAG AA minimum)

### Enhancement
- [ ] Add aria-label to navigation sections
- [ ] Implement keyboard shortcuts for form steps
- [ ] Create accessibility documentation/statement

## Code Quality

### Type Safety
- [ ] Fix type definitions to eliminate `as any` casts in `Header.tsx:133, 276`
- [ ] Upgrade ESLint `no-explicit-any` from "warn" to "error"
- [ ] Fix `demo/types.tsx` -> `demo/types.ts` (not TSX)

### DRY Violations
- [ ] Extract email validation regex to shared utility function in `src/lib/validation.ts`
- [ ] Move hardcoded navigation data to a data file
- [ ] Create shared form validation hooks

### Cleanup
- [ ] Remove commented-out code (Footer.tsx, JobApplicationForm.tsx)
- [ ] Fix ThemeToggle hydration issue (use null initial state)
- [ ] Delete inline CSS styling in `raisedash-shift.tsx:40-62`

### Architecture
- [ ] Create custom hooks for form handling (validation, submission, error states)
- [ ] Consider React Context for theme instead of DOM manipulation
- [ ] Split large components (JobApplicationForm.tsx - 360 lines)
- [ ] Add error boundary wrapper component

## Performance

### Images
- [ ] Add explicit `sizes` attribute to responsive Images
- [ ] Set explicit `quality` prop on Next.js Images
- [ ] Optimize `globe.svg` (currently 564KB)

### Monitoring
- [ ] Add `web-vitals` library for LCP/CLS/INP tracking
- [ ] Set up Lighthouse CI for performance budgets

### Caching
- [ ] Add explicit `revalidate` settings for ISR on blog pages
- [ ] Add cache headers for static assets

## Testing & Quality Tools

### Testing Framework
- [ ] Set up Vitest for unit testing
- [ ] Add Playwright for E2E tests
- [ ] Create test utilities and helpers
- [ ] Add tests for utility functions (`blog.ts`, `telegram.ts`, `jwt.ts`)

### Code Quality Tools
- [ ] Configure Prettier for consistent formatting
- [ ] Set up Husky + lint-staged for pre-commit hooks
- [ ] Create GitHub Actions workflow for CI/CD (lint, build, test)
- [ ] Add `test` script to package.json

## SEO Enhancements

- [ ] Add Twitter handle to twitter meta tags (`twitter:site`)
- [ ] Populate OrganizationJsonLd `sameAs` array with social media profiles
- [ ] Add JobPosting schema for careers page positions
- [ ] Add descriptive alt text for lightbox preview images (currently just "Preview")
- [ ] Review and ensure all pages provide explicit title/description

## UI/UX Improvements

- [ ] Add loading skeletons for forms and content areas
- [ ] Implement form auto-save during multi-step demo completion
- [ ] Add React error boundary for graceful failure
- [ ] Test keyboard navigation on custom dropdowns
