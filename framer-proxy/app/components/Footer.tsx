"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Footer.module.css";

function IconX() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden width="14" height="14">
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L2.25 2.25h5.783l4.261 5.685L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"
      />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden width="14" height="14">
      <path
        fill="currentColor"
        d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2Zm0 7.92A3.12 3.12 0 1 1 12 8.88a3.12 3.12 0 0 1 0 6.24Zm6.288-8.112a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0ZM12 2.16c-2.712 0-3.048.012-4.116.06-1.068.048-1.8.216-2.436.468a4.92 4.92 0 0 0-1.776 1.152A4.92 4.92 0 0 0 2.52 5.616c-.252.636-.42 1.368-.468 2.436C2.004 9.12 1.992 9.456 1.992 12.168s.012 3.048.06 4.116c.048 1.068.216 1.8.468 2.436a4.92 4.92 0 0 0 1.152 1.776 4.92 4.92 0 0 0 1.776 1.152c.636.252 1.368.42 2.436.468 1.068.048 1.404.06 4.116.06s3.048-.012 4.116-.06c1.068-.048 1.8-.216 2.436-.468a4.92 4.92 0 0 0 1.776-1.152 4.92 4.92 0 0 0 1.152-1.776c.252-.636.42-1.368.468-2.436.048-1.068.06-1.404.06-4.116s-.012-3.048-.06-4.116c-.048-1.068-.216-1.8-.468-2.436a4.92 4.92 0 0 0-1.152-1.776A4.92 4.92 0 0 0 18.552 2.688c-.636-.252-1.368-.42-2.436-.468C15.048 2.172 14.712 2.16 12 2.16Zm0 1.68c2.664 0 2.976.012 4.032.06.972.044 1.5.204 1.852.34.468.18.804.396 1.156.748.352.352.568.688.748 1.156.136.352.296.88.34 1.852.048 1.056.06 1.368.06 4.032s-.012 2.976-.06 4.032c-.044.972-.204 1.5-.34 1.852-.18.468-.396.804-.748 1.156a3.12 3.12 0 0 1-1.156.748c-.352.136-.88.296-1.852.34-1.056.048-1.368.06-4.032.06s-2.976-.012-4.032-.06c-.972-.044-1.5-.204-1.852-.34a3.12 3.12 0 0 1-1.156-.748 3.12 3.12 0 0 1-.748-1.156c-.136-.352-.296-.88-.34-1.852C4.212 14.976 4.2 14.664 4.2 12s.012-2.976.06-4.032c.044-.972.204-1.5.34-1.852.18-.468.396-.804.748-1.156.352-.352.688-.568 1.156-.748.352-.136.88-.296 1.852-.34C9.024 3.852 9.336 3.84 12 3.84Z"
      />
    </svg>
  );
}

function IconDribbble() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden width="14" height="14">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm6.61 5.48a8.03 8.03 0 0 1 1.72 4.9c-.24-.05-2.63-.53-5.04-.23-.07-.18-.15-.36-.23-.54-.22-.5-.47-1-.73-1.48 2.68-1.1 3.9-2.66 4.28-2.65ZM12 3.67c1.76 0 3.37.58 4.67 1.55-.34.46-1.42 1.9-4.18 2.9A32.8 32.8 0 0 0 9.3 4.4 8.28 8.28 0 0 1 12 3.67ZM7.86 5.1c.54.74 1.95 2.54 3.2 4.2-4.04 1.07-7.6 1.05-8 1.04A8.35 8.35 0 0 1 7.86 5.1ZM3.67 12c0-.08 0-.16.01-.24.48.01 4.66.06 9.04-1.25.25.49.49.99.7 1.5-.11.03-.22.07-.33.1-4.51 1.46-6.91 5.46-7.15 5.87A8.3 8.3 0 0 1 3.67 12Zm8.33 8.33a8.28 8.28 0 0 1-5.05-1.72c.2-.36 2.28-4.16 6.98-5.79.02 0 .04-.01.06-.02.97 2.52 1.37 4.63 1.5 5.34a8.27 8.27 0 0 1-3.49 2.19Zm4.72-1.7c-.1-.58-.48-2.55-1.4-5.05 2.25-.36 4.24.23 4.5.31a8.34 8.34 0 0 1-3.1 4.74Z"
      />
    </svg>
  );
}

function IconBehance() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden width="14" height="14">
      <path
        fill="currentColor"
        d="M8.97 11.15c.72-.34 1.1-.93 1.1-1.8 0-1.42-1.05-2.25-2.84-2.25H2.5v9.72h4.9c1.9 0 3.2-.95 3.2-2.64 0-1.15-.66-2.02-1.63-2.43ZM5.1 8.45h1.72c.86 0 1.33.4 1.33 1.1 0 .72-.47 1.13-1.33 1.13H5.1V8.45Zm1.92 6.15H5.1v-2.5h1.98c.98 0 1.5.45 1.5 1.25s-.54 1.25-1.56 1.25ZM15.8 8.2h4.1v1.1h-4.1V8.2Zm2.12 2.05c-2.35 0-3.9 1.65-3.9 3.9 0 2.3 1.55 3.9 3.95 3.9 1.85 0 3.05-.85 3.55-2.25h-1.85c-.25.55-.85.9-1.7.9-1.2 0-2-.75-2.1-1.9h5.85c.05-.25.05-.5.05-.75 0-2.2-1.35-3.8-3.85-3.8Zm-1.95 3c.15-1.1.9-1.8 1.95-1.8 1.1 0 1.8.7 1.85 1.8h-3.8Z"
      />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden width="14" height="14">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z"
      />
    </svg>
  );
}

type Social = {
  href: string;
  label: string;
  Icon: () => React.ReactElement;
  count?: string;
};

const socials: Social[] = [
  { href: "#", label: "X", Icon: IconX, count: "1,214" },
  { href: "#", label: "Instagram", Icon: IconInstagram },
  { href: "#", label: "Dribbble", Icon: IconDribbble },
  { href: "#", label: "Behance", Icon: IconBehance },
  { href: "#", label: "LinkedIn", Icon: IconLinkedIn },
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
        <span className={styles.badgeName}>Joseph Alexander</span>
      </div>

      <div className={`container ${styles.inner}`}>
        <h2 className={styles.headline}>
          <span className={styles.headlinePrimary}>
            <span className={styles.rotatingPhrase} aria-live="polite">
              <span>Let&apos;s </span>
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
            <a href="mailto:joseph@launchnow.design" className={styles.value}>
              joseph@launchnow.design
            </a>
          </div>

          <div className={styles.block}>
            <p className={styles.label}>Call Me</p>
            <Link href="#contact" className={styles.value}>
              Book Now
            </Link>
          </div>

          <div className={styles.block}>
            <p className={styles.label}>Social</p>
            <div className={styles.socials}>
              {socials.map(({ href, label, Icon, count }) => (
                <Link
                  key={label}
                  href={href}
                  className={count ? styles.socialPill : styles.socialIcon}
                  aria-label={label}
                >
                  <span className={styles.socialGlyph}>
                    <Icon />
                  </span>
                  {count ? <span className={styles.socialCount}>{count}</span> : null}
                </Link>
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
            <p className={styles.label}>Legal</p>
            <div className={styles.menuCol}>
              <Link href="#">Terms of service</Link>
              <Link href="#">Privacy Policy</Link>
            </div>
          </div>

          <p className={styles.copyright}>© 2026 Joseph Alexander</p>
        </div>
      </div>

      <div className={styles.wordmark} aria-hidden>
        JOSEPH
      </div>
    </footer>
  );
}
