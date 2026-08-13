import type { NextConfig } from "next";

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
