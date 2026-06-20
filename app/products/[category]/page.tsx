import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductCatalog } from "@/components/sections/product-catalog";
import { CtaBanner } from "@/components/sections/cta-banner";
import { getDbData } from "@/lib/db";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { category: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const dbData = getDbData();
  const category = dbData.categories.find((c) => c.slug === params.category);
  if (!category) return { title: "Category Not Found" };
  return {
    title: category.name,
    description: `${category.description} Shop ${category.name.toLowerCase()} at Rohit Furnitures, Salem.`,
    alternates: { canonical: `/products/${category.slug}` },
  };
}

export default function CategoryPage({ params }: PageProps) {
  const dbData = getDbData();
  const category = dbData.categories.find((c) => c.slug === params.category);
  if (!category) notFound();

  return (
    <>
      <header className="bg-cream-200 border-b border-terracotta/20 pb-12 pt-28 md:pt-36">
        <div className="container-section">
          <p className="text-sm font-semibold uppercase tracking-wider text-terracotta">
            Collection
          </p>
          <h1 className="mt-2 text-3xl font-bold text-charcoal sm:text-4xl">
            {category.name}
          </h1>
          <p className="mt-3 max-w-2xl text-charcoal-light">{category.description}</p>
        </div>
      </header>

      <section className="container-section py-10 md:py-12">
        <ProductCatalog 
          initialCategory={category.slug} 
          initialProducts={dbData.products}
          initialCategories={dbData.categories}
        />
      </section>

      <CtaBanner />
    </>
  );
}
