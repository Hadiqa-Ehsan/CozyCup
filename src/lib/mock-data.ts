export const mockCategories = [
  {
    id: "1",
    name: "Bakery",
    slug: "bakery",
    icon: "🍞",
    children: [
      { id: "1-2", name: "Bread", slug: "bread" },
      { id: "1-3", name: "Cakes", slug: "cakes" },
      { id: "1-4", name: "Pastries", slug: "pastries" },
      { id: "1-5", name: "Donuts", slug: "donuts" },
      { id: "1-6", name: "Brownies", slug: "brownies" },
      { id: "1-7", name: "Buns", slug: "buns" },
      { id: "1-8", name: "Biscuits", slug: "biscuits" },
      { id: "1-9", name: "Rusk", slug: "rusk" },
    ],
  },
  {
    id: "2",
    name: "Dairy",
    slug: "dairy",
    icon: "🥛",
    children: [
      { id: "2-1", name: "Fresh Milk", slug: "fresh-milk" },
      { id: "2-2", name: "Yogurt", slug: "yogurt" },
      { id: "2-3", name: "Cheese", slug: "cheese" },
      { id: "2-4", name: "Butter", slug: "butter" },
      { id: "2-5", name: "Cream", slug: "cream" },
      { id: "2-6", name: "Ghee", slug: "ghee" },
      { id: "2-7", name: "Ice Cream", slug: "ice-cream" },
    ],
  },
  {
    id: "3",
    name: "Sweets",
    slug: "sweets",
    icon: "🍬",
    children: [
      { id: "3-1", name: "Mango Cake", slug: "mango-cake" },
      { id: "3-2", name: "Chocolate Cake", slug: "chocolate-cake" },
      { id: "3-3", name: "Brownie", slug: "brownie" },
      { id: "3-4", name: "Donut", slug: "donut" },
      { id: "3-5", name: "Cupcake", slug: "cupcake" },
      { id: "3-6", name: "Pastry", slug: "pastry" },
      { id: "3-7", name: "Gulab Jamun", slug: "gulab-jamun" },
      { id: "3-8", name: "Jalebi", slug: "jalebi" },
    ],
  },
  {
    id: "4",
    name: "Fast Food",
    slug: "fast-food",
    icon: "🍔",
    children: [
      { id: "4-1", name: "Chicken Burger", slug: "chicken-burger" },
      { id: "4-2", name: "Zinger Burger", slug: "zinger-burger" },
      { id: "4-3", name: "French Fries", slug: "french-fries" },
      { id: "4-4", name: "Chicken Nuggets", slug: "chicken-nuggets" },
      { id: "4-5", name: "Peri Peri", slug: "peri-peri" },
      { id: "4-6", name: "Grilled Chicken", slug: "grilled-chicken" },
    ],
  },
  {
    id: "5",
    name: "Pan Asian",
    slug: "pan-asian",
    icon: "🥢",
    children: [
      { id: "5-1", name: "Noodle Bowl", slug: "noodle-bowl" },
      { id: "5-2", name: "Fried Rice", slug: "fried-rice" },
      { id: "5-3", name: "Chow Mein", slug: "chow-mein" },
      { id: "5-4", name: "Spring Rolls", slug: "spring-rolls" },
      { id: "5-5", name: "Dumplings", slug: "dumplings" },
      { id: "5-6", name: "Stir Fry", slug: "stir-fry" },
    ],
  },
  {
    id: "6",
    name: "Grocery",
    slug: "grocery",
    icon: "🛒",
    children: [
      { id: "6-1", name: "Snacks", slug: "snacks" },
      { id: "6-2", name: "Sauces & Spices", slug: "sauces-spices" },
      { id: "6-3", name: "Beverages", slug: "beverages" },
      { id: "6-4", name: "Cooking Oils", slug: "cooking-oils" },
    ],
  },
  {
    id: "7",
    name: "Deli",
    slug: "deli",
    icon: "🥓",
    children: [
      { id: "7-1", name: "Deli Chicken", slug: "deli-chicken" },
      { id: "7-2", name: "Deli Beef", slug: "deli-beef" },
      { id: "7-3", name: "Cold Cuts", slug: "cold-cuts" },
    ],
  },
];

export const mockProducts = [
  // ===== BAKERY PRODUCTS =====
  { id: "1", name: "JS Bread Roll", slug: "js-bread-roll", priceCents: 49500, stock: 10, isDeal: false, currency: "PKR", unit: "1 pc", categorySlug: "bakery", imageUrl: "/images/bread1.jpg" },
  { id: "2", name: "JS Cheese Crust Roll", slug: "js-cheese-crust-roll", priceCents: 59500, stock: 10, isDeal: false, currency: "PKR", unit: "1 pc", categorySlug: "bakery", imageUrl: "/images/bread2.jpg" },

  // Bread
  { id: "7", name: "White Bread", slug: "white-bread", priceCents: 24800, stock: 10, isDeal: false, currency: "PKR", unit: "400 G", categorySlug: "bread", imageUrl: "/images/sub-white-bread.jpg" },
  { id: "8", name: "Brown Bread", slug: "brown-bread", priceCents: 29800, stock: 10, isDeal: false, currency: "PKR", unit: "400 G", categorySlug: "bread", imageUrl: "/images/sub-brown-bread.jpg" },

  // Cakes
  { id: "21", name: "Chocolate Cake", slug: "bakery-chocolate-cake", priceCents: 159800, stock: 10, isDeal: false, currency: "PKR", unit: "500 G", categorySlug: "cakes", imageUrl: "/images/sub-chocolate-cake.jpg" },
  { id: "22", name: "Vanilla Cake", slug: "bakery-vanilla-cake", priceCents: 129800, stock: 10, isDeal: false, currency: "PKR", unit: "500 G", categorySlug: "cakes", imageUrl: "/images/sub-vanilla-cake.jpg" },

  // Pastries
  { id: "23", name: "Cream Pastry", slug: "bakery-cream-pastry", priceCents: 39800, stock: 10, isDeal: false, currency: "PKR", unit: "1 pc", categorySlug: "pastries", imageUrl: "/images/sub-cream-pastry.jpg" },
  { id: "24", name: "Fruit Pastry", slug: "bakery-fruit-pastry", priceCents: 49800, stock: 10, isDeal: false, currency: "PKR", unit: "1 pc", categorySlug: "pastries", imageUrl: "/images/sub-fruit-pastry.jpg" },

  // Donuts
  { id: "25", name: "Glazed Donut", slug: "bakery-glazed-donut", priceCents: 19800, stock: 10, isDeal: false, currency: "PKR", unit: "1 pc", categorySlug: "donuts", imageUrl: "/images/sub-glazed-donut.jpg" },
  { id: "26", name: "Chocolate Donut", slug: "bakery-chocolate-donut", priceCents: 24800, stock: 10, isDeal: false, currency: "PKR", unit: "1 pc", categorySlug: "donuts", imageUrl: "/images/sub-chocolate-donut.jpg" },

  // Brownies
  { id: "27", name: "Walnut Brownie", slug: "bakery-walnut-brownie", priceCents: 29800, stock: 10, isDeal: false, currency: "PKR", unit: "250 G", categorySlug: "brownies", imageUrl: "/images/sub-walnut-brownie.jpg" },
  { id: "28", name: "Chocolate Brownie", slug: "bakery-chocolate-brownie", priceCents: 34800, stock: 10, isDeal: false, currency: "PKR", unit: "250 G", categorySlug: "brownies", imageUrl: "/images/sub-chocolate-brownie.jpg" },

  // Buns
  { id: "29", name: "Burger Bun", slug: "burger-bun", priceCents: 14800, stock: 10, isDeal: false, currency: "PKR", unit: "6 pcs", categorySlug: "buns", imageUrl: "/images/sub-burger-bun.jpg" },
  { id: "30", name: "Sandwich Bun", slug: "sandwich-bun", priceCents: 19800, stock: 10, isDeal: false, currency: "PKR", unit: "6 pcs", categorySlug: "buns", imageUrl: "/images/sub-sandwich-bun.jpg" },

  // Biscuits
  { id: "31", name: "Butter Biscuit", slug: "butter-biscuit", priceCents: 19800, stock: 10, isDeal: false, currency: "PKR", unit: "200 G", categorySlug: "biscuits", imageUrl: "/images/sub-butter-biscuit.jpg" },
  { id: "32", name: "Chocolate Biscuit", slug: "chocolate-biscuit", priceCents: 24800, stock: 10, isDeal: false, currency: "PKR", unit: "200 G", categorySlug: "biscuits", imageUrl: "/images/sub-chocolate-biscuit.jpg" },

  // Rusk
  { id: "33", name: "Plain Rusk", slug: "plain-rusk", priceCents: 29800, stock: 10, isDeal: false, currency: "PKR", unit: "200 G", categorySlug: "rusk", imageUrl: "/images/sub-plain-rusk.jpg" },
  { id: "34", name: "Sweet Rusk", slug: "sweet-rusk", priceCents: 34800, stock: 10, isDeal: false, currency: "PKR", unit: "200 G", categorySlug: "rusk", imageUrl: "/images/sub-sweet-rusk.jpg" },

  // ===== DAIRY PRODUCTS =====
  { id: "9", name: "Fresh Organic Milk", slug: "fresh-organic-milk", priceCents: 24800, stock: 10, isDeal: false, currency: "PKR", unit: "1 lit", categorySlug: "dairy", imageUrl: "/images/ice1.jpg" },

  // Subcategories
  { id: "35", name: "Full Cream Milk", slug: "full-cream-milk", priceCents: 24800, stock: 10, isDeal: false, currency: "PKR", unit: "1 L", categorySlug: "fresh-milk", imageUrl: "/images/sub-full-cream-milk.jpg" },
  { id: "36", name: "Skimmed Milk", slug: "skimmed-milk", priceCents: 19800, stock: 10, isDeal: false, currency: "PKR", unit: "1 L", categorySlug: "fresh-milk", imageUrl: "/images/sub-skimmed-milk.jpg" },
  { id: "37", name: "Plain Yogurt", slug: "plain-yogurt", priceCents: 19800, stock: 10, isDeal: false, currency: "PKR", unit: "500 G", categorySlug: "yogurt", imageUrl: "/images/sub-plain-yogurt.jpg" },
  { id: "38", name: "Fruit Yogurt", slug: "fruit-yogurt", priceCents: 24800, stock: 10, isDeal: false, currency: "PKR", unit: "500 G", categorySlug: "yogurt", imageUrl: "/images/sub-fruit-yogurt.jpg" },
  { id: "39", name: "Cheddar Cheese", slug: "cheddar-cheese", priceCents: 39800, stock: 10, isDeal: false, currency: "PKR", unit: "200 G", categorySlug: "cheese", imageUrl: "/images/sub-cheddar-cheese.jpg" },
  { id: "40", name: "Mozzarella Cheese", slug: "mozzarella-cheese", priceCents: 49800, stock: 10, isDeal: false, currency: "PKR", unit: "200 G", categorySlug: "cheese", imageUrl: "/images/sub-mozzarella-cheese.jpg" },
  { id: "41", name: "Salted Butter", slug: "salted-butter", priceCents: 29800, stock: 10, isDeal: false, currency: "PKR", unit: "500 G", categorySlug: "butter", imageUrl: "/images/sub-salted-butter.jpg" },
  { id: "42", name: "Unsalted Butter", slug: "unsalted-butter", priceCents: 29800, stock: 10, isDeal: false, currency: "PKR", unit: "500 G", categorySlug: "butter", imageUrl: "/images/sub-unsalted-butter.jpg" },
  { id: "43", name: "Whipping Cream", slug: "whipping-cream", priceCents: 34800, stock: 10, isDeal: false, currency: "PKR", unit: "500 ML", categorySlug: "cream", imageUrl: "/images/sub-whipping-cream.jpg" },
  { id: "44", name: "Sour Cream", slug: "sour-cream", priceCents: 39800, stock: 10, isDeal: false, currency: "PKR", unit: "500 ML", categorySlug: "cream", imageUrl: "/images/sub-sour-cream.jpg" },
  { id: "45", name: "Pure Ghee", slug: "pure-ghee", priceCents: 59800, stock: 10, isDeal: false, currency: "PKR", unit: "1 KG", categorySlug: "ghee", imageUrl: "/images/sub-pure-ghee.jpg" },
  { id: "46", name: "Vanilla Ice Cream", slug: "vanilla-ice-cream", priceCents: 99800, stock: 10, isDeal: false, currency: "PKR", unit: "1 L", categorySlug: "ice-cream", imageUrl: "/images/sub-vanilla-ice-cream.jpg" },
  { id: "47", name: "Chocolate Ice Cream", slug: "chocolate-ice-cream", priceCents: 109800, stock: 10, isDeal: false, currency: "PKR", unit: "1 L", categorySlug: "ice-cream", imageUrl: "/images/sub-chocolate-ice-cream.jpg" },

  // ===== SWEETS PRODUCTS =====
  { id: "11", name: "Mango Milk Cake Special", slug: "mango-milk-cake-special", priceCents: 199800, stock: 10, isDeal: true, dealPriceCents: 149800, currency: "PKR", unit: "500g", categorySlug: "sweets", imageUrl: "/images/cake1.jpg" },

  // Subcategories
  { id: "49", name: "Mango Cake", slug: "sweets-mango-cake", priceCents: 199800, stock: 10, isDeal: true, dealPriceCents: 149800, currency: "PKR", unit: "500 G", categorySlug: "mango-cake", imageUrl: "/images/sub-mango-cake.jpg" },
  { id: "50", name: "Chocolate Cake", slug: "sweets-chocolate-cake", priceCents: 159800, stock: 10, isDeal: false, currency: "PKR", unit: "500 G", categorySlug: "chocolate-cake", imageUrl: "/images/sub-choco-cake.jpg" },
  { id: "51", name: "Walnut Brownie", slug: "sweets-walnut-brownie", priceCents: 29800, stock: 10, isDeal: false, currency: "PKR", unit: "250 G", categorySlug: "brownie", imageUrl: "/images/sub-walnut-brownie-sweet.jpg" },
  { id: "52", name: "Glazed Donut", slug: "sweets-glazed-donut", priceCents: 19800, stock: 10, isDeal: false, currency: "PKR", unit: "1 pc", categorySlug: "donut", imageUrl: "/images/sub-glazed-donut-sweet.jpg" },
  { id: "53", name: "Vanilla Cupcake", slug: "sweets-vanilla-cupcake", priceCents: 24800, stock: 10, isDeal: false, currency: "PKR", unit: "1 pc", categorySlug: "cupcake", imageUrl: "/images/sub-vanilla-cupcake-sweet.jpg" },
  { id: "54", name: "Cream Pastry", slug: "sweets-cream-pastry", priceCents: 29800, stock: 10, isDeal: false, currency: "PKR", unit: "1 pc", categorySlug: "pastry", imageUrl: "/images/sub-cream-pastry-sweet.jpg" },
  { id: "55", name: "Gulab Jamun", slug: "gulab-jamun", priceCents: 39800, stock: 10, isDeal: false, currency: "PKR", unit: "250 G", categorySlug: "gulab-jamun", imageUrl: "/images/sub-gulab-jamun.jpg" },
  { id: "56", name: "Jalebi", slug: "jalebi", priceCents: 29800, stock: 10, isDeal: false, currency: "PKR", unit: "250 G", categorySlug: "jalebi", imageUrl: "/images/sub-jalebi.jpg" },

  // ===== FAST FOOD PRODUCTS =====
  { id: "13", name: "Classic Chicken Burger", slug: "classic-chicken-burger", priceCents: 49800, stock: 10, isDeal: false, currency: "PKR", unit: "1 pc", categorySlug: "fast-food", imageUrl: "/images/chicken-burger.jpg" },

  // Subcategories
  { id: "57", name: "Crispy Chicken Burger", slug: "crispy-chicken-burger", priceCents: 49800, stock: 10, isDeal: false, currency: "PKR", unit: "1 pc", categorySlug: "chicken-burger", imageUrl: "/images/sub-chicken-burger.jpg" },
  { id: "58", name: "Zinger Burger", slug: "fast-food-zinger-burger", priceCents: 69800, stock: 10, isDeal: false, currency: "PKR", unit: "1 pc", categorySlug: "zinger-burger", imageUrl: "/images/sub-zinger-burger.jpg" },
  { id: "59", name: "French Fries", slug: "french-fries", priceCents: 29800, stock: 10, isDeal: false, currency: "PKR", unit: "1 pc", categorySlug: "french-fries", imageUrl: "/images/sub-french-fries.jpg" },
  { id: "60", name: "Chicken Nuggets", slug: "chicken-nuggets", priceCents: 39800, stock: 10, isDeal: false, currency: "PKR", unit: "6 pcs", categorySlug: "chicken-nuggets", imageUrl: "/images/sub-chicken-nuggets.jpg" },
  { id: "61", name: "Peri Peri Chicken", slug: "peri-peri-chicken", priceCents: 59800, stock: 10, isDeal: false, currency: "PKR", unit: "1 pc", categorySlug: "peri-peri", imageUrl: "/images/sub-peri-peri-chicken.jpg" },
  { id: "62", name: "Grilled Chicken Quarter", slug: "fast-food-grilled-chicken", priceCents: 99800, stock: 10, isDeal: false, currency: "PKR", unit: "1 pc", categorySlug: "grilled-chicken", imageUrl: "/images/sub-grilled-chicken.jpg" },

  // ===== PAN ASIAN PRODUCTS =====
  { id: "15", name: "Special Noodle Bowl", slug: "special-noodle-bowl", priceCents: 59800, stock: 10, isDeal: false, currency: "PKR", unit: "1 bowl", categorySlug: "pan-asian", imageUrl: "/images/noodle-bowl.jpg" },

  // Subcategories
  { id: "63", name: "Chow Mein Noodles", slug: "chow-mein-noodles", priceCents: 59800, stock: 10, isDeal: false, currency: "PKR", unit: "1 bowl", categorySlug: "noodle-bowl", imageUrl: "/images/sub-chow-mein-noodles.jpg" },
  { id: "64", name: "Pad Thai", slug: "pad-thai", priceCents: 69800, stock: 10, isDeal: false, currency: "PKR", unit: "1 bowl", categorySlug: "noodle-bowl", imageUrl: "/images/sub-pad-thai.jpg" },
  { id: "65", name: "Egg Fried Rice", slug: "egg-fried-rice", priceCents: 49800, stock: 10, isDeal: false, currency: "PKR", unit: "1 bowl", categorySlug: "fried-rice", imageUrl: "/images/sub-egg-fried-rice.jpg" },
  { id: "66", name: "Chicken Fried Rice", slug: "chicken-fried-rice", priceCents: 59800, stock: 10, isDeal: false, currency: "PKR", unit: "1 bowl", categorySlug: "fried-rice", imageUrl: "/images/sub-chicken-fried-rice.jpg" },
  { id: "67", name: "Chicken Chow Mein", slug: "chicken-chow-mein", priceCents: 59800, stock: 10, isDeal: false, currency: "PKR", unit: "1 bowl", categorySlug: "chow-mein", imageUrl: "/images/sub-chicken-chow-mein.jpg" },
  { id: "68", name: "Vegetable Spring Rolls", slug: "veg-spring-rolls", priceCents: 39800, stock: 10, isDeal: false, currency: "PKR", unit: "6 pcs", categorySlug: "spring-rolls", imageUrl: "/images/sub-veg-spring-rolls.jpg" },
  { id: "69", name: "Chicken Dumplings", slug: "chicken-dumplings", priceCents: 49800, stock: 10, isDeal: false, currency: "PKR", unit: "6 pcs", categorySlug: "dumplings", imageUrl: "/images/sub-chicken-dumplings.jpg" },
  { id: "70", name: "Vegetable Stir Fry", slug: "veg-stir-fry", priceCents: 49800, stock: 10, isDeal: false, currency: "PKR", unit: "1 bowl", categorySlug: "stir-fry", imageUrl: "/images/sub-veg-stir-fry.jpg" },

  // ===== GROCERY PRODUCTS =====
  { id: "17", name: "Assorted Snacks", slug: "assorted-snacks", priceCents: 29800, stock: 10, isDeal: false, currency: "PKR", unit: "150g", categorySlug: "grocery", imageUrl: "/images/snacks.jpg" },

  // Subcategories
  { id: "71", name: "Potato Chips", slug: "potato-chips", priceCents: 29800, stock: 10, isDeal: false, currency: "PKR", unit: "150 G", categorySlug: "snacks", imageUrl: "/images/sub-potato-chips.jpg" },
  { id: "72", name: "Mixed Nuts", slug: "mixed-nuts", priceCents: 79800, stock: 10, isDeal: false, currency: "PKR", unit: "500 G", categorySlug: "snacks", imageUrl: "/images/sub-mixed-nuts.jpg" },
  { id: "73", name: "Chili Sauce", slug: "chili-sauce", priceCents: 19800, stock: 10, isDeal: false, currency: "PKR", unit: "250 ML", categorySlug: "sauces-spices", imageUrl: "/images/sub-chili-sauce.jpg" },
  { id: "74", name: "Black Pepper", slug: "black-pepper", priceCents: 29800, stock: 10, isDeal: false, currency: "PKR", unit: "100 G", categorySlug: "sauces-spices", imageUrl: "/images/sub-black-pepper.jpg" },
  { id: "75", name: "Soft Drink", slug: "soft-drink", priceCents: 14800, stock: 10, isDeal: false, currency: "PKR", unit: "500 ML", categorySlug: "beverages", imageUrl: "/images/sub-soft-drink.jpg" },
  { id: "76", name: "Fruit Juice", slug: "fruit-juice", priceCents: 19800, stock: 10, isDeal: false, currency: "PKR", unit: "500 ML", categorySlug: "beverages", imageUrl: "/images/sub-fruit-juice.jpg" },
  { id: "77", name: "Olive Oil", slug: "olive-oil", priceCents: 89800, stock: 10, isDeal: false, currency: "PKR", unit: "1 L", categorySlug: "cooking-oils", imageUrl: "/images/sub-olive-oil.jpg" },
  { id: "78", name: "Canola Oil", slug: "canola-oil", priceCents: 69800, stock: 10, isDeal: false, currency: "PKR", unit: "1 L", categorySlug: "cooking-oils", imageUrl: "/images/sub-canola-oil.jpg" },

  // ===== DELI PRODUCTS =====
  { id: "19", name: "Deli Chicken Breast", slug: "deli-chicken-breast", priceCents: 79800, stock: 10, isDeal: false, currency: "PKR", unit: "1 kg", categorySlug: "deli", imageUrl: "/images/deli-chicken.jpg" },

  // Subcategories
  { id: "79", name: "Roast Chicken", slug: "roast-chicken", priceCents: 79800, stock: 10, isDeal: false, currency: "PKR", unit: "1 KG", categorySlug: "deli-chicken", imageUrl: "/images/sub-roast-chicken.jpg" },
  { id: "80", name: "Roast Beef", slug: "roast-beef", priceCents: 99800, stock: 10, isDeal: false, currency: "PKR", unit: "1 KG", categorySlug: "deli-beef", imageUrl: "/images/sub-roast-beef.jpg" },
  { id: "81", name: "Ham Slices", slug: "ham-slices", priceCents: 69800, stock: 10, isDeal: false, currency: "PKR", unit: "500 G", categorySlug: "cold-cuts", imageUrl: "/images/sub-ham-slices.jpg" },
  { id: "82", name: "Salami Slices", slug: "salami-slices", priceCents: 79800, stock: 10, isDeal: false, currency: "PKR", unit: "500 G", categorySlug: "cold-cuts", imageUrl: "/images/sub-salami-slices.jpg" },
];