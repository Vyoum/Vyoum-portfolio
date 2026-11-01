"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Mail } from "lucide-react";
import { blockTransition } from "../lib/motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import styles from "./FloatingCTA.module.css";

/** Reference: contact pill slides up once scrollY passes ~300px. */
const SHOW_AFTER_PX = 300;

/**
 * Site-wide base CTA — fixed at the bottom once the visitor starts scrolling;
 * hides near the top and over the footer contact block.
 */
export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const update = () => {
      const footer = document.getElementById("contact");
      const nearFooter =
        footer != null && footer.getBoundingClientRect().top < window.innerHeight - 40;
      setVisible(window.scrollY > SHOW_AFTER_PX && !nearFooter);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className={styles.bar}
          initial={{ opacity: 0, y: 100, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 100, x: "-50%" }}
          transition={blockTransition(0, 0.5, reduced)}
        >
          <Link href="#contact" className={styles.contact}>
            <Mail size={16} strokeWidth={2.25} />
            Contact
          </Link>
          <Link href="#contact" className={styles.book}>
            <CalendarCheck size={16} strokeWidth={2.25} />
            Book a call
          </Link>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
