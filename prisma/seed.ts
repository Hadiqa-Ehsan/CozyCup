import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Category names below match real Jalal Sons category names (confirmed via
// search of the live site's category listing). Product names/prices are
// SAMPLE data — the real catalog could not be scraped from the live
// JS-rendered site, so a realistic representative subset is used instead.
// A few prices (marked below) are taken from a verified third-party listing
// of real Jalal Sons branch prices; the rest are reasonable estimates.

type CategorySeed = {
  name: string;
  slug: string;
  icon: string;
  children?: { name: string; slug: string; icon: string }[];
};

const categories: CategorySeed[] = [
  { name: "Fresh Produce", slug: "fresh-produce", icon: "🥦" },
  {
    name: "Fresh Milk And Eggs",
    slug: "fresh-milk-and-eggs",
    icon: "🥛",
    children: [{ name: "Js Dairy", slug: "js-dairy", icon: "🧀" }],
  },
  {
    name: "Bakery",
    slug: "bakery",
    icon: "🍞",
    children: [
      { name: "Bread", slug: "bread", icon: "🍞" },
      { name: "Buns", slug: "buns", icon: "🥐" },
      { name: "Pastries", slug: "pastries", icon: "🥮" },
      { name: "Cakes", slug: "cakes", icon: "🎂" },
    ],
  },
  { name: "Beverages", slug: "beverages", icon: "🥤" },
  { name: "Biscuits, Crisps and Snacks", slug: "biscuits-crisps-snacks", icon: "🍪" },
  { name: "Frozen Foods", slug: "frozen-foods", icon: "🧊" },
  { name: "Cereal, Jams And Spreads", slug: "cereal-jams-spreads", icon: "🥣" },
  { name: "Flour, Rice And Pulses", slug: "flour-rice-pulses", icon: "🌾" },
  { name: "Ghee And Oil", slug: "ghee-and-oil", icon: "🫒" },
  { name: "Ketchup, Sauce And Mayo", slug: "ketchup-sauce-mayo", icon: "🍅" },
  { name: "Confectionery And Chocolates", slug: "confectionery-chocolates", icon: "🍫" },
  { name: "Cleaning Products", slug: "cleaning-products", icon: "🧼" },
  { name: "Personal Hygiene", slug: "personal-hygiene", icon: "🧴" },
  { name: "Diapers And Pampers", slug: "diapers-and-pampers", icon: "🍼" },
  { name: "Mineral Water", slug: "mineral-water", icon: "💧" },
  { name: "Pizza", slug: "pizza", icon: "🍕" },
  { name: "Icecream", slug: "icecream", icon: "🍦" },
  { name: "Pet Food", slug: "pet-food", icon: "🐾" },
];

// Prices are in paisa (PKR cents): Rs 415.00 => 41500
type ProductSeed = {
  name: string;
  slug: string;
  description: string;
  unit: string;
  priceCents: number;
  dealPriceCents?: number;
  stock: number;
  isFeatured?: boolean;
  isDeal?: boolean;
  categorySlug: string;
};

const products: ProductSeed[] = [
  // Fresh Produce
  { name: "Fresh Chaunsa Mangoes", slug: "fresh-chaunsa-mangoes-1kg", description: "Sweet, ripe chaunsa mangoes.", unit: "1kg", priceCents: 41500, stock: 60, isFeatured: true, categorySlug: "fresh-produce" },
  { name: "Potato (Aalu) Mix", slug: "potato-aalu-mix-1kg", description: "Fresh mixed-size potatoes.", unit: "1kg", priceCents: 5000, stock: 200, categorySlug: "fresh-produce" },
  { name: "Fresh Cabbage Green (Bund Gobi)", slug: "fresh-cabbage-green-1pc", description: "Locally sourced green cabbage.", unit: "1 Piece", priceCents: 11000, stock: 80, categorySlug: "fresh-produce" },
  { name: "Onion (Pyaz)", slug: "onion-pyaz-1kg", description: "Fresh red onions.", unit: "1kg", priceCents: 6000, stock: 150, categorySlug: "fresh-produce" },

  // Fresh Milk And Eggs
  { name: "Olper's Full Cream Milk", slug: "olpers-full-cream-milk-1-5l", description: "Full cream UHT milk.", unit: "1.5L", priceCents: 57000, stock: 100, isFeatured: true, categorySlug: "fresh-milk-and-eggs" },
  { name: "Prema Whole Milk", slug: "prema-whole-milk-1l", description: "Fresh whole milk.", unit: "1L", priceCents: 42700, stock: 90, categorySlug: "fresh-milk-and-eggs" },
  { name: "Farm Fresh Eggs", slug: "farm-fresh-eggs-dozen", description: "Grade A fresh eggs.", unit: "1 Dozen", priceCents: 39000, stock: 70, categorySlug: "fresh-milk-and-eggs" },
  { name: "Anhaar Full Cream Milk Bottle", slug: "anhaar-full-cream-milk-1l", description: "Full cream milk in a bottle.", unit: "1L", priceCents: 41100, stock: 60, categorySlug: "js-dairy" },

  // Bakery > Bread
  { name: "JS Plain Rusk", slug: "js-plain-rusk-1unit", description: "Classic plain rusk.", unit: "1 Unit", priceCents: 54800, stock: 80, categorySlug: "bread" },
  { name: "JS Butter Rusk", slug: "js-butter-rusk-1unit", description: "Buttery rusk, freshly baked.", unit: "1 Unit", priceCents: 65800, stock: 70, categorySlug: "bread" },
  { name: "White Sandwich Bread", slug: "white-sandwich-bread-1loaf", description: "Soft white sandwich bread.", unit: "1 Loaf", priceCents: 32000, stock: 90, categorySlug: "bread" },

  // Bakery > Buns
  { name: "Burger Buns", slug: "burger-buns-4pack", description: "Soft sesame burger buns.", unit: "Pack of 4", priceCents: 28000, stock: 60, categorySlug: "buns" },
  { name: "Dinner Rolls", slug: "dinner-rolls-6pack", description: "Soft dinner rolls.", unit: "Pack of 6", priceCents: 31000, stock: 50, categorySlug: "buns" },

  // Bakery > Pastries
  { name: "Chicken Patties", slug: "chicken-patties-1pc", description: "Flaky chicken patty.", unit: "1 Piece", priceCents: 15000, stock: 100, categorySlug: "pastries" },
  { name: "Cream Roll", slug: "cream-roll-1pc", description: "Classic bakery cream roll.", unit: "1 Piece", priceCents: 12000, stock: 100, categorySlug: "pastries" },

  // Bakery > Cakes
  { name: "Chocolate Fudge Cake", slug: "chocolate-fudge-cake-1kg", description: "Rich chocolate fudge cake.", unit: "1kg", priceCents: 185000, stock: 20, isFeatured: true, categorySlug: "cakes" },
  { name: "Black Forest Cake", slug: "black-forest-cake-1kg", description: "Classic black forest cake.", unit: "1kg", priceCents: 195000, stock: 20, categorySlug: "cakes" },

  // Beverages
  { name: "Coca-Cola", slug: "coca-cola-1-5l", description: "Chilled soft drink.", unit: "1.5L", priceCents: 25000, stock: 150, categorySlug: "beverages" },
  { name: "Nescafe Classic Instant Coffee", slug: "nescafe-classic-200g", description: "Instant coffee jar.", unit: "200g", priceCents: 129000, stock: 40, isDeal: true, dealPriceCents: 115000, categorySlug: "beverages" },
  { name: "Fresh Orange Juice", slug: "fresh-orange-juice-1l", description: "100% fresh orange juice.", unit: "1L", priceCents: 62000, stock: 40, categorySlug: "beverages" },

  // Biscuits, Crisps and Snacks
  { name: "Lays Classic Salted Chips", slug: "lays-classic-salted-40g", description: "Crispy potato chips.", unit: "40g", priceCents: 8000, stock: 200, categorySlug: "biscuits-crisps-snacks" },
  { name: "Peek Freans Sooper Biscuits", slug: "peek-freans-sooper-1pack", description: "Sweet crunchy biscuits.", unit: "1 Pack", priceCents: 12000, stock: 150, isDeal: true, dealPriceCents: 10500, categorySlug: "biscuits-crisps-snacks" },

  // Frozen Foods
  { name: "K&N Boneless Handi", slug: "kn-boneless-handi-500g", description: "Ready-to-cook chicken handi.", unit: "500g", priceCents: 75800, stock: 40, categorySlug: "frozen-foods" },
  { name: "K&N Chicken Drumsticks", slug: "kn-drumsticks-1kg", description: "Frozen chicken drumsticks.", unit: "1kg", priceCents: 99800, stock: 40, categorySlug: "frozen-foods" },
  { name: "K&N Chicken Nuggets", slug: "kn-nuggets-1kg", description: "Breaded chicken nuggets.", unit: "1kg", priceCents: 135800, stock: 40, isFeatured: true, categorySlug: "frozen-foods" },

  // Cereal, Jams And Spreads
  { name: "Kissan Mixed Fruit Jam", slug: "kissan-mixed-fruit-jam-450g", description: "Classic mixed fruit jam.", unit: "450g", priceCents: 68000, stock: 60, categorySlug: "cereal-jams-spreads" },
  { name: "Kelloggs Corn Flakes", slug: "kelloggs-corn-flakes-475g", description: "Crunchy corn flakes cereal.", unit: "475g", priceCents: 89000, stock: 50, categorySlug: "cereal-jams-spreads" },

  // Flour, Rice And Pulses
  { name: "Basmati Rice", slug: "basmati-rice-5kg", description: "Premium long-grain basmati rice.", unit: "5kg", priceCents: 129900, stock: 50, isFeatured: true, categorySlug: "flour-rice-pulses" },
  { name: "Wheat Flour (Atta)", slug: "wheat-flour-atta-10kg", description: "Whole wheat flour.", unit: "10kg", priceCents: 145000, stock: 50, categorySlug: "flour-rice-pulses" },
  { name: "Red Lentils (Masoor Daal)", slug: "red-lentils-masoor-daal-1kg", description: "Split red lentils.", unit: "1kg", priceCents: 42000, stock: 70, categorySlug: "flour-rice-pulses" },

  // Ghee And Oil
  { name: "Dalda Cooking Oil", slug: "dalda-cooking-oil-5l", description: "All-purpose cooking oil.", unit: "5L", priceCents: 285000, stock: 30, categorySlug: "ghee-and-oil" },
  { name: "Habib Banaspati Ghee", slug: "habib-banaspati-ghee-2-5kg", description: "Vegetable ghee.", unit: "2.5kg", priceCents: 195000, stock: 25, categorySlug: "ghee-and-oil" },

  // Ketchup, Sauce And Mayo
  { name: "National Tomato Ketchup", slug: "national-tomato-ketchup-800g", description: "Rich tomato ketchup.", unit: "800g", priceCents: 55000, stock: 80, categorySlug: "ketchup-sauce-mayo" },
  { name: "Mayola Mayonnaise", slug: "mayola-mayonnaise-475ml", description: "Creamy mayonnaise.", unit: "475ml", priceCents: 62000, stock: 60, categorySlug: "ketchup-sauce-mayo" },

  // Confectionery And Chocolates
  { name: "Cadbury Dairy Milk", slug: "cadbury-dairy-milk-80g", description: "Classic milk chocolate bar.", unit: "80g", priceCents: 36000, stock: 100, isDeal: true, dealPriceCents: 32000, categorySlug: "confectionery-chocolates" },
  { name: "Kit Kat 4 Finger", slug: "kitkat-4-finger", description: "Crispy wafer chocolate bar.", unit: "1 Bar", priceCents: 15000, stock: 120, categorySlug: "confectionery-chocolates" },

  // Cleaning Products
  { name: "Dish Soap", slug: "dish-soap-1l", description: "Grease-cutting dish soap.", unit: "1L", priceCents: 45000, stock: 100, categorySlug: "cleaning-products" },
  { name: "Surf Excel Detergent Powder", slug: "surf-excel-detergent-1kg", description: "Powerful stain-removing detergent.", unit: "1kg", priceCents: 68000, stock: 70, isDeal: true, dealPriceCents: 61000, categorySlug: "cleaning-products" },

  // Personal Hygiene
  { name: "Lifebuoy Soap", slug: "lifebuoy-soap-3pack", description: "Germ-protection bar soap.", unit: "Pack of 3", priceCents: 38000, stock: 90, categorySlug: "personal-hygiene" },
  { name: "Colgate Toothpaste", slug: "colgate-toothpaste-150g", description: "Cavity protection toothpaste.", unit: "150g", priceCents: 32000, stock: 100, categorySlug: "personal-hygiene" },

  // Diapers And Pampers
  { name: "Pampers Baby Diapers", slug: "pampers-baby-diapers-medium", description: "Soft, absorbent baby diapers.", unit: "Medium, Pack of 20", priceCents: 98000, stock: 40, categorySlug: "diapers-and-pampers" },

  // Mineral Water
  { name: "Nestle Pure Life Water", slug: "nestle-pure-life-water-1-5l", description: "Purified mineral water.", unit: "1.5L", priceCents: 12000, stock: 200, categorySlug: "mineral-water" },

  // Pizza
  { name: "Chicken Tikka Pizza", slug: "chicken-tikka-pizza-medium", description: "Spicy chicken tikka pizza, oven-baked.", unit: "Medium", priceCents: 89000, stock: 30, isFeatured: true, categorySlug: "pizza" },
  { name: "Cheese Lovers Pizza", slug: "cheese-lovers-pizza-medium", description: "Loaded with mozzarella and cheddar.", unit: "Medium", priceCents: 85000, stock: 30, categorySlug: "pizza" },

  // Icecream
  { name: "Walls Cornetto", slug: "walls-cornetto-1pc", description: "Classic vanilla cornetto cone.", unit: "1 Piece", priceCents: 15000, stock: 100, categorySlug: "icecream" },

  // Pet Food
  { name: "Whiskas Cat Food", slug: "whiskas-cat-food-1-2kg", description: "Ocean fish flavour dry cat food.", unit: "1.2kg", priceCents: 89000, stock: 30, categorySlug: "pet-food" },
];

type BranchSeed = { name: string; city: string; area: string; address: string; phone: string };

// SAMPLE branch data — representative only. Real branch list/addresses were
// not accessible (loaded dynamically by the live site). TBD if exact data
// is needed later.
const branches: BranchSeed[] = [
  { name: "Jalal Sons Gulberg", city: "Lahore", area: "Gulberg", address: "Main Boulevard, Gulberg III, Lahore (sample address)", phone: "+92 42 111 000 000" },
  { name: "Jalal Sons DHA Phase 5", city: "Lahore", area: "DHA Phase 5", address: "Y-Block Commercial, DHA Phase 5, Lahore (sample address)", phone: "+92 42 111 000 001" },
  { name: "Jalal Sons Model Town", city: "Lahore", area: "Model Town", address: "Main Market, Model Town, Lahore (sample address)", phone: "+92 42 111 000 002" },
  { name: "Jalal Sons Bahria Town", city: "Lahore", area: "Bahria Town", address: "Sector C, Bahria Town, Lahore (sample address)", phone: "+92 42 111 000 003" },
  { name: "Jalal Sons Johar Town", city: "Lahore", area: "Johar Town", address: "Main Boulevard, Johar Town, Lahore (sample address)", phone: "+92 42 111 000 004" },
];

async function main() {
  for (const cat of categories) {
    const parent = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, icon: cat.icon },
      create: { name: cat.name, slug: cat.slug, icon: cat.icon },
    });
    if (cat.children) {
      for (const child of cat.children) {
        await prisma.category.upsert({
          where: { slug: child.slug },
          update: { name: child.name, icon: child.icon, parentId: parent.id },
          create: { name: child.name, slug: child.slug, icon: child.icon, parentId: parent.id },
        });
      }
    }
  }

  for (const p of products) {
    const category = await prisma.category.findUnique({ where: { slug: p.categorySlug } });
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        description: p.description,
        unit: p.unit,
        priceCents: p.priceCents,
        dealPriceCents: p.dealPriceCents,
        stock: p.stock,
        isFeatured: p.isFeatured ?? false,
        isDeal: p.isDeal ?? false,
        categoryId: category?.id,
      },
      create: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        unit: p.unit,
        priceCents: p.priceCents,
        dealPriceCents: p.dealPriceCents,
        currency: "PKR",
        stock: p.stock,
        isFeatured: p.isFeatured ?? false,
        isDeal: p.isDeal ?? false,
        categoryId: category?.id,
      },
    });
  }

  for (const b of branches) {
    const existing = await prisma.branch.findFirst({ where: { name: b.name } });
    if (!existing) {
      await prisma.branch.create({ data: b });
    }
  }

  console.log(`Seed complete: ${categories.length} top-level categories, ${products.length} products, ${branches.length} branches.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
