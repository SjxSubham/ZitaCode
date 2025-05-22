import type { NextConfig } from "next";
import withPWA from "next-pwa";
const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  /* config options here */
};
const pwaConfig = {
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  // Optional PWA configurations:
  // runtimeCaching: [...],
  // dynamicStartUrl: false,
  // buildExcludes: [/middleware-manifest.json$/],
};

export default withPWA({
  ...nextConfig,
  ...pwaConfig,
});
