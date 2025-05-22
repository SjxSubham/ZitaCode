import type { NextConfig } from "next";
import withPWA from "next-pwa";
import path from "path";
const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  /* config options here */
  webpack: (config) => {
    config.module.rules.push({
      test: /\.ts$/,
      include: [path.join(__dirname, 'public')],
      use: 'ts-loader'
    });
    return config;
  }
};
const pwaConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  buildExcludes: [
    /middleware-manifest\.json$/,
    /_middleware\.js$/,
    /_buildManifest\.js$/,
    /_ssgManifest\.js$/,
    /\/_next\/static\/chunks\/app-build-manifest\.json$/,
    /\/_next\/static\/chunks\/webpack\.js$/
  ],
  // Optional PWA configurations:
  // runtimeCaching: [...],
  // dynamicStartUrl: false,
  // buildExcludes: [/middleware-manifest.json$/],
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
});

export default pwaConfig(nextConfig as any);
