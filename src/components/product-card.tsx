"use client";

import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice, type ProductSummary } from "@/lib/types";

export function ProductCard({ product }: { product: ProductSummary }) {
  const addItem = useCartStore((s) => s.addItem);
  const effectivePrice = product.isDeal && product.dealPriceCents ? product.dealPriceCents : product.priceCents;
  const outOfStock = product.stock <= 0;

  return (
    <div className="flex flex-col rounded-lg border p-4">
      <Link href={`/product/${product.slug}`} className="flex flex-1 flex-col">
        <div className="relative mb-3 flex aspect-square items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">
          No image
          {product.isDeal && (
            <span className="absolute left-2 top-2 rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
              Deal
            </span>
          )}
          <button
            type="button"
            title="Not implemented in this demo — TBD"
            onClick={(e) => e.preventDefault()}
            className="absolute right-2 top-2 rounded-full bg-background/80 p-1.5 text-muted-foreground"
          >
            <Heart size={14} />
          </button>
        </div>
        <p className="text-sm font-medium leading-snug">{product.name}</p>
        {product.unit && <p className="text-xs text-muted-foreground">{product.unit}</p>}
      </Link>

      <div className="mt-3 flex items-center justify-between">
        <div>
          {product.isDeal && product.dealPriceCents ? (
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{formatPrice(product.dealPriceCents, product.currency)}</span>
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.priceCents, product.currency)}
              </span>
            </div>
          ) : (
            <span className="text-sm font-semibold">{formatPrice(product.priceCents, product.currency)}</span>
          )}
        </div>

        <button
          disabled={outOfStock}
          onClick={() =>
            addItem({
              productId: product.id,
              name: product.name,
              priceCents: effectivePrice,
              imageUrl: product.imageUrl ?? undefined,
            })
          }
          className="rounded-md bg-primary p-2 text-primary-foreground disabled:opacity-40"
          title={outOfStock ? "Out of stock" : "Add to cart"}
        >
          <ShoppingCart size={16} />
        </button>
      </div>
      {outOfStock && <p className="mt-1 text-xs text-destructive">Out of stock</p>}
    </div>
  );
}
