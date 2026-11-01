"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useScroll,
} from "framer-motion";
import Link from "next/link";
import { blockTransition } from "../lib/motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import styles from "./Navbar.module.css";

const navLinks = [
  { name: "Work", href: "#work" },
  { name: "Services", href: "#services" },
  { name: "Pricing", href: "#pricing" },
  { name: "Blog", href: "#blog" },
] as const;

const spring = {
  type: "spring" as const,
  bounce: 0,
  duration: 0.45,
};

function DotsButton({
  open,
  onClick,
  onMouseEnter,
}: {
  open: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={styles.dots}
    >
      <span className={`${styles.dot} ${open ? styles.dotXLeft : styles.dot1}`} />
      <span className={`${styles.dot} ${open ? styles.dotHidden : styles.dot2}`} />
      <span className={`${styles.dot} ${open ? styles.dotXRight : styles.dot3}`} />
    </button>
  );
}

export default function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  /** Desktop: collapsed pill re-expands while hovered / focused. */
  const [peek, setPeek] = useState(false);
  const { scrollY } = useScroll();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      const nextCollapsed = latest > 50;
      setIsCollapsed(nextCollapsed);
      if (!nextCollapsed) {
        setMenuOpen(false);
        setPeek(false);
      }
    });
  }, [scrollY]);

  const showLinks = !isCollapsed || peek || menuOpen;

  return (
    <header className={styles.header}>
      <motion.div
        className={styles.wrap}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={blockTransition(0.1, 0.6, reduced)}
        onMouseEnter={() => {
          if (isCollapsed) setPeek(true);
        }}
        onMouseLeave={() => {
          setPeek(false);
          if (isCollapsed) setMenuOpen(false);
        }}
        onFocus={() => {
          if (isCollapsed) setPeek(true);
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setPeek(false);
          }
        }}
      >
        <LayoutGroup id="site-nav">
          <motion.nav
            layout
            transition={spring}
            aria-label="Primary"
            className={styles.nav}
            style={{
              gap: showLinks ? 88 : 40,
            }}
          >
            <motion.div layout="position" transition={spring} className={styles.brand}>
              <Link href="/" className={styles.brandLink}>
                <span
                  className={styles.avatar}
                  style={{
                    backgroundImage: 'url("/avatar.png")',
                  }}
                  aria-hidden
                />
                <span className={styles.name}>Vyoum Agarwaal</span>
              </Link>
            </motion.div>

            <div className={styles.actions}>
              <AnimatePresence mode="wait" initial={false}>
                {showLinks ? (
                  <motion.div
                    key="links"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className={styles.links}
                    aria-label="Site sections"
                  >
                    {navLinks.map((link) => (
                      <Link key={link.name} href={link.href} className={styles.link}>
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="dots"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className={styles.dotsDesktop}
                  >
                    <DotsButton open={false} onClick={() => setPeek(true)} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Contact stays outside the link morph so it never collapses into them */}
              {showLinks && (
                <Link href="#contact" className={styles.contact}>
                  Contact
                </Link>
              )}

              <div className={styles.dotsMobile}>
                <DotsButton
                  open={menuOpen}
                  onClick={() => setMenuOpen((o) => !o)}
                />
              </div>
            </div>
          </motion.nav>
        </LayoutGroup>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="nav-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className={styles.mobileMenu}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={styles.mobileLink}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className={styles.contact}
              >
                Contact
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
