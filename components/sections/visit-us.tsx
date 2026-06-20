import { Phone, MapPin, Clock } from "lucide-react";

import type { Business } from "@/types";
import { getTelLink } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/shared/fade-in";
import { DirectionsButton } from "@/components/shared/contact-buttons";

export function VisitUs({ business }: { business: Business }) {
  const dynamicTelLink = getTelLink(business.phoneTel);

  return (
    <section className="container-section py-16 md:py-24">
      <SectionHeading
        eyebrow="Find Us"
        title="Visit Our Showroom"
        description="Drop by to see and feel the furniture before you buy. We're right on Cherry Road, Salem."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {/* Map */}
        <FadeIn className="overflow-hidden rounded-2xl border border-terracotta/20 shadow-sm">
          <iframe
            src={business.mapEmbedUrl}
            title="Rohit Furnitures location on Google Maps"
            className="h-[320px] w-full lg:h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </FadeIn>

        {/* Info */}
        <FadeIn delay={0.1} className="flex flex-col justify-center">
          <div className="space-y-6">
            <div className="flex gap-4">
              <MapPin className="mt-1 h-6 w-6 shrink-0 text-terracotta" />
              <div>
                <h3 className="font-serif text-lg font-semibold text-charcoal">
                  Address
                </h3>
                <p className="mt-1 text-charcoal-light">
                  {business.address.full}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Phone className="mt-1 h-6 w-6 shrink-0 text-terracotta" />
              <div>
                <h3 className="font-serif text-lg font-semibold text-charcoal">
                  Phone
                </h3>
                <a
                  href={dynamicTelLink}
                  className="mt-1 inline-block text-charcoal-light hover:text-terracotta transition-colors"
                >
                  {business.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="mt-1 h-6 w-6 shrink-0 text-terracotta" />
              <div className="w-full">
                <h3 className="font-serif text-lg font-semibold text-charcoal">
                  Opening Hours{" "}
                  <span className="text-xs font-normal text-charcoal-muted">
                    (confirm before visiting)
                  </span>
                </h3>
                <table className="mt-2 w-full max-w-sm text-sm">
                  <tbody>
                    {business.hours.map((row) => (
                      <tr
                        key={row.day}
                        className="border-b border-terracotta/10 last:border-0"
                      >
                        <td className="py-1.5 pr-4 text-charcoal-light">
                          {row.day}
                        </td>
                        <td className="py-1.5 text-right font-medium text-charcoal">
                          {row.hours}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <DirectionsButton />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
