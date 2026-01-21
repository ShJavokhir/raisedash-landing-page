import { useState, useEffect } from "react";

interface ScrollState {
  scrollY: number;
  scrollX: number;
  isScrolled: boolean;
  isScrollingUp: boolean;
  isScrollingDown: boolean;
}

interface UseScrollOptions {
  threshold?: number;
}

/**
 * Hook to detect scroll position and direction
 */
export function useScroll(options: UseScrollOptions = {}): ScrollState {
  const { threshold = 10 } = options;

  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    scrollX: 0,
    isScrolled: false,
    isScrollingUp: false,
    isScrollingDown: false,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentScrollX = window.scrollX;

      setScrollState({
        scrollY: currentScrollY,
        scrollX: currentScrollX,
        isScrolled: currentScrollY > threshold,
        isScrollingUp: currentScrollY < lastScrollY,
        isScrollingDown: currentScrollY > lastScrollY,
      });

      lastScrollY = currentScrollY;
    };

    // Set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrollState;
}

/**
 * Hook to detect when scroll position passes a threshold
 */
export function useScrollThreshold(threshold: number = 100): boolean {
  const [isPastThreshold, setIsPastThreshold] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsPastThreshold(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isPastThreshold;
}

export default useScroll;
