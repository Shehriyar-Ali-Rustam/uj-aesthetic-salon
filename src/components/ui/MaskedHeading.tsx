"use client";

import { createElement } from "react";
import { reveal } from "@/animations/reveals";
import { useGsapContext } from "@/hooks/useGsapContext";
import { cn } from "@/lib/utils";

interface MaskedHeadingProps {
  /** One entry per visual line — each slides up out of its own clip. */
  lines: readonly string[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Word(s) at the end of a line can be set in gold italic for emphasis. */
  accentLast?: boolean;
  delay?: number;
  /** Hero fires on mount; everything else waits for the scroll trigger. */
  immediate?: boolean;
}

/**
 * Line-by-line mask reveal. Each line is wrapped in an overflow-hidden host and
 * translated up from behind it — the classic editorial reveal, and cheaper than
 * splitting to characters (no layout thrash, no paid SplitText plugin).
 */
export function MaskedHeading({
  lines,
  as = "h2",
  className,
  accentLast = false,
  delay = 0,
  immediate = false,
}: MaskedHeadingProps) {
  const scope = useGsapContext<HTMLHeadingElement>(({ scope }) => {
    const targets = scope.querySelectorAll("[data-line]");
    reveal(targets, {
      variant: "mask-up",
      delay,
      stagger: 0.1,
      trigger: immediate ? undefined : scope,
      start: "top 85%",
    });
  }, []);

  return createElement(
    as,
    {
      ref: scope,
      className: cn("text-display", className),
    },
    lines.map((line, i) => (
      <span key={line} className="mask-line">
        <span
          data-line
          data-reveal
          className={cn(
            "block",
            accentLast && i === lines.length - 1 && "text-gold-deep italic",
          )}
        >
          {line}
        </span>
      </span>
    )),
  );
}
