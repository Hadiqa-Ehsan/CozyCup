"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice, type ProductSummary } from "@/lib/types";

export function ProductCard({ product }: { product: ProductSummary }) {
  const addItem = useCartStore((s) => s.addItem);
  const effectivePrice = product.isDeal && product.dealPriceCents ? product.dealPriceCents : product.priceCents;
  const outOfStock = product.stock <= 0;
  const discountPercent = product.isDeal && product.dealPriceCents 
    ? Math.round((1 - product.dealPriceCents / product.priceCents) * 100)
    : 0;

  return (
    <div className="group relative rounded-xl bg-pink-50 p-3 transition">
      {/* Image - Full Width */}
      <Link href={`/product/${product.slug}`} className="relative block">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              No image
            </div>
          )}

          {/* Discount Badge */}
          {product.isDeal && discountPercent > 0 && (
            <span className="absolute left-2 top-2 rounded bg-[#C8102E] px-2 py-0.5 text-xs font-bold text-white">
              {discountPercent}% OFF
            </span>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="mt-2">
        <Link href={`/product/${product.slug}`}>
          <p className="line-clamp-2 text-sm font-medium text-gray-800 hover:text-[#C8102E]">
            {product.name}
          </p>
        </Link>
        {product.unit && (
          <p className="text-xs text-gray-500">{product.unit}</p>
        )}
      </div>

      {/* Price and Actions */}
      <div className="mt-2 flex items-center justify-between">
        <div>
          {product.isDeal && product.dealPriceCents ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#C8102E]">
                {formatPrice(product.dealPriceCents, product.currency)}
              </span>
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.priceCents, product.currency)}
              </span>
            </div>
          ) : (
            <span className="text-sm font-bold text-gray-800">
              {formatPrice(product.priceCents, product.currency)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Heart Icon - Always Visible */}
          <button
            type="button"
            onClick={(e) => e.preventDefault()}
            className="rounded-full p-1.5 text-gray-400 hover:text-[#C8102E] transition"
          >
            <Heart className="h-4 w-4" />
          </button>

          {/* Cart Button - Appears on Hover */}
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
            className="rounded-lg bg-[#C8102E] p-2 text-white transition hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed opacity-0 group-hover:opacity-100"
            title={outOfStock ? "Out of stock" : "Add to cart"}
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>

      {outOfStock && (
        <p className="mt-1 text-xs text-red-500">Out of stock</p>
      )}
    </div>
  );
}