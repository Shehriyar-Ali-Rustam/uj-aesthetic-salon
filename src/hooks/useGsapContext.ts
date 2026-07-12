"use client";

import { useRef, type RefObject } from "react";
import { gsap } from "@/animations/gsap";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

/**
 * Scopes a GSAP setup function to a container ref and reverts every tween and
 * ScrollTrigger it created on unmount. This is the only place components should
 * touch gsap.context, so cleanup can never be forgotten.
 */
export function useGsapContext<T extends HTMLElement = HTMLDivElement>(
  setup: (ctx: { scope: T }) => void,
  deps: unknown[] = [],
): RefObject<T | null> {
  const scope = useRef<T>(null);
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useIsomorphicLayoutEffect(() => {
    if (!scope.current) return;
    const el = scope.current;
    const ctx = gsap.context(() => setupRef.current({ scope: el }), el);
    return () => ctx.revert();
  }, deps);

  return scope;
}
