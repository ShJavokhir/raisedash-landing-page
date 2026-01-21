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

  const filteredPosts = selectedCategory === "All"
    ? posts
    : posts.filter((post) => post.category === selectedCategory);

  return (
    <PageLayout
      title="Blog"
      description="Read the latest insights on fleet safety, DVIR best practices, driver training, freight logistics security, and Raisedash product updates."
      keywords={["fleet safety blog", "DVIR tips", "trucking industry news", "driver training articles", "logistics technology"]}
    >
      {/* Hero Section */}
      <section className="bg-[#F9F7F6] dark:bg-secondary">
        <Container className="py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-[48px] font-medium tracking-[-0.03em] text-[#2E2D2D] dark:text-foreground leading-tight">
              Blog
            </h1>
            <p className="mt-6 text-lg font-light text-[rgba(24,23,23,0.7)] dark:text-muted-foreground leading-relaxed">
              Insights, updates, and best practices for fleet safety and logistics security.
            </p>
          </div>
        </Container>
      </section>

      {/* Category Filter */}
      <section className="bg-[#F9F7F6] dark:bg-secondary pb-8">
        <Container>
          <div className="bg-white dark:bg-card rounded-2xl border border-[#EEEBEA] dark:border-border p-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-[#1F1E1E] text-white"
                      : "bg-[#F9F7F6] dark:bg-secondary text-[#2E2D2D] dark:text-foreground border border-[#EEEBEA] dark:border-border hover:border-[#2E2D2D] dark:hover:border-foreground"
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
      <section className="bg-[#F9F7F6] dark:bg-secondary pb-16 md:pb-24">
        <Container>
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-card rounded-2xl border border-[#EEEBEA] dark:border-border p-12 text-center">
              <div className="text-6xl mb-4 opacity-50">
                <svg className="w-16 h-16 mx-auto text-[rgba(24,23,23,0.3)] dark:text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-[#2E2D2D] dark:text-foreground mb-2">No articles found</h3>
              <p className="text-base font-light text-[rgba(24,23,23,0.7)] dark:text-muted-foreground mb-6">
                Try adjusting your filter criteria.
              </p>
              <Button
                onClick={() => setSelectedCategory("All")}
                variant="secondary"
              >
                Clear filters
              </Button>
            </div>
          )}
        </Container>
      </section>

      {/* Newsletter CTA Section */}
      <section className="bg-[#19224A] dark:bg-[#1E293B] py-16 md:py-20">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-[28px] font-medium tracking-[-0.03em] text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-lg font-light text-white/70 mb-8">
              Get the latest insights on fleet safety and logistics security delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
              />
              <Button className="bg-white text-[#19224A] dark:text-primary hover:bg-white/90">
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
