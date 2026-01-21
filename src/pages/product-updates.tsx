import { useState } from "react";
import { GetStaticProps } from "next";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProductUpdateCard } from "@/components/product-updates/ProductUpdateCard";
import { Button } from "@/components/ui/Button";
import { getAllProductUpdates, getProductUpdateCategories, ProductUpdate } from "@/lib/product-updates";

interface ProductUpdatesPageProps {
  updates: ProductUpdate[];
  categories: string[];
}

export default function ProductUpdates({ updates, categories }: ProductUpdatesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredUpdates = selectedCategory === "All"
    ? updates
    : updates.filter((update) => update.category === selectedCategory);

  return (
    <PageLayout
      title="Product Updates"
      description="Stay up to date with the latest features, improvements, and fixes to Raisedash. See what's new in ELD compliance, driver qualification, fleet management, and more."
      keywords={["product updates", "changelog", "new features", "ELD compliance", "fleet management updates"]}
    >
      {/* Hero Section with Email Capture */}
      <section className="bg-surface-3">
        <Container className="py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-[48px] font-normal tracking-[-0.03em] text-foreground leading-tight">
              Product Updates
            </h1>
            <p className="mt-6 text-lg font-light text-muted-foreground leading-relaxed">
              Stay in the loop. See what we&apos;ve shipped and what&apos;s coming next.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xs border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors duration-[0.15s]"
              />
              <Button className="bg-primary text-white hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Category Filter */}
      <section className="bg-surface-3 pb-8">
        <Container>
          <div className="bg-card rounded-xs border border-border p-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xs text-sm font-normal transition-all duration-[0.15s] ${
                    selectedCategory === category
                      ? "bg-foreground text-background"
                      : "bg-surface-3 text-foreground border border-border hover:border-foreground"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUpdates.map((update) => (
                <ProductUpdateCard key={update.slug} update={update} />
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-xs border border-border p-12 text-center">
              <div className="text-6xl mb-4 opacity-50">
                <svg className="w-16 h-16 mx-auto text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-normal text-foreground mb-2">No updates found</h3>
              <p className="text-base font-light text-muted-foreground mb-6">
                {selectedCategory === "All"
                  ? "We're working on something new. Check back soon!"
                  : "No updates in this category yet."}
              </p>
              {selectedCategory !== "All" && (
                <Button
                  onClick={() => setSelectedCategory("All")}
                  variant="secondary"
                >
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
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-[28px] font-normal tracking-[-0.03em] text-white mb-4">
              Never Miss an Update
            </h2>
            <p className="text-lg font-light text-white/70 mb-8">
              Get the latest product updates, feature releases, and compliance tips delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xs border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors duration-[0.15s]"
              />
              <Button className="bg-white text-primary hover:bg-white/90">
                Subscribe
              </Button>
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
