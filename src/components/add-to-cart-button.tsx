"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/types";

export function AddToCartButton({
  product,
}: {
  product: { id: string; name: string; priceCents: number; imageUrl: string | null; stock: number };
}) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const outOfStock = product.stock <= 0;

  function handleAdd() {
    addItem(
      {
        productId: product.id,
        name: product.name,
        priceCents: product.priceCents,
        imageUrl: product.imageUrl ?? undefined,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="flex items-stretch gap-2">
      <div className="flex items-center rounded-md border">
        <button
          className="px-3 text-lg disabled:opacity-40"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={outOfStock}
        >
          −
        </button>
        <span className="w-8 text-center text-sm">{quantity}</span>
        <button
          className="px-3 text-lg disabled:opacity-40"
          onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
          disabled={outOfStock}
        >
          +
        </button>
      </div>

      <button
        onClick={handleAdd}
        disabled={outOfStock}
        className="flex flex-1 items-center justify-between rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span>{formatPrice(product.priceCents * quantity)}</span>
        <span>{outOfStock ? "Out of stock" : added ? "Added ✓" : "Add To Cart"}</span>
      </button>
    </div>
  );
}
