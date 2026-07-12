"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useIsMobile, useReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

/** Peak rotation in degrees. Kept small — a tilt, not a flip. */
const MAX_TILT = 5;

/**
 * Card with a restrained 3D tilt toward the cursor, plus a gold sheen that
 * follows the pointer. Disabled on touch and for reduced-motion users.
 */
export function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const interactive = !isMobile && !reduced;

  // −0.5 → 0.5 across the card in each axis.
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(
    useTransform(py, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]),
    spring,
  );
  const rotateY = useSpring(
    useTransform(px, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]),
    spring,
  );

  const sheenX = useTransform(px, [-0.5, 0.5], ["0%", "100%"]);
  const sheenY = useTransform(py, [-0.5, 0.5], ["0%", "100%"]);
  const sheen = useTransform(
    [sheenX, sheenY],
    ([x, y]: string[]) =>
      `radial-gradient(420px circle at ${x} ${y}, rgba(201,164,106,0.16), transparent 65%)`,
  );

  const onPointerMove = (e: React.PointerEvent) => {
    if (!interactive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={
        interactive
          ? { rotateX, rotateY, transformPerspective: 1000 }
          : undefined
      }
      className={cn(
        "group relative isolate overflow-hidden rounded-2xl transition-shadow duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d]",
        "hover:shadow-[0_40px_80px_-40px_rgba(42,33,30,0.3)]",
        className,
      )}
    >
      {interactive && (
        <motion.span
          aria-hidden
          style={{ background: sheen }}
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}
      {children}
    </motion.div>
  );
}
