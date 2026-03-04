/**
 * Хранение авторизации в localStorage (или sessionStorage, если localStorage недоступен).
 * Срок жизни — по expires_in с бэкенда (обычно 60 мин), сохраняем как expiresAt.
 */

const AUTH_STORAGE_KEY = "setly_auth";

/** Выбрать хранилище: localStorage, при ошибке — sessionStorage (на время сессии). */
function getStorage() {
  if (typeof window === "undefined") return null;
  try {
    window.localStorage.setItem("_setly_test", "1");
    window.localStorage.removeItem("_setly_test");
    return window.localStorage;
  } catch {
    try {
      return window.sessionStorage;
    } catch {
      return null;
    }
  }
}

let _storage = null;
function authStorage() {
  if (typeof window === "undefined") return null;
  if (_storage !== null) return _storage;
  _storage = getStorage();
  if (_storage === window.sessionStorage && typeof console !== "undefined" && console.warn) {
    console.warn("[setly] localStorage недоступен, сессия сохраняется только до закрытия вкладки");
  }
  return _storage;
}

/**
 * @returns {{ user: object, token: string } | null} Текущая сессия или null, если нет/истекла.
 */
export function getAuth() {
  const storage = authStorage();
  if (!storage) return null;
  try {
    const raw = storage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    const expiresAt = data?.expiresAt;
    if (typeof expiresAt !== "number" || Date.now() >= expiresAt) {
      clearAuth();
      return null;
    }
    return {
      user: data.user ?? null,
      token: data.token ?? "",
    };
  } catch {
    return null;
  }
}

/**
 * Сохранить авторизацию (user + token).
 * @param {object} userOrPayload — объект пользователя ИЛИ { user } (для обновления только user)
 * @param {string} [token] — JWT access_token
 * @param {number} [expiresIn] — секунды до истечения (если не указано, 7 дней от сейчас)
 */
export function setAuth(userOrPayload, token, expiresIn) {
  const storage = authStorage();
  if (!storage) return;
  try {
    if (
      typeof userOrPayload === "object" &&
      userOrPayload !== null &&
      "user" in userOrPayload &&
      token === undefined
    ) {
      updateAuthUser(userOrPayload.user);
      return;
    }
    const user = userOrPayload ?? null;
    const ttl = typeof expiresIn === "number" && expiresIn > 0
      ? expiresIn * 1000
      : 7 * 24 * 60 * 60 * 1000;
    const tokenStr = (token != null && typeof token === "string") ? token.trim() : "";
    const data = {
      user,
      token: tokenStr,
      expiresAt: Date.now() + ttl,
    };
    storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("setly:auth-update"));
  } catch (e) {
    if (typeof console !== "undefined" && console.warn) {
      console.warn("[setly] Не удалось сохранить авторизацию:", e?.message || e);
    }
  }
}

/**
 * Обновить только объект user в хранилище (токен и expiresAt не трогаем).
 */
export function updateAuthUser(user) {
  const storage = authStorage();
  if (!storage) return;
  try {
    const raw = storage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    data.user = user ?? data.user;
    storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("setly:auth-update"));
  } catch (_) {}
}

/**
 * Очистить авторизацию (выход).
 */
export function clearAuth() {
  const storage = authStorage();
  if (!storage) return;
  try {
    storage.removeItem(AUTH_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("setly:auth-update"));
  } catch (_) {}
}

export { AUTH_STORAGE_KEY };
