"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Project, ProjectTone } from "../lib/projects";
import styles from "./UntanglingProjectCard.module.css";

const TONE_CLASS: Record<ProjectTone, string> = {
  kora: styles.kora,
  kyma: styles.kyma,
  mugen: styles.mugen,
  axiom: styles.axiom,
};

type UntanglingProjectCardProps = {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  stickyRef: React.RefObject<HTMLDivElement | null>;
  /** Where the cards sit in the hero while collapsed */
  pileRef: React.RefObject<HTMLDivElement | null>;
  /** Progress value at which the pile has fully become a grid */
  settleAt?: number;
};

export default function UntanglingProjectCard({
  project,
  index,
  progress,
  stickyRef,
  pileRef,
  settleAt = 0.72,
}: UntanglingProjectCardProps) {
  const cellRef = useRef<HTMLDivElement>(null);
  const originX = useMotionValue(0);
  const originY = useMotionValue(0);
  const ready = useMotionValue(0);

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
  }, [originX, originY, ready, stickyRef, pileRef]);

  const eased = useTransform(progress, (p) =>
    Math.min(1, Math.max(0, p / settleAt))
  );

  const x = useTransform([eased, originX], ([t, ox]) =>
    (ox as number) * (1 - (t as number))
  );
  const y = useTransform([eased, originY], ([t, oy]) =>
    (oy as number) * (1 - (t as number))
  );
  const rotate = useTransform(eased, (t) => project.angle * (1 - t));
  const metaOpacity = useTransform(eased, [0.45, 0.85], [0, 1]);
  const opacity = useTransform(ready, (v) => (v ? 1 : 0));

  return (
    <div ref={cellRef} className={styles.cell} style={{ zIndex: 20 - index }}>
      <motion.div style={{ x, y, rotate, opacity }} className={styles.mover}>
        <Link href={project.href} className={styles.card}>
          <div className={`${styles.frame} ${TONE_CLASS[project.tone]}`}>
            <div className={styles.shot}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className={styles.shotImage}
                sizes="(max-width: 860px) 78vw, 300px"
                priority={index < 2}
              />
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
    </div>
  );
}
