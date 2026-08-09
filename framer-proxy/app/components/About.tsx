"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Globe2, Laptop, PanelTop, WandSparkles } from "lucide-react";
import styles from "./About.module.css";

const paragraphs = [
  {
    lead: "I love turning ideas into something real through design.",
    body: "What started as a hobby turned into a career when I discovered how design can make things both look great and work better.",
  },
  {
    lead: "I focus on creating user interfaces that serve a real purpose",
    body: "making sure they’re not just pretty, but actually solve problems. Whether I’m working on a mobile app or a website, my goal is to make something that feels natural and easy to use.",
  },
  {
    lead: "I’m a bit of a perfectionist when it comes to the small stuff,",
    body: "but I think that’s what makes good design great. This attention to detail helps me build strong relationships with clients, as they know I’ll put the same care into their project that they would.",
  },
];

export default function About() {
  return (
    <section className={styles.aboutSection} id="about">
      <div className={`container ${styles.container}`}>
        <motion.header
          className={styles.header}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>
            <span>Designing experiences</span>
            <strong>that solve real problems.</strong>
          </h2>
          <span className={styles.titleDot} aria-hidden="true" />
        </motion.header>

        <div className={styles.bodyGrid}>
          <motion.div
            className={styles.profile}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className={styles.imageWrap}>
              <img src="/vyoum-profile.png" alt="Vyoum Agarwal, full-stack designer" />
              <div className={styles.socials} aria-label="Social profiles">
                <a href="#contact" aria-label="Website"><Globe2 size={19} /></a>
                <a href="#contact" aria-label="Apps"><Laptop size={19} /></a>
                <a href="#contact" aria-label="Web design"><PanelTop size={19} /></a>
                <a href="#contact" aria-label="Motion design"><WandSparkles size={19} /></a>
              </div>
            </div>
            <div className={styles.profileMeta}>
              <h3>Vyoum Agarwal</h3>
              <p>Full-stack Designer</p>
            </div>
          </motion.div>

          <motion.div
            className={styles.copy}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.18 }}
          >
            {paragraphs.map((paragraph) => (
              <p key={paragraph.lead}>
                <strong>{paragraph.lead}</strong> {paragraph.body}
              </p>
            ))}
          </motion.div>
        </div>

        <a className={styles.contactLink} href="#contact">
          Let&apos;s work together <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}
