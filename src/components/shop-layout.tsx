import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { BranchRequiredNotice } from "@/components/branch-selector";
import type { ProductSummary } from "@/lib/types";

type CategoryNode = {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  children: { id: string; name: string; slug: string }[];
};

export function ShopLayout({
  categories,
  products,
  activeSlug,
  title,
}: {
  categories: CategoryNode[];
  products: ProductSummary[];
  activeSlug?: string;
  title: string;
}) {
  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <BranchRequiredNotice />
      <h1 className="mb-6 text-2xl font-semibold">{title}</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[220px_1fr]">
        <aside>
          <nav className="flex flex-col gap-1 text-sm">
            <Link
              href="/shop"
              className={`rounded-md px-3 py-2 hover:bg-accent ${!activeSlug ? "bg-accent font-medium" : ""}`}
            >
              All Products
            </Link>
            {categories.map((cat) => (
              <div key={cat.id}>
                <Link
                  href={`/shop/${cat.slug}`}
                  className={`block rounded-md px-3 py-2 hover:bg-accent ${
                    activeSlug === cat.slug ? "bg-accent font-medium" : ""
                  }`}
                >
                  {cat.icon} {cat.name}
                </Link>
                {cat.children.length > 0 && (
                  <div className="ml-4 flex flex-col">
                    {cat.children.map((child) => (
                      <Link
                        key={child.id}
                        href={`/shop/${child.slug}`}
                        className={`rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent ${
                          activeSlug === child.slug ? "bg-accent font-medium text-foreground" : ""
                        }`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        <div>
          {products.length === 0 ? (
            <p className="text-muted-foreground">
              No products found here yet. Try another category, or run{" "}
              <code>npm run db:seed</code> if your database is empty.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
