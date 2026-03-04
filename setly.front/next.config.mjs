/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactCompiler: true,
  images: {
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
  // Проксирование /api/* на бэкенд при запросах с того же origin. Authorization передаётся.
  // Для Docker при сборке: API_INTERNAL_URL=http://setly-api:8000
  async rewrites() {
    const apiBase = process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const base = apiBase.replace(/\/$/, "");
    return [
      { source: "/api/user", destination: `${base}/api/user` },
      { source: "/api/user/:path*", destination: `${base}/api/user/:path*` },
      { source: "/api/check-plans", destination: `${base}/api/check-plans` },
      { source: "/api/check-plans/:path*", destination: `${base}/api/check-plans/:path*` },
      { source: "/api/checkplan-data", destination: `${base}/api/checkplan-data` },
      { source: "/api/checkplan-data/:path*", destination: `${base}/api/checkplan-data/:path*` },
    ];
  },
};

export default nextConfig;