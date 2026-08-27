import { HeroCarousel } from "@/components/hero-carousel";
import { CategoryGrid } from "@/components/category-grid";
import { CategoryProductScroll } from "@/components/category-product-scroll";

// Category Data with Products
const categoryData = {
  "Bakery": {
    banner: "/images/bread1.jpg",
    products: [
      { id: "b1", name: "Grilled Chicken Quarter", slug: "grilled-chicken", price: 998, unit: "1 pc", image: "/images/bread1.jpg", discount: null },
      { id: "b2", name: "Breast Fillet", slug: "breast-fillet", price: 598, unit: "1 pc", image: "/images/bread2.jpg", discount: null },
      { id: "b3", name: "JS Crust Roll", slug: "js-crust-roll", price: 495, unit: "1 pc", image: "/images/cake1.jpg", discount: null },
      { id: "b4", name: "JS Cheese Crust Roll", slug: "js-cheese-crust", price: 595, unit: "1 pc", image: "/images/cake2.jpg", discount: null },
      { id: "b5", name: "JS Baked Chicken 9 pcs", slug: "js-baked-chicken", price: 1498, unit: "9 pcs", image: "/images/bread1.jpg", discount: "25% OFF" },
      { id: "b6", name: "Peri Peri Sandwich", slug: "peri-peri-sandwich", price: 598, unit: "1 pc", image: "/images/bread2.jpg", discount: "14% OFF" },
      { id: "b7", name: "Fajita-flavour", slug: "fajita-flavour", price: 598, unit: "1 pc", image: "/images/cake1.jpg", discount: null },
      { id: "b8", name: "Chicken Burger", slug: "chicken-burger", price: 498, unit: "1 pc", image: "/images/bread1.jpg", discount: null },
    ]
  },
  "Dairy": {
    banner: "/images/ice1.jpg",
    products: [
      { id: "d1", name: "Fresh Milk", slug: "fresh-milk", price: 248, unit: "1 lit", image: "/images/ice1.jpg", discount: null },
      { id: "d2", name: "Yogurt", slug: "yogurt", price: 198, unit: "500g", image: "/images/ice2.jpg", discount: null },
      { id: "d3", name: "Cheese", slug: "cheese", price: 398, unit: "200g", image: "/images/ice3.jpg", discount: null },
      { id: "d4", name: "Butter", slug: "butter", price: 298, unit: "500g", image: "/images/ice1.jpg", discount: null },
      { id: "d5", name: "Cream", slug: "cream", price: 348, unit: "500ml", image: "/images/ice2.jpg", discount: null },
      { id: "d6", name: "Ghee", slug: "ghee", price: 598, unit: "1 kg", image: "/images/ice3.jpg", discount: null },
    ]
  },
  "Sweets": {
    banner: "/images/cake1.jpg",
    products: [
      { id: "s1", name: "Mango Milk Cake", slug: "mango-cake", price: 1998, unit: "500g", image: "/images/cake1.jpg", discount: "Save Rs.500" },
      { id: "s2", name: "Chocolate Cake", slug: "chocolate-cake", price: 1598, unit: "500g", image: "/images/cake2.jpg", discount: null },
      { id: "s3", name: "Brownie", slug: "brownie", price: 298, unit: "250g", image: "/images/cake1.jpg", discount: null },
      { id: "s4", name: "Donut", slug: "donut", price: 198, unit: "1 pc", image: "/images/cake2.jpg", discount: null },
      { id: "s5", name: "Cupcake", slug: "cupcake", price: 248, unit: "1 pc", image: "/images/cake1.jpg", discount: null },
      { id: "s6", name: "Pastry", slug: "pastry", price: 298, unit: "1 pc", image: "/images/cake2.jpg", discount: null },
    ]
  },
  "Fast Food": {
    banner: "/images/bread2.jpg",
    products: [
      { id: "f1", name: "Fajita-flavour", slug: "fajita-flavour", price: 598, unit: "1 pc", image: "/images/bread1.jpg", discount: "14% OFF" },
      { id: "f2", name: "Chicken Burger", slug: "chicken-burger", price: 498, unit: "1 pc", image: "/images/bread2.jpg", discount: null },
      { id: "f3", name: "Zinger Burger", slug: "zinger-burger", price: 698, unit: "1 pc", image: "/images/cake1.jpg", discount: null },
      { id: "f4", name: "French Fries", slug: "french-fries", price: 298, unit: "1 pc", image: "/images/cake2.jpg", discount: null },
      { id: "f5", name: "Chicken Nuggets", slug: "chicken-nuggets", price: 398, unit: "6 pcs", image: "/images/bread1.jpg", discount: null },
    ]
  },
  "Pan Asian": {
    banner: "/images/ice2.jpg",
    products: [
      { id: "p1", name: "Noodle Bowl", slug: "noodle-bowl", price: 598, unit: "1 bowl", image: "/images/ice1.jpg", discount: null },
      { id: "p2", name: "Fried Rice", slug: "fried-rice", price: 498, unit: "1 bowl", image: "/images/ice2.jpg", discount: null },
      { id: "p3", name: "Chow Mein", slug: "chow-mein", price: 548, unit: "1 bowl", image: "/images/ice3.jpg", discount: null },
      { id: "p4", name: "Spring Rolls", slug: "spring-rolls", price: 398, unit: "6 pcs", image: "/images/ice1.jpg", discount: null },
      { id: "p5", name: "Dumplings", slug: "dumplings", price: 498, unit: "6 pcs", image: "/images/ice2.jpg", discount: null },
    ]
  },
  "Grocery": {
    banner: "/images/ice3.jpg",
    products: [
      { id: "g1", name: "Nestlé Milk", slug: "nestle-milk", price: 248, unit: "1 lit", image: "/images/ice1.jpg", discount: null },
      { id: "g2", name: "ARIEL", slug: "ariel", price: 598, unit: "1 kg", image: "/images/ice2.jpg", discount: null },
      { id: "g3", name: "Dove", slug: "dove", price: 398, unit: "500g", image: "/images/ice3.jpg", discount: null },
      { id: "g4", name: "Monarch", slug: "monarch", price: 298, unit: "1 kg", image: "/images/ice1.jpg", discount: null },
      { id: "g5", name: "Fanta", slug: "fanta", price: 148, unit: "500ml", image: "/images/ice2.jpg", discount: null },
      { id: "g6", name: "Tide", slug: "tide", price: 698, unit: "1 kg", image: "/images/ice3.jpg", discount: null },
      { id: "g7", name: "Lipton", slug: "lipton", price: 198, unit: "100g", image: "/images/ice1.jpg", discount: null },
      { id: "g8", name: "Green Tea", slug: "green-tea", price: 298, unit: "100g", image: "/images/ice2.jpg", discount: null },
      { id: "g9", name: "Pringles", slug: "pringles", price: 398, unit: "150g", image: "/images/ice3.jpg", discount: null },
      { id: "g10", name: "Ruffle", slug: "ruffle", price: 348, unit: "150g", image: "/images/ice1.jpg", discount: null },
      { id: "g11", name: "Almonds", slug: "almonds", price: 798, unit: "500g", image: "/images/ice2.jpg", discount: null },
    ]
  },
  "Deli": {
    banner: "/images/bread1.jpg",
    products: [
      { id: "l1", name: "Deli Chicken", slug: "deli-chicken", price: 798, unit: "1 kg", image: "/images/bread1.jpg", discount: null },
      { id: "l2", name: "Deli Beef", slug: "deli-beef", price: 998, unit: "1 kg", image: "/images/bread2.jpg", discount: null },
      { id: "l3", name: "Deli Turkey", slug: "deli-turkey", price: 898, unit: "1 kg", image: "/images/cake1.jpg", discount: null },
      { id: "l4", name: "Deli Ham", slug: "deli-ham", price: 698, unit: "1 kg", image: "/images/cake2.jpg", discount: null },
      { id: "l5", name: "Deli Salami", slug: "deli-salami", price: 798, unit: "1 kg", image: "/images/bread1.jpg", discount: null },
    ]
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
    <main className="mx-auto max-w-7xl px-4 py-6">
      <HeroCarousel />
      <CategoryGrid categories={mockCategories} />

      {mockCategories.map((category) => {
        const data = categoryData[category.name as keyof typeof categoryData];
        if (!data || data.products.length === 0) return null;

        return (
          <CategoryProductScroll
            key={category.id}
            categoryName={category.name}
            bannerImage={data.banner}
            products={data.products}
            viewAllLink={`/shop/${category.slug}`}
          />
        );
      })}

      {/* SEO Text Section - Below All Categories */}
      <section className="mt-16 border-t border-gray-200 pt-8">
        <div className="prose max-w-none text-gray-600">
          <h1 className="text-xl font-bold text-[#C8102E]">
            Jalal Sons – Your Trusted Online Superstore for Fresh Food, Bakery, fast food, Pan Asian & Daily Essentials
          </h1>
          <p className="mt-4 text-sm leading-relaxed">
            Welcome to Jalal Sons, your trusted destination for premium groceries, fresh bakery products, delicious Pan Asian, fast food, beverages, 100% dairy products, fresh fruits, vegetables, imported foods and everyday household essentials. We offer a wide range of high-quality products from leading local and international brands at competitive prices. Whether you are looking for fresh produce, bakery delights, frozen foods, snacks, beverages, personal care products or household essentials, Jalal Sons makes shopping easy with secure online ordering and fast delivery. Our commitment to quality, freshness and customer satisfaction has made us one of the preferred superstores in Pakistan. Shop online today and enjoy fresh products, great offers and convenient doorstep delivery with Jalal Sons.
          </p>
        </div>
      </section>
    </main>
  );
}