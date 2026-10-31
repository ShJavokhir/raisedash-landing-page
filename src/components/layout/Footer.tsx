import { Container } from "./Container";
import { AskAi } from "./AskAi";
import Link from "next/link";
import { footerLinks, emails } from "@/data/site";
import { useCopy, useLocalizePath } from "@/components/i18n/LocaleProvider";
import { sharedCopy } from "@/i18n/shared";

export function Footer() {
  const t = useCopy(sharedCopy).footer;
  // On a translated page, links to other translated pages stay in its language.
  const localize = useLocalizePath();

  return (
    <footer className="mb-8 w-full bg-transparent sm:mb-12">
      <div>
        <Container className="border-border bg-card rounded-xs border px-6 py-8 sm:px-12 sm:py-12">
          {/* Brand Section */}
          <div className="mb-10 max-w-md">
            <h3 className="text-foreground mb-4 text-base font-normal">Raisedash</h3>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{t.tagline}</p>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>
                {t.needHelp}{" "}
                <a
                  href={`mailto:${emails.support}`}
                  className="text-foreground hover:text-foreground-80 transition-colors duration-[0.15s]"
                >
                  {emails.support}
                </a>
              </span>
            </div>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 gap-8 gap-y-10 sm:grid-cols-4">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h4 className="text-muted-foreground mb-4 text-sm font-normal tracking-wide">
                  {t.sections[section.title] ?? section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground hover:text-foreground-80 text-sm transition-colors duration-[0.15s]"
                        >
                          {t.links[link.href] ?? link.title}
                        </a>
                      ) : (
                        <Link
                          href={localize(link.href)}
                          className="text-foreground hover:text-foreground-80 text-sm transition-colors duration-[0.15s]"
                        >
                          {t.links[link.href] ?? link.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <AskAi />

          {/* Bottom Section */}
          <div className="border-border mt-12 border-t pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="text-muted-foreground flex flex-col items-center gap-2 text-sm sm:flex-row sm:gap-4">
                <span>&copy; {new Date().getFullYear()} Raisedash</span>
                <span className="text-border hidden sm:inline">|</span>
                <span>{t.rights}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="bg-success h-2 w-2 animate-pulse rounded-full"></div>
                  <span className="text-foreground font-normal">{t.support}</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
