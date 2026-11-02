/**
 * Testimonials — verbatim from squareandlevelcontracting.com (audited 2026-11-02).
 * Source spelling and punctuation are intentionally preserved ("fie", "Record Keening",
 * "cabin.Micah", missing closing quote) until the owner approves corrections.
 * See docs/content-review-required.md.
 *
 * `projectSlug` links are inferred from matching surnames and need owner confirmation.
 */
export type Testimonial = {
  id: string;
  name: string;
  quote: string;
  projectSlug?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "reeve",
    name: "Bryan and Silviya Reeve",
    quote:
      "Micah’s vision, exceptional skills, integrity and advice were invaluable in the design and construction of our dream home. Our project was embraced with zeal and commitment. The process was terrific and the result was amazing!",
    projectSlug: "reeve-residence",
  },
  {
    id: "gregory",
    name: "Elizabeth Gregory",
    quote:
      "Micah and his team built a beautiful cabin for me on an island without power or vehicle access – from tree clearing to foundation pouring to roof raising to the final touches. This cabin exceeds my expectations. Any challenges were met with imagination, industry, and integrity. Working with Micah and his crew is a delight.",
    projectSlug: "gregory-residence",
  },
  {
    id: "mills",
    name: "Ted and Mary Mills",
    quote:
      "We enlisted Micah (and we’re fortunate he agreed to take us on) to bring some life to the interior of our 600 square foot cabin. Micah responded amazingly! Where there had not been a speck of wood or character he created an enticingly warm environment of cedar and fie cabinetry, window benches and doors. His crowning achievement, in our minds, is the central island with a stunning raised “bar” that is the heart of our cabin home.",
    projectSlug: "mills-cabin",
  },
  {
    id: "cutting",
    name: "Dorothy Cutting",
    quote:
      "I’ve known Micah for close to 20 years, and during that time he has been extraordinarily helpful to me. He is the most skilled, honest and dependable builder I know – plus he knows how to work with his clients to solve problems. His prices are reasonable, he gets the job done on time, and he is always extremely considerate. I’m proud to know him and have no reserves about recommending him for any task, big or small.",
  },
  {
    id: "mosely",
    name: "Bill and Dominique Mosely",
    quote:
      "Our custom home was designed and built to exceed our expectations in every aspect. Micah’s Project Management and Record Keening is impeccable and his Communication kept us at ease and well informed throughout the project.",
    projectSlug: "mosely-residence",
  },
  {
    id: "ostlund",
    name: "Rodger Ostlund and Gail Muise",
    quote:
      "Micah’s high integrity, exemplary skills in carpentry and his keen eye for detail together with his great interpersonal skills and clear communication made our home addition/renovation a pleasure and a home we are proud of.",
    projectSlug: "ostlund-residence",
  },
  {
    id: "fry",
    name: "Howard and Judy Fry",
    quote:
      "I highly recommend Micah and his crew, they are skillful, punctual and respectful, they apply a degree of craftsmanship to their build normally reserved for fine furniture.",
  },
  {
    id: "snee",
    name: "Maggie Snee",
    quote:
      "I was unsure the best way to proceed with my custom cabin.Micah came up with a great design and finished off with a one of a kind custom outdoor shower!",
    projectSlug: "snee-cottage",
  },
];

export function getTestimonial(id?: string) {
  return id ? testimonials.find((t) => t.id === id) : undefined;
}
