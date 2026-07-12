"use client";

import { reveal, type RevealVariant } from "@/animations/reveals";
import { useGsapContext } from "@/hooks/useGsapContext";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  /** Stagger the direct children instead of moving the wrapper as one block. */
  staggerChildren?: boolean;
  className?: string;
  start?: string;
}

/**
 * Drop-in scroll reveal: wraps its children and animates them in once, when the
 * wrapper reaches `start`.
 *
 * The hidden from-state comes from CSS (`[data-reveal]` / `[data-reveal-group]`
 * in globals.css) rather than from JS, so server-rendered markup is already
 * hidden at first paint and nothing flashes before hydration.
 */
export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  staggerChildren = false,
  className,
  start = "top 82%",
}: RevealProps) {
  const scope = useGsapContext<HTMLDivElement>(({ scope }) => {
    const targets = staggerChildren ? Array.from(scope.children) : scope;
    reveal(targets, { variant, delay, trigger: scope, start });
  }, []);

  const hiddenState = staggerChildren
    ? { "data-reveal-group": "" }
    : { "data-reveal": "" };

  return (
    <div ref={scope} className={className} {...hiddenState}>
      {children}
    </div>
  );
}

/** A gold hairline that fades in when it enters the viewport. */
export function GoldRule({ className }: { className?: string }) {
  const scope = useGsapContext<HTMLDivElement>(({ scope }) => {
    reveal(scope, { variant: "fade", trigger: scope, duration: 1.2 });
  }, []);

  return (
    <div
      ref={scope}
      data-reveal
      className={cn("hairline h-px w-full", className)}
    />
  );
}
