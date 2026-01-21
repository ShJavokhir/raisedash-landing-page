import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as runtime from "react/jsx-runtime";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { TierBadge } from "@/components/product-updates/TierBadge";
import { ProductUpdateCard } from "@/components/product-updates/ProductUpdateCard";
import {
  getProductUpdateBySlug,
  getAllProductUpdateSlugs,
  getRelatedProductUpdates,
  ProductUpdate,
} from "@/lib/product-updates";
import { BreadcrumbJsonLd } from "@/components/seo/SEO";

const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://raisedash.com";
const SITE_URL = RAW_SITE_URL.endsWith("/") ? RAW_SITE_URL.slice(0, -1) : RAW_SITE_URL;
const SITE_NAME = "Raisedash";

interface ProductUpdatePageProps {
  update: ProductUpdate;
  mdxHtml: string;
  relatedUpdates: ProductUpdate[];
}

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold text-foreground mb-6 mt-8 first:mt-0" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-semibold text-foreground mb-4 mt-8" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-semibold text-foreground mb-3 mt-6" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-muted-foreground mb-4 leading-relaxed" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-muted-foreground" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-primary hover:underline" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4" {...props} />
  ),
};

async function renderMdxToHtml(mdx: string): Promise<string> {
  const { compile, run } = await import("@mdx-js/mdx");

  const code = String(
    await compile(mdx, {
      outputFormat: "function-body",
    }),
  );

  const mdxModule = await run(code, { ...runtime });
  const Content = mdxModule.default as React.ComponentType<{ components?: typeof mdxComponents }>;

  return renderToStaticMarkup(<Content components={mdxComponents} />);
}

export default function ProductUpdatePage({ update, mdxHtml, relatedUpdates }: ProductUpdatePageProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!update) {
    return (
      <div className="font-sans">
        <Container className="bg-white mt-12 rounded-xs border border-border">
          <div className="py-16 text-center">
            <h1 className="text-2xl font-semibold text-foreground mb-4">Update Not Found</h1>
            <p className="text-muted-foreground mb-6">The update you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/product-updates">
              <Button>Back to Product Updates</Button>
            </Link>
          </div>
        </Container>
        <div className="mt-8 sm:mt-12">
          <Footer />
        </div>
      </div>
    );
  }

  const canonicalUrl = `${SITE_URL}/product-updates/${update.slug}`;
  const ogImage = update.image || `${SITE_URL}/api/og?title=${encodeURIComponent(update.title)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: update.title,
    description: update.excerpt,
    image: ogImage,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    datePublished: update.publishedAt,
    dateModified: update.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    keywords: update.tags.join(", "),
  };

  return (
    <>
      <Head>
        <title>{`${update.title} | Product Updates | ${SITE_NAME}`}</title>
        <meta name="title" content={`${update.title} | Product Updates | ${SITE_NAME}`} />
        <meta name="description" content={update.excerpt} />
        <meta name="keywords" content={update.tags.join(", ")} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={update.title} />
        <meta property="og:description" content={update.excerpt} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="article:published_time" content={update.publishedAt} />
        <meta property="article:modified_time" content={update.publishedAt} />
        <meta property="article:section" content={update.category} />
        {update.tags.map((tag) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={update.title} />
        <meta name="twitter:description" content={update.excerpt} />
        <meta name="twitter:image" content={ogImage} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Product Updates", url: "/product-updates" },
          { name: update.title, url: `/product-updates/${update.slug}` },
        ]}
      />

      <div className="font-sans">
        {/* Breadcrumb */}
        <Container className="bg-white mt-12 rounded-xs border border-border">
          <div className="py-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <Link href="/product-updates" className="hover:text-foreground transition-colors">Product Updates</Link>
              <span>/</span>
              <span className="text-foreground truncate max-w-[200px]">{update.title}</span>
            </nav>
          </div>
        </Container>

        {/* Feature Image */}
        {update.image && (
          <Container className="mt-8">
            <div className="aspect-video relative rounded-2xl overflow-hidden">
              <Image
                src={update.image}
                alt={update.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </Container>
        )}

        {/* Article */}
        <Container className="bg-white mt-8 rounded-xs border border-border">
          <div className="py-12">
            <article className="max-w-4xl mx-auto">
              {/* Header */}
              <header className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                    {update.category}
                  </span>
                  <TierBadge tier={update.tier} />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                  {update.title}
                </h1>

                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  {update.excerpt}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">RD</span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Raisedash Team</div>
                      <div className="text-sm text-muted-foreground">Product Updates</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div>{formatDate(update.publishedAt)}</div>
                    <div>{update.readTime}</div>
                  </div>
                </div>
              </header>

              {/* MDX Content */}
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: mdxHtml }} />
              </div>

              {/* Product Link CTA */}
              {update.productLink && (
                <div className="mt-12 p-6 bg-[#19224A]/5 dark:bg-primary/10 rounded-2xl">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Try it now</h3>
                  <p className="text-muted-foreground mb-4">
                    This feature is available today. See it in action.
                  </p>
                  <Link href={update.productLink}>
                    <Button>Learn More</Button>
                  </Link>
                </div>
              )}

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {update.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </Container>

        {/* Related Updates */}
        {relatedUpdates.length > 0 && (
          <Container className="bg-white mt-8 rounded-xs border border-border">
            <div className="py-12">
              <h2 className="text-2xl font-semibold text-foreground mb-8">Related Updates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedUpdates.map((relatedUpdate) => (
                  <ProductUpdateCard key={relatedUpdate.slug} update={relatedUpdate} />
                ))}
              </div>
            </div>
          </Container>
        )}

        <div className="mt-8 sm:mt-12">
          <Footer />
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllProductUpdateSlugs();

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const update = getProductUpdateBySlug(slug);

  if (!update) {
    return { notFound: true };
  }

  const mdxHtml = await renderMdxToHtml(update.content);
  const relatedUpdates = getRelatedProductUpdates(slug, 3);

  return {
    props: {
      update,
      mdxHtml,
      relatedUpdates,
    },
  };
};
