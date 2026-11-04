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

    // Next Link otherwise performs its own immediate hash scroll before Lenis.
    // Cancel that default in capture; Lenis handles the same click in bubble.
    function handleAnchor(event: MouseEvent) {
      if (
        event.defaultPrevented || event.button !== 0 || event.metaKey ||
        event.ctrlKey || event.shiftKey || event.altKey || !lenisRef.current?.lenis
      ) return;
      const anchor = event.composedPath().find(
        (node): node is HTMLAnchorElement => node instanceof HTMLAnchorElement
      );
      if (!anchor || anchor.hasAttribute("download") ||
        (anchor.target && anchor.target !== "_self")) return;
      const url = new URL(anchor.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname ||
        url.search !== location.search || !url.hash) return;
      let id: string;
      try {
        id = decodeURIComponent(url.hash.slice(1));
      } catch {
        return;
      }
      if (!document.getElementById(id) && !document.getElementsByName(id).length) return;
      event.preventDefault();
      if (url.hash !== location.hash) window.history.pushState(null, "", url.href);
    }

    document.addEventListener("click", handleAnchor, true);
    frame.update(update, true);
    return () => {
      document.removeEventListener("click", handleAnchor, true);
      cancelFrame(update);
    };
  }, [reduced]);

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        duration: 0.8,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
        stopInertiaOnNavigate: true,
        allowNestedScroll: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
