import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

import { useAppData } from "@/components/shared/data-provider";
import { getTelLink } from "@/lib/whatsapp";

// Brand icons (lucide v1 removed Instagram/Facebook for trademark reasons).
function Instagram({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function Facebook({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const { business, categories } = useAppData();
  const dynamicTelLink = getTelLink(business.phoneTel);
  const year = 2026; // build-time constant; update yearly if not deployed via CI

  return (
    <footer className="bg-cream-200 text-charcoal-light border-t border-terracotta/20">
      <div className="container-section grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Link href="/" className="font-serif text-2xl font-bold text-charcoal">
            Rohit <span className="text-terracotta">Furnitures</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">
            {business.tagline}
          </p>
          <div className="mt-4 flex gap-3">
            {business.socialLinks.instagram && (
              <a
                href={business.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-full border border-terracotta/20 p-2 transition-all hover:bg-terracotta/10 hover:border-terracotta hover:text-terracotta"
              >
                <Instagram className="h-5 w-5" />
              </a>
            )}
            {business.socialLinks.facebook && (
              <a
                href={business.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-full border border-terracotta/20 p-2 transition-all hover:bg-terracotta/10 hover:border-terracotta hover:text-terracotta"
              >
                <Facebook className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="font-serif text-lg font-semibold text-charcoal">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-terracotta"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-serif text-lg font-semibold text-charcoal">
            Categories
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/products/${cat.slug}`}
                  className="transition-colors hover:text-terracotta"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-serif text-lg font-semibold text-charcoal">
            Visit Us
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" />
              <span>{business.address.full}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="h-5 w-5 shrink-0 text-terracotta" />
              <a href={dynamicTelLink} className="hover:text-terracotta">
                {business.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="h-5 w-5 shrink-0 text-terracotta" />
              <a
                href={`mailto:${business.email}`}
                className="break-all hover:text-terracotta"
              >
                {business.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" />
              <span>
                Open daily · {business.hours[0].hours}
                <br />
                <span className="text-xs text-charcoal-muted">
                  (Confirm timings before visiting)
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-terracotta/10">
        <div className="container-section flex flex-col items-center justify-between gap-2 py-5 text-xs text-charcoal-muted sm:flex-row">
          <p>
            © {year} {business.name}. All rights reserved.
          </p>
          <p>
            Website by{" "}
            <span className="text-charcoal-light">ElevenCraft Studio</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
