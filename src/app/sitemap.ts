import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { media } from "@/lib/images";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (
    path: string,
    priority: number,
    changeFrequency: "monthly" | "yearly" = "monthly",
    images?: string[],
  ) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency,
    priority,
    ...(images ? { images: images.map(media) } : {}),
  });

  return [
    page("/", 1),
    page("/services", 0.9),
    ...services.map((s) => page(`/services/${s.slug}`, 0.9)),
    page("/portfolio", 0.9),
    ...projects.map((p) => page(`/portfolio/${p.slug}`, 0.7, "yearly", p.images.slice(0, 10))),
    page("/about", 0.7),
    page("/testimonials", 0.6),
    page("/contact", 0.8),
    page("/privacy-policy", 0.2, "yearly"),
  ];
}
