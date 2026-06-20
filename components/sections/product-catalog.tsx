"use client";

import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";

import type { CategorySlug, Category, Product } from "@/types";
import { cn } from "@/lib/utils";
import { getWhatsappLink, waMessages } from "@/lib/whatsapp";
import { ProductCard } from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppData } from "@/components/shared/data-provider";

type SortKey = "featured" | "price-asc" | "price-desc";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

/** Pull the first rupee number out of a "₹8,000 – ₹15,000" string for sorting. */
function priceFloor(priceRange: string): number {
  const digits = priceRange.replace(/[^\d–-]/g, "").split(/[–-]/)[0];
  return Number(digits) || 0;
}

const PAGE_SIZE = 8;

interface ProductCatalogProps {
  initialCategory?: CategorySlug;
  initialProducts: Product[];
  initialCategories: Category[];
}

export function ProductCatalog({
  initialCategory,
  initialProducts,
  initialCategories,
}: ProductCatalogProps) {
  const [active, setActive] = useState<CategorySlug | "all">(
    initialCategory ?? "all"
  );
  const [sort, setSort] = useState<SortKey>("featured");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const list =
      active === "all"
        ? [...initialProducts]
        : initialProducts.filter((p) => p.category === active);

    if (sort === "price-asc") {
      list.sort((a, b) => priceFloor(a.priceRange) - priceFloor(b.priceRange));
    } else if (sort === "price-desc") {
      list.sort((a, b) => priceFloor(b.priceRange) - priceFloor(a.priceRange));
    } else {
      list.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  }, [active, sort, initialProducts]);

  const shown = filtered.slice(0, visible);

  const selectCategory = (slug: CategorySlug | "all") => {
    setActive(slug);
    setVisible(PAGE_SIZE);
  };

  return (
    <div>
      {/* Sticky filter bar */}
      <div className="sticky top-16 z-30 -mx-4 mb-8 border-y border-terracotta/20 bg-cream/95 px-4 py-3 backdrop-blur-md md:top-20">
        <div className="container-section flex flex-col gap-3 px-0 lg:flex-row lg:items-center lg:justify-between">
          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              onClick={() => selectCategory("all")}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold transition-all duration-300",
                active === "all"
                  ? "border-terracotta bg-terracotta text-white shadow-[0_0_10px_rgba(107,79,58,0.3)]"
                  : "border-terracotta/20 bg-cream-200 text-charcoal hover:border-terracotta/50"
              )}
            >
              All
            </button>
            {initialCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => selectCategory(cat.slug)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold transition-all duration-300",
                  active === cat.slug
                    ? "border-terracotta bg-terracotta text-white shadow-[0_0_10px_rgba(107,79,58,0.3)]"
                    : "border-terracotta/20 bg-cream-200 text-charcoal hover:border-terracotta/50"
                )}
              >
                {cat.shortName}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-charcoal-light">Sort:</span>
            <Select
              value={sort}
              onValueChange={(v) => setSort(v as SortKey)}
            >
              <SelectTrigger className="w-[180px] bg-cream-100 border-terracotta/20 text-charcoal">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-cream-100 border-terracotta/20 text-charcoal">
                {sortOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Grid */}
      {shown.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {shown.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {visible < filtered.length && (
            <div className="mt-10 flex justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
              >
                Load More
              </Button>
            </div>
          )}
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

function EmptyState() {
  const { business } = useAppData();
  return (
    <div className="rounded-2xl border border-dashed border-terracotta/25 bg-cream-200 p-10 text-center">
      <h3 className="font-serif text-xl font-semibold text-charcoal">
        Nothing listed here yet
      </h3>
      <p className="mx-auto mt-2 max-w-md text-charcoal-light">
        We carry more than what&apos;s shown online. Tell us what you&apos;re
        looking for and we&apos;ll share options and prices right away.
      </p>
      <Button asChild variant="whatsapp" className="mt-6">
        <a
          href={getWhatsappLink(business.whatsapp, waMessages.general)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle className="h-4 w-4" />
          Ask us directly
        </a>
      </Button>
    </div>
  );
}
