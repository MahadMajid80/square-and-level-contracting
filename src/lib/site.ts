/**
 * Single source of truth for business identity (NAP).
 * Every value here was verified against squareandlevelcontracting.com on 2026-11-02
 * (homepage footer + /contact/). Do not hardcode these values in components.
 */
export const site = {
  name: "Square and Level Contracting",
  shortName: "Square & Level",
  legalNameNote:
    "Trading name as shown on the existing website. Confirm the registered legal name.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://squareandlevelcontracting.com").replace(
    /\/$/,
    "",
  ),
  locale: "en_CA",
  tagline: "Custom design/build on Salt Spring Island, British Columbia",
  description:
    "Square and Level Contracting is a custom design/build company on Salt Spring Island, BC — drafting and design, project management, custom woodworking, renovations and additions.",
  contactPerson: "Micah Booy",
  phone: {
    display: "250-537-6904",
    e164: "+12505376904",
  },
  email: "squareandlevel@telus.net",
  address: {
    street: "152 Park Dr",
    locality: "Salt Spring Island",
    region: "BC",
    regionName: "British Columbia",
    postalCode: "V8K 2R7",
    country: "CA",
    countryName: "Canada",
  },
  /** Only areas the existing site explicitly states. Expand after owner confirmation. */
  areaServed: ["Salt Spring Island"],
  social: [] as { label: string; href: string }[], // The current site only links to placeholder social URLs.
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=152+Park+Dr%2C+Salt+Spring+Island%2C+BC+V8K+2R7",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=152+Park+Dr,+Salt+Spring+Island,+BC+V8K+2R7&output=embed",
} as const;

export const fullAddress = `${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}, ${site.address.countryName}`;

export const indexingAllowed = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export function absoluteUrl(path = "/") {
  return `${site.url}${path === "/" ? "" : path}`;
}

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/testimonials", label: "Testimonials" },
] as const;
