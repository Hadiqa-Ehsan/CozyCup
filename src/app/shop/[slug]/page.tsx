import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { mockCategories } from "@/lib/mock-data";

// Map subcategory names to their images
const subcategoryImages: Record<string, string> = {
  // Bakery
  "Bread": "/images/bread.jpg",
  "Cakes": "/images/cakes.jpg",
  "Pastries": "/images/pastries.jpg",
  "Donuts": "/images/donuts.jpg",
  "Brownies": "/images/brownie.jpg",
  "Buns": "/images/buns.jpg",
  "Biscuits": "/images/biscuits.jpg",
  "Rusk": "/images/rusk.jpg",
  
  // Dairy
  "Fresh Milk": "/images/fresh-milk.jpg",
  "Yogurt": "/images/yogurt.jpg",
  "Cheese": "/images/cheese.jpg",
  "Butter": "/images/butter.jpg",
  "Cream": "/images/cream.jpg",
  "Ghee": "/images/ghee.jpg",
  "Ice Cream": "/images/ice-cream.jpg",
  
  // Sweets
  "Mango Cake": "/images/mango-cake.jpg",
  "Chocolate Cake": "/images/chocolate-cake.jpg",
  "Brownie": "/images/brownie.jpg",
  "Donut": "/images/donuts.jpg",
  "Cupcake": "/images/cupcake.jpg",
  "Pastry": "/images/pastry.jpg",
  "Gulab Jamun": "/images/gulab-jamun.jpg",
  "Jalebi": "/images/jalebi.jpg",
  
  // Fast Food
  "Chicken Burger": "/images/chicken-burger.jpg",
  "Zinger Burger": "/images/zinger-burger.jpg",
  "French Fries": "/images/french-fries.jpg",
  "Chicken Nuggets": "/images/chicken-nuggets.jpg",
  "Peri Peri": "/images/peri-peri.jpg",
  "Grilled Chicken": "/images/grilled-chicken.jpg",
  
  // Pan Asian
  "Noodle Bowl": "/images/noodle-bowl.jpg",
  "Fried Rice": "/images/fried-rice.jpg",
  "Chow Mein": "/images/chow-mein.jpg",
  "Spring Rolls": "/images/spring-rolls.jpg",
  "Dumplings": "/images/dumplings.jpg",
  "Stir Fry": "/images/stir-fry.jpg",
  
  // Grocery
  "Snacks": "/images/snacks.jpg",
  "Sauces & Spices": "/images/sauces-spices.jpg",
  "Beverages": "/images/beverages.jpg",
  "Cooking Oils": "/images/cooking-oils.jpg",
  
  // Deli
  "Deli Chicken": "/images/deli-chicken.jpg",
  "Deli Beef": "/images/deli-beef.jpg",
  "Cold Cuts": "/images/cold-cuts.jpg",
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Find category by slug
  const category = mockCategories.find((c) => c.slug === slug);
  
  if (!category) notFound();

  // Get subcategories (children) - FILTER OUT the one that matches parent name
  const subcategories = (category.children || []).filter(
    (sub: any) => sub.name !== category.name
  );

  const hasSubcategories = subcategories.length > 0;

  return (
    <main className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-6">
      {/* Breadcrumb */}
      <nav className="mb-3 text-xs text-gray-500 sm:mb-4 sm:text-sm">
        <Link href="/" className="hover:text-[#242222] hover:underline">
          Home
        </Link>
        <span className="mx-1 sm:mx-2">/</span>
        <span className="text-[#242222] font-medium">{category.name}</span>
      </nav>

      {/* Welcome Banner */}
      <div className="mb-4 rounded-lg bg-[#BDD390]/20 p-3 sm:mb-6 sm:p-4">
        <p className="text-xs font-medium text-[#242222] sm:text-sm">Welcome to Cozy Cup</p>
      </div>

      <h1 className="mb-4 text-xl font-bold text-[#242222] sm:mb-6 sm:text-2xl">{category.name}</h1>

      {/* Subcategories Grid - Mobile Responsive with proper image sizing */}
      {hasSubcategories ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-4 md:gap-5 lg:gap-6">
          {subcategories.map((sub: any) => (
            <Link
              key={sub.id}
              href={`/shop/${category.slug}/${sub.slug}`}
              className="group flex flex-col items-center rounded-xl bg-[#F3EDD8] p-2 transition-all duration-300 hover:ring-2 hover:ring-[#242222] hover:shadow-lg hover:scale-105 sm:rounded-2xl sm:p-4"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={subcategoryImages[sub.name] || "/images/bread1.jpg"}
                  alt={sub.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
              </div>
              <span className="mt-2 text-center text-[10px] font-medium text-gray-700 transition-colors duration-300 group-hover:text-[#242222] sm:mt-3 sm:text-xs md:text-sm">
                {sub.name}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-[#F3EDD8] p-6 text-center sm:p-8">
          <p className="text-xs text-gray-500 sm:text-sm">No subcategories found.</p>
        </div>
      )}
    </main>
  );
}