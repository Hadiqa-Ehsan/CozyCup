"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    priceCents: number;
    currency: string;
    imageUrl: string | null;
  };
};

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [message, setMessage] = useState<string | null>(null);

  async function addToCart() {
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id, quantity: 1 }),
    });

    if (!response.ok) {
      setMessage(response.status === 401 ? "Sign in first" : "Could not add");
      return;
    }

    addItem({
      productId: product.id,
      name: product.name,
      priceCents: product.priceCents,
      imageUrl: product.imageUrl ?? undefined,
    });
    setMessage("Added");
  }

  return (
    <div className="flex items-center gap-3">
      <Button size="sm" onClick={addToCart}>Add to cart</Button>
      {message && <span className="text-xs text-muted-foreground">{message}</span>}
    </div>
  );
}