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
    <h1 className="text-foreground mt-8 mb-6 text-3xl font-bold first:mt-0" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-foreground mt-8 mb-4 text-2xl font-semibold" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-foreground mt-6 mb-3 text-xl font-semibold" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-muted-foreground mb-4 leading-relaxed" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 list-disc space-y-2 pl-6" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-4 list-decimal space-y-2 pl-6" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-muted-foreground" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="text-foreground font-semibold" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-primary hover:underline" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-primary text-muted-foreground my-4 border-l-4 pl-4 italic"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-muted mb-4 overflow-x-auto rounded-lg p-4" {...props} />
  ),
};

async function renderMdxToHtml(mdx: string): Promise<string> {
  const { compile, run } = await import("@mdx-js/mdx");

  const code = String(
    await compile(mdx, {
      outputFormat: "function-body",
    })
  );

  const mdxModule = await run(code, { ...runtime });
  const Content = mdxModule.default as React.ComponentType<{ components?: typeof mdxComponents }>;

  return renderToStaticMarkup(<Content components={mdxComponents} />);
}

export default function ProductUpdatePage({
  update,
  mdxHtml,
  relatedUpdates,
}: ProductUpdatePageProps) {
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
        <Container className="bg-card border-border mt-12 rounded-xs border">
          <div className="py-16 text-center">
            <h1 className="text-foreground mb-4 text-2xl font-semibold">Update Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The update you&apos;re looking for doesn&apos;t exist.
            </p>
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
        <Container className="bg-card border-border mt-12 rounded-xs border">
          <div className="py-4">
            <nav className="text-muted-foreground flex items-center gap-2 text-sm">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/product-updates" className="hover:text-foreground transition-colors">
                Product Updates
              </Link>
              <span>/</span>
              <span className="text-foreground max-w-[200px] truncate">{update.title}</span>
            </nav>
          </div>
        </Container>

        {/* Feature Image */}
        {update.image && (
          <Container className="mt-8">
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <Image
                src={update.image}
                alt={`${update.title} - Raisedash compliance platform feature screenshot`}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </div>
          </Container>
        )}

        {/* Article */}
        <Container className="bg-card border-border mt-8 rounded-xs border">
          <div className="py-12">
            <article className="mx-auto max-w-4xl">
              {/* Header */}
              <header className="mb-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 text-sm font-medium">
                    {update.category}
                  </span>
                  <TierBadge tier={update.tier} />
                </div>

                <h1 className="text-foreground mb-6 text-4xl leading-tight font-bold md:text-5xl">
                  {update.title}
                </h1>

                <p className="text-muted-foreground mb-8 text-xl leading-relaxed">
                  {update.excerpt}
                </p>

                <div className="border-border flex flex-col justify-between gap-4 border-b pb-8 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                      <span className="text-primary text-sm font-medium">RD</span>
                    </div>
                    <div>
                      <div className="text-foreground font-semibold">Raisedash Team</div>
                      <div className="text-muted-foreground text-sm">Product Updates</div>
                    </div>
                  </div>
                  <div className="text-muted-foreground text-sm">
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
                <div className="dark:bg-primary/10 mt-12 rounded-2xl bg-[#19224A]/5 p-6">
                  <h3 className="text-foreground mb-2 text-lg font-semibold">Try it now</h3>
                  <p className="text-muted-foreground mb-4">
                    This feature is available today. See it in action.
                  </p>
                  <Link href={update.productLink}>
                    <Button>Learn More</Button>
                  </Link>
                </div>
              )}

              {/* Tags */}
              <div className="border-border mt-12 border-t pt-8">
                <h3 className="text-foreground mb-4 text-lg font-semibold">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {update.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-muted text-muted-foreground inline-flex items-center rounded-full px-3 py-1 text-sm"
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
          <Container className="bg-card border-border mt-8 rounded-xs border">
            <div className="py-12">
              <h2 className="text-foreground mb-8 text-2xl font-semibold">Related Updates</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
