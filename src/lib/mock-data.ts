export const mockCategories = [
  { id: "1", name: "Bakery", slug: "bakery", icon: "🍞", children: [] },
  { id: "2", name: "Dairy", slug: "dairy", icon: "🥛", children: [] },
  { id: "3", name: "Sweets", slug: "sweets", icon: "🍬", children: [] },
  { id: "4", name: "Fast Food", slug: "fast-food", icon: "🍔", children: [] },
  { id: "5", name: "Pan Asian", slug: "pan-asian", icon: "🥢", children: [] },
  { id: "6", name: "Grocery", slug: "grocery", icon: "🛒", children: [] },
  { id: "7", name: "Deli", slug: "deli", icon: "🥓", children: [] },
];

export const mockProducts = [
  { id: "1", name: "Grilled Chicken Quarter", slug: "grilled-chicken", priceCents: 99800, stock: 10, isDeal: false, currency: "PKR", unit: "1 pc", categorySlug: "bakery", imageUrl: "/images/bread1.jpg" },
  { id: "2", name: "Breast Fillet", slug: "breast-fillet", priceCents: 59800, stock: 10, isDeal: false, currency: "PKR", unit: "1 pc", categorySlug: "bakery", imageUrl: "/images/bread2.jpg" },
  { id: "3", name: "JS Crust Roll", slug: "js-crust-roll", priceCents: 49500, stock: 10, isDeal: false, currency: "PKR", unit: "1 pc", categorySlug: "bakery", imageUrl: "/images/cake1.jpg" },
  { id: "4", name: "JS Cheese Crust Roll", slug: "js-cheese-crust", priceCents: 59500, stock: 10, isDeal: false, currency: "PKR", unit: "1 pc", categorySlug: "bakery", imageUrl: "/images/cake2.jpg" },
  { id: "5", name: "Fresh Milk", slug: "fresh-milk", priceCents: 24800, stock: 10, isDeal: false, currency: "PKR", unit: "1 lit", categorySlug: "dairy", imageUrl: "/images/ice1.jpg" },
  { id: "6", name: "Yogurt", slug: "yogurt", priceCents: 19800, stock: 10, isDeal: false, currency: "PKR", unit: "500g", categorySlug: "dairy", imageUrl: "/images/ice2.jpg" },
  { id: "7", name: "Mango Milk Cake", slug: "mango-cake", priceCents: 199800, stock: 10, isDeal: true, dealPriceCents: 149800, currency: "PKR", unit: "500g", categorySlug: "sweets", imageUrl: "/images/cake1.jpg" },
  { id: "8", name: "Chocolate Cake", slug: "chocolate-cake", priceCents: 159800, stock: 10, isDeal: false, currency: "PKR", unit: "500g", categorySlug: "sweets", imageUrl: "/images/cake2.jpg" },
];