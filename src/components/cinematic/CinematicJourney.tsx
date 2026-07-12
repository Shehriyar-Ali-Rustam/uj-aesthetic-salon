"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/animations/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useIsMobile, useReducedMotion } from "@/hooks/useMediaQuery";
import { useSaveData } from "@/hooks/useSaveData";
import { SECTION_CLIPS } from "@/lib/videos";
import { smoothstep } from "@/lib/utils";

/**
 * The walkthrough.
 *
 * A single sticky video stage sits behind five scrolling sections. Each clip is
 * stacked above the previous one and dissolves in as its section rises into
 * view, so the visitor never sees a cut — only a continuous walk through the
 * clinic. Because each fade is driven by its *own* section's position rather
 * than by a share of the total scroll, sections are free to be different
 * heights without knocking the timing out.
 *
 * Opacities are written straight to the DOM (never through React state) so a
 * scroll frame costs one style write per clip and no re-render.
 */

/** Clip i is fully hidden when its section is this far below the fold... */
const FADE_IN_START = 0.85;
/** ...and fully covering by the time the section reaches here. */
const FADE_IN_END = 0.2;
/** Load a clip one viewport before its fade could begin. */
const PRELOAD_MARGIN = 1;

export function CinematicJourney({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const opacities = useRef<number[]>(SECTION_CLIPS.map((_, i) => (i === 0 ? 1 : 0)));

  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const saveData = useSaveData();

  /**
   * On Save-Data or a 2G-class connection, the clips are never fetched at all —
   * the poster frames stand in. 4MB of video is not worth it to someone paying
   * per megabyte, and the page still reads exactly as designed.
   */
  const playbackDisabled = reduced || saveData;

  /**
   * No clip gets a `src` until we have mounted and know the viewport.
   *
   * This matters more than it looks: media queries do not resolve during SSR, so
   * if the first clip carried a src in the server HTML it would always be the
   * 1080p one — and a phone would start downloading it before hydration could
   * swap in the 720p encode, paying for both. Posters paint instantly, so
   * nothing is visibly lost by waiting a tick.
   */
  const [loaded, setLoaded] = useState<boolean[]>(() =>
    SECTION_CLIPS.map(() => false),
  );

  const requestLoad = useCallback((index: number) => {
    setLoaded((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  /** Clip 1 is the hero: fetch it as soon as we know which encode to fetch. */
  useEffect(() => {
    if (playbackDisabled) return;
    requestLoad(0);
  }, [playbackDisabled, requestLoad]);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = Array.from(
      container.querySelectorAll<HTMLElement>("[data-journey-section]"),
    );

    const ctx = gsap.context(() => {
      /** Document-space top of each section, remeasured on every refresh. */
      let tops: number[] = [];
      let inView = true;

      const measure = () => {
        const scrollY = window.scrollY;
        tops = sections.map(
          (section) => section.getBoundingClientRect().top + scrollY,
        );
      };

      const paint = () => {
        const vh = window.innerHeight;
        const scrollY = window.scrollY;

        for (let i = 0; i < SECTION_CLIPS.length; i++) {
          const top = tops[i];
          const opacity =
            i === 0 || top === undefined
              ? 1
              : smoothstep(top - vh * FADE_IN_START, top - vh * FADE_IN_END, scrollY);

          opacities.current[i] = opacity;

          const video = videoRefs.current[i];
          if (video) video.style.opacity = opacity.toFixed(3);

          if (
            !playbackDisabled &&
            top !== undefined &&
            scrollY > top - vh * (FADE_IN_START + PRELOAD_MARGIN)
          ) {
            requestLoad(i);
          }
        }

        syncPlayback();
      };

      /**
       * Only clips that can actually be seen are allowed to decode: a clip is
       * paused once it is fully painted over by a later one, or once the whole
       * journey has left the viewport.
       */
      const syncPlayback = () => {
        for (let i = 0; i < SECTION_CLIPS.length; i++) {
          const video = videoRefs.current[i];
          if (!video || !video.src) continue;

          const covered = opacities.current.some(
            (o, j) => j > i && o > 0.995,
          );
          const shouldPlay =
            inView &&
            !playbackDisabled &&
            opacities.current[i] > 0.002 &&
            !covered;

          if (shouldPlay && video.paused) {
            void video.play().catch(() => {
              /* Autoplay can still be refused; the poster stands in. */
            });
          } else if (!shouldPlay && !video.paused) {
            video.pause();
          }
        }
      };

      measure();
      paint();

      ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        onRefresh: () => {
          measure();
          paint();
        },
        onUpdate: paint,
        onToggle: (self) => {
          inView = self.isActive;
          syncPlayback();
        },
      });
    }, container);

    return () => ctx.revert();
  }, [playbackDisabled, requestLoad]);

  return (
    <div ref={containerRef} className="relative bg-espresso">
      {/* The stage: pinned for the length of the journey by `sticky`, which is
          cheaper and steadier than a ScrollTrigger pin (no layout shifts). */}
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        {SECTION_CLIPS.map((clip, i) => (
          <video
            // One layer per section, not per clip — clips repeat on the way
            // back out, so the section index is what identifies a layer.
            key={i}
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            src={
              loaded[i]
                ? isMobile
                  ? clip.mobileSrc
                  : clip.src
                : undefined
            }
            poster={clip.poster}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
            tabIndex={-1}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: i === 0 ? 1 : 0, zIndex: i }}
          />
        ))}

        {/* Base grade. The clinic's cream floors and lit plaster are very
            bright, and white type dies on them — this is the floor of the
            contrast budget, topped up per-section by <JourneySection scrim>. */}
        <div
          aria-hidden
          className="absolute inset-0 z-20 bg-gradient-to-b from-espresso/75 via-espresso/40 to-espresso/85"
        />
        {/* Warm vignette: pulls the eye to the centre of the frame. */}
        <div
          aria-hidden
          className="absolute inset-0 z-20 bg-[radial-gradient(120%_80%_at_50%_45%,transparent_30%,rgba(30,22,19,0.6)_100%)]"
        />
        <div aria-hidden className="grain absolute inset-0 z-20" />
      </div>

      {/* Content rides over the stage. */}
      <div className="relative z-30 -mt-[100svh]">{children}</div>
    </div>
  );
}

/**
 * Extra darkening drawn behind a section's copy, weighted toward the side the
 * copy actually sits on. Keeps the opposite side of the frame open and bright,
 * which is what stops the walkthrough from turning into a dark tunnel.
 */
const SCRIM: Record<"left" | "right" | "center" | "none", string> = {
  left: "bg-gradient-to-r from-espresso/65 via-espresso/25 to-transparent",
  right: "bg-gradient-to-l from-espresso/65 via-espresso/25 to-transparent",
  center: "bg-espresso/30",
  none: "",
};

/**
 * One "room" in the walkthrough. Its position drives the clip that fades in
 * behind it.
 */
export function JourneySection({
  id,
  children,
  scrim = "center",
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  scrim?: "left" | "right" | "center" | "none";
  className?: string;
}) {
  return (
    <section
      id={id}
      data-journey-section
      className={`relative flex min-h-svh w-full items-center ${className}`}
    >
      {scrim !== "none" && (
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 -z-10 ${SCRIM[scrim]}`}
        />
      )}
      {children}
    </section>
  );
}
