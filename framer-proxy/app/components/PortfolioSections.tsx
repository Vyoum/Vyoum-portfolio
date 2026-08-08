"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import Link from "next/link";
import styles from "./PortfolioSections.module.css";

const projects = [
  { name: "Kora", type: "Consulting Site", tone: "kora" },
  { name: "KYMA", type: "AI Agency", tone: "kyma" },
  { name: "Mugen", type: "Design studio", tone: "mugen" },
  { name: "Axiom", type: "Ecommerce Site", tone: "axiom" },
];

const services = [
  "Framer Development",
  "Brand Design",
  "Web Apps",
  "Landing Pages",
  "Motion Graphics",
  "3D Design",
  "UX / UI Consultation",
];

const faqs = [
  ["How long does a typical project take to complete?", "Project timelines vary based on complexity. A focused project might take 2–3 weeks, while a comprehensive design can take 1–2 months."],
  ["Can you work with my existing brand and designs?", "Absolutely. Every new design can be aligned with your existing identity, components, and visual language."],
  ["What makes your design process unique?", "The process is collaborative from the start, with clear milestones and feedback built into every stage."],
  ["Do you offer support after the project is completed?", "Yes. Minor adjustments and handoff support are included for 30 days after delivery."],
];

export default function PortfolioSections() {
  return (
    <>
      <section className={styles.projects} id="work">
        <div className="container">
          <div className={styles.sectionHeading}>
            <h2>Latest Projects</h2>
            <Link href="#all-projects">View all my projects <ArrowRight size={17} /></Link>
          </div>
          <div className={styles.projectGrid}>
            {projects.map((project, index) => (
              <motion.a
                href="#contact"
                className={styles.project}
                key={project.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
              >
                <div className={`${styles.projectVisual} ${styles[project.tone]}`}>
                  <div className={styles.browser}>
                    <span /><span /><span />
                    <div className={styles.browserContent}>
                      <strong>{project.name}</strong>
                      <i />
                      <i />
                    </div>
                  </div>
                </div>
                <div className={styles.projectMeta}>
                  <div><h3>{project.name}</h3><p>{project.type}</p></div>
                  <span>View Project <ArrowUpRight size={16} /></span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.services} id="services">
        <div className="container">
          <p className={styles.eyebrow}>Services</p>
          <h2>Services that supercharge<br />your business.</h2>
          <div className={styles.serviceList}>
            {services.map((service, index) => (
              <div className={styles.service} key={service}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{service}</h3>
                <ArrowUpRight />
              </div>
            ))}
          </div>
          <div className={styles.process}>
            {["Subscribe", "Request", "Receive"].map((step) => (
              <div key={step}><Check size={17} /><strong>{step}</strong><p>Simple, transparent and built to keep your projects moving.</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.faq}>
        <div className="container">
          <p className={styles.eyebrow}>FAQ</p>
          <h2>Your questions<br />answered.</h2>
          <div className={styles.faqList}>
            {faqs.map(([question, answer], index) => (
              <details key={question}>
                <summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<Plus size={20} /></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.blog} id="blog">
        <div className="container">
          <div className={styles.sectionHeading}>
            <h2>From my blog,<br />design insights.</h2>
            <Link href="#">View All <ArrowRight size={17} /></Link>
          </div>
          <div className={styles.posts}>
            <article className={styles.featuredPost}>
              <div className={styles.postArt}>Aa</div>
              <p>Mar 6, 2025 · By Joseph Alexander</p>
              <h3>How designers and developers can actually collaborate.</h3>
            </article>
            <div className={styles.smallPosts}>
              <article><p>Apr 22, 2025</p><h3>Why faster isn&apos;t always better.</h3><ArrowUpRight /></article>
              <article><p>Apr 1, 2025</p><h3>Designing for human connection.</h3><ArrowUpRight /></article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className="container">
        <p className={styles.eyebrow}>Speak to me</p>
        <h2>Let&apos;s create incredible<br />work together.</h2>
        <Link href="mailto:joseph@launchnow.design" className={styles.email}>joseph@launchnow.design <ArrowUpRight /></Link>
        <div className={styles.footerBottom}>
          <strong>JOSEPH</strong>
          <div><Link href="#work">Work</Link><Link href="#services">Services</Link><Link href="#pricing">Pricing</Link><Link href="#blog">Blog</Link></div>
          <p>© 2026 Joseph Alexander</p>
        </div>
      </div>
    </footer>
  );
}
