import { Hero } from "@/components/sections/hero";
import { CategoryShowcase } from "@/components/sections/category-showcase";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { BrandStrip } from "@/components/sections/brand-strip";
import { Testimonials } from "@/components/sections/testimonials";
import { VisitUs } from "@/components/sections/visit-us";
import { CtaBanner } from "@/components/sections/cta-banner";
import { OffersShowcase } from "@/components/sections/offers-showcase";
import { getDbData } from "@/lib/db";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const dbData = getDbData();
  const activeOffers = dbData.offers.filter((o) => o.active);

  return (
    <>
      <Hero business={dbData.business} />
      {activeOffers.length > 0 && <OffersShowcase offers={activeOffers} />}
      <CategoryShowcase categories={dbData.categories} />
      <WhyChooseUs />
      <FeaturedProducts products={dbData.products.filter((p) => p.featured)} />
      <BrandStrip business={dbData.business} />
      <Testimonials testimonials={dbData.testimonials} />
      <VisitUs business={dbData.business} />
      <CtaBanner />
    </>
  );
}
