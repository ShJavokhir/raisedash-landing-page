/**
 * Helpers for links that hand off to another app (t.me → Telegram, mailto: → the
 * mail app). Some in-app browsers (Instagram on Android above all) swallow the
 * hand-off: the tap does nothing, so the visitor taps again and again. These let
 * a page notice that and offer a way that works (copy the address, open the page
 * in Chrome).
 */

/** Facebook / Instagram in-app browsers. */
export const IN_APP_UA = /Instagram|FBAN|FBAV|FB_IAB/;

export function inAppBrowser(): { inApp: boolean; androidInApp: boolean } {
  const ua = navigator.userAgent;
  const inApp = IN_APP_UA.test(ua);
  return { inApp, androidInApp: inApp && /Android/i.test(ua) };
}

/** Still on the page, visible, this long after a tap = the other app didn't open. */
const HANDOFF_MS = 2500;

/**
 * Call right after a tap that should leave for another app. Calls `onStuck` if
 * the page is still visible HANDOFF_MS later and never unloaded or went hidden.
 * With `requireFocus`, the page must also still have focus: on a desktop a mail
 * app opens in front without hiding the browser tab, but it takes the focus.
 * `onEnd` runs once when the watch ends for any reason. Returns a cancel function.
 */
export function watchHandoff(
  onStuck: () => void,
  { requireFocus = false, onEnd }: { requireFocus?: boolean; onEnd?: () => void } = {}
): () => void {
  let left = false;
  let ended = false;
  const onHidden = () => {
    if (document.visibilityState === "hidden") stop();
  };
  const onBlur = () => {
    if (requireFocus) left = true;
  };
  const timer = window.setTimeout(() => {
    stop();
    if (left || document.visibilityState !== "visible") return;
    if (requireFocus && !document.hasFocus()) return;
    onStuck();
  }, HANDOFF_MS);
  document.addEventListener("visibilitychange", onHidden);
  window.addEventListener("blur", onBlur);
  window.addEventListener("beforeunload", stop);
  window.addEventListener("pagehide", stop);
  function stop() {
    window.clearTimeout(timer);
    document.removeEventListener("visibilitychange", onHidden);
    window.removeEventListener("blur", onBlur);
    window.removeEventListener("beforeunload", stop);
    window.removeEventListener("pagehide", stop);
    if (!ended) {
      ended = true;
      onEnd?.();
    }
  }
  return stop;
}

/** A plain left click (a new-tab click leaves this page visible on purpose). */
export function isPlainClick(event: {
  button: number;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
}): boolean {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey;
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // In-app browsers often block the async clipboard; fall back to a selection copy.
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    field.remove();
    return ok;
  }
}

/**
 * Escape hatch out of the Android in-app browser: Chrome opens this same page
 * (query string included, e.g. ?product=), where hand-offs work normally.
 */
export function chromeIntentLink(): string {
  if (typeof window === "undefined") return "";
  const { host, pathname, search } = window.location;
  return `intent://${host}${pathname}${search}#Intent;scheme=https;package=com.android.chrome;end`;
}

/** AbortSignal.timeout is missing before Safari 16 (old iPhones' in-app browsers). */
export function timeoutSignal(ms: number): AbortSignal {
  if (typeof AbortSignal.timeout === "function") return AbortSignal.timeout(ms);
  const controller = new AbortController();
  window.setTimeout(() => controller.abort(), ms);
  return controller.signal;
}
