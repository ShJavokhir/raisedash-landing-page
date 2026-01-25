import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as runtime from "react/jsx-runtime";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { getPostBySlug, getAllSlugs, getRelatedPosts, BlogPost } from "@/lib/blog";
import { extractTableOfContents, TocItem } from "@/lib/toc";
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/seo/SEO";

const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://raisedash.com";
const SITE_URL = RAW_SITE_URL.endsWith("/") ? RAW_SITE_URL.slice(0, -1) : RAW_SITE_URL;
const SITE_NAME = "Raisedash";

interface BlogPostPageProps {
  post: BlogPost;
  mdxHtml: string;
  relatedPosts: BlogPost[];
  toc: TocItem[];
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
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="mb-6 overflow-x-auto">
      <table className="border-border w-full border-collapse border text-sm" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-muted" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />,
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="border-border border-b" {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="text-foreground border-border border px-4 py-3 text-left font-semibold"
      {...props}
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="text-muted-foreground border-border border px-4 py-3" {...props} />
  ),
};

async function renderMdxToHtml(mdx: string): Promise<string> {
  // Render MDX to static HTML at build-time to avoid client-side `eval`/`new Function()`,
  // which can be blocked by strict CSP (no `unsafe-eval`).
  const { compile, run } = await import("@mdx-js/mdx");
  const remarkGfm = (await import("remark-gfm")).default;
  const rehypeSlug = (await import("rehype-slug")).default;

  const code = String(
    await compile(mdx, {
      outputFormat: "function-body",
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    })
  );

  const mdxModule = await run(code, { ...runtime });
  const Content = mdxModule.default as React.ComponentType<{ components?: typeof mdxComponents }>;

  return renderToStaticMarkup(<Content components={mdxComponents} />);
}

export default function BlogPostPage({ post, mdxHtml, relatedPosts, toc }: BlogPostPageProps) {
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
        <Container className="bg-card border-border mt-12 rounded-xs border">
          <div className="py-16 text-center">
            <h1 className="text-foreground mb-4 text-2xl font-normal">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The article you&apos;re looking for doesn&apos;t exist.
            </p>
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
      "@type": "Organization",
      name: post.author,
      url: SITE_URL,
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
      {post.faqs && post.faqs.length > 0 && <FAQPageJsonLd faqs={post.faqs} />}

      <div className="font-sans">
        {/* Breadcrumb */}
        <Container className="bg-card border-border mt-12 rounded-xs border">
          <div className="py-4">
            <nav className="text-muted-foreground flex items-center gap-2 text-sm">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-foreground transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-foreground">{post.title}</span>
            </nav>
          </div>
        </Container>

        {/* Article */}
        <Container className="bg-card border-border mt-8 rounded-xs border">
          <div className="py-12">
            <div className="flex gap-8">
              {/* Table of Contents Sidebar - Left */}
              {toc.length > 0 && (
                <aside className="hidden w-56 shrink-0 lg:block">
                  <div className="sticky top-24">
                    <TableOfContents items={toc} />
                  </div>
                </aside>
              )}

              {/* Main content */}
              <article className="max-w-3xl flex-1">
                {/* Header */}
                <header className="mb-8">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 text-sm font-medium">
                      {post.category}
                    </span>
                    {post.featured && (
                      <span className="bg-accent text-accent-foreground inline-flex items-center rounded-full px-3 py-1 text-sm font-medium">
                        Featured
                      </span>
                    )}
                  </div>

                  <h1 className="text-foreground mb-6 text-4xl leading-tight font-bold md:text-5xl">
                    {post.title}
                  </h1>

                  <p className="text-muted-foreground mb-8 text-xl leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="border-border flex flex-col justify-between gap-4 border-b pb-8 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-4">
                      <img
                        src="/logo.webp"
                        alt={post.author}
                        className="h-10 w-10 object-contain"
                      />
                      <div>
                        <div className="text-foreground font-semibold">{post.author}</div>
                        <div className="text-muted-foreground text-sm">{post.authorRole}</div>
                      </div>
                    </div>
                    <div className="text-muted-foreground text-sm">
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
                <div className="border-border mt-12 border-t pt-8">
                  <h3 className="text-foreground mb-4 text-lg font-semibold">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
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
          </div>
        </Container>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <Container className="bg-card border-border mt-8 rounded-xs border">
            <div className="py-12">
              <h2 className="text-foreground mb-8 text-2xl font-normal">Related Articles</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <div key={relatedPost.slug} className="group">
                    <Link href={`/blog/${relatedPost.slug}`} className="block">
                      <article className="bg-card border-border hover:bg-surface-2 h-full rounded-xs border p-6 transition-colors duration-[0.15s]">
                        <div className="mb-3 flex items-center gap-2">
                          <span className="bg-surface-3 text-foreground inline-flex items-center rounded-xs px-2 py-0.5 text-xs font-normal">
                            {relatedPost.category}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            {formatDate(relatedPost.publishedAt)}
                          </span>
                        </div>
                        <h3 className="text-foreground group-hover:text-foreground-80 mb-2 font-normal transition-colors duration-[0.15s]">
                          {relatedPost.title}
                        </h3>
                        <p className="text-muted-foreground mb-3 text-sm">{relatedPost.excerpt}</p>
                        <div className="text-muted-foreground flex items-center gap-2 text-xs">
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
  const toc = extractTableOfContents(post.content);

  return {
    props: {
      post,
      mdxHtml,
      relatedPosts,
      toc,
    },
  };
};
