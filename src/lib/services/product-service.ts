import { prisma } from "@/lib/prisma";
import { productSchema, type ProductInput } from "@/lib/validations/product";

// Pure service functions. Route Handlers and Server Actions stay thin and
// just call these — keeps business logic out of the request layer as the
// doc's risk-mitigation section recommends.

export async function listProducts(params?: { categorySlug?: string; query?: string }) {
  return prisma.product.findMany({
    where: {
      ...(params?.categorySlug
        ? { category: { slug: params.categorySlug } }
        : {}),
      ...(params?.query
        ? { name: { contains: params.query, mode: "insensitive" } }
        : {}),
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { category: true },
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
