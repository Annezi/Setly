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
"[project]/setly.front/src/app/technical-error-page.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "buttonWrap": "technical-error-page-module__Ph6h-a__buttonWrap",
  "content": "technical-error-page-module__Ph6h-a__content",
  "description": "technical-error-page-module__Ph6h-a__description",
  "image": "technical-error-page-module__Ph6h-a__image",
  "main": "technical-error-page-module__Ph6h-a__main",
  "title": "technical-error-page-module__Ph6h-a__title",
});
}),
"[project]/setly.front/src/app/technical-error-page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TechnicalErrorPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$Header$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/globals/header/Header.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$footer$2f$Footer$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/globals/footer/Footer.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2f$buttons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/components/atomic/atoms/buttons/buttons.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$technical$2d$error$2d$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/technical-error-page.module.css [app-client] (css module)");
"use client";
;
;
;
;
;
;
;
function TechnicalErrorPage(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(7);
    if ($[0] !== "40ce8d7a5e1e5f8fb65444531fcdd2e5a9d6ff45e390c16ccfbf7f30cb7f7560") {
        for(let $i = 0; $i < 7; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "40ce8d7a5e1e5f8fb65444531fcdd2e5a9d6ff45e390c16ccfbf7f30cb7f7560";
    }
    const { asDocument: t1 } = t0;
    const asDocument = t1 === undefined ? false : t1;
    let t2;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$header$2f$Header$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {}, void 0, false, {
            fileName: "[project]/setly.front/src/app/technical-error-page.jsx",
            lineNumber: 23,
            columnNumber: 10
        }, this);
        $[1] = t2;
    } else {
        t2 = $[1];
    }
    let t3;
    let t4;
    let t5;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: "/img/main/500bg.png",
            alt: "500",
            width: 295,
            height: 299,
            className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$technical$2d$error$2d$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].image,
            priority: true,
            draggable: false
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/technical-error-page.jsx",
            lineNumber: 32,
            columnNumber: 10
        }, this);
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            id: "technical-error-title",
            className: `title_1 ${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$technical$2d$error$2d$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title}`,
            children: "Техническая ошибка"
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/technical-error-page.jsx",
            lineNumber: 33,
            columnNumber: 10
        }, this);
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: `paragraph ${__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$technical$2d$error$2d$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].description}`,
            children: "Мы уже разбираемся. А вы пока проверьте, всё ли на месте: паспорт, зарядка, спокойствие. Попробуйте обновить страницу позже"
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/technical-error-page.jsx",
            lineNumber: 34,
            columnNumber: 10
        }, this);
        $[2] = t3;
        $[3] = t4;
        $[4] = t5;
    } else {
        t3 = $[2];
        t4 = $[3];
        t5 = $[4];
    }
    let t6;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container",
            children: [
                t2,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$technical$2d$error$2d$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].main,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$technical$2d$error$2d$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].content,
                        "aria-labelledby": "technical-error-title",
                        children: [
                            t3,
                            t4,
                            t5,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$technical$2d$error$2d$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buttonWrap,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$atomic$2f$atoms$2f$buttons$2f$buttons$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    color: "blue",
                                    Text: "\u041F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C",
                                    type: "button",
                                    onClick: _TechnicalErrorPageButtonOnClick
                                }, void 0, false, {
                                    fileName: "[project]/setly.front/src/app/technical-error-page.jsx",
                                    lineNumber: 45,
                                    columnNumber: 194
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/setly.front/src/app/technical-error-page.jsx",
                                lineNumber: 45,
                                columnNumber: 159
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/setly.front/src/app/technical-error-page.jsx",
                        lineNumber: 45,
                        columnNumber: 71
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/setly.front/src/app/technical-error-page.jsx",
                    lineNumber: 45,
                    columnNumber: 41
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$components$2f$globals$2f$footer$2f$Footer$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Footer"], {}, void 0, false, {
                    fileName: "[project]/setly.front/src/app/technical-error-page.jsx",
                    lineNumber: 45,
                    columnNumber: 385
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/setly.front/src/app/technical-error-page.jsx",
            lineNumber: 45,
            columnNumber: 10
        }, this);
        $[5] = t6;
    } else {
        t6 = $[5];
    }
    const content = t6;
    if (asDocument) {
        let t7;
        if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
            t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
                lang: "ru",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                    children: content
                }, void 0, false, {
                    fileName: "[project]/setly.front/src/app/technical-error-page.jsx",
                    lineNumber: 54,
                    columnNumber: 28
                }, this)
            }, void 0, false, {
                fileName: "[project]/setly.front/src/app/technical-error-page.jsx",
                lineNumber: 54,
                columnNumber: 12
            }, this);
            $[6] = t7;
        } else {
            t7 = $[6];
        }
        return t7;
    }
    return content;
}
_c = TechnicalErrorPage;
function _TechnicalErrorPageButtonOnClick() {
    return window.location.reload();
}
var _c;
__turbopack_context__.k.register(_c, "TechnicalErrorPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/setly.front/src/app/lib/error-monitor.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reportClientError",
    ()=>reportClientError
]);
const ERROR_ENDPOINT = "/api/client-errors";
function buildPayload(error, scope) {
    return {
        scope,
        message: error?.message ?? "Unknown client error",
        digest: error?.digest ?? null,
        stack: error?.stack ?? null,
        path: ("TURBOPACK compile-time truthy", 1) ? window.location.pathname : "TURBOPACK unreachable",
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : null,
        timestamp: new Date().toISOString()
    };
}
function reportClientError(error, scope = "app-error") {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const payload = buildPayload(error, scope);
    try {
        console.error(`[${scope}]`, error);
    } catch  {}
    try {
        const body = JSON.stringify(payload);
        if (navigator.sendBeacon) {
            const blob = new Blob([
                body
            ], {
                type: "application/json"
            });
            navigator.sendBeacon(ERROR_ENDPOINT, blob);
            return;
        }
        fetch(ERROR_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body,
            keepalive: true
        }).catch(()=>{});
    } catch  {}
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/setly.front/src/app/global-error.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GlobalError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$technical$2d$error$2d$page$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/technical-error-page.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$error$2d$monitor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/setly.front/src/app/lib/error-monitor.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function GlobalError(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "c79917f3d05a38e54d1328b437880df7c5dd2cd944c06a6983a49158c1c1fd47") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c79917f3d05a38e54d1328b437880df7c5dd2cd944c06a6983a49158c1c1fd47";
    }
    const { error } = t0;
    let t1;
    let t2;
    if ($[1] !== error) {
        t1 = ({
            "GlobalError[useEffect()]": ()=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$lib$2f$error$2d$monitor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reportClientError"])(error, "global-error");
            }
        })["GlobalError[useEffect()]"];
        t2 = [
            error
        ];
        $[1] = error;
        $[2] = t1;
        $[3] = t2;
    } else {
        t1 = $[2];
        t2 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$setly$2e$front$2f$src$2f$app$2f$technical$2d$error$2d$page$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            asDocument: true
        }, void 0, false, {
            fileName: "[project]/setly.front/src/app/global-error.jsx",
            lineNumber: 37,
            columnNumber: 10
        }, this);
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    return t3;
}
_s(GlobalError, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = GlobalError;
var _c;
__turbopack_context__.k.register(_c, "GlobalError");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=setly_front_src_app_b92ef558._.js.map