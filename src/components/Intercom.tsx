"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import Intercom from "@intercom/messenger-js-sdk";

const INTERCOM_APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID || "lpyms5sz";

// Throttle config: Intercom allows 20 update calls per 30 minutes
const UPDATE_INTERVAL_MS = 90_000; // 90 seconds between periodic updates
const MIN_UPDATE_INTERVAL_MS = 5_000; // Minimum 5 seconds between any updates

export function IntercomProvider() {
  const router = useRouter();
  const lastUpdateRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isInitializedRef = useRef(false);

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

  // Initialize Intercom
  useEffect(() => {
    if (typeof window === "undefined" || isInitializedRef.current) return;

    Intercom({
      app_id: INTERCOM_APP_ID,
    });

    isInitializedRef.current = true;
    lastUpdateRef.current = Date.now();
  }, []);

  // Handle route changes
  useEffect(() => {
    const handleRouteChange = () => {
      updateIntercom();
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, updateIntercom]);

  // Periodic updates for real-time message delivery
  useEffect(() => {
    if (typeof window === "undefined") return;

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
  }, [updateIntercom]);

  return null;
}
