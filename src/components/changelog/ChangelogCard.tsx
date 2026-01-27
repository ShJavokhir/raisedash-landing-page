import Link from "next/link";
import Image from "next/image";
import { ProductUpdate } from "@/lib/product-updates";

interface ChangelogCardProps {
  update: ProductUpdate;
}

export function ChangelogCard({ update }: ChangelogCardProps) {
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
      <article className="bg-card border-border hover:border-foreground/20 flex h-full flex-col overflow-hidden rounded-xs border transition-colors duration-[0.15s]">
        {/* Image */}
        <div className="bg-surface-2 relative aspect-[16/9] overflow-hidden">
          {update.image ? (
            <Image
              src={update.image}
              alt={update.title}
              fill
              className="object-cover transition-transform duration-[0.15s] group-hover:scale-[1.02]"
            />
          ) : (
            <div className="from-surface-3 via-surface-2 to-surface-3 absolute inset-0 flex items-center justify-center bg-gradient-to-br">
              <div className="bg-surface-3 flex h-12 w-12 items-center justify-center rounded-full">
                <svg
                  className="text-muted-foreground h-6 w-6"
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

        {/* Content */}
        <div className="flex flex-grow flex-col p-6">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="bg-surface-3 text-foreground inline-flex items-center rounded-xs px-2 py-0.5 text-xs font-normal">
              {update.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-foreground group-hover:text-foreground-80 mb-3 line-clamp-2 text-xl font-normal tracking-[-0.01em] transition-colors duration-[0.15s]">
            {update.title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground mb-4 line-clamp-2 flex-grow text-sm leading-relaxed">
            {update.excerpt}
          </p>

          {/* Date and Learn More */}
          <div className="border-border text-muted-foreground flex items-center justify-between border-t pt-4 text-sm">
            <span>{formatDate(update.publishedAt)}</span>
            <span className="text-foreground group-hover:text-foreground-80 flex items-center gap-1 font-normal transition-colors duration-[0.15s]">
              Learn more
              <svg
                className="h-4 w-4 transition-transform duration-[0.15s] group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
