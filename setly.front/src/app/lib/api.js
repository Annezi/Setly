/**
 * Базовый URL бэкенда. В проде: https://api.setly.space
 * Для локальной разработки: http://localhost:8000 (или URL контейнера)
 * В браузере задайте NEXT_PUBLIC_API_URL при сборке, иначе запросы пойдут на тот же хост.
 */
export function getApiUrl() {
  if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");
  }
  if (typeof window !== "undefined") {
    return "";
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://setly-api:8000";
}

function isApiPath(path) {
  const p = typeof path === "string" ? path : "";
  return p.startsWith("/api/") || p.includes("/api/");
}

/**
 * Запрос к API с опциональным Bearer-токеном.
 * Для путей /api/* токен подставляется из getAuth(), если не передан в opts.
 * @param {string} path - путь относительно базового URL (начинается с /)
 * @param {{ method?: string, body?: object | string, token?: string | null, headers?: Record<string, string> }} [opts]
 */
export async function apiFetch(path, opts = {}) {
  let { method = "GET", body, token, headers: extraHeaders = {} } = opts;
  if (isApiPath(path) && (token === undefined || token === null) && typeof window !== "undefined") {
    try {
      const { getAuth } = await import("@/app/lib/auth-storage");
      const auth = getAuth();
      if (auth?.token && typeof auth.token === "string") token = auth.token;
    } catch (_) {}
  }
  const base = getApiUrl();
  const url = base ? `${base}${path.startsWith("/") ? path : `/${path}`}` : path;
  const headers = {
    "Content-Type": "application/json",
    ...extraHeaders,
  };
  if (token && typeof token === "string") {
    headers.Authorization = `Bearer ${String(token).trim()}`;
  }
  const init = {
    method,
    headers,
  };
  if (body !== undefined && body !== null) {
    init.body = typeof body === "string" ? body : JSON.stringify(body);
  }
  const res = await fetch(url, init);
  return res;
}
