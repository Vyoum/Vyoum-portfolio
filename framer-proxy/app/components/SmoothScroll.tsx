"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { cancelFrame, frame } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "lenis/dist/lenis.css";

type SmoothScrollProps = {
  children: ReactNode;
};

/**
 * Root Lenis smooth scroll, driven by Framer Motion's frame loop so
 * scroll-linked / whileInView animations stay in sync. Native scroll
 * when the user prefers reduced motion.
 */
export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<LenisRef>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    function update({ timestamp }: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(timestamp);
    }

    frame.update(update, true);
    return () => cancelFrame(update);
  }, [reduced]);

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        duration: 1.15,
        smoothWheel: true,
        touchMultiplier: 1.2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
