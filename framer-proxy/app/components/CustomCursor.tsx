"use client";

import { useEffect, useRef } from "react";
import styles from "./CustomCursor.module.css";

/**
 * Decorative follower only — keeps the normal system arrow cursor.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isCoarse || prefersReducedMotion) return;

    const move = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
      dot.classList.add(styles.visible);
      ring.classList.add(styles.visible);

      const interactive = (event.target as HTMLElement).closest(
        "a, button, [role=button], input, textarea, select, summary"
      );
      ring.classList.toggle(styles.hovering, Boolean(interactive));
      dot.classList.toggle(styles.hoveringDot, Boolean(interactive));
    };

    const leave = () => {
      dot.classList.remove(styles.visible, styles.hoveringDot);
      ring.classList.remove(styles.visible, styles.hovering);
    };

    const animate = () => {
      // Smooth trail behind the real arrow cursor
      dotPos.current.x += (target.current.x - dotPos.current.x) * 0.28;
      dotPos.current.y += (target.current.y - dotPos.current.y) * 0.28;
      ringPos.current.x += (target.current.x - ringPos.current.x) * 0.16;
      ringPos.current.y += (target.current.y - ringPos.current.y) * 0.16;

      dot.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)`;
      ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      frame.current = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    frame.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
      <div ref={dotRef} className={styles.cursor} aria-hidden="true" />
    </>
  );
}
