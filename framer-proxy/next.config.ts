import type { NextConfig } from "next";

/**
 * While the Next portfolio is WIP, proxy.ts rewrites to /api/proxy so we
 * can hide the Made-in-Framer badge and inject a sticky email CTA.
 *
 * Set FRAMER_PROXY=0 to work on the Next portfolio locally:
 *   FRAMER_PROXY=0 npm run dev
 *   (or: npm run dev:portfolio)
 */
const nextConfig: NextConfig = {
  // Strict Mode double-mounts in `next dev` and can leave Framer Motion
  // `whileInView` reveals stuck (production / deployed builds are fine).
  reactStrictMode: false,
  turbopack: {
    root: process.cwd(),
  },
  allowedDevOrigins: ["127.0.2.2"],
};

export default nextConfig;
