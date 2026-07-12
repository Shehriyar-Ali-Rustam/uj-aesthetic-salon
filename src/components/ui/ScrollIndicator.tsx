"use client";

import { motion } from "motion/react";

/**
 * Hero scroll cue: a gold bead falling down a hairline, on a slow loop.
 */
export function ScrollIndicator({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-eyebrow text-ivory/55 text-[0.6rem]">{label}</span>
      <span className="relative block h-14 w-px overflow-hidden bg-ivory/20">
        <motion.span
          className="absolute inset-x-0 top-0 block h-5 bg-gradient-to-b from-transparent to-gold"
          animate={{ y: ["-100%", "280%"] }}
          transition={{
            duration: 2.4,
            ease: [0.65, 0, 0.35, 1],
            repeat: Infinity,
            repeatDelay: 0.35,
          }}
        />
      </span>
    </div>
  );
}
