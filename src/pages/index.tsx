import Link from "next/link";
import { GetStaticProps } from "next";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { EmailCapture } from "@/components/ui/EmailCapture";
import { HeroScene, MobileHeroScene } from "@/components/home/HeroScene";
import { ProblemsMarquee } from "@/components/home/ProblemsMarquee";
import { CoreLoops } from "@/components/home/CoreLoops";
import { EvidenceMoment } from "@/components/home/EvidenceMoment";
import { VideoShowcase } from "@/components/home/VideoShowcase";
import { ForDrivers } from "@/components/home/ForDrivers";
import { RoiCalculator } from "@/components/home/RoiCalculator";
import { MoreFromRaisedash } from "@/components/home/MoreFromRaisedash";
import { getAllProductUpdates, toUpdateSummary, ProductUpdateSummary } from "@/lib/product-updates";
import { getAllPosts, toPostSummary, BlogPostSummary } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { HalftoneTruck } from "@/components/ui/HalftoneTruck";

interface HomeProps {
  recentUpdates: ProductUpdateSummary[];
  recentPosts: BlogPostSummary[];
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
      title="Driver Readiness Platform for Modern Trucking Fleets"
      description="Raisedash helps trucking fleets prepare new drivers before day one with phone-first orientation, hands-on practice, and a clear record of every training step."
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
      <div className="pt-8 pb-6 sm:pt-16 sm:pb-8">
        <Container className="bg-card border-border animate-fade-in-scale relative flex items-center overflow-hidden rounded-xs border px-6 py-9 delay-0 sm:px-12 sm:py-16">
          <div className="relative z-10 flex w-full items-center gap-12">
            <div className="flex-1">
              <p className="text-muted-foreground animate-fade-in-up mb-3 text-xs font-normal tracking-wide uppercase delay-75 sm:mb-4 sm:text-sm">
                The driver readiness platform for modern fleets
              </p>
              <h1 className="text-foreground animate-fade-in-up text-4xl leading-tight font-normal tracking-[-0.03em] delay-75 sm:text-[48px]">
                Ready before day one. Proven long after.
              </h1>
              <p className="text-muted-foreground animate-fade-in-up mt-4 max-w-xl text-lg leading-relaxed font-normal delay-150 sm:mt-6 sm:text-xl">
                Prepare new drivers before day one, give them practical training and hands-on
                practice, and keep a clear record of every step. Less chasing for your safety team.
                Fewer surprises when drivers arrive.
              </p>

              <div className="animate-fade-in-up mt-7 delay-200 sm:mt-10">
                <EmailCapture source="Hero" buttonText="Get started" />
              </div>

              <ul className="text-muted-foreground animate-fade-in-up mt-5 flex flex-col gap-2 text-sm delay-300 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
                {["No app download", "One-time code access", "Training records in one place"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-1.5">
                      <Check className="text-foreground h-3.5 w-3.5" aria-hidden="true" />
                      {item}
                    </li>
                  )
                )}
              </ul>

              {/* Phones get the same animated scene as desktop, scaled down
                  to the card width (see MobileHeroScene). */}
              <div className="animate-fade-in-up mt-8 delay-300 lg:hidden">
                <MobileHeroScene />
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

      {/* Real training videos generated from a brief */}
      <VideoShowcase />

      {/* Readiness and evidence loops */}
      <CoreLoops />

      {/* The evidence engine, played out */}
      <EvidenceMoment />

      {/* For drivers */}
      <ForDrivers />

      {/* Orientation cost calculator */}
      <RoiCalculator />

      {/* Recent Updates Section */}
      {recentUpdates.length > 0 && (
        <Container className="pb-12 md:px-0">
          <h2 className="text-muted-foreground mb-1 text-sm font-normal tracking-wide uppercase">
            Recent updates
          </h2>
          <p className="text-muted-foreground mb-4 text-sm">
            Recent changes and improvements across the platform.
          </p>
          <div className="border-border bg-card divide-border divide-y overflow-hidden rounded-xs border">
            {recentUpdates.map((update) => (
              <Link
                key={update.slug}
                href={`/product-updates/${update.slug}`}
                className="group hover:bg-surface-2 flex items-center justify-between gap-4 px-4 py-3.5 transition-colors duration-150 sm:px-5"
              >
                {/* Phones stack chip+date over the full title; sm+ keeps the
                    single row with a truncated title. */}
                <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="bg-surface-3 text-foreground shrink-0 rounded-xs px-2 py-0.5 text-xs font-normal">
                      {update.category}
                    </span>
                    <span className="text-muted-foreground shrink-0 text-xs sm:hidden">
                      {formatDate(update.publishedAt)}
                    </span>
                  </div>
                  <h3 className="text-foreground line-clamp-2 text-sm font-normal sm:line-clamp-1">
                    {update.title}
                  </h3>
                  <span className="text-muted-foreground hidden shrink-0 text-xs sm:inline">
                    {formatDate(update.publishedAt)}
                  </span>
                </div>
                <ArrowRight className="text-muted-foreground group-hover:text-foreground hidden h-3.5 w-3.5 flex-shrink-0 transition-colors sm:block" />
              </Link>
            ))}
          </div>
          <div className="mt-4">
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
              Practical ideas for more consistent driver orientation, follow-up, and recordkeeping.
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
        <div className="bg-card border-border animate-fade-in-scale relative overflow-hidden rounded-xs border p-6 text-center delay-700 sm:p-12">
          <HalftoneTruck
            flip
            className="text-foreground absolute -right-10 -bottom-9 w-72 opacity-[0.07] sm:w-96 sm:opacity-[0.13]"
          />
          <div className="relative">
            <h2 className="text-foreground mb-4 text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
              Walk into orientation knowing where everyone stands.
            </h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-lg">
              See how Raisedash can help your fleet spend less time repeating the same work and more
              time on the hands-on training that matters.
            </p>
            <div className="mx-auto flex max-w-md flex-col items-center gap-4">
              <EmailCapture source="CTA" buttonText="Request a demo" />
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
  const recentUpdates = allUpdates.slice(0, 3).map(toUpdateSummary);

  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 3).map(toPostSummary);

  return {
    props: {
      recentUpdates,
      recentPosts,
    },
    revalidate: 3600,
  };
};
