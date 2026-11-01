"use client";

import { Fragment, type CSSProperties, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import {
  REVEAL_VIEWPORT,
  TEXT_HIDDEN,
  TEXT_SHOWN,
  WORD_STAGGER,
  clearRevealStyles,
  textTransition,
} from "../lib/motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  div: motion.div,
  span: motion.span,
} as const;

type Tag = keyof typeof TAGS;

/** Inline so the screen-reader copy never flashes before CSS loads. */
const SR_ONLY: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

/**
 * "mount" plays on hydration (above-the-fold); "inView" waits for scroll;
 * "manual" plays when `play` turns true (e.g. scroll-linked scenes).
 */
type Trigger = "mount" | "inView" | "manual";

function triggerProps(trigger: Trigger, play: boolean) {
  if (trigger === "mount") return { initial: "hidden", animate: "shown" };
  if (trigger === "manual") {
    return { initial: "hidden", animate: play ? "shown" : "hidden" };
  }
  return { initial: "hidden", whileInView: "shown", viewport: REVEAL_VIEWPORT };
}

function startWillChange(el: HTMLElement | null) {
  if (el) el.style.willChange = "transform, opacity, filter";
}

export type RevealLine = {
  text: string;
  className?: string;
  /** Element used for the line wrapper (keeps existing `.title strong` styles). */
  as?: "span" | "strong";
  /** Applied to each word, e.g. `text-gradient`, which breaks on a transformed child. */
  wordClassName?: string;
};

type RevealTextProps = {
  as?: Tag;
  /** Plain text; `\n` starts a new line. Ignored when `lines` is given. */
  text?: string;
  lines?: RevealLine[];
  /** Insert `<br />` between lines instead of relying on block line styles. */
  breakLines?: boolean;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  stagger?: number;
  trigger?: Trigger;
  play?: boolean;
  id?: string;
};

/**
 * Word-split blur reveal (reference: y 10 → 0, blur 5px → 0, opacity .001 → 1,
 * 0.8s no-overshoot spring, 0.045s per word). Hidden state is in the SSR markup.
 */
export function RevealText({
  as = "h2",
  text = "",
  lines,
  breakLines = false,
  className,
  style,
  delay = 0,
  stagger = WORD_STAGGER,
  trigger = "inView",
  play = false,
  id,
}: RevealTextProps) {
  const reduced = usePrefersReducedMotion();
  const Component = TAGS[as];
  const resolved: RevealLine[] =
    lines ?? text.split("\n").map((line) => ({ text: line }));
  const label = resolved.map((line) => line.text).join(" ");

  let wordIndex = 0;

  return (
    <Component
      id={id}
      className={className}
      style={style}
      {...triggerProps(trigger, play)}
    >
      <span className="sr-only" style={SR_ONLY}>
        {label}
      </span>
      {resolved.map((line, lineIndex) => {
        const LineTag = line.as ?? "span";
        const words = line.text.split(" ").filter(Boolean);
        return (
          <Fragment key={lineIndex}>
            {lineIndex > 0 && (breakLines ? <br /> : " ")}
            <LineTag className={line.className} aria-hidden="true">
              {words.map((word, i) => {
                const index = wordIndex++;
                const variants: Variants = {
                  hidden: TEXT_HIDDEN,
                  shown: {
                    ...TEXT_SHOWN,
                    transition: textTransition(delay + index * stagger, reduced),
                  },
                };
                return (
                  <Fragment key={i}>
                    {i > 0 && " "}
                    <motion.span
                      className={`rv-word rv-blur${
                        line.wordClassName ? ` ${line.wordClassName}` : ""
                      }`}
                      variants={variants}
                      {...revealLifecycle()}
                    >
                      {word}
                    </motion.span>
                  </Fragment>
                );
              })}
            </LineTag>
          </Fragment>
        );
      })}
    </Component>
  );
}

function revealLifecycle() {
  let node: HTMLElement | null = null;
  return {
    ref: (el: HTMLElement | null) => {
      node = el;
    },
    onAnimationStart: () => startWillChange(node),
    onAnimationComplete: () => clearRevealStyles(node),
  };
}

type RevealBlockProps = {
  as?: Tag;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  trigger?: Exclude<Trigger, "manual">;
  id?: string;
};

/** Same blur/opacity/y reveal as RevealText, applied to a whole block. */
export function RevealBlock({
  as = "div",
  children,
  className,
  style,
  delay = 0,
  trigger = "inView",
  id,
}: RevealBlockProps) {
  const reduced = usePrefersReducedMotion();
  const Component = TAGS[as];
  const variants: Variants = {
    hidden: TEXT_HIDDEN,
    shown: { ...TEXT_SHOWN, transition: textTransition(delay, reduced) },
  };

  return (
    <Component
      id={id}
      className={`rv-blur${className ? ` ${className}` : ""}`}
      style={style}
      variants={variants}
      {...triggerProps(trigger, false)}
      {...revealLifecycle()}
    >
      {children}
    </Component>
  );
}
