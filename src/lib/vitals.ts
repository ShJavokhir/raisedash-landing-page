import type { Metric } from "web-vitals";

export function reportWebVitals(metric: Metric) {
  if (process.env.NODE_ENV === "development") {
    console.log(metric);
  }
}
