import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { heroImage } from "@/data/projects";
import { HomeHero } from "@/components/sections/HomeHero";
import { IntroStatement } from "@/components/sections/IntroStatement";
import { ServicesIndex } from "@/components/sections/ServicesIndex";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Philosophy } from "@/components/sections/Philosophy";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { ProjectCta } from "@/components/sections/ProjectCta";

export const metadata = buildMetadata({
  title: `${site.name} | Custom Design/Build on Salt Spring Island, BC`,
  absoluteTitle: true,
  description:
    "Custom homes, cabins, renovations, additions and fine woodworking on Salt Spring Island, BC. Square and Level Contracting designs and builds with precision — one team from drawings to final detail.",
  path: "/",
  image: heroImage,
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <IntroStatement />
      <ServicesIndex />
      <FeaturedWork />
      <Philosophy />
      <ProcessTimeline />
      <WhyChooseUs />
      <TestimonialCarousel />
      <ProjectCta />
    </>
  );
}
