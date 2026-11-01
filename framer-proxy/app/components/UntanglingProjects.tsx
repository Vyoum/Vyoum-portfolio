"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { PROJECTS } from "../lib/projects";
import { SITE } from "../lib/site";
import { blockTransition } from "../lib/motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import UntanglingProjectCard from "./UntanglingProjectCard";
import { RevealText } from "./Reveal";
import ProgressiveBlur from "./ProgressiveBlur";
import styles from "./UntanglingProjects.module.css";

const MotionLink = motion.create(Link);
/** Keep in sync with the `82vh` in `.scene` height. */
const SETTLE_VH = 0.82;
const HIDDEN = { opacity: 0.001 };
const SHOWN = { opacity: 1 };

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

  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const viewportH = useMotionValue(900);

  useEffect(() => {
    const update = () => viewportH.set(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [viewportH]);

  /* Reference: cards converge linearly over scrollY 0 → 0.82 × innerHeight
     (Lenis supplies the smoothing). .scene height unpins right at t = 1. */
  const progress = useTransform([scrollY, viewportH], ([y, h]) =>
    Math.min(1, Math.max(0, (y as number) / (SETTLE_VH * (h as number))))
  );

  /* Soft hero exit — same continuous ground; cards are the main motion */
  /* Hero is fully gone before the heading starts — they share the same band */
  const heroOpacity = useTransform(progress, [0, 0.25, 0.45], [1, 0.5, 0]);
  const heroY = useTransform(progress, [0, 0.45], [0, -28]);
  const heroPointer = useTransform(progress, (p) => (p > 0.35 ? "none" : "auto"));

  const headingOpacity = useTransform(progress, [0.48, 0.75], [0, 1]);
  const headingY = useTransform(progress, [0.48, 0.75], [16, 0]);
  const hintOpacity = useTransform(progress, [0, 0.18], [1, 0]);

  /* Bottom progressive blur only while the hero scene fills the viewport */
  const sceneEnd = useMotionValue(Infinity);
  useEffect(() => {
    const scene = containerRef.current;
    if (!scene) return;
    const measure = () => sceneEnd.set(scene.offsetHeight - window.innerHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(scene);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [sceneEnd]);
  const blurOpacity = useTransform([scrollY, sceneEnd], ([y, end]) =>
    Math.min(1, Math.max(0, ((end as number) - (y as number)) / 160))
  );

  /* Word reveal for "Latest Projects" once its fade-in starts */
  const [headingShown, setHeadingShown] = useState(false);
  useMotionValueEvent(progress, "change", (p) => {
    if (p > 0.5 && !headingShown) setHeadingShown(true);
  });

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
              initial={HIDDEN}
              animate={SHOWN}
              transition={blockTransition(0.4, 0.6, reduced)}
            >
              <span className={styles.pulse} aria-hidden="true" />
              Available for new projects
            </motion.div>

            <RevealText
              as="h1"
              trigger="mount"
              delay={0.4}
              breakLines
              className={styles.heroTitle}
              lines={[
                { text: "Systems that", className: styles.titleGray },
                { text: "scale Growth.", className: styles.titleBlack },
              ]}
            />

            <RevealText
              as="p"
              trigger="mount"
              delay={0.5}
              stagger={0.02}
              className={styles.heroSubtitle}
              lines={[
                {
                  text: "Strategic development that drives growth, not just working code.",
                  className: styles.subtitleBold,
                },
                {
                  text: "29+ products delivered across 3+ countries, turning ambitious ideas into digital experiences built to scale.",
                  className: styles.subtitleSubtle,
                },
              ]}
            />

            <MotionLink
              href="#contact"
              className={styles.bookCallBtn}
              initial={HIDDEN}
              animate={SHOWN}
              transition={blockTransition(0.4, 0.6, reduced)}
            >
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
            </MotionLink>

            {/* Clients + logos — under the CTA, logos flow out from happy clients */}
            <motion.div
              className={styles.logosBar}
              initial={HIDDEN}
              animate={SHOWN}
              transition={blockTransition(0.6, 0.6, reduced)}
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
            <RevealText
              as="h2"
              trigger="manual"
              play={headingShown}
              className={styles.title}
              text="Latest Projects"
            />
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.viewAll}
            >
              View all my projects
              <ArrowRight size={16} />
            </a>
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
                settleAt={1}
                reduced={reduced}
              />
            ))}
          </div>
        </div>
      </div>
      <ProgressiveBlur opacity={blurOpacity} />
    </section>
  );
}
