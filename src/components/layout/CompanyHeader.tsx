import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";

export function CompanyHeader() {
  return (
    <header className="bg-background relative z-50 sm:sticky sm:top-0">
      <Container>
        <div className="border-border flex min-h-20 flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b py-4">
          <Link
            href="/"
            aria-label="Raisedash home"
            className="text-foreground inline-flex min-h-11 items-center gap-2 text-xl font-medium tracking-tight"
          >
            <Image src="/logo.webp" alt="" width={28} height={28} />
            Raisedash
          </Link>
          <nav
            aria-label="Main navigation"
            className="text-muted-foreground flex flex-wrap items-center gap-x-5 text-sm sm:gap-x-8"
          >
            <Link
              href="/#products"
              className="hover:text-foreground inline-flex min-h-11 items-center"
            >
              Products
            </Link>
            <Link href="/about" className="hover:text-foreground inline-flex min-h-11 items-center">
              About
            </Link>
            <Link href="/blog" className="hover:text-foreground inline-flex min-h-11 items-center">
              Blog
            </Link>
            <Link href="/contact" className="text-foreground inline-flex min-h-11 items-center">
              Contact
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
