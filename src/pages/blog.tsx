import { useState } from "react";
import { GetStaticProps } from "next";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { BlogCard } from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/Button";
import { getAllPosts, getCategories, BlogPost } from "@/lib/blog";

interface BlogPageProps {
  posts: BlogPost[];
  categories: string[];
}

export default function Blog({ posts, categories }: BlogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All" ? posts : posts.filter((post) => post.category === selectedCategory);

  return (
    <PageLayout
      title="Blog"
      description="Read the latest insights on fleet compliance, safety and security in freight logistics."
      keywords={[
        "fleet safety blog",
        "fleet security blog",
        "freight logistics news",
        "cargo security",
        "cargo theft",
        "compliance and safety",
      ]}
    >
      {/* Hero Section */}
      <section className="bg-background">
        <Container className="py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-foreground text-[48px] leading-tight font-normal tracking-[-0.03em]">
              Blog
            </h1>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed font-light">
              Insights, updates, and best practices for fleet compliance, safety and security in
              freight logistics.
            </p>
          </div>
        </Container>
      </section>

      {/* Category Filter */}
      <section className="bg-background pb-8">
        <Container>
          <div className="bg-card border-border rounded-xs border p-6">
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter articles by category"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  aria-label={category === "All" ? "Show all articles" : `Filter by ${category}`}
                  aria-pressed={selectedCategory === category}
                  className={`rounded-full px-4 py-2 text-sm font-normal transition-all duration-[0.15s] ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-foreground border-border hover:bg-surface-2 hover:text-foreground-80 border"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Blog Posts Grid */}
      <section className="bg-background pb-16 md:pb-24">
        <Container>
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
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
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <h3 className="text-foreground mb-2 text-xl font-normal">No articles found</h3>
              <p className="text-muted-foreground mb-6 text-base font-light">
                Try adjusting your filter criteria.
              </p>
              <Button onClick={() => setSelectedCategory("All")} variant="secondary">
                Clear filters
              </Button>
            </div>
          )}
        </Container>
      </section>

      {/* Newsletter CTA Section */}
      <section className="bg-background border-border border-t py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground mb-4 text-[28px] font-normal tracking-[-0.03em]">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-8 text-lg font-light">
              Get the latest insights on fleet compliance, safety and security in freight logistics
              delivered to your inbox.
            </p>
            <div className="mx-auto flex max-w-md flex-col justify-center gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:border-foreground-40 h-11 flex-1 rounded-xs border px-4 transition-colors duration-[0.15s] focus:outline-none"
              />
              <Button size="lg" className="h-11">
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
  const posts = getAllPosts();
  const categories = getCategories();

  return {
    props: {
      posts,
      categories,
    },
    // ISR: Revalidate every hour for fresh content
    revalidate: 3600,
  };
};
