import { notFound } from "next/navigation";
import { listCategoryTree, getCategoryBySlug } from "@/lib/services/category-service";
import { listProducts } from "@/lib/services/product-service";
import { ShopLayout } from "@/components/shop-layout";
import type { ProductSummary } from "@/lib/types";

export const revalidate = 60;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [categories, category, products] = await Promise.all([
    listCategoryTree(),
    getCategoryBySlug(slug),
    listProducts({ categorySlug: slug }),
  ]);

  if (!category) notFound();

  return (
    <ShopLayout
      title={category.name}
      categories={categories}
      products={products as ProductSummary[]}
      activeSlug={slug}
    />
  );
}