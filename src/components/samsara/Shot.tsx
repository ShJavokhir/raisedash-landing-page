import Image from "next/image";

/**
 * Frames a real product screenshot. Every image on this page is an actual
 * capture from a fleet running the service, with driver names, plates, unit
 * numbers, GPS fixes and faces destroyed before export — the exact regions are
 * in `scripts/redact-samsara-shots.sh`, which reproduces every asset in
 * `public/images/samsara/` from the raw captures. Never publish an unredacted
 * capture here: that directory deploys.
 *
 * The captures are dark UI on a light page, so the frame carries its own dark
 * ground rather than the page's card token.
 */
export function Shot({
  src,
  alt,
  width,
  height,
  title,
  sizes,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Renders a window titlebar above the image. */
  title?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`border-border overflow-hidden rounded-xs border bg-[#0e1016] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_32px_-12px_rgba(0,0,0,0.25)] ${className}`}
    >
      {title && (
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-3.5 py-2.5">
          <span className="flex shrink-0 gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="ml-1 truncate font-mono text-[11px] tracking-wide text-white/45">
            {title}
          </span>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full"
      />
    </div>
  );
}
