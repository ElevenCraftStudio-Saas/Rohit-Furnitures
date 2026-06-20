"use client";

import React, { createContext, useContext } from "react";
import type { Business, Category, Product, Testimonial } from "@/types";
import type { Offer } from "@/lib/db";

export interface AppData {
  business: Business;
  categories: Category[];
  products: Product[];
  testimonials: Testimonial[];
  offers: Offer[];
}

const DataContext = createContext<AppData | null>(null);

export function DataProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData: AppData;
}) {
  return (
    <DataContext.Provider value={initialData}>
      {children}
    </DataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useAppData must be used within a DataProvider");
  }
  return context;
}
