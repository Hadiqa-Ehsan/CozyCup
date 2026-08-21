"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";

export default function CartPage() {
  const { items, setQuantity, removeItem, totalCents } = useCartStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function checkout() {
    setLoading(true);
    setError(null);
    const response = await fetch("/api/checkout", { method: "POST" });
    const result = await response.json().catch(() => null);
    setLoading(false);
    if (!response.ok) {
      setError(result?.error ?? "Could not start checkout.");
      return;
    }
    window.location.href = result.checkoutUrl;
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your cart</h1>
        <Link className="text-sm underline" href="/">Continue shopping</Link>
      </div>
      {items.length === 0 ? (
        <p className="text-muted-foreground">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div className="flex items-center justify-between border-b pb-4" key={item.productId}>
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">{(item.priceCents / 100).toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="h-9 w-16 rounded-md border px-2"
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(event) => setQuantity(item.productId, Math.max(1, Number(event.target.value)))}
                />
                <Button variant="ghost" onClick={() => removeItem(item.productId)}>Remove</Button>
              </div>
            </div>
          ))}
          <p className="text-right text-lg font-semibold">Total: {(totalCents() / 100).toFixed(2)}</p>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex justify-end"><Button onClick={checkout} disabled={loading}>{loading ? "Opening checkout..." : "Checkout"}</Button></div>
        </div>
      )}
    </main>
  );
}