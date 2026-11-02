import { buildMetadata } from "@/lib/seo";
import { aboutImage, aboutIntro, principles } from "@/data/content";
import { getProject } from "@/data/projects";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ProjectCta } from "@/components/sections/ProjectCta";
import { Media } from "@/components/ui/Media";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SplitLines } from "@/components/animations/SplitLines";
import { Parallax } from "@/components/animations/Parallax";

export const metadata = buildMetadata({
  title: "About — Custom Design/Build on Salt Spring Island",
  description:
    "Square and Level Contracting is a custom design/build company on Salt Spring Island, BC, led by Micah Booy. We listen carefully, design thoughtfully and build with integrity.",
  path: "/about",
  image: aboutImage,
});

export default function AboutPage() {
  const early = getProject("early-projects-1994-2001");
  const shop = getProject("square-level-shop");
  return (
    <>
      <PageHero
        crumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About Square & Level"
        title={["Listen carefully.", "Design thoughtfully.", "Build with integrity."]}
        image={aboutImage}
        imageAlt={`Woodworking by ${site.name}`}
      />

      <section aria-labelledby="who" className="blueprint on-light text-ink py-24 md:py-36">
        <div className="container-x grid gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="eyebrow text-graphite mb-6">Who we are</p>
            <SplitLines
              id="who"
              className="display-md"
              lines={[
                "Inspired by",
                <>
                  the <span className="serif-em">landscape</span>
                </>,
                "we call home.",
              ]}
            />
          </div>
          <div className="space-y-6 md:col-span-5 md:pt-24">
            <p className="lede" data-reveal>
              {aboutIntro}
            </p>
            <p className="text-graphite" data-reveal>
              {site.name} is a custom design/build company on {site.address.locality}, British
              Columbia. Clients know the company through {site.contactPerson} — the builder they
              describe as skilled, honest and dependable, with a keen eye for detail and the
              patience to work through problems with them.
            </p>
            <p className="text-graphite" data-reveal>
              The work spans drafting and design, project management, custom woodworking, and
              renovations and additions: custom homes and cabins, interiors given new warmth through
              woodwork, and building in places — like an island with no power or vehicle access —
              where planning matters as much as carpentry.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="values" className="bg-ink py-24 text-white md:py-36">
        <div className="container-x">
          <h2 id="values" className="display-md max-w-[16ch]" data-reveal>
            Square and level are the <span className="serif-em text-level">foundations</span> of
            quality.
          </h2>
          <ol className="mt-16 grid gap-px overflow-hidden bg-white/12 md:grid-cols-3">
            {principles.map((p, i) => (
              <li
                key={p.word}
                className="bg-ink p-8 md:p-10"
                data-reveal
                style={{ ["--reveal-delay" as string]: i * 100 }}
              >
                <span className="eyebrow text-level">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display mt-10 font-semibold tracking-tight text-[var(--step-3)]">
                  {p.word}
                </h3>
                <p className="mt-4 text-white/65">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {early && shop && (
        <section aria-labelledby="roots" className="on-light text-ink py-24 md:py-36">
          <div className="container-x grid items-center gap-12 md:grid-cols-12">
            <div className="grid grid-cols-2 gap-4 md:col-span-7">
              <div className="crop-marks" data-reveal-clip>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Parallax amount={10} className="absolute inset-x-0 -inset-y-[6%]">
                    <Media
                      src={early.cover}
                      alt={early.title}
                      sizes="(min-width: 768px) 30vw, 50vw"
                      className="size-full"
                    />
                  </Parallax>
                </div>
              </div>
              <div className="mt-16" data-reveal-clip>
                <Media
                  src={shop.cover}
                  alt={shop.title}
                  sizes="(min-width: 768px) 30vw, 50vw"
                  className="aspect-[3/4]"
                />
              </div>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <p className="eyebrow text-graphite">Roots &amp; workshop</p>
              <h2 id="roots" className="display-sm mt-5" data-reveal>
                Skills built over decades.
              </h2>
              <p className="text-graphite mt-6" data-reveal>
                The portfolio reaches back to projects from 1994–2001 — residential, woodworking and
                structural work that set the habits the company still works by: careful planning,
                sound materials and attention to detail. Today much of the finer work comes out of
                the Square + Level shop.
              </p>
              <div className="mt-8 flex flex-wrap gap-3" data-reveal>
                <ButtonLink href={`/portfolio/${early.slug}`} variant="ink">
                  Early projects
                </ButtonLink>
                <ButtonLink href={`/portfolio/${shop.slug}`} variant="ghost-dark">
                  The shop
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      )}

      <ProcessTimeline index="—" />
      <WhyChooseUs index="—" />
      <ProjectCta />
    </>
  );
}
