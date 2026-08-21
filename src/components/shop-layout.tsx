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
    <main className="mx-auto max-w-7xl px-4 py-6">
      {/* Breadcrumb */}
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-[#C8102E] hover:underline">
          Home
        </Link>
        {parent && (
          <>
            <span className="mx-2">/</span>
            <Link href={`/shop/${parent.slug}`} className="hover:text-[#C8102E] hover:underline">
              {parent.name}
            </Link>
          </>
        )}
        {activeSlug && activeSlug !== parent?.slug && (
          <>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">{title}</span>
          </>
        )}
      </nav>

      {/* Welcome Banner */}
      <div className="mb-6 rounded-lg bg-[#C8102E]/10 p-4">
        <p className="text-sm font-medium text-[#C8102E]">Welcome to Jalal Sons</p>
      </div>

      <h1 className="mb-6 text-2xl font-bold text-gray-800">{title}</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside>
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="mb-3 text-sm font-bold text-gray-700">Categories</p>

            {sections.length > 0 ? (
              <>
                <p className="mb-2 text-xs font-semibold uppercase text-gray-500">
                  Sub Categories
                </p>
                <div className="flex flex-col gap-1">
                  {sections.map((s) => (
                    <Link
                      key={s.id}
                      href={`/shop/${s.slug}`}
                      className={`rounded-md px-3 py-2 text-sm transition ${
                        activeSlug === s.slug
                          ? "bg-[#C8102E] text-white font-medium"
                          : "text-gray-600 hover:bg-gray-100 hover:text-[#C8102E]"
                      }`}
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-1">
                <Link
                  href="/shop"
                  className={`rounded-md px-3 py-2 text-sm transition ${
                    !activeSlug
                      ? "bg-[#C8102E] text-white font-medium"
                      : "text-gray-600 hover:bg-gray-100 hover:text-[#C8102E]"
                  }`}
                >
                  All Products
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/shop/${cat.slug}`}
                    className={`rounded-md px-3 py-2 text-sm transition ${
                      activeSlug === cat.slug
                        ? "bg-[#C8102E] text-white font-medium"
                        : "text-gray-600 hover:bg-gray-100 hover:text-[#C8102E]"
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Product Grid */}
        <div>
          {/* Sort Dropdown */}
          <div className="mb-4 flex justify-end">
            <select className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 focus:border-[#C8102E] focus:outline-none">
              <option>Sort by Default ▼</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Name: A to Z</option>
              <option>Name: Z to A</option>
            </select>
          </div>

          <ProductGrid products={products} />
        </div>
      </div>
    </main>
  );
}