"use client";

import { JourneySection } from "@/components/cinematic/CinematicJourney";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { ABOUT } from "@/lib/content";

export function About() {
  return (
    <JourneySection id="about">
      <Container className="py-32">
        <div className="grid items-end gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <Reveal>
              <Eyebrow tone="light">{ABOUT.eyebrow}</Eyebrow>
            </Reveal>

            <MaskedHeading
              lines={ABOUT.headline}
              accentLast
              className="mt-7 text-[clamp(2.25rem,5vw,4.25rem)] text-ivory"
            />
          </div>

          <div>
            <Reveal variant="blur-in" delay={0.15}>
              <p className="max-w-xl text-base leading-relaxed text-ivory/70 md:text-lg">
                {ABOUT.body}
              </p>
            </Reveal>

            <Reveal
              staggerChildren
              delay={0.2}
              className="mt-14 grid grid-cols-3 gap-6 border-t border-ivory/15 pt-10"
            >
              {ABOUT.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-display text-4xl text-gold md:text-5xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-3 text-xs leading-snug tracking-wide text-ivory/50 uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mt-8 text-[0.7rem] text-ivory/30 italic">
                {ABOUT.footnote}
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </JourneySection>
  );
}
