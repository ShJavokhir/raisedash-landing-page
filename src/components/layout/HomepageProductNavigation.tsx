import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";

const ProductNavigationContext = createContext<((href: string) => void) | null>(null);

export function useHomepageProductNavigation() {
  const onProductNavigate = useContext(ProductNavigationContext);
  if (!onProductNavigate) {
    throw new Error("Homepage product navigation requires HomepageProductNavigation.");
  }
  return onProductNavigate;
}

export function HomepageProductNavigation({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pendingProduct = useRef<string | null>(null);
  const [productPath, setProductPath] = useState<string | null>(null);

  useEffect(() => {
    const onStart = (url: string) => {
      if (url.split(/[?#]/)[0] !== pendingProduct.current) {
        pendingProduct.current = null;
      }
    };
    const onComplete = (url: string) => {
      const path = url.split(/[?#]/)[0];
      const fromCard = pendingProduct.current === path;
      pendingProduct.current = null;
      // Keep the button during query changes on this product, but clear the
      // origin when leaving so a later visit cannot inherit a stale card click.
      setProductPath((current) => (fromCard || current === path ? path : null));
    };
    const onError = () => {
      pendingProduct.current = null;
    };

    router.events.on("routeChangeStart", onStart);
    router.events.on("routeChangeComplete", onComplete);
    router.events.on("routeChangeError", onError);
    return () => {
      router.events.off("routeChangeStart", onStart);
      router.events.off("routeChangeComplete", onComplete);
      router.events.off("routeChangeError", onError);
    };
  }, [router.events]);

  const onProductNavigate = (href: string) => {
    // Called by the cards' onNavigate, which excludes modified clicks and
    // external links. Match the site's md mobile-navigation breakpoint.
    pendingProduct.current =
      router.pathname === "/" &&
      href.startsWith("/") &&
      window.matchMedia("(width < 48rem)").matches
        ? href
        : null;
  };

  return (
    <ProductNavigationContext.Provider value={onProductNavigate}>
      {children}
      {productPath === router.pathname && (
        <Link
          href="/#products"
          aria-label="Back to homepage"
          title="Back to homepage"
          className="border-border bg-background text-foreground hover:bg-surface-3 outline-ring fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-[calc(1rem+env(safe-area-inset-left))] z-40 flex size-12 items-center justify-center rounded-full border shadow-lg outline-0 outline-offset-2 transition-transform duration-150 focus-visible:outline-2 active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100 md:hidden"
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
        </Link>
      )}
    </ProductNavigationContext.Provider>
  );
}
