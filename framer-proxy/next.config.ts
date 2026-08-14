import type { NextConfig } from "next";

/**
 * While the Next portfolio is WIP, proxy the live Framer site by default.
 * Set FRAMER_PROXY=0 to work on the Next portfolio locally:
 *   FRAMER_PROXY=0 npm run dev
 */
const framerProxyEnabled = process.env.FRAMER_PROXY !== "0";
const FRAMER_ORIGIN = "https://vyoumportfolio.framer.website";

const nextConfig: NextConfig = {
  // Strict Mode double-mounts in `next dev` and can leave Framer Motion
  // `whileInView` reveals stuck (production / deployed builds are fine).
  reactStrictMode: false,
  turbopack: {
    root: process.cwd(),
  },
  allowedDevOrigins: ["127.0.2.2"],
  async rewrites() {
    if (!framerProxyEnabled) return [];

    return {
      // beforeFiles so Framer wins over app/page.tsx while proxy is on
      beforeFiles: [
        {
          source: "/",
          destination: `${FRAMER_ORIGIN}/`,
        },
        {
          // Proxy every path to Framer except Next internals / our proxy API
          source: "/:path((?!_next(?:/|$)|api/proxy(?:/|$)).*)",
          destination: `${FRAMER_ORIGIN}/:path`,
        },
      ],
    };
  },
};

export default nextConfig;
