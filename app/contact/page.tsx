import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

import { getDbData } from "@/lib/db";
import { getTelLink, getWhatsappLink, waMessages } from "@/lib/whatsapp";
import { FadeIn } from "@/components/shared/fade-in";
import { ContactForm } from "@/components/sections/contact-form";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Rohit Furnitures, Salem. Call, WhatsApp or send us a message — we reply within a few hours. Visit our Cherry Road showroom.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const dbData = getDbData();
  const business = dbData.business;
  const dynamicTelLink = getTelLink(business.phoneTel);

  return (
    <>
      <header className="bg-cream-200 border-b border-terracotta/20 pb-12 pt-28 md:pt-36">
        <div className="container-section">
          <h1 className="text-3xl font-bold text-charcoal sm:text-4xl">
            Get in Touch
          </h1>
          <p className="mt-3 max-w-2xl text-charcoal-light">
            Questions about a product, a price or delivery? Send us a message and
            we&apos;ll reply within a few hours — or reach us instantly on
            WhatsApp.
          </p>
        </div>
      </header>

      <section className="container-section py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Form */}
          <FadeIn>
            <h2 className="font-serif text-2xl font-semibold text-charcoal">
              Send us a message
            </h2>
            <p className="mt-1 text-sm text-charcoal-light">
              Fill this in and we&apos;ll continue the chat on WhatsApp.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </FadeIn>

          {/* Info + map */}
          <FadeIn delay={0.1} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Button asChild variant="whatsapp" size="lg">
                <a
                  href={getWhatsappLink(business.whatsapp, waMessages.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </a>
              </Button>
              <Button asChild size="lg">
                <a href={dynamicTelLink}>
                  <Phone className="h-5 w-5" />
                  Call Now
                </a>
              </Button>
            </div>

            <div className="rounded-2xl border border-terracotta/20 bg-cream-200 p-6 shadow-sm transition-all duration-300 hover:border-terracotta/40 hover:shadow-[0_0_15px_rgba(107,79,58,0.15)]">
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" />
                  <span className="text-charcoal-light">
                    {business.address.full}
                  </span>
                </li>
                <li className="flex gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-terracotta" />
                  <a
                    href={dynamicTelLink}
                    className="text-charcoal-light hover:text-terracotta transition-colors"
                  >
                    {business.phoneDisplay}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-terracotta" />
                  <a
                    href={`mailto:${business.email}`}
                    className="break-all text-charcoal-light hover:text-terracotta transition-colors"
                  >
                    {business.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" />
                  <div className="text-charcoal-light">
                    <p>Open daily · {business.hours[0].hours}</p>
                    <p className="text-xs text-charcoal-muted">
                      (Confirm timings before visiting)
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-2xl border border-terracotta/20 shadow-sm">
              <iframe
                src={business.mapEmbedUrl}
                title="Rohit Furnitures location on Google Maps"
                className="h-[280px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
