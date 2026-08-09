"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import "lenis/dist/lenis.css";

type SmoothScrollProps = {
  children: ReactNode;
};

/**
 * Root Lenis smooth scroll. Works with Framer Motion useScroll
 * (document/window scroll) without extra sync wiring.
 */
export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        duration: 1.15,
        smoothWheel: true,
        touchMultiplier: 1.2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
