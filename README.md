# Uj's Aesthetics — cinematic landing page

A premium, single-page site for a skin & aesthetics clinic in Bahria Town. The
whole page is a **continuous walkthrough**: clips of the clinic sit on one pinned
stage and cross-dissolve into each other as you scroll, so the visitor never
loses the building underneath them — no cuts, no page reloads.

The walk is a round trip. You come in through the reception, go deeper —
corridor, suites, product gallery, lounge — and then turn back, ending at the
reception again for the booking section, which is exactly where a visitor would
be standing when they ask for an appointment. The mapping lives in `SECTION_CLIPS`
([src/lib/videos.ts](src/lib/videos.ts)).

**Stack:** Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · GSAP
ScrollTrigger · Lenis · Motion (Framer Motion) · TypeScript.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

---

## What to edit first

Every word on the site lives in [`src/lib/content.ts`](src/lib/content.ts).
Nothing is hardcoded in a component.

Anything in `[square brackets]` is a **placeholder the clinic still has to
supply**. Grep for `[` in that file to find them all:

| Placeholder | Where it shows |
| --- | --- |
| `CLINIC.whatsapp` | Booking form. Empty = demo mode (see below). |
| `CLINIC.phone`, `.email`, `.address`, `.hours` | Contact section + footer |
| `CLINIC.socials` | Footer |
| `EXPERTS.people` | Names, credentials — and portraits (see below) |
| `ABOUT.stats` | The 1,000+ / 8 / 20+ figures are illustrative |
| `TESTIMONIALS.items` | Sample reviews — replace with real, consented ones |

**Booking form.** There is no backend, by design. The form composes a WhatsApp
message and hands off to `wa.me`. Set `CLINIC.whatsapp` to the clinic's number
(country code, no `+`, e.g. `923001234567`) to switch it on; until then it shows
a local confirmation so the flow is still demonstrable.

**Expert portraits.** `src/sections/Experts.tsx` holds a 4:5 placeholder plate.
Drop a `next/image` with `fill` into that div and delete the placeholder — the
crop is already the right shape.

---

## How the walkthrough works

[`src/components/cinematic/CinematicJourney.tsx`](src/components/cinematic/CinematicJourney.tsx)

- One `sticky` stage holds a stacked `<video>` layer **per section** — clips
  repeat on the way back out, and a repeat costs nothing, since the file is
  already cached and only visible layers ever decode. `sticky` is used instead of
  a GSAP pin: it is cheaper, and it cannot introduce the layout shifts a pin does.
- Clip _i_ is stacked above clip _i−1_ and **dissolves in as its own section
  rises into view**. Because each fade is driven by its own section's position —
  not by a share of the total scroll — sections can be any height without
  knocking the timing out. The clip underneath stays fully opaque, so a fade is
  always A-over-B and the frame never dims to the page background mid-transition.
- Opacity is written straight to the DOM on each scroll frame; it never goes
  through React state, so a scroll frame costs five style writes and no re-render.
- Clips are lazy: a clip is given its `src` one viewport before its fade can
  begin, and only clips that can actually be seen are allowed to decode —
  anything fully painted over by a later clip is paused.
- Narrow viewports get the 720p encodes; everything else gets 1080p.

To reorder the walk, reorder the sections in `src/app/page.tsx`. Each is a
`<JourneySection>`, and its `scrim` prop (`left` / `right` / `center`) decides
which side of the frame is darkened for the copy to sit on — the clinic's cream
floors are very bright, and white type dies on them without it.

## The video pipeline

The five source clips are the untouched originals in [`video/`](video/). They
could not be used as-is: each began with a black-bar scale-in, each carried a
`Veo` watermark, and clip 2's real content was a 1088px-wide pillarboxed insert.
Each was processed into `public/videos/` as:

1. the first second trimmed off (the scale-in artifact),
2. cropped to real content, watermark painted out (ffmpeg `delogo`),
3. **turned into a seamless loop** — the tail is cross-dissolved back over the
   head, so the background never visibly jumps while a section is being read,
4. encoded twice — 1080p (CRF 24) and 720p (CRF 27) — plus a poster frame.

That took the media from 54MB to 21MB desktop / 4.6MB mobile, and posters mean
the stage is never black while a clip buffers.

---

## Structure

```
src/
  app/            layout (self-hosted fonts, metadata), page, globals.css
  sections/       one file per section of the page
  components/
    cinematic/    the pinned video stage + JourneySection
    layout/       Header, Footer, Preloader
    providers/    Lenis <-> GSAP smooth-scroll wiring
    ui/           Button, MaskedHeading, Reveal, TiltCard, Counter, ...
  animations/     the shared motion language (eases, durations, reveal variants)
  hooks/          useGsapContext, useMousePosition, useMediaQuery
  lib/            content.ts (all copy), videos.ts, utils.ts
```

**Animation.** One motion language, defined in `src/animations/`. Components never
reach for GSAP directly — they use `<Reveal>`, `<MaskedHeading>` or
`useGsapContext`, which scopes every tween to a container and reverts it on
unmount. Reveal from-states are set in CSS (`[data-reveal]`), not JS, so
server-rendered markup is already hidden at first paint and nothing flashes
before hydration.

**Fonts** are self-hosted variable woff2 (Space Grotesk + Inter, latin subset,
~70KB together) via `next/font/local` — no Google Fonts request at build or run
time.

**Reduced motion** is respected throughout: Lenis is not started, clips are not
autoplayed (posters stand in), and reveals resolve instantly.

**Mobile.** Phones get the 720p encodes, and no clip is given a `src` until the
viewport is known — media queries do not resolve during SSR, so a src in the
server HTML would always be the 1080p one and a phone would pay for both encodes.
Backdrop blur is desktop-only (it is expensive on mobile GPUs); mobile card fills
are opaque enough to carry legibility on their own. On Save-Data or a 2G-class
connection the clips are never fetched at all — the posters stand in.

Measured on a 390px viewport: **1.2MB to first paint, 6.0MB to scroll the whole
page.**
