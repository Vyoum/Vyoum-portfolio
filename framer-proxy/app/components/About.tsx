"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Mail } from "lucide-react";
import { IconGitHub, IconLinkedIn } from "./BrandIcons";
import { EMAIL_HREF, SITE } from "../lib/site";
import { RevealBlock, RevealText } from "./Reveal";
import styles from "./About.module.css";

const paragraphs = [
  {
    lead: "I Build Intelligent Products That Turn Ideas Into Real Businesses",
    body: "I’m a software engineer and AI product builder working across AI, AI agents, full stack development, and product design. I turn complex ideas into intelligent, intuitive, and scalable digital products.",
  },
  {
    lead: "29+ Products Delivered Across 3+ Countries Around the Globe",
    body: "including a LangGraph multi-agent admissions system now running across 50+ schools for WorkPunkt, lifting lead generation by 70%, and CheckoutPilot, a governed agent-to-agent checkout that placed AIR 2 at the Razorpay Buildathon.",
  },
  {
    lead: "I Combine Technology, Design, and Strategy to Build What Actually Matters",
    body: "and I own the whole loop: the discovery call, the architecture, the build, deployment, monitoring, and fixing what breaks. Retries, evals, tracing, and cost controls are part of the work, not an afterthought.",
  },
];

const workHistory = [
  {
    company: "ElevenX AI",
    role: "AI Engineer",
    period: "Sep 2025 – Now",
  },
  {
    company: "Senera Core",
    role: "Automation Engineer Intern",
    period: "Feb 2026",
  },
  {
    company: "Echelon Edge",
    role: "Full Stack Intern",
    period: "Jun – Aug 2025",
  },
];

const profileLinks = [
  { href: SITE.linkedin, label: "LinkedIn", Icon: IconLinkedIn },
  { href: SITE.github, label: "GitHub", Icon: IconGitHub },
  { href: EMAIL_HREF, label: "Email", Icon: Mail },
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
      <div className={`container container-inset ${styles.container}`}>
        <header className={styles.header}>
          <RevealText
            className={styles.title}
            lines={[
              { text: "Building systems" },
              { text: "that solve real problems.", as: "strong" },
            ]}
          />
        </header>

        <div className={styles.bodyGrid}>
          <motion.div
            className={styles.profile}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className={styles.imageWrap}>
              <img src="/vyoum-about.png" alt={`${SITE.name}, ${SITE.role}`} />
              <div className={styles.socials} aria-label="Social profiles">
                {profileLinks.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    {...(href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <Icon size={19} />
                  </a>
                ))}
              </div>
            </div>
            <div className={styles.profileMeta}>
              <h3>{SITE.name}</h3>
              <p>{SITE.role}</p>
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

          <div className={styles.copy}>
            {paragraphs.map((paragraph) => (
              <RevealBlock as="p" key={paragraph.lead} delay={0.1}>
                <strong>{paragraph.lead}</strong> {paragraph.body}
              </RevealBlock>
            ))}
          </div>
        </div>

        <a className={styles.contactLink} href="#contact">
          Let&apos;s work together <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}
