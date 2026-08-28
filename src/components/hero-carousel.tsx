"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Fast Food",
    subtitle: "Crispy & Delicious",
    image: "/images/fast-food-banner.jpg",
    link: "/shop/fast-food",
  },
  {
    id: 2,
    title: "Bakery",
    subtitle: "Freshly Baked Daily",
    image: "/images/bakery-banner.jpg",
    link: "/shop/bakery",
  },
  {
    id: 3,
    title: "Dairy",
    subtitle: "100% Pure & Fresh",
    image: "/images/dairy-banner.jpg",
    link: "/shop/dairy",
  },
  {
    id: 4,
    title: "Pan Asian",
    subtitle: "Exotic Flavors",
    image: "/images/pan-asian-banner.jpg",
    link: "/shop/pan-asian",
  },
  {
    id: 5,
    title: "Sweets",
    subtitle: "Crafted with Love",
    image: "/images/sweets-banner.jpg",
    link: "/shop/sweets",
  },
  {
    id: 6,
    title: "Grocery",
    subtitle: "Everyday Essentials",
    image: "/images/grocery-banner.jpg",
    link: "/shop/grocery",
  },
  {
    id: 7,
    title: "Deli",
    subtitle: "Premium Cuts",
    image: "/images/deli-banner.jpg",
    link: "/shop/deli",
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const slide = slides[current];

  return (
    <section className="relative mb-6 overflow-hidden rounded-2xl shadow-lg w-full">
      <div className="relative h-[200px] w-full sm:h-[280px] md:h-[380px] bg-black overflow-hidden">
        {/* Banner Image with Crop Scale to cover inner side gaps completely */}
        <Image
          key={slide.id}
          src={slide.image}
          alt={slide.title}
          fill
          className="object-cover object-center scale-x-[1.25] scale-y-[1.1]"
          sizes="100vw"
          priority
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10">
          <h2 className="text-2xl font-bold text-white drop-shadow-lg sm:text-3xl md:text-5xl">
            {slide.title}
          </h2>
          <p className="mt-1 text-sm text-white/90 drop-shadow-md sm:text-base md:text-xl">
            {slide.subtitle}
          </p>
          <Link
            href={slide.link}
            className="mt-3 inline-block rounded-full bg-[#BDD390] px-6 py-1.5 text-sm font-bold text-[#242222] shadow-lg transition hover:bg-[#A9C07A] hover:scale-105"
          >
            SHOP NOW →
          </Link>
        </div>

        {/* Manual Left Arrow Button */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-[#98AB81] hover:text-[#242222]"
        >
          <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
        </button>

        {/* Manual Right Arrow Button */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-[#98AB81] hover:text-[#242222]"
        >
          <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
        </button>
      </div>

      {/* Manual Navigation Dots */}
      <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === current ? "w-6 bg-[#BDD390]" : "w-1.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}