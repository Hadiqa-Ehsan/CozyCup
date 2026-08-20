import Link from "next/link";
import { ProductGrid } from "@/components/product-grid";
import type { ProductSummary, CategoryNode } from "@/lib/types";

export function ShopLayout({
  categories,
  products,
  activeSlug,
  parentSlug,
  title,
}: {
  categories: CategoryNode[];
  products: ProductSummary[];
  activeSlug?: string;
  parentSlug?: string;
  title: string;
}) {
  const parent = categories.find((c) => c.slug === parentSlug || c.children.some((ch) => ch.slug === activeSlug));
  const sections = parent ? parent.children : [];

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <nav className="mb-4 text-sm text-muted-foreground">
        <Link href="/" className="hover:underline">Home</Link>
        {parent && (
          <>
            {" > "}
            <Link href={`/shop/${parent.slug}`} className="hover:underline">{parent.name}</Link>
          </>
        )}
        {activeSlug && activeSlug !== parent?.slug && (
          <>
            {" > "}
            <span>{title}</span>
          </>
        )}
      </nav>

      <h1 className="mb-6 text-2xl font-semibold">{title}</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[220px_1fr]">
        <aside>
          <div className="rounded-lg border p-4">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold">Filters</p>

            {sections.length > 0 ? (
              <>
                <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Sections</p>
                <div className="flex flex-col gap-1">
                  {sections.map((s) => (
                    <Link
                      key={s.id}
                      href={`/shop/${s.slug}`}
                      className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent ${
                        activeSlug === s.slug ? "bg-accent font-medium text-primary" : ""
                      }`}
                    >
                      <span
                        className={`h-3 w-3 rounded-full border ${
                          activeSlug === s.slug ? "border-primary bg-primary" : ""
                        }`}
                      />
                      {s.name}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Categories</p>
                <div className="flex flex-col gap-1">
                  <Link
                    href="/shop"
                    className={`rounded-md px-2 py-1.5 text-sm hover:bg-accent ${!activeSlug ? "bg-accent font-medium text-primary" : ""}`}
                  >
                    All Products
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/shop/${cat.slug}`}
                      className={`rounded-md px-2 py-1.5 text-sm hover:bg-accent ${
                        activeSlug === cat.slug ? "bg-accent font-medium text-primary" : ""
                      }`}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </aside>

        <ProductGrid products={products} />
      </div>
    </main>
  );
}
