"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "../lib/cn";
import type { Project } from "../lib/projects";

type UntanglingProjectCardProps = {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  stickyRef: React.RefObject<HTMLDivElement | null>;
  /** Progress value where the pile finishes becoming a grid */
  settleAt?: number;
};

export default function UntanglingProjectCard({
  project,
  index,
  progress,
  stickyRef,
  settleAt = 0.72,
}: UntanglingProjectCardProps) {
  const cellRef = useRef<HTMLDivElement>(null);
  const originX = useMotionValue(0);
  const originY = useMotionValue(0);
  const ready = useMotionValue(0);

  useEffect(() => {
    const measure = () => {
      const cell = cellRef.current;
      const sticky = stickyRef.current;
      if (!cell || !sticky) return;

      const cellRect = cell.getBoundingClientRect();
      const stickyRect = sticky.getBoundingClientRect();

      const cellCenterX =
        cellRect.left - stickyRect.left + cellRect.width / 2;
      const cellCenterY =
        cellRect.top - stickyRect.top + cellRect.height / 2;

      originX.set(stickyRect.width / 2 - cellCenterX);
      originY.set(stickyRect.height / 2 - cellCenterY);
      ready.set(1);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [originX, originY, ready, stickyRef]);

  const x = useTransform([progress, originX], ([p, ox]) => {
    const t = Math.min(1, Math.max(0, (p as number) / settleAt));
    return (ox as number) * (1 - t);
  });

  const y = useTransform([progress, originY], ([p, oy]) => {
    const t = Math.min(1, Math.max(0, (p as number) / settleAt));
    return (oy as number) * (1 - t);
  });

  const rotate = useTransform(progress, (p) => {
    const t = Math.min(1, Math.max(0, p / settleAt));
    return project.angle * (1 - t);
  });

  const scale = useTransform(progress, (p) => {
    const t = Math.min(1, Math.max(0, p / settleAt));
    return 0.9 + 0.1 * t;
  });

  const opacity = useTransform(ready, (v) => (v ? 1 : 0));

  return (
    <div
      ref={cellRef}
      className="relative aspect-[4/3] w-full"
      style={{ zIndex: 20 - index }}
    >
      <motion.div
        style={{ x, y, rotate, scale, opacity }}
        className="absolute inset-0 will-change-transform"
      >
        <Link
          href={project.href}
          className="group flex h-full flex-col gap-4 text-inherit no-underline"
        >
          <div
            className={cn(
              "relative flex h-full min-h-0 items-center justify-center overflow-hidden rounded-[1.35rem] p-[10%] shadow-[0_24px_60px_rgba(0,0,0,0.12)] transition-transform duration-500 group-hover:scale-[0.985]",
              project.tone
            )}
          >
            <div className="h-[78%] w-full rotate-[-2deg] rounded-xl bg-white p-3 shadow-[0_28px_70px_rgba(0,0,0,0.18)]">
              <div className="mb-2 flex gap-1.5">
                <span className="size-1.5 rounded-full bg-neutral-300" />
                <span className="size-1.5 rounded-full bg-neutral-300" />
                <span className="size-1.5 rounded-full bg-neutral-300" />
              </div>
              <div className="relative h-[calc(100%-14px)] overflow-hidden rounded-md bg-[#f5f5f2]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 40vw"
                />
              </div>
            </div>
          </div>

          <div className="flex items-start justify-between gap-4 px-1">
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-neutral-900 md:text-2xl">
                {project.title}
              </h3>
              <p className="mt-0.5 text-sm text-neutral-500 md:text-base">
                {project.category}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 pt-1 text-sm text-neutral-500 transition-colors group-hover:text-neutral-900">
              View Project
              <ArrowUpRight size={16} />
            </span>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
