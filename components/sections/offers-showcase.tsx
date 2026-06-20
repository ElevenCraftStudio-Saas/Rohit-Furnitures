"use client";

import { Sparkles, MessageCircle, Tag } from "lucide-react";
import type { Offer } from "@/lib/db";
import { getWhatsappLink } from "@/lib/whatsapp";
import { useAppData } from "@/components/shared/data-provider";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";

export function OffersShowcase({ offers }: { offers: Offer[] }) {
  const { business } = useAppData();

  if (offers.length === 0) return null;

  return (
    <section className="container-section py-16 md:py-24">
      <SectionHeading
        eyebrow="Limited Time Offers"
        title="Promotions & Special Deals"
        description="Save big on Salem's finest collection of branded and customized furniture. Message us on WhatsApp to lock in these prices."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {offers.map((offer, i) => {
          const handleEnquire = () => {
            const text = `Hi, I'm interested in the offer "${offer.title}". Could you please check availability and pricing for this?`;
            window.open(getWhatsappLink(business.whatsapp, text), "_blank");
          };

          return (
            <FadeIn key={offer.id} delay={i * 0.1}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-terracotta/20 bg-cream-200 p-6 shadow-sm transition-all duration-300 hover:border-terracotta/50 hover:shadow-[0_0_15px_rgba(107,79,58,0.15)]">
                {/* Glow ring on hover */}
                <div className="absolute inset-0 border border-terracotta/0 group-hover:border-terracotta/20 rounded-2xl pointer-events-none transition-all duration-300" />
                
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1 rounded bg-terracotta/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-terracotta border border-terracotta/20">
                      <Sparkles className="h-3.5 w-3.5" />
                      {offer.badge || "Offer"}
                    </span>
                    <h3 className="mt-3 font-serif text-xl font-bold text-charcoal">
                      {offer.title}
                    </h3>
                  </div>
                  <Tag className="h-6 w-6 text-terracotta shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <p className="mt-3 text-charcoal-light text-sm leading-relaxed flex-1">
                  {offer.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-terracotta/10 pt-4">
                  {offer.code ? (
                    <div className="flex flex-col">
                      <span className="text-[10px] text-charcoal-muted uppercase font-semibold">Promo Code</span>
                      <span className="font-mono text-sm font-bold text-terracotta tracking-wider">{offer.code}</span>
                    </div>
                  ) : (
                    <div />
                  )}
                  <Button
                    onClick={handleEnquire}
                    className="gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Enquire on WhatsApp
                  </Button>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
