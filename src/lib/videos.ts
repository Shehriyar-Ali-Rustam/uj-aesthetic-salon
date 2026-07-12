/**
 * The five walkthrough clips.
 *
 * Each source has been pre-processed into a seamless 6s loop (see README), so
 * the background never visibly jumps while a section is being read.
 */
export type ClipId = 1 | 2 | 3 | 4 | 5;

export interface Clip {
  id: ClipId;
  /** Desktop / 1080p source. */
  src: string;
  /** Lighter 720p source, served to narrow viewports. */
  mobileSrc: string;
  /** First frame — paints instantly while the video buffers. */
  poster: string;
  /** Described for screen readers; the video itself is decorative. */
  alt: string;
}

export const CLIPS: Clip[] = [1, 2, 3, 4, 5].map((n) => ({
  id: n as ClipId,
  src: `/videos/video${n}.mp4`,
  mobileSrc: `/videos/video${n}-mobile.mp4`,
  poster: `/posters/video${n}.jpg`,
  alt: [
    "Walking into the reception of Uj's Aesthetics.",
    "Passing the softly lit treatment corridor.",
    "The arched consultation and styling suite.",
    "The product gallery beneath the clinic's gold signage.",
    "The lounge and product display at the heart of the clinic.",
  ][n - 1],
}));

/**
 * Which clip plays behind each section, in page order.
 *
 * There are eight sections and five clips, so the walk is a round trip: you
 * come in through the reception, go deeper into the clinic, and then turn back
 * — ending at the reception again for the booking section, which is exactly
 * where a visitor would be standing when they ask for an appointment.
 *
 * Reusing a clip costs nothing: the file is already in the browser cache, and
 * only the layers that can actually be seen are ever decoding.
 */
export const SECTION_CLIPS: Clip[] = [
  CLIPS[0], // Hero          — reception
  CLIPS[1], // About         — corridor
  CLIPS[2], // Philosophy    — arched suite
  CLIPS[3], // Treatments    — product gallery
  CLIPS[4], // Technology    — lounge
  CLIPS[2], // Experts       — back through the suite
  CLIPS[1], // Testimonials  — back down the corridor
  CLIPS[0], // Contact       — back at reception
];
