"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Heart,
} from "lucide-react";
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
  bannerImage: string | string[];
  products: Product[];
  viewAllLink?: string;

  // NEW: Base path for product/category cards
  productLinkPrefix?: string;
}

export function CategoryProductScroll({
  categoryName,
  bannerImage,
  products,
  viewAllLink,
  productLinkPrefix,
}: CategoryProductScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const addItem = useCartStore((s) => s.addItem);

  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const bannerList = Array.isArray(bannerImage)
    ? bannerImage
    : [bannerImage];

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;

      const scrollAmount = 320;

      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handlePrevBanner = () => {
    setCurrentBannerIndex((prev) =>
      prev === 0 ? bannerList.length - 1 : prev - 1
    );
  };

  const handleNextBanner = () => {
    setCurrentBannerIndex((prev) =>
      prev === bannerList.length - 1 ? 0 : prev + 1
    );
  };

  /*
   * Product URL
   *
   * Bakery + Bread:
   * /shop/bakery/bread
   *
   * Dairy + Fresh Milk:
   * /shop/dairy/fresh-milk
   *
   * etc.
   */
  const getProductLink = (productSlug: string) => {
    if (productLinkPrefix) {
      return `${productLinkPrefix}/${productSlug}`;
    }

    // Fallback for any component using the old behavior
    return `/product/${productSlug}`;
  };

  return (
    <section className="mb-14 overflow-hidden">
      {/* Category Name */}
      <div className="relative mb-8 flex items-center justify-center">
        <div className="absolute left-0 right-0 border-t border-[#D4C9B8]" />

        <h2 className="relative bg-[#F3EDD8] px-4 text-2xl font-bold text-[#242222]">
          {categoryName}
        </h2>

        {viewAllLink && (
          <Link
            href={viewAllLink}
            className="absolute right-0 text-xs font-bold text-[#242222] hover:text-[#A87A53] hover:underline"
          >
            View All →
          </Link>
        )}
      </div>

      {/* Category Banner */}
      <div className="relative mb-6 h-[320px] w-full overflow-hidden rounded-2xl bg-[#242222] shadow-md">
        <Image
          src={bannerList[currentBannerIndex]}
          alt={categoryName}
          fill
          className="object-cover object-center"
          priority
        />

        {/* Previous Banner */}
        {bannerList.length > 1 && (
          <button
            type="button"
            onClick={handlePrevBanner}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/70"
            aria-label="Previous banner"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {/* Next Banner */}
        {bannerList.length > 1 && (
          <button
            type="button"
            onClick={handleNextBanner}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/70"
            aria-label="Next banner"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}

        {/* Banner Dots */}
        {bannerList.length > 1 && (
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {bannerList.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentBannerIndex(index)}
                aria-label={`Go to banner ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentBannerIndex === index
                    ? "w-8 bg-[#BDD390]"
                    : "w-2.5 bg-white/50 hover:bg-white"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Products */}
      <div className="mx-auto max-w-7xl px-2">
        <div className="relative">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2.5 shadow-md transition hover:bg-white hover:shadow-lg"
            aria-label="Scroll products left"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>

          {/* Product Scroll */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scroll-smooth px-1 pb-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {products.map((product) => {
              const productLink = getProductLink(product.slug);

              return (
                <div
                  key={product.id}
                  className="group min-w-[170px] max-w-[170px] flex-shrink-0 rounded-xl bg-white p-3 transition hover:scale-[1.02] hover:shadow-lg"
                >
                  {/* Product Image */}
                  <Link
                    href={productLink}
                    className="relative block overflow-hidden rounded-lg"
                  >
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

                      {/* Discount */}
                      {product.discount && (
                        <span className="absolute left-2 top-2 z-10 rounded bg-[#242222] px-2 py-0.5 text-xs font-bold text-[#BDD390] shadow-md">
                          {product.discount}
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Product Information */}
                  <div className="mt-2">
                    <Link href={productLink}>
                      <p className="line-clamp-2 text-sm font-medium text-gray-800 hover:text-[#242222]">
                        {product.name}
                      </p>
                    </Link>

                    {product.unit && (
                      <p className="text-xs text-gray-500">
                        {product.unit}
                      </p>
                    )}
                  </div>

                  {/* Price + Actions */}
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-bold text-[#242222]">
                      Rs. {product.price.toFixed(2)}
                    </span>

                    <div className="flex items-center gap-2">
                      {/* Wishlist */}
                      <button
                        type="button"
                        onClick={() => toggleWishlist(product.id)}
                        className="rounded-full p-1.5 transition"
                        aria-label={`Add ${product.name} to wishlist`}
                      >
                        <Heart
                          className={`h-4 w-4 transition ${
                            wishlist[product.id]
                              ? "fill-[#A87A53] text-[#A87A53]"
                              : "text-gray-400 hover:text-[#A87A53]"
                          }`}
                        />
                      </button>

                      {/* Add to Cart */}
                      <button
                        type="button"
                        onClick={() =>
                          addItem({
                            productId: product.id,
                            name: product.name,
                            priceCents: Math.round(product.price * 100),
                            imageUrl: product.image ?? undefined,
                          })
                        }
                        className="rounded-lg bg-[#BDD390] p-2 text-[#242222] opacity-0 transition hover:bg-[#A87A53] hover:text-white group-hover:opacity-100"
                        title="Add to cart"
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2.5 shadow-md transition hover:bg-white hover:shadow-lg"
            aria-label="Scroll products right"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
}