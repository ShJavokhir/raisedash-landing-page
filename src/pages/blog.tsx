import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { BlogCard } from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/Button";
import { blogPosts, categories, getFeaturedPosts, getPostsByCategory } from "@/lib/blog-data";
import { cn } from "@/lib/cn";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPosts = getFeaturedPosts();
  const filteredPosts = getPostsByCategory(selectedCategory).filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className={`${geistSans.className} ${geistMono.className} font-sans`}>
      {/* Hero Section */}
      <Container 
        className="flex items-center bg-white dark:bg-card mt-12 rounded-md border"
        // style={{
        //   backgroundColor: '#ffffff',
        //   backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%23efefef' fill-opacity='0.16' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        // }}
      >
        <div className="w-full py-12 ">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.01em] text-foreground">
            Blog
          </h1>
          
        </div>
      </Container>

    
      {/* Search and Filter */}
      <Container className="bg-white dark:bg-card mt-8 rounded-md border">
        <div className="py-8">
          <div className="flex flex-col sm:flex-row">
            {/* Search */}
       
            
            {/* Category Filter */}
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
      <Container className="bg-white dark:bg-card mt-8 rounded-md border">
        <div className="py-12">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                variant="secondary"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </Container>

    

      <Footer />
    </div>
  );
}
