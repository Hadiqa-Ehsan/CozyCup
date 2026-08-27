"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ShoppingCart, Heart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  unit?: string;
  image: string | null;
  discount?: string | null;
}

interface CategoryProductScrollProps {
  categoryName: string;
  bannerImage: string;
  products: Product[];
  viewAllLink?: string;
}

export function CategoryProductScroll({
  categoryName,
  bannerImage,
  products,
  viewAllLink,
}: CategoryProductScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((s) => s.addItem);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300;
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="mb-12">
      {/* Category Name - Centered with Border Lines */}
      <div className="relative mb-6 flex items-center justify-center">
        <div className="absolute left-0 right-0 border-t border-gray-300"></div>
        <h2 className="relative bg-white px-4 text-2xl font-bold text-[#C8102E]">
          {categoryName}
        </h2>
      </div>

      {/* Category Banner Image - Full Width */}
      <div 
        className="relative w-full mb-6 overflow-hidden shadow-md" 
        style={{ 
          marginLeft: 'calc(-50vw + 50%)', 
          marginRight: 'calc(-50vw + 50%)', 
          width: '100vw',
          height: '320px'
        }}
      >
        <div className="relative h-full w-full">
          <Image
            src={bannerImage}
            alt={categoryName}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Products Container - Centered */}
      <div className="mx-auto max-w-7xl px-4">
        {/* Single Light Pink Container for ALL Products */}
        <div className="relative mt-2 rounded-xl bg-pink-50 p-4">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2.5 shadow-md hover:bg-white hover:shadow-lg transition"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>

          {/* Products - Horizontal Scroll */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scroll-smooth pb-2 px-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="group min-w-[170px] max-w-[170px] flex-shrink-0 rounded-xl bg-white p-3 transition hover:shadow-lg hover:scale-[1.02]"
              >
                {/* Product Image - Hovers */}
                <Link href={`/product/${product.slug}`} className="relative block overflow-hidden rounded-lg">
                  <div className="relative aspect-square overflow-hidden bg-gray-100 transition-transform duration-300 group-hover:scale-105">
                    {product.image ? (
                      <Image
                        src={product.image}
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
                    {product.discount && (
                      <span className="absolute left-2 top-2 rounded bg-[#C8102E] px-2 py-0.5 text-xs font-bold text-white shadow-md z-10">
                        {product.discount}
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
                  <span className="text-sm font-bold text-[#C8102E]">
                    Rs. {product.price.toFixed(2)}
                  </span>

                  <div className="flex items-center gap-2">
                    {/* Heart Icon - Fills Red on Click */}
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      className="rounded-full p-1.5 transition"
                    >
                      <Heart
                        className={`h-4 w-4 transition ${
                          wishlist[product.id]
                            ? "fill-red-600 text-red-600"
                            : "text-gray-400 hover:text-red-600"
                        }`}
                      />
                    </button>

                    {/* Cart Button - Appears on Hover */}
                    <button
                      onClick={() =>
                        addItem({
                          productId: product.id,
                          name: product.name,
                          priceCents: product.price * 100,
                          imageUrl: product.image ?? undefined,
                        })
                      }
                      className="rounded-lg bg-[#C8102E] p-2 text-white transition hover:bg-white hover:text-[#C8102E] opacity-0 group-hover:opacity-100"
                      title="Add to cart"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2.5 shadow-md hover:bg-white hover:shadow-lg transition"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
}