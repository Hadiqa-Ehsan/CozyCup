import Link from "next/link";
import Image from "next/image";
import type { CategoryNode } from "@/lib/types";

const categoryImages: Record<string, string> = {
  Bakery: "/images/bread.jpg",
  Dairy: "/images/fresh-milk.jpg",
  Sweets: "/images/mango-cake.jpg",
  "Fast Food": "/images/chicken-burger.jpg",
  "Pan Asian": "/images/noodle-bowl.jpg",
  Grocery: "/images/snacks.jpg",
  Deli: "/images/deli-chicken.jpg",
};

export function CategoryGrid({ categories }: { categories: CategoryNode[] }) {
  const allCategories = [
    { id: "1", name: "Bakery", slug: "bakery", icon: "🍞", children: [] },
    { id: "2", name: "Dairy", slug: "dairy", icon: "🥛", children: [] },
    { id: "3", name: "Sweets", slug: "sweets", icon: "🍬", children: [] },
    { id: "4", name: "Fast Food", slug: "fast-food", icon: "🍔", children: [] },
    { id: "5", name: "Pan Asian", slug: "pan-asian", icon: "🥢", children: [] },
    { id: "6", name: "Grocery", slug: "grocery", icon: "🛒", children: [] },
    { id: "7", name: "Deli", slug: "deli", icon: "🥓", children: [] },
  ];

  const displayCategories = categories.length > 0 ? categories : allCategories;

  return (
    <section className="mb-10">
      <div className="relative mb-6 flex items-center justify-center">
        <div className="absolute left-0 right-0 border-t border-[#D4C9B8]"></div>
        <h2 className="relative bg-[#F3EDD8] px-4 text-lg font-bold text-[#242222] sm:text-2xl">
          SHOP BY CATEGORY
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
        {displayCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/shop/${cat.slug}`}
            className="group flex flex-col items-center gap-2 transition hover:scale-105"
          >
            <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-[#D4C9B8] shadow-sm transition group-hover:border-[#242222] sm:h-20 sm:w-20 md:h-24 md:w-24">
              <Image
                src={categoryImages[cat.name] || "/images/bread1.jpg"}
                alt={cat.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
              />
            </div>
            <span className="text-[10px] font-medium text-[#242222] group-hover:text-[#242222] sm:text-xs md:text-sm">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}