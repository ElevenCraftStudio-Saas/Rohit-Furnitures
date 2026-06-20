import Link from "next/link";

import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/shared/contact-buttons";

export default function NotFound() {
  return (
    <div className="container-section flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-serif text-6xl font-bold text-terracotta">404</p>
      <h1 className="mt-4 font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-charcoal-muted">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you
        back to the furniture.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/">Back to Home</Link>
        </Button>
        <WhatsAppButton size="lg" />
      </div>
    </div>
  );
}
