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
  partnerships: "partnerships@raisedash.com",
};

/** Our cal.com booking page, the same one the PTI pages and the /demo done screen link to. */
export const bookingUrl = "https://cal.com/javokhir/raisedash-demo-meeting";

/**
 * The "Raisedash: PTI & DVIR" iOS app. It was republished under this new id in
 * April 2026; the old id6466733418 listing is gone. There is no Android listing
 * today (uz.jdsystems.checklist.checklist was removed from Google Play).
 */
export const ptiAppStoreUrl = "https://apps.apple.com/us/app/raisedash-pti-dvir/id6763577192";

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
  {
    title: "Resources",
    links: [
      { title: "Blog", href: "/blog" },
      { title: "Product Updates", href: "/product-updates" },
      { title: "PTI & DVIR app", href: "/pti-app" },
      { title: "Vertex driver app", href: "/vertex-app" },
      // The Driver Orientation Platform's price list (the only tool with public pricing).
      { title: "Orientation pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About", href: "/about" },
      { title: "Careers", href: "/careers" },
      { title: "Contact", href: "/contact" },
      { title: "Get a demo", href: "/get-a-demo" },
      { title: "Security", href: "/security" },
    ],
  },
  {
    title: "Legal",
    links: [
      { title: "Privacy Policy", href: "/privacy-policy" },
      { title: "Shield Privacy", href: "/products/shield/privacy" },
      { title: "Terms of Use", href: "/terms-of-use" },
      { title: "Delete Account", href: "/request-account-deletion" },
    ],
  },
];
