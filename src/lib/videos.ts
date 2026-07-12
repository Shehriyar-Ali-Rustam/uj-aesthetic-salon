/**
 * The five walkthrough clips, in the order the visitor "walks" the clinic.
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
