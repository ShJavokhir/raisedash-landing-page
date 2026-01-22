import { useState } from "react";
import { GetStaticProps } from "next";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProductUpdateCard } from "@/components/product-updates/ProductUpdateCard";
import { Button } from "@/components/ui/Button";
import {
  getAllProductUpdates,
  getProductUpdateCategories,
  ProductUpdate,
} from "@/lib/product-updates";

interface ProductUpdatesPageProps {
  updates: ProductUpdate[];
  categories: string[];
}

export default function ProductUpdates({ updates, categories }: ProductUpdatesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredUpdates =
    selectedCategory === "All"
      ? updates
      : updates.filter((update) => update.category === selectedCategory);

  return (
    <PageLayout
      title="Product Updates"
      description="Stay up to date with the latest features, improvements, and fixes to Raisedash. See what's new in ELD compliance, driver qualification, fleet management, and more."
      keywords={[
        "product updates",
        "changelog",
        "new features",
        "ELD compliance",
        "fleet management updates",
      ]}
    >
      {/* Hero Section with Email Capture */}
      <section className="bg-surface-3">
        <Container className="py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-foreground text-[48px] leading-tight font-normal tracking-[-0.03em]">
              Product Updates
            </h1>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed font-light">
              Stay in the loop. See what we&apos;ve shipped and what&apos;s coming next.
            </p>
            <div className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:border-primary flex-1 rounded-xs border px-4 py-3 transition-colors duration-[0.15s] focus:outline-none"
              />
              <Button className="bg-primary hover:bg-primary/90 text-white">Subscribe</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Category Filter */}
      <section className="bg-surface-3 pb-8">
        <Container>
          <div className="bg-card border-border rounded-xs border p-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-xs px-4 py-2 text-sm font-normal transition-all duration-[0.15s] ${
                    selectedCategory === category
                      ? "bg-foreground text-background"
                      : "bg-surface-3 text-foreground border-border hover:border-foreground border"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Updates Grid */}
      <section className="bg-surface-3 pb-16 md:pb-24">
        <Container>
          {filteredUpdates.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredUpdates.map((update) => (
                <ProductUpdateCard key={update.slug} update={update} />
              ))}
            </div>
          ) : (
            <div className="bg-card border-border rounded-xs border p-12 text-center">
              <div className="mb-4 text-6xl opacity-50">
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
              <h3 className="text-foreground mb-2 text-xl font-normal">No updates found</h3>
              <p className="text-muted-foreground mb-6 text-base font-light">
                {selectedCategory === "All"
                  ? "We're working on something new. Check back soon!"
                  : "No updates in this category yet."}
              </p>
              {selectedCategory !== "All" && (
                <Button onClick={() => setSelectedCategory("All")} variant="secondary">
                  Clear filters
                </Button>
              )}
            </div>
          )}
        </Container>
      </section>

      {/* Newsletter CTA Section */}
      <section className="bg-primary py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-[28px] font-normal tracking-[-0.03em] text-white">
              Never Miss an Update
            </h2>
            <p className="mb-8 text-lg font-light text-white/70">
              Get the latest product updates, feature releases, and compliance tips delivered
              straight to your inbox.
            </p>
            <div className="mx-auto flex max-w-md flex-col justify-center gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-xs border border-white/20 bg-white/10 px-4 py-3 text-white transition-colors duration-[0.15s] placeholder:text-white/50 focus:border-white/40 focus:outline-none"
              />
              <Button className="text-primary bg-white hover:bg-white/90">Subscribe</Button>
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const updates = getAllProductUpdates();
  const categories = getProductUpdateCategories();

  return {
    props: {
      updates,
      categories,
    },
    revalidate: 3600,
  };
};
