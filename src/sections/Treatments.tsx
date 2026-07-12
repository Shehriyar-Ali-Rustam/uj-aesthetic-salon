"use client";

import { useState } from "react";
import { JourneySection } from "@/components/cinematic/CinematicJourney";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TREATMENTS } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * A ledger of treatments rather than a grid of cards — the clip behind stays
 * visible, and the list reads like a menu in a quiet room.
 */
export function Treatments() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <JourneySection id="treatments">
      <Container className="py-32">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <Eyebrow tone="light">{TREATMENTS.eyebrow}</Eyebrow>
            </Reveal>

            <MaskedHeading
              lines={TREATMENTS.headline}
              accentLast
              className="mt-7 text-[clamp(2.25rem,5vw,4.25rem)] text-ivory"
            />

            <Reveal variant="blur-in" delay={0.15}>
              <p className="mt-8 max-w-sm text-base leading-relaxed text-ivory/65">
                {TREATMENTS.intro}
              </p>
            </Reveal>
          </div>

          <Reveal staggerChildren className="border-t border-ivory/12">
            {TREATMENTS.items.map((item) => {
              const isActive = active === item.title;
              const isDimmed = active !== null && !isActive;

              return (
                <button
                  key={item.title}
                  type="button"
                  onMouseEnter={() => setActive(item.title)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(item.title)}
                  onBlur={() => setActive(null)}
                  aria-expanded={isActive}
                  className={cn(
                    "group block w-full border-b border-ivory/12 py-7 text-left transition-[opacity,padding] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive && "pl-4",
                    // Focus the one you're on by receding the rest.
                    isDimmed ? "opacity-40" : "opacity-100",
                  )}
                >
                  <div className="flex items-baseline gap-5">
                    <span className="font-[family-name:var(--font-display)] text-xs text-gold/70 tabular-nums">
                      {item.index}
                    </span>
                    <h3 className="flex-1 font-[family-name:var(--font-display)] text-xl font-light text-ivory md:text-2xl">
                      {item.title}
                    </h3>
                    <span
                      aria-hidden
                      className="text-lg text-gold opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100 md:-translate-x-3"
                    >
                      →
                    </span>
                  </div>

                  {/* Grid-rows trick: animates height without measuring it. */}
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isActive
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <p className="overflow-hidden pl-10 text-sm leading-relaxed text-ivory/60">
                      <span className="block pt-4">{item.body}</span>
                    </p>
                  </div>
                </button>
              );
            })}
          </Reveal>
        </div>
      </Container>
    </JourneySection>
  );
}
