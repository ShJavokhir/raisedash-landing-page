"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useRouter } from "next/router";
import Intercom from "@intercom/messenger-js-sdk";

const INTERCOM_APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID || "lpyms5sz";

// Throttle config: Intercom allows 20 update calls per 30 minutes
const UPDATE_INTERVAL_MS = 90_000; // 90 seconds between periodic updates
const MIN_UPDATE_INTERVAL_MS = 5_000; // Minimum 5 seconds between any updates

// The messenger SDK is the single biggest third-party cost on the page, so we
// defer loading it until the visitor shows intent or an idle fallback fires.
const BOOT_IDLE_TIMEOUT_MS = 5_000; // Idle fallback ~5s after mount
const BOOT_EVENTS = ["pointerdown", "keydown", "touchstart", "scroll"] as const;

export function IntercomProvider() {
  const router = useRouter();
  const lastUpdateRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isInitializedRef = useRef(false);
  const [booted, setBooted] = useState(false);

  // Throttled update function to ping Intercom for new messages
  const updateIntercom = useCallback((force = false) => {
    if (typeof window === "undefined") return;

    // Access Intercom from window as it's attached there by the SDK
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const intercom = (window as any).Intercom;
    if (!intercom) return;

    const now = Date.now();
    const timeSinceLastUpdate = now - lastUpdateRef.current;

    // Enforce minimum interval unless forced (e.g., on visibility change)
    if (!force && timeSinceLastUpdate < MIN_UPDATE_INTERVAL_MS) {
      return;
    }

    lastUpdateRef.current = now;

    // The update call with last_request_at tells Intercom to check for new messages
    intercom("update", {
      last_request_at: Math.floor(now / 1000),
    });
  }, []);

  // Lazily boot Intercom on the first user intent, or an idle fallback ~5s in.
  // Whichever fires first wins; the rest are torn down so boot runs exactly once.
  useEffect(() => {
    if (typeof window === "undefined" || isInitializedRef.current) return;

    let idleId: number | null = null;
    let idleTimer: NodeJS.Timeout | null = null;

    const cancelIdle = () => {
      if (idleId !== null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (idleTimer !== null) {
        clearTimeout(idleTimer);
      }
    };

    const boot = () => {
      if (isInitializedRef.current) return;
      isInitializedRef.current = true;

      // Remove every trigger so nothing fires after boot
      BOOT_EVENTS.forEach((event) => window.removeEventListener(event, boot));
      cancelIdle();

      Intercom({
        app_id: INTERCOM_APP_ID,
      });

      lastUpdateRef.current = Date.now();
      setBooted(true);
    };

    // First user intent wins
    BOOT_EVENTS.forEach((event) => {
      window.addEventListener(event, boot, { once: true, passive: true });
    });

    // Idle fallback so the widget still loads for passive visitors
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(boot, { timeout: BOOT_IDLE_TIMEOUT_MS });
    } else {
      idleTimer = setTimeout(boot, BOOT_IDLE_TIMEOUT_MS);
    }

    return () => {
      BOOT_EVENTS.forEach((event) => window.removeEventListener(event, boot));
      cancelIdle();
    };
  }, []);

  // Handle route changes (only meaningful once Intercom has booted)
  useEffect(() => {
    if (!booted) return;

    const handleRouteChange = () => {
      updateIntercom();
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [booted, router.events, updateIntercom]);

  // Periodic updates for real-time message delivery (only after boot)
  useEffect(() => {
    if (typeof window === "undefined" || !booted) return;

    // Start periodic updates
    intervalRef.current = setInterval(() => {
      updateIntercom();
    }, UPDATE_INTERVAL_MS);

    // Also update when user returns to the tab (critical for real-time feel)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        updateIntercom(true); // Force update when returning to tab
      }
    };

    // Update when window regains focus
    const handleFocus = () => {
      updateIntercom(true);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [booted, updateIntercom]);

  return null;
}
