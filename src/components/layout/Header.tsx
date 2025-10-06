import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-4 md:top-6 z-50 w-full bg-transparent">
      <div className="" style={{ '--rails-offset': '2rem' } as React.CSSProperties}>
        <Container className="rounded-md border bg-white dark:bg-card ui-corner-accents">
        <div className="h-14 md:h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="font-semibold text-2xl tracking-[-0.01em] text-foreground">
              Raisedash
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink>
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/blog" legacyBehavior passHref>
                    <NavigationMenuLink>
                      Blog
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/careers" legacyBehavior passHref>
                    <NavigationMenuLink>
                      Careers
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[320px] gap-1 p-2">
                      <Link href="/contact" className="rounded-sm p-2 text-sm hover:bg-accent hover:text-accent-foreground">
                        Contact
                      </Link>
                      <Link href="/security" className="rounded-sm p-2 text-sm hover:bg-accent hover:text-accent-foreground">
                        Security
                      </Link>
                      <Link href="/privacy-policy" className="rounded-sm p-2 text-sm hover:bg-accent hover:text-accent-foreground">
                        Privacy Policy
                      </Link>
                      <Link href="/terms-of-use" className="rounded-sm p-2 text-sm hover:bg-accent hover:text-accent-foreground">
                        Terms of Use
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link href="/request-demo">
              <Button variant="primary" size="sm">
                Request Demo
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-accent transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="py-4 space-y-2">
              <Link 
                href="/about" 
                className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/blog" 
                className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/careers" 
                className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Careers
              </Link>
              <Link 
                href="/contact" 
                className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                href="/security" 
                className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Security
              </Link>
              <div className="pt-4 border-t border-border">
                <Link href="/request-demo" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="secondary" size="sm" className="w-full">
                    Request Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
        </Container>
      </div>
    </header>
  );
}

export default Header;