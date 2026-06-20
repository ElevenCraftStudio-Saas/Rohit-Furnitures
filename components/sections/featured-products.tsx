"use client";

import type { Product } from "@/types";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProductCard } from "@/components/shared/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="container-section py-16 md:py-24">
      <SectionHeading
        eyebrow="Handpicked"
        title="Featured Products"
        description="A few customer favourites. Tap “Enquire on WhatsApp” for current price and availability."
      />

      <div className="mt-12">
        <Carousel
          opts={{ align: "start", loop: true }}
          className="mx-auto w-full px-2 sm:px-10"
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <ProductCard
                  product={product}
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 23vw"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
