import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { Container } from "@/components/layout/Container";

/**
 * Homepage proof band: a compact, horizontally-scrolling gallery of real
 * training videos the engine produced from short briefs. Sits before the
 * "driver readiness platform" section as the hook, since the videos are the
 * most tangible thing the product makes.
 *
 * The cards are just posters; tapping one opens a lightbox with the full video
 * (sound + controls). No big inline player: it ate the page and read as "which
 * thing do I click?". The lightbox is hand-rolled (portal + focus trap + scroll
 * lock + Escape/backdrop/X close) rather than <dialog> so it behaves identically
 * across browsers, and the video is H.264/AAC mp4 with playsInline so it plays
 * in place on iOS instead of hijacking the native fullscreen player.
 */

interface ShowcaseVideo {
  slug: string;
  title: string;
  topic: string;
  blurb: string;
  length: string;
}

const CDN = "https://cdn.raisedash.com/media/landing/videos";

const VIDEOS: ShowcaseVideo[] = [
  {
    slug: "first-10-minutes",
    title: "The first 10 minutes after a crash",
    topic: "Accident procedures",
    blurb:
      "The steps that decide a claim: secure the scene, document everything, and call it in first.",
    length: "1:29",
  },
  {
    slug: "in-cab-camera",
    title: "What the in-cab camera really does",
    topic: "Cameras & telematics",
    blurb:
      "It isn't a live feed and it isn't there to punish you. It's the footage that clears the driver.",
    length: "1:29",
  },
  {
    slug: "black-ice",
    title: "Where black ice hides",
    topic: "Winter hazards",
    blurb:
      "The bridges, ramps, and shaded curves that freeze first, and how to read them before you're on them.",
    length: "1:25",
  },
  {
    slug: "five-second-glance",
    title: "The five-second glance",
    topic: "Distracted driving",
    blurb:
      "Why one look at your phone at highway speed means driving the length of a football field blind.",
    length: "1:21",
  },
  {
    slug: "blind-side-backing",
    title: "Blind-side backing",
    topic: "Backing & maneuvering",
    blurb:
      "Why most backing crashes happen on the side you can't see, and the habit that prevents them.",
    length: "1:29",
  },
  {
    slug: "out-of-service",
    title: "Defects that stop a truck cold",
    topic: "Pre-trip inspection",
    blurb:
      "The four systems behind almost every out-of-service order, and why the walk-around pays for itself.",
    length: "1:39",
  },
  {
    slug: "your-first-week",
    title: "Your first week",
    topic: "New-driver orientation",
    blurb:
      "From paperwork to solo dispatch, and the three rules that never bend: pre-trip, phone down, report it.",
    length: "1:39",
  },
];

function VideoLightbox({ video, onClose }: { video: ShowcaseVideo; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    // A click opened this, so autoplay-with-sound is allowed; if a browser still
    // refuses, the native controls are right there.
    void videoRef.current?.play?.().catch(() => {});
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], video, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable || focusable.length === 0) return;
    const list = Array.from(focusable);
    const first = list[0];
    const last = list[list.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${video.title}, training video`}
      onClick={onClose}
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:p-6"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close video"
        className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:top-5 sm:right-5"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="my-auto w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
        <div className="overflow-hidden rounded-xs bg-black shadow-2xl">
          <video
            ref={videoRef}
            src={`${CDN}/${video.slug}.mp4`}
            poster={`${CDN}/${video.slug}.jpg`}
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="block max-h-[78vh] w-full bg-black"
          />
        </div>
        <div className="mt-3 sm:mt-4">
          <div className="mb-1 flex items-center gap-2">
            <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] tracking-wide text-white/80">
              {video.topic}
            </span>
            <span className="text-xs text-white/60 tabular-nums">{video.length}</span>
          </div>
          <h3 className="text-lg text-white sm:text-xl">{video.title}</h3>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-white/70">{video.blurb}</p>
          <p className="mt-2 text-xs text-white/45">
            Sample video. Your fleet&apos;s name and intro replace Ridgeline Freight&apos;s.
          </p>
        </div>
      </div>
    </div>
  );
}

export function VideoShowcase() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const scrollRail = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * Math.min(rail.clientWidth * 0.9, 640), behavior: "smooth" });
  };

  return (
    <Container className="pb-12 md:px-0">
      <div className="border-border bg-card rounded-xs border p-6 sm:p-12">
        <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
          <div className="max-w-2xl">
            <p className="text-muted-foreground mb-3 text-sm font-normal tracking-wide uppercase">
              AI video studio
            </p>
            <h2 className="text-foreground text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
              Turn your company&apos;s rules into training, fast.
            </h2>
            <p className="text-muted-foreground mt-3 text-lg">
              Describe a policy or a hazard. Raisedash builds the video, in your fleet&apos;s name.
              Tap any example to watch.
            </p>
          </div>

          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => scrollRail(-1)}
              aria-label="Scroll left"
              className="border-border text-foreground hover:bg-surface-2 flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollRail(1)}
              aria-label="Scroll right"
              className="border-border text-foreground hover:bg-surface-2 flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Touch-swipe on mobile; arrows scroll it on desktop. */}
        <div
          ref={railRef}
          className="flex snap-x snap-mandatory [scrollbar-width:thin] gap-4 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]"
        >
          {VIDEOS.map((video, index) => (
            <button
              key={video.slug}
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Play ${video.title}`}
              className="group w-64 shrink-0 snap-start text-left sm:w-72"
            >
              <div className="border-border relative aspect-video overflow-hidden rounded-xs border">
                {/* Remote CDN poster; a plain img matches MediaFrame's own approach. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${CDN}/${video.slug}.jpg`}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-black/5 transition-colors duration-200 group-hover:bg-black/25" />
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
                    <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
                  </span>
                </span>
                <span className="absolute right-1.5 bottom-1.5 rounded-xs bg-black/70 px-1.5 py-0.5 text-[10px] text-white tabular-nums">
                  {video.length}
                </span>
              </div>
              <p className="text-muted-foreground mt-2 text-xs">{video.topic}</p>
              <p className="text-foreground truncate text-sm">{video.title}</p>
            </button>
          ))}
        </div>
      </div>

      {openIndex !== null
        ? createPortal(
            <VideoLightbox video={VIDEOS[openIndex]} onClose={() => setOpenIndex(null)} />,
            document.body
          )
        : null}
    </Container>
  );
}

export default VideoShowcase;
