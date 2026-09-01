"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, X } from "lucide-react";

const categoriesData = [
  {
    name: "Bakery",
    slug: "bakery",
    subCategories: [
      { name: "Bread", image: "/images/bread.jpg" },
      { name: "Cakes", image: "/images/cakes.jpg" },
      { name: "Pastries", image: "/images/pastries.jpg" },
      { name: "Donuts ", image: "/images/donuts.jpg" },
      { name: "Brownies", image: "/images/brownie.jpg" },
      { name: "Buns", image: "/images/buns.jpg" },
      { name: "Biscuits", image: "/images/biscuits.jpg" },
      { name: "Rusk", image: "/images/rusk.jpg" },
    ],
  },
  {
    name: "Dairy",
    slug: "dairy",
    subCategories: [
      { name: "Fresh Milk", image: "/images/fresh-milk.jpg" },
      { name: "Yogurt", image: "/images/yogurt.jpg" },
      { name: "Cheese", image: "/images/cheese.jpg" },
      { name: "Butter", image: "/images/butter.jpg" },
      { name: "Cream", image: "/images/cream.jpg" },
      { name: "Ghee", image: "/images/ghee.jpg" },
      { name: "Ice Cream", image: "/images/ice-cream.jpg" },
    ],
  },
  {
    name: "Sweets",
    slug: "sweets",
    subCategories: [
      { name: "Mango Cake", image: "/images/mango-cake.jpg" },
      { name: "Chocolate Cake", image: "/images/chocolate-cake.jpg" },
      { name: "Brownie", image: "/images/brownie.jpg" },
      { name: "Donut", image: "/images/donuts.jpg" },
      { name: "Cupcake", image: "/images/cupcake.jpg" },
      { name: "Pastry", image: "/images/pastry.jpg" },
      { name: "Gulab Jamun", image: "/images/gulab-jamun.jpg" },
      { name: "Jalebi", image: "/images/jalebi.jpg" },
    ],
  },
  {
    name: "Fast Food",
    slug: "fast-food",
    subCategories: [
      { name: "Chicken Burger", image: "/images/chicken-burger.jpg" },
      { name: "Zinger Burger", image: "/images/zinger-burger.jpg" },
      { name: "French Fries", image: "/images/french-fries.jpg" },
      { name: "Chicken Nuggets", image: "/images/chicken-nuggets.jpg" },
      { name: "Peri Peri", image: "/images/peri-peri.jpg" },
      { name: "Grilled Chicken", image: "/images/grilled-chicken.jpg" },
      { name: "JS Crust Roll", image: "/images/crust-roll.jpg" },
      { name: "JS Cheese Crust Roll", image: "/images/cheese-crust-roll.jpg" },
    ],
  },
  {
    name: "Pan Asian",
    slug: "pan-asian",
    subCategories: [
      { name: "Noodle Bowl", image: "/images/noodle-bowl.jpg" },
      { name: "Fried Rice", image: "/images/fried-rice.jpg" },
      { name: "Chow Mein", image: "/images/chow-mein.jpg" },
      { name: "Spring Rolls", image: "/images/spring-rolls.jpg" },
      { name: "Dumplings", image: "/images/dumplings.jpg" },
      { name: "Stir Fry", image: "/images/stir-fry.jpg" },
    ],
  },
  {
    name: "Grocery",
    slug: "grocery",
    subCategories: [
      { name: "Snacks", image: "/images/snacks.jpg" },
      { name: "Sauces & Spices", image: "/images/sauces-spices.jpg" },
      { name: "Beverages", image: "/images/beverages.jpg" },
      { name: "Cooking Oils", image: "/images/cooking-oils.jpg" },
    ],
  },
  {
    name: "Deli",
    slug: "deli",
    subCategories: [
      { name: "Deli Chicken", image: "/images/deli-chicken.jpg" },
      { name: "Deli Beef", image: "/images/deli-beef.jpg" },
      { name: "Cold Cuts", image: "/images/cold-cuts.jpg" },
    ],
  },
];

export function CategoryMenuModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeCategory, setActiveCategory] = useState("Bakery");

  if (!isOpen) return null;

  const currentCategoryObj = categoriesData.find(
    (c) => c.name === activeCategory
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4">
      <div className="relative flex h-[85vh] w-full max-w-[1000px] overflow-hidden rounded-2xl bg-[#F3EDD8] shadow-2xl flex-col sm:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-2 top-2 z-10 rounded-full p-1.5 text-[#242222] hover:bg-[#BDD390] hover:text-[#242222] transition-all duration-300 sm:right-4 sm:top-4"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Column - Category Sidebar */}
        <div className="w-full border-b border-[#D4C9B8] bg-[#F3EDD8] p-3 sm:w-[240px] sm:border-b-0 sm:border-r sm:p-5">
          <h2 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-[#242222] sm:mb-6">
            CATEGORIES
          </h2>
          <div className="flex gap-1 overflow-x-auto sm:flex-col sm:gap-1 sm:overflow-x-visible">
            {categoriesData.map((cat) => {
              const isActive = activeCategory === cat.name;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex-shrink-0 rounded-xl px-3 py-2 text-left text-xs font-semibold transition-all duration-300 sm:w-full sm:px-4 sm:py-3 sm:text-sm ${
                    isActive
                      ? "bg-[#BDD390] text-[#242222] ring-2 ring-[#A87A53] shadow-md"
                      : "text-[#242222] hover:bg-[#BDD390] hover:text-[#242222] hover:ring-2 hover:ring-[#A87A53]/50 hover:shadow-md"
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column - Subcategory Grid */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-8">
          <h1 className="mb-3 text-left text-base font-bold text-[#242222] sm:mb-6 sm:text-lg">
            {activeCategory}
          </h1>

          {/* Subcategory Grid - Strong Hover Effect */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {currentCategoryObj?.subCategories.map((sub) => (
              <Link
                key={sub.name}
                href={`/shop/${currentCategoryObj.slug}/${sub.name
                  .toLowerCase()
                  .replace(/ /g, "-")}`}
                onClick={onClose}
                className="group flex flex-col overflow-hidden rounded-xl border-2 border-[#D4C9B8] bg-[#F3EDD8] transition-all duration-300 hover:scale-[1.04] hover:border-[#A87A53] hover:shadow-xl hover:bg-white"
              >
                {/* Image Container - Square */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#F3EDD8] p-1 sm:p-3">
                  <Image
                    src={sub.image}
                    alt={sub.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />
                </div>
                {/* Card Title */}
                <div className="bg-[#F3EDD8] py-2 text-center transition-all duration-300 group-hover:bg-[#BDD390] sm:py-3">
                  <span className="text-[10px] font-bold text-[#242222] transition-all duration-300 group-hover:text-[#242222] sm:text-xs">
                    {sub.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}