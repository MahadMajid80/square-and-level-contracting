"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { PRELOADED_EVENT } from "../layout/Preloader";

const SELECTOR = "[data-reveal],[data-reveal-clip],[data-reveal-line],[data-split]";

/**
 * Progressive-enhancement reveal system. Content renders fully visible on the server; once this
 * mounts it opts the document into the hidden-until-in-view state and observes elements.
 * Elements already in the viewport are revealed on the next frame, so nothing is ever stuck hidden.
 */
export function RevealRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    root.setAttribute("data-reveal-ready", "");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const observeAll = () =>
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (!el.classList.contains("is-in")) io.observe(el);
      });

    // While the preloader is up, keep everything in its hidden start state (under the sheet) and
    // begin revealing the moment the sheet starts to lift, so the hero entrance plays on cue.
    let waiting = false;
    const begin = () => requestAnimationFrame(observeAll);
    if (root.hasAttribute("data-preloading")) {
      waiting = true;
      window.addEventListener(PRELOADED_EVENT, begin, { once: true });
    } else {
      begin();
    }

    // Catch elements added later (filtered grids, client-only sections).
    const mo = new MutationObserver(() => {
      if (!root.hasAttribute("data-preloading")) observeAll();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (waiting) window.removeEventListener(PRELOADED_EVENT, begin);
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
