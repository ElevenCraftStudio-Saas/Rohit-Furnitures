import { business } from "@/lib/data/business";

/** Build a wa.me deep link with a dynamic whatsapp number and pre-filled message. */
export function getWhatsappLink(whatsapp: string, message: string): string {
  const cleanNumber = whatsapp.replace(/\D/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/** tel: link for click-to-call with dynamic phone number. */
export function getTelLink(phoneTel: string): string {
  return `tel:${phoneTel}`;
}

/** Legacy static wa.me deep link with pre-filled message. Mapped to default static business values. */
export function whatsappLink(message: string): string {
  return getWhatsappLink(business.whatsapp, message);
}

/** Legacy static tel: link. */
export const telLink = `tel:${business.phoneTel}`;

/** Common pre-filled messages. */
export const waMessages = {
  general:
    "Hi, I'd like to know more about your furniture collection at Rohit Furnitures.",
  product: (name: string) =>
    `Hi, I'm interested in "${name}". Could you share price, availability and details?`,
  category: (name: string) =>
    `Hi, I'd like to see your ${name} options. What do you have available?`,
};
