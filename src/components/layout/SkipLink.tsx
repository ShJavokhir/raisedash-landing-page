import { useCopy } from "@/components/i18n/LocaleProvider";
import { skipLinkLabel } from "@/i18n/skip-link";

/**
 * Skip Navigation Link for keyboard accessibility
 * Allows users to skip to main content without tabbing through navigation
 */
export function SkipLink() {
  const label = useCopy(skipLinkLabel);

  return (
    <a
      href="#main-content"
      className="focus:bg-primary focus:text-primary-foreground focus:ring-primary sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:px-4 focus:py-2 focus:ring-2 focus:ring-offset-2 focus:outline-none"
    >
      {label}
    </a>
  );
}

export default SkipLink;
