import { GetStaticPaths, GetStaticProps } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { BlogPostComponent } from "@/components/blog/BlogPost";
import { Button } from "@/components/ui/Button";
import { getBlogPostById, blogPosts } from "@/lib/blog-data";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface BlogPostPageProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: {
      name: string;
      role: string;
      avatar?: string;
    };
    publishedAt: string;
    readTime: string;
    category: string;
    tags: string[];
    featured?: boolean;
  };
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  if (!post) {
    return (
      <div className={`${geistSans.className} ${geistMono.className} font-sans`}>
        <Container className="bg-white dark:bg-card mt-12 rounded-md border">
          <div className="py-16 text-center">
            <h1 className="text-2xl font-semibold text-foreground mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
            <Link href="/blog">
              <Button>Back to Blog</Button>
            </Link>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`${geistSans.className} ${geistMono.className} font-sans`}>
      {/* Breadcrumb */}
      <Container className="bg-white dark:bg-card mt-12 rounded-md border">
        <div className="py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-foreground">{post.title}</span>
          </nav>
        </div>
      </Container>

      {/* Article */}
      <Container className="bg-white dark:bg-card mt-8 rounded-md border">
        <div className="py-12">
          <BlogPostComponent post={post} />
        </div>
      </Container>

      {/* Related Articles */}
      <Container className="bg-white dark:bg-card mt-8 rounded-md border">
        <div className="py-12">
          <h2 className="text-2xl font-semibold text-foreground mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts
              .filter(relatedPost => 
                relatedPost.id !== post.id && 
                (relatedPost.category === post.category || 
                 relatedPost.tags.some(tag => post.tags.includes(tag)))
              )
              .slice(0, 3)
              .map((relatedPost) => (
                <div key={relatedPost.id} className="group">
                  <Link href={`/blog/${relatedPost.id}`} className="block">
                    <article className="bg-muted rounded-lg p-6 h-full hover:bg-accent transition-colors">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-primary/10 text-primary">
                          {relatedPost.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(relatedPost.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{relatedPost.author.name}</span>
                        <span>•</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </article>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </Container>

      {/* Newsletter CTA */}
      <Container className="bg-white dark:bg-card mt-8 rounded-md border">
        <div className="py-12 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Enjoyed this article?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to get more insights on freight logistics security, technology trends, and industry best practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = blogPosts.map((post) => ({
    params: { slug: post.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = getBlogPostById(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};
