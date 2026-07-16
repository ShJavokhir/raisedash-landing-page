import Link from "next/link";
import { GetStaticProps } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { EmailCapture } from "@/components/ui/EmailCapture";
import { HeroScene } from "@/components/home/HeroScene";
import { ProblemsMarquee } from "@/components/home/ProblemsMarquee";
import { CoreLoops } from "@/components/home/CoreLoops";
import { EvidenceMoment } from "@/components/home/EvidenceMoment";
import { ForDrivers } from "@/components/home/ForDrivers";
import { HowItWorks } from "@/components/home/HowItWorks";
import { MoreFromRaisedash } from "@/components/home/MoreFromRaisedash";
import { getAllProductUpdates, ProductUpdate } from "@/lib/product-updates";
import { getAllPosts, BlogPost } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { HalftoneTruck } from "@/components/ui/HalftoneTruck";

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
      description="The driver readiness platform for modern fleets. Raisedash sends orientation to new hires' phones and keeps a court-ready record of every lesson, signature, and score."
      keywords={[
        "driver readiness platform",
        "driver orientation software",
        "trucking driver onboarding",
        "training records for trucking fleets",
        "driver training evidence",
        "pre-arrival orientation",
        "fleet safety",
      ]}
    >
      {/* Hero Section */}
      <div className="pt-16 pb-8">
        <Container className="bg-card border-border animate-fade-in-scale relative flex items-center overflow-hidden rounded-xs border px-8 py-12 delay-0 sm:px-12 sm:py-16">
          <div className="relative z-10 flex w-full items-center gap-12">
            <div className="flex-1">
              <h1 className="text-foreground animate-fade-in-up text-4xl leading-tight font-normal tracking-[-0.03em] delay-75 sm:text-[48px]">
                Every driver road-ready before day one.
              </h1>
              <p className="text-muted-foreground animate-fade-in-up mt-6 max-w-xl text-xl leading-relaxed font-normal delay-150">
                Raisedash sends orientation to your new hires&apos; phones: lessons, quizzes, and
                signatures. They arrive trained and signed. And when an auditor, insurer, or lawyer
                asks what a driver was trained on, you have the complete record in one click.
              </p>

              <div className="animate-fade-in-up mt-10 flex flex-wrap items-center gap-3 delay-200">
                <Link href="/demo">
                  <Button variant="primary" size="lg">
                    Book a demo <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button variant="secondary" size="lg">
                    See how it works
                  </Button>
                </a>
              </div>
            </div>

            <div className="hidden flex-shrink-0 lg:block">
              <HeroScene />
            </div>
          </div>
        </Container>
      </div>

      {/* Readiness pains marquee */}
      <ProblemsMarquee />

      {/* Four core loops */}
      <CoreLoops />

      {/* The evidence engine, played out */}
      <EvidenceMoment />

      {/* For drivers */}
      <ForDrivers />

      {/* How it works */}
      <HowItWorks />

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
              Notes on driver readiness, orientation, and keeping the proof.
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
        <div className="bg-card border-border animate-fade-in-scale relative overflow-hidden rounded-xs border p-8 text-center delay-700 sm:p-12">
          <HalftoneTruck
            flip
            className="text-foreground absolute -right-10 -bottom-9 w-72 opacity-[0.13] sm:w-96"
          />
          <div className="relative">
            <h2 className="text-foreground mb-4 text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
              Get your drivers ready before they arrive.
            </h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-lg">
              Set up before lunch, not after a six-week implementation. See the ready board and the
              one-click evidence packet on your own drivers.
            </p>
            <div className="mx-auto flex max-w-md flex-col items-center gap-4">
              <EmailCapture source="CTA" buttonText="Get started" />
              <div className="text-muted-foreground flex items-center gap-3 text-sm">
                <span>or</span>
                <Link
                  href="/demo"
                  className="text-foreground hover:text-foreground/80 inline-flex items-center gap-1 transition-colors"
                >
                  Book a demo <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* More from Raisedash (demoted) */}
      <MoreFromRaisedash />
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
