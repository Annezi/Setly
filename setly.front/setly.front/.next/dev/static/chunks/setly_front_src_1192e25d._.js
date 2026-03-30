(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/setly.front/src/app/components/atomic/atoms/profile-photo/profile-photo.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "avatarImage": "profile-photo-module__FanyTa__avatarImage",
  "avatarImageError": "profile-photo-module__FanyTa__avatarImageError",
  "demo": "profile-photo-module__FanyTa__demo",
  "hoverCircle": "profile-photo-module__FanyTa__hoverCircle",
  "hoverOverlay": "profile-photo-module__FanyTa__hoverOverlay",
  "hoverOverlayShade": "profile-photo-module__FanyTa__hoverOverlayShade",
  "iconUser": "profile-photo-module__FanyTa__iconUser",
  "profilePhoto": "profile-photo-module__FanyTa__profilePhoto",
});
}),
"[project]/setly.front/src/app/components/atomic/atoms/profile-photo/profile-photo.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProfilePhotoDemo",
    ()=>ProfilePhotoDemo,
    "default",
    ()=>ProfilePhoto
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$profile$2d$photo$2f$profile$2d$photo$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/atomic/atoms/profile-photo/profile-photo.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function ProfilePhoto(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(43);
    if ($[0] !== "31955393e6a29ecac71706410d25d962830fe508e1ada634bd45d47b9a4ab01d") {
        for(let $i = 0; $i < 43; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "31955393e6a29ecac71706410d25d962830fe508e1ada634bd45d47b9a4ab01d";
    }
    let className;
    let href;
    let onClick;
    let props;
    let size;
    let src;
    let t1;
    if ($[1] !== t0) {
        ({ src, onClick, className, href, hideUploadOnHover: t1, size, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = href;
        $[4] = onClick;
        $[5] = props;
        $[6] = size;
        $[7] = src;
        $[8] = t1;
    } else {
        className = $[2];
        href = $[3];
        onClick = $[4];
        props = $[5];
        size = $[6];
        src = $[7];
        t1 = $[8];
    }
    const hideUploadOnHover = t1 === undefined ? false : t1;
    let t2;
    if ($[9] !== src) {
        t2 = src && src.trim();
        $[9] = src;
        $[10] = t2;
    } else {
        t2 = $[10];
    }
    const showImage = Boolean(t2);
    const [imageError, setImageError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t3;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = ({
            "ProfilePhoto[useEffect()]": ()=>{
                setImageError(false);
            }
        })["ProfilePhoto[useEffect()]"];
        $[11] = t3;
    } else {
        t3 = $[11];
    }
    let t4;
    if ($[12] !== src) {
        t4 = [
            src
        ];
        $[12] = src;
        $[13] = t4;
    } else {
        t4 = $[13];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t3, t4);
    let t5;
    if ($[14] !== size) {
        t5 = size != null ? {
            width: size,
            height: size,
            minWidth: size,
            minHeight: size
        } : undefined;
        $[14] = size;
        $[15] = t5;
    } else {
        t5 = $[15];
    }
    const sizeStyle = t5;
    const iconSize = size === 44 ? 22 : size != null ? Math.min(size, 40) : 40;
    let t6;
    if ($[16] !== iconSize) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$profile$2d$photo$2f$profile$2d$photo$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].iconUser,
            "aria-hidden": true,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: "/icons/images/User.svg",
                alt: "",
                width: iconSize,
                height: iconSize
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/components/atomic/atoms/profile-photo/profile-photo.jsx",
                lineNumber: 97,
                columnNumber: 63
            }, this)
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/profile-photo/profile-photo.jsx",
            lineNumber: 97,
            columnNumber: 10
        }, this);
        $[16] = iconSize;
        $[17] = t6;
    } else {
        t6 = $[17];
    }
    let t7;
    if ($[18] !== imageError || $[19] !== showImage || $[20] !== src) {
        t7 = showImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: src,
            alt: "",
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$profile$2d$photo$2f$profile$2d$photo$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].avatarImage} ${imageError ? __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$profile$2d$photo$2f$profile$2d$photo$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].avatarImageError : ""}`,
            onError: {
                "ProfilePhoto[<img>.onError]": ()=>setImageError(true)
            }["ProfilePhoto[<img>.onError]"]
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/profile-photo/profile-photo.jsx",
            lineNumber: 105,
            columnNumber: 23
        }, this);
        $[18] = imageError;
        $[19] = showImage;
        $[20] = src;
        $[21] = t7;
    } else {
        t7 = $[21];
    }
    const t8 = `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$profile$2d$photo$2f$profile$2d$photo$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hoverOverlay} ${hideUploadOnHover ? __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$profile$2d$photo$2f$profile$2d$photo$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hoverOverlayShade : ""}`;
    let t9;
    if ($[22] !== hideUploadOnHover) {
        t9 = hideUploadOnHover ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$profile$2d$photo$2f$profile$2d$photo$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hoverCircle,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: "/icons/system/Download.svg",
                alt: "",
                width: 20,
                height: 20
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/components/atomic/atoms/profile-photo/profile-photo.jsx",
                lineNumber: 118,
                columnNumber: 74
            }, this)
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/profile-photo/profile-photo.jsx",
            lineNumber: 118,
            columnNumber: 37
        }, this);
        $[22] = hideUploadOnHover;
        $[23] = t9;
    } else {
        t9 = $[23];
    }
    let t10;
    if ($[24] !== t8 || $[25] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t8,
            "aria-hidden": true,
            children: t9
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/profile-photo/profile-photo.jsx",
            lineNumber: 126,
            columnNumber: 11
        }, this);
        $[24] = t8;
        $[25] = t9;
        $[26] = t10;
    } else {
        t10 = $[26];
    }
    let t11;
    if ($[27] !== t10 || $[28] !== t6 || $[29] !== t7) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                t6,
                t7,
                t10
            ]
        }, void 0, true);
        $[27] = t10;
        $[28] = t6;
        $[29] = t7;
        $[30] = t11;
    } else {
        t11 = $[30];
    }
    const content = t11;
    const t12 = `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$profile$2d$photo$2f$profile$2d$photo$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].profilePhoto} ${className ?? ""}`;
    let t13;
    if ($[31] !== props || $[32] !== sizeStyle || $[33] !== t12) {
        t13 = {
            className: t12,
            style: sizeStyle,
            ...props
        };
        $[31] = props;
        $[32] = sizeStyle;
        $[33] = t12;
        $[34] = t13;
    } else {
        t13 = $[34];
    }
    const commonProps = t13;
    if (href) {
        let t14;
        if ($[35] !== commonProps || $[36] !== content || $[37] !== href) {
            t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: href,
                "aria-label": "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442",
                ...commonProps,
                children: content
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/components/atomic/atoms/profile-photo/profile-photo.jsx",
                lineNumber: 163,
                columnNumber: 13
            }, this);
            $[35] = commonProps;
            $[36] = content;
            $[37] = href;
            $[38] = t14;
        } else {
            t14 = $[38];
        }
        return t14;
    }
    let t14;
    if ($[39] !== commonProps || $[40] !== content || $[41] !== onClick) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            "aria-label": "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u043E\u0442\u043E \u043F\u0440\u043E\u0444\u0438\u043B\u044F",
            onClick: onClick,
            ...commonProps,
            children: content
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/profile-photo/profile-photo.jsx",
            lineNumber: 175,
            columnNumber: 11
        }, this);
        $[39] = commonProps;
        $[40] = content;
        $[41] = onClick;
        $[42] = t14;
    } else {
        t14 = $[42];
    }
    return t14;
}
_s(ProfilePhoto, "9yytG7wJCq2zUQIvkzJ8ZWMDkBs=");
_c = ProfilePhoto;
function ProfilePhotoDemo() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "31955393e6a29ecac71706410d25d962830fe508e1ada634bd45d47b9a4ab01d") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "31955393e6a29ecac71706410d25d962830fe508e1ada634bd45d47b9a4ab01d";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$profile$2d$photo$2f$profile$2d$photo$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].demo,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfilePhoto, {
                onClick: _ProfilePhotoDemoProfilePhotoOnClick
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/components/atomic/atoms/profile-photo/profile-photo.jsx",
                lineNumber: 195,
                columnNumber: 39
            }, this)
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/profile-photo/profile-photo.jsx",
            lineNumber: 195,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return t0;
}
_c1 = ProfilePhotoDemo;
function _ProfilePhotoDemoProfilePhotoOnClick() {
    return console.log("Profile photo click");
}
var _c, _c1;
__turbopack_context__.k.register(_c, "ProfilePhoto");
__turbopack_context__.k.register(_c1, "ProfilePhotoDemo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "button": "buttons-module__tfq3Qq__button",
  "button--blue": "buttons-module__tfq3Qq__button--blue",
  "button--danger": "buttons-module__tfq3Qq__button--danger",
  "button--dangerFilled": "buttons-module__tfq3Qq__button--dangerFilled",
  "button--gradient": "buttons-module__tfq3Qq__button--gradient",
  "button--icon": "buttons-module__tfq3Qq__button--icon",
  "button--inactive": "buttons-module__tfq3Qq__button--inactive",
  "button--large": "buttons-module__tfq3Qq__button--large",
  "button--outline": "buttons-module__tfq3Qq__button--outline",
  "button--small": "buttons-module__tfq3Qq__button--small",
  "button--white": "buttons-module__tfq3Qq__button--white",
  "icon": "buttons-module__tfq3Qq__icon",
  "subinfo": "buttons-module__tfq3Qq__subinfo",
});
}),
"[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ButtonsDemo",
    ()=>ButtonsDemo,
    "default",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2f$buttons$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function Button(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(22);
    if ($[0] !== "a3d19508507631cfae836ecfebc3ccaa35ce096ef16f21c49ee18b0ce6d5ebf2") {
        for(let $i = 0; $i < 22; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a3d19508507631cfae836ecfebc3ccaa35ce096ef16f21c49ee18b0ce6d5ebf2";
    }
    let Text;
    let hoverIcon;
    let icon;
    let props;
    let t1;
    let t2;
    if ($[1] !== t0) {
        ({ color: t1, size: t2, icon, hoverIcon, Text, ...props } = t0);
        $[1] = t0;
        $[2] = Text;
        $[3] = hoverIcon;
        $[4] = icon;
        $[5] = props;
        $[6] = t1;
        $[7] = t2;
    } else {
        Text = $[2];
        hoverIcon = $[3];
        icon = $[4];
        props = $[5];
        t1 = $[6];
        t2 = $[7];
    }
    const color = t1 === undefined ? "white" : t1;
    const size = t2 === undefined ? "" : t2;
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const t3 = `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2f$buttons$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].button} ${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2f$buttons$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"][`button--${color}`]} ${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2f$buttons$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"][`button--${size}`]}`;
    let t4;
    let t5;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = ({
            "Button[<button>.onMouseEnter]": ()=>setIsHovered(true)
        })["Button[<button>.onMouseEnter]"];
        t5 = ({
            "Button[<button>.onMouseLeave]": ()=>setIsHovered(false)
        })["Button[<button>.onMouseLeave]"];
        $[8] = t4;
        $[9] = t5;
    } else {
        t4 = $[8];
        t5 = $[9];
    }
    let t6;
    if ($[10] !== hoverIcon || $[11] !== icon || $[12] !== isHovered) {
        t6 = icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2f$buttons$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].icon,
            children: hoverIcon && isHovered ? hoverIcon : icon
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
            lineNumber: 65,
            columnNumber: 18
        }, this);
        $[10] = hoverIcon;
        $[11] = icon;
        $[12] = isHovered;
        $[13] = t6;
    } else {
        t6 = $[13];
    }
    let t7;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = {
            zIndex: 5,
            position: "relative"
        };
        $[14] = t7;
    } else {
        t7 = $[14];
    }
    let t8;
    if ($[15] !== Text) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2f$buttons$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subinfo,
            style: t7,
            children: Text
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
            lineNumber: 85,
            columnNumber: 10
        }, this);
        $[15] = Text;
        $[16] = t8;
    } else {
        t8 = $[16];
    }
    let t9;
    if ($[17] !== props || $[18] !== t3 || $[19] !== t6 || $[20] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: t3,
            onMouseEnter: t4,
            onMouseLeave: t5,
            ...props,
            children: [
                t6,
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
            lineNumber: 93,
            columnNumber: 10
        }, this);
        $[17] = props;
        $[18] = t3;
        $[19] = t6;
        $[20] = t8;
        $[21] = t9;
    } else {
        t9 = $[21];
    }
    return t9;
}
_s(Button, "FPQn8a98tPjpohC7NUYORQR8GJE=");
_c = Button;
function ButtonsDemo() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(21);
    if ($[0] !== "a3d19508507631cfae836ecfebc3ccaa35ce096ef16f21c49ee18b0ce6d5ebf2") {
        for(let $i = 0; $i < 21; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a3d19508507631cfae836ecfebc3ccaa35ce096ef16f21c49ee18b0ce6d5ebf2";
    }
    let t0;
    let t1;
    let t2;
    let t3;
    let t4;
    let t5;
    let t6;
    let t7;
    let t8;
    let t9;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
            Text: "Button",
            color: "white"
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
            lineNumber: 123,
            columnNumber: 10
        }, this);
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
            Text: "Button",
            color: "blue"
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
            lineNumber: 124,
            columnNumber: 10
        }, this);
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
            Text: "Button",
            color: "inactive",
            disabled: true
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
            lineNumber: 125,
            columnNumber: 10
        }, this);
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
            Text: "Button",
            color: "outline"
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
            lineNumber: 126,
            columnNumber: 10
        }, this);
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
            Text: "Button",
            color: "dangerFilled"
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
            lineNumber: 127,
            columnNumber: 10
        }, this);
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
            Text: "Button",
            color: "white",
            size: "small"
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
            lineNumber: 128,
            columnNumber: 10
        }, this);
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
            Text: "Button",
            color: "blue",
            size: "small"
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
            lineNumber: 129,
            columnNumber: 10
        }, this);
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
            Text: "Button",
            color: "inactive",
            disabled: true,
            size: "small"
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
            lineNumber: 130,
            columnNumber: 10
        }, this);
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
            Text: "Button",
            color: "outline",
            size: "small"
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
            lineNumber: 131,
            columnNumber: 10
        }, this);
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
            Text: "Button",
            color: "dangerFilled",
            size: "small"
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
            lineNumber: 132,
            columnNumber: 10
        }, this);
        $[1] = t0;
        $[2] = t1;
        $[3] = t2;
        $[4] = t3;
        $[5] = t4;
        $[6] = t5;
        $[7] = t6;
        $[8] = t7;
        $[9] = t8;
        $[10] = t9;
    } else {
        t0 = $[1];
        t1 = $[2];
        t2 = $[3];
        t3 = $[4];
        t4 = $[5];
        t5 = $[6];
        t6 = $[7];
        t7 = $[8];
        t8 = $[9];
        t9 = $[10];
    }
    let t10;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
            Text: "Button",
            color: "white",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: "/icons/system/TG.svg",
                alt: "",
                width: 16,
                height: 16
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
                lineNumber: 157,
                columnNumber: 53
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
            lineNumber: 157,
            columnNumber: 11
        }, this);
        $[11] = t10;
    } else {
        t10 = $[11];
    }
    let t11;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
            Text: "Button",
            color: "blue",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: "/icons/system/Search.svg",
                alt: "",
                width: 16,
                height: 16
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
                lineNumber: 164,
                columnNumber: 52
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
            lineNumber: 164,
            columnNumber: 11
        }, this);
        $[12] = t11;
    } else {
        t11 = $[12];
    }
    let t12;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
            Text: "Button",
            color: "inactive",
            disabled: true,
            style: {
                visibility: "hidden"
            }
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
            lineNumber: 171,
            columnNumber: 11
        }, this);
        $[13] = t12;
    } else {
        t12 = $[13];
    }
    let t13;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
            Text: "Button",
            color: "outline",
            style: {
                visibility: "hidden"
            }
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
            lineNumber: 180,
            columnNumber: 11
        }, this);
        $[14] = t13;
    } else {
        t13 = $[14];
    }
    let t14;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
            Text: "Button",
            color: "dangerFilled",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: "/icons/system/Trash-red.svg",
                alt: "",
                width: 16,
                height: 16
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
                lineNumber: 189,
                columnNumber: 60
            }, void 0),
            hoverIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: "/icons/system/Trash-white.svg",
                alt: "",
                width: 16,
                height: 16
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
                lineNumber: 189,
                columnNumber: 144
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
            lineNumber: 189,
            columnNumber: 11
        }, this);
        $[15] = t14;
    } else {
        t14 = $[15];
    }
    let t15;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
            Text: "Button",
            color: "white",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: "/icons/system/TG.svg",
                alt: "",
                width: 16,
                height: 16
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
                lineNumber: 196,
                columnNumber: 53
            }, void 0),
            size: "small"
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
            lineNumber: 196,
            columnNumber: 11
        }, this);
        $[16] = t15;
    } else {
        t15 = $[16];
    }
    let t16;
    if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
            Text: "Button",
            color: "blue",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: "/icons/system/Search.svg",
                alt: "",
                width: 16,
                height: 16
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
                lineNumber: 203,
                columnNumber: 52
            }, void 0),
            size: "small"
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
            lineNumber: 203,
            columnNumber: 11
        }, this);
        $[17] = t16;
    } else {
        t16 = $[17];
    }
    let t17;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
            Text: "Button",
            color: "inactive",
            disabled: true,
            style: {
                visibility: "hidden"
            }
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
            lineNumber: 210,
            columnNumber: 11
        }, this);
        $[18] = t17;
    } else {
        t17 = $[18];
    }
    let t18;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
            Text: "Button",
            color: "outline",
            style: {
                visibility: "hidden"
            }
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
            lineNumber: 219,
            columnNumber: 11
        }, this);
        $[19] = t18;
    } else {
        t18 = $[19];
    }
    let t19;
    if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ButtonShowcase",
            children: [
                t0,
                t1,
                t2,
                t3,
                t4,
                t5,
                t6,
                t7,
                t8,
                t9,
                t10,
                t11,
                t12,
                t13,
                t14,
                t15,
                t16,
                t17,
                t18,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                    Text: "Button",
                    color: "dangerFilled",
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: "/icons/system/Trash-red.svg",
                        alt: "",
                        width: 16,
                        height: 16
                    }, void 0, false, {
                        fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
                        lineNumber: 228,
                        columnNumber: 177
                    }, void 0),
                    hoverIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: "/icons/system/Trash-white.svg",
                        alt: "",
                        width: 16,
                        height: 16
                    }, void 0, false, {
                        fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
                        lineNumber: 228,
                        columnNumber: 261
                    }, void 0),
                    size: "small"
                }, void 0, false, {
                    fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
                    lineNumber: 228,
                    columnNumber: 128
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx",
            lineNumber: 228,
            columnNumber: 11
        }, this);
        $[20] = t19;
    } else {
        t19 = $[20];
    }
    return t19;
}
_c1 = ButtonsDemo;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button");
__turbopack_context__.k.register(_c1, "ButtonsDemo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/setly.front/src/app/components/globals/header/header.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "accountDropdownMenu": "header-module__uYjR_a__accountDropdownMenu",
  "accountDropdownMenuItem": "header-module__uYjR_a__accountDropdownMenuItem",
  "accountDropdownMenuPortal": "header-module__uYjR_a__accountDropdownMenuPortal",
  "accountMenuWrap": "header-module__uYjR_a__accountMenuWrap",
  "container": "header-module__uYjR_a__container",
  "headerAuthButton": "header-module__uYjR_a__headerAuthButton",
  "headerAuthButtonText": "header-module__uYjR_a__headerAuthButtonText",
  "headerDesktopAuth": "header-module__uYjR_a__headerDesktopAuth",
  "headerNav": "header-module__uYjR_a__headerNav",
  "headerNavButton": "header-module__uYjR_a__headerNavButton",
  "headerNavItem": "header-module__uYjR_a__headerNavItem",
  "headerNavLabel": "header-module__uYjR_a__headerNavLabel",
  "headerNavList": "header-module__uYjR_a__headerNavList",
  "headerProfileButton": "header-module__uYjR_a__headerProfileButton",
  "headerProfilePhoto": "header-module__uYjR_a__headerProfilePhoto",
  "isOpen": "header-module__uYjR_a__isOpen",
  "logoDesktop": "header-module__uYjR_a__logoDesktop",
  "logoLink": "header-module__uYjR_a__logoLink",
  "logoMobile": "header-module__uYjR_a__logoMobile",
  "logoutPopupBox": "header-module__uYjR_a__logoutPopupBox",
  "logoutPopupButtons": "header-module__uYjR_a__logoutPopupButtons",
  "logoutPopupOverlay": "header-module__uYjR_a__logoutPopupOverlay",
  "logoutPopupText": "header-module__uYjR_a__logoutPopupText",
  "mobileMenuTrigger": "header-module__uYjR_a__mobileMenuTrigger",
  "navWrap": "header-module__uYjR_a__navWrap",
  "navWrapUnauth": "header-module__uYjR_a__navWrapUnauth",
  "overlay": "header-module__uYjR_a__overlay",
  "rightSlot": "header-module__uYjR_a__rightSlot",
  "sidePanel": "header-module__uYjR_a__sidePanel",
  "sidePanelContent": "header-module__uYjR_a__sidePanelContent",
  "sidePanelCopyright": "header-module__uYjR_a__sidePanelCopyright",
  "sidePanelFooter": "header-module__uYjR_a__sidePanelFooter",
  "sidePanelFooterBottom": "header-module__uYjR_a__sidePanelFooterBottom",
  "sidePanelFooterLinks": "header-module__uYjR_a__sidePanelFooterLinks",
  "sidePanelHeader": "header-module__uYjR_a__sidePanelHeader",
  "sidePanelLoginButton": "header-module__uYjR_a__sidePanelLoginButton",
  "sidePanelLoginWrap": "header-module__uYjR_a__sidePanelLoginWrap",
  "sidePanelNav": "header-module__uYjR_a__sidePanelNav",
  "sidePanelNavInner": "header-module__uYjR_a__sidePanelNavInner",
  "sidePanelNavItem": "header-module__uYjR_a__sidePanelNavItem",
  "sidePanelNavLink": "header-module__uYjR_a__sidePanelNavLink",
  "sidePanelNavList": "header-module__uYjR_a__sidePanelNavList",
  "sidePanelSlogan": "header-module__uYjR_a__sidePanelSlogan",
  "subinfo": "header-module__uYjR_a__subinfo",
  "wrapper": "header-module__uYjR_a__wrapper",
});
}),
"[project]/setly.front/src/app/components/globals/header/Header.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$profile$2d$photo$2f$profile$2d$photo$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/atomic/atoms/profile-photo/profile-photo.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2f$buttons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$auth$2d$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/lib/auth-storage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/globals/header/header.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
const NAV_ITEMS = [
    {
        id: 'check-plans',
        label: 'Чек-планы',
        href: '/check-plans'
    },
    {
        id: 'articles',
        label: 'Статьи',
        href: '/articles'
    },
    {
        id: 'tests',
        label: 'Тесты',
        href: '/tests'
    },
    {
        id: 'about',
        label: 'О нас',
        href: '/about'
    }
];
const isAccountPage = (path)=>path === '/account';
function Header(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(79);
    if ($[0] !== "8aa896bed8c508218c61c879243447b86fb1ad37f5324cd9282e35a55ef083e3") {
        for(let $i = 0; $i < 79; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "8aa896bed8c508218c61c879243447b86fb1ad37f5324cd9282e35a55ef083e3";
    }
    const { isLoggedIn: isLoggedInProp, user: userProp, hideNavigation: t1 } = t0;
    const hideNavigation = t1 === undefined ? false : t1;
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [storageAuth, setStorageAuth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [accountMenuOpen, setAccountMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [logoutPopupOpen, setLogoutPopupOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t2;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            top: 0,
            left: 0
        };
        $[1] = t2;
    } else {
        t2 = $[1];
    }
    const [accountMenuPosition, setAccountMenuPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t2);
    const accountMenuWrapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    let t3;
    if ($[2] !== pathname) {
        t3 = isAccountPage(pathname);
        $[2] = pathname;
        $[3] = t3;
    } else {
        t3 = $[3];
    }
    const onAccountPage = t3;
    let t4;
    let t5;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = ({
            "Header[useEffect()]": ()=>setMounted(true)
        })["Header[useEffect()]"];
        t5 = [];
        $[4] = t4;
        $[5] = t5;
    } else {
        t4 = $[4];
        t5 = $[5];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t4, t5);
    let t6;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = ({
            "Header[useEffect()]": ()=>{
                setStorageAuth((0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$auth$2d$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuth"])());
            }
        })["Header[useEffect()]"];
        $[6] = t6;
    } else {
        t6 = $[6];
    }
    let t7;
    if ($[7] !== pathname) {
        t7 = [
            pathname
        ];
        $[7] = pathname;
        $[8] = t7;
    } else {
        t7 = $[8];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t6, t7);
    let t8;
    let t9;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = ({
            "Header[useEffect()]": ()=>{
                const onAuthUpdate = {
                    "Header[useEffect() > onAuthUpdate]": ()=>setStorageAuth((0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$auth$2d$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuth"])())
                }["Header[useEffect() > onAuthUpdate]"];
                window.addEventListener("setly:auth-update", onAuthUpdate);
                return ()=>window.removeEventListener("setly:auth-update", onAuthUpdate);
            }
        })["Header[useEffect()]"];
        t9 = [];
        $[9] = t8;
        $[10] = t9;
    } else {
        t8 = $[9];
        t9 = $[10];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t8, t9);
    const isLoggedIn = isLoggedInProp ?? Boolean(storageAuth?.user);
    const user = userProp ?? storageAuth?.user ?? null;
    let t10;
    if ($[11] !== pathname) {
        t10 = NAV_ITEMS.find({
            "Header[NAV_ITEMS.find()]": (item)=>item.href && (pathname === item.href || pathname.startsWith(item.href + "/"))
        }["Header[NAV_ITEMS.find()]"])?.id ?? null;
        $[11] = pathname;
        $[12] = t10;
    } else {
        t10 = $[12];
    }
    const activeNavId = t10;
    let t11;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = ({
            "Header[closeMobileMenu]": ()=>setMobileMenuOpen(false)
        })["Header[closeMobileMenu]"];
        $[13] = t11;
    } else {
        t11 = $[13];
    }
    const closeMobileMenu = t11;
    let t12;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = ({
            "Header[toggleMobileMenu]": ()=>setMobileMenuOpen(_HeaderToggleMobileMenuSetMobileMenuOpen)
        })["Header[toggleMobileMenu]"];
        $[14] = t12;
    } else {
        t12 = $[14];
    }
    const toggleMobileMenu = t12;
    let t13;
    if ($[15] !== router) {
        t13 = ({
            "Header[handleLoginClick]": ()=>{
                closeMobileMenu();
                router.push("/login");
            }
        })["Header[handleLoginClick]"];
        $[15] = router;
        $[16] = t13;
    } else {
        t13 = $[16];
    }
    const handleLoginClick = t13;
    let t14;
    if ($[17] !== router) {
        t14 = ({
            "Header[handleProfileClick]": ()=>{
                closeMobileMenu();
                router.push("/account");
            }
        })["Header[handleProfileClick]"];
        $[17] = router;
        $[18] = t14;
    } else {
        t14 = $[18];
    }
    const handleProfileClick = t14;
    let t15;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = ({
            "Header[updateAccountMenuPosition]": ()=>{
                const el = accountMenuWrapRef.current;
                if (el) {
                    const rect = el.getBoundingClientRect();
                    setAccountMenuPosition({
                        top: rect.bottom + 12,
                        left: rect.left + rect.width / 2
                    });
                }
            }
        })["Header[updateAccountMenuPosition]"];
        $[19] = t15;
    } else {
        t15 = $[19];
    }
    const updateAccountMenuPosition = t15;
    let t16;
    if ($[20] !== accountMenuOpen) {
        t16 = ({
            "Header[handleAccountMenuToggle]": (e)=>{
                e?.preventDefault?.();
                if (!accountMenuOpen) {
                    updateAccountMenuPosition();
                }
                setAccountMenuOpen(_HeaderHandleAccountMenuToggleSetAccountMenuOpen);
            }
        })["Header[handleAccountMenuToggle]"];
        $[20] = accountMenuOpen;
        $[21] = t16;
    } else {
        t16 = $[21];
    }
    const handleAccountMenuToggle = t16;
    let t17;
    if ($[22] === Symbol.for("react.memo_cache_sentinel")) {
        t17 = ({
            "Header[handleLogoutFromMenu]": ()=>{
                setAccountMenuOpen(false);
                setLogoutPopupOpen(true);
            }
        })["Header[handleLogoutFromMenu]"];
        $[22] = t17;
    } else {
        t17 = $[22];
    }
    const handleLogoutFromMenu = t17;
    let t18;
    if ($[23] !== router) {
        t18 = ({
            "Header[handleLogoutConfirm]": ()=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$auth$2d$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearAuth"])();
                setLogoutPopupOpen(false);
                router.push("/");
            }
        })["Header[handleLogoutConfirm]"];
        $[23] = router;
        $[24] = t18;
    } else {
        t18 = $[24];
    }
    const handleLogoutConfirm = t18;
    let t19;
    let t20;
    if ($[25] !== accountMenuOpen || $[26] !== onAccountPage) {
        t19 = ({
            "Header[useEffect()]": ()=>{
                if (!onAccountPage || !accountMenuOpen) {
                    return;
                }
                const h = {
                    "Header[useEffect() > h]": (e_0)=>{
                        const inWrap = accountMenuWrapRef.current?.contains(e_0.target);
                        const menuEl = document.querySelector(`.${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].accountDropdownMenuPortal}`);
                        if (!inWrap && !menuEl?.contains(e_0.target)) {
                            setAccountMenuOpen(false);
                        }
                    }
                }["Header[useEffect() > h]"];
                document.addEventListener("mousedown", h);
                return ()=>document.removeEventListener("mousedown", h);
            }
        })["Header[useEffect()]"];
        t20 = [
            onAccountPage,
            accountMenuOpen
        ];
        $[25] = accountMenuOpen;
        $[26] = onAccountPage;
        $[27] = t19;
        $[28] = t20;
    } else {
        t19 = $[27];
        t20 = $[28];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t19, t20);
    let t21;
    if ($[29] !== activeNavId) {
        t21 = ({
            "Header[renderNavLink]": (item_0, buttonClass, onClick)=>{
                const isActive = item_0.id === activeNavId;
                const content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerNavLabel} subinfo`,
                    children: item_0.label
                }, void 0, false, {
                    fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                    lineNumber: 288,
                    columnNumber: 25
                }, this);
                if (item_0.href) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: item_0.href,
                        className: buttonClass,
                        "data-active": isActive,
                        "aria-current": isActive ? "page" : undefined,
                        onClick: onClick,
                        children: content
                    }, void 0, false, {
                        fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                        lineNumber: 290,
                        columnNumber: 18
                    }, this);
                }
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: buttonClass,
                    "data-active": isActive,
                    "aria-current": isActive ? "page" : undefined,
                    onClick: onClick,
                    children: content
                }, void 0, false, {
                    fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                    lineNumber: 292,
                    columnNumber: 16
                }, this);
            }
        })["Header[renderNavLink]"];
        $[29] = activeNavId;
        $[30] = t21;
    } else {
        t21 = $[30];
    }
    const renderNavLink = t21;
    let t22;
    if ($[31] === Symbol.for("react.memo_cache_sentinel")) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/",
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoLink,
            "aria-label": "\u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: "/icons/system/logo-desktop.svg",
                    alt: "Setly",
                    width: 100,
                    height: 24,
                    priority: true,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoDesktop,
                    draggable: false
                }, void 0, false, {
                    fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                    lineNumber: 303,
                    columnNumber: 125
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: "/icons/system/logo-mobile.svg",
                    alt: "Setly",
                    width: 56,
                    height: 30,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoMobile,
                    draggable: false
                }, void 0, false, {
                    fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                    lineNumber: 303,
                    columnNumber: 272
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
            lineNumber: 303,
            columnNumber: 11
        }, this);
        $[31] = t22;
    } else {
        t22 = $[31];
    }
    let t23;
    if ($[32] !== hideNavigation || $[33] !== isLoggedIn || $[34] !== renderNavLink) {
        t23 = !hideNavigation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navWrap} ${!isLoggedIn ? __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navWrapUnauth : ""}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: `component-blur ${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerNav}`,
                role: "navigation",
                "aria-label": "\u041D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F \u043F\u043E \u0440\u0430\u0437\u0434\u0435\u043B\u0430\u043C",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerNavList,
                    children: NAV_ITEMS.map({
                        "Header[NAV_ITEMS.map()]": (item_1)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerNavItem,
                                children: renderNavLink(item_1, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerNavButton)
                            }, item_1.id, false, {
                                fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                                lineNumber: 311,
                                columnNumber: 50
                            }, this)
                    }["Header[NAV_ITEMS.map()]"])
                }, void 0, false, {
                    fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                    lineNumber: 310,
                    columnNumber: 314
                }, this)
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                lineNumber: 310,
                columnNumber: 110
            }, this)
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
            lineNumber: 310,
            columnNumber: 30
        }, this);
        $[32] = hideNavigation;
        $[33] = isLoggedIn;
        $[34] = renderNavLink;
        $[35] = t23;
    } else {
        t23 = $[35];
    }
    let t24;
    if ($[36] !== accountMenuOpen || $[37] !== handleAccountMenuToggle || $[38] !== isLoggedIn || $[39] !== onAccountPage || $[40] !== router || $[41] !== user?.avatarPath || $[42] !== user?.profile_photo_url) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerDesktopAuth,
            children: !isLoggedIn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerAuthButton,
                onClick: {
                    "Header[<button>.onClick]": ()=>router.push("/login")
                }["Header[<button>.onClick]"],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerAuthButtonText,
                    children: "Войти"
                }, void 0, false, {
                    fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                    lineNumber: 324,
                    columnNumber: 38
                }, this)
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                lineNumber: 322,
                columnNumber: 69
            }, this) : onAccountPage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                ref: accountMenuWrapRef,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].accountMenuWrap,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$profile$2d$photo$2f$profile$2d$photo$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: user?.profile_photo_url ?? user?.avatarPath,
                    href: undefined,
                    hideUploadOnHover: true,
                    size: 44,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerProfilePhoto,
                    onClick: handleAccountMenuToggle,
                    "aria-label": "\u041C\u0435\u043D\u044E \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430",
                    "aria-haspopup": "menu",
                    "aria-expanded": accountMenuOpen
                }, void 0, false, {
                    fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                    lineNumber: 324,
                    columnNumber: 190
                }, this)
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                lineNumber: 324,
                columnNumber: 124
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$profile$2d$photo$2f$profile$2d$photo$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: user?.profile_photo_url ?? user?.avatarPath,
                href: "/account",
                hideUploadOnHover: true,
                size: 44,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerProfilePhoto
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                lineNumber: 324,
                columnNumber: 532
            }, this)
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
            lineNumber: 322,
            columnNumber: 11
        }, this);
        $[36] = accountMenuOpen;
        $[37] = handleAccountMenuToggle;
        $[38] = isLoggedIn;
        $[39] = onAccountPage;
        $[40] = router;
        $[41] = user?.avatarPath;
        $[42] = user?.profile_photo_url;
        $[43] = t24;
    } else {
        t24 = $[43];
    }
    const t25 = mobileMenuOpen ? "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u043C\u0435\u043D\u044E" : "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043C\u0435\u043D\u044E";
    let t26;
    if ($[44] !== mobileMenuOpen) {
        t26 = mobileMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: "/icons/system/Cross.svg",
            alt: "",
            width: 15,
            height: 15,
            "aria-hidden": true,
            draggable: false
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
            lineNumber: 339,
            columnNumber: 28
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: "/icons/system/Burger.svg",
            alt: "",
            width: 15,
            height: 15,
            "aria-hidden": true,
            draggable: false
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
            lineNumber: 339,
            columnNumber: 137
        }, this);
        $[44] = mobileMenuOpen;
        $[45] = t26;
    } else {
        t26 = $[45];
    }
    let t27;
    if ($[46] !== mobileMenuOpen || $[47] !== t25 || $[48] !== t26) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mobileMenuTrigger,
            onClick: toggleMobileMenu,
            "aria-label": t25,
            "aria-expanded": mobileMenuOpen,
            children: t26
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
            lineNumber: 347,
            columnNumber: 11
        }, this);
        $[46] = mobileMenuOpen;
        $[47] = t25;
        $[48] = t26;
        $[49] = t27;
    } else {
        t27 = $[49];
    }
    let t28;
    if ($[50] !== t24 || $[51] !== t27) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].rightSlot,
            children: [
                t24,
                t27
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
            lineNumber: 357,
            columnNumber: 11
        }, this);
        $[50] = t24;
        $[51] = t27;
        $[52] = t28;
    } else {
        t28 = $[52];
    }
    let t29;
    if ($[53] !== t23 || $[54] !== t28) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
            children: [
                t22,
                t23,
                t28
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
            lineNumber: 366,
            columnNumber: 11
        }, this);
        $[53] = t23;
        $[54] = t28;
        $[55] = t29;
    } else {
        t29 = $[55];
    }
    let t30;
    if ($[56] !== accountMenuOpen || $[57] !== accountMenuPosition || $[58] !== isLoggedIn || $[59] !== mounted || $[60] !== onAccountPage) {
        t30 = mounted && onAccountPage && isLoggedIn && accountMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `component-blur ${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].accountDropdownMenu} ${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].accountDropdownMenuPortal}`,
            role: "menu",
            style: {
                top: accountMenuPosition.top,
                left: accountMenuPosition.left
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: `subinfo ${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].accountDropdownMenuItem}`,
                role: "menuitem",
                onClick: handleLogoutFromMenu,
                children: "Выйти из аккаунта"
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                lineNumber: 378,
                columnNumber: 8
            }, this)
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
            lineNumber: 375,
            columnNumber: 85
        }, this), document.body);
        $[56] = accountMenuOpen;
        $[57] = accountMenuPosition;
        $[58] = isLoggedIn;
        $[59] = mounted;
        $[60] = onAccountPage;
        $[61] = t30;
    } else {
        t30 = $[61];
    }
    let t31;
    if ($[62] !== handleLogoutConfirm || $[63] !== logoutPopupOpen || $[64] !== mounted) {
        t31 = mounted && logoutPopupOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoutPopupOverlay,
            onClick: {
                "Header[<div>.onClick]": ()=>setLogoutPopupOpen(false)
            }["Header[<div>.onClick]"],
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoutPopupBox,
                onClick: _HeaderDivOnClick,
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": "header-logout-popup-title",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        id: "header-logout-popup-title",
                        className: `subtitle_1 ${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoutPopupText}`,
                        children: "Вы уверены? Перед выходом не забудьте свой драгоценный пароль"
                    }, void 0, false, {
                        fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                        lineNumber: 392,
                        columnNumber: 176
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoutPopupButtons,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2f$buttons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                color: "blue",
                                Text: "\u041F\u043E\u043C\u043D\u044E, \u0432\u044B\u0439\u0442\u0438",
                                type: "button",
                                onClick: handleLogoutConfirm
                            }, void 0, false, {
                                fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                                lineNumber: 392,
                                columnNumber: 369
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2f$buttons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                color: "white",
                                Text: "\u041F\u043E\u0439\u0434\u0443 \u0432\u0441\u043F\u043E\u043C\u0438\u043D\u0430\u0442\u044C",
                                type: "button",
                                onClick: {
                                    "Header[<Button>.onClick]": ()=>setLogoutPopupOpen(false)
                                }["Header[<Button>.onClick]"]
                            }, void 0, false, {
                                fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                                lineNumber: 392,
                                columnNumber: 508
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                        lineNumber: 392,
                        columnNumber: 326
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                lineNumber: 392,
                columnNumber: 33
            }, this)
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
            lineNumber: 390,
            columnNumber: 54
        }, this), document.body);
        $[62] = handleLogoutConfirm;
        $[63] = logoutPopupOpen;
        $[64] = mounted;
        $[65] = t31;
    } else {
        t31 = $[65];
    }
    let t32;
    if ($[66] !== handleLoginClick || $[67] !== handleProfileClick || $[68] !== hideNavigation || $[69] !== isLoggedIn || $[70] !== mobileMenuOpen || $[71] !== mounted || $[72] !== renderNavLink) {
        t32 = mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].overlay} ${mobileMenuOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].isOpen : ""}`,
                    onClick: closeMobileMenu,
                    "aria-hidden": true
                }, void 0, false, {
                    fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                    lineNumber: 404,
                    columnNumber: 37
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidePanel} ${mobileMenuOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].isOpen : ""}`,
                    "aria-label": "\u0411\u043E\u043A\u043E\u0432\u043E\u0435 \u043C\u0435\u043D\u044E",
                    "aria-hidden": !mobileMenuOpen,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidePanelContent} ${mobileMenuOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].isOpen : ""}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidePanelHeader,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoLink,
                                        onClick: closeMobileMenu,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: "/icons/system/logo-mobile.svg",
                                            alt: "Setly",
                                            width: 56,
                                            height: 30,
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoMobile,
                                            draggable: false
                                        }, void 0, false, {
                                            fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                                            lineNumber: 404,
                                            columnNumber: 547
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                                        lineNumber: 404,
                                        columnNumber: 478
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mobileMenuTrigger,
                                        onClick: closeMobileMenu,
                                        "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u043C\u0435\u043D\u044E",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: "/icons/system/Cross.svg",
                                            alt: "",
                                            width: 15,
                                            height: 15,
                                            "aria-hidden": true,
                                            draggable: false
                                        }, void 0, false, {
                                            fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                                            lineNumber: 404,
                                            columnNumber: 850
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                                        lineNumber: 404,
                                        columnNumber: 682
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                                lineNumber: 404,
                                columnNumber: 438
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidePanelLoginWrap,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidePanelLoginButton,
                                    children: !isLoggedIn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerAuthButton,
                                        onClick: handleLoginClick,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerAuthButtonText,
                                            children: "Войти"
                                        }, void 0, false, {
                                            fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                                            lineNumber: 404,
                                            columnNumber: 1159
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                                        lineNumber: 404,
                                        columnNumber: 1074
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerAuthButton,
                                        onClick: handleProfileClick,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerAuthButtonText,
                                            children: "Профиль"
                                        }, void 0, false, {
                                            fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                                            lineNumber: 404,
                                            columnNumber: 1316
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                                        lineNumber: 404,
                                        columnNumber: 1229
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                                    lineNumber: 404,
                                    columnNumber: 1014
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                                lineNumber: 404,
                                columnNumber: 971
                            }, this),
                            !hideNavigation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidePanelNav,
                                "aria-label": "\u0420\u0430\u0437\u0434\u0435\u043B\u044B",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidePanelNavInner,
                                    role: "navigation",
                                    "aria-label": "\u041D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F \u043F\u043E \u0440\u0430\u0437\u0434\u0435\u043B\u0430\u043C",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidePanelNavList,
                                        children: NAV_ITEMS.map({
                                            "Header[NAV_ITEMS.map()]": (item_2)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidePanelNavItem,
                                                    children: renderNavLink(item_2, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidePanelNavLink, closeMobileMenu)
                                                }, item_2.id, false, {
                                                    fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                                                    lineNumber: 405,
                                                    columnNumber: 56
                                                }, this)
                                        }["Header[NAV_ITEMS.map()]"])
                                    }, void 0, false, {
                                        fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                                        lineNumber: 404,
                                        columnNumber: 1705
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                                    lineNumber: 404,
                                    columnNumber: 1513
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                                lineNumber: 404,
                                columnNumber: 1418
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidePanelFooter,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidePanelFooterLinks,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/privacy",
                                                onClick: closeMobileMenu,
                                                children: "Политика конфиденциальности"
                                            }, void 0, false, {
                                                fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                                                lineNumber: 406,
                                                columnNumber: 150
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/terms",
                                                onClick: closeMobileMenu,
                                                children: "Пользовательское соглашение"
                                            }, void 0, false, {
                                                fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                                                lineNumber: 406,
                                                columnNumber: 232
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                                        lineNumber: 406,
                                        columnNumber: 105
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidePanelFooterBottom,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidePanelCopyright,
                                                children: "© 2025 Setly."
                                            }, void 0, false, {
                                                fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                                                lineNumber: 406,
                                                columnNumber: 364
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidePanelSlogan,
                                                children: "Когда подготовка исчезает — остаётся только предвкушение"
                                            }, void 0, false, {
                                                fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                                                lineNumber: 406,
                                                columnNumber: 422
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                                        lineNumber: 406,
                                        columnNumber: 318
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                                lineNumber: 406,
                                columnNumber: 65
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                        lineNumber: 404,
                        columnNumber: 353
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
                    lineNumber: 404,
                    columnNumber: 160
                }, this)
            ]
        }, void 0, true), document.body);
        $[66] = handleLoginClick;
        $[67] = handleProfileClick;
        $[68] = hideNavigation;
        $[69] = isLoggedIn;
        $[70] = mobileMenuOpen;
        $[71] = mounted;
        $[72] = renderNavLink;
        $[73] = t32;
    } else {
        t32 = $[73];
    }
    let t33;
    if ($[74] !== t29 || $[75] !== t30 || $[76] !== t31 || $[77] !== t32) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].wrapper}`,
            role: "banner",
            children: [
                t29,
                t30,
                t31,
                t32
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/globals/header/Header.jsx",
            lineNumber: 420,
            columnNumber: 11
        }, this);
        $[74] = t29;
        $[75] = t30;
        $[76] = t31;
        $[77] = t32;
        $[78] = t33;
    } else {
        t33 = $[78];
    }
    return t33;
}
_s(Header, "amIe098bQEah8JRdYaXdYUYZPC4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Header;
function _HeaderDivOnClick(e_1) {
    return e_1.stopPropagation();
}
function _HeaderHandleAccountMenuToggleSetAccountMenuOpen(prev) {
    return !prev;
}
function _HeaderToggleMobileMenuSetMobileMenuOpen(v) {
    return !v;
}
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/setly.front/src/app/components/globals/footer/footer.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "bg": "footer-module__lfvyAq__bg",
  "bottomRow": "footer-module__lfvyAq__bottomRow",
  "content": "footer-module__lfvyAq__content",
  "ctaBlock": "footer-module__lfvyAq__ctaBlock",
  "description": "footer-module__lfvyAq__description",
  "subinfoLeft": "footer-module__lfvyAq__subinfoLeft",
  "subinfoRight": "footer-module__lfvyAq__subinfoRight",
  "title": "footer-module__lfvyAq__title",
  "wrapper": "footer-module__lfvyAq__wrapper",
});
}),
"[project]/setly.front/src/app/components/globals/footer/Footer.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2f$buttons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$footer$2f$footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/globals/footer/footer.module.css [app-client] (css module)");
'use client';
;
;
;
;
;
;
function Footer() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(7);
    if ($[0] !== "3f9377a38d61bfb39832ada2389ee33ca75844185d9ab3af0087b5b5abcb209c") {
        for(let $i = 0; $i < 7; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "3f9377a38d61bfb39832ada2389ee33ca75844185d9ab3af0087b5b5abcb209c";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$footer$2f$footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].bg,
            "aria-hidden": true
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/globals/footer/Footer.jsx",
            lineNumber: 18,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    let t1;
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$footer$2f$footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title} title_1 title_1-mobile`,
            children: "Мы в телеграме"
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/globals/footer/Footer.jsx",
            lineNumber: 26,
            columnNumber: 10
        }, this);
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$footer$2f$footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].description} paragraph paragraph-mobile`,
            children: "Советы и чек-планы, только то, что поможет собраться"
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/globals/footer/Footer.jsx",
            lineNumber: 27,
            columnNumber: 10
        }, this);
        $[2] = t1;
        $[3] = t2;
    } else {
        t1 = $[2];
        t2 = $[3];
    }
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$footer$2f$footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].ctaBlock,
            children: [
                t1,
                t2,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$footer$2f$footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].ctaButtonWrap,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2f$buttons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        color: "white",
                        Text: "\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u0438\u0442\u044C\u0441\u044F",
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/icons/system/TG.svg",
                            alt: "",
                            width: 16,
                            height: 16
                        }, void 0, false, {
                            fileName: "[project]/setly.front/src/app/components/globals/footer/Footer.jsx",
                            lineNumber: 36,
                            columnNumber: 211
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/setly.front/src/app/components/globals/footer/Footer.jsx",
                        lineNumber: 36,
                        columnNumber: 89
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/setly.front/src/app/components/globals/footer/Footer.jsx",
                    lineNumber: 36,
                    columnNumber: 51
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/globals/footer/Footer.jsx",
            lineNumber: 36,
            columnNumber: 10
        }, this);
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$footer$2f$footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subinfoLeft} subinfo`,
            children: "©2025 Setly. Когда подготовка исчезает — остаётся только предвкушение"
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/globals/footer/Footer.jsx",
            lineNumber: 43,
            columnNumber: 10
        }, this);
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    let t5;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$footer$2f$footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].wrapper,
            role: "contentinfo",
            children: [
                t0,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$footer$2f$footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].content,
                    children: [
                        t3,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$footer$2f$footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].bottomRow,
                            children: [
                                t4,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$footer$2f$footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subinfoRight,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/privacy",
                                            className: "subinfo",
                                            children: "Политика конфиденциальности"
                                        }, void 0, false, {
                                            fileName: "[project]/setly.front/src/app/components/globals/footer/Footer.jsx",
                                            lineNumber: 50,
                                            columnNumber: 179
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/terms",
                                            className: "subinfo",
                                            children: "Пользовательское соглашение"
                                        }, void 0, false, {
                                            fileName: "[project]/setly.front/src/app/components/globals/footer/Footer.jsx",
                                            lineNumber: 50,
                                            columnNumber: 255
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/setly.front/src/app/components/globals/footer/Footer.jsx",
                                    lineNumber: 50,
                                    columnNumber: 142
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/setly.front/src/app/components/globals/footer/Footer.jsx",
                            lineNumber: 50,
                            columnNumber: 104
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/setly.front/src/app/components/globals/footer/Footer.jsx",
                    lineNumber: 50,
                    columnNumber: 68
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/globals/footer/Footer.jsx",
            lineNumber: 50,
            columnNumber: 10
        }, this);
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    return t5;
}
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/setly.front/src/app/components/blocks/main/welcome-screen/welcome-screen.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "block": "welcome-screen-module__4XwqzG__block",
  "content": "welcome-screen-module__4XwqzG__content",
  "subinfo": "welcome-screen-module__4XwqzG__subinfo",
  "title": "welcome-screen-module__4XwqzG__title",
  "titleImage": "welcome-screen-module__4XwqzG__titleImage",
  "titleImageSecond": "welcome-screen-module__4XwqzG__titleImageSecond",
  "titleImageWrap": "welcome-screen-module__4XwqzG__titleImageWrap",
  "titleLine": "welcome-screen-module__4XwqzG__titleLine",
  "titlePart": "welcome-screen-module__4XwqzG__titlePart",
});
}),
"[project]/setly.front/src/app/components/blocks/main/welcome-screen/welcome-screen.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WelcomeScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2f$buttons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$welcome$2d$screen$2f$welcome$2d$screen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/blocks/main/welcome-screen/welcome-screen.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function WelcomeScreen() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(7);
    if ($[0] !== "d90f6a6458d8c8de3b500c92836ec0d2aa69197a6bc393da222c29f8415bf06a") {
        for(let $i = 0; $i < 7; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d90f6a6458d8c8de3b500c92836ec0d2aa69197a6bc393da222c29f8415bf06a";
    }
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$welcome$2d$screen$2f$welcome$2d$screen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].titlePart,
            children: "Планируй"
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/welcome-screen/welcome-screen.jsx",
            lineNumber: 19,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$welcome$2d$screen$2f$welcome$2d$screen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].titleLine,
            children: [
                t0,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$welcome$2d$screen$2f$welcome$2d$screen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].titlePart,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$welcome$2d$screen$2f$welcome$2d$screen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].titleImageWrap,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: "/img/main/easy.png",
                            alt: "\u041B\u0435\u0433\u043A\u043E",
                            width: 208,
                            height: 52,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$welcome$2d$screen$2f$welcome$2d$screen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].titleImage
                        }, void 0, false, {
                            fileName: "[project]/setly.front/src/app/components/blocks/main/welcome-screen/welcome-screen.jsx",
                            lineNumber: 26,
                            columnNumber: 124
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/setly.front/src/app/components/blocks/main/welcome-screen/welcome-screen.jsx",
                        lineNumber: 26,
                        columnNumber: 84
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/setly.front/src/app/components/blocks/main/welcome-screen/welcome-screen.jsx",
                    lineNumber: 26,
                    columnNumber: 49
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/welcome-screen/welcome-screen.jsx",
            lineNumber: 26,
            columnNumber: 10
        }, this);
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    let t3;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$welcome$2d$screen$2f$welcome$2d$screen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
            children: [
                t1,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$welcome$2d$screen$2f$welcome$2d$screen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].titleLine,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$welcome$2d$screen$2f$welcome$2d$screen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].titlePart,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$welcome$2d$screen$2f$welcome$2d$screen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].titleImageWrap,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/img/main/explore.png",
                                    alt: "\u041F\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0443\u0439",
                                    width: 412,
                                    height: 73,
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$welcome$2d$screen$2f$welcome$2d$screen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].titleImage} ${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$welcome$2d$screen$2f$welcome$2d$screen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].titleImageSecond}`
                                }, void 0, false, {
                                    fileName: "[project]/setly.front/src/app/components/blocks/main/welcome-screen/welcome-screen.jsx",
                                    lineNumber: 34,
                                    columnNumber: 153
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/setly.front/src/app/components/blocks/main/welcome-screen/welcome-screen.jsx",
                                lineNumber: 34,
                                columnNumber: 113
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/setly.front/src/app/components/blocks/main/welcome-screen/welcome-screen.jsx",
                            lineNumber: 34,
                            columnNumber: 78
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$welcome$2d$screen$2f$welcome$2d$screen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].titlePart,
                            children: "уверенно"
                        }, void 0, false, {
                            fileName: "[project]/setly.front/src/app/components/blocks/main/welcome-screen/welcome-screen.jsx",
                            lineNumber: 34,
                            columnNumber: 365
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/setly.front/src/app/components/blocks/main/welcome-screen/welcome-screen.jsx",
                    lineNumber: 34,
                    columnNumber: 43
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/welcome-screen/welcome-screen.jsx",
            lineNumber: 34,
            columnNumber: 10
        }, this);
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$welcome$2d$screen$2f$welcome$2d$screen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subinfo,
            children: "Скажи «пока» тревоге при планировании путешествий! Мы разработали чек-планы, которые помогут ничего не упустить и отправиться в путь уверенно."
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/welcome-screen/welcome-screen.jsx",
            lineNumber: 35,
            columnNumber: 10
        }, this);
        $[3] = t2;
        $[4] = t3;
    } else {
        t2 = $[3];
        t3 = $[4];
    }
    let t4;
    if ($[5] !== router) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$welcome$2d$screen$2f$welcome$2d$screen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].block,
            "aria-label": "\u041F\u0440\u0438\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u044D\u043A\u0440\u0430\u043D",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$welcome$2d$screen$2f$welcome$2d$screen$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].content,
                children: [
                    t2,
                    t3,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2f$buttons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        Text: "\u0412\u043F\u0435\u0440\u0435\u0434 \u043A \u0447\u0435\u043A-\u043F\u043B\u0430\u043D\u0430\u043C",
                        color: "white",
                        onClick: {
                            "WelcomeScreen[<Button>.onClick]": ()=>router.push("/check-plans")
                        }["WelcomeScreen[<Button>.onClick]"]
                    }, void 0, false, {
                        fileName: "[project]/setly.front/src/app/components/blocks/main/welcome-screen/welcome-screen.jsx",
                        lineNumber: 44,
                        columnNumber: 215
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/setly.front/src/app/components/blocks/main/welcome-screen/welcome-screen.jsx",
                lineNumber: 44,
                columnNumber: 175
            }, this)
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/welcome-screen/welcome-screen.jsx",
            lineNumber: 44,
            columnNumber: 10
        }, this);
        $[5] = router;
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    return t4;
}
_s(WelcomeScreen, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = WelcomeScreen;
var _c;
__turbopack_context__.k.register(_c, "WelcomeScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/setly.front/src/app/lib/typograf.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyTypograf",
    ()=>applyTypograf
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$typograf$2f$dist$2f$typograf$2e$es$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/typograf/dist/typograf.es.mjs [app-client] (ecmascript)");
;
const tp = new __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$typograf$2f$dist$2f$typograf$2e$es$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
    locale: [
        'ru'
    ]
});
function applyTypograf(text) {
    if (!text) return text;
    return tp.execute(text);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/setly.front/src/app/components/blocks/main/three-steps/three-steps.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "block": "three-steps-module__d51WlG__block",
  "buttonWrap": "three-steps-module__d51WlG__buttonWrap",
  "card": "three-steps-module__d51WlG__card",
  "card--rotateLeft": "three-steps-module__d51WlG__card--rotateLeft",
  "card--rotateRight": "three-steps-module__d51WlG__card--rotateRight",
  "cardDescription": "three-steps-module__d51WlG__cardDescription",
  "cardImage": "three-steps-module__d51WlG__cardImage",
  "cardSubtitle": "three-steps-module__d51WlG__cardSubtitle",
  "cardTitle": "three-steps-module__d51WlG__cardTitle",
  "cards": "three-steps-module__d51WlG__cards",
  "title": "three-steps-module__d51WlG__title",
  "wrapper": "three-steps-module__d51WlG__wrapper",
});
}),
"[project]/setly.front/src/app/components/blocks/main/three-steps/three-steps.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ThreeSteps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2f$buttons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$auth$2d$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/lib/auth-storage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$typograf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/lib/typograf.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$three$2d$steps$2f$three$2d$steps$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/blocks/main/three-steps/three-steps.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const steps = [
    {
        image: "/img/main/step-1.png",
        title: "Шаг 1",
        subtitle: "Выберите тип поездки",
        description: "Город, пляж, горы, командировка — мы подскажем, что важно взять",
        rotation: "left"
    },
    {
        image: "/img/main/step-2.png",
        title: "Шаг 2",
        subtitle: "Отредактируйте план",
        description: "Уберите лишнее, добавьте своё — ваш чек-план должен быть вашим",
        rotation: "none"
    },
    {
        image: "/img/main/step-3.png",
        title: "Шаг 3",
        subtitle: "Готово. Можно ехать",
        description: "Все документы, вещи, маршруты — в одном месте. Без стресса",
        rotation: "right"
    }
];
function ThreeSteps() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "04abf75b9eabf9a988762fb11507b446f776bd0d894609a7012d1e167e9da541") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "04abf75b9eabf9a988762fb11507b446f776bd0d894609a7012d1e167e9da541";
    }
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    let t0;
    if ($[1] !== router) {
        t0 = ({
            "ThreeSteps[handleCreateCheckplan]": ()=>{
                const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$auth$2d$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuth"])();
                if (auth?.token) {
                    router.push("/creating");
                    return;
                }
                router.push("/login");
            }
        })["ThreeSteps[handleCreateCheckplan]"];
        $[1] = router;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    const handleCreateCheckplan = t0;
    let t1;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$three$2d$steps$2f$three$2d$steps$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title} title_1`,
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$typograf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyTypograf"])("\u0422\u0440\u0438 \u0448\u0430\u0433\u0430 \u0434\u043B\u044F \u0438\u0434\u0435\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043F\u043B\u0430\u043D\u0430")
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/three-steps/three-steps.jsx",
            lineNumber: 57,
            columnNumber: 10
        }, this);
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    let t2;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$three$2d$steps$2f$three$2d$steps$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cards,
            children: steps.map(_ThreeStepsStepsMap)
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/three-steps/three-steps.jsx",
            lineNumber: 64,
            columnNumber: 10
        }, this);
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$typograf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyTypograf"])("\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0447\u0435\u043A-\u043F\u043B\u0430\u043D");
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] !== handleCreateCheckplan) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$three$2d$steps$2f$three$2d$steps$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].wrapper,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$three$2d$steps$2f$three$2d$steps$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].block,
                children: [
                    t1,
                    t2,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$three$2d$steps$2f$three$2d$steps$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buttonWrap,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2f$buttons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            Text: t3,
                            color: "blue",
                            onClick: handleCreateCheckplan
                        }, void 0, false, {
                            fileName: "[project]/setly.front/src/app/components/blocks/main/three-steps/three-steps.jsx",
                            lineNumber: 78,
                            columnNumber: 119
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/setly.front/src/app/components/blocks/main/three-steps/three-steps.jsx",
                        lineNumber: 78,
                        columnNumber: 84
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/setly.front/src/app/components/blocks/main/three-steps/three-steps.jsx",
                lineNumber: 78,
                columnNumber: 42
            }, this)
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/three-steps/three-steps.jsx",
            lineNumber: 78,
            columnNumber: 10
        }, this);
        $[6] = handleCreateCheckplan;
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    return t4;
}
_s(ThreeSteps, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ThreeSteps;
function _ThreeStepsStepsMap(step) {
    let cardClass = __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$three$2d$steps$2f$three$2d$steps$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card;
    if (step.rotation === "left") {
        cardClass = cardClass + ` ${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$three$2d$steps$2f$three$2d$steps$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]["card--rotateLeft"]}`;
    }
    if (step.rotation === "right") {
        cardClass = cardClass + ` ${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$three$2d$steps$2f$three$2d$steps$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]["card--rotateRight"]}`;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: cardClass,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: step.image,
                alt: "",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$three$2d$steps$2f$three$2d$steps$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardImage
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/components/blocks/main/three-steps/three-steps.jsx",
                lineNumber: 94,
                columnNumber: 58
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$three$2d$steps$2f$three$2d$steps$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardTitle} subtitle_1`,
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$typograf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyTypograf"])(step.title)
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/components/blocks/main/three-steps/three-steps.jsx",
                lineNumber: 94,
                columnNumber: 118
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$three$2d$steps$2f$three$2d$steps$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardSubtitle} subtitle_1`,
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$typograf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyTypograf"])(step.subtitle)
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/components/blocks/main/three-steps/three-steps.jsx",
                lineNumber: 94,
                columnNumber: 199
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$three$2d$steps$2f$three$2d$steps$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardDescription} subinfo`,
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$typograf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyTypograf"])(step.description)
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/components/blocks/main/three-steps/three-steps.jsx",
                lineNumber: 94,
                columnNumber: 284
            }, this)
        ]
    }, step.title, true, {
        fileName: "[project]/setly.front/src/app/components/blocks/main/three-steps/three-steps.jsx",
        lineNumber: 94,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "ThreeSteps");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/setly.front/src/app/components/blocks/main/ideal-way/ideal-way.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "avatar": "ideal-way-module__LiIGcW__avatar",
  "avatars": "ideal-way-module__LiIGcW__avatars",
  "block": "ideal-way-module__LiIGcW__block",
  "buttonWrap": "ideal-way-module__LiIGcW__buttonWrap",
  "description": "ideal-way-module__LiIGcW__description",
  "descriptionWrap": "ideal-way-module__LiIGcW__descriptionWrap",
  "leftPart": "ideal-way-module__LiIGcW__leftPart",
  "rightPart": "ideal-way-module__LiIGcW__rightPart",
  "rightPartContent": "ideal-way-module__LiIGcW__rightPartContent",
  "rightPartHeader": "ideal-way-module__LiIGcW__rightPartHeader",
  "suitcaseImage": "ideal-way-module__LiIGcW__suitcaseImage",
  "title": "ideal-way-module__LiIGcW__title",
});
}),
"[project]/setly.front/src/app/components/blocks/main/ideal-way/ideal-way.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OurCommunity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2f$buttons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$typograf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/lib/typograf.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$ideal$2d$way$2f$ideal$2d$way$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/blocks/main/ideal-way/ideal-way.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function OurCommunity() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "837d9eaba9f4f7173884840e32d60976bc34c25cce2b53cbe27298fac6e041b7") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "837d9eaba9f4f7173884840e32d60976bc34c25cce2b53cbe27298fac6e041b7";
    }
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$ideal$2d$way$2f$ideal$2d$way$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].leftPart,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: "/img/main/suit-case.png",
                alt: "",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$ideal$2d$way$2f$ideal$2d$way$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].suitcaseImage
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/components/blocks/main/ideal-way/ideal-way.jsx",
                lineNumber: 19,
                columnNumber: 43
            }, this)
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/ideal-way/ideal-way.jsx",
            lineNumber: 19,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$ideal$2d$way$2f$ideal$2d$way$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].rightPartHeader,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$ideal$2d$way$2f$ideal$2d$way$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title} title_1`,
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$typograf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyTypograf"])("\u0421 \u043D\u0430\u043C\u0438 \u2014 \u0442\u0435, \u043A\u0442\u043E \u0443\u0436\u0435 \u0437\u043D\u0430\u0435\u0442, \u0447\u0442\u043E \u0432\u0437\u044F\u0442\u044C")
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/components/blocks/main/ideal-way/ideal-way.jsx",
                lineNumber: 26,
                columnNumber: 50
            }, this)
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/ideal-way/ideal-way.jsx",
            lineNumber: 26,
            columnNumber: 10
        }, this);
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$ideal$2d$way$2f$ideal$2d$way$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].avatars,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: "/img/main/our-exp-avatar-1.png",
                    alt: "",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$ideal$2d$way$2f$ideal$2d$way$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].avatar
                }, void 0, false, {
                    fileName: "[project]/setly.front/src/app/components/blocks/main/ideal-way/ideal-way.jsx",
                    lineNumber: 33,
                    columnNumber: 42
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: "/img/main/our-exp-avatar-2.png",
                    alt: "",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$ideal$2d$way$2f$ideal$2d$way$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].avatar
                }, void 0, false, {
                    fileName: "[project]/setly.front/src/app/components/blocks/main/ideal-way/ideal-way.jsx",
                    lineNumber: 33,
                    columnNumber: 119
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: "/img/main/our-exp-avatar-3.png",
                    alt: "",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$ideal$2d$way$2f$ideal$2d$way$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].avatar
                }, void 0, false, {
                    fileName: "[project]/setly.front/src/app/components/blocks/main/ideal-way/ideal-way.jsx",
                    lineNumber: 33,
                    columnNumber: 196
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/ideal-way/ideal-way.jsx",
            lineNumber: 33,
            columnNumber: 10
        }, this);
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$ideal$2d$way$2f$ideal$2d$way$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].description} paragraph`,
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$typograf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyTypograf"])("\u041C\u044B \u0443\u0436\u0435 \u043F\u0440\u043E\u0448\u043B\u0438 \u044D\u0442\u043E\u0442 \u043F\u0443\u0442\u044C \u2014 \u0438 \u0437\u043D\u0430\u0435\u043C, \u043A\u0430\u043A\u043E\u0432\u043E \u044D\u0442\u043E: \u0437\u0430\u0431\u044B\u0442\u044C \u0430\u0434\u0430\u043F\u0442\u0435\u0440, \u043F\u043E\u0442\u0435\u0440\u044F\u0442\u044C \u0431\u0438\u043B\u0435\u0442, \u043D\u0435\u0440\u0432\u043D\u0438\u0447\u0430\u0442\u044C \u043F\u0435\u0440\u0435\u0434 \u0432\u044B\u043B\u0435\u0442\u043E\u043C.")
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/ideal-way/ideal-way.jsx",
            lineNumber: 40,
            columnNumber: 10
        }, this);
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$ideal$2d$way$2f$ideal$2d$way$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].descriptionWrap,
            children: [
                t3,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$ideal$2d$way$2f$ideal$2d$way$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].description} paragraph`,
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$typograf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyTypograf"])("\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u044F\u0439\u0442\u0435\u0441\u044C \u2014 \u0438 \u0441\u043E\u0437\u0434\u0430\u0432\u0430\u0439\u0442\u0435 \u0447\u0435\u043A-\u043F\u043B\u0430\u043D\u044B, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442 \u0438\u043C\u0435\u043D\u043D\u043E \u0434\u043B\u044F \u0432\u0430\u0441.")
                }, void 0, false, {
                    fileName: "[project]/setly.front/src/app/components/blocks/main/ideal-way/ideal-way.jsx",
                    lineNumber: 47,
                    columnNumber: 54
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/ideal-way/ideal-way.jsx",
            lineNumber: 47,
            columnNumber: 10
        }, this);
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    let t5;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$typograf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyTypograf"])("\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F");
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    let t6;
    if ($[7] !== router) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$ideal$2d$way$2f$ideal$2d$way$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].block,
            children: [
                t0,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$ideal$2d$way$2f$ideal$2d$way$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].rightPart,
                    children: [
                        t1,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$ideal$2d$way$2f$ideal$2d$way$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].rightPartContent,
                            children: [
                                t2,
                                t4,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$ideal$2d$way$2f$ideal$2d$way$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buttonWrap,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2f$buttons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        Text: t5,
                                        color: "white",
                                        onClick: {
                                            "OurCommunity[<Button>.onClick]": ()=>router.push("/registration")
                                        }["OurCommunity[<Button>.onClick]"]
                                    }, void 0, false, {
                                        fileName: "[project]/setly.front/src/app/components/blocks/main/ideal-way/ideal-way.jsx",
                                        lineNumber: 61,
                                        columnNumber: 170
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/setly.front/src/app/components/blocks/main/ideal-way/ideal-way.jsx",
                                    lineNumber: 61,
                                    columnNumber: 135
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/setly.front/src/app/components/blocks/main/ideal-way/ideal-way.jsx",
                            lineNumber: 61,
                            columnNumber: 86
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/setly.front/src/app/components/blocks/main/ideal-way/ideal-way.jsx",
                    lineNumber: 61,
                    columnNumber: 48
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/ideal-way/ideal-way.jsx",
            lineNumber: 61,
            columnNumber: 10
        }, this);
        $[7] = router;
        $[8] = t6;
    } else {
        t6 = $[8];
    }
    return t6;
}
_s(OurCommunity, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = OurCommunity;
var _c;
__turbopack_context__.k.register(_c, "OurCommunity");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/setly.front/src/app/components/atomic/atoms/buttons-round/buttons-round.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "roundButton": "buttons-round-module__NdKJCq__roundButton",
  "roundButton--disabled": "buttons-round-module__NdKJCq__roundButton--disabled",
  "roundButton--hover": "buttons-round-module__NdKJCq__roundButton--hover",
  "roundButton--profile": "buttons-round-module__NdKJCq__roundButton--profile",
  "roundButton--white": "buttons-round-module__NdKJCq__roundButton--white",
  "roundButton__icon": "buttons-round-module__NdKJCq__roundButton__icon",
});
}),
"[project]/setly.front/src/app/components/atomic/atoms/buttons-round/buttons-round.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ButtonsRoundDemo",
    ()=>ButtonsRoundDemo,
    "default",
    ()=>RoundButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2d$round$2f$buttons$2d$round$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/atomic/atoms/buttons-round/buttons-round.module.css [app-client] (css module)");
"use client";
;
;
;
;
function ArrowRightIcon(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "b1237559a608bcb852c66fdfcd1c5ae6a262164e259e4a900c45f07771408402") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b1237559a608bcb852c66fdfcd1c5ae6a262164e259e4a900c45f07771408402";
    }
    const { className } = t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "20",
            height: "20",
            viewBox: "0 0 20 20",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M7 4L13 10L7 16",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons-round/buttons-round.jsx",
                lineNumber: 19,
                columnNumber: 105
            }, this)
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons-round/buttons-round.jsx",
            lineNumber: 19,
            columnNumber: 10
        }, this);
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] !== className) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: className,
            "aria-hidden": true,
            children: t1
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons-round/buttons-round.jsx",
            lineNumber: 26,
            columnNumber: 10
        }, this);
        $[2] = className;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    return t2;
}
_c = ArrowRightIcon;
function RoundButton(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(16);
    if ($[0] !== "b1237559a608bcb852c66fdfcd1c5ae6a262164e259e4a900c45f07771408402") {
        for(let $i = 0; $i < 16; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b1237559a608bcb852c66fdfcd1c5ae6a262164e259e4a900c45f07771408402";
    }
    let children;
    let icon;
    let props;
    let t1;
    if ($[1] !== t0) {
        ({ variant: t1, icon, children, ...props } = t0);
        $[1] = t0;
        $[2] = children;
        $[3] = icon;
        $[4] = props;
        $[5] = t1;
    } else {
        children = $[2];
        icon = $[3];
        props = $[4];
        t1 = $[5];
    }
    const variant = t1 === undefined ? "white" : t1;
    const hasCustomIcon = Boolean(icon ?? children);
    const t2 = `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2d$round$2f$buttons$2d$round$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].roundButton} ${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2d$round$2f$buttons$2d$round$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"][`roundButton--${variant}`]}`;
    const t3 = variant === "disabled";
    const t4 = variant === "disabled";
    let t5;
    if ($[6] !== children || $[7] !== hasCustomIcon || $[8] !== icon) {
        t5 = hasCustomIcon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2d$round$2f$buttons$2d$round$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].roundButton__icon,
            children: icon ?? children
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons-round/buttons-round.jsx",
            lineNumber: 71,
            columnNumber: 26
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ArrowRightIcon, {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2d$round$2f$buttons$2d$round$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].roundButton__icon
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons-round/buttons-round.jsx",
            lineNumber: 71,
            columnNumber: 97
        }, this);
        $[6] = children;
        $[7] = hasCustomIcon;
        $[8] = icon;
        $[9] = t5;
    } else {
        t5 = $[9];
    }
    let t6;
    if ($[10] !== props || $[11] !== t2 || $[12] !== t3 || $[13] !== t4 || $[14] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            className: t2,
            disabled: t3,
            "aria-disabled": t4,
            ...props,
            children: t5
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons-round/buttons-round.jsx",
            lineNumber: 81,
            columnNumber: 10
        }, this);
        $[10] = props;
        $[11] = t2;
        $[12] = t3;
        $[13] = t4;
        $[14] = t5;
        $[15] = t6;
    } else {
        t6 = $[15];
    }
    return t6;
}
_c1 = RoundButton;
function ButtonsRoundDemo() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "b1237559a608bcb852c66fdfcd1c5ae6a262164e259e4a900c45f07771408402") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b1237559a608bcb852c66fdfcd1c5ae6a262164e259e4a900c45f07771408402";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ButtonShowcase",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RoundButton, {
                    variant: "white",
                    "aria-label": "\u0421\u0442\u0440\u0435\u043B\u043A\u0430 \u0432\u043F\u0440\u0430\u0432\u043E"
                }, void 0, false, {
                    fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons-round/buttons-round.jsx",
                    lineNumber: 103,
                    columnNumber: 42
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RoundButton, {
                    variant: "hover",
                    "aria-label": "\u0421\u0442\u0440\u0435\u043B\u043A\u0430 \u0432\u043F\u0440\u0430\u0432\u043E"
                }, void 0, false, {
                    fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons-round/buttons-round.jsx",
                    lineNumber: 103,
                    columnNumber: 168
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RoundButton, {
                    variant: "disabled",
                    "aria-label": "\u0421\u0442\u0440\u0435\u043B\u043A\u0430 \u0432\u043F\u0440\u0430\u0432\u043E (\u043D\u0435\u0430\u043A\u0442\u0438\u0432\u043D\u043E)"
                }, void 0, false, {
                    fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons-round/buttons-round.jsx",
                    lineNumber: 103,
                    columnNumber: 294
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/atomic/atoms/buttons-round/buttons-round.jsx",
            lineNumber: 103,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return t0;
}
_c2 = ButtonsRoundDemo;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ArrowRightIcon");
__turbopack_context__.k.register(_c1, "RoundButton");
__turbopack_context__.k.register(_c2, "ButtonsRoundDemo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/setly.front/src/app/components/blocks/main/our-community/our-community.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "buttonWrapper": "our-community-module__W1AtgG__buttonWrapper",
  "card": "our-community-module__W1AtgG__card",
  "cardDescription": "our-community-module__W1AtgG__cardDescription" + " " + "subinfo",
  "cardFooter": "our-community-module__W1AtgG__cardFooter",
  "cardImage": "our-community-module__W1AtgG__cardImage",
  "cardImageWrapper": "our-community-module__W1AtgG__cardImageWrapper",
  "cardSlide": "our-community-module__W1AtgG__cardSlide",
  "cardTitle": "our-community-module__W1AtgG__cardTitle" + " " + "subtitle_1",
  "cardsSlider": "our-community-module__W1AtgG__cardsSlider",
  "cardsStack": "our-community-module__W1AtgG__cardsStack",
  "cardsStackNoTransition": "our-community-module__W1AtgG__cardsStackNoTransition",
  "carouselNav": "our-community-module__W1AtgG__carouselNav",
  "description": "our-community-module__W1AtgG__description" + " " + "paragraph",
  "left": "our-community-module__W1AtgG__left",
  "leftBottom": "our-community-module__W1AtgG__leftBottom",
  "leftTop": "our-community-module__W1AtgG__leftTop",
  "likesCount": "our-community-module__W1AtgG__likesCount" + " " + "subinfo",
  "likesIcon": "our-community-module__W1AtgG__likesIcon",
  "likesRow": "our-community-module__W1AtgG__likesRow",
  "loginToLikeButtons": "our-community-module__W1AtgG__loginToLikeButtons",
  "loginToLikeOverlay": "our-community-module__W1AtgG__loginToLikeOverlay",
  "loginToLikeOverlayClosing": "our-community-module__W1AtgG__loginToLikeOverlayClosing",
  "loginToLikeOverlayIn": "our-community-module__W1AtgG__loginToLikeOverlayIn",
  "loginToLikeOverlayOut": "our-community-module__W1AtgG__loginToLikeOverlayOut",
  "loginToLikePopIn": "our-community-module__W1AtgG__loginToLikePopIn",
  "loginToLikePopOut": "our-community-module__W1AtgG__loginToLikePopOut",
  "loginToLikePopup": "our-community-module__W1AtgG__loginToLikePopup",
  "loginToLikePopupClosing": "our-community-module__W1AtgG__loginToLikePopupClosing",
  "outerWrapper": "our-community-module__W1AtgG__outerWrapper",
  "right": "our-community-module__W1AtgG__right",
  "rightMobile": "our-community-module__W1AtgG__rightMobile",
  "tag": "our-community-module__W1AtgG__tag" + " " + "label",
  "tagIcon": "our-community-module__W1AtgG__tagIcon",
  "tags": "our-community-module__W1AtgG__tags",
  "title": "our-community-module__W1AtgG__title" + " " + "title_1",
  "userAvatar": "our-community-module__W1AtgG__userAvatar",
  "userName": "our-community-module__W1AtgG__userName" + " " + "subinfo",
  "userRow": "our-community-module__W1AtgG__userRow",
  "wrapper": "our-community-module__W1AtgG__wrapper",
});
}),
"[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OurCommunity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2f$buttons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2d$round$2f$buttons$2d$round$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/atomic/atoms/buttons-round/buttons-round.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$auth$2d$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/lib/auth-storage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$typograf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/lib/typograf.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/blocks/main/our-community/our-community.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
/** Попап «Войдите, чтобы поставить Лайк» + кнопка «Войти» */ const LoginToLikePopup = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(function LoginToLikePopup(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(11);
    if ($[0] !== "1538e9ddefaea36bd8dbf8dd7017db190947c852cff291d39f9fb6b83475298f") {
        for(let $i = 0; $i < 11; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1538e9ddefaea36bd8dbf8dd7017db190947c852cff291d39f9fb6b83475298f";
    }
    const { isClosing, onClose, onLogin } = t0;
    const t1 = `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loginToLikeOverlay} ${isClosing ? __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loginToLikeOverlayClosing : ""}`;
    const t2 = `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loginToLikePopup} ${isClosing ? __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loginToLikePopupClosing : ""}`;
    let t3;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            id: "our-community-login-to-like-title",
            className: "title_2",
            style: {
                color: "var(--grayscale-dark-gray)"
            },
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$typograf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyTypograf"])("\u0412\u043E\u0439\u0434\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u041B\u0430\u0439\u043A")
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 32,
            columnNumber: 10
        }, this);
        $[1] = t3;
    } else {
        t3 = $[1];
    }
    let t4;
    if ($[2] !== onLogin) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loginToLikeButtons,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2f$buttons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                Text: "\u0412\u043E\u0439\u0442\u0438",
                color: "blue",
                type: "button",
                onClick: onLogin
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
                lineNumber: 41,
                columnNumber: 53
            }, this)
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 41,
            columnNumber: 10
        }, this);
        $[2] = onLogin;
        $[3] = t4;
    } else {
        t4 = $[3];
    }
    let t5;
    if ($[4] !== t2 || $[5] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t2,
            onClick: _LoginToLikePopupDivOnClick,
            children: [
                t3,
                t4
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 49,
            columnNumber: 10
        }, this);
        $[4] = t2;
        $[5] = t4;
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    let t6;
    if ($[7] !== onClose || $[8] !== t1 || $[9] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t1,
            onClick: onClose,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "our-community-login-to-like-title",
            children: t5
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 58,
            columnNumber: 10
        }, this);
        $[7] = onClose;
        $[8] = t1;
        $[9] = t5;
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    return t6;
});
_c = LoginToLikePopup;
const COMMUNITY_CARDS = [
    {
        imageSrc: "/img/main/media-japan-card.png",
        imageAlt: "Япония",
        days: "10 дней",
        location: "Киото",
        title: "Япония 2025",
        description: "Список для тех, кто как я любит много ходить и искать не туристические места",
        avatarSrc: "/img/main/ducccky.png",
        userName: "ducccky",
        initialLikes: 241
    },
    {
        imageSrc: "/img/main/media-thailand-card.png",
        imageAlt: "Таиланд",
        days: "10 дней",
        location: "Таиланд",
        title: "Чилловый Тайланд",
        description: "Ходила по храмам, купалась в море и грелась на солнце без экскурсий в 7 утра",
        avatarSrc: "/img/main/ksushzm.png",
        userName: "ksushzm",
        initialLikes: 210
    }
];
function CheckPlanCard(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(56);
    if ($[0] !== "1538e9ddefaea36bd8dbf8dd7017db190947c852cff291d39f9fb6b83475298f") {
        for(let $i = 0; $i < 56; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1538e9ddefaea36bd8dbf8dd7017db190947c852cff291d39f9fb6b83475298f";
    }
    const { imageSrc, imageAlt, days, location, title, description, avatarSrc, userName, initialLikes, isAuthenticated, onRequestLogin } = t0;
    const [liked, setLiked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const likes = initialLikes + (liked ? 1 : 0);
    let t1;
    if ($[1] !== isAuthenticated || $[2] !== onRequestLogin) {
        t1 = ({
            "CheckPlanCard[handleLikeClick]": ()=>{
                if (!isAuthenticated) {
                    onRequestLogin?.();
                    return;
                }
                setLiked(_CheckPlanCardHandleLikeClickSetLiked);
            }
        })["CheckPlanCard[handleLikeClick]"];
        $[1] = isAuthenticated;
        $[2] = onRequestLogin;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    const handleLikeClick = t1;
    let t2;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: "/icons/images/Calender.svg",
            alt: "",
            width: 20,
            height: 20,
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tagIcon
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 132,
            columnNumber: 10
        }, this);
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] !== days) {
        t3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$typograf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyTypograf"])(days);
        $[5] = days;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    if ($[7] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tag,
            children: [
                t2,
                t3
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 147,
            columnNumber: 10
        }, this);
        $[7] = t3;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    let t5;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: "/icons/images/Location.svg",
            alt: "",
            width: 20,
            height: 20,
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tagIcon
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 155,
            columnNumber: 10
        }, this);
        $[9] = t5;
    } else {
        t5 = $[9];
    }
    let t6;
    if ($[10] !== location) {
        t6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$typograf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyTypograf"])(location);
        $[10] = location;
        $[11] = t6;
    } else {
        t6 = $[11];
    }
    let t7;
    if ($[12] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tag,
            children: [
                t5,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 170,
            columnNumber: 10
        }, this);
        $[12] = t6;
        $[13] = t7;
    } else {
        t7 = $[13];
    }
    let t8;
    if ($[14] !== t4 || $[15] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tags,
            children: [
                t4,
                t7
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 178,
            columnNumber: 10
        }, this);
        $[14] = t4;
        $[15] = t7;
        $[16] = t8;
    } else {
        t8 = $[16];
    }
    let t9;
    if ($[17] !== imageAlt || $[18] !== imageSrc) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardImageWrapper,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: imageSrc,
                alt: imageAlt,
                width: 264,
                height: 264,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardImage
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
                lineNumber: 187,
                columnNumber: 51
            }, this)
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 187,
            columnNumber: 10
        }, this);
        $[17] = imageAlt;
        $[18] = imageSrc;
        $[19] = t9;
    } else {
        t9 = $[19];
    }
    let t10;
    if ($[20] !== title) {
        t10 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$typograf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyTypograf"])(title);
        $[20] = title;
        $[21] = t10;
    } else {
        t10 = $[21];
    }
    let t11;
    if ($[22] !== t10) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardTitle} subtitle_1`,
            children: t10
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 204,
            columnNumber: 11
        }, this);
        $[22] = t10;
        $[23] = t11;
    } else {
        t11 = $[23];
    }
    let t12;
    if ($[24] !== description) {
        t12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$typograf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyTypograf"])(description);
        $[24] = description;
        $[25] = t12;
    } else {
        t12 = $[25];
    }
    let t13;
    if ($[26] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardDescription} subinfo`,
            children: t12
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 220,
            columnNumber: 11
        }, this);
        $[26] = t12;
        $[27] = t13;
    } else {
        t13 = $[27];
    }
    let t14;
    if ($[28] !== avatarSrc || $[29] !== userName) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: avatarSrc,
            alt: userName,
            width: 32,
            height: 32,
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].userAvatar
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 228,
            columnNumber: 11
        }, this);
        $[28] = avatarSrc;
        $[29] = userName;
        $[30] = t14;
    } else {
        t14 = $[30];
    }
    let t15;
    if ($[31] !== userName) {
        t15 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$typograf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyTypograf"])(userName);
        $[31] = userName;
        $[32] = t15;
    } else {
        t15 = $[32];
    }
    let t16;
    if ($[33] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].userName} subinfo`,
            children: t15
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 245,
            columnNumber: 11
        }, this);
        $[33] = t15;
        $[34] = t16;
    } else {
        t16 = $[34];
    }
    let t17;
    if ($[35] !== t14 || $[36] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].userRow,
            children: [
                t14,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 253,
            columnNumber: 11
        }, this);
        $[35] = t14;
        $[36] = t16;
        $[37] = t17;
    } else {
        t17 = $[37];
    }
    const t18 = liked ? "/icons/images/HeartFull.svg" : "/icons/images/Heart.svg";
    let t19;
    if ($[38] !== t18) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: t18,
            alt: "",
            width: 20,
            height: 20,
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].likesIcon
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 263,
            columnNumber: 11
        }, this);
        $[38] = t18;
        $[39] = t19;
    } else {
        t19 = $[39];
    }
    let t20;
    if ($[40] !== likes) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].likesCount,
            children: likes
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 271,
            columnNumber: 11
        }, this);
        $[40] = likes;
        $[41] = t20;
    } else {
        t20 = $[41];
    }
    let t21;
    if ($[42] !== handleLikeClick || $[43] !== liked || $[44] !== t19 || $[45] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].likesRow,
            onClick: handleLikeClick,
            "aria-pressed": liked,
            children: [
                t19,
                t20
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 279,
            columnNumber: 11
        }, this);
        $[42] = handleLikeClick;
        $[43] = liked;
        $[44] = t19;
        $[45] = t20;
        $[46] = t21;
    } else {
        t21 = $[46];
    }
    let t22;
    if ($[47] !== t17 || $[48] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardFooter,
            children: [
                t17,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 290,
            columnNumber: 11
        }, this);
        $[47] = t17;
        $[48] = t21;
        $[49] = t22;
    } else {
        t22 = $[49];
    }
    let t23;
    if ($[50] !== t11 || $[51] !== t13 || $[52] !== t22 || $[53] !== t8 || $[54] !== t9) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
            children: [
                t8,
                t9,
                t11,
                t13,
                t22
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 299,
            columnNumber: 11
        }, this);
        $[50] = t11;
        $[51] = t13;
        $[52] = t22;
        $[53] = t8;
        $[54] = t9;
        $[55] = t23;
    } else {
        t23 = $[55];
    }
    return t23;
}
_s(CheckPlanCard, "5oFMLl0KA2P+7Df5hTCAaQ+yYE8=");
_c1 = CheckPlanCard;
/* Трек с дубликатом для бесконечного цикла */ function _CheckPlanCardHandleLikeClickSetLiked(prev) {
    return !prev;
}
const trackCards = [
    ...COMMUNITY_CARDS,
    ...COMMUNITY_CARDS
];
const totalPositions = COMMUNITY_CARDS.length + 1;
const SWIPE_MIN_PX = 50;
const MOBILE_BREAKPOINT = 1200;
function OurCommunity() {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(75);
    if ($[0] !== "1538e9ddefaea36bd8dbf8dd7017db190947c852cff291d39f9fb6b83475298f") {
        for(let $i = 0; $i < 75; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1538e9ddefaea36bd8dbf8dd7017db190947c852cff291d39f9fb6b83475298f";
    }
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const isAuthenticated = typeof (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$auth$2d$storage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuth"])()?.user?.id !== "undefined";
    const [showLoginToLikePopup, setShowLoginToLikePopup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loginToLikeClosing, setLoginToLikeClosing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [carouselIndex, setCarouselIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [transitionTo, setTransitionTo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [entered, setEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [skipTransition, setSkipTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isJumpingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const touchStartX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = ({
            "OurCommunity[closeLoginToLikePopup]": ()=>{
                setLoginToLikeClosing(true);
                setTimeout({
                    "OurCommunity[closeLoginToLikePopup > setTimeout()]": ()=>{
                        setShowLoginToLikePopup(false);
                        setLoginToLikeClosing(false);
                    }
                }["OurCommunity[closeLoginToLikePopup > setTimeout()]"], 280);
            }
        })["OurCommunity[closeLoginToLikePopup]"];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const closeLoginToLikePopup = t0;
    let t1;
    if ($[2] !== router) {
        t1 = ({
            "OurCommunity[handleLoginFromPopup]": ()=>{
                setLoginToLikeClosing(true);
                setTimeout({
                    "OurCommunity[handleLoginFromPopup > setTimeout()]": ()=>{
                        setShowLoginToLikePopup(false);
                        setLoginToLikeClosing(false);
                        router.push("/login");
                    }
                }["OurCommunity[handleLoginFromPopup > setTimeout()]"], 280);
            }
        })["OurCommunity[handleLoginFromPopup]"];
        $[2] = router;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    const handleLoginFromPopup = t1;
    const fromIndex = carouselIndex;
    const toIndex = transitionTo;
    const isTransitioning = toIndex !== null;
    const isMobileView = _OurCommunityIsMobileView;
    let t2;
    let t3;
    if ($[4] !== isTransitioning) {
        t2 = ({
            "OurCommunity[useEffect()]": ()=>{
                if (!isTransitioning) {
                    return;
                }
                const raf = requestAnimationFrame({
                    "OurCommunity[useEffect() > requestAnimationFrame()]": ()=>setEntered(true)
                }["OurCommunity[useEffect() > requestAnimationFrame()]"]);
                return ()=>cancelAnimationFrame(raf);
            }
        })["OurCommunity[useEffect()]"];
        t3 = [
            isTransitioning
        ];
        $[4] = isTransitioning;
        $[5] = t2;
        $[6] = t3;
    } else {
        t2 = $[5];
        t3 = $[6];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    let t4;
    let t5;
    if ($[7] !== skipTransition) {
        t4 = ({
            "OurCommunity[useEffect()]": ()=>{
                if (!skipTransition) {
                    return;
                }
                const id = requestAnimationFrame({
                    "OurCommunity[useEffect() > requestAnimationFrame()]": ()=>{
                        setSkipTransition(false);
                        if (isJumpingRef.current) {
                            isJumpingRef.current = false;
                            setTransitionTo(totalPositions - 2);
                        }
                    }
                }["OurCommunity[useEffect() > requestAnimationFrame()]"]);
                return ()=>cancelAnimationFrame(id);
            }
        })["OurCommunity[useEffect()]"];
        t5 = [
            skipTransition
        ];
        $[7] = skipTransition;
        $[8] = t4;
        $[9] = t5;
    } else {
        t4 = $[8];
        t5 = $[9];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t4, t5);
    let t6;
    if ($[10] !== toIndex) {
        t6 = ({
            "OurCommunity[handleTransitionEnd]": (e)=>{
                if (e.propertyName !== "transform" || toIndex === null) {
                    return;
                }
                const resetToStart = toIndex === totalPositions - 1;
                if (resetToStart) {
                    setSkipTransition(true);
                }
                setCarouselIndex(resetToStart ? 0 : toIndex);
                setTransitionTo(null);
                setEntered(false);
            }
        })["OurCommunity[handleTransitionEnd]"];
        $[10] = toIndex;
        $[11] = t6;
    } else {
        t6 = $[11];
    }
    const handleTransitionEnd = t6;
    let t7;
    if ($[12] !== carouselIndex || $[13] !== isTransitioning) {
        t7 = ({
            "OurCommunity[goPrev]": ()=>{
                if (isTransitioning) {
                    return;
                }
                if (carouselIndex > 0) {
                    setTransitionTo(carouselIndex - 1);
                    return;
                }
                setSkipTransition(true);
                setCarouselIndex(totalPositions - 1);
                isJumpingRef.current = true;
            }
        })["OurCommunity[goPrev]"];
        $[12] = carouselIndex;
        $[13] = isTransitioning;
        $[14] = t7;
    } else {
        t7 = $[14];
    }
    const goPrev = t7;
    let t8;
    if ($[15] !== carouselIndex || $[16] !== isTransitioning) {
        t8 = ({
            "OurCommunity[goNext]": ()=>{
                if (isTransitioning || carouselIndex >= totalPositions - 1) {
                    return;
                }
                setTransitionTo(carouselIndex + 1);
            }
        })["OurCommunity[goNext]"];
        $[15] = carouselIndex;
        $[16] = isTransitioning;
        $[17] = t8;
    } else {
        t8 = $[17];
    }
    const goNext = t8;
    let t9;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = ({
            "OurCommunity[handleSwipeStart]": (e_0)=>{
                if (!isMobileView()) {
                    return;
                }
                touchStartX.current = e_0.touches[0].clientX;
            }
        })["OurCommunity[handleSwipeStart]"];
        $[18] = t9;
    } else {
        t9 = $[18];
    }
    const handleSwipeStart = t9;
    let t10;
    if ($[19] !== goNext || $[20] !== goPrev) {
        t10 = ({
            "OurCommunity[handleSwipeEnd]": (e_1)=>{
                if (!isMobileView() || touchStartX.current === null) {
                    return;
                }
                const endX = e_1.changedTouches[0].clientX;
                const deltaX = endX - touchStartX.current;
                touchStartX.current = null;
                if (deltaX < -SWIPE_MIN_PX) {
                    goNext();
                } else {
                    if (deltaX > SWIPE_MIN_PX) {
                        goPrev();
                    }
                }
            }
        })["OurCommunity[handleSwipeEnd]"];
        $[19] = goNext;
        $[20] = goPrev;
        $[21] = t10;
    } else {
        t10 = $[21];
    }
    const handleSwipeEnd = t10;
    let t11;
    if ($[22] !== carouselIndex || $[23] !== entered || $[24] !== fromIndex || $[25] !== isTransitioning || $[26] !== toIndex) {
        t11 = ({
            "OurCommunity[getCardTransform]": (i)=>{
                if (!isTransitioning) {
                    return `translateX(${(i - carouselIndex) * 100}%)`;
                }
                const from = fromIndex;
                const to = toIndex;
                if (i === from) {
                    return entered ? `translateX(${from < to ? -100 : 100}%)` : "translateX(0)";
                }
                if (i === to) {
                    return entered ? "translateX(0)" : `translateX(${to > from ? 100 : -100}%)`;
                }
                return `translateX(${(i - carouselIndex) * 100}%)`;
            }
        })["OurCommunity[getCardTransform]"];
        $[22] = carouselIndex;
        $[23] = entered;
        $[24] = fromIndex;
        $[25] = isTransitioning;
        $[26] = toIndex;
        $[27] = t11;
    } else {
        t11 = $[27];
    }
    const getCardTransform = t11;
    let t12;
    if ($[28] !== carouselIndex || $[29] !== fromIndex || $[30] !== isTransitioning || $[31] !== toIndex) {
        t12 = ({
            "OurCommunity[getCardZIndex]": (i_0)=>{
                if (!isTransitioning) {
                    return i_0 === carouselIndex ? 1 : 0;
                }
                if (i_0 === toIndex) {
                    return 2;
                }
                if (i_0 === fromIndex) {
                    return 1;
                }
                return 0;
            }
        })["OurCommunity[getCardZIndex]"];
        $[28] = carouselIndex;
        $[29] = fromIndex;
        $[30] = isTransitioning;
        $[31] = toIndex;
        $[32] = t12;
    } else {
        t12 = $[32];
    }
    const getCardZIndex = t12;
    let t13;
    if ($[33] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].leftTop,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title} title_1`,
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$typograf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyTypograf"])("\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0434\u043B\u044F \u0441\u0435\u0431\u044F \u043D\u0430\u0448\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u043E")
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
                lineNumber: 590,
                columnNumber: 43
            }, this)
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 590,
            columnNumber: 11
        }, this);
        $[33] = t13;
    } else {
        t13 = $[33];
    }
    let t14;
    if ($[34] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].description} paragraph`,
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$typograf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyTypograf"])("\u041D\u0430\u043C \u043D\u0440\u0430\u0432\u0438\u0442\u0441\u044F \u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F \u043E\u043F\u044B\u0442\u043E\u043C \u0441 \u0434\u0440\u0443\u0433 \u0434\u0440\u0443\u0433\u043E\u043C, \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u0443\u0439\u0442\u0435 \u0441\u0432\u043E\u0439 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0447\u0435\u043A-\u043F\u043B\u0430\u043D, \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E, \u043E\u043D \u043A\u043E\u043C\u0443-\u0442\u043E \u043F\u0440\u0438\u0433\u043E\u0434\u0438\u0442\u0441\u044F")
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 597,
            columnNumber: 11
        }, this);
        $[34] = t14;
    } else {
        t14 = $[34];
    }
    let t15;
    if ($[35] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$typograf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyTypograf"])("\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C, \u0447\u0435\u043C \u043F\u043E\u0434\u0435\u043B\u0438\u043B\u0438\u0441\u044C \u0434\u0440\u0443\u0433\u0438\u0435");
        $[35] = t15;
    } else {
        t15 = $[35];
    }
    let t16;
    if ($[36] !== router) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].left,
            children: [
                t13,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].leftBottom,
                    children: [
                        t14,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buttonWrapper,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2f$buttons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                color: "blue",
                                Text: t15,
                                onClick: {
                                    "OurCommunity[<Button>.onClick]": ()=>router.push("/check-plans")
                                }["OurCommunity[<Button>.onClick]"]
                            }, void 0, false, {
                                fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
                                lineNumber: 611,
                                columnNumber: 123
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
                            lineNumber: 611,
                            columnNumber: 85
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
                    lineNumber: 611,
                    columnNumber: 45
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 611,
            columnNumber: 11
        }, this);
        $[36] = router;
        $[37] = t16;
    } else {
        t16 = $[37];
    }
    let t17;
    if ($[38] === Symbol.for("react.memo_cache_sentinel")) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].right,
            children: COMMUNITY_CARDS.map({
                "OurCommunity[COMMUNITY_CARDS.map()]": (card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckPlanCard, {
                        ...card,
                        isAuthenticated: isAuthenticated,
                        onRequestLogin: {
                            "OurCommunity[COMMUNITY_CARDS.map() > <CheckPlanCard>.onRequestLogin]": ()=>setShowLoginToLikePopup(true)
                        }["OurCommunity[COMMUNITY_CARDS.map() > <CheckPlanCard>.onRequestLogin]"]
                    }, card.title, false, {
                        fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
                        lineNumber: 622,
                        columnNumber: 56
                    }, this)
            }["OurCommunity[COMMUNITY_CARDS.map()]"])
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 621,
            columnNumber: 11
        }, this);
        $[38] = t17;
    } else {
        t17 = $[38];
    }
    const t18 = `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardsStack} ${skipTransition ? __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardsStackNoTransition : ""}`;
    let t19;
    if ($[39] !== getCardTransform || $[40] !== getCardZIndex || $[41] !== handleTransitionEnd || $[42] !== isTransitioning || $[43] !== toIndex) {
        t19 = trackCards.map({
            "OurCommunity[trackCards.map()]": (card_0, i_1)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardSlide,
                    style: {
                        transform: getCardTransform(i_1),
                        zIndex: getCardZIndex(i_1)
                    },
                    onTransitionEnd: isTransitioning && i_1 === toIndex ? handleTransitionEnd : undefined,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckPlanCard, {
                        ...card_0,
                        isAuthenticated: isAuthenticated,
                        onRequestLogin: {
                            "OurCommunity[trackCards.map() > <CheckPlanCard>.onRequestLogin]": ()=>setShowLoginToLikePopup(true)
                        }["OurCommunity[trackCards.map() > <CheckPlanCard>.onRequestLogin]"]
                    }, void 0, false, {
                        fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
                        lineNumber: 637,
                        columnNumber: 97
                    }, this)
                }, `${card_0.title}-${i_1}`, false, {
                    fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
                    lineNumber: 634,
                    columnNumber: 58
                }, this)
        }["OurCommunity[trackCards.map()]"]);
        $[39] = getCardTransform;
        $[40] = getCardZIndex;
        $[41] = handleTransitionEnd;
        $[42] = isTransitioning;
        $[43] = toIndex;
        $[44] = t19;
    } else {
        t19 = $[44];
    }
    let t20;
    if ($[45] !== t18 || $[46] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t18,
            children: t19
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 652,
            columnNumber: 11
        }, this);
        $[45] = t18;
        $[46] = t19;
        $[47] = t20;
    } else {
        t20 = $[47];
    }
    let t21;
    if ($[48] !== handleSwipeEnd || $[49] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardsSlider,
            onTouchStart: handleSwipeStart,
            onTouchEnd: handleSwipeEnd,
            role: "region",
            "aria-label": "\u041A\u0430\u0440\u0443\u0441\u0435\u043B\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430",
            children: t20
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 661,
            columnNumber: 11
        }, this);
        $[48] = handleSwipeEnd;
        $[49] = t20;
        $[50] = t21;
    } else {
        t21 = $[50];
    }
    let t22;
    if ($[51] === Symbol.for("react.memo_cache_sentinel")) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: "/icons/system/ArrowLeft.svg",
            alt: "",
            width: 20,
            height: 20
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 670,
            columnNumber: 11
        }, this);
        $[51] = t22;
    } else {
        t22 = $[51];
    }
    let t23;
    if ($[52] !== goPrev || $[53] !== isTransitioning) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2d$round$2f$buttons$2d$round$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            variant: "white",
            icon: t22,
            onClick: goPrev,
            "aria-label": "\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0430\u044F \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430",
            disabled: isTransitioning
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 677,
            columnNumber: 11
        }, this);
        $[52] = goPrev;
        $[53] = isTransitioning;
        $[54] = t23;
    } else {
        t23 = $[54];
    }
    let t24;
    if ($[55] === Symbol.for("react.memo_cache_sentinel")) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: "/icons/system/ArrowRight.svg",
            alt: "",
            width: 20,
            height: 20
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 686,
            columnNumber: 11
        }, this);
        $[55] = t24;
    } else {
        t24 = $[55];
    }
    let t25;
    if ($[56] !== goNext || $[57] !== isTransitioning) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2d$round$2f$buttons$2d$round$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            variant: "white",
            icon: t24,
            onClick: goNext,
            "aria-label": "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430",
            disabled: isTransitioning
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 693,
            columnNumber: 11
        }, this);
        $[56] = goNext;
        $[57] = isTransitioning;
        $[58] = t25;
    } else {
        t25 = $[58];
    }
    let t26;
    if ($[59] !== t23 || $[60] !== t25) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].carouselNav,
            children: [
                t23,
                t25
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 702,
            columnNumber: 11
        }, this);
        $[59] = t23;
        $[60] = t25;
        $[61] = t26;
    } else {
        t26 = $[61];
    }
    let t27;
    if ($[62] !== t21 || $[63] !== t26) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].rightMobile,
            children: [
                t21,
                t26
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 711,
            columnNumber: 11
        }, this);
        $[62] = t21;
        $[63] = t26;
        $[64] = t27;
    } else {
        t27 = $[64];
    }
    let t28;
    if ($[65] !== t16 || $[66] !== t27) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].wrapper,
            children: [
                t16,
                t17,
                t27
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 720,
            columnNumber: 11
        }, this);
        $[65] = t16;
        $[66] = t27;
        $[67] = t28;
    } else {
        t28 = $[67];
    }
    let t29;
    if ($[68] !== handleLoginFromPopup || $[69] !== loginToLikeClosing || $[70] !== showLoginToLikePopup) {
        t29 = typeof document !== "undefined" && showLoginToLikePopup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoginToLikePopup, {
            isClosing: loginToLikeClosing,
            onClose: closeLoginToLikePopup,
            onLogin: handleLoginFromPopup
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 729,
            columnNumber: 83
        }, this), document.body);
        $[68] = handleLoginFromPopup;
        $[69] = loginToLikeClosing;
        $[70] = showLoginToLikePopup;
        $[71] = t29;
    } else {
        t29 = $[71];
    }
    let t30;
    if ($[72] !== t28 || $[73] !== t29) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].outerWrapper,
            children: [
                t28,
                t29
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx",
            lineNumber: 739,
            columnNumber: 11
        }, this);
        $[72] = t28;
        $[73] = t29;
        $[74] = t30;
    } else {
        t30 = $[74];
    }
    return t30;
}
_s1(OurCommunity, "XrtMRFqmRKjZMAbJAd4W0ApAiJc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c2 = OurCommunity;
function _OurCommunityIsMobileView() {
    return ("TURBOPACK compile-time value", "object") !== "undefined" && window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches;
}
function _LoginToLikePopupDivOnClick(e) {
    return e.stopPropagation();
}
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "LoginToLikePopup");
__turbopack_context__.k.register(_c1, "CheckPlanCard");
__turbopack_context__.k.register(_c2, "OurCommunity");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/setly.front/src/data/articles-data.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Данные статей. Структура подстроена под шаблон страницы статьи.
 * Можно заменить источник на JSON — все поля должны быть переданы в статье.
 */ /** Формат блока ШАГ 1: массив пунктов, у каждого — подзаголовок и массив буллетов */ /** Формат блока ШАГ 2: массив шагов с заголовком и текстом */ /** image2/image2Caption можно не задавать — второй блок с картинкой не выведется */ __turbopack_context__.s([
    "ARTICLES_LIST",
    ()=>ARTICLES_LIST,
    "getArticleById",
    ()=>getArticleById,
    "getArticleIds",
    ()=>getArticleIds
]);
const ARTICLES_LIST = [
    {
        id: 1,
        imageSrc: '/img/main/suit-case-2.png',
        imageAlt: 'Чемодан',
        title: 'Как собраться в поездку за 15 минут',
        description: 'Не обязательно брать все подряд, чтобы быть готовым ко всему',
        readTime: '8 минут'
    },
    {
        id: 2,
        imageSrc: '/img/main/question-sign.png',
        imageAlt: 'Вопрос',
        title: 'Почему вы всё ещё забываете вещи',
        description: 'Разбираемся, как перестать это делать и систематизировать свой опыт',
        readTime: '5 минут'
    },
    {
        id: 3,
        imageSrc: '/img/main/med-kit.png',
        imageAlt: 'Аптечка',
        title: 'Собираем универсальную дорожную аптечку',
        description: 'Собираем базовый минимум, чтобы исключить рискованный максимум',
        readTime: '5 минут'
    },
    {
        id: 4,
        imageSrc: '/img/main/post4.png',
        imageAlt: 'Подготовка к поездке',
        title: 'Если вы не любите планировать',
        description: 'Покажем, как создать чек-план за 3 минуты, не обязательно заполнять с нуля',
        readTime: '5 минут'
    },
    {
        id: 5,
        imageSrc: '/img/main/post5.png',
        imageAlt: 'Распечатанные документы',
        title: 'Зачем брать распечатанные документы',
        description: 'Даже если есть копии на почте. Покажем, как компактно хранить',
        readTime: '5 минут'
    },
    {
        id: 6,
        imageSrc: '/img/main/post6.png',
        imageAlt: '5 универсальных вещей',
        title: '5 универсальных вещей для каждой поездки',
        description: 'Они спасли многих в 90% поездок — от Тбилиси до Токио',
        readTime: '5 минут'
    }
];
const ARTICLES_FULL = {
    1: {
        title: 'Как собраться в поездку за 15 минут',
        description: 'Не обязательно брать все подряд, чтобы быть готовым ко всему',
        readTime: '8 минут',
        heroImage: '/img/main/suit-case-2.png',
        publishedDate: '11.12.2025',
        preamble: 'Многие тратят на сборы часы, а в итоге все равно что‑то забывают. Парадокс в том, что проблема — не в количестве времени, а в неэффективном процессе. Долгие сборы часто означают не тщательность, а нерешительность. Вот пошаговая система, которая позволит вам собираться быстро и без ошибок.',
        image1: '/img/main/article1.png',
        image2: '/img/main/article2.png',
        image1Caption: 'Источник: unsplash.com',
        image2Caption: 'Источник: unsplash.com',
        step1Title: 'ШАГ 1: Подготовка',
        step1Intro: 'Успешные быстрые сборы начинаются задолго до самой поездки',
        step1Items: [
            {
                subtitle: 'Создайте свой универсальный чек-лист. Возьмите за основу категории:',
                bullets: [
                    'Документы: Паспорт, права, страховка, банковские карты, распечатанные билеты и брони',
                    'Деньги: Наличная валюта страны назначения и про запас',
                    'Электроника: Смартфон, зарядные устройства, power bank, переходники для розеток, наушники',
                    'Гигиена: Зубная щётка и паста, расчёска, дезодорант, бритва',
                    'Аптечка: Базовый набор',
                    'Из разного: Солнцезащитные очки, ключи'
                ]
            },
            {
                subtitle: 'Сформируйте «капсулы» для разных типов поездок. Разделите одежду не по вещам, а по сценариям:',
                bullets: [
                    'Городская капсула: Удобная обувь, 1–2 пары джинсов/брюк, базовые футболки/рубашки, ветровка/куртка по сезону',
                    'Пляжная капсула: Купальник/плавки, шлепанцы, головной убор, крем от загара',
                    'Деловая капсула: Костюм, пара рубашек, классические туфли'
                ]
            }
        ],
        step1Outro: 'Держите эти «капсулы» мысленно или в заметках. Чтобы собраться, вам останется лишь выбрать нужные.',
        step2Title: 'ШАГ 2: АЛГОРИТМ СБОРОК',
        step2Intro: 'Теперь сам процесс. Действуйте строго по порядку!',
        step2Steps: [
            {
                title: 'Без чего поездка невозможна',
                text: 'Положите в чемодан или рюкзак папку с документами, кошелёк и телефон с зарядкой. Это основа. Без этого вы никуда не поедете.'
            },
            {
                title: 'Основной наполнитель',
                text: 'Руководствуясь своим чек-листом и выбранными «капсулами», сложите всю одежду и обувь. Не примеряйте, не перебирайте — просто берите готовое. Сверху положите косметичку и аптечку.'
            },
            {
                title: 'Финальная проверка электроники',
                text: 'Осмотрите комнату на предмет оставшихся гаджетов. Проверьте, все ли кабели и power bank на месте. Это самый часто забываемый пункт.'
            },
            {
                title: 'Контрольный прогон и закрытие',
                text: 'Пробегитесь глазами по чек-листу. Особое внимание — на паспорт, билеты и ключи от дома. Закройте чемодан.'
            }
        ],
        keyPrinciple: 'Сборы — это не творческий процесс, а следование алгоритму. Когда у вас есть заранее подготовленная система, вы не тратите время на принятие решений. Вы просто выполняете пункты, что и занимает так мало времени.'
    },
    2: {
        title: 'Почему вы всё ещё забываете вещи',
        description: 'Разбираемся, как перестать это делать и систематизировать свой опыт',
        readTime: '5 минут',
        heroImage: '/img/main/question-sign.png',
        publishedDate: '15.12.2025',
        preamble: 'Забытые зарядки, документы и нужные мелочи — не признак рассеянности, а следствие того, что сборы не стали системой. Пока вы каждый раз «вспоминаете» список в голове, что‑то неизбежно выпадет. Ниже — почему так происходит и как зафиксировать опыт раз и навсегда.',
        image1: '/img/main/post7.png',
        image1Caption: 'Источник: unsplash.com',
        step1Title: 'ШАГ 1: Почему списки в голове не работают',
        step1Intro: 'Мозг плохо удерживает длинные однотипные списки, особенно в стрессе перед поездкой.',
        step1Items: [
            {
                subtitle: 'Когнитивная перегрузка:',
                bullets: [
                    'Чем больше пунктов вы держите в уме, тем выше шанс что‑то упустить.',
                    'Сборы — это десятки категорий: документы, одежда, гигиена, техника, медикаменты.',
                    'Фиксируя список на бумаге или в приложении, вы разгружаете память и снижаете стресс.'
                ]
            },
            {
                subtitle: 'Нет единого шаблона:',
                bullets: [
                    'Каждая поездка — новый список с нуля.',
                    'Система появляется, когда у вас есть базовый чек-лист, который вы только дополняете под тип поездки (пляж, город, командировка).'
                ]
            }
        ],
        step1Outro: 'Сделайте один раз полный список того, что вам реально нужно в поездках, и дальше только корректируйте его под конкретную поездку.',
        step2Title: 'ШАГ 2: Как систематизировать опыт',
        step2Intro: 'Превратите «я опять забыл» в «у меня есть чек-лист, где это уже учтено».',
        step2Steps: [
            {
                title: 'Запишите всё, что когда‑либо забывали',
                text: 'После каждой поездки добавляйте в общий список то, чего не хватило. Со временем список станет вашим персональным стандартом.'
            },
            {
                title: 'Разделите список на категории',
                text: 'Документы, деньги, техника, гигиена, одежда, аптечка, прочее. Так проще ничего не пропустить и быстро проверять перед выездом.'
            },
            {
                title: 'Используйте один носитель',
                text: 'Блокнот, заметки или приложение с чек-листами — не важно. Важно, чтобы все поездки планировались из одного места, а не из головы.'
            }
        ],
        keyPrinciple: 'Забывать вещи — не про характер, а про отсутствие системы. Один раз оформите свой опыт в чек-лист и пользуйтесь им перед каждой поездкой — тогда «забыл» перестанет повторяться.'
    },
    3: {
        title: 'Как собрать универсальную дорожную аптечку',
        description: 'Собираем базовый минимум, чтобы исключить рискованный максимум',
        readTime: '5 минут',
        heroImage: '/img/main/med-kit.png',
        publishedDate: '18.12.2025',
        preamble: 'Универсальная аптечка — не про то, чтобы тащить полдома, а про то, чтобы закрыть типичные ситуации: простуда, желудок, аллергия, мелкие травмы. Ниже — что включить в базовый набор и как его хранить в поездке.',
        image1: '/img/main/post8.png',
        image1Caption: 'Источник: unsplash.com',
        step1Title: 'ШАГ 1: Базовый набор',
        step1Intro: 'Эти препараты покрывают большинство непредвиденных ситуаций в поездках.',
        step1Items: [
            {
                subtitle: 'От простуды и боли:',
                bullets: [
                    'Жаропонижающее и обезболивающее (парацетамол или ибупрофен).',
                    'Спрей или пастилки от боли в горле.',
                    'Сосудосуживающие капли в нос.'
                ]
            },
            {
                subtitle: 'Желудок и кишечник:',
                bullets: [
                    'Средство при отравлении и расстройстве желудка (сорбент).',
                    'Средство от изжоги.',
                    'При склонности к запорам — мягкое слабительное.'
                ]
            },
            {
                subtitle: 'Аллергия и кожа:',
                bullets: [
                    'Антигистаминное (таблетки или капли).',
                    'Крем от зуда и укусов.',
                    'Пластыри, бинт, антисептик для мелких порезов и ссадин.'
                ]
            }
        ],
        step1Outro: 'Добавьте к базе личные препараты, которые вы пьёте по назначению врача, и при поездке в экзотические страны — то, что порекомендует инфекционист или терапевт.',
        step2Title: 'ШАГ 2: Как хранить и не забыть',
        step2Intro: 'Аптечка должна быть компактной и всегда в одном месте.',
        step2Steps: [
            {
                title: 'Один контейнер на всё',
                text: 'Используйте непромокаемую косметичку или пластиковый бокс. Так ничего не рассыплется и не потеряется в чемодане.'
            },
            {
                title: 'Инструкции и сроки',
                text: 'Оставьте вкладыши или выпишите дозировки и срок годности на стикере. В стрессе легко перепутать или дать неправильную дозу.'
            },
            {
                title: 'Добавьте аптечку в чек-лист поездки',
                text: 'Перед выездом проверьте наличие и сроки. Раз в полгода обновляйте базовый набор и личные лекарства.'
            }
        ],
        keyPrinciple: 'Универсальная аптечка — это не «на всякий случай всё подряд», а минимальный и продуманный набор под типичные ситуации. Меньше вещей — проще не забыть и вовремя воспользоваться.'
    },
    4: {
        title: 'Подготовка к поездке, если вы не любите планировать',
        description: 'Не обязательно подробно планировать — покажем, как создать чек-план за 3 минуты',
        readTime: '5 минут',
        heroImage: '/img/main/post4.png',
        publishedDate: '20.12.2025',
        preamble: 'Подробные планы — не для всех. Но даже минимальная подготовка снижает стресс и уменьшает шанс что‑то забыть. Ниже — как за пару минут сделать простой чек-лист поездки без лишней детализации.',
        image1: '/img/main/post10.png',
        image1Caption: 'Источник: unsplash.com',
        step1Title: 'ШАГ 1: Минимум за 3 минуты',
        step1Intro: 'Три блока, которые стоит зафиксировать перед любой поездкой.',
        step1Items: [
            {
                subtitle: 'Документы и деньги:',
                bullets: [
                    'Паспорт, права (если нужны), страховка, банковские карты.',
                    'Распечатанные или сохранённые в телефон билеты и брони.',
                    'Наличная валюта страны назначения или карта с бесплатным снятием.'
                ]
            },
            {
                subtitle: 'Техника и связь:',
                bullets: [
                    'Телефон, зарядка, при необходимости — power bank и переходник для розеток.',
                    'Проверьте, что роуминг или местная SIM настроены, если планируете звонить и пользоваться интернетом.'
                ]
            },
            {
                subtitle: 'Вещи под тип поездки:',
                bullets: [
                    'Одежда и обувь по погоде и программе (город, пляж, работа).',
                    'Гигиена и аптечка — базовый набор, плюс личные лекарства.'
                ]
            }
        ],
        step1Outro: 'Не нужно расписывать каждый день. Достаточно списка «что взять» и «что проверить перед выездом». Остальное можно решать по месту.',
        step2Title: 'ШАГ 2: Как не усложнять',
        step2Intro: 'Чек-лист должен помогать, а не отнимать время.',
        step2Steps: [
            {
                title: 'Один шаблон на все поездки',
                text: 'Сделайте один раз универсальный список (документы, деньги, техника, гигиена, одежда). Для каждой поездки копируйте его и вычёркивайте лишнее или добавляйте специфичное.'
            },
            {
                title: 'Проверка в последний вечер',
                text: 'Перед сном пройдитесь по списку и отметьте, что уже сложено. Утром останется только закрыть чемодан и проверить документы.'
            }
        ],
        keyPrinciple: 'Подготовка к поездке не обязана быть детальной. Короткий чек-лист на 3 минуты уже снижает забывчивость и стресс — без жёсткого планирования каждого дня.'
    },
    5: {
        title: 'Зачем брать распечатанные документы?',
        description: 'Да, даже если у вас есть копии на почте. И ещё расскажем, как компактно хранить',
        readTime: '5 минут',
        heroImage: '/img/main/post5.png',
        publishedDate: '22.12.2025',
        preamble: 'Телефон может разрядиться, интернет — пропасть, а сотрудник на границе или в отеле может попросить бумагу. Распечатанные копии документов и броней не занимают много места, но сильно подстраховывают. Ниже — что именно печатать и как хранить.',
        image1: '/img/main/post9.png',
        image1Caption: 'Источник: unsplash.com',
        step1Title: 'ШАГ 1: Что стоит распечатать',
        step1Intro: 'Минимум, который имеет смысл иметь на бумаге.',
        step1Items: [
            {
                subtitle: 'Обязательно:',
                bullets: [
                    'Копия паспорта (разворот с фото и пропиской).',
                    'Билеты (авиа, ж/д, автобус) — если не уверены в стабильном доступе к почте и приложениям.',
                    'Подтверждения брони отелей и аренды авто.'
                ]
            },
            {
                subtitle: 'По ситуации:',
                bullets: [
                    'Страховка — полис или выписка с ключевыми данными и контактами страховой.',
                    'Маршрут и адреса — если поездка сложная или без стабильного интернета.',
                    'Виза или приглашение — если их требуют показывать в распечатанном виде.'
                ]
            }
        ],
        step1Outro: 'Храните распечатки в одной папке или файле: так проще достать при проверке и не потерять листы.',
        step2Title: 'ШАГ 2: Как хранить компактно',
        step2Intro: 'Один конверт или тонкая папка — и всё под рукой.',
        step2Steps: [
            {
                title: 'Одна папка на все поездки',
                text: 'Используйте тонкую папку-конверт или файл с вкладками. Сложите документы в порядке: паспорт (копия), билеты, брони, страховка. Подпишите разделы, чтобы быстро найти нужное.'
            },
            {
                title: 'Не кладите оригинал паспорта в чемодан',
                text: 'Оригинал паспорта — при себе (в сумке или кармане). В папке только копии и распечатки броней и билетов. Так вы не потеряете удостоверение личности при потере багажа.'
            }
        ],
        keyPrinciple: 'Распечатанные документы — не пережиток, а страховка на случай проблем с техникой или связью. Компактная папка с копиями и бронями не мешает, но сильно выручает в непредвиденных ситуациях.'
    },
    6: {
        title: '5 универсальных вещей для каждой поездки',
        description: 'Они спасли многих в 90% поездок — от Тбилиси до Токио',
        readTime: '5 минут',
        heroImage: '/img/main/post6.png',
        publishedDate: '25.12.2025',
        preamble: 'Есть вещи, которые пригодятся и в командировке, и в отпуске, и в походе. Ниже — пять универсальных пунктов, которые стоит всегда держать в базовом списке сборов.',
        image1: '/img/main/post11.png',
        image1Caption: 'Источник: unsplash.com',
        step1Title: 'ШАГ 1: Пять вещей, которые не помешают никогда',
        step1Intro: 'Добавьте их в свой чек-лист — они закрывают типичные проблемы в поездках.',
        step1Items: [
            {
                subtitle: 'Универсальный переходник и зарядка',
                bullets: [
                    'Один компактный переходник под разные розетки и одна надёжная зарядка (или мультизарядка) избавляют от «села телефон в чужой стране».'
                ]
            },
            {
                subtitle: 'Power bank',
                bullets: [
                    'Небольшая портативная батарея выручает в дороге, при долгих переездах и когда розеток нет. Выбирайте ёмкость под 1–2 полные зарядки телефона.'
                ]
            },
            {
                subtitle: 'Небольшая аптечка и гигиена',
                bullets: [
                    'Обезболивающее, сорбент, антигистаминное, пластырь, антисептик. Плюс базовое: зубная щётка, расчёска, дезодорант. Этого достаточно для большинства поездок.'
                ]
            },
            {
                subtitle: 'Копии документов и броней на бумаге',
                bullets: [
                    'Распечатанные копии паспорта, билетов и броней не зависят от батареи и интернета. Одна папка — и вы подстрахованы.'
                ]
            },
            {
                subtitle: 'Удобная обувь и слой «на погоду»',
                bullets: [
                    'Одна пара удобной обуви, в которой можно много ходить, и один слой на случай холода или дождя (лёгкая куртка, ветровка, шарф).'
                ]
            }
        ],
        step1Outro: 'Эти пять пунктов не заменяют полный список под вашу поездку, но задают надёжный минимум, от которого можно отталкиваться в любом направлении.',
        step2Title: 'ШАГ 2: Как вписать их в сборы',
        step2Intro: 'Сделайте их постоянным блоком в чек-листе — тогда не придётся каждый раз вспоминать.',
        step2Steps: [
            {
                title: 'Зафиксируйте в одном чек-листе',
                text: 'Создайте в приложении или блокноте раздел «Базовый минимум» и всегда включайте в него эти пять пунктов. Для каждой поездки копируйте список и добавляйте специфичное (пляж, горы, офис).'
            },
            {
                title: 'Проверяйте перед каждой поездкой',
                text: 'Перезаряд power bank, срок годности лекарств, актуальность распечаток — раз в поездку пробегитесь по базовому списку и обновите то, что устарело.'
            }
        ],
        keyPrinciple: 'Пять универсальных вещей не решают всё за вас, но закрывают большинство типичных проблем в поездках. Один раз внесите их в чек-лист — и сборы станут проще и предсказуемее.'
    }
};
function getArticleById(id) {
    const numId = Number(id);
    if (!Number.isInteger(numId) || numId < 1) return null;
    return ARTICLES_FULL[numId] || null;
}
function getArticleIds() {
    return ARTICLES_LIST.map((a)=>a.id);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "card": "our-experience-module__5Be3lq__card",
  "cardDescription": "our-experience-module__5Be3lq__cardDescription" + " " + "subinfo",
  "cardImage": "our-experience-module__5Be3lq__cardImage",
  "cardImageLabel": "our-experience-module__5Be3lq__cardImageLabel" + " " + "label",
  "cardImageWrap": "our-experience-module__5Be3lq__cardImageWrap",
  "cardLink": "our-experience-module__5Be3lq__cardLink",
  "cardSlide": "our-experience-module__5Be3lq__cardSlide",
  "cardTitle": "our-experience-module__5Be3lq__cardTitle" + " " + "subtitle_1",
  "cardsSlider": "our-experience-module__5Be3lq__cardsSlider",
  "cardsSliderViewport": "our-experience-module__5Be3lq__cardsSliderViewport",
  "cardsTrack": "our-experience-module__5Be3lq__cardsTrack",
  "cardsTrackNoTransition": "our-experience-module__5Be3lq__cardsTrackNoTransition",
  "carouselBlock": "our-experience-module__5Be3lq__carouselBlock",
  "carouselNav": "our-experience-module__5Be3lq__carouselNav",
  "tag": "our-experience-module__5Be3lq__tag" + " " + "label",
  "tagIcon": "our-experience-module__5Be3lq__tagIcon",
  "tags": "our-experience-module__5Be3lq__tags",
  "title": "our-experience-module__5Be3lq__title" + " " + "title_1",
  "wrapper": "our-experience-module__5Be3lq__wrapper",
});
}),
"[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OurExperience
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2d$round$2f$buttons$2d$round$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/atomic/atoms/buttons-round/buttons-round.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$data$2f$articles$2d$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/data/articles-data.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$typograf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/lib/typograf.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$experience$2f$our$2d$experience$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
const CARD_GAP_PX = 20;
const MIN_CARD_WIDTH_PX = 280;
const MAX_CARD_WIDTH_PX = 335;
const EXPERIENCE_CARDS = __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$data$2f$articles$2d$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ARTICLES_LIST"].map(_c = (article)=>({
        id: article.id,
        imageSrc: article.imageSrc,
        imageAlt: article.imageAlt,
        title: article.title,
        description: article.description,
        readTime: article.readTime
    }));
_c1 = EXPERIENCE_CARDS;
/**
 * Сначала подбираем ширину карточки в [280, 335], затем число колонок:
 * 3 колонки, если в слоте ≥ 280px; иначе 2 при ≥ 280; иначе 1.
 * Между карточками всегда ровно CARD_GAP_PX. Ряд короче viewport — центрируем через centerOffset.
 */ function computeCarouselLayout(viewportWidth) {
    const W = viewportWidth;
    if (W <= 0) {
        return {
            visibleCount: 1,
            cardWidth: MIN_CARD_WIDTH_PX,
            centerOffset: 0
        };
    }
    const raw3 = (W - 2 * CARD_GAP_PX) / 3;
    if (raw3 >= MIN_CARD_WIDTH_PX) {
        const cardWidth = Math.min(MAX_CARD_WIDTH_PX, raw3);
        const rowWidth = 3 * cardWidth + 2 * CARD_GAP_PX;
        const centerOffset = Math.max(0, (W - rowWidth) / 2);
        return {
            visibleCount: 3,
            cardWidth,
            centerOffset
        };
    }
    const raw2 = (W - CARD_GAP_PX) / 2;
    if (raw2 >= MIN_CARD_WIDTH_PX) {
        const cardWidth = Math.min(MAX_CARD_WIDTH_PX, raw2);
        const rowWidth = 2 * cardWidth + CARD_GAP_PX;
        const centerOffset = Math.max(0, (W - rowWidth) / 2);
        return {
            visibleCount: 2,
            cardWidth,
            centerOffset
        };
    }
    const cardWidth = Math.min(MAX_CARD_WIDTH_PX, Math.max(MIN_CARD_WIDTH_PX, W));
    const centerOffset = Math.max(0, (W - cardWidth) / 2);
    return {
        visibleCount: 1,
        cardWidth,
        centerOffset
    };
}
/* Дубликат трека для бесконечной прокрутки */ const trackCards = [
    ...EXPERIENCE_CARDS,
    ...EXPERIENCE_CARDS
];
const totalSlides = trackCards.length;
const totalPositions = EXPERIENCE_CARDS.length + 1;
const SWIPE_MIN_PX = 50;
const MOBILE_BREAKPOINT = 2561;
function ExperienceCard(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(25);
    if ($[0] !== "497e4d426959ca7585702adf343e73e0f39672e3da34ceb35b337b1f4caac120") {
        for(let $i = 0; $i < 25; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "497e4d426959ca7585702adf343e73e0f39672e3da34ceb35b337b1f4caac120";
    }
    const { id, imageSrc, imageAlt, title, description, readTime } = t0;
    const t1 = `/articles/${id}`;
    const t2 = `Читать: ${title}`;
    let t3;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$experience$2f$our$2d$experience$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tag,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: "/icons/images/Lightbulb.svg",
                    alt: "",
                    width: 20,
                    height: 20,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$experience$2f$our$2d$experience$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tagIcon
                }, void 0, false, {
                    fileName: "[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.jsx",
                    lineNumber: 94,
                    columnNumber: 39
                }, this),
                "Статья"
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.jsx",
            lineNumber: 94,
            columnNumber: 10
        }, this);
        $[1] = t3;
    } else {
        t3 = $[1];
    }
    let t4;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: "/icons/images/Clock.svg",
            alt: "",
            width: 20,
            height: 20,
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$experience$2f$our$2d$experience$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tagIcon
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.jsx",
            lineNumber: 101,
            columnNumber: 10
        }, this);
        $[2] = t4;
    } else {
        t4 = $[2];
    }
    let t5;
    if ($[3] !== readTime) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$experience$2f$our$2d$experience$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tags,
            children: [
                t3,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$experience$2f$our$2d$experience$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tag,
                    children: [
                        t4,
                        readTime
                    ]
                }, void 0, true, {
                    fileName: "[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.jsx",
                    lineNumber: 108,
                    columnNumber: 43
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.jsx",
            lineNumber: 108,
            columnNumber: 10
        }, this);
        $[3] = readTime;
        $[4] = t5;
    } else {
        t5 = $[4];
    }
    let t6;
    if ($[5] !== imageAlt || $[6] !== imageSrc) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$experience$2f$our$2d$experience$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardImageWrap,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: imageSrc,
                alt: imageAlt,
                width: 264,
                height: 264,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$experience$2f$our$2d$experience$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardImage
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.jsx",
                lineNumber: 116,
                columnNumber: 48
            }, this)
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.jsx",
            lineNumber: 116,
            columnNumber: 10
        }, this);
        $[5] = imageAlt;
        $[6] = imageSrc;
        $[7] = t6;
    } else {
        t6 = $[7];
    }
    let t7;
    if ($[8] !== title) {
        t7 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$typograf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyTypograf"])(title);
        $[8] = title;
        $[9] = t7;
    } else {
        t7 = $[9];
    }
    let t8;
    if ($[10] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$experience$2f$our$2d$experience$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardTitle} subtitle_1`,
            children: t7
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.jsx",
            lineNumber: 133,
            columnNumber: 10
        }, this);
        $[10] = t7;
        $[11] = t8;
    } else {
        t8 = $[11];
    }
    let t9;
    if ($[12] !== description) {
        t9 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$typograf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyTypograf"])(description);
        $[12] = description;
        $[13] = t9;
    } else {
        t9 = $[13];
    }
    let t10;
    if ($[14] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$experience$2f$our$2d$experience$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardDescription} subinfo`,
            children: t9
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.jsx",
            lineNumber: 149,
            columnNumber: 11
        }, this);
        $[14] = t9;
        $[15] = t10;
    } else {
        t10 = $[15];
    }
    let t11;
    if ($[16] !== t10 || $[17] !== t5 || $[18] !== t6 || $[19] !== t8) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$experience$2f$our$2d$experience$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
            children: [
                t5,
                t6,
                t8,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.jsx",
            lineNumber: 157,
            columnNumber: 11
        }, this);
        $[16] = t10;
        $[17] = t5;
        $[18] = t6;
        $[19] = t8;
        $[20] = t11;
    } else {
        t11 = $[20];
    }
    let t12;
    if ($[21] !== t1 || $[22] !== t11 || $[23] !== t2) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: t1,
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$experience$2f$our$2d$experience$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardLink,
            "aria-label": t2,
            children: t11
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.jsx",
            lineNumber: 168,
            columnNumber: 11
        }, this);
        $[21] = t1;
        $[22] = t11;
        $[23] = t2;
        $[24] = t12;
    } else {
        t12 = $[24];
    }
    return t12;
}
_c2 = ExperienceCard;
function OurExperience() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(54);
    if ($[0] !== "497e4d426959ca7585702adf343e73e0f39672e3da34ceb35b337b1f4caac120") {
        for(let $i = 0; $i < 54; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "497e4d426959ca7585702adf343e73e0f39672e3da34ceb35b337b1f4caac120";
    }
    const viewportRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [viewportWidth, setViewportWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1164);
    const [carouselIndex, setCarouselIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isTransitioning, setIsTransitioning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [skipTransition, setSkipTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isJumpingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const touchStartX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t0;
    if ($[1] !== viewportWidth) {
        t0 = computeCarouselLayout(viewportWidth);
        $[1] = viewportWidth;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    const layout = t0;
    const { cardWidth: cardWidthPx, centerOffset } = layout;
    const stepPx = cardWidthPx + CARD_GAP_PX;
    const trackWidthPx = totalSlides * cardWidthPx + (totalSlides - 1) * CARD_GAP_PX;
    let t1;
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = ({
            "OurExperience[useLayoutEffect()]": ()=>{
                const el = viewportRef.current;
                if (!el) {
                    return;
                }
                const measure = {
                    "OurExperience[useLayoutEffect() > measure]": ()=>{
                        setViewportWidth(el.getBoundingClientRect().width);
                    }
                }["OurExperience[useLayoutEffect() > measure]"];
                measure();
                const ro = new ResizeObserver(measure);
                ro.observe(el);
                return ()=>ro.disconnect();
            }
        })["OurExperience[useLayoutEffect()]"];
        t2 = [];
        $[3] = t1;
        $[4] = t2;
    } else {
        t1 = $[3];
        t2 = $[4];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])(t1, t2);
    let t3;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = ({
            "OurExperience[useEffect()]": ()=>{
                setCarouselIndex(0);
            }
        })["OurExperience[useEffect()]"];
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] !== viewportWidth) {
        t4 = [
            viewportWidth
        ];
        $[6] = viewportWidth;
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t3, t4);
    const isMobileView = _OurExperienceIsMobileView;
    let t5;
    if ($[8] !== cardWidthPx || $[9] !== isTransitioning || $[10] !== stepPx) {
        t5 = ({
            "OurExperience[goNext]": ()=>{
                if (isTransitioning || stepPx <= 0 || cardWidthPx <= 0) {
                    return;
                }
                setIsTransitioning(true);
                setCarouselIndex(_OurExperienceGoNextSetCarouselIndex);
            }
        })["OurExperience[goNext]"];
        $[8] = cardWidthPx;
        $[9] = isTransitioning;
        $[10] = stepPx;
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    const goNext = t5;
    let t6;
    if ($[12] !== cardWidthPx || $[13] !== carouselIndex || $[14] !== isTransitioning || $[15] !== stepPx) {
        t6 = ({
            "OurExperience[goPrev]": ()=>{
                if (isTransitioning || stepPx <= 0 || cardWidthPx <= 0) {
                    return;
                }
                if (carouselIndex > 0) {
                    setIsTransitioning(true);
                    setCarouselIndex(_OurExperienceGoPrevSetCarouselIndex);
                    return;
                }
                setSkipTransition(true);
                setCarouselIndex(totalPositions - 1);
                isJumpingRef.current = true;
            }
        })["OurExperience[goPrev]"];
        $[12] = cardWidthPx;
        $[13] = carouselIndex;
        $[14] = isTransitioning;
        $[15] = stepPx;
        $[16] = t6;
    } else {
        t6 = $[16];
    }
    const goPrev = t6;
    let t7;
    if ($[17] !== carouselIndex) {
        t7 = ({
            "OurExperience[handleTransitionEnd]": (e)=>{
                if (e.propertyName !== "transform") {
                    return;
                }
                setIsTransitioning(false);
                if (carouselIndex === totalPositions - 1) {
                    setSkipTransition(true);
                    setCarouselIndex(0);
                }
            }
        })["OurExperience[handleTransitionEnd]"];
        $[17] = carouselIndex;
        $[18] = t7;
    } else {
        t7 = $[18];
    }
    const handleTransitionEnd = t7;
    let t8;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = ({
            "OurExperience[handleSwipeStart]": (e_0)=>{
                if (!isMobileView()) {
                    return;
                }
                touchStartX.current = e_0.touches[0].clientX;
            }
        })["OurExperience[handleSwipeStart]"];
        $[19] = t8;
    } else {
        t8 = $[19];
    }
    const handleSwipeStart = t8;
    let t9;
    if ($[20] !== goNext || $[21] !== goPrev) {
        t9 = ({
            "OurExperience[handleSwipeEnd]": (e_1)=>{
                if (!isMobileView() || touchStartX.current === null) {
                    return;
                }
                const endX = e_1.changedTouches[0].clientX;
                const deltaX = endX - touchStartX.current;
                touchStartX.current = null;
                if (deltaX < -SWIPE_MIN_PX) {
                    goNext();
                } else {
                    if (deltaX > SWIPE_MIN_PX) {
                        goPrev();
                    }
                }
            }
        })["OurExperience[handleSwipeEnd]"];
        $[20] = goNext;
        $[21] = goPrev;
        $[22] = t9;
    } else {
        t9 = $[22];
    }
    const handleSwipeEnd = t9;
    let t10;
    let t11;
    if ($[23] !== skipTransition) {
        t10 = ({
            "OurExperience[useEffect()]": ()=>{
                if (!skipTransition) {
                    return;
                }
                const id = requestAnimationFrame({
                    "OurExperience[useEffect() > requestAnimationFrame()]": ()=>{
                        setSkipTransition(false);
                        if (isJumpingRef.current) {
                            isJumpingRef.current = false;
                            setIsTransitioning(true);
                            setCarouselIndex(totalPositions - 2);
                        }
                    }
                }["OurExperience[useEffect() > requestAnimationFrame()]"]);
                return ()=>cancelAnimationFrame(id);
            }
        })["OurExperience[useEffect()]"];
        t11 = [
            skipTransition
        ];
        $[23] = skipTransition;
        $[24] = t10;
        $[25] = t11;
    } else {
        t10 = $[24];
        t11 = $[25];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t10, t11);
    const translateX = centerOffset - carouselIndex * stepPx;
    let t12;
    if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$experience$2f$our$2d$experience$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title} title_1`,
            children: "Делимся личным опытом"
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.jsx",
            lineNumber: 396,
            columnNumber: 11
        }, this);
        $[26] = t12;
    } else {
        t12 = $[26];
    }
    let t13;
    if ($[27] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: "/icons/system/ArrowLeft.svg",
            alt: "",
            width: 20,
            height: 20
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.jsx",
            lineNumber: 403,
            columnNumber: 11
        }, this);
        $[27] = t13;
    } else {
        t13 = $[27];
    }
    let t14;
    if ($[28] !== goPrev || $[29] !== isTransitioning) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2d$round$2f$buttons$2d$round$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            variant: "white",
            icon: t13,
            onClick: goPrev,
            "aria-label": "\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0430\u044F \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430",
            disabled: isTransitioning
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.jsx",
            lineNumber: 410,
            columnNumber: 11
        }, this);
        $[28] = goPrev;
        $[29] = isTransitioning;
        $[30] = t14;
    } else {
        t14 = $[30];
    }
    let t15;
    if ($[31] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: "/icons/system/ArrowRight.svg",
            alt: "",
            width: 20,
            height: 20
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.jsx",
            lineNumber: 419,
            columnNumber: 11
        }, this);
        $[31] = t15;
    } else {
        t15 = $[31];
    }
    let t16;
    if ($[32] !== goNext || $[33] !== isTransitioning) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2d$round$2f$buttons$2d$round$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            variant: "white",
            icon: t15,
            onClick: goNext,
            "aria-label": "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430",
            disabled: isTransitioning
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.jsx",
            lineNumber: 426,
            columnNumber: 11
        }, this);
        $[32] = goNext;
        $[33] = isTransitioning;
        $[34] = t16;
    } else {
        t16 = $[34];
    }
    let t17;
    if ($[35] !== t14 || $[36] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$experience$2f$our$2d$experience$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].carouselNav,
            children: [
                t14,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.jsx",
            lineNumber: 435,
            columnNumber: 11
        }, this);
        $[35] = t14;
        $[36] = t16;
        $[37] = t17;
    } else {
        t17 = $[37];
    }
    const t18 = `${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$experience$2f$our$2d$experience$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardsTrack} ${skipTransition ? __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$experience$2f$our$2d$experience$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardsTrackNoTransition : ""}`;
    const t19 = `translateX(${translateX}px)`;
    let t20;
    if ($[38] !== t19 || $[39] !== trackWidthPx) {
        t20 = {
            width: trackWidthPx,
            gap: CARD_GAP_PX,
            transform: t19
        };
        $[38] = t19;
        $[39] = trackWidthPx;
        $[40] = t20;
    } else {
        t20 = $[40];
    }
    let t21;
    if ($[41] !== cardWidthPx) {
        t21 = trackCards.map({
            "OurExperience[trackCards.map()]": (card, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$experience$2f$our$2d$experience$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardSlide,
                    style: {
                        width: cardWidthPx,
                        flex: `0 0 ${cardWidthPx}px`
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ExperienceCard, {
                        ...card
                    }, void 0, false, {
                        fileName: "[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.jsx",
                        lineNumber: 463,
                        columnNumber: 10
                    }, this)
                }, `${card.id}-${i}`, false, {
                    fileName: "[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.jsx",
                    lineNumber: 460,
                    columnNumber: 55
                }, this)
        }["OurExperience[trackCards.map()]"]);
        $[41] = cardWidthPx;
        $[42] = t21;
    } else {
        t21 = $[42];
    }
    let t22;
    if ($[43] !== handleTransitionEnd || $[44] !== t18 || $[45] !== t20 || $[46] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$experience$2f$our$2d$experience$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardsSliderViewport,
            ref: viewportRef,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: t18,
                style: t20,
                onTransitionEnd: handleTransitionEnd,
                children: t21
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.jsx",
                lineNumber: 472,
                columnNumber: 73
            }, this)
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.jsx",
            lineNumber: 472,
            columnNumber: 11
        }, this);
        $[43] = handleTransitionEnd;
        $[44] = t18;
        $[45] = t20;
        $[46] = t21;
        $[47] = t22;
    } else {
        t22 = $[47];
    }
    let t23;
    if ($[48] !== handleSwipeEnd || $[49] !== t22) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$experience$2f$our$2d$experience$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardsSlider,
            onTouchStart: handleSwipeStart,
            onTouchEnd: handleSwipeEnd,
            role: "region",
            "aria-label": "\u041A\u0430\u0440\u0443\u0441\u0435\u043B\u044C \u0441\u0442\u0430\u0442\u0435\u0439",
            children: t22
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.jsx",
            lineNumber: 483,
            columnNumber: 11
        }, this);
        $[48] = handleSwipeEnd;
        $[49] = t22;
        $[50] = t23;
    } else {
        t23 = $[50];
    }
    let t24;
    if ($[51] !== t17 || $[52] !== t23) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$experience$2f$our$2d$experience$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].wrapper,
            children: [
                t12,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$experience$2f$our$2d$experience$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].carouselBlock,
                    children: [
                        t17,
                        t23
                    ]
                }, void 0, true, {
                    fileName: "[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.jsx",
                    lineNumber: 492,
                    columnNumber: 52
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.jsx",
            lineNumber: 492,
            columnNumber: 11
        }, this);
        $[51] = t17;
        $[52] = t23;
        $[53] = t24;
    } else {
        t24 = $[53];
    }
    return t24;
}
_s(OurExperience, "VLfQhiqX2mqIWj0BauvNSAZ5Txc=");
_c3 = OurExperience;
function _OurExperienceGoPrevSetCarouselIndex(prev_0) {
    return prev_0 - 1;
}
function _OurExperienceGoNextSetCarouselIndex(prev) {
    return prev < totalPositions - 1 ? prev + 1 : prev;
}
function _OurExperienceIsMobileView() {
    return ("TURBOPACK compile-time value", "object") !== "undefined" && window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches;
}
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "EXPERIENCE_CARDS$ARTICLES_LIST.map");
__turbopack_context__.k.register(_c1, "EXPERIENCE_CARDS");
__turbopack_context__.k.register(_c2, "ExperienceCard");
__turbopack_context__.k.register(_c3, "OurExperience");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/setly.front/src/app/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MainPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$Header$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/globals/header/Header.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$footer$2f$Footer$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/globals/footer/Footer.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$welcome$2d$screen$2f$welcome$2d$screen$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/blocks/main/welcome-screen/welcome-screen.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$three$2d$steps$2f$three$2d$steps$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/blocks/main/three-steps/three-steps.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$ideal$2d$way$2f$ideal$2d$way$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/blocks/main/ideal-way/ideal-way.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/blocks/main/our-community/our-community.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$experience$2f$our$2d$experience$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/blocks/main/our-experience/our-experience.jsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
function MainPage() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "64c49216c1bfddc3eeb68d847540ed2e76d7115f81779770a5a76ecba8198bc0") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "64c49216c1bfddc3eeb68d847540ed2e76d7115f81779770a5a76ecba8198bc0";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$Header$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {}, void 0, false, {
                        fileName: "[project]/setly.front/src/app/page.js",
                        lineNumber: 21,
                        columnNumber: 39
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$welcome$2d$screen$2f$welcome$2d$screen$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/setly.front/src/app/page.js",
                        lineNumber: 21,
                        columnNumber: 49
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$three$2d$steps$2f$three$2d$steps$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/setly.front/src/app/page.js",
                        lineNumber: 21,
                        columnNumber: 66
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$ideal$2d$way$2f$ideal$2d$way$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/setly.front/src/app/page.js",
                        lineNumber: 21,
                        columnNumber: 80
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$community$2f$our$2d$community$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/setly.front/src/app/page.js",
                        lineNumber: 21,
                        columnNumber: 92
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$blocks$2f$main$2f$our$2d$experience$2f$our$2d$experience$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/setly.front/src/app/page.js",
                        lineNumber: 21,
                        columnNumber: 108
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$footer$2f$Footer$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Footer"], {}, void 0, false, {
                        fileName: "[project]/setly.front/src/app/page.js",
                        lineNumber: 21,
                        columnNumber: 125
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/setly.front/src/app/page.js",
                lineNumber: 21,
                columnNumber: 12
            }, this)
        }, void 0, false);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return t0;
}
_c = MainPage;
var _c;
__turbopack_context__.k.register(_c, "MainPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=setly_front_src_1192e25d._.js.map