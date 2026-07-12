"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CLINIC } from "@/lib/content";

/**
 * A short, quiet hold on the brand while the first clip buffers — then the
 * curtain lifts. Capped so a slow network can never trap the visitor here.
 */
const MIN_HOLD = 900;
const MAX_HOLD = 2600;

export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }

    const start = performance.now();
    let timer: number;

    const finish = () => {
      const elapsed = performance.now() - start;
      timer = window.setTimeout(
        () => setDone(true),
        Math.max(0, MIN_HOLD - elapsed),
      );
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });

    const failsafe = window.setTimeout(() => setDone(true), MAX_HOLD);

    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(timer);
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-7 bg-cream"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-display)] text-sm font-light tracking-[0.42em] text-espresso uppercase"
          >
            {CLINIC.shortName}
            <span className="text-gold">.</span> Aesthetics
          </motion.span>

          <span className="relative block h-px w-40 overflow-hidden bg-espresso/10">
            <motion.span
              className="absolute inset-y-0 left-0 block w-full origin-left bg-gold"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
            />
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
