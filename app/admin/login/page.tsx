"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { KeyRound, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      toast.error("Please enter password");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Successfully logged in", {
          description: "Welcome to Rohit Furnitures Admin Panel",
        });
        router.refresh();
        router.push("/admin");
      } else {
        toast.error(data.error || "Invalid password");
      }
    } catch {
      toast.error("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-cream px-4 py-12 text-charcoal">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-terracotta/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-terracotta/5 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-charcoal-light hover:text-terracotta transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to website
        </Link>

        <div className="rounded-2xl border border-terracotta/20 bg-cream-200/80 backdrop-blur-md p-8 shadow-xl hover:border-terracotta/35 hover:shadow-[0_0_20px_rgba(107,79,58,0.1)] transition-all duration-300">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/10 text-terracotta border border-terracotta/20">
              <KeyRound className="h-6 w-6" />
            </div>
            <h1 className="mt-4 font-serif text-2xl font-bold text-charcoal">
              Admin Access
            </h1>
            <p className="mt-2 text-sm text-charcoal-light">
              Enter password to manage Rohit Furnitures showroom data.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password">Security Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-cream-100 border-terracotta/20 focus:border-terracotta text-charcoal"
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full gap-2 text-base font-semibold"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Authenticate"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
