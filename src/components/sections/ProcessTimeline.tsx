"use client";

import { useEffect, useRef } from "react";
import { processSteps } from "@/data/content";

/**
 * Five-stage process. A vertical rule draws itself as you scroll through the steps, with each
 * step's marker filling in as the line passes it. Plain list without JS.
 */
export function ProcessTimeline({ index = "05" }: { index?: string }) {
  const listRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const line = lineRef.current;
    if (!list || !line) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      line.style.transform = "scaleY(1)";
      list.querySelectorAll("[data-step]").forEach((el) => el.classList.add("is-active"));
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = list.getBoundingClientRect();
      const mid = window.innerHeight * 0.6;
      const p = Math.min(1, Math.max(0, (mid - r.top) / r.height));
      line.style.transform = `scaleY(${p})`;
      list.querySelectorAll<HTMLElement>("[data-step]").forEach((el) => {
        el.classList.toggle("is-active", el.getBoundingClientRect().top < mid);
      });
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
    <section aria-labelledby="process-title" className="on-light text-ink relative py-24 md:py-36">
      <div className="container-x grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-[calc(var(--header-h)+3rem)]">
            <div className="eyebrow text-graphite mb-6 flex items-center gap-4">
              <span className="text-ink">{index}</span>
              <span className="bg-ink/20 h-px w-10" />
              <span>How we work</span>
            </div>
            <h2 id="process-title" className="display-md" data-reveal>
              From first <span className="serif-em">conversation</span> to final detail.
            </h2>
            <p className="text-graphite mt-8 max-w-md" data-reveal>
              One team carries your project from the drawing board to the finished build. Every
              stage is planned, priced and communicated before it happens.
            </p>
          </div>
        </div>

        <ol ref={listRef} className="relative md:col-span-6 md:col-start-7">
          <span aria-hidden className="bg-ink/12 absolute top-6 bottom-6 left-[11px] w-px" />
          <span
            ref={lineRef}
            aria-hidden
            className="bg-ink absolute top-6 bottom-6 left-[11px] w-px origin-top scale-y-0 will-change-transform"
          />
          {processSteps.map((s) => (
            <li
              key={s.n}
              data-step
              className="group relative grid grid-cols-[24px_1fr] gap-6 pb-14 last:pb-0"
            >
              <span
                aria-hidden
                className="border-ink/25 bg-paper group-[.is-active]:border-ink group-[.is-active]:bg-level relative z-10 mt-1.5 grid size-6 place-items-center rounded-full border transition-colors duration-500"
              >
                <span className="bg-ink/30 group-[.is-active]:bg-ink size-1.5 rounded-full" />
              </span>
              <div>
                <p className="eyebrow text-graphite">Stage {s.n}</p>
                <h3 className="font-display mt-2 font-semibold tracking-[-0.03em] text-[length:var(--step-3)]">
                  {s.title}
                </h3>
                <p className="text-graphite mt-3 max-w-md">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
