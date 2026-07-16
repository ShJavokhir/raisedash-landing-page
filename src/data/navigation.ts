import {
  BookOpen,
  Building2,
  Users,
  Mail,
  Sparkles,
  ClipboardCheck,
  ShieldCheck,
  CalendarClock,
  Smartphone,
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

// The four core loops of the platform. These drive the Platform dropdown in the
// header and link to the dedicated /platform/* pages.
export const platform: NavItem[] = [
  {
    title: "Pre-arrival readiness",
    description: "Prepare new drivers before they reach the terminal.",
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
    title: "First 90 days · in development",
    description: "Support new drivers through their first months with your fleet.",
    href: "/platform/first-90-days",
    icon: CalendarClock,
  },
  {
    title: "Driver experience",
    description: "A simple training experience built around the driver's phone.",
    href: "/platform/driver-experience",
    icon: Smartphone,
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
    title: "Product Updates",
    description: "Latest features and improvements.",
    href: "/product-updates",
    icon: Sparkles,
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
