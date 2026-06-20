import type { Metadata } from "next";
import Image from "next/image";
import { Award, HandCoins, HeartHandshake, Clock4 } from "lucide-react";

import { getDbData } from "@/lib/db";
import { BLUR_DATA_URL } from "@/lib/image";
import { FadeIn } from "@/components/shared/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { CtaBanner } from "@/components/sections/cta-banner";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Rohit Furnitures — a local Salem furniture store offering quality, affordability and fast, friendly service, including genuine Nilkamal furniture.",
  alternates: { canonical: "/about" },
};

const U = (id: string, w = 600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

// Showroom gallery — REPLACE WITH REAL SHOWROOM PHOTOS.
const gallery = [
  U("1586023492125-27b2c045efd7", 800),
  U("1567016432779-094069958ea5"),
  U("1540574163026-643ea20ade25"),
  U("1493663284031-b7e3aefcae8e"),
  U("1524758631624-e2822e304c36"),
  U("1538688525198-9b88f6f53126"),
];

const values = [
  {
    icon: Award,
    title: "Quality",
    description:
      "We stock furniture built to last — genuine brands and materials we'd put in our own home.",
  },
  {
    icon: HandCoins,
    title: "Affordability",
    description:
      "Honest, competitive pricing with a best-price promise on branded furniture.",
  },
  {
    icon: HeartHandshake,
    title: "Customer Service",
    description:
      "Friendly, no-pressure help choosing the right piece for your space and budget.",
  },
  {
    icon: Clock4,
    title: "Fast Response",
    description:
      "We respond to every enquiry within 24 hours — usually much sooner on WhatsApp.",
  },
];

export default function AboutPage() {
  const dbData = getDbData();
  const business = dbData.business;

  return (
    <>
      {/* Hero */}
      <header className="bg-cream-200 border-b border-terracotta/20 pb-12 pt-28 md:pt-36">
        <div className="container-section">
          <h1 className="text-3xl font-bold text-charcoal sm:text-4xl">
            About Rohit Furnitures
          </h1>
          <p className="mt-3 max-w-2xl text-charcoal-light">
            Salem&apos;s local furniture store — honest prices, quality brands
            and service you can count on.
          </p>
        </div>
      </header>

      <section className="container-section grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <FadeIn className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-terracotta/20 shadow-sm">
          <Image
            src={U("1616486338812-3dadae4b4ace", 900)}
            alt="Furniture showroom interior"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
            Furnishing Salem homes for {business.yearsInBusiness}+ years
          </h2>
          <div className="mt-4 space-y-4 text-charcoal-light">
            <p>
              Rohit Furnitures began with a simple idea: good furniture
              shouldn&apos;t cost a fortune, and buying it shouldn&apos;t be
              complicated. From our showroom on Cherry Road, we&apos;ve helped
              families across Salem furnish their homes with pieces they love.
            </p>
            <p>
              We focus on trusted brands — including genuine Nilkamal furniture —
              and back every sale with honest advice and a fair price. Whether
              you need a single chair or a full living-room set, we&apos;re here
              to help.
            </p>
            <p className="text-xs italic text-charcoal-muted">
              (This is placeholder copy — replace with your own story, founding
              year and a personal note from the owner.)
            </p>
          </div>
        </FadeIn>
      </section>

      <section className="bg-cream-200/50 border-y border-terracotta/10 py-16 md:py-24">
        <div className="container-section">
          <SectionHeading
            eyebrow="Our Brands"
            title="Brands We Partner With"
            description="We're proud to be an authorized dealer for Nilkamal, with more trusted brands across our range."
          />
          <FadeIn className="mx-auto mt-8 max-w-2xl text-center text-charcoal-light">
            <p>
              Nilkamal is India&apos;s most trusted name in moulded furniture —
              durable, affordable and built for everyday Indian homes. Visit us
              to see the full Nilkamal range alongside our wood and upholstered
              collections.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Gallery */}
      <section className="container-section py-16 md:py-24">
        <SectionHeading
          eyebrow="Our Showroom"
          title="Take a Look Inside"
          description="A glimpse of what's on display. REPLACE WITH REAL SHOWROOM PHOTOS."
        />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {gallery.map((src, i) => (
            <FadeIn
              key={src}
              delay={i * 0.04}
              className={
                i === 0
                  ? "relative col-span-2 row-span-2 aspect-square overflow-hidden rounded-2xl border border-terracotta/20 shadow-sm md:col-span-2 transition-all duration-300 hover:border-terracotta/40 hover:shadow-[0_0_15px_rgba(107,79,58,0.15)]"
                  : "relative aspect-square overflow-hidden rounded-2xl border border-terracotta/20 shadow-sm transition-all duration-300 hover:border-terracotta/40 hover:shadow-[0_0_15px_rgba(107,79,58,0.15)]"
              }
            >
              <Image
                src={src}
                alt={`Showroom photo ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream-200/50 border-y border-terracotta/10 py-16 md:py-24">
        <div className="container-section">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Our Commitment to You"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <FadeIn key={value.title} delay={i * 0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-terracotta/20 bg-cream-100 backdrop-blur p-6 shadow-sm transition-all duration-300 hover:border-terracotta/40 hover:shadow-[0_0_15px_rgba(107,79,58,0.15)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-charcoal">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-charcoal-light">
                    {value.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
