import Head from "next/head";
import { useRouter } from "next/router";

const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://raisedash.com";
const SITE_URL = RAW_SITE_URL.endsWith("/") ? RAW_SITE_URL.slice(0, -1) : RAW_SITE_URL;
const SITE_NAME = "Raisedash";
const DEFAULT_DESCRIPTION = "Safety & Security in Days. Raisedash strengthens safety and security of corporations in freight logistics.";
const DEFAULT_OG_IMAGE = `${SITE_URL}/api/og?title=${encodeURIComponent(SITE_NAME)}`;

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  noindex?: boolean;
  nofollow?: boolean;
  // Article-specific
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  // Product-specific
  product?: {
    price?: string;
    currency?: string;
  };
  // JSON-LD structured data
  jsonLd?: Record<string, unknown>;
}

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = [],
  canonical,
  ogImage,
  ogType = "website",
  noindex = false,
  nofollow = false,
  article,
  product,
  jsonLd,
}: SEOProps) {
  const router = useRouter();
  const path = (router.asPath || "/").split("?")[0].split("#")[0];

  // Build full title
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  // Build canonical URL
  const canonicalUrl = canonical || `${SITE_URL}${path}`;

  // Build OG image URL
  const ogImageUrl = ogImage || (title
    ? `${SITE_URL}/api/og?title=${encodeURIComponent(title)}`
    : DEFAULT_OG_IMAGE);

  // Build robots directive
  const robotsContent = [
    noindex ? "noindex" : "index",
    nofollow ? "nofollow" : "follow",
  ].join(", ");

  const jsonLdType = ogType === "article" ? "Article" : ogType === "product" && product ? "Product" : "WebPage";

  // Default JSON-LD for WebPage
  const defaultJsonLd = {
    "@context": "https://schema.org",
    "@type": jsonLdType,
    name: title || SITE_NAME,
    description,
    url: canonicalUrl,
    ...(ogType === "article" && article ? {
      headline: title,
      datePublished: article.publishedTime,
      dateModified: article.modifiedTime || article.publishedTime,
      author: {
        "@type": "Person",
        name: article.author,
      },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonicalUrl,
      },
      ...(article.tags && { keywords: article.tags.join(", ") }),
    } : {}),
    ...(ogType === "product" && product ? {
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: product.currency || "USD",
      },
    } : {}),
  };

  const finalJsonLd = jsonLd || defaultJsonLd;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title || SITE_NAME} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Article-specific OG tags */}
      {ogType === "article" && article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && (
            <meta property="article:author" content={article.author} />
          )}
          {article.section && (
            <meta property="article:section" content={article.section} />
          )}
          {article.tags?.map((tag) => (
            <meta property="article:tag" content={tag} key={tag} />
          ))}
        </>
      )}

      {/* Product-specific OG tags */}
      {ogType === "product" && product && (
        <>
          {product.price && (
            <meta property="product:price:amount" content={product.price} />
          )}
          {product.currency && (
            <meta property="product:price:currency" content={product.currency} />
          )}
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title || SITE_NAME} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(finalJsonLd) }}
      />
    </Head>
  );
}

// Organization JSON-LD for global use
export function OrganizationJsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    description: DEFAULT_DESCRIPTION,
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@raisedash.com",
      contactType: "customer service",
    },
    sameAs: [
      // Add social media URLs when available
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      addressCountry: "US",
    },
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </Head>
  );
}

// WebSite JSON-LD with SearchAction for Google Sitelinks Search Box
export function WebsiteJsonLd() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </Head>
  );
}

// BreadcrumbList JSON-LD
export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </Head>
  );
}

// Software Application JSON-LD for product pages
export function SoftwareApplicationJsonLd({
  name,
  description,
  operatingSystem,
  applicationCategory = "BusinessApplication",
  offers,
}: {
  name: string;
  description: string;
  operatingSystem?: string[];
  applicationCategory?: string;
  offers?: { price: string; priceCurrency?: string }[];
}) {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    applicationCategory,
    operatingSystem: operatingSystem?.join(", "),
    offers: offers?.map((offer) => ({
      "@type": "Offer",
      price: offer.price,
      priceCurrency: offer.priceCurrency || "USD",
    })),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
    </Head>
  );
}

// FAQPage JSON-LD for pages with FAQ sections
export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQPageJsonLd({ faqs }: { faqs: FAQItem[] }) {
  if (!faqs || faqs.length === 0) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </Head>
  );
}

export default SEO;
