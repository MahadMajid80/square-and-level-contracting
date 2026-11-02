"use client";

import { useEffect, useRef, useState } from "react";
import { PRELOADED_EVENT } from "../layout/Preloader";

type Sources = { webm?: string; mp4?: string; mobileMp4?: string };

/**
 * Background video layered over the hero photograph.
 *
 * - Starts loading only after the page (and preloader) is done, so it never competes with the
 *   LCP photo; fades in once it is actually playing.
 * - Skipped entirely for reduced-motion visitors and on Data Saver / 2G–3G connections.
 * - Phones get the lighter mobile file when one exists.
 * - Pauses when scrolled out of view; a visible pause/play control satisfies WCAG 2.2.2.
 */
export function HeroVideo({ sources, label }: { sources: Sources; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState<{ webm?: string; mp4?: string } | null>(null);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const userPaused = useRef(false);

  // Decide whether, and which, video to load.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const conn = (
      navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    if (conn?.saveData || /(^|-)2g|3g/.test(conn?.effectiveType ?? "")) return;

    const isPhone = window.matchMedia("(max-width: 767px)").matches;
    const pick =
      isPhone && sources.mobileMp4
        ? { mp4: sources.mobileMp4 }
        : { webm: sources.webm, mp4: sources.mp4 };
    if (!pick.webm && !pick.mp4) return;

    const start = () => setSrc(pick);
    if (document.documentElement.hasAttribute("data-preloading")) {
      window.addEventListener(PRELOADED_EVENT, start, { once: true });
      return () => window.removeEventListener(PRELOADED_EVENT, start);
    }
    // Let the page settle first so the video never delays anything that matters.
    const id = window.setTimeout(start, 300);
    return () => window.clearTimeout(id);
  }, [sources.webm, sources.mp4, sources.mobileMp4]);

  // Play only while on screen.
  useEffect(() => {
    const v = videoRef.current;
    const wrap = wrapRef.current;
    if (!src || !v || !wrap) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e) return;
        if (e.isIntersecting && !userPaused.current) v.play().catch(() => {});
        else if (!e.isIntersecting) v.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [src]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
      setPaused(false);
    } else {
      userPaused.current = true;
      v.pause();
      setPaused(true);
    }
  };

  if (!src) return null;

  return (
    <>
      <div
        ref={wrapRef}
        aria-hidden
        className={`absolute inset-0 -z-[5] transition-opacity duration-[1.6s] ease-[var(--ease-out-expo)] ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <video
          ref={videoRef}
          className="size-full object-cover"
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          onPlaying={() => setVisible(true)}
          onError={() => setSrc(null)}
        >
          {src.webm && <source src={src.webm} type="video/webm" />}
          {src.mp4 && <source src={src.mp4} type="video/mp4" />}
        </video>
      </div>
      {visible && (
        <button
          type="button"
          onClick={toggle}
          className="bg-ink/40 hover:text-ink absolute top-[calc(var(--header-h)+1rem)] right-[max(var(--gutter),env(safe-area-inset-right,0px))] z-10 grid size-11 place-items-center rounded-full border border-white/30 text-white backdrop-blur transition-colors hover:border-white hover:bg-white"
          aria-pressed={paused}
        >
          <span className="sr-only">
            {paused ? `Play ${label.toLowerCase()}` : `Pause ${label.toLowerCase()}`}
          </span>
          {paused ? (
            <svg aria-hidden viewBox="0 0 16 16" className="size-3.5">
              <path d="M4 2.5v11l9-5.5z" fill="currentColor" />
            </svg>
          ) : (
            <svg aria-hidden viewBox="0 0 16 16" className="size-3.5">
              <path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" fill="currentColor" />
            </svg>
          )}
        </button>
      )}
    </>
  );
}
