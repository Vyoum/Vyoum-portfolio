"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import styles from "./Projects.module.css";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    title: "Kora",
    category: "Consulting Site",
    image: "/card1.png",
    link: "#",
  },
  {
    title: "KYMA",
    category: "AI Agency",
    image: "/card2.png",
    link: "#",
  },
  {
    title: "Mugen Studio",
    category: "Design Studio",
    image: "/card3.png",
    link: "#",
  },
  {
    title: "LaunchNow",
    category: "SaaS Platform",
    image: "/card1.png",
    link: "#",
  },
];

const ProjectCard = ({ project }: { project: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <Link href={project.link} className={styles.cardWrapper}>
      <div 
        className={styles.imageContainer}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        <Image src={project.image} alt={project.title} fill className={styles.cardImage} />
        
        {/* Custom cursor pill */}
        <motion.div
          className={styles.viewProjectPill}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            scale: isHovered ? 1 : 0.5 
          }}
          transition={{ duration: 0.2 }}
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%"
          }}
        >
          View Project
        </motion.div>
      </div>
      
      <div className={styles.cardMeta}>
        <div>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <p className={styles.cardCategory}>{project.category}</p>
        </div>
        <span className={styles.cardLinkText}>↗ View Project</span>
      </div>
    </Link>
  );
};

export default function Projects() {
  return (
    <section className={`section ${styles.projectsSection}`} id="projects">
      <div className="container">
        <h2 className={styles.sectionTitle}>Latest Projects</h2>
        
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
