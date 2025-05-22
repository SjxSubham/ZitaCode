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
const pwaConfig = {
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  buildExcludes: [
    /middleware-manifest\.json$/,
    /_middleware\.js$/,
    /_middleware\.js\.map$/,
    /middleware-runtime\.js$/,
    /server\/pages-manifest\.json$/
  ],
  // Optional PWA configurations:
  // runtimeCaching: [...],
  // dynamicStartUrl: false,
  // buildExcludes: [/middleware-manifest.json$/],
};

export default withPWA({
  ...nextConfig,
  ...pwaConfig,
});
