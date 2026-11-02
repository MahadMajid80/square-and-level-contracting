import { buildMetadata } from "@/lib/seo";
import { projects } from "@/data/projects";
import { PageHero } from "@/components/sections/PageHero";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { ProjectCta } from "@/components/sections/ProjectCta";

export const metadata = buildMetadata({
  title: "Portfolio — Custom Homes, Cabins & Woodworking",
  description:
    "Custom homes, cabins, renovations, woodworking and landscape projects by Square and Level Contracting on Salt Spring Island, BC. Browse all 20 portfolio collections.",
  path: "/portfolio",
  image: projects[1]!.cover,
});

export default function PortfolioPage() {
  const totalPhotos = projects.reduce((n, p) => n + p.images.length, 0);
  return (
    <>
      <PageHero
        crumbs={[{ name: "Portfolio", path: "/portfolio" }]}
        eyebrow="Portfolio"
        title={["Work, built", "to be lived in."]}
        lede={`${projects.length} collections and ${totalPhotos} photographs — custom homes, cabins, renovations, woodworking and landscape work.`}
      />
      <section aria-label="Projects" className="on-light text-ink py-12 md:py-16">
        <div className="container-x">
          <PortfolioGrid />
        </div>
      </section>
      <ProjectCta heading={["Have a project", "in mind?"]} imageProject="mosely-residence" />
    </>
  );
}
