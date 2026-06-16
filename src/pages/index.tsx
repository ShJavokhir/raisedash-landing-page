import Link from "next/link";
import dynamic from "next/dynamic";
import { GetStaticProps } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { EmailCapture } from "@/components/ui/EmailCapture";
import { ProblemsMarquee } from "@/components/home/ProblemsMarquee";
import { getAllProductUpdates, ProductUpdate } from "@/lib/product-updates";
import { getAllPosts, BlogPost } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";

// Lazy load the globe component - D3.js is 868KB and only needed on desktop
const RotatingEarth = dynamic(() => import("@/components/ui/wireframe-dotted-globe"), {
  ssr: false,
  loading: () => <div className="bg-surface-3 h-[24rem] w-[24rem] animate-pulse rounded-full" />,
});

interface HomeProps {
  recentUpdates: ProductUpdate[];
  recentPosts: BlogPost[];
}

export default function Home({ recentUpdates, recentPosts }: HomeProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  };
  return (
    <PageLayout
      description="Continuous Compliance & Safety. Raisedash strengthens compliance and safety of companies in freight logistics with modern AI-powered solutions."
      keywords={[
        "freight logistics",
        "fleet safety",
        "DVIR software",
        "pre-trip inspections",
        "fleet management",
        "cargo security",
      ]}
    >
      {/* Hero Section */}
      <div className="pt-16 pb-8">
        <Container className="bg-card border-border animate-fade-in-scale relative flex items-center overflow-hidden rounded-xs border px-8 py-12 delay-0 sm:px-12 sm:py-16">
          <div className="relative z-10 flex w-full items-center">
            <div className="flex-1">
              <h1 className="text-foreground animate-fade-in-up text-4xl leading-tight font-normal tracking-[-0.03em] delay-75 sm:text-[48px]">
                Continuous Compliance & Safety.
              </h1>
              <p className="text-muted-foreground animate-fade-in-up mt-6 max-w-xl text-xl leading-relaxed font-normal delay-150">
                Raisedash strengthens compliance and safety of companies in freight logistics.
              </p>

              <div className="animate-fade-in-up mt-10 delay-200">
                <EmailCapture source="Hero" />
              </div>
            </div>

            <div className="hidden flex-shrink-0 lg:block">
              <RotatingEarth
                width={380}
                height={380}
                className="h-[24rem] w-[24rem]"
                rotationSpeed={0.3}
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Problems Marquee */}
      <ProblemsMarquee />

      {/* Recent Updates Section */}
      {recentUpdates.length > 0 && (
        <Container className="pb-12 md:px-0">
          <p className="text-muted-foreground mb-4 text-sm font-normal tracking-wide uppercase">
            Recent updates
          </p>
          <div className="divide-border divide-y">
            {recentUpdates.map((update) => (
              <Link
                key={update.slug}
                href={`/product-updates/${update.slug}`}
                className="group flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <span className="bg-surface-3 text-foreground rounded-xs px-2 py-0.5 text-xs font-normal">
                    {update.category}
                  </span>
                  <h3 className="text-foreground group-hover:text-foreground/80 truncate text-sm font-normal transition-colors">
                    {update.title}
                  </h3>
                  <span className="text-muted-foreground shrink-0 text-xs">
                    {formatDate(update.publishedAt)}
                  </span>
                </div>
                <ArrowRight className="text-muted-foreground group-hover:text-foreground h-3.5 w-3.5 flex-shrink-0 transition-colors" />
              </Link>
            ))}
          </div>
          <div className="mt-3">
            <Link
              href="/product-updates"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors"
            >
              View all updates <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Container>
      )}

      {/* Recent Blog Posts Section */}
      {recentPosts.length > 0 && (
        <Container className="pb-12 md:px-0">
          <div className="mb-10 text-center">
            <h2 className="text-foreground text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
              Latest from the Blog
            </h2>
            <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-lg">
              Insights on fleet compliance, safety, and industry best practices.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors"
            >
              View all articles <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Container>
      )}

      {/* CTA Section */}
      <Container className="pb-12 md:px-0">
        <div className="bg-card border-border animate-fade-in-scale rounded-xs border p-8 text-center delay-700 sm:p-12">
          <h2 className="text-foreground mb-4 text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
            Ready to strengthen your fleet compliance?
          </h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-lg">
            Get started in days, not months. Our team is ready to help you modernize your
            operations.
          </p>
          <div className="mx-auto flex justify-center">
            <EmailCapture source="CTA" />
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allUpdates = getAllProductUpdates();
  const recentUpdates = allUpdates.slice(0, 3);

  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 3);

  return {
    props: {
      recentUpdates,
      recentPosts,
    },
    revalidate: 3600,
  };
};
