import { useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy } from "lucide-react";
import { TelegramHelp, TelegramLink } from "@/components/telegram/TelegramLink";
import { bookingUrl, emails } from "@/data/site";
import { copyText, IN_APP_UA, isPlainClick, watchHandoff } from "@/lib/handoff";
import { capture } from "@/lib/site-analytics";

/**
 * The ways to reach our team, as one list: Telegram, email, a cal.com call and a
 * form. /get-a-demo and /contact both render it, so every way in has the same
 * choices and the same in-app browser fallbacks. Each page brings its own copy
 * and its own form (they post to different places).
 *
 * The form stays hidden until the visitor picks "Leave your details", so the ways
 * to reach us get equal weight. Once opened it stays mounted, so going back to the
 * options doesn't throw away anything already typed. The booking link opens
 * cal.com in a new tab rather than an embedded calendar: a plain page works in
 * every in-app browser.
 */

export interface ContactChoicesCopy {
  choices: {
    aria: string;
    telegram: string;
    email: string;
    booking: string;
    bookingNote: string;
    details: string;
    detailsNote: string;
  };
  emailHelp: { body: string; copy: string; copied: string };
  back: string;
  formSectionAria: string;
  telegramHelp: { noTelegram: (email: string) => string; leaveDetails: string };
}

const choiceClass =
  "group flex min-h-20 w-full items-center gap-4 border-b border-border py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

export function ContactChoices({
  placement,
  product,
  copy,
  emailSubject,
  formId,
  focusIds,
  onFormOpen,
  children,
}: {
  /** Names the page in analytics and on the Telegram tap. */
  placement: "get_a_demo" | "contact";
  /** Product slug the visitor came for, if any (e.g. samsara-alerts). */
  product?: string;
  copy: ContactChoicesCopy;
  emailSubject: string;
  /** id of the section that holds the form. */
  formId: string;
  /** Focused when the form opens, first one found wins (first field, then the sent state). */
  focusIds: string[];
  /** The page's own analytics for opening the form. */
  onFormOpen?: () => void;
  /** The form. */
  children: ReactNode;
}) {
  const emailHref = `mailto:${emails.sales}?subject=${encodeURIComponent(emailSubject)}`;
  const [formOpen, setFormOpen] = useState(false);
  const [formMounted, setFormMounted] = useState(false);
  // Set when a mailto tap opened nothing (some in-app browsers drop it).
  const [emailStuck, setEmailStuck] = useState(false);
  const emailWatching = useRef(false);
  const choicesRef = useRef<HTMLElement>(null);

  function openForm() {
    setFormMounted(true);
    setFormOpen(true);
    onFormOpen?.();
    requestAnimationFrame(() => {
      document.getElementById(formId)?.scrollIntoView({ block: "nearest" });
      for (const id of focusIds) {
        const target = document.getElementById(id);
        if (target) {
          target.focus({ preventScroll: true });
          break;
        }
      }
    });
  }

  function closeForm() {
    setFormOpen(false);
    requestAnimationFrame(() =>
      choicesRef.current?.querySelector<HTMLElement>("a,button")?.focus()
    );
  }

  return (
    <>
      <nav
        ref={choicesRef}
        aria-label={copy.choices.aria}
        hidden={formOpen}
        className="mt-8 sm:mt-10"
      >
        {/* Same tab on purpose: TelegramLink spots a hand-off the in-app
            browser swallowed by the page staying visible. */}
        <TelegramLink kind="sales" placement={placement} product={product} className={choiceClass}>
          <TelegramLogo className="h-7 w-7 shrink-0" />
          <span className="flex-1">
            <span className="text-foreground block text-base">{copy.choices.telegram}</span>
            <span className="text-muted-foreground mt-1 block text-sm">@raisedash</span>
          </span>
          <ArrowUpRight
            className="text-muted-foreground group-hover:text-foreground h-4 w-4 shrink-0"
            aria-hidden="true"
          />
        </TelegramLink>
        <a
          href={emailHref}
          className={choiceClass}
          onClick={(event) => {
            // Repeat taps keep the first watch, so a rage-tapper still gets the help.
            if (!isPlainClick(event) || emailStuck || emailWatching.current) return;
            emailWatching.current = true;
            watchHandoff(
              () => {
                setEmailStuck(true);
                capture("email_help_shown", {
                  in_app: IN_APP_UA.test(navigator.userAgent),
                  form: placement,
                  product,
                });
              },
              { requireFocus: true, onEnd: () => (emailWatching.current = false) }
            );
          }}
        >
          <MailFilled className="text-foreground/70 h-7 w-7 shrink-0 p-0.5" />
          <span className="min-w-0 flex-1">
            <span className="text-foreground block text-base">{copy.choices.email}</span>
            <span className="text-muted-foreground mt-1 block text-sm">{emails.sales}</span>
          </span>
          <ArrowUpRight
            className="text-muted-foreground group-hover:text-foreground h-4 w-4 shrink-0"
            aria-hidden="true"
          />
        </a>
        {emailStuck && <EmailHelp copy={copy.emailHelp} placement={placement} product={product} />}
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={choiceClass}
          onClick={() => capture("scheduling_link_clicked", { form: placement, product })}
        >
          <CalendarFilled className="text-foreground/70 h-7 w-7 shrink-0 p-0.5" />
          <span className="flex-1">
            <span className="text-foreground block text-base">{copy.choices.booking}</span>
            <span className="text-muted-foreground mt-1 block text-sm">
              {copy.choices.bookingNote}
            </span>
          </span>
          <ArrowUpRight
            className="text-muted-foreground group-hover:text-foreground h-4 w-4 shrink-0"
            aria-hidden="true"
          />
        </a>
        <button
          type="button"
          className={choiceClass}
          aria-controls={formId}
          aria-expanded={formOpen}
          onClick={openForm}
        >
          <ChatFilled className="text-foreground/70 h-7 w-7 shrink-0 p-0.5" />
          <span className="flex-1">
            <span className="text-foreground block text-base">{copy.choices.details}</span>
            <span className="text-muted-foreground mt-1 block text-sm">
              {copy.choices.detailsNote}
            </span>
          </span>
          <ArrowRight
            className="text-muted-foreground group-hover:text-foreground h-4 w-4 shrink-0"
            aria-hidden="true"
          />
        </button>
      </nav>

      {formMounted && (
        <div hidden={!formOpen} className="mt-8 sm:mt-10">
          <button
            type="button"
            onClick={closeForm}
            className="text-muted-foreground hover:text-foreground focus-visible:outline-ring mb-4 inline-flex min-h-11 items-center gap-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {copy.back}
          </button>
          <section
            id={formId}
            aria-label={copy.formSectionAria}
            className="bg-card scroll-mt-28 rounded-sm p-6 sm:p-8"
          >
            {children}
          </section>
        </div>
      )}

      <TelegramHelp
        kind="sales"
        product={product}
        alternative={(close) => (
          <div className="border-border mt-6 border-t pt-5">
            <p className="text-muted-foreground text-sm leading-relaxed">
              {copy.telegramHelp.noTelegram(emails.sales)}
            </p>
            <button
              type="button"
              onClick={() => {
                close();
                openForm();
              }}
              className="text-foreground focus-visible:outline-ring mt-2 inline-flex min-h-11 items-center gap-2 text-sm underline underline-offset-4 focus-visible:outline-2"
            >
              {copy.telegramHelp.leaveDetails} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
      />
    </>
  );
}

/** Shown under "Email us" when the tap opened no mail app. */
function EmailHelp({
  copy,
  placement,
  product,
}: {
  copy: ContactChoicesCopy["emailHelp"];
  placement: string;
  product?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <div role="status" className="border-border border-b py-5">
      <p className="text-foreground text-sm leading-relaxed">{copy.body}</p>
      <div className="border-border mt-3 flex items-center justify-between gap-3 rounded-xs border py-1.5 pr-1.5 pl-4">
        <span className="text-foreground min-w-0 truncate font-mono text-base select-all">
          {emails.sales}
        </span>
        <button
          type="button"
          onClick={async () => {
            if (await copyText(emails.sales)) {
              setCopied(true);
              capture("email_address_copied", {
                in_app: IN_APP_UA.test(navigator.userAgent),
                form: placement,
                product,
              });
            }
          }}
          className="bg-surface-2 hover:bg-surface-3 text-foreground focus-visible:outline-ring inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xs px-4 text-sm focus-visible:outline-2"
        >
          {copied ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4" aria-hidden="true" />
          )}
          {copied ? copy.copied : copy.copy}
        </button>
      </div>
    </div>
  );
}

/** Telegram's mark: brand-blue circle, white plane. */
function TelegramLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#fff" />
      <path
        fill="#26a5e4"
        d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
      />
    </svg>
  );
}

function MailFilled({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
      <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
    </svg>
  );
}

/** A filled calendar page with two rows of days cut out. */
function CalendarFilled({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M7.5 1.5a.75.75 0 0 1 .75.75V3.5h7.5V2.25a.75.75 0 0 1 1.5 0V3.5h1.5a3 3 0 0 1 3 3v1.25H1.75V6.5a3 3 0 0 1 3-3h2V2.25a.75.75 0 0 1 .75-.75Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.75 9.25h20.5v9.5a3 3 0 0 1-3 3H4.75a3 3 0 0 1-3-3v-9.5ZM6 12h2.5v2.5H6V12Zm4.75 0h2.5v2.5h-2.5V12Zm4.75 0H18v2.5h-2.5V12ZM6 16.25h2.5v2.5H6v-2.5Zm4.75 0h2.5v2.5h-2.5v-2.5Z"
      />
    </svg>
  );
}

function ChatFilled({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z"
      />
    </svg>
  );
}
