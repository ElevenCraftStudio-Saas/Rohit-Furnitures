"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, MessageCircle, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { getWhatsappLink, getTelLink, waMessages } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { useAppData } from "@/components/shared/data-provider";
import { DirectionsButton } from "@/components/shared/contact-buttons";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { business } = useAppData();

  // Home has a full-bleed hero, so the navbar starts transparent there.
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !overHero;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        solid
          ? "border-b border-terracotta/20 bg-cream/95 backdrop-blur-md supports-[backdrop-filter]:bg-cream/80"
          : "bg-transparent"
      )}
    >
      <nav
        className="container-section flex h-16 items-center justify-between md:h-20"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "font-serif text-xl font-bold tracking-tight transition-colors md:text-2xl",
            solid ? "text-charcoal" : "text-white"
          )}
        >
          Rohit <span className="text-terracotta">Furnitures</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-terracotta",
                    solid ? "text-charcoal-light" : "text-white/90",
                    active && "text-terracotta font-semibold"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={getTelLink(business.phoneTel)}
            className={cn(
              "inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-terracotta",
              solid ? "text-charcoal-light" : "text-white/90"
            )}
          >
            <Phone className="h-4 w-4" />
            {business.phoneDisplay}
          </a>
          <DirectionsButton size="sm" variant={solid ? "outline" : "default"} />
          <Link
            href="/admin"
            title="Admin Dashboard"
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300",
              solid
                ? "border-terracotta/20 bg-terracotta/5 text-terracotta hover:bg-terracotta/20 hover:border-terracotta hover:shadow-[0_0_10px_rgba(107,79,58,0.2)]"
                : "border-white/20 bg-white/5 text-white hover:bg-terracotta hover:border-terracotta hover:text-white hover:shadow-[0_0_10px_rgba(107,79,58,0.3)]"
            )}
          >
            <User className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile actions & trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/admin"
            title="Admin Dashboard"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300",
              solid
                ? "border-terracotta/20 bg-terracotta/5 text-terracotta"
                : "border-white/20 bg-white/5 text-white"
            )}
          >
            <User className="h-4.5 w-4.5" />
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  solid ? "text-charcoal" : "text-white hover:bg-white/10"
                )}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
          <SheetContent side="right" className="flex w-[300px] flex-col">
            <SheetHeader>
              <SheetTitle className="font-serif text-xl">
                Rohit <span className="text-terracotta">Furnitures</span>
              </SheetTitle>
            </SheetHeader>
            <ul className="mt-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <SheetClose asChild>
                    <Link
                      href={link.href}
                      className="block rounded-lg px-3 py-3 text-base font-medium text-charcoal-light hover:bg-cream-200 hover:text-charcoal"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-3 pt-6">
              <Button asChild variant="whatsapp" size="lg">
                <a
                  href={getWhatsappLink(business.whatsapp, waMessages.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </Button>
              <Button asChild size="lg">
                <a href={getTelLink(business.phoneTel)}>
                  <Phone className="h-5 w-5" />
                  Call {business.phoneDisplay}
                </a>
              </Button>
              <p className="text-center text-xs text-slate-400">
                We reply within a few hours.
              </p>
            </div>
          </SheetContent>
        </Sheet>
        </div>
      </nav>
    </header>
  );
}
