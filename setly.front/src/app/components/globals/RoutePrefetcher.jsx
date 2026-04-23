"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const PREFETCH_ROUTES = [
  "/check-plans",
  "/articles",
  "/about",
  "/creating",
  "/login",
  "/registration",
  "/account",
  "/settings",
];

export default function RoutePrefetcher() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    const prefetchAll = () => {
      if (cancelled) return;
      for (const route of PREFETCH_ROUTES) {
        if (route !== pathname) {
          router.prefetch(route);
        }
      }
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(prefetchAll, { timeout: 2500 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(idleId);
      };
    }

    const timeoutId = setTimeout(prefetchAll, 400);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [router, pathname]);

  return null;
}
