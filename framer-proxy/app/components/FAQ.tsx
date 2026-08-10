"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FAQ.module.css";
import { Plus, Minus, CalendarDays } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "How long does a typical project take to complete?",
    answer: "Project timelines vary based on complexity. A simple project might take 2-3 weeks, while more comprehensive designs can take 1-2 months. I will provide a specific estimate after our initial consultation.",
  },
  {
    question: "Can you work with my existing brand and designs?",
    answer: "Absolutely! I'm experienced in working with established brands. I will ensure all new designs align perfectly with your existing brand identity and style.",
  },
  {
    question: "What makes your design process unique?",
    answer: "My process stands out due to our collaborative approach. I involve you at every stage, ensuring the final product truly reflects your vision while benefiting from my expertise.",
  },
  {
    question: "Do you offer ongoing support after the project is completed?",
    answer: "Yes, I provide post-project support. This includes minor adjustments and answering questions about your new designs for up to 30 days after delivery. If there's a need for longer support, we can discuss a retainer.",
  },
  {
    question: "How do you handle confidentiality and intellectual property rights?",
    answer: "I take confidentiality seriously. All client information and project details are kept strictly confidential. Upon project completion, you'll own full intellectual property rights to the final designs.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={`section ${styles.faqSection}`} id="faq">
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <motion.div 
            className={styles.header}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={styles.title}>
              <span>Your questions</span>
              <span className={styles.titleMuted}>answered.</span>
            </h2>
          </motion.div>
          
          <div className={styles.accordion}>
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div 
                  key={index}
                  className={`${styles.faqItem} ${isOpen ? styles.open : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <div className={styles.questionRow}>
                    <div className={styles.questionNum}>0{index + 1}</div>
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
            <Link className={styles.scheduleButton} href="#contact">
              <CalendarDays aria-hidden="true" />
              Schedule now
            </Link>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
