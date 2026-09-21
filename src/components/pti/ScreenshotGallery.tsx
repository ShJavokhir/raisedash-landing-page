import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, Minimize, X, ZoomIn } from "lucide-react";

interface Screenshot {
  title: string;
  description: string;
  src: string;
  width: number;
  height: number;
  previewClass: string;
  alt: string;
}

const controlClass =
  "text-foreground hover:bg-surface-3 focus-visible:outline-ring inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-xs px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2";

function ScreenshotViewer({
  screenshots,
  initialIndex,
  onClose,
}: {
  screenshots: Screenshot[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const imageAreaRef = useRef<HTMLDivElement>(null);
  const screenshot = screenshots[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const area = imageAreaRef.current;
    if (zoomed && area) {
      area.scrollLeft = (area.scrollWidth - area.clientWidth) / 2;
    }
  }, [zoomed]);

  function move(direction: number) {
    setIndex((current) => (current + direction + screenshots.length) % screenshots.length);
    setZoomed(false);
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="pti-screenshot-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (zoomed) return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
      className="bg-card text-foreground fixed inset-0 m-auto h-[calc(100dvh-2rem)] max-h-none w-[calc(100vw-2rem)] max-w-5xl overflow-hidden rounded-xs border-0 p-0 shadow-xl backdrop:bg-black/75"
    >
      <div className="flex h-full flex-col">
        <div className="border-border flex shrink-0 items-center gap-3 border-b px-3 py-2 sm:px-5">
          <h2
            id="pti-screenshot-title"
            aria-live="polite"
            className="min-w-0 flex-1 text-sm font-normal sm:text-base"
          >
            {screenshot.title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close screenshot viewer"
            onClick={onClose}
            className={controlClass}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div
          ref={imageAreaRef}
          key={`${index}-${zoomed}`}
          className="min-h-0 flex-1 overflow-auto overscroll-contain bg-[#141311]"
        >
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            width={screenshot.width}
            height={screenshot.height}
            unoptimized
            className={
              zoomed ? "mx-auto block h-auto w-auto max-w-none" : "h-full w-full object-contain"
            }
          />
        </div>
        <div className="border-border flex shrink-0 items-center justify-between gap-1 border-t px-2 py-2 sm:px-4">
          <button
            type="button"
            aria-label="Previous screenshot"
            onClick={() => move(-1)}
            className={controlClass}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <span className="text-muted-foreground text-sm tabular-nums" aria-live="polite">
            {index + 1} / {screenshots.length}
          </span>
          <button
            type="button"
            aria-pressed={zoomed}
            onClick={() => setZoomed((value) => !value)}
            className={controlClass}
          >
            {zoomed ? (
              <Minimize className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ZoomIn className="h-4 w-4" aria-hidden="true" />
            )}
            {zoomed ? "Fit image" : "Zoom in"}
          </button>
          <button
            type="button"
            aria-label="Next screenshot"
            onClick={() => move(1)}
            className={controlClass}
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </dialog>
  );
}

export function ScreenshotGallery({ screenshots }: { screenshots: Screenshot[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {screenshots.map((screenshot, index) => (
          <section key={screenshot.src} aria-label={screenshot.title} className="flex flex-col">
            <h2 className="text-foreground text-xl font-normal tracking-tight">
              {screenshot.title}
            </h2>
            <p className="text-muted-foreground mt-3 mb-5 max-w-lg text-base leading-relaxed">
              {screenshot.description}
            </p>
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Enlarge screenshot: ${screenshot.title}`}
              aria-haspopup="dialog"
              className="border-border focus-visible:outline-ring relative mt-auto block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-xs border bg-[#141311] focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <Image
                src={screenshot.src}
                alt={screenshot.alt}
                width={screenshot.width}
                height={screenshot.height}
                sizes="(min-width: 1200px) 680px, (min-width: 1024px) 60vw, (min-width: 768px) 90vw, 180vw"
                className={screenshot.previewClass}
              />
              <span className="absolute right-3 bottom-3 rounded-xs bg-black/80 p-2 text-white">
                <Expand className="h-4 w-4" aria-hidden="true" />
              </span>
            </button>
          </section>
        ))}
      </div>
      {activeIndex !== null && (
        <ScreenshotViewer
          screenshots={screenshots}
          initialIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </>
  );
}
