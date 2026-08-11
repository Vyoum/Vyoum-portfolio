"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  Globe2,
  Laptop,
  PanelTop,
  WandSparkles,
} from "lucide-react";
import styles from "./About.module.css";

const paragraphs = [
  {
    lead: "I Build Intelligent Products That Turn Ideas Into Real Businesses",
    body: "I’m a software engineer and AI product builder working across AI, AI agents, full stack development, and product design. I turn complex ideas into intelligent, intuitive, and scalable digital products.",
  },
  {
    lead: "29+ Products Delivered Across 3+ Countries Around the Globe",
    body: "making sure they’re not just pretty, but actually solve problems. Whether I’m working on a mobile app or a website, my goal is to make something that feels natural and easy to use.",
  },
  {
    lead: "I Combine Technology, Design, and Strategy to Build What Actually Matters",
    body: "but I think that’s what makes good design great. This attention to detail helps me build strong relationships with clients, as they know I’ll put the same care into their project that they would.",
  },
];

const workHistory = [
  {
    company: "KYMA",
    role: "Full-Stack Designer",
    period: "2012-2024",
  },
  {
    company: "Mugen",
    role: "Staff Product Designer",
    period: "2020-2022",
  },
  {
    company: "Axiom",
    role: "Designer",
    period: "2016-2020",
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

function WorkCard({
  job,
  stacked,
}: {
  job: (typeof workHistory)[number];
  stacked?: boolean;
}) {
  return (
    <div
      className={`${styles.historyCard}${stacked ? ` ${styles.historyCardStacked}` : ""}`}
    >
      {stacked ? <div className={styles.historyStack} aria-hidden /> : null}
      <div className={styles.historyFace}>
        <div className={styles.historyTop}>
          <span className={styles.historyCompany}>{job.company}</span>
          <span className={styles.historyRole}>{job.role}</span>
        </div>
        <span className={styles.historyPeriod}>{job.period}</span>
      </div>
    </div>
  );
}

export default function About() {
  const [expanded, setExpanded] = useState(false);
  const [first, ...rest] = workHistory;

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

            <div className={styles.history}>
              <h4 className={styles.historyTitle}>My work history</h4>

              <div className={styles.historyList}>
                <WorkCard job={first} stacked={!expanded} />

                <AnimatePresence initial={false}>
                  {expanded
                    ? rest.map((job, index) => (
                        <motion.div
                          key={job.company}
                          className={styles.historyReveal}
                          initial={{ opacity: 0, y: 28, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: 12, height: 0 }}
                          transition={{
                            duration: 0.55,
                            ease: easeOut,
                            delay: index * 0.07,
                          }}
                        >
                          <div className={styles.historyRevealInner}>
                            <WorkCard job={job} />
                          </div>
                        </motion.div>
                      ))
                    : null}
                </AnimatePresence>
              </div>

              <motion.button
                type="button"
                className={styles.showAll}
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                whileTap={{ scale: 0.98 }}
              >
                {expanded ? "Hide" : "Show all"}
                <motion.span
                  className={styles.showAllIcon}
                  aria-hidden
                  animate={{ rotate: expanded ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: easeOut }}
                >
                  <ChevronDown size={14} strokeWidth={2.5} />
                </motion.span>
              </motion.button>
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
