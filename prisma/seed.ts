import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Category/subcategory names and the "Salted Snacks" product list below are
// taken directly from screenshots of the real jalalsons.com.pk site (top
// nav: Bakery, Dairy, Sweets, Fast Food, Pan Asian, Grocery, Deli, Deals;
// Bakery subcategories: Salted Snacks, Bread, Brownies, Buns, Cakes, Cake
// Rusk, Desserts, Donuts & Cupcakes, Pastries, Puff Pastries, Rusk,
// Biscuits & Khatai). Everything else (other subcategories/products/prices)
// is realistic SAMPLE data — the full live catalog wasn't accessible to
// scrape in bulk.

type CategorySeed = {
  name: string;
  slug: string;
  children?: { name: string; slug: string }[];
};

const categories: CategorySeed[] = [
  {
    name: "Bakery",
    slug: "bakery",
    children: [
      { name: "Salted Snacks", slug: "salted-snacks" },
      { name: "Bread", slug: "bread" },
      { name: "Brownies", slug: "brownies" },
      { name: "Buns", slug: "buns" },
      { name: "Cakes", slug: "cakes" },
      { name: "Cake Rusk", slug: "cake-rusk" },
      { name: "Desserts", slug: "desserts" },
      { name: "Donuts & Cupcakes", slug: "donuts-cupcakes" },
      { name: "Pastries", slug: "pastries" },
      { name: "Puff Pastries", slug: "puff-pastries" },
      { name: "Rusk", slug: "rusk" },
      { name: "Biscuits & Khatai", slug: "biscuits-khatai" },
    ],
  },
  {
    name: "Dairy",
    slug: "dairy",
    children: [
      { name: "Milk", slug: "milk" },
      { name: "Eggs", slug: "eggs" },
      { name: "Yogurt", slug: "yogurt" },
      { name: "Cheese", slug: "cheese" },
      { name: "Butter & Cream", slug: "butter-cream" },
    ],
  },
  {
    name: "Sweets",
    slug: "sweets",
    children: [
      { name: "Traditional Mithai", slug: "traditional-mithai" },
      { name: "Gift Boxes", slug: "sweet-gift-boxes" },
    ],
  },
  {
    name: "Fast Food",
    slug: "fast-food",
    children: [
      { name: "Burgers", slug: "burgers" },
      { name: "Pizza", slug: "fast-food-pizza" },
      { name: "Fried Chicken", slug: "fried-chicken" },
      { name: "Sandwiches", slug: "sandwiches" },
    ],
  },
  {
    name: "Pan Asian",
    slug: "pan-asian",
    children: [
      { name: "Noodles", slug: "noodles" },
      { name: "Rice Dishes", slug: "rice-dishes" },
      { name: "Dim Sum", slug: "dim-sum" },
    ],
  },
  {
    name: "Grocery",
    slug: "grocery",
    children: [
      { name: "Cooking Oil & Ghee", slug: "cooking-oil-ghee" },
      { name: "Rice, Flour & Pulses", slug: "rice-flour-pulses" },
      { name: "Beverages", slug: "beverages" },
      { name: "Cleaning Products", slug: "cleaning-products" },
      { name: "Personal Care", slug: "personal-care" },
    ],
  },
  {
    name: "Deli",
    slug: "deli",
    children: [
      { name: "Cold Cuts", slug: "cold-cuts" },
      { name: "Cheese Counter", slug: "cheese-counter" },
    ],
  },
];

// Prices are in paisa (PKR cents): Rs 198.00 => 19800
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
  // Bakery > Salted Snacks — real product names/prices from the live site screenshots
  { name: "JS Plain Chips", slug: "js-plain-chips-150g", description: "Classic salted plain potato chips.", unit: "150g", priceCents: 19800, stock: 100, isFeatured: true, categorySlug: "salted-snacks" },
  { name: "JS Masala Chips", slug: "js-masala-chips-150g", description: "Spicy masala-flavoured potato chips.", unit: "150g", priceCents: 19800, stock: 100, categorySlug: "salted-snacks" },
  { name: "Js Dahi Phulki", slug: "js-dahi-phulki-200g", description: "Crunchy dahi phulki snack mix.", unit: "200g", priceCents: 39800, stock: 80, categorySlug: "salted-snacks" },
  { name: "Js Daal Mong", slug: "js-daal-mong-200g", description: "Crispy fried daal mong snack.", unit: "200g", priceCents: 39800, stock: 80, categorySlug: "salted-snacks" },
  { name: "JS Crispy Papri", slug: "js-crispy-papri-100g", description: "Crispy papri snack.", unit: "100g", priceCents: 19900, stock: 80, categorySlug: "salted-snacks" },
  { name: "JS Chatkhara Mix", slug: "js-chatkhara-mix-200g", description: "Tangy chatkhara-flavoured snack mix.", unit: "200g", priceCents: 39800, stock: 80, categorySlug: "salted-snacks" },

  // Bakery > Bread
  { name: "White Sandwich Bread", slug: "white-sandwich-bread-1loaf", description: "Soft white sandwich bread.", unit: "1 Loaf", priceCents: 32000, stock: 90, categorySlug: "bread" },
  { name: "Brown Bread", slug: "brown-bread-1loaf", description: "Whole wheat brown bread.", unit: "1 Loaf", priceCents: 35000, stock: 70, categorySlug: "bread" },

  // Bakery > Brownies
  { name: "Chocolate Fudge Brownie", slug: "chocolate-fudge-brownie-1pc", description: "Rich fudgy chocolate brownie.", unit: "1 Piece", priceCents: 25000, stock: 60, isDeal: true, dealPriceCents: 22000, categorySlug: "brownies" },

  // Bakery > Buns
  { name: "Burger Buns", slug: "burger-buns-4pack", description: "Soft sesame burger buns.", unit: "Pack of 4", priceCents: 28000, stock: 60, categorySlug: "buns" },
  { name: "Dinner Rolls", slug: "dinner-rolls-6pack", description: "Soft dinner rolls.", unit: "Pack of 6", priceCents: 31000, stock: 50, categorySlug: "buns" },

  // Bakery > Cakes
  { name: "Chocolate Fudge Cake", slug: "chocolate-fudge-cake-1kg", description: "Rich chocolate fudge cake.", unit: "1kg", priceCents: 185000, stock: 20, isFeatured: true, categorySlug: "cakes" },
  { name: "Black Forest Cake", slug: "black-forest-cake-1kg", description: "Classic black forest cake.", unit: "1kg", priceCents: 195000, stock: 20, categorySlug: "cakes" },
  { name: "Mango Milk Cake", slug: "mango-milk-cake-1kg", description: "Cake of the month — mango milk cake.", unit: "1kg", priceCents: 249800, dealPriceCents: 199800, stock: 15, isFeatured: true, isDeal: true, categorySlug: "cakes" },

  // Bakery > Cake Rusk
  { name: "JS Cake Rusk", slug: "js-cake-rusk-1pack", description: "Classic cake rusk, lightly sweetened.", unit: "1 Pack", priceCents: 45000, stock: 60, categorySlug: "cake-rusk" },

  // Bakery > Desserts
  { name: "Caramel Custard", slug: "caramel-custard-1pc", description: "Smooth caramel custard dessert cup.", unit: "1 Piece", priceCents: 22000, stock: 40, categorySlug: "desserts" },

  // Bakery > Donuts & Cupcakes
  { name: "Chocolate Glazed Donut", slug: "chocolate-glazed-donut-1pc", description: "Classic chocolate glazed donut.", unit: "1 Piece", priceCents: 18000, stock: 60, categorySlug: "donuts-cupcakes" },
  { name: "Vanilla Cupcake", slug: "vanilla-cupcake-1pc", description: "Soft vanilla cupcake with buttercream.", unit: "1 Piece", priceCents: 15000, stock: 60, categorySlug: "donuts-cupcakes" },

  // Bakery > Pastries
  { name: "Chicken Patties", slug: "chicken-patties-1pc", description: "Flaky chicken patty.", unit: "1 Piece", priceCents: 15000, stock: 100, categorySlug: "pastries" },
  { name: "Cream Roll", slug: "cream-roll-1pc", description: "Classic bakery cream roll.", unit: "1 Piece", priceCents: 12000, stock: 100, categorySlug: "pastries" },

  // Bakery > Puff Pastries
  { name: "Beef Puff Pastry", slug: "beef-puff-pastry-1pc", description: "Flaky pastry filled with spiced beef.", unit: "1 Piece", priceCents: 17000, stock: 60, categorySlug: "puff-pastries" },

  // Bakery > Rusk
  { name: "JS Plain Rusk", slug: "js-plain-rusk-1unit", description: "Classic plain rusk.", unit: "1 Unit", priceCents: 54800, stock: 80, categorySlug: "rusk" },
  { name: "JS Butter Rusk", slug: "js-butter-rusk-1unit", description: "Buttery rusk, freshly baked.", unit: "1 Unit", priceCents: 65800, stock: 70, categorySlug: "rusk" },

  // Bakery > Biscuits & Khatai
  { name: "Nankhatai", slug: "nankhatai-1pack", description: "Traditional shortbread-style biscuits.", unit: "1 Pack", priceCents: 35000, stock: 60, categorySlug: "biscuits-khatai" },
  { name: "Peek Freans Sooper Biscuits", slug: "peek-freans-sooper-1pack", description: "Sweet crunchy biscuits.", unit: "1 Pack", priceCents: 12000, stock: 150, isDeal: true, dealPriceCents: 10500, categorySlug: "biscuits-khatai" },

  // Dairy > Milk
  { name: "Olper's Full Cream Milk", slug: "olpers-full-cream-milk-1-5l", description: "Full cream UHT milk.", unit: "1.5L", priceCents: 57000, stock: 100, isFeatured: true, categorySlug: "milk" },
  { name: "100% Dairy Fresh Milk", slug: "100-dairy-fresh-milk-1-5l", description: "Fresh full-cream dairy milk.", unit: "1.5L", priceCents: 69800, dealPriceCents: 59800, stock: 90, isDeal: true, categorySlug: "milk" },
  { name: "Prema Whole Milk", slug: "prema-whole-milk-1l", description: "Fresh whole milk.", unit: "1L", priceCents: 42700, stock: 90, categorySlug: "milk" },

  // Dairy > Eggs
  { name: "Farm Fresh Eggs", slug: "farm-fresh-eggs-dozen", description: "Grade A fresh eggs.", unit: "1 Dozen", priceCents: 39000, stock: 70, categorySlug: "eggs" },

  // Dairy > Yogurt
  { name: "Fresh Plain Yogurt", slug: "fresh-plain-yogurt-1kg", description: "Fresh homestyle plain yogurt.", unit: "1kg", priceCents: 32000, stock: 60, categorySlug: "yogurt" },

  // Dairy > Cheese
  { name: "Cheddar Cheese Block", slug: "cheddar-cheese-block-200g", description: "Sharp cheddar cheese block.", unit: "200g", priceCents: 89000, stock: 40, categorySlug: "cheese" },

  // Dairy > Butter & Cream
  { name: "Salted Butter", slug: "salted-butter-250g", description: "Creamy salted butter.", unit: "250g", priceCents: 62000, stock: 50, categorySlug: "butter-cream" },

  // Sweets
  { name: "Assorted Mithai Box", slug: "assorted-mithai-box-1kg", description: "A mix of traditional Pakistani sweets.", unit: "1kg", priceCents: 145000, stock: 30, isFeatured: true, categorySlug: "traditional-mithai" },
  { name: "Gulab Jamun", slug: "gulab-jamun-1kg", description: "Classic soft gulab jamun in syrup.", unit: "1kg", priceCents: 98000, stock: 30, categorySlug: "traditional-mithai" },
  { name: "Sweets Gift Box", slug: "sweets-gift-box-1kg", description: "A festive assorted sweets gift box.", unit: "1kg", priceCents: 165000, stock: 20, categorySlug: "sweet-gift-boxes" },

  // Fast Food
  { name: "Grilled Chicken Quarter", slug: "grilled-chicken-quarter", description: "Juicy grilled chicken quarter.", unit: "1 Piece", priceCents: 65000, stock: 40, categorySlug: "burgers" },
  { name: "Zinger Burger", slug: "zinger-burger", description: "Crispy fried chicken zinger burger.", unit: "1 Piece", priceCents: 55000, stock: 50, isFeatured: true, categorySlug: "burgers" },
  { name: "Chicken Tikka Pizza", slug: "chicken-tikka-pizza-medium", description: "Spicy chicken tikka pizza, oven-baked.", unit: "Medium", priceCents: 89000, stock: 30, categorySlug: "fast-food-pizza" },
  { name: "2 Large Pizza Deal", slug: "2-large-pizza-deal", description: "Two large pizzas — great for sharing.", unit: "2 x Large", priceCents: 299800, dealPriceCents: 269800, stock: 25, isDeal: true, isFeatured: true, categorySlug: "fast-food-pizza" },
  { name: "JS Baked Chicken 9 pcs", slug: "js-baked-chicken-9pcs", description: "9 pieces of juicy oven-baked chicken.", unit: "9 Pieces", priceCents: 129800, dealPriceCents: 97400, stock: 25, isDeal: true, categorySlug: "fried-chicken" },
  { name: "Peri Peri Sandwich", slug: "peri-peri-sandwich", description: "Peri peri-flavoured chicken sandwich.", unit: "1 Piece", priceCents: 45000, dealPriceCents: 38700, stock: 40, isDeal: true, categorySlug: "sandwiches" },

  // Pan Asian
  { name: "Chicken Chow Mein", slug: "chicken-chow-mein", description: "Stir-fried noodles with chicken and vegetables.", unit: "1 Box", priceCents: 69000, stock: 30, categorySlug: "noodles" },
  { name: "Egg Fried Rice", slug: "egg-fried-rice", description: "Classic Pan Asian egg fried rice.", unit: "1 Box", priceCents: 59000, stock: 30, categorySlug: "rice-dishes" },
  { name: "Chicken Dim Sum", slug: "chicken-dim-sum-6pc", description: "Steamed chicken dumplings.", unit: "6 Pieces", priceCents: 75000, stock: 25, categorySlug: "dim-sum" },

  // Grocery
  { name: "Dalda Cooking Oil", slug: "dalda-cooking-oil-5l", description: "All-purpose cooking oil.", unit: "5L", priceCents: 285000, stock: 30, categorySlug: "cooking-oil-ghee" },
  { name: "Basmati Rice", slug: "basmati-rice-5kg", description: "Premium long-grain basmati rice.", unit: "5kg", priceCents: 129900, stock: 50, isFeatured: true, categorySlug: "rice-flour-pulses" },
  { name: "Wheat Flour (Atta)", slug: "wheat-flour-atta-10kg", description: "Whole wheat flour.", unit: "10kg", priceCents: 145000, stock: 50, categorySlug: "rice-flour-pulses" },
  { name: "Coca-Cola", slug: "coca-cola-1-5l", description: "Chilled soft drink.", unit: "1.5L", priceCents: 25000, stock: 150, categorySlug: "beverages" },
  { name: "Nescafe Classic Instant Coffee", slug: "nescafe-classic-200g", description: "Instant coffee jar.", unit: "200g", priceCents: 129000, stock: 40, categorySlug: "beverages" },
  { name: "Surf Excel Detergent Powder", slug: "surf-excel-detergent-1kg", description: "Powerful stain-removing detergent.", unit: "1kg", priceCents: 68000, stock: 70, categorySlug: "cleaning-products" },
  { name: "Dish Soap", slug: "dish-soap-1l", description: "Grease-cutting dish soap.", unit: "1L", priceCents: 45000, stock: 100, categorySlug: "cleaning-products" },
  { name: "Colgate Toothpaste", slug: "colgate-toothpaste-150g", description: "Cavity protection toothpaste.", unit: "150g", priceCents: 32000, stock: 100, categorySlug: "personal-care" },
  { name: "Lifebuoy Soap", slug: "lifebuoy-soap-3pack", description: "Germ-protection bar soap.", unit: "Pack of 3", priceCents: 38000, stock: 90, categorySlug: "personal-care" },

  // Deli
  { name: "Smoked Beef Slices", slug: "smoked-beef-slices-200g", description: "Thinly sliced smoked beef.", unit: "200g", priceCents: 68000, stock: 30, categorySlug: "cold-cuts" },
  { name: "Chicken Salami", slug: "chicken-salami-250g", description: "Sliced chicken salami.", unit: "250g", priceCents: 55000, stock: 40, categorySlug: "cold-cuts" },
  { name: "Mozzarella Cheese Block", slug: "mozzarella-cheese-block-200g", description: "Fresh mozzarella cheese block.", unit: "200g", priceCents: 79000, stock: 30, categorySlug: "cheese-counter" },
];

type BranchSeed = { name: string; city: string; area: string; address: string; phone: string };

// SAMPLE branch data — placeholder only. Real branch phone/email/address are
// intentionally NOT used here (see project README) to avoid this demo
// looking like a live channel to the real business. TBD if real data is
// ever needed for a non-demo purpose.
const branches: BranchSeed[] = [
  { name: "Jalal Sons Gulberg", city: "Lahore", area: "Gulberg", address: "Main Boulevard, Gulberg III, Lahore (sample address)", phone: "+92 300 000 0001" },
  { name: "Jalal Sons DHA Phase 5", city: "Lahore", area: "DHA Phase 5", address: "Y-Block Commercial, DHA Phase 5, Lahore (sample address)", phone: "+92 300 000 0002" },
  { name: "Jalal Sons Model Town", city: "Lahore", area: "Model Town", address: "Main Market, Model Town, Lahore (sample address)", phone: "+92 300 000 0003" },
  { name: "Jalal Sons Bahria Town", city: "Lahore", area: "Bahria Town", address: "Sector C, Bahria Town, Lahore (sample address)", phone: "+92 300 000 0004" },
  { name: "Jalal Sons Johar Town", city: "Lahore", area: "Johar Town", address: "Main Boulevard, Johar Town, Lahore (sample address)", phone: "+92 300 000 0005" },
];

async function main() {
  for (const cat of categories) {
    const parent = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name },
      create: { name: cat.name, slug: cat.slug },
    });
    if (cat.children) {
      for (const child of cat.children) {
        await prisma.category.upsert({
          where: { slug: child.slug },
          update: { name: child.name, parentId: parent.id },
          create: { name: child.name, slug: child.slug, parentId: parent.id },
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
    if (existing) {
      await prisma.branch.update({ where: { id: existing.id }, data: b });
    } else {
      await prisma.branch.create({ data: b });
    }
  }

  // Clean up stale rows from a previous taxonomy (e.g. before this file's
  // category names changed) so re-running the seed doesn't leave orphaned
  // categories/products cluttering the site.
  const validProductSlugs = products.map((p) => p.slug);
  const validCategorySlugs = [
    ...categories.map((c) => c.slug),
    ...categories.flatMap((c) => c.children?.map((child) => child.slug) ?? []),
  ];

  // Products first — if you've already placed a real test order against one
  // of these, the delete is skipped for that product (kept around, unused)
  // instead of crashing the whole seed run.
  let deletedProductCount = 0;
  const staleProducts = await prisma.product.findMany({
    where: { slug: { notIn: validProductSlugs } },
    select: { id: true },
  });
  for (const sp of staleProducts) {
    try {
      await prisma.product.delete({ where: { id: sp.id } });
      deletedProductCount++;
    } catch {
      console.warn(`Skipped deleting a stale product (id ${sp.id}) — likely referenced by an existing order.`);
    }
  }

  // Categories: delete stale children before stale parents, since a
  // self-referencing foreign key would otherwise block deleting a parent
  // that a stale child still points to.
  const deletedChildren = await prisma.category.deleteMany({
    where: { slug: { notIn: validCategorySlugs }, parentId: { not: null } },
  });
  const deletedParents = await prisma.category.deleteMany({
    where: { slug: { notIn: validCategorySlugs }, parentId: null },
  });

  console.log(
    `Seed complete: ${categories.length} top-level categories, ${products.length} products, ${branches.length} branches. ` +
      `Cleaned up ${deletedProductCount} stale product(s) and ${deletedChildren.count + deletedParents.count} stale categor(y/ies) from a previous run.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });