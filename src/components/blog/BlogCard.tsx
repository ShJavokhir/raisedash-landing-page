import Link from "next/link";
import { BlogPost } from "@/lib/blog";
import { cn } from "@/lib/cn";

interface BlogCardProps {
  post: BlogPost;
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
      <article className="bg-card border-border hover:bg-surface-2 flex h-full flex-col rounded-xs border p-6 transition-colors duration-[0.15s]">
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
      </article>
    </Link>
  );
}
