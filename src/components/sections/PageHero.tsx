import type { ReactNode } from "react";
import { Parallax } from "../animations/Parallax";
import { SplitLines } from "../animations/SplitLines";
import { Breadcrumbs, type Crumb } from "../ui/Breadcrumbs";
import { Media } from "../ui/Media";

/** Inner-page hero. With an image it is full-bleed photographic; without, an ink drafting sheet. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lede,
  image,
  imageAlt = "",
  aside,
  compact = false,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode[];
  lede?: ReactNode;
  image?: string;
  imageAlt?: string;
  aside?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section
      className={`bg-ink relative isolate flex flex-col overflow-hidden text-white ${
        image ? "min-h-[82svh]" : compact ? "min-h-[52svh]" : "min-h-[64svh]"
      }`}
    >
      {image ? (
        <div className="absolute inset-0 -z-10">
          <Parallax amount={12} className="absolute inset-x-0 -inset-y-[7%]">
            <Media
              src={image}
              alt={imageAlt}
              sizes="100vw"
              priority
              quality={76}
              className="hero-media size-full"
            />
          </Parallax>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,19,20,.6)_0%,rgba(18,19,20,.2)_40%,rgba(18,19,20,.9)_100%)]" />
        </div>
      ) : (
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="blueprint absolute inset-0 text-white" />
          <div className="absolute top-1/2 -right-[10%] size-[60vmax] -translate-y-1/2 rounded-full border border-white/[0.06]" />
          <div className="absolute top-1/2 -right-[4%] size-[40vmax] -translate-y-1/2 rounded-full border border-white/[0.06]" />
        </div>
      )}
      <div className="container-x flex flex-1 flex-col justify-end pt-[calc(var(--header-h)+3.5rem)] pb-12 md:pb-16">
        <Breadcrumbs items={crumbs} />
        <div className="mt-10 grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow mb-6 flex items-center gap-4 text-white/75">
              <span className="bg-level h-px w-10" />
              {eyebrow}
            </p>
            <SplitLines as="h1" className="display-lg" lines={title} delay={120} />
          </div>
          {(lede || aside) && (
            <div
              className="md:col-span-4"
              data-reveal
              style={{ ["--reveal-delay" as string]: 450 }}
            >
              {lede && <p className="lede text-white/80">{lede}</p>}
              {aside}
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes heroIn { from { transform: scale(1.12) } to { transform: scale(1) } }
        .hero-media img { animation: heroIn 2.2s cubic-bezier(.16,1,.3,1) both }
      `}</style>
    </section>
  );
}
