import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { GetStaticProps } from "next";
import { ArrowRight, BookOpen, Globe, Mic, BarChart3, Languages } from "lucide-react";
import { Button } from "@/components/ui/Button";
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

      {/* Solutions Section */}
      <Container className="pt-8 pb-12 md:px-0">
        <div className="animate-fade-in-up mb-10 text-center delay-300">
          <h2 className="text-foreground text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
            Our Solutions
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-lg">
            Comprehensive tools designed to enhance compliance and safety in freight logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <Link href="/products/raisedash-shift" className="group animate-fade-in-scale delay-400">
            <div className="border-border bg-card hover:bg-surface-2 flex h-full flex-col overflow-hidden rounded-xs border p-2 transition-all duration-[0.15s] hover:-translate-y-0.5">
              <div className="bg-surface-3 relative aspect-[4/3] w-full overflow-hidden rounded-xs">
                <Image
                  src="https://cdn.raisedash.com/media/landing/797f10f9.webp"
                  alt="Shift driver onboarding platform showing streamlined LMS dashboard for efficient driver training and compliance management"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-foreground mb-2 text-xl font-normal tracking-[-0.01em]">
                  Shift (Driver Onboarding)
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Driver onboarding platform for companies. Streamlined LMS solution for efficient
                  driver training and compliance.
                </p>
                <div className="mt-4 flex justify-end">
                  <Button variant="primary" size="sm">
                    See More <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Link>

          <Link
            href="/products/raisedash-pti-inspections"
            className="group animate-fade-in-scale delay-500"
          >
            <div className="border-border bg-card hover:bg-surface-2 flex h-full flex-col overflow-hidden rounded-xs border p-2 transition-all duration-[0.15s] hover:-translate-y-0.5">
              <div className="bg-surface-3 relative aspect-[4/3] w-full overflow-hidden rounded-xs">
                <Image
                  src="https://cdn.raisedash.com/media/landing/fca0b837.webp"
                  alt="PTI Pre-Trip Inspection app interface displaying digital DVIR forms and vehicle inspection checklist"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-foreground mb-2 text-xl font-normal tracking-[-0.01em]">
                  PTI (PTI Inspections)
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Simplify Driver Vehicle Inspection Reports and Pre-Trip inspections with
                  easy-to-use digital tools.
                </p>
                <div className="mt-4 flex justify-end">
                  <Button variant="primary" size="sm">
                    See More <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/products/raisedash-vertex" className="group animate-fade-in-scale delay-600">
            <div className="border-border bg-card hover:bg-surface-2 flex h-full flex-col overflow-hidden rounded-xs border p-2 transition-all duration-[0.15s] hover:-translate-y-0.5">
              <div className="bg-surface-3 relative aspect-[4/3] w-full overflow-hidden rounded-xs">
                <Image
                  src="https://cdn.raisedash.com/media/landing/9ecad1a8.webp"
                  alt="Vertex freight tracking dashboard showing real-time shipment visibility and automated arrival alerts"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-foreground mb-2 text-xl font-normal tracking-[-0.01em]">
                  Vertex (Freight Tracking)
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  The Easiest Way to Track Freight. Get real-time visibility and automated arrival
                  alerts in seconds.
                </p>
                <div className="mt-4 flex justify-end">
                  <Button variant="primary" size="sm">
                    See More <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </Container>

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

      {/* Driver Tools Section */}
      <Container className="pb-12 md:px-0">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* TruckTalk Card */}
          <Link href="https://www.raisedash.com/tools/elp-practice" className="group">
            <div className="border-border bg-card hover:bg-surface-2 flex h-full flex-col overflow-hidden rounded-xs border p-2 transition-all duration-[0.15s] hover:-translate-y-0.5 sm:flex-row">
              {/* Image — 1/3 */}
              <div className="bg-surface-3 relative aspect-[4/3] w-full overflow-hidden rounded-xs sm:aspect-auto sm:w-1/3">
                <Image
                  src="https://cdn.raisedash.com/media/landing/elp-practice.webp"
                  alt="TruckTalk English language proficiency practice app for CDL truck drivers"
                  fill
                  sizes="(max-width: 640px) 100vw, 200px"
                  className="object-cover"
                />
              </div>
              {/* Content — 2/3 */}
              <div className="flex flex-1 flex-col p-6">
                <span className="bg-surface-3 text-foreground mb-3 w-fit rounded-xs px-2 py-0.5 text-xs font-normal">
                  Free Tool
                </span>
                <h3 className="text-foreground mb-2 text-xl font-normal tracking-[-0.01em]">
                  TruckTalk
                </h3>
                <p className="text-foreground/90 mb-4 text-sm leading-relaxed font-normal">
                  <span className="font-medium">$16,000 fine</span>, out-of-service order, and a CSA
                  hit that lasts years — from a single failed ELP check.
                </p>
                <ul className="mb-5 space-y-2">
                  <li className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Mic className="h-3.5 w-3.5 flex-shrink-0" />
                    50+ AI voice roleplay scenarios
                  </li>
                  <li className="text-muted-foreground flex items-center gap-2 text-sm">
                    <BookOpen className="h-3.5 w-3.5 flex-shrink-0" />
                    2,300+ CDL terms, 2,900+ quiz questions
                  </li>
                  <li className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Globe className="h-3.5 w-3.5 flex-shrink-0" />
                    500+ conversations in 10+ languages
                  </li>
                </ul>
                <div className="mt-auto flex justify-end">
                  <Button variant="primary" size="sm">
                    Try Free <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Link>

          {/* Road Signs Card */}
          <Link href="https://www.raisedash.com/tools/road-signs" className="group">
            <div className="border-border bg-card hover:bg-surface-2 flex h-full flex-col overflow-hidden rounded-xs border p-2 transition-all duration-[0.15s] hover:-translate-y-0.5 sm:flex-row">
              {/* Image — 1/3 */}
              <div className="bg-surface-3 relative aspect-[4/3] w-full overflow-hidden rounded-xs sm:aspect-auto sm:w-1/3">
                <Image
                  src="https://cdn.raisedash.com/media/landing/road-signs.webp"
                  alt="Road Signs learning app with flashcards and practice tests for US road signs"
                  fill
                  sizes="(max-width: 640px) 100vw, 200px"
                  className="object-cover"
                />
              </div>
              {/* Content — 2/3 */}
              <div className="flex flex-1 flex-col p-6">
                <span className="bg-surface-3 text-foreground mb-3 w-fit rounded-xs px-2 py-0.5 text-xs font-normal">
                  Free Tool
                </span>
                <h3 className="text-foreground mb-2 text-xl font-normal tracking-[-0.01em]">
                  Road Signs
                </h3>
                <p className="text-foreground/90 mb-4 text-sm leading-relaxed font-normal">
                  <span className="font-medium">1,094 road signs</span>, 7.4k practice questions,
                  and 600+ tests — all in one place.
                </p>
                <ul className="mb-5 space-y-2">
                  <li className="text-muted-foreground flex items-center gap-2 text-sm">
                    <BookOpen className="h-3.5 w-3.5 flex-shrink-0" />
                    Flashcards with mastery tracking per sign
                  </li>
                  <li className="text-muted-foreground flex items-center gap-2 text-sm">
                    <BarChart3 className="h-3.5 w-3.5 flex-shrink-0" />6 question formats, custom
                    test builder
                  </li>
                  <li className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Languages className="h-3.5 w-3.5 flex-shrink-0" />
                    10 translation languages
                  </li>
                </ul>
                <div className="mt-auto flex justify-end">
                  <Button variant="primary" size="sm">
                    Start Learning <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </Container>

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
