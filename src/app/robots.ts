import type { MetadataRoute } from "next";
import { absoluteUrl, indexingAllowed } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!indexingAllowed) {
    // Preview / staging deployments: keep everything out of search engines.
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
