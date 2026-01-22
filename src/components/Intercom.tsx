"use client";

import { useEffect } from "react";
import Intercom from "@intercom/messenger-js-sdk";

const INTERCOM_APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID || "lpyms5sz";

export function IntercomProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    Intercom({
      app_id: INTERCOM_APP_ID,
    });
  }, []);

  return null;
}
