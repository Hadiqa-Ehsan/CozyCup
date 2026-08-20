import Link from "next/link";
import { listCategoryTree } from "@/lib/services/category-service";
import { listFeaturedProducts, listDealProducts } from "@/lib/services/product-service";
import { ProductCard } from "@/components/product-card";
import { BranchRequiredNotice } from "@/components/branch-selector";
import type { ProductSummary, CategoryNode } from "@/lib/types";

export const revalidate = 60;

export default async function Home() {
  const [categoriesRaw, featuredRaw, dealsRaw] = await Promise.all([
    listCategoryTree(),
    listFeaturedProducts(),
    listDealProducts(),
  ]);
  const categories = categoriesRaw as CategoryNode[];
  const featured = featuredRaw as ProductSummary[];
  const deals = dealsRaw as ProductSummary[];

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <BranchRequiredNotice />

      <section className="mb-10 rounded-lg bg-primary px-6 py-10 text-primary-foreground">
        <h1 className="text-3xl font-bold">Jalal Sons</h1>
        <p className="mt-2 max-w-xl text-primary-foreground/90">
          Fresh groceries, bakery, Pan Asian, fast food, and household essentials — delivered fast.
        </p>
        <Link
          href="/shop"
          className="mt-4 inline-block rounded-md bg-primary-foreground px-4 py-2 text-sm font-medium text-primary hover:opacity-90"
        >
          Shop now
        </Link>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop/${cat.slug}`}
              className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center text-sm hover:bg-accent"
            >
              <span className="text-2xl">{cat.icon}</span>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {deals.length > 0 && (
        <section className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Today&apos;s Deals</h2>
            <Link href="/deals" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {deals.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p as ProductSummary} />
            ))}
          </div>
        </section>
      )}

      {featured.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold">Featured Products</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p as ProductSummary} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
