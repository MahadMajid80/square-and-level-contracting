"use client";

import { LayoutGroup, motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useState } from "react";
import { projectCategories, projects, type ProjectCategory } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

type Filter = "All" | ProjectCategory;

/** Editorial rhythm: every 5th card is wide, every 7th is tall. Applies on large screens only. */
function span(i: number) {
  if (i % 7 === 0) return "lg:col-span-7";
  if (i % 7 === 1) return "lg:col-span-5 lg:mt-24";
  if (i % 7 === 4) return "lg:col-span-6";
  if (i % 7 === 5) return "lg:col-span-6 lg:mt-16";
  return "lg:col-span-4";
}
function aspect(i: number) {
  if (i % 7 === 0) return "aspect-[4/3]";
  if (i % 7 === 4 || i % 7 === 5) return "aspect-[5/4]";
  return "aspect-[4/5]";
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

  return (
    <div>
      <div className="border-ink/10 bg-paper/90 sticky top-[calc(var(--header-h)-1px)] z-20 -mx-[var(--gutter)] mb-12 border-b px-[var(--gutter)] py-4 backdrop-blur-lg">
        <div
          role="group"
          aria-label="Filter projects by category"
          className="flex [scrollbar-width:none] gap-2 overflow-x-auto"
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
        className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20"
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
              className={filter === "All" ? span(i) : "lg:col-span-4"}
            >
              <ProjectCard
                project={p}
                aspect={filter === "All" ? aspect(i) : "aspect-[4/5]"}
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
