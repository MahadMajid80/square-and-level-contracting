import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { testimonials } from "@/data/testimonials";
import { getProject } from "@/data/projects";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectCta } from "@/components/sections/ProjectCta";
import { Media } from "@/components/ui/Media";
import { Arrow } from "@/components/ui/Arrow";

export const metadata = buildMetadata({
  title: "Testimonials — What Our Clients Say",
  description:
    "In their own words: clients of Square and Level Contracting on custom homes, cabins, renovations and woodworking on Salt Spring Island, BC.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  const [lead, ...rest] = testimonials;
  const leadProject = lead?.projectSlug ? getProject(lead.projectSlug) : undefined;
  return (
    <>
      <PageHero
        compact
        crumbs={[{ name: "Testimonials", path: "/testimonials" }]}
        eyebrow="Testimonials"
        title={["In our clients’", "own words."]}
        lede={`${testimonials.length} clients on working with Micah and the Square & Level crew.`}
      />

      {lead && (
        <section aria-label="Featured testimonial" className="on-light text-ink py-20 md:py-28">
          <div className="container-x grid items-center gap-12 md:grid-cols-12">
            {leadProject && (
              <div className="crop-marks md:col-span-5" data-reveal-clip>
                <Media
                  src={leadProject.cover}
                  alt={leadProject.title}
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="aspect-[4/5]"
                />
              </div>
            )}
            <figure className="md:col-span-6 md:col-start-7">
              <span aria-hidden className="serif-em text-level block text-[8rem] leading-[0.6]">
                “
              </span>
              <blockquote
                className="font-display mt-4 leading-[1.15] font-medium tracking-[-0.025em] text-[length:var(--step-3)]"
                data-reveal
              >
                {lead.quote}
              </blockquote>
              <figcaption className="mt-8 flex flex-wrap items-center gap-4">
                <span className="bg-ink h-px w-10" />
                <span className="font-semibold">{lead.name}</span>
                {leadProject && (
                  <Link
                    href={`/portfolio/${leadProject.slug}`}
                    className="group eyebrow text-graphite hover:text-ink inline-flex items-center gap-2"
                  >
                    {leadProject.title} <Arrow />
                  </Link>
                )}
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      <section
        aria-label="All testimonials"
        className="on-light bg-paper-2 text-ink py-20 md:py-28"
      >
        <div className="container-x">
          <ul className="columns-1 gap-6 md:columns-2 lg:columns-3">
            {rest.map((t, i) => {
              const proj = t.projectSlug ? getProject(t.projectSlug) : undefined;
              return (
                <li
                  key={t.id}
                  className="mb-6 break-inside-avoid"
                  data-reveal
                  style={{ ["--reveal-delay" as string]: (i % 3) * 90 }}
                >
                  <figure className="group bg-paper relative p-8 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(18,19,20,.35)] md:p-10">
                    <span
                      aria-hidden
                      className="bg-level absolute top-0 left-0 h-[3px] w-12 transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:w-full"
                    />
                    <blockquote className="text-[1.05rem] leading-relaxed">“{t.quote}”</blockquote>
                    <figcaption className="border-ink/10 mt-8 border-t pt-5">
                      <span className="block font-semibold">{t.name}</span>
                      {proj && (
                        <Link
                          href={`/portfolio/${proj.slug}`}
                          className="group/l eyebrow text-graphite hover:text-ink mt-2 inline-flex items-center gap-2"
                        >
                          {proj.title} <Arrow />
                        </Link>
                      )}
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <ProjectCta heading={["Become our", "next story."]} imageProject="gregory-residence" />
    </>
  );
}
