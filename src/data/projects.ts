/**
 * Portfolio registry — all 20 projects from squareandlevelcontracting.com (audited 2026-11-02).
 *
 * - `title`, `category` and `legacySlug` are exactly as on the existing site.
 * - Image paths are relative to /wp-content/uploads/ and preserve each project's original gallery.
 *   Where WordPress held duplicate uploads of the same frame (e.g. "-11.webp" and "-11-1.webp"),
 *   only one variant is kept — see docs/asset-manifest.md for the rule and the exclusions.
 * - Descriptions are rewritten from facts stated on the existing site (project text, testimonials,
 *   FAQ). The original project text was largely theme boilerplate. Every description is listed in
 *   docs/content-review-required.md for owner approval. No dates, sizes, costs or locations were added.
 */
import type { ServiceSlug } from "./services";

export type ProjectCategory =
  "Custom Homes" | "Mills Cabin" | "Square + Level Shop" | "Woodworking and Landscapes";

export type Project = {
  slug: string;
  legacySlug: string;
  title: string;
  category: ProjectCategory;
  cover: string;
  images: string[];
  summary: string;
  description: string[];
  services: ServiceSlug[];
  testimonialId?: string;
};

const r = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);
const set = (dir: string, prefix: string, ext: string, items: (number | string)[]) =>
  items.map((i) => `${dir}/${prefix}${i}.${ext}`);

const A = "2023/09";
const B = "2026/03";

export const projects: Project[] = [
  {
    slug: "reeve-residence",
    legacySlug: "reeve-residence",
    title: "Reeve Residence",
    category: "Custom Homes",
    cover: `${B}/REEVE-RESIDENCE-1-3.webp`,
    images: [
      `${B}/REEVE-RESIDENCE-1-3.webp`,
      ...set(B, "REEVE-RESIDENCE-", "webp", [...r(8, 11), ...r(13, 22)]),
    ],
    summary: "A custom home designed and built in close collaboration with its owners.",
    description: [
      "The Reeve Residence was taken from design through construction by Square and Level Contracting. The owners have described the home as the one they had long imagined, and the process of getting there as a genuine collaboration.",
      "It is a good example of how the company prefers to work: the same team responsible for the drawings is responsible for the build, so decisions made at the drafting table carry through to the finished house.",
    ],
    services: ["drafting-design-build", "project-management"],
    testimonialId: "reeve",
  },
  {
    slug: "gregory-residence",
    legacySlug: "gregory-residence",
    title: "Gregory Residence",
    category: "Custom Homes",
    cover: `${B}/GREGORY-RESIDENCE-1-2.webp`,
    images: set(B, "GREGORY-RESIDENCE-", "webp", [
      1,
      2,
      3,
      ...r(5, 9),
      11,
      ...r(13, 18),
      ...r(20, 23),
      ...r(26, 28),
      ...r(30, 49),
    ]),
    summary: "A remote island build, carried from tree clearing through to the final finishes.",
    description: [
      "This project was built on an island with no power and no vehicle access. Every stage — clearing the site, pouring the foundation, raising the roof and completing the finishes — was carried out by Micah and his crew under those conditions.",
      "Remote sites put planning and logistics ahead of everything else. Materials, sequencing and the crew's time all have to be thought through before work begins, which is where Square and Level's project management does its most important work.",
    ],
    services: ["project-management", "drafting-design-build"],
    testimonialId: "gregory",
  },
  {
    slug: "mosely-residence",
    legacySlug: "mosely-residence",
    title: "Mosely Residence",
    category: "Custom Homes",
    cover: `${B}/MOSELY-RESIDENCE-1-3.webp`,
    images: [
      `${B}/MOSELY-RESIDENCE-1-3.webp`,
      ...set(B, "MOSELY-RESIDENCE-", "webp", [2, ...r(4, 19), ...r(21, 25), ...r(27, 29), 31, 32]),
    ],
    summary: "A custom home, designed and built, with thorough project records throughout.",
    description: [
      "The Mosely Residence is a custom home that Square and Level Contracting both designed and built.",
      "Its owners singled out the project management — careful record keeping and steady communication that kept them informed at each stage. That is the standard the company sets for every build: a clear budget and timeline up front, and regular updates from a single point of contact.",
    ],
    services: ["drafting-design-build", "project-management"],
    testimonialId: "mosely",
  },
  {
    slug: "mills-cabin",
    legacySlug: "mills-cabin",
    title: "Mills Cabin",
    category: "Mills Cabin",
    cover: `${B}/millscabin-3-3.jpeg`,
    images: [
      `${B}/millscabin-3-3.jpeg`,
      ...set(B, "millscabin-", "jpeg", [2, ...r(4, 9), ...r(11, 19), ...r(21, 29)]),
    ],
    summary: "A small cabin interior given warmth and character through custom woodwork.",
    description: [
      "The owners of this 600-square-foot cabin asked Micah to bring life to an interior that had almost no wood or character to speak of.",
      "The answer was custom woodwork throughout: cedar cabinetry, window benches and doors, centred on a kitchen island with a raised bar that has become the heart of the cabin.",
    ],
    services: ["custom-woodworking", "renovations-additions"],
    testimonialId: "mills",
  },
  {
    slug: "snee-cottage",
    legacySlug: "snee-cottage",
    title: "Snee Cottage",
    category: "Custom Homes",
    cover: `${B}/SNEE-COTTAGE-1-1.webp`,
    images: [
      ...set(B, "SNEE-COTTAGE-", "webp", [1, 2, 3, 4, 6, 8, 9, 10, 12, 14, 15, 16]),
      `${B}/17.webp`,
      ...set(B, "SNEE-COTTAGE-", "webp", [18, 19, 20]),
      `${B}/Adobe-Express-file-3.webp`,
    ],
    summary:
      "A custom cabin designed from an open brief — finished with a one-of-a-kind outdoor shower.",
    description: [
      "The owner came to Square and Level unsure of the best way to approach a custom cabin. Micah developed the design and then built it.",
      "The project is finished with a custom outdoor shower — the kind of detail that comes from designing and building under one roof.",
    ],
    services: ["drafting-design-build", "custom-woodworking"],
    testimonialId: "snee",
  },
  {
    slug: "ostlund-residence",
    legacySlug: "ostlund-residence",
    title: "Ostlund Residence",
    category: "Custom Homes",
    cover: `${A}/OSTLUND-RESIDENCE-1.webp`,
    images: set(A, "OSTLUND-RESIDENCE-", "webp", [1, ...r(2, 12), ...r(14, 16), ...r(18, 31)]),
    summary: "A home addition and renovation built with a close eye for carpentry detail.",
    description: [
      "An addition and renovation to an existing home. The owners pointed to the quality of the carpentry, the attention to detail and the clear communication throughout as what made the project a success.",
      "Additions ask for care at the joins — new structure meeting old, new finishes sitting beside existing ones — so that the finished house reads as a single, considered whole.",
    ],
    services: ["renovations-additions"],
    testimonialId: "ostlund",
  },
  {
    slug: "fraser-residence",
    legacySlug: "fraser-residence",
    title: "Fraser Residence",
    category: "Custom Homes",
    cover: `${B}/fraserresdience-2-3.jpeg`,
    images: [
      `${B}/fraserresdience-2-3.jpeg`,
      `${B}/fraserresdience-2-2.jpeg`,
      ...set(B, "fraserresdience-", "jpeg", [...r(3, 18), ...r(20, 23)]),
    ],
    summary: "A custom home by Square and Level Contracting.",
    description: [
      "The Fraser Residence is a custom home built by Square and Level Contracting. The photographs here document the finished house.",
    ],
    services: ["drafting-design-build"],
  },
  {
    slug: "fraser-workshop",
    legacySlug: "fraser-workshop",
    title: "Fraser Workshop",
    category: "Custom Homes",
    cover: `${A}/Fraser-Workshop-1.webp`,
    images: set(A, "Fraser-Workshop-", "webp", r(1, 27)),
    summary: "A workshop building, detailed with the same care as a home.",
    description: [
      "A workshop built by Square and Level Contracting. The original project notes describe a building meant to balance strength with refinement — hard-working as a workshop, with careful detailing throughout.",
    ],
    services: ["drafting-design-build", "custom-woodworking"],
  },
  {
    slug: "checkwitch-cabin",
    legacySlug: "checkwitch-cabin",
    title: "Checkwitch Cabin",
    category: "Custom Homes",
    cover: `${B}/CHECKWITCH-CABIN-1-2.webp`,
    images: [
      `${B}/CHECKWITCH-CABIN-1-2.webp`,
      ...set(B, "CHECKWITCH-CABIN-", "webp", [...r(3, 17), ...r(19, 39), ...r(41, 45)]),
    ],
    summary: "A custom cabin by Square and Level Contracting.",
    description: [
      "The Checkwitch Cabin is one of the custom cabins in Square and Level's portfolio. Its gallery follows the building in detail.",
    ],
    services: ["drafting-design-build"],
  },
  {
    slug: "owen-residence",
    legacySlug: "owen-residence",
    title: "Owen Residence",
    category: "Custom Homes",
    cover: `${B}/OWEN-RESIDENCE-1-2-1.webp`,
    images: [
      `${B}/OWEN-RESIDENCE-1-2-1.webp`,
      ...set(B, "OWEN-RESIDENCE-", "webp", [
        2,
        ...r(4, 9),
        ...r(11, 16),
        ...r(18, 20),
        ...r(22, 35),
      ]),
    ],
    summary: "A custom home by Square and Level Contracting.",
    description: [
      "The Owen Residence is a custom home by Square and Level Contracting, shown here in an extensive photographic record.",
    ],
    services: ["drafting-design-build"],
  },
  {
    slug: "allan-residence",
    legacySlug: "allan-residence",
    title: "Allan Residence",
    category: "Custom Homes",
    cover: `${B}/ALLAN-RESIDENCE-1-2.webp`,
    images: [
      `${B}/ALLAN-RESIDENCE-1-2.webp`,
      ...set(B, "ALLAN-RESIDENCE-", "webp", [...r(2, 9), ...r(11, 15)]),
    ],
    summary: "A custom home by Square and Level Contracting.",
    description: ["The Allan Residence is a custom home in the Square and Level portfolio."],
    services: ["drafting-design-build"],
  },
  {
    slug: "dos-santos-residence",
    legacySlug: "dos-santos-residence",
    title: "Dos Santos Residence",
    category: "Custom Homes",
    cover: `${B}/DOS-SANTOS-RESIDENCE-1-2.webp`,
    images: [
      `${B}/DOS-SANTOS-RESIDENCE-1-2.webp`,
      ...set(B, "DOS-SANTOS-RESIDENCE-", "webp", r(3, 17)),
    ],
    summary: "A custom home by Square and Level Contracting.",
    description: ["The Dos Santos Residence is a custom home in the Square and Level portfolio."],
    services: ["drafting-design-build"],
  },
  {
    slug: "scarfo-residence",
    legacySlug: "scarfo-residence",
    title: "Scarfo Residence",
    category: "Custom Homes",
    cover: `${A}/SCARFO-RESIDENCE-1.webp`,
    images: set(A, "SCARFO-RESIDENCE-", "webp", [
      1,
      ...r(2, 14),
      16,
      ...r(18, 26),
      ...r(28, 33),
      36,
    ]),
    summary: "A custom home by Square and Level Contracting.",
    description: ["The Scarfo Residence is a custom home in the Square and Level portfolio."],
    services: ["drafting-design-build"],
  },
  {
    slug: "simpson-residence",
    legacySlug: "simpson-residence",
    title: "Simpson Residence",
    category: "Custom Homes",
    cover: `${A}/SIMPSON-RESIDENCE-1-1.webp`,
    images: set(A, "SIMPSON-RESIDENCE-", "webp", r(1, 15)),
    summary: "A custom home by Square and Level Contracting.",
    description: ["The Simpson Residence is a custom home in the Square and Level portfolio."],
    services: ["drafting-design-build"],
  },
  {
    slug: "square-level-shop",
    legacySlug: "square-level-shop",
    title: "Square + Level Shop",
    category: "Square + Level Shop",
    cover: `${B}/SQUARE-LEVEL-SHOP-2-2-1.jpg`,
    images: [
      `${B}/SQUARE-LEVEL-SHOP-2-2-1.jpg`,
      ...set(B, "SQUARE-LEVEL-SHOP-", "jpg", [...r(3, 22), ...r(25, 30)]),
    ],
    summary: "The Square + Level shop — where the woodworking happens.",
    description: [
      "Photographs of the Square + Level shop. Much of the company's custom woodworking — cabinetry, built-ins, doors and finish carpentry — depends on having a proper shop to work from.",
    ],
    services: ["custom-woodworking"],
  },
  {
    slug: "early-projects-1994-2001",
    legacySlug: "early-projects-1994-2001",
    title: "Early Projects 1994–2001",
    category: "Custom Homes",
    cover: `${A}/EARLY-PROJECTS-1994-2001-1.webp`,
    images: set(A, "EARLY-PROJECTS-1994-2001-", "webp", r(1, 31)),
    summary: "Residential, woodworking and structural work from 1994 to 2001.",
    description: [
      "A record of residential, woodworking and structural projects completed between 1994 and 2001.",
      "The company describes this period as its foundation: the years in which framing, levelling, finishing and custom building skills were developed, along with the habits of careful planning and attention to detail it still works by.",
    ],
    services: ["drafting-design-build", "custom-woodworking"],
  },
  {
    slug: "woodworking-and-landscapes-section-1",
    legacySlug: "woodworking-and-landscapes-section-1",
    title: "Woodworking and Landscapes — Section 1",
    category: "Woodworking and Landscapes",
    cover: `${B}/WOODWORKING-AND-LANDSCAPES-SECTION-1-1-2.webp`,
    images: [
      `${B}/WOODWORKING-AND-LANDSCAPES-SECTION-1-1-2.webp`,
      ...set(B, "WOODWORKING-AND-LANDSCAPES-SECTION-1-", "webp", [
        2,
        ...r(4, 7),
        ...r(9, 19),
        ...r(21, 42),
        44,
        45,
      ]),
    ],
    summary: "Fine woodworking and landscape work, built from natural materials.",
    description: [
      "The first of four collections of Square and Level's woodworking and landscape work — from custom-built pieces to shaped outdoor spaces.",
      "The common thread is natural material and precise detailing: built elements made to sit comfortably in the landscape around them.",
    ],
    services: ["custom-woodworking"],
  },
  {
    slug: "woodworking-and-landscapes-section-2",
    legacySlug: "woodworking-and-landscapes-section-2",
    title: "Woodworking and Landscapes — Section 2",
    category: "Woodworking and Landscapes",
    cover: `${B}/WOODWORKING-AND-LANDSCAPES-SECTION-2-1-3.webp`,
    images: [
      `${B}/WOODWORKING-AND-LANDSCAPES-SECTION-2-1-3.webp`,
      ...set(B, "WOODWORKING-AND-LANDSCAPES-SECTION-2-", "webp", [
        ...r(2, 27),
        ...r(29, 32),
        ...r(34, 36),
        38,
        ...r(40, 46),
      ]),
      `${B}/WOODWORKING-AND-LANDSCAPES-SECTION-1-1-1-1-1.webp`,
      `${B}/WOODWORKING-AND-LANDSCAPES-SECTION-1-1-1-2.webp`,
    ],
    summary: "The second collection of Square and Level's woodworking and landscape work.",
    description: [
      "The second of four collections of woodworking and landscape projects by Square and Level Contracting.",
    ],
    services: ["custom-woodworking"],
  },
  {
    slug: "woodworking-and-landscapes-section-3",
    legacySlug: "woodworking-and-landscapes-section-3",
    title: "Woodworking and Landscapes — Section 3",
    category: "Woodworking and Landscapes",
    cover: `${B}/WOODWORKING-AND-LANDSCAPES-SECTION-3-1-4.webp`,
    images: [
      `${B}/WOODWORKING-AND-LANDSCAPES-SECTION-3-1-4.webp`,
      ...set(
        B,
        "WOODWORKING-AND-LANDSCAPES-SECTION-3-",
        "webp",
        [...r(2, 10), ...r(12, 17), 20, 22, ...r(24, 42)].map((n) => `${n}-1`),
      ),
      `${B}/WOODWORKING-AND-LANDSCAPES-SECTION-3-18-2.webp`,
    ],
    summary: "The third collection of Square and Level's woodworking and landscape work.",
    description: [
      "The third of four collections of woodworking and landscape projects by Square and Level Contracting.",
    ],
    services: ["custom-woodworking"],
  },
  {
    slug: "woodworking-and-landscapes-section-4",
    legacySlug: "woodworking-and-landscapes-section-4",
    title: "Woodworking and Landscapes — Section 4",
    category: "Woodworking and Landscapes",
    cover: `${B}/landscaping-2-2.jpeg`,
    images: [
      `${B}/landscaping-2-2.jpeg`,
      ...set(B, "landscaping-", "jpeg", r(3, 11)),
      ...set(
        B,
        "landscaping-",
        "jpeg",
        r(12, 15).map((n) => `${n}-1`),
      ),
      `${B}/landscaping-16-1-1.jpeg`,
      ...set(
        B,
        "landscaping-",
        "jpeg",
        r(17, 22).map((n) => `${n}-1`),
      ),
    ],
    summary: "The fourth collection, focused on landscape work.",
    description: [
      "The fourth collection of woodworking and landscape projects by Square and Level Contracting, with a focus on landscape work.",
    ],
    services: ["custom-woodworking"],
  },
];

export const projectCategories: ProjectCategory[] = [
  "Custom Homes",
  "Mills Cabin",
  "Square + Level Shop",
  "Woodworking and Landscapes",
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  const n = projects.length;
  return { prev: projects[(i - 1 + n) % n]!, next: projects[(i + 1) % n]! };
}

export function getRelatedProjects(project: Project, count = 3) {
  const scored = projects
    .filter((p) => p.slug !== project.slug)
    .map((p) => ({
      p,
      score:
        (p.category === project.category ? 2 : 0) +
        p.services.filter((s) => project.services.includes(s)).length,
    }))
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map((s) => s.p);
}

/** Featured on the homepage, in this order. Covers chosen without visual review — confirm. */
export const featuredSlugs = [
  "reeve-residence",
  "gregory-residence",
  "mosely-residence",
  "mills-cabin",
  "snee-cottage",
  "checkwitch-cabin",
] as const;

export const heroImage = projects[0]!.cover;
