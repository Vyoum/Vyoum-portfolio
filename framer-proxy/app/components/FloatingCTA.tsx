"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Mail } from "lucide-react";
import styles from "./FloatingCTA.module.css";

/**
 * Site-wide base CTA — fixed at the bottom after the first (home) frame.
 */
export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const home = document.getElementById("home");

    const update = () => {
      if (!home) {
        setVisible(window.scrollY > window.innerHeight * 0.85);
        return;
      }
      const homeBottom = home.getBoundingClientRect().bottom;
      const footer = document.getElementById("contact");
      const nearFooter =
        footer != null && footer.getBoundingClientRect().top < window.innerHeight - 40;

      // Show once the first frame has scrolled past; hide over the footer CTA
      setVisible(homeBottom < window.innerHeight * 0.35 && !nearFooter);
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
          initial={{ opacity: 0, y: 24, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 16, x: "-50%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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
