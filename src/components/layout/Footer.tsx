import { Container } from "./Container";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-transparent mb-8 sm:mb-12">
      <div>
        <Container className="rounded-xs border border-border bg-card py-8 px-8 sm:py-12 sm:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 sm:gap-10">
            {/* Brand Section */}
            <div className="sm:col-span-2 md:col-span-2">
              <h3 className="text-base font-normal text-foreground mb-4">
                Raisedash
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md text-sm leading-relaxed">
                Strengthening safety and security of corporations in freight logistics.
                Get started in days, not months.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg
                  className="w-4 h-4"
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
                <span>Need help? <a href="mailto:support@raisedash.com" className="text-foreground hover:text-foreground-80 transition-colors duration-[0.15s]">support@raisedash.com</a></span>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="font-normal text-sm text-muted-foreground mb-4 tracking-wide">Product</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/products/raisedash-shift"
                    className="text-sm text-foreground hover:text-foreground-80 transition-colors duration-[0.15s]"
                  >
                    Shift
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/raisedash-pti-inspections"
                    className="text-sm text-foreground hover:text-foreground-80 transition-colors duration-[0.15s]"
                  >
                    PTI
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/raisedash-vertex"
                    className="text-sm text-foreground hover:text-foreground-80 transition-colors duration-[0.15s]"
                  >
                    Vertex
                  </Link>
                </li>
                <li>
                  <Link
                    href="/request-demo"
                    className="text-sm text-foreground hover:text-foreground-80 transition-colors duration-[0.15s]"
                  >
                    Request Demo
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-normal text-sm text-muted-foreground mb-4 tracking-wide">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-foreground hover:text-foreground-80 transition-colors duration-[0.15s]"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-foreground hover:text-foreground-80 transition-colors duration-[0.15s]"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/changelogs"
                    className="text-sm text-foreground hover:text-foreground-80 transition-colors duration-[0.15s]"
                  >
                    Changelog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-sm text-foreground hover:text-foreground-80 transition-colors duration-[0.15s]"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-foreground hover:text-foreground-80 transition-colors duration-[0.15s]"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-normal text-sm text-muted-foreground mb-4 tracking-wide">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/terms-of-use"
                    className="text-sm text-foreground hover:text-foreground-80 transition-colors duration-[0.15s]"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-sm text-foreground hover:text-foreground-80 transition-colors duration-[0.15s]"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/security"
                    className="text-sm text-foreground hover:text-foreground-80 transition-colors duration-[0.15s]"
                  >
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                <span>&copy; {new Date().getFullYear()} Raisedash</span>
                <span className="hidden sm:inline text-border">|</span>
                <span>All rights reserved</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-success font-normal">All Systems Operational</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
