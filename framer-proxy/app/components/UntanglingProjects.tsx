"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { PROJECTS } from "../lib/projects";
import UntanglingProjectCard from "./UntanglingProjectCard";

/**
 * Combined hero + projects scroll scene (LaunchFolio-style).
 * Parent height drives scrubbable progress:
 *  - progress ~0 → cards piled/rotated in the center (State A)
 *  - progress ~0.72 → cards rest in responsive CSS Grid (State B)
 */
export default function UntanglingProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
    mass: 0.35,
  });

  // Hero copy lives in the sticky frame and fades as cards untangle
  const heroOpacity = useTransform(progress, [0, 0.22, 0.4], [1, 0.35, 0]);
  const heroY = useTransform(progress, [0, 0.4], [0, -48]);
  const headingOpacity = useTransform(progress, [0.28, 0.52], [0, 1]);
  const headingY = useTransform(progress, [0.28, 0.52], [36, 0]);
  const gridPadTop = useTransform(progress, [0, 0.45], ["5rem", "0rem"]);

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative h-[320vh] w-full bg-white"
      aria-label="Hero and latest projects"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* State A: hero copy over the pile */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-x-0 top-0 z-20 mx-auto flex max-w-[1320px] flex-col gap-8 px-6 pt-28 md:flex-row md:items-end md:justify-between md:px-8 md:pt-32"
        >
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#f3f3ef] px-3.5 py-1.5 text-sm font-medium text-neutral-800">
              <span className="size-2 animate-pulse rounded-full bg-[#34c759]" />
              Available for August &apos;25
            </div>
            <h1 className="text-[clamp(2.8rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.04em]">
              <span className="font-medium text-neutral-400">Design that</span>
              <br />
              <span className="text-neutral-900">delivers results.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-neutral-500 md:text-lg">
              <strong className="font-semibold text-neutral-900">
                Strategic design that drives growth, not just looks good.
              </strong>{" "}
              I create everything your brand needs to attract customers and turn
              them into sales.
            </p>
            <Link
              href="#contact"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-neutral-900 py-2 pr-6 pl-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5"
            >
              <span className="size-8 overflow-hidden rounded-full bg-gradient-to-br from-pink-400 to-rose-500 ring-2 ring-white/30" />
              Book a call with me
            </Link>
            <div className="mt-8 flex items-center gap-3 text-sm text-neutral-500">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    className="size-7 rounded-full border-2 border-white bg-neutral-200"
                    style={{ zIndex: 6 - n }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="flex text-neutral-900">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                </span>
                <span>99+ Happy clients</span>
              </div>
            </div>
          </div>

          <p className="hidden pb-2 text-sm text-neutral-400 md:block">
            Scroll to untangle the projects
          </p>
        </motion.div>

        {/* Shared sticky stage: pile → grid */}
        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1320px] flex-col justify-center px-6 py-20 md:px-8">
          <motion.div
            style={{ opacity: headingOpacity, y: headingY }}
            className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between"
          >
            <h2 className="max-w-3xl text-[clamp(2.6rem,6vw,5.2rem)] font-bold leading-[0.95] tracking-[-0.06em] text-neutral-900">
              Latest Projects
            </h2>
            <Link
              href="#work"
              className="inline-flex items-center gap-2 border-b border-neutral-900 pb-1 text-sm font-medium text-neutral-900"
            >
              View all my projects
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            style={{ paddingTop: gridPadTop }}
            className="grid w-full grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2"
          >
            {PROJECTS.map((project, index) => (
              <UntanglingProjectCard
                key={project.id}
                project={project}
                index={index}
                progress={progress}
                stickyRef={stickyRef}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
