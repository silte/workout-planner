const isDevelopment = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {};

/**
 * @type {import('next-pwa').PWAConfig}
 */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: isDevelopment,
  dynamicStartUrl: true,
  sw: "/service-worker.js",
});

module.exports = withPWA(nextConfig);
