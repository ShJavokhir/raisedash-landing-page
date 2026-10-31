import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Copy, X } from "lucide-react";
import {
  chromeIntentLink,
  copyText,
  inAppBrowser,
  IN_APP_UA,
  isPlainClick,
  watchHandoff,
} from "@/lib/handoff";
import { capture } from "@/lib/site-analytics";
import { noteTelegramTap, type TelegramKind } from "@/lib/telegram-tap";
import { useCopy } from "@/components/i18n/LocaleProvider";
import { sharedCopy } from "@/i18n/shared";

/**
 * Links to Telegram that don't strand anyone. Some in-app browsers (Instagram
 * on Android above all) swallow the t.me hand-off: the tap does nothing, or the
 * visitor lands on t.me, can't get into the app and comes back. TelegramLink
 * stays a plain same-tab <a href> (site-autotrack still classifies it, and a new
 * tab would keep this page visible and look like a failed hand-off), records the
 * tap, and watches for the hand-off; TelegramHelp, rendered once per page and
 * kind, then shows how to reach us by hand.
 *
 * Two kinds: "bot" (@raisedashbot, the PTI page) and "sales" (@raisedash, our
 * team, on /get-a-demo).
 */

// The help copy for each kind (intro + steps) lives in src/i18n/shared.ts.
const TARGETS = {
  bot: { username: "raisedashbot" },
  sales: { username: "raisedash" },
} as const;

export const BOT_USERNAME = TARGETS.bot.username;
export const BOT_LINK = telegramLink("bot");

function telegramLink(kind: TelegramKind): string {
  return `https://t.me/${TARGETS[kind].username}`;
}

/** Back on the page (reload / back button) this soon after a tap = probably didn't get in. */
const RETURN_MS = 2 * 60 * 1000;

type HelpReason = "no_handoff" | "returned";

const helpListeners = new Set<(kind: TelegramKind, reason: HelpReason) => void>();
let watching = false;

const tapKey = (kind: TelegramKind) => (kind === "bot" ? "rd_bot_tap_at" : `rd_${kind}_tap_at`);

/** After a tap: show the help unless the page is hidden or unloads soon. */
function watchTap(kind: TelegramKind): void {
  try {
    window.sessionStorage.setItem(tapKey(kind), String(Date.now()));
  } catch {
    // Best-effort: only the "came back" check needs it.
  }
  // Repeat taps keep the first watch running: restarting it on every tap would
  // never let a rage-tapper (taps < 2.5s apart) see the help.
  if (watching) return;
  watching = true;
  watchHandoff(
    () => {
      for (const listener of helpListeners) listener(kind, "no_handoff");
    },
    { onEnd: () => (watching = false) }
  );
}

/** Takes (and clears) a recent tap timestamp, so the "came back" help shows once. */
function takeRecentTap(kind: TelegramKind): boolean {
  try {
    const at = Number(window.sessionStorage.getItem(tapKey(kind)));
    window.sessionStorage.removeItem(tapKey(kind));
    return at > 0 && Date.now() - at < RETURN_MS;
  } catch {
    return false;
  }
}

export function TelegramLink({
  kind,
  placement,
  product,
  className,
  children,
}: {
  kind: TelegramKind;
  /** Names the link in analytics: hero, free_plan, get_a_demo, help. */
  placement: string;
  /** Product slug the visitor came for, if any (e.g. samsara-alerts). */
  product?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={telegramLink(kind)}
      className={className}
      onClick={(event) => {
        noteTelegramTap(kind, placement, product);
        // A new-tab click leaves this page visible on purpose.
        if (isPlainClick(event)) watchTap(kind);
      }}
    >
      {children}
    </a>
  );
}

export function TelegramBotLink(props: {
  placement: string;
  className?: string;
  children: ReactNode;
}) {
  return <TelegramLink kind="bot" {...props} />;
}

const primaryLink =
  "bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";
const secondaryLink =
  "border-border text-foreground hover:bg-surface-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

function HelpDialog({
  kind,
  product,
  alternative,
  onClose,
}: {
  kind: TelegramKind;
  product?: string;
  alternative?: (close: () => void) => ReactNode;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);
  const [browser] = useState(inAppBrowser);
  const t = useCopy(sharedCopy).telegramHelp;
  const { username } = TARGETS[kind];
  const { intro, steps } = t[kind];

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    // showModal is missing before Safari 15.4 (old iPhones' in-app browsers);
    // a plain open dialog still shows the help there.
    if (typeof dialog?.showModal === "function") dialog.showModal();
    else dialog?.setAttribute("open", "");
    document.body.style.overflow = "hidden";
    return () => {
      if (typeof dialog?.close === "function") dialog.close();
      else dialog?.removeAttribute("open");
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="telegram-help-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="bg-card text-foreground fixed inset-0 z-50 m-auto h-fit max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-md overflow-y-auto rounded-xs border-0 p-0 shadow-xl backdrop:bg-black/60"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 id="telegram-help-title" className="text-xl font-normal tracking-tight">
            {t.title}
          </h2>
          <button
            type="button"
            aria-label={t.close}
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground focus-visible:outline-ring -mt-2 -mr-3 inline-flex min-h-11 min-w-11 items-center justify-center rounded-xs focus-visible:outline-2"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{intro}</p>

        <ol className="mt-5 space-y-3 text-sm leading-relaxed">
          {steps.map((step, index) => (
            <li key={step} className="flex gap-3">
              <span className="bg-surface-2 text-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs tabular-nums">
                {index + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>

        <div className="border-border mt-5 flex items-center justify-between gap-3 rounded-xs border py-1.5 pr-1.5 pl-4">
          <span className="text-foreground font-mono text-base select-all">@{username}</span>
          <button
            type="button"
            onClick={async () => {
              if (await copyText(`@${username}`)) {
                setCopied(true);
                capture("telegram_username_copied", { in_app: browser.inApp, kind });
              }
            }}
            className="bg-surface-2 hover:bg-surface-3 text-foreground focus-visible:outline-ring inline-flex min-h-11 items-center gap-2 rounded-xs px-4 text-sm focus-visible:outline-2"
          >
            {copied ? (
              <Check className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4" aria-hidden="true" />
            )}
            {copied ? t.copied : t.copy}
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <TelegramLink kind={kind} placement="help" product={product} className={primaryLink}>
            {t.retry}
          </TelegramLink>
          {browser.androidInApp && (
            <a href={chromeIntentLink()} className={secondaryLink}>
              {t.openInChrome}
            </a>
          )}
        </div>
        {browser.inApp && !browser.androidInApp && (
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{t.openInBrowser}</p>
        )}
        {alternative?.(onClose)}
      </div>
    </dialog>
  );
}

/**
 * Render once per page (per kind) that uses TelegramLink. `alternative` adds a
 * page-specific way out under the help (e.g. email or a form instead).
 */
export function TelegramHelp({
  kind,
  product,
  alternative,
}: {
  kind: TelegramKind;
  product?: string;
  alternative?: (close: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  useEffect(() => {
    const show = (tapped: TelegramKind, reason: HelpReason) => {
      if (tapped !== kind || openRef.current) return;
      openRef.current = true;
      setOpen(true);
      capture("telegram_help_shown", { reason, in_app: IN_APP_UA.test(navigator.userAgent), kind });
    };
    helpListeners.add(show);

    // Came back from t.me without getting into Telegram (a reload, or the back
    // button restoring this page from the bfcache).
    const onPageShow = () => {
      if (takeRecentTap(kind)) show(kind, "returned");
    };
    onPageShow();
    window.addEventListener("pageshow", onPageShow);
    return () => {
      helpListeners.delete(show);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [kind]);

  return open ? (
    <HelpDialog
      kind={kind}
      product={product}
      alternative={alternative}
      onClose={() => {
        openRef.current = false;
        setOpen(false);
      }}
    />
  ) : null;
}

export function TelegramBotHelp() {
  return <TelegramHelp kind="bot" />;
}
