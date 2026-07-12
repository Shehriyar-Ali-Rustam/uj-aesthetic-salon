"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, type MotionValue } from "motion/react";

interface Pointer {
  /** −1 (left/top) → 1 (right/bottom), relative to the viewport centre. */
  x: MotionValue<number>;
  y: MotionValue<number>;
}

/**
 * Spring-damped pointer offset for the hero parallax. Deliberately soft — the
 * text should drift, never track the cursor.
 */
export function useMousePosition(enabled = true): Pointer {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 45, damping: 20, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 45, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, rawX, rawY]);

  return { x, y };
}
