"use client";

import { useEffect, useRef } from "react";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isCoarse || prefersReducedMotion) return;

    document.documentElement.classList.add("custom-cursor-active");

    const move = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
      cursor.classList.add(styles.visible);

      const interactive = (event.target as HTMLElement).closest(
        "a, button, [role=button], input, textarea, select, summary"
      );
      ring.classList.toggle(styles.hovering, Boolean(interactive));
    };

    const leave = () => {
      cursor.classList.remove(styles.visible);
      ring.classList.remove(styles.hovering);
    };

    const animate = () => {
      position.current.x += (target.current.x - position.current.x) * 0.22;
      position.current.y += (target.current.y - position.current.y) * 0.22;
      const transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
      cursor.style.transform = transform;
      ring.style.transform = transform;
      frame.current = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    frame.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("custom-cursor-active");
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
      <div ref={cursorRef} className={styles.cursor} aria-hidden="true" />
    </>
  );
}
