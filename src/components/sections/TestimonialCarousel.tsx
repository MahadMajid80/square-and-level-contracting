"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { testimonials } from "@/data/testimonials";
import { getProject } from "@/data/projects";
import { Arrow } from "../ui/Arrow";

/**
 * Manually-advanced testimonial carousel (no autoplay, so nothing moves without the visitor's
 * say-so). Announces the current slide politely to assistive tech. Supports arrow keys and swipe.
 */
export function TestimonialCarousel({ index = "07" }: { index?: string }) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();
  const t = testimonials[i]!;
  const project = t.projectSlug ? getProject(t.projectSlug) : undefined;
  const n = testimonials.length;

  const go = (d: number) => {
    setDir(d);
    setI((v) => (v + d + n) % n);
  };

  return (
    <section
      aria-labelledby="testimonials-title"
      aria-roledescription="carousel"
      className="bg-ink relative overflow-hidden py-24 text-white md:py-36"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="blueprint pointer-events-none absolute inset-0 text-white" />
      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="eyebrow mb-5 flex items-center gap-4 text-white/60">
              <span className="text-level">{index}</span>
              <span className="h-px w-10 bg-white/25" />
              <span>Client words</span>
            </div>
            <h2 id="testimonials-title" className="display-sm">
              What clients say.
            </h2>
          </div>
          <Link
            href="/testimonials"
            className="group inline-flex items-center gap-3 text-white/70 hover:text-white"
          >
            <span className="link-draw">All testimonials</span> <Arrow />
          </Link>
        </div>

        <div className="relative mt-14 min-h-[22rem] md:min-h-[20rem]" aria-live="polite">
          <span
            aria-hidden
            className="serif-em text-level/90 pointer-events-none absolute -top-16 -left-2 text-[12rem] leading-none md:-left-6"
          >
            “
          </span>
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.figure
              key={t.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}`}
              custom={dir}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              drag={reduce ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
              }}
              className="relative max-w-5xl cursor-grab active:cursor-grabbing"
            >
              <blockquote className="font-display text-[clamp(1.3rem,1rem+1.5vw,2.35rem)] leading-[1.3] font-medium tracking-[-0.02em] text-white/95">
                {t.quote}
              </blockquote>
              <figcaption className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="bg-level h-px w-10" />
                <span className="font-semibold">{t.name}</span>
                {project && (
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="eyebrow hover:text-level text-white/55"
                  >
                    {project.title} →
                  </Link>
                )}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center justify-between gap-6 border-t border-white/15 pt-6">
          <p className="eyebrow text-white/60 tabular-nums">
            <span className="text-white">{String(i + 1).padStart(2, "0")}</span> /{" "}
            {String(n).padStart(2, "0")}
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              className="group hover:border-level hover:bg-level hover:text-ink grid size-12 place-items-center rounded-full border border-white/25 transition-colors"
            >
              <Arrow direction="left" />
              <span className="sr-only">Previous testimonial</span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="group hover:border-level hover:bg-level hover:text-ink grid size-12 place-items-center rounded-full border border-white/25 transition-colors"
            >
              <Arrow />
              <span className="sr-only">Next testimonial</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
