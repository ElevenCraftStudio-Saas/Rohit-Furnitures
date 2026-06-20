import Image from "next/image";
import type { Business } from "@/types";
import { FadeIn } from "@/components/shared/fade-in";

export function BrandStrip({ business }: { business: Business }) {
  return (
    <section className="border-y border-terracotta/10 bg-cream-200/50 py-10">
      <div className="container-section">
        <FadeIn className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-charcoal-light">
            Authorized partner for
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-8">
            {business.brands.map((brand) => (
              <li key={brand.name} className="transition-all hover:scale-105">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={120}
                  height={48}
                  className="h-10 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                />
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
