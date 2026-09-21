import { products } from "./products";

export const siteConfig = {
  name: "Raisedash",
  description: "We make simple and useful tools for trucking companies.",
  url: "https://www.raisedash.com",
  ogImage: "https://cdn.raisedash.com/og-image.png",
  links: {
    twitter: "https://twitter.com/raisedash",
    linkedin: "https://linkedin.com/company/raisedash",
  },
};

export const emails = {
  support: "support@raisedash.com",
  sales: "sales@raisedash.com",
  privacy: "privacy@raisedash.com",
};

export interface FooterLink {
  title: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const footerLinks: FooterSection[] = [
  {
    title: "Products",
    links: products.map(({ name, href }) => ({
      title: name,
      href,
      external: href.startsWith("https:"),
    })),
  },
  // Keep product detail pages linked in server-rendered HTML. The header's
  // dropdown links are only mounted when a visitor opens a menu.
  {
    title: "Orientation",
    links: [
      { title: "Driver onboarding", href: "/solutions/driver-onboarding" },
      { title: "Pre-arrival orientation", href: "/platform/pre-arrival-readiness" },
      { title: "Training records", href: "/platform/training-evidence" },
      { title: "Driver experience", href: "/platform/driver-experience" },
      { title: "Pricing", href: "/pricing" },
      { title: "Book a demo", href: "/demo" },
    ],
  },
  {
    title: "Training features",
    links: [
      { title: "All features", href: "/features" },
      { title: "Video generator", href: "/features/ai-training-video-generator" },
      { title: "Program builder", href: "/features/ai-training-program-builder" },
      { title: "Voice roleplay", href: "/features/ai-voice-roleplay-training" },
      { title: "Simulations", href: "/features/interactive-training-simulations" },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Blog", href: "/blog" },
      { title: "Product Updates", href: "/product-updates" },
      { title: "PTI & DVIR app", href: "/pti-app" },
      { title: "Vertex driver app", href: "/vertex-app" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About", href: "/about" },
      { title: "Careers", href: "/careers" },
      { title: "Contact", href: "/contact" },
      { title: "Security", href: "/security" },
    ],
  },
  {
    title: "Legal",
    links: [
      { title: "Privacy Policy", href: "/privacy-policy" },
      { title: "Terms of Use", href: "/terms-of-use" },
      { title: "Delete Account", href: "/request-account-deletion" },
    ],
  },
];
