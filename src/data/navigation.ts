import {
  BookOpen,
  Building2,
  Users,
  Mail,
  ClipboardCheck,
  ShieldCheck,
  Smartphone,
  Clapperboard,
  LayoutList,
  Mic,
  TabletSmartphone,
  LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export interface Solution extends NavItem {
  id: string;
  image: string;
  comingSoon?: boolean;
}

// Legacy product pages remain live and indexable for SEO but are hidden from the
// site UI now that Raisedash is a single driver readiness platform.
export const solutions: Solution[] = [];

// The primary product entry point followed by the three core platform loops.
export const platform: NavItem[] = [
  {
    title: "Driver onboarding",
    description: "Send orientation, track progress, and keep training records together.",
    href: "/solutions/driver-onboarding",
    icon: Users,
  },
  {
    title: "Pre-arrival readiness",
    description: "Prepare new drivers before they arrive for orientation.",
    href: "/platform/pre-arrival-readiness",
    icon: ClipboardCheck,
  },
  {
    title: "Training evidence",
    description: "Keep a reliable record of what was completed and when.",
    href: "/platform/training-evidence",
    icon: ShieldCheck,
  },
  {
    title: "Driver experience",
    description: "A simple training experience built around the driver's phone.",
    href: "/platform/driver-experience",
    icon: Smartphone,
  },
];

export const features: NavItem[] = [
  {
    title: "AI training video generator",
    description: "Describe a topic and get a finished, narrated training video.",
    href: "/features/ai-training-video-generator",
    icon: Clapperboard,
  },
  {
    title: "AI training program builder",
    description: "A brief becomes a full training program you review and approve.",
    href: "/features/ai-training-program-builder",
    icon: LayoutList,
  },
  {
    title: "AI voice roleplay",
    description: "Drivers practice real conversations out loud and get scored.",
    href: "/features/ai-voice-roleplay-training",
    icon: Mic,
  },
  {
    title: "Interactive simulations",
    description: "Tap-through practice replicas of the apps drivers must use.",
    href: "/features/interactive-training-simulations",
    icon: TabletSmartphone,
  },
];

export const resources: NavItem[] = [
  {
    title: "Blog",
    description: "Notes on driver readiness, orientation, and fleet safety.",
    href: "/blog",
    icon: BookOpen,
  },
  {
    title: "About",
    description: "Our mission, vision, and the team behind Raisedash.",
    href: "/about",
    icon: Building2,
  },
];

export const company: NavItem[] = [
  {
    title: "About",
    description: "Our mission, vision, and the team behind Raisedash.",
    href: "/about",
    icon: Building2,
  },
  {
    title: "Careers",
    description: "Join our team and help build the readiness platform for trucking.",
    href: "/careers",
    icon: Users,
  },
  {
    title: "Contact",
    description: "Get in touch with our sales and support teams.",
    href: "/contact",
    icon: Mail,
  },
];
