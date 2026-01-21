import Link from "next/link";
import Image from "next/image";
import { ProductUpdate } from "@/lib/product-updates";
import { TierBadge } from "./TierBadge";

interface ProductUpdateCardProps {
  update: ProductUpdate;
}

export function ProductUpdateCard({ update }: ProductUpdateCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Link
      href={`/product-updates/${update.slug}`}
      className="group block transition-all duration-200 hover:-translate-y-1"
    >
      <article className="bg-white dark:bg-card rounded-2xl border border-[#EEEBEA] dark:border-border h-full flex flex-col overflow-hidden">
        {/* Optional Feature Image */}
        {update.image && (
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={update.image}
              alt={update.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        <div className="p-8 flex flex-col flex-grow">
          {/* Category & Tier Badges */}
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-[#19224A]/10 text-[#19224A] dark:bg-[#1E293B]/30 dark:text-foreground">
              {update.category}
            </span>
            <TierBadge tier={update.tier} />
          </div>

          {/* Title */}
          <h3 className="text-xl font-medium text-[#2E2D2D] dark:text-foreground mb-3 group-hover:opacity-80 transition-opacity">
            {update.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-[rgba(24,23,23,0.7)] dark:text-muted-foreground mb-5 flex-grow leading-relaxed">
            {update.excerpt}
          </p>

          {/* Tags (max 2) */}
          <div className="flex flex-wrap gap-2 mb-5">
            {update.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs bg-[#F9F7F6] dark:bg-muted text-[rgba(24,23,23,0.7)] dark:text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            {update.tags.length > 2 && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs bg-[#F9F7F6] dark:bg-muted text-[rgba(24,23,23,0.7)] dark:text-muted-foreground">
                +{update.tags.length - 2} more
              </span>
            )}
          </div>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-[rgba(24,23,23,0.7)] dark:text-muted-foreground pt-4 border-t border-[#EEEBEA] dark:border-border">
            <span>{formatDate(update.publishedAt)}</span>
            <span>{update.readTime}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
