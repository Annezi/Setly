"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, fetchAnalytics } from "@/lib/api";

/**
 * Verifies that the current user is authenticated as an admin.
 * Redirects to /login on 401/403 or missing token.
 * Returns { loading: boolean }.
 */
export default function useAdminGuard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/login");
      return;
    }

    fetchAnalytics()
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        if (err.status === 401 || err.status === 403) {
          router.replace("/login");
        } else {
          // Network error or unexpected — still allow access but stop loading
          setLoading(false);
        }
      });
  }, [router]);

  return { loading };
}
