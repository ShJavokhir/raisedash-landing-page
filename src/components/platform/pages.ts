import { FileCheck, Send, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Shared metadata for the live platform pillar pages. Used by cross-link
 * sections so every platform page can point to the others without
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
    label: "Orientation before arrival",
    tagline:
      "Send orientation before drivers arrive. See who hasn't started, who's in progress, and who's done.",
    icon: Send,
  },
  {
    slug: "training-evidence",
    path: "/platform/training-evidence",
    label: "Driver training records",
    tagline:
      "Each driver's assignments, completions, quiz results, certificates, and a downloadable PDF report.",
    icon: FileCheck,
  },
  {
    slug: "driver-experience",
    path: "/platform/driver-experience",
    label: "What drivers see",
    tagline:
      "A text or email invite, a one-time code, and lessons in the phone browser. No app, no password.",
    icon: Smartphone,
  },
];

export function otherPlatformPages(currentSlug: string): PlatformPage[] {
  return PLATFORM_PAGES.filter((page) => page.slug !== currentSlug);
}
