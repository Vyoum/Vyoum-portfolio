"use client";

import { motion, type MotionValue } from "framer-motion";
import styles from "./ProgressiveBlur.module.css";

const BLURS = [0.5, 1, 2, 4, 8, 16, 32, 64];

function layerMask(i: number) {
  const x = i * 12.5;
  return `linear-gradient(to bottom, transparent ${x}%, #000 ${x + 12.5}%, #000 ${
    x + 25
  }%, transparent ${x + 37.5}%)`;
}

/** Reference: 8 stacked backdrop blurs, each masked to its own band. */
export default function ProgressiveBlur({ opacity }: { opacity: MotionValue<number> }) {
  return (
    <motion.div className={styles.root} style={{ opacity }} aria-hidden="true">
      {BLURS.map((blur, i) => (
        <div
          key={blur}
          className={styles.layer}
          style={{
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            maskImage: layerMask(i),
            WebkitMaskImage: layerMask(i),
          }}
        />
      ))}
    </motion.div>
  );
}
