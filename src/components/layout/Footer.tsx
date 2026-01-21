import { Container } from "./Container";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-transparent mb-8 sm:mb-12">
      <div>
        <Container className="rounded-2xl border border-[#EEEBEA] dark:border-border bg-white dark:bg-card py-8 px-8 sm:py-12 sm:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            {/* Brand Section */}
            <div className="sm:col-span-2 md:col-span-2">
              <h3 className="text-lg font-semibold text-[#2E2D2D] dark:text-foreground mb-4">
                Raisedash
              </h3>
              <p className="text-[rgba(24,23,23,0.7)] dark:text-muted-foreground mb-6 max-w-md text-sm sm:text-base leading-relaxed">
                Strengthening safety and security of corporations in freight logistics.
                Get started in days, not months.
              </p>
              <div className="flex items-center gap-2 text-sm text-[rgba(24,23,23,0.7)] dark:text-muted-foreground">
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
                <span>Need help? <a href="mailto:support@raisedash.com" className="text-[#2E2D2D] dark:text-foreground hover:text-[#181717] dark:hover:text-foreground hover:underline transition-colors">support@raisedash.com</a></span>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-medium text-[#2E2D2D] dark:text-foreground mb-4 text-sm sm:text-base">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-[rgba(24,23,23,0.7)] dark:text-muted-foreground hover:text-[#181717] dark:hover:text-foreground hover:underline transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-[rgba(24,23,23,0.7)] dark:text-muted-foreground hover:text-[#181717] dark:hover:text-foreground hover:underline transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/changelogs"
                    className="text-[rgba(24,23,23,0.7)] dark:text-muted-foreground hover:text-[#181717] dark:hover:text-foreground hover:underline transition-colors"
                  >
                    Changelog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-[rgba(24,23,23,0.7)] dark:text-muted-foreground hover:text-[#181717] dark:hover:text-foreground hover:underline transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-[rgba(24,23,23,0.7)] dark:text-muted-foreground hover:text-[#181717] dark:hover:text-foreground hover:underline transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-medium text-[#2E2D2D] dark:text-foreground mb-4 text-sm sm:text-base">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/terms-of-use"
                    className="text-[rgba(24,23,23,0.7)] dark:text-muted-foreground hover:text-[#181717] dark:hover:text-foreground hover:underline transition-colors"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-[rgba(24,23,23,0.7)] dark:text-muted-foreground hover:text-[#181717] dark:hover:text-foreground hover:underline transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/security"
                    className="text-[rgba(24,23,23,0.7)] dark:text-muted-foreground hover:text-[#181717] dark:hover:text-foreground hover:underline transition-colors"
                  >
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-[#EEEBEA] dark:border-border">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-[rgba(24,23,23,0.7)] dark:text-muted-foreground">
                <span>&copy; {new Date().getFullYear()} Raisedash</span>
                <span className="hidden sm:inline text-[#EEEBEA] dark:text-border">|</span>
                <span>All rights reserved</span>
                <span className="hidden sm:inline text-[#EEEBEA] dark:text-border">|</span>
                <span className="hidden sm:inline">415 Mission St, San Francisco, CA 94105</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-emerald-600 font-medium">All Systems Operational</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
