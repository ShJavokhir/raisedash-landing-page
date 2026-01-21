import { MapPin, ClipboardCheck, GraduationCap, BookOpen, FileText, Building2, Users, Mail, Sparkles, LucideIcon } from "lucide-react";

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

export const solutions: Solution[] = [
  {
    id: "onboarding",
    title: "Shift (Driver Onboarding)",
    description: "Streamlined driver training and compliance platform.",
    href: "/products/raisedash-shift",
    image: "https://cdn.raisedash.com/media/vertex/57c53ef5-ad1a-4508-89a5-329985846a89.webp",
    icon: GraduationCap,
  },
  {
    id: "pti",
    title: "PTI (PTI Inspections)",
    description: "Digital driver vehicle inspection reports and pre-trip tools.",
    href: "/products/raisedash-pti-inspections",
    image: "https://cdn.raisedash.com/media/vertex/5bbcc5ad-2b1c-4ddb-9fe6-e8e2bc2c8a1a.webp",
    icon: ClipboardCheck,
  },
  {
    id: "vertex",
    title: "Vertex (Freight Tracking)",
    description: "Real-time freight tracking with automated arrival alerts.",
    href: "/products/raisedash-vertex",
    image: "https://cdn.raisedash.com/media/vertex/834f7f4b-6def-4090-bc16-6de5c21ff18d.webp",
    icon: MapPin,
  }
];

export const resources: NavItem[] = [
  {
    title: "Blog",
    description: "Insights on logistics, safety, and industry trends.",
    href: "/blog",
    icon: BookOpen,
  },
  {
    title: "Product Updates",
    description: "Latest features and improvements.",
    href: "/product-updates",
    icon: Sparkles,
  },
  {
    title: "Changelogs",
    description: "Latest updates and product improvements.",
    href: "/changelogs",
    icon: FileText,
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
    description: "Join our team and help shape the future of logistics.",
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
