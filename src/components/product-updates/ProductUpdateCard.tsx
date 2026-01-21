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
      className="group block transition-all duration-[0.15s] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5"
    >
      <article className="bg-card rounded-xs border border-border h-full flex flex-col overflow-hidden transition-colors duration-[0.15s] hover:bg-surface-2">
        {/* Optional Feature Image */}
        {update.image && (
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={update.image}
              alt={update.title}
              fill
              className="object-cover transition-transform duration-[0.25s] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.02]"
            />
          </div>
        )}

        <div className="p-6 flex flex-col flex-grow">
          {/* Category & Tier Badges */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center px-2 py-0.5 rounded-xs text-xs font-normal bg-surface-3 text-foreground">
              {update.category}
            </span>
            <TierBadge tier={update.tier} />
          </div>

          {/* Title */}
          <h3 className="text-xl font-normal tracking-[-0.01em] text-foreground mb-3 group-hover:text-foreground-80 transition-colors duration-[0.15s]">
            {update.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground mb-4 flex-grow leading-relaxed">
            {update.excerpt}
          </p>

          {/* Tags (max 2) */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {update.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded-xs text-xs bg-surface-3 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            {update.tags.length > 2 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-xs text-xs bg-surface-3 text-muted-foreground">
                +{update.tags.length - 2} more
              </span>
            )}
          </div>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
            <span>{formatDate(update.publishedAt)}</span>
            <span>{update.readTime}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
