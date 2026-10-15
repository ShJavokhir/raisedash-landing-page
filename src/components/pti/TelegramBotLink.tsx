import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Copy, X } from "lucide-react";
import { noteBotTap } from "@/lib/bot-tap";
import { capture } from "@/lib/site-analytics";

/**
 * Links to @raisedashbot that don't strand anyone. Some in-app browsers
 * (Instagram on Android above all) swallow the t.me hand-off: the tap does
 * nothing, or the visitor lands on t.me, can't get into the app and comes back.
 * TelegramBotLink stays a plain <a href> (site-autotrack still classifies it as
 * telegram_bot), records the tap, and watches for the hand-off; TelegramBotHelp,
 * rendered once per page, then shows how to add the bot by hand.
 */

export const BOT_USERNAME = "raisedashbot";
export const BOT_LINK = `https://t.me/${BOT_USERNAME}`;

const TAP_KEY = "rd_bot_tap_at";
/** Still on the page, visible, this long after a tap = Telegram didn't open. */
const HANDOFF_MS = 2500;
/** Back on the page (reload / back button) this soon after a tap = probably didn't get in. */
const RETURN_MS = 2 * 60 * 1000;

type HelpReason = "no_handoff" | "returned";

const helpListeners = new Set<(reason: HelpReason) => void>();
let stopWatching = () => {};

/** After a tap: show the help unless the page is hidden or unloads soon. */
function watchHandoff(): void {
  try {
    window.sessionStorage.setItem(TAP_KEY, String(Date.now()));
  } catch {
    // Best-effort: only the "came back" check needs it.
  }
  stopWatching();
  const onHidden = () => {
    if (document.visibilityState === "hidden") stopWatching();
  };
  const onLeave = () => stopWatching();
  const timer = window.setTimeout(() => {
    stopWatching();
    if (document.visibilityState === "visible") {
      for (const listener of helpListeners) listener("no_handoff");
    }
  }, HANDOFF_MS);
  document.addEventListener("visibilitychange", onHidden);
  window.addEventListener("beforeunload", onLeave);
  window.addEventListener("pagehide", onLeave);
  stopWatching = () => {
    window.clearTimeout(timer);
    document.removeEventListener("visibilitychange", onHidden);
    window.removeEventListener("beforeunload", onLeave);
    window.removeEventListener("pagehide", onLeave);
    stopWatching = () => {};
  };
}

/** Takes (and clears) a recent tap timestamp, so the "came back" help shows once. */
function takeRecentTap(): boolean {
  try {
    const at = Number(window.sessionStorage.getItem(TAP_KEY));
    window.sessionStorage.removeItem(TAP_KEY);
    return at > 0 && Date.now() - at < RETURN_MS;
  } catch {
    return false;
  }
}

export function TelegramBotLink({
  placement,
  className,
  children,
}: {
  /** Names the link in analytics: hero, free_plan, help. */
  placement: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={BOT_LINK}
      className={className}
      onClick={(event) => {
        noteBotTap(placement);
        // A new-tab click leaves this page visible on purpose.
        if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey) {
          watchHandoff();
        }
      }}
    >
      {children}
    </a>
  );
}

const IN_APP_UA = /Instagram|FBAN|FBAV|FB_IAB/;

const primaryLink =
  "bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";
const secondaryLink =
  "border-border text-foreground hover:bg-surface-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

async function copyText(text: string): Promise<boolean> {
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

function HelpDialog({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);
  const [browser] = useState(() => {
    const ua = navigator.userAgent;
    const inApp = IN_APP_UA.test(ua);
    return { inApp, androidInApp: inApp && /Android/i.test(ua) };
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Escape hatch out of the Android in-app browser: Chrome opens this same page,
  // where t.me hands off to Telegram normally.
  const chromeLink =
    typeof window === "undefined"
      ? ""
      : `intent://${window.location.host}${window.location.pathname}#Intent;scheme=https;package=com.android.chrome;end`;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="telegram-help-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="bg-card text-foreground fixed inset-0 m-auto h-fit max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-md overflow-y-auto rounded-xs border-0 p-0 shadow-xl backdrop:bg-black/60"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 id="telegram-help-title" className="text-xl font-normal tracking-tight">
            Telegram didn’t open?
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground focus-visible:outline-ring -mt-2 -mr-3 inline-flex min-h-11 min-w-11 items-center justify-center rounded-xs focus-visible:outline-2"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          Add the bot to your driver group yourself. It takes a minute.
        </p>

        <ol className="mt-5 space-y-3 text-sm leading-relaxed">
          {[
            "Open Telegram and go to your driver group.",
            "Tap the group name at the top, then Add Members.",
            `Search for @${BOT_USERNAME} and add it.`,
          ].map((step, index) => (
            <li key={step} className="flex gap-3">
              <span className="bg-surface-2 text-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs tabular-nums">
                {index + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>

        <div className="border-border mt-5 flex items-center justify-between gap-3 rounded-xs border py-1.5 pr-1.5 pl-4">
          <span className="text-foreground font-mono text-base select-all">@{BOT_USERNAME}</span>
          <button
            type="button"
            onClick={async () => {
              if (await copyText(`@${BOT_USERNAME}`)) {
                setCopied(true);
                capture("telegram_username_copied", { in_app: browser.inApp });
              }
            }}
            className="bg-surface-2 hover:bg-surface-3 text-foreground focus-visible:outline-ring inline-flex min-h-11 items-center gap-2 rounded-xs px-4 text-sm focus-visible:outline-2"
          >
            {copied ? (
              <Check className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4" aria-hidden="true" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <TelegramBotLink placement="help" className={primaryLink}>
            Try Telegram again
          </TelegramBotLink>
          {browser.androidInApp && (
            <a href={chromeLink} className={secondaryLink}>
              Open this page in Chrome
            </a>
          )}
        </div>
        {browser.inApp && !browser.androidInApp && (
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            Or open this page in your browser: tap the ⋯ menu at the top, then open in browser.
          </p>
        )}
      </div>
    </dialog>
  );
}

/** Render once per page that uses TelegramBotLink. */
export function TelegramBotHelp() {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  useEffect(() => {
    const show = (reason: HelpReason) => {
      if (openRef.current) return;
      openRef.current = true;
      setOpen(true);
      capture("telegram_help_shown", { reason, in_app: IN_APP_UA.test(navigator.userAgent) });
    };
    helpListeners.add(show);

    // Came back from t.me without getting into Telegram (a reload, or the back
    // button restoring this page from the bfcache).
    const onPageShow = () => {
      if (takeRecentTap()) show("returned");
    };
    onPageShow();
    window.addEventListener("pageshow", onPageShow);
    return () => {
      helpListeners.delete(show);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  return open ? (
    <HelpDialog
      onClose={() => {
        openRef.current = false;
        setOpen(false);
      }}
    />
  ) : null;
}
