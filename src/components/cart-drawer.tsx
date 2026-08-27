"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, UtensilsCrossed } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/types";
import { Button } from "@/components/ui/button";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, setQuantity, totalCents } = useCartStore();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-xl">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {!mounted || items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground">
            <UtensilsCrossed size={40} strokeWidth={1.5} />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="flex flex-col divide-y">
                {items.map((item) => (
                  <div key={item.productId} className="flex items-center gap-3 py-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{formatPrice(item.priceCents)} each</p>
                      <div className="mt-2 flex items-center rounded-md border w-fit">
                        <button
                          className="px-2 py-1 text-sm"
                          onClick={() => setQuantity(item.productId, Math.max(1, item.quantity - 1))}
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-xs">{item.quantity}</span>
                        <button
                          className="px-2 py-1 text-sm"
                          onClick={() => setQuantity(item.productId, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-sm font-medium">
                        {formatPrice(item.priceCents * item.quantity)}
                      </span>
                      <button
                        className="text-xs text-destructive hover:underline"
                        onClick={() => removeItem(item.productId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t px-5 py-4">
              <div className="mb-3 flex items-center justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(totalCents())}</span>
              </div>
              <Button asChild className="w-full" onClick={onClose}>
                <Link href="/checkout">Proceed to checkout</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
