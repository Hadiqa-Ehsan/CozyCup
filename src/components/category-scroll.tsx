"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  unit?: string;
}

interface CategoryScrollProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
}

export function CategoryScroll({ title, products, viewAllLink }: CategoryScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

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
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {viewAllLink && (
          <Link href={viewAllLink} className="text-sm font-medium text-[#C8102E] hover:underline">
            View all
          </Link>
        )}
      </div>

      {/* Scroll Container */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white transition"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>

        {/* Products */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="min-w-[160px] flex-shrink-0 rounded-xl border border-gray-200 bg-white p-3 transition hover:border-[#C8102E] hover:shadow-md"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
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
              </div>
              <p className="mt-2 line-clamp-2 text-sm font-medium text-gray-800">
                {product.name}
              </p>
              {product.unit && (
                <p className="text-xs text-gray-500">{product.unit}</p>
              )}
              <p className="mt-1 text-sm font-bold text-[#C8102E]">
                Rs. {product.price}
              </p>
            </Link>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white transition"
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </button>
      </div>
    </section>
  );
}