import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";

export default function PtiApp() {
  const [showVideo, setShowVideo] = useState(false);

  const openVideo = useCallback(() => {
    setShowVideo(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeVideo = useCallback(() => {
    setShowVideo(false);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeVideo();
    };

    if (showVideo) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [showVideo, closeVideo]);

  return (
    <PageLayout
      title="Download Raisedash PTI & DVIR"
      description="Download Raisedash PTI & DVIR app for drivers. Complete pre-trip inspections, post-trip inspections, and driver vehicle inspection reports digitally. Available for iOS and Android."
      keywords={[
        "raisedash pti download",
        "dvir app",
        "pre-trip inspection app",
        "post-trip inspection app",
        "driver vehicle inspection report",
        "trucking inspection app",
        "iOS dvir app",
        "Android pti app",
        "dot compliance app",
        "fmcsa inspection app",
      ]}
    >
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-neutral-950 dark:to-neutral-900">
        <Container className="px-4 py-12">
          <div className="mx-auto w-full max-w-sm text-center">
            <div className="mb-8">
              <h1 className="text-foreground text-3xl font-semibold tracking-[-0.01em] md:text-4xl">
                Download Raisedash PTI & DVIR
              </h1>
            </div>

            <div className="space-y-3">
              <Link
                href="https://apps.apple.com/us/app/raisedash-pti-dvir/id6466733418"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button size="lg" className="flex w-full items-center justify-center gap-3">
                  <svg
                    className="h-5 w-5 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Download for iOS
                </Button>
              </Link>

              <Link
                href="https://play.google.com/store/apps/details?id=uz.jdsystems.checklist.checklist&hl=en_US"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  variant="secondary"
                  size="lg"
                  className="flex w-full items-center justify-center gap-3"
                >
                  <svg
                    className="h-5 w-5 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.53 20.75,12C20.75,12.47 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  Download for Android
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="lg"
                className="flex w-full items-center justify-center gap-3"
                onClick={openVideo}
              >
                <svg
                  className="h-5 w-5 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
                </svg>
                Watch 2-Min Tutorial
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {showVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={closeVideo}
          role="dialog"
          aria-modal="true"
          aria-label="Video demo"
        >
          <div
            className="relative aspect-[9/16] w-full max-w-[360px] overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeVideo}
              className="absolute -top-12 right-0 z-10 p-2 text-white/80 transition-colors hover:text-white"
              aria-label="Close video"
            >
              <svg
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <iframe
              src="https://www.youtube.com/embed/dkyO0tfGkMs?autoplay=1&rel=0&modestbranding=1"
              title="Raisedash PTI & DVIR Demo"
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </PageLayout>
  );
}
