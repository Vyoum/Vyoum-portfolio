"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Pricing.module.css";
import { Check } from "lucide-react";
import { PROJECT_INQUIRY_HREF } from "../lib/site";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { RevealBlock, RevealText } from "./Reveal";

export default function Pricing() {
  const reduced = usePrefersReducedMotion();
  const featuredRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: featuredRef,
    offset: ["start end", "end start"],
  });
  /* Reference: featured card tilts ≈ -3° → +3° as it crosses the viewport */
  const tilt = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  /* Full-width card on phones: a tilt would push its corners off-screen */
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const update = () => setNarrow(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return (
    <section className={`section ${styles.pricingSection}`} id="pricing">
      <div className={`container container-inset ${styles.container}`}>
        <div className={styles.header}>
          <RevealText
            className={styles.title}
            lines={[
              { text: "Simple pricing." },
              { text: "Serious systems.", wordClassName: "text-gradient" },
            ]}
          />
          <RevealBlock as="p" className={styles.subtitle} delay={0.1}>
            Clear starting prices, no hidden fees. Final quote depends on scope, agreed after a discovery call.
          </RevealBlock>
        </div>

        <div className={styles.cards}>
          {/* AI Automation Card */}
          <motion.div 
            ref={featuredRef}
            className={styles.card}
            style={{ rotate: reduced || narrow ? 0 : tilt }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.cardBadge}>Slots available</div>
              <h3 className={styles.cardTitle}>AI Automation</h3>
              <p className={styles.cardDesc}>
                Agents and automated workflows that take real work off your team: lead handling, outreach, document intake, and ops.
              </p>
              <div className={styles.price}>
                ₹24,999 <span>onwards</span>
              </div>
            </div>
            <div className={styles.cardFeatures}>
              <ul>
                <li><Check size={18} className={styles.check} /> Discovery call to map your workflow</li>
                <li><Check size={18} className={styles.check} /> LangGraph / LangChain agents</li>
                <li><Check size={18} className={styles.check} /> CRM, email, and tool integrations</li>
                <li><Check size={18} className={styles.check} /> Retries, monitoring, and LLM tracing</li>
                <li><Check size={18} className={styles.check} /> Model cost controls</li>
                <li><Check size={18} className={styles.check} /> Post-launch support</li>
              </ul>
            </div>
            <a href={PROJECT_INQUIRY_HREF} className={`btn-primary ${styles.fullWidthBtn}`}>
              Get Started
            </a>
          </motion.div>

          {/* Web Development Card */}
          <motion.div 
            className={`${styles.card} ${styles.cardSecondary}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Web Development</h3>
              <p className={styles.cardDesc}>
                Fast, production-ready websites and web apps, from landing pages to full-stack platforms with real backends.
              </p>
              <div className={styles.price}>
                ₹14,999 <span>onwards</span>
              </div>
            </div>
            <div className={styles.cardFeatures}>
              <ul>
                <li><Check size={18} className={styles.check} /> Clearly defined scope</li>
                <li><Check size={18} className={styles.check} /> Fixed timeline</li>
                <li><Check size={18} className={styles.check} /> Next.js / React frontend</li>
                <li><Check size={18} className={styles.check} /> Deployment and CI/CD</li>
              </ul>
            </div>
            <a href={PROJECT_INQUIRY_HREF} className={`btn-secondary ${styles.fullWidthBtn}`}>
              Get quote
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
