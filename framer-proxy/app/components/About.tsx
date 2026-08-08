"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./About.module.css";

export default function About() {
  return (
    <section className={`section ${styles.aboutSection}`} id="about">
      <div className={`container ${styles.container}`}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.title}>
            I love turning ideas into something <span className="text-gradient">real</span> through design.
          </h2>
          
          <div className={styles.textContent}>
            <p>
              What started as a hobby turned into a career when I discovered how design can make things both look great and work better. I focus on creating user interfaces that serve a real purpose – making sure they&apos;re not just pretty, but actually solve problems.
            </p>
            <p>
              Whether I&apos;m working on a mobile app or a website, my goal is to make something that feels natural and easy to use. I&apos;m a bit of a perfectionist when it comes to the small stuff, but I think that&apos;s what makes good design great. This attention to detail helps me build strong relationships with clients, as they know I&apos;ll put the same care into their project that they would.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
