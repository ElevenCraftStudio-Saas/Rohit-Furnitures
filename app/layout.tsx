import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

import { LocalBusinessJsonLd } from "@/components/shared/json-ld";
import { Toaster } from "@/components/ui/sonner";
import { getDbData } from "@/lib/db";
import { DataProvider } from "@/components/shared/data-provider";
import { StorefrontLayoutWrapper } from "@/components/shared/storefront-layout-wrapper";

export const dynamic = "force-dynamic";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://rohitfurnitures.example.com";

export async function generateMetadata(): Promise<Metadata> {
  const dbData = getDbData();
  const business = dbData.business;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${business.name} — Quality Furniture in Salem`,
      template: `%s | ${business.name}`,
    },
    description:
      `${business.name}, Salem — sofas, beds, dining sets, office and genuine Nilkamal furniture at honest prices. Visit our Cherry Road showroom or message us on WhatsApp for a fast reply.`,
    keywords: [
      "furniture Salem",
      "Nilkamal Salem",
      "sofa Salem",
      "furniture store Cherry Road",
      business.name,
    ],
    authors: [{ name: business.name }],
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: SITE_URL,
      siteName: business.name,
      title: `${business.name} — Quality Furniture in Salem`,
      description:
        "Sofas, beds, dining, office and Nilkamal furniture at honest prices. Salem's local furniture store.",
    },
    twitter: {
      card: "summary_large_image",
      title: `${business.name} — Quality Furniture in Salem`,
      description:
        "Sofas, beds, dining, office and Nilkamal furniture at honest prices.",
    },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const dbData = getDbData();
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${manrope.variable} flex min-h-screen flex-col pb-16 md:pb-0 bg-cream text-charcoal`}
      >
        <LocalBusinessJsonLd business={dbData.business} />
        <DataProvider initialData={dbData}>
          <StorefrontLayoutWrapper>
            <main className="flex-1">{children}</main>
          </StorefrontLayoutWrapper>
        </DataProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
