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
        "group block transition-all duration-200 hover:scale-[1.02]",
        featured && "md:col-span-2"
      )}
    >
      <article className="bg-white dark:bg-card rounded-md border p-6 h-full flex flex-col hover:shadow-cal-md transition-shadow ui-corner-accents">
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {post.category}
          </span>
          {post.featured && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground">
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className={cn(
          "font-semibold text-foreground mb-3 group-hover:text-primary transition-colors",
          featured ? "text-xl md:text-2xl" : "text-lg"
        )}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className={cn(
          "text-muted-foreground mb-4 flex-grow",
          featured ? "text-base" : "text-sm"
        )}>
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded text-xs bg-muted text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
              +{post.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Author and Meta */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-medium text-primary">
                {post.author.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <div className="font-medium text-foreground">{post.author}</div>
              <div className="text-xs">{post.authorRole}</div>
            </div>
          </div>
          <div className="text-right">
            <div>{formatDate(post.publishedAt)}</div>
            <div className="text-xs">{post.readTime}</div>
          </div>
        </div>
      </article>
    </Link>
  );
}
