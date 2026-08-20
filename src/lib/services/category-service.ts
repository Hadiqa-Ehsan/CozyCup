import { prisma } from "@/lib/prisma";

// Top-level categories with their subcategories nested, for the homepage
// grid and the shop sidebar.
export async function listCategoryTree() {
  return prisma.category.findMany({
    where: { parentId: null },
    include: { children: true },
    orderBy: { name: "asc" },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: { children: true, parent: true },
  });
}

export async function listAllCategoriesFlat() {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
}
