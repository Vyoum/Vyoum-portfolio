"use client";

import { useEffect, useRef } from "react";
import styles from "./CustomCursor.module.css";

const TRAIL_DISTANCE = 34; // px behind the arrow tip
const DEFAULT_DIR = { x: 0.4, y: 0.85 }; // sits under/behind a typical arrow

/**
 * Soft lagging dot that trails behind the system cursor at a fixed distance.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const prevPointer = useRef({ x: 0, y: 0 });
  const direction = useRef({ ...DEFAULT_DIR });
  const frame = useRef<number | null>(null);
  const lastTime = useRef(0);
  const primed = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isCoarse || prefersReducedMotion) return;

    const setTrailTarget = (x: number, y: number) => {
      target.current = {
        x: x - direction.current.x * TRAIL_DISTANCE,
        y: y - direction.current.y * TRAIL_DISTANCE,
      };
    };

    const move = (event: PointerEvent) => {
      const { clientX: x, clientY: y } = event;

      if (primed.current) {
        const dx = x - prevPointer.current.x;
        const dy = y - prevPointer.current.y;
        const len = Math.hypot(dx, dy);
        if (len > 0.8) {
          // Face the travel direction so the dot stays behind the arrow
          direction.current = { x: dx / len, y: dy / len };
        }
      } else {
        primed.current = true;
        setTrailTarget(x, y);
        pos.current = { ...target.current };
        dot.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }

      prevPointer.current = { x, y };
      setTrailTarget(x, y);
      dot.classList.add(styles.visible);

      const interactive = (event.target as HTMLElement).closest(
        "a, button, [role=button], input, textarea, select, summary"
      );
      dot.classList.toggle(styles.hoveringDot, Boolean(interactive));
    };

    const leave = () => {
      primed.current = false;
      direction.current = { ...DEFAULT_DIR };
      dot.classList.remove(styles.visible, styles.hoveringDot);
    };

    const animate = (time: number) => {
      const rawDt = lastTime.current ? time - lastTime.current : 16.67;
      lastTime.current = time;
      const dt = Math.min(rawDt, 32) / 16.67;
      // Soft chase — lag behind the trail point
      const ease = 1 - Math.pow(0.86, dt);

      pos.current.x += (target.current.x - pos.current.x) * ease;
      pos.current.y += (target.current.y - pos.current.y) * ease;

      dot.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
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

  return <div ref={dotRef} className={styles.cursor} aria-hidden="true" />;
}
