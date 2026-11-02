"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { services } from "@/data/services";
import { getProject } from "@/data/projects";
import { media } from "@/lib/images";
import { Arrow } from "../ui/Arrow";

const items = services.map((s) => ({ ...s, cover: getProject(s.heroProject)?.cover ?? "" }));

/**
 * Editorial index of the four services. On fine-pointer screens, a framed photograph follows the
 * cursor and cross-fades between services. On touch screens each row shows its own image.
 */
export function ServicesIndex() {
  const listRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const set = () => setEnabled(mq.matches && !reduce);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const list = listRef.current;
    const float = floatRef.current;
    if (!list || !float) return;
    let tx = 0,
      ty = 0,
      x = 0,
      y = 0,
      frame = 0;
    const loop = () => {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      float.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${(tx - x) * 0.02}deg)`;
      frame = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      const r = list.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
    };
    list.addEventListener("pointermove", move);
    frame = requestAnimationFrame(loop);
    return () => {
      list.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return (
    <section
      aria-labelledby="services-title"
      className="on-light bg-paper-2 text-ink py-24 md:py-36"
    >
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <div className="eyebrow text-graphite mb-6 flex items-center gap-4">
              <span className="text-ink">02</span>
              <span data-reveal-line className="bg-ink/20 h-px w-10" />
              <span>What we do</span>
            </div>
            <h2 id="services-title" className="display-md" data-reveal>
              Four disciplines, <span className="serif-em">one team.</span>
            </h2>
          </div>
          <p className="text-graphite md:col-span-4 md:col-start-9" data-reveal>
            Design, planning, craft and construction under one roof — so what is drawn is what gets
            built.
          </p>
        </div>

        <div ref={listRef} className="relative mt-16" onPointerLeave={() => setActive(null)}>
          <ul className="border-ink/15 border-t">
            {items.map((s, i) => (
              <li
                key={s.slug}
                className="border-ink/15 border-b"
                data-reveal
                style={{ ["--reveal-delay" as string]: i * 80 }}
              >
                <Link
                  href={`/services/${s.slug}`}
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-4 py-7 md:grid-cols-12 md:gap-8 md:py-10"
                >
                  <span className="eyebrow text-graphite md:col-span-1">{s.number}</span>
                  <span className="font-display leading-none font-semibold tracking-[-0.035em] text-[var(--step-3)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3 md:col-span-6">
                    {s.title}
                  </span>
                  <span className="text-graphite col-span-3 row-start-2 text-[0.95rem] md:col-span-4 md:row-start-auto">
                    {s.lede}
                  </span>
                  <span className="border-ink/20 group-hover:border-level group-hover:bg-level col-start-3 row-start-1 grid size-12 place-items-center rounded-full border transition-colors duration-300 md:col-span-1 md:col-start-auto md:row-start-auto md:justify-self-end">
                    <Arrow />
                  </span>
                  {!enabled && s.cover && (
                    <span className="relative col-span-3 block aspect-[16/9] overflow-hidden md:hidden">
                      <Image
                        src={media(s.cover)}
                        alt=""
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {enabled && (
            <div
              ref={floatRef}
              aria-hidden
              className={`pointer-events-none absolute top-0 left-0 z-10 aspect-[4/5] w-[min(22vw,320px)] transition-[opacity,scale] duration-500 ease-[var(--ease-out-expo)] ${
                active === null ? "scale-75 opacity-0" : "scale-100 opacity-100"
              }`}
            >
              <div className="crop-marks size-full">
                {items.map((s, i) => (
                  <div
                    key={s.slug}
                    className={`media-fallback absolute inset-0 overflow-hidden transition-[opacity,clip-path] duration-700 ease-[var(--ease-in-out-quart)] ${
                      active === i
                        ? "opacity-100 [clip-path:inset(0)]"
                        : "opacity-0 [clip-path:inset(0_0_100%_0)]"
                    }`}
                  >
                    {s.cover && (
                      <Image
                        src={media(s.cover)}
                        alt=""
                        fill
                        sizes="320px"
                        className="object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
