# Rohit Furnitures — Website

Modern, mobile-first website for **Rohit Furnitures**, a furniture store in Salem, Tamil Nadu.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **Framer Motion**, and **react-hook-form + zod**.

## Getting started

```bash
git clone https://github.com/blackcommando5/rohit-furnitures.git
cd rohit-furnitures
npm install
cp .env.example .env.local   # then edit values
npm run dev                  # http://localhost:3000
```

Build / production:

```bash
npm run build
npm run start
```

## Project structure

```
app/                     Routes (App Router)
  page.tsx               Home
  products/              Catalog + /products/[category]
  about/                 About
  contact/               Contact
  api/contact/           Contact form handler (optional email path)
  sitemap.ts robots.ts   Auto-generated SEO files
  opengraph-image.tsx    Dynamic social share image
components/
  ui/                    shadcn/ui primitives
  sections/              Page sections (Hero, Catalog, ContactForm, …)
  shared/                Navbar, Footer, cards, buttons, JSON-LD
lib/
  data/                  ← EDIT THESE to update content (see below)
  whatsapp.ts            wa.me / tel: link helpers
  validation/            zod schemas
types/                   Shared TypeScript types
```

## Editing content (no coding needed)

All site content lives in `lib/data/`:

| File              | What it controls                                        |
| ----------------- | ------------------------------------------------------- |
| `business.ts`     | Name, phone, address, hours, map, social, brands, years |
| `products.ts`     | Product catalogue + which are `featured`                |
| `categories.ts`   | Product categories (also drives URLs + filters)         |
| `testimonials.ts` | Customer reviews                                        |

Search the code for **`CONFIRM WITH OWNER`** and **`REPLACE WITH REAL`** for
placeholders to update before/after launch (hours, coordinates, email, socials,
showroom photos, reviews).

## Contact form

By default the form opens **WhatsApp** with the enquiry pre-filled — no backend
needed. To email the owner instead, set `RESEND_API_KEY` + `CONTACT_TO_EMAIL`
and uncomment Option B in `components/sections/contact-form.tsx` and the Resend
block in `app/api/contact/route.ts`.

## Images

Placeholder photos load from Unsplash (`images.unsplash.com`, allow-listed in
`next.config.mjs`). Replace with real product/showroom photos by updating the
`image` URLs in the data files, or drop files in `/public` and point to them.

## Deploy

Optimised for **Vercel**. Set `NEXT_PUBLIC_SITE_URL` (and Resend vars if used)
in the project's environment variables.

## Push to GitHub

Repo is committed locally on the `main` branch. To publish under
[github.com/blackcommando5](https://github.com/blackcommando5):

```bash
# 1. Create an empty repo named "rohit-furnitures" on GitHub (no README/.gitignore).
# 2. Add the remote and push:
git remote add origin https://github.com/blackcommando5/rohit-furnitures.git
git push -u origin main
```

Or with the GitHub CLI in one step:

```bash
gh repo create blackcommando5/rohit-furnitures --public --source=. --remote=origin --push
```

---

Website by **ElevenCraft Studio**.
