export type CategorySlug = string;

export interface Category {
  slug: CategorySlug;
  name: string;
  /** Short label used in filter pills */
  shortName: string;
  image: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategorySlug;
  priceRange: string;
  image: string;
  description: string;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  rating: number; // 1–5, display only
  date: string; // ISO or human label
  location?: string;
}

export interface Brand {
  name: string;
  logo: string;
  authorized: boolean;
}

export interface BusinessHours {
  day: string;
  hours: string;
}

export interface Business {
  name: string;
  tagline: string;
  phoneDisplay: string;
  phoneTel: string; // e.g. +919344233442
  whatsapp: string; // digits only for wa.me
  email: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    pincode: string;
    full: string;
  };
  coordinates: { lat: number; lng: number };
  mapsUrl: string;
  mapEmbedUrl: string;
  hours: BusinessHours[];
  socialLinks: {
    instagram?: string;
    facebook?: string;
  };
  brands: Brand[];
  yearsInBusiness: number;
}
