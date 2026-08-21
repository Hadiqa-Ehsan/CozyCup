"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    id: 1,
    brand: "Jalal Sons",
    title: "Mango Milk Cake",
    subtitle: "Cake of the Month",
    badge: "Save Rs.500",
    tags: ["Fresh", "Premium"],
    flavors: ["Mango", "Vanilla", "Tutti Frutti"],
    size: "500g",
    price: "Rs. 1998",
    originalPrice: "Rs. 2496",
    image: "/images/cake1.jpg",
  },
  {
    id: 2,
    brand: "Jalal Sons",
    title: "Premium Ice Cream",
    subtitle: "100% Dairy",
    badge: "17% OFF",
    tags: ["100% DAIRY", "Premium"],
    flavors: ["Chocolate", "Vanilla", "Strawberry"],
    size: "1 lit",
    price: "Rs. 998",
    originalPrice: "Rs. 1198",
    image: "/images/ice1.jpg",
  },
  {
    id: 3,
    brand: "Jalal Sons",
    title: "Artisan Bread",
    subtitle: "Freshly Baked",
    badge: "Save Rs.200",
    tags: ["Fresh", "Artisan"],
    flavors: ["White", "Brown", "Multigrain"],
    size: "400g",
    price: "Rs. 298",
    originalPrice: "Rs. 398",
    image: "/images/bread1.jpg",
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const prev = () => {
    setIsAutoPlaying(false);
    setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const next = () => {
    setIsAutoPlaying(false);
    setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const slide = slides[current];

  return (
    <section className="relative mb-8 overflow-hidden rounded-xl shadow-md">
      {/* Full-width background image */}
      <div className="relative h-[400px] w-full md:h-[450px]">
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          className="object-cover"
          priority
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Save Badge */}
        <div className="absolute left-4 top-4 z-10 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
          {slide.badge}
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
          <div className="max-w-lg text-white">
            <p className="text-sm font-medium text-orange-300">{slide.brand}</p>
            <h2 className="text-3xl font-bold md:text-4xl">{slide.title}</h2>
            <p className="text-lg text-gray-200">{slide.subtitle}</p>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              {slide.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                    tag.includes("DAIRY")
                      ? "bg-green-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Flavors */}
            <div className="mt-3 flex flex-wrap gap-2">
              {slide.flavors.map((flavor) => (
                <span
                  key={flavor}
                  className="rounded-full border border-white/50 px-3 py-0.5 text-xs text-white"
                >
                  {flavor}
                </span>
              ))}
            </div>

            <p className="mt-3 text-sm text-gray-300">{slide.size}</p>

            {/* Price */}
            <div className="mt-2 flex items-center gap-3">
              <span className="text-2xl font-bold text-white">{slide.price}</span>
              <span className="text-sm text-gray-400 line-through">{slide.originalPrice}</span>
            </div>

            <Link
              href="/shop"
              className="mt-4 inline-block rounded-md bg-[#C8102E] px-6 py-2 text-sm font-semibold text-white hover:bg-red-800 transition"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </div>

      {/* Arrow Buttons */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white transition z-10"
        aria-label="Previous slide"
      >
        ◀
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white transition z-10"
        aria-label="Next slide"
      >
        ▶
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrent(i);
              setTimeout(() => setIsAutoPlaying(true), 5000);
            }}
            className={`h-2.5 rounded-full transition ${
              i === current ? "w-6 bg-white" : "w-2.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}