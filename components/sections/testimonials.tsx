"use client";

import { Quote } from "lucide-react";

import type { Testimonial } from "@/types";
import { SectionHeading } from "@/components/shared/section-heading";
import { StarRating } from "@/components/shared/star-rating";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-terracotta/20 bg-cream-100 backdrop-blur p-6 shadow-md transition-all hover:shadow-[0_0_15px_rgba(107,79,58,0.15)] hover:border-terracotta/40">
      <Quote className="h-8 w-8 text-terracotta" aria-hidden="true" />
      <StarRating rating={t.rating} className="mt-3 text-terracotta" />
      <blockquote className="mt-4 flex-1 text-charcoal-light">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-5">
        <p className="font-semibold text-charcoal">{t.name}</p>
        <p className="text-sm text-charcoal-light">
          {t.location ? `${t.location} · ` : ""}
          {t.date}
        </p>
      </figcaption>
    </figure>
  );
}

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="bg-cream-200/50 border-y border-terracotta/10 py-16 md:py-24">
      <div className="container-section">
        <SectionHeading
          eyebrow="Customer Stories"
          title="What Our Customers Say"
          description="Real words from people who shopped with us in Salem."
        />

        {/* Desktop grid */}
        <div className="mt-12 hidden gap-6 md:grid md:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} t={t} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="mt-12 md:hidden">
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {testimonials.map((t) => (
                <CarouselItem key={t.id} className="basis-[85%]">
                  <TestimonialCard t={t} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
