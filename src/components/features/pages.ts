import { Clapperboard, LayoutList, Mic, TabletSmartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface FeaturePage {
  slug: string;
  path: string;
  label: string;
  tagline: string;
  icon: LucideIcon;
}

export const FEATURE_PAGES: FeaturePage[] = [
  {
    slug: "ai-training-video-generator",
    path: "/features/ai-training-video-generator",
    label: "AI training video generator",
    tagline: "Describe a topic and get a finished, narrated training video.",
    icon: Clapperboard,
  },
  {
    slug: "ai-training-program-builder",
    path: "/features/ai-training-program-builder",
    label: "AI training program builder",
    tagline: "A brief becomes a full training program you review and approve.",
    icon: LayoutList,
  },
  {
    slug: "ai-voice-roleplay-training",
    path: "/features/ai-voice-roleplay-training",
    label: "AI voice roleplay",
    tagline: "Drivers practice real conversations out loud and get scored.",
    icon: Mic,
  },
  {
    slug: "interactive-training-simulations",
    path: "/features/interactive-training-simulations",
    label: "Interactive simulations",
    tagline: "Tap-through practice replicas of the apps drivers must use.",
    icon: TabletSmartphone,
  },
];

export function otherFeaturePages(currentSlug: string): FeaturePage[] {
  return FEATURE_PAGES.filter((page) => page.slug !== currentSlug);
}
