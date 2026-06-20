"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";

import type { Product } from "@/types";
import { BLUR_DATA_URL } from "@/lib/image";
import { getWhatsappLink, waMessages } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppData } from "@/components/shared/data-provider";

interface ProductCardProps {
  product: Product;
  /** Pass sizes for correct responsive loading per layout */
  sizes?: string;
}

export function ProductCard({
  product,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
}: ProductCardProps) {
  const { categories, business } = useAppData();
  const category = categories.find((c) => c.slug === product.category);

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-terracotta/20 bg-cream-200 shadow-sm transition-all duration-300 hover:border-terracotta/40 hover:shadow-[0_4px_20px_rgba(107,79,58,0.15)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={sizes}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {category && (
          <Badge
            variant="secondary"
            className="absolute left-3 top-3 border border-terracotta/20 bg-cream-100/80 text-charcoal backdrop-blur"
          >
            {category.shortName}
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-lg font-semibold text-charcoal">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-charcoal-light">
          {product.description}
        </p>
        <p className="mt-3 text-base font-semibold text-terracotta">
          {product.priceRange}
        </p>
        <div className="mt-4 flex-1" />
        <Button asChild variant="whatsapp" className="w-full">
          <a
            href={getWhatsappLink(business.whatsapp, waMessages.product(product.name))}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-4 w-4" />
            Enquire on WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}
