(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/setly.front/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    assign: null,
    searchParamsToUrlQuery: null,
    urlQueryToSearchParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    assign: function() {
        return assign;
    },
    searchParamsToUrlQuery: function() {
        return searchParamsToUrlQuery;
    },
    urlQueryToSearchParams: function() {
        return urlQueryToSearchParams;
    }
});
function searchParamsToUrlQuery(searchParams) {
    const query = {};
    for (const [key, value] of searchParams.entries()){
        const existing = query[key];
        if (typeof existing === 'undefined') {
            query[key] = value;
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            query[key] = [
                existing,
                value
            ];
        }
    }
    return query;
}
function stringifyUrlQueryParam(param) {
    if (typeof param === 'string') {
        return param;
    }
    if (typeof param === 'number' && !isNaN(param) || typeof param === 'boolean') {
        return String(param);
    } else {
        return '';
    }
}
function urlQueryToSearchParams(query) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query)){
        if (Array.isArray(value)) {
            for (const item of value){
                searchParams.append(key, stringifyUrlQueryParam(item));
            }
        } else {
            searchParams.set(key, stringifyUrlQueryParam(value));
        }
    }
    return searchParams;
}
function assign(target, ...searchParamsList) {
    for (const searchParams of searchParamsList){
        for (const key of searchParams.keys()){
            target.delete(key);
        }
        for (const [key, value] of searchParams.entries()){
            target.append(key, value);
        }
    }
    return target;
} //# sourceMappingURL=querystring.js.map
}),
"[project]/setly.front/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// Format function modified from nodejs
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    formatUrl: null,
    formatWithValidation: null,
    urlObjectKeys: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    formatUrl: function() {
        return formatUrl;
    },
    formatWithValidation: function() {
        return formatWithValidation;
    },
    urlObjectKeys: function() {
        return urlObjectKeys;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/setly.front/node_modules/next/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _querystring = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)"));
const slashedProtocols = /https?|ftp|gopher|file/;
function formatUrl(urlObj) {
    let { auth, hostname } = urlObj;
    let protocol = urlObj.protocol || '';
    let pathname = urlObj.pathname || '';
    let hash = urlObj.hash || '';
    let query = urlObj.query || '';
    let host = false;
    auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ':') + '@' : '';
    if (urlObj.host) {
        host = auth + urlObj.host;
    } else if (hostname) {
        host = auth + (~hostname.indexOf(':') ? `[${hostname}]` : hostname);
        if (urlObj.port) {
            host += ':' + urlObj.port;
        }
    }
    if (query && typeof query === 'object') {
        query = String(_querystring.urlQueryToSearchParams(query));
    }
    let search = urlObj.search || query && `?${query}` || '';
    if (protocol && !protocol.endsWith(':')) protocol += ':';
    if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
        host = '//' + (host || '');
        if (pathname && pathname[0] !== '/') pathname = '/' + pathname;
    } else if (!host) {
        host = '';
    }
    if (hash && hash[0] !== '#') hash = '#' + hash;
    if (search && search[0] !== '?') search = '?' + search;
    pathname = pathname.replace(/[?#]/g, encodeURIComponent);
    search = search.replace('#', '%23');
    return `${protocol}${host}${pathname}${search}${hash}`;
}
const urlObjectKeys = [
    'auth',
    'hash',
    'host',
    'hostname',
    'href',
    'path',
    'pathname',
    'port',
    'protocol',
    'query',
    'search',
    'slashes'
];
function formatWithValidation(url) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (url !== null && typeof url === 'object') {
            Object.keys(url).forEach((key)=>{
                if (!urlObjectKeys.includes(key)) {
                    console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
                }
            });
        }
    }
    return formatUrl(url);
} //# sourceMappingURL=format-url.js.map
}),
"[project]/setly.front/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useMergedRef", {
    enumerable: true,
    get: function() {
        return useMergedRef;
    }
});
const _react = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
function useMergedRef(refA, refB) {
    const cleanupA = (0, _react.useRef)(null);
    const cleanupB = (0, _react.useRef)(null);
    // NOTE: In theory, we could skip the wrapping if only one of the refs is non-null.
    // (this happens often if the user doesn't pass a ref to Link/Form/Image)
    // But this can cause us to leak a cleanup-ref into user code (previously via `<Link legacyBehavior>`),
    // and the user might pass that ref into ref-merging library that doesn't support cleanup refs
    // (because it hasn't been updated for React 19)
    // which can then cause things to blow up, because a cleanup-returning ref gets called with `null`.
    // So in practice, it's safer to be defensive and always wrap the ref, even on React 19.
    return (0, _react.useCallback)((current)=>{
        if (current === null) {
            const cleanupFnA = cleanupA.current;
            if (cleanupFnA) {
                cleanupA.current = null;
                cleanupFnA();
            }
            const cleanupFnB = cleanupB.current;
            if (cleanupFnB) {
                cleanupB.current = null;
                cleanupFnB();
            }
        } else {
            if (refA) {
                cleanupA.current = applyRef(refA, current);
            }
            if (refB) {
                cleanupB.current = applyRef(refB, current);
            }
        }
    }, [
        refA,
        refB
    ]);
}
function applyRef(refA, current) {
    if (typeof refA === 'function') {
        const cleanup = refA(current);
        if (typeof cleanup === 'function') {
            return cleanup;
        } else {
            return ()=>refA(null);
        }
    } else {
        refA.current = current;
        return ()=>{
            refA.current = null;
        };
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-merged-ref.js.map
}),
"[project]/setly.front/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DecodeError: null,
    MiddlewareNotFoundError: null,
    MissingStaticPage: null,
    NormalizeError: null,
    PageNotFoundError: null,
    SP: null,
    ST: null,
    WEB_VITALS: null,
    execOnce: null,
    getDisplayName: null,
    getLocationOrigin: null,
    getURL: null,
    isAbsoluteUrl: null,
    isResSent: null,
    loadGetInitialProps: null,
    normalizeRepeatedSlashes: null,
    stringifyError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DecodeError: function() {
        return DecodeError;
    },
    MiddlewareNotFoundError: function() {
        return MiddlewareNotFoundError;
    },
    MissingStaticPage: function() {
        return MissingStaticPage;
    },
    NormalizeError: function() {
        return NormalizeError;
    },
    PageNotFoundError: function() {
        return PageNotFoundError;
    },
    SP: function() {
        return SP;
    },
    ST: function() {
        return ST;
    },
    WEB_VITALS: function() {
        return WEB_VITALS;
    },
    execOnce: function() {
        return execOnce;
    },
    getDisplayName: function() {
        return getDisplayName;
    },
    getLocationOrigin: function() {
        return getLocationOrigin;
    },
    getURL: function() {
        return getURL;
    },
    isAbsoluteUrl: function() {
        return isAbsoluteUrl;
    },
    isResSent: function() {
        return isResSent;
    },
    loadGetInitialProps: function() {
        return loadGetInitialProps;
    },
    normalizeRepeatedSlashes: function() {
        return normalizeRepeatedSlashes;
    },
    stringifyError: function() {
        return stringifyError;
    }
});
const WEB_VITALS = [
    'CLS',
    'FCP',
    'FID',
    'INP',
    'LCP',
    'TTFB'
];
function execOnce(fn) {
    let used = false;
    let result;
    return (...args)=>{
        if (!used) {
            used = true;
            result = fn(...args);
        }
        return result;
    };
}
// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
const isAbsoluteUrl = (url)=>ABSOLUTE_URL_REGEX.test(url);
function getLocationOrigin() {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}
function getURL() {
    const { href } = window.location;
    const origin = getLocationOrigin();
    return href.substring(origin.length);
}
function getDisplayName(Component) {
    return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}
function isResSent(res) {
    return res.finished || res.headersSent;
}
function normalizeRepeatedSlashes(url) {
    const urlParts = url.split('?');
    const urlNoQuery = urlParts[0];
    return urlNoQuery // first we replace any non-encoded backslashes with forward
    // then normalize repeated forward slashes
    .replace(/\\/g, '/').replace(/\/\/+/g, '/') + (urlParts[1] ? `?${urlParts.slice(1).join('?')}` : '');
}
async function loadGetInitialProps(App, ctx) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (App.prototype?.getInitialProps) {
            const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.`;
            throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        }
    }
    // when called from _app `ctx` is nested in `ctx`
    const res = ctx.res || ctx.ctx && ctx.ctx.res;
    if (!App.getInitialProps) {
        if (ctx.ctx && ctx.Component) {
            // @ts-ignore pageProps default
            return {
                pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
            };
        }
        return {};
    }
    const props = await App.getInitialProps(ctx);
    if (res && isResSent(res)) {
        return props;
    }
    if (!props) {
        const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
        throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (Object.keys(props).length === 0 && !ctx.ctx) {
            console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps`);
        }
    }
    return props;
}
const SP = typeof performance !== 'undefined';
const ST = SP && [
    'mark',
    'measure',
    'getEntriesByName'
].every((method)=>typeof performance[method] === 'function');
class DecodeError extends Error {
}
class NormalizeError extends Error {
}
class PageNotFoundError extends Error {
    constructor(page){
        super();
        this.code = 'ENOENT';
        this.name = 'PageNotFoundError';
        this.message = `Cannot find module for page: ${page}`;
    }
}
class MissingStaticPage extends Error {
    constructor(page, message){
        super();
        this.message = `Failed to load static file for page: ${page} ${message}`;
    }
}
class MiddlewareNotFoundError extends Error {
    constructor(){
        super();
        this.code = 'ENOENT';
        this.message = `Cannot find the middleware module`;
    }
}
function stringifyError(error) {
    return JSON.stringify({
        message: error.message,
        stack: error.stack
    });
} //# sourceMappingURL=utils.js.map
}),
"[project]/setly.front/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isLocalURL", {
    enumerable: true,
    get: function() {
        return isLocalURL;
    }
});
const _utils = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _hasbasepath = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/client/has-base-path.js [app-client] (ecmascript)");
function isLocalURL(url) {
    // prevent a hydration mismatch on href for url with anchor refs
    if (!(0, _utils.isAbsoluteUrl)(url)) return true;
    try {
        // absolute urls can be local if they are on the same origin
        const locationOrigin = (0, _utils.getLocationOrigin)();
        const resolved = new URL(url, locationOrigin);
        return resolved.origin === locationOrigin && (0, _hasbasepath.hasBasePath)(resolved.pathname);
    } catch (_) {
        return false;
    }
} //# sourceMappingURL=is-local-url.js.map
}),
"[project]/setly.front/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "errorOnce", {
    enumerable: true,
    get: function() {
        return errorOnce;
    }
});
let errorOnce = (_)=>{};
if ("TURBOPACK compile-time truthy", 1) {
    const errors = new Set();
    errorOnce = (msg)=>{
        if (!errors.has(msg)) {
            console.error(msg);
        }
        errors.add(msg);
    };
} //# sourceMappingURL=error-once.js.map
}),
"[project]/setly.front/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    useLinkStatus: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    /**
 * A React component that extends the HTML `<a>` element to provide
 * [prefetching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching)
 * and client-side navigation. This is the primary way to navigate between routes in Next.js.
 *
 * @remarks
 * - Prefetching is only enabled in production.
 *
 * @see https://nextjs.org/docs/app/api-reference/components/link
 */ default: function() {
        return LinkComponent;
    },
    useLinkStatus: function() {
        return useLinkStatus;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/setly.front/node_modules/next/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/setly.front/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _formaturl = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)");
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
const _usemergedref = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _addbasepath = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/client/add-base-path.js [app-client] (ecmascript)");
const _warnonce = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
const _links = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/client/components/links.js [app-client] (ecmascript)");
const _islocalurl = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)");
const _types = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/client/components/segment-cache/types.js [app-client] (ecmascript)");
const _erroronce = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)");
function isModifiedEvent(event) {
    const eventTarget = event.currentTarget;
    const target = eventTarget.getAttribute('target');
    return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
    event.nativeEvent && event.nativeEvent.which === 2;
}
function linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate) {
    if (typeof window !== 'undefined') {
        const { nodeName } = e.currentTarget;
        // anchors inside an svg have a lowercase nodeName
        const isAnchorNodeName = nodeName.toUpperCase() === 'A';
        if (isAnchorNodeName && isModifiedEvent(e) || e.currentTarget.hasAttribute('download')) {
            // ignore click for browser’s default behavior
            return;
        }
        if (!(0, _islocalurl.isLocalURL)(href)) {
            if (replace) {
                // browser default behavior does not replace the history state
                // so we need to do it manually
                e.preventDefault();
                location.replace(href);
            }
            // ignore click for browser’s default behavior
            return;
        }
        e.preventDefault();
        if (onNavigate) {
            let isDefaultPrevented = false;
            onNavigate({
                preventDefault: ()=>{
                    isDefaultPrevented = true;
                }
            });
            if (isDefaultPrevented) {
                return;
            }
        }
        const { dispatchNavigateAction } = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/client/components/app-router-instance.js [app-client] (ecmascript)");
        _react.default.startTransition(()=>{
            dispatchNavigateAction(as || href, replace ? 'replace' : 'push', scroll ?? true, linkInstanceRef.current);
        });
    }
}
function formatStringOrUrl(urlObjOrString) {
    if (typeof urlObjOrString === 'string') {
        return urlObjOrString;
    }
    return (0, _formaturl.formatUrl)(urlObjOrString);
}
function LinkComponent(props) {
    const [linkStatus, setOptimisticLinkStatus] = (0, _react.useOptimistic)(_links.IDLE_LINK_STATUS);
    let children;
    const linkInstanceRef = (0, _react.useRef)(null);
    const { href: hrefProp, as: asProp, children: childrenProp, prefetch: prefetchProp = null, passHref, replace, shallow, scroll, onClick, onMouseEnter: onMouseEnterProp, onTouchStart: onTouchStartProp, legacyBehavior = false, onNavigate, ref: forwardedRef, unstable_dynamicOnHover, ...restProps } = props;
    children = childrenProp;
    if (legacyBehavior && (typeof children === 'string' || typeof children === 'number')) {
        children = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            children: children
        });
    }
    const router = _react.default.useContext(_approutercontextsharedruntime.AppRouterContext);
    const prefetchEnabled = prefetchProp !== false;
    const fetchStrategy = prefetchProp !== false ? getFetchStrategyFromPrefetchProp(prefetchProp) : _types.FetchStrategy.PPR;
    if ("TURBOPACK compile-time truthy", 1) {
        function createPropError(args) {
            return Object.defineProperty(new Error(`Failed prop type: The prop \`${args.key}\` expects a ${args.expected} in \`<Link>\`, but got \`${args.actual}\` instead.` + (typeof window !== 'undefined' ? "\nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                value: "E319",
                enumerable: false,
                configurable: true
            });
        }
        // TypeScript trick for type-guarding:
        const requiredPropsGuard = {
            href: true
        };
        const requiredProps = Object.keys(requiredPropsGuard);
        requiredProps.forEach((key)=>{
            if (key === 'href') {
                if (props[key] == null || typeof props[key] !== 'string' && typeof props[key] !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: props[key] === null ? 'null' : typeof props[key]
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
        // TypeScript trick for type-guarding:
        const optionalPropsGuard = {
            as: true,
            replace: true,
            scroll: true,
            shallow: true,
            passHref: true,
            prefetch: true,
            unstable_dynamicOnHover: true,
            onClick: true,
            onMouseEnter: true,
            onTouchStart: true,
            legacyBehavior: true,
            onNavigate: true
        };
        const optionalProps = Object.keys(optionalPropsGuard);
        optionalProps.forEach((key)=>{
            const valType = typeof props[key];
            if (key === 'as') {
                if (props[key] && valType !== 'string' && valType !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: valType
                    });
                }
            } else if (key === 'onClick' || key === 'onMouseEnter' || key === 'onTouchStart' || key === 'onNavigate') {
                if (props[key] && valType !== 'function') {
                    throw createPropError({
                        key,
                        expected: '`function`',
                        actual: valType
                    });
                }
            } else if (key === 'replace' || key === 'scroll' || key === 'shallow' || key === 'passHref' || key === 'legacyBehavior' || key === 'unstable_dynamicOnHover') {
                if (props[key] != null && valType !== 'boolean') {
                    throw createPropError({
                        key,
                        expected: '`boolean`',
                        actual: valType
                    });
                }
            } else if (key === 'prefetch') {
                if (props[key] != null && valType !== 'boolean' && props[key] !== 'auto') {
                    throw createPropError({
                        key,
                        expected: '`boolean | "auto"`',
                        actual: valType
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (props.locale) {
            (0, _warnonce.warnOnce)('The `locale` prop is not supported in `next/link` while using the `app` router. Read more about app router internalization: https://nextjs.org/docs/app/building-your-application/routing/internationalization');
        }
        if (!asProp) {
            let href;
            if (typeof hrefProp === 'string') {
                href = hrefProp;
            } else if (typeof hrefProp === 'object' && typeof hrefProp.pathname === 'string') {
                href = hrefProp.pathname;
            }
            if (href) {
                const hasDynamicSegment = href.split('/').some((segment)=>segment.startsWith('[') && segment.endsWith(']'));
                if (hasDynamicSegment) {
                    throw Object.defineProperty(new Error(`Dynamic href \`${href}\` found in <Link> while using the \`/app\` router, this is not supported. Read more: https://nextjs.org/docs/messages/app-dir-dynamic-href`), "__NEXT_ERROR_CODE", {
                        value: "E267",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
    }
    const { href, as } = _react.default.useMemo({
        "LinkComponent.useMemo": ()=>{
            const resolvedHref = formatStringOrUrl(hrefProp);
            return {
                href: resolvedHref,
                as: asProp ? formatStringOrUrl(asProp) : resolvedHref
            };
        }
    }["LinkComponent.useMemo"], [
        hrefProp,
        asProp
    ]);
    // This will return the first child, if multiple are provided it will throw an error
    let child;
    if (legacyBehavior) {
        if (children?.$$typeof === Symbol.for('react.lazy')) {
            throw Object.defineProperty(new Error(`\`<Link legacyBehavior>\` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's \`<a>\` tag.`), "__NEXT_ERROR_CODE", {
                value: "E863",
                enumerable: false,
                configurable: true
            });
        }
        if ("TURBOPACK compile-time truthy", 1) {
            if (onClick) {
                console.warn(`"onClick" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link`);
            }
            if (onMouseEnterProp) {
                console.warn(`"onMouseEnter" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link`);
            }
            try {
                child = _react.default.Children.only(children);
            } catch (err) {
                if (!children) {
                    throw Object.defineProperty(new Error(`No children were passed to <Link> with \`href\` of \`${hrefProp}\` but one child is required https://nextjs.org/docs/messages/link-no-children`), "__NEXT_ERROR_CODE", {
                        value: "E320",
                        enumerable: false,
                        configurable: true
                    });
                }
                throw Object.defineProperty(new Error(`Multiple children were passed to <Link> with \`href\` of \`${hrefProp}\` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children` + (typeof window !== 'undefined' ? " \nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                    value: "E266",
                    enumerable: false,
                    configurable: true
                });
            }
        } else //TURBOPACK unreachable
        ;
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            if (children?.type === 'a') {
                throw Object.defineProperty(new Error('Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.\nLearn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor'), "__NEXT_ERROR_CODE", {
                    value: "E209",
                    enumerable: false,
                    configurable: true
                });
            }
        }
    }
    const childRef = legacyBehavior ? child && typeof child === 'object' && child.ref : forwardedRef;
    // Use a callback ref to attach an IntersectionObserver to the anchor tag on
    // mount. In the future we will also use this to keep track of all the
    // currently mounted <Link> instances, e.g. so we can re-prefetch them after
    // a revalidation or refresh.
    const observeLinkVisibilityOnMount = _react.default.useCallback({
        "LinkComponent.useCallback[observeLinkVisibilityOnMount]": (element)=>{
            if (router !== null) {
                linkInstanceRef.current = (0, _links.mountLinkInstance)(element, href, router, fetchStrategy, prefetchEnabled, setOptimisticLinkStatus);
            }
            return ({
                "LinkComponent.useCallback[observeLinkVisibilityOnMount]": ()=>{
                    if (linkInstanceRef.current) {
                        (0, _links.unmountLinkForCurrentNavigation)(linkInstanceRef.current);
                        linkInstanceRef.current = null;
                    }
                    (0, _links.unmountPrefetchableInstance)(element);
                }
            })["LinkComponent.useCallback[observeLinkVisibilityOnMount]"];
        }
    }["LinkComponent.useCallback[observeLinkVisibilityOnMount]"], [
        prefetchEnabled,
        href,
        router,
        fetchStrategy,
        setOptimisticLinkStatus
    ]);
    const mergedRef = (0, _usemergedref.useMergedRef)(observeLinkVisibilityOnMount, childRef);
    const childProps = {
        ref: mergedRef,
        onClick (e) {
            if ("TURBOPACK compile-time truthy", 1) {
                if (!e) {
                    throw Object.defineProperty(new Error(`Component rendered inside next/link has to pass click event to "onClick" prop.`), "__NEXT_ERROR_CODE", {
                        value: "E312",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
            if (!legacyBehavior && typeof onClick === 'function') {
                onClick(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onClick === 'function') {
                child.props.onClick(e);
            }
            if (!router) {
                return;
            }
            if (e.defaultPrevented) {
                return;
            }
            linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate);
        },
        onMouseEnter (e) {
            if (!legacyBehavior && typeof onMouseEnterProp === 'function') {
                onMouseEnterProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onMouseEnter === 'function') {
                child.props.onMouseEnter(e);
            }
            if (!router) {
                return;
            }
            if ("TURBOPACK compile-time truthy", 1) {
                return;
            }
            //TURBOPACK unreachable
            ;
            const upgradeToDynamicPrefetch = undefined;
        },
        onTouchStart: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : function onTouchStart(e) {
            if (!legacyBehavior && typeof onTouchStartProp === 'function') {
                onTouchStartProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onTouchStart === 'function') {
                child.props.onTouchStart(e);
            }
            if (!router) {
                return;
            }
            if (!prefetchEnabled) {
                return;
            }
            const upgradeToDynamicPrefetch = unstable_dynamicOnHover === true;
            (0, _links.onNavigationIntent)(e.currentTarget, upgradeToDynamicPrefetch);
        }
    };
    // If the url is absolute, we can bypass the logic to prepend the basePath.
    if ((0, _utils.isAbsoluteUrl)(as)) {
        childProps.href = as;
    } else if (!legacyBehavior || passHref || child.type === 'a' && !('href' in child.props)) {
        childProps.href = (0, _addbasepath.addBasePath)(as);
    }
    let link;
    if (legacyBehavior) {
        if ("TURBOPACK compile-time truthy", 1) {
            (0, _erroronce.errorOnce)('`legacyBehavior` is deprecated and will be removed in a future ' + 'release. A codemod is available to upgrade your components:\n\n' + 'npx @next/codemod@latest new-link .\n\n' + 'Learn more: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#remove-a-tags-from-link-components');
        }
        link = /*#__PURE__*/ _react.default.cloneElement(child, childProps);
    } else {
        link = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            ...restProps,
            ...childProps,
            children: children
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(LinkStatusContext.Provider, {
        value: linkStatus,
        children: link
    });
}
const LinkStatusContext = /*#__PURE__*/ (0, _react.createContext)(_links.IDLE_LINK_STATUS);
const useLinkStatus = ()=>{
    return (0, _react.useContext)(LinkStatusContext);
};
function getFetchStrategyFromPrefetchProp(prefetchProp) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        return prefetchProp === null || prefetchProp === 'auto' ? _types.FetchStrategy.PPR : // (although invalid values should've been filtered out by prop validation in dev)
        _types.FetchStrategy.Full;
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=link.js.map
}),
"[project]/setly.front/node_modules/next/dist/shared/lib/image-blur-svg.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * A shared function, used on both client and server, to generate a SVG blur placeholder.
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getImageBlurSvg", {
    enumerable: true,
    get: function() {
        return getImageBlurSvg;
    }
});
function getImageBlurSvg({ widthInt, heightInt, blurWidth, blurHeight, blurDataURL, objectFit }) {
    const std = 20;
    const svgWidth = blurWidth ? blurWidth * 40 : widthInt;
    const svgHeight = blurHeight ? blurHeight * 40 : heightInt;
    const viewBox = svgWidth && svgHeight ? `viewBox='0 0 ${svgWidth} ${svgHeight}'` : '';
    const preserveAspectRatio = viewBox ? 'none' : objectFit === 'contain' ? 'xMidYMid' : objectFit === 'cover' ? 'xMidYMid slice' : 'none';
    return `%3Csvg xmlns='http://www.w3.org/2000/svg' ${viewBox}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='${std}'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='${std}'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${preserveAspectRatio}' style='filter: url(%23b);' href='${blurDataURL}'/%3E%3C/svg%3E`;
} //# sourceMappingURL=image-blur-svg.js.map
}),
"[project]/setly.front/node_modules/next/dist/shared/lib/image-config.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    VALID_LOADERS: null,
    imageConfigDefault: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    VALID_LOADERS: function() {
        return VALID_LOADERS;
    },
    imageConfigDefault: function() {
        return imageConfigDefault;
    }
});
const VALID_LOADERS = [
    'default',
    'imgix',
    'cloudinary',
    'akamai',
    'custom'
];
const imageConfigDefault = {
    deviceSizes: [
        640,
        750,
        828,
        1080,
        1200,
        1920,
        2048,
        3840
    ],
    imageSizes: [
        32,
        48,
        64,
        96,
        128,
        256,
        384
    ],
    path: '/_next/image',
    loader: 'default',
    loaderFile: '',
    /**
   * @deprecated Use `remotePatterns` instead to protect your application from malicious users.
   */ domains: [],
    disableStaticImages: false,
    minimumCacheTTL: 14400,
    formats: [
        'image/webp'
    ],
    maximumRedirects: 3,
    maximumResponseBody: 50000000,
    dangerouslyAllowLocalIP: false,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: `script-src 'none'; frame-src 'none'; sandbox;`,
    contentDispositionType: 'attachment',
    localPatterns: undefined,
    remotePatterns: [],
    qualities: [
        75
    ],
    unoptimized: false
}; //# sourceMappingURL=image-config.js.map
}),
"[project]/setly.front/node_modules/next/dist/shared/lib/get-img-props.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getImgProps", {
    enumerable: true,
    get: function() {
        return getImgProps;
    }
});
const _warnonce = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
const _deploymentid = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/deployment-id.js [app-client] (ecmascript)");
const _imageblursvg = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/image-blur-svg.js [app-client] (ecmascript)");
const _imageconfig = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/image-config.js [app-client] (ecmascript)");
const VALID_LOADING_VALUES = [
    'lazy',
    'eager',
    undefined
];
// Object-fit values that are not valid background-size values
const INVALID_BACKGROUND_SIZE_VALUES = [
    '-moz-initial',
    'fill',
    'none',
    'scale-down',
    undefined
];
function isStaticRequire(src) {
    return src.default !== undefined;
}
function isStaticImageData(src) {
    return src.src !== undefined;
}
function isStaticImport(src) {
    return !!src && typeof src === 'object' && (isStaticRequire(src) || isStaticImageData(src));
}
const allImgs = new Map();
let perfObserver;
function getInt(x) {
    if (typeof x === 'undefined') {
        return x;
    }
    if (typeof x === 'number') {
        return Number.isFinite(x) ? x : NaN;
    }
    if (typeof x === 'string' && /^[0-9]+$/.test(x)) {
        return parseInt(x, 10);
    }
    return NaN;
}
function getWidths({ deviceSizes, allSizes }, width, sizes) {
    if (sizes) {
        // Find all the "vw" percent sizes used in the sizes prop
        const viewportWidthRe = /(^|\s)(1?\d?\d)vw/g;
        const percentSizes = [];
        for(let match; match = viewportWidthRe.exec(sizes); match){
            percentSizes.push(parseInt(match[2]));
        }
        if (percentSizes.length) {
            const smallestRatio = Math.min(...percentSizes) * 0.01;
            return {
                widths: allSizes.filter((s)=>s >= deviceSizes[0] * smallestRatio),
                kind: 'w'
            };
        }
        return {
            widths: allSizes,
            kind: 'w'
        };
    }
    if (typeof width !== 'number') {
        return {
            widths: deviceSizes,
            kind: 'w'
        };
    }
    const widths = [
        ...new Set(// > are actually 3x in the green color, but only 1.5x in the red and
        // > blue colors. Showing a 3x resolution image in the app vs a 2x
        // > resolution image will be visually the same, though the 3x image
        // > takes significantly more data. Even true 3x resolution screens are
        // > wasteful as the human eye cannot see that level of detail without
        // > something like a magnifying glass.
        // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
        [
            width,
            width * 2 /*, width * 3*/ 
        ].map((w)=>allSizes.find((p)=>p >= w) || allSizes[allSizes.length - 1]))
    ];
    return {
        widths,
        kind: 'x'
    };
}
function generateImgAttrs({ config, src, unoptimized, width, quality, sizes, loader }) {
    if (unoptimized) {
        const deploymentId = (0, _deploymentid.getDeploymentId)();
        if (src.startsWith('/') && !src.startsWith('//') && deploymentId) {
            const sep = src.includes('?') ? '&' : '?';
            src = `${src}${sep}dpl=${deploymentId}`;
        }
        return {
            src,
            srcSet: undefined,
            sizes: undefined
        };
    }
    const { widths, kind } = getWidths(config, width, sizes);
    const last = widths.length - 1;
    return {
        sizes: !sizes && kind === 'w' ? '100vw' : sizes,
        srcSet: widths.map((w, i)=>`${loader({
                config,
                src,
                quality,
                width: w
            })} ${kind === 'w' ? w : i + 1}${kind}`).join(', '),
        // It's intended to keep `src` the last attribute because React updates
        // attributes in order. If we keep `src` the first one, Safari will
        // immediately start to fetch `src`, before `sizes` and `srcSet` are even
        // updated by React. That causes multiple unnecessary requests if `srcSet`
        // and `sizes` are defined.
        // This bug cannot be reproduced in Chrome or Firefox.
        src: loader({
            config,
            src,
            quality,
            width: widths[last]
        })
    };
}
function getImgProps({ src, sizes, unoptimized = false, priority = false, preload = false, loading, className, quality, width, height, fill = false, style, overrideSrc, onLoad, onLoadingComplete, placeholder = 'empty', blurDataURL, fetchPriority, decoding = 'async', layout, objectFit, objectPosition, lazyBoundary, lazyRoot, ...rest }, _state) {
    const { imgConf, showAltText, blurComplete, defaultLoader } = _state;
    let config;
    let c = imgConf || _imageconfig.imageConfigDefault;
    if ('allSizes' in c) {
        config = c;
    } else {
        const allSizes = [
            ...c.deviceSizes,
            ...c.imageSizes
        ].sort((a, b)=>a - b);
        const deviceSizes = c.deviceSizes.sort((a, b)=>a - b);
        const qualities = c.qualities?.sort((a, b)=>a - b);
        config = {
            ...c,
            allSizes,
            deviceSizes,
            qualities
        };
    }
    if (typeof defaultLoader === 'undefined') {
        throw Object.defineProperty(new Error('images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config'), "__NEXT_ERROR_CODE", {
            value: "E163",
            enumerable: false,
            configurable: true
        });
    }
    let loader = rest.loader || defaultLoader;
    // Remove property so it's not spread on <img> element
    delete rest.loader;
    delete rest.srcSet;
    // This special value indicates that the user
    // didn't define a "loader" prop or "loader" config.
    const isDefaultLoader = '__next_img_default' in loader;
    if (isDefaultLoader) {
        if (config.loader === 'custom') {
            throw Object.defineProperty(new Error(`Image with src "${src}" is missing "loader" prop.` + `\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader`), "__NEXT_ERROR_CODE", {
                value: "E252",
                enumerable: false,
                configurable: true
            });
        }
    } else {
        // The user defined a "loader" prop or config.
        // Since the config object is internal only, we
        // must not pass it to the user-defined "loader".
        const customImageLoader = loader;
        loader = (obj)=>{
            const { config: _, ...opts } = obj;
            return customImageLoader(opts);
        };
    }
    if (layout) {
        if (layout === 'fill') {
            fill = true;
        }
        const layoutToStyle = {
            intrinsic: {
                maxWidth: '100%',
                height: 'auto'
            },
            responsive: {
                width: '100%',
                height: 'auto'
            }
        };
        const layoutToSizes = {
            responsive: '100vw',
            fill: '100vw'
        };
        const layoutStyle = layoutToStyle[layout];
        if (layoutStyle) {
            style = {
                ...style,
                ...layoutStyle
            };
        }
        const layoutSizes = layoutToSizes[layout];
        if (layoutSizes && !sizes) {
            sizes = layoutSizes;
        }
    }
    let staticSrc = '';
    let widthInt = getInt(width);
    let heightInt = getInt(height);
    let blurWidth;
    let blurHeight;
    if (isStaticImport(src)) {
        const staticImageData = isStaticRequire(src) ? src.default : src;
        if (!staticImageData.src) {
            throw Object.defineProperty(new Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(staticImageData)}`), "__NEXT_ERROR_CODE", {
                value: "E460",
                enumerable: false,
                configurable: true
            });
        }
        if (!staticImageData.height || !staticImageData.width) {
            throw Object.defineProperty(new Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(staticImageData)}`), "__NEXT_ERROR_CODE", {
                value: "E48",
                enumerable: false,
                configurable: true
            });
        }
        blurWidth = staticImageData.blurWidth;
        blurHeight = staticImageData.blurHeight;
        blurDataURL = blurDataURL || staticImageData.blurDataURL;
        staticSrc = staticImageData.src;
        if (!fill) {
            if (!widthInt && !heightInt) {
                widthInt = staticImageData.width;
                heightInt = staticImageData.height;
            } else if (widthInt && !heightInt) {
                const ratio = widthInt / staticImageData.width;
                heightInt = Math.round(staticImageData.height * ratio);
            } else if (!widthInt && heightInt) {
                const ratio = heightInt / staticImageData.height;
                widthInt = Math.round(staticImageData.width * ratio);
            }
        }
    }
    src = typeof src === 'string' ? src : staticSrc;
    let isLazy = !priority && !preload && (loading === 'lazy' || typeof loading === 'undefined');
    if (!src || src.startsWith('data:') || src.startsWith('blob:')) {
        // https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
        unoptimized = true;
        isLazy = false;
    }
    if (config.unoptimized) {
        unoptimized = true;
    }
    if (isDefaultLoader && !config.dangerouslyAllowSVG && src.split('?', 1)[0].endsWith('.svg')) {
        // Special case to make svg serve as-is to avoid proxying
        // through the built-in Image Optimization API.
        unoptimized = true;
    }
    const qualityInt = getInt(quality);
    if ("TURBOPACK compile-time truthy", 1) {
        if (config.output === 'export' && isDefaultLoader && !unoptimized) {
            throw Object.defineProperty(new Error(`Image Optimization using the default loader is not compatible with \`{ output: 'export' }\`.
  Possible solutions:
    - Remove \`{ output: 'export' }\` and run "next start" to run server mode including the Image Optimization API.
    - Configure \`{ images: { unoptimized: true } }\` in \`next.config.js\` to disable the Image Optimization API.
  Read more: https://nextjs.org/docs/messages/export-image-api`), "__NEXT_ERROR_CODE", {
                value: "E500",
                enumerable: false,
                configurable: true
            });
        }
        if (!src) {
            // React doesn't show the stack trace and there's
            // no `src` to help identify which image, so we
            // instead console.error(ref) during mount.
            unoptimized = true;
        } else {
            if (fill) {
                if (width) {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has both "width" and "fill" properties. Only one should be used.`), "__NEXT_ERROR_CODE", {
                        value: "E96",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (height) {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has both "height" and "fill" properties. Only one should be used.`), "__NEXT_ERROR_CODE", {
                        value: "E115",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (style?.position && style.position !== 'absolute') {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has both "fill" and "style.position" properties. Images with "fill" always use position absolute - it cannot be modified.`), "__NEXT_ERROR_CODE", {
                        value: "E216",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (style?.width && style.width !== '100%') {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has both "fill" and "style.width" properties. Images with "fill" always use width 100% - it cannot be modified.`), "__NEXT_ERROR_CODE", {
                        value: "E73",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (style?.height && style.height !== '100%') {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has both "fill" and "style.height" properties. Images with "fill" always use height 100% - it cannot be modified.`), "__NEXT_ERROR_CODE", {
                        value: "E404",
                        enumerable: false,
                        configurable: true
                    });
                }
            } else {
                if (typeof widthInt === 'undefined') {
                    throw Object.defineProperty(new Error(`Image with src "${src}" is missing required "width" property.`), "__NEXT_ERROR_CODE", {
                        value: "E451",
                        enumerable: false,
                        configurable: true
                    });
                } else if (isNaN(widthInt)) {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has invalid "width" property. Expected a numeric value in pixels but received "${width}".`), "__NEXT_ERROR_CODE", {
                        value: "E66",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (typeof heightInt === 'undefined') {
                    throw Object.defineProperty(new Error(`Image with src "${src}" is missing required "height" property.`), "__NEXT_ERROR_CODE", {
                        value: "E397",
                        enumerable: false,
                        configurable: true
                    });
                } else if (isNaN(heightInt)) {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has invalid "height" property. Expected a numeric value in pixels but received "${height}".`), "__NEXT_ERROR_CODE", {
                        value: "E444",
                        enumerable: false,
                        configurable: true
                    });
                }
                // eslint-disable-next-line no-control-regex
                if (/^[\x00-\x20]/.test(src)) {
                    throw Object.defineProperty(new Error(`Image with src "${src}" cannot start with a space or control character. Use src.trimStart() to remove it or encodeURIComponent(src) to keep it.`), "__NEXT_ERROR_CODE", {
                        value: "E176",
                        enumerable: false,
                        configurable: true
                    });
                }
                // eslint-disable-next-line no-control-regex
                if (/[\x00-\x20]$/.test(src)) {
                    throw Object.defineProperty(new Error(`Image with src "${src}" cannot end with a space or control character. Use src.trimEnd() to remove it or encodeURIComponent(src) to keep it.`), "__NEXT_ERROR_CODE", {
                        value: "E21",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
        if (!VALID_LOADING_VALUES.includes(loading)) {
            throw Object.defineProperty(new Error(`Image with src "${src}" has invalid "loading" property. Provided "${loading}" should be one of ${VALID_LOADING_VALUES.map(String).join(',')}.`), "__NEXT_ERROR_CODE", {
                value: "E357",
                enumerable: false,
                configurable: true
            });
        }
        if (priority && loading === 'lazy') {
            throw Object.defineProperty(new Error(`Image with src "${src}" has both "priority" and "loading='lazy'" properties. Only one should be used.`), "__NEXT_ERROR_CODE", {
                value: "E218",
                enumerable: false,
                configurable: true
            });
        }
        if (preload && loading === 'lazy') {
            throw Object.defineProperty(new Error(`Image with src "${src}" has both "preload" and "loading='lazy'" properties. Only one should be used.`), "__NEXT_ERROR_CODE", {
                value: "E803",
                enumerable: false,
                configurable: true
            });
        }
        if (preload && priority) {
            throw Object.defineProperty(new Error(`Image with src "${src}" has both "preload" and "priority" properties. Only "preload" should be used.`), "__NEXT_ERROR_CODE", {
                value: "E802",
                enumerable: false,
                configurable: true
            });
        }
        if (placeholder !== 'empty' && placeholder !== 'blur' && !placeholder.startsWith('data:image/')) {
            throw Object.defineProperty(new Error(`Image with src "${src}" has invalid "placeholder" property "${placeholder}".`), "__NEXT_ERROR_CODE", {
                value: "E431",
                enumerable: false,
                configurable: true
            });
        }
        if (placeholder !== 'empty') {
            if (widthInt && heightInt && widthInt * heightInt < 1600) {
                (0, _warnonce.warnOnce)(`Image with src "${src}" is smaller than 40x40. Consider removing the "placeholder" property to improve performance.`);
            }
        }
        if (qualityInt && config.qualities && !config.qualities.includes(qualityInt)) {
            (0, _warnonce.warnOnce)(`Image with src "${src}" is using quality "${qualityInt}" which is not configured in images.qualities [${config.qualities.join(', ')}]. Please update your config to [${[
                ...config.qualities,
                qualityInt
            ].sort().join(', ')}].` + `\nRead more: https://nextjs.org/docs/messages/next-image-unconfigured-qualities`);
        }
        if (placeholder === 'blur' && !blurDataURL) {
            const VALID_BLUR_EXT = [
                'jpeg',
                'png',
                'webp',
                'avif'
            ] // should match next-image-loader
            ;
            throw Object.defineProperty(new Error(`Image with src "${src}" has "placeholder='blur'" property but is missing the "blurDataURL" property.
        Possible solutions:
          - Add a "blurDataURL" property, the contents should be a small Data URL to represent the image
          - Change the "src" property to a static import with one of the supported file types: ${VALID_BLUR_EXT.join(',')} (animated images not supported)
          - Remove the "placeholder" property, effectively no blur effect
        Read more: https://nextjs.org/docs/messages/placeholder-blur-data-url`), "__NEXT_ERROR_CODE", {
                value: "E371",
                enumerable: false,
                configurable: true
            });
        }
        if ('ref' in rest) {
            (0, _warnonce.warnOnce)(`Image with src "${src}" is using unsupported "ref" property. Consider using the "onLoad" property instead.`);
        }
        if (!unoptimized && !isDefaultLoader) {
            const urlStr = loader({
                config,
                src,
                width: widthInt || 400,
                quality: qualityInt || 75
            });
            let url;
            try {
                url = new URL(urlStr);
            } catch (err) {}
            if (urlStr === src || url && url.pathname === src && !url.search) {
                (0, _warnonce.warnOnce)(`Image with src "${src}" has a "loader" property that does not implement width. Please implement it or use the "unoptimized" property instead.` + `\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader-width`);
            }
        }
        if (onLoadingComplete) {
            (0, _warnonce.warnOnce)(`Image with src "${src}" is using deprecated "onLoadingComplete" property. Please use the "onLoad" property instead.`);
        }
        for (const [legacyKey, legacyValue] of Object.entries({
            layout,
            objectFit,
            objectPosition,
            lazyBoundary,
            lazyRoot
        })){
            if (legacyValue) {
                (0, _warnonce.warnOnce)(`Image with src "${src}" has legacy prop "${legacyKey}". Did you forget to run the codemod?` + `\nRead more: https://nextjs.org/docs/messages/next-image-upgrade-to-13`);
            }
        }
        if (typeof window !== 'undefined' && !perfObserver && window.PerformanceObserver) {
            perfObserver = new PerformanceObserver((entryList)=>{
                for (const entry of entryList.getEntries()){
                    // @ts-ignore - missing "LargestContentfulPaint" class with "element" prop
                    const imgSrc = entry?.element?.src || '';
                    const lcpImage = allImgs.get(imgSrc);
                    if (lcpImage && lcpImage.loading === 'lazy' && lcpImage.placeholder === 'empty' && !lcpImage.src.startsWith('data:') && !lcpImage.src.startsWith('blob:')) {
                        // https://web.dev/lcp/#measure-lcp-in-javascript
                        (0, _warnonce.warnOnce)(`Image with src "${lcpImage.src}" was detected as the Largest Contentful Paint (LCP). Please add the \`loading="eager"\` property if this image is above the fold.` + `\nRead more: https://nextjs.org/docs/app/api-reference/components/image#loading`);
                    }
                }
            });
            try {
                perfObserver.observe({
                    type: 'largest-contentful-paint',
                    buffered: true
                });
            } catch (err) {
                // Log error but don't crash the app
                console.error(err);
            }
        }
    }
    const imgStyle = Object.assign(fill ? {
        position: 'absolute',
        height: '100%',
        width: '100%',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        objectFit,
        objectPosition
    } : {}, showAltText ? {} : {
        color: 'transparent'
    }, style);
    const backgroundImage = !blurComplete && placeholder !== 'empty' ? placeholder === 'blur' ? `url("data:image/svg+xml;charset=utf-8,${(0, _imageblursvg.getImageBlurSvg)({
        widthInt,
        heightInt,
        blurWidth,
        blurHeight,
        blurDataURL: blurDataURL || '',
        objectFit: imgStyle.objectFit
    })}")` : `url("${placeholder}")` // assume `data:image/`
     : null;
    const backgroundSize = !INVALID_BACKGROUND_SIZE_VALUES.includes(imgStyle.objectFit) ? imgStyle.objectFit : imgStyle.objectFit === 'fill' ? '100% 100%' // the background-size equivalent of `fill`
     : 'cover';
    let placeholderStyle = backgroundImage ? {
        backgroundSize,
        backgroundPosition: imgStyle.objectPosition || '50% 50%',
        backgroundRepeat: 'no-repeat',
        backgroundImage
    } : {};
    if ("TURBOPACK compile-time truthy", 1) {
        if (placeholderStyle.backgroundImage && placeholder === 'blur' && blurDataURL?.startsWith('/')) {
            // During `next dev`, we don't want to generate blur placeholders with webpack
            // because it can delay starting the dev server. Instead, `next-image-loader.js`
            // will inline a special url to lazily generate the blur placeholder at request time.
            placeholderStyle.backgroundImage = `url("${blurDataURL}")`;
        }
    }
    const imgAttributes = generateImgAttrs({
        config,
        src,
        unoptimized,
        width: widthInt,
        quality: qualityInt,
        sizes,
        loader
    });
    const loadingFinal = isLazy ? 'lazy' : loading;
    if ("TURBOPACK compile-time truthy", 1) {
        if (typeof window !== 'undefined') {
            let fullUrl;
            try {
                fullUrl = new URL(imgAttributes.src);
            } catch (e) {
                fullUrl = new URL(imgAttributes.src, window.location.href);
            }
            allImgs.set(fullUrl.href, {
                src,
                loading: loadingFinal,
                placeholder
            });
        }
    }
    const props = {
        ...rest,
        loading: loadingFinal,
        fetchPriority,
        width: widthInt,
        height: heightInt,
        decoding,
        className,
        style: {
            ...imgStyle,
            ...placeholderStyle
        },
        sizes: imgAttributes.sizes,
        srcSet: imgAttributes.srcSet,
        src: overrideSrc || imgAttributes.src
    };
    const meta = {
        unoptimized,
        preload: preload || priority,
        placeholder,
        fill
    };
    return {
        props,
        meta
    };
} //# sourceMappingURL=get-img-props.js.map
}),
"[project]/setly.front/node_modules/next/dist/shared/lib/side-effect.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return SideEffect;
    }
});
const _react = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
const isServer = typeof window === 'undefined';
const useClientOnlyLayoutEffect = isServer ? ()=>{} : _react.useLayoutEffect;
const useClientOnlyEffect = isServer ? ()=>{} : _react.useEffect;
function SideEffect(props) {
    const { headManager, reduceComponentsToState } = props;
    function emitChange() {
        if (headManager && headManager.mountedInstances) {
            const headElements = _react.Children.toArray(Array.from(headManager.mountedInstances).filter(Boolean));
            headManager.updateHead(reduceComponentsToState(headElements));
        }
    }
    if (isServer) {
        headManager?.mountedInstances?.add(props.children);
        emitChange();
    }
    useClientOnlyLayoutEffect({
        "SideEffect.useClientOnlyLayoutEffect": ()=>{
            headManager?.mountedInstances?.add(props.children);
            return ({
                "SideEffect.useClientOnlyLayoutEffect": ()=>{
                    headManager?.mountedInstances?.delete(props.children);
                }
            })["SideEffect.useClientOnlyLayoutEffect"];
        }
    }["SideEffect.useClientOnlyLayoutEffect"]);
    // We need to call `updateHead` method whenever the `SideEffect` is trigger in all
    // life-cycles: mount, update, unmount. However, if there are multiple `SideEffect`s
    // being rendered, we only trigger the method from the last one.
    // This is ensured by keeping the last unflushed `updateHead` in the `_pendingUpdate`
    // singleton in the layout effect pass, and actually trigger it in the effect pass.
    useClientOnlyLayoutEffect({
        "SideEffect.useClientOnlyLayoutEffect": ()=>{
            if (headManager) {
                headManager._pendingUpdate = emitChange;
            }
            return ({
                "SideEffect.useClientOnlyLayoutEffect": ()=>{
                    if (headManager) {
                        headManager._pendingUpdate = emitChange;
                    }
                }
            })["SideEffect.useClientOnlyLayoutEffect"];
        }
    }["SideEffect.useClientOnlyLayoutEffect"]);
    useClientOnlyEffect({
        "SideEffect.useClientOnlyEffect": ()=>{
            if (headManager && headManager._pendingUpdate) {
                headManager._pendingUpdate();
                headManager._pendingUpdate = null;
            }
            return ({
                "SideEffect.useClientOnlyEffect": ()=>{
                    if (headManager && headManager._pendingUpdate) {
                        headManager._pendingUpdate();
                        headManager._pendingUpdate = null;
                    }
                }
            })["SideEffect.useClientOnlyEffect"];
        }
    }["SideEffect.useClientOnlyEffect"]);
    return null;
} //# sourceMappingURL=side-effect.js.map
}),
"[project]/setly.front/node_modules/next/dist/shared/lib/head.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    defaultHead: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return _default;
    },
    defaultHead: function() {
        return defaultHead;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/setly.front/node_modules/next/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _interop_require_wildcard = __turbopack_context__.r("[project]/setly.front/node_modules/next/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/setly.front/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _sideeffect = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/side-effect.js [app-client] (ecmascript)"));
const _headmanagercontextsharedruntime = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/head-manager-context.shared-runtime.js [app-client] (ecmascript)");
const _warnonce = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
function defaultHead() {
    const head = [
        /*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            charSet: "utf-8"
        }, "charset"),
        /*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            name: "viewport",
            content: "width=device-width"
        }, "viewport")
    ];
    return head;
}
function onlyReactElement(list, child) {
    // React children can be "string" or "number" in this case we ignore them for backwards compat
    if (typeof child === 'string' || typeof child === 'number') {
        return list;
    }
    // Adds support for React.Fragment
    if (child.type === _react.default.Fragment) {
        return list.concat(_react.default.Children.toArray(child.props.children).reduce((fragmentList, fragmentChild)=>{
            if (typeof fragmentChild === 'string' || typeof fragmentChild === 'number') {
                return fragmentList;
            }
            return fragmentList.concat(fragmentChild);
        }, []));
    }
    return list.concat(child);
}
const METATYPES = [
    'name',
    'httpEquiv',
    'charSet',
    'itemProp'
];
/*
 returns a function for filtering head child elements
 which shouldn't be duplicated, like <title/>
 Also adds support for deduplicated `key` properties
*/ function unique() {
    const keys = new Set();
    const tags = new Set();
    const metaTypes = new Set();
    const metaCategories = {};
    return (h)=>{
        let isUnique = true;
        let hasKey = false;
        if (h.key && typeof h.key !== 'number' && h.key.indexOf('$') > 0) {
            hasKey = true;
            const key = h.key.slice(h.key.indexOf('$') + 1);
            if (keys.has(key)) {
                isUnique = false;
            } else {
                keys.add(key);
            }
        }
        // eslint-disable-next-line default-case
        switch(h.type){
            case 'title':
            case 'base':
                if (tags.has(h.type)) {
                    isUnique = false;
                } else {
                    tags.add(h.type);
                }
                break;
            case 'meta':
                for(let i = 0, len = METATYPES.length; i < len; i++){
                    const metatype = METATYPES[i];
                    if (!h.props.hasOwnProperty(metatype)) continue;
                    if (metatype === 'charSet') {
                        if (metaTypes.has(metatype)) {
                            isUnique = false;
                        } else {
                            metaTypes.add(metatype);
                        }
                    } else {
                        const category = h.props[metatype];
                        const categories = metaCategories[metatype] || new Set();
                        if ((metatype !== 'name' || !hasKey) && categories.has(category)) {
                            isUnique = false;
                        } else {
                            categories.add(category);
                            metaCategories[metatype] = categories;
                        }
                    }
                }
                break;
        }
        return isUnique;
    };
}
/**
 *
 * @param headChildrenElements List of children of <Head>
 */ function reduceComponents(headChildrenElements) {
    return headChildrenElements.reduce(onlyReactElement, []).reverse().concat(defaultHead().reverse()).filter(unique()).reverse().map((c, i)=>{
        const key = c.key || i;
        if ("TURBOPACK compile-time truthy", 1) {
            // omit JSON-LD structured data snippets from the warning
            if (c.type === 'script' && c.props['type'] !== 'application/ld+json') {
                const srcMessage = c.props['src'] ? `<script> tag with src="${c.props['src']}"` : `inline <script>`;
                (0, _warnonce.warnOnce)(`Do not add <script> tags using next/head (see ${srcMessage}). Use next/script instead. \nSee more info here: https://nextjs.org/docs/messages/no-script-tags-in-head-component`);
            } else if (c.type === 'link' && c.props['rel'] === 'stylesheet') {
                (0, _warnonce.warnOnce)(`Do not add stylesheets using next/head (see <link rel="stylesheet"> tag with href="${c.props['href']}"). Use Document instead. \nSee more info here: https://nextjs.org/docs/messages/no-stylesheets-in-head-component`);
            }
        }
        return /*#__PURE__*/ _react.default.cloneElement(c, {
            key
        });
    });
}
/**
 * This component injects elements to `<head>` of your page.
 * To avoid duplicated `tags` in `<head>` you can use the `key` property, which will make sure every tag is only rendered once.
 */ function Head({ children }) {
    const headManager = (0, _react.useContext)(_headmanagercontextsharedruntime.HeadManagerContext);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_sideeffect.default, {
        reduceComponentsToState: reduceComponents,
        headManager: headManager,
        children: children
    });
}
const _default = Head;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=head.js.map
}),
"[project]/setly.front/node_modules/next/dist/shared/lib/image-config-context.shared-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImageConfigContext", {
    enumerable: true,
    get: function() {
        return ImageConfigContext;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/setly.front/node_modules/next/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/setly.front/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _imageconfig = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/image-config.js [app-client] (ecmascript)");
const ImageConfigContext = _react.default.createContext(_imageconfig.imageConfigDefault);
if ("TURBOPACK compile-time truthy", 1) {
    ImageConfigContext.displayName = 'ImageConfigContext';
} //# sourceMappingURL=image-config-context.shared-runtime.js.map
}),
"[project]/setly.front/node_modules/next/dist/shared/lib/router-context.shared-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RouterContext", {
    enumerable: true,
    get: function() {
        return RouterContext;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/setly.front/node_modules/next/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/setly.front/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const RouterContext = _react.default.createContext(null);
if ("TURBOPACK compile-time truthy", 1) {
    RouterContext.displayName = 'RouterContext';
} //# sourceMappingURL=router-context.shared-runtime.js.map
}),
"[project]/setly.front/node_modules/next/dist/shared/lib/find-closest-quality.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findClosestQuality", {
    enumerable: true,
    get: function() {
        return findClosestQuality;
    }
});
function findClosestQuality(quality, config) {
    const q = quality || 75;
    if (!config?.qualities?.length) {
        return q;
    }
    return config.qualities.reduce((prev, cur)=>Math.abs(cur - q) < Math.abs(prev - q) ? cur : prev, 0);
} //# sourceMappingURL=find-closest-quality.js.map
}),
"[project]/setly.front/node_modules/next/dist/compiled/picomatch/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
(()=>{
    "use strict";
    var t = {
        170: (t, e, u)=>{
            const n = u(510);
            const isWindows = ()=>{
                if (typeof navigator !== "undefined" && navigator.platform) {
                    const t = navigator.platform.toLowerCase();
                    return t === "win32" || t === "windows";
                }
                if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== "undefined" && __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].platform) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].platform === "win32";
                }
                return false;
            };
            function picomatch(t, e, u = false) {
                if (e && (e.windows === null || e.windows === undefined)) {
                    e = {
                        ...e,
                        windows: isWindows()
                    };
                }
                return n(t, e, u);
            }
            Object.assign(picomatch, n);
            t.exports = picomatch;
        },
        154: (t)=>{
            const e = "\\\\/";
            const u = `[^${e}]`;
            const n = "\\.";
            const o = "\\+";
            const s = "\\?";
            const r = "\\/";
            const a = "(?=.)";
            const i = "[^/]";
            const c = `(?:${r}|$)`;
            const p = `(?:^|${r})`;
            const l = `${n}{1,2}${c}`;
            const f = `(?!${n})`;
            const A = `(?!${p}${l})`;
            const _ = `(?!${n}{0,1}${c})`;
            const R = `(?!${l})`;
            const E = `[^.${r}]`;
            const h = `${i}*?`;
            const g = "/";
            const b = {
                DOT_LITERAL: n,
                PLUS_LITERAL: o,
                QMARK_LITERAL: s,
                SLASH_LITERAL: r,
                ONE_CHAR: a,
                QMARK: i,
                END_ANCHOR: c,
                DOTS_SLASH: l,
                NO_DOT: f,
                NO_DOTS: A,
                NO_DOT_SLASH: _,
                NO_DOTS_SLASH: R,
                QMARK_NO_DOT: E,
                STAR: h,
                START_ANCHOR: p,
                SEP: g
            };
            const C = {
                ...b,
                SLASH_LITERAL: `[${e}]`,
                QMARK: u,
                STAR: `${u}*?`,
                DOTS_SLASH: `${n}{1,2}(?:[${e}]|$)`,
                NO_DOT: `(?!${n})`,
                NO_DOTS: `(?!(?:^|[${e}])${n}{1,2}(?:[${e}]|$))`,
                NO_DOT_SLASH: `(?!${n}{0,1}(?:[${e}]|$))`,
                NO_DOTS_SLASH: `(?!${n}{1,2}(?:[${e}]|$))`,
                QMARK_NO_DOT: `[^.${e}]`,
                START_ANCHOR: `(?:^|[${e}])`,
                END_ANCHOR: `(?:[${e}]|$)`,
                SEP: "\\"
            };
            const y = {
                alnum: "a-zA-Z0-9",
                alpha: "a-zA-Z",
                ascii: "\\x00-\\x7F",
                blank: " \\t",
                cntrl: "\\x00-\\x1F\\x7F",
                digit: "0-9",
                graph: "\\x21-\\x7E",
                lower: "a-z",
                print: "\\x20-\\x7E ",
                punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
                space: " \\t\\r\\n\\v\\f",
                upper: "A-Z",
                word: "A-Za-z0-9_",
                xdigit: "A-Fa-f0-9"
            };
            t.exports = {
                MAX_LENGTH: 1024 * 64,
                POSIX_REGEX_SOURCE: y,
                REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
                REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
                REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
                REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
                REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
                REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
                REPLACEMENTS: {
                    "***": "*",
                    "**/**": "**",
                    "**/**/**": "**"
                },
                CHAR_0: 48,
                CHAR_9: 57,
                CHAR_UPPERCASE_A: 65,
                CHAR_LOWERCASE_A: 97,
                CHAR_UPPERCASE_Z: 90,
                CHAR_LOWERCASE_Z: 122,
                CHAR_LEFT_PARENTHESES: 40,
                CHAR_RIGHT_PARENTHESES: 41,
                CHAR_ASTERISK: 42,
                CHAR_AMPERSAND: 38,
                CHAR_AT: 64,
                CHAR_BACKWARD_SLASH: 92,
                CHAR_CARRIAGE_RETURN: 13,
                CHAR_CIRCUMFLEX_ACCENT: 94,
                CHAR_COLON: 58,
                CHAR_COMMA: 44,
                CHAR_DOT: 46,
                CHAR_DOUBLE_QUOTE: 34,
                CHAR_EQUAL: 61,
                CHAR_EXCLAMATION_MARK: 33,
                CHAR_FORM_FEED: 12,
                CHAR_FORWARD_SLASH: 47,
                CHAR_GRAVE_ACCENT: 96,
                CHAR_HASH: 35,
                CHAR_HYPHEN_MINUS: 45,
                CHAR_LEFT_ANGLE_BRACKET: 60,
                CHAR_LEFT_CURLY_BRACE: 123,
                CHAR_LEFT_SQUARE_BRACKET: 91,
                CHAR_LINE_FEED: 10,
                CHAR_NO_BREAK_SPACE: 160,
                CHAR_PERCENT: 37,
                CHAR_PLUS: 43,
                CHAR_QUESTION_MARK: 63,
                CHAR_RIGHT_ANGLE_BRACKET: 62,
                CHAR_RIGHT_CURLY_BRACE: 125,
                CHAR_RIGHT_SQUARE_BRACKET: 93,
                CHAR_SEMICOLON: 59,
                CHAR_SINGLE_QUOTE: 39,
                CHAR_SPACE: 32,
                CHAR_TAB: 9,
                CHAR_UNDERSCORE: 95,
                CHAR_VERTICAL_LINE: 124,
                CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
                extglobChars (t) {
                    return {
                        "!": {
                            type: "negate",
                            open: "(?:(?!(?:",
                            close: `))${t.STAR})`
                        },
                        "?": {
                            type: "qmark",
                            open: "(?:",
                            close: ")?"
                        },
                        "+": {
                            type: "plus",
                            open: "(?:",
                            close: ")+"
                        },
                        "*": {
                            type: "star",
                            open: "(?:",
                            close: ")*"
                        },
                        "@": {
                            type: "at",
                            open: "(?:",
                            close: ")"
                        }
                    };
                },
                globChars (t) {
                    return t === true ? C : b;
                }
            };
        },
        697: (t, e, u)=>{
            const n = u(154);
            const o = u(96);
            const { MAX_LENGTH: s, POSIX_REGEX_SOURCE: r, REGEX_NON_SPECIAL_CHARS: a, REGEX_SPECIAL_CHARS_BACKREF: i, REPLACEMENTS: c } = n;
            const expandRange = (t, e)=>{
                if (typeof e.expandRange === "function") {
                    return e.expandRange(...t, e);
                }
                t.sort();
                const u = `[${t.join("-")}]`;
                try {
                    new RegExp(u);
                } catch (e) {
                    return t.map((t)=>o.escapeRegex(t)).join("..");
                }
                return u;
            };
            const syntaxError = (t, e)=>`Missing ${t}: "${e}" - use "\\\\${e}" to match literal characters`;
            const parse = (t, e)=>{
                if (typeof t !== "string") {
                    throw new TypeError("Expected a string");
                }
                t = c[t] || t;
                const u = {
                    ...e
                };
                const p = typeof u.maxLength === "number" ? Math.min(s, u.maxLength) : s;
                let l = t.length;
                if (l > p) {
                    throw new SyntaxError(`Input length: ${l}, exceeds maximum allowed length: ${p}`);
                }
                const f = {
                    type: "bos",
                    value: "",
                    output: u.prepend || ""
                };
                const A = [
                    f
                ];
                const _ = u.capture ? "" : "?:";
                const R = n.globChars(u.windows);
                const E = n.extglobChars(R);
                const { DOT_LITERAL: h, PLUS_LITERAL: g, SLASH_LITERAL: b, ONE_CHAR: C, DOTS_SLASH: y, NO_DOT: $, NO_DOT_SLASH: x, NO_DOTS_SLASH: S, QMARK: H, QMARK_NO_DOT: v, STAR: d, START_ANCHOR: L } = R;
                const globstar = (t)=>`(${_}(?:(?!${L}${t.dot ? y : h}).)*?)`;
                const T = u.dot ? "" : $;
                const O = u.dot ? H : v;
                let k = u.bash === true ? globstar(u) : d;
                if (u.capture) {
                    k = `(${k})`;
                }
                if (typeof u.noext === "boolean") {
                    u.noextglob = u.noext;
                }
                const m = {
                    input: t,
                    index: -1,
                    start: 0,
                    dot: u.dot === true,
                    consumed: "",
                    output: "",
                    prefix: "",
                    backtrack: false,
                    negated: false,
                    brackets: 0,
                    braces: 0,
                    parens: 0,
                    quotes: 0,
                    globstar: false,
                    tokens: A
                };
                t = o.removePrefix(t, m);
                l = t.length;
                const w = [];
                const N = [];
                const I = [];
                let B = f;
                let G;
                const eos = ()=>m.index === l - 1;
                const D = m.peek = (e = 1)=>t[m.index + e];
                const M = m.advance = ()=>t[++m.index] || "";
                const remaining = ()=>t.slice(m.index + 1);
                const consume = (t = "", e = 0)=>{
                    m.consumed += t;
                    m.index += e;
                };
                const append = (t)=>{
                    m.output += t.output != null ? t.output : t.value;
                    consume(t.value);
                };
                const negate = ()=>{
                    let t = 1;
                    while(D() === "!" && (D(2) !== "(" || D(3) === "?")){
                        M();
                        m.start++;
                        t++;
                    }
                    if (t % 2 === 0) {
                        return false;
                    }
                    m.negated = true;
                    m.start++;
                    return true;
                };
                const increment = (t)=>{
                    m[t]++;
                    I.push(t);
                };
                const decrement = (t)=>{
                    m[t]--;
                    I.pop();
                };
                const push = (t)=>{
                    if (B.type === "globstar") {
                        const e = m.braces > 0 && (t.type === "comma" || t.type === "brace");
                        const u = t.extglob === true || w.length && (t.type === "pipe" || t.type === "paren");
                        if (t.type !== "slash" && t.type !== "paren" && !e && !u) {
                            m.output = m.output.slice(0, -B.output.length);
                            B.type = "star";
                            B.value = "*";
                            B.output = k;
                            m.output += B.output;
                        }
                    }
                    if (w.length && t.type !== "paren") {
                        w[w.length - 1].inner += t.value;
                    }
                    if (t.value || t.output) append(t);
                    if (B && B.type === "text" && t.type === "text") {
                        B.output = (B.output || B.value) + t.value;
                        B.value += t.value;
                        return;
                    }
                    t.prev = B;
                    A.push(t);
                    B = t;
                };
                const extglobOpen = (t, e)=>{
                    const n = {
                        ...E[e],
                        conditions: 1,
                        inner: ""
                    };
                    n.prev = B;
                    n.parens = m.parens;
                    n.output = m.output;
                    const o = (u.capture ? "(" : "") + n.open;
                    increment("parens");
                    push({
                        type: t,
                        value: e,
                        output: m.output ? "" : C
                    });
                    push({
                        type: "paren",
                        extglob: true,
                        value: M(),
                        output: o
                    });
                    w.push(n);
                };
                const extglobClose = (t)=>{
                    let n = t.close + (u.capture ? ")" : "");
                    let o;
                    if (t.type === "negate") {
                        let s = k;
                        if (t.inner && t.inner.length > 1 && t.inner.includes("/")) {
                            s = globstar(u);
                        }
                        if (s !== k || eos() || /^\)+$/.test(remaining())) {
                            n = t.close = `)$))${s}`;
                        }
                        if (t.inner.includes("*") && (o = remaining()) && /^\.[^\\/.]+$/.test(o)) {
                            const u = parse(o, {
                                ...e,
                                fastpaths: false
                            }).output;
                            n = t.close = `)${u})${s})`;
                        }
                        if (t.prev.type === "bos") {
                            m.negatedExtglob = true;
                        }
                    }
                    push({
                        type: "paren",
                        extglob: true,
                        value: G,
                        output: n
                    });
                    decrement("parens");
                };
                if (u.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(t)) {
                    let n = false;
                    let s = t.replace(i, (t, e, u, o, s, r)=>{
                        if (o === "\\") {
                            n = true;
                            return t;
                        }
                        if (o === "?") {
                            if (e) {
                                return e + o + (s ? H.repeat(s.length) : "");
                            }
                            if (r === 0) {
                                return O + (s ? H.repeat(s.length) : "");
                            }
                            return H.repeat(u.length);
                        }
                        if (o === ".") {
                            return h.repeat(u.length);
                        }
                        if (o === "*") {
                            if (e) {
                                return e + o + (s ? k : "");
                            }
                            return k;
                        }
                        return e ? t : `\\${t}`;
                    });
                    if (n === true) {
                        if (u.unescape === true) {
                            s = s.replace(/\\/g, "");
                        } else {
                            s = s.replace(/\\+/g, (t)=>t.length % 2 === 0 ? "\\\\" : t ? "\\" : "");
                        }
                    }
                    if (s === t && u.contains === true) {
                        m.output = t;
                        return m;
                    }
                    m.output = o.wrapOutput(s, m, e);
                    return m;
                }
                while(!eos()){
                    G = M();
                    if (G === "\0") {
                        continue;
                    }
                    if (G === "\\") {
                        const t = D();
                        if (t === "/" && u.bash !== true) {
                            continue;
                        }
                        if (t === "." || t === ";") {
                            continue;
                        }
                        if (!t) {
                            G += "\\";
                            push({
                                type: "text",
                                value: G
                            });
                            continue;
                        }
                        const e = /^\\+/.exec(remaining());
                        let n = 0;
                        if (e && e[0].length > 2) {
                            n = e[0].length;
                            m.index += n;
                            if (n % 2 !== 0) {
                                G += "\\";
                            }
                        }
                        if (u.unescape === true) {
                            G = M();
                        } else {
                            G += M();
                        }
                        if (m.brackets === 0) {
                            push({
                                type: "text",
                                value: G
                            });
                            continue;
                        }
                    }
                    if (m.brackets > 0 && (G !== "]" || B.value === "[" || B.value === "[^")) {
                        if (u.posix !== false && G === ":") {
                            const t = B.value.slice(1);
                            if (t.includes("[")) {
                                B.posix = true;
                                if (t.includes(":")) {
                                    const t = B.value.lastIndexOf("[");
                                    const e = B.value.slice(0, t);
                                    const u = B.value.slice(t + 2);
                                    const n = r[u];
                                    if (n) {
                                        B.value = e + n;
                                        m.backtrack = true;
                                        M();
                                        if (!f.output && A.indexOf(B) === 1) {
                                            f.output = C;
                                        }
                                        continue;
                                    }
                                }
                            }
                        }
                        if (G === "[" && D() !== ":" || G === "-" && D() === "]") {
                            G = `\\${G}`;
                        }
                        if (G === "]" && (B.value === "[" || B.value === "[^")) {
                            G = `\\${G}`;
                        }
                        if (u.posix === true && G === "!" && B.value === "[") {
                            G = "^";
                        }
                        B.value += G;
                        append({
                            value: G
                        });
                        continue;
                    }
                    if (m.quotes === 1 && G !== '"') {
                        G = o.escapeRegex(G);
                        B.value += G;
                        append({
                            value: G
                        });
                        continue;
                    }
                    if (G === '"') {
                        m.quotes = m.quotes === 1 ? 0 : 1;
                        if (u.keepQuotes === true) {
                            push({
                                type: "text",
                                value: G
                            });
                        }
                        continue;
                    }
                    if (G === "(") {
                        increment("parens");
                        push({
                            type: "paren",
                            value: G
                        });
                        continue;
                    }
                    if (G === ")") {
                        if (m.parens === 0 && u.strictBrackets === true) {
                            throw new SyntaxError(syntaxError("opening", "("));
                        }
                        const t = w[w.length - 1];
                        if (t && m.parens === t.parens + 1) {
                            extglobClose(w.pop());
                            continue;
                        }
                        push({
                            type: "paren",
                            value: G,
                            output: m.parens ? ")" : "\\)"
                        });
                        decrement("parens");
                        continue;
                    }
                    if (G === "[") {
                        if (u.nobracket === true || !remaining().includes("]")) {
                            if (u.nobracket !== true && u.strictBrackets === true) {
                                throw new SyntaxError(syntaxError("closing", "]"));
                            }
                            G = `\\${G}`;
                        } else {
                            increment("brackets");
                        }
                        push({
                            type: "bracket",
                            value: G
                        });
                        continue;
                    }
                    if (G === "]") {
                        if (u.nobracket === true || B && B.type === "bracket" && B.value.length === 1) {
                            push({
                                type: "text",
                                value: G,
                                output: `\\${G}`
                            });
                            continue;
                        }
                        if (m.brackets === 0) {
                            if (u.strictBrackets === true) {
                                throw new SyntaxError(syntaxError("opening", "["));
                            }
                            push({
                                type: "text",
                                value: G,
                                output: `\\${G}`
                            });
                            continue;
                        }
                        decrement("brackets");
                        const t = B.value.slice(1);
                        if (B.posix !== true && t[0] === "^" && !t.includes("/")) {
                            G = `/${G}`;
                        }
                        B.value += G;
                        append({
                            value: G
                        });
                        if (u.literalBrackets === false || o.hasRegexChars(t)) {
                            continue;
                        }
                        const e = o.escapeRegex(B.value);
                        m.output = m.output.slice(0, -B.value.length);
                        if (u.literalBrackets === true) {
                            m.output += e;
                            B.value = e;
                            continue;
                        }
                        B.value = `(${_}${e}|${B.value})`;
                        m.output += B.value;
                        continue;
                    }
                    if (G === "{" && u.nobrace !== true) {
                        increment("braces");
                        const t = {
                            type: "brace",
                            value: G,
                            output: "(",
                            outputIndex: m.output.length,
                            tokensIndex: m.tokens.length
                        };
                        N.push(t);
                        push(t);
                        continue;
                    }
                    if (G === "}") {
                        const t = N[N.length - 1];
                        if (u.nobrace === true || !t) {
                            push({
                                type: "text",
                                value: G,
                                output: G
                            });
                            continue;
                        }
                        let e = ")";
                        if (t.dots === true) {
                            const t = A.slice();
                            const n = [];
                            for(let e = t.length - 1; e >= 0; e--){
                                A.pop();
                                if (t[e].type === "brace") {
                                    break;
                                }
                                if (t[e].type !== "dots") {
                                    n.unshift(t[e].value);
                                }
                            }
                            e = expandRange(n, u);
                            m.backtrack = true;
                        }
                        if (t.comma !== true && t.dots !== true) {
                            const u = m.output.slice(0, t.outputIndex);
                            const n = m.tokens.slice(t.tokensIndex);
                            t.value = t.output = "\\{";
                            G = e = "\\}";
                            m.output = u;
                            for (const t of n){
                                m.output += t.output || t.value;
                            }
                        }
                        push({
                            type: "brace",
                            value: G,
                            output: e
                        });
                        decrement("braces");
                        N.pop();
                        continue;
                    }
                    if (G === "|") {
                        if (w.length > 0) {
                            w[w.length - 1].conditions++;
                        }
                        push({
                            type: "text",
                            value: G
                        });
                        continue;
                    }
                    if (G === ",") {
                        let t = G;
                        const e = N[N.length - 1];
                        if (e && I[I.length - 1] === "braces") {
                            e.comma = true;
                            t = "|";
                        }
                        push({
                            type: "comma",
                            value: G,
                            output: t
                        });
                        continue;
                    }
                    if (G === "/") {
                        if (B.type === "dot" && m.index === m.start + 1) {
                            m.start = m.index + 1;
                            m.consumed = "";
                            m.output = "";
                            A.pop();
                            B = f;
                            continue;
                        }
                        push({
                            type: "slash",
                            value: G,
                            output: b
                        });
                        continue;
                    }
                    if (G === ".") {
                        if (m.braces > 0 && B.type === "dot") {
                            if (B.value === ".") B.output = h;
                            const t = N[N.length - 1];
                            B.type = "dots";
                            B.output += G;
                            B.value += G;
                            t.dots = true;
                            continue;
                        }
                        if (m.braces + m.parens === 0 && B.type !== "bos" && B.type !== "slash") {
                            push({
                                type: "text",
                                value: G,
                                output: h
                            });
                            continue;
                        }
                        push({
                            type: "dot",
                            value: G,
                            output: h
                        });
                        continue;
                    }
                    if (G === "?") {
                        const t = B && B.value === "(";
                        if (!t && u.noextglob !== true && D() === "(" && D(2) !== "?") {
                            extglobOpen("qmark", G);
                            continue;
                        }
                        if (B && B.type === "paren") {
                            const t = D();
                            let e = G;
                            if (B.value === "(" && !/[!=<:]/.test(t) || t === "<" && !/<([!=]|\w+>)/.test(remaining())) {
                                e = `\\${G}`;
                            }
                            push({
                                type: "text",
                                value: G,
                                output: e
                            });
                            continue;
                        }
                        if (u.dot !== true && (B.type === "slash" || B.type === "bos")) {
                            push({
                                type: "qmark",
                                value: G,
                                output: v
                            });
                            continue;
                        }
                        push({
                            type: "qmark",
                            value: G,
                            output: H
                        });
                        continue;
                    }
                    if (G === "!") {
                        if (u.noextglob !== true && D() === "(") {
                            if (D(2) !== "?" || !/[!=<:]/.test(D(3))) {
                                extglobOpen("negate", G);
                                continue;
                            }
                        }
                        if (u.nonegate !== true && m.index === 0) {
                            negate();
                            continue;
                        }
                    }
                    if (G === "+") {
                        if (u.noextglob !== true && D() === "(" && D(2) !== "?") {
                            extglobOpen("plus", G);
                            continue;
                        }
                        if (B && B.value === "(" || u.regex === false) {
                            push({
                                type: "plus",
                                value: G,
                                output: g
                            });
                            continue;
                        }
                        if (B && (B.type === "bracket" || B.type === "paren" || B.type === "brace") || m.parens > 0) {
                            push({
                                type: "plus",
                                value: G
                            });
                            continue;
                        }
                        push({
                            type: "plus",
                            value: g
                        });
                        continue;
                    }
                    if (G === "@") {
                        if (u.noextglob !== true && D() === "(" && D(2) !== "?") {
                            push({
                                type: "at",
                                extglob: true,
                                value: G,
                                output: ""
                            });
                            continue;
                        }
                        push({
                            type: "text",
                            value: G
                        });
                        continue;
                    }
                    if (G !== "*") {
                        if (G === "$" || G === "^") {
                            G = `\\${G}`;
                        }
                        const t = a.exec(remaining());
                        if (t) {
                            G += t[0];
                            m.index += t[0].length;
                        }
                        push({
                            type: "text",
                            value: G
                        });
                        continue;
                    }
                    if (B && (B.type === "globstar" || B.star === true)) {
                        B.type = "star";
                        B.star = true;
                        B.value += G;
                        B.output = k;
                        m.backtrack = true;
                        m.globstar = true;
                        consume(G);
                        continue;
                    }
                    let e = remaining();
                    if (u.noextglob !== true && /^\([^?]/.test(e)) {
                        extglobOpen("star", G);
                        continue;
                    }
                    if (B.type === "star") {
                        if (u.noglobstar === true) {
                            consume(G);
                            continue;
                        }
                        const n = B.prev;
                        const o = n.prev;
                        const s = n.type === "slash" || n.type === "bos";
                        const r = o && (o.type === "star" || o.type === "globstar");
                        if (u.bash === true && (!s || e[0] && e[0] !== "/")) {
                            push({
                                type: "star",
                                value: G,
                                output: ""
                            });
                            continue;
                        }
                        const a = m.braces > 0 && (n.type === "comma" || n.type === "brace");
                        const i = w.length && (n.type === "pipe" || n.type === "paren");
                        if (!s && n.type !== "paren" && !a && !i) {
                            push({
                                type: "star",
                                value: G,
                                output: ""
                            });
                            continue;
                        }
                        while(e.slice(0, 3) === "/**"){
                            const u = t[m.index + 4];
                            if (u && u !== "/") {
                                break;
                            }
                            e = e.slice(3);
                            consume("/**", 3);
                        }
                        if (n.type === "bos" && eos()) {
                            B.type = "globstar";
                            B.value += G;
                            B.output = globstar(u);
                            m.output = B.output;
                            m.globstar = true;
                            consume(G);
                            continue;
                        }
                        if (n.type === "slash" && n.prev.type !== "bos" && !r && eos()) {
                            m.output = m.output.slice(0, -(n.output + B.output).length);
                            n.output = `(?:${n.output}`;
                            B.type = "globstar";
                            B.output = globstar(u) + (u.strictSlashes ? ")" : "|$)");
                            B.value += G;
                            m.globstar = true;
                            m.output += n.output + B.output;
                            consume(G);
                            continue;
                        }
                        if (n.type === "slash" && n.prev.type !== "bos" && e[0] === "/") {
                            const t = e[1] !== void 0 ? "|$" : "";
                            m.output = m.output.slice(0, -(n.output + B.output).length);
                            n.output = `(?:${n.output}`;
                            B.type = "globstar";
                            B.output = `${globstar(u)}${b}|${b}${t})`;
                            B.value += G;
                            m.output += n.output + B.output;
                            m.globstar = true;
                            consume(G + M());
                            push({
                                type: "slash",
                                value: "/",
                                output: ""
                            });
                            continue;
                        }
                        if (n.type === "bos" && e[0] === "/") {
                            B.type = "globstar";
                            B.value += G;
                            B.output = `(?:^|${b}|${globstar(u)}${b})`;
                            m.output = B.output;
                            m.globstar = true;
                            consume(G + M());
                            push({
                                type: "slash",
                                value: "/",
                                output: ""
                            });
                            continue;
                        }
                        m.output = m.output.slice(0, -B.output.length);
                        B.type = "globstar";
                        B.output = globstar(u);
                        B.value += G;
                        m.output += B.output;
                        m.globstar = true;
                        consume(G);
                        continue;
                    }
                    const n = {
                        type: "star",
                        value: G,
                        output: k
                    };
                    if (u.bash === true) {
                        n.output = ".*?";
                        if (B.type === "bos" || B.type === "slash") {
                            n.output = T + n.output;
                        }
                        push(n);
                        continue;
                    }
                    if (B && (B.type === "bracket" || B.type === "paren") && u.regex === true) {
                        n.output = G;
                        push(n);
                        continue;
                    }
                    if (m.index === m.start || B.type === "slash" || B.type === "dot") {
                        if (B.type === "dot") {
                            m.output += x;
                            B.output += x;
                        } else if (u.dot === true) {
                            m.output += S;
                            B.output += S;
                        } else {
                            m.output += T;
                            B.output += T;
                        }
                        if (D() !== "*") {
                            m.output += C;
                            B.output += C;
                        }
                    }
                    push(n);
                }
                while(m.brackets > 0){
                    if (u.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
                    m.output = o.escapeLast(m.output, "[");
                    decrement("brackets");
                }
                while(m.parens > 0){
                    if (u.strictBrackets === true) throw new SyntaxError(syntaxError("closing", ")"));
                    m.output = o.escapeLast(m.output, "(");
                    decrement("parens");
                }
                while(m.braces > 0){
                    if (u.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "}"));
                    m.output = o.escapeLast(m.output, "{");
                    decrement("braces");
                }
                if (u.strictSlashes !== true && (B.type === "star" || B.type === "bracket")) {
                    push({
                        type: "maybe_slash",
                        value: "",
                        output: `${b}?`
                    });
                }
                if (m.backtrack === true) {
                    m.output = "";
                    for (const t of m.tokens){
                        m.output += t.output != null ? t.output : t.value;
                        if (t.suffix) {
                            m.output += t.suffix;
                        }
                    }
                }
                return m;
            };
            parse.fastpaths = (t, e)=>{
                const u = {
                    ...e
                };
                const r = typeof u.maxLength === "number" ? Math.min(s, u.maxLength) : s;
                const a = t.length;
                if (a > r) {
                    throw new SyntaxError(`Input length: ${a}, exceeds maximum allowed length: ${r}`);
                }
                t = c[t] || t;
                const { DOT_LITERAL: i, SLASH_LITERAL: p, ONE_CHAR: l, DOTS_SLASH: f, NO_DOT: A, NO_DOTS: _, NO_DOTS_SLASH: R, STAR: E, START_ANCHOR: h } = n.globChars(u.windows);
                const g = u.dot ? _ : A;
                const b = u.dot ? R : A;
                const C = u.capture ? "" : "?:";
                const y = {
                    negated: false,
                    prefix: ""
                };
                let $ = u.bash === true ? ".*?" : E;
                if (u.capture) {
                    $ = `(${$})`;
                }
                const globstar = (t)=>{
                    if (t.noglobstar === true) return $;
                    return `(${C}(?:(?!${h}${t.dot ? f : i}).)*?)`;
                };
                const create = (t)=>{
                    switch(t){
                        case "*":
                            return `${g}${l}${$}`;
                        case ".*":
                            return `${i}${l}${$}`;
                        case "*.*":
                            return `${g}${$}${i}${l}${$}`;
                        case "*/*":
                            return `${g}${$}${p}${l}${b}${$}`;
                        case "**":
                            return g + globstar(u);
                        case "**/*":
                            return `(?:${g}${globstar(u)}${p})?${b}${l}${$}`;
                        case "**/*.*":
                            return `(?:${g}${globstar(u)}${p})?${b}${$}${i}${l}${$}`;
                        case "**/.*":
                            return `(?:${g}${globstar(u)}${p})?${i}${l}${$}`;
                        default:
                            {
                                const e = /^(.*?)\.(\w+)$/.exec(t);
                                if (!e) return;
                                const u = create(e[1]);
                                if (!u) return;
                                return u + i + e[2];
                            }
                    }
                };
                const x = o.removePrefix(t, y);
                let S = create(x);
                if (S && u.strictSlashes !== true) {
                    S += `${p}?`;
                }
                return S;
            };
            t.exports = parse;
        },
        510: (t, e, u)=>{
            const n = u(716);
            const o = u(697);
            const s = u(96);
            const r = u(154);
            const isObject = (t)=>t && typeof t === "object" && !Array.isArray(t);
            const picomatch = (t, e, u = false)=>{
                if (Array.isArray(t)) {
                    const n = t.map((t)=>picomatch(t, e, u));
                    const arrayMatcher = (t)=>{
                        for (const e of n){
                            const u = e(t);
                            if (u) return u;
                        }
                        return false;
                    };
                    return arrayMatcher;
                }
                const n = isObject(t) && t.tokens && t.input;
                if (t === "" || typeof t !== "string" && !n) {
                    throw new TypeError("Expected pattern to be a non-empty string");
                }
                const o = e || {};
                const s = o.windows;
                const r = n ? picomatch.compileRe(t, e) : picomatch.makeRe(t, e, false, true);
                const a = r.state;
                delete r.state;
                let isIgnored = ()=>false;
                if (o.ignore) {
                    const t = {
                        ...e,
                        ignore: null,
                        onMatch: null,
                        onResult: null
                    };
                    isIgnored = picomatch(o.ignore, t, u);
                }
                const matcher = (u, n = false)=>{
                    const { isMatch: i, match: c, output: p } = picomatch.test(u, r, e, {
                        glob: t,
                        posix: s
                    });
                    const l = {
                        glob: t,
                        state: a,
                        regex: r,
                        posix: s,
                        input: u,
                        output: p,
                        match: c,
                        isMatch: i
                    };
                    if (typeof o.onResult === "function") {
                        o.onResult(l);
                    }
                    if (i === false) {
                        l.isMatch = false;
                        return n ? l : false;
                    }
                    if (isIgnored(u)) {
                        if (typeof o.onIgnore === "function") {
                            o.onIgnore(l);
                        }
                        l.isMatch = false;
                        return n ? l : false;
                    }
                    if (typeof o.onMatch === "function") {
                        o.onMatch(l);
                    }
                    return n ? l : true;
                };
                if (u) {
                    matcher.state = a;
                }
                return matcher;
            };
            picomatch.test = (t, e, u, { glob: n, posix: o } = {})=>{
                if (typeof t !== "string") {
                    throw new TypeError("Expected input to be a string");
                }
                if (t === "") {
                    return {
                        isMatch: false,
                        output: ""
                    };
                }
                const r = u || {};
                const a = r.format || (o ? s.toPosixSlashes : null);
                let i = t === n;
                let c = i && a ? a(t) : t;
                if (i === false) {
                    c = a ? a(t) : t;
                    i = c === n;
                }
                if (i === false || r.capture === true) {
                    if (r.matchBase === true || r.basename === true) {
                        i = picomatch.matchBase(t, e, u, o);
                    } else {
                        i = e.exec(c);
                    }
                }
                return {
                    isMatch: Boolean(i),
                    match: i,
                    output: c
                };
            };
            picomatch.matchBase = (t, e, u)=>{
                const n = e instanceof RegExp ? e : picomatch.makeRe(e, u);
                return n.test(s.basename(t));
            };
            picomatch.isMatch = (t, e, u)=>picomatch(e, u)(t);
            picomatch.parse = (t, e)=>{
                if (Array.isArray(t)) return t.map((t)=>picomatch.parse(t, e));
                return o(t, {
                    ...e,
                    fastpaths: false
                });
            };
            picomatch.scan = (t, e)=>n(t, e);
            picomatch.compileRe = (t, e, u = false, n = false)=>{
                if (u === true) {
                    return t.output;
                }
                const o = e || {};
                const s = o.contains ? "" : "^";
                const r = o.contains ? "" : "$";
                let a = `${s}(?:${t.output})${r}`;
                if (t && t.negated === true) {
                    a = `^(?!${a}).*$`;
                }
                const i = picomatch.toRegex(a, e);
                if (n === true) {
                    i.state = t;
                }
                return i;
            };
            picomatch.makeRe = (t, e = {}, u = false, n = false)=>{
                if (!t || typeof t !== "string") {
                    throw new TypeError("Expected a non-empty string");
                }
                let s = {
                    negated: false,
                    fastpaths: true
                };
                if (e.fastpaths !== false && (t[0] === "." || t[0] === "*")) {
                    s.output = o.fastpaths(t, e);
                }
                if (!s.output) {
                    s = o(t, e);
                }
                return picomatch.compileRe(s, e, u, n);
            };
            picomatch.toRegex = (t, e)=>{
                try {
                    const u = e || {};
                    return new RegExp(t, u.flags || (u.nocase ? "i" : ""));
                } catch (t) {
                    if (e && e.debug === true) throw t;
                    return /$^/;
                }
            };
            picomatch.constants = r;
            t.exports = picomatch;
        },
        716: (t, e, u)=>{
            const n = u(96);
            const { CHAR_ASTERISK: o, CHAR_AT: s, CHAR_BACKWARD_SLASH: r, CHAR_COMMA: a, CHAR_DOT: i, CHAR_EXCLAMATION_MARK: c, CHAR_FORWARD_SLASH: p, CHAR_LEFT_CURLY_BRACE: l, CHAR_LEFT_PARENTHESES: f, CHAR_LEFT_SQUARE_BRACKET: A, CHAR_PLUS: _, CHAR_QUESTION_MARK: R, CHAR_RIGHT_CURLY_BRACE: E, CHAR_RIGHT_PARENTHESES: h, CHAR_RIGHT_SQUARE_BRACKET: g } = u(154);
            const isPathSeparator = (t)=>t === p || t === r;
            const depth = (t)=>{
                if (t.isPrefix !== true) {
                    t.depth = t.isGlobstar ? Infinity : 1;
                }
            };
            const scan = (t, e)=>{
                const u = e || {};
                const b = t.length - 1;
                const C = u.parts === true || u.scanToEnd === true;
                const y = [];
                const $ = [];
                const x = [];
                let S = t;
                let H = -1;
                let v = 0;
                let d = 0;
                let L = false;
                let T = false;
                let O = false;
                let k = false;
                let m = false;
                let w = false;
                let N = false;
                let I = false;
                let B = false;
                let G = false;
                let D = 0;
                let M;
                let P;
                let K = {
                    value: "",
                    depth: 0,
                    isGlob: false
                };
                const eos = ()=>H >= b;
                const peek = ()=>S.charCodeAt(H + 1);
                const advance = ()=>{
                    M = P;
                    return S.charCodeAt(++H);
                };
                while(H < b){
                    P = advance();
                    let t;
                    if (P === r) {
                        N = K.backslashes = true;
                        P = advance();
                        if (P === l) {
                            w = true;
                        }
                        continue;
                    }
                    if (w === true || P === l) {
                        D++;
                        while(eos() !== true && (P = advance())){
                            if (P === r) {
                                N = K.backslashes = true;
                                advance();
                                continue;
                            }
                            if (P === l) {
                                D++;
                                continue;
                            }
                            if (w !== true && P === i && (P = advance()) === i) {
                                L = K.isBrace = true;
                                O = K.isGlob = true;
                                G = true;
                                if (C === true) {
                                    continue;
                                }
                                break;
                            }
                            if (w !== true && P === a) {
                                L = K.isBrace = true;
                                O = K.isGlob = true;
                                G = true;
                                if (C === true) {
                                    continue;
                                }
                                break;
                            }
                            if (P === E) {
                                D--;
                                if (D === 0) {
                                    w = false;
                                    L = K.isBrace = true;
                                    G = true;
                                    break;
                                }
                            }
                        }
                        if (C === true) {
                            continue;
                        }
                        break;
                    }
                    if (P === p) {
                        y.push(H);
                        $.push(K);
                        K = {
                            value: "",
                            depth: 0,
                            isGlob: false
                        };
                        if (G === true) continue;
                        if (M === i && H === v + 1) {
                            v += 2;
                            continue;
                        }
                        d = H + 1;
                        continue;
                    }
                    if (u.noext !== true) {
                        const t = P === _ || P === s || P === o || P === R || P === c;
                        if (t === true && peek() === f) {
                            O = K.isGlob = true;
                            k = K.isExtglob = true;
                            G = true;
                            if (P === c && H === v) {
                                B = true;
                            }
                            if (C === true) {
                                while(eos() !== true && (P = advance())){
                                    if (P === r) {
                                        N = K.backslashes = true;
                                        P = advance();
                                        continue;
                                    }
                                    if (P === h) {
                                        O = K.isGlob = true;
                                        G = true;
                                        break;
                                    }
                                }
                                continue;
                            }
                            break;
                        }
                    }
                    if (P === o) {
                        if (M === o) m = K.isGlobstar = true;
                        O = K.isGlob = true;
                        G = true;
                        if (C === true) {
                            continue;
                        }
                        break;
                    }
                    if (P === R) {
                        O = K.isGlob = true;
                        G = true;
                        if (C === true) {
                            continue;
                        }
                        break;
                    }
                    if (P === A) {
                        while(eos() !== true && (t = advance())){
                            if (t === r) {
                                N = K.backslashes = true;
                                advance();
                                continue;
                            }
                            if (t === g) {
                                T = K.isBracket = true;
                                O = K.isGlob = true;
                                G = true;
                                break;
                            }
                        }
                        if (C === true) {
                            continue;
                        }
                        break;
                    }
                    if (u.nonegate !== true && P === c && H === v) {
                        I = K.negated = true;
                        v++;
                        continue;
                    }
                    if (u.noparen !== true && P === f) {
                        O = K.isGlob = true;
                        if (C === true) {
                            while(eos() !== true && (P = advance())){
                                if (P === f) {
                                    N = K.backslashes = true;
                                    P = advance();
                                    continue;
                                }
                                if (P === h) {
                                    G = true;
                                    break;
                                }
                            }
                            continue;
                        }
                        break;
                    }
                    if (O === true) {
                        G = true;
                        if (C === true) {
                            continue;
                        }
                        break;
                    }
                }
                if (u.noext === true) {
                    k = false;
                    O = false;
                }
                let U = S;
                let X = "";
                let F = "";
                if (v > 0) {
                    X = S.slice(0, v);
                    S = S.slice(v);
                    d -= v;
                }
                if (U && O === true && d > 0) {
                    U = S.slice(0, d);
                    F = S.slice(d);
                } else if (O === true) {
                    U = "";
                    F = S;
                } else {
                    U = S;
                }
                if (U && U !== "" && U !== "/" && U !== S) {
                    if (isPathSeparator(U.charCodeAt(U.length - 1))) {
                        U = U.slice(0, -1);
                    }
                }
                if (u.unescape === true) {
                    if (F) F = n.removeBackslashes(F);
                    if (U && N === true) {
                        U = n.removeBackslashes(U);
                    }
                }
                const Q = {
                    prefix: X,
                    input: t,
                    start: v,
                    base: U,
                    glob: F,
                    isBrace: L,
                    isBracket: T,
                    isGlob: O,
                    isExtglob: k,
                    isGlobstar: m,
                    negated: I,
                    negatedExtglob: B
                };
                if (u.tokens === true) {
                    Q.maxDepth = 0;
                    if (!isPathSeparator(P)) {
                        $.push(K);
                    }
                    Q.tokens = $;
                }
                if (u.parts === true || u.tokens === true) {
                    let e;
                    for(let n = 0; n < y.length; n++){
                        const o = e ? e + 1 : v;
                        const s = y[n];
                        const r = t.slice(o, s);
                        if (u.tokens) {
                            if (n === 0 && v !== 0) {
                                $[n].isPrefix = true;
                                $[n].value = X;
                            } else {
                                $[n].value = r;
                            }
                            depth($[n]);
                            Q.maxDepth += $[n].depth;
                        }
                        if (n !== 0 || r !== "") {
                            x.push(r);
                        }
                        e = s;
                    }
                    if (e && e + 1 < t.length) {
                        const n = t.slice(e + 1);
                        x.push(n);
                        if (u.tokens) {
                            $[$.length - 1].value = n;
                            depth($[$.length - 1]);
                            Q.maxDepth += $[$.length - 1].depth;
                        }
                    }
                    Q.slashes = y;
                    Q.parts = x;
                }
                return Q;
            };
            t.exports = scan;
        },
        96: (t, e, u)=>{
            const { REGEX_BACKSLASH: n, REGEX_REMOVE_BACKSLASH: o, REGEX_SPECIAL_CHARS: s, REGEX_SPECIAL_CHARS_GLOBAL: r } = u(154);
            e.isObject = (t)=>t !== null && typeof t === "object" && !Array.isArray(t);
            e.hasRegexChars = (t)=>s.test(t);
            e.isRegexChar = (t)=>t.length === 1 && e.hasRegexChars(t);
            e.escapeRegex = (t)=>t.replace(r, "\\$1");
            e.toPosixSlashes = (t)=>t.replace(n, "/");
            e.removeBackslashes = (t)=>t.replace(o, (t)=>t === "\\" ? "" : t);
            e.escapeLast = (t, u, n)=>{
                const o = t.lastIndexOf(u, n);
                if (o === -1) return t;
                if (t[o - 1] === "\\") return e.escapeLast(t, u, o - 1);
                return `${t.slice(0, o)}\\${t.slice(o)}`;
            };
            e.removePrefix = (t, e = {})=>{
                let u = t;
                if (u.startsWith("./")) {
                    u = u.slice(2);
                    e.prefix = "./";
                }
                return u;
            };
            e.wrapOutput = (t, e = {}, u = {})=>{
                const n = u.contains ? "" : "^";
                const o = u.contains ? "" : "$";
                let s = `${n}(?:${t})${o}`;
                if (e.negated === true) {
                    s = `(?:^(?!${s}).*$)`;
                }
                return s;
            };
            e.basename = (t, { windows: e } = {})=>{
                const u = t.split(e ? /[\\/]/ : "/");
                const n = u[u.length - 1];
                if (n === "") {
                    return u[u.length - 2];
                }
                return n;
            };
        }
    };
    var e = {};
    function __nccwpck_require__(u) {
        var n = e[u];
        if (n !== undefined) {
            return n.exports;
        }
        var o = e[u] = {
            exports: {}
        };
        var s = true;
        try {
            t[u](o, o.exports, __nccwpck_require__);
            s = false;
        } finally{
            if (s) delete e[u];
        }
        return o.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/setly.front/node_modules/next/dist/compiled/picomatch") + "/";
    var u = __nccwpck_require__(170);
    module.exports = u;
})();
}),
"[project]/setly.front/node_modules/next/dist/shared/lib/match-local-pattern.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    hasLocalMatch: null,
    matchLocalPattern: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    hasLocalMatch: function() {
        return hasLocalMatch;
    },
    matchLocalPattern: function() {
        return matchLocalPattern;
    }
});
const _picomatch = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/compiled/picomatch/index.js [app-client] (ecmascript)");
function matchLocalPattern(pattern, url) {
    if (pattern.search !== undefined) {
        if (pattern.search !== url.search) {
            return false;
        }
    }
    if (!(0, _picomatch.makeRe)(pattern.pathname ?? '**', {
        dot: true
    }).test(url.pathname)) {
        return false;
    }
    return true;
}
function hasLocalMatch(localPatterns, urlPathAndQuery) {
    if (!localPatterns) {
        // if the user didn't define "localPatterns", we allow all local images
        return true;
    }
    const url = new URL(urlPathAndQuery, 'http://n');
    return localPatterns.some((p)=>matchLocalPattern(p, url));
} //# sourceMappingURL=match-local-pattern.js.map
}),
"[project]/setly.front/node_modules/next/dist/shared/lib/match-remote-pattern.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    hasRemoteMatch: null,
    matchRemotePattern: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    hasRemoteMatch: function() {
        return hasRemoteMatch;
    },
    matchRemotePattern: function() {
        return matchRemotePattern;
    }
});
const _picomatch = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/compiled/picomatch/index.js [app-client] (ecmascript)");
function matchRemotePattern(pattern, url) {
    if (pattern.protocol !== undefined) {
        if (pattern.protocol.replace(/:$/, '') !== url.protocol.replace(/:$/, '')) {
            return false;
        }
    }
    if (pattern.port !== undefined) {
        if (pattern.port !== url.port) {
            return false;
        }
    }
    if (pattern.hostname === undefined) {
        throw Object.defineProperty(new Error(`Pattern should define hostname but found\n${JSON.stringify(pattern)}`), "__NEXT_ERROR_CODE", {
            value: "E410",
            enumerable: false,
            configurable: true
        });
    } else {
        if (!(0, _picomatch.makeRe)(pattern.hostname).test(url.hostname)) {
            return false;
        }
    }
    if (pattern.search !== undefined) {
        if (pattern.search !== url.search) {
            return false;
        }
    }
    // Should be the same as writeImagesManifest()
    if (!(0, _picomatch.makeRe)(pattern.pathname ?? '**', {
        dot: true
    }).test(url.pathname)) {
        return false;
    }
    return true;
}
function hasRemoteMatch(domains, remotePatterns, url) {
    return domains.some((domain)=>url.hostname === domain) || remotePatterns.some((p)=>matchRemotePattern(p, url));
} //# sourceMappingURL=match-remote-pattern.js.map
}),
"[project]/setly.front/node_modules/next/dist/shared/lib/image-loader.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _findclosestquality = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/find-closest-quality.js [app-client] (ecmascript)");
const _deploymentid = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/deployment-id.js [app-client] (ecmascript)");
function defaultLoader({ config, src, width, quality }) {
    if (src.startsWith('/') && src.includes('?') && config.localPatterns?.length === 1 && config.localPatterns[0].pathname === '**' && config.localPatterns[0].search === '') {
        throw Object.defineProperty(new Error(`Image with src "${src}" is using a query string which is not configured in images.localPatterns.` + `\nRead more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`), "__NEXT_ERROR_CODE", {
            value: "E871",
            enumerable: false,
            configurable: true
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        const missingValues = [];
        // these should always be provided but make sure they are
        if (!src) missingValues.push('src');
        if (!width) missingValues.push('width');
        if (missingValues.length > 0) {
            throw Object.defineProperty(new Error(`Next Image Optimization requires ${missingValues.join(', ')} to be provided. Make sure you pass them as props to the \`next/image\` component. Received: ${JSON.stringify({
                src,
                width,
                quality
            })}`), "__NEXT_ERROR_CODE", {
                value: "E188",
                enumerable: false,
                configurable: true
            });
        }
        if (src.startsWith('//')) {
            throw Object.defineProperty(new Error(`Failed to parse src "${src}" on \`next/image\`, protocol-relative URL (//) must be changed to an absolute URL (http:// or https://)`), "__NEXT_ERROR_CODE", {
                value: "E360",
                enumerable: false,
                configurable: true
            });
        }
        if (src.startsWith('/') && config.localPatterns) {
            if ("TURBOPACK compile-time truthy", 1) {
                // We use dynamic require because this should only error in development
                const { hasLocalMatch } = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/match-local-pattern.js [app-client] (ecmascript)");
                if (!hasLocalMatch(config.localPatterns, src)) {
                    throw Object.defineProperty(new Error(`Invalid src prop (${src}) on \`next/image\` does not match \`images.localPatterns\` configured in your \`next.config.js\`\n` + `See more info: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`), "__NEXT_ERROR_CODE", {
                        value: "E426",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
        if (!src.startsWith('/') && (config.domains || config.remotePatterns)) {
            let parsedSrc;
            try {
                parsedSrc = new URL(src);
            } catch (err) {
                console.error(err);
                throw Object.defineProperty(new Error(`Failed to parse src "${src}" on \`next/image\`, if using relative image it must start with a leading slash "/" or be an absolute URL (http:// or https://)`), "__NEXT_ERROR_CODE", {
                    value: "E63",
                    enumerable: false,
                    configurable: true
                });
            }
            if ("TURBOPACK compile-time truthy", 1) {
                // We use dynamic require because this should only error in development
                const { hasRemoteMatch } = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/match-remote-pattern.js [app-client] (ecmascript)");
                if (!hasRemoteMatch(config.domains, config.remotePatterns, parsedSrc)) {
                    throw Object.defineProperty(new Error(`Invalid src prop (${src}) on \`next/image\`, hostname "${parsedSrc.hostname}" is not configured under images in your \`next.config.js\`\n` + `See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host`), "__NEXT_ERROR_CODE", {
                        value: "E231",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
    }
    const q = (0, _findclosestquality.findClosestQuality)(quality, config);
    let deploymentId = (0, _deploymentid.getDeploymentId)();
    return `${config.path}?url=${encodeURIComponent(src)}&w=${width}&q=${q}${src.startsWith('/') && deploymentId ? `&dpl=${deploymentId}` : ''}`;
}
// We use this to determine if the import is the default loader
// or a custom loader defined by the user in next.config.js
defaultLoader.__next_img_default = true;
const _default = defaultLoader; //# sourceMappingURL=image-loader.js.map
}),
"[project]/setly.front/node_modules/next/dist/client/image-component.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Image", {
    enumerable: true,
    get: function() {
        return Image;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/setly.front/node_modules/next/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _interop_require_wildcard = __turbopack_context__.r("[project]/setly.front/node_modules/next/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/setly.front/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _reactdom = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/setly.front/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)"));
const _head = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/head.js [app-client] (ecmascript)"));
const _getimgprops = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/get-img-props.js [app-client] (ecmascript)");
const _imageconfig = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/image-config.js [app-client] (ecmascript)");
const _imageconfigcontextsharedruntime = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/image-config-context.shared-runtime.js [app-client] (ecmascript)");
const _warnonce = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
const _routercontextsharedruntime = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/router-context.shared-runtime.js [app-client] (ecmascript)");
const _imageloader = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/image-loader.js [app-client] (ecmascript)"));
const _usemergedref = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)");
// This is replaced by webpack define plugin
const configEnv = ("TURBOPACK compile-time value", {
    "deviceSizes": ("TURBOPACK compile-time value", [
        ("TURBOPACK compile-time value", 640),
        ("TURBOPACK compile-time value", 750),
        ("TURBOPACK compile-time value", 828),
        ("TURBOPACK compile-time value", 1080),
        ("TURBOPACK compile-time value", 1200),
        ("TURBOPACK compile-time value", 1920),
        ("TURBOPACK compile-time value", 2048),
        ("TURBOPACK compile-time value", 3840)
    ]),
    "imageSizes": ("TURBOPACK compile-time value", [
        ("TURBOPACK compile-time value", 32),
        ("TURBOPACK compile-time value", 48),
        ("TURBOPACK compile-time value", 64),
        ("TURBOPACK compile-time value", 96),
        ("TURBOPACK compile-time value", 128),
        ("TURBOPACK compile-time value", 256),
        ("TURBOPACK compile-time value", 384)
    ]),
    "qualities": ("TURBOPACK compile-time value", [
        ("TURBOPACK compile-time value", 75)
    ]),
    "path": ("TURBOPACK compile-time value", "/_next/image"),
    "loader": ("TURBOPACK compile-time value", "default"),
    "dangerouslyAllowSVG": ("TURBOPACK compile-time value", false),
    "unoptimized": ("TURBOPACK compile-time value", false),
    "domains": ("TURBOPACK compile-time value", []),
    "remotePatterns": ("TURBOPACK compile-time value", [
        ("TURBOPACK compile-time value", {
            "protocol": ("TURBOPACK compile-time value", "https"),
            "hostname": ("TURBOPACK compile-time value", "api.setly.space"),
            "pathname": ("TURBOPACK compile-time value", "/storage/**")
        }),
        ("TURBOPACK compile-time value", {
            "protocol": ("TURBOPACK compile-time value", "https"),
            "hostname": ("TURBOPACK compile-time value", "api.setly.space"),
            "pathname": ("TURBOPACK compile-time value", "//storage/**")
        }),
        ("TURBOPACK compile-time value", {
            "protocol": ("TURBOPACK compile-time value", "http"),
            "hostname": ("TURBOPACK compile-time value", "localhost"),
            "port": ("TURBOPACK compile-time value", "8000"),
            "pathname": ("TURBOPACK compile-time value", "/storage/**")
        })
    ]),
    "localPatterns": ("TURBOPACK compile-time value", [
        ("TURBOPACK compile-time value", {
            "pathname": ("TURBOPACK compile-time value", "/img/**")
        }),
        ("TURBOPACK compile-time value", {
            "pathname": ("TURBOPACK compile-time value", "/icons/**")
        }),
        ("TURBOPACK compile-time value", {
            "pathname": ("TURBOPACK compile-time value", "/_next/static/media/**"),
            "search": ("TURBOPACK compile-time value", "")
        })
    ]),
    "output": ("TURBOPACK compile-time value", "standalone")
});
if (typeof window === 'undefined') {
    ;
    globalThis.__NEXT_IMAGE_IMPORTED = true;
}
// See https://stackoverflow.com/q/39777833/266535 for why we use this ref
// handler instead of the img's onLoad attribute.
function handleLoading(img, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized, sizesInput) {
    const src = img?.src;
    if (!img || img['data-loaded-src'] === src) {
        return;
    }
    img['data-loaded-src'] = src;
    const p = 'decode' in img ? img.decode() : Promise.resolve();
    p.catch(()=>{}).then(()=>{
        if (!img.parentElement || !img.isConnected) {
            // Exit early in case of race condition:
            // - onload() is called
            // - decode() is called but incomplete
            // - unmount is called
            // - decode() completes
            return;
        }
        if (placeholder !== 'empty') {
            setBlurComplete(true);
        }
        if (onLoadRef?.current) {
            // Since we don't have the SyntheticEvent here,
            // we must create one with the same shape.
            // See https://reactjs.org/docs/events.html
            const event = new Event('load');
            Object.defineProperty(event, 'target', {
                writable: false,
                value: img
            });
            let prevented = false;
            let stopped = false;
            onLoadRef.current({
                ...event,
                nativeEvent: event,
                currentTarget: img,
                target: img,
                isDefaultPrevented: ()=>prevented,
                isPropagationStopped: ()=>stopped,
                persist: ()=>{},
                preventDefault: ()=>{
                    prevented = true;
                    event.preventDefault();
                },
                stopPropagation: ()=>{
                    stopped = true;
                    event.stopPropagation();
                }
            });
        }
        if (onLoadingCompleteRef?.current) {
            onLoadingCompleteRef.current(img);
        }
        if ("TURBOPACK compile-time truthy", 1) {
            const origSrc = new URL(src, 'http://n').searchParams.get('url') || src;
            if (img.getAttribute('data-nimg') === 'fill') {
                if (!unoptimized && (!sizesInput || sizesInput === '100vw')) {
                    let widthViewportRatio = img.getBoundingClientRect().width / window.innerWidth;
                    if (widthViewportRatio < 0.6) {
                        if (sizesInput === '100vw') {
                            (0, _warnonce.warnOnce)(`Image with src "${origSrc}" has "fill" prop and "sizes" prop of "100vw", but image is not rendered at full viewport width. Please adjust "sizes" to improve page performance. Read more: https://nextjs.org/docs/api-reference/next/image#sizes`);
                        } else {
                            (0, _warnonce.warnOnce)(`Image with src "${origSrc}" has "fill" but is missing "sizes" prop. Please add it to improve page performance. Read more: https://nextjs.org/docs/api-reference/next/image#sizes`);
                        }
                    }
                }
                if (img.parentElement) {
                    const { position } = window.getComputedStyle(img.parentElement);
                    const valid = [
                        'absolute',
                        'fixed',
                        'relative'
                    ];
                    if (!valid.includes(position)) {
                        (0, _warnonce.warnOnce)(`Image with src "${origSrc}" has "fill" and parent element with invalid "position". Provided "${position}" should be one of ${valid.map(String).join(',')}.`);
                    }
                }
                if (img.height === 0) {
                    (0, _warnonce.warnOnce)(`Image with src "${origSrc}" has "fill" and a height value of 0. This is likely because the parent element of the image has not been styled to have a set height.`);
                }
            }
            const heightModified = img.height.toString() !== img.getAttribute('height');
            const widthModified = img.width.toString() !== img.getAttribute('width');
            if (heightModified && !widthModified || !heightModified && widthModified) {
                (0, _warnonce.warnOnce)(`Image with src "${origSrc}" has either width or height modified, but not the other. If you use CSS to change the size of your image, also include the styles 'width: "auto"' or 'height: "auto"' to maintain the aspect ratio.`);
            }
        }
    });
}
function getDynamicProps(fetchPriority) {
    if (Boolean(_react.use)) {
        // In React 19.0.0 or newer, we must use camelCase
        // prop to avoid "Warning: Invalid DOM property".
        // See https://github.com/facebook/react/pull/25927
        return {
            fetchPriority
        };
    }
    // In React 18.2.0 or older, we must use lowercase prop
    // to avoid "Warning: Invalid DOM property".
    return {
        fetchpriority: fetchPriority
    };
}
const ImageElement = /*#__PURE__*/ (0, _react.forwardRef)(({ src, srcSet, sizes, height, width, decoding, className, style, fetchPriority, placeholder, loading, unoptimized, fill, onLoadRef, onLoadingCompleteRef, setBlurComplete, setShowAltText, sizesInput, onLoad, onError, ...rest }, forwardedRef)=>{
    const ownRef = (0, _react.useCallback)((img)=>{
        if (!img) {
            return;
        }
        if (onError) {
            // If the image has an error before react hydrates, then the error is lost.
            // The workaround is to wait until the image is mounted which is after hydration,
            // then we set the src again to trigger the error handler (if there was an error).
            // eslint-disable-next-line no-self-assign
            img.src = img.src;
        }
        if ("TURBOPACK compile-time truthy", 1) {
            if (!src) {
                console.error(`Image is missing required "src" property:`, img);
            }
            if (img.getAttribute('alt') === null) {
                console.error(`Image is missing required "alt" property. Please add Alternative Text to describe the image for screen readers and search engines.`);
            }
        }
        if (img.complete) {
            handleLoading(img, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized, sizesInput);
        }
    }, [
        src,
        placeholder,
        onLoadRef,
        onLoadingCompleteRef,
        setBlurComplete,
        onError,
        unoptimized,
        sizesInput
    ]);
    const ref = (0, _usemergedref.useMergedRef)(forwardedRef, ownRef);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("img", {
        ...rest,
        ...getDynamicProps(fetchPriority),
        // It's intended to keep `loading` before `src` because React updates
        // props in order which causes Safari/Firefox to not lazy load properly.
        // See https://github.com/facebook/react/issues/25883
        loading: loading,
        width: width,
        height: height,
        decoding: decoding,
        "data-nimg": fill ? 'fill' : '1',
        className: className,
        style: style,
        // It's intended to keep `src` the last attribute because React updates
        // attributes in order. If we keep `src` the first one, Safari will
        // immediately start to fetch `src`, before `sizes` and `srcSet` are even
        // updated by React. That causes multiple unnecessary requests if `srcSet`
        // and `sizes` are defined.
        // This bug cannot be reproduced in Chrome or Firefox.
        sizes: sizes,
        srcSet: srcSet,
        src: src,
        ref: ref,
        onLoad: (event)=>{
            const img = event.currentTarget;
            handleLoading(img, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized, sizesInput);
        },
        onError: (event)=>{
            // if the real image fails to load, this will ensure "alt" is visible
            setShowAltText(true);
            if (placeholder !== 'empty') {
                // If the real image fails to load, this will still remove the placeholder.
                setBlurComplete(true);
            }
            if (onError) {
                onError(event);
            }
        }
    });
});
function ImagePreload({ isAppRouter, imgAttributes }) {
    const opts = {
        as: 'image',
        imageSrcSet: imgAttributes.srcSet,
        imageSizes: imgAttributes.sizes,
        crossOrigin: imgAttributes.crossOrigin,
        referrerPolicy: imgAttributes.referrerPolicy,
        ...getDynamicProps(imgAttributes.fetchPriority)
    };
    if (isAppRouter && _reactdom.default.preload) {
        _reactdom.default.preload(imgAttributes.src, opts);
        return null;
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_head.default, {
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
            rel: "preload",
            // Note how we omit the `href` attribute, as it would only be relevant
            // for browsers that do not support `imagesrcset`, and in those cases
            // it would cause the incorrect image to be preloaded.
            //
            // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset
            href: imgAttributes.srcSet ? undefined : imgAttributes.src,
            ...opts
        }, '__nimg-' + imgAttributes.src + imgAttributes.srcSet + imgAttributes.sizes)
    });
}
const Image = /*#__PURE__*/ (0, _react.forwardRef)((props, forwardedRef)=>{
    const pagesRouter = (0, _react.useContext)(_routercontextsharedruntime.RouterContext);
    // We're in the app directory if there is no pages router.
    const isAppRouter = !pagesRouter;
    const configContext = (0, _react.useContext)(_imageconfigcontextsharedruntime.ImageConfigContext);
    const config = (0, _react.useMemo)(()=>{
        const c = configEnv || configContext || _imageconfig.imageConfigDefault;
        const allSizes = [
            ...c.deviceSizes,
            ...c.imageSizes
        ].sort((a, b)=>a - b);
        const deviceSizes = c.deviceSizes.sort((a, b)=>a - b);
        const qualities = c.qualities?.sort((a, b)=>a - b);
        return {
            ...c,
            allSizes,
            deviceSizes,
            qualities,
            // During the SSR, configEnv (__NEXT_IMAGE_OPTS) does not include
            // security sensitive configs like `localPatterns`, which is needed
            // during the server render to ensure it's validated. Therefore use
            // configContext, which holds the config from the server for validation.
            localPatterns: typeof window === 'undefined' ? configContext?.localPatterns : c.localPatterns
        };
    }, [
        configContext
    ]);
    const { onLoad, onLoadingComplete } = props;
    const onLoadRef = (0, _react.useRef)(onLoad);
    (0, _react.useEffect)(()=>{
        onLoadRef.current = onLoad;
    }, [
        onLoad
    ]);
    const onLoadingCompleteRef = (0, _react.useRef)(onLoadingComplete);
    (0, _react.useEffect)(()=>{
        onLoadingCompleteRef.current = onLoadingComplete;
    }, [
        onLoadingComplete
    ]);
    const [blurComplete, setBlurComplete] = (0, _react.useState)(false);
    const [showAltText, setShowAltText] = (0, _react.useState)(false);
    const { props: imgAttributes, meta: imgMeta } = (0, _getimgprops.getImgProps)(props, {
        defaultLoader: _imageloader.default,
        imgConf: config,
        blurComplete,
        showAltText
    });
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(ImageElement, {
                ...imgAttributes,
                unoptimized: imgMeta.unoptimized,
                placeholder: imgMeta.placeholder,
                fill: imgMeta.fill,
                onLoadRef: onLoadRef,
                onLoadingCompleteRef: onLoadingCompleteRef,
                setBlurComplete: setBlurComplete,
                setShowAltText: setShowAltText,
                sizesInput: props.sizes,
                ref: forwardedRef
            }),
            imgMeta.preload ? /*#__PURE__*/ (0, _jsxruntime.jsx)(ImagePreload, {
                isAppRouter: isAppRouter,
                imgAttributes: imgAttributes
            }) : null
        ]
    });
});
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=image-component.js.map
}),
"[project]/setly.front/node_modules/next/dist/shared/lib/image-external.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    getImageProps: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return _default;
    },
    getImageProps: function() {
        return getImageProps;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/setly.front/node_modules/next/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _getimgprops = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/get-img-props.js [app-client] (ecmascript)");
const _imagecomponent = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/client/image-component.js [app-client] (ecmascript)");
const _imageloader = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/image-loader.js [app-client] (ecmascript)"));
function getImageProps(imgProps) {
    const { props } = (0, _getimgprops.getImgProps)(imgProps, {
        defaultLoader: _imageloader.default,
        // This is replaced by webpack define plugin
        imgConf: ("TURBOPACK compile-time value", {
            "deviceSizes": ("TURBOPACK compile-time value", [
                ("TURBOPACK compile-time value", 640),
                ("TURBOPACK compile-time value", 750),
                ("TURBOPACK compile-time value", 828),
                ("TURBOPACK compile-time value", 1080),
                ("TURBOPACK compile-time value", 1200),
                ("TURBOPACK compile-time value", 1920),
                ("TURBOPACK compile-time value", 2048),
                ("TURBOPACK compile-time value", 3840)
            ]),
            "imageSizes": ("TURBOPACK compile-time value", [
                ("TURBOPACK compile-time value", 32),
                ("TURBOPACK compile-time value", 48),
                ("TURBOPACK compile-time value", 64),
                ("TURBOPACK compile-time value", 96),
                ("TURBOPACK compile-time value", 128),
                ("TURBOPACK compile-time value", 256),
                ("TURBOPACK compile-time value", 384)
            ]),
            "qualities": ("TURBOPACK compile-time value", [
                ("TURBOPACK compile-time value", 75)
            ]),
            "path": ("TURBOPACK compile-time value", "/_next/image"),
            "loader": ("TURBOPACK compile-time value", "default"),
            "dangerouslyAllowSVG": ("TURBOPACK compile-time value", false),
            "unoptimized": ("TURBOPACK compile-time value", false),
            "domains": ("TURBOPACK compile-time value", []),
            "remotePatterns": ("TURBOPACK compile-time value", [
                ("TURBOPACK compile-time value", {
                    "protocol": ("TURBOPACK compile-time value", "https"),
                    "hostname": ("TURBOPACK compile-time value", "api.setly.space"),
                    "pathname": ("TURBOPACK compile-time value", "/storage/**")
                }),
                ("TURBOPACK compile-time value", {
                    "protocol": ("TURBOPACK compile-time value", "https"),
                    "hostname": ("TURBOPACK compile-time value", "api.setly.space"),
                    "pathname": ("TURBOPACK compile-time value", "//storage/**")
                }),
                ("TURBOPACK compile-time value", {
                    "protocol": ("TURBOPACK compile-time value", "http"),
                    "hostname": ("TURBOPACK compile-time value", "localhost"),
                    "port": ("TURBOPACK compile-time value", "8000"),
                    "pathname": ("TURBOPACK compile-time value", "/storage/**")
                })
            ]),
            "localPatterns": ("TURBOPACK compile-time value", [
                ("TURBOPACK compile-time value", {
                    "pathname": ("TURBOPACK compile-time value", "/img/**")
                }),
                ("TURBOPACK compile-time value", {
                    "pathname": ("TURBOPACK compile-time value", "/icons/**")
                }),
                ("TURBOPACK compile-time value", {
                    "pathname": ("TURBOPACK compile-time value", "/_next/static/media/**"),
                    "search": ("TURBOPACK compile-time value", "")
                })
            ]),
            "output": ("TURBOPACK compile-time value", "standalone")
        })
    });
    // Normally we don't care about undefined props because we pass to JSX,
    // but this exported function could be used by the end user for anything
    // so we delete undefined props to clean it up a little.
    for (const [key, value] of Object.entries(props)){
        if (value === undefined) {
            delete props[key];
        }
    }
    return {
        props
    };
}
const _default = _imagecomponent.Image; //# sourceMappingURL=image-external.js.map
}),
"[project]/setly.front/node_modules/next/image.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/setly.front/node_modules/next/dist/shared/lib/image-external.js [app-client] (ecmascript)");
}),
"[project]/setly.front/node_modules/typograf/dist/typograf.es.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Typograf
]);
/*! typograf | © 2025 Denis Seleznev | MIT  License | https://github.com/typograf/typograf */ /******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise, SuppressedError, Symbol, Iterator */ var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
// http://www.w3.org/TR/html4/sgml/entities
var visibleEntities = [
    [
        'iexcl',
        161
    ],
    [
        'cent',
        162
    ],
    [
        'pound',
        163
    ],
    [
        'curren',
        164
    ],
    [
        'yen',
        165
    ],
    [
        'brvbar',
        166
    ],
    [
        'sect',
        167
    ],
    [
        'uml',
        168
    ],
    [
        'copy',
        169
    ],
    [
        'ordf',
        170
    ],
    [
        'laquo',
        171
    ],
    [
        'not',
        172
    ],
    [
        'reg',
        174
    ],
    [
        'macr',
        175
    ],
    [
        'deg',
        176
    ],
    [
        'plusmn',
        177
    ],
    [
        'sup2',
        178
    ],
    [
        'sup3',
        179
    ],
    [
        'acute',
        180
    ],
    [
        'micro',
        181
    ],
    [
        'para',
        182
    ],
    [
        'middot',
        183
    ],
    [
        'cedil',
        184
    ],
    [
        'sup1',
        185
    ],
    [
        'ordm',
        186
    ],
    [
        'raquo',
        187
    ],
    [
        'frac14',
        188
    ],
    [
        'frac12',
        189
    ],
    [
        'frac34',
        190
    ],
    [
        'iquest',
        191
    ],
    [
        'Agrave',
        192
    ],
    [
        'Aacute',
        193
    ],
    [
        'Acirc',
        194
    ],
    [
        'Atilde',
        195
    ],
    [
        'Auml',
        196
    ],
    [
        'Aring',
        197
    ],
    [
        'AElig',
        198
    ],
    [
        'Ccedil',
        199
    ],
    [
        'Egrave',
        200
    ],
    [
        'Eacute',
        201
    ],
    [
        'Ecirc',
        202
    ],
    [
        'Euml',
        203
    ],
    [
        'Igrave',
        204
    ],
    [
        'Iacute',
        205
    ],
    [
        'Icirc',
        206
    ],
    [
        'Iuml',
        207
    ],
    [
        'ETH',
        208
    ],
    [
        'Ntilde',
        209
    ],
    [
        'Ograve',
        210
    ],
    [
        'Oacute',
        211
    ],
    [
        'Ocirc',
        212
    ],
    [
        'Otilde',
        213
    ],
    [
        'Ouml',
        214
    ],
    [
        'times',
        215
    ],
    [
        'Oslash',
        216
    ],
    [
        'Ugrave',
        217
    ],
    [
        'Uacute',
        218
    ],
    [
        'Ucirc',
        219
    ],
    [
        'Uuml',
        220
    ],
    [
        'Yacute',
        221
    ],
    [
        'THORN',
        222
    ],
    [
        'szlig',
        223
    ],
    [
        'agrave',
        224
    ],
    [
        'aacute',
        225
    ],
    [
        'acirc',
        226
    ],
    [
        'atilde',
        227
    ],
    [
        'auml',
        228
    ],
    [
        'aring',
        229
    ],
    [
        'aelig',
        230
    ],
    [
        'ccedil',
        231
    ],
    [
        'egrave',
        232
    ],
    [
        'eacute',
        233
    ],
    [
        'ecirc',
        234
    ],
    [
        'euml',
        235
    ],
    [
        'igrave',
        236
    ],
    [
        'iacute',
        237
    ],
    [
        'icirc',
        238
    ],
    [
        'iuml',
        239
    ],
    [
        'eth',
        240
    ],
    [
        'ntilde',
        241
    ],
    [
        'ograve',
        242
    ],
    [
        'oacute',
        243
    ],
    [
        'ocirc',
        244
    ],
    [
        'otilde',
        245
    ],
    [
        'ouml',
        246
    ],
    [
        'divide',
        247
    ],
    [
        'oslash',
        248
    ],
    [
        'ugrave',
        249
    ],
    [
        'uacute',
        250
    ],
    [
        'ucirc',
        251
    ],
    [
        'uuml',
        252
    ],
    [
        'yacute',
        253
    ],
    [
        'thorn',
        254
    ],
    [
        'yuml',
        255
    ],
    [
        'fnof',
        402
    ],
    [
        'Alpha',
        913
    ],
    [
        'Beta',
        914
    ],
    [
        'Gamma',
        915
    ],
    [
        'Delta',
        916
    ],
    [
        'Epsilon',
        917
    ],
    [
        'Zeta',
        918
    ],
    [
        'Eta',
        919
    ],
    [
        'Theta',
        920
    ],
    [
        'Iota',
        921
    ],
    [
        'Kappa',
        922
    ],
    [
        'Lambda',
        923
    ],
    [
        'Mu',
        924
    ],
    [
        'Nu',
        925
    ],
    [
        'Xi',
        926
    ],
    [
        'Omicron',
        927
    ],
    [
        'Pi',
        928
    ],
    [
        'Rho',
        929
    ],
    [
        'Sigma',
        931
    ],
    [
        'Tau',
        932
    ],
    [
        'Upsilon',
        933
    ],
    [
        'Phi',
        934
    ],
    [
        'Chi',
        935
    ],
    [
        'Psi',
        936
    ],
    [
        'Omega',
        937
    ],
    [
        'alpha',
        945
    ],
    [
        'beta',
        946
    ],
    [
        'gamma',
        947
    ],
    [
        'delta',
        948
    ],
    [
        'epsilon',
        949
    ],
    [
        'zeta',
        950
    ],
    [
        'eta',
        951
    ],
    [
        'theta',
        952
    ],
    [
        'iota',
        953
    ],
    [
        'kappa',
        954
    ],
    [
        'lambda',
        955
    ],
    [
        'mu',
        956
    ],
    [
        'nu',
        957
    ],
    [
        'xi',
        958
    ],
    [
        'omicron',
        959
    ],
    [
        'pi',
        960
    ],
    [
        'rho',
        961
    ],
    [
        'sigmaf',
        962
    ],
    [
        'sigma',
        963
    ],
    [
        'tau',
        964
    ],
    [
        'upsilon',
        965
    ],
    [
        'phi',
        966
    ],
    [
        'chi',
        967
    ],
    [
        'psi',
        968
    ],
    [
        'omega',
        969
    ],
    [
        'thetasym',
        977
    ],
    [
        'upsih',
        978
    ],
    [
        'piv',
        982
    ],
    [
        'bull',
        8226
    ],
    [
        'hellip',
        8230
    ],
    [
        'prime',
        8242
    ],
    [
        'Prime',
        8243
    ],
    [
        'oline',
        8254
    ],
    [
        'frasl',
        8260
    ],
    [
        'weierp',
        8472
    ],
    [
        'image',
        8465
    ],
    [
        'real',
        8476
    ],
    [
        'trade',
        8482
    ],
    [
        'alefsym',
        8501
    ],
    [
        'larr',
        8592
    ],
    [
        'uarr',
        8593
    ],
    [
        'rarr',
        8594
    ],
    [
        'darr',
        8595
    ],
    [
        'harr',
        8596
    ],
    [
        'crarr',
        8629
    ],
    [
        'lArr',
        8656
    ],
    [
        'uArr',
        8657
    ],
    [
        'rArr',
        8658
    ],
    [
        'dArr',
        8659
    ],
    [
        'hArr',
        8660
    ],
    [
        'forall',
        8704
    ],
    [
        'part',
        8706
    ],
    [
        'exist',
        8707
    ],
    [
        'empty',
        8709
    ],
    [
        'nabla',
        8711
    ],
    [
        'isin',
        8712
    ],
    [
        'notin',
        8713
    ],
    [
        'ni',
        8715
    ],
    [
        'prod',
        8719
    ],
    [
        'sum',
        8721
    ],
    [
        'minus',
        8722
    ],
    [
        'lowast',
        8727
    ],
    [
        'radic',
        8730
    ],
    [
        'prop',
        8733
    ],
    [
        'infin',
        8734
    ],
    [
        'ang',
        8736
    ],
    [
        'and',
        8743
    ],
    [
        'or',
        8744
    ],
    [
        'cap',
        8745
    ],
    [
        'cup',
        8746
    ],
    [
        'int',
        8747
    ],
    [
        'there4',
        8756
    ],
    [
        'sim',
        8764
    ],
    [
        'cong',
        8773
    ],
    [
        'asymp',
        8776
    ],
    [
        'ne',
        8800
    ],
    [
        'equiv',
        8801
    ],
    [
        'le',
        8804
    ],
    [
        'ge',
        8805
    ],
    [
        'sub',
        8834
    ],
    [
        'sup',
        8835
    ],
    [
        'nsub',
        8836
    ],
    [
        'sube',
        8838
    ],
    [
        'supe',
        8839
    ],
    [
        'oplus',
        8853
    ],
    [
        'otimes',
        8855
    ],
    [
        'perp',
        8869
    ],
    [
        'sdot',
        8901
    ],
    [
        'lceil',
        8968
    ],
    [
        'rceil',
        8969
    ],
    [
        'lfloor',
        8970
    ],
    [
        'rfloor',
        8971
    ],
    [
        'lang',
        9001
    ],
    [
        'rang',
        9002
    ],
    [
        'spades',
        9824
    ],
    [
        'clubs',
        9827
    ],
    [
        'hearts',
        9829
    ],
    [
        'diams',
        9830
    ],
    [
        'loz',
        9674
    ],
    [
        'OElig',
        338
    ],
    [
        'oelig',
        339
    ],
    [
        'Scaron',
        352
    ],
    [
        'scaron',
        353
    ],
    [
        'Yuml',
        376
    ],
    [
        'circ',
        710
    ],
    [
        'tilde',
        732
    ],
    [
        'ndash',
        8211
    ],
    [
        'mdash',
        8212
    ],
    [
        'lsquo',
        8216
    ],
    [
        'rsquo',
        8217
    ],
    [
        'sbquo',
        8218
    ],
    [
        'ldquo',
        8220
    ],
    [
        'rdquo',
        8221
    ],
    [
        'bdquo',
        8222
    ],
    [
        'dagger',
        8224
    ],
    [
        'Dagger',
        8225
    ],
    [
        'permil',
        8240
    ],
    [
        'lsaquo',
        8249
    ],
    [
        'rsaquo',
        8250
    ],
    [
        'euro',
        8364
    ],
    [
        'NestedGreaterGreater',
        8811
    ],
    [
        'NestedLessLess',
        8810
    ]
];
var invisibleEntities = [
    [
        'nbsp',
        160
    ],
    [
        'thinsp',
        8201
    ],
    [
        'ensp',
        8194
    ],
    [
        'emsp',
        8195
    ],
    [
        'shy',
        173
    ],
    [
        'zwnj',
        8204
    ],
    [
        'zwj',
        8205
    ],
    [
        'lrm',
        8206
    ],
    [
        'rlm',
        8207
    ]
];
var HtmlEntities = function() {
    function HtmlEntities() {
        var _this = this;
        this.entities = this.prepareEntities(__spreadArray(__spreadArray([], visibleEntities, true), invisibleEntities, true));
        this.entitiesByName = {};
        this.entitiesByNameEntity = {};
        this.entitiesByDigitEntity = {};
        this.entitiesByJsEntity = {};
        this.entitiesByUtf = {};
        this.entities.forEach(function(entity) {
            _this.entitiesByName[entity.name] = entity;
            _this.entitiesByNameEntity[entity.type.name] = entity;
            _this.entitiesByDigitEntity[entity.type.digit] = entity;
            _this.entitiesByJsEntity[entity.type.js] = entity;
            _this.entitiesByUtf[entity.utf] = entity;
        });
        this.invisibleEntities = this.prepareEntities(invisibleEntities);
    }
    /**
     * Entities as name or digit to UTF-8.
     */ HtmlEntities.prototype.toUtf = function(context) {
        var _this = this;
        // &#160;
        if (context.text.search(/&#/) !== -1) {
            context.text = this.decHexToUtf(context.text);
        }
        // &nbsp;
        if (context.text.search(/&[a-z]/i) !== -1) {
            // 2 - min length of entity without & and ;. Example: &DD;
            // 31 - max length of entity without & and ;. Example: &CounterClockwiseContourIntegral;
            context.text = context.text.replace(/&[a-z\d]{2,31};/gi, function(key) {
                var entity = _this.entitiesByNameEntity[key];
                return entity ? entity.utf : key;
            });
        }
        // \u00a0
        if (context.text.search(/\\u[\da-f]/i) !== -1) {
            context.text = context.text.replace(/\\u[\da-f]{4};/gi, function(key) {
                var entity = _this.entitiesByJsEntity[key.toLowerCase()];
                return entity ? entity.utf : key;
            });
        }
    };
    /**
     * Entities in decimal or hexadecimal form to UTF-8.
     */ HtmlEntities.prototype.decHexToUtf = function(text) {
        return text.replace(/&#(\d{1,6});/gi, function($0, $1) {
            return String.fromCharCode(parseInt($1, 10));
        }).replace(/&#x([\da-f]{1,6});/gi, function($0, $1) {
            return String.fromCharCode(parseInt($1, 16));
        });
    };
    /**
     * Restore HTML entities in text.
     */ HtmlEntities.prototype.restore = function(context) {
        var params = context.prefs.htmlEntity;
        var type = params.type;
        if (type === 'default') {
            return;
        }
        var entities = this.entities;
        if (params.onlyInvisible || params.list) {
            entities = [];
            if (params.onlyInvisible) {
                entities = entities.concat(this.invisibleEntities);
            }
            if (params.list) {
                entities = entities.concat(this.prepareListParam(params.list));
            }
        }
        context.text = this.restoreEntitiesByIndex(context.text, type, entities);
    };
    /**
     * Get a entity by utf using the type.
     */ HtmlEntities.prototype.getByUtf = function(symbol, type) {
        switch(type){
            case 'digit':
                return this.entitiesByDigitEntity[symbol];
            case 'name':
                return this.entitiesByNameEntity[symbol];
            case 'js':
                return this.entitiesByJsEntity[symbol];
        }
        return symbol;
    };
    HtmlEntities.prototype.prepareEntities = function(entities) {
        var result = [];
        entities.forEach(function(entity) {
            var name = entity[0], digit = entity[1];
            var utf = String.fromCharCode(digit);
            result.push({
                name: name,
                utf: utf,
                reUtf: new RegExp(utf, 'g'),
                type: {
                    name: '&' + name + ';',
                    digit: '&#' + digit + ';',
                    js: '\\u' + ('0000' + digit.toString(16)).slice(-4)
                }
            });
        });
        return result;
    };
    HtmlEntities.prototype.prepareListParam = function(list) {
        var _this = this;
        var result = [];
        list.forEach(function(name) {
            var entity = _this.entitiesByName[name];
            if (entity) {
                result.push(entity);
            }
        });
        return result;
    };
    HtmlEntities.prototype.restoreEntitiesByIndex = function(text, type, entities) {
        entities.forEach(function(entity) {
            text = text.replace(entity.reUtf, entity.type[type]);
        });
        return text;
    };
    return HtmlEntities;
}();
var htmlEntities = new HtmlEntities();
var locales = [];
function addLocale(locale) {
    var code = (locale || '').split('/')[0];
    if (code && code !== 'common' && !hasLocale(code)) {
        locales.push(code);
        locales.sort();
    }
}
function getLocales() {
    return locales;
}
function hasLocale(locale) {
    return locale === 'common' || locales.indexOf(locale) !== -1;
}
function prepareLocale(locale1, locale2) {
    var locale = locale1 || locale2;
    if (!locale) {
        return [];
    }
    return Array.isArray(locale) ? locale : [
        locale
    ];
}
function checkLocales(locales) {
    if (!locales.length) {
        throw Error('Not defined the property "locale".');
    }
    locales.forEach(function(locale) {
        if (!hasLocale(locale)) {
            throw Error("\"".concat(locale, "\" is not supported locale."));
        }
    });
}
var data$1 = {};
/**
 * Get data for use in rules.
 */ function getData(key) {
    return data$1[key];
}
/**
 * Set data for use in rules.
 */ function setData(newData) {
    Object.keys(newData).forEach(function(key) {
        addLocale(key);
        data$1[key] = newData[key];
    });
}
var inlineElements = [
    'a',
    'abbr',
    'acronym',
    'b',
    'bdo',
    'big',
    'br',
    'button',
    'cite',
    'code',
    'dfn',
    'em',
    'i',
    'img',
    'input',
    'kbd',
    'label',
    'map',
    'object',
    'q',
    'samp',
    'script',
    'select',
    'small',
    'span',
    'strong',
    'sub',
    'sup',
    'textarea',
    'time',
    'tt',
    'var'
];
var regExpUrl = new RegExp('(https?|file|ftp)://([a-zA-Z0-9/+-=%&:_.~?]+[a-zA-Z0-9#+]*)', 'g');
var regExpNumber = '\\d+([.,]\\d+)?';
var regExpDigit = /\d/;
function isDigit(symbol) {
    return symbol.search(regExpDigit) > -1;
}
var privateLabel = '\uF000';
var privateSeparateLabel = '\uF001';
var SafeTags = function() {
    function SafeTags() {
        this.groups = [
            'own',
            'html',
            'url'
        ];
        this.hidden = {};
        this.counter = 0;
        var html = [
            [
                '<!--',
                '-->'
            ],
            [
                '<!ENTITY',
                '>'
            ],
            [
                '<!DOCTYPE',
                '>'
            ],
            [
                '<\\?xml',
                '\\?>'
            ],
            [
                '<!\\[CDATA\\[',
                '\\]\\]>'
            ]
        ];
        [
            'code',
            'kbd',
            'object',
            'pre',
            'samp',
            'script',
            'style',
            'var'
        ].forEach(function(tag) {
            html.push([
                "<".concat(tag, "(\\s[^>]*?)?>"),
                "</".concat(tag, ">")
            ]);
        });
        this.tags = {
            own: [],
            html: html.map(this.prepareRegExp),
            url: [
                regExpUrl
            ]
        };
    }
    /**
     * Add own safe tag.
     */ SafeTags.prototype.add = function(tag) {
        this.tags.own.push(this.prepareRegExp(tag));
    };
    /**
     * Show safe tags.
     */ SafeTags.prototype.show = function(context, group) {
        var reReplace = new RegExp(privateLabel + 'tf\\d+' + privateLabel, 'g');
        var reSearch = new RegExp(privateLabel + 'tf\\d');
        var replaceLabel = function(match) {
            return context.safeTags.hidden[group][match] || match;
        };
        for(var i = 0, len = this.tags[group].length; i < len; i++){
            context.text = context.text.replace(reReplace, replaceLabel);
            if (context.text.search(reSearch) === -1) {
                break;
            }
        }
    };
    /**
     * Hide safe tags.
     */ SafeTags.prototype.hide = function(context, group) {
        var _this = this;
        context.safeTags.hidden[group] = {};
        var pasteLabel = this.pasteLabel.bind(this, context, group);
        this.tags[group].forEach(function(tag) {
            context.text = context.text.replace(_this.prepareRegExp(tag), pasteLabel);
        });
    };
    /**
     * Hide HTML tags.
     */ SafeTags.prototype.hideHTMLTags = function(context) {
        if (context.isHTML) {
            var pasteLabel = this.pasteLabel.bind(this, context, 'html');
            context.text = context.text.replace(/<\/?[a-z][^]*?>/gi, pasteLabel) // Tags
            .replace(/&lt;\/?[a-z][^]*?&gt;/gi, pasteLabel) // Escaping tags
            .replace(/&[gl]t;/gi, pasteLabel);
        }
    };
    /**
     * Get previous label.
     */ SafeTags.prototype.getPrevLabel = function(text, position) {
        for(var i = position - 1; i >= 0; i--){
            if (text[i] === privateLabel) {
                return text.slice(i, position + 1);
            }
        }
        return '';
    };
    SafeTags.prototype.getNextLabel = function(text, position) {
        for(var i = position + 1; i < text.length; i++){
            if (text[i] === privateLabel) {
                return text.slice(position, i + 1);
            }
        }
        return '';
    };
    SafeTags.prototype.getTagByLabel = function(context, label) {
        var result = null;
        this.groups.some(function(group) {
            var value = context.safeTags.hidden[group][label];
            if (typeof value !== 'undefined') {
                result = {
                    group: group,
                    value: value
                };
            }
            return result;
        });
        return result;
    };
    SafeTags.prototype.getTagInfo = function(tag) {
        if (!tag) {
            return null;
        }
        var result = {
            group: tag.group
        };
        switch(tag.group){
            case 'html':
                result.name = tag.value.split(/[<\s>]/)[1];
                result.isInline = inlineElements.indexOf(result.name) > -1;
                result.isClosing = tag.value.search(/^<\//) > -1;
                break;
            case 'url':
                result.isInline = true;
                break;
            case 'own':
                result.isInline = false;
                break;
        }
        return result;
    };
    SafeTags.prototype.pasteLabel = function(context, group, match) {
        var safeTags = context.safeTags;
        var key = privateLabel + 'tf' + safeTags.counter + privateLabel;
        safeTags.hidden[group][key] = match;
        safeTags.counter++;
        return key;
    };
    SafeTags.prototype.prepareRegExp = function(tag) {
        if (tag instanceof RegExp) {
            return tag;
        }
        var startTag = tag[0], endTag = tag[1], middle = tag[2];
        return new RegExp(startTag + (typeof middle === 'undefined' ? '[^]*?' : middle) + endTag, 'gi');
    };
    SafeTags.prototype.getPrevTagInfo = function(context, text, pos) {
        var prevLabel = this.getPrevLabel(text, pos - 1);
        if (prevLabel) {
            var prevTag = this.getTagByLabel(context, prevLabel);
            if (prevTag) {
                return this.getTagInfo(prevTag);
            }
        }
        return null;
    };
    SafeTags.prototype.getNextTagInfo = function(context, text, pos) {
        var nextLabel = this.getNextLabel(text, pos + 1);
        if (nextLabel) {
            var nextTag = this.getTagByLabel(context, nextLabel);
            if (nextTag) {
                return this.getTagInfo(nextTag);
            }
        }
        return null;
    };
    return SafeTags;
}();
function repeat(symbol, count) {
    var result = '';
    for(;;){
        if ((count & 1) === 1) {
            result += symbol;
        }
        count >>>= 1;
        if (count === 0) {
            break;
        }
        symbol += symbol;
    }
    return result;
}
function replaceNbsp$1(text) {
    return text.replace(/\u00A0/g, ' ');
}
function replace(text, re) {
    for(var i = 0; i < re.length; i++){
        text = text.replace(re[i][0], re[i][1]);
    }
    return text;
}
function isHTML(text) {
    return text.search(/(<\/?[a-z]|<!|&[lg]t;)/i) !== -1;
}
function removeCR(text) {
    return text.replace(/\r\n?/g, '\n');
}
function fixLineEnding(text, type) {
    if (type === 'CRLF') {
        return text.replace(/\n/g, '\r\n');
    } else if (type === 'CR') {
        return text.replace(/\n/g, '\r');
    }
    return text;
}
/**
 * Get a deep copy of a object.
 */ function deepCopy(obj) {
    return typeof obj === 'object' ? JSON.parse(JSON.stringify(obj)) : obj;
}
var groupIndexes = {
    symbols: 110,
    'number': 150,
    space: 210,
    dash: 310,
    punctuation: 410,
    nbsp: 510,
    money: 710,
    date: 810,
    other: 910,
    optalign: 1010,
    typo: 1110,
    html: 1210
};
var DEFAULT_RULE_INDEX = 0;
var DEFAULT_QUEUE_NAME = 'default';
var rules = [];
var innerRules = [];
function addInnerRule(rule) {
    innerRules.push(prepareRule(rule));
}
function addRule(rule) {
    var preparedRule = prepareRule(rule);
    addLocale(preparedRule.locale);
    rules.push(preparedRule);
}
function sortRules(rules) {
    rules.sort(function(a, b) {
        return a.index > b.index ? 1 : -1;
    });
}
function getRules() {
    var result = __spreadArray([], rules, true);
    sortRules(result);
    return result;
}
function getInnerRules() {
    return __spreadArray([], innerRules, true);
}
function getRuleIndex(rule) {
    if (typeof rule.index === 'number') {
        return rule.index;
    }
    var _a = rule.name.split('/'), group = _a[1];
    var groupIndex = groupIndexes[group];
    if (typeof groupIndex === 'undefined') {
        groupIndex = DEFAULT_RULE_INDEX;
    }
    if (typeof rule.index === 'string') {
        return groupIndex + parseInt(rule.index, 10);
    }
    return groupIndex;
}
function prepareRule(rule) {
    var _a = rule.name.split('/'), locale = _a[0], group = _a[1], shortName = _a[2];
    var preparedRule = {
        name: rule.name,
        shortName: shortName,
        handler: rule.handler,
        queue: rule.queue || DEFAULT_QUEUE_NAME,
        enabled: rule.disabled === true ? false : true,
        locale: locale,
        group: group,
        index: getRuleIndex(rule),
        settings: rule.settings,
        live: rule.live,
        htmlAttrs: rule.htmlAttrs
    };
    return preparedRule;
}
var PACKAGE_VERSION = '7.6.0';
function prepareHtmlEntity(htmlEntity) {
    var result = {
        type: (htmlEntity === null || htmlEntity === void 0 ? void 0 : htmlEntity.type) || 'default',
        list: htmlEntity === null || htmlEntity === void 0 ? void 0 : htmlEntity.list,
        onlyInvisible: Boolean(htmlEntity === null || htmlEntity === void 0 ? void 0 : htmlEntity.onlyInvisible)
    };
    return result;
}
function prepareLineEnding(lineEnding) {
    return lineEnding || 'LF';
}
function preparePrefs(prefs) {
    var result = {
        locale: prepareLocale(prefs.locale),
        lineEnding: prepareLineEnding(prefs.lineEnding),
        live: Boolean(prefs.live),
        ruleFilter: prefs.ruleFilter,
        enableRule: prefs.enableRule,
        disableRule: prefs.disableRule,
        processingSeparateParts: prefs.processingSeparateParts,
        htmlEntity: prepareHtmlEntity(prefs.htmlEntity)
    };
    return result;
}
function prepareContextPrefs(prefs, executePrefs) {
    var result = __assign({}, prefs);
    if (!executePrefs) {
        return result;
    }
    if ('locale' in executePrefs) {
        result.locale = prepareLocale(executePrefs.locale);
    }
    if ('htmlEntity' in executePrefs) {
        result.htmlEntity = prepareHtmlEntity(executePrefs.htmlEntity);
    }
    if ('lineEnding' in executePrefs) {
        result.lineEnding = prepareLineEnding(executePrefs.lineEnding);
    }
    if ('processingSeparateParts' in executePrefs) {
        result.processingSeparateParts = executePrefs.processingSeparateParts;
    }
    if ('ruleFilter' in executePrefs) {
        result.ruleFilter = executePrefs.ruleFilter;
    }
    return result;
}
var Typograf = function() {
    function Typograf(prefs) {
        var _this = this;
        this.rules = [];
        this.innerRules = [];
        this.rulesByQueues = {};
        this.innerRulesByQueues = {};
        this.separatePartsTags = [
            'title',
            'p',
            'h[1-6]',
            'select',
            'legend'
        ];
        this.prefs = preparePrefs(prefs);
        checkLocales(this.prefs.locale);
        this.safeTags = new SafeTags();
        this.settings = {};
        this.enabledRules = {};
        this.innerRulesByQueues = {};
        this.innerRules = getInnerRules();
        this.innerRules.forEach(function(rule) {
            _this.innerRulesByQueues[rule.queue] = _this.innerRulesByQueues[rule.queue] || [];
            _this.innerRulesByQueues[rule.queue].push(rule);
        });
        this.rulesByQueues = {};
        this.rules = getRules();
        this.rules.forEach(function(rule) {
            _this.prepareRuleSettings(rule);
            _this.rulesByQueues[rule.queue] = _this.rulesByQueues[rule.queue] || [];
            _this.rulesByQueues[rule.queue].push(rule);
        });
        if (this.prefs.disableRule) {
            this.disableRule(this.prefs.disableRule);
        }
        if (this.prefs.enableRule) {
            this.enableRule(this.prefs.enableRule);
        }
    }
    Typograf.addRule = function(rule) {
        addRule(rule);
    };
    Typograf.addRules = function(rules) {
        var _this = this;
        rules.forEach(function(item) {
            _this.addRule(item);
        });
    };
    /**
     * Add internal rule.
     * Internal rules are executed before main rules.
     */ Typograf.addInnerRule = function(rule) {
        addInnerRule(rule);
    };
    Typograf.addInnerRules = function(rules) {
        var _this = this;
        rules.forEach(function(item) {
            _this.addInnerRule(item);
        });
    };
    Typograf.getRule = function(ruleName) {
        var rule = null;
        var rules = getRules();
        rules.some(function(item) {
            if (item.name === ruleName) {
                rule = item;
                return true;
            }
            return false;
        });
        return rule;
    };
    Typograf.getRules = function() {
        return getRules();
    };
    Typograf.getInnerRules = function() {
        return getInnerRules();
    };
    Typograf.getLocales = function() {
        return getLocales();
    };
    Typograf.addLocale = function(locale) {
        addLocale(locale);
    };
    Typograf.hasLocale = function(locale) {
        return hasLocale(locale);
    };
    Typograf.setData = function(data) {
        setData(data);
    };
    Typograf.getData = function(key) {
        return getData(key);
    };
    /**
     * Execute typographical rules for text.
     */ Typograf.prototype.execute = function(text, prefs) {
        text = '' + text;
        if (!text) {
            return '';
        }
        var contextPrefs = prepareContextPrefs(this.prefs, prefs);
        checkLocales(contextPrefs.locale);
        var context = this.prepareContext(text, contextPrefs);
        return this.process(context);
    };
    Typograf.prototype.getSetting = function(ruleName, setting) {
        return this.settings[ruleName] && this.settings[ruleName][setting];
    };
    Typograf.prototype.setSetting = function(ruleName, setting, value) {
        this.settings[ruleName] = this.settings[ruleName] || {};
        this.settings[ruleName][setting] = value;
    };
    Typograf.prototype.isEnabledRule = function(ruleName) {
        return this.enabledRules[ruleName] !== false;
    };
    Typograf.prototype.isDisabledRule = function(ruleName) {
        return !this.enabledRules[ruleName];
    };
    Typograf.prototype.enableRule = function(ruleName) {
        return this.enable(ruleName, true);
    };
    Typograf.prototype.disableRule = function(ruleName) {
        return this.enable(ruleName, false);
    };
    /**
     * Add safe tag.
     *
     * @example
     * // const typograf = new Typograf({ locale: 'ru' });
     * // typograf.addSafeTag('<mytag>', '</mytag>');
     * // typograf.addSafeTag('<mytag>', '</mytag>', '.*?');
     * // typograf.addSafeTag(/<mytag>.*?</mytag>/gi);
    */ Typograf.prototype.addSafeTag = function(startTag, endTag, middle) {
        var tag = startTag instanceof RegExp ? startTag : [
            startTag,
            endTag,
            middle
        ];
        this.safeTags.add(tag);
    };
    Typograf.prototype.prepareContext = function(text, prefs) {
        var context = {
            text: text,
            isHTML: isHTML(text),
            prefs: prefs,
            getData: function(key) {
                if (key === 'char') {
                    return prefs.locale.map(function(item) {
                        return getData(item + '/' + key);
                    }).join('');
                } else {
                    return getData(prefs.locale[0] + '/' + key);
                }
            },
            safeTags: this.safeTags
        };
        return context;
    };
    Typograf.prototype.splitBySeparateParts = function(context) {
        if (!context.isHTML || context.prefs.processingSeparateParts === false) {
            return [
                context.text
            ];
        }
        var text = [];
        var reTags = new RegExp('<(' + this.separatePartsTags.join('|') + ')(\\s[^>]*?)?>[^]*?</\\1>', 'gi');
        var position = 0;
        context.text.replace(reTags, function($0, $1, $2, itemPosition) {
            if (position !== itemPosition) {
                text.push((position ? privateSeparateLabel : '') + context.text.slice(position, itemPosition) + privateSeparateLabel);
            }
            text.push($0);
            position = itemPosition + $0.length;
            return $0;
        });
        text.push(position ? privateSeparateLabel + context.text.slice(position, context.text.length) : context.text);
        return text;
    };
    Typograf.prototype.process = function(context) {
        var _this = this;
        context.text = removeCR(context.text);
        this.executeRules(context, 'start');
        this.safeTags.hide(context, 'own');
        this.executeRules(context, 'hide-safe-tags-own');
        this.safeTags.hide(context, 'html');
        this.executeRules(context, 'hide-safe-tags-html');
        var isRootHTML = context.isHTML;
        var re = new RegExp(privateSeparateLabel, 'g');
        context.text = this.splitBySeparateParts(context).map(function(item) {
            context.text = item;
            context.isHTML = isHTML(item);
            _this.safeTags.hideHTMLTags(context);
            _this.safeTags.hide(context, 'url');
            _this.executeRules(context, 'hide-safe-tags-url');
            _this.executeRules(context, 'hide-safe-tags');
            htmlEntities.toUtf(context);
            if (context.prefs.live) {
                context.text = replaceNbsp$1(context.text);
            }
            _this.executeRules(context, 'utf');
            _this.executeRules(context);
            htmlEntities.restore(context);
            _this.executeRules(context, 'html-entities');
            _this.safeTags.show(context, 'url');
            _this.executeRules(context, 'show-safe-tags-url');
            return context.text.replace(re, '');
        }).join('');
        context.isHTML = isRootHTML;
        this.safeTags.show(context, 'html');
        this.executeRules(context, 'show-safe-tags-html');
        this.safeTags.show(context, 'own');
        this.executeRules(context, 'show-safe-tags-own');
        this.executeRules(context, 'end');
        return fixLineEnding(context.text, context.prefs.lineEnding);
    };
    Typograf.prototype.executeRules = function(context, queue) {
        var _this = this;
        if (queue === void 0) {
            queue = DEFAULT_QUEUE_NAME;
        }
        var rules = this.rulesByQueues[queue];
        var innerRules = this.innerRulesByQueues[queue];
        if (innerRules) {
            innerRules.forEach(function(rule) {
                _this.ruleIterator(context, rule);
            });
        }
        if (rules) {
            rules.forEach(function(rule) {
                _this.ruleIterator(context, rule);
            });
        }
    };
    Typograf.prototype.ruleIterator = function(context, rule) {
        if (context.prefs.live === true && rule.live === false || context.prefs.live === false && rule.live === true) {
            return;
        }
        if ((rule.locale === 'common' || rule.locale === context.prefs.locale[0]) && this.isEnabledRule(rule.name)) {
            if (context.prefs.ruleFilter && !context.prefs.ruleFilter(rule)) {
                return;
            }
            if (this.onBeforeRule) {
                this.onBeforeRule(rule.name, context);
            }
            context.text = rule.handler.call(this, context.text, this.settings[rule.name], context);
            if (this.onAfterRule) {
                this.onAfterRule(rule.name, context);
            }
        }
    };
    Typograf.prototype.prepareRuleSettings = function(rule) {
        this.settings[rule.name] = deepCopy(rule.settings);
        this.enabledRules[rule.name] = rule.enabled;
    };
    Typograf.prototype.enable = function(ruleName, enabled) {
        var _this = this;
        if (Array.isArray(ruleName)) {
            ruleName.forEach(function(item) {
                _this.enableByMask(item, enabled);
            });
        } else {
            this.enableByMask(ruleName, enabled);
        }
    };
    Typograf.prototype.enableByMask = function(ruleName, enabled) {
        var _this = this;
        if (!ruleName) {
            return;
        }
        if (ruleName.search(/\*/) !== -1) {
            var re_1 = new RegExp(ruleName.replace(/\//g, '\\/').replace(/\*/g, '.*'));
            this.rules.forEach(function(el) {
                var name = el.name;
                if (re_1.test(name)) {
                    _this.enabledRules[name] = enabled;
                }
            });
        } else {
            this.enabledRules[ruleName] = enabled;
        }
    };
    Typograf.groups = [];
    Typograf.titles = {};
    Typograf.version = PACKAGE_VERSION;
    return Typograf;
}();
var common = {
    'common/char': 'a-z',
    'common/dash': '--?|‒|–|—',
    'common/quote': '«‹»›„“‟”"'
};
var be = {
    'be/char': 'абвгдежзйклмнопрстуфхцчшыьэюяёіўґ',
    'be/quote': {
        left: '«“',
        right: '»”'
    }
};
var bg = {
    'bg/char': 'абвгдежзийклмнопрстуфхцчшщъьюя',
    'bg/quote': {
        left: '„’',
        right: '“’'
    }
};
var ca = {
    'ca/char': 'abcdefghijlmnopqrstuvxyzàçèéíïòóúü',
    'ca/quote': {
        left: '«“',
        right: '»”'
    }
};
var cs = {
    'cs/char': 'a-záéíóúýčďěňřšťůž',
    'cs/quote': {
        left: '„‚',
        right: '“‘'
    }
};
var da = {
    'da/char': 'a-zåæø',
    'da/quote': {
        left: '»›',
        right: '«‹'
    }
};
var de = {
    'de/char': 'a-zßäöü',
    'de/quote': {
        left: '„‚',
        right: '“‘'
    }
};
var el = {
    'el/char': 'ΐάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώϲάέήίόύώ',
    'el/quote': {
        left: '«“',
        right: '»”'
    }
};
var enGB = {
    'en-GB/char': 'a-z',
    'en-GB/quote': {
        left: '‘“',
        right: '’”'
    },
    'en-GB/shortWord': 'a|an|and|as|at|bar|but|by|for|if|in|nor|not|of|off|on|or|out|per|pro|so|the|to|up|via|yet'
};
var enUS = {
    'en-US/char': 'a-z',
    'en-US/quote': {
        left: '“‘',
        right: '”’'
    },
    'en-US/shortWord': 'a|an|and|as|at|bar|but|by|for|if|in|nor|not|of|off|on|or|out|per|pro|so|the|to|up|via|yet'
};
var eo = {
    'eo/char': 'abcdefghijklmnoprstuvzĉĝĥĵŝŭ',
    'eo/quote': {
        left: '“‘',
        right: '”’'
    }
};
var es = {
    'es/char': 'a-záéíñóúü',
    'es/quote': {
        left: '«“',
        right: '»”'
    }
};
var et = {
    'et/char': 'abdefghijklmnoprstuvzäõöüšž',
    'et/quote': {
        left: '„«',
        right: '“»'
    }
};
var fi = {
    'fi/char': 'abcdefghijklmnopqrstuvyöäå',
    'fi/quote': {
        left: '”’',
        right: '”’'
    }
};
var fr = {
    'fr/char': 'a-zàâçèéêëîïôûüœæ',
    'fr/quote': {
        left: '«‹',
        right: '»›',
        spacing: true
    }
};
var ga = {
    'ga/char': 'abcdefghilmnoprstuvwxyzáéíóú',
    'ga/quote': {
        left: '“‘',
        right: '”’'
    }
};
var hu = {
    'hu/char': 'a-záäéíóöúüőű',
    'hu/quote': {
        left: '„»',
        right: '”«'
    }
};
var it = {
    'it/char': 'a-zàéèìòù',
    'it/quote': {
        left: '«“',
        right: '»”'
    },
    'it/shortWord': 'a|da|di|in|la|il|lo|e|o|se|su|che|come|ma|è|ho|ha|sa'
};
var lv = {
    'lv/char': 'abcdefghijklmnopqrstuvxzæœ',
    'lv/quote': {
        left: '«„',
        right: '»“'
    }
};
var nl = {
    'nl/char': 'a-zäçèéêëîïñöûü',
    'nl/quote': {
        left: '‘“',
        right: '’”'
    }
};
var no = {
    'no/char': 'a-zåæèéêòóôø',
    'no/quote': {
        left: '«’',
        right: '»’'
    }
};
var pl = {
    'pl/char': 'abcdefghijklmnoprstuvwxyzóąćęłńśźż',
    'pl/quote': {
        left: '„«',
        right: '”»'
    }
};
var ro = {
    'ro/char': 'abcdefghijklmnoprstuvxzîășț',
    'ro/quote': {
        left: '„«',
        right: '”»'
    }
};
var ru = {
    'ru/char': 'а-яё',
    'ru/dashBefore': '(^| |\\n)',
    'ru/dashAfter': '(?=[\u00A0 ,.?:!]|$)',
    'ru/dashAfterDe': '(?=[,.?:!]|[\u00A0 ][^А-ЯЁ]|$)',
    'ru/l': 'а-яёa-z',
    'ru/L': 'А-ЯЁA-Z',
    'ru/month': 'январь|февраль|март|апрель|май|июнь|июль|август|сентябрь|октябрь|ноябрь|декабрь',
    'ru/monthGenCase': 'января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря',
    'ru/monthPreCase': 'январе|феврале|марте|апреле|мае|июне|июле|августе|сентябре|октябре|ноябре|декабре',
    'ru/quote': {
        left: '«„‚',
        right: '»“‘',
        removeDuplicateQuotes: true
    },
    'ru/shortMonth': 'янв|фев|мар|апр|ма[ейя]|июн|июл|авг|сен|окт|ноя|дек',
    'ru/shortWord': 'а|без|в|во|если|да|до|для|за|и|или|из|к|ко|как|ли|на|но|не|ни|о|об|обо|от|по|про|при|под|с|со|то|у',
    'ru/weekday': 'понедельник|вторник|среда|четверг|пятница|суббота|воскресенье'
};
var sk = {
    'sk/char': 'abcdefghijklmnoprstuvwxyzáäéíóôúýčďľňŕšťž',
    'sk/quote': {
        left: '„‚',
        right: '“‘'
    }
};
var sl = {
    'sl/char': 'a-zčšž',
    'sl/quote': {
        left: '„‚',
        right: '“‘'
    }
};
var sr = {
    'sr/char': 'abcdefghijklmnoprstuvzćčđšž',
    'sr/quote': {
        left: '„’',
        right: '”’'
    }
};
var sv = {
    'sv/char': 'a-zäåéö',
    'sv/quote': {
        left: '”’',
        right: '”’'
    }
};
var tr = {
    'tr/char': 'abcdefghijklmnoprstuvyzâçîöûüğış',
    'tr/quote': {
        left: '“‘',
        right: '”’'
    }
};
var uk = {
    'uk/char': 'абвгдежзийклмнопрстуфхцчшщьюяєіїґ',
    'uk/quote': {
        left: '«„',
        right: '»“'
    }
};
var data = [
    common,
    be,
    bg,
    ca,
    cs,
    da,
    de,
    el,
    enGB,
    enUS,
    eo,
    es,
    et,
    fi,
    fr,
    ga,
    hu,
    it,
    lv,
    nl,
    no,
    pl,
    ro,
    ru,
    sk,
    sl,
    sr,
    sv,
    tr,
    uk
];
data.forEach(function(item) {
    return setData(item);
});
var eMailRule = {
    name: 'common/html/e-mail',
    queue: 'end',
    handler: function(text, _settings, context) {
        return context.isHTML ? text : text.replace(/(^|[\s;(])([\w\-.]{2,64})@([\w\-.]{2,64})\.([a-z]{2,64})([)\s.,!?]|$)/gi, '$1<a href="mailto:$2@$3.$4">$2@$3.$4</a>$5');
    },
    disabled: true,
    htmlAttrs: false
};
var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
    '/': '&#x2F;'
};
var escapeRule = {
    name: 'common/html/escape',
    index: '+100',
    queue: 'end',
    handler: function(text) {
        return text.replace(/[&<>"'/]/g, function(key) {
            return entityMap[key];
        });
    },
    disabled: true
};
var nbrRule = {
    name: 'common/html/nbr',
    index: '+10',
    queue: 'end',
    handler: function(text) {
        return text.replace(/([^\n>])\n(?=[^\n])/g, '$1<br/>\n');
    },
    disabled: true,
    htmlAttrs: false
};
var blockElements = [
    'address',
    'article',
    'aside',
    'blockquote',
    'canvas',
    'dd',
    'div',
    'dl',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'header',
    'hgroup',
    'hr',
    'li',
    'main',
    'nav',
    'noscript',
    'ol',
    'output',
    'p',
    'pre',
    'section',
    'table',
    'tfoot',
    'ul',
    'video'
];
var blockRe = new RegExp('<(' + blockElements.join('|') + ')[>\\s]');
var separator = '\n\n';
var pRule = {
    name: 'common/html/p',
    index: '+5',
    queue: 'end',
    handler: function(text) {
        var buffer = text.split(separator);
        buffer.forEach(function(text, i, data) {
            if (!text.trim()) {
                return;
            }
            if (!blockRe.test(text)) {
                data[i] = text.replace(/^(\s*)/, '$1<p>').replace(/(\s*)$/, '</p>$1');
            }
        });
        return buffer.join(separator);
    },
    disabled: true,
    htmlAttrs: false
};
var processingAttrsRule = {
    name: 'common/html/processingAttrs',
    queue: 'hide-safe-tags-own',
    handler: function(text, settings, context) {
        var _this = this;
        var reAttrs = new RegExp('(^|\\s)(' + settings.attrs.join('|') + ')=("[^"]*?"|\'[^\']*?\')', 'gi');
        var prefs = deepCopy(context.prefs);
        prefs.ruleFilter = function(rule) {
            return rule.htmlAttrs !== false;
        };
        return text.replace(/(<[-\w]+\s)([^>]+?)(?=>)/g, function(_match, tagName, attrs) {
            var resultAttrs = attrs.replace(reAttrs, function(_submatch, space, attrName, attrValue) {
                var lquote = attrValue[0];
                var rquote = attrValue[attrValue.length - 1];
                var value = attrValue.slice(1, -1);
                return space + attrName + '=' + lquote + _this.execute(value, prefs) + rquote;
            });
            return tagName + resultAttrs;
        });
    },
    settings: {
        attrs: [
            'title',
            'placeholder'
        ]
    },
    disabled: true,
    htmlAttrs: false
};
var quotRule = {
    name: 'common/html/quot',
    queue: 'hide-safe-tags',
    handler: function(text) {
        return text.replace(/&quot;/g, '"');
    }
};
var stripTagsRule = {
    name: 'common/html/stripTags',
    index: '+99',
    queue: 'end',
    handler: function(text) {
        return text.replace(/<[^>]+>/g, '');
    },
    disabled: true
};
var urlRule = {
    name: 'common/html/url',
    queue: 'end',
    handler: function(text, _settings, context) {
        return context.isHTML ? text : text.replace(regExpUrl, function($0, protocol, path) {
            path = path.replace(/([^/]+\/?)(\?|#)$/, '$1') // Remove ending ? and #
            .replace(/^([^/]+)\/$/, '$1'); // Remove ending /
            if (protocol === 'http') {
                path = path.replace(/^([^/]+)(:80)([^\d]|\/|$)/, '$1$3'); // Remove 80 port
            } else if (protocol === 'https') {
                path = path.replace(/^([^/]+)(:443)([^\d]|\/|$)/, '$1$3'); // Remove 443 port
            }
            var url = path;
            var fullUrl = protocol + '://' + path;
            var firstPart = '<a href="' + fullUrl + '">';
            if (protocol === 'http' || protocol === 'https') {
                url = url.replace(/^www\./, '');
                return firstPart + (protocol === 'http' ? url : protocol + '://' + url) + '</a>';
            }
            return firstPart + fullUrl + '</a>';
        });
    },
    disabled: true,
    htmlAttrs: false
};
Typograf.addRules([
    eMailRule,
    escapeRule,
    nbrRule,
    pRule,
    processingAttrsRule,
    quotRule,
    stripTagsRule,
    urlRule
]);
var afterNumberRule = {
    name: 'common/nbsp/afterNumber',
    handler: function(text, _settings, context) {
        var char = context.getData('char');
        var re = '(^|\\s)(\\d{1,5}) ([' + char + ']+)';
        return text.replace(new RegExp(re, 'gi'), '$1$2\u00A0$3');
    },
    disabled: true
};
var afterParagraphMarkRule = {
    name: 'common/nbsp/afterParagraphMark',
    handler: function(text) {
        return text.replace(/¶ ?(?=\d)/g, '¶\u00A0');
    }
};
var afterSectionMarkRule = {
    name: 'common/nbsp/afterSectionMark',
    handler: function(text, _settings, context) {
        // \u2009 - THIN SPACE
        // \u202F - NARROW NO-BREAK SPACE
        var locale = context.prefs.locale[0];
        return text.replace(/§[ \u00A0\u2009]?(?=\d|I|V|X)/g, locale === 'ru' ? '§\u202F' : '§\u00A0');
    }
};
var afterShortWordRule = {
    name: 'common/nbsp/afterShortWord',
    handler: function(text, settings, context) {
        var lengthShortWord = settings.lengthShortWord;
        var quote = getData('common/quote');
        var char = context.getData('char');
        var before = ' \u00A0(' + privateLabel + quote;
        var subStr = '(^|[' + before + '])([' + char + ']{1,' + lengthShortWord + '}) ';
        var newSubStr = '$1$2\u00A0';
        var re = new RegExp(subStr, 'gim');
        return text.replace(re, newSubStr).replace(re, newSubStr);
    },
    settings: {
        lengthShortWord: 2
    }
};
var afterShortWordByListRule = {
    name: 'common/nbsp/afterShortWordByList',
    handler: function(text, _, context) {
        var quote = getData('common/quote');
        var shortWord = context.getData('shortWord');
        var before = ' \u00A0(' + privateLabel + quote;
        var subStr = '(^|[' + before + '])(' + shortWord + ') ';
        var newSubStr = '$1$2\u00A0';
        var re = new RegExp(subStr, 'gim');
        return text.replace(re, newSubStr).replace(re, newSubStr);
    }
};
var beforeShortLastNumberRule = {
    name: 'common/nbsp/beforeShortLastNumber',
    handler: function(text, settings, context) {
        var quote = context.getData('quote');
        var ch = context.getData('char');
        var CH = ch.toUpperCase();
        var re = new RegExp('([' + ch + CH + ']) (?=\\d{1,' + settings.lengthLastNumber + '}[-+−%\'"' + quote.right + ')]?([.!?…]( [' + CH + ']|$)|$))', 'gm');
        return text.replace(re, '$1\u00A0');
    },
    live: false,
    settings: {
        lengthLastNumber: 2
    }
};
var beforeShortLastWordRule = {
    name: 'common/nbsp/beforeShortLastWord',
    handler: function(text, settings, context) {
        var ch = context.getData('char');
        var CH = ch.toUpperCase();
        var re = new RegExp('([' + ch + '\\d]) ([' + ch + CH + ']{1,' + settings.lengthLastWord + '}[.!?…])( [' + CH + ']|$)', 'g');
        return text.replace(re, '$1\u00A0$2$3');
    },
    settings: {
        lengthLastWord: 3
    }
};
var dpiRule = {
    name: 'common/nbsp/dpi',
    handler: function(text) {
        return text.replace(/(\d) ?(lpi|dpi)(?!\w)/, '$1\u00A0$2');
    }
};
function replaceNbsp($0, $1, $2, $3) {
    return $1 + $2.replace(/([^\u00A0])\u00A0([^\u00A0])/g, '$1 $2') + $3;
}
var nowrapRule = {
    name: 'common/nbsp/nowrap',
    queue: 'end',
    handler: function(text) {
        return text.replace(/(<nowrap>)(.*?)(<\/nowrap>)/g, replaceNbsp).replace(/(<nobr>)(.*?)(<\/nobr>)/g, replaceNbsp);
    }
};
var replaceNbspRule = {
    name: 'common/nbsp/replaceNbsp',
    queue: 'utf',
    live: false,
    handler: replaceNbsp$1,
    disabled: true
};
Typograf.addRules([
    afterNumberRule,
    afterParagraphMarkRule,
    afterSectionMarkRule,
    afterShortWordRule,
    afterShortWordByListRule,
    beforeShortLastNumberRule,
    beforeShortLastWordRule,
    dpiRule,
    nowrapRule,
    replaceNbspRule
]);
var digitGroupingRule = {
    name: 'common/number/digitGrouping',
    index: '310',
    disabled: true,
    handler: function(text, settings) {
        return text.replace(new RegExp("(^ ?|\\D |".concat(privateLabel, ")(\\d{1,3}([ \u00A0\u202F\u2009]\\d{3})+)(?! ?[\\d-])"), 'gm'), function($0, $1, $2) {
            return $1 + $2.replace(/\s/g, settings.space);
        })// https://www.bipm.org/utils/common/pdf/si-brochure/SI-Brochure-9-EN.pdf #5.4.4
        .replace(/(\d{5,}([.,]\d+)?)/g, function($0, $1) {
            var decimalMarker = $1.match(/[.,]/);
            var parts = decimalMarker ? $1.split(decimalMarker) : [
                $1
            ];
            var integerPart = parts[0];
            var fractionalPart = parts[1];
            integerPart = integerPart.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1' + settings.space);
            return decimalMarker ? integerPart + decimalMarker + fractionalPart : integerPart;
        });
    },
    settings: {
        space: '\u202F'
    }
};
var fractionRule = {
    name: 'common/number/fraction',
    handler: function(text) {
        return text.replace(/(^|\D)1\/2(\D|$)/g, '$1½$2').replace(/(^|\D)1\/4(\D|$)/g, '$1¼$2').replace(/(^|\D)3\/4(\D|$)/g, '$1¾$2');
    }
};
var mathSignsRule = {
    name: 'common/number/mathSigns',
    handler: function(text) {
        return replace(text, [
            [
                /!=/g,
                '≠'
            ],
            [
                /<=/g,
                '≤'
            ],
            [
                /(^|[^=])>=/g,
                '$1≥'
            ],
            [
                /<=>/g,
                '⇔'
            ],
            [
                /<</g,
                '≪'
            ],
            [
                />>/g,
                '≫'
            ],
            [
                /~=/g,
                '≅'
            ],
            [
                /(^|[^+])\+-/g,
                '$1±'
            ]
        ]);
    }
};
var timesRule = {
    name: 'common/number/times',
    handler: function(text) {
        return text.replace(/(\d)[ \u00A0]?[xх][ \u00A0]?(\d)/g, '$1×$2');
    }
};
Typograf.addRules([
    digitGroupingRule,
    fractionRule,
    mathSignsRule,
    timesRule
]);
var delBOMRule = {
    name: 'common/other/delBOM',
    queue: 'start',
    index: -1,
    handler: function(text) {
        if (text.charCodeAt(0) === 0xFEFF) {
            return text.slice(1);
        }
        return text;
    }
};
var repeatWordRule = {
    name: 'common/other/repeatWord',
    handler: function(text, settings, context) {
        var quote = getData('common/quote');
        var char = context.getData('char');
        var punc = '[;:,.?! \u00a0\n' + quote + ']';
        var re = new RegExp('(' + punc + '|^)' + '([' + char + ']{' + settings.min + ',})[ \u00a0]' + '\\2(' + punc + '|$)', 'gi');
        return text.replace(re, '$1$2$3');
    },
    settings: {
        min: 2
    },
    disabled: true
};
Typograf.addRules([
    delBOMRule,
    repeatWordRule
]);
var apostropheRule = {
    name: 'common/punctuation/apostrophe',
    handler: function(text, _settings, context) {
        var char = context.getData('char');
        var letters = '([' + char + '])';
        var re = new RegExp(letters + '\'' + letters, 'gi');
        return text.replace(re, '$1’$2');
    }
};
var delDoublePunctuationRule = {
    name: 'common/punctuation/delDoublePunctuation',
    handler: function(text) {
        return text.replace(/(^|[^,]),,(?!,)/g, '$1,').replace(/(^|[^:])::(?!:)/g, '$1:').replace(/(^|[^!?.])\.\.(?!\.)/g, '$1.').replace(/(^|[^;]);;(?!;)/g, '$1;').replace(/(^|[^?])\?\?(?!\?)/g, '$1?');
    }
};
var hellipRule = {
    name: 'common/punctuation/hellip',
    handler: function(text, _settings, context) {
        return context.prefs.locale[0] === 'ru' ? text.replace(/(^|[^.])\.{3,4}(?=[^.]|$)/g, '$1…') : text.replace(/(^|[^.])\.{3}(\.?)(?=[^.]|$)/g, '$1…$2');
    }
};
var MAX_LEVEL_WITH_ERRORS = 2;
var Quote = function() {
    function Quote() {
        this.bufferQuotes = {
            left: '\uF005\uF006\uF007',
            right: '\uF008\uF009\uF0A0'
        };
        this.beforeLeft = ' \n\t\u00a0[(';
        this.afterRight = ' \n\t\u00a0!?.:;#*,…)\\]';
    }
    Quote.prototype.process = function(params) {
        var text = params.context.text;
        var count = this.count(text);
        if (!count.total) {
            return text;
        }
        var originalSettings = params.settings;
        var isEqualQuotes = params.settings.left[0] === params.settings.right[0];
        // For SW, FI
        if (isEqualQuotes) {
            params.settings = deepCopy(params.settings);
            params.settings.left = this.bufferQuotes.left.slice(0, params.settings.left.length);
            params.settings.right = this.bufferQuotes.right.slice(0, params.settings.right.length);
        }
        // For FR
        if (params.settings.spacing) {
            text = this.removeSpacing(text, params.settings);
        }
        text = this.set(text, params);
        // For FR
        if (params.settings.spacing) {
            text = this.setSpacing(text, params.settings);
        }
        // For RU
        if (params.settings.removeDuplicateQuotes) {
            text = this.removeDuplicates(text, params.settings);
        }
        // For SW, FI
        if (isEqualQuotes) {
            text = this.returnOriginalQuotes(text, originalSettings, params.settings);
            params.settings = originalSettings;
        }
        return text;
    };
    Quote.prototype.returnOriginalQuotes = function(text, originalSettings, bufferSettings) {
        var buffer = {};
        for(var i = 0; i < bufferSettings.left.length; i++){
            buffer[bufferSettings.left[i]] = originalSettings.left[i];
            buffer[bufferSettings.right[i]] = originalSettings.right[i];
        }
        return text.replace(new RegExp('[' + bufferSettings.left + bufferSettings.right + ']', 'g'), function(quote) {
            return buffer[quote];
        });
    };
    Quote.prototype.count = function(text) {
        var count = {
            total: 0
        };
        text.replace(new RegExp('[' + getData('common/quote') + ']', 'g'), function(quote) {
            if (!count[quote]) {
                count[quote] = 0;
            }
            count[quote]++;
            count.total++;
            return quote;
        });
        return count;
    };
    Quote.prototype.removeDuplicates = function(text, settings) {
        var lquote = settings.left[0];
        var lquote2 = settings.left[1] || lquote;
        var rquote = settings.right[0];
        if (lquote !== lquote2) {
            return text;
        }
        return text// ««word» word» -> «word» word»
        .replace(new RegExp(lquote + lquote, 'g'), lquote)// «word «word»» -> «word «word»
        .replace(new RegExp(rquote + rquote, 'g'), rquote);
    };
    Quote.prototype.removeSpacing = function(text, settings) {
        for(var i = 0, len = settings.left.length; i < len; i++){
            var lquote = settings.left[i];
            var rquote = settings.right[i];
            text = text.replace(new RegExp(lquote + '([ \u202F\u00A0])', 'g'), lquote).replace(new RegExp('([ \u202F\u00A0])' + rquote, 'g'), rquote);
        }
        return text;
    };
    Quote.prototype.setSpacing = function(text, settings) {
        for(var i = 0, len = settings.left.length; i < len; i++){
            var lquote = settings.left[i];
            var rquote = settings.right[i];
            text = text.replace(new RegExp(lquote + '([^\u202F])', 'g'), lquote + '\u202F$1').replace(new RegExp('([^\u202F])' + rquote, 'g'), '$1\u202F' + rquote);
        }
        return text;
    };
    Quote.prototype.set = function(text, params) {
        var quotes = getData('common/quote');
        var lquote = params.settings.left[0];
        var lquote2 = params.settings.left[1] || lquote;
        var rquote = params.settings.right[0];
        var reL = new RegExp('(^|[' + this.beforeLeft + '])([' + quotes + ']+)(?=[^\\s' + privateLabel + '])', 'gim');
        var reR = new RegExp('([^\\s' + privateLabel + '])([' + quotes + ']+)(?=[' + this.afterRight + ']|$)', 'gim');
        text = text.replace(reL, function($0, $1, $2) {
            return $1 + repeat(lquote, $2.length);
        }).replace(reR, function($0, $1, $2) {
            return $1 + repeat(rquote, $2.length);
        });
        text = this.setAboveTags(text, params);
        if (lquote !== lquote2) {
            text = this.setInner(text, params.settings);
        }
        return text;
    };
    Quote.prototype.setAboveTags = function(text, params) {
        var _this = this;
        var quotes = getData('common/quote');
        var lquote = params.settings.left[0];
        var rquote = params.settings.right[0];
        return text.replace(new RegExp('(^|.)([' + quotes + '])(.|$)', 'gm'), function(original, prev, quote, next, pos) {
            if (prev !== privateLabel && next !== privateLabel) {
                return original;
            }
            if (prev === privateLabel && next === privateLabel) {
                if (quote === '"') {
                    return prev + _this.getAboveTwoTags(text, pos + 1, params) + next;
                }
                return original;
            }
            if (prev === privateLabel) {
                var hasRight = _this.afterRight.indexOf(next) > -1;
                var prevInfo = params.safeTags.getPrevTagInfo(params.context, text, pos + 1);
                if (hasRight && prevInfo && prevInfo.group === 'html') {
                    return prev + (prevInfo.isClosing ? rquote : lquote) + next;
                }
                return prev + (!next || hasRight ? rquote : lquote) + next;
            } else {
                var hasLeft = _this.beforeLeft.indexOf(prev) > -1;
                var nextInfo = params.safeTags.getNextTagInfo(params.context, text, pos + 1);
                if (hasLeft && nextInfo && nextInfo.group === 'html') {
                    return prev + (nextInfo.isClosing ? rquote : lquote) + next;
                }
                return prev + (!prev || hasLeft ? lquote : rquote) + next;
            }
        });
    };
    Quote.prototype.getAboveTwoTags = function(text, pos, params) {
        var prevInfo = params.safeTags.getPrevTagInfo(params.context, text, pos);
        var nextInfo = params.safeTags.getNextTagInfo(params.context, text, pos);
        if (prevInfo) {
            if (prevInfo.group === 'html') {
                if (!prevInfo.isClosing) {
                    return params.settings.left[0];
                }
                if (nextInfo && nextInfo.isClosing && prevInfo.isClosing) {
                    return params.settings.right[0];
                }
            }
        }
        return text[pos];
    };
    Quote.prototype.setInner = function(text, settings) {
        var lquote = settings.left[0];
        var rquote = settings.right[0];
        var minLevel = 0;
        var maxLevel = this.getMaxLevel(text, lquote, rquote, settings.left.length);
        var level = minLevel;
        var result = '';
        for(var i = 0, len = text.length; i < len; i++){
            var letter = text[i];
            if (letter === lquote) {
                result += settings.left[level > maxLevel - 1 ? maxLevel - 1 : level];
                level++;
                if (level > maxLevel) {
                    level = maxLevel;
                }
            } else if (letter === rquote) {
                level--;
                if (level < minLevel) {
                    level = minLevel;
                }
                result += settings.right[level];
            } else {
                if (letter === '"') {
                    level = minLevel;
                }
                result += letter;
            }
        }
        return result;
    };
    Quote.prototype.getMaxLevel = function(text, leftQuote, rightQuote, length) {
        var count = this.count(text);
        return count[leftQuote] === count[rightQuote] ? length : Math.min(length, MAX_LEVEL_WITH_ERRORS);
    };
    return Quote;
}();
var quote = new Quote();
var settings = {};
getLocales().forEach(function(locale) {
    settings[locale] = deepCopy(getData(locale + '/quote'));
});
var quoteRule$1 = {
    name: 'common/punctuation/quote',
    handler: function(text, commonSettings, context) {
        var locale = context.prefs.locale[0];
        var settings = commonSettings[locale];
        if (!settings) {
            return text;
        }
        return quote.process({
            context: context,
            settings: settings,
            safeTags: this.safeTags
        });
    },
    settings: settings
};
var quoteLinkRule = {
    name: 'common/punctuation/quoteLink',
    queue: 'show-safe-tags-html',
    index: '+5',
    handler: function(text, _settings, context) {
        var quotes = this.getSetting('common/punctuation/quote', context.prefs.locale[0]);
        var lquote1 = htmlEntities.getByUtf(quotes.left[0]);
        var rquote1 = htmlEntities.getByUtf(quotes.right[0]);
        var lquote2 = htmlEntities.getByUtf(quotes.left[1]);
        var rquote2 = htmlEntities.getByUtf(quotes.right[1]);
        lquote2 = lquote2 ? '|' + lquote2 : '';
        rquote2 = rquote2 ? '|' + rquote2 : '';
        var re = new RegExp('(<[aA]\\s[^>]*?>)(' + lquote1 + lquote2 + ')([^]*?)(' + rquote1 + rquote2 + ')(</[aA]>)', 'g');
        return text.replace(re, '$2$1$3$5$4');
    }
};
Typograf.addRules([
    apostropheRule,
    delDoublePunctuationRule,
    hellipRule,
    quoteRule$1,
    quoteLinkRule
]);
var beforeBracketRule = {
    name: 'common/space/beforeBracket',
    handler: function(text, _settings, context) {
        var char = context.getData('char');
        var re = new RegExp('([' + char + '.!?,;…)])\\(', 'gi');
        return text.replace(re, '$1 (');
    }
};
var bracketRule$1 = {
    name: 'common/space/bracket',
    handler: function(text) {
        return text.replace(/(\() +/g, '(').replace(/ +\)/g, ')');
    }
};
var delBeforePercentRule = {
    name: 'common/space/delBeforePercent',
    handler: function(text) {
        return text.replace(/(\d)( |\u00A0)(%|‰|‱)/g, '$1$3');
    }
};
var delBeforePunctuationRule = {
    name: 'common/space/delBeforePunctuation',
    handler: function(text) {
        return text.replace(/(^|[^!?:;,.…]) ([!?:;,])(?!\))/g, '$1$2');
    }
};
var delBetweenExclamationMarksRule = {
    name: 'common/space/delBetweenExclamationMarks',
    handler: function(text) {
        return text.replace(/([!?]) (?=[!?])/g, '$1');
    }
};
var delBeforeDotRule = {
    name: 'common/space/delBeforeDot',
    handler: function(text) {
        return text.replace(/(^|[^!?:;,.…]) (\.|\.\.\.)(\s|$)/g, '$1$2$3');
    }
};
var delLeadingBlanksRule = {
    name: 'common/space/delLeadingBlanks',
    handler: function(text) {
        return text.replace(/^[ \t]+/mg, '');
    },
    disabled: true
};
var delRepeatNRule = {
    name: 'common/space/delRepeatN',
    index: '-1',
    handler: function(text, settings) {
        var maxConsecutiveLineBreaks = settings.maxConsecutiveLineBreaks;
        var consecutiveLineBreaksRegex = new RegExp("\n{".concat(maxConsecutiveLineBreaks + 1, ",}"), 'g');
        var replaceValue = repeat('\n', maxConsecutiveLineBreaks);
        return text.replace(consecutiveLineBreaksRegex, replaceValue);
    },
    settings: {
        maxConsecutiveLineBreaks: 2
    }
};
var delRepeatSpaceRule = {
    name: 'common/space/delRepeatSpace',
    index: '-1',
    handler: function(text) {
        return text.replace(/([^\n \t])[ \t]{2,}(?![\n \t])/g, '$1 ');
    }
};
var delTrailingBlanksRule = {
    name: 'common/space/delTrailingBlanks',
    index: '-3',
    handler: function(text) {
        return text.replace(/[ \t]+\n/g, '\n');
    }
};
var insertFinalNewlineRule = {
    name: 'common/space/insertFinalNewline',
    queue: 'end',
    handler: function(text) {
        return text[text.length - 1] === '\n' ? text : text + '\n';
    },
    live: false,
    disabled: true
};
var replaceTabRule = {
    name: 'common/space/replaceTab',
    index: '-5',
    handler: function(text) {
        return text.replace(/\t/g, '    ');
    }
};
var squareBracketRule = {
    name: 'common/space/squareBracket',
    handler: function(text) {
        return text.replace(/(\[) +/g, '[').replace(/ +\]/g, ']');
    }
};
var trimLeftRule = {
    name: 'common/space/trimLeft',
    index: '-4',
    handler: String.prototype.trimLeft ? function(text) {
        return text.trimLeft();
    } : /* istanbul ignore next */ function(text) {
        return text.replace(/^[\s\uFEFF\xA0]+/g, '');
    }
};
var trimRightRule = {
    name: 'common/space/trimRight',
    index: '-3',
    live: false,
    handler: String.prototype.trimRight ? function(text) {
        return text.trimRight();
    } : /* istanbul ignore next */ function(text) {
        return text.replace(/[\s\uFEFF\xA0]+$/g, '');
    }
};
var reColon = new RegExp('(\\D):([^)",:.?\\s\\/\\\\' + privateLabel + '])', 'g');
var afterColonRule = {
    name: 'common/space/afterColon',
    handler: function(text) {
        return text.replace(reColon, '$1: $2');
    }
};
var afterCommaRule = {
    name: 'common/space/afterComma',
    handler: function(text, settings, context) {
        var quote = context.getData('quote');
        var quotes = typeof quote === 'string' ? quote : quote.right;
        return text.replace(new RegExp('(.),([^)",:.?\\s\\/\\\\' + privateLabel + quotes + '])', 'g'), function($0, $1, $2) {
            return isDigit($1) && isDigit($2) ? $0 : $1 + ', ' + $2;
        });
    }
};
var reQuestionMark = new RegExp('\\?([^).…!;?\\s[\\])' + privateLabel + getData('common/quote') + '])', 'g');
var afterQuestionMarkRule = {
    name: 'common/space/afterQuestionMark',
    handler: function(text) {
        return text.replace(reQuestionMark, '? $1');
    }
};
var reExclamationMark = new RegExp('!([^).…!;?\\s[\\])' + privateLabel + getData('common/quote') + '])', 'g');
var afterExclamationMarkRule = {
    name: 'common/space/afterExclamationMark',
    handler: function(text) {
        return text.replace(reExclamationMark, '! $1');
    }
};
var reSemicolon = new RegExp(';([^).…!;?\\s[\\])' + privateLabel + getData('common/quote') + '])', 'g');
var afterSemicolonRule = {
    name: 'common/space/afterSemicolon',
    handler: function(text) {
        return text.replace(reSemicolon, '; $1');
    }
};
Typograf.addRules([
    afterColonRule,
    afterCommaRule,
    afterQuestionMarkRule,
    afterExclamationMarkRule,
    afterSemicolonRule,
    beforeBracketRule,
    bracketRule$1,
    delBeforeDotRule,
    delBeforePercentRule,
    delBeforePunctuationRule,
    delBetweenExclamationMarksRule,
    delLeadingBlanksRule,
    delRepeatNRule,
    delRepeatSpaceRule,
    delTrailingBlanksRule,
    insertFinalNewlineRule,
    replaceTabRule,
    squareBracketRule,
    trimLeftRule,
    trimRightRule
]);
var arrowRule = {
    name: 'common/symbols/arrow',
    handler: function(text) {
        return replace(text, [
            [
                /(^|[^-])->(?!>)/g,
                '$1→'
            ],
            [
                /(^|[^<])<-(?!-)/g,
                '$1←'
            ]
        ]);
    }
};
var cfRule = {
    name: 'common/symbols/cf',
    handler: function(text) {
        var re = new RegExp('(^|[\\s(\\[+≈±−—–\\-])(\\d+(?:[.,]\\d+)?)[ \u00A0\u2009]?(C|F)([\\W\\s.,:!?")\\]]|$)', 'mg');
        return text.replace(re, '$1$2\u2009°$3$4');
    }
};
var copyRule = {
    name: 'common/symbols/copy',
    handler: function(text) {
        return replace(text, [
            [
                /\(r\)/gi,
                '®'
            ],
            [
                /(copyright )?\((c|с)\)/gi,
                '©'
            ],
            [
                /\(tm\)/gi,
                '™'
            ]
        ]);
    }
};
Typograf.addRules([
    arrowRule,
    cfRule,
    copyRule
]);
var mainRule$1 = {
    name: 'en-US/dash/main',
    index: '-5',
    handler: function(text) {
        var dashes = getData('common/dash');
        var nonBreakingSpace = '\u00A0';
        var emDash = '\u2014';
        var spaceBefore = "[ ".concat(nonBreakingSpace, "]"); // white space or a non-breaking space
        var spaceAfter = "[ ".concat(nonBreakingSpace, "\n]"); // same as spaceBefore, but includes line break
        var re = new RegExp("".concat(spaceBefore, "(").concat(dashes, ")(").concat(spaceAfter, ")"), 'g');
        return text.replace(re, "".concat(nonBreakingSpace).concat(emDash, "$2"));
    }
};
Typograf.addRules([
    mainRule$1
]);
var centuriesRule$1 = {
    name: 'ru/dash/centuries',
    handler: function(text, settings) {
        var dashes = '(' + getData('common/dash') + ')';
        var re = new RegExp('(X|I|V)[ |\u00A0]?' + dashes + '[ |\u00A0]?(X|I|V)', 'g');
        return text.replace(re, '$1' + settings.dash + '$3');
    },
    settings: {
        dash: '\u2013'
    }
};
var daysMonthRule = {
    name: 'ru/dash/daysMonth',
    handler: function(text, settings) {
        var re = new RegExp('(^|\\s)([123]?\\d)' + '(' + getData('common/dash') + ')' + '([123]?\\d)[ \u00A0]' + '(' + getData('ru/monthGenCase') + ')', 'g');
        return text.replace(re, '$1$2' + settings.dash + '$4\u00A0$5');
    },
    settings: {
        dash: '\u2013'
    }
};
var deRule = {
    name: 'ru/dash/de',
    handler: function(text) {
        var re = new RegExp('([a-яё]+) де' + getData('ru/dashAfterDe'), 'g');
        return text.replace(re, '$1-де');
    },
    disabled: true
};
var decadeRule = {
    name: 'ru/dash/decade',
    handler: function(text, settings) {
        var re = new RegExp('(^|\\s)(\\d{3}|\\d)0' + '(' + getData('common/dash') + ')' + '(\\d{3}|\\d)0(-е[ \u00A0])' + '(?=г\\.?[ \u00A0]?г|год)', 'g');
        return text.replace(re, '$1$20' + settings.dash + '$40$5');
    },
    settings: {
        dash: '\u2013'
    }
};
var directSpeechRule = {
    name: 'ru/dash/directSpeech',
    handler: function(text) {
        var dashes = getData('common/dash');
        var re1 = new RegExp("([\"\u00BB\u2018\u201C,])[ |\u00A0]?(".concat(dashes, ")[ |\u00A0]"), 'g');
        var re2 = new RegExp("(^|".concat(privateLabel, ")(").concat(dashes, ")( |\u00A0)"), 'gm');
        var re3 = new RegExp("([.\u2026?!])[ \u00A0](".concat(dashes, ")[ \u00A0]"), 'g');
        return text.replace(re1, '$1\u00A0\u2014 ').replace(re2, '$1\u2014\u00A0').replace(re3, '$1 \u2014\u00A0');
    }
};
var izpodRule = {
    name: 'ru/dash/izpod',
    handler: function(text) {
        var re = new RegExp(getData('ru/dashBefore') + '(И|и)з под' + getData('ru/dashAfter'), 'g');
        return text.replace(re, '$1$2з-под');
    }
};
var izzaRule = {
    name: 'ru/dash/izza',
    handler: function(text) {
        var re = new RegExp(getData('ru/dashBefore') + '(И|и)з за' + getData('ru/dashAfter'), 'g');
        return text.replace(re, '$1$2з-за');
    }
};
var kaRule = {
    name: 'ru/dash/ka',
    handler: function(text) {
        var re = new RegExp('([a-яё]+) ка(сь)?' + getData('ru/dashAfter'), 'g');
        return text.replace(re, '$1-ка$2');
    }
};
var koeRule = {
    name: 'ru/dash/koe',
    handler: function(text) {
        var re = new RegExp(getData('ru/dashBefore') + '([Кк]о[ей])\\s([а-яё]{3,})' + getData('ru/dashAfter'), 'g');
        return text.replace(re, '$1$2-$3');
    }
};
var mainRule = {
    name: 'ru/dash/main',
    index: '-5',
    handler: function(text) {
        var dashes = getData('common/dash');
        var re = new RegExp('([ \u00A0])(' + dashes + ')([ \u00A0\\n])', 'g');
        return text.replace(re, '\u00A0\u2014$3');
    }
};
var monthRule = {
    name: 'ru/dash/month',
    handler: function(text, settings) {
        var months = '(' + getData('ru/month') + ')';
        var monthsPre = '(' + getData('ru/monthPreCase') + ')';
        var dashes = getData('common/dash');
        var re = new RegExp(months + ' ?(' + dashes + ') ?' + months, 'gi');
        var rePre = new RegExp(monthsPre + ' ?(' + dashes + ') ?' + monthsPre, 'gi');
        var newSubStr = '$1' + settings.dash + '$3';
        return text.replace(re, newSubStr).replace(rePre, newSubStr);
    },
    settings: {
        dash: '\u2013'
    }
};
var surnameRule = {
    name: 'ru/dash/surname',
    handler: function(text) {
        var re = new RegExp('([А-ЯЁ][а-яё]+)\\s-([а-яё]{1,3})(?![^а-яё]|$)', 'g');
        return text.replace(re, '$1\u00A0\u2014$2');
    }
};
var takiRule = {
    name: 'ru/dash/taki',
    handler: function(text) {
        var re = new RegExp('(верно|довольно|опять|прямо|так|вс[её]|действительно|неужели)\\s(таки)' + getData('ru/dashAfter'), 'g');
        return text.replace(re, '$1-$2');
    }
};
var timeRule = {
    name: 'ru/dash/time',
    handler: function(text, settings) {
        var re = new RegExp(getData('ru/dashBefore') + '(\\d?\\d:[0-5]\\d)' + getData('common/dash') + '(\\d?\\d:[0-5]\\d)' + getData('ru/dashAfter'), 'g');
        return text.replace(re, '$1$2' + settings.dash + '$3');
    },
    settings: {
        dash: '\u2013'
    }
};
var toRule = {
    name: 'ru/dash/to',
    handler: function(text) {
        var words = '[Оо]ткуда|[Кк]уда|[Гг]де|[Кк]огда|[Зз]ачем|[Пп]очему|[Кк]ак|[Кк]ако[ейм]|[Кк]акая|[Кк]аки[емх]|[Кк]акими|[Кк]акую|[Чч]то|[Чч]его|[Чч]е[йм]|[Чч]ьим?|[Кк]то|[Кк]ого|[Кк]ому|[Кк]ем';
        var re = new RegExp('(^|[^А-ЯЁа-яё\\w])(' + words + ')( | -|- )(то|либо|нибудь)' + getData('ru/dashAfter'), 'g');
        return text.replace(re, function($0, $1, $2, $3, $4) {
            var kakto = $2 + $3 + $4;
            // Отдельно обрабатываем в ru/dash/kakto
            if (kakto === 'как то' || kakto === 'Как то') {
                return $0;
            }
            return $1 + $2 + '-' + $4;
        });
    }
};
var kaktoRule = {
    name: 'ru/dash/kakto',
    handler: function(text) {
        var re = new RegExp('(^|[^А-ЯЁа-яё\\w])([Кк]ак) то' + getData('ru/dashAfter'), 'g');
        return text.replace(re, '$1$2-то');
    }
};
var weekdayRule$1 = {
    name: 'ru/dash/weekday',
    handler: function(text, settings) {
        var part = '(' + getData('ru/weekday') + ')';
        var re = new RegExp(part + ' ?(' + getData('common/dash') + ') ?' + part, 'gi');
        return text.replace(re, '$1' + settings.dash + '$3');
    },
    settings: {
        dash: '\u2013'
    }
};
var yearsRule$1 = {
    name: 'ru/dash/years',
    handler: function(text, settings) {
        var dashes = getData('common/dash');
        var re = new RegExp('(\\D|^)(\\d{4})[ \u00A0]?(' + dashes + ')[ \u00A0]?(\\d{4})(?=[ \u00A0]?г)', 'g');
        return text.replace(re, function($0, $1, $2, $3, $4) {
            if (parseInt($2, 10) < parseInt($4, 10)) {
                return $1 + $2 + settings.dash + $4;
            }
            return $0;
        });
    },
    settings: {
        dash: '\u2013'
    }
};
Typograf.addRules([
    centuriesRule$1,
    daysMonthRule,
    deRule,
    decadeRule,
    directSpeechRule,
    izpodRule,
    izzaRule,
    kaRule,
    koeRule,
    mainRule,
    monthRule,
    surnameRule,
    takiRule,
    timeRule,
    toRule,
    kaktoRule,
    weekdayRule$1,
    yearsRule$1
]);
var sp1 = '(-|\\.|\\/)';
var sp2 = '(-|\\/)';
var re1 = new RegExp('(^|\\D)(\\d{4})' + sp1 + '(\\d{2})' + sp1 + '(\\d{2})(\\D|$)', 'gi');
var re2 = new RegExp('(^|\\D)(\\d{2})' + sp2 + '(\\d{2})' + sp2 + '(\\d{4})(\\D|$)', 'gi');
var fromISORule = {
    name: 'ru/date/fromISO',
    handler: function(text) {
        return text.replace(re1, '$1$6.$4.$2$7').replace(re2, '$1$4.$2.$6$7');
    }
};
var weekdayRule = {
    name: 'ru/date/weekday',
    handler: function(text) {
        var space = '( |\u00A0)';
        var monthCase = getData('ru/monthGenCase');
        var weekday = getData('ru/weekday');
        var re = new RegExp('(\\d)' + space + '(' + monthCase + '),' + space + '(' + weekday + ')', 'gi');
        return text.replace(re, function(_, $1, $2, $3, $4, $5) {
            return $1 + $2 + $3.toLowerCase() + ',' + $4 + $5.toLowerCase();
        });
    }
};
Typograf.addRules([
    fromISORule,
    weekdayRule
]);
var currencyRule = {
    name: 'ru/money/currency',
    handler: function(text) {
        var currency = '([$€¥Ұ£₤₽])';
        var space = '[ \u00A0\u2009\u202F]';
        var re1 = new RegExp('(^|[\\D]{2})' + currency + ' ?(' + regExpNumber + '(' + space + '\\d{3})*)(' + space + '?(тыс\\.|млн|млрд|трлн))?', 'gm');
        var re2 = new RegExp('(^|[\\D])(' + regExpNumber + ') ?' + currency, 'gm');
        return text.replace(re1, function($0, $1, $2, $3, $4, $5, $6, $7) {
            return $1 + $3 + ($7 ? '\u00A0' + $7 : '') + '\u00A0' + $2;
        }).replace(re2, '$1$2\u00A0$4');
    },
    disabled: true
};
var rubleRule = {
    name: 'ru/money/ruble',
    handler: function(text) {
        var newSubstr = '$1\u00A0₽';
        var commonPart = '(\\d+)( |\u00A0)?(р|руб)\\.';
        var re1 = new RegExp('^' + commonPart + '$', 'g');
        var re2 = new RegExp(commonPart + '(?=[!?,:;])', 'g');
        var re3 = new RegExp(commonPart + '(?=\\s+[A-ЯЁ])', 'g');
        return text.replace(re1, newSubstr).replace(re2, newSubstr).replace(re3, newSubstr + '.');
    },
    disabled: true
};
Typograf.addRules([
    currencyRule,
    rubleRule
]);
function abbr($0, $1, $2, $3) {
    // дд.мм.гггг
    if ($2 === 'дд' && $3 === 'мм') {
        return $0;
    }
    // Являются ли сокращения ссылкой
    if ([
        'рф',
        'ру',
        'рус',
        'орг',
        'укр',
        'бг',
        'срб'
    ].indexOf($3) > -1) {
        return $0;
    }
    return $1 + $2 + '.' + '\u00A0' + $3 + '.';
}
var abbrRule = {
    name: 'ru/nbsp/abbr',
    handler: function(text) {
        var re = new RegExp("(^|\\s|".concat(privateLabel, ")([\u0430-\u044F\u0451]{1,3})\\. ?([\u0430-\u044F\u0451]{1,3})\\."), 'g');
        return text.replace(re, abbr)// Для тройных сокращений - а.е.м.
        .replace(re, abbr);
    }
};
var addrRule = {
    name: 'ru/nbsp/addr',
    handler: function(text) {
        return text.replace(/(\s|^)(дом|д\.|кв\.|под\.|п-д) *(\d+)/gi, '$1$2\u00A0$3').replace(/(\s|^)(мкр-н|мк-н|мкр\.|мкрн)\s/gi, '$1$2\u00A0') // микрорайон
        .replace(/(\s|^)(эт\.) *(-?\d+)/gi, '$1$2\u00A0$3').replace(/(\s|^)(\d+) +этаж([^а-яё]|$)/gi, '$1$2\u00A0этаж$3').replace(/(\s|^)литер\s([А-Я]|$)/gi, '$1литер\u00A0$2')/*
                область, край, станция, поселок, село,
                деревня, улица, переулок, проезд, проспект,
                бульвар, площадь, набережная, шоссе,
                тупик, офис, комната, участок, владение, строение, корпус
            */ .replace(/(\s|^)(обл|кр|ст|пос|с|д|ул|пер|пр|пр-т|просп|пл|бул|б-р|наб|ш|туп|оф|комн?|уч|вл|влад|стр|кор)\. *([а-яёa-z\d]+)/gi, '$1$2.\u00A0$3')// город
        .replace(/(\D[ \u00A0]|^)г\. ?([А-ЯЁ])/gm, '$1г.\u00A0$2');
    }
};
var afterNumberSignRule = {
    name: 'ru/nbsp/afterNumberSign',
    handler: function(text) {
        // \u2009 - THIN SPACE
        // \u202F - NARROW NO-BREAK SPACE
        return text.replace(/№[ \u00A0\u2009]?(\d|п\/п)/g, '№\u202F$1');
    }
};
var beforeParticleRule = {
    name: 'ru/nbsp/beforeParticle',
    index: '+5',
    handler: function(text) {
        var particles = '(ли|ль|же|ж|бы|б)';
        var re1 = new RegExp('([А-ЯЁа-яё]) ' + particles + '(?=[,;:?!"‘“»])', 'g');
        var re2 = new RegExp('([А-ЯЁа-яё])[ \u00A0]' + particles + '[ \u00A0]', 'g');
        return text.replace(re1, '$1\u00A0$2').replace(re2, '$1\u00A0$2 ');
    }
};
var centuriesRule = {
    name: 'ru/nbsp/centuries',
    handler: function(text) {
        var dashes = getData('common/dash');
        var before = '(^|\\s)([VIX]+)';
        var after = '(?=[,;:?!"‘“»]|$)';
        var re1 = new RegExp(before + '[ \u00A0]?в\\.?' + after, 'gm');
        var re2 = new RegExp(before + '(' + dashes + ')' + '([VIX]+)[ \u00A0]?в\\.?([ \u00A0]?в\\.?)?' + after, 'gm');
        return text.replace(re1, '$1$2\u00A0в.').replace(re2, '$1$2$3$4\u00A0вв.');
    }
};
var dayMonthRule = {
    name: 'ru/nbsp/dayMonth',
    handler: function(text) {
        var re = new RegExp('(\\d{1,2}) (' + getData('ru/shortMonth') + ')', 'gi');
        return text.replace(re, '$1\u00A0$2');
    }
};
var initialsRule = {
    name: 'ru/nbsp/initials',
    handler: function(text) {
        var spaces = '\u00A0\u202F '; // nbsp, thinsp
        var quote = getData('ru/quote');
        var re = new RegExp('(^|[(' + spaces + quote.left + privateLabel + '"])([А-ЯЁ])\\.[' + spaces + ']?([А-ЯЁ])\\.[' + spaces + ']?([А-ЯЁ][а-яё]+)', 'gm');
        return text.replace(re, '$1$2.\u00A0$3.\u00A0$4');
    }
};
var pow = {
    '2': '²',
    '²': '²',
    '3': '³',
    '³': '³',
    '': ''
};
var mRule = {
    name: 'ru/nbsp/m',
    index: '+5',
    handler: function(text) {
        var re = new RegExp('(^|[\\s,.\\(' + privateLabel + '])' + '(\\d+)[ \u00A0]?(мм?|см|км|дм|гм|mm?|km|cm|dm)([23²³])?([\\s\\).!?,;' + privateLabel + ']|$)', 'gm');
        return text.replace(re, function(_$0, $1, $2, $3, $4, $5) {
            return $1 + $2 + '\u00A0' + $3 + pow[$4 || ''] + ($5 === '\u00A0' ? ' ' : $5);
        });
    }
};
var mlnRule = {
    name: 'ru/nbsp/mln',
    handler: function(text) {
        return text.replace(/(\d) ?(тыс|млн|млрд|трлн)(\.|\s|$)/gi, '$1\u00a0$2$3');
    }
};
var oooRule = {
    name: 'ru/nbsp/ooo',
    handler: function(text) {
        return text.replace(/(^|[^a-яёA-ЯЁ])(ООО|ОАО|ЗАО|НИИ|ПБОЮЛ) /g, '$1$2\u00A0');
    }
};
var pageRule = {
    name: 'ru/nbsp/page',
    handler: function(text) {
        var re = new RegExp('(^|[)\\s' + privateLabel + '])' + '(стр|гл|рис|илл?|ст|п|c)\\. *(\\d+)([\\s.,?!;:]|$)', 'gim');
        return text.replace(re, '$1$2.\u00A0$3$4');
    }
};
var psRule = {
    name: 'ru/nbsp/ps',
    handler: function(text) {
        var re = new RegExp("(^|\\s|".concat(privateLabel, ")[p\u0437]\\.[ \u00A0]?([p\u0437]\\.[ \u00A0]?)?[s\u044B]\\.:? "), 'gim');
        return text.replace(re, function($0, $1, $2) {
            return $1 + ($2 ? 'P.\u00A0P.\u00A0S. ' : 'P.\u00A0S. ');
        });
    }
};
var rubleKopekRule = {
    name: 'ru/nbsp/rubleKopek',
    handler: function(text) {
        return text.replace(/(\d) ?(?=(руб|коп)\.)/g, '$1\u00A0');
    }
};
var seeRule = {
    name: 'ru/nbsp/see',
    handler: function(text) {
        var re = new RegExp("(^|\\s|".concat(privateLabel, "|\\()(\u0441\u043C|\u0438\u043C)\\.[ \u00A0]?([\u0430-\u044F\u04510-9a-z]+)([\\s.,?!]|$)"), 'gi');
        return text.replace(re, function($0, $1, $2, $3, $4) {
            return ($1 === '\u00A0' ? ' ' : $1) + $2 + '.\u00A0' + $3 + $4;
        });
    }
};
var yearRule$1 = {
    name: 'ru/nbsp/year',
    handler: function(text) {
        return text.replace(/(^|\D)(\d{4}) ?г([ ,;.\n]|$)/g, '$1$2\u00A0г$3');
    }
};
var yearsRule = {
    name: 'ru/nbsp/years',
    index: '+5',
    handler: function(text) {
        var dashes = getData('common/dash');
        var re = new RegExp('(^|\\D)(\\d{4})(' + dashes + ')(\\d{4})[ \u00A0]?г\\.?([ \u00A0]?г\\.)?(?=[,;:?!"‘“»\\s]|$)', 'gm');
        return text.replace(re, '$1$2$3$4\u00A0гг.');
    }
};
Typograf.addRules([
    abbrRule,
    addrRule,
    afterNumberSignRule,
    beforeParticleRule,
    centuriesRule,
    dayMonthRule,
    initialsRule,
    mRule,
    mlnRule,
    oooRule,
    pageRule,
    psRule,
    rubleKopekRule,
    seeRule,
    yearRule$1,
    yearsRule
]);
var commaRule$1 = {
    name: 'ru/number/comma',
    handler: function(text) {
        // \u00A0 - NO-BREAK SPACE
        // \u2009 - THIN SPACE
        // \u202F - NARROW NO-BREAK SPACE
        return text.replace(/(^|\s)(\d+)\.(\d+[\u00A0\u2009\u202F ]*?[%‰°×x])/gim, '$1$2,$3');
    }
};
var ordinalsRule = {
    name: 'ru/number/ordinals',
    handler: function(text, _settings, context) {
        var char = context.getData('char');
        var re = new RegExp('(\\d[%‰]?)-(ый|ой|ая|ое|ые|ым|ом|ых|ого|ому|ыми)(?![' + char + '])', 'g');
        return text.replace(re, function($0, $1, $2) {
            var parts = {
                'ой': 'й',
                'ый': 'й',
                'ая': 'я',
                'ое': 'е',
                'ые': 'е',
                'ым': 'м',
                'ом': 'м',
                'ых': 'х',
                'ого': 'го',
                'ому': 'му',
                'ыми': 'ми'
            };
            return $1 + '-' + parts[$2];
        });
    }
};
Typograf.addRules([
    commaRule$1,
    ordinalsRule
]);
function removeOptAlignTags(text, classNames) {
    var re = new RegExp('<span class="(' + classNames.join('|') + ')">([^]*?)</span>', 'g');
    return text.replace(re, '$2');
}
function removeOptAlignTagsFromTitle(text, classNames) {
    return text.replace(/<title>[^]*?<\/title>/i, function(text) {
        return removeOptAlignTags(text, classNames);
    });
}
var classNames$2 = [
    'typograf-oa-lbracket',
    'typograf-oa-n-lbracket',
    'typograf-oa-sp-lbracket'
];
var name$2 = 'ru/optalign/bracket';
var bracketRule = {
    name: name$2,
    handler: function(text) {
        return text.replace(/( |\u00A0)\(/g, '<span class="typograf-oa-sp-lbracket">$1</span><span class="typograf-oa-lbracket">(</span>').replace(/^\(/gm, '<span class="typograf-oa-n-lbracket">(</span>');
    },
    disabled: true,
    htmlAttrs: false
};
var innerStartBracketRule = {
    name: name$2,
    queue: 'start',
    handler: function(text) {
        return removeOptAlignTags(text, classNames$2);
    },
    htmlAttrs: false
};
var innerEndBracketRule = {
    name: name$2,
    queue: 'end',
    handler: function(text) {
        return removeOptAlignTagsFromTitle(text, classNames$2);
    },
    htmlAttrs: false
};
var classNames$1 = [
    'typograf-oa-comma',
    'typograf-oa-comma-sp'
];
var name$1 = 'ru/optalign/comma';
var commaRule = {
    name: name$1,
    handler: function(text, _settings, context) {
        var char = context.getData('char');
        var re = new RegExp('([' + char + '\\d\u0301]+), ', 'gi');
        return text.replace(re, '$1<span class="typograf-oa-comma">,</span><span class="typograf-oa-comma-sp"> </span>');
    },
    disabled: true,
    htmlAttrs: false
};
var innerStartCommaRule = {
    name: name$1,
    queue: 'start',
    handler: function(text) {
        return removeOptAlignTags(text, classNames$1);
    },
    htmlAttrs: false
};
var innerEndCommaRule = {
    name: name$1,
    queue: 'end',
    handler: function(text) {
        return removeOptAlignTagsFromTitle(text, classNames$1);
    },
    htmlAttrs: false
};
var classNames = [
    'typograf-oa-lquote',
    'typograf-oa-n-lquote',
    'typograf-oa-sp-lquote'
];
var name = 'ru/optalign/quote';
var quoteRule = {
    name: name,
    handler: function(text) {
        var quote = this.getSetting('common/punctuation/quote', 'ru');
        var lquotes = '([' + quote.left[0] + (quote.left[1] || '') + '])';
        var reNewLine = new RegExp('(^|\n\n|' + privateLabel + ')(' + lquotes + ')', 'g');
        var reInside = new RegExp('([^\n' + privateLabel + '])([ \u00A0\n])(' + lquotes + ')', 'gi');
        return text.replace(reNewLine, '$1<span class="typograf-oa-n-lquote">$2</span>').replace(reInside, '$1<span class="typograf-oa-sp-lquote">$2</span><span class="typograf-oa-lquote">$3</span>');
    },
    disabled: true,
    htmlAttrs: false
};
var innerStartQuoteRule = {
    name: name,
    queue: 'start',
    handler: function(text) {
        return removeOptAlignTags(text, classNames);
    },
    htmlAttrs: false
};
var innerEndQuoteRule = {
    name: name,
    queue: 'end',
    handler: function(text) {
        return removeOptAlignTagsFromTitle(text, classNames);
    },
    htmlAttrs: false
};
Typograf.addRules([
    bracketRule,
    commaRule,
    quoteRule
]);
Typograf.addInnerRules([
    innerStartBracketRule,
    innerEndBracketRule,
    innerStartCommaRule,
    innerEndCommaRule,
    innerStartQuoteRule,
    innerEndQuoteRule
]);
var accentRule = {
    name: 'ru/other/accent',
    handler: function(text) {
        return text.replace(/([а-яё])([АЕЁИОУЫЭЮЯ])([^А-ЯЁ\w]|$)/g, function($0, $1, $2, $3) {
            return $1 + $2.toLowerCase() + '\u0301' + $3;
        });
    },
    disabled: true
};
var defaultCityCodeLength = 5;
var countryCode = '7';
var exceptions = [];
var exceptionsMax = 8;
var exceptionsMin = 2;
[
    4162,
    416332,
    8512,
    851111,
    4722,
    4725,
    391379,
    8442,
    4732,
    4152,
    4154451,
    4154459,
    4154455,
    41544513,
    8142,
    8332,
    8612,
    8622,
    3525,
    812,
    8342,
    8152,
    3812,
    4862,
    3422,
    342633,
    8112,
    9142,
    8452,
    3432,
    3434,
    3435,
    4812,
    8432,
    8439,
    3822,
    4872,
    3412,
    3511,
    3512,
    3022,
    4112,
    4852,
    4855,
    3852,
    3854,
    8182,
    818,
    90,
    3472,
    4741,
    4764,
    4832,
    4922,
    8172,
    8202,
    8722,
    4932,
    493,
    3952,
    3951,
    3953,
    411533,
    4842,
    3842,
    3843,
    8212,
    4942,
    '39131-39179',
    '39190-39199',
    391,
    4712,
    4742,
    8362,
    495,
    499,
    4966,
    4964,
    4967,
    498,
    8312,
    8313,
    3832,
    383612,
    3532,
    8412,
    4232,
    423370,
    423630,
    8632,
    8642,
    8482,
    4242,
    8672,
    8652,
    4752,
    4822,
    482502,
    4826300,
    3452,
    8422,
    4212,
    3466,
    3462,
    8712,
    8352,
    800,
    '901-934',
    '936-939',
    '950-953',
    958,
    '960-969',
    '977-989',
    '991-997',
    999
].forEach(function(num) {
    if (typeof num === 'string') {
        var buf = num.split('-');
        for(var i = +buf[0]; i <= +buf[1]; i++){
            exceptions.push(i);
        }
    } else {
        exceptions.push(num);
    }
});
function phone(num) {
    var firstSym = num[0];
    var cityCode = '';
    var hasPlusWithCode;
    var hasEight;
    if (num.length < 8) {
        return phoneBlocks(num);
    }
    // 8 495 123-45-67, +7 495 123-45-67
    if (num.length > 10) {
        if (firstSym === '+') {
            if (num[1] === countryCode) {
                hasPlusWithCode = true;
                num = num.substr(2);
            } else {
                return num;
            }
        } else if (firstSym === '8') {
            hasEight = true;
            num = num.substr(1);
        }
    }
    for(var cityCodeLen = exceptionsMax; cityCodeLen >= exceptionsMin; cityCodeLen--){
        var code = +num.substr(0, cityCodeLen);
        if (exceptions.indexOf(code) > -1) {
            cityCode = num.substr(0, cityCodeLen);
            num = num.substr(cityCodeLen);
            break;
        }
    }
    if (!cityCode) {
        cityCode = num.substr(0, defaultCityCodeLength);
        num = num.substr(defaultCityCodeLength);
    }
    return (hasPlusWithCode ? '+' + countryCode + '\u00A0' : '') + (hasEight ? '8\u00A0' : '') + prepareCode(cityCode) + '\u00A0' + phoneBlocks(num);
}
function prepareCode(code) {
    var numCode = +code;
    var len = code.length;
    var result = [
        code
    ];
    var withoutBrackets = false;
    if (len > 3) {
        switch(len){
            case 4:
                result = [
                    code.substr(0, 2),
                    code.substr(2, 2)
                ];
                break;
            case 5:
                result = [
                    code.substr(0, 3),
                    code.substr(3, 3)
                ];
                break;
            case 6:
                result = [
                    code.substr(0, 2),
                    code.substr(2, 2),
                    code.substr(4, 2)
                ];
                break;
        }
    } else {
        // Мобильные и московские номера без скобок
        withoutBrackets = numCode > 900 && numCode <= 999 || numCode === 495 || numCode === 499 || numCode === 800;
    }
    var str = result.join('-');
    return withoutBrackets ? str : '(' + str + ')';
}
function phoneBlocks(num) {
    var add = '';
    if (num.length % 2) {
        add = num[0];
        add += num.length <= 5 ? '-' : '';
        num = num.substr(1, num.length - 1);
    }
    return add + num.split(/(?=(?:\d\d)+$)/).join('-');
}
function clearPhone(text) {
    return text.replace(/[^\d+]/g, '');
}
var phoneNumberRule = {
    name: 'ru/other/phone-number',
    live: false,
    handler: function(text) {
        var re = new RegExp('(^|,| |' + privateLabel + ')(\\+7[\\d\\(\\) \u00A0-]{10,18})(?=,|;|' + privateLabel + '|$)', 'gm');
        return text.replace(re, function($0, $1, $2) {
            var buf = clearPhone($2);
            return buf.length === 12 ? $1 + phone(buf) : $0;
        }).replace(// eslint-disable-next-line no-misleading-character-class
        /(^|[^а-яё])([☎☏✆📠📞📱]|т\.|тел\.|ф\.|моб\.|факс|сотовый|мобильный|телефон)(:?\s*?)([+\d(][\d \u00A0\-()]{3,}\d)/gi, function($0, $1, $2, $3, $4) {
            var buf = clearPhone($4);
            if (buf.length >= 5) {
                return $1 + $2 + $3 + phone(buf);
            }
            return $0;
        });
    }
};
Typograf.addRules([
    accentRule,
    phoneNumberRule
]);
var anoRule = {
    name: 'ru/punctuation/ano',
    handler: function(text) {
        var re = new RegExp('([^«„[(!?,:;\\-‒–—\\s' + privateLabel + '])(\\s+)(а|но)(?= |\u00A0|\\n)', 'g');
        return text.replace(re, '$1,$2$3');
    }
};
var exclamationRule = {
    name: 'ru/punctuation/exclamation',
    handler: function(text) {
        return text.replace(/(^|[^!])!{2}($|[^!])/gm, '$1!$2').replace(/(^|[^!])!{4}($|[^!])/gm, '$1!!!$2');
    },
    live: false
};
var exclamationQuestionRule = {
    name: 'ru/punctuation/exclamationQuestion',
    index: '+5',
    handler: function(text) {
        var re = new RegExp('(^|[^!])!\\?([^?]|$)', 'g');
        return text.replace(re, '$1?!$2');
    }
};
var hellipQuestionRule = {
    name: 'ru/punctuation/hellipQuestion',
    handler: function(text) {
        return text.replace(/(^|[^.])(\.\.\.|…),/g, '$1…').replace(/(!|\?)(\.\.\.|…)(?=[^.]|$)/g, '$1..');
    }
};
Typograf.addRules([
    anoRule,
    exclamationRule,
    exclamationQuestionRule,
    hellipQuestionRule
]);
var afterHellipRule = {
    name: 'ru/space/afterHellip',
    handler: function(text) {
        return text.replace(/([а-яё])(\.\.\.|…)([А-ЯЁ])/g, '$1$2 $3').replace(/([?!]\.\.)([а-яёa-z])/gi, '$1 $2');
    }
};
var yearRule = {
    name: 'ru/space/year',
    handler: function(text, _settings, context) {
        var char = context.getData('char');
        var re = new RegExp('(^| |\u00A0)(\\d{3,4})(год([ауе]|ом)?)([^' + char + ']|$)', 'g');
        return text.replace(re, '$1$2 $3$5');
    }
};
Typograf.addRules([
    afterHellipRule,
    yearRule
]);
var nnRule = {
    name: 'ru/symbols/NN',
    handler: function(text) {
        return text.replace(/№№/g, '№');
    }
};
Typograf.addRules([
    nnRule
]);
var replacements = {
    A: 'А',
    a: 'а',
    B: 'В',
    E: 'Е',
    e: 'е',
    K: 'К',
    M: 'М',
    H: 'Н',
    O: 'О',
    o: 'о',
    P: 'Р',
    p: 'р',
    C: 'С',
    c: 'с',
    T: 'Т',
    y: 'у',
    X: 'Х',
    x: 'х'
};
var keys = Object.keys(replacements).join('');
var switchingKeyboardLayoutRule = {
    name: 'ru/typo/switchingKeyboardLayout',
    handler: function(text) {
        var re = new RegExp('([' + keys + ']{1,3})(?=[А-ЯЁа-яё]+?)', 'g');
        return text.replace(re, function(str, $1) {
            var result = '';
            for(var i = 0; i < $1.length; i++){
                result += replacements[$1[i]];
            }
            return result;
        });
    }
};
Typograf.addRules([
    switchingKeyboardLayoutRule
]);
;
}),
]);

//# sourceMappingURL=28825_dc210fdc._.js.map