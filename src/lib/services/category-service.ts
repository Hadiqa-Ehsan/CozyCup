import { prisma } from "@/lib/prisma";

export async function listCategoryTree() {
  return prisma.category.findMany({
    include: { products: true },
    orderBy: { name: "asc" },
  });
}