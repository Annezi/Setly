import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  outputFileTracingRoot: __dirname,
  reactCompiler: process.env.NODE_ENV === "production",
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ["@vkontakte/icons", "@vkontakte/vkui"],
  },
  turbopack: {},
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    localPatterns: [
      {
        pathname: "/img/**",
        // search не указан — разрешаются любые query-строки (например ?v=2 для сброса кэша)
      },
      {
        pathname: "/icons/**",
      },
    ],
    // Картинки чек-планов с API (api.setly.space/storage/... и //storage/... при двойном слэше)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.setly.space",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "api.setly.space",
        pathname: "//storage/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/storage/**",
        port: "8000",
      },
    ],
  },
  onDemandEntries: {
    // Держим недавно открытые страницы в памяти дольше, чтобы
    // избежать повторной долгой перекомпиляции при навигации туда-сюда.
    maxInactiveAge: 1000 * 60 * 10,
    pagesBufferLength: 8,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      const ignoredRaw = config.watchOptions?.ignored;
      const ignored = (Array.isArray(ignoredRaw) ? ignoredRaw : [ignoredRaw]).filter(
        (item) => typeof item === "string" && item.trim().length > 0
      );

      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          ...ignored,
          "**/.next/**",
          "**/setly.front/.next/**",
          "**/setly.front/setly.front/**",
        ],
      };
    }
    return config;
  },
  // Проксирование /api/* на бэкенд при запросах с того же origin. Authorization передаётся.
  // Для Docker при сборке: API_INTERNAL_URL=http://setly-api:8000
  async rewrites() {
    const apiBase = process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const base = apiBase.replace(/\/$/, "");
    return [
      { source: "/favicon.ico", destination: "/icon.svg" },
      { source: "/api/user", destination: `${base}/api/user` },
      { source: "/api/user/:path*", destination: `${base}/api/user/:path*` },
      { source: "/api/check-plans", destination: `${base}/api/check-plans` },
      { source: "/api/check-plans/:path*", destination: `${base}/api/check-plans/:path*` },
      { source: "/api/checkplan-data", destination: `${base}/api/checkplan-data` },
      { source: "/api/checkplan-data/:path*", destination: `${base}/api/checkplan-data/:path*` },
    ];
  },
  async headers() {
    return [
      {
        source: "/img/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/icons/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;