"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Package,
  Folders,
  Megaphone,
  Quote,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Upload,
  Loader2,
  Check,
  X,
  PlusCircle,
  Eye,
  Building,
} from "lucide-react";
import Link from "next/link";
import type { DbSchema, Offer } from "@/lib/db";
import type { Product, Category, Testimonial, Business } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type TabId = "dashboard" | "products" | "categories" | "offers" | "testimonials" | "settings";

export function AdminDashboardClient({ initialData }: { initialData: DbSchema }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [db, setDb] = useState<DbSchema>(initialData);
  const [saving, setSaving] = useState(false);

  // Form states for NEW items
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    category: "sofas",
    priceRange: "₹10,000 – ₹20,000",
    image: "",
    description: "",
    featured: false,
  });

  const [newOffer, setNewOffer] = useState<Partial<Offer>>({
    title: "",
    description: "",
    badge: "Limited Time",
    code: "",
    active: true,
  });

  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({
    name: "",
    quote: "",
    rating: 5,
    date: "Customer Review",
    location: "Salem",
  });

  // Edit items modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  // File uploading states
  const [uploadingImage, setUploadingImage] = useState(false);

  // Save changes to database API
  const persistDb = async (updatedDb: DbSchema) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedDb),
      });
      if (res.ok) {
        setDb(updatedDb);
        toast.success("Changes saved successfully");
        router.refresh();
      } else {
        toast.error("Failed to save changes");
      }
    } catch {
      toast.error("Error connecting to server");
    } finally {
      setSaving(false);
    }
  };

  // Sign out handler
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        toast.success("Logged out successfully");
        router.refresh();
        router.push("/admin/login");
      }
    } catch {
      toast.error("Error signing out");
    }
  };

  // Image Upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploadingImage(true);
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        callback(data.url);
        toast.success("Image uploaded successfully");
      } else {
        toast.error(data.error || "Upload failed");
      }
    } catch {
      toast.error("Upload error");
    } finally {
      setUploadingImage(false);
    }
  };

  // CRUD ops for Products
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.description || !newProduct.image) {
      toast.error("Please fill in name, description, and upload/set image.");
      return;
    }
    const id = newProduct.name.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now();
    const productToAdd: Product = {
      id,
      name: newProduct.name,
      category: newProduct.category || "sofas",
      priceRange: newProduct.priceRange || "₹10,000 – ₹20,000",
      image: newProduct.image,
      description: newProduct.description,
      featured: !!newProduct.featured,
    };

    const updated = { ...db, products: [productToAdd, ...db.products] };
    persistDb(updated);

    // Reset Form
    setNewProduct({
      name: "",
      category: "sofas",
      priceRange: "₹10,000 – ₹20,000",
      image: "",
      description: "",
      featured: false,
    });
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;
    const updatedProducts = db.products.map((p) =>
      p.id === editingProduct.id ? editingProduct : p
    );
    const updated = { ...db, products: updatedProducts };
    persistDb(updated);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const updated = { ...db, products: db.products.filter((p) => p.id !== id) };
    persistDb(updated);
  };

  // CRUD ops for Offers
  const handleAddOffer = () => {
    if (!newOffer.title || !newOffer.description) {
      toast.error("Please fill in title and description.");
      return;
    }
    const id = "offer-" + Date.now();
    const offerToAdd: Offer = {
      id,
      title: newOffer.title,
      description: newOffer.description,
      badge: newOffer.badge || "Special Offer",
      code: newOffer.code,
      active: !!newOffer.active,
    };

    const updated = { ...db, offers: [offerToAdd, ...db.offers] };
    persistDb(updated);
    setNewOffer({ title: "", description: "", badge: "Limited Time", code: "", active: true });
  };

  const handleUpdateOffer = () => {
    if (!editingOffer) return;
    const updated = {
      ...db,
      offers: db.offers.map((o) => (o.id === editingOffer.id ? editingOffer : o)),
    };
    persistDb(updated);
    setEditingOffer(null);
  };

  const handleDeleteOffer = (id: string) => {
    if (!confirm("Are you sure you want to delete this offer?")) return;
    const updated = { ...db, offers: db.offers.filter((o) => o.id !== id) };
    persistDb(updated);
  };

  // CRUD ops for Testimonials
  const handleAddTestimonial = () => {
    if (!newTestimonial.name || !newTestimonial.quote) {
      toast.error("Please fill in customer name and testimonial quote.");
      return;
    }
    const id = "review-" + Date.now();
    const testimonialToAdd: Testimonial = {
      id,
      name: newTestimonial.name,
      quote: newTestimonial.quote,
      rating: newTestimonial.rating || 5,
      date: newTestimonial.date || "Google Review",
      location: newTestimonial.location || "Salem",
    };

    const updated = { ...db, testimonials: [...db.testimonials, testimonialToAdd] };
    persistDb(updated);
    setNewTestimonial({ name: "", quote: "", rating: 5, date: "Customer Review", location: "Salem" });
  };

  const handleUpdateTestimonial = () => {
    if (!editingTestimonial) return;
    const updated = {
      ...db,
      testimonials: db.testimonials.map((t) => (t.id === editingTestimonial.id ? editingTestimonial : t)),
    };
    persistDb(updated);
    setEditingTestimonial(null);
  };

  const handleDeleteTestimonial = (id: string) => {
    if (!confirm("Are you sure you want to delete this customer quote?")) return;
    const updated = { ...db, testimonials: db.testimonials.filter((t) => t.id !== id) };
    persistDb(updated);
  };

  // Update Category Handler
  const handleUpdateCategory = () => {
    if (!editingCategory) return;
    const updated = {
      ...db,
      categories: db.categories.map((c) => (c.slug === editingCategory.slug ? editingCategory : c)),
    };
    persistDb(updated);
    setEditingCategory(null);
  };

  // Update Business Settings
  const handleUpdateBusiness = (field: keyof Business, value: Business[keyof Business]) => {
    const updated = {
      ...db,
      business: { ...db.business, [field]: value },
    };
    setDb(updated);
  };

  const handleSaveBusiness = () => {
    persistDb(db);
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "categories", label: "Categories", icon: Folders },
    { id: "offers", label: "Promo Offers", icon: Megaphone },
    { id: "testimonials", label: "Testimonials", icon: Quote },
    { id: "settings", label: "Business Details", icon: Settings },
  ] as const;

  return (
    <div className="flex min-h-screen bg-cream text-charcoal">
      {/* Sidebar Panel */}
      <aside className="w-64 bg-cream-200 border-r border-terracotta/20 flex flex-col shrink-0">
        <div className="p-6 border-b border-terracotta/20 flex items-center justify-between">
          <span className="font-serif text-lg font-bold">
            Rohit <span className="text-terracotta font-semibold">Admin</span>
          </span>
          {saving && <Loader2 className="h-4 w-4 animate-spin text-terracotta" />}
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => {
            const ActiveIcon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  active
                    ? "bg-terracotta text-white shadow-[0_0_15px_rgba(107,79,58,0.2)] font-bold"
                    : "text-charcoal-light hover:text-charcoal hover:bg-cream-300/50"
                }`}
              >
                <ActiveIcon className="h-4 w-4 shrink-0" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-terracotta/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Console Content */}
      <main className="flex-1 p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {/* TABS CONSOLE PANEL */}

        {/* 1. DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-fade-up">
            <div>
              <h1 className="text-3xl font-bold font-serif">Dashboard Overview</h1>
              <p className="text-charcoal-light mt-2">Welcome to Rohit Furnitures management console.</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="p-6 rounded-2xl border border-terracotta/20 bg-cream-200 flex items-center gap-4">
                <div className="p-3 bg-terracotta/10 rounded-xl text-terracotta"><Package className="h-6 w-6" /></div>
                <div>
                  <div className="text-2xl font-bold font-mono">{db.products.length}</div>
                  <div className="text-xs text-charcoal-light font-semibold">Total Products</div>
                </div>
              </div>
              <div className="p-6 rounded-2xl border border-terracotta/20 bg-cream-200 flex items-center gap-4">
                <div className="p-3 bg-terracotta/10 rounded-xl text-terracotta"><Folders className="h-6 w-6" /></div>
                <div>
                  <div className="text-2xl font-bold font-mono">{db.categories.length}</div>
                  <div className="text-xs text-charcoal-light font-semibold">Active Categories</div>
                </div>
              </div>
              <div className="p-6 rounded-2xl border border-terracotta/20 bg-cream-200 flex items-center gap-4">
                <div className="p-3 bg-terracotta/10 rounded-xl text-terracotta"><Megaphone className="h-6 w-6" /></div>
                <div>
                  <div className="text-2xl font-bold font-mono">{db.offers.length}</div>
                  <div className="text-xs text-charcoal-light font-semibold">Promo Banners</div>
                </div>
              </div>
              <div className="p-6 rounded-2xl border border-terracotta/20 bg-cream-200 flex items-center gap-4">
                <div className="p-3 bg-terracotta/10 rounded-xl text-terracotta"><Quote className="h-6 w-6" /></div>
                <div>
                  <div className="text-2xl font-bold font-mono">{db.testimonials.length}</div>
                  <div className="text-xs text-charcoal-light font-semibold">Customer Reviews</div>
                </div>
              </div>
            </div>

            {/* Showcase details */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 rounded-2xl border border-terracotta/20 bg-cream-200">
                <h2 className="text-xl font-bold font-serif flex items-center gap-2 mb-4"><Building className="h-5 w-5 text-terracotta" /> Store Identity</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-terracotta/10 pb-2"><span className="text-charcoal-light">Name</span><span>{db.business.name}</span></div>
                  <div className="flex justify-between border-b border-terracotta/10 pb-2"><span className="text-charcoal-light">WhatsApp</span><span>{db.business.phoneDisplay}</span></div>
                  <div className="flex justify-between border-b border-terracotta/10 pb-2"><span className="text-charcoal-light">Salem Store Timings</span><span>{db.business.hours[0].hours}</span></div>
                  <div className="flex justify-between pb-1"><span className="text-charcoal-light">Address</span><span className="text-right text-xs truncate max-w-xs">{db.business.address.line1}</span></div>
                </div>
              </div>
              
              <div className="p-6 rounded-2xl border border-terracotta/20 bg-cream-200 flex flex-col justify-center items-center text-center">
                <h2 className="text-lg font-bold font-serif mb-2 text-terracotta">Need to view storefront?</h2>
                <p className="text-xs text-charcoal-light mb-4 max-w-xs">Open your website page in another browser tab to view all changes in real time.</p>
                <Link href="/" target="_blank" className="inline-flex items-center gap-2 px-5 py-2.5 bg-terracotta text-white font-bold rounded-full shadow hover:bg-terracotta/90 transition-all">
                  <Eye className="h-4 w-4" /> Go to Website
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 2. PRODUCTS MANAGER */}
        {activeTab === "products" && (
          <div className="space-y-8 animate-fade-up">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold font-serif">Products Catalog</h1>
                <p className="text-charcoal-light mt-2">Create, edit, and delete furniture items in your collection.</p>
              </div>
            </div>

            {/* Add New Product Block */}
            <div className="p-6 rounded-2xl border border-terracotta/20 bg-cream-200">
              <h2 className="text-xl font-bold font-serif mb-4 flex items-center gap-2 text-terracotta"><Plus className="h-5 w-5" /> Add New Furniture Item</h2>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="prod-name">Name</Label>
                  <Input
                    id="prod-name"
                    value={newProduct.name || ""}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="bg-cream-100 border-terracotta/20"
                    placeholder="E.g., 3-Seater Fabric Sofa"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prod-category">Category</Label>
                  <select
                    id="prod-category"
                    value={newProduct.category || ""}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full h-11 px-3 rounded-md bg-cream-100 border border-terracotta/20 text-charcoal focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {db.categories.map((cat) => (
                      <option key={cat.slug} value={cat.slug} className="bg-cream-100 text-charcoal">
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prod-price">Price Range</Label>
                  <Input
                    id="prod-price"
                    value={newProduct.priceRange || ""}
                    onChange={(e) => setNewProduct({ ...newProduct, priceRange: e.target.value })}
                    className="bg-cream-100 border-terracotta/20"
                    placeholder="E.g., ₹18,000 – ₹32,000"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="prod-desc">Description</Label>
                  <Textarea
                    id="prod-desc"
                    value={newProduct.description || ""}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="bg-cream-100 border-terracotta/20"
                    placeholder="Describe material, dimensions, comfort etc."
                  />
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Product Showcase Image</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Input
                          type="file"
                          accept="image/*"
                          id="image-uploader"
                          className="hidden"
                          onChange={(e) =>
                            handleImageUpload(e, (url) => setNewProduct({ ...newProduct, image: url }))
                          }
                          disabled={uploadingImage}
                        />
                        <label
                          htmlFor="image-uploader"
                          className="flex items-center justify-center gap-2 w-full h-11 px-4 border border-dashed border-terracotta/40 rounded-md cursor-pointer hover:bg-cream-300/30 hover:border-terracotta transition-all text-xs font-semibold text-charcoal-light"
                        >
                          {uploadingImage ? (
                            <Loader2 className="h-4 w-4 animate-spin text-terracotta" />
                          ) : (
                            <Upload className="h-4 w-4 text-terracotta" />
                          )}
                          Upload File
                        </label>
                      </div>
                      <Input
                        value={newProduct.image || ""}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        placeholder="Or paste image URL"
                        className="bg-cream-100 border-terracotta/20 h-11"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      id="prod-featured"
                      checked={!!newProduct.featured}
                      onChange={(e) => setNewProduct({ ...newProduct, featured: e.target.checked })}
                      className="rounded border-terracotta/20 bg-cream-100 text-terracotta focus:ring-0 h-4 w-4 accent-terracotta"
                    />
                    <Label htmlFor="prod-featured" className="cursor-pointer select-none">
                      Feature on Homepage Carousel
                    </Label>
                  </div>
                </div>
              </div>

              {newProduct.image && (
                <div className="mt-4 flex items-center gap-3 bg-cream-100 p-3 rounded-lg border border-terracotta/10 w-fit">
                  <div className="relative h-10 w-10 overflow-hidden rounded">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={newProduct.image} alt="Preview" className="object-cover h-10 w-10" />
                  </div>
                  <span className="text-xs text-charcoal-light font-mono truncate max-w-[200px]">
                    {newProduct.image}
                  </span>
                  <button onClick={() => setNewProduct({ ...newProduct, image: "" })} className="text-rose-400 hover:text-rose-300">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              <Button onClick={handleAddProduct} className="mt-6 flex items-center gap-2 font-semibold">
                <PlusCircle className="h-4 w-4" /> Add Product to Catalog
              </Button>
            </div>

            {/* Product Table List */}
            <div className="rounded-2xl border border-terracotta/20 bg-cream-200 overflow-hidden">
              <div className="p-6 border-b border-terracotta/20">
                <h2 className="text-xl font-bold font-serif">Active Products List ({db.products.length})</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-cream-100 text-charcoal-light text-xs uppercase font-semibold">
                    <tr>
                      <th className="p-4">Image</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price Range</th>
                      <th className="p-4">Featured</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/10">
                    {db.products.map((p) => (
                      <tr key={p.id} className="hover:bg-cream-300/30 transition-colors">
                        <td className="p-4">
                          <div className="relative h-12 w-16 overflow-hidden rounded-md border border-terracotta/10">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={p.image} alt={p.name} className="object-cover h-12 w-16" />
                          </div>
                        </td>
                        <td className="p-4 font-bold">{p.name}</td>
                        <td className="p-4 text-xs font-semibold capitalize text-charcoal-light">
                          {p.category}
                        </td>
                        <td className="p-4 text-terracotta font-semibold">{p.priceRange}</td>
                        <td className="p-4">
                          {p.featured ? (
                            <span className="inline-flex items-center gap-1 rounded bg-terracotta/10 border border-terracotta/20 px-2 py-0.5 text-xs text-terracotta font-semibold">
                              <Check className="h-3 w-3" /> Yes
                            </span>
                          ) : (
                            <span className="text-charcoal-muted text-xs">No</span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => setEditingProduct(p)}
                              className="p-2 text-charcoal-light hover:text-terracotta hover:bg-terracotta/10 rounded-lg transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. CATEGORIES MANAGER */}
        {activeTab === "categories" && (
          <div className="space-y-8 animate-fade-up">
            <div>
              <h1 className="text-3xl font-bold font-serif">Categories Showcase</h1>
              <p className="text-charcoal-light mt-2">Manage descriptions and images for the main furniture showcase cards.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {db.categories.map((cat) => (
                <div key={cat.slug} className="p-6 rounded-2xl border border-terracotta/20 bg-cream-200 flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-4 border border-terracotta/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={cat.image} alt={cat.name} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-lg font-bold">{cat.name}</h3>
                      <span className="text-xs bg-terracotta/10 text-terracotta border border-terracotta/20 px-2 py-0.5 rounded font-mono font-semibold">
                        /{cat.slug}
                      </span>
                    </div>
                    <p className="text-charcoal-light mt-2 text-xs leading-relaxed">{cat.description}</p>
                  </div>
                  <Button
                    onClick={() => setEditingCategory(cat)}
                    className="mt-6 font-semibold flex items-center justify-center gap-2"
                  >
                    <Edit className="h-4 w-4" /> Edit Category Info
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. PROMO OFFERS MANAGER */}
        {activeTab === "offers" && (
          <div className="space-y-8 animate-fade-up">
            <div>
              <h1 className="text-3xl font-bold font-serif">Promo Offers & Banners</h1>
              <p className="text-charcoal-light mt-2">Add or toggle advertising banners displaying active showroom deals.</p>
            </div>

            {/* Add New Offer Block */}
            <div className="p-6 rounded-2xl border border-terracotta/20 bg-cream-200">
              <h2 className="text-xl font-bold font-serif mb-4 flex items-center gap-2 text-terracotta"><Plus className="h-5 w-5" /> Add New Promo Deal</h2>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="off-title">Offer Title</Label>
                  <Input
                    id="off-title"
                    value={newOffer.title || ""}
                    onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                    className="bg-cream-100 border-terracotta/20"
                    placeholder="E.g., Inaugural Showroom Launch!"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="off-badge">Promo Tag Badge</Label>
                  <Input
                    id="off-badge"
                    value={newOffer.badge || ""}
                    onChange={(e) => setNewOffer({ ...newOffer, badge: e.target.value })}
                    className="bg-cream-100 border-terracotta/20"
                    placeholder="E.g., Limited Time, Launch Deal"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="off-code">Promo Code (Optional)</Label>
                  <Input
                    id="off-code"
                    value={newOffer.code || ""}
                    onChange={(e) => setNewOffer({ ...newOffer, code: e.target.value })}
                    className="bg-cream-100 border-terracotta/20 cursor-text font-mono"
                    placeholder="E.g., LAUNCH20"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="off-desc">Offer details / Terms</Label>
                  <Textarea
                    id="off-desc"
                    value={newOffer.description || ""}
                    onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                    className="bg-cream-100 border-terracotta/20"
                    placeholder="Describe details: 'Up to 20% off on all fabrics' etc."
                  />
                </div>

                <div className="flex items-center gap-2 mt-8">
                  <input
                    type="checkbox"
                    id="off-active"
                    checked={!!newOffer.active}
                    onChange={(e) => setNewOffer({ ...newOffer, active: e.target.checked })}
                    className="rounded border-terracotta/20 bg-cream-100 text-terracotta focus:ring-0 h-4 w-4 accent-terracotta"
                  />
                  <Label htmlFor="off-active" className="cursor-pointer select-none">
                    Activate and Display Immediately
                  </Label>
                </div>
              </div>

              <Button onClick={handleAddOffer} className="mt-6 flex items-center gap-2 font-semibold">
                <PlusCircle className="h-4 w-4" /> Create Deal Banner
              </Button>
            </div>

            {/* List Active Offers */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold font-serif">Manage Promos</h2>
              {db.offers.map((offer) => (
                <div key={offer.id} className="p-6 rounded-2xl border border-terracotta/20 bg-cream-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="bg-terracotta/10 text-terracotta border border-terracotta/20 px-2 py-0.5 text-xs rounded font-bold uppercase">
                        {offer.badge || "Promo"}
                      </span>
                      {offer.code && (
                        <span className="font-mono text-xs text-terracotta border border-dashed border-terracotta/40 px-1.5 py-0.5 rounded bg-terracotta/5">
                          Code: {offer.code}
                        </span>
                      )}
                      <span className={`h-2.5 w-2.5 rounded-full ${offer.active ? "bg-terracotta shadow-[0_0_8px_rgba(107,79,58,0.5)]" : "bg-slate-600"}`} />
                    </div>
                    <h3 className="text-lg font-bold font-serif mt-2">{offer.title}</h3>
                    <p className="text-charcoal-light text-xs mt-1 leading-relaxed max-w-2xl">{offer.description}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setEditingOffer(offer)}
                      className="p-2 border border-terracotta/20 hover:border-terracotta bg-cream-300/40 text-white rounded-lg transition-colors text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Edit className="h-3.5 w-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteOffer(offer.id)}
                      className="p-2 border border-rose-500/20 hover:border-rose-500 bg-rose-500/5 text-rose-400 rounded-lg transition-colors text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. TESTIMONIALS MANAGER */}
        {activeTab === "testimonials" && (
          <div className="space-y-8 animate-fade-up">
            <div>
              <h1 className="text-3xl font-bold font-serif">Customer Testimonials</h1>
              <p className="text-charcoal-light mt-2">Display ratings and quotes from customers on your website.</p>
            </div>

            {/* Add New Testimonial Block */}
            <div className="p-6 rounded-2xl border border-terracotta/20 bg-cream-200">
              <h2 className="text-xl font-bold font-serif mb-4 flex items-center gap-2 text-terracotta"><Plus className="h-5 w-5" /> Add New Review</h2>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="t-name">Customer Name</Label>
                  <Input
                    id="t-name"
                    value={newTestimonial.name || ""}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                    className="bg-cream-100 border-terracotta/20"
                    placeholder="E.g., Kumaran"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="t-location">Location</Label>
                  <Input
                    id="t-location"
                    value={newTestimonial.location || ""}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, location: e.target.value })}
                    className="bg-cream-100 border-terracotta/20"
                    placeholder="E.g., Salem"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="t-rating">Rating (1 to 5 Stars)</Label>
                  <select
                    id="t-rating"
                    value={newTestimonial.rating || 5}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: parseInt(e.target.value) })}
                    className="w-full h-11 px-3 rounded-md bg-cream-100 border border-terracotta/20 text-charcoal focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n} className="bg-cream-100 text-charcoal">
                        {n} Stars
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="t-quote">Review Quote / Words</Label>
                  <Textarea
                    id="t-quote"
                    value={newTestimonial.quote || ""}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, quote: e.target.value })}
                    className="bg-cream-100 border-terracotta/20"
                    placeholder="What did the customer write about Rohit Furnitures?"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="t-date">Source / Label</Label>
                  <Input
                    id="t-date"
                    value={newTestimonial.date || ""}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, date: e.target.value })}
                    className="bg-cream-100 border-terracotta/20"
                    placeholder="E.g., Google Review"
                  />
                </div>
              </div>

              <Button onClick={handleAddTestimonial} className="mt-6 flex items-center gap-2 font-semibold">
                <PlusCircle className="h-4 w-4" /> Save Customer Review
              </Button>
            </div>

            {/* List Reviews */}
            <div className="grid gap-6 md:grid-cols-2">
              {db.testimonials.map((t) => (
                <div key={t.id} className="p-6 rounded-2xl border border-terracotta/20 bg-cream-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-terracotta/10 pb-3 mb-3">
                      <div>
                        <h4 className="font-bold text-charcoal text-base">{t.name}</h4>
                        <span className="text-xs text-charcoal-light">
                          {t.location} · {t.date}
                        </span>
                      </div>
                      <span className="font-bold text-terracotta font-mono text-sm">{t.rating} ★</span>
                    </div>
                    <p className="text-charcoal-light text-sm leading-relaxed italic">“{t.quote}”</p>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-2">
                    <button
                      onClick={() => setEditingTestimonial(t)}
                      className="p-2 border border-terracotta/20 hover:border-terracotta text-white bg-cream-100/50 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Edit className="h-3.5 w-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTestimonial(t.id)}
                      className="p-2 border border-rose-500/20 hover:border-rose-500 bg-rose-500/5 text-rose-400 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. BUSINESS SETTINGS */}
        {activeTab === "settings" && (
          <div className="space-y-8 animate-fade-up">
            <div>
              <h1 className="text-3xl font-bold font-serif">Business Settings</h1>
              <p className="text-charcoal-light mt-2">Manage contact details, social profiles, business hours, and years of experience.</p>
            </div>

            <div className="p-6 rounded-2xl border border-terracotta/20 bg-cream-200 space-y-6">
              <h2 className="text-xl font-bold font-serif text-terracotta">Identity & Contact Info</h2>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Store Business Name</Label>
                  <Input
                    value={db.business.name}
                    onChange={(e) => handleUpdateBusiness("name", e.target.value)}
                    className="bg-cream-100 border-terracotta/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tagline Description</Label>
                  <Input
                    value={db.business.tagline}
                    onChange={(e) => handleUpdateBusiness("tagline", e.target.value)}
                    className="bg-cream-100 border-terracotta/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Years in Business</Label>
                  <Input
                    type="number"
                    value={db.business.yearsInBusiness}
                    onChange={(e) => handleUpdateBusiness("yearsInBusiness", parseInt(e.target.value))}
                    className="bg-cream-100 border-terracotta/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label>WhatsApp Number (Display)</Label>
                  <Input
                    value={db.business.phoneDisplay}
                    onChange={(e) => handleUpdateBusiness("phoneDisplay", e.target.value)}
                    className="bg-cream-100 border-terracotta/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label>WhatsApp Number (Dial Link)</Label>
                  <Input
                    value={db.business.phoneTel}
                    onChange={(e) => handleUpdateBusiness("phoneTel", e.target.value)}
                    className="bg-cream-100 border-terracotta/20"
                    placeholder="E.g., +919344233442"
                  />
                </div>

                <div className="space-y-2">
                  <Label>WhatsApp API (Digits Only)</Label>
                  <Input
                    value={db.business.whatsapp}
                    onChange={(e) => handleUpdateBusiness("whatsapp", e.target.value)}
                    className="bg-cream-100 border-terracotta/20"
                    placeholder="E.g., 919344233442"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Business Email Address</Label>
                  <Input
                    value={db.business.email}
                    onChange={(e) => handleUpdateBusiness("email", e.target.value)}
                    className="bg-cream-100 border-terracotta/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Instagram Link (URL)</Label>
                  <Input
                    value={db.business.socialLinks.instagram || ""}
                    onChange={(e) =>
                      handleUpdateBusiness("socialLinks", {
                        ...db.business.socialLinks,
                        instagram: e.target.value,
                      })
                    }
                    className="bg-cream-100 border-terracotta/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Facebook Link (URL)</Label>
                  <Input
                    value={db.business.socialLinks.facebook || ""}
                    onChange={(e) =>
                      handleUpdateBusiness("socialLinks", {
                        ...db.business.socialLinks,
                        facebook: e.target.value,
                      })
                    }
                    className="bg-cream-100 border-terracotta/20"
                  />
                </div>
              </div>

              <div className="space-y-2 border-t border-terracotta/10 pt-4">
                <Label>Full Address Line</Label>
                <Input
                  value={db.business.address.full}
                  onChange={(e) =>
                    handleUpdateBusiness("address", {
                      ...db.business.address,
                      full: e.target.value,
                    })
                  }
                  className="bg-cream-100 border-terracotta/20"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2 border-t border-terracotta/10 pt-4">
                <div className="space-y-2">
                  <Label>Google Maps Location Link</Label>
                  <Input
                    value={db.business.mapsUrl}
                    onChange={(e) => handleUpdateBusiness("mapsUrl", e.target.value)}
                    className="bg-cream-100 border-terracotta/20 text-xs font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Google Maps Embed Frame (URL)</Label>
                  <Input
                    value={db.business.mapEmbedUrl}
                    onChange={(e) => handleUpdateBusiness("mapEmbedUrl", e.target.value)}
                    className="bg-cream-100 border-terracotta/20 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end border-t border-terracotta/10 pt-6">
                <Button onClick={handleSaveBusiness} className="font-bold flex items-center gap-2">
                  Save Store Details
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ────────────────── POPUP MODAL DIALOGS ────────────────── */}

      {/* A. PRODUCT EDIT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-terracotta/20 bg-cream-200 p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-terracotta/15 pb-3">
              <h2 className="font-serif text-xl font-bold">Edit Product details</h2>
              <button onClick={() => setEditingProduct(null)} className="text-charcoal-light hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label>Name</Label>
                  <Input
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="bg-cream-100 border-terracotta/20"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Price Range</Label>
                  <Input
                    value={editingProduct.priceRange}
                    onChange={(e) => setEditingProduct({ ...editingProduct, priceRange: e.target.value })}
                    className="bg-cream-100 border-terracotta/20"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label>Category</Label>
                <select
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  className="w-full h-11 px-3 rounded-md bg-cream-100 border border-terracotta/20 text-charcoal"
                >
                  {db.categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug} className="bg-cream-100 text-charcoal">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <Label>Description</Label>
                <Textarea
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="bg-cream-100 border-terracotta/20"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 items-center pt-2">
                <div className="space-y-1 col-span-2">
                  <Label>Product Image Source</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Input
                        type="file"
                        accept="image/*"
                        id="edit-uploader"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(e, (url) => setEditingProduct({ ...editingProduct, image: url }))
                        }
                        disabled={uploadingImage}
                      />
                      <label
                        htmlFor="edit-uploader"
                        className="flex items-center justify-center gap-2 w-full h-11 px-4 border border-dashed border-terracotta/40 rounded-md cursor-pointer hover:bg-cream-300/30 hover:border-terracotta transition-all text-xs font-semibold text-charcoal-light"
                      >
                        {uploadingImage ? (
                          <Loader2 className="h-4 w-4 animate-spin text-terracotta" />
                        ) : (
                          <Upload className="h-4 w-4 text-terracotta" />
                        )}
                        Upload Image File
                      </label>
                    </div>
                    <Input
                      value={editingProduct.image || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                      placeholder="Or paste image URL"
                      className="bg-cream-100 border-terracotta/20 h-11"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="edit-featured"
                    checked={editingProduct.featured}
                    onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                    className="rounded border-terracotta/20 bg-cream-100 text-terracotta h-4 w-4 accent-terracotta"
                  />
                  <Label htmlFor="edit-featured" className="cursor-pointer select-none">
                    Feature on Homepage Carousel
                  </Label>
                </div>
              </div>

              {editingProduct.image && (
                <div className="text-xs font-mono bg-cream-100 p-2 rounded text-charcoal-light flex items-center justify-between border border-terracotta/10">
                  <span className="truncate max-w-[320px]">{editingProduct.image}</span>
                  <span className="text-[10px] text-terracotta font-bold font-sans">ACTIVE IMAGE</span>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-terracotta/15 pt-4">
              <Button variant="outline" onClick={() => setEditingProduct(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateProduct}>Save Changes</Button>
            </div>
          </div>
        </div>
      )}

      {/* B. CATEGORY EDIT MODAL */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-terracotta/20 bg-cream-200 p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-terracotta/15 pb-3">
              <h2 className="font-serif text-xl font-bold">Edit Category</h2>
              <button onClick={() => setEditingCategory(null)} className="text-charcoal-light hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label>Name</Label>
                  <Input
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                    className="bg-cream-100 border-terracotta/20"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Short Label (for Filter Pills)</Label>
                  <Input
                    value={editingCategory.shortName}
                    onChange={(e) => setEditingCategory({ ...editingCategory, shortName: e.target.value })}
                    className="bg-cream-100 border-terracotta/20"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label>Description</Label>
                <Textarea
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  className="bg-cream-100 border-terracotta/20"
                />
              </div>

              <div className="space-y-2">
                <Label>Category Showcase Image</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      id="cat-uploader"
                      className="hidden"
                      onChange={(e) =>
                        handleImageUpload(e, (url) => setEditingCategory({ ...editingCategory, image: url }))
                      }
                      disabled={uploadingImage}
                    />
                    <label
                      htmlFor="cat-uploader"
                      className="flex items-center justify-center gap-2 w-full h-11 px-4 border border-dashed border-terracotta/40 rounded-md cursor-pointer hover:bg-cream-300/30 hover:border-terracotta transition-all text-xs font-semibold text-charcoal-light"
                    >
                      {uploadingImage ? (
                        <Loader2 className="h-4 w-4 animate-spin text-terracotta" />
                      ) : (
                        <Upload className="h-4 w-4 text-terracotta" />
                      )}
                      Upload Image File
                    </label>
                  </div>
                  <Input
                    value={editingCategory.image || ""}
                    onChange={(e) => setEditingCategory({ ...editingCategory, image: e.target.value })}
                    placeholder="Or paste image URL"
                    className="bg-cream-100 border-terracotta/20 h-11"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-terracotta/15 pt-4">
              <Button variant="outline" onClick={() => setEditingCategory(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateCategory}>Save Changes</Button>
            </div>
          </div>
        </div>
      )}

      {/* C. PROMO DEALS EDIT MODAL */}
      {editingOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-terracotta/20 bg-cream-200 p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-terracotta/15 pb-3">
              <h2 className="font-serif text-xl font-bold">Edit Promo Deal</h2>
              <button onClick={() => setEditingOffer(null)} className="text-charcoal-light hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label>Offer Title</Label>
                  <Input
                    value={editingOffer.title}
                    onChange={(e) => setEditingOffer({ ...editingOffer, title: e.target.value })}
                    className="bg-cream-100 border-terracotta/20"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Promo Tag Badge</Label>
                  <Input
                    value={editingOffer.badge || ""}
                    onChange={(e) => setEditingOffer({ ...editingOffer, badge: e.target.value })}
                    className="bg-cream-100 border-terracotta/20"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label>Promo Code</Label>
                  <Input
                    value={editingOffer.code || ""}
                    onChange={(e) => setEditingOffer({ ...editingOffer, code: e.target.value })}
                    className="bg-cream-100 border-terracotta/20 font-mono text-terracotta"
                  />
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <input
                    type="checkbox"
                    id="edit-off-active"
                    checked={editingOffer.active}
                    onChange={(e) => setEditingOffer({ ...editingOffer, active: e.target.checked })}
                    className="rounded border-terracotta/20 bg-cream-100 text-terracotta h-4 w-4 accent-terracotta"
                  />
                  <Label htmlFor="edit-off-active" className="cursor-pointer select-none">
                    Activate/Display
                  </Label>
                </div>
              </div>

              <div className="space-y-1">
                <Label>Offer details / Terms</Label>
                <Textarea
                  value={editingOffer.description}
                  onChange={(e) => setEditingOffer({ ...editingOffer, description: e.target.value })}
                  className="bg-cream-100 border-terracotta/20"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-terracotta/15 pt-4">
              <Button variant="outline" onClick={() => setEditingOffer(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateOffer}>Save Changes</Button>
            </div>
          </div>
        </div>
      )}

      {/* D. TESTIMONIAL EDIT MODAL */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-terracotta/20 bg-cream-200 p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-terracotta/15 pb-3">
              <h2 className="font-serif text-xl font-bold">Edit Review</h2>
              <button onClick={() => setEditingTestimonial(null)} className="text-charcoal-light hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label>Customer Name</Label>
                  <Input
                    value={editingTestimonial.name}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                    className="bg-cream-100 border-terracotta/20"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Location</Label>
                  <Input
                    value={editingTestimonial.location || ""}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, location: e.target.value })}
                    className="bg-cream-100 border-terracotta/20"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label>Rating (1 to 5 Stars)</Label>
                  <select
                    value={editingTestimonial.rating}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: parseInt(e.target.value) })}
                    className="w-full h-11 px-3 rounded-md bg-cream-100 border border-terracotta/20 text-charcoal"
                  >
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n}>
                        {n} Stars
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <Label>Source / Label</Label>
                  <Input
                    value={editingTestimonial.date}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, date: e.target.value })}
                    className="bg-cream-100 border-terracotta/20"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label>Quote words</Label>
                <Textarea
                  value={editingTestimonial.quote}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                  className="bg-cream-100 border-terracotta/20"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-terracotta/15 pt-4">
              <Button variant="outline" onClick={() => setEditingTestimonial(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateTestimonial}>Save Changes</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
