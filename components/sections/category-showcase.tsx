import type { Category } from "@/types";
import { SectionHeading } from "@/components/shared/section-heading";
import { CategoryCard } from "@/components/shared/category-card";
import { FadeIn } from "@/components/shared/fade-in";

export function CategoryShowcase({ categories }: { categories: Category[] }) {
  return (
    <section className="container-section py-16 md:py-24">
      <SectionHeading
        eyebrow="Our Collection"
        title="Browse Our Collection"
        description="From living room to bedroom, office to outdoors — find furniture for every room and every budget."
      />
      <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-3">
        {categories.map((category, i) => (
          <FadeIn key={category.slug} delay={i * 0.05}>
            <CategoryCard
              category={category}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
            />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
