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
      <article className="bg-card border-border hover:bg-surface-2 flex h-full flex-col overflow-hidden rounded-xs border transition-colors duration-[0.15s]">
        {/* Optional Feature Image */}
        {update.image && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={update.image}
              alt={`${update.title} - Raisedash product update feature preview`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-[0.25s] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.02]"
            />
          </div>
        )}

        <div className="flex flex-grow flex-col p-6">
          {/* Category & Tier Badges */}
          <div className="mb-4 flex items-center gap-2">
            <span className="bg-surface-3 text-foreground inline-flex items-center rounded-xs px-2 py-0.5 text-xs font-normal">
              {update.category}
            </span>
            <TierBadge tier={update.tier} />
          </div>

          {/* Title */}
          <h3 className="text-foreground group-hover:text-foreground-80 mb-3 text-xl font-normal tracking-[-0.01em] transition-colors duration-[0.15s]">
            {update.title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground mb-4 flex-grow text-sm leading-relaxed">
            {update.excerpt}
          </p>

          {/* Tags (max 2) */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {update.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="bg-surface-3 text-muted-foreground inline-flex items-center rounded-xs px-2 py-0.5 text-xs"
              >
                {tag}
              </span>
            ))}
            {update.tags.length > 2 && (
              <span className="bg-surface-3 text-muted-foreground inline-flex items-center rounded-xs px-2 py-0.5 text-xs">
                +{update.tags.length - 2} more
              </span>
            )}
          </div>

          {/* Meta Info */}
          <div className="text-muted-foreground border-border flex items-center justify-between border-t pt-4 text-sm">
            <span>{formatDate(update.publishedAt)}</span>
            <span>{update.readTime}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
