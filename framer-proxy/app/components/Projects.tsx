"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Projects.module.css";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "Axiom Ecommerce Site",
    category: "Web Design",
    color: "#1e1e1e",
  },
  {
    title: "Mugen App Redesign",
    category: "UI/UX",
    color: "#2a2a2a",
  },
  {
    title: "KYMA Branding",
    category: "Brand Identity",
    color: "#333333",
  },
  {
    title: "Nexus Dashboard",
    category: "Product Design",
    color: "#3d3d3d",
  },
];

const Card = ({ project, index, progress, range, targetScale }: any) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className={styles.cardContainer}>
      <motion.div
        style={{
          backgroundColor: project.color,
          scale,
          top: `calc(-5vh + ${index * 25}px)`,
        }}
        className={styles.card}
      >
        <div className={styles.cardContent}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <p className={styles.cardCategory}>{project.category}</p>
          </div>
          <div className={styles.cardImageContainer}>
            <motion.div style={{ scale: imageScale }} className={styles.cardImageInner}>
              {/* Placeholder for project image */}
              <div className={styles.imagePlaceholder}>
                 Project Image
              </div>
            </motion.div>
          </div>
          <div className={styles.cardFooter}>
            <Link href="#" className={styles.viewProject}>
              View Project <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Projects() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section className={styles.projectsSection} id="projects">
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Featured Projects</h2>
        </div>
        
        <div ref={container} className={styles.cardsWrapper}>
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={i}
                index={i}
                project={project}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </div>
        
        <div className={styles.viewAllWrapper}>
          <Link href="#all-projects" className="btn-secondary">
            View all my projects
          </Link>
        </div>
      </div>
    </section>
  );
}
