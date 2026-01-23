import { GetStaticProps } from "next";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { ChangelogCard } from "@/components/changelog/ChangelogCard";
import { getAllProductUpdates, ProductUpdate } from "@/lib/product-updates";

interface ChangelogsPageProps {
  updates: ProductUpdate[];
}

export default function Changelogs({ updates }: ChangelogsPageProps) {
  return (
    <PageLayout
      title="Product Updates"
      description="Stay up to date with the latest features, improvements, and fixes in Raisedash."
      keywords={["raisedash changelog", "product updates", "new features", "release notes"]}
    >
      {/* Hero Section */}
      <section className="bg-background">
        <Container className="py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-foreground text-[48px] leading-tight font-normal tracking-[-0.03em]">
              Product Updates
            </h1>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed font-light">
              Every feature, fix, and improvement. Stay up to date with the latest changes to
              Raisedash.
            </p>
          </div>
        </Container>
      </section>

      {/* Updates Grid */}
      <section className="bg-background pb-16 md:pb-24">
        <Container>
          {updates.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {updates.map((update) => (
                <ChangelogCard key={update.slug} update={update} />
              ))}
            </div>
          ) : (
            <div className="bg-card border-border rounded-xs border p-12 text-center">
              <div className="mb-4">
                <svg
                  className="text-muted-foreground mx-auto h-16 w-16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-foreground mb-2 text-xl font-normal">No updates yet</h3>
              <p className="text-muted-foreground text-base font-light">
                Check back soon for the latest product updates.
              </p>
            </div>
          )}
        </Container>
      </section>
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const updates = getAllProductUpdates();

  return {
    props: {
      updates,
    },
  };
};
