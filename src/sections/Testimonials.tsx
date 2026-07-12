"use client";

import { JourneySection } from "@/components/cinematic/CinematicJourney";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { TESTIMONIALS } from "@/lib/content";

export function Testimonials() {
  return (
    <JourneySection id="testimonials" scrim="center">
      <Container className="py-32">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="flex justify-center">
            <Eyebrow tone="light">{TESTIMONIALS.eyebrow}</Eyebrow>
          </Reveal>
          <MaskedHeading
            lines={TESTIMONIALS.headline}
            accentLast
            className="mt-7 text-[clamp(2.25rem,5vw,4.25rem)] text-ivory"
          />
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.items.map((item, i) => (
            <Reveal key={item.author} delay={i * 0.1} className="h-full">
              <TiltCard className="flex h-full flex-col border border-ivory/12 bg-espresso/55 p-9 backdrop-blur-xl">
                <div aria-hidden className="text-sm tracking-[0.35em] text-gold">
                  ★★★★★
                </div>

                <blockquote className="mt-7 flex-1 font-[family-name:var(--font-display)] text-lg leading-relaxed font-light text-ivory">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-8 flex items-center gap-3 border-t border-ivory/12 pt-6 text-sm">
                  <span className="h-px w-6 bg-gold" />
                  <span className="text-ivory">{item.author}</span>
                  <span className="text-ivory/40">· {item.location}</span>
                </figcaption>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-12 text-center text-[0.7rem] text-ivory/30 italic">
            {TESTIMONIALS.footnote}
          </p>
        </Reveal>
      </Container>
    </JourneySection>
  );
}
