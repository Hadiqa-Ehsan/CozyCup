"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { useBranchStore } from "@/store/branch-store";
import { formatPrice } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { status } = useSession();

  const { items, totalCents, clear } = useCartStore();
  const { branch, fulfillmentType } = useBranchStore();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (mounted && status === "unauthenticated") {
      router.push("/login?next=/checkout");
    }
  }, [mounted, status, router]);

  if (!mounted || status !== "authenticated") return null;

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-8 text-center">
        <p className="text-muted-foreground">Your cart is empty — nothing to check out.</p>
        <Button asChild className="mt-4">
          <Link href="/shop">Browse products</Link>
        </Button>
      </main>
    );
  }

  if (!branch) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-8 text-center">
        <p className="text-muted-foreground">Please select a branch before checking out.</p>
        <Button asChild className="mt-4">
          <Link href="/branches">Select branch</Link>
        </Button>
      </main>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          phone,
          fulfillmentType,
          branchId: branch!.id,
          address: fulfillmentType === "DELIVERY" ? address : undefined,
          city: fulfillmentType === "DELIVERY" ? city : undefined,
          area: fulfillmentType === "DELIVERY" ? area : undefined,
          notes,
          items: items.map((i) => ({
            productId: i.productId,
            name: i.name,
            quantity: i.quantity,
            unitPriceCents: i.priceCents,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error?.formErrors?.[0] || data.error || "Could not place order.");
        return;
      }

      clear();
      router.push(`/order-confirmation/${data.id}`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Checkout</h1>

      <div className="mb-6 rounded-md border p-4 text-sm">
        <p>
          <span className="text-muted-foreground">Fulfillment: </span>
          {fulfillmentType === "DELIVERY" ? "Delivery" : "Pickup"}
        </p>
        <p>
          <span className="text-muted-foreground">Branch: </span>
          {branch.name} — {branch.area}, {branch.city}
        </p>
        <Link href="/branches" className="text-primary hover:underline">
          Change
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone">Phone number</Label>
          <Input id="phone" required value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        {fulfillmentType === "DELIVERY" && (
          <>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="address">Delivery address</Label>
              <Input id="address" required value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="city">City</Label>
                <Input id="city" required value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="area">Area</Label>
                <Input id="area" required value={area} onChange={(e) => setArea(e.target.value)} />
              </div>
            </div>
          </>
        )}

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="notes">Order notes (optional)</Label>
          <Input id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>

        <div className="rounded-md border p-4 text-sm">
          <p className="mb-2 font-medium">Payment method</p>
          <p className="text-muted-foreground">
            Cash on Delivery only — online payments aren&apos;t supported for grocery orders (matches the real site).
          </p>
        </div>

        <div className="rounded-md border p-4">
          <div className="flex items-center justify-between font-semibold">
            <span>Order total</span>
            <span>{formatPrice(totalCents())}</span>
          </div>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" disabled={submitting}>
          {submitting ? "Placing order…" : "Place order"}
        </Button>
      </form>
    </main>
  );
}
