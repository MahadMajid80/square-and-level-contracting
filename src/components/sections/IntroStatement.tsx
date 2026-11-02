import { aboutImage, aboutIntro } from "@/data/content";
import { projects } from "@/data/projects";
import { testimonials } from "@/data/testimonials";
import { site } from "@/lib/site";
import { SplitLines } from "../animations/SplitLines";
import { Parallax } from "../animations/Parallax";
import { ButtonLink } from "../ui/ButtonLink";
import { Media } from "../ui/Media";

export function IntroStatement() {
  return (
    <section
      id="intro"
      aria-labelledby="intro-title"
      className="blueprint on-light text-ink relative py-24 md:py-36"
    >
      <div className="container-x grid gap-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <div className="eyebrow text-graphite mb-8 flex items-center gap-4">
            <span className="text-ink">01</span>
            <span data-reveal-line className="bg-ink/20 h-px w-10" />
            <span>About the company</span>
          </div>
          <SplitLines
            id="intro-title"
            className="display-md"
            lines={[
              "A custom design/build",
              <>
                company <span className="serif-em">inspired by</span>
              </>,
              "the landscape we call home.",
            ]}
          />
          <p className="lede text-graphite mt-10 max-w-2xl" data-reveal>
            {aboutIntro}
          </p>
          <dl
            className="border-ink/15 mt-12 grid max-w-xl grid-cols-3 gap-6 border-t pt-6"
            data-reveal
          >
            {[
              [String(projects.length), "Portfolio collections"],
              ["4", "Core services"],
              [String(testimonials.length), "Client testimonials"],
            ].map(([n, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display leading-none font-semibold tracking-tight text-[var(--step-3)]">
                  {n}
                </dd>
                <dd className="text-graphite mt-2 text-sm">{label}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-12" data-reveal>
            <ButtonLink href="/about" variant="ink">
              About Square &amp; Level
            </ButtonLink>
          </div>
        </div>

        <figure className="relative md:col-span-5 md:pt-24">
          <div className="crop-marks" data-reveal-clip>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Parallax amount={10} className="absolute inset-x-0 -inset-y-[6%]">
                <Media
                  src={aboutImage}
                  alt={`Woodworking by ${site.name}`}
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="size-full"
                />
              </Parallax>
            </div>
          </div>
          <figcaption className="eyebrow text-graphite mt-4 flex justify-between">
            <span>Woodworking</span>
            <span>
              {site.address.locality}, {site.address.region}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
