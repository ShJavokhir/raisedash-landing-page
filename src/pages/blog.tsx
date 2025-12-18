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
      <Container className="flex items-center bg-white dark:bg-card mt-12 rounded-md border ui-corner-accents">
        <div className="w-full py-12 ">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.01em] text-foreground">
            Blog
          </h1>
        </div>
      </Container>

      {/* Category Filter */}
      <Container className="bg-white dark:bg-card mt-8 rounded-md border ui-corner-accents">
        <div className="py-8">
          <div className="flex flex-col sm:flex-row">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Blog Posts Grid */}
      <Container className="bg-white dark:bg-card mt-8 rounded-md border ui-corner-accents">
        <div className="py-12">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-6">
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
        </div>
      </Container>
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
  };
};
