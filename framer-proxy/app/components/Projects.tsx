"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
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

const ProjectCard = ({ project, animStyle }: { project: any, animStyle: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        x: "-50%",
        y: "-50%",
        ...animStyle
      }}
      className={styles.cardWrapper}
    >
      <Link 
        href={project.link} 
        className={styles.cardInner}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        <div className={styles.imageContainer}>
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
    </motion.div>
  );
};

export default function Projects() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate transforms for each card
  const x1 = useTransform(scrollYProgress, [0, 0.4], ["0vw", "-22vw"]);
  const y1 = useTransform(scrollYProgress, [0, 0.4], ["0vh", "-24vh"]);
  const rot1 = useTransform(scrollYProgress, [0, 0.4], [-8, 0]);

  const x2 = useTransform(scrollYProgress, [0, 0.4], ["0vw", "22vw"]);
  const y2 = useTransform(scrollYProgress, [0, 0.4], ["0vh", "-24vh"]);
  const rot2 = useTransform(scrollYProgress, [0, 0.4], [6, 0]);

  const x3 = useTransform(scrollYProgress, [0, 0.4], ["0vw", "-22vw"]);
  const y3 = useTransform(scrollYProgress, [0, 0.4], ["0vh", "24vh"]);
  const rot3 = useTransform(scrollYProgress, [0, 0.4], [-6, 0]);

  const x4 = useTransform(scrollYProgress, [0, 0.4], ["0vw", "22vw"]);
  const y4 = useTransform(scrollYProgress, [0, 0.4], ["0vh", "24vh"]);
  const rot4 = useTransform(scrollYProgress, [0, 0.4], [8, 0]);
  
  const transforms = [
    { translateX: x1, translateY: y1, rotate: rot1 },
    { translateX: x2, translateY: y2, rotate: rot2 },
    { translateX: x3, translateY: y3, rotate: rot3 },
    { translateX: x4, translateY: y4, rotate: rot4 },
  ];
  
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2]);
  const titleScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.2]);

  return (
    <section ref={containerRef} className={styles.scrollSection} id="projects">
      <div className={styles.stickyContainer}>
        <motion.h2 
          className={styles.hugeTitle}
          style={{
            opacity: titleOpacity,
            scale: titleScale
          }}
        >
          Latest Projects
        </motion.h2>
        
        <div className={styles.cardsCenter}>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} animStyle={transforms[index]} />
          ))}
        </div>
      </div>
    </section>
  );
}
