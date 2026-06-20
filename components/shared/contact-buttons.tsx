"use client";

import { Phone, MessageCircle, MapPin } from "lucide-react";

import { useAppData } from "@/components/shared/data-provider";
import { getWhatsappLink, getTelLink, waMessages } from "@/lib/whatsapp";
import { Button, type ButtonProps } from "@/components/ui/button";

type SharedProps = {
  size?: ButtonProps["size"];
  className?: string;
  message?: string;
};

export function WhatsAppButton({
  size = "default",
  className,
  message = waMessages.general,
}: SharedProps) {
  const { business } = useAppData();
  return (
    <Button asChild variant="whatsapp" size={size} className={className}>
      <a
        href={getWhatsappLink(business.whatsapp, message)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle className="h-4 w-4" />
        Chat on WhatsApp
      </a>
    </Button>
  );
}

export function CallButton({
  size = "default",
  className,
  variant = "outline",
}: SharedProps & { variant?: ButtonProps["variant"] }) {
  const { business } = useAppData();
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={getTelLink(business.phoneTel)}>
        <Phone className="h-4 w-4" />
        Call Now
      </a>
    </Button>
  );
}

export function DirectionsButton({
  size = "default",
  className,
  variant = "outline",
}: SharedProps & { variant?: ButtonProps["variant"] }) {
  const { business } = useAppData();
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer">
        <MapPin className="h-4 w-4" />
        Get Directions
      </a>
    </Button>
  );
}
