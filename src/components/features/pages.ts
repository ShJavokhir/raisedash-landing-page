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
    tagline: "Describe a topic and get a narrated training video with script and visuals.",
    icon: Clapperboard,
  },
  {
    slug: "ai-training-program-builder",
    path: "/features/ai-training-program-builder",
    label: "AI training program builder",
    tagline: "Write a brief and get a full program with modules, lessons, and quizzes to review.",
    icon: LayoutList,
  },
  {
    slug: "ai-voice-roleplay-training",
    path: "/features/ai-voice-roleplay-training",
    label: "AI voice roleplay",
    tagline: "Drivers talk out loud with an AI inspector, dispatcher, or shipper and get scored.",
    icon: Mic,
  },
  {
    slug: "interactive-training-simulations",
    path: "/features/interactive-training-simulations",
    label: "Interactive simulations",
    tagline:
      "Drivers tap through a practice copy of software like an ELD in their phone’s browser.",
    icon: TabletSmartphone,
  },
];

export function otherFeaturePages(currentSlug: string): FeaturePage[] {
  return FEATURE_PAGES.filter((page) => page.slug !== currentSlug);
}
