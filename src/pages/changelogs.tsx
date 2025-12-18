import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as runtime from "react/jsx-runtime";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { getChangelog, ChangelogMeta } from "@/lib/changelog";

interface ChangelogsPageProps {
  meta: ChangelogMeta;
  mdxHtml: string;
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-bold text-foreground mt-12 first:mt-0 mb-2" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => {
    const children = props.children;
    // Check if this is a date paragraph (starts with **)
    if (typeof children === "string" && children.match(/^\*\*/)) {
      return null; // Date is handled in strong
    }
    return <p className="text-muted-foreground mb-4" {...props} />;
  },
  strong: (props: React.HTMLAttributes<HTMLElement>) => {
    const children = props.children as string;
    // Date styling (standalone bold text like "January 15, 2024")
    if (typeof children === "string" && children.match(/^[A-Z][a-z]+ \d+, \d{4}$/)) {
      return (
        <p className="text-sm text-muted-foreground mb-6">
          {children}
        </p>
      );
    }
    // Change type badges
    if (typeof children === "string") {
      const type = children.replace(":", "");
      const colors: Record<string, string> = {
        Feature: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        Improvement: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        Fix: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
        Breaking: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      };
      if (colors[type]) {
        return (
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mr-2 ${colors[type]}`}>
            {type}
          </span>
        );
      }
    }
    return <strong className="font-semibold text-foreground" {...props} />;
  },
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="space-y-3 mb-8" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="flex items-start gap-3 text-muted-foreground" {...props} />
  ),
  hr: () => <hr className="border-border my-8" />,
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="text-muted-foreground" {...props} />
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

export default function Changelogs({ meta, mdxHtml }: ChangelogsPageProps) {
  return (
    <PageLayout title={meta.title} description={meta.description} keywords={["raisedash changelog", "product updates", "new features", "release notes"]}>
      {/* Hero Section */}
      <Container className="flex items-center bg-white dark:bg-card mt-12 rounded-md border ui-corner-accents">
        <div className="w-full py-16">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.01em] text-foreground">
            {meta.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            {meta.description}
          </p>
        </div>
      </Container>

      {/* Changelog Content */}
      <Container className="bg-white dark:bg-card mt-8 rounded-md border ui-corner-accents">
        <div className="py-16">
          <div className="max-w-3xl">
            <div dangerouslySetInnerHTML={{ __html: mdxHtml }} />
          </div>
        </div>
      </Container>

      {/* CTA Section */}
      <Container className="bg-white dark:bg-card mt-8 rounded-md border ui-corner-accents">
        <div className="py-16 text-center">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Want to be notified of updates?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to get notified about new features, security updates, and
            important announcements.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/request-demo">
              <Button>Request Demo</Button>
            </Link>
            <a href="mailto:support@raisedash.com">
              <Button variant="secondary">Contact Support</Button>
            </a>
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { meta, content } = getChangelog();
  const mdxHtml = await renderMdxToHtml(content);

  return {
    props: {
      meta,
      mdxHtml,
    },
  };
};