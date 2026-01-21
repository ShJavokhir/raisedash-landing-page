import Link from "next/link";
import { BlogPost } from "@/lib/blog";
import { cn } from "@/lib/cn";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
      <article className="bg-card rounded-xs border border-border p-6 h-full flex flex-col transition-colors duration-[0.15s] hover:bg-surface-2">
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center px-2 py-0.5 rounded-xs text-xs font-normal bg-surface-3 text-foreground">
            {post.category}
          </span>
          {post.featured && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-xs text-xs font-normal bg-accent/10 text-accent">
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className={cn(
          "font-normal text-foreground mb-3 group-hover:text-foreground-80 transition-colors duration-[0.15s]",
          featured ? "text-2xl md:text-[26px] tracking-[-0.02em]" : "text-xl tracking-[-0.01em]"
        )}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className={cn(
          "text-muted-foreground mb-4 flex-grow leading-relaxed",
          featured ? "text-base" : "text-sm"
        )}>
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 rounded-xs text-xs bg-surface-3 text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-xs text-xs bg-surface-3 text-muted-foreground">
              +{post.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Author and Meta */}
        <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-surface-3 flex items-center justify-center">
              <span className="text-xs font-normal text-foreground">
                {post.author.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <div className="font-normal text-foreground text-sm">{post.author}</div>
              <div className="text-xs">{post.authorRole}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm">{formatDate(post.publishedAt)}</div>
            <div className="text-xs">{post.readTime}</div>
          </div>
        </div>
      </article>
    </Link>
  );
}
