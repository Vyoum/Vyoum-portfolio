"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Project, ProjectTone } from "../lib/projects";
import { EASE_STD, REDUCED_TRANSITION } from "../lib/motion";
import styles from "./UntanglingProjectCard.module.css";

const TONE_CLASS: Record<ProjectTone, string> = {
  kora: styles.kora,
  kyma: styles.kyma,
  mugen: styles.mugen,
  axiom: styles.axiom,
};

/**
 * Reference collage start state, per card (grid order). The reference's
 * absolute offsets all land on roughly one spot, so they are expressed here as
 * jitter around the measured pile anchor (px at 1440px wide) + rotation.
 */
const PILE_START = [
  { dx: 25, dy: -12.5, rotate: 10 },
  { dx: 25, dy: -12.5, rotate: 15 },
  { dx: -25, dy: -12.5, rotate: -5 },
  { dx: -25, dy: 37.5, rotate: 5 },
] as const;
const PILE_SCALE = 0.7;

type UntanglingProjectCardProps = {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  stickyRef: React.RefObject<HTMLDivElement | null>;
  /** Where the cards sit in the hero while collapsed */
  pileRef: React.RefObject<HTMLDivElement | null>;
  /** Progress value at which the pile has fully become a grid */
  settleAt?: number;
  /** Reduced motion: jump between pile and grid instead of interpolating. */
  reduced?: boolean;
};

export default function UntanglingProjectCard({
  project,
  index,
  progress,
  stickyRef,
  pileRef,
  settleAt = 1,
  reduced = false,
}: UntanglingProjectCardProps) {
  const cellRef = useRef<HTMLDivElement>(null);
  const originX = useMotionValue(0);
  const originY = useMotionValue(0);
  const jitterScale = useMotionValue(1);
  const ready = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const start = PILE_START[index % PILE_START.length];

  useEffect(() => {
    const measure = () => {
      const cell = cellRef.current;
      const sticky = stickyRef.current;
      const pile = pileRef.current;
      if (!cell || !sticky || !pile) return;

      const cellRect = cell.getBoundingClientRect();
      const stickyRect = sticky.getBoundingClientRect();
      const pileRect = pile.getBoundingClientRect();

      const cellCenterX =
        cellRect.left - stickyRect.left + cellRect.width / 2;
      const cellCenterY =
        cellRect.top - stickyRect.top + cellRect.height / 2;
      const pileCenterX =
        pileRect.left - stickyRect.left + pileRect.width / 2;
      const pileCenterY =
        pileRect.top - stickyRect.top + pileRect.height / 2;

      originX.set(pileCenterX - cellCenterX);
      originY.set(pileCenterY - cellCenterY);
      jitterScale.set(Math.min(1, window.innerWidth / 1440));
      ready.set(1);
    };

    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);

    const sticky = stickyRef.current;
    const pile = pileRef.current;
    const cell = cellRef.current;
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measure)
        : null;
    if (sticky) ro?.observe(sticky);
    if (pile) ro?.observe(pile);
    if (cell) ro?.observe(cell);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      ro?.disconnect();
    };
  }, [originX, originY, jitterScale, ready, stickyRef, pileRef]);

  /* Linear in scroll (Lenis smooths); reduced motion snaps at the midpoint. */
  const t = useTransform(progress, (p) => {
    const linear = Math.min(1, Math.max(0, p / settleAt));
    return reduced ? (linear < 0.5 ? 0 : 1) : linear;
  });

  const x = useTransform([t, originX, jitterScale], ([v, ox, s]) =>
    ((ox as number) + start.dx * (s as number)) * (1 - (v as number))
  );
  const y = useTransform([t, originY, jitterScale], ([v, oy, s]) =>
    ((oy as number) + start.dy * (s as number)) * (1 - (v as number))
  );
  const rotate = useTransform(t, (v) => start.rotate * (1 - v));
  const scale = useTransform(t, (v) => PILE_SCALE + (1 - PILE_SCALE) * v);
  const metaOpacity = useTransform(t, [0.45, 0.85], [0, 1]);
  const opacity = useTransform(ready, (v) => (v ? 1 : 0));

  return (
    <div ref={cellRef} className={styles.cell} style={{ zIndex: 4 - index }}>
      <motion.div
        style={{ x, y, rotate, scale, opacity, transformPerspective: 1200 }}
        className={styles.mover}
      >
        {/* Page-load rise (reference "projects" block: y 200, scale .8) */}
        <motion.div
          initial={{ opacity: 0, y: 200, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={
            reduced
              ? REDUCED_TRANSITION
              : { duration: 0.6, delay: 0.1 + index * 0.08, ease: EASE_STD }
          }
        >
          <Link
            href={project.href}
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} case study`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            onPointerMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              setCursorPosition({
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
              });
            }}
          >
            <div className={`${styles.frame} ${TONE_CLASS[project.tone]}`}>
              <div className={styles.shot}>
                <motion.span
                  className={styles.caseStudyCursor}
                  style={{ left: cursorPosition.x, top: cursorPosition.y }}
                  animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  aria-hidden="true"
                >
                  View case study <ArrowUpRight size={13} strokeWidth={2.5} />
                </motion.span>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={styles.shotImage}
                  sizes="(max-width: 860px) 70vw, 260px"
                  priority={index < 2}
                />
                <span className={styles.shotDim} aria-hidden />
              </div>
              <span className={styles.badge}>
                <ArrowUpRight size={12} strokeWidth={2.5} />
                {project.title}
              </span>
            </div>

            <motion.div style={{ opacity: metaOpacity }} className={styles.meta}>
              <div>
                <h3 className={styles.name}>{project.title}</h3>
                <p className={styles.category}>{project.category}</p>
              </div>
              <span className={styles.link}>
                View Project <ArrowUpRight size={15} />
              </span>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
