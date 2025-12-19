import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as runtime from "react/jsx-runtime";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { getPostBySlug, getAllSlugs, getRelatedPosts, BlogPost } from "@/lib/blog";
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/seo/SEO";

const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://raisedash.com";
const SITE_URL = RAW_SITE_URL.endsWith("/") ? RAW_SITE_URL.slice(0, -1) : RAW_SITE_URL;
const SITE_NAME = "Raisedash";

interface BlogPostPageProps {
  post: BlogPost;
  mdxHtml: string;
  relatedPosts: BlogPost[];
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
  // Render MDX to static HTML at build-time to avoid client-side `eval`/`new Function()`,
  // which can be blocked by strict CSP (no `unsafe-eval`).
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

export default function BlogPostPage({ post, mdxHtml, relatedPosts }: BlogPostPageProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!post) {
    return (
      <div className="font-sans">
        <Container className="bg-white dark:bg-card mt-12 rounded-md border ui-corner-accents">
          <div className="py-16 text-center">
            <h1 className="text-2xl font-semibold text-foreground mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">The article you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/blog">
              <Button>Back to Blog</Button>
            </Link>
          </div>
        </Container>
        <div className="mt-8 sm:mt-12">
          <Footer />
        </div>
      </div>
    );
  }

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const ogImage = `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}`;

  // JSON-LD structured data for Article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: ogImage,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{`${post.title} | ${SITE_NAME}`}</title>
        <meta name="title" content={`${post.title} | ${SITE_NAME}`} />
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(", ")} />
        <meta name="author" content={post.author} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:modified_time" content={post.publishedAt} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category} />
        {post.tags.map((tag) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={ogImage} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {/* Breadcrumb JSON-LD */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />

      {/* FAQ JSON-LD (if post has FAQs) */}
      {post.faqs && post.faqs.length > 0 && (
        <FAQPageJsonLd faqs={post.faqs} />
      )}

      <div className="font-sans">
      {/* Breadcrumb */}
      <Container className="bg-white dark:bg-card mt-12 rounded-md border ui-corner-accents">
        <div className="py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
          </nav>
        </div>
      </Container>

      {/* Article */}
      <Container className="bg-white dark:bg-card mt-8 rounded-md border ui-corner-accents">
        <div className="py-12">
          <article className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                  {post.category}
                </span>
                {post.featured && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent text-accent-foreground">
                    Featured
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                {post.title}
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {post.author.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{post.author}</div>
                    <div className="text-sm text-muted-foreground">{post.authorRole}</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <div>{formatDate(post.publishedAt)}</div>
                  <div>{post.readTime}</div>
                </div>
              </div>
            </header>

            {/* MDX Content */}
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: mdxHtml }} />
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
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

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <Container className="bg-white dark:bg-card mt-8 rounded-md border ui-corner-accents">
          <div className="py-12">
            <h2 className="text-2xl font-semibold text-foreground mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.slug} className="group">
                  <Link href={`/blog/${relatedPost.slug}`} className="block">
                    <article className="bg-muted rounded-lg p-6 h-full hover:bg-accent transition-colors">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-primary/10 text-primary">
                          {relatedPost.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(relatedPost.publishedAt)}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{relatedPost.author}</span>
                        <span>•</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </article>
                  </Link>
                </div>
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
  const slugs = getAllSlugs();

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = getPostBySlug(slug);

  if (!post) {
    return { notFound: true };
  }

  const mdxHtml = await renderMdxToHtml(post.content);
  const relatedPosts = getRelatedPosts(slug, 3);

  return {
    props: {
      post,
      mdxHtml,
      relatedPosts,
    },
  };
};
