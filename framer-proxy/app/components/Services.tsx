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
  "Next.js",
  "LangChain",
  "LangGraph",
  "Supabase",
  "Claude",
  "Java",
  "Redis",
  "Kafka",
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

function StackMark({ name }: { name: (typeof stack)[number] }) {
  switch (name) {
    case "Next.js":
      return (
        <svg viewBox="0 0 24 24" aria-hidden width="22" height="22">
          <circle cx="12" cy="12" r="11" fill="#000" />
          <path
            fill="#fff"
            d="M16.2 18.4 10.1 8.2h-1.7v7.5H9.7v-5.2l5.4 8.1c.5.2 1 .3 1.6.4.2 0 .3 0 .5-.1v-.5c-.4 0-.7-.1-1-.2zM14.9 8.2v7.1h1.3V8.2h-1.3z"
          />
        </svg>
      );
    case "LangChain":
      return (
        <svg viewBox="0 0 24 24" aria-hidden width="22" height="22">
          <path
            fill="#1C3C3C"
            d="M8.2 4.2c1.4-1.6 3.7-1.8 5.4-.6l1.3 1c.4.3.5.9.2 1.3l-.7.9c-.3.4-.9.5-1.3.2l-1.3-1c-.6-.4-1.4-.4-2 0L7.6 8.5c-.6.4-.9 1.1-.9 1.8v3.4c0 .7.3 1.4.9 1.8l2.2 1.5c.6.4 1.4.4 2 0l1.3-1c.4-.3 1-.2 1.3.2l.7.9c.3.4.2 1-.2 1.3l-1.3 1c-1.7 1.2-4 1-5.4-.6L5.4 16c-1.2-1.5-1.2-3.6 0-5.1l2.8-3.5c.4-.5.4-1.2 0-1.7L6.8 4.2z"
          />
          <path
            fill="#1C3C3C"
            d="M15.8 19.8c-1.4 1.6-3.7 1.8-5.4.6l-1.3-1c-.4-.3-.5-.9-.2-1.3l.7-.9c.3-.4.9-.5 1.3-.2l1.3 1c.6.4 1.4.4 2 0l2.2-1.5c.6-.4.9-1.1.9-1.8v-3.4c0-.7-.3-1.4-.9-1.8L14.2 8c-.6-.4-1.4-.4-2 0l-1.3 1c-.4.3-1 .2-1.3-.2l-.7-.9c-.3-.4-.2-1 .2-1.3l1.3-1c1.7-1.2 4-1 5.4.6l2.8 3.5c1.2 1.5 1.2 3.6 0 5.1l-2.8 3.5c-.4.5-.4 1.2 0 1.7l1.4 1.5z"
          />
        </svg>
      );
    case "LangGraph":
      return (
        <svg viewBox="0 0 24 24" aria-hidden width="22" height="22">
          <circle cx="6.5" cy="7" r="2.2" fill="#1C3C3C" />
          <circle cx="17.5" cy="7" r="2.2" fill="#1C3C3C" />
          <circle cx="12" cy="17" r="2.2" fill="#1C3C3C" />
          <path
            stroke="#1C3C3C"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
            d="M8.3 8.2 10.6 14.2M15.7 8.2 13.4 14.2M8.5 7h7"
          />
        </svg>
      );
    case "Supabase":
      return (
        <svg viewBox="0 0 24 24" aria-hidden width="20" height="20">
          <path
            fill="#3ECF8E"
            d="M13.4 2.2c-.5-.7-1.5-.3-1.5.5v7.6h6.7c1.1 0 1.7 1.3.9 2.1l-7.9 9.4c-.5.7-1.5.3-1.5-.5v-7.6H4c-1.1 0-1.7-1.3-.9-2.1l9.3-9.4z"
          />
        </svg>
      );
    case "Claude":
      return (
        <svg viewBox="0 0 24 24" aria-hidden width="20" height="20" fill="#D97757">
          <path d="M12 2 9.2 9.2 2 12l7.2 2.8L12 22l2.8-7.2L22 12l-7.2-2.8L12 2z" />
        </svg>
      );
    case "Java":
      return (
        <svg viewBox="0 0 24 24" aria-hidden width="20" height="20">
          <path
            fill="#5382A1"
            d="M8.9 18.2s-.3.2.1.4c.4.3 1 .5 1.6.3.1 0 .2-.1.2-.1-.1 0-1.4-.6-1.9-.6zm-.4-.9s-.3.2 0 .5c.4.3 1 .7 1.8.5l.1-.1c-.2 0-1.5-.5-1.9-.9zm2.8-4.4c-.4.4 0 .8.6 1.1 1.2.6 2.2.3 2.5-.2.1-.1 0-.2-.1-.1-.4.1-1.5.4-2.2-.4-.2-.2-.3-.4-.3-.4h-.5zm7.6 6.6s.2.2 0 .3c-.6.5-2.1.9-3.9.3-.1 0-.2 0-.1.1 1.4.7 3.4.5 4 .1.1-.1.1-.5 0-.7zm-3.2-1.5s.3.2-.1.5c-.4.3-1.4.6-2.3.5-.4 0-.8-.1-.9-.2 0 0 .1.1.5.2 1.4.3 2.8-.1 2.8-.1.1 0 .1-.1 0-.2v-.7zm4.4 3.6c0-.1-.1-.1-.2 0-.7.4-2.5 1.2-4.6.8 0 0-.1 0-.1.1s.1.1.4.2c1.6.4 3.5 0 4.2-.4.1 0 .2-.1.3-.2v-.5z"
          />
          <path
            fill="#E76F00"
            d="M12.6 14.4c.8-.9.4-2-.2-2.7-.6-.6-1.4-1-1.4-1.9 0-.9.6-1.3.9-1.8-.9 1-2.1 2-1.8 3.5.3 1.4 1.4 2.1 1.8 2.4.5.4 1.2 1 1 2 0 0 .6-.5-.3-1.5z"
          />
          <path
            fill="#E76F00"
            d="M14.9 19.8c2.1-.6 3.4-2 3.1-3.7-.3 1.1-1.3 1.8-2.6 2.2-1 .3-2.1.4-2.9.2 0 0 .2.3.5.5.8.5 1.9.8 1.9.8z"
          />
        </svg>
      );
    case "Redis":
      return (
        <svg viewBox="0 0 24 24" aria-hidden width="22" height="22">
          <path
            fill="#DC382D"
            d="M12 2.2 3.5 6.4v3.2L12 13.8l8.5-4.2V6.4L12 2.2zm0 13.2L3.5 11.2v3.2L12 18.6l8.5-4.2v-3.2L12 15.4zm0 4.2L3.5 15.4v3.2L12 22.8l8.5-4.2v-3.2L12 19.6z"
          />
        </svg>
      );
    case "Kafka":
      return (
        <svg viewBox="0 0 24 24" aria-hidden width="20" height="20">
          <circle cx="12" cy="12" r="2.4" fill="#231F20" />
          <circle cx="12" cy="4.2" r="1.7" fill="#231F20" />
          <circle cx="12" cy="19.8" r="1.7" fill="#231F20" />
          <circle cx="5.2" cy="8.2" r="1.7" fill="#231F20" />
          <circle cx="18.8" cy="8.2" r="1.7" fill="#231F20" />
          <circle cx="5.2" cy="15.8" r="1.7" fill="#231F20" />
          <circle cx="18.8" cy="15.8" r="1.7" fill="#231F20" />
          <path
            stroke="#231F20"
            strokeWidth="1.4"
            fill="none"
            d="M12 9.6V5.9M10.2 13.2 6.4 15M13.8 13.2 17.6 15M10.2 10.8 6.4 9M13.8 10.8 17.6 9M12 14.4v3.7"
          />
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
              {stack.map((name) => (
                <div key={name} className={styles.stackTile} title={name} aria-label={name}>
                  <StackMark name={name} />
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
