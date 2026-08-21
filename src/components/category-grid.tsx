import Link from "next/link";
import Image from "next/image";
import type { CategoryNode } from "@/lib/types";

const categoryImages: Record<string, string> = {
  Bakery: "/images/bread1.jpg",
  Dairy: "/images/ice1.jpg",
  Sweets: "/images/cake1.jpg",
  "Fast Food": "/images/bread2.jpg",
  "Pan Asian": "/images/ice2.jpg",
  Grocery: "/images/ice3.jpg",
  Deli: "/images/bread1.jpg",
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
    <section className="mb-12">
      <div className="relative mb-8 flex items-center justify-center">
        <div className="absolute left-0 right-0 border-t border-gray-300"></div>
        <h2 className="relative bg-white px-4 text-2xl font-bold text-[#C8102E]">
          Shop by Category
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {displayCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/shop/${cat.slug}`}
            className="group flex flex-col items-center gap-3 transition hover:scale-105"
          >
            <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-gray-200 shadow-sm transition group-hover:border-[#C8102E] md:h-28 md:w-28">
              <Image
                src={categoryImages[cat.name] || "/images/bread1.jpg"}
                alt={cat.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm font-medium text-[#C8102E] group-hover:text-[#C8102E]">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}