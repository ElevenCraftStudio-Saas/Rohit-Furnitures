import type { Business } from "@/types";

/**
 * Single source of truth for all business info.
 * Owner can edit this file to update contact details site-wide.
 *
 * NOTE: items marked "CONFIRM WITH OWNER" are best-guess placeholders.
 */
export const business: Business = {
  name: "Rohit Furnitures",
  tagline: "Quality furniture, honest prices — right here in Salem.",
  phoneDisplay: "093442 33442",
  phoneTel: "+919344233442",
  whatsapp: "919344233442",
  email: "rohitfurnitures.salem@gmail.com", // CONFIRM WITH OWNER (placeholder)
  address: {
    line1: "No.54, Old Palace Theatre Complex",
    line2: "Cherry Road",
    city: "Salem",
    state: "Tamil Nadu",
    pincode: "636001",
    full: "No.54, Old Palace Theatre Complex, Cherry Rd, Salem, Tamil Nadu 636001",
  },
  // CONFIRM WITH OWNER — coordinates approximate to Cherry Rd, Salem.
  coordinates: { lat: 11.6643, lng: 78.146 },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Rohit+Furnitures+Cherry+Road+Salem",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Rohit%20Furnitures%2C%20Cherry%20Rd%2C%20Salem%2C%20Tamil%20Nadu%20636001&output=embed",
  // CONFIRM WITH OWNER — placeholder hours.
  hours: [
    { day: "Monday", hours: "10:00 AM – 8:30 PM" },
    { day: "Tuesday", hours: "10:00 AM – 8:30 PM" },
    { day: "Wednesday", hours: "10:00 AM – 8:30 PM" },
    { day: "Thursday", hours: "10:00 AM – 8:30 PM" },
    { day: "Friday", hours: "10:00 AM – 8:30 PM" },
    { day: "Saturday", hours: "10:00 AM – 8:30 PM" },
    { day: "Sunday", hours: "11:00 AM – 7:00 PM" },
  ],
  socialLinks: {
    instagram: "https://instagram.com/", // CONFIRM WITH OWNER (placeholder)
    facebook: "https://facebook.com/", // CONFIRM WITH OWNER (placeholder)
  },
  brands: [
    { name: "Nilkamal", logo: "/brands/nilkamal.svg", authorized: true },
    // Add more brands here as confirmed by owner:
    { name: "Brand 2", logo: "/brands/placeholder.svg", authorized: false },
    { name: "Brand 3", logo: "/brands/placeholder.svg", authorized: false },
  ],
  yearsInBusiness: 10, // CONFIRM WITH OWNER (placeholder "10+")
};

/** Opening hours in schema.org format for JSON-LD. CONFIRM WITH OWNER. */
export const openingHoursSpec = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "10:00",
    closes: "20:30",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Sunday",
    opens: "11:00",
    closes: "19:00",
  },
];
