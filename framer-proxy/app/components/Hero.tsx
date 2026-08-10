"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import styles from "./Hero.module.css";

const logos = [
  "Vip Marketing",
  "Daiorus",
  "House of Indika",
  "Silver Looms",
  "WORKPUNKT",
  "Arovave",
  "Elevenx.Ai",
  "YogaFloww",
];

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
        <div className={styles.topSection}>
          <motion.div
            className={styles.leftColumn}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className={styles.badge} variants={itemVariants}>
              <span className={styles.pulse} />
              Available for August &apos;25
            </motion.div>

            <motion.h1 className={styles.title} variants={itemVariants}>
              <span className={styles.titleGray}>Design that</span> <br />
              <span className={styles.titleBlack}>delivers results.</span>
            </motion.h1>

            <motion.p className={styles.subtitle} variants={itemVariants}>
              <span className={styles.subtitleBold}>
              Strategic development that drives growth, not just working code.
              </span>{" "}
              <span className={styles.subtitleSubtle}>
              I build everything your business needs to go from idea to revenue.
              </span>
            </motion.p>

            <motion.div className={styles.actions} variants={itemVariants}>
              <Link href="#contact" className={styles.bookCallBtn}>
                <div className={styles.avatarWrap}>
                  <div className={styles.avatarInner} />
                </div>
                Book a call with me
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.rightColumn}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className={styles.cardsWrapper}>
              <div className={`${styles.card} ${styles.card1}`}>
                <Image
                  src="/card2.png"
                  alt="Project preview"
                  fill
                  className={styles.cardImage}
                  sizes="440px"
                />
              </div>
              <div className={`${styles.card} ${styles.card2}`}>
                <Image
                  src="/card3.png"
                  alt="Project preview"
                  fill
                  className={styles.cardImage}
                  sizes="440px"
                />
              </div>
              <div className={`${styles.card} ${styles.card3}`}>
                <Image
                  src="/card1.png"
                  alt="Featured project preview"
                  fill
                  priority
                  className={styles.cardImage}
                  sizes="440px"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className={styles.bottomSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className={styles.clientStats}>
            <div className={styles.avatars}>
              <div className={styles.miniAvatar} style={{ zIndex: 5 }} />
              <div className={styles.miniAvatar} style={{ zIndex: 4 }} />
              <div className={styles.miniAvatar} style={{ zIndex: 3 }} />
              <div className={styles.miniAvatar} style={{ zIndex: 2 }} />
              <div className={styles.miniAvatar} style={{ zIndex: 1 }} />
            </div>
            <div className={styles.ratingInfo}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill="currentColor"
                    color="currentColor"
                  />
                ))}
              </div>
              <span className={styles.happyClientsText}>29+ Happy clients</span>
            </div>
          </div>

          <div className={styles.logosWrapper}>
            <div className={styles.logosTrack}>
              {[...logos, ...logos].map((logo, i) => (
                <div key={`${logo}-${i}`} className={styles.logoItem}>
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
