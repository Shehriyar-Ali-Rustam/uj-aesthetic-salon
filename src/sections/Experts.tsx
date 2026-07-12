"use client";

import { JourneySection } from "@/components/cinematic/CinematicJourney";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { EXPERTS } from "@/lib/content";

export function Experts() {
  return (
    <JourneySection id="experts" scrim="center">
      <Container className="py-32">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <Eyebrow tone="light">{EXPERTS.eyebrow}</Eyebrow>
            </Reveal>
            <MaskedHeading
              lines={EXPERTS.headline}
              accentLast
              className="mt-7 text-[clamp(2.25rem,5vw,4.25rem)] text-ivory"
            />
          </div>

          <Reveal delay={0.2}>
            <p className="max-w-sm text-sm leading-relaxed text-ivory/65">
              Qualified, experienced hands guiding every treatment and plan —
              listening first, then designing around your skin.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {EXPERTS.people.map((person, i) => (
            <Reveal key={person.role} delay={i * 0.1}>
              <TiltCard className="h-full border border-ivory/12 bg-espresso/55 backdrop-blur-xl">
                {/* Portrait plate — the clinic still has to supply photography.
                    This holds the exact 4:5 crop the images should be cut to;
                    drop an <Image fill> in here and delete the placeholder. */}
                <div className="relative aspect-[4/5] overflow-hidden bg-espresso/40">
                  <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_10%,rgba(231,207,197,0.16),transparent)]" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                    <span
                      aria-hidden
                      className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/35"
                    >
                      <span className="h-8 w-8 rounded-full border border-gold/35" />
                    </span>
                    <span className="text-[0.6rem] tracking-[0.28em] text-ivory/40 uppercase">
                      Portrait to supply
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-light text-ivory">
                    {person.name}
                  </h3>
                  <p className="text-eyebrow mt-2 text-gold">{person.role}</p>
                  <p className="mt-5 text-sm leading-relaxed text-ivory/65">
                    {person.bio}
                  </p>

                  <dl className="mt-7 space-y-2 border-t border-ivory/12 pt-5 text-xs text-ivory/40">
                    <div>
                      <dt className="sr-only">Credentials</dt>
                      <dd>{person.credentials}</dd>
                    </div>
                    <div>
                      <dt className="sr-only">Focus</dt>
                      <dd>{person.focus}</dd>
                    </div>
                  </dl>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </JourneySection>
  );
}
