import Link from "next/link";
import { listCategoryTree } from "@/lib/services/category-service";
import { listFeaturedProducts, listDealProducts } from "@/lib/services/product-service";
import { ProductCard } from "@/components/product-card";
import type { ProductSummary, CategoryNode } from "@/lib/types";

export const revalidate = 60;

// A small rotating palette so category tiles look distinct without real
// product photography (which this project has no rights to use).
const TILE_COLORS = ["#cc0000", "#a30000", "#e63946", "#8b0000", "#d64545", "#b30000", "#c1121f"];

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
    <main>
      <section className="relative flex min-h-[320px] items-center overflow-hidden bg-primary px-10 text-primary-foreground sm:min-h-[420px]">
        <div className="max-w-lg">
          <p className="text-4xl font-light italic sm:text-6xl">Fresh.</p>
          <p className="text-4xl font-light italic sm:text-6xl">Delicious.</p>
          <p className="text-4xl font-light italic sm:text-6xl">Yours.</p>
          <Link
            href="/shop"
            className="mt-6 inline-block rounded-md bg-primary-foreground px-5 py-2.5 text-sm font-semibold text-primary hover:opacity-90"
          >
            Shop now
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="mb-6 text-center text-lg font-semibold text-primary">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {categories.map((cat, i) => (
            <Link key={cat.id} href={`/shop/${cat.slug}`} className="group flex flex-col items-center gap-2">
              <div
                className="flex aspect-square w-full items-center justify-center rounded-lg text-center text-sm font-semibold text-white shadow transition-transform group-hover:scale-[1.03]"
                style={{ backgroundColor: TILE_COLORS[i % TILE_COLORS.length] }}
              >
                {cat.name}
              </div>
            </Link>
          ))}
        </div>

        {deals.length > 0 && (
          <section className="mt-14">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-primary">Today&apos;s Deals</h2>
              <Link href="/deals" className="text-sm text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {deals.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {featured.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-4 text-lg font-semibold text-primary">Featured Products</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
