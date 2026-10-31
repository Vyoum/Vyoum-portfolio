"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Mail } from "lucide-react";
import { IconGitHub, IconLinkedIn } from "./BrandIcons";
import { BOOK_CALL_HREF, EMAIL_HREF, SITE } from "../lib/site";
import styles from "./Footer.module.css";

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

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % rotatingWords.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

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
          <span className={styles.headlinePrimary}>
            <span className={styles.rotatingPhrase} aria-live="polite">
              <span>Let&apos;s</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={rotatingWords[wordIndex]}
                  className={styles.rotatingWord}
                  initial={{ opacity: 0, y: "0.55em" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: "-0.55em" }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className={styles.dot} aria-hidden />
          </span>
          <span className={styles.headlineMuted}>incredible work together.</span>
        </h2>

        <div className={styles.contactRow}>
          <div className={styles.block}>
            <p className={styles.label}>Email</p>
            <a href={EMAIL_HREF} className={styles.value}>
              {SITE.email}
            </a>
          </div>

          <div className={styles.block}>
            <p className={styles.label}>Call Me</p>
            <a href={BOOK_CALL_HREF} className={styles.value}>
              Book Now
            </a>
          </div>

          <div className={styles.block}>
            <p className={styles.label}>Social</p>
            <div className={styles.socials}>
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  className={styles.socialIcon}
                  aria-label={label}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className={styles.socialGlyph}>
                    <Icon />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.navRow}>
          <div className={styles.block}>
            <p className={styles.label}>Menu</p>
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
            <p className={styles.label}>Based in</p>
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
