"use client";
import { useEffect, useRef } from "react";
import styles from "./CustomCursor.module.css";
/**
 * Reference cursor ("Launchfolio"): a small 16px translucent dot that follows
 * the pointer at a FIXED offset (down-right of the arrow tip) with a short
 * ease (~85ms time-constant, settles in < 300ms). It does not rotate around the
 * pointer and does not grow over links. Over elements marked
 * `data-cursor="hide"` (project cards, which show their own "View" pill) the
 * dot fades out.
 */
const OFFSET_X = 12; // px right of the pointer (dot's left edge)
const OFFSET_Y = 20; // px below the pointer (dot's top edge)
const TAU_MS = 85; // follow time-constant
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isCoarse || prefersReducedMotion) return;
    const pos = { x: -100, y: -100 };
    const target = { x: -100, y: -100 };
    let primed = false;
    let raf = 0;
    let last = 0;
    const place = () => {
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    };
    const move = (event: PointerEvent) => {
      target.x = event.clientX + OFFSET_X;
      target.y = event.clientY + OFFSET_Y;
      if (!primed) {
        primed = true;
        pos.x = target.x;
        pos.y = target.y;
        place();
      }
      dot.classList.add(styles.visible);
      const el = event.target as HTMLElement | null;
      dot.classList.toggle(
        styles.hidden,
        Boolean(el?.closest?.('[data-cursor="hide"]'))
      );
    };
    const leave = () => {
      primed = false;
      dot.classList.remove(styles.visible);
    };
    const animate = (time: number) => {
      const dt = last ? Math.min(time - last, 64) : 16.67;
      last = time;
      const ease = 1 - Math.exp(-dt / TAU_MS);
      pos.x += (target.x - pos.x) * ease;
      pos.y += (target.y - pos.y) * ease;
      place();
      raf = window.requestAnimationFrame(animate);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    raf = window.requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={dotRef} className={styles.cursor} aria-hidden="true" />;
}
