"use client";

import { Phone, MessageCircle } from "lucide-react";

import { getWhatsappLink, getTelLink, waMessages } from "@/lib/whatsapp";
import { useAppData } from "@/components/shared/data-provider";

/**
 * Persistent bottom bar on mobile with Call + WhatsApp.
 * Hidden on md+ where the navbar already exposes these actions.
 * Body has bottom padding on mobile (see layout) so content isn't covered.
 */
export function MobileStickyBar() {
  const { business } = useAppData();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-terracotta/20 bg-cream-100 shadow-[0_-2px_12px_rgba(107,79,58,0.08)] md:hidden">
      <a
        href={getTelLink(business.phoneTel)}
        className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-charcoal hover:bg-cream-200"
        aria-label={`Call ${business.phoneDisplay}`}
      >
        <Phone className="h-5 w-5 text-terracotta" />
        Call Now
      </a>
      <a
        href={getWhatsappLink(business.whatsapp, waMessages.general)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-[#25D366] py-3.5 text-sm font-semibold text-white hover:bg-[#1ebe5b] transition-colors"
      >
        <MessageCircle className="h-5 w-5" />
        WhatsApp
      </a>
    </div>
  );
}
