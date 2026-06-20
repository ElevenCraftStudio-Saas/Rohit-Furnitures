import fs from "fs";
import path from "path";
import { products as defaultProducts } from "./data/products";
import { categories as defaultCategories } from "./data/categories";
import { business as defaultBusiness } from "./data/business";
import { testimonials as defaultTestimonials } from "./data/testimonials";
import type { Product, Category, Business, Testimonial } from "@/types";

export interface Offer {
  id: string;
  title: string;
  description: string;
  badge?: string;
  code?: string;
  active: boolean;
}

export interface DbSchema {
  products: Product[];
  categories: Category[];
  business: Business;
  testimonials: Testimonial[];
  offers: Offer[];
}

const DB_PATH = path.join(process.cwd(), "data", "db.json");

const defaultOffers: Offer[] = [
  {
    id: "inaugural-offer",
    title: "Vibrant Showroom Launch Celebration! 🎉",
    description: "Get customized solutions and direct pricing on all new sofas and modern dining sets.",
    badge: "Special Launch",
    code: "LAUNCH20",
    active: true,
  },
  {
    id: "nilkamal-bulk",
    title: "Authorized Nilkamal Partner Deals 🌟",
    description: "Unbeatable pricing on bulk orders for offices, institutions, and home sets.",
    badge: "Best Value",
    code: "NILKAMAL-DEAL",
    active: true,
  }
];

function ensureDbExists() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    const defaultData: DbSchema = {
      products: defaultProducts,
      categories: defaultCategories,
      business: defaultBusiness,
      testimonials: defaultTestimonials,
      offers: defaultOffers,
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultData, null, 2), "utf-8");
  }
}

export function getDbData(): DbSchema {
  ensureDbExists();
  try {
    const content = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    console.error("Failed to read JSON db, returning defaults", err);
    return {
      products: defaultProducts,
      categories: defaultCategories,
      business: defaultBusiness,
      testimonials: defaultTestimonials,
      offers: defaultOffers,
    };
  }
}

export function saveDbData(data: DbSchema) {
  ensureDbExists();
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}
