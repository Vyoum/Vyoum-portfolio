"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import styles from "./Navbar.module.css";

const navLinks = [
  { name: "Work", href: "#work" },
  { name: "Services", href: "#services" },
  { name: "Pricing", href: "#pricing" },
  { name: "Blog", href: "#blog" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.header
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className={styles.pillContainer}>
        <Link href="/" className={styles.profileSection}>
          <div className={styles.avatar}></div>
          <span className={styles.name}>Joseph Alexander</span>
        </Link>

        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className={styles.navLink}>
              {link.name}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href="#contact" className={styles.contactBtn}>
            Contact
          </Link>
          <button
            className={styles.mobileToggle}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          className={styles.mobileMenu}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
