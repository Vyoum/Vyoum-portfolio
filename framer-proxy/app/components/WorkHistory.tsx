"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./WorkHistory.module.css";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const workItems = [
  {
    company: "KYMA",
    role: "Full-Stack Designer",
    period: "2022-2024",
    link: "#",
  },
  {
    company: "Mugen",
    role: "Staff Product Designer",
    period: "2020-2022",
    link: "#",
  },
  {
    company: "Axiom",
    role: "Designer",
    period: "2016-2020",
    link: "#",
  },
];

export default function WorkHistory() {
  return (
    <section className={`section ${styles.workSection}`} id="work">
      <div className={`container ${styles.container}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>My work history</h2>
          
          <div className={styles.workList}>
            {workItems.map((item, index) => (
              <Link href={item.link} key={index} className={styles.workItem}>
                <div className={styles.workInfo}>
                  <h3 className={styles.company}>{item.company}</h3>
                  <p className={styles.role}>{item.role}</p>
                </div>
                <div className={styles.workMeta}>
                  <span className={styles.period}>{item.period}</span>
                  <div className={styles.iconWrapper}>
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className={styles.showAll}>
            <Link href="#all-work" className="btn-secondary">
              Show all
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
