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
        "group block transition-all duration-200 hover:-translate-y-1",
        featured && "md:col-span-2"
      )}
    >
      <article className="bg-white dark:bg-card rounded-2xl border border-[#EEEBEA] dark:border-border p-8 h-full flex flex-col">
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-5">
          <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-[#19224A]/10 text-[#19224A] dark:bg-[#1E293B]/30 dark:text-foreground">
            {post.category}
          </span>
          {post.featured && (
            <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-[#D04841]/10 text-[#D04841] dark:bg-accent/20 dark:text-accent">
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className={cn(
          "font-medium text-[#2E2D2D] dark:text-foreground mb-3 group-hover:opacity-80 transition-opacity",
          featured ? "text-2xl md:text-[28px] tracking-[-0.02em]" : "text-xl"
        )}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className={cn(
          "text-[rgba(24,23,23,0.7)] dark:text-muted-foreground mb-5 flex-grow leading-relaxed",
          featured ? "text-base" : "text-sm"
        )}>
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs bg-[#F9F7F6] dark:bg-muted text-[rgba(24,23,23,0.7)] dark:text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs bg-[#F9F7F6] dark:bg-muted text-[rgba(24,23,23,0.7)] dark:text-muted-foreground">
              +{post.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Author and Meta */}
        <div className="flex items-center justify-between text-sm text-[rgba(24,23,23,0.7)] dark:text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#19224A]/10 dark:bg-[#1E293B]/30 flex items-center justify-center">
              <span className="text-xs font-medium text-[#19224A] dark:text-foreground">
                {post.author.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <div className="font-medium text-[#2E2D2D] dark:text-foreground">{post.author}</div>
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
