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
            <div className={styles.badge}>
              <span className={styles.pulse} />
              Available from August &apos;26
            </div>

            <h1 className={styles.heroTitle}>
              <span className={styles.titleGray}>Systems that</span>
              <br />
              <span className={styles.titleBlack}>scale Growth.</span>
            </h1>

            <p className={styles.heroSubtitle}>
              <span className={styles.subtitleBold}>
              Strategic development that drives growth, not just working code.
              </span>{" "}
              <span className={styles.subtitleSubtle}>
              I build everything your business needs to go from idea to revenue.
              </span>
            </p>

            <Link href="#contact" className={styles.bookCallBtn}>
              <div className={styles.avatarWrap}>
                <div className={styles.avatarInner} />
              </div>
              Book a call with me
            </Link>

            {/* Clients + logos — under the CTA, logos flow out from happy clients */}
            <div className={styles.logosBar}>
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
            </div>
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
