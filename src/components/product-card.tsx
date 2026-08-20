"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { formatPrice, type ProductSummary } from "@/lib/types";

export function ProductCard({ product }: { product: ProductSummary }) {
  const addItem = useCartStore((s) => s.addItem);
  const effectivePrice = product.isDeal && product.dealPriceCents ? product.dealPriceCents : product.priceCents;
  const outOfStock = product.stock <= 0;

  return (
    <Card className="flex h-full flex-col">
      <Link href={`/product/${product.slug}`} className="flex flex-1 flex-col">
        <CardHeader>
          <CardTitle className="text-base leading-snug">{product.name}</CardTitle>
          {product.unit && <p className="text-xs text-muted-foreground">{product.unit}</p>}
        </CardHeader>
        <CardContent className="flex-1">
          {product.isDeal && product.dealPriceCents ? (
            <div className="flex items-center gap-2">
              <span className="font-semibold">{formatPrice(product.dealPriceCents, product.currency)}</span>
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.priceCents, product.currency)}
              </span>
            </div>
          ) : (
            <span className="font-semibold">{formatPrice(product.priceCents, product.currency)}</span>
          )}
          {outOfStock && <p className="mt-1 text-xs text-destructive">Out of stock</p>}
        </CardContent>
      </Link>
      <CardFooter>
        <Button
          size="sm"
          className="w-full"
          disabled={outOfStock}
          onClick={() =>
            addItem({
              productId: product.id,
              name: product.name,
              priceCents: effectivePrice,
              imageUrl: product.imageUrl ?? undefined,
            })
          }
        >
          {outOfStock ? "Out of stock" : "Add to cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
