/**
 * Legacy WordPress → Next.js 301 redirects. Kept free of path aliases so next.config.ts can import it.
 * Each legacy URL is listed with and without its trailing slash so neither form creates a chain.
 */
type Redirect = { source: string; destination: string; statusCode: 301 };

const projectSlugs = [
  "fraser-workshop",
  "early-projects-1994-2001",
  "simpson-residence",
  "scarfo-residence",
  "ostlund-residence",
  "fraser-residence",
  "square-level-shop",
  "reeve-residence",
  "gregory-residence",
  "mills-cabin",
  "allan-residence",
  "checkwitch-cabin",
  "mosely-residence",
  "dos-santos-residence",
  "owen-residence",
  "snee-cottage",
  "woodworking-and-landscapes-section-1",
  "woodworking-and-landscapes-section-2",
  "woodworking-and-landscapes-section-3",
  "woodworking-and-landscapes-section-4",
];

const both = (source: string, destination: string): Redirect[] => [
  { source, destination, statusCode: 301 },
  { source: `${source}/`, destination, statusCode: 301 },
];

export const legacyRedirects: Redirect[] = [
  ...projectSlugs.flatMap((s) => both(`/em_portfolios/${s}`, `/portfolio/${s}`)),
  // Unknown or future portfolio slugs fall back to the portfolio index.
  ...both("/em_portfolios/:slug", "/portfolio"),
  ...both("/em_portfolios", "/portfolio"),
  // WordPress attachment pages linked from the old footer gallery (/home/<attachment>/).
  ...both("/home/:attachment", "/portfolio"),
  ...both("/home", "/"),
  // Old WordPress system URLs.
  ...both("/wp-sitemap.xml", "/sitemap.xml"),
  ...both("/sitemap_index.xml", "/sitemap.xml"),
  ...both("/feed", "/"),
  ...both("/em_portfolio_category/:slug", "/portfolio"),
  // Finally: strip a trailing slash from any other URL in one 301 (e.g. /contact/ → /contact).
  { source: "/:path+/", destination: "/:path+", statusCode: 301 },
];
