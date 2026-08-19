import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const grocery = await prisma.category.upsert({
    where: { slug: "grocery" },
    update: {},
    create: { name: "Grocery", slug: "grocery" },
  });

  const household = await prisma.category.upsert({
    where: { slug: "household" },
    update: {},
    create: { name: "Household", slug: "household" },
  });

  await prisma.product.upsert({
    where: { slug: "basmati-rice-5kg" },
    update: {},
    create: {
      name: "Basmati Rice 5kg",
      slug: "basmati-rice-5kg",
      description: "Premium long-grain basmati rice, 5kg bag.",
      priceCents: 129900, // store as smallest currency unit
      currency: "PKR",
      stock: 50,
      categoryId: grocery.id,
    },
  });

  await prisma.product.upsert({
    where: { slug: "dish-soap-1l" },
    update: {},
    create: {
      name: "Dish Soap 1L",
      slug: "dish-soap-1l",
      description: "Grease-cutting dish soap, 1 litre bottle.",
      priceCents: 45000,
      currency: "PKR",
      stock: 100,
      categoryId: household.id,
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
