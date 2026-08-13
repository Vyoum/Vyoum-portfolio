"use client";

import { motion } from "framer-motion";
import styles from "./FeaturedReview.module.css";

export default function FeaturedReview() {
  return (
    <section className={styles.section} aria-label="Client review">
      <div className={`container ${styles.inner}`}>
        <motion.blockquote
          className={styles.quote}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          Working with Joseph felt like having a seasoned design partner{" "}
          <strong>who truly understood our vision for KYMA</strong> and brought
          it to life in ways we hadn&apos;t even imagined.
        </motion.blockquote>

        <motion.div
          className={styles.author}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className={styles.avatar}
            style={{
              backgroundImage: 'url("/priiya-rao.png")',
            }}
            role="img"
            aria-label="Priiya Rao"
          />
          <div className={styles.meta}>
            <p className={styles.name}>Priiya Rao</p>
            <p className={styles.role}>Co-founder of KYMA</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
