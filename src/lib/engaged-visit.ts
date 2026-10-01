/**
 * "EngagedVisit" — the custom fleet-pixel event the Meta ads optimize on while an
 * ad set is in the learning phase (email-capture "Lead" is too rare to exit it).
 *
 * A cheap proxy teaches Meta to find cheap behaviour (accidental Reels/Audience
 * Network taps, idle open tabs), so this fires ONCE per browser session only when
 * BOTH hold:
 *
 *  1. ENGAGED_SECONDS of engaged time — a second counts only while the tab is
 *     visible AND the visitor touched/scrolled/moved/typed within the last
 *     ACTIVE_WINDOW_MS. Wall-clock time would credit a background tab.
 *  2. At least one intent signal: deep scroll on a long page, an intent page
 *     (pricing/demo/platform/solutions/products), or a named high-intent action
 *     (product card, ROI calculator, user-started video, demo path, CTA exit...)
 *     observed through site-analytics' onCapture — no extra instrumentation.
 *
 * On qualifying it fires a deduped pair — the browser Pixel event and its server
 * CAPI twin via /api/visit-quality (shared eventId; the server half survives ad
 * blockers and the FB/IG in-app browser suppressing the Pixel) — plus the PostHog
 * event engaged_visit_qualified, so the share of engaged visitors who later become
 * leads can be measured. Tune the constants below from that data: aim for roughly
 * 10–25% of paid visitors qualifying.
 *
 * Progress survives full reloads via sessionStorage (best-effort; a blocked
 * storage just means progress restarts on reload). Started/stopped by
 * FleetMetaPixel, so it never runs on /start*.
 */
import { newEventId } from "@/lib/meta-pixel";
import { FLEET_PIXEL_ID, trackFleetPixel } from "@/lib/meta-fleet-pixel";
import { capture, onCapture, type SiteAnalyticsEvent } from "@/lib/site-analytics";

const ENGAGED_SECONDS = 30;
const ACTIVE_WINDOW_MS = 15_000;
/** Bottom of the viewport past this share of the page = deep scroll. */
const DEEP_SCROLL_RATIO = 0.6;
/** Pages shorter than this many viewports can't signal anything by scrolling. */
const MIN_PAGE_VIEWPORTS = 1.5;
const INTENT_PATH = /^\/(pricing|demo|platform|solutions|products)(\/|$)/;

/** Named analytics events that count as an intent signal, by signal name. */
const INTENT_EVENTS: Partial<Record<SiteAnalyticsEvent, string>> = {
  product_card_clicked: "product_card",
  roi_calculator_used: "roi_calculator",
  roi_calculator_link_copied: "roi_calculator",
  video_started: "video",
  embed_clicked: "embed",
  demo_path_chosen: "demo_path",
  scheduling_link_clicked: "scheduling_link",
  email_capture_submitted: "email_capture",
  intercom_opened: "intercom",
  outbound_link_clicked: "outbound_cta",
};

/** Outbound destinations that mean "wants the product" (not footer socials, .gov refs). */
const CTA_DESTINATIONS = new Set([
  "telegram_bot",
  "telegram_sales",
  "booking",
  "app_signup",
  "app",
  "app_store",
]);

const STORAGE_KEY = "rd_engaged";
const TICK_MS = 1000;
const SCROLL_THROTTLE_MS = 250;

interface EngagedState {
  ms: number;
  signals: string[];
  fired: boolean;
}

let state: EngagedState = { ms: 0, signals: [], fired: false };
let running = false;
let lastInputAt = 0;
let lastScrollCheckAt = 0;

function load(): void {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as Partial<EngagedState>;
    state = {
      ms: typeof parsed.ms === "number" && parsed.ms > 0 ? parsed.ms : 0,
      signals: Array.isArray(parsed.signals)
        ? parsed.signals.filter((s): s is string => typeof s === "string").slice(0, 12)
        : [],
      fired: parsed.fired === true,
    };
  } catch {
    // Storage blocked or corrupt — start fresh.
  }
}

function save(): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Best-effort.
  }
}

function addSignal(signal: string): void {
  if (!running || state.fired || state.signals.includes(signal)) return;
  state.signals.push(signal);
  save();
  maybeFire();
}

function maybeFire(): void {
  if (state.fired || state.ms < ENGAGED_SECONDS * 1000 || state.signals.length === 0) return;
  state.fired = true;
  save();

  const eventId = newEventId();
  const engagedSeconds = Math.round(state.ms / 1000);
  const signals = [...state.signals];

  trackFleetPixel(
    "EngagedVisit",
    { content_name: "engaged_visit", engaged_seconds: engagedSeconds, signals: signals.join(",") },
    eventId
  );
  if (FLEET_PIXEL_ID) {
    // keepalive: the visitor may leave right after qualifying (e.g. a CTA exit).
    void fetch("/api/visit-quality", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ eventId, engagedSeconds, signals }),
      keepalive: true,
    }).catch(() => {});
  }
  capture("engaged_visit_qualified", {
    engaged_seconds: engagedSeconds,
    signals,
    meta_event_id: eventId,
  });
}

function onInput(): void {
  lastInputAt = Date.now();
}

function onScroll(): void {
  lastInputAt = Date.now();
  if (lastInputAt - lastScrollCheckAt < SCROLL_THROTTLE_MS) return;
  lastScrollCheckAt = lastInputAt;
  checkScrollDepth();
}

function checkScrollDepth(): void {
  if (state.fired || state.signals.includes("deep_scroll")) return;
  const pageHeight = document.documentElement.scrollHeight;
  const viewport = window.innerHeight;
  if (pageHeight < viewport * MIN_PAGE_VIEWPORTS) return;
  if ((window.scrollY + viewport) / pageHeight >= DEEP_SCROLL_RATIO) addSignal("deep_scroll");
}

function tick(): void {
  if (state.fired) return;
  if (document.visibilityState !== "visible") return;
  if (Date.now() - lastInputAt > ACTIVE_WINDOW_MS) return;
  state.ms += TICK_MS;
  if (state.ms % 5000 === 0) save();
  maybeFire();
}

function onAnalyticsEvent(event: SiteAnalyticsEvent, properties?: Record<string, unknown>): void {
  const signal = INTENT_EVENTS[event];
  if (!signal) return;
  // Autoplaying videos start without the visitor choosing to watch.
  if (event === "video_started" && properties?.autoplay === true) return;
  if (
    event === "outbound_link_clicked" &&
    !CTA_DESTINATIONS.has(String(properties?.destination_kind))
  ) {
    return;
  }
  addSignal(signal);
}

/** Call on every page view (first load + client-side route changes). */
export function noteEngagedVisitPage(pathname: string): void {
  if (INTENT_PATH.test(pathname)) addSignal("intent_page");
}

/** Start tracking; returns the stop function. No-op for automated browsers. */
export function startEngagedVisitTracking(): () => void {
  if (typeof window === "undefined" || running || navigator.webdriver) return () => {};
  load();
  if (state.fired) return () => {};

  running = true;
  // A fresh arrival counts as active, so the first seconds of reading are credited.
  lastInputAt = Date.now();

  const opts: AddEventListenerOptions = { passive: true };
  const inputEvents = ["pointerdown", "pointermove", "keydown", "wheel", "touchstart"] as const;
  for (const type of inputEvents) window.addEventListener(type, onInput, opts);
  window.addEventListener("scroll", onScroll, opts);
  window.addEventListener("pagehide", save);
  const interval = window.setInterval(tick, TICK_MS);
  const unsubscribe = onCapture(onAnalyticsEvent);

  noteEngagedVisitPage(window.location.pathname);
  // A scroll made before hydration (or a restored position on reload) fired no
  // event we saw.
  checkScrollDepth();

  return () => {
    running = false;
    for (const type of inputEvents) window.removeEventListener(type, onInput);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("pagehide", save);
    window.clearInterval(interval);
    unsubscribe();
    save();
  };
}
