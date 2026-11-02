/**
 * Service registry. `sourceIntro` is the original text from the existing homepage (verbatim,
 * including its truncation) and is kept for reference only. Page copy is expanded strictly from
 * what the existing site states (service blurbs + "Why Choose Us" FAQ answers).
 */
export type ServiceSlug =
  "drafting-design-build" | "project-management" | "custom-woodworking" | "renovations-additions";

export type Service = {
  slug: ServiceSlug;
  number: string;
  title: string;
  shortTitle: string;
  seoTitle: string;
  metaDescription: string;
  lede: string;
  sourceIntro: string;
  body: string[];
  points: { title: string; text: string }[];
  heroProject: string;
  projectSlugs: string[];
  faqs?: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "drafting-design-build",
    number: "01",
    title: "Drafting & Design/Build",
    shortTitle: "Design/Build",
    seoTitle: "Drafting & Design/Build on Salt Spring Island",
    metaDescription:
      "Collaborative drafting and design/build for custom homes and cabins on Salt Spring Island, BC. One team from first sketch to finished build.",
    lede: "One team from the first sketch to the finished build — with your input at every step of the design.",
    sourceIntro:
      "We provide a unique service that encourages the client full input and collaboration during the design process.",
    body: [
      "Square and Level Contracting drafts and designs the projects it builds. That means the people drawing your home are the same people who will frame it, finish it and stand behind it.",
      "The design process is built around collaboration. You are encouraged to take a full part — bringing ideas, questions and priorities to the table — while we translate them into drawings that are practical to build and right for the site.",
      "Because design and construction sit under one roof, decisions are made with the build in mind, budgets are grounded in real construction costs, and nothing is lost in the hand-off between a designer and a contractor.",
    ],
    points: [
      {
        title: "Collaborative design",
        text: "Full client input throughout the design process — your project, shaped with you.",
      },
      { title: "Drafting in-house", text: "Drawings prepared by the team that will build them." },
      {
        title: "Built as drawn",
        text: "No hand-off between designer and builder, so intent carries through to the finished work.",
      },
    ],
    heroProject: "reeve-residence",
    projectSlugs: ["reeve-residence", "mosely-residence", "snee-cottage", "checkwitch-cabin"],
  },
  {
    slug: "project-management",
    number: "02",
    title: "Project Management",
    shortTitle: "Project Management",
    seoTitle: "Construction Project Management on Salt Spring Island",
    metaDescription:
      "Line-item budgets, realistic timelines and a dedicated project lead. Construction project management from Square and Level Contracting, Salt Spring Island.",
    lede: "Thoughtful cost and time estimates for every client, a detailed plan before work begins, and one person accountable on site.",
    sourceIntro:
      "Thoughtful costs and time estimates are provided for every client. Our Quality Assurance program includes clear...",
    body: [
      "Every project starts with thoughtful cost and time estimates. Before work begins we prepare a comprehensive line-item budget and a realistic timeline, so you know what is being built, what it will cost and when it will happen.",
      "Detailed pre-construction planning is how we keep projects moving. Identifying hurdles early and keeping communication open prevents surprises — including the hidden fees that so often appear part-way through a build.",
      "Each project has a dedicated project lead who is your primary point of contact. They supervise subcontractors, keep the site clean and safe, and give you regular updates so you always know where your project stands.",
    ],
    points: [
      {
        title: "Line-item budget",
        text: "A comprehensive, itemised budget prepared before construction starts.",
      },
      {
        title: "Realistic timeline",
        text: "Schedules planned around real hurdles, identified early.",
      },
      {
        title: "Dedicated project lead",
        text: "One point of contact who supervises subcontractors and keeps you updated.",
      },
      {
        title: "Permits and code",
        text: "We handle the necessary local permits and build to code.",
      },
    ],
    heroProject: "gregory-residence",
    projectSlugs: ["gregory-residence", "mosely-residence", "reeve-residence"],
    faqs: [
      {
        q: "How do you keep projects on time?",
        a: "Through detailed pre-construction planning. Before a single hammer swings, we provide a comprehensive line-item budget and a realistic timeline. Identifying potential hurdles early and keeping communication open eliminates hidden fees and keeps your project moving without unnecessary delays.",
      },
      {
        q: "Who manages my project on site day to day?",
        a: "Every project is assigned a dedicated project lead who serves as your primary point of contact. They supervise all subcontractors, keep the job site clean and safe, and give you regular updates so you're never left wondering about the status of your home.",
      },
    ],
  },
  {
    slug: "custom-woodworking",
    number: "03",
    title: "Custom Woodworking",
    shortTitle: "Woodworking",
    seoTitle: "Custom Woodworking & Finish Carpentry on Salt Spring Island",
    metaDescription:
      "Custom cabinetry, built-ins, doors and finish carpentry made in the Square + Level shop on Salt Spring Island, BC.",
    lede: "Woodworking professionals and artists who help you realize the full potential of your ideas.",
    sourceIntro:
      "Allow our team of woodworking professionals and artists to help you realize the potential of your ideas.",
    body: [
      "Woodworking is where the company's attention to detail is easiest to see. Our team of woodworking professionals and artists works with you to realize the potential of an idea — whether that is a single piece or the woodwork for an entire interior.",
      "The Mills Cabin shows what this can do for a space: an interior with almost no wood or character was given cedar cabinetry, window benches, doors and a central island with a raised bar that has become the heart of the cabin.",
      "Clients have described the craftsmanship our crews bring to their builds as the kind normally reserved for fine furniture. It is the same standard whether the work is a kitchen, a stair or a landscape structure.",
    ],
    points: [
      {
        title: "Cabinetry and built-ins",
        text: "Kitchens, islands, window benches and storage made for the space.",
      },
      {
        title: "Doors and finish carpentry",
        text: "The details people touch every day, made to last.",
      },
      {
        title: "Woodwork in the landscape",
        text: "Outdoor structures and features built from natural materials.",
      },
    ],
    heroProject: "mills-cabin",
    projectSlugs: [
      "mills-cabin",
      "woodworking-and-landscapes-section-1",
      "woodworking-and-landscapes-section-2",
      "square-level-shop",
    ],
  },
  {
    slug: "renovations-additions",
    number: "04",
    title: "Renovations & Additions",
    shortTitle: "Renovations",
    seoTitle: "Home Renovations & Additions on Salt Spring Island",
    metaDescription:
      "Remodels, renovations and home additions on Salt Spring Island, BC — from refreshing a tired room to adding a master suite.",
    lede: "Looking to breathe new life into a tired space, or to add the master suite you've been missing?",
    sourceIntro:
      "Looking to remodel or breathe new life into a somewhat tired space? Want to add that master suite ..",
    body: [
      "Renovations and additions ask a builder to work with what is already there. New structure has to meet old, new finishes have to sit comfortably beside existing ones, and the finished house should read as one considered whole.",
      "Whether you want to remodel a room that has grown tired or add space your home has always needed — a master suite, for example — we bring the same planning, carpentry and communication we bring to a new build.",
      "Square & Level is licensed and handles the local permits a major renovation requires, building strictly to code so your home and your investment are protected.",
    ],
    points: [
      { title: "Remodels", text: "Bringing new life to spaces that have grown tired." },
      { title: "Additions", text: "New rooms and suites that belong with the original house." },
      {
        title: "Permits handled",
        text: "Local permits and building-code compliance taken care of.",
      },
    ],
    heroProject: "ostlund-residence",
    projectSlugs: ["ostlund-residence", "mills-cabin"],
    faqs: [
      {
        q: "Are you licensed and insured for major renovations?",
        a: "Yes. Square & Level Contracting is fully licensed and registered with BC Housing as a Certified Residential Builder. We handle all necessary local permits and adhere strictly to building codes.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
