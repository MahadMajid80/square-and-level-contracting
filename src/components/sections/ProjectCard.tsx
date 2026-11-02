import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { media } from "@/lib/images";
import { Arrow } from "../ui/Arrow";

export function ProjectCard({
  project,
  sizes,
  aspect = "aspect-[4/5]",
  tone = "light",
  headingLevel = "h3",
}: {
  project: Project;
  sizes: string;
  aspect?: string;
  tone?: "light" | "dark";
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  const muted = tone === "light" ? "text-graphite" : "text-white/55";
  return (
    <Link href={`/portfolio/${project.slug}`} className="group block">
      <div className={`media-fallback relative overflow-hidden ${aspect}`}>
        <Image
          src={media(project.cover)}
          alt={`${project.title} — ${project.category}`}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
        />
        {/* Information overlay slides up on hover (fine pointer); always partly visible on touch */}
        <div className="from-ink/85 via-ink/10 absolute inset-0 flex items-end bg-gradient-to-t to-transparent p-5 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100">
          <div className="flex w-full translate-y-4 items-end justify-between gap-4 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-y-0 [@media(hover:none)]:translate-y-0">
            <span className="eyebrow">{project.images.length} photographs</span>
            <span className="bg-level text-ink grid size-10 shrink-0 place-items-center rounded-full">
              <Arrow direction="up-right" />
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <H className="font-display font-semibold tracking-tight text-[var(--step-1)]">
          <span className="link-draw">{project.title}</span>
        </H>
        <span className={`eyebrow shrink-0 text-[0.62rem] ${muted}`}>{project.category}</span>
      </div>
    </Link>
  );
}
