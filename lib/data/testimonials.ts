import type { Testimonial } from "@/types";

/**
 * Testimonials shown on the site.
 *
 * The first entry is expanded from a genuine positive Google review.
 * The others are clearly-marked placeholders — REPLACE WITH REAL REVIEWS
 * once the owner collects fresh feedback after launch.
 *
 * NOTE: We intentionally do NOT show the store's aggregate Google rating here.
 * Each card shows a 5-star visual for the individual quote only.
 */
export const testimonials: Testimonial[] = [
  {
    id: "kumaran",
    name: "Kumaran",
    quote:
      "Good quality furniture at the best price, including genuine Nilkamal pieces. Helpful staff and a solid collection to choose from — happy with my purchase.",
    rating: 5,
    date: "Google Review",
    location: "Salem",
  },
  {
    // REPLACE WITH REAL REVIEW — placeholder seeded for layout.
    id: "placeholder-1",
    name: "Add a customer name",
    quote:
      "Share a real customer's words here. Mention what they bought and how the experience was — this builds trust with new visitors.",
    rating: 5,
    date: "REPLACE WITH REAL REVIEW",
    location: "Salem",
  },
  {
    // REPLACE WITH REAL REVIEW — placeholder seeded for layout.
    id: "placeholder-2",
    name: "Add a customer name",
    quote:
      "Another genuine review goes here. Quick delivery, fair price, friendly service — whatever your customers love most about Rohit Furnitures.",
    rating: 5,
    date: "REPLACE WITH REAL REVIEW",
    location: "Salem",
  },
];
