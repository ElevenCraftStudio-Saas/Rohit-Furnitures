import { z } from "zod";

import { categories } from "@/lib/data/categories";

const categorySlugs = categories.map((c) => c.slug) as [string, ...string[]];

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z
    .string()
    .regex(
      /^(\+91[-\s]?)?[6-9]\d{9}$/,
      "Enter a valid 10-digit mobile number"
    ),
  email: z
    .string()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
  category: z.enum(["", ...categorySlugs]).optional(),
  message: z.string().min(5, "Please add a short message"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
