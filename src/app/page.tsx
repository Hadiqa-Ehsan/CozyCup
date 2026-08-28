import { HeroCarousel } from "@/components/hero-carousel";
import { CategoryGrid } from "@/components/category-grid";
import { CategoryProductScroll } from "@/components/category-product-scroll";

// Category Data with Products
const categoryData = {
  Bakery: {
    banner: "/images/bakery-banner.jpg",
    products: [
      { id: "b1", name: "Bread", slug: "bread", price: 298, unit: "400g", image: "/images/bread.jpg", discount: null },
      { id: "b2", name: "Cakes", slug: "cakes", price: 1598, unit: "500g", image: "/images/cakes.jpg", discount: null },
      { id: "b3", name: "Pastries", slug: "pastries", price: 398, unit: "1 pc", image: "/images/pastries.jpg", discount: null },
      { id: "b4", name: "Donuts", slug: "donuts", price: 198, unit: "1 pc", image: "/images/donuts.jpg", discount: null },
      { id: "b5", name: "Brownies", slug: "brownies", price: 298, unit: "250g", image: "/images/brownie.jpg", discount: null },
      { id: "b6", name: "Buns", slug: "buns", price: 248, unit: "6 pcs", image: "/images/buns.jpg", discount: null },
      { id: "b7", name: "Biscuits", slug: "biscuits", price: 198, unit: "200g", image: "/images/biscuits.jpg", discount: null },
      { id: "b8", name: "Rusk", slug: "rusk", price: 298, unit: "200g", image: "/images/rusk.jpg", discount: null },
    ],
  },

  Dairy: {
    banner: "/images/dairy-banner.jpg",
    products: [
      { id: "d1", name: "Fresh Milk", slug: "fresh-milk", price: 248, unit: "1 lit", image: "/images/fresh-milk.jpg", discount: null },
      { id: "d2", name: "Yogurt", slug: "yogurt", price: 198, unit: "500g", image: "/images/yogurt.jpg", discount: null },
      { id: "d3", name: "Cheese", slug: "cheese", price: 398, unit: "200g", image: "/images/cheese.jpg", discount: null },
      { id: "d4", name: "Butter", slug: "butter", price: 298, unit: "500g", image: "/images/butter.jpg", discount: null },
      { id: "d5", name: "Cream", slug: "cream", price: 348, unit: "500ml", image: "/images/cream.jpg", discount: null },
      { id: "d6", name: "Ghee", slug: "ghee", price: 598, unit: "1 kg", image: "/images/ghee.jpg", discount: null },
      { id: "d7", name: "Ice Cream", slug: "ice-cream", price: 998, unit: "1 lit", image: "/images/ice-cream.jpg", discount: null },
    ],
  },

  Sweets: {
    banner: "/images/sweets-banner.jpg",
    products: [
      { id: "s1", name: "Mango Cake", slug: "mango-cake", price: 1998, unit: "500g", image: "/images/mango-cake.jpg", discount: "Save Rs.500" },
      { id: "s2", name: "Chocolate Cake", slug: "chocolate-cake", price: 1598, unit: "500g", image: "/images/chocolate-cake.jpg", discount: null },
      { id: "s3", name: "Brownie", slug: "brownie", price: 298, unit: "250g", image: "/images/brownie.jpg", discount: null },
      { id: "s4", name: "Donut", slug: "donut", price: 198, unit: "1 pc", image: "/images/donuts.jpg", discount: null },
      { id: "s5", name: "Cupcake", slug: "cupcake", price: 248, unit: "1 pc", image: "/images/cupcake.jpg", discount: null },
      { id: "s6", name: "Pastry", slug: "pastry", price: 298, unit: "1 pc", image: "/images/pastry.jpg", discount: null },
      { id: "s7", name: "Gulab Jamun", slug: "gulab-jamun", price: 398, unit: "250g", image: "/images/gulab-jamun.jpg", discount: null },
      { id: "s8", name: "Jalebi", slug: "jalebi", price: 298, unit: "250g", image: "/images/jalebi.jpg", discount: null },
    ],
  },

  "Fast Food": {
    banner: "/images/fast-food-banner.jpg",
    products: [
      { id: "f1", name: "Chicken Burger", slug: "chicken-burger", price: 498, unit: "1 pc", image: "/images/chicken-burger.jpg", discount: null },
      { id: "f2", name: "Zinger Burger", slug: "zinger-burger", price: 698, unit: "1 pc", image: "/images/zinger-burger.jpg", discount: null },
      { id: "f3", name: "French Fries", slug: "french-fries", price: 298, unit: "1 pc", image: "/images/french-fries.jpg", discount: null },
      { id: "f4", name: "Chicken Nuggets", slug: "chicken-nuggets", price: 398, unit: "6 pcs", image: "/images/chicken-nuggets.jpg", discount: null },
      { id: "f5", name: "Peri Peri", slug: "peri-peri", price: 598, unit: "1 pc", image: "/images/peri-peri.jpg", discount: null },
      { id: "f6", name: "Grilled Chicken", slug: "grilled-chicken", price: 998, unit: "1 pc", image: "/images/grilled-chicken.jpg", discount: null },
    ],
  },

  "Pan Asian": {
    banner: "/images/pan-asian-banner.jpg",
    products: [
      { id: "p1", name: "Noodle Bowl", slug: "noodle-bowl", price: 598, unit: "1 bowl", image: "/images/noodle-bowl.jpg", discount: null },
      { id: "p2", name: "Fried Rice", slug: "fried-rice", price: 498, unit: "1 bowl", image: "/images/fried-rice.jpg", discount: null },
      { id: "p3", name: "Chow Mein", slug: "chow-mein", price: 548, unit: "1 bowl", image: "/images/chow-mein.jpg", discount: null },
      { id: "p4", name: "Spring Rolls", slug: "spring-rolls", price: 398, unit: "6 pcs", image: "/images/spring-rolls.jpg", discount: null },
      { id: "p5", name: "Dumplings", slug: "dumplings", price: 498, unit: "6 pcs", image: "/images/dumplings.jpg", discount: null },
      { id: "p6", name: "Stir Fry", slug: "stir-fry", price: 598, unit: "1 bowl", image: "/images/stir-fry.jpg", discount: null },
    ],
  },

  Grocery: {
    banner: "/images/grocery-banner.jpg",
    products: [
      { id: "g1", name: "Snacks", slug: "snacks", price: 298, unit: "150g", image: "/images/snacks.jpg", discount: null },
      { id: "g2", name: "Sauces & Spices", slug: "sauces-spices", price: 198, unit: "100g", image: "/images/sauces-spices.jpg", discount: null },
      { id: "g3", name: "Beverages", slug: "beverages", price: 148, unit: "500ml", image: "/images/beverages.jpg", discount: null },
      { id: "g4", name: "Cooking Oils", slug: "cooking-oils", price: 898, unit: "5 lit", image: "/images/cooking-oils.jpg", discount: null },
    ],
  },

  Deli: {
    banner: "/images/deli-banner.jpg",
    products: [
      { id: "l1", name: "Deli Chicken", slug: "deli-chicken", price: 798, unit: "1 kg", image: "/images/deli-chicken.jpg", discount: null },
      { id: "l2", name: "Deli Beef", slug: "deli-beef", price: 998, unit: "1 kg", image: "/images/deli-beef.jpg", discount: null },
      { id: "l3", name: "Cold Cuts", slug: "cold-cuts", price: 698, unit: "500g", image: "/images/cold-cuts.jpg", discount: null },
    ],
  },
};

const mockCategories = [
  { id: "1", name: "Bakery", slug: "bakery", icon: "🍞", children: [] },
  { id: "2", name: "Dairy", slug: "dairy", icon: "🥛", children: [] },
  { id: "3", name: "Sweets", slug: "sweets", icon: "🍬", children: [] },
  { id: "4", name: "Fast Food", slug: "fast-food", icon: "🍔", children: [] },
  { id: "5", name: "Pan Asian", slug: "pan-asian", icon: "🥢", children: [] },
  { id: "6", name: "Grocery", slug: "grocery", icon: "🛒", children: [] },
  { id: "7", name: "Deli", slug: "deli", icon: "🥓", children: [] },
];

export default async function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 bg-[#F3EDD8] min-h-screen">

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Category Grid */}
      <CategoryGrid categories={mockCategories} />

      {/* Category Product Scrolls */}
      {mockCategories.map((category) => {
        const data =
          categoryData[category.name as keyof typeof categoryData];

        if (!data || data.products.length === 0) return null;

        return (
          <CategoryProductScroll
            key={category.id}
            categoryName={category.name}
            bannerImage={data.banner}
            products={data.products}
            viewAllLink={`/shop/${category.slug}`}
            productLinkPrefix={`/shop/${category.slug}`}
          />
        );
      })}

      {/* SEO Text Section */}
      <section className="mt-16 border-t border-[#D4C9B8] pt-8">
        <div className="prose max-w-none text-[#242222]">
          <h1 className="text-xl font-bold text-[#242222]">
            Cozy Cup – Your Trusted Online Store for Coffee, Bakery, Fast Food
            & Daily Essentials
          </h1>

          <p className="mt-4 text-sm leading-relaxed">
            Welcome to Cozy Cup, your trusted destination for premium coffee,
            fresh bakery products, delicious fast food, beverages, 100% dairy
            products, fresh fruits, vegetables, imported foods and everyday
            household essentials. We offer a wide range of high-quality
            products from leading local and international brands at
            competitive prices. Whether you are looking for fresh produce,
            bakery delights, frozen foods, snacks, beverages, personal care
            products or household essentials, Cozy Cup makes shopping easy
            with secure online ordering and fast delivery. Our commitment to
            quality, freshness and customer satisfaction has made us one of the
            preferred stores in Pakistan. Shop online today and enjoy fresh
            products, great offers and convenient doorstep delivery with Cozy
            Cup.
          </p>
        </div>
      </section>
    </main>
  );
}