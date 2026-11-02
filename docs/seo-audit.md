# SEO audit and keyword map

## Keyword research — method and limits

No keyword tool (Google Keyword Planner, Ahrefs, Semrush, Search Console data) was available in the build environment. **No search volumes, difficulty scores or ranking claims are made here.**

The map below assigns the brief's seed topics to the page best suited to each, so pages don't compete with one another. After launch, validate it with Search Console's Performance report and Keyword Planner.

## Keyword map

| Page | Primary topic | Supporting phrases used naturally |
|---|---|---|
| `/` | custom design/build Salt Spring Island | custom homes, cabins, renovations, woodworking, Salt Spring Island BC |
| `/services/drafting-design-build` | design/build contractor Salt Spring Island | drafting, custom home design, collaborative design |
| `/services/project-management` | construction project management Salt Spring Island | line-item budget, timeline, project lead, permits |
| `/services/custom-woodworking` | custom woodworking Salt Spring Island | cabinetry, built-ins, finish carpentry, doors |
| `/services/renovations-additions` | home renovations and additions Salt Spring Island | remodel, addition, master suite, permits |
| `/portfolio` | custom home builder portfolio Salt Spring Island | homes, cabins, woodworking, landscapes |
| `/portfolio/<project>` | the project name | category, related service |
| `/about` | Salt Spring Island builder / Micah Booy | design/build company, approach |
| `/testimonials` | Square and Level Contracting reviews (brand) | client names |
| `/contact` | contact Square and Level Contracting | phone, email, address |

**Deliberately not done:**

- No "Southern Gulf Islands" or neighbouring-island targeting until the owner confirms the service area.
- No location doorway pages.

## On-page implementation (every indexable page)

- Unique `<title>` via the Metadata API.
  - Template: `%s | Square and Level Contracting`.
  - The homepage title is absolute.
- Unique meta description, written per page.
- Exactly one `<h1>` (tested on Home, About, project, service and Contact), with a logical H2/H3 hierarchy beneath.
- Canonical URL on every page, built from `NEXT_PUBLIC_SITE_URL`.
- Open Graph and Twitter card tags, with the page's photograph where one exists.
- Visible breadcrumbs plus `BreadcrumbList` JSON-LD on all inner pages.
- Descriptive alt text: "*Project — photograph N of M*", "*Project by Square and Level Contracting*".
  - Decorative images use `alt=""`.
- Internal linking:
  - services ↔ projects, both ways
  - project → previous / next / related
  - footer to every service and section
  - the 404 page links to the portfolio and services
- `lang="en-CA"`.

## Technical

| Item | Implementation |
|---|---|
| Rendering | All HTML pages statically prerendered. Content is in the server HTML. |
| Sitemap | `/sitemap.xml` with 31 URLs (`app/sitemap.ts`), including image entries for projects. Uses the real domain from `NEXT_PUBLIC_SITE_URL`. |
| robots.txt | `app/robots.ts`. **Production** (`NEXT_PUBLIC_ALLOW_INDEXING=true`): allow all, disallow `/api/`, sitemap line. **Any other deployment**: `Disallow: /`, plus `noindex` on every page, so preview URLs never get indexed. |
| Redirects | Single-hop 301s. See `seo-migration-map.md`. |
| 404 | Custom page, `noindex, follow`, returns HTTP 404 (tested). |
| Trailing slash | None. `/<path>/` gets a 301 to `/<path>`. |
| Duplicate content | Portfolio filters are client state, not URLs. There are no paginated or tag duplicates. |

## Structured data

| Schema | Where | Fields (verified facts only) |
|---|---|---|
| `GeneralContractor` | Every page | name, url, telephone, email, postal address, areaServed (Salt Spring Island), logo, contactPoint |
| `WebSite` | Every page | name, url, publisher, inLanguage |
| `BreadcrumbList` | Inner pages | — |
| `Service` | Each service page | provider, areaServed |
| `CreativeWork` | Each project page | name, description, images, creator |

**Deliberately omitted:**

- ratings and AggregateRating — none verified
- foundingDate, priceRange, geo coordinates, opening hours, awards
- the BC Housing credential (pending verification)
- `FAQPage` markup — Google limits FAQ rich results to authoritative government and health sites, so it would add nothing here

**Validation:** after deploy, run each template through <https://search.google.com/test/rich-results> and <https://validator.schema.org>. Neither could be reached from the build environment.

## Local SEO

- **NAP:** name, address and phone come from one source (`src/lib/site.ts`) and appear identically in the footer, the contact page and the JSON-LD.
- **Google Business Profile:** if one exists, make sure its name, address and phone match this site exactly.
- **Business Profile category:** "General contractor" or "Custom home builder".
- **Website field:** set it to the new homepage.
