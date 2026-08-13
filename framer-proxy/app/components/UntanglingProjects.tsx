"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { PROJECTS } from "../lib/projects";
import UntanglingProjectCard from "./UntanglingProjectCard";
import styles from "./UntanglingProjects.module.css";

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

/**
 * One continuous hero → projects scroll scene:
 *  - progress ~0    → hero visible; same 4 cards piled in the hero right column
 *  - progress ~0.72 → hero faded; cards settled into the Latest Projects grid
 */
export default function UntanglingProjects() {
  const containerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const pileRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
    mass: 0.35,
  });

  /* Soft hero exit — same continuous ground; cards are the main motion */
  const heroOpacity = useTransform(progress, [0, 0.28, 0.52], [1, 0.55, 0]);
  const heroY = useTransform(progress, [0, 0.52], [0, -28]);
  const heroPointer = useTransform(progress, (p) => (p > 0.4 ? "none" : "auto"));

  const headingOpacity = useTransform(progress, [0.3, 0.55], [0, 1]);
  const headingY = useTransform(progress, [0.3, 0.55], [16, 0]);
  const hintOpacity = useTransform(progress, [0, 0.14], [1, 0]);

  return (
    <section
      id="home"
      ref={containerRef}
      className={styles.scene}
      aria-label="Hero and latest projects"
    >
      <div ref={stickyRef} className={styles.sticky}>
        <div className={`container ${styles.frame}`}>
          {/* Hero copy — same frame as the cards, left column */}
          <motion.div
            style={{ opacity: heroOpacity, y: heroY, pointerEvents: heroPointer }}
            className={styles.heroCopy}
          >
            <motion.div
              className={styles.badge}
              initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.pulse} />
              Available from August &apos;26
            </motion.div>

            <h1 className={styles.heroTitle}>
              <span className={styles.titleLine}>
                <motion.span
                  className={styles.titleGray}
                  initial={{ opacity: 0, y: "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  Systems that
                </motion.span>
              </span>
              <br />
              <span className={styles.titleLine}>
                <motion.span
                  className={styles.titleBlack}
                  initial={{ opacity: 0, y: "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  scale Growth.
                </motion.span>
              </span>
            </h1>

            <motion.p
              className={styles.heroSubtitle}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.subtitleBold}>
              Strategic development that drives growth, not just working code.
              </span>{" "}
              <span className={styles.subtitleSubtle}>
              29+ products delivered across 3+ countries, turning ambitious ideas into digital experiences built to scale.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.54, ease: [0.22, 1, 0.36, 1] }}
            >
            <Link href="#contact" className={styles.bookCallBtn}>
              <span className={styles.bookCallPeople}>
                <span className={styles.avatarWrap}>
                  <span className={styles.avatarInner} />
                </span>
                <span className={styles.bookCallExtra} aria-hidden="true">
                  <span className={styles.plusSign}>+</span>
                  <span className={styles.youChip}>You</span>
                </span>
              </span>
              Book a call with me
            </Link>
            </motion.div>

            {/* Clients + logos — under the CTA, logos flow out from happy clients */}
            <motion.div
              className={styles.logosBar}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.clientStats}>
                <div className={styles.avatars}>
                  {[5, 4, 3, 2, 1].map((z, i) => (
                    <div
                      key={z}
                      className={styles.miniAvatar}
                      style={{ zIndex: z }}
                      data-i={i + 1}
                    />
                  ))}
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

              <div className={styles.logosDivider} aria-hidden />

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
          </motion.div>

          {/* Pile target in the hero’s right column — cards sit here on load */}
          <div className={styles.pileSlot} aria-hidden>
            <div ref={pileRef} className={styles.pileAnchor} />
            <motion.p style={{ opacity: hintOpacity }} className={styles.hint}>
              
            </motion.p>
          </div>

          {/* Latest Projects heading — fades in as the pile opens */}
          <motion.div
            id="work"
            style={{ opacity: headingOpacity, y: headingY }}
            className={styles.header}
          >
            <h2 className={styles.title}>Latest Projects</h2>
            <Link href="#work" className={styles.viewAll}>
              View all my projects
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Same four cards: piled at pileRef → settle into this grid */}
          <div className={styles.grid}>
            {PROJECTS.map((project, index) => (
              <UntanglingProjectCard
                key={project.id}
                project={project}
                index={index}
                progress={progress}
                stickyRef={stickyRef}
                pileRef={pileRef}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
