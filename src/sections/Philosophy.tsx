"use client";

import { JourneySection } from "@/components/cinematic/CinematicJourney";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, GoldRule } from "@/components/ui/Reveal";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { PHILOSOPHY } from "@/lib/content";

export function Philosophy() {
  return (
    <JourneySection id="philosophy">
      <Container className="py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal className="flex justify-center">
            <Eyebrow tone="light">{PHILOSOPHY.eyebrow}</Eyebrow>
          </Reveal>

          {/* The quote is the whole section — give it the room it deserves. */}
          <MaskedHeading
            lines={PHILOSOPHY.quote}
            className="mt-10 text-[clamp(1.6rem,3.6vw,3rem)] leading-[1.2] text-ivory"
          />

          <Reveal delay={0.3} className="mt-10 flex flex-col items-center gap-6">
            <GoldRule className="max-w-[120px]" />
            <p className="text-eyebrow text-ivory/45">
              {PHILOSOPHY.attribution}
            </p>
          </Reveal>
        </div>

        <Reveal
          staggerChildren
          className="mx-auto mt-24 grid max-w-5xl gap-px overflow-hidden rounded-2xl border border-ivory/12 bg-ivory/10 md:grid-cols-3"
        >
          {PHILOSOPHY.pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group bg-espresso/70 p-9 transition-colors duration-700 hover:bg-espresso/20 md:bg-espresso/35 md:backdrop-blur-xl"
            >
              <span className="block h-px w-8 bg-gold transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-14" />
              <h3 className="mt-7 font-[family-name:var(--font-display)] text-xl font-light text-ivory">
                {pillar.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ivory/60">
                {pillar.body}
              </p>
            </div>
          ))}
        </Reveal>
      </Container>
    </JourneySection>
  );
}
