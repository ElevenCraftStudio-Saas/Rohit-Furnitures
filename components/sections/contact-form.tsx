"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Send } from "lucide-react";

import { contactSchema, type ContactFormValues } from "@/lib/validation/contact";
import { getWhatsappLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppData } from "@/components/shared/data-provider";

export function ContactForm() {
  const { categories, business } = useAppData();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", phone: "", email: "", category: "", message: "" },
  });

  const category = watch("category");

  const buildMessage = (v: ContactFormValues): string => {
    const cat = v.category ? categories.find((c) => c.slug === v.category)?.name : undefined;
    return [
      "Hi Rohit Furnitures, I'd like to enquire.",
      `Name: ${v.name}`,
      `Phone: ${v.phone}`,
      v.email ? `Email: ${v.email}` : null,
      cat ? `Interested in: ${cat}` : null,
      `Message: ${v.message}`,
    ]
      .filter(Boolean)
      .join("\n");
  };

  const onSubmit = async (values: ContactFormValues) => {
    const url = getWhatsappLink(business.whatsapp, buildMessage(values));
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp", {
      description: "Send the message to reach us — we reply within a few hours.",
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">
            Name <span className="text-destructive">*</span>
          </Label>
          <Input 
            id="name" 
            placeholder="Your name" 
            className="bg-cream-100 border-terracotta/20 text-charcoal" 
            {...register("name")} 
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">
            Phone <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            placeholder="10-digit mobile number"
            className="bg-cream-100 border-terracotta/20 text-charcoal"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email (optional)</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="bg-cream-100 border-terracotta/20 text-charcoal"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="category">Interested in</Label>
          <Select
            value={category || ""}
            onValueChange={(v) =>
              setValue("category", v as ContactFormValues["category"], {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger id="category" className="bg-cream-100 border-terracotta/20 text-charcoal">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-cream-100 border-terracotta/20 text-charcoal">
              {categories.map((cat) => (
                <SelectItem key={cat.slug} value={cat.slug}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">
          Message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Tell us what you're looking for…"
          className="bg-cream-100 border-terracotta/20 text-charcoal"
          {...register("message")}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        variant="whatsapp"
        className="w-full"
        disabled={isSubmitting}
      >
        <Send className="h-4 w-4" />
        Send via WhatsApp
      </Button>
      <p className="text-center text-xs text-charcoal-muted">
        We reply within a few hours during business hours.
      </p>
    </form>
  );
}
