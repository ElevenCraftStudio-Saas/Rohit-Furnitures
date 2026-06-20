import type { Category } from "@/types";

const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

/**
 * Product categories. Owner can add/edit/reorder here.
 * `slug` is used in URLs: /products/[slug]
 */
export const categories: Category[] = [
  {
    slug: "sofas",
    name: "Sofas & Recliners",
    shortName: "Sofas",
    image: U("1555041469-a586c61ea9bc"),
    description:
      "Comfortable sofa sets and recliners to make your living room a place everyone wants to gather.",
  },
  {
    slug: "beds-wardrobes",
    name: "Beds & Wardrobes",
    shortName: "Beds",
    image: U("1505693416388-ac5ce068fe85"),
    description:
      "Sturdy beds and spacious wardrobes built for restful nights and clutter-free bedrooms.",
  },
  {
    slug: "dining",
    name: "Dining Sets",
    shortName: "Dining",
    image: U("1617806118233-18e1de247200"),
    description:
      "Dining tables and chairs in every size — from cosy 4-seaters to grand family sets.",
  },
  {
    slug: "office",
    name: "Office Furniture",
    shortName: "Office",
    image: U("1497366811353-6870744d04b2"),
    description:
      "Desks, office chairs and storage that keep your workspace productive and tidy.",
  },
  {
    slug: "nilkamal-plastic",
    name: "Plastic & Nilkamal Furniture",
    shortName: "Nilkamal",
    image: U("1567538096630-e0c55bd6374c"),
    description:
      "Genuine Nilkamal chairs, stools and tables — durable, affordable and easy to clean.",
  },
  {
    slug: "decor-storage",
    name: "Home Decor & Storage",
    shortName: "Decor",
    image: U("1550581190-9c1c48d21d6c"),
    description:
      "Shoe racks, shelves, TV units and decor pieces that finish off every room.",
  },
];

export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);
