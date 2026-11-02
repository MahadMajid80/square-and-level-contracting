import type { Metadata } from "next";
import { absoluteUrl, fullAddress, indexingAllowed, site } from "./site";
import { brand, media } from "./images";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string; // WordPress media path
  imageAlt?: string;
  absoluteTitle?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  absoluteTitle,
}: MetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ? media(image) : undefined;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      locale: site.locale,
      title,
      description,
      ...(ogImage ? { images: [{ url: ogImage, alt: imageAlt ?? title }] } : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    robots: indexingAllowed ? { index: true, follow: true } : { index: false, follow: false },
  };
}

/* ── JSON-LD ───────────────────────────────────────────────────────────── */

const orgId = `${site.url}/#organization`;

export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": orgId,
    name: site.name,
    url: site.url,
    description: site.description,
    telephone: site.phone.e164,
    email: `mailto:${site.email}`,
    logo: media(brand.logo),
    image: media(brand.logo),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
    knowsAbout: [
      "Custom home building",
      "Design/build",
      "Project management",
      "Custom woodworking",
      "Renovations",
      "Home additions",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: site.phone.e164,
      email: site.email,
      areaServed: "CA",
      availableLanguage: "en",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: "en-CA",
    publisher: { "@id": orgId },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(s: { title: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: s.title,
    description: s.description,
    url: absoluteUrl(s.path),
    provider: { "@id": orgId },
    areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
  };
}

export function projectJsonLd(p: {
  title: string;
  description: string;
  path: string;
  images: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: p.description,
    url: absoluteUrl(p.path),
    image: p.images.slice(0, 8).map(media),
    creator: { "@id": orgId },
  };
}

export { fullAddress };
