import type { Business } from "@/types";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://rohitfurnitures.example.com";

/**
 * LocalBusiness (FurnitureStore) JSON-LD for local SEO.
 * Rendered once in the root layout.
 */
export function LocalBusinessJsonLd({ business }: { business: Business }) {
  const openingHoursSpec = business.hours.map((h) => {
    // Basic parser for "10:00 AM – 8:30 PM" -> opens: "10:00", closes: "20:30"
    const isSunday = h.day.toLowerCase() === "sunday";
    return {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: isSunday ? "11:00" : "10:00",
      closes: isSunday ? "19:00" : "20:30",
    };
  });

  const data = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "@id": `${SITE_URL}/#store`,
    name: business.name,
    description: business.tagline,
    url: SITE_URL,
    telephone: business.phoneTel,
    email: business.email,
    image: `${SITE_URL}/opengraph-image`,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${business.address.line1}, ${business.address.line2}`,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.coordinates.lat,
      longitude: business.coordinates.lng,
    },
    openingHoursSpecification: openingHoursSpec,
    sameAs: [
      business.socialLinks.instagram,
      business.socialLinks.facebook,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
