import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/data/services";
import { getProject } from "@/data/projects";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ProjectCta } from "@/components/sections/ProjectCta";
import { Media } from "@/components/ui/Media";
import { Arrow } from "@/components/ui/Arrow";
import { Parallax } from "@/components/animations/Parallax";

export const metadata = buildMetadata({
  title: "Services — Design/Build, Project Management, Woodworking & Renovations",
  description:
    "Drafting and design/build, construction project management, custom woodworking, renovations and additions on Salt Spring Island, BC — from Square and Level Contracting.",
  path: "/services",
  image: getProject("reeve-residence")?.cover,
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }]}
        eyebrow="Services"
        title={["Design, plan,", "craft & build."]}
        lede="Four disciplines under one roof, so the people who draw your project are the people who build it."
      />

      <section aria-label="Our services" className="on-light text-ink">
        {services.map((s, i) => {
          const img = getProject(s.heroProject)?.cover;
          const flip = i % 2 === 1;
          return (
            <article
              key={s.slug}
              className="border-ink/10 border-b py-20 md:py-28"
              aria-labelledby={`svc-${s.slug}`}
            >
              <div className="container-x grid items-center gap-12 md:grid-cols-12 md:gap-8">
                <div className={`md:col-span-6 ${flip ? "md:order-2 md:col-start-7" : ""}`}>
                  <div className="crop-marks" data-reveal-clip>
                    <div className="relative aspect-[5/4] overflow-hidden">
                      {img && (
                        <Parallax amount={10} className="absolute inset-x-0 -inset-y-[6%]">
                          <Media
                            src={img}
                            alt={`${s.title} — ${getProject(s.heroProject)?.title}`}
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="size-full"
                          />
                        </Parallax>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={`md:col-span-5 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}
                >
                  <p className="eyebrow text-graphite">
                    <span className="text-ink">{s.number}</span> — Service
                  </p>
                  <h2 id={`svc-${s.slug}`} className="display-sm mt-5" data-reveal>
                    {s.title}
                  </h2>
                  <p className="lede text-graphite mt-6" data-reveal>
                    {s.lede}
                  </p>
                  <ul className="border-ink/15 mt-8 space-y-3 border-t pt-6" data-reveal>
                    {s.points.map((pt) => (
                      <li key={pt.title} className="flex gap-3">
                        <span aria-hidden className="bg-level mt-2.5 size-1.5 shrink-0" />
                        <span>
                          <strong className="font-semibold">{pt.title}.</strong>{" "}
                          <span className="text-graphite">{pt.text}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group mt-10 inline-flex items-center gap-3 font-semibold"
                    data-reveal
                  >
                    <span className="link-draw">More about {s.title.toLowerCase()}</span> <Arrow />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <ProcessTimeline index="—" />
      <ProjectCta />
    </>
  );
}
