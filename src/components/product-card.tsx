"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice, type ProductSummary } from "@/lib/types";

export function ProductCard({ product }: { product: ProductSummary }) {
  const addItem = useCartStore((s) => s.addItem);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const effectivePrice = product.isDeal && product.dealPriceCents ? product.dealPriceCents : product.priceCents;
  const outOfStock = product.stock <= 0;
  const discountPercent = product.isDeal && product.dealPriceCents 
    ? Math.round((1 - product.dealPriceCents / product.priceCents) * 100)
    : 0;

  const priceInRupees = effectivePrice / 100;

  const handleAddToCart = () => {
    if (!product.id || !product.name) return;
    
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: priceInRupees,
      image: product.imageUrl || "",
    });
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="group flex flex-col rounded-xl border border-[#D4C9B8] bg-white p-3 transition-all duration-300 hover:border-[#A87A53] hover:shadow-xl hover:scale-[1.02]">
      <Link href={`/product/${product.slug}`} className="relative block overflow-hidden rounded-lg">
        <div className="relative aspect-square overflow-hidden bg-gray-100 transition-transform duration-500 group-hover:scale-105">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              No image
            </div>
          )}
          {product.isDeal && discountPercent > 0 && (
            <span className="absolute left-2 top-2 rounded bg-[#242222] px-2 py-0.5 text-xs font-bold text-[#BDD390] z-10">
              {discountPercent}% OFF
            </span>
          )}
          <button
            type="button"
            onClick={toggleWishlist}
            className="absolute right-2 top-2 rounded-full bg-white/80 p-1.5 text-gray-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:text-[#A87A53] z-10"
          >
            <Heart className={`h-4 w-4 transition-colors ${isWishlisted ? "fill-[#A87A53] text-[#A87A53]" : ""}`} />
          </button>
        </div>
      </Link>

      <Link href={`/product/${product.slug}`} className="mt-3 flex-1">
        <p className="line-clamp-2 text-sm font-medium text-gray-800 transition-colors duration-300 group-hover:text-[#A87A53]">
          {product.name}
        </p>
        {product.unit && <p className="text-xs text-gray-500">{product.unit}</p>}
      </Link>

      <div className="mt-3 flex items-center justify-between border-t border-[#D4C9B8] pt-3">
        <div>
          {product.isDeal && product.dealPriceCents ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#242222]">
                {formatPrice(product.dealPriceCents, product.currency)}
              </span>
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.priceCents, product.currency)}
              </span>
            </div>
          ) : (
            <span className="text-sm font-bold text-[#242222]">
              {formatPrice(product.priceCents, product.currency)}
            </span>
          )}
        </div>

        <button
          disabled={outOfStock}
          onClick={handleAddToCart}
          className="rounded-lg bg-[#BDD390] p-2 text-[#242222] transition-all duration-300 hover:bg-[#A87A53] hover:text-white hover:scale-110 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="h-4 w-4" />
        </button>
      </div>

      {outOfStock && <p className="mt-1 text-xs text-red-500">Out of stock</p>}
    </div>
  );
}