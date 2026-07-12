"use client";

import { gsap, EASE, DURATION, STAGGER } from "./gsap";

export type RevealVariant =
  | "fade-up"
  | "mask-up"
  | "blur-in"
  | "scale-in"
  | "fade";

/**
 * The from-state for each variant. Elements are already at `opacity: 0` via the
 * `[data-reveal]` rule in globals.css, so there is never a flash of un-animated
 * content between paint and the timeline attaching.
 */
const FROM: Record<RevealVariant, gsap.TweenVars> = {
  "fade-up": { opacity: 0, y: 44 },
  "mask-up": { opacity: 1, yPercent: 115 },
  "blur-in": { opacity: 0, filter: "blur(14px)", y: 20 },
  "scale-in": { opacity: 0, scale: 1.06 },
  fade: { opacity: 0 },
};

const TO: Record<RevealVariant, gsap.TweenVars> = {
  "fade-up": { opacity: 1, y: 0 },
  "mask-up": { opacity: 1, yPercent: 0 },
  "blur-in": { opacity: 1, filter: "blur(0px)", y: 0 },
  "scale-in": { opacity: 1, scale: 1 },
  fade: { opacity: 1 },
};

interface RevealOptions {
  variant?: RevealVariant;
  /** Delay before the first target moves. */
  delay?: number;
  stagger?: number;
  duration?: number;
  /** Where the trigger must sit in the viewport to fire. */
  start?: string;
  trigger?: Element;
}

/**
 * Scroll-triggered reveal for one or more elements. Returns the tween so a
 * caller inside a `gsap.context` gets cleanup for free.
 */
export function reveal(
  targets: gsap.TweenTarget,
  {
    variant = "fade-up",
    delay = 0,
    stagger = STAGGER,
    duration,
    start = "top 82%",
    trigger,
  }: RevealOptions = {},
) {
  const isMask = variant === "mask-up";

  return gsap.fromTo(targets, FROM[variant], {
    ...TO[variant],
    duration: duration ?? (isMask ? DURATION.slow : DURATION.base),
    ease: isMask ? EASE.reveal : EASE.lux,
    stagger,
    delay,
    // Drop the blur filter once it lands — a lingering `filter` keeps the
    // element on its own composited layer for the rest of the session.
    // NOTE: the key must be absent, not undefined; GSAP's CSSPlugin installs
    // its clearProps handler on key presence alone and then splits on it.
    ...(variant === "blur-in" ? { clearProps: "filter" } : {}),
    ...(trigger ? { scrollTrigger: { trigger, start, once: true } } : {}),
  });
}
