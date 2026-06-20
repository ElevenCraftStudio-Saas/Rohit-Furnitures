import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/validation/contact";
import { business } from "@/lib/data/business";

/**
 * Contact form handler.
 *
 * The site's contact form uses a WhatsApp redirect by default, so this route
 * is OPTIONAL. To email the owner on submit instead/as well:
 *   1. npm i resend   (already installed)
 *   2. Add RESEND_API_KEY and CONTACT_TO_EMAIL to your environment (.env.local / Vercel).
 *   3. Uncomment Option B in components/sections/contact-form.tsx.
 *   4. Uncomment the Resend block below.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // ── Email via Resend (commented until configured) ──────────────────────
  //
  // import { Resend } from "resend";
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // try {
  //   await resend.emails.send({
  //     from: "Rohit Furnitures <onboarding@resend.dev>", // change to a verified domain
  //     to: process.env.CONTACT_TO_EMAIL ?? business.email,
  //     replyTo: data.email || undefined,
  //     subject: `New website enquiry from ${data.name}`,
  //     text: [
  //       `Name: ${data.name}`,
  //       `Phone: ${data.phone}`,
  //       data.email ? `Email: ${data.email}` : "",
  //       data.category ? `Category: ${data.category}` : "",
  //       "",
  //       data.message,
  //     ]
  //       .filter(Boolean)
  //       .join("\n"),
  //   });
  // } catch (err) {
  //   console.error("Resend error", err);
  //   return NextResponse.json({ error: "Email failed" }, { status: 502 });
  // }

  // For now we just acknowledge — log so it's visible in dev.
  console.info("Contact enquiry received:", data, "→", business.email);

  return NextResponse.json({ ok: true });
}
