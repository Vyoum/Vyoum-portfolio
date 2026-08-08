"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./Testimonials.module.css";
import { Star } from "lucide-react";

const testimonials = [
  {
    text: "The new UI design cut our customer support tickets in half. It's been a game-changer for us.",
    author: "Martina Martinez",
    role: "Customer Manager at SupportEase",
  },
  {
    text: "Working with Joseph felt like having a seasoned design partner who truly understood our vision for KYMA and brought it to life in ways we hadn't even imagined.",
    author: "Thomas Weber",
    role: "Co-founder of KYMA",
  },
  {
    text: "Our website conversion rate improved significantly thanks to Joseph's expertise.",
    author: "Ben Harper",
    role: "CTO of Nexus",
  },
  {
    text: "Joseph's design approach brought clarity to our complex data visualizations. Our users are thrilled!",
    author: "Michael Wong",
    role: "Data Scientist at DataSphere",
  },
];

export default function Testimonials() {
  return (
    <section className={`section ${styles.testimonialsSection}`} id="testimonials">
      <div className={`container ${styles.container}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={styles.header}
        >
          <h2 className={styles.title}>Trusted by many</h2>
          <div className={styles.rating}>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={20} fill="var(--accent)" color="var(--accent)" />
              ))}
            </div>
            <span>99+ Happy clients</span>
          </div>
        </motion.div>

        <div className={styles.grid}>
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.quoteMark}>&ldquo;</div>
              <p className={styles.text}>{item.text}</p>
              <div className={styles.author}>
                <div className={styles.avatar}>
                  {item.author.charAt(0)}
                </div>
                <div className={styles.authorInfo}>
                  <h4>{item.author}</h4>
                  <p>{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
