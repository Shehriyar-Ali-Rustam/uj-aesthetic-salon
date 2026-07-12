"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// registerPlugin is idempotent, so a repeated import is harmless.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Shared motion language. Every animation on the site pulls from here. */
export const EASE = {
  /** The house ease — decisive start, long settle. */
  lux: "power3.out",
  /** For masked text sliding out from behind its clip. */
  reveal: "expo.out",
  glide: "power2.inOut",
} as const;

export const DURATION = {
  fast: 0.6,
  base: 1.0,
  slow: 1.4,
} as const;

/** Stagger a set of children by the house rhythm. */
export const STAGGER = 0.09;

export { gsap, ScrollTrigger };
