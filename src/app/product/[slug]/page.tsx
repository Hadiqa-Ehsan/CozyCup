import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { mockCategories, mockProducts } from "@/lib/mock-data";
import { AddToCartButton } from "@/components/add-to-cart-button";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Find the product
  const product = mockProducts.find((p) => p.slug === slug);
  if (!product) notFound();

  // Find the main category and subcategory for this product
  let mainCategory = null;
  let subcategory = null;

  // Search through all categories to find where this product belongs
  for (const cat of mockCategories) {
    // Check if product's categorySlug matches a subcategory
    if (cat.children && cat.children.length > 0) {
      const foundChild = cat.children.find((child: any) => child.slug === product.categorySlug);
      if (foundChild) {
        mainCategory = cat;
        subcategory = foundChild;
        break;
      }
    }
    // Check if product's categorySlug matches a main category
    if (cat.slug === product.categorySlug) {
      mainCategory = cat;
      break;
    }
  }

  // If no main category found, use the categorySlug directly
  const categoryName = mainCategory?.name || product.categorySlug || "Products";
  const categorySlug = mainCategory?.slug || product.categorySlug;

  // Get related products
  const relatedProducts = mockProducts.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  );

  // Calculate discount
  const discountPercent = product.isDeal && product.dealPriceCents
    ? Math.round((1 - product.dealPriceCents / product.priceCents) * 100)
    : 0;

  const effectivePrice = product.isDeal && product.dealPriceCents
    ? product.dealPriceCents
    : product.priceCents;

  const savings = product.isDeal && product.dealPriceCents
    ? product.priceCents - product.dealPriceCents
    : 0;

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 bg-[#F3EDD8] min-h-screen">
      {/* Breadcrumb - Home > Category > Subcategory > Product */}
      <nav className="mb-4 text-sm text-[#D4C9B8]">
        <Link href="/" className="hover:text-[#A87A53] hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/shop/${categorySlug}`} className="hover:text-[#A87A53] hover:underline">
          {categoryName}
        </Link>
        {subcategory && (
          <>
            <span className="mx-2">/</span>
            <Link href={`/shop/${mainCategory?.slug}/${subcategory.slug}`} className="hover:text-[#A87A53] hover:underline">
              {subcategory.name}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-[#242222] font-medium">{product.name}</span>
      </nav>

      {/* Product Detail */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_1.2fr]">
        {/* Left - Image - Fixed size for all products */}
        <div className="relative rounded-2xl overflow-hidden bg-[#F3EDD8] border border-[#D4C9B8] w-full max-w-md mx-auto md:mx-0 aspect-square">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[#242222]">
              No image available
            </div>
          )}
          {product.isDeal && discountPercent > 0 && (
            <div className="absolute left-4 top-4 bg-[#242222] text-[#BDD390] px-3 py-1 rounded-full text-xs font-bold">
              {discountPercent}% OFF
            </div>
          )}
        </div>

        {/* Right - Product Info */}
        <div>
          <h1 className="text-2xl font-bold text-[#242222]">{product.name}</h1>
          
          {/* Price */}
          <div className="mt-3">
            {product.isDeal && product.dealPriceCents ? (
              <div>
                <span className="text-3xl font-bold text-[#242222]">
                  Rs. {(effectivePrice / 100).toFixed(2)}
                </span>
                <span className="ml-3 text-lg text-[#D4C9B8] line-through">
                  Rs. {(product.priceCents / 100).toFixed(2)}
                </span>
                <div className="mt-1 text-sm text-[#A87A53] font-medium">
                  Save Rs. {(savings / 100).toFixed(2)}
                </div>
              </div>
            ) : (
              <span className="text-3xl font-bold text-[#242222]">
                Rs. {(product.priceCents / 100).toFixed(2)}
              </span>
            )}
          </div>

          {/* Unit */}
          {product.unit && (
            <p className="mt-1 text-sm text-[#D4C9B8]">{product.unit}</p>
          )}

          {/* Instructions */}
          <div className="mt-4">
            <label className="text-sm font-medium text-[#242222]">Instructions</label>
            <input
              type="text"
              placeholder="Any special requests?"
              className="mt-1 w-full rounded-xl border border-[#D4C9B8] bg-white/60 px-4 py-2.5 text-sm text-[#242222] outline-none transition focus:border-[#A87A53] focus:ring-2 focus:ring-[#A87A53]/20 placeholder:text-[#D4C9B8]"
            />
          </div>

          {/* Add to Cart */}
          <div className="mt-6">
            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                priceCents: effectivePrice,
                imageUrl: product.imageUrl,
                stock: product.stock || 10,
              }}
            />
          </div>

          {/* Info Cards */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-[#D4C9B8] bg-[#F3EDD8] p-3 text-center">
              <p className="text-sm font-semibold text-[#242222]">Cash and Online Payments</p>
              <p className="text-xs text-[#D4C9B8]">Pay COD or online, hassle-free!</p>
            </div>
            <div className="rounded-xl border border-[#D4C9B8] bg-[#F3EDD8] p-3 text-center">
              <p className="text-sm font-semibold text-[#242222]">Delivery ETA</p>
              <p className="text-xs text-[#D4C9B8]">Our ETA is 45 minute(s)</p>
            </div>
            <div className="rounded-xl border border-[#D4C9B8] bg-[#F3EDD8] p-3 text-center">
              <p className="text-sm font-semibold text-[#242222]">Customer Support</p>
              <p className="text-xs text-[#D4C9B8]">info@cozycup.com.pk</p>
              <p className="text-xs text-[#D4C9B8]">+923004805000</p>
            </div>
          </div>
        </div>
      </div>

      {/* More in [Category] Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <div className="relative mb-6 flex items-center justify-center">
            <div className="absolute left-0 right-0 border-t border-[#D4C9B8]"></div>
            <h2 className="relative bg-[#F3EDD8] px-4 text-xl font-bold text-[#242222]">
              More in {categoryName}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {relatedProducts.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.slug}`}
                className="group rounded-xl border border-[#D4C9B8] bg-[#F3EDD8] p-3 transition hover:border-[#A87A53] hover:shadow-md"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                  {p.imageUrl ? (
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      fill
                      className="object-cover transition group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-[#D4C9B8]">
                      No image
                    </div>
                  )}
                </div>
                <p className="mt-2 line-clamp-2 text-sm font-medium text-[#242222] group-hover:text-[#A87A53]">
                  {p.name}
                </p>
                {p.unit && <p className="text-xs text-[#D4C9B8]">{p.unit}</p>}
                <p className="mt-1 text-sm font-bold text-[#242222]">
                  Rs. {(p.priceCents / 100).toFixed(2)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}