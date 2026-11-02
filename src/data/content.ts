/** Shared editorial content drawn from the existing site's About and "Why Choose Us" sections. */

export const aboutIntro =
  "Based on Salt Spring Island, we are a custom design/build company inspired by the landscape we call home. Our approach is simple: listen carefully, design thoughtfully, and build with integrity.";

export const aboutImage = "2024/01/resized_image2.jpg";

export const principles = [
  {
    word: "Listen",
    text: "Every project begins with your ideas. Our design process invites your full input and collaboration from the start.",
  },
  {
    word: "Design",
    text: "Thoughtful drawings, honest cost and time estimates, and a plan that anticipates hurdles before they cost you.",
  },
  {
    word: "Build",
    text: "Rigorous precision in every measurement and structural detail — built square, level and with integrity.",
  },
] as const;

/** Adapted from the existing "Why Choose Us?" section. Credential claims flagged for verification. */
export const whyChooseUs = [
  {
    q: "What makes your approach different?",
    a: "Our name is our promise. In contracting, “square and level” are the foundations of quality. We don’t believe in “close enough.” We apply rigorous precision to every measurement and structural detail, so your project isn’t just visually striking but structurally sound and built to last for decades.",
  },
  {
    q: "How do you ensure projects stay on time?",
    a: "We prioritize transparency through detailed pre-construction planning. Before a single hammer swings, we provide a comprehensive line-item budget and a realistic timeline. By identifying potential hurdles early and maintaining open communication, we eliminate hidden fees and keep your project moving without unnecessary delays.",
  },
  {
    q: "Are you fully licensed and insured for major renovations?",
    a: "Yes. Your peace of mind is a top priority. Square & Level Contracting is fully licensed and registered with BC Housing as a Certified Residential Builder. We handle all necessary local permits and adhere strictly to building codes, so you can rest easy knowing your home and investment are protected.",
  },
  {
    q: "Who will be managing my project on site each day?",
    a: "We believe in personal accountability. Every project is assigned a dedicated project lead who is your primary point of contact. They supervise all subcontractors, keep the job site clean and safe, and give you regular updates so you’re never left wondering about the status of your home.",
  },
] as const;

/** Process steps — each grounded in a statement on the existing site. */
export const processSteps = [
  {
    n: "01",
    title: "Listen",
    text: "We start with your ideas, your site and your priorities. You are encouraged to take a full part in the conversation from day one.",
  },
  {
    n: "02",
    title: "Design & draft",
    text: "Collaborative design and in-house drafting, shaped with your input and drawn by the team that will build it.",
  },
  {
    n: "03",
    title: "Plan & price",
    text: "A comprehensive line-item budget and a realistic timeline before a single hammer swings. Permits handled.",
  },
  {
    n: "04",
    title: "Build",
    text: "A dedicated project lead supervises the work and subcontractors, keeps the site clean and safe, and keeps you updated.",
  },
  {
    n: "05",
    title: "Finish",
    text: "Precision in the final details — the carpentry and woodwork you live with every day.",
  },
] as const;
