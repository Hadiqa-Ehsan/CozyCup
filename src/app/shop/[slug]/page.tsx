import { notFound } from "next/navigation";
import { ShopLayout } from "@/components/shop-layout";
import { mockCategories, mockProducts } from "@/lib/mock-data";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Find category by slug
  const category = mockCategories.find((c) => c.slug === slug);
  
  if (!category) notFound();

  // Filter products by category
  const products = mockProducts.filter((p) => p.categorySlug === slug);

  return (
    <ShopLayout
      title={category.name}
      categories={mockCategories}
      products={products}
      activeSlug={slug}
    />
  );
}