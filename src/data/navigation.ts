import { BookOpen, Building2, Users, Mail, Sparkles, LucideIcon } from "lucide-react";

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

// Products are intentionally hidden from the site UI while we refocus on a single
// compliance & safety product. The product pages remain live and indexable for SEO.
export const solutions: Solution[] = [];

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
