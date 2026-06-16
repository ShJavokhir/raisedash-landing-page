export const siteConfig = {
  name: "Raisedash",
  description:
    "Continuous compliance and safety for freight trucking carriers. Vanta for Trucking.",
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
    title: "Resources",
    links: [
      { title: "Blog", href: "/blog" },
      { title: "Product Updates", href: "/product-updates" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About", href: "/about" },
      { title: "Careers", href: "/careers" },
      { title: "Contact", href: "/contact" },
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
