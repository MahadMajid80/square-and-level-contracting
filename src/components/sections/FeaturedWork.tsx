"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { featuredSlugs, getProject, projects, type Project } from "@/data/projects";
import { media } from "@/lib/images";
import { Arrow } from "../ui/Arrow";
import { ButtonLink } from "../ui/ButtonLink";

const featured = featuredSlugs.map((s) => getProject(s)).filter(Boolean) as Project[];

/**
 * Selected work. Desktop (≥1024px, fine pointer, motion allowed): the section pins and the row of
 * projects travels horizontally with scroll via GSAP ScrollTrigger. Everywhere else: a native,
 * swipeable scroll-snap row. All project links are plain anchors in the server HTML.
 */
export function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const mq = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!mq.matches) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const distance = () => track.scrollWidth - track.clientWidth;
        track.style.overflow = "visible";
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current)
                progressRef.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
        gsap.utils.toArray<HTMLElement>("[data-card-img]", track).forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${distance()}`,
                scrub: true,
              },
            },
          );
        });
      }, section);
    })();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    // Stable wrapper owned by React: GSAP inserts its pin-spacer inside it, so unmounting on
    // client-side navigation never asks React to remove a node GSAP has moved.
    <div>
      <section
        ref={sectionRef}
        aria-labelledby="work-title"
        className="bg-ink relative overflow-hidden py-20 text-white lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:pt-[calc(var(--header-h)+1rem)] lg:pb-8"
      >
        <div className="container-x flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="eyebrow mb-5 flex items-center gap-4 text-white/60">
              <span className="text-level">03</span>
              <span data-reveal-line className="h-px w-10 bg-white/25" />
              <span>Selected work</span>
            </div>
            <h2 id="work-title" className="display-md" data-reveal>
              Homes, cabins <span className="serif-em text-level">&amp;</span> craft.
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <span aria-hidden className="relative hidden h-px w-40 bg-white/20 lg:block">
              <span ref={progressRef} className="bg-level absolute inset-0 origin-left scale-x-0" />
            </span>
            <ButtonLink href="/portfolio" variant="ghost-light">
              View all work
            </ButtonLink>
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-12 flex snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto px-[var(--gutter)] pb-4 lg:mt-14 lg:gap-8 lg:pb-0"
        >
          {featured.map((p, i) => (
            <Link
              key={p.slug}
              href={`/portfolio/${p.slug}`}
              className="group relative w-[82vw] shrink-0 snap-start sm:w-[58vw] lg:w-auto"
            >
              <div className="relative aspect-[4/5] overflow-hidden lg:aspect-[5/6] lg:h-[min(54svh,600px)]">
                <div data-card-img className="absolute -inset-x-[10%] inset-y-0">
                  <div className="media-fallback relative size-full">
                    <Image
                      src={media(p.cover)}
                      alt={`${p.title} — ${p.category}`}
                      fill
                      sizes="(min-width: 1024px) 38vw, (min-width: 640px) 58vw, 82vw"
                      className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                    />
                  </div>
                </div>
                <div className="from-ink/80 absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="eyebrow bg-ink/60 absolute top-5 left-5 rounded-full px-3 py-1.5 text-white/85 backdrop-blur">
                  {String(i + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
                </span>
                <span className="bg-level text-ink absolute top-5 right-5 grid size-11 place-items-center rounded-full opacity-0 transition-all duration-500 group-hover:opacity-100 max-lg:opacity-100">
                  <Arrow direction="up-right" />
                </span>
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="font-display text-[length:var(--step-2)] font-semibold tracking-tight">
                  {p.title}
                </h3>
                <span className="eyebrow shrink-0 text-white/50">{p.category}</span>
              </div>
              <p className="mt-2 max-w-md text-[0.95rem] text-white/60 lg:max-w-[min(45svh,500px)]">
                {p.summary}
              </p>
            </Link>
          ))}
          <Link
            href="/portfolio"
            className="group flex w-[60vw] shrink-0 snap-start flex-col justify-center border border-white/15 p-8 sm:w-[40vw] lg:w-[min(26vw,380px)]"
          >
            <span className="eyebrow text-level">The full portfolio</span>
            <span className="font-display mt-4 text-[length:var(--step-3)] leading-none font-semibold tracking-tight">
              {projects.length} collections
            </span>
            <span className="mt-6 inline-flex items-center gap-3 text-white/70 group-hover:text-white">
              Explore <Arrow />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
