"use client";

import React from "react";
import styles from "./Footer.module.css";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={`container ${styles.container}`}>
        <div className={styles.top}>
          <div className={styles.letstalk}>
            <h2>
              Let&apos;s design <br />
              build <br />
              create <br />
              <span className="text-gradient">incredible work</span> together.
            </h2>
          </div>
          
          <div className={styles.contactInfo}>
            <div className={styles.contactBlock}>
              <p className={styles.label}>Email</p>
              <a href="mailto:joseph@launchnow.design" className={styles.link}>
                joseph@launchnow.design <ArrowUpRight size={16} />
              </a>
            </div>
            <div className={styles.contactBlock}>
              <p className={styles.label}>Call Me</p>
              <Link href="#" className={styles.link}>
                Book Now <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className={styles.contactBlock}>
              <p className={styles.label}>Social</p>
              <div className={styles.socials}>
                <Link href="#" className={styles.link}>X <ArrowUpRight size={16} /></Link>
                <Link href="#" className={styles.link}>LinkedIn <ArrowUpRight size={16} /></Link>
                <Link href="#" className={styles.link}>Dribbble <ArrowUpRight size={16} /></Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <div className={styles.copyright}>
            © 2026 Joseph Alexander
          </div>
          <div className={styles.footerLinks}>
            <Link href="#">Terms of service</Link>
            <Link href="#">Privacy Policy</Link>
          </div>
          <div className={styles.bigLogo}>
            JOSEPH
          </div>
        </div>
      </div>
    </footer>
  );
}
