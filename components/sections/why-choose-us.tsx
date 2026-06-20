import { BadgeIndianRupee, ShieldCheck, LayoutGrid, Zap } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/shared/fade-in";

const reasons = [
  {
    icon: BadgeIndianRupee,
    title: "Best Price Guarantee",
    description: "Competitive pricing on all branded furniture, every day.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Brands",
    description:
      "Genuine Nilkamal and other quality manufacturers you can rely on.",
  },
  {
    icon: LayoutGrid,
    title: "Wide Variety",
    description: "Furniture for every room, every style and every budget.",
  },
  {
    icon: Zap,
    title: "Quick Response",
    description:
      "Reach us on WhatsApp or call — real answers, fast, no waiting around.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-cream-200/50 border-y border-terracotta/10 py-16 md:py-24">
      <div className="container-section">
        <SectionHeading
          eyebrow="Why Rohit Furnitures"
          title="Why Customers Choose Us"
          description="We keep it simple — good furniture, fair prices and quick, honest service."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, i) => (
            <FadeIn key={reason.title} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-2xl border border-terracotta/20 bg-cream-100 backdrop-blur p-6 shadow-sm transition-all duration-300 hover:border-terracotta/40 hover:shadow-[0_0_15px_rgba(107,79,58,0.15)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <reason.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-serif text-lg font-semibold text-charcoal">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm text-charcoal-light">
                  {reason.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
