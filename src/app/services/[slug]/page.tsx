import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata, serviceJsonLd } from "@/lib/seo";
import { getService, services } from "@/data/services";
import { getProject, type Project } from "@/data/projects";
import { testimonials } from "@/data/testimonials";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ProjectCta } from "@/components/sections/ProjectCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { Arrow } from "@/components/ui/Arrow";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return buildMetadata({
    title: s.seoTitle,
    description: s.metaDescription,
    path: `/services/${s.slug}`,
    image: getProject(s.heroProject)?.cover,
  });
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const hero = getProject(s.heroProject);
  const work = s.projectSlugs.map(getProject).filter(Boolean) as Project[];
  const quotes = testimonials
    .filter((t) => t.projectSlug && s.projectSlugs.includes(t.projectSlug))
    .slice(0, 2);
  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Services", path: "/services" },
          { name: s.title, path: `/services/${s.slug}` },
        ]}
        eyebrow={`${s.number} — ${site.address.locality}, BC`}
        title={[s.title]}
        lede={s.lede}
        image={hero?.cover}
        imageAlt={`${hero?.title} by ${site.name}`}
      />

      <section aria-labelledby="svc-overview" className="on-light text-ink py-20 md:py-28">
        <div className="container-x grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 id="svc-overview" className="eyebrow text-graphite">
              Overview
            </h2>
            <ul className="border-ink/15 mt-8 space-y-6 border-t pt-6">
              {s.points.map((pt, i) => (
                <li key={pt.title} data-reveal style={{ ["--reveal-delay" as string]: i * 80 }}>
                  <p className="font-display font-semibold tracking-tight text-[length:var(--step-1)]">
                    <span className="text-level mr-3">■</span>
                    {pt.title}
                  </p>
                  <p className="text-graphite mt-1.5 pl-7">{pt.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-7 md:col-span-7 md:col-start-6">
            {s.body.map((para, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "font-display leading-snug font-medium tracking-tight text-[length:var(--step-2)]"
                    : "text-graphite text-[1.05rem]"
                }
                data-reveal
              >
                {para}
              </p>
            ))}
            {quotes.map((q) => (
              <figure key={q.id} className="border-level border-l-2 pl-6" data-reveal>
                <blockquote className="text-[1.05rem] leading-relaxed">“{q.quote}”</blockquote>
                <figcaption className="eyebrow text-graphite mt-3">— {q.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {work.length > 0 && (
        <section aria-labelledby="svc-work" className="on-light bg-paper-2 text-ink py-20 md:py-28">
          <div className="container-x">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <h2 id="svc-work" className="display-sm">
                Related projects
              </h2>
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-3 font-semibold"
              >
                <span className="link-draw">Full portfolio</span> <Arrow />
              </Link>
            </div>
            <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {work.map((p) => (
                <li key={p.slug}>
                  <ProjectCard
                    project={p}
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 50vw, 100vw"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {s.faqs && (
        <section aria-labelledby="svc-faq" className="on-light text-ink py-20 md:py-28">
          <div className="container-x grid gap-10 md:grid-cols-12">
            <h2 id="svc-faq" className="display-sm md:col-span-4">
              Questions
            </h2>
            <div className="md:col-span-7 md:col-start-6">
              {s.faqs.map((f, i) => (
                <details
                  key={f.q}
                  open={i === 0}
                  className="group border-ink/15 border-b first:border-t [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="font-display flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-6 font-semibold tracking-tight text-[length:var(--step-1)]">
                    {f.q}
                    <span
                      aria-hidden
                      className="text-2xl leading-none transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="text-graphite max-w-xl pb-8">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <nav aria-label="Other services" className="bg-ink py-20 text-white">
        <div className="container-x">
          <p className="eyebrow mb-8 text-white/50">Other services</p>
          <ul className="grid gap-px overflow-hidden bg-white/12 md:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/services/${o.slug}`}
                  className="group bg-ink hover:bg-ink-2 flex h-full flex-col justify-between gap-10 p-8 transition-colors"
                >
                  <span className="eyebrow text-level">{o.number}</span>
                  <span className="flex items-end justify-between gap-4">
                    <span className="font-display leading-tight font-semibold tracking-tight text-[length:var(--step-2)]">
                      {o.title}
                    </span>
                    <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <ProjectCta imageProject={work[0]?.slug ?? "snee-cottage"} />
      <JsonLd
        data={serviceJsonLd({
          title: s.title,
          description: s.metaDescription,
          path: `/services/${s.slug}`,
        })}
      />
    </>
  );
}
