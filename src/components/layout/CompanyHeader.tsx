import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useCopy } from "@/components/i18n/LocaleProvider";
import { sharedCopy } from "@/i18n/shared";

export function CompanyHeader() {
  const t = useCopy(sharedCopy).header;

  return (
    <header className="bg-background relative z-50 sm:sticky sm:top-0">
      <Container>
        <div className="border-border flex min-h-20 flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b py-4">
          <Link
            href="/"
            aria-label={t.home}
            className="text-foreground inline-flex min-h-11 items-center gap-2 text-xl font-medium tracking-tight"
          >
            <Image src="/logo.webp" alt="" width={28} height={28} />
            Raisedash
          </Link>
          {/* Only on translated pages: beside the logo on phones (the
              links wrap to their own row there), after the links from sm up. */}
          <LanguageSwitcher className="ml-auto sm:order-last sm:ml-0" />
          <nav
            aria-label={t.nav}
            className="text-muted-foreground order-last flex w-full flex-wrap items-center gap-x-5 text-sm sm:order-none sm:ml-auto sm:w-auto sm:gap-x-8"
          >
            <Link
              href="/#products"
              className="hover:text-foreground inline-flex min-h-11 items-center"
            >
              {t.products}
            </Link>
            <Link href="/about" className="hover:text-foreground inline-flex min-h-11 items-center">
              {t.about}
            </Link>
            <Link href="/blog" className="hover:text-foreground inline-flex min-h-11 items-center">
              {t.blog}
            </Link>
            <Link href="/contact" className="text-foreground inline-flex min-h-11 items-center">
              {t.contact}
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
