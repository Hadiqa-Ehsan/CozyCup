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
  // Find the parent category (for subcategory pages)
  const parent = categories.find((c) => c.slug === parentSlug || c.children?.some((ch) => ch.slug === activeSlug));
  const sections = parent?.children || [];

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
        {/* Sidebar - Categories with Subcategories */}
        <aside>
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="mb-3 text-sm font-bold text-gray-700">Categories</p>

            {/* All Products Link */}
            <Link
              href="/shop"
              className={`block rounded-md px-3 py-2 text-sm transition ${
                !activeSlug && !parentSlug
                  ? "bg-[#C8102E] text-white font-medium"
                  : "text-gray-600 hover:bg-gray-100 hover:text-[#C8102E]"
              }`}
            >
              All Products
            </Link>

            {/* Categories with Subcategories */}
            {categories.map((cat) => {
              const isActive = activeSlug === cat.slug || parentSlug === cat.slug;
              const hasChildren = cat.children && cat.children.length > 0;

              return (
                <div key={cat.id} className="mt-2">
                  {/* Main Category */}
                  <Link
                    href={`/shop/${cat.slug}`}
                    className={`block rounded-md px-3 py-2 text-sm transition ${
                      isActive
                        ? "bg-[#C8102E] text-white font-medium"
                        : "text-gray-600 hover:bg-gray-100 hover:text-[#C8102E]"
                    }`}
                  >
                    {cat.name}
                  </Link>

                  {/* Subcategories (children) */}
                  {hasChildren && (
                    <div className="ml-4 mt-1 flex flex-col border-l-2 border-gray-200 pl-2">
                      {cat.children.map((child: any) => (
                        <Link
                          key={child.id}
                          href={`/shop/${cat.slug}/${child.slug}`}
                          className={`rounded-md px-3 py-1.5 text-xs transition ${
                            activeSlug === child.slug
                              ? "bg-[#C8102E] text-white font-medium"
                              : "text-gray-500 hover:bg-gray-100 hover:text-[#C8102E]"
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Product Grid */}
        <div>
          <ProductGrid products={products} />
        </div>
      </div>
    </main>
  );
}