"use client";

import { useEffect, useRef, useState } from "react";

export const PRELOADER_KEY = "sl-preloaded";
export const PRELOADED_EVENT = "sl:preloaded";

/**
 * Runs before first paint (inlined in <body>). Decides whether this visit gets the preloader:
 * once per browser session, never for reduced-motion visitors. Sets an attribute on <html>
 * so the overlay is hidden by CSS before it is ever drawn when skipped.
 */
export const preloaderBootScript = `(function(){var h=document.documentElement;try{if(sessionStorage.getItem("${PRELOADER_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches){h.setAttribute("data-skip-preloader","")}else{h.setAttribute("data-preloading","")}}catch(e){h.setAttribute("data-skip-preloader","")}})();`;

const WORD = "Square & Level";
const MIN_MS = 1400; // never flash by too quickly
const MAX_MS = 3200; // never hold a visitor longer than this

/**
 * Branded preloader: a spirit-level vial whose bubble wanders and then settles dead centre as the
 * page's fonts and hero photograph load, with a 000→100 counter. On completion the sheet lifts
 * away and the hero's own entrance animation plays.
 *
 * Safety: rendered in the server HTML (no flash of content), hidden by CSS when skipped, and a
 * CSS-only failsafe removes it after 6s if JavaScript never runs.
 */
export function Preloader() {
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = rootRef.current;

    const announceDone = () => {
      html.removeAttribute("data-preloading");
      try {
        sessionStorage.setItem(PRELOADER_KEY, "1");
      } catch {}
      window.dispatchEvent(new Event(PRELOADED_EVENT));
    };

    if (!el || html.hasAttribute("data-skip-preloader")) {
      announceDone();
      // Unmount the hidden overlay after hydration; nothing visible changes.
      setGone(true);
      return;
    }

    // What "loaded" means: web fonts ready and the hero photograph decoded (if the page has one).
    let ready = false;
    const waits: Promise<unknown>[] = [];
    if (document.fonts?.ready) waits.push(document.fonts.ready);
    const hero = document.querySelector<HTMLImageElement>(".hero-media img");
    if (hero && !hero.complete) {
      waits.push(
        new Promise((r) => {
          hero.addEventListener("load", r, { once: true });
          hero.addEventListener("error", r, { once: true });
        }),
      );
    }
    Promise.all(waits).then(() => {
      ready = true;
    });

    const start = performance.now();
    let p = 0;
    let raf = 0;
    let leaveTimer = 0;
    let goneTimer = 0;

    const tick = (now: number) => {
      const t = now - start;
      const goal = ready || t > MAX_MS ? 1 : Math.min(0.88, t / (MIN_MS * 1.3));
      p += (goal - p) * (goal === 1 ? 0.14 : 0.075);
      p = Math.min(p, t / MIN_MS);
      if (goal === 1 && p > 0.985) p = 1;

      // Bubble wanders off-centre and settles as progress approaches 100.
      const drift = 1 - p;
      const x = drift * (38 * Math.sin(t / 210) + 22 * Math.sin(t / 97));
      if (bubbleRef.current)
        bubbleRef.current.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
      if (countRef.current)
        countRef.current.textContent = String(Math.round(p * 100)).padStart(3, "0");
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;

      if (p >= 1) {
        el.classList.add("is-level");
        leaveTimer = window.setTimeout(() => {
          el.classList.add("is-leaving");
          announceDone();
          goneTimer = window.setTimeout(() => setGone(true), 1300);
        }, 380);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(leaveTimer);
      clearTimeout(goneTimer);
    };
  }, []);

  if (gone) return null;

  return (
    <div id="preloader" ref={rootRef} aria-hidden="true" className="pl-root">
      <div className="pl-sheet">
        <div className="blueprint pl-grid" />
        <div className="pl-center">
          <div className="pl-vial">
            <span className="pl-tick pl-tick-l" />
            <span className="pl-tick pl-tick-r" />
            <span ref={bubbleRef} className="pl-bubble" />
          </div>
          <p className="pl-word">
            {WORD.split("").map((c, i) => (
              <span key={i} style={{ animationDelay: `${120 + i * 38}ms` }}>
                {c === " " ? " " : c}
              </span>
            ))}
          </p>
          <p className="pl-sub">Contracting · Salt Spring Island, BC</p>
        </div>
        <div className="pl-foot">
          <span className="pl-label">Setting level</span>
          <span ref={countRef} className="pl-count">
            000
          </span>
        </div>
        <span className="pl-bar">
          <span ref={barRef} />
        </span>
      </div>
    </div>
  );
}
