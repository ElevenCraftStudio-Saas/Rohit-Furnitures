import {
  WhatsAppButton,
  CallButton,
} from "@/components/shared/contact-buttons";
import { FadeIn } from "@/components/shared/fade-in";

interface CtaBannerProps {
  title?: string;
  subtitle?: string;
}

export function CtaBanner({
  title = "Visiting Salem? Drop by our showroom.",
  subtitle = "Or message us now — we'll help you pick the right furniture and reply within a few hours.",
}: CtaBannerProps) {
  return (
    <section className="bg-primary text-white">
      <div className="container-section py-14 md:py-16">
        <FadeIn className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold sm:text-3xl font-serif">
              {title}
            </h2>
            <p className="mt-2 text-white/90">{subtitle}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton size="lg" />
            <CallButton
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white hover:text-charcoal hover:border-white transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
