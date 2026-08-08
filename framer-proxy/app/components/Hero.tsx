"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import styles from "./Hero.module.css";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <section className={`section ${styles.hero}`} id="home">
      <div className={`container ${styles.container}`}>
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className={styles.badge} variants={itemVariants}>
            <span className={styles.pulse}></span>
            Available for August &apos;26
          </motion.div>

          <motion.h1 className={styles.title} variants={itemVariants}>
            Design that <br />
            <span className="text-gradient">delivers results.</span>
          </motion.h1>

          <motion.p className={styles.subtitle} variants={itemVariants}>
            Strategic design that drives growth, not just looks good. I create
            everything your brand needs to attract customers and turn them into sales.
          </motion.p>

          <motion.div className={styles.actions} variants={itemVariants}>
            <Link href="#work" className="btn-primary">
              View my work <ArrowRight size={18} />
            </Link>
            <Link href="#contact" className="btn-secondary">
              Book a call
            </Link>
          </motion.div>

          <motion.div className={styles.techStack} variants={itemVariants}>
            <p className={styles.techTitle}>99+ Happy clients</p>
            <div className={styles.techTags}>
              {["Figma", "Framer", "Webflow", "Rive", "Blender"].map((tech) => (
                <span key={tech} className={styles.techTag}>
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
