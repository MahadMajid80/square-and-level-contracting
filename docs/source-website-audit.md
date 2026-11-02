# Source website audit — squareandlevelcontracting.com

Audited 2026-11-02 from the live site (homepage, `/contact/`, and sampled project pages
`/em_portfolios/mills-cabin/`, `fraser-workshop`, `gregory-residence`, `early-projects-1994-2001`,
`woodworking-and-landscapes-section-1`).

## Platform

- WordPress with **Elementor 4.3.5** on the purchased theme **"Constre"** (by Dream IT Solution).
- Portfolio is a custom post type at `/em_portfolios/<slug>/`.
- Homepage sections are anchors (`/#services`, `/#about`, `/#portfolio`, `/#testimonials`) — there are no real About, Services or Testimonials pages.
- Only `/` and `/contact/` exist as standalone pages, plus 20 project pages.

## Verified business information (kept)

| Item | Value | Where it appears |
|---|---|---|
| Business name | Square and Level Contracting | Title tags, footer, headings |
| Contact person | Micah Booy | Footer, contact page, testimonials |
| Phone | 250-537-6904 | Footer, contact page |
| Email | squareandlevel@telus.net | Footer, contact page |
| Address | 152 Park Dr., Salt Spring Island BC V8K 2R7 | Footer, contact page |
| Positioning | "Custom Design/Build Company based on Salt Spring Island" | About section |
| Services | Drafting & Design/Build; Project Management; Custom Woodworking; Renovations and Additions | Services section |
| Credential claim | "fully licensed and registered with BC Housing as a Certified Residential Builder" | Why Choose Us FAQ — **not independently verified** |

## Template / demo content found (removed — never migrated)

| Problem | Example | Location |
|---|---|---|
| Fake address | "Chicago 12, Melborne City, USA" | Off-canvas sidebar on every page |
| Fake phone | "(111) 111-111-1111" | Off-canvas sidebar |
| Fake email | "Example@gmail.com" | Off-canvas sidebar |
| Fake hours | "Week Days: 09.00 to 18.00 Sunday: Closed" | Off-canvas sidebar |
| Lorem-style filler | "The argument in favor of using filler text goes something like this…" | Off-canvas "About Us" |
| Placeholder social links | facebook.com, twitter.com, instagram.com, dribbble.com (root domains) and `#` links | Header, sidebar, footer |
| Theme copyright | "© 2024, Constre. All Rights Reserved by Dream IT Solution" | Project page footer |
| Theme demo link | Footer logo links to `wp.ditsolution.net/constre/` | Every page footer |
| Theme demo link | "RENOVATIONS AND ADDITIONS" links to `wp.ditsolution.net/constre/construction-building-making/` | Homepage services |
| Staging domain link | "Contact Us" → `squareandlevelcontracting.sleektradingltd.com/contact/` | Why Choose Us |
| Theme slider text | "Welcome! To Our constre Construction Company", "constre" captions, repeated 3× | Hero slider |
| Misspelled business name | "Square and Leveling Constructing", "Square and Level COntracting", "Salts Spring Island" | Footer, slider, About heading |
| Broken sentence | "Built by Square and Level Contracting's ," | Mills Cabin description |
| Generic boilerplate descriptions | Near-identical "craftsmanship… cohesive and intentional" copy across projects | Project pages |
| Unverified claim | "Leading the next generation of timber framing" | "Gold Standard" block — not reused |

## Technical / SEO issues

- **Titles:** generic ("Square and Level Contracting", "Mills Cabin – Square and Level Contracting"). No custom meta descriptions were found.
- **Headings:** the H1 "Drafting Design/Build" is repeated 12× (slider clones). The off-canvas "About Us" and "Contact Info" H2s appear on every page.
- **Thin pages:** services, about and testimonials exist only as homepage anchors, so none can rank on its own.
- **Images:** every image alt is "constre" or empty.
  - Most WebP galleries are full resolution with no `srcset` in the lightbox anchors.
  - Duplicate uploads (`-1`, `-2` suffixes) exist.
  - One Fraser Workshop photo (`2026/03/Fraser-Workshop-22.webp`) appears inside the Reeve Residence gallery.
- **Links:** placeholder `#` links throughout.
  - The footer "Gallery" links go to WordPress attachment pages (`/home/<attachment>/`).
- **Scripts:** a full Elementor + theme stack (sliders, icon fonts, jQuery) loads on every page.
- **Structured data:** no LocalBusiness/Organization JSON-LD observed.
- **Accessibility:** icon links without names ("Flaticon-facebook-4" as text), no skip link, duplicated nav landmarks (three copies of the menu).

## Not accessible from the audit environment

- **WordPress sitemap:** `/wp-sitemap.xml` could not be fetched from the audit environment. The URL list was built from site navigation and the homepage portfolio grid instead.
- **Theme CSS:** not inspected. The brand yellow **#FEC010** is used as given in the brief and still needs checking against the logo artwork.
- **Binary assets:** the build environment's network blocked direct downloads from the domain. Photos are served from the live media library until `npm run assets:download` is run (see `asset-manifest.md`).
- **Not fully reviewed:** project pages other than the five sampled. Descriptions for the rest were not independently fetched, but the portfolio grid on the homepage provided titles, categories and full image lists for all 20.
