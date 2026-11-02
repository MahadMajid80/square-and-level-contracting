import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata, projectJsonLd } from "@/lib/seo";
import { getAdjacentProjects, getProject, getRelatedProjects, projects } from "@/data/projects";
import { getService } from "@/data/services";
import { getTestimonial } from "@/data/testimonials";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ProjectCta } from "@/components/sections/ProjectCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { Arrow } from "@/components/ui/Arrow";
import { Media } from "@/components/ui/Media";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return buildMetadata({
    title: p.category === p.title ? `${p.title} — Portfolio` : `${p.title} — ${p.category}`,
    description: `${p.summary} ${p.title} by ${site.name}, Salt Spring Island, BC — ${p.images.length} photographs.`,
    path: `/portfolio/${p.slug}`,
    image: p.cover,
    imageAlt: p.title,
  });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const { prev, next } = getAdjacentProjects(p.slug);
  const related = getRelatedProjects(p);
  const testimonial = getTestimonial(p.testimonialId);
  const relatedServices = p.services.map(getService).filter(Boolean);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Portfolio", path: "/portfolio" },
          { name: p.title, path: `/portfolio/${p.slug}` },
        ]}
        eyebrow={p.category}
        title={[p.title]}
        image={p.cover}
        imageAlt={`${p.title} by ${site.name}`}
        lede={p.summary}
      />

      <section className="on-light text-ink py-20 md:py-28" aria-labelledby="about-project">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <dl className="border-ink/15 grid h-fit grid-cols-2 gap-6 border-t pt-6 text-sm md:col-span-4 md:grid-cols-1">
            <div>
              <dt className="eyebrow text-graphite">Category</dt>
              <dd className="mt-2 font-semibold">{p.category}</dd>
            </div>
            <div>
              <dt className="eyebrow text-graphite">Photographs</dt>
              <dd className="mt-2 font-semibold tabular-nums">{p.images.length}</dd>
            </div>
            {relatedServices.length > 0 && (
              <div className="col-span-2 md:col-span-1">
                <dt className="eyebrow text-graphite">Related services</dt>
                <dd className="mt-2">
                  <ul className="space-y-1.5">
                    {relatedServices.map((s) => (
                      <li key={s!.slug}>
                        <Link
                          href={`/services/${s!.slug}`}
                          className="group inline-flex items-center gap-2 font-semibold"
                        >
                          <span className="link-draw">{s!.title}</span>{" "}
                          <Arrow className="text-xs" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>
          <div className="md:col-span-7 md:col-start-6">
            <h2 id="about-project" className="eyebrow text-graphite mb-6">
              About the project
            </h2>
            <div className="space-y-6">
              {p.description.map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "font-display leading-snug font-medium tracking-tight text-[var(--step-2)]"
                      : "text-graphite"
                  }
                  data-reveal
                >
                  {para}
                </p>
              ))}
            </div>
            {testimonial && (
              <figure className="border-level mt-12 border-l-2 pl-6" data-reveal>
                <blockquote className="leading-relaxed text-[var(--step-1)]">
                  “{testimonial.quote.replace(/^“|”$/g, "")}”
                </blockquote>
                <figcaption className="eyebrow text-graphite mt-4">— {testimonial.name}</figcaption>
              </figure>
            )}
          </div>
        </div>
      </section>

      <section aria-label={`${p.title} photographs`} className="on-light text-ink pb-24 md:pb-32">
        <div className="container-x">
          <ProjectGallery images={p.images} title={p.title} />
        </div>
      </section>

      <nav aria-label="More projects" className="bg-ink grid text-white md:grid-cols-2">
        {[
          {
            label: "Previous project",
            proj: prev,
            align: "items-start text-left",
            dir: "left" as const,
          },
          {
            label: "Next project",
            proj: next,
            align: "items-end text-right",
            dir: "right" as const,
          },
        ].map(({ label, proj, align, dir }) => (
          <Link
            key={label}
            href={`/portfolio/${proj.slug}`}
            className={`group relative isolate flex min-h-64 flex-col justify-end overflow-hidden p-8 md:min-h-80 md:p-12 ${align}`}
          >
            <div className="absolute inset-0 -z-10 opacity-35 transition-opacity duration-700 group-hover:opacity-60">
              <Media
                src={proj.cover}
                alt=""
                sizes="50vw"
                className="size-full"
                imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105"
              />
            </div>
            <div className="from-ink via-ink/50 absolute inset-0 -z-10 bg-gradient-to-t to-transparent" />
            <span className="eyebrow text-level inline-flex items-center gap-3">
              {dir === "left" && <Arrow direction="left" />} {label} {dir === "right" && <Arrow />}
            </span>
            <span className="font-display mt-3 leading-none font-semibold tracking-tight text-[var(--step-3)]">
              {proj.title}
            </span>
          </Link>
        ))}
      </nav>

      <section aria-labelledby="related-title" className="on-light text-ink py-24 md:py-32">
        <div className="container-x">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 id="related-title" className="display-sm">
              Related projects
            </h2>
            <Link href="/portfolio" className="group inline-flex items-center gap-3 font-semibold">
              <span className="link-draw">All projects</span> <Arrow />
            </Link>
          </div>
          <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <ProjectCard
                  project={r}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProjectCta imageProject={next.slug} />
      <JsonLd
        data={projectJsonLd({
          title: p.title,
          description: p.description.join(" "),
          path: `/portfolio/${p.slug}`,
          images: p.images,
        })}
      />
    </>
  );
}
