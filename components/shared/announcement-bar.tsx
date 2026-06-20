"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, MessageCircle } from "lucide-react";
import { useAppData } from "@/components/shared/data-provider";
import { getWhatsappLink } from "@/lib/whatsapp";

export function AnnouncementBar() {
  const { offers, business } = useAppData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const activeOffers = offers.filter((o) => o.active);

  useEffect(() => {
    if (activeOffers.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeOffers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeOffers.length]);

  if (!visible || activeOffers.length === 0) return null;

  const currentOffer = activeOffers[currentIndex];

  const handleEnquire = () => {
    const text = `Hi, I'm interested in your offer: "${currentOffer.title}" (${currentOffer.code || ""}). Can I get more details?`;
    window.open(getWhatsappLink(business.whatsapp, text), "_blank");
  };

  return (
    <div className="relative z-50 border-b border-terracotta/20 bg-cream-200 text-xs font-medium text-charcoal transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex-1 flex items-center justify-center gap-2 text-center">
          <span className="inline-flex items-center gap-1 rounded bg-terracotta/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-terracotta border border-terracotta/20">
            <Sparkles className="h-3 w-3" />
            {currentOffer.badge || "Offer"}
          </span>
          <span className="truncate pr-4 text-charcoal-light">
            <strong className="text-charcoal">{currentOffer.title}:</strong>{" "}
            {currentOffer.description}
          </span>
          {currentOffer.code && (
            <span className="hidden rounded border border-dashed border-terracotta/40 px-1.5 py-0.5 text-[10px] font-mono text-terracotta sm:inline-block">
              CODE: {currentOffer.code}
            </span>
          )}
          <button
            onClick={handleEnquire}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-terracotta hover:underline ml-2 whitespace-nowrap"
          >
            Enquire
            <MessageCircle className="h-3 w-3" />
          </button>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="rounded p-1 text-charcoal-light hover:bg-cream-300/50 hover:text-charcoal"
          aria-label="Dismiss announcement"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
