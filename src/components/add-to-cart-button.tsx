"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";

export function AddToCartButton({
  product,
}: {
  product: { id: string; name: string; priceCents: number; imageUrl: string | null; stock: number };
}) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();
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
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex items-center rounded-md border">
        <button
          className="px-3 py-2 text-lg disabled:opacity-40"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={outOfStock}
        >
          −
        </button>
        <span className="w-8 text-center text-sm">{quantity}</span>
        <button
          className="px-3 py-2 text-lg disabled:opacity-40"
          onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
          disabled={outOfStock}
        >
          +
        </button>
      </div>

      <Button onClick={handleAdd} disabled={outOfStock}>
        {outOfStock ? "Out of stock" : added ? "Added ✓" : "Add to cart"}
      </Button>

      {!outOfStock && (
        <Button variant="outline" onClick={() => { handleAdd(); router.push("/cart"); }}>
          Buy now
        </Button>
      )}
    </div>
  );
}
