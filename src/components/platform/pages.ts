import { CalendarClock, FileCheck, Send, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Shared metadata for the four platform pillar pages. Used by cross-link
 * sections so every platform page can point to the other three without
 * duplicating copy, and so nav/footer wiring (owned by other agents) can
 * reference the exact same paths.
 */
export interface PlatformPage {
  slug: string;
  path: string;
  label: string;
  /** One-line description used on cross-link cards. */
  tagline: string;
  icon: LucideIcon;
}

export const PLATFORM_PAGES: PlatformPage[] = [
  {
    slug: "pre-arrival-readiness",
    path: "/platform/pre-arrival-readiness",
    label: "Pre-arrival readiness",
    tagline: "Prepare new drivers before they reach the terminal.",
    icon: Send,
  },
  {
    slug: "training-evidence",
    path: "/platform/training-evidence",
    label: "Training evidence",
    tagline: "Keep a reliable record of what was completed and when.",
    icon: FileCheck,
  },
  {
    slug: "first-90-days",
    path: "/platform/first-90-days",
    label: "First 90 days · in development",
    tagline: "Support new drivers through their first months with your fleet.",
    icon: CalendarClock,
  },
  {
    slug: "driver-experience",
    path: "/platform/driver-experience",
    label: "Driver experience",
    tagline: "A simple training experience built around the driver's phone.",
    icon: Smartphone,
  },
];

export function otherPlatformPages(currentSlug: string): PlatformPage[] {
  return PLATFORM_PAGES.filter((page) => page.slug !== currentSlug);
}
