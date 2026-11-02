import type { ReactNode } from "react";
import { SplitLines } from "../animations/SplitLines";

/** Numbered section header: index + eyebrow on a ruled line, then a split-line headline. */
export function SectionHeading({
  index,
  eyebrow,
  lines,
  as = "h2",
  tone = "dark",
  className = "",
  id,
}: {
  index?: string;
  eyebrow: string;
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3";
  tone?: "dark" | "light";
  className?: string;
  id?: string;
}) {
  const muted = tone === "dark" ? "text-graphite" : "text-white/60";
  const rule = tone === "dark" ? "bg-ink/20" : "bg-white/20";
  return (
    <div className={className}>
      <div className={`eyebrow mb-6 flex items-center gap-4 ${muted}`}>
        {index && <span className={tone === "dark" ? "text-ink" : "text-level"}>{index}</span>}
        <span data-reveal-line className={`h-px w-10 ${rule}`} />
        <span>{eyebrow}</span>
      </div>
      <SplitLines as={as} id={id} lines={lines} className="display-md" />
    </div>
  );
}
