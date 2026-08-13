"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import styles from "./Testimonials.module.css";

const clientAvatars = [
  "https://i.pravatar.cc/100?img=1",
  "/priiya-rao.png",
  "https://i.pravatar.cc/100?img=3",
  "https://i.pravatar.cc/100?img=4",
  "https://i.pravatar.cc/100?img=5",
];

const testimonials = [
  {
    text: "The new UI design cut our customer support tickets in half. It's been a game-changer for us.",
    author: "Martina Martinez",
    role: "Customer Manager at SupportEase",
    avatar: "https://i.pravatar.cc/96?img=47",
  },
  {
    text: "Working with Vyoum felt like having a seasoned design partner who truly understood our vision for KYMA and brought it to life in ways we hadn't even imagined.",
    author: "Priiya Rao",
    role: "Founder of Workpunkt",
    avatar: "/priiya-rao.png",
  },
  {
    text: "Our website conversion rate improved significantly thanks to Vyoum's expertise.",
    author: "Ben Harper",
    role: "CTO of Nexus",
    avatar: "https://i.pravatar.cc/96?img=14",
  },
  {
    text: "Vyoum's design approach brought clarity to our complex data visualizations. Our users are thrilled!",
    author: "Michael Wong",
    role: "Data Scientist at DataSphere",
    avatar: "https://i.pravatar.cc/96?img=11",
  },
  {
    text: "The rebranding exceeded our expectations. It's given us a competitive edge in our industry.",
    author: "Sophie Bennett",
    role: "Founder of Northstar",
    avatar: "https://i.pravatar.cc/96?img=32",
  },
  {
    text: "The redesign transformed our brand image. We've seen a 30% increase in engagement since launch.",
    author: "Daniel Lee",
    role: "Marketing Director at Alto",
    avatar: "https://i.pravatar.cc/96?img=68",
  },
];

export default function Testimonials() {
  return (
    <section className={`section ${styles.testimonialsSection}`} id="testimonials">
      <div className={`container ${styles.container}`}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.title}>
            <span>Hear from what my</span>
            <strong>clients have to say.</strong>
          </h2>
          <div
            className={styles.rating}
            aria-label="99 plus happy clients, rated five out of five stars"
          >
            <div className={styles.avatars} aria-hidden="true">
              {clientAvatars.map((avatar) => (
                <span
                  key={avatar}
                  className={styles.miniAvatar}
                  style={{ backgroundImage: `url("${avatar}")` }}
                />
              ))}
            </div>
            <div className={styles.ratingInfo}>
              <div className={styles.stars} aria-hidden="true">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={19} fill="currentColor" />
                ))}
              </div>
              <span>29+ Happy clients</span>
            </div>
          </div>
        </motion.div>

        <div className={styles.track} aria-label="Client reviews">
          {testimonials.map((item, index) => (
            <div key={item.author} className={styles.panel}>
              <motion.article
                className={styles.card}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.5, delay: Math.min(index, 2) * 0.05 }}
              >
                <div className={styles.quoteMark} aria-hidden="true">
                  “
                </div>
                <p className={styles.text}>{item.text}</p>
                <div className={styles.author}>
                  <span
                    className={styles.avatar}
                    role="img"
                    aria-label={`${item.author} profile photo`}
                    style={{ backgroundImage: `url("${item.avatar}")` }}
                  />
                  <div className={styles.authorInfo}>
                    <h3>{item.author}</h3>
                    <p>{item.role}</p>
                  </div>
                </div>
              </motion.article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
