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
    tagline: "New hires finish orientation on their phone before day one.",
    icon: Send,
  },
  {
    slug: "training-evidence",
    path: "/platform/training-evidence",
    label: "Training evidence",
    tagline: "Every signature, score, and version preserved — a full packet in one click.",
    icon: FileCheck,
  },
  {
    slug: "first-90-days",
    path: "/platform/first-90-days",
    label: "First 90 days",
    tagline: "The riskiest stretch of a driver's career, actively managed.",
    icon: CalendarClock,
  },
  {
    slug: "driver-experience",
    path: "/platform/driver-experience",
    label: "Driver experience",
    tagline: "A text message and a phone. No passwords, no app, no email.",
    icon: Smartphone,
  },
];

export function otherPlatformPages(currentSlug: string): PlatformPage[] {
  return PLATFORM_PAGES.filter((page) => page.slug !== currentSlug);
}
