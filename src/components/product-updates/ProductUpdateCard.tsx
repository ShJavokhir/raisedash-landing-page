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
      timeZone: "UTC",
    });
  };

  return (
    <Link
      href={`/product-updates/${update.slug}`}
      className="group block transition-all duration-[0.15s] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5"
    >
      <article className="bg-card border-border hover:bg-surface-2 flex h-full flex-col overflow-hidden rounded-xs border p-2 transition-colors duration-[0.15s]">
        {/* Feature Image or Placeholder */}
        <div className="bg-surface-3 relative aspect-[4/3] w-full overflow-hidden rounded-xs">
          {update.image ? (
            <Image
              src={update.image}
              alt={`${update.title} - Raisedash product update`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-[0.25s] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.02]"
            />
          ) : (
            <div className="from-surface-3 via-surface-2 to-surface-3 absolute inset-0 flex items-center justify-center bg-gradient-to-br">
              <div className="bg-surface-2 flex h-16 w-16 items-center justify-center rounded-full">
                <svg
                  className="text-muted-foreground h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>

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
