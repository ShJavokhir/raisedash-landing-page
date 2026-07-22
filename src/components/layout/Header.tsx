import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { features, platform, resources } from "@/data/navigation";

const SIGN_IN_URL = "https://app.raisedash.com/login";

const directLinks = [{ title: "Pricing", href: "/pricing" }];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);

  // Close mobile menu on Escape key and trap focus
  React.useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // On phones the sticky header ducks out of the way while scrolling down and
  // returns on the first scroll up, so the ~90px bar isn't parked over every
  // one of the page's ~15 viewports. Desktop (md+) keeps it always visible.
  const [hiddenOnScroll, setHiddenOnScroll] = React.useState(false);
  const lastScrollY = React.useRef(0);
  React.useEffect(() => {
    lastScrollY.current = window.scrollY;
    const handleScroll = () => {
      const y = Math.max(0, window.scrollY);
      const delta = y - lastScrollY.current;
      // Ignore sub-6px jitter (iOS momentum/rubber-band noise).
      if (Math.abs(delta) < 6) return;
      setHiddenOnScroll(delta > 0 && y > 140);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-4 z-50 w-full bg-transparent transition-transform duration-300 ease-out md:top-6",
        // Never duck away while the menu is open — the menu lives inside the
        // header.
        hiddenOnScroll && !mobileMenuOpen && "max-md:-translate-y-[calc(100%+1.5rem)]"
      )}
    >
      <div className="">
        <Container className="border-border dark:bg-card rounded-xs border bg-white px-4 sm:px-5">
          <div className="flex h-[60px] items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-foreground hover:text-foreground-80 flex items-center gap-2 text-xl font-normal tracking-[-0.02em] transition-colors duration-[0.15s]"
              >
                <Image src="/logo.webp" alt="Raisedash logo" width={28} height={28} />
                Raisedash
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex">
              <NavigationMenu>
                <NavigationMenuList className="gap-1">
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-foreground hover:text-foreground-80 bg-transparent px-4 py-2 text-base font-normal transition-colors duration-[0.15s]">
                      Platform
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[360px] space-y-0.5 p-1">
                        {platform.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.title}
                              href={item.href}
                              className="hover:bg-surface-3 flex items-start gap-3 rounded-xs p-3 transition-colors duration-[0.15s]"
                            >
                              <div className="border-border bg-background flex h-10 w-10 shrink-0 items-center justify-center rounded-xs border">
                                <Icon className="text-foreground h-5 w-5" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <span className="text-foreground text-sm font-normal">
                                  {item.title}
                                </span>
                                <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-foreground hover:text-foreground-80 bg-transparent px-4 py-2 text-base font-normal transition-colors duration-[0.15s]">
                      Features
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[360px] space-y-0.5 p-1">
                        {features.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.title}
                              href={item.href}
                              className="hover:bg-surface-3 flex items-start gap-3 rounded-xs p-3 transition-colors duration-[0.15s]"
                            >
                              <div className="border-border bg-background flex h-10 w-10 shrink-0 items-center justify-center rounded-xs border">
                                <Icon className="text-foreground h-5 w-5" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <span className="text-foreground text-sm font-normal">
                                  {item.title}
                                </span>
                                <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  {directLinks.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className="text-foreground hover:text-foreground-80 hover:bg-surface-3 flex items-center rounded-xs bg-transparent px-4 py-2 text-base font-normal transition-colors duration-[0.15s]"
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-foreground hover:text-foreground-80 bg-transparent px-4 py-2 text-base font-normal transition-colors duration-[0.15s]">
                      Resources
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[360px] space-y-0.5 p-1">
                        {resources.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.title}
                              href={item.href}
                              className="hover:bg-surface-3 flex items-start gap-3 rounded-xs p-3 transition-colors duration-[0.15s]"
                            >
                              <div className="border-border bg-background flex h-10 w-10 shrink-0 items-center justify-center rounded-xs border">
                                <Icon className="text-foreground h-5 w-5" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <span className="text-foreground text-sm font-normal">
                                  {item.title}
                                </span>
                                <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden items-center gap-3 md:flex">
              <ThemeToggle />
              <a href={SIGN_IN_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="sm">
                  Sign in
                </Button>
              </a>
              <Link href="/demo">
                <Button variant="primary" size="sm">
                  Book a demo
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <Link href="/demo">
                <Button variant="primary" size="sm">
                  Book a demo
                </Button>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="hover:bg-surface-3 rounded-xs p-2 transition-colors duration-[0.15s]"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
              >
                {mobileMenuOpen ? (
                  <X className="text-foreground h-5 w-5" />
                ) : (
                  <Menu className="text-foreground h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <nav
              id="mobile-navigation"
              role="navigation"
              aria-label="Mobile navigation"
              ref={mobileMenuRef}
              // The menu is taller than a phone viewport and the header is
              // sticky, so without its own scroll the bottom items (Sign in,
              // Book a demo, Theme) are unreachable. 8.5rem ≈ bar height +
              // the sticky top offset + a bottom peek gap.
              className="border-border max-h-[calc(100dvh-8.5rem)] overflow-y-auto overscroll-contain border-t md:hidden"
            >
              <div className="space-y-1 py-4">
                {/* Platform Section */}
                <div className="px-3 py-2 pt-4">
                  <span className="text-muted-foreground text-xs font-normal tracking-wide uppercase">
                    Platform
                  </span>
                </div>
                {platform.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="text-foreground hover:bg-surface-3 mx-2 flex items-center gap-3 rounded-xs px-3 py-2.5 text-sm transition-colors duration-[0.15s]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="border-border bg-background flex h-8 w-8 shrink-0 items-center justify-center rounded-xs border">
                        <Icon className="text-foreground h-4 w-4" />
                      </div>
                      <span className="font-normal">{item.title}</span>
                    </Link>
                  );
                })}

                {/* Features Section */}
                <div className="px-3 py-2 pt-4">
                  <span className="text-muted-foreground text-xs font-normal tracking-wide uppercase">
                    Features
                  </span>
                </div>
                {features.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="text-foreground hover:bg-surface-3 mx-2 flex items-center gap-3 rounded-xs px-3 py-2.5 text-sm transition-colors duration-[0.15s]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="border-border bg-background flex h-8 w-8 shrink-0 items-center justify-center rounded-xs border">
                        <Icon className="text-foreground h-4 w-4" />
                      </div>
                      <span className="font-normal">{item.title}</span>
                    </Link>
                  );
                })}

                {/* Direct Links */}
                {directLinks.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="text-foreground hover:bg-surface-3 mx-2 mt-3 flex items-center gap-3 rounded-xs px-3 py-2.5 text-sm transition-colors duration-[0.15s]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-normal">{item.title}</span>
                  </Link>
                ))}

                {/* Resources Section */}
                <div className="px-3 py-2 pt-4">
                  <span className="text-muted-foreground text-xs font-normal tracking-wide uppercase">
                    Resources
                  </span>
                </div>
                {resources.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="text-foreground hover:bg-surface-3 mx-2 flex items-center gap-3 rounded-xs px-3 py-2.5 text-sm transition-colors duration-[0.15s]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="border-border bg-background flex h-8 w-8 shrink-0 items-center justify-center rounded-xs border">
                        <Icon className="text-foreground h-4 w-4" />
                      </div>
                      <span className="font-normal">{item.title}</span>
                    </Link>
                  );
                })}

                <div className="flex flex-col gap-2 px-3 pt-4">
                  <a
                    href={SIGN_IN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="secondary" size="sm" className="w-full">
                      Sign in
                    </Button>
                  </a>
                  <Link href="/demo" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" size="sm" className="w-full">
                      Book a demo
                    </Button>
                  </Link>
                  {/* The theme toggle lives here on phones — the bar gives its
                      spot to the demo CTA. */}
                  <div className="mt-1 flex items-center justify-between px-1">
                    <span className="text-muted-foreground text-xs font-normal tracking-wide uppercase">
                      Theme
                    </span>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </nav>
          )}
        </Container>
      </div>
    </header>
  );
}

export default Header;
