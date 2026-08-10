"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import styles from "./Testimonials.module.css";

const clientAvatars = [1, 12, 3, 4, 5];

const testimonials = [
  {
    text: "The new UI design cut our customer support tickets in half. It's been a game-changer for us.",
    author: "Martina Martinez",
    role: "Customer Manager at SupportEase",
    avatar: 47,
  },
  {
    text: "Working with Joseph felt like having a seasoned design partner who truly understood our vision for KYMA and brought it to life in ways we hadn't even imagined.",
    author: "Priiya Rao",
    role: "Co-founder of KYMA",
    avatar: 12,
  },
  {
    text: "Our website conversion rate improved significantly thanks to Joseph's expertise.",
    author: "Ben Harper",
    role: "CTO of Nexus",
    avatar: 14,
  },
  {
    text: "Joseph's design approach brought clarity to our complex data visualizations. Our users are thrilled!",
    author: "Michael Wong",
    role: "Data Scientist at DataSphere",
    avatar: 11,
  },
  {
    text: "The rebranding exceeded our expectations. It's given us a competitive edge in our industry.",
    author: "Sophie Bennett",
    role: "Founder of Northstar",
    avatar: 32,
  },
  {
    text: "The redesign transformed our brand image. We've seen a 30% increase in engagement since launch.",
    author: "Daniel Lee",
    role: "Marketing Director at Alto",
    avatar: 68,
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
          <h2 className={styles.title}>
            <span>Hear from what my</span>
            <strong>clients have to say.</strong>
          </h2>
          <div className={styles.rating} aria-label="99 plus happy clients, rated five out of five stars">
            <div className={styles.avatars} aria-hidden="true">
              {clientAvatars.map((avatar) => (
                <span
                  key={avatar}
                  className={styles.miniAvatar}
                  style={{ backgroundImage: `url("https://i.pravatar.cc/100?img=${avatar}")` }}
                />
              ))}
            </div>
            <div className={styles.ratingInfo}>
              <div className={styles.stars} aria-hidden="true">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={19} fill="currentColor" />
                ))}
              </div>
              <span>99+ Happy clients</span>
            </div>
          </div>
        </motion.div>

        <div className={styles.grid}>
          {testimonials.map((item, index) => (
            <motion.article
              key={item.author}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className={styles.quoteMark} aria-hidden="true">“</div>
              <p className={styles.text}>{item.text}</p>
              <div className={styles.author}>
                <span
                  className={styles.avatar}
                  role="img"
                  aria-label={`${item.author} profile photo`}
                  style={{ backgroundImage: `url("https://i.pravatar.cc/96?img=${item.avatar}")` }}
                />
                <div className={styles.authorInfo}>
                  <h3>{item.author}</h3>
                  <p>{item.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
