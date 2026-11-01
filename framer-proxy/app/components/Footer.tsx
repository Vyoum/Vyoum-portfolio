"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Mail } from "lucide-react";
import { IconGitHub, IconLinkedIn } from "./BrandIcons";
import { BOOK_CALL_HREF, EMAIL_HREF, SITE } from "../lib/site";
import {
  EASE_HOVER,
  REVEAL_VIEWPORT,
  TEXT_SPRING,
  blockTransition,
} from "../lib/motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { RevealBlock, RevealText } from "./Reveal";
import styles from "./Footer.module.css";

const WORD_CYCLE_MS = 2500;

function FooterLabel({ children, reduced }: { children: React.ReactNode; reduced: boolean }) {
  return (
    <motion.p
      className={styles.label}
      initial={{ opacity: 0, y: "-50%" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={REVEAL_VIEWPORT}
      transition={blockTransition(0, 0.4, reduced)}
    >
      {children}
    </motion.p>
  );
}

type Social = {
  href: string;
  label: string;
  Icon: (props: { size?: number }) => React.ReactElement;
};

const socials: Social[] = [
  { href: SITE.linkedin, label: "LinkedIn", Icon: IconLinkedIn },
  { href: SITE.github, label: "GitHub", Icon: IconGitHub },
  { href: EMAIL_HREF, label: "Email", Icon: ({ size = 14 }) => <Mail size={size} /> },
];

const rotatingWords = ["Develop", "Design", "Build", "Scale", "Automate"];

export default function Footer() {
  const [wordIndex, setWordIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const interval = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % rotatingWords.length);
    }, WORD_CYCLE_MS);

    return () => window.clearInterval(interval);
  }, [reduced]);

  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.badge}>
        <span
          className={styles.badgeAvatar}
          style={{
            backgroundImage: 'url("https://i.pravatar.cc/100?img=11")',
          }}
        />
        <span className={styles.badgeName}>{SITE.name}</span>
      </div>

      <div className={`container ${styles.inner}`}>
        <h2 className={styles.headline}>
          <RevealBlock as="span" className={styles.headlinePrimary}>
            <span className={styles.rotatingPhrase} aria-live="polite">
              <span>Let&apos;s</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={rotatingWords[wordIndex]}
                  className={`${styles.rotatingWord} rv-blur`}
                  initial={{ opacity: 0, filter: "blur(5px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(5px)" }}
                  transition={TEXT_SPRING}
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className={styles.dot} aria-hidden />
          </RevealBlock>
          <RevealText
            as="span"
            delay={0.1}
            className={styles.headlineMuted}
            text="incredible work together."
          />
        </h2>

        <div className={styles.contactRow}>
          <div className={styles.block}>
            <FooterLabel reduced={reduced}>Email</FooterLabel>
            <a href={EMAIL_HREF} className={styles.value}>
              {SITE.email}
            </a>
          </div>

          <div className={styles.block}>
            <FooterLabel reduced={reduced}>Call Me</FooterLabel>
            <a href={BOOK_CALL_HREF} className={styles.value}>
              Book Now
            </a>
          </div>

          <div className={styles.block}>
            <FooterLabel reduced={reduced}>Social</FooterLabel>
            <div className={styles.socials}>
              {socials.map(({ href, label, Icon }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  className={styles.socialIcon}
                  aria-label={label}
                  initial={{ opacity: 0, x: 5 + 5 * i }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={
                    reduced
                      ? undefined
                      : { y: -5, transition: { duration: 0.25, ease: EASE_HOVER } }
                  }
                  viewport={REVEAL_VIEWPORT}
                  transition={blockTransition(0.1 * i, 0.5, reduced)}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className={styles.socialGlyph}>
                    <Icon />
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.navRow}>
          <div className={styles.block}>
            <FooterLabel reduced={reduced}>Menu</FooterLabel>
            <div className={styles.menuGrid}>
              <div className={styles.menuCol}>
                <Link href="#work">Work</Link>
                <Link href="#pricing">Pricing</Link>
              </div>
              <div className={styles.menuCol}>
                <Link href="#services">Services</Link>
                <Link href="#blog">Blog</Link>
              </div>
            </div>
          </div>

          <div className={styles.block}>
            <FooterLabel reduced={reduced}>Based in</FooterLabel>
            <div className={styles.menuCol}>
              <span>{SITE.location}</span>
              <span>Remote, worldwide</span>
            </div>
          </div>

          <p className={styles.copyright}>© 2026 {SITE.name}</p>
        </div>
      </div>

      <div className={styles.wordmark} aria-hidden>
        VYOUM
      </div>
    </footer>
  );
}
