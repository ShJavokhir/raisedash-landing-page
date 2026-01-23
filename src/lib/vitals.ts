import type { Metric } from "web-vitals";

/**
 * Web Vitals reporting for Core Web Vitals monitoring
 *
 * This function is called by Next.js for each Web Vital metric.
 * In production, you should send these to your analytics service
 * to monitor real-user performance (RUM data).
 *
 * Core Web Vitals measured:
 * - LCP (Largest Contentful Paint): Target < 2.5s
 * - INP (Interaction to Next Paint): Target < 200ms
 * - CLS (Cumulative Layout Shift): Target < 0.1
 *
 * Additional metrics:
 * - FCP (First Contentful Paint)
 * - TTFB (Time to First Byte)
 */
export function reportWebVitals(metric: Metric) {
  // Development: Log to console for debugging
  if (process.env.NODE_ENV === "development") {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating, // "good" | "needs-improvement" | "poor"
      id: metric.id,
    });
    return;
  }

  // Production: Send to analytics
  // Option 1: Google Analytics 4
  if (typeof window !== "undefined" && "gtag" in window) {
    const gtag = (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag;
    gtag("event", metric.name, {
      // Use metric.id for deduplication
      event_category: "Web Vitals",
      // Google Analytics metrics must be integers
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      // Rating: good, needs-improvement, or poor
      event_label: metric.rating,
      // Mark as non-interaction to not affect bounce rate
      non_interaction: true,
    });
  }

  // Option 2: Send to your own analytics endpoint
  // Uncomment and configure as needed:
  /*
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    id: metric.id,
    page: window.location.pathname,
    // Add any other relevant data
  });

  // Use `navigator.sendBeacon()` if available for reliable delivery
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics/vitals", body);
  } else {
    fetch("/api/analytics/vitals", {
      body,
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
    });
  }
  */
}
