"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { media } from "@/lib/images";

/** Rhythm for the editorial grid: a full-width frame, then pairs and triples. */
function cell(i: number) {
  const m = i % 6;
  if (m === 0) return "col-span-2 lg:col-span-6 aspect-[16/9]";
  if (m === 1 || m === 2) return "col-span-1 lg:col-span-3 aspect-[4/5]";
  return "col-span-1 lg:col-span-2 aspect-square";
}

export function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const n = images.length;

  const close = useCallback(() => {
    setOpen((cur) => {
      if (cur !== null) requestAnimationFrame(() => triggerRefs.current[cur]?.focus());
      return null;
    });
  }, []);
  const step = useCallback(
    (d: number) => {
      setDir(d);
      setOpen((cur) => (cur === null ? cur : (cur + d + n) % n));
    },
    [n],
  );

  useEffect(() => {
    if (open === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab") {
        const els = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button") ?? []);
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
    // Only re-run when the dialog opens/closes, not on every slide change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open === null, close, step]);

  // Preload neighbours for instant stepping.
  const neighbours = open === null ? [] : [(open + 1) % n, (open - 1 + n) % n];

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-6">
        {images.map((src, i) => (
          <li
            key={src}
            className={`relative ${cell(i)}`}
            data-reveal
            style={{ ["--reveal-delay" as string]: (i % 3) * 70 }}
          >
            <button
              ref={(el) => {
                triggerRefs.current[i] = el;
              }}
              type="button"
              onClick={() => {
                setDir(1);
                setOpen(i);
              }}
              className="group media-fallback absolute inset-0 block overflow-hidden"
            >
              <Image
                src={media(src)}
                alt={`${title} — photograph ${i + 1} of ${n}`}
                fill
                sizes={
                  i % 6 === 0 ? "(min-width: 1024px) 90vw, 100vw" : "(min-width: 1024px) 40vw, 50vw"
                }
                className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
              />
              <span className="bg-ink/0 group-hover:bg-ink/20 absolute inset-0 transition-colors duration-500" />
              <span className="eyebrow bg-ink/70 absolute bottom-3 left-3 rounded-full px-2.5 py-1 text-[0.6rem] text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                View {String(i + 1).padStart(2, "0")}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} gallery, photograph ${open + 1} of ${n}`}
            className="bg-ink/[0.97] fixed inset-0 z-[80] flex flex-col text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="container-x flex h-16 shrink-0 items-center justify-between">
              <p className="eyebrow text-white/70 tabular-nums">
                <span className="text-level">{String(open + 1).padStart(2, "0")}</span> /{" "}
                {String(n).padStart(2, "0")} · {title}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="hover:text-ink grid size-11 place-items-center rounded-full border border-white/25 hover:bg-white"
              >
                <span className="sr-only">Close gallery</span>
                <svg aria-hidden viewBox="0 0 16 16" className="size-4">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>

            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.div
                  key={open}
                  custom={dir}
                  className="absolute inset-0 px-3 pb-3 md:px-20"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -80 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  drag={reduce ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -70) step(1);
                    else if (info.offset.x > 70) step(-1);
                  }}
                >
                  <div className="relative size-full">
                    <Image
                      src={media(images[open]!)}
                      alt={`${title} — photograph ${open + 1} of ${n}`}
                      fill
                      sizes="100vw"
                      quality={82}
                      className="object-contain"
                      draggable={false}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
              <button
                type="button"
                onClick={() => step(-1)}
                className="group bg-ink/60 hover:bg-level hover:text-ink absolute top-1/2 left-3 grid size-12 -translate-y-1/2 place-items-center rounded-full backdrop-blur md:left-6"
              >
                <span className="sr-only">Previous photograph</span>
                <svg aria-hidden viewBox="0 0 16 16" className="size-4 rotate-180">
                  <path
                    d="M1 8h13M9 3l5 5-5 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="group bg-ink/60 hover:bg-level hover:text-ink absolute top-1/2 right-3 grid size-12 -translate-y-1/2 place-items-center rounded-full backdrop-blur md:right-6"
              >
                <span className="sr-only">Next photograph</span>
                <svg aria-hidden viewBox="0 0 16 16" className="size-4">
                  <path
                    d="M1 8h13M9 3l5 5-5 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>
            <div aria-hidden className="hidden">
              {neighbours.map((k) => (
                <Image
                  key={k}
                  src={media(images[k]!)}
                  alt=""
                  width={16}
                  height={16}
                  sizes="100vw"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
