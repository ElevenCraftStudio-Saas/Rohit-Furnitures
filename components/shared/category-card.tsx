import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Category } from "@/types";
import { BLUR_DATA_URL } from "@/lib/image";

interface CategoryCardProps {
  category: Category;
  sizes?: string;
}

export function CategoryCard({
  category,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
}: CategoryCardProps) {
  return (
    <Link
      href={`/products/${category.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-primary/10 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_15px_rgba(107,79,58,0.15)]"
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        sizes={sizes}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="font-serif text-lg font-semibold text-white">
          {category.name}
        </h3>
        <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-transform duration-300 group-hover:translate-x-1">
          Shop now <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
