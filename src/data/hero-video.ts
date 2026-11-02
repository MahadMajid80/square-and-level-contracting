/**
 * Homepage hero background video.
 *
 * Drop the files into /public/video with these names (or run `npm run video:prepare -- <file>`,
 * which creates all three from one source clip). Any file that is missing is simply skipped; with
 * none present the hero shows the still photograph exactly as before.
 *
 *   hero-woodworking.webm        desktop, VP9  (smallest, preferred by Chrome/Firefox/Edge)
 *   hero-woodworking.mp4         desktop, H.264 (Safari and everything else)
 *   hero-woodworking-mobile.mp4  phones, 960px wide, lighter bitrate
 *
 * The hero photograph stays in place as the poster and the page's LCP image, so the video can
 * never slow down first paint.
 */
export const heroVideo = {
  webm: "/video/hero-woodworking.webm",
  mp4: "/video/hero-woodworking.mp4",
  mobileMp4: "/video/hero-woodworking-mobile.mp4",
  /** Describes the footage for the pause control's label. */
  label: "Background video of woodworking in the shop",
  /**
   * Credit, if the clip is stock footage whose licence asks for one (Mixkit's does not).
   * Leave empty for your own footage.
   */
  credit: "",
} as const;
