export const siteConfig = {
  name: "Raisedash",
  description:
    "The driver readiness platform for modern trucking fleets. Prepare new drivers before day one and keep a clear record of every training step.",
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
    title: "Platform",
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
    title: "Resources",
    links: [
      { title: "Blog", href: "/blog" },
      { title: "Product Updates", href: "/product-updates" },
    ],
  },
  {
    title: "More products",
    links: [
      { title: "Raisedash Academy", href: "https://academy.raisedash.com", external: true },
      { title: "TruckTalk ELP Practice", href: "/tools/elp-practice" },
      { title: "PTI & DVIR App", href: "/pti-app" },
      { title: "Vertex", href: "/vertex-app" },
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
