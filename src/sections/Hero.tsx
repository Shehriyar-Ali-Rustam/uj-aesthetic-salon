"use client";

import { motion, useTransform } from "motion/react";
import { JourneySection } from "@/components/cinematic/CinematicJourney";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useIsMobile, useReducedMotion } from "@/hooks/useMediaQuery";
import { HERO } from "@/lib/content";

/** Maximum drift, in pixels, of the headline under the cursor. Barely there. */
const DRIFT = 14;

export function Hero() {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const pointerEnabled = !isMobile && !reduced;

  const pointer = useMousePosition(pointerEnabled);

  // The headline and the supporting copy drift by different amounts, which
  // reads as depth rather than as a moving text block.
  const headingX = useTransform(pointer.x, [-1, 1], [DRIFT, -DRIFT]);
  const headingY = useTransform(pointer.y, [-1, 1], [DRIFT * 0.5, -DRIFT * 0.5]);
  const bodyX = useTransform(pointer.x, [-1, 1], [DRIFT * 0.45, -DRIFT * 0.45]);
  const bodyY = useTransform(pointer.y, [-1, 1], [DRIFT * 0.25, -DRIFT * 0.25]);

  return (
    <JourneySection id="top" scrim="left">
      {/* The bottom padding has to clear the absolutely-positioned scroll cue,
          which needs more room on mobile where the CTAs wrap to two rows. */}
      <Container className="relative pt-32 pb-52 md:pb-32">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow tone="light">{HERO.eyebrow}</Eyebrow>
          </motion.div>

          <motion.div
            style={pointerEnabled ? { x: headingX, y: headingY } : undefined}
            className="mt-8"
          >
            <MaskedHeading
              as="h1"
              immediate
              delay={0.35}
              lines={HERO.headline}
              accentLast
              className="text-[clamp(2.75rem,7.5vw,6.5rem)] text-ivory"
            />
          </motion.div>

          <motion.div
            style={pointerEnabled ? { x: bodyX, y: bodyY } : undefined}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 max-w-lg"
          >
            <p className="text-base leading-relaxed text-ivory/70 md:text-lg">
              {HERO.subtitle}
            </p>

            <div className="mt-11 flex flex-wrap items-center gap-4">
              <Button href={HERO.cta.href}>{HERO.cta.label}</Button>
              <Button href={HERO.secondaryCta.href} variant="outline">
                {HERO.secondaryCta.label}
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.5 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2"
        >
          <ScrollIndicator label={HERO.scrollHint} />
        </motion.div>
      </Container>
    </JourneySection>
  );
}
