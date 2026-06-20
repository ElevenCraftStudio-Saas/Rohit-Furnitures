import type { Metadata } from "next";

import { ProductCatalog } from "@/components/sections/product-catalog";
import { CtaBanner } from "@/components/sections/cta-banner";
import { getDbData } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Furniture Collection",
  description:
    "Browse sofas, beds, wardrobes, dining sets, office furniture and genuine Nilkamal products at Rohit Furnitures, Salem. Enquire on WhatsApp for prices.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  const dbData = getDbData();

  return (
    <>
      <header className="bg-cream-200 border-b border-terracotta/20 pb-12 pt-28 md:pt-36">
        <div className="container-section">
          <h1 className="text-3xl font-bold text-charcoal sm:text-4xl">
            Our Collection
          </h1>
          <p className="mt-3 max-w-2xl text-charcoal-light">
            Quality furniture for every room and budget. Found something you
            like? Tap “Enquire on WhatsApp” for the latest price and
            availability — we reply fast.
          </p>
        </div>
      </header>

      <section className="container-section py-10 md:py-12">
        <ProductCatalog 
          initialProducts={dbData.products} 
          initialCategories={dbData.categories} 
        />
      </section>

      <CtaBanner />
    </>
  );
}
