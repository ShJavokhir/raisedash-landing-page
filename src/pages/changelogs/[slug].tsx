import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as runtime from "react/jsx-runtime";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { ChangelogCard } from "@/components/changelog/ChangelogCard";
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

interface ChangelogPageProps {
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
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="text-muted-foreground" {...props} />
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
    <code className="bg-muted rounded-xs px-1.5 py-0.5 font-mono text-sm" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-muted mb-4 overflow-x-auto rounded-xs p-4" {...props} />
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

export default function ChangelogPage({ update, mdxHtml, relatedUpdates }: ChangelogPageProps) {
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
            <h1 className="text-foreground mb-4 text-2xl font-normal">Update Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The update you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/changelogs">
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

  const canonicalUrl = `${SITE_URL}/changelogs/${update.slug}`;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(update.title)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: update.title,
    description: update.excerpt,
    image: ogImage,
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
          { name: "Product Updates", url: "/changelogs" },
          { name: update.title, url: `/changelogs/${update.slug}` },
        ]}
      />

      <div className="font-sans">
        {/* Breadcrumb */}
        <Container className="bg-card border-border mt-12 rounded-xs border">
          <div className="py-4">
            <nav className="text-muted-foreground flex items-center gap-2 text-sm">
              <Link href="/" className="hover:text-foreground transition-colors duration-[0.15s]">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/changelogs"
                className="hover:text-foreground transition-colors duration-[0.15s]"
              >
                Product Updates
              </Link>
              <span>/</span>
              <span className="text-foreground max-w-[200px] truncate">{update.title}</span>
            </nav>
          </div>
        </Container>

        {/* Article */}
        <Container className="bg-card border-border mt-8 rounded-xs border">
          <div className="py-12">
            <article className="mx-auto max-w-4xl">
              {/* Header */}
              <header className="mb-8">
                <div className="mb-4">
                  <span className="bg-surface-3 text-foreground inline-flex items-center rounded-xs px-2 py-0.5 text-xs font-normal">
                    {update.category}
                  </span>
                </div>

                <h1 className="text-foreground mb-6 text-4xl leading-tight font-normal tracking-[-0.03em] md:text-5xl">
                  {update.title}
                </h1>

                <p className="text-muted-foreground mb-8 text-xl leading-relaxed font-light">
                  {update.excerpt}
                </p>

                <div className="border-border border-b pb-8">
                  <div className="text-muted-foreground text-sm">
                    <span>{formatDate(update.publishedAt)}</span>
                    <span className="mx-2">·</span>
                    <span>{update.readTime}</span>
                  </div>
                </div>
              </header>

              {/* MDX Content */}
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: mdxHtml }} />
              </div>
            </article>
          </div>
        </Container>

        {/* Related Updates */}
        {relatedUpdates.length > 0 && (
          <Container className="bg-card border-border mt-8 rounded-xs border">
            <div className="py-12">
              <h2 className="text-foreground mb-8 text-2xl font-normal">Related Updates</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedUpdates.map((relatedUpdate) => (
                  <ChangelogCard key={relatedUpdate.slug} update={relatedUpdate} />
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
