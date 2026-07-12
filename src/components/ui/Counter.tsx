"use client";

import { useRef } from "react";
import { gsap, EASE } from "@/animations/gsap";
import { useGsapContext } from "@/hooks/useGsapContext";

/** Counts up to `value` when scrolled into view. */
export function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const numberRef = useRef<HTMLSpanElement>(null);

  const scope = useGsapContext<HTMLSpanElement>(({ scope }) => {
    const node = numberRef.current;
    if (!node) return;

    const counter = { n: 0 };
    gsap.to(counter, {
      n: value,
      duration: 2,
      ease: EASE.lux,
      onUpdate: () => {
        node.textContent = Math.round(counter.n).toLocaleString();
      },
      scrollTrigger: { trigger: scope, start: "top 88%", once: true },
    });
  }, [value]);

  return (
    <span ref={scope} className={className}>
      <span ref={numberRef}>0</span>
      {suffix}
    </span>
  );
}
