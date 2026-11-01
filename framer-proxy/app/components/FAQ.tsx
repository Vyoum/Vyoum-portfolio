"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FAQ.module.css";
import { Plus, Minus, CalendarDays } from "lucide-react";
import { BOOK_CALL_HREF } from "../lib/site";
import { REVEAL_VIEWPORT, blockTransition } from "../lib/motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { RevealText } from "./Reveal";

const faqs = [
  {
    question: "What services do you offer?",
    answer: "I specialize in full-stack web development, AI automation, agentic RAG pipelines, and project management, building modern, reliable systems tailored to how your business actually runs.",
  },
  {
    question: "How do I start working with you?",
    answer: "Email me or book a call. We start with a discovery call where I map your current workflow and goals, then I send a proposal with scope, timeline, and price before any work begins.",
  },
  {
    question: "What tech stack do you use?",
    answer: "Python, TypeScript, FastAPI, Node.js, React and Next.js, with LangGraph and LangChain for agents. For data and infrastructure: PostgreSQL, MongoDB, Redis, Elasticsearch, Kafka, and AWS with CI/CD.",
  },
  {
    question: "How long does a project take?",
    answer: "It depends on scope. A website is usually a matter of weeks, while an agent system or full platform takes longer. You'll get a specific timeline in the proposal after our discovery call.",
  },
  {
    question: "Do you provide support after launch?",
    answer: "Yes. I set up monitoring, alerting, and tracing so issues are caught early, and I stay on to fix what breaks and improve the system once it's running in production.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduced = usePrefersReducedMotion();

  return (
    <section className={`section ${styles.faqSection}`} id="faq">
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <div className={styles.header}>
            <RevealText
              className={styles.title}
              lines={[
                { text: "Your questions" },
                { text: "answered.", className: styles.titleMuted },
              ]}
            />
          </div>
          
          <div className={styles.accordion}>
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div 
                  key={index}
                  className={`${styles.faqItem} ${isOpen ? styles.open : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={REVEAL_VIEWPORT}
                  transition={blockTransition(index * 0.08, 0.5, reduced)}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <div className={styles.questionRow}>
                    <motion.div
                      className={styles.questionNum}
                      initial={{ opacity: 0, y: "-50%" }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={REVEAL_VIEWPORT}
                      transition={blockTransition(index * 0.08 + 0.1, 0.5, reduced)}
                    >
                      0{index + 1}
                    </motion.div>
                    <h3 className={styles.questionText}>{faq.question}</h3>
                    <button className={styles.toggleBtn}>
                      {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={styles.answerWrapper}
                      >
                        <p className={styles.answerText}>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <motion.aside
            className={styles.callout}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.calloutAvatar} aria-hidden="true" />
            <p className={styles.calloutEyebrow}>Still not sure?</p>
            <h3 className={styles.calloutTitle}>Book a free discovery call.</h3>
            <p className={styles.calloutText}>
              Learn more about how I work and how I can help you and your business take the next step.
            </p>
            <a className={styles.scheduleButton} href={BOOK_CALL_HREF}>
              <CalendarDays aria-hidden="true" />
              Schedule now
            </a>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
