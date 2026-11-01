import type { Transition, TargetAndTransition } from "framer-motion";

/** Framer's "appear" tween, used for blocks. */
export const EASE_STD = [0.4, 0, 0.2, 1] as const;
/** Nav-link / small hover tween (0.3s). */
export const EASE_HOVER = [0.44, 0, 0.56, 1] as const;
/** CSS fallback for TEXT_SPRING. */
export const EASE_TEXT_FALLBACK = [0.16, 1, 0.3, 1] as const;

/** Reference word reveal: no overshoot, ~.55 progress at 20% of duration. */
export const TEXT_SPRING = { type: "spring", duration: 0.8, bounce: 0 } as const;

export const WORD_STAGGER = 0.045;

/** Fires when the element enters the bottom ~15% of the viewport. */
export const REVEAL_VIEWPORT = { once: true, margin: "0px 0px -15% 0px" } as const;

export const TEXT_HIDDEN = { opacity: 0.001, y: 10, filter: "blur(5px)" } satisfies TargetAndTransition;
export const TEXT_SHOWN = { opacity: 1, y: 0, filter: "blur(0px)" } satisfies TargetAndTransition;

/** Opacity-only quick fade used when the user prefers reduced motion. */
export const REDUCED_TRANSITION: Transition = {
  default: { duration: 0 },
  opacity: { duration: 0.15, ease: "linear" },
};

export function textTransition(delay = 0, reduced = false): Transition {
  return reduced ? REDUCED_TRANSITION : { ...TEXT_SPRING, delay };
}

export function blockTransition(
  delay = 0,
  duration = 0.6,
  reduced = false
): Transition {
  return reduced ? REDUCED_TRANSITION : { duration, delay, ease: EASE_STD };
}

/** Drops the GPU hints / leftover blur once a reveal has finished. */
export function clearRevealStyles(el: HTMLElement | null) {
  if (!el) return;
  el.style.willChange = "auto";
  el.style.filter = "none";
}
