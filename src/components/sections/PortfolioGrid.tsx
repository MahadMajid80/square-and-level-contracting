"use client";

import { LayoutGroup, motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useState } from "react";
import { projectCategories, projects, type ProjectCategory } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

type Filter = "All" | ProjectCategory;

/**
 * Gap-free editorial grid (large screens). Projects are laid out in rows that always fill all
 * 12 columns, and every card in a row shares one image height so titles line up:
 *   cycle of 5 → [wide 7 | 5]  then  [4 | 4 | 4]   (the wide card alternates sides each cycle)
 * Leftovers: 1 → full width, 2 → [7 | 5], 3 → [4 | 4 | 4], 4 → [6 | 6] [6 | 6].
 * Phones and tablets use a plain 1–2 column grid with uniform 4:5 images.
 */
type Cell = { span: string; height: string };
const H_PAIR = "lg:h-[min(36vw,560px)]";
const H_TRIO = "lg:h-[min(30vw,470px)]";
const H_SOLO = "lg:h-[min(44vw,640px)]";

function buildLayout(n: number): Cell[] {
  const cells: Cell[] = [];
  const pair = (flip: boolean) =>
    (flip ? ["lg:col-span-5", "lg:col-span-7"] : ["lg:col-span-7", "lg:col-span-5"]).forEach(
      (span) => cells.push({ span, height: H_PAIR }),
    );
  const trio = () => {
    for (let k = 0; k < 3; k++) cells.push({ span: "lg:col-span-4", height: H_TRIO });
  };
  let i = 0;
  let cycle = 0;
  while (n - i >= 5) {
    pair(cycle % 2 === 1);
    trio();
    i += 5;
    cycle++;
  }
  const r = n - i;
  if (r === 1) cells.push({ span: "lg:col-span-12", height: H_SOLO });
  if (r === 2) pair(cycle % 2 === 1);
  if (r === 3) trio();
  if (r === 4) for (let k = 0; k < 4; k++) cells.push({ span: "lg:col-span-6", height: H_PAIR });
  return cells;
}

/**
 * Filterable portfolio. Every project link is in the server-rendered HTML (the default view is
 * "All"), so filtering never hides pages from search engines.
 */
export function PortfolioGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const reduce = useReducedMotion();
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const filters: Filter[] = ["All", ...projectCategories];
  const layout = buildLayout(visible.length);

  return (
    <div>
      <div className="border-ink/10 bg-paper/90 sticky top-[calc(var(--header-h)-1px)] z-20 -mx-[var(--gutter)] mb-12 border-b px-[var(--gutter)] py-4 backdrop-blur-lg">
        <div
          role="group"
          aria-label="Filter projects by category"
          // Padding stops the scroll container from clipping the buttons' focus outlines.
          className="-m-1 flex [scrollbar-width:none] gap-2 overflow-x-auto p-1"
        >
          <LayoutGroup id="filters">
            {filters.map((f) => {
              const count =
                f === "All" ? projects.length : projects.filter((p) => p.category === f).length;
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f)}
                  className={`relative min-h-11 shrink-0 rounded-full px-5 text-[0.9rem] font-semibold transition-colors ${
                    active ? "text-paper" : "text-ink hover:bg-ink/5"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="bg-ink absolute inset-0 -z-0 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">
                    {f}{" "}
                    <span
                      className={`ml-1 tabular-nums ${active ? "text-level" : "text-graphite"}`}
                    >
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </LayoutGroup>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        {filter === "All" ? "" : ` in ${filter}`}
      </p>

      <motion.ul
        layout={!reduce}
        className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-16"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p, i) => (
            <motion.li
              key={p.slug}
              layout={!reduce}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={layout[i]?.span}
            >
              <ProjectCard
                project={p}
                aspect={`aspect-[4/5] lg:aspect-auto ${layout[i]?.height ?? ""}`}
                sizes="(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw"
                headingLevel="h2"
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
