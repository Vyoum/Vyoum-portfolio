"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./Pricing.module.css";
import { Check } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  return (
    <section className={`section ${styles.pricingSection}`} id="pricing">
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Simple pricing. <span className="text-gradient">Standout designs.</span>
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Clear costs, no hidden fees. Select from monthly subscriptions or individual project rates.
          </motion.p>
        </div>

        <div className={styles.cards}>
          {/* Subscription Card */}
          <motion.div 
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.cardBadge}>Slots available</div>
              <h3 className={styles.cardTitle}>Unlimited Design</h3>
              <p className={styles.cardDesc}>
                One flat monthly rate for unlimited design requests. Ideal for ongoing design requirements.
              </p>
              <div className={styles.price}>
                $8,000 <span>/ month</span>
              </div>
            </div>
            <div className={styles.cardFeatures}>
              <ul>
                <li><Check size={18} className={styles.check} /> No contracts or commitments</li>
                <li><Check size={18} className={styles.check} /> Pause or cancel anytime</li>
                <li><Check size={18} className={styles.check} /> Multiple Brands</li>
                <li><Check size={18} className={styles.check} /> Unlimited requests</li>
                <li><Check size={18} className={styles.check} /> Avg 48 hour turnaround</li>
                <li><Check size={18} className={styles.check} /> Framer development</li>
              </ul>
            </div>
            <Link href="#get-started" className={`btn-primary ${styles.fullWidthBtn}`}>
              Get Started
            </Link>
          </motion.div>

          {/* Single Project Card */}
          <motion.div 
            className={`${styles.card} ${styles.cardSecondary}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Single Project</h3>
              <p className={styles.cardDesc}>
                Comprehensive design services for any project scope. Ideal for one-time design needs or individual tasks.
              </p>
              <div className={styles.price}>
                Custom Quote
              </div>
            </div>
            <div className={styles.cardFeatures}>
              <ul>
                <li><Check size={18} className={styles.check} /> Clearly defined scope</li>
                <li><Check size={18} className={styles.check} /> Fixed timeline</li>
                <li><Check size={18} className={styles.check} /> 3 revision rounds</li>
                <li><Check size={18} className={styles.check} /> Milestone updates</li>
              </ul>
            </div>
            <Link href="#quote" className={`btn-secondary ${styles.fullWidthBtn}`}>
              Get quote
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
