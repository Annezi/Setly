import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // NEXT_PUBLIC_SITE_URL переопределяет основной сайт для ссылок из админки (по умолчанию https://setly.space в коде).
  output: "standalone",
  outputFileTracingRoot: __dirname,
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },

  async rewrites() {
    const apiBase =
      process.env.API_INTERNAL_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:8000";
    const base = apiBase.replace(/\/$/, "");
    return [
      { source: "/api/:path*", destination: `${base}/api/:path*` },
    ];
  },
};

export default nextConfig;
