# Content inventory

| Original URL | New URL | Page title (new) | Content source | Assets | SEO notes |
|---|---|---|---|---|---|
| `/` | `/` | Square and Level Contracting \| Custom Design/Build on Salt Spring Island, BC | About blurb, services, portfolio grid, FAQ, testimonials | Reeve Residence cover (hero), about image, 6 featured covers | Single H1; LocalBusiness + WebSite JSON-LD |
| `/#about` | `/about` | About — Custom Design/Build on Salt Spring Island | About blurb, FAQ, testimonial facts | `2024/01/resized_image2.jpg`, Early Projects + Shop covers | New standalone page |
| `/#services` | `/services` | Services — Design/Build, Project Management, Woodworking & Renovations | 4 service blurbs, FAQ | 4 service hero covers | New hub page |
| — | `/services/drafting-design-build` | Drafting & Design/Build on Salt Spring Island | Service blurb + FAQ answers | Reeve Residence | Service JSON-LD |
| — | `/services/project-management` | Construction Project Management on Salt Spring Island | Service blurb + FAQ answers | Gregory Residence | Service JSON-LD, 2 FAQs (no FAQPage markup) |
| — | `/services/custom-woodworking` | Custom Woodworking & Finish Carpentry on Salt Spring Island | Service blurb, Mills testimonial facts | Mills Cabin | Service JSON-LD |
| — | `/services/renovations-additions` | Home Renovations & Additions on Salt Spring Island | Service blurb, FAQ answer | Ostlund Residence | Service JSON-LD |
| `/#portfolio` | `/portfolio` | Portfolio — Custom Homes, Cabins & Woodworking | Portfolio grid | 20 covers | All 20 project links in server HTML |
| `/#testimonials` | `/testimonials` | Testimonials — What Our Clients Say | 8 testimonials (verbatim) | 1 project cover | No review/rating markup (none verified) |
| `/contact/` | `/contact` | Contact — Start Your Project | Verified NAP | — | Working form; click-to-load map |
| — | `/privacy-policy` | Privacy Policy | New starter text | — | Needs owner review |

## Projects (20)

All at `/portfolio/<slug>`; each old `/em_portfolios/<slug>/` URL 301-redirects there.

| # | Original title | Slug | Category (original) | Photos kept | Linked testimonial |
|---|---|---|---|---|---|
| 1 | Fraser Workshop | fraser-workshop | Custom Homes | 27 | — |
| 2 | Early Projects 1994–2001 | early-projects-1994-2001 | Custom Homes | 31 | — |
| 3 | Simpson Residence | simpson-residence | Custom Homes | 15 | — |
| 4 | Scarfo Residence | scarfo-residence | Custom Homes | 31 | — |
| 5 | Ostlund Residence | ostlund-residence | Custom Homes | 29 | Ostlund & Muise* |
| 6 | Fraser Residence | fraser-residence | Custom Homes | 22 | — |
| 7 | Square + Level Shop | square-level-shop | Square + Level Shop | 27 | — |
| 8 | Reeve Residence | reeve-residence | Custom Homes | 15 | Reeve* |
| 9 | Gregory Residence | gregory-residence | Custom Homes | 42 | Gregory* |
| 10 | Mills Cabin | mills-cabin | Mills Cabin | 26 | Mills* |
| 11 | Allan Residence | allan-residence | Custom Homes | 14 | — |
| 12 | Checkwitch Cabin | checkwitch-cabin | Custom Homes | 42 | — |
| 13 | Mosely Residence | mosely-residence | Custom Homes | 28 | Mosely* |
| 14 | Dos Santos Residence | dos-santos-residence | Custom Homes | 16 | — |
| 15 | Owen Residence | owen-residence | Custom Homes | 31 | — |
| 16 | Snee Cottage | snee-cottage | Custom Homes | 17 | Snee* |
| 17 | Woodworking and Landscapes Section 1 | woodworking-and-landscapes-section-1 | Woodworking and Landscapes | 41 | — |
| 18 | Woodworking and Landscapes Section 2 | woodworking-and-landscapes-section-2 | Woodworking and Landscapes | 44 | — |
| 19 | Woodworking and Landscapes Section 3 | woodworking-and-landscapes-section-3 | Woodworking and Landscapes | 38 | — |
| 20 | Woodworking and Landscapes Section 4 | woodworking-and-landscapes-section-4 | Woodworking and Landscapes | 21 | — |

\* Linked by matching surname. Needs owner confirmation (see `content-review-required.md`).

Photo counts are computed from `src/data/projects.ts` (557 photographs in total) and shown on each project page.

## Testimonials (8, verbatim)

1. Ted and Mary Mills
2. Dorothy Cutting
3. Elizabeth Gregory
4. Bryan and Silviya Reeve
5. Bill and Dominique Mosely
6. Rodger Ostlund and Gail Muise
7. Howard and Judy Fry
8. Maggie Snee

## FAQ ("Why Choose Us", 4 items)

The four questions are kept with light copy-editing. Grammar was fixed and the stray Unicode bold in "BC Housing" was removed. Content is unchanged.

## Social media

None. The existing site only links to placeholder root domains. Add real profile URLs to `site.social` in `src/lib/site.ts` once provided.
