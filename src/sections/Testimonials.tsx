"use client";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { TESTIMONIALS } from "@/lib/content";

export function Testimonials() {
  return (
    <section className="grain relative overflow-hidden bg-linen py-32 md:py-40">
      {/* A soft blush bloom, echoing the lighting in the clinic. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(231,207,197,0.7),transparent_65%)] blur-2xl"
      />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="flex justify-center">
            <Eyebrow>{TESTIMONIALS.eyebrow}</Eyebrow>
          </Reveal>
          <MaskedHeading
            lines={TESTIMONIALS.headline}
            accentLast
            className="mt-7 text-[clamp(2.25rem,5vw,4.25rem)] text-espresso"
          />
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.items.map((item, i) => (
            <Reveal key={item.author} delay={i * 0.1} className="h-full">
              <TiltCard className="flex h-full flex-col border border-espresso/8 bg-ivory p-9">
                <div
                  aria-hidden
                  className="text-sm tracking-[0.35em] text-gold"
                >
                  ★★★★★
                </div>

                <blockquote className="mt-7 flex-1 font-[family-name:var(--font-display)] text-lg leading-relaxed font-light text-espresso">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-8 flex items-center gap-3 border-t border-espresso/8 pt-6 text-sm">
                  <span className="h-px w-6 bg-gold" />
                  <span className="text-espresso">{item.author}</span>
                  <span className="text-ash">· {item.location}</span>
                </figcaption>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-12 text-center text-[0.7rem] text-ash italic">
            {TESTIMONIALS.footnote}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
