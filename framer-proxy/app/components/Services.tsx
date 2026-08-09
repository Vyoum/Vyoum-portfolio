"use client";

import { motion } from "framer-motion";
import {
  Globe2,
  Laptop,
  PaintBucket,
  PanelTop,
  WandSparkles,
} from "lucide-react";
import styles from "./Services.module.css";

const stack = [
  { name: "Figma", mark: "Figma" },
  { name: "Framer", mark: "Framer" },
  { name: "Webflow", mark: "Webflow" },
  { name: "Rive", mark: "Rive" },
  { name: "Blender", mark: "Blender" },
  { name: "Linear", mark: "Linear" },
  { name: "OpenAI", mark: "OpenAI" },
  { name: "Claude", mark: "Claude" },
] as const;

const services = [
  { name: "Framer Development", Icon: FramerGlyph },
  { name: "Brand Design", Icon: PaintBucket },
  { name: "Web Apps", Icon: Laptop },
  { name: "Landing Pages", Icon: PanelTop },
  { name: "Motion Graphics", Icon: WandSparkles },
  { name: "3D Design", Icon: Globe2 },
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

const leftVariants = {
  hidden: { opacity: 0, y: 56 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: easeOut,
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

const leftItemVariants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easeOut },
  },
};

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.18 },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
};

function FramerGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M5 2h14v6.5H12L19 22h-6.5L5 8.5V2zm0 6.5h6.5V15H5V8.5z" />
    </svg>
  );
}

function StackMark({ name }: { name: (typeof stack)[number]["name"] }) {
  switch (name) {
    case "Figma":
      return (
        <svg viewBox="0 0 24 24" aria-hidden width="22" height="22">
          <path fill="#F24E1E" d="M8 24a4 4 0 0 0 4-4v-4H8a4 4 0 1 0 0 8z" />
          <path fill="#A259FF" d="M4 16a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4z" />
          <path fill="#1ABCFE" d="M12 0v8h4a4 4 0 1 0 0-8h-4z" />
          <path fill="#0ACF83" d="M4 4a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4z" />
          <path fill="#FF7262" d="M12 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0z" />
        </svg>
      );
    case "Framer":
      return (
        <svg viewBox="0 0 24 24" aria-hidden width="20" height="20" fill="#000">
          <path d="M4 0h16v8H12l8 8h-8v8l-8-8V0z" />
        </svg>
      );
    case "Webflow":
      return (
        <svg viewBox="0 0 24 24" aria-hidden width="22" height="22" fill="#146EF5">
          <path d="M17.8 3H24l-5.4 18H12.8L17.8 3zM9.4 3h6.1L10.1 21H4L9.4 3zM0 3h6.2l-2 6.7L0 3z" />
        </svg>
      );
    case "Rive":
      return (
        <svg viewBox="0 0 24 24" aria-hidden width="20" height="20" fill="#000">
          <path d="M4 4h9.2c3.4 0 5.6 1.9 5.6 4.8 0 2.2-1.2 3.8-3.2 4.5L20 20h-4.2l-3.7-5.8H8.4V20H4V4zm4.4 3.2v4.2h4.3c1.5 0 2.4-.8 2.4-2.1s-.9-2.1-2.4-2.1H8.4z" />
        </svg>
      );
    case "Blender":
      return (
        <svg viewBox="0 0 24 24" aria-hidden width="22" height="22" fill="#E87D0D">
          <path d="M12.5 2.1c-1.2 0-2.2.5-2.9 1.3L2.8 12c-.4.5-.3 1.2.2 1.6l7.2 5.5c.9.7 2.2.7 3.1 0l7.2-5.5c.5-.4.6-1.1.2-1.6l-6.8-8.6c-.7-.8-1.7-1.3-2.9-1.3zm0 2.2c.4 0 .8.2 1 .5l5.7 7.2-5.7 4.4c-.3.2-.7.2-1 0L6.8 12l5.7-7.2c.2-.3.6-.5 1-.5z" />
          <circle cx="15.8" cy="14.2" r="2.4" fill="#265787" />
        </svg>
      );
    case "Linear":
      return (
        <svg viewBox="0 0 24 24" aria-hidden width="20" height="20" fill="#5E6AD2">
          <path d="M2.9 12.1A9.1 9.1 0 0 0 12 21.2V2.9A9.1 9.1 0 0 0 2.9 12.1zm18.2-.2A9.1 9.1 0 0 0 12 2.8v18.3a9.1 9.1 0 0 0 9.1-9.2z" />
        </svg>
      );
    case "OpenAI":
      return (
        <svg viewBox="0 0 24 24" aria-hidden width="22" height="22" fill="#10A37F">
          <path d="M22.3 10.1a5.6 5.6 0 0 0-.5-5.3 5.7 5.7 0 0 0-6.1-2.4A5.7 5.7 0 0 0 6.4 1a5.7 5.7 0 0 0-3.8 5.2 5.6 5.6 0 0 0-3.7 4.1 5.7 5.7 0 0 0 2.1 6.1 5.6 5.6 0 0 0 .5 5.3 5.7 5.7 0 0 0 6.1 2.4A5.7 5.7 0 0 0 17.6 23a5.7 5.7 0 0 0 3.8-5.2 5.6 5.6 0 0 0 3.7-4.1 5.7 5.7 0 0 0-2.8-3.6zM12 18.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
        </svg>
      );
    case "Claude":
      return (
        <svg viewBox="0 0 24 24" aria-hidden width="20" height="20" fill="#D97757">
          <path d="M12 2 9.2 9.2 2 12l7.2 2.8L12 22l2.8-7.2L22 12l-7.2-2.8L12 2z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Services() {
  return (
    <section className={styles.section} id="services">
      <div className={`container ${styles.layout}`}>
        <motion.div
          className={styles.left}
          variants={leftVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35, margin: "0px 0px -8% 0px" }}
        >
          <motion.h2 className={styles.title} variants={leftItemVariants}>
            <span className={styles.titleMuted}>Services that</span>
            <span className={styles.titleStrong}>supercharge your business.</span>
          </motion.h2>

          <motion.div className={styles.stackBlock} variants={leftItemVariants}>
            <p className={styles.stackLabel}>My tech stack</p>
            <div className={styles.stackGrid}>
              {stack.map((item) => (
                <div key={item.name} className={styles.stackTile} title={item.name}>
                  <StackMark name={item.name} />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className={styles.divider} aria-hidden />

        <motion.ul
          className={styles.list}
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {services.map(({ name, Icon }) => (
            <motion.li key={name} className={styles.item} variants={listItemVariants}>
              <span className={styles.icon}>
                <Icon size={16} strokeWidth={2.25} />
              </span>
              <span className={styles.itemName}>{name}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
