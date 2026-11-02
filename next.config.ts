import type { NextConfig } from "next";
import { legacyRedirects } from "./src/data/redirects";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  // Trailing-slash normalisation is done in src/data/redirects.ts so legacy WordPress URLs
  // (which all end in "/") reach their new page in a single 301 — no redirect chains.
  skipTrailingSlashRedirect: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 only serves qualities listed here; every value used in components must appear.
    qualities: [72, 75, 76, 78, 82],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2400],
    imageSizes: [96, 160, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Project photography is served from the current WordPress media library
    // until `npm run assets:download` copies it into /public/media.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "squareandlevelcontracting.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  async redirects() {
    return legacyRedirects;
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
