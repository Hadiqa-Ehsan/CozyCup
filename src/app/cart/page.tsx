"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/types";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, setQuantity, totalCents } = useCartStore();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // avoid hydration mismatch with persisted store

  return (
    <main className="mx-auto max-w-4xl px-6 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Your Cart</h1>

      {items.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Button asChild className="mt-4">
            <Link href="/shop">Browse products</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col divide-y rounded-lg border">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center justify-between gap-4 p-4">
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{formatPrice(item.priceCents)} each</p>
                </div>

                <div className="flex items-center rounded-md border">
                  <button
                    className="px-3 py-1.5 text-lg"
                    onClick={() => setQuantity(item.productId, Math.max(1, item.quantity - 1))}
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <button
                    className="px-3 py-1.5 text-lg"
                    onClick={() => setQuantity(item.productId, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <p className="w-24 text-right font-medium">
                  {formatPrice(item.priceCents * item.quantity)}
                </p>

                <button
                  className="text-sm text-destructive hover:underline"
                  onClick={() => removeItem(item.productId)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-lg font-semibold">{formatPrice(totalCents())}</span>
          </div>

          <div className="flex justify-end gap-3">
            <Button asChild variant="outline">
              <Link href="/shop">Continue shopping</Link>
            </Button>
            <Button asChild>
              <Link href="/checkout">Proceed to checkout</Link>
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
