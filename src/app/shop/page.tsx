import { listCategoryTree } from "@/lib/services/category-service";
import { listProducts } from "@/lib/services/product-service";
import { ShopLayout } from "@/components/shop-layout";
import type { ProductSummary } from "@/lib/types";

export const revalidate = 60;

export default async function ShopPage() {
  const [categories, products] = await Promise.all([listCategoryTree(), listProducts()]);

  return (
    <ShopLayout
      title="All Products"
      categories={categories}
      products={products as ProductSummary[]}
    />
  );
}
