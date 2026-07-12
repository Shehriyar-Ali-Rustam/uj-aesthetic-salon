"use client";

import { JourneySection } from "@/components/cinematic/CinematicJourney";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TECHNOLOGY } from "@/lib/content";

export function Technology() {
  return (
    <JourneySection id="technology" scrim="right">
      <Container className="py-32">
        <div className="ml-auto max-w-2xl">
          <Reveal>
            <Eyebrow tone="light">{TECHNOLOGY.eyebrow}</Eyebrow>
          </Reveal>

          <MaskedHeading
            lines={TECHNOLOGY.headline}
            accentLast
            className="mt-7 text-[clamp(2.25rem,5vw,4.25rem)] text-ivory"
          />

          <Reveal variant="blur-in" delay={0.15}>
            <p className="mt-8 text-base leading-relaxed text-ivory/70 md:text-lg">
              {TECHNOLOGY.body}
            </p>
          </Reveal>

          <Reveal staggerChildren delay={0.2} className="mt-14 space-y-px">
            {TECHNOLOGY.points.map((point, i) => (
              <div
                key={point.title}
                className="group flex items-start gap-6 border-t border-ivory/12 py-7 transition-colors duration-700 last:border-b"
              >
                <span className="font-[family-name:var(--font-display)] text-xs text-gold/70 tabular-nums">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-light text-ivory">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/60">
                    {point.body}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </Container>
    </JourneySection>
  );
}
