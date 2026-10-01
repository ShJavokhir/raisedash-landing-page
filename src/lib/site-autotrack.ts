/**
 * Document-level listeners that turn the site's highest-intent behaviour into
 * clean named PostHog events, without every page wiring its own handlers:
 *
 *   outbound_link_clicked  any link that leaves the site — Telegram bot / sales
 *                          chat, booking, app signup/login, academy, app stores,
 *                          YouTube, mailto/tel. On the product pages THIS is the
 *                          conversion (there is no form), so it is classified by
 *                          `destination_kind`, and a same-tab exit is sent by
 *                          beacon after draining the batch queue.
 *   video_started / video_progress (25/50/75) / video_completed
 *                          native <video> players. Decorative muted loops are
 *                          skipped so they can't flood the project.
 *   embed_clicked          first interaction with a content iframe (YouTube
 *                          demo, cal.com booking; not Intercom/Turnstile) —
 *                          cross-origin, so inferred from window blur +
 *                          document.activeElement.
 *
 * Autocapture still records the raw clicks; these exist because "people who
 * opened the PTI bot" should be one event with one property, not an
 * $elements_chain regex. Installed once from src/instrumentation-client.ts.
 */
import { capture } from "@/lib/site-analytics";

/** Where an outbound link leads, as one breakdown-friendly value. */
function destinationKind(url: URL): string {
  if (url.protocol === "mailto:") return "email";
  if (url.protocol === "tel:") return "phone";
  const host = url.hostname.replace(/^www\./, "");
  const path = url.pathname.toLowerCase();
  if (host === "t.me" || host === "telegram.me") {
    if (path === "/raisedashbot") return "telegram_bot";
    if (path === "/raisedash") return "telegram_sales";
    return "telegram_other";
  }
  if (host === "cal.com") return "booking";
  if (host === "app.raisedash.com") {
    if (/register|sign-?up/.test(path)) return "app_signup";
    if (/login|sign-?in/.test(path)) return "app_login";
    return "app";
  }
  if (host === "academy.raisedash.com") return "academy";
  if (host === "tools.raisedash.com") return "tools";
  if (host === "apps.apple.com" || host === "play.google.com") return "app_store";
  if (host === "youtu.be" || host.endsWith("youtube.com")) return "youtube";
  if (host.endsWith(".gov")) return "reference";
  return "other";
}

/** The part of the page an element sits in: an explicit data-ph-placement, the
 *  nearest named section or header/footer/nav, else the heading of the section
 *  around it (most product-page sections are unnamed). */
function placementOf(el: Element): string {
  const scope = el.closest(
    "[data-ph-placement], section[id], section[aria-label], header, footer, nav"
  );
  if (scope) {
    return (
      scope.getAttribute("data-ph-placement") ||
      scope.id ||
      scope.getAttribute("aria-label") ||
      scope.tagName.toLowerCase()
    );
  }
  const heading = el.closest("section")?.querySelector("h1, h2, h3")?.textContent;
  const label = heading?.replace(/\s+/g, " ").trim().slice(0, 60);
  return label ? `section: ${label}` : "main";
}

function onLinkClick(event: MouseEvent): void {
  // Left or middle button only (auxclick also fires for right-click on some browsers).
  if (event.button !== 0 && event.button !== 1) return;
  const anchor = (event.target as Element | null)?.closest?.("a[href]");
  if (!(anchor instanceof HTMLAnchorElement)) return;

  let url: URL;
  try {
    url = new URL(anchor.href, window.location.href);
  } catch {
    return;
  }
  const isWeb = url.protocol === "http:" || url.protocol === "https:";
  if (isWeb && url.host === window.location.host) return; // internal: $pageview covers it
  if (!isWeb && url.protocol !== "mailto:" && url.protocol !== "tel:") return;

  const text = (anchor.getAttribute("aria-label") || anchor.textContent || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
  const newTab =
    anchor.target === "_blank" ||
    event.button === 1 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey;

  capture(
    "outbound_link_clicked",
    {
      destination_kind: destinationKind(url),
      destination_host: isWeb ? url.hostname : url.protocol.slice(0, -1),
      // Origin + path only: query strings can carry an email (the /demo signup
      // link prefills ?email=) and never belong in analytics.
      destination_url: isWeb ? `${url.origin}${url.pathname}` : `${url.protocol}${url.pathname}`,
      link_text: text || undefined,
      placement: placementOf(anchor),
      // Which of the page's links to this same destination it was, top to
      // bottom (1 = the hero CTA on a product page, the last one its footer CTA).
      link_index:
        Array.from(document.querySelectorAll("a[href]"))
          .filter((a) => (a as HTMLAnchorElement).href === anchor.href)
          .indexOf(anchor) + 1,
      new_tab: newTab,
    },
    // Only a same-tab web navigation actually leaves this document; new tabs and
    // mailto:/tel: keep it alive, so the normal batch flush still runs.
    { beacon: isWeb && !newTab }
  );
}

interface VideoState {
  started: boolean;
  completed: boolean;
  milestones: Set<number>;
}

const videoStates = new WeakMap<HTMLVideoElement, VideoState>();
const MILESTONES = [25, 50, 75];

function trackedVideo(target: EventTarget | null): HTMLVideoElement | null {
  if (!(target instanceof HTMLVideoElement)) return null;
  // Muted autoplay loops are decoration (feature-page vignettes), not views.
  if (target.loop && target.muted) return null;
  return target;
}

function videoProps(video: HTMLVideoElement): Record<string, unknown> {
  let name = video.getAttribute("data-ph-video") || "";
  if (!name) {
    try {
      name = new URL(video.currentSrc || video.src).pathname.split("/").pop() || "";
    } catch {
      // keep empty
    }
  }
  return {
    video: name || undefined,
    video_label: video.getAttribute("aria-label") || undefined,
    video_duration_s: Number.isFinite(video.duration) ? Math.round(video.duration) : undefined,
    placement: placementOf(video),
  };
}

function stateOf(video: HTMLVideoElement): VideoState {
  let state = videoStates.get(video);
  if (!state) {
    state = { started: false, completed: false, milestones: new Set() };
    videoStates.set(video, state);
  }
  return state;
}

function onVideoPlay(event: Event): void {
  const video = trackedVideo(event.target);
  if (!video) return;
  const state = stateOf(video);
  if (state.started) return;
  state.started = true;
  capture("video_started", { ...videoProps(video), autoplay: video.autoplay });
}

function onVideoTime(event: Event): void {
  const video = trackedVideo(event.target);
  if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
  const state = stateOf(video);
  const percent = (video.currentTime / video.duration) * 100;
  for (const milestone of MILESTONES) {
    if (percent >= milestone && !state.milestones.has(milestone)) {
      state.milestones.add(milestone);
      capture("video_progress", { ...videoProps(video), percent: milestone });
    }
  }
}

function onVideoEnded(event: Event): void {
  const video = trackedVideo(event.target);
  if (!video) return;
  const state = stateOf(video);
  if (state.completed) return;
  state.completed = true;
  capture("video_completed", videoProps(video));
}

const touchedIframes = new WeakSet<HTMLIFrameElement>();

// Content embeds only. Widgets are iframes too (the Intercom messenger has its
// own intercom_opened, the Turnstile captcha is form friction, not interest).
const CONTENT_EMBED_HOSTS =
  /(^|\.)(youtube\.com|youtube-nocookie\.com|cal\.com|vimeo\.com|loom\.com)$/;

function onWindowBlur(): void {
  // Focus moves into the iframe right after the window blurs.
  window.setTimeout(() => {
    const active = document.activeElement;
    if (!(active instanceof HTMLIFrameElement) || touchedIframes.has(active)) return;
    touchedIframes.add(active);
    let host: string;
    let src: string;
    try {
      const url = new URL(active.src);
      host = url.hostname;
      src = `${url.origin}${url.pathname}`;
    } catch {
      return; // srcdoc / about:blank: not a content embed
    }
    if (!CONTENT_EMBED_HOSTS.test(host)) return;
    capture("embed_clicked", {
      embed_host: host,
      embed_url: src,
      embed_title: active.title || undefined,
      placement: placementOf(active),
    });
  }, 0);
}

let installed = false;

export function installSiteAutotrack(): void {
  if (installed || typeof window === "undefined") return;
  installed = true;
  // Capture phase: runs even when a component stops propagation.
  document.addEventListener("click", onLinkClick, true);
  document.addEventListener("auxclick", onLinkClick, true);
  // Media events don't bubble, but they do pass through the capture phase.
  document.addEventListener("play", onVideoPlay, true);
  document.addEventListener("timeupdate", onVideoTime, true);
  document.addEventListener("ended", onVideoEnded, true);
  window.addEventListener("blur", onWindowBlur);
}
