import Image from "next/image";
import Link from "next/link";
import { BlogPostSummary } from "@/lib/blog";
import { cn } from "@/lib/cn";

interface BlogCardProps {
  post: BlogPostSummary;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  };

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group block transition-all duration-[0.15s] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5",
        featured && "md:col-span-2"
      )}
    >
      <article className="bg-card border-border hover:bg-surface-2 flex h-full flex-col overflow-hidden rounded-xs border transition-colors duration-[0.15s]">
        {/* Cover image — only posts that have one; others stay text-only */}
        {post.coverImage && (
          <div className="border-border bg-surface-2 relative aspect-[16/9] w-full overflow-hidden border-b">
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt ?? ""}
              fill
              sizes={
                featured
                  ? "(min-width: 768px) 66vw, 100vw"
                  : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              }
              className="object-cover transition-transform duration-[0.3s] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.02]"
            />
          </div>
        )}

        <div className="flex flex-grow flex-col p-6">
          {/* Category Badge */}
          <div className="mb-4 flex items-center justify-between">
            <span className="bg-surface-3 text-foreground inline-flex items-center rounded-xs px-2 py-0.5 text-xs font-normal">
              {post.category}
            </span>
            {post.featured && (
              <span className="bg-accent/10 text-accent inline-flex items-center rounded-xs px-2 py-0.5 text-xs font-normal">
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className={cn(
              "text-foreground group-hover:text-foreground-80 mb-3 font-normal transition-colors duration-[0.15s]",
              featured ? "text-2xl tracking-[-0.02em] md:text-[26px]" : "text-xl tracking-[-0.01em]"
            )}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p
            className={cn(
              "text-muted-foreground mb-4 flex-grow leading-relaxed",
              featured ? "text-base" : "text-sm"
            )}
          >
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="text-muted-foreground border-border flex items-center gap-3 border-t pt-4 text-sm">
            <span>{formatDate(post.publishedAt)}</span>
            <span className="text-border">·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
