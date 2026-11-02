import { site } from "@/lib/site";
import { getProject } from "@/data/projects";
import { SplitLines } from "../animations/SplitLines";
import { Parallax } from "../animations/Parallax";
import { ButtonLink } from "../ui/ButtonLink";
import { Media } from "../ui/Media";

export function ProjectCta({
  heading = ["Let’s build", "something", "square & level."],
  imageProject = "snee-cottage",
}: {
  heading?: string[];
  imageProject?: string;
}) {
  const img = getProject(imageProject)?.cover;
  return (
    <section
      aria-labelledby="cta-title"
      className="bg-ink relative isolate overflow-hidden text-white"
    >
      {img && (
        <div className="absolute inset-0 -z-10 opacity-45">
          <Parallax amount={16} className="absolute inset-x-0 -inset-y-[10%]">
            <Media src={img} alt="" sizes="100vw" className="size-full" />
          </Parallax>
        </div>
      )}
      <div className="from-ink via-ink/85 to-ink/40 absolute inset-0 -z-10 bg-gradient-to-r" />
      <div className="container-x grid gap-12 py-28 md:grid-cols-12 md:py-40">
        <div className="md:col-span-8">
          <p className="eyebrow text-level mb-8 flex items-center gap-4">
            <span className="bg-level h-px w-10" /> Start your project
          </p>
          <SplitLines id="cta-title" className="display-lg" lines={heading} />
        </div>
        <div className="flex flex-col justify-end gap-8 md:col-span-4">
          <p className="text-white/75">
            Tell us about your home, cabin, renovation or woodworking idea. {site.contactPerson}{" "}
            will get back to you to talk it through.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact">Discuss your vision</ButtonLink>
          </div>
          <div className="space-y-1 text-sm">
            <a
              href={`tel:${site.phone.e164}`}
              className="font-display hover:text-level block text-2xl font-semibold tracking-tight"
            >
              {site.phone.display}
            </a>
            <a href={`mailto:${site.email}`} className="link-draw text-white/70 hover:text-white">
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
