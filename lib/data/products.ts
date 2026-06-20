import type { Product } from "@/types";

const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;

/**
 * Product catalogue. Owner can extend this array — no component changes needed.
 * `category` must match a slug in categories.ts.
 * `priceRange` is a free-text string, e.g. "₹8,000 – ₹15,000".
 * Set `featured: true` to surface a product in the homepage carousel.
 */
export const products: Product[] = [
  {
    id: "sofa-3seater-fabric",
    name: "3-Seater Fabric Sofa",
    category: "sofas",
    priceRange: "₹18,000 – ₹32,000",
    image: U("1567016432779-094069958ea5"),
    description:
      "Plush 3-seater with a solid wood frame and stain-resistant fabric. Available in multiple colours.",
    featured: true,
  },
  {
    id: "recliner-single",
    name: "Single-Seat Recliner",
    category: "sofas",
    priceRange: "₹14,000 – ₹26,000",
    image: U("1493809842364-78817add7ffb"),
    description:
      "Smooth-action recliner with padded arms — the perfect reading and TV chair.",
    featured: true,
  },
  {
    id: "queen-bed-storage",
    name: "Queen Bed with Storage",
    category: "beds-wardrobes",
    priceRange: "₹16,000 – ₹28,000",
    image: U("1505693416388-ac5ce068fe85"),
    description:
      "Hydraulic storage bed in engineered wood — fits a queen mattress with generous under-bed space.",
    featured: true,
  },
  {
    id: "wardrobe-3door",
    name: "3-Door Wardrobe",
    category: "beds-wardrobes",
    priceRange: "₹15,000 – ₹30,000",
    image: U("1540574163026-643ea20ade25"),
    description:
      "Spacious 3-door wardrobe with mirror, drawers and adjustable shelves.",
    featured: false,
  },
  {
    id: "dining-6seater",
    name: "6-Seater Dining Set",
    category: "dining",
    priceRange: "₹22,000 – ₹45,000",
    image: U("1617806118233-18e1de247200"),
    description:
      "Solid wood dining table with six cushioned chairs — built for family dinners.",
    featured: true,
  },
  {
    id: "dining-4seater",
    name: "4-Seater Dining Set",
    category: "dining",
    priceRange: "₹12,000 – ₹24,000",
    image: U("1538688525198-9b88f6f53126"),
    description:
      "Compact 4-seater dining set, ideal for apartments and small families.",
    featured: false,
  },
  {
    id: "office-chair-ergo",
    name: "Ergonomic Office Chair",
    category: "office",
    priceRange: "₹6,000 – ₹14,000",
    image: U("1505843490538-5133c6c7d0e1"),
    description:
      "Mesh-back ergonomic chair with lumbar support and adjustable height.",
    featured: true,
  },
  {
    id: "office-desk-study",
    name: "Study & Office Desk",
    category: "office",
    priceRange: "₹7,000 – ₹16,000",
    image: U("1497366811353-6870744d04b2"),
    description:
      "Sturdy work desk with drawers and a cable-friendly design for home or office.",
    featured: false,
  },
  {
    id: "nilkamal-chair-set",
    name: "Nilkamal Plastic Chair (Set of 4)",
    category: "nilkamal-plastic",
    priceRange: "₹2,400 – ₹4,800",
    image: U("1567538096630-e0c55bd6374c"),
    description:
      "Genuine Nilkamal moulded chairs — weather-resistant, stackable and easy to clean.",
    featured: true,
  },
  {
    id: "nilkamal-stool",
    name: "Nilkamal Stool & Side Table",
    category: "nilkamal-plastic",
    priceRange: "₹900 – ₹2,200",
    image: U("1556228453-efd6c1ff04f6"),
    description:
      "Lightweight Nilkamal stools and side tables in a range of bright colours.",
    featured: false,
  },
  {
    id: "tv-unit-wall",
    name: "Wall-Mounted TV Unit",
    category: "decor-storage",
    priceRange: "₹8,000 – ₹18,000",
    image: U("1550581190-9c1c48d21d6c"),
    description:
      "Modern TV unit with open shelves and closed storage to keep the living room neat.",
    featured: true,
  },
  {
    id: "shoe-rack-4tier",
    name: "4-Tier Shoe Rack",
    category: "decor-storage",
    priceRange: "₹3,000 – ₹7,000",
    image: U("1493663284031-b7e3aefcae8e"),
    description:
      "Compact 4-tier shoe rack that keeps your entryway organised.",
    featured: false,
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export const productsByCategory = (slug: string) =>
  products.filter((p) => p.category === slug);
