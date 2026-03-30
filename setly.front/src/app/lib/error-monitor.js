const ERROR_ENDPOINT = "/api/client-errors";

function buildPayload(error, scope) {
  return {
    scope,
    message: error?.message ?? "Unknown client error",
    digest: error?.digest ?? null,
    stack: error?.stack ?? null,
    path: typeof window !== "undefined" ? window.location.pathname : null,
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : null,
    timestamp: new Date().toISOString(),
  };
}

export function reportClientError(error, scope = "app-error") {
  if (typeof window === "undefined") return;

  const payload = buildPayload(error, scope);

  try {
    console.error(`[${scope}]`, error);
  } catch {}

  try {
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(ERROR_ENDPOINT, blob);
      return;
    }
    fetch(ERROR_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {}
}
