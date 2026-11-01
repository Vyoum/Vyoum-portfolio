"use client";

import React from "react";
import { motion } from "framer-motion";
import { EASE_HOVER, EASE_STD, REVEAL_VIEWPORT } from "../lib/motion";
import { RevealText } from "./Reveal";
import styles from "./BlogPreview.module.css";
import Link from "next/link";

const blogPosts = [
  {
    title: "How designers and developers can actually collaborate.",
    date: "Mar 6, 2025",
    author: "Vyoum Agarwaal",
    excerpt: "Discover proven strategies to bridge the designer-developer gap. Learn how top teams eliminate handoff friction and ship better products faster through true collaboration.",
    href: "#",
  },
  {
    title: "Why faster isn't always better.",
    date: "Apr 22, 2025",
    author: "Vyoum Agarwaal",
    excerpt: "Exploring the hidden costs of rushing the design process and how taking time to think can yield 10x better results.",
    href: "#",
  },
  {
    title: "Designing for human connection.",
    date: "Apr 1, 2025",
    author: "Vyoum Agarwaal",
    excerpt: "An deep dive into the psychology of UI and how to make interfaces that feel genuinely human.",
    href: "#",
  },
];

export default function BlogPreview() {
  return (
    <section className={`section ${styles.blogSection}`} id="blog">
      <div className={`container container-inset ${styles.container}`}>
        <div className={styles.header}>
          <RevealText className={styles.title} text="From my blog, design insights." />
          <Link href="#all-posts" className="btn-secondary">
            View All
          </Link>
        </div>

        <div className={styles.postsGrid}>
          {blogPosts.map((post, index) => (
            <motion.div 
              key={index}
              className={styles.postCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, transition: { duration: 0.3, ease: EASE_HOVER } }}
              viewport={REVEAL_VIEWPORT}
              transition={{ duration: 0.5, delay: index * 0.1, ease: EASE_STD }}
            >
              <Link href={post.href} className={styles.postLink}>
                <div className={styles.postMedia}>
                  <div className={styles.postImage}>
                    {/* Image Placeholder */}
                  </div>
                </div>
                <div className={styles.postContent}>
                  <div className={styles.postMeta}>
                    <span>{post.date}</span>
                    <span className={styles.dot}>•</span>
                    <span>By {post.author}</span>
                  </div>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.postExcerpt}>{post.excerpt}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
