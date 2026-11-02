"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll progress drawn as a spirit level: the bubble travels the vial as the page scrolls,
 * settling dead centre at the halfway point. A small nod to the company name.
 */
export function LevelProgress({ className = "" }: { className?: string }) {
  const bubble = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (bubble.current) bubble.current.style.transform = `translate3d(${p * 100}%,0,0)`;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <span
        aria-hidden
        className={`relative hidden h-[10px] w-16 rounded-full border border-current/40 md:block ${className}`}
      >
        <span className="absolute inset-y-0 left-1/2 w-px bg-current/40" />
        <span className="absolute inset-y-[1.5px] right-[13.5px] left-[1.5px]">
          <span ref={bubble} className="block h-full w-full will-change-transform">
            <span className="bg-level block h-[5px] w-[10px] rounded-full shadow-[0_0_6px_rgba(254,192,16,.6)]" />
          </span>
        </span>
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden"
      >
        <span
          ref={bar}
          className="bg-level block h-full w-full origin-left scale-x-0 will-change-transform"
        />
      </span>
    </>
  );
}
