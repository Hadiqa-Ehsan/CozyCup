import { prisma } from "@/lib/prisma";
import { productSchema, type ProductInput } from "@/lib/validations/product";

// Pure service functions. Route Handlers and Server Actions stay thin and
// just call these — keeps business logic out of the request layer as the
// doc's risk-mitigation section recommends.

export async function listProducts(params?: { categorySlug?: string; query?: string }) {
  // A category can be a parent (e.g. "Bakery") — in that case include
  // products from its subcategories too.
  let categoryIds: string[] | undefined;
  if (params?.categorySlug) {
    const category = (await prisma.category.findUnique({
      where: { slug: params.categorySlug },
      include: { children: true },
    })) as { id: string; children: { id: string }[] } | null;
    if (category) {
      categoryIds = [category.id, ...category.children.map((c) => c.id)];
    } else {
      categoryIds = ["__none__"]; // unknown slug -> no results
    }
  }

  return prisma.product.findMany({
    where: {
      ...(categoryIds ? { categoryId: { in: categoryIds } } : {}),
      ...(params?.query
        ? { name: { contains: params.query, mode: "insensitive" } }
        : {}),
    },
    include: { category: true },
    orderBy: { name: "asc" },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
}

export async function listFeaturedProducts() {
  return prisma.product.findMany({
    where: { isFeatured: true },
    take: 8,
    orderBy: { name: "asc" },
  });
}

export async function listDealProducts() {
  return prisma.product.findMany({
    where: { isDeal: true },
    orderBy: { name: "asc" },
  });
}

export async function createProduct(input: ProductInput) {
  const data = productSchema.parse(input);
  return prisma.product.create({ data });
}

export async function updateStock(productId: string, delta: number) {
  // Atomic decrement/increment avoids race conditions on concurrent orders.
  return prisma.product.update({
    where: { id: productId },
    data: { stock: { increment: delta } },
  });
}
