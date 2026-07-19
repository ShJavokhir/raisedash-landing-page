import * as React from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/cn";

interface MediaFrameProps {
  kind: "loop" | "player";
  src: string;
  poster: string;
  caption?: string;
  className?: string;
  ariaLabel?: string;
}

export function MediaFrame({ kind, src, poster, caption, className, ariaLabel }: MediaFrameProps) {
  const [mounted, setMounted] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  const frameRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (kind !== "loop" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const frame = frameRef.current;
    if (!frame) return;

    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, [kind]);

  const fallbackAlt = ariaLabel || caption || "";

  return (
    <figure className={cn(className)}>
      <div
        ref={frameRef}
        className="border-border bg-card relative overflow-hidden rounded-xs border shadow-lg"
      >
        {kind === "loop" ? (
          mounted ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster={poster}
              src={src}
              aria-label={ariaLabel}
              className="block h-auto w-full"
            />
          ) : (
            // A plain image is intentional: the poster URL may be a generated media asset.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={poster} alt={fallbackAlt} className="block h-auto w-full" />
          )
        ) : playing ? (
          <video
            controls
            autoPlay
            playsInline
            preload="auto"
            poster={poster}
            src={src}
            aria-label={ariaLabel}
            className="block h-auto w-full"
          />
        ) : (
          <>
            {/* A plain image is intentional: the poster URL may be a generated media asset. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={poster} alt={fallbackAlt} className="block h-auto w-full" />
            <button
              type="button"
              aria-label="Play sample video"
              className="group absolute inset-0 flex items-center justify-center"
              onClick={() => setPlaying(true)}
            >
              <span className="bg-primary text-primary-foreground flex h-14 w-14 items-center justify-center rounded-full transition-transform group-hover:scale-105">
                <Play className="ml-0.5 h-6 w-6" />
              </span>
            </button>
          </>
        )}
      </div>
      {caption ? (
        <figcaption>
          <p className="text-muted-foreground mt-2 text-xs leading-relaxed">{caption}</p>
        </figcaption>
      ) : null}
    </figure>
  );
}
