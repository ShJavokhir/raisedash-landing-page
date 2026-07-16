export const siteConfig = {
  name: "Raisedash",
  description:
    "A driver readiness platform for U.S. trucking fleets. Prepare new drivers before arrival, support their first 90 days, and keep a clear training record.",
  url: "https://raisedash.com",
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
      { title: "Pre-arrival orientation", href: "/platform/pre-arrival-readiness" },
      { title: "Training records", href: "/platform/training-evidence" },
      { title: "First 90 days · planned", href: "/platform/first-90-days" },
      { title: "Driver experience", href: "/platform/driver-experience" },
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
