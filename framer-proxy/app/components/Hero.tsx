"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type Variants } from "framer-motion";
import styles from "./Hero.module.css";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });
  const card1Transform = useTransform(
    smoothProgress,
    [0, 0.55, 1],
    ["translate(-50%, -50%) rotate(-7deg) scale(0.85)", "translate(-70%, -36%) rotate(-14deg) scale(0.85)", "translate(-82%, -22%) rotate(-16deg) scale(0.85)"]
  );
  const card2Transform = useTransform(
    smoothProgress,
    [0, 0.55, 1],
    ["translate(-50%, -50%) rotate(5deg) scale(0.9)", "translate(-35%, -38%) rotate(11deg) scale(0.9)", "translate(-20%, -20%) rotate(13deg) scale(0.9)"]
  );
  const card3Transform = useTransform(
    smoothProgress,
    [0, 0.55, 1],
    ["translate(-50%, -50%) rotate(-2deg) scale(1)", "translate(-50%, -38%) rotate(0deg) scale(1.03)", "translate(-50%, -18%) rotate(0deg) scale(1.06)"]
  );

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
    <section ref={heroRef} className={`section ${styles.hero}`} id="home">
      <div className={`container ${styles.container}`}>
        <div className={styles.topSection}>
          {/* Left Column */}
          <motion.div
            className={styles.leftColumn}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className={styles.badge} variants={itemVariants}>
              <span className={styles.pulse}></span>
              Available for August &apos;25
            </motion.div>

            <motion.h1 className={styles.title} variants={itemVariants}>
              <span className={styles.titleGray}>Design that</span> <br />
              <span className={styles.titleBlack}>delivers results.</span>
            </motion.h1>

            <motion.p className={styles.subtitle} variants={itemVariants}>
              <span className={styles.subtitleBold}>Strategic design that drives growth, not just looks good.</span>{" "}
              <span className={styles.subtitleSubtle}>I create everything your brand needs to attract customers and turn them into sales.</span>
            </motion.p>

            <motion.div className={styles.actions} variants={itemVariants}>
              <Link href="#contact" className={styles.bookCallBtn}>
                <div className={styles.avatarWrap}>
                  <div className={styles.avatarInner}>
                    {/* Placeholder for avatar */}
                  </div>
                </div>
                Book a call with me
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            className={styles.rightColumn}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.cardsWrapper}>
              <motion.div className={`${styles.card} ${styles.card1}`} style={{ transform: card1Transform }}>
                <Image src="/card2.png" alt="Project 1" fill className={styles.cardImage} />
              </motion.div>
              <motion.div className={`${styles.card} ${styles.card2}`} style={{ transform: card2Transform }}>
                <Image src="/card3.png" alt="Project 2" fill className={styles.cardImage} />
              </motion.div>
              <motion.div className={`${styles.card} ${styles.card3}`} style={{ transform: card3Transform }}>
                <Image src="/card1.png" alt="Project 3" fill className={styles.cardImage} />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className={styles.bottomSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className={styles.clientStats}>
            <div className={styles.avatars}>
               <div className={styles.miniAvatar} style={{ zIndex: 5 }}></div>
               <div className={styles.miniAvatar} style={{ zIndex: 4 }}></div>
               <div className={styles.miniAvatar} style={{ zIndex: 3 }}></div>
               <div className={styles.miniAvatar} style={{ zIndex: 2 }}></div>
               <div className={styles.miniAvatar} style={{ zIndex: 1 }}></div>
            </div>
            <div className={styles.ratingInfo}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" color="currentColor" />
                ))}
              </div>
              <span className={styles.happyClientsText}>99+ Happy clients</span>
            </div>
          </div>
          
          <div className={styles.logosWrapper}>
            <div className={styles.logosTrack}>
              <div className={styles.logoItem}>WORKPUNKT</div>
              <div className={styles.logoItem}>Daiorus</div>
              <div className={styles.logoItem}>Kintsugi</div>
              <div className={styles.logoItem}>CoreOS</div>
              <div className={styles.logoItem}>Luminary</div>
              {/* Duplicate for infinite scroll */}
              <div className={styles.logoItem}>WORKPUNKT</div>
              <div className={styles.logoItem}>Daiorus</div>
              <div className={styles.logoItem}>Kintsugi</div>
              <div className={styles.logoItem}>CoreOS</div>
              <div className={styles.logoItem}>Luminary</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
