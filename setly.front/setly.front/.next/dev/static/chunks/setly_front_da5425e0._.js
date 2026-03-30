(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/setly.front/src/app/components/globals/DisableImageDrag.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DisableImageDrag
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function DisableImageDrag() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "a60fb890f6e0b065bd25454e3718b8f23317e03ee4faed5ce1e194216f84305e") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a60fb890f6e0b065bd25454e3718b8f23317e03ee4faed5ce1e194216f84305e";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = [];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(_DisableImageDragUseEffect, t0);
    return null;
}
_s(DisableImageDrag, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = DisableImageDrag;
function _DisableImageDragUseEffect() {
    const onDragStart = _DisableImageDragUseEffectOnDragStart;
    document.addEventListener("dragstart", onDragStart, {
        capture: true
    });
    return ()=>document.removeEventListener("dragstart", onDragStart, {
            capture: true
        });
}
function _DisableImageDragUseEffectOnDragStart(event) {
    const target = event.target;
    if (target instanceof HTMLElement && (target.tagName === "IMG" || target.tagName === "SVG")) {
        event.preventDefault();
    }
}
var _c;
__turbopack_context__.k.register(_c, "DisableImageDrag");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/setly.front/src/app/components/globals/ScrollToTop.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ScrollToTop
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function ScrollToTop() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "82a265df18a887461faf9803788aec94bca5e14b204cef9f1ef7bd108f2543bf") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "82a265df18a887461faf9803788aec94bca5e14b204cef9f1ef7bd108f2543bf";
    }
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    let t0;
    if ($[1] !== pathname) {
        t0 = [
            pathname
        ];
        $[1] = pathname;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(_ScrollToTopUseEffect, t0);
    return null;
}
_s(ScrollToTop, "V/ldUoOTYUs0Cb2F6bbxKSn7KxI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = ScrollToTop;
function _ScrollToTopUseEffect() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto"
    });
}
var _c;
__turbopack_context__.k.register(_c, "ScrollToTop");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/setly.front/src/app/lib/auth-storage.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AUTH_STORAGE_KEY",
    ()=>AUTH_STORAGE_KEY,
    "clearAuth",
    ()=>clearAuth,
    "getAuth",
    ()=>getAuth,
    "setAuth",
    ()=>setAuth,
    "updateAuthUser",
    ()=>updateAuthUser
]);
/**
 * Хранение авторизации в localStorage (или sessionStorage, если localStorage недоступен).
 * Срок жизни — по expires_in с бэкенда (обычно 60 мин), сохраняем как expiresAt.
 */ const AUTH_STORAGE_KEY = "setly_auth";
/** Выбрать хранилище: localStorage, при ошибке — sessionStorage (на время сессии). */ function getStorage() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        window.localStorage.setItem("_setly_test", "1");
        window.localStorage.removeItem("_setly_test");
        return window.localStorage;
    } catch  {
        try {
            return window.sessionStorage;
        } catch  {
            return null;
        }
    }
}
let _storage = null;
function authStorage() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (_storage !== null) return _storage;
    _storage = getStorage();
    if (_storage === window.sessionStorage && typeof console !== "undefined" && console.warn) {
        console.warn("[setly] localStorage недоступен, сессия сохраняется только до закрытия вкладки");
    }
    return _storage;
}
function getAuth() {
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
            token: data.token ?? ""
        };
    } catch  {
        return null;
    }
}
function setAuth(userOrPayload, token, expiresIn) {
    const storage = authStorage();
    if (!storage) return;
    try {
        if (typeof userOrPayload === "object" && userOrPayload !== null && "user" in userOrPayload && token === undefined) {
            updateAuthUser(userOrPayload.user);
            return;
        }
        const user = userOrPayload ?? null;
        const ttl = typeof expiresIn === "number" && expiresIn > 0 ? expiresIn * 1000 : 7 * 24 * 60 * 60 * 1000;
        const tokenStr = token != null && typeof token === "string" ? token.trim() : "";
        const data = {
            user,
            token: tokenStr,
            expiresAt: Date.now() + ttl
        };
        storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
        window.dispatchEvent(new CustomEvent("setly:auth-update"));
    } catch (e) {
        if (typeof console !== "undefined" && console.warn) {
            console.warn("[setly] Не удалось сохранить авторизацию:", e?.message || e);
        }
    }
}
function updateAuthUser(user) {
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
function clearAuth() {
    const storage = authStorage();
    if (!storage) return;
    try {
        storage.removeItem(AUTH_STORAGE_KEY);
        window.dispatchEvent(new CustomEvent("setly:auth-update"));
    } catch (_) {}
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/setly.front/src/app/lib/api.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Базовый URL бэкенда. В проде: https://api.setly.space
 * Для локальной разработки: http://localhost:8000 (или URL контейнера)
 * В браузере задайте NEXT_PUBLIC_API_URL при сборке, иначе запросы пойдут на тот же хост.
 */ __turbopack_context__.s([
    "apiFetch",
    ()=>apiFetch,
    "getApiUrl",
    ()=>getApiUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
function getApiUrl() {
    if ("TURBOPACK compile-time truthy", 1) {
        return ("TURBOPACK compile-time value", "https://api.setly.space").replace(/\/$/, "");
    }
    //TURBOPACK unreachable
    ;
}
function isApiPath(path) {
    const p = typeof path === "string" ? path : "";
    return p.startsWith("/api/") || p.includes("/api/");
}
async function apiFetch(path, opts = {}) {
    let { method = "GET", body, token, headers: extraHeaders = {} } = opts;
    if (isApiPath(path) && (token === undefined || token === null) && ("TURBOPACK compile-time value", "object") !== "undefined") {
        try {
            const { getAuth } = await __turbopack_context__.A("[project]/setly.front/src/app/lib/auth-storage.js [app-client] (ecmascript, async loader)");
            const auth = getAuth();
            if (auth?.token && typeof auth.token === "string") token = auth.token;
        } catch (_) {}
    }
    const base = getApiUrl();
    const url = base ? `${base}${path.startsWith("/") ? path : `/${path}`}` : path;
    const headers = {
        "Content-Type": "application/json",
        ...extraHeaders
    };
    if (token && typeof token === "string") {
        headers.Authorization = `Bearer ${String(token).trim()}`;
    }
    const init = {
        method,
        headers
    };
    if (body !== undefined && body !== null) {
        init.body = typeof body === "string" ? body : JSON.stringify(body);
    }
    const res = await fetch(url, init);
    return res;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/setly.front/src/app/lib/liked-checklists-context.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LikedChecklistsProvider",
    ()=>LikedChecklistsProvider,
    "useLikedChecklists",
    ()=>useLikedChecklists
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$auth$2d$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/lib/auth-storage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/lib/api.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const LIKED_STORAGE_KEY = "setly_liked_checklist_ids";
const API_PREFIX = "/api/user";
/** @type {React.Context<{ isLiked: (id: string) => boolean; toggle: (id: string) => void; getLikeCount: (id: string) => number; setInitialLikeCounts: (counts: Record<string, number>) => void } | null>} */ const LikedChecklistsContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function loadFromStorage(userId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const key = userId ? `${LIKED_STORAGE_KEY}_${userId}` : LIKED_STORAGE_KEY;
        const raw = localStorage.getItem(key);
        if (!raw) return [];
        const arr = JSON.parse(raw);
        return Array.isArray(arr) ? arr.filter((id)=>typeof id === "string") : [];
    } catch  {
        return [];
    }
}
function saveToStorage(userId, ids) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const key = userId ? `${LIKED_STORAGE_KEY}_${userId}` : LIKED_STORAGE_KEY;
        localStorage.setItem(key, JSON.stringify(ids));
    } catch (_) {}
}
function LikedChecklistsProvider({ children }) {
    _s();
    const [likedSet, setLikedSet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "LikedChecklistsProvider.useState": ()=>new Set()
    }["LikedChecklistsProvider.useState"]);
    const [likesCounts, setLikesCounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "LikedChecklistsProvider.useState": ()=>({})
    }["LikedChecklistsProvider.useState"]);
    const [hydrated, setHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const tokenRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const likedSetRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(likedSet);
    likedSetRef.current = likedSet;
    /** Загрузить лайки: с бэкенда для авторизованного пользователя, иначе из localStorage. */ const loadLikes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LikedChecklistsProvider.useCallback[loadLikes]": ()=>{
            const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$auth$2d$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuth"])();
            const userId = auth?.user?.id ?? null;
            const token = auth?.token ?? null;
            tokenRef.current = token;
            if (userId && token) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])(`${API_PREFIX}/me/likes`, {
                    method: "GET",
                    token
                }).then({
                    "LikedChecklistsProvider.useCallback[loadLikes]": (r)=>{
                        if (r.status === 401) (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$auth$2d$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearAuth"])();
                        return r.ok ? r.json() : null;
                    }
                }["LikedChecklistsProvider.useCallback[loadLikes]"]).then({
                    "LikedChecklistsProvider.useCallback[loadLikes]": (data)=>{
                        const ids = Array.isArray(data?.checklist_ids) ? data.checklist_ids : [];
                        setLikedSet(new Set(ids.map(String)));
                        saveToStorage(userId, ids);
                    }
                }["LikedChecklistsProvider.useCallback[loadLikes]"]).catch({
                    "LikedChecklistsProvider.useCallback[loadLikes]": ()=>{
                        setLikedSet(new Set(loadFromStorage(userId)));
                    }
                }["LikedChecklistsProvider.useCallback[loadLikes]"]).finally({
                    "LikedChecklistsProvider.useCallback[loadLikes]": ()=>setHydrated(true)
                }["LikedChecklistsProvider.useCallback[loadLikes]"]);
            } else {
                setLikedSet(new Set(loadFromStorage(null)));
                setHydrated(true);
            }
        }
    }["LikedChecklistsProvider.useCallback[loadLikes]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LikedChecklistsProvider.useEffect": ()=>{
            loadLikes();
        }
    }["LikedChecklistsProvider.useEffect"], [
        loadLikes
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LikedChecklistsProvider.useEffect": ()=>{
            const onAuthUpdate = {
                "LikedChecklistsProvider.useEffect.onAuthUpdate": ()=>{
                    setHydrated(false);
                    loadLikes();
                }
            }["LikedChecklistsProvider.useEffect.onAuthUpdate"];
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            window.addEventListener("setly:auth-update", onAuthUpdate);
            return ({
                "LikedChecklistsProvider.useEffect": ()=>window.removeEventListener("setly:auth-update", onAuthUpdate)
            })["LikedChecklistsProvider.useEffect"];
        }
    }["LikedChecklistsProvider.useEffect"], [
        loadLikes
    ]);
    /** Подставить счётчики лайков из API (например GET /api/check-plans). Вызывать после загрузки карточек. */ const setInitialLikeCounts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LikedChecklistsProvider.useCallback[setInitialLikeCounts]": (counts)=>{
            if (typeof counts === "object" && counts !== null) {
                setLikesCounts({
                    "LikedChecklistsProvider.useCallback[setInitialLikeCounts]": (prev)=>({
                            ...prev,
                            ...counts
                        })
                }["LikedChecklistsProvider.useCallback[setInitialLikeCounts]"]);
            }
        }
    }["LikedChecklistsProvider.useCallback[setInitialLikeCounts]"], []);
    const isLiked = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LikedChecklistsProvider.useCallback[isLiked]": (id)=>id ? likedSet.has(String(id).trim()) : false
    }["LikedChecklistsProvider.useCallback[isLiked]"], [
        likedSet
    ]);
    const toggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LikedChecklistsProvider.useCallback[toggle]": (id_0)=>{
            const sid = id_0 ? String(id_0).trim() : "";
            if (!sid) return;
            const wasLiked = likedSetRef.current.has(sid);
            setLikedSet({
                "LikedChecklistsProvider.useCallback[toggle]": (prev_0)=>{
                    const next = new Set(prev_0);
                    if (next.has(sid)) next.delete(sid);
                    else next.add(sid);
                    return next;
                }
            }["LikedChecklistsProvider.useCallback[toggle]"]);
            // Оптимистичное обновление счётчика из БД
            setLikesCounts({
                "LikedChecklistsProvider.useCallback[toggle]": (prev_1)=>({
                        ...prev_1,
                        [sid]: Math.max(0, (prev_1[sid] ?? 0) + (wasLiked ? -1 : 1))
                    })
            }["LikedChecklistsProvider.useCallback[toggle]"]);
            const token_0 = tokenRef.current;
            if (token_0) {
                if (wasLiked) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])(`${API_PREFIX}/me/likes/${encodeURIComponent(sid)}`, {
                        method: "DELETE",
                        token: token_0
                    }).catch({
                        "LikedChecklistsProvider.useCallback[toggle]": ()=>{
                            setLikedSet({
                                "LikedChecklistsProvider.useCallback[toggle]": (prev_2)=>new Set(prev_2).add(sid)
                            }["LikedChecklistsProvider.useCallback[toggle]"]);
                            setLikesCounts({
                                "LikedChecklistsProvider.useCallback[toggle]": (prev_3)=>({
                                        ...prev_3,
                                        [sid]: (prev_3[sid] ?? 0) + 1
                                    })
                            }["LikedChecklistsProvider.useCallback[toggle]"]);
                        }
                    }["LikedChecklistsProvider.useCallback[toggle]"]);
                } else {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])(`${API_PREFIX}/me/likes`, {
                        method: "POST",
                        body: {
                            checklist_id: sid
                        },
                        token: token_0
                    }).catch({
                        "LikedChecklistsProvider.useCallback[toggle]": ()=>{
                            setLikedSet({
                                "LikedChecklistsProvider.useCallback[toggle]": (prev_4)=>{
                                    const next_0 = new Set(prev_4);
                                    next_0.delete(sid);
                                    return next_0;
                                }
                            }["LikedChecklistsProvider.useCallback[toggle]"]);
                            setLikesCounts({
                                "LikedChecklistsProvider.useCallback[toggle]": (prev_5)=>({
                                        ...prev_5,
                                        [sid]: Math.max(0, (prev_5[sid] ?? 0) - 1)
                                    })
                            }["LikedChecklistsProvider.useCallback[toggle]"]);
                        }
                    }["LikedChecklistsProvider.useCallback[toggle]"]);
                }
            }
        }
    }["LikedChecklistsProvider.useCallback[toggle]"], []);
    const getLikeCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LikedChecklistsProvider.useCallback[getLikeCount]": (id_1)=>id_1 ? likesCounts[String(id_1).trim()] ?? 0 : 0
    }["LikedChecklistsProvider.useCallback[getLikeCount]"], [
        likesCounts
    ]);
    const value = hydrated ? {
        isLiked,
        toggle,
        getLikeCount,
        setInitialLikeCounts
    } : {
        isLiked,
        toggle,
        getLikeCount,
        setInitialLikeCounts
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LikedChecklistsContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/setly.front/src/app/lib/liked-checklists-context.jsx",
        lineNumber: 149,
        columnNumber: 10
    }, this);
}
_s(LikedChecklistsProvider, "q7C6KzB57rAfmcoHT43MX1xdQQQ=");
_c = LikedChecklistsProvider;
function useLikedChecklists() {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "8b16b87b961eb3ad136ae5156a04c894c638865ff8fb26734c661a513a621420") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "8b16b87b961eb3ad136ae5156a04c894c638865ff8fb26734c661a513a621420";
    }
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LikedChecklistsContext);
    let t0;
    if ($[1] !== ctx) {
        t0 = ctx ?? {
            isLiked: _temp,
            toggle: _temp2,
            getLikeCount: _temp3,
            setInitialLikeCounts: _temp4
        };
        $[1] = ctx;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return t0;
}
_s1(useLikedChecklists, "/dMy7t63NXD4eYACoT93CePwGrg=");
function _temp4() {}
function _temp3() {
    return 0;
}
function _temp2() {}
function _temp() {
    return false;
}
var _c;
__turbopack_context__.k.register(_c, "LikedChecklistsProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/setly.front/node_modules/next/dist/compiled/react/cjs/react-compiler-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-compiler-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    var ReactSharedInternals = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)").__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    exports.c = function(size) {
        var dispatcher = ReactSharedInternals.H;
        null === dispatcher && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
        return dispatcher.useMemoCache(size);
    };
}();
}),
"[project]/setly.front/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/compiled/react/cjs/react-compiler-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/setly.front/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
"[project]/setly.front/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/setly.front/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=setly_front_da5425e0._.js.map