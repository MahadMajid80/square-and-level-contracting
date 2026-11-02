import Link from "next/link";
import { heroImage, getProject } from "@/data/projects";
import { services } from "@/data/services";
import { site } from "@/lib/site";
import { Parallax } from "../animations/Parallax";
import { SplitLines } from "../animations/SplitLines";
import { ButtonLink } from "../ui/ButtonLink";
import { Media } from "../ui/Media";

export function HomeHero() {
  const project = getProject("reeve-residence");
  return (
    <section
      aria-labelledby="hero-title"
      className="bg-ink relative isolate flex min-h-[100svh] flex-col overflow-hidden text-white"
    >
      <div className="absolute inset-0 -z-10">
        <Parallax amount={14} className="absolute inset-x-0 -inset-y-[8%]">
          <Media
            src={heroImage}
            alt={`${project?.title ?? "Custom home"} by ${site.name}`}
            sizes="100vw"
            priority
            quality={78}
            className="hero-media size-full"
          />
        </Parallax>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,19,20,.55)_0%,rgba(18,19,20,.15)_35%,rgba(18,19,20,.35)_60%,rgba(18,19,20,.92)_100%)]" />
        <div className="blueprint absolute inset-0 text-white opacity-60" />
      </div>

      <div className="container-x flex flex-1 flex-col justify-end pt-[calc(var(--header-h)+3rem)] pb-10 md:pb-14">
        <div
          className="mb-8 flex items-center gap-4"
          data-reveal
          style={{ ["--reveal-delay" as string]: 200 }}
        >
          <span className="bg-level h-px w-10" />
          <p className="eyebrow text-white/80">Custom design/build · Salt Spring Island, BC</p>
        </div>

        <h1 id="hero-title">
          <SplitLines
            as="span"
            className="display-xl block"
            delay={250}
            lines={[
              "Built square.",
              <>
                Set <span className="serif-em text-level">level.</span>
              </>,
              "Made to last.",
            ]}
          />
          <span className="sr-only">
            {" "}
            — {site.name}, custom homes, renovations and woodworking on Salt Spring Island
          </span>
        </h1>

        <div className="mt-10 grid items-end gap-8 md:grid-cols-12">
          <p
            className="lede max-w-xl text-white/80 md:col-span-6"
            data-reveal
            style={{ ["--reveal-delay" as string]: 650 }}
          >
            {site.name} designs and builds custom homes, cabins, additions and fine woodwork on Salt
            Spring Island — listening carefully, designing thoughtfully and building with integrity.
          </p>
          <div
            className="flex flex-wrap gap-3 md:col-span-6 md:justify-end"
            data-reveal
            style={{ ["--reveal-delay" as string]: 800 }}
          >
            <ButtonLink href="/portfolio">Explore our work</ButtonLink>
            <ButtonLink href="/contact" variant="ghost-light">
              Start your project
            </ButtonLink>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 border-t border-white/20 pt-5 text-sm text-white/70 md:grid-cols-5">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group flex items-center gap-2 py-1.5 hover:text-white"
            >
              <span className="eyebrow text-level">{s.number}</span>
              <span className="link-draw">{s.title}</span>
            </Link>
          ))}
          <a
            href="#intro"
            className="group hidden items-center justify-end gap-3 md:flex"
            aria-label="Scroll to introduction"
          >
            <span className="eyebrow">Scroll</span>
            <span aria-hidden className="relative h-10 w-px overflow-hidden bg-white/25">
              <span className="bg-level absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_cubic-bezier(.76,0,.24,1)_infinite]" />
            </span>
          </a>
        </div>
      </div>
      <style>{`
        @keyframes scrollcue { 0% { transform: translateY(-100%) } 100% { transform: translateY(200%) } }
        @keyframes heroIn { from { transform: scale(1.14) } to { transform: scale(1) } }
        .hero-media img { animation: heroIn 2.4s cubic-bezier(.16,1,.3,1) both }
      `}</style>
    </section>
  );
}
