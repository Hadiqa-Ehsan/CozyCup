import { notFound } from "next/navigation";
import Link from "next/link";
import { CreditCard, Truck, Headset } from "lucide-react";
import { getProductBySlug, listRelatedProducts } from "@/lib/services/product-service";
import type { ProductSummary } from "@/lib/types";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductCard } from "@/components/product-card";

export const revalidate = 60;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const effectivePrice = product.isDeal && product.dealPriceCents ? product.dealPriceCents : product.priceCents;
  const related = product.categoryId
    ? ((await listRelatedProducts(product.categoryId, product.id)) as ProductSummary[])
    : [];

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:underline">Home</Link>
        {product.category && (
          <>
            {" > "}
            <Link href={`/shop/${product.category.slug}`} className="hover:underline">
              {product.category.name}
            </Link>
          </>
        )}
        {" > "}
        <span>{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1fr_260px]">
        <div className="flex aspect-square items-center justify-center rounded-lg border bg-muted text-sm text-muted-foreground">
          {/* No real product photography available — placeholder block. */}
          No image available
        </div>

        <div>
          <div className="flex items-start justify-between">
            <h1 className="text-xl font-semibold">{product.name}</h1>
          </div>
          {product.unit && <p className="mt-1 text-sm text-muted-foreground">{product.unit}</p>}
          <p className="mt-3 text-sm text-muted-foreground">{product.description}</p>

          <div className="mt-4 rounded-md border p-4">
            <p className="mb-2 text-sm font-medium">Instructions</p>
            <input
              type="text"
              placeholder="Any special requests?"
              className="w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground"
              disabled
              title="Not implemented in this demo — TBD"
            />
          </div>

          <p className="mt-3 text-sm">
            {product.stock > 0 ? (
              <span className="text-green-600">In stock ({product.stock} available)</span>
            ) : (
              <span className="text-destructive">Out of stock</span>
            )}
          </p>

          <div className="mt-6">
            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                priceCents: effectivePrice,
                imageUrl: product.imageUrl,
                stock: product.stock,
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3 rounded-md border p-4">
            <CreditCard size={20} className="mt-0.5 text-primary" />
            <div>
              <p className="text-sm font-medium">Cash and Online Payments</p>
              <p className="text-xs text-muted-foreground">
                This demo supports Cash on Delivery only (matches the real site&apos;s behavior for
                grocery orders).
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-md border p-4">
            <Truck size={20} className="mt-0.5 text-primary" />
            <div>
              <p className="text-sm font-medium">Delivery ETA</p>
              <p className="text-xs text-muted-foreground">TBD — no live ETA calculation in this demo</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-md border p-4">
            <Headset size={20} className="mt-0.5 text-primary" />
            <div>
              <p className="text-sm font-medium">Customer Support</p>
              <p className="text-xs text-muted-foreground">
                Contact us via the <Link href="/contact" className="text-primary hover:underline">Contact page</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 border-t pt-6 text-lg font-semibold">
            More in {product.category?.name}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
