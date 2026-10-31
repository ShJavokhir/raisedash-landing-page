import * as React from "react";
import Head from "next/head";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/cn";
// Content fingerprints, written by marketing/landing-motion/scripts/install.mjs.
import versions from "@/data/motion.json";

/**
 * The films live in Cloudflare R2 (bucket `raisedash`, public at
 * cdn.raisedash.com), one folder per content fingerprint, uploaded with a
 * one-year immutable Cache-Control by install.mjs. A new render is a new
 * folder, so nothing is ever stale and nothing needs purging.
 */
const CDN_ORIGIN = "https://cdn.raisedash.com";
const CDN = `${CDN_ORIGIN}/media/landing/motion`;

/** Below this width the 4:5 phone cut plays; above it, the 16:9 one. */
const PHONE_QUERY = "(max-width: 639px)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

interface ProductMotionProps {
  /** The film's name in src/data/motion.json (made in marketing/landing-motion). */
  name: keyof typeof versions;
  /** Says what the loop shows, for screen readers and the still image. */
  label: string;
  pauseLabel: string;
  playLabel: string;
  /** The tool's homepage card color, painted while the first frame loads. */
  plate: string;
  className?: string;
}

/** A media query as render state; false on the server and during hydration. */
function useMedia(query: string): boolean {
  return React.useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

const noSubscribe = () => () => {};

type Connection = EventTarget & { saveData?: boolean };
const connection = () => (navigator as Navigator & { connection?: Connection }).connection;

/** The visitor turned on their browser's data saver; false on the server and when unknown. */
function useSaveData(): boolean {
  return React.useSyncExternalStore(
    (onChange) => {
      const c = connection();
      c?.addEventListener("change", onChange);
      return () => c?.removeEventListener("change", onChange);
    },
    () => connection()?.saveData === true,
    () => false
  );
}

/**
 * A tool's hero loop: a short muted film in two shapes (`wide.mp4` 16:9,
 * `tall.mp4` 4:5). The poster is the film's first frame (WebP, JPG fallback),
 * painted first and fetched at high priority because it's the page's largest
 * paint; the video streams in after hydration (its index sits at the front of
 * the file, so it plays before it has fully downloaded) and starts without a
 * jump. It only plays while on screen and the visitor can pause it. Visitors
 * who ask for reduced motion see the finished state as a still, and visitors
 * with data saver on see the first frame, each with a play button instead of
 * an autoplaying (and downloading) loop.
 */
export function ProductMotion({
  name,
  label,
  pauseLabel,
  playLabel,
  plate,
  className,
}: ProductMotionProps) {
  const frameRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const hydrated = React.useSyncExternalStore(
    noSubscribe,
    () => true,
    () => false
  );
  const shape = useMedia(PHONE_QUERY) ? "tall" : "wide";
  const reduced = useMedia(REDUCED_QUERY);
  const saveData = useSaveData();
  // The visitor's own choice wins over both the default and the scroll position.
  const [choice, setChoice] = React.useState<"auto" | "playing" | "paused">("auto");
  const [visible, setVisible] = React.useState(false);
  const file = (path: string) => `${CDN}/${name}/${versions[name]}/${path}`;

  const mode = choice === "auto" ? (reduced ? "still" : saveData ? "paused" : "playing") : choice;
  // The video loads once it should play, and stays for a pause the visitor chose (the frame holds).
  const mounted = hydrated && (mode === "playing" || choice === "paused");

  React.useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const observer = new window.IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (visible && mode === "playing") void video.play().catch(() => {});
    else video.pause();
  }, [mounted, shape, visible, mode]);

  const still = mode === "still" ? "-still" : "";

  return (
    <div
      ref={frameRef}
      className={cn(
        "border-border relative aspect-[4/5] overflow-hidden rounded-xs border sm:aspect-video",
        className
      )}
      style={{ backgroundColor: plate }}
    >
      <Head>
        {/* The poster and the film come from the CDN: open that connection early. */}
        <link key="preconnect-cdn" rel="preconnect" href={CDN_ORIGIN} />
      </Head>
      <picture>
        {still ? null : <source media={PHONE_QUERY} type="image/webp" srcSet={file("tall.webp")} />}
        <source media={PHONE_QUERY} srcSet={file(`tall${still}.jpg`)} />
        {still ? null : <source type="image/webp" srcSet={file("wide.webp")} />}
        {/* A plain image: these are prerendered frames, already sized for the slot. */}
        <img
          src={file(`wide${still}.jpg`)}
          alt={label}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      {mounted ? (
        <video
          // Remount on a shape change so the right file loads.
          key={shape}
          ref={videoRef}
          src={file(`${shape}.mp4`)}
          // The same WebP the picture above already loaded, so no second download.
          poster={file(`${shape}.webp`)}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      {hydrated ? (
        // The film keeps its top-right corner clear for this button. Literal
        // white and ink: the plate color is fixed, like the homepage cards' pill.
        <button
          type="button"
          onClick={() => setChoice(mode === "playing" ? "paused" : "playing")}
          aria-label={mode === "playing" ? pauseLabel : playLabel}
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#26251e] shadow-[0_1px_2px_rgb(0_0_0/0.12)] transition-[background-color,transform] duration-150 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.97] motion-reduce:transition-none sm:top-4 sm:right-4 sm:h-10 sm:w-10"
        >
          {mode === "playing" ? (
            <Pause className="h-4 w-4" fill="currentColor" strokeWidth={0} aria-hidden="true" />
          ) : (
            <Play
              className="ml-0.5 h-4 w-4"
              fill="currentColor"
              strokeWidth={0}
              aria-hidden="true"
            />
          )}
        </button>
      ) : null}
    </div>
  );
}
