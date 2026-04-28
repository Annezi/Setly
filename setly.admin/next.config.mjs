import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  outputFileTracingRoot: __dirname,
  poweredByHeader: false,

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
