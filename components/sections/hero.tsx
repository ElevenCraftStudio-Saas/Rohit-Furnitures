import Image from "next/image";
import { ShieldCheck, BadgeIndianRupee, Store } from "lucide-react";
import type { Business } from "@/types";
import { BLUR_DATA_URL } from "@/lib/image";
import { FadeIn } from "@/components/shared/fade-in";
import {
  WhatsAppButton,
  CallButton,
} from "@/components/shared/contact-buttons";

const trustSignals = [
  { icon: ShieldCheck, label: "Nilkamal Authorized" },
  { icon: BadgeIndianRupee, label: "Best Price Guarantee" },
  { icon: Store, label: "Salem's Local Store" },
];

export function Hero({ business }: { business: Business }) {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden">
      {/* Background with showroom aesthetic */}
      <Image
        src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1920&q=80"
        alt="Rohit Furnitures showroom living room setup"
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className="object-cover transition-transform duration-10000 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/35" />

      {/* Content */}
      <div className="container-section relative z-10 pt-24">
        <div className="max-w-2xl">
          <FadeIn>
            <h1 className="text-balance text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl font-serif">
              Quality Furniture, Honest Prices —{" "}
              <span className="text-primary hover:text-primary/90 transition-colors drop-shadow-[0_2px_8px_rgba(182,141,64,0.3)]">
                Right Here in Salem
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-5 max-w-xl text-lg text-slate-300">
              Your local destination for Nilkamal and branded furniture, proudly
              serving Salem with {business.yearsInBusiness}+ years of service.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton size="lg" />
              <CallButton
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white hover:text-charcoal hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all"
              />
            </div>
            <p className="mt-3 text-sm text-slate-400">
              We reply within a few hours — message us anytime.
            </p>
          </FadeIn>

          {/* Trust strip */}
          <FadeIn delay={0.3}>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {trustSignals.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-2 text-sm font-medium text-white/90"
                >
                  <item.icon className="h-5 w-5 text-primary" />
                  {item.label}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
