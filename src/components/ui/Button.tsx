"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "gold" | "outline" | "ghost";

const BASE =
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-4 text-[0.8rem] font-medium uppercase tracking-[0.18em] font-[family-name:var(--font-display)] transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold";

const VARIANTS: Record<Variant, string> = {
  gold: "bg-gold text-ivory shadow-[0_8px_30px_-12px_rgba(168,130,63,0.55)] hover:shadow-[0_18px_46px_-14px_rgba(168,130,63,0.7)]",
  outline:
    "border border-ivory/35 text-ivory backdrop-blur-md hover:border-ivory/70",
  ghost:
    "border border-espresso/15 text-espresso hover:border-gold/60 hover:shadow-[0_16px_40px_-20px_rgba(42,33,30,0.45)]",
};

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

/**
 * The house button: lifts on hover, with a light sweep passing across it.
 */
export function Button({
  href,
  children,
  variant = "gold",
  className,
}: ButtonProps) {
  return (
    <Link href={href} className={cn(BASE, VARIANTS[variant], className)}>
      {/* Sweep — a soft specular pass, not a flashy shine. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-full"
      />
      <span className="relative">{children}</span>
    </Link>
  );
}

/** Submit-flavoured twin of Button, for the contact form. */
export function SubmitButton({
  children,
  variant = "gold",
  className,
}: Omit<ButtonProps, "href">) {
  return (
    <button type="submit" className={cn(BASE, VARIANTS[variant], className)}>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-full"
      />
      <span className="relative">{children}</span>
    </button>
  );
}
