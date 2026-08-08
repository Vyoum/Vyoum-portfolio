"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { MoreHorizontal, X } from "lucide-react";
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

        <button
          className={styles.menuToggle}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <MoreHorizontal size={20} />}
        </button>
      </div>

      {/* Mobile Menu (Now acts as the main menu since links are hidden) */}
      {mobileOpen && (
        <motion.div
          className={styles.dropdownMenu}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={styles.menuNavLink}
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link href="#contact" className={styles.menuContactBtn} onClick={() => setMobileOpen(false)}>
            Book a call
          </Link>
        </motion.div>
      )}
    </motion.header>
  );
}
